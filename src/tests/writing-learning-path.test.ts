import { describe, expect, it } from 'vitest';
import { buildDailyLearningSession } from '../engine/daily-learning';
import {
  buildWritingPathState,
  continueWritingRecommendation,
  orderedWritingTopics,
  rankedWritingWeakSkills,
  topicsForWritingUnit,
  visibleWritingUnits,
  writingLearningMetadata,
  writingLearningUnits,
  writingTopicState,
  writingUnitProgress,
} from '../engine/writing-learning-path';
import { defaultProgress, migrateProgress } from '../store/progress-store';
import type { UserProgress, WritingAttempt, WritingTopicProgress } from '../types/domain';

const successfulAttempt = (topicId: string): WritingAttempt => ({
  id: `${topicId}:attempt`, answer: 'A clear answer.', status: 'communicates-well',
  communicationScore: 92, meaningCoverage: 1, missingIdeaIds: [], contradictedIdeaIds: [],
  missingIdeaKinds: [], criticalErrorIds: [], languageIssueTypes: [], createdAt: '2026-08-18T08:00:00.000Z',
});

const successfulProgress = (topicId: string): WritingTopicProgress => ({
  topicId, attempts: [successfulAttempt(topicId)], bestAttempt: successfulAttempt(topicId),
  successfulCount: 1, consecutiveCorrect: 1, lastPracticedAt: '2026-08-18T08:00:00.000Z',
  nextReviewAt: '2026-08-25T08:00:00.000Z', mastery: 'learning', favorite: false,
  weaknessCounts: {}, lastSuccessfulAt: '2026-08-18T08:00:00.000Z',
});

const pathState = (): UserProgress => structuredClone(defaultProgress);

describe('Writing Learning Path metadata and progression', () => {
  it('maps every topic exactly once into 24 deterministic, ordered units', () => {
    expect(writingLearningMetadata).toHaveLength(500);
    expect(new Set(writingLearningMetadata.map((item) => item.topicId)).size).toBe(500);
    expect(writingLearningUnits).toHaveLength(24);
    expect(writingLearningMetadata.every((item) => item.skills.length > 0)).toBe(true);
    expect(writingLearningMetadata.every((item) => item.difficultyScore >= 0 && item.difficultyScore <= 100)).toBe(true);
    for (const unit of writingLearningUnits) {
      const items = writingLearningMetadata.filter((item) => item.unitId === unit.id);
      expect(items.map((item) => item.order)).toEqual(Array.from({ length: items.length }, (_, index) => index + 1));
    }
  });

  it('keeps all, Daily and IT paths complete and in the same curricular order', () => {
    expect(orderedWritingTopics('all')).toHaveLength(500);
    expect(orderedWritingTopics('daily-life')).toHaveLength(300);
    expect(orderedWritingTopics('it-work')).toHaveLength(200);
    expect(visibleWritingUnits('daily-life')).toHaveLength(24);
    expect(visibleWritingUnits('it-work')).toHaveLength(24);
  });

  it('unlocks the next unit at the deterministic 70/60/25 threshold', () => {
    const state = pathState();
    const firstTopics = topicsForWritingUnit('writing-unit-01');
    const initial = writingUnitProgress('writing-unit-01', state.writingProgress);
    expect(initial.requiredCompleted).toBe(12);
    for (const topic of firstTopics.slice(0, initial.requiredCompleted - 1)) state.writingProgress[topic.id] = successfulProgress(topic.id);
    expect(buildWritingPathState(state)[1]?.recommendedUnlocked).toBe(false);
    state.writingProgress[firstTopics[initial.requiredCompleted - 1]!.id] = successfulProgress(firstTopics[initial.requiredCompleted - 1]!.id);
    const unlocked = buildWritingPathState(state);
    expect(unlocked[0]?.completed).toBe(true);
    expect(unlocked[1]).toMatchObject({ recommendedUnlocked: true, current: true });
  });

  it('selects Continue Learning by draft, due review, weak skill, then next path topic', () => {
    const state = pathState();
    const [first, second] = orderedWritingTopics();
    expect(continueWritingRecommendation(state)?.reason).toBe('next-path-topic');

    state.writingProgress[first!.id] = successfulProgress(first!.id);
    state.writingProgress[first!.id]!.nextReviewAt = '2026-08-01T08:00:00.000Z';
    const dueRecommendation = continueWritingRecommendation(state, new Date('2026-08-19T08:00:00.000Z'));
    expect(dueRecommendation).toMatchObject({ reason: 'due-review', reviewMode: 'variant-retry', sourceTopicId: first!.id });
    expect(dueRecommendation?.topic.id).not.toBe(first!.id);
    expect(dueRecommendation?.topic.level).toBe(first!.level);

    state.writingDrafts[second!.id] = 'unfinished';
    expect(continueWritingRecommendation(state, new Date('2026-08-19T08:00:00.000Z'))).toMatchObject({ topic: { id: second!.id }, reason: 'draft' });

    delete state.writingDrafts[second!.id];
    state.writingProgress[first!.id]!.nextReviewAt = '2026-08-25T08:00:00.000Z';
    state.writingProgress[first!.id]!.weaknessCounts = { outcome: 3 };
    expect(rankedWritingWeakSkills(state.writingProgress)[0]).toMatchObject({ skill: 'explain-result', count: 3 });
    expect(continueWritingRecommendation(state, new Date('2026-08-19T08:00:00.000Z'))?.reason).toBe('weak-skill');
  });

  it('reports New, In Progress, Review Due, Strong and Mastered from existing progress', () => {
    const now = new Date('2026-08-19T08:00:00.000Z');
    expect(writingTopicState('x', undefined, false, now)).toBe('New');
    expect(writingTopicState('x', undefined, true, now)).toBe('In Progress');
    const progress = successfulProgress('x');
    expect(writingTopicState('x', progress, false, now)).toBe('Strong');
    progress.mastery = 'mastered';
    expect(writingTopicState('x', progress, false, now)).toBe('Mastered');
    progress.nextReviewAt = '2026-08-18T08:00:00.000Z';
    expect(writingTopicState('x', progress, false, now)).toBe('Review Due');
  });

  it('migrates path preference without duplicating static metadata', () => {
    const migrated = migrateProgress({ ...defaultProgress, version: 11, writingPathPreference: undefined }, 11);
    expect(migrated.writingPathPreference).toBe('all');
    expect('writingLearningMetadata' in migrated).toBe(false);
  });

  it('feeds weak-skill/current-unit ordering into Daily Learning without replacing due review priority', () => {
    const state = pathState();
    const practiced = orderedWritingTopics()[0]!;
    state.writingProgress[practiced.id] = { ...successfulProgress(practiced.id), mastery: 'mastered', weaknessCounts: { outcome: 4 } };
    const session = buildDailyLearningSession(state, { mode: 'standard', focus: 'writing' }, {
      conversations: [], vocabulary: [], writing: orderedWritingTopics(), writingPath: writingLearningMetadata,
    }, new Date('2026-08-19T08:00:00.000Z'));
    expect(session.items.some((item) => item.target === 'writing' && item.reason === 'weak-skill')).toBe(true);
  });
});
