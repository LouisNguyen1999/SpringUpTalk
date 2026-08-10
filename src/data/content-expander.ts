import { buildAdditionalConversation, type ConversationSeed } from './content-builder';
import type { Topic } from '../types/domain';

export type ConversationAdditions = Record<string, readonly ConversationSeed[]>;

export function applyConversationAdditions(topics: Topic[], additions: ConversationAdditions): Topic[] {
  return topics.map((topic) => {
    const extra = additions[topic.id] ?? [];
    if (!extra.length) return topic;
    const conversations = [
      ...topic.conversations,
      ...extra.map((conversation, offset) => buildAdditionalConversation(topic, conversation, topic.conversations.length + offset)),
    ];
    return {
      ...topic,
      conversations,
      vocabularyTags: Array.from(new Set(conversations.flatMap((conversation) => conversation.turns.flatMap((turn) => [
        ...(turn.requiredKeywords ?? []),
        ...(turn.vocabulary?.map((item) => item.word) ?? []),
      ])))),
    };
  });
}
