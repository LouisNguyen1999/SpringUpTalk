import { topics } from '../src/data/index.ts';
import { normalizeSentence } from '../src/engine/sentence-normalizer/index.ts';
import type { Difficulty } from '../src/types/domain.ts';
import { validateTopics } from './validate-content.ts';

const ranges: Record<Difficulty,[number,number]> = { A1:[2,13], A2:[3,18], B1:[4,26], B2:[5,34] };
const extraWarnings: string[] = [];
let cosmeticAccepted = 0;
let localVocabularyDuplicates = 0;
let lengthOutliers = 0;
let speakerImbalances = 0;
const signatures = new Map<string,number>();

for (const topic of topics) for (const conversation of topic.conversations) {
  const speakers = conversation.turns.reduce<Record<string,number>>((counts,turn) => ({ ...counts,[turn.speaker]:(counts[turn.speaker] ?? 0)+1 }),{});
  if (Math.abs((speakers.A ?? 0) - (speakers.B ?? 0)) > 1) speakerImbalances += 1;
  const signature = `${conversation.turns.length}:${conversation.turns.map((turn) => `${turn.speaker}${Math.min(4,Math.ceil(normalizeSentence(turn.canonicalAnswer).split(' ').length/5))}`).join('')}`;
  signatures.set(signature,(signatures.get(signature) ?? 0)+1);
  for (const turn of conversation.turns) {
    const words = normalizeSentence(turn.canonicalAnswer).split(' ').filter(Boolean).length;
    const [min,max] = ranges[topic.level];
    if (words < min || words > max) lengthOutliers += 1;
    const canonical = normalizeSentence(turn.canonicalAnswer);
    cosmeticAccepted += turn.acceptedAnswers.slice(1).filter((answer) => normalizeSentence(answer) === canonical).length;
    const vocabulary = (turn.vocabulary ?? []).map((item) => normalizeSentence(item.word));
    localVocabularyDuplicates += vocabulary.length - new Set(vocabulary).size;
  }
}

const repeatedStructures = [...signatures.values()].filter((count) => count >= Math.max(20,topics.length)).length;
if (lengthOutliers) extraWarnings.push(`${lengthOutliers} sentence-length outliers for their CEFR level`);
if (cosmeticAccepted) extraWarnings.push(`${cosmeticAccepted} accepted variants differ only cosmetically`);
if (localVocabularyDuplicates) extraWarnings.push(`${localVocabularyDuplicates} duplicate vocabulary annotations within a turn`);
if (speakerImbalances) extraWarnings.push(`${speakerImbalances} conversations have speaker imbalance greater than one turn`);
if (repeatedStructures) extraWarnings.push(`${repeatedStructures} structural signatures are unusually frequent`);

const issues = validateTopics(topics);
for (const issue of issues) console[issue.severity === 'error' ? 'error' : 'warn'](`[${issue.severity}] ${issue.path}: ${issue.message}`);
for (const warning of extraWarnings) console.warn(`[lint] ${warning}`);
console.log(`Content lint: ${topics.length} topics · ${issues.filter((issue) => issue.severity === 'error').length} errors · ${issues.filter((issue) => issue.severity === 'warning').length + extraWarnings.length} warnings`);
if (issues.some((issue) => issue.severity === 'error')) process.exit(1);
