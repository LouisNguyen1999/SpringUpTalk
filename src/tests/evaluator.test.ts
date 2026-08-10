import { describe, expect, it } from 'vitest';
import { evaluateAnswer } from '../engine/answer-evaluator';
import { topics } from '../data';

const turn = topics[0]!.conversations[0]!.turns[0]!;

describe('answer evaluator', () => {
  it('accepts normalized canonical answers', () => expect(evaluateAnswer('  are YOU free this weekend!!! ', turn).status).toBe('correct'));
  it('accepts dataset alternatives', () => expect(evaluateAnswer('Are you available this weekend?', turn).status).toBe('correct'));
  it('returns almost correct for a close answer', () => expect(evaluateAnswer('Are you free weekend', turn).status).toBe('almost-correct'));
  it('detects a known auxiliary mistake', () => {
    const question = topics[2]!.conversations[0]!.turns[0]!;
    const result = evaluateAnswer('How you usually wake up?', question);
    expect(result.status).toBe('incorrect');
    expect(result.mistakes.some((mistake) => mistake.type === 'auxiliary')).toBe(true);
  });
  it('does not mark a similar sentence with the wrong tense as correct', () => {
    const tenseTurn = {
      ...turn,
      canonicalAnswer: 'Did you go to work yesterday?',
      acceptedAnswers: ['Did you go to work yesterday?'],
      requiredKeywords: ['work', 'yesterday'],
    };
    expect(evaluateAnswer('Do you go to work yesterday?', tenseTurn).status).not.toBe('correct');
  });

  it.each([
    ['uses the wrong tense', 'Do you go to work yesterday?'],
    ['omits the auxiliary', 'You go to work yesterday?'],
    ['uses unrelated content', 'The weather is beautiful today.'],
    ['omits the required situation', 'Did you go yesterday?'],
  ])('rejects a negative case that %s', (_case, answer) => {
    const negativeTurn = {
      ...turn,
      canonicalAnswer: 'Did you go to work yesterday?',
      acceptedAnswers: ['Did you go to work yesterday?'],
      requiredKeywords: ['work', 'yesterday'],
    };
    expect(evaluateAnswer(answer, negativeTurn).status).not.toBe('correct');
  });
});
