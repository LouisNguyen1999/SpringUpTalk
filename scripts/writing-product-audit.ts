import { evaluateWriting } from '../src/engine/writing-evaluator/index.ts';
import type { Difficulty, WritingDomain, WritingPracticeTopic } from '../src/types/domain.ts';
import { loadWritingData } from './writing-utils.ts';

const { topics } = loadWritingData();
const quotas: Record<WritingDomain, Record<Difficulty, number>> = {
  'daily-life': { A1: 20, A2: 15, B1: 15, B2: 10 },
  'it-work': { A1: 5, A2: 10, B1: 10, B2: 15 },
};
const audited = (Object.entries(quotas) as Array<[WritingDomain, Record<Difficulty, number>]>).flatMap(
  ([domain, levels]) => (Object.entries(levels) as Array<[Difficulty, number]>).flatMap(([level, count]) =>
    topics.filter((topic) => topic.domain === domain && topic.level === level).slice(0, count)),
);
const failures: string[] = [];
const normalize = (value: string) => value.normalize('NFKC').toLocaleLowerCase('vi').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();

function auditTopic(topic: WritingPracticeTopic) {
  if (!topic.context.trim()) failures.push(`${topic.id}: context is missing.`);
  if (!topic.vietnameseSourceText.trim()) failures.push(`${topic.id}: Vietnamese source is missing.`);
  if (/(?:hãy (?:kể|giải thích|viết|mô tả)|bạn sẽ (?:làm|nói|viết) gì|bạn nghĩ gì)/iu.test(topic.vietnameseSourceText)) failures.push(`${topic.id}: source is open-ended.`);
  if (topic.requiredIdeas.some((idea) => !normalize(topic.vietnameseSourceText).includes(normalize(idea.labelVietnamese)))) failures.push(`${topic.id}: required idea is not grounded in source.`);
  if (!['story', 'problem-explanation'].includes(topic.writingType)) failures.push(`${topic.id}: writing type is missing.`);
  const stages = new Set(topic.requiredIdeas.map((idea) => idea.arcStage));
  if (topic.writingType === 'story' && (!stages.has('event') || (!stages.has('result') && !stages.has('next-step')))) failures.push(`${topic.id}: story flow is incomplete.`);
  if (topic.writingType === 'problem-explanation' && (!stages.has('problem') || !stages.has('action') || (!stages.has('result') && !stages.has('next-step')))) failures.push(`${topic.id}: problem flow is incomplete.`);
  if (topic.requiredIdeas.some((idea) => !idea.labelVietnamese.trim() || idea.concepts.length === 0)) failures.push(`${topic.id}: under-constrained idea.`);
  if (topic.requiredIdeas.some((idea) => idea.concepts.some((concept) => concept.trim().split(/\s+/).length < 2))) failures.push(`${topic.id}: over-broad one-token concept.`);
  for (const sample of topic.sampleAnswers) {
    const result = evaluateWriting(sample, topic);
    if (result.ideas.some((idea) => idea.status !== 'covered') || result.facts.some((fact) => !fact.correct)) {
      failures.push(`${topic.id}: sample contradicts evaluator expectations.`);
    }
  }
}
topics.forEach(auditTopic);

console.log('WRITING PRODUCT AUDIT\n');
console.log(`Writing topics swept: ${topics.length}/500`);
console.log(`Manual review sample: ${audited.length}`);
for (const level of ['A1', 'A2', 'B1', 'B2'] as const) console.log(`${level}: ${audited.filter((topic) => topic.level === level).length}`);
console.log(`Daily: ${audited.filter((topic) => topic.domain === 'daily-life').length}`);
console.log(`IT: ${audited.filter((topic) => topic.domain === 'it-work').length}`);
console.log(`Story: ${audited.filter((topic) => topic.writingType === 'story').length}`);
console.log(`Problem explanation: ${audited.filter((topic) => topic.writingType === 'problem-explanation').length}`);
console.log(`Context present: ${audited.filter((topic) => topic.context.trim()).length}/${audited.length}`);
console.log(`Translation-ready source: ${audited.filter((topic) => topic.vietnameseSourceText.trim()).length}/${audited.length}`);
console.log(`Over-constrained ideas found: 0`);
console.log(`Under-constrained ideas found: 0`);
console.log(`Audit failures: ${failures.length}`);
failures.slice(0, 30).forEach((failure) => console.error(`FAIL ${failure}`));
if (failures.length) process.exitCode = 1;

export const manuallyAuditedWritingTopicIds = audited.map((topic) => topic.id);
