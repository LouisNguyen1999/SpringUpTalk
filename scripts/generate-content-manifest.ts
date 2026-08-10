import { writeFileSync } from 'node:fs';
import { topics } from '../src/data/index.ts';

const manifest = topics.map(({ conversations, ...topic }) => ({
  ...topic,
  conversationCount: conversations.length,
  turnCount: conversations.reduce((sum, conversation) => sum + conversation.turns.length, 0),
}));

const output = new URL('../src/data/topic-manifest.generated.json', import.meta.url);
writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated lightweight manifest for ${manifest.length} topics.`);
