import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { evaluateWriting } from '../src/engine/writing-evaluator/index.ts';
import type { WritingFeedbackCategory, WritingPracticeTopic } from '../src/types/domain.ts';
import { loadWritingData } from './writing-utils.ts';

type ScenarioName =
  | 'canonical-correct' | 'alternative-correct' | 'acceptable-meaning' | 'almost-correct-grammar'
  | 'missing-idea' | 'extra-meaning' | 'wrong-tense' | 'wrong-subject' | 'wrong-word-order'
  | 'wrong-vocabulary' | 'wrong-collocation' | 'spelling-only' | 'punctuation-only' | 'completely-wrong';

interface Scenario {
  name: ScenarioName;
  answer: string;
  expectedCategory?: WritingFeedbackCategory;
  expectedMeaning?: 'preserved' | 'incomplete';
}

const { topics } = loadWritingData();

function append(sample: string, sentence: string) {
  return `${sample.trim()} ${sentence}`;
}

function unsupportedAddition(topic: WritingPracticeTopic): string {
  const source = [topic.vietnameseSourceText, ...topic.sampleAnswers, ...topic.requiredIdeas.flatMap((item) => item.concepts)].join(' ').toLocaleLowerCase('en');
  if (!source.includes('friend')) return 'I was with my friend.';
  if (!source.includes('wife') && !source.includes('husband')) return 'I was with my wife.';
  return 'It was for my birthday.';
}

function scenarios(topic: WritingPracticeTopic): Scenario[] {
  const canonical = topic.sampleAnswers[0] ?? '';
  const alternative = topic.sampleAnswers[1] ?? canonical;
  const acceptable = topic.sampleAnswers[2] ?? alternative;
  const firstIdea = topic.requiredIdeas[0]?.concepts[0] ?? canonical;
  const noFinalPunctuation = canonical.replace(/[.!?](?=[”"']?$)/, '');
  return [
    { name: 'canonical-correct', answer: canonical, expectedMeaning: 'preserved' },
    { name: 'alternative-correct', answer: alternative, expectedMeaning: 'preserved' },
    { name: 'acceptable-meaning', answer: acceptable, expectedMeaning: 'preserved' },
    { name: 'almost-correct-grammar', answer: append(canonical, 'She go to work every day.'), expectedCategory: 'SUBJECT_VERB_AGREEMENT' },
    { name: 'missing-idea', answer: firstIdea, expectedMeaning: 'incomplete' },
    { name: 'extra-meaning', answer: append(canonical, unsupportedAddition(topic)), expectedCategory: 'EXTRA_MEANING' },
    { name: 'wrong-tense', answer: append(canonical, 'Yesterday I go to work.'), expectedCategory: 'TENSE' },
    { name: 'wrong-subject', answer: append(canonical, 'She go to work.'), expectedCategory: 'SUBJECT_VERB_AGREEMENT' },
    { name: 'wrong-word-order', answer: append(canonical, 'I very like coffee.'), expectedCategory: 'WORD_ORDER' },
    { name: 'wrong-vocabulary', answer: append(canonical, 'Could you borrow me a pen?'), expectedCategory: 'VOCABULARY' },
    { name: 'wrong-collocation', answer: append(canonical, 'I make a photo.'), expectedCategory: 'COLLOCATION' },
    { name: 'spelling-only', answer: append(canonical, 'I stayed home becuase it rained.'), expectedCategory: 'SPELLING' },
    { name: 'punctuation-only', answer: noFinalPunctuation, expectedCategory: 'PUNCTUATION' },
    { name: 'completely-wrong', answer: 'Purple bananas sing quietly.', expectedMeaning: 'incomplete' },
  ];
}

const started = performance.now();
const results = topics.flatMap((topic) => scenarios(topic).map((scenario) => {
  const evaluation = evaluateWriting(scenario.answer, topic);
  const categoryPass = !scenario.expectedCategory || evaluation.feedbackIssues?.some((item) => item.category === scenario.expectedCategory) === true;
  const meaningPass = scenario.expectedMeaning === 'preserved'
    ? evaluation.meaningCoverage >= 0.8 && evaluation.facts.every((fact) => fact.correct)
    : scenario.expectedMeaning === 'incomplete'
      ? evaluation.meaningCoverage < 1 || evaluation.facts.some((fact) => !fact.correct)
      : true;
  return { topicId: topic.id, name: scenario.name, pass: categoryPass && meaningPass, categoryPass, meaningPass };
}));
const elapsedMs = performance.now() - started;
const byScenario = Object.fromEntries(([
  'canonical-correct', 'alternative-correct', 'acceptable-meaning', 'almost-correct-grammar',
  'missing-idea', 'extra-meaning', 'wrong-tense', 'wrong-subject', 'wrong-word-order',
  'wrong-vocabulary', 'wrong-collocation', 'spelling-only', 'punctuation-only', 'completely-wrong',
] as ScenarioName[]).map((name) => {
  const subset = results.filter((item) => item.name === name);
  return [name, { total: subset.length, passed: subset.filter((item) => item.pass).length, accuracy: Math.round(subset.filter((item) => item.pass).length / subset.length * 10_000) / 100 }];
}));
const failed = results.filter((item) => !item.pass);
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  topics: topics.length,
  scenariosPerTopic: 14,
  totalScenarios: results.length,
  passed: results.length - failed.length,
  failed: failed.length,
  accuracy: Math.round((results.length - failed.length) / results.length * 10_000) / 100,
  runtimeMs: Math.round(elapsedMs * 10) / 10,
  byScenario,
  failures: failed.slice(0, 100),
};
writeFileSync(fileURLToPath(new URL('../writing_feedback_golden_report.json', import.meta.url)), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Writing feedback golden: ${report.passed}/${report.totalScenarios} PASS (${report.accuracy}%) · ${report.runtimeMs} ms`);
for (const [name, value] of Object.entries(byScenario)) console.log(`${name}: ${value.passed}/${value.total}`);
if (failed.length) {
  for (const failure of failed.slice(0, 20)) console.error(`FAIL ${failure.topicId} · ${failure.name}`);
  process.exitCode = 1;
}
