import { loadWritingData } from './writing-utils.ts';
import type { WritingPracticeTopic } from '../src/types/domain.ts';
import { evaluateWriting, SEMANTIC_PATTERNS } from '../src/engine/writing-evaluator/index.ts';

const { manifest, topics } = loadWritingData();
const errors: string[] = [];
const warnings: string[] = [];
const levels = new Set(['A1', 'A2', 'B1', 'B2']);
const batchArg = process.argv.find((value) => value.startsWith('--batch='));
const batchNumber = batchArg ? Number.parseInt(batchArg.split('=')[1] ?? '', 10) : undefined;
if (batchNumber !== undefined && (!Number.isInteger(batchNumber) || batchNumber < 1 || batchNumber > 5)) {
  throw new Error('Batch must be an integer from 1 to 5.');
}
const selectedTopics = batchNumber === undefined ? topics : topics.slice((batchNumber - 1) * 100, batchNumber * 100);
const ideaRanges = { A1: [2, 4], A2: [3, 5], B1: [4, 6], B2: [5, 8] } as const;
const genericTitle = /^(writing|topic|practice|bài viết|chủ đề)(\s+\d+)?$/iu;
const openEndedInstruction = /(?:hãy (?:kể|giải thích|viết|mô tả)|bạn sẽ (?:làm|nói|viết) gì|bạn nghĩ gì|theo ý của bạn|tự (?:nghĩ|tạo) (?:ra )?(?:nội dung|câu chuyện))/iu;
const oldPromptTemplate = /truyền đạt rõ các ý sau|theo góc nhìn của một người tham gia|mục tiêu của cuộc trao đổi là/iu;
const minimumSourceWords = { A1: 20, A2: 25, B1: 40, B2: 50 } as const;

function normalized(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('vi')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value: string): Set<string> {
  return new Set(normalized(value).split(' ').filter((token) => token.length > 2));
}

function jaccard(left: Set<string>, right: Set<string>): number {
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union ? intersection / union : 0;
}

function validateTopic(topic: WritingPracticeTopic) {
  if (!topic.id || !topic.id.startsWith('writing:')) errors.push(`${topic.id || '(missing id)'}: invalid ID.`);
  if (!topic.titleEnglish || !topic.titleVietnamese) errors.push(`${topic.id}: missing title.`);
  if (!topic.category) errors.push(`${topic.id}: missing category.`);
  if (!levels.has(topic.level)) errors.push(`${topic.id}: invalid level ${topic.level}.`);
  if (!['daily-life', 'it-work'].includes(topic.domain)) errors.push(`${topic.id}: invalid domain.`);
  if (!['story', 'problem-explanation'].includes(topic.writingType)) errors.push(`${topic.id}: unclassified writing type.`);
  if (!topic.context.trim()) errors.push(`${topic.id}: missing context.`);
  if (!topic.vietnameseSourceText.trim()) errors.push(`${topic.id}: missing Vietnamese source text.`);
  if (!topic.requiredIdeas.length) errors.push(`${topic.id}: no required ideas.`);
  if (topic.sampleAnswers.length < 2 || topic.sampleAnswers.length > 3) errors.push(`${topic.id}: expected two or three sample answers.`);
  if (topic.hints.length !== 3) errors.push(`${topic.id}: expected three hint levels.`);
  if (!topic.expectedWordRange || topic.expectedWordRange[0] >= topic.expectedWordRange[1]) {
    errors.push(`${topic.id}: malformed expected word range.`);
  }
  const [minimumIdeas, maximumIdeas] = ideaRanges[topic.level];
  if (topic.requiredIdeas.length < minimumIdeas || topic.requiredIdeas.length > maximumIdeas) {
    errors.push(`${topic.id}: ${topic.requiredIdeas.length} ideas fall outside ${topic.level} range ${minimumIdeas}-${maximumIdeas}.`);
  }
  if (genericTitle.test(topic.titleEnglish.trim()) || genericTitle.test(topic.titleVietnamese.trim())) {
    warnings.push(`${topic.id}: generic title.`);
  }
  if (oldPromptTemplate.test(topic.vietnameseSourceText)) errors.push(`${topic.id}: source still uses the old prompt template.`);
  if (openEndedInstruction.test(topic.vietnameseSourceText)) errors.push(`${topic.id}: source contains an open-ended instruction.`);
  if (/^\s*(?:hãy|vui lòng)\b/iu.test(topic.vietnameseSourceText)) errors.push(`${topic.id}: source is instruction-only.`);
  if (/^[^.!]*\?\s*$/u.test(topic.vietnameseSourceText)) errors.push(`${topic.id}: source is only a question.`);
  if (topic.vietnameseSourceText.trim().split(/\s+/).length < minimumSourceWords[topic.level]) {
    errors.push(`${topic.id}: Vietnamese source is too short for ${topic.level}.`);
  }
  if (normalized(topic.context) === normalized(topic.vietnameseSourceText) || jaccard(tokens(topic.context), tokens(topic.vietnameseSourceText)) >= 0.8) {
    errors.push(`${topic.id}: context and Vietnamese source are duplicated.`);
  }
  if (/\s{2,}|[.!?]{2,}/u.test(topic.vietnameseSourceText)) warnings.push(`${topic.id}: unnatural spacing or punctuation in Vietnamese source.`);
  if (topic.domain === 'it-work' && /(?:hãy (?:định nghĩa|trình bày lý thuyết)|hãy cho biết [^.!?]+ là gì)/iu.test(topic.vietnameseSourceText)) {
    warnings.push(`${topic.id}: IT prompt looks like a theory question.`);
  }
  const stages = new Set(topic.requiredIdeas.map((idea) => idea.arcStage));
  const hasEnding = stages.has('result') || stages.has('next-step');
  if (topic.writingType === 'story' && (!stages.has('context') || !stages.has('event') || !hasEnding)) {
    warnings.push(`${topic.id}: incomplete story progression.`);
  }
  if (topic.writingType === 'problem-explanation' && (!stages.has('problem') || !stages.has('action') || !hasEnding)) {
    warnings.push(`${topic.id}: incomplete problem progression.`);
  }
  const ideaIds = new Set<string>();
  const conceptGroups = new Set<string>();
  for (const idea of topic.requiredIdeas) {
    if (!idea.id || ideaIds.has(idea.id)) errors.push(`${topic.id}: duplicate/empty idea ID ${idea.id}.`);
    ideaIds.add(idea.id);
    if (!idea.labelVietnamese || !idea.concepts.length) errors.push(`${topic.id}/${idea.id}: empty semantic idea.`);
    if (idea.labelVietnamese && !normalized(topic.vietnameseSourceText).includes(normalized(idea.labelVietnamese))) {
      errors.push(`${topic.id}/${idea.id}: required idea is not grounded in Vietnamese source text.`);
    }
    const key = idea.concepts.map(normalized).sort().join('|');
    if (conceptGroups.has(key)) errors.push(`${topic.id}: duplicate semantic concept group.`);
    conceptGroups.add(key);
    for (const patternId of idea.semanticPatterns ?? []) {
      if (!SEMANTIC_PATTERNS[patternId]) errors.push(`${topic.id}/${idea.id}: orphan semantic pattern ${patternId}.`);
    }
    if (new Set(idea.semanticPatterns ?? []).size !== (idea.semanticPatterns ?? []).length) {
      errors.push(`${topic.id}/${idea.id}: duplicate semantic pattern ID.`);
    }
  }
  const factIds = new Set<string>();
  for (const fact of topic.criticalFacts) {
    if (!fact.id || factIds.has(fact.id) || !fact.expected.length || !fact.labelVietnamese) {
      errors.push(`${topic.id}: malformed critical fact ${fact.id}.`);
    }
    factIds.add(fact.id);
  }
  if (!topic.usefulVocabulary.length) warnings.push(`${topic.id}: no useful vocabulary.`);
  for (const [index, sample] of topic.sampleAnswers.entries()) {
    if (/[.!?]["”'][.!?]/.test(sample) || /[.!?]{2,}/.test(sample)) {
      errors.push(`${topic.id}/sample-${index + 1}: duplicate terminal punctuation.`);
    }
    const evaluation = evaluateWriting(sample, topic);
    const badIdeas = evaluation.ideas.filter((idea) => idea.status !== 'covered');
    const badFacts = evaluation.facts.filter((fact) => !fact.correct);
    if (badIdeas.length || badFacts.length) {
      errors.push(`${topic.id}/sample-${index + 1}: does not cover semantic truth (${badIdeas.map((idea) => idea.id).join(',') || 'facts'}).`);
    }
  }
}

if (topics.length !== 500) errors.push(`Expected exactly 500 topics, received ${topics.length}.`);
if (manifest.length !== 500) errors.push(`Expected 500 manifest rows, received ${manifest.length}.`);
if (batchNumber !== undefined && selectedTopics.length !== 100) errors.push(`W-R${batchNumber}: expected 100 topics, received ${selectedTopics.length}.`);
for (const topic of selectedTopics) validateTopic(topic);

for (const topic of selectedTopics) {
  const summary = manifest.find((item) => item.id === topic.id);
  if (!summary || summary.writingType !== topic.writingType) errors.push(`${topic.id}: manifest classification mismatch.`);
}

for (const field of ['id', 'vietnameseSourceText'] as const) {
  const seen = new Map<string, string>();
  for (const topic of selectedTopics) {
    const key = normalized(topic[field]);
    const existing = seen.get(key);
    if (existing) errors.push(`Duplicate ${field}: ${existing} and ${topic.id}.`);
    else seen.set(key, topic.id);
  }
}

const arcSignatures = new Map<string, string>();
for (const topic of selectedTopics) {
  const signature = [
    topic.writingType,
    ...topic.requiredIdeas.map((idea) => idea.arcStage),
    ...topic.requiredIdeas.flatMap((idea) => idea.concepts.map(normalized)).sort(),
  ].join('|');
  const existing = arcSignatures.get(signature);
  if (existing) warnings.push(`Same story arc and concepts: ${existing} / ${topic.id}.`);
  else arcSignatures.set(signature, topic.id);
}

let nearDuplicates = 0;
const promptTokens = selectedTopics.map((topic) => tokens(topic.vietnameseSourceText));
for (let left = 0; left < selectedTopics.length; left += 1) {
  for (let right = left + 1; right < selectedTopics.length; right += 1) {
    if (jaccard(promptTokens[left] ?? new Set(), promptTokens[right] ?? new Set()) >= 0.88) {
      nearDuplicates += 1;
      warnings.push(`Near duplicate: ${selectedTopics[left]?.id} / ${selectedTopics[right]?.id}.`);
    }
  }
}

const daily = topics.filter((topic) => topic.domain === 'daily-life').length;
const it = topics.filter((topic) => topic.domain === 'it-work').length;
if (daily !== 300 || it !== 200) errors.push(`Expected 300 daily / 200 IT, received ${daily} / ${it}.`);

console.log(`Writing validation${batchNumber ? ` W-R${batchNumber}` : ''}: ${selectedTopics.length} topics · ${daily} daily total · ${it} IT total · ${nearDuplicates} near duplicates · ${errors.length} errors · ${warnings.length} warnings`);
warnings.slice(0, 20).forEach((warning) => console.warn(`WARN: ${warning}`));
if (warnings.length > 20) console.warn(`WARN: ${warnings.length - 20} additional warnings omitted.`);
if (errors.length) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  process.exitCode = 1;
}
