import type { CommunicativeIntent, ConversationRelationship, Difficulty } from '../../types/domain';
import { batchCBrief, batchCTopic, type BatchCBrief } from './batch-c-expansion-builder';

export type BatchDBrief = BatchCBrief;

interface BatchDTopicSeed {
  id:string;
  title:string;
  titleVi:string;
  category:string;
  icon:string;
  level:Difficulty;
  description:string;
  grammar:string[];
  intent:CommunicativeIntent;
  relationship:ConversationRelationship;
  briefs:readonly [BatchDBrief,BatchDBrief,BatchDBrief,...BatchDBrief[]];
}

/** Batch D keeps the proven balanced dialogue shape while requiring authored, case-specific briefs. */
export function batchDBrief(...value:BatchDBrief):BatchDBrief {
  return batchCBrief(...value);
}

export function batchDTopic(seed:BatchDTopicSeed) {
  if (!seed.id.startsWith('batch-d-')) throw new Error(`Batch D topic id must start with batch-d-: ${seed.id}`);
  return batchCTopic(seed);
}
