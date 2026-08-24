import type { DailyLearningItem, DailyLearningItemKind } from '../../types/domain';

export function dailyItemKey(item: Pick<DailyLearningItem, 'target' | 'topicId' | 'conversationId' | 'role' | 'vocabularyId' | 'writingTopicId'>): string {
  if (item.target === 'conversation') return `conversation:${item.conversationId}:${item.role}`;
  if (item.target === 'vocabulary') return `vocabulary:${item.vocabularyId}`;
  return `writing:${item.writingTopicId}`;
}

export function dailySessionCounts(items: readonly DailyLearningItem[]): Record<DailyLearningItemKind, number> {
  return items.reduce<Record<DailyLearningItemKind, number>>(
    (counts, item) => ({ ...counts, [item.kind]: counts[item.kind] + 1 }),
    { conversation: 0, vocabulary: 0, writing: 0, review: 0 },
  );
}

export function isDailySessionComplete(items: readonly DailyLearningItem[]): boolean {
  if (!items.length) return false;
  const completed = items.filter((item) => item.status === 'completed').length;
  const mandatoryComplete = items.filter((item) => item.mandatory).every((item) => item.status === 'completed');
  const plannedTargets = new Set(items.map((item) => item.target));
  const practicedTargets = new Set(items.filter((item) => item.status === 'completed').map((item) => item.target));
  const skillMixComplete = [...plannedTargets].every((target) => practicedTargets.has(target));
  return mandatoryComplete && skillMixComplete && completed / items.length >= 0.7;
}
