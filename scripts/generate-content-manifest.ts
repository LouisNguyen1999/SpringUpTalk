import { writeFileSync } from 'node:fs';
import { topics } from '../src/data/index.ts';
import { normalizeSearchText } from '../src/utils/search.ts';

const curatedSearchAliases: Record<string,string> = {
  'explaining-a-release-delay':'deadline',
};

const manifest = topics.map(({ conversations, ...topic }) => {
  const vocabularyTags = Array.from(new Set(
    conversations.flatMap((conversation) => conversation.turns.flatMap((turn) => turn.vocabulary?.map((item) => item.word) ?? [])),
  )).slice(0,7);
  return {
    ...topic,
    vocabularyTags,
    conversationCount: conversations.length,
    turnCount: conversations.reduce((sum, conversation) => sum + conversation.turns.length, 0),
    searchText: normalizeSearchText([
      topic.id,topic.title,topic.titleVi,topic.description,topic.category,topic.level,...topic.grammar,...vocabularyTags,
      ...conversations.flatMap((conversation) => [
        conversation.title,conversation.titleVi,conversation.intent ?? '',conversation.relationship ?? '',
      ]),
      curatedSearchAliases[topic.id] ?? '',
    ].join(' ')),
  };
});

const output = new URL('../src/data/topic-manifest.generated.json', import.meta.url);
writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Generated lightweight manifest for ${manifest.length} topics.`);
