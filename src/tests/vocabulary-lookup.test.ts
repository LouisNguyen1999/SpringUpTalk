import { describe, expect, it, vi } from 'vitest';
import {
  lookupVocabularyOnline,
  type FetchLike,
  type VocabularyExampleProvider,
  type VocabularyLookupProvider,
  type VocabularyLookupResult,
  type VocabularyTranslationProvider,
} from '../services/vocabulary-lookup';

const source = {
  provider: 'Test Dictionary',
  url: 'https://example.test/run-late',
  license: 'Test license',
  retrievedAt: '2026-08-13T00:00:00.000Z',
};

function result(): VocabularyLookupResult {
  return {
    term: 'run late',
    definitionEnglish: 'to arrive or happen later than planned',
    partOfSpeech: 'verb',
    type: 'phrasal-verb',
    ipa: '/rʌn leɪt/',
    examples: [],
    synonyms: ['be delayed'],
    antonyms: ['be on time'],
    sourceReferences: [source],
  };
}

const fetcher = vi.fn() as unknown as FetchLike;
const translator: VocabularyTranslationProvider = {
  name: 'Test Translator',
  translateEnglishToVietnamese: async (text) => `VI: ${text}`,
};
const examples: VocabularyExampleProvider = {
  name: 'Test Examples',
  find: async () => [],
};

describe('online vocabulary lookup pipeline', () => {
  it('looks up a term and prepares exactly five diverse quality-gated exercises', async () => {
    const provider: VocabularyLookupProvider = { name: 'Primary', lookup: async () => result() };
    const bundle = await lookupVocabularyOnline('run late', {
      fetcher,
      providers: [provider],
      exampleProvider: examples,
      translator,
      level: 'mixed',
    });
    expect(bundle.entry).toMatchObject({
      id: 'custom:runlate',
      term: 'run late',
      ipa: '/rʌn leɪt/',
      custom: true,
    });
    expect(bundle.entry.meanings[0]?.meaning).toContain('VI:');
    expect(bundle.practice).toHaveLength(5);
    expect(new Set(bundle.practice.map((item) => item.context)).size).toBe(5);
    expect(bundle.practice.every((item) => item.targetExpressions[0] === 'run late')).toBe(true);
  });

  it('falls back to the next provider after a provider failure', async () => {
    const failed: VocabularyLookupProvider = {
      name: 'Failed provider',
      lookup: async () => {
        throw new Error('unavailable');
      },
    };
    const fallback: VocabularyLookupProvider = {
      name: 'Fallback provider',
      lookup: async () => result(),
    };
    const bundle = await lookupVocabularyOnline('run late', {
      fetcher,
      providers: [failed, fallback],
      exampleProvider: examples,
      translator,
    });
    expect(bundle.providersTried).toEqual(['Failed provider', 'Fallback provider']);
    expect(bundle.providerUsed).toBe('Test Dictionary');
  });

  it('generates five more exercises without duplicating the first bank', async () => {
    const provider: VocabularyLookupProvider = { name: 'Primary', lookup: async () => result() };
    const first = await lookupVocabularyOnline('run late', {
      fetcher,
      providers: [provider],
      exampleProvider: examples,
      translator,
    });
    const more = await lookupVocabularyOnline('run late', {
      fetcher,
      providers: [provider],
      exampleProvider: examples,
      translator,
      existingCanonicalAnswers: first.practice.map((item) => item.canonicalAnswer),
    });
    expect(more.practice).toHaveLength(5);
    const firstAnswers = new Set(first.practice.map((item) => item.canonicalAnswer));
    expect(more.practice.every((item) => !firstAnswers.has(item.canonicalAnswer))).toBe(true);
  });

  it('rejects a generated bank when translation is unavailable', async () => {
    const provider: VocabularyLookupProvider = { name: 'Primary', lookup: async () => result() };
    const brokenTranslator: VocabularyTranslationProvider = {
      name: 'Broken',
      translateEnglishToVietnamese: async () => {
        throw new Error('quota');
      },
    };
    await expect(
      lookupVocabularyOnline('run late', {
        fetcher,
        providers: [provider],
        exampleProvider: examples,
        translator: brokenTranslator,
      }),
    ).rejects.toMatchObject({ code: 'translation-unavailable' });
  });
});
