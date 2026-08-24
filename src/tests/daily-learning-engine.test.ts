import { describe, expect, it } from 'vitest';
import { buildDailyLearningSession, isDailySessionComplete } from '../engine/daily-learning';
import { defaultProgress } from '../store/progress-store';
import type {
  DailyLearningCatalog,
} from '../engine/daily-learning';
import type { UserProgress } from '../types/domain';
import { localDateKey } from '../utils/local-date';

const levels = ['A1', 'A2', 'B1', 'B2'] as const;
const catalog: DailyLearningCatalog = {
  conversations: Array.from({ length: 12 }, (_, index) => ({
    id: `topic-${index}`,
    title: `Topic ${index}`,
    titleVi: `Chủ đề ${index}`,
    description: '',
    category: 'Daily Life',
    icon: '💬',
    level: levels[index % levels.length]!,
    grammar: [],
    vocabularyTags: [],
    conversationCount: 3,
  })),
  vocabulary: Array.from({ length: 40 }, (_, index) => ({
    id: `vocab:${index}`,
    term: `word ${index}`,
    normalizedTerm: `word ${index}`,
    shortMeaning: `từ ${index}`,
    cefr: levels[index % levels.length]!,
    type: 'word' as const,
    tags: [],
    practiceCount: 5,
    shard: 0,
  })),
  writing: Array.from({ length: 12 }, (_, index) => ({
    id: `writing:${index}`,
    titleEnglish: `Writing ${index}`,
    titleVietnamese: `Bài viết ${index}`,
    category: 'Daily Life',
    domain: 'daily-life' as const,
    level: levels[index % levels.length]!,
    writingType: index % 2 ? 'story' as const : 'problem-explanation' as const,
    keywords: index % 2 ? ['future plan'] : ['cause result'],
    shard: 0,
  })),
};

function state(): UserProgress {
  return structuredClone(defaultProgress);
}

const now = new Date(2026, 7, 19, 9, 0, 0);

describe('daily learning priority engine', () => {
  it('creates a deterministic onboarding mix without review', () => {
    const first = buildDailyLearningSession(state(), { mode: 'standard', focus: 'balanced' }, catalog, now);
    const second = buildDailyLearningSession(state(), { mode: 'standard', focus: 'balanced' }, catalog, now);
    expect(first.items).toEqual(second.items);
    expect(first.items).toHaveLength(7);
    expect(first.items.filter((item) => item.target === 'conversation')).toHaveLength(1);
    expect(first.items.filter((item) => item.target === 'vocabulary')).toHaveLength(5);
    expect(first.items.filter((item) => item.target === 'writing')).toHaveLength(1);
    expect(first.items.some((item) => item.kind === 'review')).toBe(false);
  });

  it('puts an overdue vocabulary review ahead of new vocabulary', () => {
    const progress = state();
    progress.vocabulary.push({
      id: 'vocab:overdue', sourceTopic: 'test', timesSeen: 4, timesCorrect: 1,
      practiceCount: 4, incorrectCount: 3, mastery: 'learning', favorite: false,
      nextReviewAt: '2026-08-10T08:00:00.000Z',
    });
    const session = buildDailyLearningSession(progress, { mode: 'quick', focus: 'balanced' }, catalog, now);
    const overdue = session.items.find((item) => item.vocabularyId === 'vocab:overdue');
    const fresh = session.items.find((item) => item.target === 'vocabulary' && item.reason === 'new-content');
    expect(overdue).toMatchObject({ kind: 'review', mandatory: true });
    expect(overdue!.priority).toBeGreaterThan(fresh!.priority);
  });

  it('prioritizes missing Person B over a new conversation', () => {
    const progress = state();
    progress.conversationProgress['topic-0-c1'] = {
      conversationId: 'topic-0-c1', topicId: 'topic-0',
      roles: { A: { attempts: 1, completedAt: '2026-08-18T08:00:00.000Z' }, B: { attempts: 0 } },
    };
    const session = buildDailyLearningSession(progress, { mode: 'standard', focus: 'balanced' }, catalog, now);
    const missing = session.items.find((item) => item.conversationId === 'topic-0-c1');
    const fresh = session.items.find((item) => item.target === 'conversation' && item.reason === 'new-content');
    expect(missing).toMatchObject({ role: 'B', reason: 'missing-role' });
    expect(missing!.priority).toBeGreaterThan(fresh!.priority);
  });

  it('uses repeated contradicted/missing Writing weakness before random new Writing', () => {
    const progress = state();
    progress.writingProgress['writing:weak'] = {
      topicId: 'writing:weak', attempts: [{ id: 'a', answer: 'x', status: 'needs-improvement', communicationScore: 20, meaningCoverage: .2, missingIdeaIds: ['reason'], contradictedIdeaIds: ['result'], missingIdeaKinds: ['cause-explanation'], criticalErrorIds: [], languageIssueTypes: [], createdAt: '2026-08-18T08:00:00.000Z' }],
      successfulCount: 0, consecutiveCorrect: 0, lastPracticedAt: '2026-08-18T08:00:00.000Z', nextReviewAt: '2026-08-20T08:00:00.000Z', mastery: 'new', favorite: false, weaknessCounts: { 'cause-explanation': 3 },
    };
    const session = buildDailyLearningSession(progress, { mode: 'standard', focus: 'writing' }, catalog, now);
    const weak = session.items.find((item) => item.writingTopicId === 'writing:weak');
    const fresh = session.items.find((item) => item.target === 'writing' && item.reason === 'new-content');
    expect(weak).toMatchObject({ reason: 'weak-mastery' });
    expect(weak!.priority).toBeGreaterThan(fresh!.priority);
  });

  it('caps a heavy backlog and selects only due items when enough are available', () => {
    const progress = state();
    progress.vocabulary = Array.from({ length: 30 }, (_, index) => ({
      id: `vocab:due-${index}`, sourceTopic: 'test', timesSeen: 2, timesCorrect: 0,
      practiceCount: 2, incorrectCount: 2, mastery: 'new' as const, favorite: false,
      nextReviewAt: '2026-08-01T08:00:00.000Z',
    }));
    const session = buildDailyLearningSession(progress, { mode: 'standard', focus: 'balanced' }, catalog, now);
    expect(session.items).toHaveLength(15);
    expect(session.items.every((item) => item.kind === 'review')).toBe(true);
  });

  it('adjusts Quick, Standard and Focus sizes for an established learner', () => {
    const progress = state();
    progress.vocabulary = Array.from({ length: 30 }, (_, index) => ({
      id: `vocab:${index}`, sourceTopic: 'test', timesSeen: 3, timesCorrect: 1,
      practiceCount: 3, incorrectCount: 2, mastery: 'learning' as const, favorite: false,
    }));
    const sizes = (['quick', 'standard', 'focus'] as const).map((mode) =>
      buildDailyLearningSession(progress, { mode, focus: 'balanced' }, catalog, now).items.length,
    );
    expect(sizes).toEqual([8, 15, 23]);
  });

  it('focus preferences change the deterministic skill mix', () => {
    const progress = state();
    progress.vocabulary = Array.from({ length: 20 }, (_, index) => ({
      id: `vocab:${index}`, sourceTopic: 'test', timesSeen: 3, timesCorrect: 1,
      practiceCount: 3, incorrectCount: 2, mastery: 'learning' as const, favorite: false,
    }));
    const balanced = buildDailyLearningSession(progress, { mode: 'standard', focus: 'balanced' }, catalog, now);
    const conversation = buildDailyLearningSession(progress, { mode: 'standard', focus: 'conversation' }, catalog, now);
    const writing = buildDailyLearningSession(progress, { mode: 'standard', focus: 'writing' }, catalog, now);
    expect(conversation.items.filter((item) => item.target === 'conversation').length)
      .toBeGreaterThan(balanced.items.filter((item) => item.target === 'conversation').length);
    expect(writing.items.filter((item) => item.target === 'writing').length)
      .toBeGreaterThan(balanced.items.filter((item) => item.target === 'writing').length);
  });

  it('uses vocabulary mini-blocks of at most five when enough variety exists', () => {
    const progress = state();
    progress.vocabulary.push({ id: 'vocab:weak', sourceTopic: 'test', timesSeen: 4, timesCorrect: 1, practiceCount: 4, incorrectCount: 3, mastery: 'learning', favorite: false });
    const session = buildDailyLearningSession(progress, { mode: 'standard', focus: 'balanced' }, catalog, now);
    let longest = 0;
    let current = 0;
    let previous = '';
    for (const item of session.items) {
      current = item.target === previous ? current + 1 : 1;
      previous = item.target;
      longest = Math.max(longest, current);
    }
    expect(longest).toBeLessThanOrEqual(5);
  });

  it('keeps new content at or below the learner level', () => {
    const session = buildDailyLearningSession(state(), { mode: 'standard', focus: 'balanced' }, catalog, now);
    const vocabularyLevels = new Map(catalog.vocabulary.map((item) => [item.id, item.cefr]));
    const writingLevels = new Map(catalog.writing.map((item) => [item.id, item.level]));
    expect(session.items.filter((item) => item.vocabularyId).every((item) => vocabularyLevels.get(item.vocabularyId!) === 'A1')).toBe(true);
    expect(session.items.filter((item) => item.writingTopicId).every((item) => writingLevels.get(item.writingTopicId!) === 'A1')).toBe(true);
  });

  it('requires completed mandatory reviews and never treats skip as completion', () => {
    const items = Array.from({ length: 10 }, (_, index) => ({
      id: `${index}`, kind: index < 2 ? 'review' as const : 'vocabulary' as const,
      target: 'vocabulary' as const, reason: index < 2 ? 'due-review' as const : 'weak-mastery' as const,
      status: index < 8 ? 'completed' as const : 'pending' as const, mandatory: index < 2,
      priority: 1, vocabularyId: `vocab:${index}`,
    }));
    expect(isDailySessionComplete(items)).toBe(true);
    items[0] = { ...items[0]!, status: 'skipped' };
    expect(isDailySessionComplete(items)).toBe(false);
  });

  it('uses the local calendar date rather than UTC slicing', () => {
    const localMidnight = new Date(2026, 7, 19, 0, 30, 0);
    expect(buildDailyLearningSession(state(), { mode: 'quick', focus: 'balanced' }, catalog, localMidnight).date).toBe(localDateKey(localMidnight));
  });
});
