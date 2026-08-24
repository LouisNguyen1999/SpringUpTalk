import { readdirSync, readFileSync } from 'node:fs';
import type { WritingLearningMetadata, WritingPracticeTopic, WritingTopicSummary } from '../src/types/domain.ts';

function readJson<T>(url: URL): T {
  return JSON.parse(readFileSync(url, 'utf8')) as T;
}

export function loadWritingData() {
  const root = new URL('../src/data/writing/generated/', import.meta.url);
  const manifest = readJson<WritingTopicSummary[]>(new URL('writing-manifest.generated.json', root));
  const topics = readdirSync(new URL('shards/', root))
    .filter((file) => file.endsWith('.generated.json'))
    .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
    .flatMap((file) => readJson<WritingPracticeTopic[]>(new URL(`shards/${file}`, root)));
  const path = readJson<WritingLearningMetadata[]>(new URL('writing-learning-path.generated.json', root));
  return { manifest, path, topics };
}
