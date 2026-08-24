import { Buffer } from 'node:buffer';
import { defaultProgress } from '../src/store/progress-store.ts';
import { loadWritingData } from './writing-utils.ts';

const { topics } = loadWritingData();
const now = '2026-08-19T10:00:00.000Z';
const writingProgress = Object.fromEntries(topics.slice(0, 250).map((topic, topicIndex) => {
  const attempts = Array.from({ length: 3 }, (_, attemptIndex) => ({
    id: `${topic.id}:attempt:${attemptIndex}`,
    answer: `${topic.sampleAnswers[attemptIndex % topic.sampleAnswers.length]} This saved attempt represents a realistic learner paragraph.`,
    status: attemptIndex === 2 ? 'communicates-well' : 'mostly-correct',
    communicationScore: 75 + attemptIndex * 8,
    meaningCoverage: 0.75 + attemptIndex * 0.1,
    missingIdeaIds: attemptIndex === 2 ? [] : [topic.requiredIdeas.at(-1)?.id ?? 'idea'],
    contradictedIdeaIds: [],
    missingIdeaKinds: attemptIndex === 2 ? [] : ['outcome'],
    criticalErrorIds: [], languageIssueTypes: attemptIndex ? [] : ['tense'], createdAt: now,
  }));
  return [topic.id, {
    topicId: topic.id, attempts, bestAttempt: attempts[2], successfulCount: 2,
    consecutiveCorrect: 2, lastPracticedAt: now, nextReviewAt: now,
    mastery: 'familiar', favorite: topicIndex % 10 === 0,
    weaknessCounts: { outcome: 2, 'cause-explanation': 1 }, lastSuccessfulAt: now,
  }];
}));
const vocabulary = Array.from({ length: 5_950 }, (_, index) => ({
  id: `vocab:stress-${index}`, sourceTopic: `topic-${index % 500}`, timesSeen: 3,
  timesCorrect: 2, mastery: 'learning', favorite: index % 31 === 0,
  practiceCount: 3, firstTryCorrectCount: 1, targetUsageCorrectCount: 1,
  incorrectCount: 1, consecutiveCorrect: 1, lastPracticedAt: now, nextReviewAt: now,
}));
const conversationProgress = Object.fromEntries(Array.from({ length: 500 }, (_, index) => [
  `conversation-${index}`, {
    conversationId: `conversation-${index}`, topicId: `topic-${index}`,
    roles: { A: { attempts: 2, completedAt: now }, B: { attempts: 2, completedAt: now } },
  },
]));
const payload = { ...defaultProgress, writingProgress, vocabulary, conversationProgress };
const serialized = JSON.stringify(payload);
const bytes = Buffer.byteLength(serialized, 'utf8');

console.log('WRITING PERSISTENCE STRESS\n');
console.log('Writing topics attempted: 250');
console.log('Attempts retained per topic: 3');
console.log('Vocabulary progress rows: 5950');
console.log('Conversation progress rows: 500');
console.log(`Serialized size: ${bytes} bytes (${(bytes / 1024 / 1024).toFixed(2)} MiB)`);
console.log(`Under conservative 5 MiB localStorage budget: ${bytes < 5 * 1024 * 1024 ? 'PASS' : 'FAIL'}`);
if (bytes >= 5 * 1024 * 1024) process.exitCode = 1;

