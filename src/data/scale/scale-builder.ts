import { buildTopic, type TopicSeed } from '../content-builder';
import { depthConversation, type Exchange } from '../depth/depth-builder';
import type { CommunicativeIntent, ConversationRelationship } from '../../types/domain';

export type Scenario = readonly [
  title: string,
  titleVi: string,
  situation: string,
  goal: string,
  exchanges: readonly Exchange[],
  intent?: CommunicativeIntent,
  relationship?: ConversationRelationship,
];

type ScaleTopicSeed = Omit<TopicSeed, 'conversations'> & {
  scenarios: readonly [Scenario, Scenario, Scenario, ...Scenario[]];
};

export function scaleTopic({ scenarios, ...topic }: ScaleTopicSeed) {
  return buildTopic({
    ...topic,
    conversations: scenarios.map((scenario) => depthConversation(...scenario)) as TopicSeed['conversations'],
  });
}
