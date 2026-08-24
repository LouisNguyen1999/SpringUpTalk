import metadataData from '../../data/writing/generated/writing-learning-path.generated.json';
import feedbackIndexData from '../../data/writing/generated/writing-feedback-index.generated.json';
import { writingManifest } from '../../data/writing/writing-repository';
import type {
  Difficulty,
  WritingIdeaKind,
  WritingLearningMetadata,
  WritingLearningUnit,
  WritingMasterySkill,
  WritingPathPreference,
  WritingSkill,
  WritingTopicProgress,
  WritingTopicSummary,
  WritingSkillProgress,
} from '../../types/domain';
import { writingLearningUnits, WRITING_LEVEL_ORDER, WRITING_SKILL_LABELS } from './units';

export { writingLearningUnits, WRITING_LEVEL_ORDER, WRITING_SKILL_LABELS };
export const writingLearningMetadata = metadataData as WritingLearningMetadata[];

const metadataByTopic = new Map(writingLearningMetadata.map((item) => [item.topicId, item]));
const topicById = new Map(writingManifest.map((item) => [item.id, item]));
const unitById = new Map(writingLearningUnits.map((item) => [item.id, item]));
const feedbackIndex = feedbackIndexData as {
  skills: WritingMasterySkill[];
  topics: Array<{ topicId: string; skillMask: number; contextHash: number }>;
};
const feedbackByTopic = new Map(feedbackIndex.topics.map((item) => [item.topicId, item]));

function masterySkillsFromMask(mask: number): WritingMasterySkill[] {
  return feedbackIndex.skills.filter((_, index) => Boolean(mask & (1 << index)));
}

export type WritingPathTopicState = 'New' | 'In Progress' | 'Review Due' | 'Strong' | 'Mastered';

export interface WritingUnitProgress {
  unitId: string;
  total: number;
  practiced: number;
  completed: number;
  masteryReady: number;
  weak: number;
  requiredCompleted: number;
  requiredMastery: number;
  thresholdMet: boolean;
  percent: number;
}

export interface WritingPathState {
  unit: WritingLearningUnit;
  progress: WritingUnitProgress;
  recommendedUnlocked: boolean;
  completed: boolean;
  current: boolean;
}

export type ContinueWritingReason = 'draft' | 'due-review' | 'weak-skill' | 'next-path-topic';

export interface ContinueWritingRecommendation {
  topic: WritingTopicSummary;
  metadata: WritingLearningMetadata;
  unit: WritingLearningUnit;
  reason: ContinueWritingReason;
  weakSkill?: WritingSkill;
  masterySkill?: WritingMasterySkill;
  reviewMode?: 'exact-retry' | 'variant-retry' | 'skill-retry';
  sourceTopicId?: string;
}

type WritingPathProgress = {
  writingProgress: Record<string, WritingTopicProgress>;
  writingDrafts: Record<string, string>;
  writingPathPreference: WritingPathPreference;
  writingCurrentUnitId?: string;
  writingSkillProgress?: Partial<Record<WritingMasterySkill, WritingSkillProgress>>;
};

const matchesPreference = (topic: WritingTopicSummary, preference: WritingPathPreference) =>
  preference === 'all' || topic.domain === preference;

const isSuccessful = (progress?: WritingTopicProgress) => Boolean(
  progress?.bestAttempt?.status === 'communicates-well' &&
  progress.bestAttempt.meaningCoverage >= 0.8 &&
  progress.bestAttempt.criticalErrorIds.length === 0,
);

const isWeak = (progress?: WritingTopicProgress) => {
  if (!progress?.attempts.length) return false;
  const latest = progress.attempts.at(-1);
  return Boolean(
    !latest ||
    latest.meaningCoverage < 0.8 ||
    latest.criticalErrorIds.length > 0 ||
    latest.missingIdeaKinds.length >= 2,
  );
};

export function writingMetadataFor(topicId: string): WritingLearningMetadata | undefined {
  return metadataByTopic.get(topicId);
}

export function writingUnitForTopic(topicId: string): WritingLearningUnit | undefined {
  const metadata = metadataByTopic.get(topicId);
  return metadata ? unitById.get(metadata.unitId) : undefined;
}

export function topicsForWritingUnit(
  unitId: string,
  preference: WritingPathPreference = 'all',
): WritingTopicSummary[] {
  return writingLearningMetadata
    .filter((item) => item.unitId === unitId)
    .sort((left, right) => left.order - right.order)
    .map((item) => topicById.get(item.topicId))
    .filter((item): item is WritingTopicSummary => Boolean(item && matchesPreference(item, preference)));
}

export function orderedWritingTopics(
  preference: WritingPathPreference = 'all',
): WritingTopicSummary[] {
  return writingLearningUnits.flatMap((unit) => topicsForWritingUnit(unit.id, preference));
}

export function visibleWritingUnits(
  preference: WritingPathPreference = 'all',
): WritingLearningUnit[] {
  return writingLearningUnits.filter((unit) => topicsForWritingUnit(unit.id, preference).length > 0);
}

export function writingTopicState(
  topicId: string,
  progress: WritingTopicProgress | undefined,
  hasDraft: boolean,
  now = new Date(),
): WritingPathTopicState {
  if (progress?.attempts.length && Date.parse(progress.nextReviewAt) <= now.getTime()) return 'Review Due';
  if (progress?.mastery === 'mastered') return 'Mastered';
  if (isSuccessful(progress)) return 'Strong';
  if (hasDraft || progress?.attempts.length) return 'In Progress';
  return 'New';
}

export function writingUnitProgress(
  unitId: string,
  progressByTopic: Record<string, WritingTopicProgress>,
  preference: WritingPathPreference = 'all',
): WritingUnitProgress {
  const topics = topicsForWritingUnit(unitId, preference);
  const progress = topics.map((topic) => progressByTopic[topic.id]);
  const total = topics.length;
  const practiced = progress.filter((item) => item?.attempts.length).length;
  const completed = progress.filter(isSuccessful).length;
  const masteryReady = progress.filter((item) => isSuccessful(item) || item?.mastery === 'mastered').length;
  const weak = progress.filter(isWeak).length;
  const requiredCompleted = Math.ceil(total * 0.7);
  const requiredMastery = Math.ceil(total * 0.6);
  const thresholdMet = total === 0 || (
    completed >= requiredCompleted &&
    masteryReady >= requiredMastery &&
    weak <= Math.floor(total * 0.25)
  );
  return {
    unitId,
    total,
    practiced,
    completed,
    masteryReady,
    weak,
    requiredCompleted,
    requiredMastery,
    thresholdMet,
    percent: total ? Math.round(completed / total * 100) : 100,
  };
}

export function buildWritingPathState(
  state: WritingPathProgress,
  preference = state.writingPathPreference,
): WritingPathState[] {
  const units = visibleWritingUnits(preference);
  let chainUnlocked = true;
  const provisional = units.map((unit) => {
    const progress = writingUnitProgress(unit.id, state.writingProgress, preference);
    const recommendedUnlocked = chainUnlocked;
    chainUnlocked = chainUnlocked && progress.thresholdMet;
    return { unit, progress, recommendedUnlocked, completed: progress.thresholdMet, current: false };
  });
  const unlockedIncomplete = provisional.find((item) => item.recommendedUnlocked && !item.completed);
  const preferred = provisional.find((item) =>
    item.unit.id === state.writingCurrentUnitId && item.recommendedUnlocked && !item.completed,
  );
  const currentId = preferred?.unit.id ?? unlockedIncomplete?.unit.id ?? provisional.at(-1)?.unit.id;
  return provisional.map((item) => ({ ...item, current: item.unit.id === currentId }));
}

const IDEA_KIND_SKILLS: Record<WritingIdeaKind, WritingSkill[]> = {
  'cause-explanation': ['explain-reason', 'explain-cause-result'],
  'time-details': ['describe-situation', 'sequence-events'],
  action: ['explain-action-taken'],
  outcome: ['explain-result'],
  'future-plan': ['explain-next-step', 'request-change-plan'],
  'polite-request': ['request-change-plan'],
};

export function rankedWritingWeakSkills(
  progressByTopic: Record<string, WritingTopicProgress>,
): Array<{ skill: WritingSkill; count: number }> {
  const counts = new Map<WritingSkill, number>();
  for (const progress of Object.values(progressByTopic)) {
    for (const [kind, count] of Object.entries(progress.weaknessCounts ?? {}) as Array<[WritingIdeaKind, number]>) {
      for (const skill of IDEA_KIND_SKILLS[kind] ?? []) {
        counts.set(skill, (counts.get(skill) ?? 0) + Number(count));
      }
    }
  }
  return [...counts.entries()]
    .map(([skill, count]) => ({ skill, count }))
    .sort((left, right) => right.count - left.count || left.skill.localeCompare(right.skill));
}

function pathRank(topicId: string) {
  const metadata = metadataByTopic.get(topicId);
  const unit = metadata ? unitById.get(metadata.unitId) : undefined;
  return unit && metadata ? unit.order * 1_000 + metadata.order : 999_999;
}

function recommendation(topicId: string, reason: ContinueWritingReason, weakSkill?: WritingSkill) {
  const topic = topicById.get(topicId);
  const metadata = metadataByTopic.get(topicId);
  const unit = metadata ? unitById.get(metadata.unitId) : undefined;
  return topic && metadata && unit ? { topic, metadata, unit, reason, weakSkill } : undefined;
}

export function writingVariantForTopic(
  sourceTopicId: string,
  practicedTopicIds: ReadonlySet<string> = new Set(),
): { topicId: string; masterySkill: WritingMasterySkill } | undefined {
  const source = topicById.get(sourceTopicId);
  const sourceFeedback = feedbackByTopic.get(sourceTopicId);
  if (!source || !sourceFeedback?.skillMask) return undefined;
  const sourceSkills = masterySkillsFromMask(sourceFeedback.skillMask);
  const candidates = writingManifest
    .filter((topic) => topic.id !== sourceTopicId && topic.level === source.level && topic.domain === source.domain)
    .map((topic) => ({ topic, feedback: feedbackByTopic.get(topic.id) }))
    .filter((item): item is { topic: WritingTopicSummary; feedback: NonNullable<typeof item.feedback> } => Boolean(item.feedback))
    .map((item) => ({
      ...item,
      commonSkill: sourceSkills.find((skill) => Boolean(item.feedback.skillMask & (1 << feedbackIndex.skills.indexOf(skill)))),
    }))
    .filter((item): item is typeof item & { commonSkill: WritingMasterySkill } => Boolean(item.commonSkill))
    .sort((left, right) =>
      Number(practicedTopicIds.has(left.topic.id)) - Number(practicedTopicIds.has(right.topic.id)) ||
      Number(left.feedback.contextHash === sourceFeedback.contextHash) - Number(right.feedback.contextHash === sourceFeedback.contextHash) ||
      pathRank(left.topic.id) - pathRank(right.topic.id),
    );
  const selected = candidates[0];
  return selected ? { topicId: selected.topic.id, masterySkill: selected.commonSkill } : undefined;
}

export function writingMasterySkillsForTopic(topicId: string): readonly WritingMasterySkill[] {
  return masterySkillsFromMask(feedbackByTopic.get(topicId)?.skillMask ?? 0);
}

function weakestMasterySkill(
  progress: Partial<Record<WritingMasterySkill, WritingSkillProgress>> | undefined,
): WritingSkillProgress | undefined {
  return Object.values(progress ?? {})
    .filter((item): item is WritingSkillProgress => Boolean(item))
    .sort((left, right) => left.masteryScore - right.masteryScore || left.skill.localeCompare(right.skill))[0];
}

export function continueWritingRecommendation(
  state: WritingPathProgress,
  now = new Date(),
): ContinueWritingRecommendation | undefined {
  const preference = state.writingPathPreference;
  const candidates = orderedWritingTopics(preference);
  const drafts = candidates.filter((topic) => state.writingDrafts[topic.id]?.trim());
  if (drafts[0]) return recommendation(drafts[0].id, 'draft');

  const due = candidates
    .filter((topic) => {
      const progress = state.writingProgress[topic.id];
      return progress?.attempts.length && Date.parse(progress.nextReviewAt) <= now.getTime();
    })
    .sort((left, right) =>
      Date.parse(state.writingProgress[left.id]!.nextReviewAt) - Date.parse(state.writingProgress[right.id]!.nextReviewAt) ||
      pathRank(left.id) - pathRank(right.id),
    );
  if (due[0]) {
    const sourceProgress = state.writingProgress[due[0].id];
    if (sourceProgress?.recommendedReviewMode !== 'exact-retry') {
      const variant = writingVariantForTopic(due[0].id, new Set(Object.keys(state.writingProgress)));
      if (variant) {
        const result = recommendation(variant.topicId, 'due-review');
        return result ? { ...result, reviewMode: 'variant-retry', sourceTopicId: due[0].id, masterySkill: variant.masterySkill } : undefined;
      }
    }
    const result = recommendation(due[0].id, 'due-review');
    return result ? { ...result, reviewMode: 'exact-retry', sourceTopicId: due[0].id } : undefined;
  }

  const pathState = buildWritingPathState(state, preference);
  const current = pathState.find((item) => item.current) ?? pathState[0];
  const weakSkills = rankedWritingWeakSkills(state.writingProgress);
  const weakMastery = weakestMasterySkill(state.writingSkillProgress);
  if (weakMastery) {
    const match = candidates
      .filter((topic) => !state.writingProgress[topic.id]?.attempts.length)
      .filter((topic) => writingMasterySkillsForTopic(topic.id).includes(weakMastery.skill))
      .sort((left, right) => pathRank(left.id) - pathRank(right.id))[0];
    if (match) {
      const result = recommendation(match.id, 'weak-skill');
      if (result) return { ...result, masterySkill: weakMastery.skill, reviewMode: 'skill-retry' };
    }
  }
  for (const weakness of weakSkills) {
    const matches = candidates
      .filter((topic) => !state.writingProgress[topic.id]?.attempts.length)
      .filter((topic) => metadataByTopic.get(topic.id)?.skills.includes(weakness.skill))
      .sort((left, right) => {
        const leftMeta = metadataByTopic.get(left.id)!;
        const rightMeta = metadataByTopic.get(right.id)!;
        const leftCurrent = leftMeta.unitId === current?.unit.id ? 0 : 1;
        const rightCurrent = rightMeta.unitId === current?.unit.id ? 0 : 1;
        const currentLevel = current?.unit.level;
        const leftLevel = topicById.get(left.id)?.level === currentLevel ? 0 : 1;
        const rightLevel = topicById.get(right.id)?.level === currentLevel ? 0 : 1;
        return leftCurrent - rightCurrent || leftLevel - rightLevel || pathRank(left.id) - pathRank(right.id);
      });
    if (matches[0]) return recommendation(matches[0].id, 'weak-skill', weakness.skill);
  }

  const next = candidates.find((topic) => {
    const metadata = metadataByTopic.get(topic.id);
    return metadata?.unitId === current?.unit.id && !isSuccessful(state.writingProgress[topic.id]);
  }) ?? candidates.find((topic) => !isSuccessful(state.writingProgress[topic.id]));
  return next ? recommendation(next.id, 'next-path-topic') : undefined;
}

export function writingLevelProgress(
  level: Difficulty,
  state: WritingPathProgress,
  preference = state.writingPathPreference,
) {
  const topics = orderedWritingTopics(preference).filter((topic) => topic.level === level);
  const completed = topics.filter((topic) => isSuccessful(state.writingProgress[topic.id])).length;
  return { level, total: topics.length, completed, percent: topics.length ? Math.round(completed / topics.length * 100) : 100 };
}

export function writingPathOrder(topicId: string): number {
  return pathRank(topicId);
}

export function unitUnlockExplanation(progress: WritingUnitProgress): string {
  return `Hoàn thành ${progress.requiredCompleted}/${progress.total} bài, truyền đạt tốt ít nhất ${progress.requiredMastery} bài và không quá ${Math.floor(progress.total * 0.25)} bài yếu.`;
}

export function levelOrder(level: Difficulty): number {
  return WRITING_LEVEL_ORDER[level];
}
