import type { LineMeta } from '../content-builder';
import type { CommunicativeIntent, ConversationRelationship, Difficulty, SemanticConstraints } from '../../types/domain';
import { compactTopic, exchange, scenario } from './batch-a-compact';

export type BatchBStep = readonly [
  english: string,
  vietnamese: string,
  phrase: string,
  meaning: string,
  accepted?: readonly string[],
  semanticConstraints?: SemanticConstraints,
];

export interface BatchBBrief {
  title: string;
  titleVi: string;
  situation: string;
  goal: string;
  intent: CommunicativeIntent;
  relationship: ConversationRelationship;
  focusEn: string;
  focusVi: string;
  steps: readonly [BatchBStep, BatchBStep, BatchBStep, ...BatchBStep[]];
}

interface BatchBTopicSeed {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  icon: string;
  level: Difficulty;
  description: string;
  grammar: string[];
  briefs: readonly [BatchBBrief, BatchBBrief, BatchBBrief, ...BatchBBrief[]];
  briefIndexes?: readonly number[];
}

const prompts = [
  ['Bạn nói rõ {x} được không?', 'Could you explain {x}?'],
  ['Mình nên xử lý {x} thế nào?', 'How should we handle {x}?'],
  ['Khi xử lý {x}, còn điều gì quan trọng?', 'What else matters when dealing with {x}?'],
  ['Mình sẽ theo dõi {x} thế nào?', 'How will we follow up on {x}?'],
  ['Nếu {x} vẫn chưa ổn thì phương án dự phòng là gì?', 'What is our fallback if {x} is still unresolved?'],
] as const;

function lineMeta(constraints?: SemanticConstraints): LineMeta | undefined {
  return constraints ? { semanticConstraints:constraints } : undefined;
}

export function batchBBrief(
  title: string,
  titleVi: string,
  situation: string,
  goal: string,
  intent: CommunicativeIntent,
  relationship: ConversationRelationship,
  focusEn: string,
  focusVi: string,
  steps: readonly [BatchBStep, BatchBStep, BatchBStep, ...BatchBStep[]],
): BatchBBrief {
  return { title,titleVi,situation,goal,intent,relationship,focusEn,focusVi,steps };
}

export function batchBTopic(seed: BatchBTopicSeed) {
  const selectedBriefs = seed.briefIndexes
    ? seed.briefIndexes.map((index) => seed.briefs[index]).filter((brief): brief is BatchBBrief => Boolean(brief))
    : seed.briefs;
  return compactTopic({
    ...seed,
    scenarios: selectedBriefs.map((brief) => scenario(
      brief.title,brief.titleVi,brief.situation,brief.goal,brief.intent,brief.relationship,
      brief.steps.map(([en,vi,phrase,meaning,accepted,constraints],index) => {
        const prompt = prompts[Math.min(index,prompts.length - 1)]!;
        return exchange(
          prompt[0].replace('{x}',brief.focusVi),
          prompt[1].replace('{x}',brief.focusEn),
          vi,en,phrase,meaning,accepted,undefined,lineMeta(constraints),
        );
      }),
    )) as unknown as Parameters<typeof compactTopic>[0]['scenarios'],
  });
}
