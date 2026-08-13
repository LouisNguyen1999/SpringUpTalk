import type { LineMeta } from '../content-builder';
import type { CommunicativeIntent, ConversationRelationship, Difficulty } from '../../types/domain';
import { compactTopic, exchange, scenario } from './batch-a-compact';

export type BatchCBrief = readonly [
  title: string,
  titleVi: string,
  focusEn: string,
  focusVi: string,
  factEn: string,
  factVi: string,
];

interface BatchCTopicSeed {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  icon: string;
  level: Difficulty;
  description: string;
  grammar: string[];
  intent: CommunicativeIntent;
  relationship: ConversationRelationship;
  briefs: readonly [BatchCBrief, BatchCBrief, BatchCBrief, ...BatchCBrief[]];
}

type Prompt = readonly [vi: string, en: string, acceptedOne: string, acceptedTwo: string];

const promptFamilies: readonly (readonly [Prompt, Prompt, Prompt, Prompt, Prompt])[] = [
  [
    ['Mình làm rõ {v} trước nhé?', 'Could we clarify {e} first?', 'Can we clear up {e} first?', 'Would you mind confirming {e} first?'],
    ['Bước hợp lý cho {v} là gì?', 'What is a practical next step for {e}?', 'What should we do next about {e}?', 'How would you move {e} forward?'],
    ['Có giới hạn nào với {v}?', 'Is there a constraint on {e}?', 'What limitation applies to {e}?', 'Do we need to allow for any limit on {e}?'],
    ['Mình xác nhận kết quả của {v} nhé?', 'Can we confirm the outcome for {e}?', 'Could we agree the result for {e}?', 'Shall we confirm where {e} now stands?'],
    ['Nếu chưa ổn thì xử lý {v} thế nào?', 'What is the fallback if {e} remains unresolved?', 'What else can we try if {e} does not work?', 'How should we respond if {e} is still open?'],
  ],
  [
    ['Mình cùng trao đổi kỹ về {v} nhé?', 'Could we talk through {e}?', 'Can we go over {e} together?', 'Would you discuss {e} with me?'],
    ['Bước tiếp theo cho {v} là gì?', 'What should we do next about {e}?', 'How should we handle {e} next?', 'What is the best next step for {e}?'],
    ['Trước khi làm, mình cần lưu ý gì về {v}?', 'What should we watch for with {e}?', 'What do we need to bear in mind about {e}?', 'Is there anything important to consider about {e}?'],
    ['Mình có thể chốt {v} chưa?', 'Can we confirm the outcome for {e}?', 'Could we agree where {e} now stands?', 'Are we ready to confirm {e}?'],
    ['Nếu kế hoạch đổi thì {v} sẽ ra sao?', 'How will we handle {e} if the plan changes?', 'What happens to {e} if circumstances change?', 'How can we adapt {e} if needed?'],
  ],
  [
    ['Mình muốn kiểm tra lại {v}.', 'I would like to double-check {e}.', 'Could I verify {e} with you?', 'Can we make sure we agree on {e}?'],
    ['Bạn đề xuất cách nào cho {v}?', 'What approach would you suggest for {e}?', 'How do you propose handling {e}?', 'What option makes most sense for {e}?'],
    ['Yếu tố nào ảnh hưởng đến {v}?', 'Which factor could affect {e}?', 'What could get in the way of {e}?', 'What dependency matters most for {e}?'],
    ['Mình có thể chốt kết quả của {v} chưa?', 'Can we confirm the outcome for {e}?', 'Could we agree where {e} now stands?', 'How should we document the result for {e}?'],
    ['Nếu phát sinh vấn đề, ai xem lại {v}?', 'Who will revisit {e} if an issue comes up?', 'Who should review {e} if the situation changes?', 'Who can reassess {e} if necessary?'],
  ],
  [
    ['Theo bạn, điểm chính của {v} là gì?', 'What is your understanding of {e}?', 'How do you interpret {e}?', 'Could you explain how you see {e}?'],
    ['Mình nên ưu tiên gì khi xử lý {v}?', 'What should we prioritize when handling {e}?', 'What matters most as we address {e}?', 'Which part of {e} should come first?'],
    ['Giả định nào cần kiểm tra cho {v}?', 'Which assumption about {e} needs checking?', 'What are we assuming about {e}?', 'Is there an assumption behind {e} we should test?'],
    ['Quyết định cuối về {v} là gì?', 'Where have we landed on {e}?', 'What have we finally agreed about {e}?', 'Can we state the final decision on {e}?'],
    ['Nếu kết quả của {v} khác dự kiến thì sao?', 'What will we do if {e} turns out differently?', 'How will we adjust if {e} changes?', 'What is our response if {e} misses the expected result?'],
  ],
];

const a1Prompts: readonly Prompt[] = [
  ['Bạn xác nhận giúp {v} nhé?', 'Could you confirm {e}?', 'Can you clarify {e}?', 'Would you confirm {e}?'],
  ['Mình nên làm gì với {v}?', 'What should we do about {e}?', 'How should we handle {e}?', 'What is the next step for {e}?'],
  ['Mình đã thống nhất {v} chưa?', 'Do we agree on {e}?', 'Can we confirm {e}?', 'Are the details of {e} correct?'],
];

const actionFamilies = [
  ['Let us use that detail to decide what to do about {e}.', 'Mình hãy dùng chi tiết đó để quyết định cách xử lý {v}.'],
  ['One person should now take responsibility for {e}.', 'Giờ cần một người nhận trách nhiệm về {v}.'],
  ['Let us compare the available choices for {e}.', 'Mình hãy so các lựa chọn hiện có cho {v}.'],
  ['We can act after both people confirm {e}.', 'Mình có thể hành động sau khi cả hai xác nhận {v}.'],
  ['A short written message can confirm {e}.', 'Một tin nhắn ngắn có thể xác nhận {v}.'],
  ['Let us agree who will handle {e} and when.', 'Mình hãy thống nhất ai sẽ xử lý {v} và khi nào.'],
] as const;

const guardFamilies = [
  ['We should not change any confirmed detail about {e}.', 'Mình không nên đổi chi tiết đã xác nhận về {v}.'],
  ['Timing and availability may limit our choices for {e}.', 'Thời gian và khả năng có thể giới hạn lựa chọn cho {v}.'],
  ['We need one clear confirmation before acting on {e}.', 'Mình cần một xác nhận rõ trước khi xử lý {v}.'],
  ['Everyone affected should hear about any change to {e}.', 'Mọi người liên quan cần biết nếu {v} thay đổi.'],
  ['We should respect the agreed limit for {e}.', 'Mình nên tôn trọng giới hạn đã thống nhất cho {v}.'],
  ['We should distinguish facts about {e} from assumptions.', 'Mình nên phân biệt sự thật và giả định về {v}.'],
] as const;

const outcomeFamilies = [
  ['The final message will confirm {e} and the next check-in.', 'Tin nhắn cuối sẽ xác nhận {v} và lần kiểm tra tiếp theo.'],
  ['Both sides will receive a record of the decision on {e}.', 'Hai bên sẽ nhận bản ghi quyết định về {v}.'],
  ['The responsible person will confirm {e} by the agreed time.', 'Người phụ trách sẽ xác nhận {v} vào thời gian đã thống nhất.'],
  ['We will close {e} after the result has been checked.', 'Mình sẽ kết thúc {v} sau khi kết quả được kiểm tra.'],
  ['A written summary will show exactly what was agreed about {e}.', 'Bản tóm tắt sẽ nêu chính xác điều đã thống nhất về {v}.'],
  ['The follow-up will record the result of {e} without ambiguity.', 'Phần theo dõi sẽ ghi kết quả của {v} một cách rõ ràng.'],
] as const;

const fallbackFamilies = [
  ['If {e} is still unresolved, we will raise it with the appropriate contact.', 'Nếu {v} vẫn chưa xong, mình sẽ chuyển đến đầu mối phù hợp.'],
  ['If the first action fails, we will reopen {e} with the supporting facts.', 'Nếu bước đầu không hiệu quả, mình sẽ xem lại {v} cùng thông tin hỗ trợ.'],
  ['If circumstances change, we will reassess {e} rather than assume.', 'Nếu hoàn cảnh thay đổi, mình sẽ đánh giá lại {v} thay vì tự suy đoán.'],
  ['If no confirmation arrives, we will follow up separately about {e}.', 'Nếu chưa có xác nhận, mình sẽ hỏi lại riêng về {v}.'],
  ['If the result is disputed, both sides will review the record of {e}.', 'Nếu kết quả bị phản đối, hai bên sẽ xem lại bản ghi về {v}.'],
  ['If the agreed option becomes unavailable, we will compare alternatives for {e}.', 'Nếu phương án đã chốt không còn, mình sẽ so lựa chọn khác cho {v}.'],
] as const;

function fill(template: string, focusEn: string, focusVi: string) {
  return template.replaceAll('{e}', focusEn).replaceAll('{v}', focusVi);
}

function acceptedMeta(prompt: Prompt, focusEn: string, focusVi: string): LineMeta {
  return {
    accepted: [fill(prompt[2], focusEn, focusVi), fill(prompt[3], focusEn, focusVi)],
    alternatives: [fill(prompt[2], focusEn, focusVi), fill(prompt[3], focusEn, focusVi)],
  };
}

function topicHash(value: string) {
  return [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0);
}

export function batchCBrief(...value: BatchCBrief): BatchCBrief {
  return value;
}

export function batchCTopic(seed: BatchCTopicSeed) {
  const exchangeCount = seed.level === 'A1' ? 3 : seed.level === 'B2' ? 5 : 4;
  const hash = topicHash(seed.id);
  return compactTopic({
    ...seed,
    scenarios: seed.briefs.map((brief, briefIndex) => {
      const [title, titleVi, focusEn, focusVi, factEn, factVi] = brief;
      const family = seed.level === 'A1' ? a1Prompts : promptFamilies[(hash + briefIndex) % promptFamilies.length]!;
      const derived = [actionFamilies, guardFamilies, outcomeFamilies, fallbackFamilies].map((templates, index) => templates[(hash + briefIndex * 2 + index) % templates.length]!);
      const responses = seed.level === 'A1'
        ? [[factEn,factVi] as const,[`Let us check ${focusEn} together.`,`Mình hãy cùng kiểm tra ${focusVi}.`] as const,[`We now both understand ${focusEn}.`,`Giờ cả hai đã hiểu ${focusVi}.`] as const]
        : [[factEn, factVi] as const, ...derived.map(([en, vi]) => [fill(en, focusEn, focusVi), fill(vi, focusEn, focusVi)] as const)];
      const exchanges = Array.from({ length: exchangeCount }, (_, exchangeIndex) => {
        const prompt = family[exchangeIndex]!;
        const response = responses[exchangeIndex]!;
        const vocabulary = exchangeIndex === 0 ? focusEn : `${['advance', 'safeguard', 'confirm', 'revisit'][exchangeIndex - 1]} ${focusEn}`;
        const meaning = exchangeIndex === 0 ? focusVi : `${['tiếp tục', 'bảo đảm', 'xác nhận', 'xem lại'][exchangeIndex - 1]} ${focusVi}`;
        return exchange(
          fill(prompt[0], focusEn, focusVi),
          fill(prompt[1], focusEn, focusVi),
          response[1],
          response[0],
          vocabulary,
          meaning,
          undefined,
          acceptedMeta(prompt, focusEn, focusVi),
        );
      });
      return scenario(
        title,
        titleVi,
        `Hai người xử lý ${focusVi} trong tình huống “${seed.titleVi.toLowerCase()}”.`,
        `Làm rõ ${focusVi}, cân nhắc giới hạn và thống nhất kết quả cho “${titleVi.toLowerCase()}”.`,
        seed.intent,
        seed.relationship,
        exchanges,
      );
    }) as Parameters<typeof compactTopic>[0]['scenarios'],
  });
}
