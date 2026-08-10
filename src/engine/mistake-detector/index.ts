import type { CommonMistake, Mistake } from '../../types/domain';
import { normalizeSentence, tokenize } from '../sentence-normalizer';

export function detectCommonMistakes(answer: string, rules: CommonMistake[] = []): Mistake[] {
  const normalized = normalizeSentence(answer);
  return rules
    .filter((rule) => {
      try {
        return new RegExp(rule.pattern, 'i').test(normalized);
      } catch {
        return normalized.includes(normalizeSentence(rule.pattern));
      }
    })
    .map((rule) => ({
      type: rule.type,
      original: answer,
      correction: rule.correction,
      explanation: rule.explanation,
    }));
}

export function detectTokenMistakes(answer: string, canonical: string): Mistake[] {
  const actual = tokenize(answer);
  const expected = tokenize(canonical);
  const mistakes: Mistake[] = [];
  const missing = expected.filter((token) => !actual.includes(token));
  const extra = actual.filter((token) => !expected.includes(token));

  if (missing.length > 0 && missing.length <= 3) {
    mistakes.push({
      type: 'missing-word',
      original: missing.join(', '),
      correction: missing.join(', '),
      explanation: `Câu cần thêm ${missing.map((word) => `“${word}”`).join(', ')} để đủ ý hoặc đúng cấu trúc.`,
    });
  }
  if (extra.length > 0 && extra.length <= 2) {
    mistakes.push({
      type: 'unnecessary-word',
      original: extra.join(', '),
      correction: '',
      explanation: `${extra.map((word) => `“${word}”`).join(', ')} không cần thiết trong cách diễn đạt này.`,
    });
  }
  return mistakes;
}
