export interface XpInput {
  attempt: number;
  hintLevel: 0 | 1 | 2 | 3;
  showedAnswer: boolean;
}

export function calculateTurnXp({ attempt, hintLevel, showedAnswer }: XpInput): number {
  if (showedAnswer) return 1;
  const attemptXp = attempt === 1 ? 10 : attempt === 2 ? 7 : 4;
  const hintPenalty = hintLevel === 0 ? 0 : hintLevel === 1 ? 2 : hintLevel === 2 ? 4 : 7;
  return Math.max(1, attemptXp - hintPenalty);
}

export function calculateLessonBonus(perfect: boolean): number {
  return 20 + (perfect ? 15 : 0);
}
