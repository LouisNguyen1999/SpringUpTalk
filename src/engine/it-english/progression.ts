import { normalizeSentence } from '../sentence-normalizer';
import type { ITEnglishAttemptResult, ITEnglishMode, ITEnglishProgress, ITEnglishSentenceProgress } from '../../types/domain';
import type { ITEnglishTopic } from '../../data/it-english/curriculum';

export type ITEnglishTopicState = 'locked' | 'available' | 'in-progress' | 'completed';
export const SPEECH_SIMILARITY_THRESHOLD = 0.9;
export const SPEECH_WORD_COVERAGE_THRESHOLD = 0.9;

export function compareWriting(target: string, answer: string): ITEnglishAttemptResult {
  const expected = normalizeSentence(target);
  const actual = normalizeSentence(answer);
  if (!actual) return { passed: false, similarity: 0, coverage: 0, feedback: 'Type the sentence before submitting.', corrections: [] };
  if (actual === expected) return { passed: true, similarity: 1, coverage: 1, feedback: 'Exact sentence match. Well done!', corrections: [] };
  return {
    passed: false,
    similarity: sequenceSimilarity(expected.split(' '), actual.split(' ')),
    coverage: tokenCoverage(expected.split(' '), actual.split(' ')),
    feedback: 'Check the word order, spelling, and missing or extra words, then try again.',
    corrections: wordDiff(expected, actual),
  };
}

export function compareSpeechTranscript(target: string, transcript: string): ITEnglishAttemptResult {
  const expected = normalizeSentence(target);
  const actual = normalizeSentence(transcript);
  if (!actual) return { passed: false, similarity: 0, coverage: 0, feedback: 'No speech transcript was recognized. Try again or switch to Writing.', corrections: [] };
  const expectedWords = expected.split(' ');
  const actualWords = actual.split(' ');
  const similarity = sequenceSimilarity(expectedWords, actualWords);
  const coverage = tokenCoverage(expectedWords, actualWords);
  const passed = similarity >= SPEECH_SIMILARITY_THRESHOLD
    && coverage >= SPEECH_WORD_COVERAGE_THRESHOLD
    && !conflictingMeaning(expectedWords, actualWords);
  return {
    passed,
    similarity,
    coverage,
    feedback: passed
      ? 'Your transcript closely matches the sentence. This checks the recognized words, not pronunciation quality.'
      : 'The recognized transcript differs from the target. Try speaking it again, or switch to Writing.',
    corrections: passed ? [] : wordDiff(expected, actual),
  };
}

export function nextSentenceIndex(topic: ITEnglishTopic, progress?: ITEnglishProgress): number {
  return topic.turns.findIndex((turn) => {
    const sentence = progress?.sentences[turn.id];
    return !sentence?.passed && !sentence?.revealedAfterLimit;
  });
}

export function topicState(
  topics: readonly ITEnglishTopic[],
  index: number,
  progress: Record<string, ITEnglishProgress>,
): ITEnglishTopicState {
  const topic = topics[index];
  if (!topic) return 'locked';
  if (index > 0 && nextSentenceIndex(topics[index - 1]!, progress[topics[index - 1]!.id]) !== -1) return 'locked';
  const current = progress[topic.id];
  if (nextSentenceIndex(topic, current) === -1) return 'completed';
  return current && Object.keys(current.sentences).length ? 'in-progress' : 'available';
}

export function canAttemptSentence(
  topics: readonly ITEnglishTopic[],
  progress: Record<string, ITEnglishProgress>,
  topicId: string,
  sentenceId: string,
): boolean {
  const topicIndex = topics.findIndex((item) => item.id === topicId);
  if (topicIndex < 0 || topicState(topics, topicIndex, progress) === 'locked') return false;
  const topic = topics[topicIndex]!;
  const sentenceIndex = topic.turns.findIndex((turn) => turn.id === sentenceId);
  return sentenceIndex >= 0 && sentenceIndex === nextSentenceIndex(topic, progress[topicId]);
}

export function updateSentenceProgress(
  previous: ITEnglishSentenceProgress | undefined,
  mode: ITEnglishMode,
  result: ITEnglishAttemptResult,
  now: string,
  retryLimit = 3,
): ITEnglishSentenceProgress {
  const attemptCount = (previous?.attemptCount ?? 0) + 1;
  const passed = Boolean(previous?.passed || result.passed);
  return {
    passed,
    revealedAfterLimit: Boolean(previous?.revealedAfterLimit || (!passed && attemptCount >= retryLimit)),
    attemptCount,
    latestMode: mode,
    latestResult: result.feedback,
    latestSimilarity: result.similarity,
    bestSimilarity: Math.max(previous?.bestSimilarity ?? 0, result.similarity),
    updatedAt: now,
    completedAt: previous?.completedAt ?? (passed || attemptCount >= retryLimit ? now : undefined),
  };
}

function tokenCoverage(expected: string[], actual: string[]): number {
  if (!expected.length) return actual.length ? 0 : 1;
  const remaining = [...actual];
  let matched = 0;
  for (const word of expected) {
    const index = remaining.indexOf(word);
    if (index >= 0) { matched += 1; remaining.splice(index, 1); }
  }
  return matched / expected.length;
}

function sequenceSimilarity(expected: string[], actual: string[]): number {
  const longest = Math.max(expected.length, actual.length);
  if (!longest) return 1;
  const row = Array.from({ length: actual.length + 1 }, (_, index) => index);
  for (let i = 1; i <= expected.length; i += 1) {
    let diagonal = row[0]!;
    row[0] = i;
    for (let j = 1; j <= actual.length; j += 1) {
      const above = row[j]!;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, diagonal + (expected[i - 1] === actual[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  return 1 - row[actual.length]! / longest;
}

function conflictingMeaning(expected: string[], actual: string[]): boolean {
  const negative = new Set(['not', "n't", 'never', 'no', 'without', 'cannot', "can't", "won't", "don't", "doesn't", "didn't"]);
  const hasNegative = (words: string[]) => words.some((word) => negative.has(word));
  if (hasNegative(expected) !== hasNegative(actual)) return true;
  const oppositePairs = [
    ['increase', 'decrease'], ['higher', 'lower'], ['before', 'after'], ['enable', 'disable'],
    ['allow', 'deny'], ['include', 'exclude'], ['success', 'failure'], ['succeed', 'fail'],
    ['available', 'unavailable'], ['online', 'offline'], ['approve', 'reject'], ['accept', 'reject'],
    ['add', 'remove'], ['start', 'stop'], ['open', 'close'], ['safe', 'unsafe'],
  ];
  return oppositePairs.some(([left, right]) =>
    (expected.includes(left!) && actual.includes(right!)) || (expected.includes(right!) && actual.includes(left!)),
  );
}

function wordDiff(expected: string, actual: string): string[] {
  const left = expected ? expected.split(' ') : [];
  const right = actual ? actual.split(' ') : [];
  const distance = Array.from({ length: left.length + 1 }, () => Array<number>(right.length + 1).fill(0));
  for (let i = 0; i <= left.length; i += 1) distance[i]![0] = i;
  for (let j = 0; j <= right.length; j += 1) distance[0]![j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      distance[i]![j] = Math.min(
        distance[i - 1]![j]! + 1,
        distance[i]![j - 1]! + 1,
        distance[i - 1]![j - 1]! + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
    }
  }
  const output: string[][] = [];
  let i = left.length;
  let j = right.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && left[i - 1] === right[j - 1]) { i -= 1; j -= 1; continue; }
    if (i > 0 && j > 0 && distance[i]![j] === distance[i - 1]![j - 1]! + 1) {
      output.push([`Expected: “${left[i - 1]}”`, `You wrote: “${right[j - 1]}”`]);
      i -= 1; j -= 1; continue;
    }
    if (i > 0 && distance[i]![j] === distance[i - 1]![j]! + 1) {
      output.push([`Missing word: “${left[i - 1]}”`]); i -= 1; continue;
    }
    output.push([`Extra word: “${right[j - 1]}”`]); j -= 1;
  }
  return output.reverse().flat().slice(0, 8);
}
