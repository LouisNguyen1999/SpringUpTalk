import { readdirSync, readFileSync } from 'node:fs';
import type {
  VocabularyEntry,
  VocabularyPracticeItem,
  VocabularySummary,
} from '../src/types/domain.ts';

function readJson<T>(url: URL): T {
  return JSON.parse(readFileSync(url, 'utf8')) as T;
}

export function loadVocabularyData() {
  const root = new URL('../src/data/vocabulary/generated/', import.meta.url);
  const index = readJson<VocabularySummary[]>(new URL('vocabulary-index.generated.json', root));
  const details = readdirSync(new URL('details/', root))
    .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
    .flatMap((file) => readJson<VocabularyEntry[]>(new URL(`details/${file}`, root)));
  const practice = readdirSync(new URL('practice/', root))
    .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
    .flatMap((file) => readJson<VocabularyPracticeItem[]>(new URL(`practice/${file}`, root)));
  return { index, details, practice };
}
