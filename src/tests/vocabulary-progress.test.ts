import { beforeEach, describe, expect, it } from 'vitest';
import { vocabularyRepository } from '../data/vocabulary/vocabulary-repository';
import { evaluateVocabularyAnswer } from '../engine/vocabulary-evaluator';
import {
  CURRENT_PROGRESS_VERSION,
  defaultProgress,
  migrateProgress,
  useProgressStore,
} from '../store/progress-store';
import type { VocabularyEntry } from '../types/domain';

describe('vocabulary persistence and mastery', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState(defaultProgress);
  });

  it('migrates static vocabulary to ID-only progress without losing counters', () => {
    const migrated = migrateProgress(
      {
        ...defaultProgress,
        vocabulary: [
          {
            id: 'legacy-deadline',
            word: 'Deadline',
            meaning: 'hạn chót',
            example: 'Meet the deadline.',
            sourceTopic: 'work',
            timesSeen: 3,
            timesCorrect: 2,
            mastery: 'learning',
            favorite: true,
          },
        ],
      },
      6,
    );
    expect(migrated.version).toBe(CURRENT_PROGRESS_VERSION);
    expect(migrated.vocabulary[0]).toMatchObject({
      id: 'vocab:deadline',
      timesSeen: 3,
      timesCorrect: 2,
      favorite: true,
    });
    expect(migrated.vocabulary[0]).not.toHaveProperty('meaning');
    expect(migrated.disabledVocabularyPracticeIds).toEqual([]);
  });

  it('migrates V7 flexible fields without losing existing vocabulary progress', () => {
    const migrated = migrateProgress(
      {
        ...defaultProgress,
        version: 7,
        vocabulary: [
          {
            id: 'vocab:deadline',
            sourceTopic: 'work',
            timesSeen: 4,
            timesCorrect: 3,
            mastery: 'strong',
            favorite: true,
          },
        ],
        disabledVocabularyPracticeIds: undefined,
      },
      7,
    );
    expect(migrated.version).toBe(8);
    expect(migrated.vocabulary[0]).toMatchObject({
      id: 'vocab:deadline',
      timesSeen: 4,
      mastery: 'strong',
      favorite: true,
    });
    expect(migrated.disabledVocabularyPracticeIds).toEqual([]);
  });

  it('requires five consecutive produced target expressions for mastery', async () => {
    const item = (await vocabularyRepository.getPracticeItems('vocab:deadline'))[0]!;
    const evaluated = evaluateVocabularyAnswer(item.canonicalAnswer, item);
    for (let index = 0; index < 5; index += 1) {
      useProgressStore.getState().recordVocabularyPractice({
        item,
        evaluation: evaluated.result,
        targetUsed: true,
        firstTry: true,
        shownAnswer: false,
      });
    }
    expect(useProgressStore.getState().vocabulary[0]).toMatchObject({
      mastery: 'mastered',
      practiceCount: 5,
      firstTryCorrectCount: 5,
      targetUsageCorrectCount: 5,
      consecutiveCorrect: 5,
    });
  });

  it('does not count a revealed answer as production and queues wrong answers for review', async () => {
    const item = (await vocabularyRepository.getPracticeItems('vocab:deadline'))[0]!;
    const shown = evaluateVocabularyAnswer(item.canonicalAnswer, item, 1, true);
    useProgressStore.getState().recordVocabularyPractice({
      item,
      evaluation: shown.result,
      targetUsed: true,
      firstTry: false,
      shownAnswer: true,
    });
    expect(useProgressStore.getState().vocabulary[0]?.targetUsageCorrectCount).toBe(0);

    const wrong = evaluateVocabularyAnswer('I do not know.', item);
    useProgressStore.getState().recordVocabularyPractice({
      item,
      evaluation: wrong.result,
      targetUsed: false,
      firstTry: false,
      shownAnswer: false,
    });
    expect(useProgressStore.getState().mistakes[0]).toMatchObject({
      vocabularyId: 'vocab:deadline',
      turnId: item.id,
    });
    expect(
      Date.parse(useProgressStore.getState().vocabulary[0]!.nextReviewAt!),
    ).toBeLessThanOrEqual(Date.now() + 100);
  });

  it('stores custom definitions and authored practice only in local progress', () => {
    const custom: VocabularyEntry = {
      id: 'custom:latency',
      term: 'latency',
      normalizedTerm: 'latency',
      type: 'noun',
      meanings: [{ id: 'custom:latency:sense-1', meaning: 'độ trễ' }],
      collocations: [],
      phrases: [],
      wordFamily: [],
      synonyms: [],
      antonyms: [],
      examples: [],
      tags: ['Custom'],
      sourceTopicIds: [],
      custom: true,
    };
    useProgressStore.getState().addCustomVocabulary(custom);
    useProgressStore.getState().addVocabulary(custom.id, 'custom');
    useProgressStore.getState().addCustomVocabularyPractice({
      id: 'custom-practice:latency:1',
      vocabularyId: custom.id,
      custom: true,
      vietnamese: 'Độ trễ quá cao.',
      canonicalAnswer: 'The latency is too high.',
      acceptedAnswers: ['The latency is too high.'],
      naturalAlternatives: [],
      targetExpressions: ['latency'],
      grammarFocus: [],
      level: 'B1',
    });
    expect(useProgressStore.getState().customVocabulary).toEqual([custom]);
    expect(useProgressStore.getState().customVocabularyPractice).toHaveLength(1);
  });

  it('edits, disables and deletes a custom practice sentence', () => {
    const original = {
      id: 'custom-practice:runlate:1',
      vocabularyId: 'custom:runlate',
      vietnamese: 'Tôi có thể đến trễ.',
      canonicalAnswer: 'I might run late.',
      acceptedAnswers: ['I might run late.'],
      naturalAlternatives: [],
      targetExpressions: ['run late'],
      grammarFocus: [],
      level: 'A2' as const,
      custom: true,
    };
    useProgressStore.getState().addCustomVocabularyPractice(original);
    useProgressStore.getState().addCustomVocabularyPractice({
      ...original,
      vietnamese: 'Hôm nay tôi có thể đến trễ.',
      edited: true,
    });
    expect(useProgressStore.getState().customVocabularyPractice).toHaveLength(1);
    expect(useProgressStore.getState().customVocabularyPractice[0]?.edited).toBe(true);
    useProgressStore.getState().toggleVocabularyPracticeDisabled(original.id);
    expect(useProgressStore.getState().disabledVocabularyPracticeIds).toEqual([original.id]);
    useProgressStore.getState().deleteVocabularyPractice(original.id);
    expect(useProgressStore.getState().customVocabularyPractice).toEqual([]);
    expect(useProgressStore.getState().disabledVocabularyPracticeIds).toEqual([]);
  });

  it('deletes a custom vocabulary with its practice, progress, review and mastery', () => {
    const custom: VocabularyEntry = {
      id: 'custom:runlate',
      term: 'run late',
      normalizedTerm: 'run late',
      type: 'phrasal-verb',
      meanings: [{ id: 'custom:runlate:sense-1', meaning: 'đến trễ' }],
      collocations: [],
      phrases: [],
      wordFamily: [],
      synonyms: [],
      antonyms: [],
      examples: [],
      tags: ['Custom'],
      sourceTopicIds: [],
      custom: true,
    };
    const practice = {
      id: 'custom-practice:runlate:1',
      vocabularyId: custom.id,
      vietnamese: 'Tôi có thể đến trễ.',
      canonicalAnswer: 'I might run late.',
      acceptedAnswers: ['I might run late.'],
      naturalAlternatives: [],
      targetExpressions: ['run late'],
      grammarFocus: [],
      level: 'A2' as const,
      custom: true,
    };
    useProgressStore.getState().addCustomVocabulary(custom);
    useProgressStore.getState().addVocabulary(custom.id, 'custom');
    useProgressStore.getState().addCustomVocabularyPractice(practice);
    const wrong = evaluateVocabularyAnswer('I am on time.', practice);
    useProgressStore.getState().recordVocabularyPractice({
      item: practice,
      evaluation: wrong.result,
      targetUsed: false,
      firstTry: true,
      shownAnswer: false,
    });
    useProgressStore.getState().deleteCustomVocabulary(custom.id);
    expect(useProgressStore.getState().customVocabulary).toEqual([]);
    expect(useProgressStore.getState().customVocabularyPractice).toEqual([]);
    expect(useProgressStore.getState().vocabulary).toEqual([]);
    expect(useProgressStore.getState().mistakes).toEqual([]);
    expect(useProgressStore.getState().sentenceProgress[practice.id]).toBeUndefined();
  });

  it('removes a static vocabulary from My Vocabulary without deleting its repository definition', async () => {
    useProgressStore.getState().addVocabulary('vocab:deadline');
    useProgressStore.getState().removeVocabulary('vocab:deadline');
    expect(useProgressStore.getState().vocabulary).toEqual([]);
    expect(await vocabularyRepository.getById('vocab:deadline')).toBeDefined();
  });
});
