import type {
  WritingEvaluation,
  WritingMasterySkill,
  WritingSkillProgress,
} from '../../types/domain';

export const WRITING_MASTERY_SKILLS: readonly WritingMasterySkill[] = [
  'subject-be', 'present-simple', 'negation', 'question-formation', 'past-narration',
  'time-expressions', 'connectors', 'word-order', 'collocations', 'sentence-expansion',
  'story-sequencing', 'problem-solution-writing', 'workplace-writing', 'it-communication',
  'paraphrasing', 'natural-expression',
] as const;

export const WRITING_MASTERY_LABELS: Record<WritingMasterySkill, string> = {
  'subject-be': 'Subject + Be',
  'present-simple': 'Present Simple',
  negation: 'Negation',
  'question-formation': 'Question formation',
  'past-narration': 'Past narration',
  'time-expressions': 'Time expressions',
  connectors: 'Connectors',
  'word-order': 'Word order',
  collocations: 'Collocations',
  'sentence-expansion': 'Sentence expansion',
  'story-sequencing': 'Story sequencing',
  'problem-solution-writing': 'Problem/Solution writing',
  'workplace-writing': 'Workplace writing',
  'it-communication': 'IT communication',
  paraphrasing: 'Paraphrasing',
  'natural-expression': 'Natural expression',
};

export type WritingMasteryResult = 'correct' | 'almost-correct' | 'incorrect';

export function masteryResultForEvaluation(evaluation: WritingEvaluation): WritingMasteryResult {
  if (evaluation.status === 'communicates-well' &&
    evaluation.targetAchievement?.grammarTargetMet !== false &&
    evaluation.targetAchievement?.vocabularyTargetMet !== false) return 'correct';
  if (evaluation.status === 'mostly-correct' || evaluation.qualityBand === 'correct-less-natural') return 'almost-correct';
  return 'incorrect';
}

export function updateWritingSkillMastery(
  existing: Partial<Record<WritingMasterySkill, WritingSkillProgress>>,
  skills: readonly WritingMasterySkill[],
  result: WritingMasteryResult,
  now = new Date(),
): Partial<Record<WritingMasterySkill, WritingSkillProgress>> {
  const next = { ...existing };
  const reviewDays = result === 'correct' ? 7 : result === 'almost-correct' ? 2 : 0;
  for (const skill of new Set(skills)) {
    const previous = existing[skill];
    const recentResults = [...(previous?.recentResults ?? []), result].slice(-10);
    const recentPoints = recentResults.reduce((total, item) =>
      total + (item === 'correct' ? 1 : item === 'almost-correct' ? 0.6 : 0), 0);
    const attempts = (previous?.attempts ?? 0) + 1;
    const correct = (previous?.correct ?? 0) + (result === 'correct' ? 1 : 0);
    const almostCorrect = (previous?.almostCorrect ?? 0) + (result === 'almost-correct' ? 1 : 0);
    const incorrect = (previous?.incorrect ?? 0) + (result === 'incorrect' ? 1 : 0);
    const recentAccuracy = Math.round(recentPoints / recentResults.length * 100);
    const lifetimeAccuracy = (correct + almostCorrect * 0.6) / attempts * 100;
    const masteryScore = Math.round(recentAccuracy * 0.7 + lifetimeAccuracy * 0.3);
    next[skill] = {
      skill,
      attempts,
      correct,
      almostCorrect,
      incorrect,
      recentAccuracy,
      masteryScore,
      lastPracticedAt: now.toISOString(),
      reviewDueAt: new Date(now.getTime() + reviewDays * 86_400_000).toISOString(),
      recentResults,
    };
  }
  return next;
}

export function rankedWeakWritingMastery(
  progress: Partial<Record<WritingMasterySkill, WritingSkillProgress>>,
  now = new Date(),
): WritingSkillProgress[] {
  return Object.values(progress)
    .filter((item): item is WritingSkillProgress => Boolean(item))
    .filter((item) => item.masteryScore < 80 || Date.parse(item.reviewDueAt) <= now.getTime())
    .sort((left, right) =>
      left.masteryScore - right.masteryScore ||
      Date.parse(left.reviewDueAt) - Date.parse(right.reviewDueAt) ||
      left.skill.localeCompare(right.skill),
    );
}
