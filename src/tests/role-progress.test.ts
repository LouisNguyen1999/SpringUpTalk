import { beforeEach, describe, expect, it } from 'vitest';
import { completedRoleCount, isConversationCompleted, isRoleCompleted, isTopicCompleted, topicRoleCounts } from '../engine/progress';
import { CURRENT_PROGRESS_VERSION, defaultProgress, migrateProgress, useProgressStore } from '../store/progress-store';
import type { LearningRole, UserProgress } from '../types/domain';

const conversationIds = ['conversation-1','conversation-2','conversation-3'];

function complete(conversationId: string, role: LearningRole) {
  return useProgressStore.getState().completeConversationRole({
    conversationId,
    topicId:'topic-1',
    topicConversationIds:conversationIds,
    role,
    accuracy:90,
    sessionXp:30,
    roleBonusXp:20,
  });
}

describe('two-sided conversation progress', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState({ ...defaultProgress, completedTopics:[], completedLessons:[], conversationProgress:{}, sentenceProgress:{}, mistakes:[], vocabulary:[] });
  });

  it('keeps the conversation in progress after Role A only', () => {
    const outcome = complete('conversation-1','A');
    const progress = useProgressStore.getState().conversationProgress['conversation-1'];
    expect(isRoleCompleted(progress,'A')).toBe(true);
    expect(isRoleCompleted(progress,'B')).toBe(false);
    expect(isConversationCompleted(progress)).toBe(false);
    expect(outcome).toMatchObject({ rolesCompleted:1, conversationCompleted:false });
    expect(useProgressStore.getState().completedLessons).not.toContain('conversation-1');
  });

  it('completes a conversation when B follows A', () => {
    complete('conversation-1','A');
    const outcome = complete('conversation-1','B');
    expect(isConversationCompleted(useProgressStore.getState().conversationProgress['conversation-1'])).toBe(true);
    expect(outcome).toMatchObject({ rolesCompleted:2, conversationCompleted:true, conversationWasNew:true, completionXp:30 });
    expect(useProgressStore.getState().completedLessons).toContain('conversation-1');
  });

  it('keeps the conversation in progress when B is completed first', () => {
    const outcome = complete('conversation-1','B');
    const progress = useProgressStore.getState().conversationProgress['conversation-1'];
    expect(isRoleCompleted(progress,'A')).toBe(false);
    expect(isRoleCompleted(progress,'B')).toBe(true);
    expect(outcome.conversationCompleted).toBe(false);
  });

  it('also completes in B-then-A order', () => {
    complete('conversation-1','B');
    expect(complete('conversation-1','A').conversationCompleted).toBe(true);
  });

  it('preserves one completed role through persistence hydration', () => {
    complete('conversation-1','A');
    const serialized = JSON.parse(JSON.stringify(useProgressStore.getState())) as UserProgress;
    const hydrated = migrateProgress(serialized,CURRENT_PROGRESS_VERSION);
    expect(isRoleCompleted(hydrated.conversationProgress['conversation-1'],'A')).toBe(true);
    expect(isRoleCompleted(hydrated.conversationProgress['conversation-1'],'B')).toBe(false);
  });

  it('does not complete a three-conversation topic at five of six roles', () => {
    complete('conversation-1','A'); complete('conversation-1','B');
    complete('conversation-2','A'); complete('conversation-2','B');
    complete('conversation-3','A');
    const state = useProgressStore.getState();
    expect(topicRoleCounts(state.conversationProgress,'topic-1',3)).toMatchObject({ completed:5, total:6, state:'in-progress' });
    expect(isTopicCompleted(state.conversationProgress,'topic-1',conversationIds)).toBe(false);
    expect(state.completedTopics).not.toContain('topic-1');
  });

  it('completes a topic only after all six roles', () => {
    for (const id of conversationIds) { complete(id,'A'); complete(id,'B'); }
    const state = useProgressStore.getState();
    expect(isTopicCompleted(state.conversationProgress,'topic-1',conversationIds)).toBe(true);
    expect(state.completedTopics).toContain('topic-1');
  });

  it('does not grant completion XP again when replaying Role A', () => {
    complete('conversation-1','A'); complete('conversation-1','B');
    const before = useProgressStore.getState();
    const bCompletedAt = before.conversationProgress['conversation-1']?.roles.B.completedAt;
    const xp = before.xp;
    const replay = complete('conversation-1','A');
    const after = useProgressStore.getState();
    expect(replay).toMatchObject({ roleWasNew:false, conversationWasNew:false, conversationCompleted:true, completionXp:0 });
    expect(after.xp).toBe(xp);
    expect(after.conversationProgress['conversation-1']?.roles.B.completedAt).toBe(bCompletedAt);
    expect(completedRoleCount(after.conversationProgress['conversation-1'])).toBe(2);
  });
});

describe('V4 to V5 migration', () => {
  it('preserves unrelated progress and only infers a role supported by practiced turns', () => {
    const old = {
      ...defaultProgress,
      version:4,
      xp:480,
      todayXp:20,
      streak:7,
      completedLessons:['legacy-conversation'],
      completedTopics:['legacy-topic'],
      conversationProgress:undefined,
      sentenceProgress:{
        'legacy-conversation-t1':{ attempts:2, correct:1, lastSeenAt:'2026-08-01T10:00:00.000Z', mastery:'learning' as const },
        'unrelated-turn':{ attempts:5, correct:5, lastSeenAt:'2026-08-02T10:00:00.000Z', mastery:'mastered' as const },
      },
      vocabulary:[{ id:'vocab:test', word:'test', meaning:'kiểm tra', example:'Test it.', sourceTopic:'legacy-topic', timesSeen:2, timesCorrect:1, mastery:'learning' as const, favorite:true }],
      mistakes:[{ id:'m1', turnId:'legacy-conversation-t1', topicId:'legacy-topic', conversationId:'legacy-conversation', vietnamese:'x', userAnswer:'x', canonicalAnswer:'y', types:['grammar' as const], createdAt:'2026-08-01T10:00:00.000Z', reviewCount:1 }],
      settings:{ ...defaultProgress.settings, soundEnabled:false },
    };
    const migrated = migrateProgress(old,4);
    expect(migrated).toMatchObject({ version:CURRENT_PROGRESS_VERSION, xp:480, todayXp:20, streak:7 });
    expect(migrated.vocabulary).toHaveLength(1);
    expect(migrated.mistakes).toHaveLength(1);
    expect(migrated.sentenceProgress['unrelated-turn']?.mastery).toBe('mastered');
    expect(migrated.settings.soundEnabled).toBe(false);
    expect(isRoleCompleted(migrated.conversationProgress['legacy-conversation'],'A')).toBe(true);
    expect(isRoleCompleted(migrated.conversationProgress['legacy-conversation'],'B')).toBe(false);
    expect(migrated.completedLessons).toEqual([]);
    expect(migrated.completedTopics).toEqual([]);
  });
});
