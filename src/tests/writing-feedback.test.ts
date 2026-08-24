import { describe, expect, it } from 'vitest';
import { evaluateWriting } from '../engine/writing-evaluator';
import {
  WRITING_FEEDBACK_CATEGORIES,
  wordAwareDiff,
} from '../engine/writing-feedback';
import {
  rankedWeakWritingMastery,
  updateWritingSkillMastery,
  WRITING_MASTERY_SKILLS,
} from '../engine/writing-mastery';
import type { WritingPracticeTopic } from '../types/domain';
import { writingLearningMetrics } from '../engine/writing-analytics';

function topic(overrides: Partial<WritingPracticeTopic> = {}): WritingPracticeTopic {
  return {
    id: 'writing:feedback-test',
    titleEnglish: 'Everyday work',
    titleVietnamese: 'Đi làm mỗi ngày',
    category: 'Daily life',
    domain: 'daily-life',
    level: 'A2',
    writingType: 'story',
    context: 'Describe a simple routine.',
    vietnameseSourceText: 'Cô ấy đi làm mỗi ngày.',
    requiredIdeas: [{ id: 'routine', labelVietnamese: 'đi làm mỗi ngày', concepts: ['She goes to work every day.'], kind: 'action', arcStage: 'event' }],
    criticalFacts: [],
    usefulVocabulary: ['go to work', 'every day'],
    usefulStructures: ['present-simple'],
    sampleAnswers: ['She goes to work every day.', 'Every day, she goes to work.'],
    hints: [], commonMistakes: [], expectedWordRange: [5, 20],
    ...overrides,
  };
}

describe('Writing Quality & Feedback Engine', () => {
  it('exposes the complete 20-category taxonomy and 16 mastery skills', () => {
    expect(WRITING_FEEDBACK_CATEGORIES).toHaveLength(20);
    expect(new Set(WRITING_FEEDBACK_CATEGORIES).size).toBe(20);
    expect(WRITING_MASTERY_SKILLS).toHaveLength(16);
  });

  it('keeps meaning while identifying subject agreement and word form separately', () => {
    const result = evaluateWriting('She go to work everyday.', topic());
    expect(result.meaningCoverage).toBe(1);
    expect(result.status).toBe('mostly-correct');
    expect(result.qualityBand).toBe('understandable-needs-improvement');
    expect(result.feedbackIssues?.map((item) => item.category)).toEqual(
      expect.arrayContaining(['SUBJECT_VERB_AGREEMENT', 'WORD_FORM']),
    );
    expect(result.correctedAnswer).toBe('She goes to work every day.');
    expect(result.targetAchievement).toMatchObject({ meaningPreserved: true, grammarTargetMet: false });
  });

  it.each([
    ['I very like coffee.', 'WORD_ORDER'],
    ['Yesterday I go to work.', 'TENSE'],
    ['I make a photo.', 'COLLOCATION'],
    ['Could you borrow me a pen?', 'VOCABULARY'],
    ['Me went to work.', 'PRONOUN'],
    ['I arrived to the office.', 'PREPOSITION'],
    ['I bought new phone.', 'ARTICLE'],
    ['I waited 2 hour.', 'PLURAL'],
    ['I am go to work.', 'GRAMMAR'],
    ['I stayed home becuase it rained.', 'SPELLING'],
  ] as const)('classifies %s as %s', (answer, category) => {
    expect(evaluateWriting(answer, topic()).feedbackIssues?.some((item) => item.category === category)).toBe(true);
  });

  it('flags unsupported extra meaning without turning it into an exact-answer check', () => {
    const coffee = topic({
      vietnameseSourceText: 'Tôi uống cà phê mỗi sáng.',
      requiredIdeas: [{ id: 'coffee', labelVietnamese: 'uống cà phê mỗi sáng', concepts: ['I drink coffee every morning.'], kind: 'action', arcStage: 'event' }],
      sampleAnswers: ['I drink coffee every morning.', 'Every morning, I have coffee.'],
      usefulVocabulary: ['drink coffee', 'every morning'],
    });
    const result = evaluateWriting('I drink coffee with my friend every morning.', coffee);
    expect(result.meaningCoverage).toBe(1);
    expect(result.feedbackIssues?.some((item) => item.category === 'EXTRA_MEANING')).toBe(true);
  });

  it('separates acceptable meaning from a missing target structure', () => {
    const presentPerfect = topic({
      vietnameseSourceText: 'Tôi đã sống ở đây được năm năm.',
      requiredIdeas: [{ id: 'duration', labelVietnamese: 'sống ở đây năm năm', concepts: ['I lived here for five years.', 'I have lived here for five years.'], kind: 'time-details', arcStage: 'context' }],
      usefulStructures: ['present-perfect'],
      sampleAnswers: ['I have lived here for five years.', 'I have been living here for five years.'],
    });
    const result = evaluateWriting('I lived here for five years.', presentPerfect);
    expect(result.targetAchievement).toMatchObject({ meaningPreserved: true, grammarTargetMet: false });
    expect(result.status).toBe('mostly-correct');
  });

  it('creates a word-aware replacement diff that stays separate from the reference answer', () => {
    const diff = wordAwareDiff('She go to work everyday.', 'She goes to work every day.');
    expect(diff.some((item) => item.operation === 'replace' && item.original === 'go' && item.corrected === 'goes')).toBe(true);
    expect(diff.some((item) => item.operation === 'replace' && item.original === 'everyday' && item.corrected === 'every day')).toBe(true);
  });

  it('provides Story and Problem structure feedback from arc stages', () => {
    const storyResult = evaluateWriting('She goes to work every day.', topic());
    expect(storyResult.specializedFeedback).toMatchObject({ kind: 'story', structureCompleteness: 'good' });
    const problemResult = evaluateWriting('The server failed.', topic({
      writingType: 'problem-explanation',
      requiredIdeas: [
        { id: 'problem', labelVietnamese: 'server lỗi', concepts: ['The server failed.'], kind: 'action', arcStage: 'problem' },
        { id: 'result', labelVietnamese: 'đã hoạt động lại', concepts: ['It is working again.'], kind: 'outcome', arcStage: 'result' },
      ],
      sampleAnswers: ['The server failed, but we fixed it and it is working again.', 'The service recovered after the team fixed the failure.'],
    }));
    expect(problemResult.specializedFeedback).toMatchObject({ kind: 'problem-explanation', structureCompleteness: 'needs-work' });
    expect(problemResult.specializedFeedback?.missingStages).toContain('result');
  });

  it('updates skill mastery, recent accuracy and review scheduling deterministically', () => {
    const now = new Date('2026-08-19T08:00:00.000Z');
    const first = updateWritingSkillMastery({}, ['word-order'], 'incorrect', now);
    const second = updateWritingSkillMastery(first, ['word-order'], 'almost-correct', now);
    const third = updateWritingSkillMastery(second, ['word-order'], 'correct', now);
    expect(third['word-order']).toMatchObject({ attempts: 3, correct: 1, almostCorrect: 1, incorrect: 1, recentAccuracy: 53 });
    expect(Date.parse(third['word-order']!.reviewDueAt)).toBe(now.getTime() + 7 * 86_400_000);
    expect(rankedWeakWritingMastery(third, now)[0]?.skill).toBe('word-order');
  });

  it('derives local learning metrics without external tracking', () => {
    const baseAttempt = {
      id: 'a', answer: 'Answer.', communicationScore: 80, meaningCoverage: 1,
      missingIdeaIds: [], contradictedIdeaIds: [], missingIdeaKinds: [], criticalErrorIds: [],
      languageIssueTypes: [], createdAt: '2026-08-19T08:00:00.000Z',
    } as const;
    const metrics = writingLearningMetrics({ writingProgress: {
      one: {
        topicId: 'one', attempts: [
          { ...baseAttempt, status: 'needs-improvement', feedbackCategories: ['WORD_ORDER', 'MISSING_IDEA'], qualityBand: 'understandable-needs-improvement' },
          { ...baseAttempt, id: 'b', status: 'communicates-well', feedbackCategories: [], qualityBand: 'correct-natural' },
        ], successfulCount: 1, consecutiveCorrect: 1, lastPracticedAt: baseAttempt.createdAt,
        nextReviewAt: baseAttempt.createdAt, mastery: 'learning', favorite: false, weaknessCounts: {},
      },
    } });
    expect(metrics).toMatchObject({ attempts: 2, accuracy: 50, firstAttemptAccuracy: 0, retrySuccessRate: 100, wordOrderErrorRate: 50, missingIdeaRate: 50, naturalnessRate: 50, averageRetries: 2 });
  });
});
