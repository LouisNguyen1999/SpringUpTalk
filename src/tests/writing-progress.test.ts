import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CURRENT_PROGRESS_VERSION, defaultProgress, migrateProgress, useProgressStore } from '../store/progress-store';
import type { WritingEvaluation } from '../types/domain';

function evaluation(status: WritingEvaluation['status'], score = 90): WritingEvaluation {
  return {
    status,
    communicationScore: score,
    meaningCoverage: score / 100,
    communicatedIdeas: status === 'needs-improvement' ? 1 : 3,
    totalIdeas: 3,
    ideas: [
      { id: 'one', labelVietnamese: 'ý một', status: 'covered', score: 1, kind: 'action', communicated: true },
      { id: 'two', labelVietnamese: 'ý hai', status: status === 'needs-improvement' ? 'missing' : 'covered', score: status === 'needs-improvement' ? 0 : 1, kind: 'cause-explanation', communicated: status !== 'needs-improvement' },
      { id: 'three', labelVietnamese: 'ý ba', status: status === 'needs-improvement' ? 'partial' : 'covered', score: status === 'needs-improvement' ? 0.5 : 1, kind: 'future-plan', communicated: status !== 'needs-improvement' },
    ],
    facts: [{ id: 'fact', labelVietnamese: '20 phút', correct: status !== 'needs-improvement', status: status === 'needs-improvement' ? 'contradicted' : 'correct' }],
    languageIssues: [],
    userAnswer: `Attempt with score ${score}`,
    betterVersion: 'A better version.',
    qualityBand: status === 'communicates-well' ? 'correct-natural' : status === 'mostly-correct' ? 'correct-less-natural' : 'understandable-needs-improvement',
    practicedSkills: ['word-order'],
    feedbackIssues: status === 'needs-improvement' ? [{
      id: 'word-order', category: 'WORD_ORDER', layer: 'structure', severity: 'warning',
      explanationVietnamese: 'Trật tự từ cần sửa.', hints: ['Loại lỗi', 'Vị trí', 'Quy tắc'],
    }] : [],
    targetAchievement: { meaningPreserved: status !== 'needs-improvement', grammarTargetMet: status === 'communicates-well', vocabularyTargetMet: true, missingGrammarTargets: [], missingVocabularyTargets: [] },
  };
}

describe('writing persistence, drafts and review', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState(defaultProgress);
  });

  afterEach(() => vi.useRealTimers());

  it('migrates V8 without losing existing progress', () => {
    const migrated = migrateProgress({ ...defaultProgress, version: 8, xp: 42, writingProgress: undefined, writingDrafts: undefined }, 8);
    expect(migrated.version).toBe(CURRENT_PROGRESS_VERSION);
    expect(migrated.xp).toBe(42);
    expect(migrated.writingProgress).toEqual({});
    expect(migrated.writingDrafts).toEqual({});
    expect(migrated.writingSkillProgress).toEqual({});
  });

  it('migrates V12 to the current version without losing drafts, favorites or path state', () => {
    const migrated = migrateProgress({
      ...defaultProgress,
      version: 12,
      writingSkillProgress: undefined,
      writingDrafts: { 'writing:test': 'Saved draft' },
      writingCurrentUnitId: 'writing-unit-04',
      favorites: ['topic-a'],
    }, 12);
    expect(migrated).toMatchObject({ version: CURRENT_PROGRESS_VERSION, writingDrafts: { 'writing:test': 'Saved draft' }, writingCurrentUnitId: 'writing-unit-04', favorites: ['topic-a'], writingSkillProgress: {}, itEnglishProgress: {} });
  });

  it('autosaves and clears a draft by topic ID', () => {
    useProgressStore.getState().saveWritingDraft('writing:test', 'My unfinished paragraph');
    expect(useProgressStore.getState().writingDrafts['writing:test']).toBe('My unfinished paragraph');
    useProgressStore.getState().clearWritingDraft('writing:test');
    expect(useProgressStore.getState().writingDrafts['writing:test']).toBeUndefined();
  });

  it('stores a compact attempt, best attempt and immediate review for missing meaning', () => {
    useProgressStore.getState().recordWritingAttempt('writing:test', evaluation('needs-improvement', 35));
    const progress = useProgressStore.getState().writingProgress['writing:test'];
    expect(progress?.attempts).toHaveLength(1);
    expect(progress?.bestAttempt?.missingIdeaIds).toEqual(['two', 'three']);
    expect(progress?.bestAttempt?.criticalErrorIds).toEqual(['fact']);
    expect(progress?.mastery).toBe('new');
    expect(progress?.recommendedReviewMode).toBe('variant-retry');
    expect(useProgressStore.getState().writingSkillProgress['word-order']).toMatchObject({ attempts: 1, incorrect: 1, masteryScore: 0 });
    expect(Date.parse(progress!.nextReviewAt)).toBeLessThanOrEqual(Date.now() + 100);
  });

  it('caps history and advances deterministic mastery after clear communication', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T08:00:00.000Z'));
    for (let index = 1; index <= 5; index += 1) {
      useProgressStore.getState().recordWritingAttempt('writing:test', evaluation('communicates-well', 90 + index));
      const nextReview = useProgressStore.getState().writingProgress['writing:test']?.nextReviewAt;
      if (nextReview) vi.setSystemTime(new Date(Date.parse(nextReview) + 1_000));
    }
    const progress = useProgressStore.getState().writingProgress['writing:test'];
    expect(progress?.attempts).toHaveLength(3);
    expect(progress?.successfulCount).toBe(5);
    expect(progress?.mastery).toBe('mastered');
    expect(progress?.bestAttempt?.communicationScore).toBe(95);
  });

  it('does not grant mastery for repeated retries before the next review', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T08:00:00.000Z'));
    for (let index = 0; index < 5; index += 1) {
      useProgressStore.getState().recordWritingAttempt('writing:test', evaluation('communicates-well', 95));
    }
    const progress = useProgressStore.getState().writingProgress['writing:test'];
    expect(progress?.successfulCount).toBe(1);
    expect(progress?.mastery).toBe('learning');
  });
});
