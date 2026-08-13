import type { ConversationSeed, Line, LineMeta } from '../content-builder';
import type { CommunicativeIntent, ConversationRelationship } from '../../types/domain';

export type Exchange = readonly [
  vietnameseA: string,
  englishA: string,
  vietnameseB: string,
  englishB: string,
  vocabulary?: readonly [word: string, meaning: string],
  acceptedB?: readonly string[],
  metaA?: LineMeta,
  metaB?: LineMeta,
];

export function depthConversation(
  title: string,
  titleVi: string,
  situation: string,
  goal: string,
  exchanges: readonly Exchange[],
  intent?: CommunicativeIntent,
  relationship?: ConversationRelationship,
): ConversationSeed {
  const lines: Line[] = exchanges.flatMap(([vietnameseA, englishA, vietnameseB, englishB, vocabulary, acceptedB, metaA, metaB]) => {
    const mergedMetaB: LineMeta | undefined = vocabulary || acceptedB?.length || metaB ? {
      ...metaB,
      accepted: [...(acceptedB ?? []),...(metaB?.accepted ?? [])],
      vocabulary: vocabulary ? [{ word:vocabulary[0], meaning:vocabulary[1], example:englishB },...(metaB?.vocabulary ?? [])] : metaB?.vocabulary,
      explanation:metaB?.explanation ?? 'Cách diễn đạt này phù hợp với quan hệ và mục đích giao tiếp trong tình huống.',
    } : undefined;
    return [
      ['A', vietnameseA, englishA, metaA] as Line,
      ['B', vietnameseB, englishB, mergedMetaB] as Line,
    ];
  });
  return { title, titleVi, situation, goal, intent, relationship, lines };
}
