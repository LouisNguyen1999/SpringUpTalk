import type {
  FetchLike,
  VocabularyExampleProvider,
  VocabularyLookupProvider,
  VocabularyLookupResult,
  VocabularyTranslationProvider,
} from './types';

function reference(provider: string, url: string, license?: string) {
  return { provider, url, license, retrievedAt: new Date().toISOString() };
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export class FreeDictionaryProvider implements VocabularyLookupProvider {
  readonly name = 'Free Dictionary API';

  async lookup(term: string, fetcher: FetchLike): Promise<VocabularyLookupResult> {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`;
    const response = await fetcher(url);
    if (!response.ok) throw new Error(`Dictionary API ${response.status}`);
    const data = (await response.json()) as Array<{
      word?: string;
      phonetic?: string;
      phonetics?: Array<{ text?: string }>;
      meanings?: Array<{
        partOfSpeech?: string;
        synonyms?: string[];
        antonyms?: string[];
        definitions?: Array<{
          definition?: string;
          example?: string;
          synonyms?: string[];
          antonyms?: string[];
        }>;
      }>;
    }>;
    const first = data[0];
    const meaning = first?.meanings?.find((item) => item.definitions?.[0]?.definition);
    const definition = meaning?.definitions?.[0]?.definition?.trim();
    if (!first || !definition) throw new Error('Dictionary API returned no definition');
    const source = reference(this.name, url, 'Dictionary API public data');
    const definitions = first.meanings?.flatMap((item) => item.definitions ?? []) ?? [];
    return {
      term: first.word?.trim() || term,
      definitionEnglish: definition,
      partOfSpeech: meaning?.partOfSpeech,
      ipa: first.phonetic || first.phonetics?.find((item) => item.text)?.text,
      examples: definitions
        .flatMap((item) => (item.example ? [{ english: item.example, source }] : []))
        .slice(0, 8),
      synonyms: Array.from(
        new Set([
          ...(meaning?.synonyms ?? []),
          ...definitions.flatMap((item) => item.synonyms ?? []),
        ]),
      ).slice(0, 12),
      antonyms: Array.from(
        new Set([
          ...(meaning?.antonyms ?? []),
          ...definitions.flatMap((item) => item.antonyms ?? []),
        ]),
      ).slice(0, 12),
      sourceReferences: [source],
    };
  }
}

export class WiktionaryProvider implements VocabularyLookupProvider {
  readonly name = 'Wiktionary';

  async lookup(term: string, fetcher: FetchLike): Promise<VocabularyLookupResult> {
    const url = `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(term)}`;
    const response = await fetcher(url, { headers: { 'Api-User-Agent': 'SpringUpTalk/1.0' } });
    if (!response.ok) throw new Error(`Wiktionary ${response.status}`);
    const data = (await response.json()) as Record<
      string,
      Array<{
        partOfSpeech?: string;
        definitions?: Array<{ definition?: string; examples?: string[] }>;
      }>
    >;
    const blocks = data.en ?? Object.values(data)[0] ?? [];
    const block = blocks.find((item) => item.definitions?.some((value) => value.definition));
    const definition = stripHtml(block?.definitions?.[0]?.definition ?? '');
    if (!definition) throw new Error('Wiktionary returned no English definition');
    const source = reference(
      this.name,
      `https://en.wiktionary.org/wiki/${encodeURIComponent(term)}`,
      'CC BY-SA 4.0',
    );
    return {
      term,
      definitionEnglish: definition,
      partOfSpeech: block?.partOfSpeech,
      examples: (block?.definitions ?? [])
        .flatMap((item) => item.examples ?? [])
        .map((english) => ({ english: stripHtml(english), source }))
        .filter((item) => item.english)
        .slice(0, 8),
      synonyms: [],
      antonyms: [],
      sourceReferences: [source],
    };
  }
}

export class TatoebaExampleProvider implements VocabularyExampleProvider {
  readonly name = 'Tatoeba';

  async find(term: string, fetcher: FetchLike) {
    const url = `https://api.tatoeba.org/v1/sentences?lang=eng&q=${encodeURIComponent(`"${term}"`)}&word_count=4-18&sort=relevance`;
    const response = await fetcher(url);
    if (!response.ok) throw new Error(`Tatoeba ${response.status}`);
    const payload = (await response.json()) as {
      data?: Array<{ id?: number; text?: string }>;
      results?: Array<{ id?: number; text?: string }>;
    };
    const rows = payload.data ?? payload.results ?? [];
    return rows
      .flatMap((item) => {
        if (!item.text) return [];
        const source = reference(
          this.name,
          `https://tatoeba.org/en/sentences/show/${item.id ?? ''}`,
          'CC BY 2.0 FR',
        );
        return [{ english: item.text.trim(), source }];
      })
      .slice(0, 20);
  }
}

export class MyMemoryTranslationProvider implements VocabularyTranslationProvider {
  readonly name = 'MyMemory';

  async translateEnglishToVietnamese(text: string, fetcher: FetchLike): Promise<string> {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=en|vi`;
    const response = await fetcher(url);
    if (!response.ok) throw new Error(`MyMemory ${response.status}`);
    const payload = (await response.json()) as {
      responseStatus?: number;
      responseData?: { translatedText?: string };
    };
    const translated = payload.responseData?.translatedText?.trim();
    if (!translated || translated.toLowerCase().includes('mymemory warning')) {
      throw new Error('MyMemory returned no usable translation');
    }
    return translated;
  }
}
