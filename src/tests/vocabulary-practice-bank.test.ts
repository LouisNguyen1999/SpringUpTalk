import { describe, expect, it } from 'vitest';
import {
  activeVocabularyPracticeItems,
  mergeVocabularyPracticeBank,
} from '../data/vocabulary/vocabulary-practice-bank';
import type { VocabularyPracticeItem } from '../types/domain';

function item(id: string, canonicalAnswer: string): VocabularyPracticeItem {
  return {
    id,
    vocabularyId: 'vocab:deadline',
    vietnamese: 'Hạn chót là ngày mai.',
    canonicalAnswer,
    acceptedAnswers: [canonicalAnswer],
    naturalAlternatives: [],
    targetExpressions: ['deadline'],
    grammarFocus: [],
    level: 'A2',
  };
}

describe('editable vocabulary practice bank', () => {
  it('uses a local edit as an override without duplicating the static item', () => {
    const original = item('practice-1', 'The deadline is tomorrow.');
    const edited = { ...original, vietnamese: 'Ngày mai là hạn chót.', custom: true, edited: true };
    const rows = mergeVocabularyPracticeBank([original], [edited], []);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ item: edited, local: true, disabled: false });
  });

  it('deduplicates canonical answers and excludes disabled items from active practice', () => {
    const first = item('practice-1', 'The deadline is tomorrow.');
    const duplicate = item('generated-2', 'The deadline is tomorrow!');
    const second = item('generated-3', 'We must meet the deadline.');
    const rows = mergeVocabularyPracticeBank([first], [duplicate, second], ['generated-3']);
    expect(rows).toHaveLength(2);
    expect(activeVocabularyPracticeItems(rows)).toEqual([first]);
  });
});
