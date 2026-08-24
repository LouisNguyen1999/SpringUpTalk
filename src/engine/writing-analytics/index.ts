import type { UserProgress, WritingAttempt } from '../../types/domain';

export interface WritingLearningMetrics {
  attempts: number;
  accuracy: number;
  firstAttemptAccuracy: number;
  retrySuccessRate: number;
  grammarErrorRate: number;
  vocabularyErrorRate: number;
  wordOrderErrorRate: number;
  missingIdeaRate: number;
  naturalnessRate: number;
  averageRetries: number;
}

const percentage = (part: number, total: number) => total ? Math.round(part / total * 10_000) / 100 : 0;
const successful = (attempt: WritingAttempt) => attempt.status === 'communicates-well' && !attempt.criticalErrorIds.length;
const hasCategory = (attempt: WritingAttempt, categories: string[]) =>
  attempt.feedbackCategories?.some((category) => categories.includes(category)) ?? false;

export function writingLearningMetrics(
  progress: Pick<UserProgress, 'writingProgress'>,
): WritingLearningMetrics {
  const topics = Object.values(progress.writingProgress).filter((item) => item.attempts.length);
  const attempts = topics.flatMap((item) => item.attempts);
  const firstAttempts = topics.map((item) => item.attempts[0]!).filter(Boolean);
  const retried = topics.filter((item) => item.attempts.length > 1 && !successful(item.attempts[0]!));
  const retrySuccesses = retried.filter((item) => successful(item.attempts.at(-1)!)).length;
  const natural = attempts.filter((attempt) =>
    attempt.qualityBand === 'correct-natural' || attempt.qualityBand === 'correct-less-natural').length;
  return {
    attempts: attempts.length,
    accuracy: percentage(attempts.filter(successful).length, attempts.length),
    firstAttemptAccuracy: percentage(firstAttempts.filter(successful).length, firstAttempts.length),
    retrySuccessRate: percentage(retrySuccesses, retried.length),
    grammarErrorRate: percentage(attempts.filter((item) => hasCategory(item, ['GRAMMAR', 'TENSE', 'SUBJECT_VERB_AGREEMENT', 'ARTICLE', 'PREPOSITION', 'PRONOUN', 'PLURAL', 'SENTENCE_STRUCTURE'])).length, attempts.length),
    vocabularyErrorRate: percentage(attempts.filter((item) => hasCategory(item, ['VOCABULARY', 'COLLOCATION', 'WORD_FORM', 'UNNATURAL_EXPRESSION'])).length, attempts.length),
    wordOrderErrorRate: percentage(attempts.filter((item) => hasCategory(item, ['WORD_ORDER'])).length, attempts.length),
    missingIdeaRate: percentage(attempts.filter((item) => hasCategory(item, ['MISSING_IDEA'])).length, attempts.length),
    naturalnessRate: percentage(natural, attempts.length),
    averageRetries: topics.length ? Math.round(attempts.length / topics.length * 100) / 100 : 0,
  };
}
