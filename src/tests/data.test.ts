import { describe, expect, it } from 'vitest';
import { topics } from '../data';
import { evaluateAnswer } from '../engine/answer-evaluator';

describe('conversation dataset', () => {
  it('has at least fifty real topics with valid conversation lengths', () => {
    expect(topics.length).toBeGreaterThanOrEqual(50);
    for (const topic of topics) {
      expect(topic.conversations.length).toBeGreaterThanOrEqual(2);
      expect(topic.conversations.length).toBeLessThanOrEqual(5);
      for (const conversation of topic.conversations) {
        expect(conversation.turns.length).toBeGreaterThanOrEqual(6);
        expect(conversation.turns.length).toBeLessThanOrEqual(10);
      }
    }
  });

  it('has unique IDs and complete runtime fields', () => {
    const ids=new Set<string>();
    for(const topic of topics){
      expect(ids.has(topic.id)).toBe(false); ids.add(topic.id);
      expect(['A1','A2','B1','B2']).toContain(topic.level);
      for(const conversation of topic.conversations){
        expect(conversation.situation).toBeTruthy(); expect(conversation.goal).toBeTruthy();
        expect(ids.has(conversation.id)).toBe(false); ids.add(conversation.id);
        for(const turn of conversation.turns){
          expect(['A','B']).toContain(turn.speaker);
          expect(turn.vietnamese).toBeTruthy(); expect(turn.canonicalAnswer).toBeTruthy(); expect(turn.hint).toBeTruthy();
          expect(turn.acceptedAnswers).toContain(turn.canonicalAnswer);
          expect(new Set(turn.acceptedAnswers.map((answer) => answer.toLowerCase())).size).toBe(turn.acceptedAnswers.length);
          expect(ids.has(turn.id)).toBe(false); ids.add(turn.id);
          for (const word of turn.vocabulary ?? []) { expect(word.word).toBeTruthy(); expect(word.meaning).toBeTruthy(); expect(word.example).toBeTruthy(); }
        }
      }
    }
  }, 20_000);

  it('accepts every canonical and curated accepted answer', () => {
    for (const topic of topics) for (const conversation of topic.conversations) for (const turn of conversation.turns) {
      expect(evaluateAnswer(turn.canonicalAnswer, turn).status).toBe('correct');
      for (const accepted of turn.acceptedAnswers) expect(evaluateAnswer(accepted, turn).status).toBe('correct');
    }
  }, 20_000);
});
