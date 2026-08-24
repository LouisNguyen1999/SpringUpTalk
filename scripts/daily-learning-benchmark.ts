import { performance } from 'node:perf_hooks';
import topicData from '../src/data/topic-manifest.generated.json' with { type: 'json' };
import vocabularyData from '../src/data/vocabulary/generated/vocabulary-index.generated.json' with { type: 'json' };
import writingData from '../src/data/writing/generated/writing-manifest.generated.json' with { type: 'json' };
import { buildDailyLearningSession } from '../src/engine/daily-learning/index.ts';
import { defaultProgress } from '../src/store/progress-store.ts';
import type { TopicManifestItem, VocabularySummary, WritingTopicSummary } from '../src/types/domain.ts';

const topicManifest = topicData as TopicManifestItem[];
const vocabularyIndex = vocabularyData as VocabularySummary[];
const writingManifest = writingData as WritingTopicSummary[];

const now = new Date(2026, 7, 19, 9);
const progress = structuredClone(defaultProgress);
progress.vocabulary = vocabularyIndex.filter((item) => item.practiceCount > 0).slice(0, 300).map((item, index) => ({
  id: item.id,
  sourceTopic: item.tags[0] ?? 'vocabulary',
  timesSeen: 4,
  timesCorrect: index % 3,
  practiceCount: 4,
  incorrectCount: 4 - index % 3,
  mastery: 'learning',
  favorite: false,
  nextReviewAt: index < 180 ? '2026-08-10T08:00:00.000Z' : '2026-08-25T08:00:00.000Z',
}));
for (const topic of writingManifest.slice(0, 100)) {
  progress.writingProgress[topic.id] = {
    topicId: topic.id,
    attempts: [{ id: `${topic.id}:1`, answer: 'A compact attempt.', status: 'needs-improvement', communicationScore: 40, meaningCoverage: .4, missingIdeaIds: ['reason'], contradictedIdeaIds: [], missingIdeaKinds: ['cause-explanation'], criticalErrorIds: [], languageIssueTypes: ['tense'], createdAt: '2026-08-18T08:00:00.000Z' }],
    successfulCount: 0,
    consecutiveCorrect: 0,
    lastPracticedAt: '2026-08-18T08:00:00.000Z',
    nextReviewAt: '2026-08-10T08:00:00.000Z',
    mastery: 'new',
    favorite: false,
    weaknessCounts: { 'cause-explanation': 3 },
  };
}
const catalog = { conversations: topicManifest, vocabulary: vocabularyIndex, writing: writingManifest };
for (let warmup = 0; warmup < 10; warmup += 1) buildDailyLearningSession(progress, { mode: 'focus', focus: 'balanced' }, catalog, now);
const timings = Array.from({ length: 100 }, () => {
  const start = performance.now();
  buildDailyLearningSession(progress, { mode: 'focus', focus: 'balanced' }, catalog, now);
  return performance.now() - start;
}).sort((left, right) => left - right);
const median = timings[50] ?? 0;
const p95 = timings[95] ?? 0;
console.log('DAILY LEARNING ENGINE BENCHMARK\n');
console.log(`Catalog metadata: ${topicManifest.length} Conversation · ${vocabularyIndex.length} Vocabulary · ${writingManifest.length} Writing`);
console.log(`Progress candidates: ${progress.vocabulary.length} Vocabulary · ${Object.keys(progress.writingProgress).length} Writing`);
console.log(`Median: ${median.toFixed(3)} ms`);
console.log(`P95: ${p95.toFixed(3)} ms`);
console.log(`Under 50 ms: ${p95 < 50 ? 'PASS' : 'FAIL'}`);
if (p95 >= 50) process.exitCode = 1;
