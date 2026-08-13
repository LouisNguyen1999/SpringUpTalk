import { describe, expect, it } from 'vitest';
import { evaluateAnswer } from '../engine/answer-evaluator';
import { evaluatorGoldenSet } from './fixtures/evaluator-golden-set';

describe('Evaluator V2 golden set', () => {
  it('contains 300 curated cases', () => expect(evaluatorGoldenSet).toHaveLength(300));
  it.each(evaluatorGoldenSet)('$id: $reason', ({turn,userAnswer,expectedStatus}) => {
    expect(evaluateAnswer(userAnswer,turn).status).toBe(expectedStatus);
  });

  it('reveals the canonical progressively', () => {
    const sample=evaluatorGoldenSet.find((item) => item.expectedStatus === 'incorrect')!;
    expect(evaluateAnswer(sample.userAnswer,sample.turn,{attempt:1}).revealCanonical).toBe(false);
    expect(evaluateAnswer(sample.userAnswer,sample.turn,{attempt:2}).revealCanonical).toBe(false);
    expect(evaluateAnswer(sample.userAnswer,sample.turn,{attempt:3}).revealCanonical).toBe(true);
  });
});
