import manifestData from './generated/writing-manifest.generated.json';
import type { WritingPracticeTopic, WritingTopicSummary } from '../../types/domain';

type WritingShardModule = { default: WritingPracticeTopic[] };
const shardLoaders: Array<() => Promise<WritingShardModule>> = [
  () => import('./generated/shards/0.generated.json'),
  () => import('./generated/shards/1.generated.json'),
  () => import('./generated/shards/2.generated.json'),
  () => import('./generated/shards/3.generated.json'),
  () => import('./generated/shards/4.generated.json'),
  () => import('./generated/shards/5.generated.json'),
  () => import('./generated/shards/6.generated.json'),
  () => import('./generated/shards/7.generated.json'),
  () => import('./generated/shards/8.generated.json'),
  () => import('./generated/shards/9.generated.json'),
];
const cache = new Map<number, Promise<WritingPracticeTopic[]>>();

export const writingManifest = manifestData as WritingTopicSummary[];

export function loadWritingShard(shard: number): Promise<WritingPracticeTopic[]> {
  const existing = cache.get(shard);
  if (existing) return existing;
  const loader = shardLoaders[shard];
  if (!loader) return Promise.resolve([]);
  const request = loader().then((module) => module.default);
  cache.set(shard, request);
  return request;
}

export async function loadWritingTopic(id: string): Promise<WritingPracticeTopic | undefined> {
  const summary = writingManifest.find((item) => item.id === id);
  if (!summary) return undefined;
  const topics = await loadWritingShard(summary.shard);
  return topics.find((topic) => topic.id === id);
}

export function writingSessionIds(
  mode: 'daily' | 'it' | 'quick' | 'review' | 'browse',
  reviewIds: string[] = [],
): string[] {
  if (mode === 'review') return reviewIds;
  const candidates = writingManifest.filter((item) =>
    mode === 'daily' ? item.domain === 'daily-life' : mode === 'it' ? item.domain === 'it-work' : true,
  );
  const size = mode === 'quick' ? 3 : mode === 'browse' ? candidates.length : 5;
  return candidates.slice(0, size).map((item) => item.id);
}

