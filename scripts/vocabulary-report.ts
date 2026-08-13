import { normalizeSearchText } from '../src/utils/search.ts';
import { loadVocabularyData } from './vocabulary-utils.ts';

const { index, details, practice } = loadVocabularyData();
const counts = practice.reduce<Record<string, number>>(
  (result, item) => ({ ...result, [item.vocabularyId]: (result[item.vocabularyId] ?? 0) + 1 }),
  {},
);
const coverage = (minimum: number) =>
  Object.values(counts).filter((count) => count >= minimum).length;
const enabled = new Set(index.filter((item) => item.practiceCount >= 5).map((item) => item.id));
const byLevel = ['A1', 'A2', 'B1', 'B2'].map((level) => [
  level,
  index.filter((item) => item.cefr === level && enabled.has(item.id)).length,
]);
const types = index
  .filter((item) => enabled.has(item.id))
  .reduce<Record<string, number>>(
    (result, item) => ({ ...result, [item.type]: (result[item.type] ?? 0) + 1 }),
    {},
  );
const duplicatePractice =
  practice.length -
  new Set(
    practice.map((item) => `${item.vocabularyId}:${normalizeSearchText(item.canonicalAnswer)}`),
  ).size;
console.log('VOCABULARY PRACTICE REPORT');
console.log(
  `Vocabulary source baseline: 5948\nCanonical repository entries: ${index.length}\nPractice-enabled: ${enabled.size}\nPractice sentences: ${practice.length}`,
);
console.log(
  `Coverage >=1: ${coverage(1)}\nCoverage >=3: ${coverage(3)}\nCoverage >=5: ${coverage(5)}\nCoverage >=10: ${coverage(10)}\nNo practice: ${index.length - coverage(1)}`,
);
for (const [level, count] of byLevel) console.log(`${level}: ${count}`);
for (const [type, count] of Object.entries(types).sort()) console.log(`${type}: ${count}`);
console.log(
  `Examples: ${details.reduce((sum, item) => sum + item.examples.length, 0)}\nCollocations: ${details.reduce((sum, item) => sum + item.collocations.length, 0)}\nIPA entries: ${details.filter((item) => item.ipa).length}\nMultiple senses: ${details.filter((item) => item.meanings.length > 1).length}\nDuplicate practice sentences within vocabulary: ${duplicatePractice}`,
);
