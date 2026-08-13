import type { VocabularyPracticeItem } from '../../types/domain';
import { normalizeSearchText } from '../../utils/search';

export interface PracticeBankRow {
  item: VocabularyPracticeItem;
  disabled: boolean;
  local: boolean;
}

export function mergeVocabularyPracticeBank(
  staticItems: VocabularyPracticeItem[],
  localItems: VocabularyPracticeItem[],
  disabledIds: string[],
): PracticeBankRow[] {
  const localById = new Map(localItems.map((item) => [item.id, item]));
  const merged = [
    ...staticItems.map((item) => localById.get(item.id) ?? item),
    ...localItems.filter((item) => !staticItems.some((staticItem) => staticItem.id === item.id)),
  ];
  const unique = merged.filter(
    (item, index, all) =>
      all.findIndex(
        (candidate) =>
          normalizeSearchText(candidate.canonicalAnswer) ===
          normalizeSearchText(item.canonicalAnswer),
      ) === index,
  );
  const disabled = new Set(disabledIds);
  return unique.map((item) => ({
    item,
    disabled: disabled.has(item.id),
    local: localById.has(item.id),
  }));
}

export function activeVocabularyPracticeItems(rows: PracticeBankRow[]): VocabularyPracticeItem[] {
  return rows.filter((row) => !row.disabled).map((row) => row.item);
}
