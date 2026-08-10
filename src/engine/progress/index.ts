import type { ConversationProgress, LearningRole, UserProgress } from '../../types/domain';

export type CompletionState = 'not-started' | 'in-progress' | 'completed';

export function isRoleCompleted(progress: ConversationProgress | undefined, role: LearningRole): boolean {
  return Boolean(progress?.roles[role].completedAt);
}

export function completedRoleCount(progress: ConversationProgress | undefined): number {
  return Number(isRoleCompleted(progress, 'A')) + Number(isRoleCompleted(progress, 'B'));
}

export function isConversationCompleted(progress: ConversationProgress | undefined): boolean {
  return isRoleCompleted(progress, 'A') && isRoleCompleted(progress, 'B');
}

export function conversationCompletionState(progress: ConversationProgress | undefined): CompletionState {
  const count = completedRoleCount(progress);
  return count === 2 ? 'completed' : count === 1 ? 'in-progress' : 'not-started';
}

export function topicRoleCounts(
  conversationProgress: UserProgress['conversationProgress'],
  topicId: string,
  conversationCount: number,
): { completed: number; total: number; percent: number; state: CompletionState } {
  const completed = Object.values(conversationProgress)
    .filter((item) => item.topicId === topicId)
    .reduce((sum, item) => sum + completedRoleCount(item), 0);
  const total = conversationCount * 2;
  const capped = Math.min(completed, total);
  return {
    completed:capped,
    total,
    percent:total ? Math.round((capped / total) * 100) : 0,
    state:capped === total && total > 0 ? 'completed' : capped > 0 ? 'in-progress' : 'not-started',
  };
}

export function isTopicCompleted(
  conversationProgress: UserProgress['conversationProgress'],
  topicId: string,
  requiredConversationIds: readonly string[],
): boolean {
  return requiredConversationIds.length > 0 && requiredConversationIds.every((id) => isConversationCompleted(conversationProgress[id]));
}

export function nextMissingRole(progress: ConversationProgress | undefined): LearningRole {
  if (!isRoleCompleted(progress, 'A')) return 'A';
  return 'B';
}

export function rolesPracticed(conversationProgress: UserProgress['conversationProgress']): number {
  return Object.values(conversationProgress).reduce((sum, item) => sum + completedRoleCount(item), 0);
}

export function conversationsMastered(conversationProgress: UserProgress['conversationProgress']): number {
  return Object.values(conversationProgress).filter(isConversationCompleted).length;
}
