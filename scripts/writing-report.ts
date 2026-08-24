import { loadWritingData } from './writing-utils.ts';

const { topics } = loadWritingData();
const average = (values: number[]) => values.reduce((total, value) => total + value, 0) / Math.max(1, values.length);
const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase('vi').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
const openEndedPattern = /(?:hãy (?:kể|giải thích|viết|mô tả)|bạn sẽ (?:làm|nói|viết) gì|bạn nghĩ gì|theo ý của bạn|tự (?:nghĩ|tạo) (?:ra )?(?:nội dung|câu chuyện))/iu;
const duplicates = topics.length - new Set(topics.map((topic) => normalize(topic.vietnameseSourceText))).size;
const stories = topics.filter((topic) => topic.writingType === 'story');
const problems = topics.filter((topic) => topic.writingType === 'problem-explanation');
const withStage = (stage: string) => topics.filter((topic) => topic.requiredIdeas.some((idea) => idea.arcStage === stage)).length;
const openEndedPrompts = topics.filter((topic) => openEndedPattern.test(topic.vietnameseSourceText)).length;
const instructionOnlyPrompts = topics.filter((topic) => /^\s*(?:hãy|vui lòng)\b/iu.test(topic.vietnameseSourceText)).length;
const translationReady = topics.filter((topic) => topic.context.trim() && topic.vietnameseSourceText.trim() && !openEndedPattern.test(topic.vietnameseSourceText) && !/^\s*(?:hãy|vui lòng)\b/iu.test(topic.vietnameseSourceText)).length;
const promptTokens = topics.map((topic) => new Set(normalize(topic.vietnameseSourceText).split(' ').filter((token) => token.length > 2)));
let nearDuplicates = 0;
for (let left = 0; left < promptTokens.length; left += 1) {
  for (let right = left + 1; right < promptTokens.length; right += 1) {
    const leftTokens = promptTokens[left] ?? new Set<string>();
    const rightTokens = promptTokens[right] ?? new Set<string>();
    const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length;
    const union = new Set([...leftTokens, ...rightTokens]).size;
    if (union && intersection / union >= 0.88) nearDuplicates += 1;
  }
}

console.log('WRITING PRACTICE REPORT\n');
console.log(`Writing Topics: ${topics.length}`);
console.log(`Context present: ${topics.filter((topic) => topic.context.trim()).length}/${topics.length}`);
console.log(`Vietnamese source text: ${topics.filter((topic) => topic.vietnameseSourceText.trim()).length}/${topics.length}`);
console.log(`Translation-ready: ${translationReady}/${topics.length}`);
console.log(`Open-ended prompts: ${openEndedPrompts}`);
console.log(`Instruction-only prompts: ${instructionOnlyPrompts}`);
console.log(`Daily: ${topics.filter((topic) => topic.domain === 'daily-life').length}`);
console.log(`IT: ${topics.filter((topic) => topic.domain === 'it-work').length}`);
console.log(`Story topics: ${stories.length}`);
console.log(`Problem-explanation topics: ${problems.length}`);
console.log(`Daily stories: ${stories.filter((topic) => topic.domain === 'daily-life').length}`);
console.log(`Daily problems: ${problems.filter((topic) => topic.domain === 'daily-life').length}`);
console.log(`IT stories: ${stories.filter((topic) => topic.domain === 'it-work').length}`);
console.log(`IT problems: ${problems.filter((topic) => topic.domain === 'it-work').length}`);
for (const level of ['A1', 'A2', 'B1', 'B2'] as const) {
  console.log(`${level}: ${topics.filter((topic) => topic.level === level).length}`);
}
console.log(`Average Vietnamese source length: ${average(topics.map((topic) => topic.vietnameseSourceText.split(/\s+/).length)).toFixed(1)} words`);
console.log(`Average required ideas: ${average(topics.map((topic) => topic.requiredIdeas.length)).toFixed(2)}`);
console.log(`Exact duplicates: ${duplicates}`);
console.log(`Near duplicates: ${nearDuplicates}`);
console.log(`Topics with clear scenario: ${topics.filter((topic) => topic.context.trim()).length}/${topics.length}`);
console.log(`Topics with required ideas: ${topics.filter((topic) => topic.requiredIdeas.length > 0).length}/${topics.length}`);
console.log(`Topics with cause: ${withStage('cause')}`);
console.log(`Topics with action: ${withStage('action')}`);
console.log(`Topics with result: ${withStage('result')}`);
console.log(`Topics with next-step: ${withStage('next-step')}`);
console.log(`Critical-fact coverage: ${(topics.filter((topic) => topic.criticalFacts.length > 0).length / topics.length * 100).toFixed(1)}%`);
console.log(`Sample answers: ${topics.reduce((total, topic) => total + topic.sampleAnswers.length, 0)}`);
