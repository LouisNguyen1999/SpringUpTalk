import type { LineMeta } from '../content-builder';
import type { CommunicativeIntent, ConversationRelationship, Difficulty } from '../../types/domain';
import { scaleTopic } from './scale-builder';

export type CompactExchange = readonly [
  vietnameseA: string,
  englishA: string,
  vietnameseB: string,
  englishB: string,
  phrase: string,
  meaning: string,
  acceptedB?: readonly string[],
  metaA?: LineMeta,
  metaB?: LineMeta,
];

export type CompactScenario = readonly [
  title: string,
  titleVi: string,
  situation: string,
  goal: string,
  intent: CommunicativeIntent,
  relationship: ConversationRelationship,
  exchanges: readonly [CompactExchange, CompactExchange, CompactExchange, ...CompactExchange[]],
];

export function exchange(...value: CompactExchange): CompactExchange {
  return value;
}

export function scenario(
  title: string,
  titleVi: string,
  situation: string,
  goal: string,
  intent: CommunicativeIntent,
  relationship: ConversationRelationship,
  exchanges: readonly CompactExchange[],
): CompactScenario {
  if (exchanges.length < 3) throw new Error(`Scenario ${title} requires at least three exchanges.`);
  return [title, titleVi, situation, goal, intent, relationship, exchanges as CompactScenario[6]];
}

interface CompactTopicSeed {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  icon: string;
  level: Difficulty;
  description: string;
  grammar: string[];
  scenarios: readonly [CompactScenario, CompactScenario, CompactScenario, ...CompactScenario[]];
}

/** A compact authoring adapter; it does not generate or repeat dialogue text. */
export function compactTopic(seed: CompactTopicSeed) {
  return scaleTopic({
    ...seed,
    scenarios: seed.scenarios.map(([title, titleVi, situation, goal, intent, relationship, exchanges]) => [
      title,
      titleVi,
      situation,
      goal,
      exchanges.map(([viA, enA, viB, enB, phrase, meaning, acceptedB, metaA, metaB]) => [
        viA,
        enA,
        viB,
        enB,
        [phrase, meaning],
        acceptedB,
        metaA,
        metaB,
      ]),
      intent,
      relationship,
    ]) as Parameters<typeof scaleTopic>[0]['scenarios'],
  });
}

export type PracticalBrief = readonly [
  title: string, titleVi: string, situation: string, goal: string,
  intent: CommunicativeIntent, relationship: ConversationRelationship,
  focusEn: string, focusVi: string,
  detailEn: string, detailVi: string,
  actionEn: string, actionVi: string,
  followUpEn: string, followUpVi: string,
];

interface PracticalTopicSeed extends Omit<CompactTopicSeed, 'scenarios'> {
  briefs: readonly [PracticalBrief, PracticalBrief, PracticalBrief, ...PracticalBrief[]];
}

/** Turns a fully authored situation brief into a balanced six-turn role-play. */
export function practicalTopic({ briefs, ...seed }: PracticalTopicSeed) {
  const prompts = [
    ['Mình trao đổi về', 'Can we go over', 'Theo bạn, bước tiếp theo cho', 'What should we do next about', 'Khi nào mình nên kiểm tra lại', 'When should we check'],
    ['Bạn cập nhật giúp mình về', 'Could you update me on', 'Mình nên xử lý', 'How should we handle', 'Mình sẽ xác nhận kết quả của', 'How will we confirm'],
    ['Mình muốn làm rõ', 'I would like to clarify', 'Phương án phù hợp nhất cho', 'What is the best approach to', 'Ai sẽ theo dõi', 'Who will follow up on'],
    ['Mình cùng xem lại', 'Could we review', 'Chúng ta có thể thống nhất gì về', 'What can we agree on for', 'Bước cuối của', 'What is the final step for'],
    ['Mình xử lý dứt điểm', 'Can we resolve', 'Bạn đề xuất gì cho', 'What do you suggest for', 'Điều gì sẽ cho thấy kết quả của', 'What will show the outcome of'],
  ] as const;
  return compactTopic({
    ...seed,
    scenarios: briefs.map((brief, index) => {
      const [title,titleVi,situation,goal,intent,relationship,focusEn,focusVi,detailEn,detailVi,actionEn,actionVi,followUpEn,followUpVi] = brief;
      const p = prompts[index % prompts.length]!;
      return scenario(title,titleVi,situation,goal,intent,relationship,[
        exchange(`${p[0]} ${focusVi}${index === 2 ? '.' : ' nhé?'}`,`${p[1]} ${focusEn}?`,detailVi,detailEn,focusEn,focusVi),
        exchange(`${p[2]} ${focusVi}?`,`${p[3]} ${focusEn}?`,actionVi,actionEn,`handle ${focusEn}`,`xử lý ${focusVi}`),
        exchange(`${p[4]} ${focusVi}?`,`${p[5]} ${focusEn}?`,followUpVi,followUpEn,`follow up on ${focusEn}`,`theo dõi ${focusVi}`),
      ]);
    }) as CompactTopicSeed['scenarios'],
  });
}
