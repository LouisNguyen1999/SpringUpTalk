import { mkdirSync, writeFileSync } from 'node:fs';
import { contentRepository, topicManifest } from '../src/data/content-repository.ts';
import type {
  CommonMistake,
  ConversationTurn,
  Difficulty,
  Topic,
  WritingArcStage,
  WritingContentType,
  WritingCriticalFact,
  WritingIdeaKind,
  WritingPracticeTopic,
  WritingTopicSummary,
} from '../src/types/domain.ts';

const outputRoot = new URL('../src/data/writing/generated/', import.meta.url);
const shardRoot = new URL('shards/', outputRoot);
const ranges: Record<Difficulty, [number, number]> = {
  A1: [20, 40], A2: [30, 60], B1: [50, 90], B2: [70, 130],
};
const IT_CATEGORIES = new Set(['Work', 'Technology', 'Professional Communication', 'Business']);
const PROBLEM_PATTERN = /\b(bug|issue|incident|problem|error|fail|failure|delay|late|missing|wrong|broken|blocker|risk|complaint|refund|cancel|conflict|disagreement|timeout|unavailable|outage|lost|mistake|concern|fix|repair|change|trouble)\b|sự cố|vấn đề|lỗi|thất bại|chậm|trễ|thiếu|sai|hỏng|rủi ro|phàn nàn|hoàn tiền|hủy|mâu thuẫn|không thể|khắc phục|sửa|thay đổi/iu;
const CRITICAL_MEASUREMENT_PATTERN = /\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|sixty|ninety)\s+(?:minutes?|hours?|days?|weeks?|months?|years?|a\.m\.?|p\.m\.?)\b/i;

function sentence(value: string): string {
  const trimmed = value.trim();
  return /[.!?]["”']?$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function unique(values: Array<string | undefined>): string[] {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean) as string[]));
}

function quoteText(value: string): string {
  return value.trim().replace(/[“”]/g, "'");
}

function translationReadyVietnamese(value: string): string {
  return value
    .replace(/Bạn sẽ làm gì để ([^?]+)\?/giu, 'Kế hoạch để $1 là gì?')
    .replace(/Hãy viết rằng/giu, 'Lời nhắn nên nói rằng')
    .replace(/Hãy giải thích/giu, 'Cần giải thích')
    .replace(/(Mỗi người|Mọi người) hãy mô tả/giu, '$1 cần mô tả')
    .replace(/hãy mô tả/giu, 'nên mô tả')
    .replace(/Hãy nói về/giu, 'Nội dung nên tập trung vào')
    .replace(/Hãy thay bằng/giu, 'Nội dung đó nên được thay bằng');
}

function classifyWritingType(source: Topic, conversation: Topic['conversations'][number]): WritingContentType {
  const evidence = [source.title, source.category, conversation.title, conversation.titleVi, conversation.situation, conversation.goal].join(' ');
  return PROBLEM_PATTERN.test(evidence) ? 'problem-explanation' : 'story';
}

function targetIdeaCount(level: Difficulty, available: number): number {
  const target: Record<Difficulty, number> = { A1: 4, A2: 4, B1: 6, B2: 7 };
  return Math.min(target[level], available);
}

function selectStoryTurns(turns: ConversationTurn[], count: number): ConversationTurn[] {
  if (turns.length <= count) return turns;
  const openingCount = Math.ceil(count / 2);
  const closingCount = count - openingCount;
  return [...turns.slice(0, openingCount), ...turns.slice(turns.length - closingCount)];
}

const STORY_STAGES: Record<number, WritingArcStage[]> = {
  3: ['context', 'event', 'result'],
  4: ['context', 'event', 'action', 'result'],
  5: ['context', 'event', 'cause', 'action', 'result'],
  6: ['context', 'event', 'cause', 'action', 'result', 'next-step'],
  7: ['context', 'event', 'cause', 'impact', 'action', 'result', 'next-step'],
};
const PROBLEM_STAGES: Record<number, WritingArcStage[]> = {
  3: ['problem', 'action', 'result'],
  4: ['problem', 'cause', 'action', 'result'],
  5: ['problem', 'cause', 'action', 'result', 'next-step'],
  6: ['problem', 'cause', 'impact', 'action', 'result', 'next-step'],
  7: ['context', 'problem', 'cause', 'impact', 'action', 'result', 'next-step'],
};

function arcStages(type: WritingContentType, count: number): WritingArcStage[] {
  const stages = (type === 'story' ? STORY_STAGES : PROBLEM_STAGES)[count];
  return stages ?? Array.from({ length: count }, (_, index) => index === 0 ? (type === 'story' ? 'context' : 'problem') : index === count - 1 ? 'result' : 'action');
}

const STAGE_LABELS: Record<WritingArcStage, string> = {
  context: 'Bối cảnh',
  event: 'Sự việc',
  problem: 'Vấn đề',
  cause: 'Chi tiết dẫn đến tình huống',
  impact: 'Ảnh hưởng',
  action: 'Cách xử lý',
  result: 'Kết quả',
  reflection: 'Điều rút ra',
  'next-step': 'Bước tiếp theo',
};

function buildVietnameseSourceText(turns: ConversationTurn[]): string {
  return turns.map((turn, index) => {
    const subject = turn.speaker === 'A' ? (index === 0 ? 'Tôi' : 'tôi') : (index === 0 ? 'Người kia' : 'người kia');
    const previous = turns[index - 1];
    const isQuestion = turn.vietnamese.trim().endsWith('?');
    const sameSpeaker = previous?.speaker === turn.speaker;
    const connector = index === 0 ? '' : index === turns.length - 1 ? 'Cuối cùng, ' : index === 1 ? 'Sau đó, ' : 'Tiếp theo, ';
    let action: string;
    if (index === 0) action = isQuestion ? 'mở đầu cuộc trao đổi bằng cách hỏi' : 'mở đầu cuộc trao đổi bằng cách nói';
    else if (isQuestion) action = sameSpeaker ? 'hỏi thêm' : 'hỏi lại';
    else action = sameSpeaker ? 'nói thêm' : 'trả lời';
    return `${connector}${subject} ${action}: “${sentence(quoteText(translationReadyVietnamese(turn.vietnamese)))}”`;
  }).join(' ');
}

function sampleVariant(turn: ConversationTurn, variant: number): string {
  if (variant === 0 || CRITICAL_MEASUREMENT_PATTERN.test(turn.canonicalAnswer)) return sentence(turn.canonicalAnswer);
  if (variant === 1) return sentence(alternate(turn, variant));
  return sentence(turn.naturalAlternatives[variant % Math.max(1, turn.naturalAlternatives.length)] ?? alternate(turn, variant));
}

function buildSample(turns: ConversationTurn[], type: WritingContentType, variant: number): string {
  const openers = type === 'story'
    ? ['This is how my conversation unfolded.', 'Here is what happened during my conversation.', 'I can retell the exchange in my own words.']
    : ['This is how I explained the issue.', 'Here is how the other person and I discussed the problem.', 'I clarified the situation during the conversation.'];
  const connectors = ['At first', 'Next', 'After that', 'Then', 'Later', 'Finally', 'As a next step'];
  const lines = turns.map((turn, index) => {
    const person = turn.speaker === 'A' ? 'I' : 'the other person';
    const verb = index === 0 ? 'said' : index === turns.length - 1 ? 'concluded' : turn.canonicalAnswer.trim().endsWith('?') ? 'asked' : 'explained';
    return `${connectors[index] ?? 'Then'}, ${person} ${verb}, “${quoteText(sampleVariant(turn, variant))}”`;
  });
  return `${openers[variant] ?? openers[0]} ${lines.join(' ')}`;
}

function alternate(turn: ConversationTurn, index: number): string {
  return (
    turn.acceptedAnswers.find((item) => item !== turn.canonicalAnswer) ??
    turn.naturalAlternatives[index % Math.max(1, turn.naturalAlternatives.length)] ??
    turn.canonicalAnswer
  );
}

function extractCriticalFacts(turns: ConversationTurn[]): WritingCriticalFact[] {
  const facts: WritingCriticalFact[] = [];
  const numberPattern = /\b(?:a\s+)?(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|sixty|ninety|couple(?: of)?)\s+(minutes?|hours?|days?|weeks?|months?|years?|a\.m\.?|p\.m\.?)\b/gi;
  for (const turn of turns) {
    const variants = [turn.canonicalAnswer, ...turn.acceptedAnswers, ...turn.naturalAlternatives];
    const matches = [...turn.canonicalAnswer.matchAll(numberPattern)];
    for (const [index, match] of matches.entries()) {
      const unit = match[2]?.toLocaleLowerCase('en') ?? '';
      const expected = unique(
        variants.flatMap((variant) =>
          [...variant.matchAll(numberPattern)]
            .filter((candidate) => candidate[2]?.toLocaleLowerCase('en') === unit)
            .map((candidate) => candidate[0]),
        ),
      );
      facts.push({
        id: `fact-${turn.id}-${index + 1}`,
        labelVietnamese: match[0],
        type: unit.includes('minute') || unit.includes('hour') ? 'time' : 'number',
        expected,
      });
    }
  }
  return facts.slice(0, 3);
}

function inferIdeaKind(turn: ConversationTurn): WritingIdeaKind {
  const value = `${turn.vietnamese} ${turn.canonicalAnswer}`.toLocaleLowerCase('en');
  if (/because|reason|cause|due to|vì|lý do|nguyên nhân/.test(value)) return 'cause-explanation';
  if (/minute|hour|today|tomorrow|yesterday|when|time|date|phút|giờ|ngày|lúc|khi/.test(value)) return 'time-details';
  if (/\bwill\b|plan|intend|sẽ|dự định|kế hoạch/.test(value)) return 'future-plan';
  if (/could you|would you|please|request|vui lòng|có thể|nhờ/.test(value)) return 'polite-request';
  if (/result|recover|complete|fixed|back up|kết quả|hoàn thành|khôi phục|hoạt động lại/.test(value)) return 'outcome';
  return 'action';
}

function buildWritingTopic(
  source: Topic,
  domain: 'daily-life' | 'it-work',
  conversationIndex: number,
): WritingPracticeTopic {
  const conversation = source.conversations[conversationIndex] ?? source.conversations[0];
  if (!conversation) throw new Error(`Topic ${source.id} has no conversation.`);
  const writingType = classifyWritingType(source, conversation);
  const selected = selectStoryTurns(conversation.turns, targetIdeaCount(source.level, conversation.turns.length));
  const stages = arcStages(writingType, selected.length);
  const sampleAnswers = [0, 1, 2].map((variant) => buildSample(selected, writingType, variant));
  const commonMistakes = selected.flatMap((turn) => turn.commonMistakes ?? []);
  const usefulVocabulary = unique([
    ...source.vocabularyTags,
    ...selected.flatMap((turn) => turn.vocabulary?.map((item) => item.word) ?? []),
  ]).slice(0, 8);
  const requiredIdeas = selected.map((turn, turnIndex) => ({
    id: `idea-${turnIndex + 1}`,
    labelVietnamese: translationReadyVietnamese(turn.vietnamese),
    concepts: unique([
      turn.canonicalAnswer,
      ...turn.acceptedAnswers,
      ...turn.naturalAlternatives,
    ]),
    kind: inferIdeaKind(turn),
    arcStage: stages[turnIndex],
    weight: turnIndex === 0 ? 1.2 : 1,
  }));

  return {
    id: domain === 'it-work' ? `writing:${source.id}:${conversation.id}` : `writing:${source.id}`,
    titleEnglish: writingType === 'story' ? `What Happened: ${conversation.title}` : `Explain the Problem: ${conversation.title}`,
    titleVietnamese: writingType === 'story' ? `Kể lại: ${conversation.titleVi}` : `Giải thích vấn đề: ${conversation.titleVi}`,
    category: source.category,
    domain,
    level: source.level,
    writingType,
    context: conversation.situation,
    vietnameseSourceText: buildVietnameseSourceText(selected),
    requiredIdeas,
    criticalFacts: extractCriticalFacts(selected),
    usefulVocabulary: usefulVocabulary.length ? usefulVocabulary : source.grammar.slice(0, 5),
    usefulStructures: source.grammar.slice(0, 5),
    sampleAnswers: sampleAnswers.slice(0, 3),
    hints: [
      { level: 1, title: 'Keywords', content: usefulVocabulary.slice(0, 6) },
      { level: 2, title: 'Useful structures', content: source.grammar.slice(0, 5) },
      {
        level: 3,
        title: 'Suggested outline',
        content: requiredIdeas.map((idea, ideaIndex) => `${ideaIndex + 1}. ${STAGE_LABELS[idea.arcStage ?? 'action']}: ${idea.labelVietnamese}`),
      },
    ],
    commonMistakes: uniqueMistakes(commonMistakes),
    expectedWordRange: ranges[source.level],
    sourceTopicId: source.id,
  };
}

function uniqueMistakes(mistakes: CommonMistake[]): CommonMistake[] {
  return mistakes.filter(
    (mistake, index, all) => all.findIndex((candidate) => candidate.pattern === mistake.pattern) === index,
  ).slice(0, 6);
}

mkdirSync(shardRoot, { recursive: true });
const topics = (await Promise.all(topicManifest.map((summary) => contentRepository.getTopic(summary.id))))
  .filter((topic): topic is Topic => Boolean(topic));
if (topics.length !== 500) throw new Error(`Expected 500 source topics, received ${topics.length}.`);
const dailySources = topics.filter((topic) => !IT_CATEGORIES.has(topic.category)).slice(0, 300);
const itSources = topics
  .filter((topic) => IT_CATEGORIES.has(topic.category))
  .flatMap((topic) => topic.conversations.map((_, conversationIndex) => ({ topic, conversationIndex })))
  .slice(0, 200);
if (dailySources.length !== 300 || itSources.length !== 200) {
  throw new Error(`Insufficient source diversity: ${dailySources.length} daily / ${itSources.length} IT.`);
}
const writingTopics = [
  ...dailySources.map((topic, index) =>
    buildWritingTopic(topic, 'daily-life', index % topic.conversations.length),
  ),
  ...itSources.map(({ topic, conversationIndex }) =>
    buildWritingTopic(topic, 'it-work', conversationIndex),
  ),
];
const shardSize = 50;
const manifest: WritingTopicSummary[] = writingTopics.map((topic, index) => ({
  id: topic.id,
  titleEnglish: topic.titleEnglish,
  titleVietnamese: topic.titleVietnamese,
  category: topic.category,
  domain: topic.domain,
  level: topic.level,
  writingType: topic.writingType,
  keywords: unique([
    topic.titleEnglish,
    topic.titleVietnamese,
    topic.category,
    ...topic.usefulVocabulary,
    ...topic.usefulStructures,
  ]),
  shard: Math.floor(index / shardSize),
}));

for (let start = 0; start < writingTopics.length; start += shardSize) {
  const shard = Math.floor(start / shardSize);
  writeFileSync(
    new URL(`shards/${shard}.generated.json`, outputRoot),
    `${JSON.stringify(writingTopics.slice(start, start + shardSize), null, 2)}\n`,
  );
  console.log(`W${Math.floor(start / 100) + 1}: ${Math.min(start + shardSize, 500)} topics`);
}
writeFileSync(
  new URL('writing-manifest.generated.json', outputRoot),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(`Generated ${writingTopics.length} Writing topics: ${dailySources.length} daily · ${itSources.length} IT.`);
