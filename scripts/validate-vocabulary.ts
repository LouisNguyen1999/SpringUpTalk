import { evaluateAnswer } from '../src/engine/answer-evaluator/index.ts';
import { normalizeSearchText } from '../src/utils/search.ts';
import type { VocabularyPracticeItem } from '../src/types/domain.ts';
import { loadVocabularyData } from './vocabulary-utils.ts';

const { index, details, practice } = loadVocabularyData();
const errors: string[] = [];
const warnings: string[] = [];
const duplicate = (values: string[]) =>
  values.filter((value, index) => values.indexOf(value) !== index);
const validLevels = new Set(['A1', 'A2', 'B1', 'B2']);

for (const id of new Set(duplicate(index.map((item) => item.id))))
  errors.push(`Duplicate vocabulary id: ${id}`);
for (const key of new Set(duplicate(index.map((item) => item.normalizedTerm))))
  errors.push(`Duplicate normalized vocabulary key: ${key}`);
for (const item of index) {
  if (!item.term.trim() || !item.shortMeaning.trim())
    errors.push(`${item.id}: missing term or meaning`);
  if (item.cefr && !validLevels.has(item.cefr))
    errors.push(`${item.id}: invalid CEFR ${item.cefr}`);
  if (!details.some((entry) => entry.id === item.id))
    errors.push(`${item.id}: missing detail record`);
  if (item.practiceCount < 5 && item.practiceCount > 0)
    warnings.push(`${item.id}: high-value entry has fewer than five practice items`);
}

const ids = new Set(index.map((item) => item.id));
const perVocabulary = new Map<string, Set<string>>();
function asTurn(item: VocabularyPracticeItem) {
  return {
    id: item.id,
    speaker: 'A' as const,
    vietnamese: item.vietnamese,
    canonicalAnswer: item.canonicalAnswer,
    acceptedAnswers: item.acceptedAnswers,
    naturalAlternatives: item.naturalAlternatives,
    requiredKeywords: [],
    grammarPoints: item.grammarFocus,
    vocabulary: [],
    commonMistakes: item.commonMistakes ?? [],
    explanation: item.explanation,
    hint: item.hint,
    semanticConstraints: item.semanticConstraints,
    difficulty: item.level,
  };
}
let canonicalCorrect = 0;
let acceptedCorrect = 0;
let acceptedTotal = 0;
for (const item of practice) {
  if (!ids.has(item.vocabularyId))
    errors.push(`${item.id}: orphan vocabulary ${item.vocabularyId}`);
  if (!item.vietnamese.trim() || !item.canonicalAnswer.trim() || !item.targetExpressions.length)
    errors.push(`${item.id}: malformed practice item`);
  const normalizedCanonical = normalizeSearchText(item.canonicalAnswer);
  if (
    !item.targetExpressions.some((target) =>
      normalizedCanonical.includes(normalizeSearchText(target)),
    )
  )
    errors.push(`${item.id}: canonical is missing target expression`);
  const seen = perVocabulary.get(item.vocabularyId) ?? new Set<string>();
  if (seen.has(normalizedCanonical))
    errors.push(`${item.id}: duplicate practice sentence within vocabulary`);
  seen.add(normalizedCanonical);
  perVocabulary.set(item.vocabularyId, seen);
  const turn = asTurn(item);
  if (evaluateAnswer(item.canonicalAnswer, turn).status === 'correct') canonicalCorrect += 1;
  else errors.push(`${item.id}: evaluator rejected canonical`);
  for (const answer of item.acceptedAnswers) {
    acceptedTotal += 1;
    if (evaluateAnswer(answer, turn).status === 'correct') acceptedCorrect += 1;
    else errors.push(`${item.id}: evaluator rejected accepted answer: ${answer}`);
  }
}

const enabled = index.filter((item) => item.practiceCount >= 5);
if (enabled.length < 500) errors.push(`Practice-enabled coverage ${enabled.length}/500`);
if (practice.length < 2500) errors.push(`Practice sentence coverage ${practice.length}/2500`);
for (const message of errors) console.error(`[error] ${message}`);
for (const message of warnings) console.warn(`[warning] ${message}`);
console.log(
  `Vocabulary validation: ${index.length} entries · ${enabled.length} enabled · ${practice.length} practice · canonical ${canonicalCorrect}/${practice.length} · accepted ${acceptedCorrect}/${acceptedTotal} · ${errors.length} errors · ${warnings.length} warnings`,
);
if (errors.length) process.exit(1);
