import { tokenize } from '../sentence-normalizer';

function levenshtein(a: string[], b: string[]): number {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        (current[j - 1] ?? 0) + 1,
        (previous[j] ?? 0) + 1,
        (previous[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[b.length] ?? 0;
}

export function tokenSimilarity(a: string, b: string): number {
  const left = tokenize(a);
  const right = tokenize(b);
  const longest = Math.max(left.length, right.length);
  if (longest === 0) return 1;
  return Math.max(0, 1 - levenshtein(left, right) / longest);
}

export function keywordCoverage(answer: string, keywords: string[]): number {
  if (keywords.length === 0) return 1;
  const tokens = new Set(tokenize(answer));
  const found = keywords.filter((keyword) => tokenize(keyword).every((token) => tokens.has(token)));
  return found.length / keywords.length;
}
