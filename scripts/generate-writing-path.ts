import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildWritingLearningMetadata } from '../src/engine/writing-learning-path/model';
import type { WritingPracticeTopic } from '../src/types/domain';

const projectRoot = new URL('../', import.meta.url);
const shardRoot = new URL('src/data/writing/generated/shards/', projectRoot);
const output = new URL('src/data/writing/generated/writing-learning-path.generated.json', projectRoot);

const topics = Array.from({ length: 10 }, (_, shard) => {
  const path = new URL(`${shard}.generated.json`, shardRoot);
  return JSON.parse(readFileSync(path, 'utf8')) as WritingPracticeTopic[];
}).flat();

if (topics.length !== 500) {
  throw new Error(`Writing Learning Path requires exactly 500 topics; found ${topics.length}.`);
}

const metadata = buildWritingLearningMetadata(topics);
mkdirSync(new URL('.', output), { recursive: true });
writeFileSync(fileURLToPath(output), `${JSON.stringify(metadata, null, 2)}\n`);

console.log(`Writing Learning Path generated: ${metadata.length} topics · 24 units`);
