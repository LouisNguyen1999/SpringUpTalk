import type {
  DailyLearningFocus,
  DailyLearningHistoryEntry,
  DailyLearningItem,
  DailyLearningPreferences,
  DailyLearningSession,
  Difficulty,
  TopicManifestItem,
  UserProgress,
  VocabularySummary,
  WritingLearningMetadata,
  WritingTopicSummary,
} from '../../types/domain';
import { localDateKey, localDayStart } from '../../utils/local-date';
import {
  buildWritingPathState,
  rankedWritingWeakSkills,
  writingMasterySkillsForTopic,
  writingVariantForTopic,
} from '../writing-learning-path';
import { rankedWeakWritingMastery } from '../writing-mastery';
export { dailyItemKey, dailySessionCounts, isDailySessionComplete } from './session';

export interface DailyLearningCatalog {
  conversations: readonly TopicManifestItem[];
  vocabulary: readonly VocabularySummary[];
  writing: readonly WritingTopicSummary[];
  writingPath?: readonly WritingLearningMetadata[];
}

interface Candidate extends Omit<DailyLearningItem, 'id' | 'status'> {
  key: string;
}

const MODE_PLAN = {
  quick: { total: 8, conversation: 1, vocabulary: 5, writing: 1, dueCap: 5, minutes: 10 },
  standard: { total: 15, conversation: 2, vocabulary: 8, writing: 1, dueCap: 9, minutes: 20 },
  focus: { total: 23, conversation: 3, vocabulary: 13, writing: 2, dueCap: 15, minutes: 30 },
} as const;

const LEVEL_VALUE: Record<Difficulty, number> = { A1: 0, A2: 1, B1: 2, B2: 3 };

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function overdueDays(value: string | undefined, now: Date): number {
  if (!value) return 0;
  return Math.max(0, Math.floor((localDayStart(now).getTime() - Date.parse(value)) / 86_400_000));
}

function candidateId(date: string, candidate: Candidate): string {
  return `${date}:${candidate.kind}:${candidate.key}`;
}

function focusBonus(focus: DailyLearningFocus, target: Candidate['target']): number {
  return focus === target ? 140 : focus === 'balanced' ? 0 : -20;
}

function sortCandidates(candidates: Candidate[], date: string): Candidate[] {
  return candidates.sort(
    (left, right) =>
      right.priority - left.priority ||
      hash(`${date}:${left.key}`) - hash(`${date}:${right.key}`) ||
      left.key.localeCompare(right.key),
  );
}

function orderForVariety(items: Candidate[]): Candidate[] {
  const buckets = (['vocabulary', 'conversation', 'writing'] as const)
    .map((target) => ({ target, items: items.filter((item) => item.target === target) }))
    .filter((bucket) => bucket.items.length)
    .sort((left, right) => right.items.length - left.items.length);
  const primary = buckets[0];
  if (!primary || buckets.length === 1) return items;
  const secondary = buckets.slice(1).flatMap((bucket) => bucket.items)
    .sort((left, right) => right.priority - left.priority);
  const chunkSize = Math.max(1, Math.ceil(primary.items.length / (secondary.length + 1)));
  const ordered: Candidate[] = [];
  let primaryIndex = 0;
  for (const item of secondary) {
    ordered.push(...primary.items.slice(primaryIndex, primaryIndex + chunkSize), item);
    primaryIndex += chunkSize;
  }
  ordered.push(...primary.items.slice(primaryIndex));
  return ordered;
}

function historyCooldown(history: readonly DailyLearningHistoryEntry[]): Set<string> {
  return new Set(history.slice(-7).flatMap((entry) => entry.recentItemKeys ?? []));
}

function addCandidate(map: Map<string, Candidate>, candidate: Candidate) {
  const existing = map.get(candidate.key);
  if (!existing || candidate.priority > existing.priority) map.set(candidate.key, candidate);
}

export function buildDailyLearningSession(
  state: UserProgress,
  preferences: DailyLearningPreferences,
  catalog: DailyLearningCatalog,
  now = new Date(),
): DailyLearningSession {
  const date = localDateKey(now);
  const plan = MODE_PLAN[preferences.mode];
  const candidates = new Map<string, Candidate>();
  const recent = historyCooldown(state.dailyLearningHistory ?? []);
  const nowMs = now.getTime();
  const level = LEVEL_VALUE[state.currentLevel];
  const pathMetadata = new Map((catalog.writingPath ?? []).map((item) => [item.topicId, item]));
  const currentWritingUnitId = catalog.writingPath
    ? buildWritingPathState(state).find((item) => item.current)?.unit.id
    : undefined;
  const weakWritingSkills = new Set(rankedWritingWeakSkills(state.writingProgress).map((item) => item.skill));
  const weakWritingMastery = new Set(rankedWeakWritingMastery(state.writingSkillProgress, now).map((item) => item.skill));
  const practicedWritingIds = new Set(Object.keys(state.writingProgress));

  for (const mistake of state.mistakes) {
    if (mistake.vocabularyId) continue;
    const sentence = state.sentenceProgress[mistake.turnId];
    if (!sentence?.nextReviewAt || Date.parse(sentence.nextReviewAt) > nowMs) continue;
    const key = `conversation:${mistake.conversationId}:${mistake.role ?? 'A'}`;
    addCandidate(candidates, {
      key,
      kind: 'review',
      target: 'conversation',
      reason: mistake.reviewCount > 1 ? 'repeated-mistake' : 'due-review',
      mandatory: true,
      priority: 1_100 + overdueDays(sentence.nextReviewAt, now) * 4 + mistake.reviewCount * 12 + focusBonus(preferences.focus, 'conversation'),
      topicId: mistake.topicId,
      conversationId: mistake.conversationId,
      role: mistake.role ?? 'A',
    });
  }

  for (const progress of state.vocabulary) {
    if (!progress.nextReviewAt || Date.parse(progress.nextReviewAt) > nowMs) continue;
    addCandidate(candidates, {
      key: `vocabulary:${progress.id}`,
      kind: 'review',
      target: 'vocabulary',
      reason: (progress.incorrectCount ?? 0) > 1 ? 'repeated-mistake' : 'due-review',
      mandatory: true,
      priority: 1_080 + overdueDays(progress.nextReviewAt, now) * 4 + (progress.incorrectCount ?? 0) * 8 + focusBonus(preferences.focus, 'vocabulary'),
      vocabularyId: progress.id,
    });
  }

  for (const progress of Object.values(state.writingProgress)) {
    if (!progress.nextReviewAt || Date.parse(progress.nextReviewAt) > nowMs || !progress.attempts.length) continue;
    const weakness = Math.max(0, ...Object.values(progress.weaknessCounts ?? {}).map(Number));
    const variant = progress.recommendedReviewMode === 'exact-retry'
      ? undefined
      : writingVariantForTopic(progress.topicId, practicedWritingIds);
    const reviewTopicId = variant?.topicId ?? progress.topicId;
    addCandidate(candidates, {
      key: `writing:${reviewTopicId}`,
      kind: 'review',
      target: 'writing',
      reason: weakness > 1 ? 'repeated-mistake' : 'due-review',
      mandatory: true,
      priority: 1_090 + overdueDays(progress.nextReviewAt, now) * 4 + weakness * 14 + focusBonus(preferences.focus, 'writing'),
      writingTopicId: reviewTopicId,
    });
  }

  for (const progress of Object.values(state.conversationProgress)) {
    for (const role of ['A', 'B'] as const) {
      if (progress.roles[role].completedAt) continue;
      addCandidate(candidates, {
        key: `conversation:${progress.conversationId}:${role}`,
        kind: 'conversation',
        target: 'conversation',
        reason: 'missing-role',
        mandatory: false,
        priority: 820 + focusBonus(preferences.focus, 'conversation'),
        topicId: progress.topicId,
        conversationId: progress.conversationId,
        role,
      });
    }
  }

  for (const progress of state.vocabulary) {
    if (progress.mastery === 'mastered' || !progress.practiceCount) continue;
    const accuracy = (progress.targetUsageCorrectCount ?? 0) / Math.max(1, progress.practiceCount);
    addCandidate(candidates, {
      key: `vocabulary:${progress.id}`,
      kind: 'vocabulary',
      target: 'vocabulary',
      reason: 'weak-mastery',
      mandatory: false,
      priority: 650 + Math.round((1 - accuracy) * 100) + (progress.incorrectCount ?? 0) * 6 + focusBonus(preferences.focus, 'vocabulary'),
      vocabularyId: progress.id,
    });
  }

  for (const progress of Object.values(state.writingProgress)) {
    if (!progress.attempts.length || progress.mastery === 'mastered') continue;
    const weakness = Math.max(0, ...Object.values(progress.weaknessCounts ?? {}).map(Number));
    addCandidate(candidates, {
      key: `writing:${progress.topicId}`,
      kind: 'writing',
      target: 'writing',
      reason: 'weak-mastery',
      mandatory: false,
      priority: 690 + weakness * 18 + focusBonus(preferences.focus, 'writing'),
      writingTopicId: progress.topicId,
    });
  }

  for (const topic of catalog.conversations) {
    if (LEVEL_VALUE[topic.level] > level) continue;
    for (let number = 1; number <= topic.conversationCount; number += 1) {
      const conversationId = `${topic.id}-c${number}`;
      if (state.conversationProgress[conversationId]) continue;
      const key = `conversation:${conversationId}:A`;
      addCandidate(candidates, {
        key,
        kind: 'conversation',
        target: 'conversation',
        reason: 'new-content',
        mandatory: false,
        priority: 210 + (topic.level === state.currentLevel ? 30 : 0) - (recent.has(key) ? 120 : 0) + focusBonus(preferences.focus, 'conversation'),
        topicId: topic.id,
        conversationId,
        role: 'A',
      });
    }
  }

  const knownVocabulary = new Set(state.vocabulary.map((item) => item.id));
  for (const item of catalog.vocabulary) {
    if (!item.practiceCount || (item.cefr && LEVEL_VALUE[item.cefr] > level) || knownVocabulary.has(item.id)) continue;
    const key = `vocabulary:${item.id}`;
    addCandidate(candidates, {
      key,
      kind: 'vocabulary',
      target: 'vocabulary',
      reason: 'new-content',
      mandatory: false,
      priority: 200 + (item.cefr === state.currentLevel ? 25 : 0) - (recent.has(key) ? 120 : 0) + focusBonus(preferences.focus, 'vocabulary'),
      vocabularyId: item.id,
    });
  }

  for (const item of catalog.writing) {
    if (LEVEL_VALUE[item.level] > level || state.writingProgress[item.id]) continue;
    const key = `writing:${item.id}`;
    const metadata = pathMetadata.get(item.id);
    const weakSkillMatch = (metadata?.skills.some((skill) => weakWritingSkills.has(skill)) ?? false) ||
      writingMasterySkillsForTopic(item.id).some((skill) => weakWritingMastery.has(skill));
    const currentUnitBonus = metadata?.unitId === currentWritingUnitId ? 70 : 0;
    const pathOrderBonus = metadata ? Math.max(0, 30 - Math.floor((metadata.order - 1) / 2)) : 0;
    addCandidate(candidates, {
      key,
      kind: 'writing',
      target: 'writing',
      reason: weakSkillMatch ? 'weak-skill' : 'new-content',
      mandatory: false,
      priority: 205 + currentUnitBonus + pathOrderBonus + (weakSkillMatch ? 55 : 0) + (item.level === state.currentLevel ? 25 : 0) - (recent.has(key) ? 120 : 0) + focusBonus(preferences.focus, 'writing'),
      writingTopicId: item.id,
    });
  }

  const all = sortCandidates([...candidates.values()], date);
  const due = all.filter((item) => item.kind === 'review');
  const isNewUser = !state.mistakes.length && !state.vocabulary.length && !Object.keys(state.conversationProgress).length && !Object.keys(state.writingProgress).length;
  const total = isNewUser ? 7 : plan.total;
  const maxNew = isNewUser ? total : Math.ceil(total * 0.4);
  const hasNonNewPool = all.some((candidate) => candidate.reason !== 'new-content');
  const selected: Candidate[] = [];
  const selectedKeys = new Set<string>();
  const add = (item: Candidate | undefined) => {
    if (!item || selectedKeys.has(item.key)) return;
    selected.push(item);
    selectedKeys.add(item.key);
  };
  const dueLimit = due.length >= plan.total ? plan.total : Math.min(plan.dueCap, due.length);
  due.slice(0, dueLimit).forEach(add);

  const targetPlan = {
    conversation: isNewUser ? 1 : plan.conversation + (preferences.focus === 'conversation' ? 2 : 0),
    vocabulary: isNewUser ? 5 : plan.vocabulary + (preferences.focus === 'vocabulary' ? 3 : 0),
    writing: isNewUser ? 1 : plan.writing + (preferences.focus === 'writing' ? 1 : 0),
  };
  for (const target of ['conversation', 'vocabulary', 'writing'] as const) {
    const count = selected.filter((item) => item.target === target).length;
    all.filter((item) => item.target === target && item.kind !== 'review')
      .slice(0, Math.max(0, targetPlan[target] - count))
      .forEach((item) => {
        const newCount = selected.filter((candidate) => candidate.reason === 'new-content').length;
        if (item.reason !== 'new-content' || !hasNonNewPool || newCount < maxNew) add(item);
      });
  }

  for (const item of all) {
    if (selected.length >= total) break;
    const newCount = selected.filter((candidate) => candidate.reason === 'new-content').length;
    if (item.reason === 'new-content' && newCount >= maxNew && all.some((candidate) => candidate.reason !== 'new-content' && !selectedKeys.has(candidate.key))) continue;
    add(item);
  }

  const ordered = orderForVariety(selected.slice(0, total));
  const createdAt = now.toISOString();
  const items: DailyLearningItem[] = ordered.map((candidate) => {
    const item: Partial<Candidate> = { ...candidate };
    delete item.key;
    return { ...item, id: candidateId(date, candidate), status: 'pending' } as DailyLearningItem;
  });
  return {
    id: `daily:${date}:${preferences.mode}:${preferences.focus}`,
    date,
    estimatedMinutes: Math.max(5, Math.round(plan.minutes * (items.length / plan.total))),
    mode: preferences.mode,
    focus: preferences.focus,
    status: 'not-started',
    items,
    currentItemId: items[0]?.id,
    createdAt,
    updatedAt: createdAt,
    xpAtStart: state.xp,
    streakAwarded: false,
  };
}
