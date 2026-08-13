import indexData from './generated/vocabulary-index.generated.json';
import type {
  VocabularyEntry,
  VocabularyPracticeItem,
  VocabularySummary,
} from '../../types/domain';
import {
  normalizeSearchText,
  normalizeVocabularyIdentityKey,
  normalizeVocabularyKey,
} from '../../utils/search';

export interface VocabularyRepository {
  search(query: string, limit?: number): VocabularySummary[];
  getById(id: string): Promise<VocabularyEntry | undefined>;
  getByTerm(term: string): Promise<VocabularyEntry | undefined>;
  getPracticeItems(vocabularyId: string, senseId?: string): Promise<VocabularyPracticeItem[]>;
  getRelatedTerms(vocabularyId: string): Promise<VocabularyEntry[]>;
  summaries(): readonly VocabularySummary[];
}

const index = indexData as VocabularySummary[];
const byId = new Map(index.map((item) => [item.id, item]));
const detailModules = import.meta.glob<{ default: VocabularyEntry[] }>(
  './generated/details/*.generated.json',
);
const practiceModules = import.meta.glob<{ default: VocabularyPracticeItem[] }>(
  './generated/practice/*.generated.json',
);
const detailCache = new Map<number, Promise<VocabularyEntry[]>>();
const practiceCache = new Map<number, Promise<VocabularyPracticeItem[]>>();

function loaderFor<T>(
  modules: Record<string, () => Promise<{ default: T[] }>>,
  kind: 'details' | 'practice',
  shard: number,
): () => Promise<{ default: T[] }> {
  const suffix = `/${kind}/${shard}.generated.json`;
  const loader = Object.entries(modules).find(([path]) => path.endsWith(suffix))?.[1];
  if (!loader) throw new Error(`Missing vocabulary ${kind} shard ${shard}`);
  return loader;
}

function loadDetails(shard: number) {
  const cached = detailCache.get(shard);
  if (cached) return cached;
  const request = loaderFor(detailModules, 'details', shard)().then((module) => module.default);
  detailCache.set(shard, request);
  return request;
}

function loadPractice(shard: number) {
  const cached = practiceCache.get(shard);
  if (cached) return cached;
  const request = loaderFor(practiceModules, 'practice', shard)().then((module) => module.default);
  practiceCache.set(shard, request);
  return request;
}

function rank(item: VocabularySummary, query: string): number {
  const normalized = normalizeSearchText(query);
  const compact = normalizeVocabularyKey(query);
  if (item.normalizedTerm === normalized) return 0;
  if (normalizeVocabularyKey(item.term) === compact) return 1;
  if (item.normalizedTerm.startsWith(normalized)) return 2;
  if (item.normalizedTerm.includes(normalized)) return 3;
  if (normalizeSearchText(item.shortMeaning).includes(normalized)) return 4;
  return 9;
}

export const vocabularyRepository: VocabularyRepository = {
  summaries: () => index,
  search: (query, limit = 40) => {
    const normalized = normalizeSearchText(query);
    if (!normalized) return index.filter((item) => item.practiceCount > 0).slice(0, limit);
    return index
      .filter((item) => rank(item, query) < 9)
      .sort(
        (left, right) =>
          rank(left, query) - rank(right, query) ||
          right.practiceCount - left.practiceCount ||
          left.term.localeCompare(right.term),
      )
      .slice(0, limit);
  },
  getById: async (id) => {
    const summary = byId.get(id);
    if (!summary) return undefined;
    return (await loadDetails(summary.shard)).find((entry) => entry.id === id);
  },
  getByTerm: async (term) => {
    const identity = normalizeVocabularyIdentityKey(term);
    const summary = index.find(
      (item) => normalizeVocabularyIdentityKey(item.term) === identity,
    );
    return summary ? vocabularyRepository.getById(summary.id) : undefined;
  },
  getPracticeItems: async (vocabularyId, senseId) => {
    const summary = byId.get(vocabularyId);
    if (!summary) return [];
    const items = (await loadPractice(summary.shard)).filter(
      (item) => item.vocabularyId === vocabularyId,
    );
    return senseId ? items.filter((item) => item.senseId === senseId) : items;
  },
  getRelatedTerms: async (vocabularyId) => {
    const summary = byId.get(vocabularyId);
    if (!summary) return [];
    const tokens = new Set(summary.normalizedTerm.split(' '));
    const related = index
      .filter(
        (item) =>
          item.id !== vocabularyId &&
          item.normalizedTerm.split(' ').some((token) => tokens.has(token)),
      )
      .slice(0, 8);
    return (await Promise.all(related.map((item) => vocabularyRepository.getById(item.id)))).filter(
      (item): item is VocabularyEntry => Boolean(item),
    );
  },
};

export const vocabularyIndex = index;
