// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { writingEvaluatorGoldenSet } from '../data/writing/writing-evaluator-golden-set';

describe('writing evaluator golden set', () => {
  it('contains the manually reviewed target distribution', () => {
    expect(writingEvaluatorGoldenSet).toHaveLength(500);
    expect(writingEvaluatorGoldenSet.filter((item) => item.polarity === 'positive')).toHaveLength(300);
    expect(writingEvaluatorGoldenSet.filter((item) => item.polarity === 'negative')).toHaveLength(200);
    expect(writingEvaluatorGoldenSet.filter((item) => item.topic.domain === 'daily-life')).toHaveLength(300);
    expect(writingEvaluatorGoldenSet.filter((item) => item.topic.domain === 'it-work')).toHaveLength(200);
    expect(['A1', 'A2', 'B1', 'B2'].map((level) =>
      writingEvaluatorGoldenSet.filter((item) => item.topic.level === level).length)).toEqual([100, 130, 150, 120]);
  });

  it('contains unique reviewed cases with explicit reasons and expectations', () => {
    expect(new Set(writingEvaluatorGoldenSet.map((item) => item.id)).size).toBe(500);
    expect(writingEvaluatorGoldenSet.every((item) => item.userAnswer.trim() && item.reason.trim())).toBe(true);
    expect(writingEvaluatorGoldenSet.every((item) => item.expectedStatus ===
      (item.polarity === 'positive' ? 'communicates-well' : 'needs-improvement'))).toBe(true);
  });
});
