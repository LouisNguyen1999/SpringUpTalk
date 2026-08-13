import { beforeAll, describe, expect, it } from 'vitest';
import { vocabularyRepository } from '../data/vocabulary/vocabulary-repository';
import {
  evaluateVocabularyAnswer,
  usesTargetExpression,
} from '../engine/vocabulary-evaluator';
import type { VocabularyPracticeItem } from '../types/domain';

describe('vocabulary evaluator', () => {
  let deadlineItems: VocabularyPracticeItem[];

  beforeAll(async () => {
    deadlineItems = await vocabularyRepository.getPracticeItems('vocab:deadline');
  });

  it('classifies a correct answer that uses the target expression', () => {
    const result = evaluateVocabularyAnswer('We need to meet the deadline by Friday.', deadlineItems[0]!);
    expect(result.status).toBe('correct-target');
    expect(result.targetUsed).toBe(true);
  });

  it('accepts the meaning but does not advance target-expression mastery', () => {
    const result = evaluateVocabularyAnswer('We might finish late.', deadlineItems[1]!);
    expect(result.status).toBe('acceptable-meaning');
    expect(result.result.matchedBy).toBe('accepted');
    expect(result.targetUsed).toBe(false);
  });

  it('rejects a semantic reversal and checks expression boundaries', () => {
    expect(evaluateVocabularyAnswer('We will meet the deadline.', deadlineItems[1]!).status).toBe(
      'incorrect',
    );
    expect(usesTargetExpression('The deadline is approaching.', ['deadline is approaching'])).toBe(
      true,
    );
    expect(usesTargetExpression('This is a deadlineish label.', ['deadline'])).toBe(false);
  });
});
