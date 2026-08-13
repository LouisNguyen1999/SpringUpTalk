export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchTextMatches(value: string, query: string): boolean {
  const normalizedValue = normalizeSearchText(value);
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  return normalizedValue.includes(normalizedQuery)
    || normalizedValue.replaceAll(' ', '').includes(normalizedQuery.replaceAll(' ', ''));
}

export function searchIndexMatches(normalizedValue: string, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  return normalizedValue.includes(normalizedQuery)
    || normalizedValue.replaceAll(' ', '').includes(normalizedQuery.replaceAll(' ', ''));
}

export function normalizeVocabularyKey(value: string): string {
  return normalizeSearchText(value).replace(/\s+/g, '');
}
