import { beforeEach, describe, expect, it } from 'vitest';
import { itEnglishTopics, validateITEnglishCurriculum } from '../data/it-english/curriculum';
import { canAttemptSentence, compareSpeechTranscript, compareWriting, nextSentenceIndex, topicState } from '../engine/it-english/progression';
import { CURRENT_PROGRESS_VERSION, defaultProgress, migrateProgress, useProgressStore } from '../store/progress-store';

describe('IT English curriculum', () => {
  it('contains exactly 30 unique, complete topics and ordered dialogues', () => {
    expect(validateITEnglishCurriculum()).toEqual([]);
    expect(itEnglishTopics).toHaveLength(30);
    expect(new Set(itEnglishTopics.map((topic) => topic.id)).size).toBe(30);
    expect(itEnglishTopics.map((topic) => topic.level)).toEqual([
      ...Array(8).fill(1), ...Array(8).fill(2), ...Array(8).fill(3), ...Array(6).fill(4),
    ]);
    expect(itEnglishTopics.every((topic) => topic.turns.every((turn, index) => turn.id.endsWith(String(index + 1).padStart(2, '0'))))).toBe(true);
  });
});

describe('IT English sentence evaluation', () => {
  it('accepts writing with harmless case, punctuation, and whitespace differences', () => {
    expect(compareWriting('I joined the team this week.', '  i   joined the team this week!! ').passed).toBe(true);
  });

  it('rejects missing, misspelled, extra, and reordered writing', () => {
    for (const answer of ['I joined team this week.', 'I joined the team this weak.', 'I joined the team this week yesterday.', 'This week I joined the team.']) {
      expect(compareWriting('I joined the team this week.', answer).passed).toBe(false);
    }
    expect(compareWriting('I joined the team this week.', '').feedback).toMatch(/type/i);
  });

  it('matches speech transcripts by ordered similarity and required word coverage', () => {
    expect(compareSpeechTranscript('I joined the team this week.', 'I joined the team this week')).toMatchObject({ passed: true, similarity: 1, coverage: 1 });
    expect(compareSpeechTranscript('I joined the team this week.', 'I joined the weak this team')).toMatchObject({ passed: false });
    expect(compareSpeechTranscript('I joined the team this week.', 'I joined this')).toMatchObject({ passed: false });
    expect(compareSpeechTranscript('I joined the team this week.', '').passed).toBe(false);
    expect(compareSpeechTranscript('The deployment will remain safe because validation blocks unapproved database changes during the staged production rollout.', 'The deployment will not remain safe because validation blocks unapproved database changes during the staged production rollout.').passed).toBe(false);
  });
});

describe('IT English progression and persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState(defaultProgress);
  });

  it('unlocks only the next sentence and next topic after full completion', () => {
    const first = itEnglishTopics[0]!;
    const progress = useProgressStore.getState().itEnglishProgress;
    expect(topicState(itEnglishTopics, 0, progress)).toBe('available');
    expect(topicState(itEnglishTopics, 1, progress)).toBe('locked');
    expect(canAttemptSentence(itEnglishTopics, progress, first.id, first.turns[0]!.id)).toBe(true);
    expect(canAttemptSentence(itEnglishTopics, progress, first.id, first.turns[1]!.id)).toBe(false);

    for (const [index, turn] of first.turns.entries()) {
      expect(canAttemptSentence(itEnglishTopics, useProgressStore.getState().itEnglishProgress, first.id, turn.id)).toBe(true);
      useProgressStore.getState().recordITEnglishAttempt(first.id, turn.id, index % 2 ? 'writing' : 'speaking', {
        passed: true, similarity: 1, coverage: 1, feedback: 'Matched', corrections: [],
      });
    }
    const saved = useProgressStore.getState().itEnglishProgress;
    expect(nextSentenceIndex(first, saved[first.id])).toBe(-1);
    expect(topicState(itEnglishTopics, 0, saved)).toBe('completed');
    expect(topicState(itEnglishTopics, 1, saved)).toBe('available');
  });

  it('records failed attempts, preserves passes across modes, and restores them from storage', () => {
    const topic = itEnglishTopics[0]!;
    const sentence = topic.turns[0]!;
    useProgressStore.getState().recordITEnglishAttempt(topic.id, sentence.id, 'writing', {
      passed: false, similarity: 0.6, coverage: 0.8, feedback: 'Retry', corrections: ['Expected: “team”'],
    });
    expect(useProgressStore.getState().itEnglishProgress[topic.id]?.sentences[sentence.id]).toMatchObject({ attemptCount: 1, passed: false, latestMode: 'writing' });
    useProgressStore.getState().recordITEnglishAttempt(topic.id, sentence.id, 'speaking', {
      passed: true, similarity: 1, coverage: 1, feedback: 'Matched', corrections: [],
    });
    // A passed sentence is no longer the active sentence, so duplicate submissions are ignored.
    useProgressStore.getState().recordITEnglishAttempt(topic.id, sentence.id, 'writing', {
      passed: false, similarity: 0.7, coverage: 0.8, feedback: 'Retry', corrections: [],
    });
    expect(useProgressStore.getState().itEnglishProgress[topic.id]?.sentences[sentence.id]).toMatchObject({ attemptCount: 2, passed: true, latestMode: 'speaking', bestSimilarity: 1 });
    const stored = JSON.parse(localStorage.getItem('lingotalk-progress') ?? '{}') as { state?: { itEnglishProgress?: typeof defaultProgress.itEnglishProgress } };
    expect(stored.state?.itEnglishProgress?.[topic.id]?.sentences[sentence.id]?.passed).toBe(true);
  });

  it('reveals after exactly three evaluated failures and advances the sentence/topic progression', () => {
    const topic = itEnglishTopics[0]!;
    const sentence = topic.turns[0]!;
    const failure = { passed: false, similarity: 0.1, coverage: 0.1, feedback: 'Try again', corrections: [] };
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      expect(canAttemptSentence(itEnglishTopics, useProgressStore.getState().itEnglishProgress, topic.id, sentence.id)).toBe(true);
      useProgressStore.getState().recordITEnglishAttempt(topic.id, sentence.id, attempt % 2 ? 'writing' : 'speaking', failure);
      const saved = useProgressStore.getState().itEnglishProgress[topic.id]!.sentences[sentence.id]!;
      expect(saved.attemptCount).toBe(attempt);
      expect(saved.revealedAfterLimit).toBe(attempt === 3);
    }
    expect(nextSentenceIndex(topic, useProgressStore.getState().itEnglishProgress[topic.id])).toBe(1);
  });

  it('migrates V13 data without changing other stored learning fields', () => {
    const previous = { ...defaultProgress, version: 13, xp: 27, itEnglishProgress: undefined };
    const migrated = migrateProgress(previous, 13);
    expect(migrated).toMatchObject({ version: CURRENT_PROGRESS_VERSION, xp: 27, itEnglishProgress: {} });
  });

  it('ignores empty, duplicate, premature, and unknown-topic submissions', () => {
    const first = itEnglishTopics[0]!;
    const second = itEnglishTopics[1]!;
    const result = { passed: true, similarity: 1, coverage: 1, feedback: 'Matched', corrections: [] };
    useProgressStore.getState().recordITEnglishAttempt(first.id, first.turns[1]!.id, 'writing', result);
    useProgressStore.getState().recordITEnglishAttempt(second.id, second.turns[0]!.id, 'writing', result);
    useProgressStore.getState().recordITEnglishAttempt('unknown', 'missing', 'writing', result);
    expect(useProgressStore.getState().itEnglishProgress).toEqual({});
  });
});
