import { describe, expect, it } from 'vitest';
import { storageDiagnostics } from '../utils/storage-diagnostics';
import { defaultProgress } from '../store/progress-store';
import type { UserProgress } from '../types/domain';

function batchDStressProgress(): UserProgress {
  const timestamp = '2026-08-12T08:00:00.000Z';
  return {
    ...defaultProgress,
    xp:12_500,
    todayXp:80,
    streak:45,
    completedTopics:Array.from({length:50},(_,index) => `active-topic-${index}`),
    completedLessons:Array.from({length:100},(_,index) => `active-conversation-${index}`),
    conversationProgress:Object.fromEntries(Array.from({length:150},(_,index) => {
      const conversationId=`active-conversation-${index}`;
      return [conversationId,{conversationId,topicId:`active-topic-${index%50}`,roles:{
        A:{completedAt:timestamp,attempts:4,accuracy:92,xpEarned:30},
        B:index < 100 ? {completedAt:timestamp,attempts:5,accuracy:88,xpEarned:28} : {attempts:2},
      }}];
    })),
    sentenceProgress:Object.fromEntries(Array.from({length:500},(_,index) => [`active-turn-${index}`,{
      attempts:4,correct:3,incorrectCount:1,firstTryCorrect:2,lastSeenAt:timestamp,lastCorrectAt:timestamp,
      consecutiveCorrect:2,mastery:'familiar' as const,nextReviewAt:'2026-08-19T08:00:00.000Z',
    }])),
    mistakes:Array.from({length:100},(_,index) => ({
      id:`active-mistake-${index}`,turnId:`active-turn-${index}`,topicId:`active-topic-${index%50}`,
      conversationId:`active-conversation-${index%150}`,role:index%2 ? 'A' as const : 'B' as const,
      vietnamese:`Câu luyện tập chủ động số ${index}`,userAnswer:`Learner draft ${index}`,
      canonicalAnswer:`Correct practice sentence number ${index}.`,types:['grammar' as const],createdAt:timestamp,
      reviewCount:index%4,nextReviewAt:`2026-08-${String(13+(index%10)).padStart(2,'0')}T08:00:00.000Z`,
    })),
    vocabulary:Array.from({length:750},(_,index) => ({
      id:`vocab:active-phrase-${index}`,word:`active learning phrase ${index}`,meaning:`cụm học chủ động ${index}`,
      example:`We use active learning phrase ${index} in a realistic exchange.`,exampleVi:`Dùng cụm học chủ động ${index} trong hội thoại thực tế.`,
      sourceTopic:`active-topic-${index%50}`,timesSeen:6,timesCorrect:5,mastery:'strong' as const,favorite:index%20===0,
    })),
    favorites:Array.from({length:15},(_,index) => `vocab:active-phrase-${index*20}`),
    achievements:['first-conversation','seven-day-streak','vocabulary-300'],
  };
}

describe('progress storage diagnostics', () => {
  it('measures UTF-8 bytes without counting actions', () => {
    const result = storageDiagnostics({ word:'xin chào', action:() => undefined });
    expect(result.bytes).toBeGreaterThan('xin chào'.length);
    expect(result.warning).toBe(false);
  });
  it('warns before local persistence becomes unsafe', () => expect(storageDiagnostics({ value:'x'.repeat(2_100_000) }).warning).toBe(true));

  it('measures the Batch D persistence stress profile without persisting content objects', () => {
    const baseline=storageDiagnostics(defaultProgress);
    const profile=batchDStressProgress();
    const active=storageDiagnostics(profile);
    console.info(`Persistence bytes — default:${baseline.bytes} active-user:${active.bytes}`);
    const completedRoles=Object.values(profile.conversationProgress).flatMap((conversation) => Object.values(conversation.roles)).filter((role) => role.completedAt).length;
    expect(completedRoles).toBe(250);
    expect(profile.completedLessons).toHaveLength(100);
    expect(profile.mistakes).toHaveLength(100);
    expect(profile.vocabulary).toHaveLength(750);
    expect(active.bytes).toBeGreaterThan(100_000);
    expect(active.bytes).toBeLessThan(2 * 1024 * 1024);
    expect(active.warning).toBe(false);
    expect(JSON.stringify(profile)).not.toContain('conversations":');
  });
});
