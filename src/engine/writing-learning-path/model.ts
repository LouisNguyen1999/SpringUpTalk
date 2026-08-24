import type {
  WritingLearningMetadata,
  WritingLearningUnit,
  WritingPracticeTopic,
  WritingSkill,
} from '../../types/domain';
import { writingLearningUnits, WRITING_LEVEL_ORDER } from './units';

const unique = <T,>(items: T[]): T[] => [...new Set(items)];
const words = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;

export function deriveWritingSkills(topic: WritingPracticeTopic): WritingSkill[] {
  const skills: WritingSkill[] = ['describe-situation'];
  const text = [
    topic.titleEnglish,
    topic.context,
    topic.vietnameseSourceText,
    ...topic.usefulVocabulary,
    ...topic.usefulStructures,
    ...topic.sampleAnswers,
    ...topic.requiredIdeas.flatMap((idea) => [idea.labelVietnamese, ...idea.concepts]),
  ].join(' ').toLowerCase();
  const stages = new Set(topic.requiredIdeas.map((idea) => idea.arcStage));
  const kinds = new Set(topic.requiredIdeas.map((idea) => idea.kind));

  if (topic.writingType === 'story' || stages.has('event') || stages.has('reflection')) {
    skills.push('sequence-events', 'summarize-event');
  }
  if (topic.writingType === 'problem-explanation' || stages.has('problem')) skills.push('report-problem');
  if (kinds.has('cause-explanation') || stages.has('cause')) skills.push('explain-reason');
  if (stages.has('cause') || stages.has('impact')) skills.push('explain-cause-result');
  if (kinds.has('action') || stages.has('action')) skills.push('explain-action-taken');
  if (kinds.has('outcome') || stages.has('result')) skills.push('explain-result');
  if (kinds.has('future-plan') || stages.has('next-step')) skills.push('explain-next-step');
  if (kinds.has('polite-request') || /\b(reschedul|postpone|cancel|change|plan|request|could we|would you)\b/.test(text)) skills.push('request-change-plan');
  if (/\b(sorry|apolog|regret|unfortunately)\b/.test(text)) skills.push('apologize-explain');
  if (/\b(bug|error|technical|system|server|database|api|code|login|deploy|release|data|network)\b/.test(text)) skills.push('explain-technical-issue');
  if (/\b(blocker|blocked|blocking|dependency|cannot proceed|waiting for)\b/.test(text)) skills.push('explain-blocker');
  if (/\b(risk|uncertain|uncertainty|might|could affect|concern|potential)\b/.test(text) || (topic.level === 'B2' && stages.has('impact'))) skills.push('explain-risk');
  if (/\b(trade.?off|alternative|option|instead|compromise|benefit|cost)\b/.test(text) && topic.level === 'B2') skills.push('explain-tradeoff');
  if (/\b(incident|outage|production|downtime|service down|restore|mitigation)\b/.test(text)) skills.push('incident-update');

  if (!skills.includes('explain-result') && topic.requiredIdeas.length >= 5) skills.push('explain-result');
  if (!skills.includes('explain-next-step') && topic.requiredIdeas.length >= 6) skills.push('explain-next-step');
  return unique(skills);
}

export function writingDifficultyScore(topic: WritingPracticeTopic): number {
  const levelBase = { A1: 8, A2: 32, B1: 56, B2: 80 }[topic.level];
  const sourceLength = Math.min(5, words(topic.vietnameseSourceText) / 22);
  const ideaLoad = Math.min(7, topic.requiredIdeas.length * 1.05);
  const factLoad = Math.min(4, topic.criticalFacts.length * 1.2);
  const grammarLoad = Math.min(3, topic.usefulStructures.length * 0.45);
  const arcLoad = Math.min(3, new Set(topic.requiredIdeas.map((idea) => idea.arcStage)).size * 0.42);
  const contentLoad = topic.writingType === 'problem-explanation' ? 1.4 : 0;
  const professionalLoad = topic.domain === 'it-work' ? 0.8 : 0;
  return Math.min(100, Math.round((levelBase + sourceLength + ideaLoad + factLoad + grammarLoad + arcLoad + contentLoad + professionalLoad) * 10) / 10);
}

function topicCompare(left: WritingPracticeTopic, right: WritingPracticeTopic) {
  return writingDifficultyScore(left) - writingDifficultyScore(right) ||
    left.requiredIdeas.length - right.requiredIdeas.length ||
    words(left.vietnameseSourceText) - words(right.vietnameseSourceText) ||
    left.id.localeCompare(right.id);
}

function rebalanceForUnitGoals(
  buckets: WritingPracticeTopic[][],
  units: readonly WritingLearningUnit[],
  levelTopics: WritingPracticeTopic[],
) {
  const skills = new Map(levelTopics.map((topic) => [topic.id, deriveWritingSkills(topic)]));
  const skillTotal = (skill: WritingSkill) => levelTopics.filter((topic) => skills.get(topic.id)!.includes(skill)).length;
  const desired = (skill: WritingSkill, size: number) => {
    const available = skillTotal(skill);
    return Math.min(available, available <= size ? Math.ceil(size * 0.5) : Math.ceil(size * 0.45));
  };
  const coverage = (bucket: WritingPracticeTopic[], skill: WritingSkill) =>
    bucket.filter((topic) => skills.get(topic.id)!.includes(skill)).length;

  units.forEach((unit, targetIndex) => {
    for (const targetSkill of [...unit.targetSkills].sort((left, right) => skillTotal(left) - skillTotal(right))) {
      const targetBucket = buckets[targetIndex]!;
      const target = desired(targetSkill, targetBucket.length);
      while (coverage(targetBucket, targetSkill) < target) {
        const targetAverage = targetBucket.reduce((total, topic) => total + writingDifficultyScore(topic), 0) / targetBucket.length;
        const candidates = buckets.flatMap((bucket, sourceIndex) => bucket
          .filter((topic) => sourceIndex !== targetIndex && skills.get(topic.id)!.includes(targetSkill))
          .map((topic) => {
            const sourceUnit = units[sourceIndex]!;
            const protectedMatches = sourceUnit.targetSkills.filter((skill) =>
              skills.get(topic.id)!.includes(skill) && coverage(bucket, skill) <= desired(skill, bucket.length),
            ).length;
            return { topic, sourceIndex, protectedMatches };
          }))
          .sort((left, right) =>
            left.protectedMatches - right.protectedMatches ||
            Math.abs(writingDifficultyScore(left.topic) - targetAverage) - Math.abs(writingDifficultyScore(right.topic) - targetAverage) ||
            left.topic.id.localeCompare(right.topic.id),
          )
          .filter((candidate) => candidate.protectedMatches === 0);
        let incoming: typeof candidates[number] | undefined;
        let outgoing: { topic: WritingPracticeTopic } | undefined;
        for (const candidate of candidates) {
          const sourceUnit = units[candidate.sourceIndex]!;
          const options = targetBucket
            .filter((topic) => !skills.get(topic.id)!.includes(targetSkill) && topic.writingType === candidate.topic.writingType)
            .map((topic) => ({
              topic,
              sameDomain: topic.domain === candidate.topic.domain ? 1 : 0,
              sourceFit: sourceUnit.targetSkills.filter((skill) => skills.get(topic.id)!.includes(skill)).length,
              targetFit: unit.targetSkills.filter((skill) => skills.get(topic.id)!.includes(skill)).length,
            }))
            .sort((left, right) =>
              right.sameDomain - left.sameDomain || right.sourceFit - left.sourceFit || left.targetFit - right.targetFit ||
              Math.abs(writingDifficultyScore(left.topic) - writingDifficultyScore(candidate.topic)) - Math.abs(writingDifficultyScore(right.topic) - writingDifficultyScore(candidate.topic)) ||
              left.topic.id.localeCompare(right.topic.id),
            );
          if (options[0]) { incoming = candidate; outgoing = options[0]; break; }
        }
        if (!incoming || !outgoing) break;
        const sourceBucket = buckets[incoming.sourceIndex]!;
        targetBucket.splice(targetBucket.indexOf(outgoing.topic), 1, incoming.topic);
        sourceBucket.splice(sourceBucket.indexOf(incoming.topic), 1, outgoing.topic);
      }
    }
  });
}

/**
 * Stratifies each level by domain and content type before splitting it into six stages.
 * This keeps difficulty progressive without producing single-format or single-domain units.
 */
export function buildWritingLearningMetadata(
  topics: readonly WritingPracticeTopic[],
): WritingLearningMetadata[] {
  const result: WritingLearningMetadata[] = [];
  for (const level of ['A1', 'A2', 'B1', 'B2'] as const) {
    const units = writingLearningUnits.filter((item) => item.level === level);
    const buckets = units.map(() => [] as WritingPracticeTopic[]);
    const levelTopics = topics.filter((topic) => topic.level === level);
    const groups = new Map<string, WritingPracticeTopic[]>();
    for (const topic of levelTopics) {
      const key = `${topic.domain}:${topic.writingType}`;
      groups.set(key, [...(groups.get(key) ?? []), topic]);
    }
    for (const group of groups.values()) {
      group.sort(topicCompare).forEach((topic, index) => {
        const stage = Math.min(units.length - 1, Math.floor(index * units.length / group.length));
        buckets[stage]?.push(topic);
      });
    }
    rebalanceForUnitGoals(buckets, units, levelTopics);
    buckets.forEach((bucket, stage) => {
      bucket.sort(topicCompare).forEach((topic, index) => {
        result.push({
          topicId: topic.id,
          unitId: units[stage]!.id,
          order: index + 1,
          skills: deriveWritingSkills(topic),
          difficultyScore: writingDifficultyScore(topic),
        });
      });
    });
  }
  return result.sort((left, right) => {
    const leftUnit = writingLearningUnits.find((unit) => unit.id === left.unitId)!;
    const rightUnit = writingLearningUnits.find((unit) => unit.id === right.unitId)!;
    return leftUnit.order - rightUnit.order || left.order - right.order;
  });
}

export function learningMetadataSortKey(metadata: WritingLearningMetadata): number {
  const unit = writingLearningUnits.find((item) => item.id === metadata.unitId);
  return (unit ? WRITING_LEVEL_ORDER[unit.level] * 100_000 + unit.order * 1_000 : 999_000) + metadata.order;
}
