import type { Mastery, SentenceProgress } from '../../types/domain';

export interface ReviewItem {
  turnId: string;
  dueAfter: number;
  failures: number;
}

export interface ReviewSchedule {
  mastery: Mastery;
  nextReviewAt: string;
  consecutiveCorrect: number;
}

const DAY = 24 * 60 * 60 * 1_000;
const INTERVAL_DAYS: Record<Mastery, number> = {
  new: 0,
  learning: 1,
  familiar: 3,
  strong: 7,
  mastered: 14,
};

/** Legacy within-lesson queue. Kept separate from the long-term calendar. */
export function scheduleReview(turnId: string, currentPosition: number, failures = 1): ReviewItem {
  return { turnId, dueAfter: failures > 1 ? Number.MAX_SAFE_INTEGER : currentPosition + 3, failures };
}

export function takeDueReviews(queue: ReviewItem[], position: number): ReviewItem[] {
  return queue.filter((item) => item.dueAfter <= position);
}

export function masteryFor(correct: number, consecutiveCorrect: number): Mastery {
  if (correct === 0) return 'new';
  if (consecutiveCorrect >= 5) return 'mastered';
  if (consecutiveCorrect >= 3) return 'strong';
  if (consecutiveCorrect >= 2) return 'familiar';
  return 'learning';
}

export function scheduleNextReview(
  previous: SentenceProgress | undefined,
  successful: boolean,
  now = new Date(),
): ReviewSchedule {
  const consecutiveCorrect = successful ? (previous?.consecutiveCorrect ?? 0) + 1 : 0;
  const correct = (previous?.correct ?? 0) + (successful ? 1 : 0);
  const mastery = successful ? masteryFor(correct, consecutiveCorrect) : correct > 0 ? 'learning' : 'new';
  // A failed item is available in Due Today immediately; successful items expand deterministically.
  const nextReviewAt = new Date(now.getTime() + INTERVAL_DAYS[mastery] * DAY).toISOString();
  return { mastery, nextReviewAt, consecutiveCorrect };
}

export function isReviewDue(progress: SentenceProgress | undefined, now = new Date()): boolean {
  if (!progress?.nextReviewAt) return false;
  return Date.parse(progress.nextReviewAt) <= now.getTime();
}
