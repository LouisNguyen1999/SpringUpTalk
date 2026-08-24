import { Buffer } from 'node:buffer';
import { defaultProgress } from '../src/store/progress-store.ts';
import type { DailyLearningHistoryEntry, DailyLearningSession } from '../src/types/domain.ts';

const now = '2026-08-19T10:00:00.000Z';
const vocabulary = Array.from({ length: 5_950 }, (_, index) => ({
  id: `vocab:stress-${index}`, sourceTopic: `topic-${index % 500}`, timesSeen: 3,
  timesCorrect: 2, mastery: 'learning' as const, favorite: index % 31 === 0,
  practiceCount: 3, firstTryCorrectCount: 1, targetUsageCorrectCount: 1,
  incorrectCount: 1, consecutiveCorrect: 1, lastPracticedAt: now, nextReviewAt: now,
}));
const conversationProgress = Object.fromEntries(Array.from({ length: 500 }, (_, index) => [
  `conversation-${index}`, {
    conversationId: `conversation-${index}`, topicId: `topic-${index}`,
    roles: { A: { attempts: 2, completedAt: now }, B: { attempts: 2, completedAt: now } },
  },
]));
const writingProgress = Object.fromEntries(Array.from({ length: 250 }, (_, index) => {
  const attempts = Array.from({ length: 3 }, (_, attempt) => ({
    id: `writing-${index}:${attempt}`, answer: 'A realistic compact learner paragraph retained as an attempt.',
    status: 'mostly-correct' as const, communicationScore: 78, meaningCoverage: .78,
    missingIdeaIds: ['result'], contradictedIdeaIds: [], missingIdeaKinds: ['outcome' as const],
    criticalErrorIds: [], languageIssueTypes: ['tense' as const], createdAt: now,
  }));
  return [`writing-${index}`, {
    topicId: `writing-${index}`, attempts, bestAttempt: attempts[2], successfulCount: 1,
    consecutiveCorrect: 1, lastPracticedAt: now, nextReviewAt: now, mastery: 'learning' as const,
    favorite: false, weaknessCounts: { outcome: 2 },
  }];
}));
const dailyLearningSession: DailyLearningSession = {
  id: 'daily:2026-08-19:focus:balanced', date: '2026-08-19', estimatedMinutes: 30,
  mode: 'focus', focus: 'balanced', status: 'in-progress', currentItemId: 'daily-item-9',
  createdAt: now, updatedAt: now, startedAt: now, xpAtStart: 100, streakAwarded: false,
  items: Array.from({ length: 23 }, (_, index) => ({
    id: `daily-item-${index}`, kind: index % 5 === 0 ? 'review' as const : index % 4 === 0 ? 'writing' as const : index % 3 === 0 ? 'conversation' as const : 'vocabulary' as const,
    target: index % 4 === 0 ? 'writing' as const : index % 3 === 0 ? 'conversation' as const : 'vocabulary' as const,
    reason: index % 5 === 0 ? 'due-review' as const : 'weak-mastery' as const,
    status: index < 9 ? 'completed' as const : 'pending' as const,
    mandatory: index % 5 === 0, priority: 800 - index,
    vocabularyId: index % 3 ? `vocab:stress-${index}` : undefined,
    conversationId: index % 3 === 0 ? `conversation-${index}` : undefined,
    topicId: index % 3 === 0 ? `topic-${index}` : undefined,
    role: index % 3 === 0 ? 'B' as const : undefined,
    writingTopicId: index % 4 === 0 ? `writing-${index}` : undefined,
  })),
};
const dailyLearningHistory: DailyLearningHistoryEntry[] = Array.from({ length: 90 }, (_, index) => ({
  date: `2026-${String(Math.floor(index / 28) + 5).padStart(2, '0')}-${String(index % 28 + 1).padStart(2, '0')}`,
  status: 'completed', planned: 15, completed: 12, xpEarned: 55,
  counts: { conversation: 2, vocabulary: 7, writing: 1, review: 2 },
  firstTryCorrect: 8, firstTryTotal: 12, focusAreas: ['tense', 'cause-explanation'],
  recentItemKeys: Array.from({ length: 15 }, (_, item) => `vocabulary:vocab:stress-${index * 15 + item}`),
}));
const payload = { ...defaultProgress, vocabulary, conversationProgress, writingProgress, dailyLearningSession, dailyLearningHistory };
const bytes = Buffer.byteLength(JSON.stringify(payload), 'utf8');
console.log('DAILY LEARNING PERSISTENCE STRESS\n');
console.log('Conversation progress rows: 500');
console.log('Vocabulary progress rows: 5950');
console.log('Writing topics attempted: 250 × 3 retained attempts');
console.log('Daily session items: 23');
console.log('Daily compact history: 90 days');
console.log(`Serialized size: ${bytes} bytes (${(bytes / 1024 / 1024).toFixed(2)} MiB)`);
console.log(`Under conservative 5 MiB localStorage budget: ${bytes < 5 * 1024 * 1024 ? 'PASS' : 'FAIL'}`);
if (bytes >= 5 * 1024 * 1024) process.exitCode = 1;
