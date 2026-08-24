import { performance } from 'node:perf_hooks';
import { writingEvaluatorGoldenSet } from '../src/data/writing/writing-evaluator-golden-set.ts';
import { evaluateWriting } from '../src/engine/writing-evaluator/index.ts';

const samples = (['A1', 'A2', 'B1', 'B2'] as const).map((level) => {
  const candidates = writingEvaluatorGoldenSet.filter((item) => item.polarity === 'positive' && item.topic.level === level);
  return candidates.sort((left, right) => right.userAnswer.length - left.userAnswer.length)[0]!;
});

const targetWords = { A1: 35, A2: 55, B1: 85, B2: 125 } as const;
const benchmarkContext = [
  'The paragraph keeps the situation clear and gives the reader enough context.',
  'It connects the action, timing, and practical result in a natural order.',
  'Relevant responsibility stays explicit while the tone remains professional and concise.',
  'The final sentence makes the next step easy for the intended reader to understand.',
];

const buildRepresentativeParagraph = (sample: (typeof samples)[number]) => {
  let paragraph = sample.userAnswer;
  let contextIndex = 0;
  while (paragraph.split(/\s+/).length < targetWords[sample.topic.level]) {
    paragraph += ` ${benchmarkContext[contextIndex % benchmarkContext.length]}`;
    contextIndex += 1;
  }
  return paragraph;
};

console.log('WRITING EVALUATOR BENCHMARK\n');
for (const sample of samples) {
  const paragraph = buildRepresentativeParagraph(sample);
  for (let warmup = 0; warmup < 20; warmup += 1) evaluateWriting(paragraph, sample.topic);
  const timings = Array.from({ length: 100 }, () => {
    const start = performance.now();
    evaluateWriting(paragraph, sample.topic);
    return performance.now() - start;
  }).sort((left, right) => left - right);
  const median = timings[50] ?? 0;
  const p95 = timings[95] ?? 0;
  console.log(`${sample.topic.level}: median ${median.toFixed(3)} ms · p95 ${p95.toFixed(3)} ms · ${paragraph.split(/\s+/).length} words`);
  // A synchronous evaluation below 50 ms remains comfortably non-blocking for this
  // user-triggered action, including on the low-power device used for this audit.
  if (p95 > 50) process.exitCode = 1;
}
