import { performance } from 'node:perf_hooks';
import { writingEvaluatorGoldenSet } from '../src/data/writing/writing-evaluator-golden-set.ts';
import { evaluateWriting } from '../src/engine/writing-evaluator/index.ts';

const started = performance.now();
const results = writingEvaluatorGoldenSet.map((goldenCase) => ({
  goldenCase,
  actual: evaluateWriting(goldenCase.userAnswer, goldenCase.topic),
}));
const positives = results.filter(({ goldenCase }) => goldenCase.polarity === 'positive');
const negatives = results.filter(({ goldenCase }) => goldenCase.polarity === 'negative');
const falseNegatives = positives.filter(({ actual }) => actual.status !== 'communicates-well');
const criticalFalsePositives = negatives.filter(({ actual }) => actual.status !== 'needs-improvement');
const elapsed = performance.now() - started;

console.log('WRITING GOLDEN SET REPORT\n');
console.log(`Total: ${results.length}`);
console.log(`Positive golden cases: ${positives.length}`);
console.log(`Correctly accepted: ${positives.length - falseNegatives.length}`);
console.log(`False negatives: ${falseNegatives.length}`);
console.log(`False-negative rate: ${(falseNegatives.length / positives.length * 100).toFixed(2)}%`);
console.log(`Negative golden cases: ${negatives.length}`);
console.log(`Correctly rejected/downgraded: ${negatives.length - criticalFalsePositives.length}`);
console.log(`Critical false positives: ${criticalFalsePositives.length}`);
console.log(`False-positive rate: ${(criticalFalsePositives.length / negatives.length * 100).toFixed(2)}%`);
for (const level of ['A1', 'A2', 'B1', 'B2'] as const) {
  console.log(`${level}: ${results.filter(({ goldenCase }) => goldenCase.topic.level === level).length}`);
}
console.log(`Daily: ${results.filter(({ goldenCase }) => goldenCase.topic.domain === 'daily-life').length}`);
console.log(`IT: ${results.filter(({ goldenCase }) => goldenCase.topic.domain === 'it-work').length}`);
console.log(`Runtime: ${elapsed.toFixed(1)} ms (${(elapsed / results.length).toFixed(3)} ms/case)`);

for (const failure of [...falseNegatives, ...criticalFalsePositives].slice(0, 30)) {
  console.error(`FAIL ${failure.goldenCase.id}: expected ${failure.goldenCase.expectedStatus}, received ${failure.actual.status} — ${failure.goldenCase.reason}`);
}
if (falseNegatives.length + criticalFalsePositives.length > 30) {
  console.error(`${falseNegatives.length + criticalFalsePositives.length - 30} additional failures omitted.`);
}
if (falseNegatives.length || criticalFalsePositives.length) process.exitCode = 1;

