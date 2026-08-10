import type { ConversationSeed, Line, LineMeta } from '../content-builder';

export type Exchange = readonly [
  vietnameseA: string,
  englishA: string,
  vietnameseB: string,
  englishB: string,
  vocabulary?: readonly [word: string, meaning: string],
  acceptedB?: readonly string[],
];

export function depthConversation(
  title: string,
  titleVi: string,
  situation: string,
  goal: string,
  exchanges: readonly Exchange[],
): ConversationSeed {
  const lines: Line[] = exchanges.flatMap(([vietnameseA, englishA, vietnameseB, englishB, vocabulary, acceptedB]) => {
    const meta: LineMeta | undefined = vocabulary || acceptedB?.length ? {
      accepted: acceptedB ? [...acceptedB] : undefined,
      vocabulary: vocabulary ? [{ word:vocabulary[0], meaning:vocabulary[1], example:englishB }] : undefined,
      explanation:'Cách diễn đạt này phù hợp với quan hệ và mục đích giao tiếp trong tình huống.',
    } : undefined;
    return [
      ['A', vietnameseA, englishA] as Line,
      ['B', vietnameseB, englishB, meta] as Line,
    ];
  });
  return { title, titleVi, situation, goal, lines };
}
