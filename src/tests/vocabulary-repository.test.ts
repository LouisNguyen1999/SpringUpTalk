import { describe, expect, it } from 'vitest';
import {
  vocabularyIndex,
  vocabularyRepository,
} from '../data/vocabulary/vocabulary-repository';

describe('vocabulary repository', () => {
  it('keeps the lightweight index separate from lazily loaded details', () => {
    expect(vocabularyIndex).toHaveLength(5_950);
    expect(vocabularyIndex.every((item) => !('meanings' in item) && Number.isInteger(item.shard))).toBe(
      true,
    );
  });

  it('provides exactly 500 phase-one entries with five sourced practice items each', async () => {
    const enabled = vocabularyIndex.filter((item) => item.practiceCount > 0);
    expect(enabled).toHaveLength(500);
    expect(enabled.every((item) => item.practiceCount === 5)).toBe(true);

    const deadlineItems = await vocabularyRepository.getPracticeItems('vocab:deadline');
    expect(deadlineItems).toHaveLength(5);
    expect(deadlineItems.every((item) => item.targetExpressions.length > 0)).toBe(true);
  });

  it('supports normalized search, Vietnamese meaning search and multiple senses', async () => {
    expect(vocabularyRepository.search('DEADLINE')[0]?.id).toBe('vocab:deadline');
    expect(vocabularyRepository.search('hạn chót').some((item) => item.id === 'vocab:deadline')).toBe(
      true,
    );

    const issue = await vocabularyRepository.getByTerm('Issue');
    expect(issue?.meanings).toHaveLength(2);
    expect(issue?.meanings.map((meaning) => meaning.partOfSpeech)).toEqual(['noun', 'verb']);
  });

  it('does not collapse the noun timeout into the phrasal verb time out', async () => {
    const timeout = await vocabularyRepository.getByTerm('timeout');
    const timeOut = await vocabularyRepository.getByTerm('time out');
    expect(timeout?.id).toBe('vocab:timeout');
    expect(timeOut?.id).toBe('vocab:time-out');
    expect(timeout?.id).not.toBe(timeOut?.id);
  });
});
