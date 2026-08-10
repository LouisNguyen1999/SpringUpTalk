import { beforeEach, describe, expect, it } from 'vitest';
import { defaultProgress, useProgressStore } from '../store/progress-store';

describe('progress store content scaling', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState(defaultProgress);
  });

  it('merges vocabulary spelling variants by canonical key', () => {
    const item = { word: 'Wi-Fi', meaning: 'mạng không dây', example: 'The Wi-Fi is stable.' };
    useProgressStore.getState().markVocabularySeen([item], 'wifi-problem', true);
    useProgressStore.getState().markVocabularySeen([{ ...item, word: 'wifi' }], 'coffee-shop-orders', false);

    const vocabulary = useProgressStore.getState().vocabulary;
    expect(vocabulary).toHaveLength(1);
    expect(vocabulary[0]).toMatchObject({ id: 'vocab:wifi', timesSeen: 2, timesCorrect: 1, sourceTopic: 'wifi-problem' });
  });

  it('updates a repeated mistake instead of duplicating the review queue item', () => {
    const payload = {
      turnId: 'turn-1', topicId: 'topic-1', conversationId: 'conversation-1', role:'A' as const, vietnamese: 'Bạn khỏe không?',
      result: { status: 'incorrect' as const, score: 0, userAnswer: 'Wrong', canonicalAnswer: 'How are you?', mistakes: [], explanation: [], suggestions: [], naturalAlternatives: [] },
      xp: 0, vocabulary: [], firstTry: true,
    };
    useProgressStore.getState().recordAnswer(payload);
    useProgressStore.getState().recordAnswer(payload);
    expect(useProgressStore.getState().mistakes).toHaveLength(1);
    expect(useProgressStore.getState().mistakes[0]?.reviewCount).toBe(1);
  });

  it('tracks first-try accuracy and schedules a mastered sentence', () => {
    const result = { status:'correct' as const, score:100, userAnswer:'How are you?', canonicalAnswer:'How are you?', mistakes:[], explanation:[], suggestions:[], naturalAlternatives:[] };
    for (let index = 0; index < 5; index += 1) useProgressStore.getState().recordAnswer({ turnId:'turn-mastered', topicId:'topic-1', conversationId:'conversation-1', role:'A', vietnamese:'Bạn khỏe không?', result, xp:10, vocabulary:[], firstTry:true });
    expect(useProgressStore.getState().sentenceProgress['turn-mastered']).toMatchObject({ attempts:5, correct:5, firstTryCorrect:5, consecutiveCorrect:5, mastery:'mastered' });
  });

  it('increments the daily streak exactly once when turn XP reaches the goal', () => {
    useProgressStore.setState({ dailyGoal:5, streak:0, todayXp:0 });
    const result = { status:'correct' as const, score:100, userAnswer:'Hello.', canonicalAnswer:'Hello.', mistakes:[], explanation:[], suggestions:[], naturalAlternatives:[] };
    useProgressStore.getState().recordAnswer({ turnId:'streak-turn', topicId:'topic-1', conversationId:'conversation-1', role:'A', vietnamese:'Xin chào.', result, xp:10, vocabulary:[], firstTry:true });
    expect(useProgressStore.getState().streak).toBe(1);
    useProgressStore.getState().completeConversationRole({ conversationId:'conversation-1', topicId:'topic-1', topicConversationIds:['conversation-1'], role:'A', accuracy:100, sessionXp:10, roleBonusXp:20 });
    expect(useProgressStore.getState().streak).toBe(1);
  });
});
