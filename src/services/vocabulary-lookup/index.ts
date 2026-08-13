import { normalizeSearchText, normalizeVocabularyIdentityKey } from '../../utils/search';
import type { VocabularyExample } from '../../types/domain';
import {
  extractUsagePatterns,
  generatePracticeItems,
  inferVocabularyType,
} from './practice-generator';
import {
  FreeDictionaryProvider,
  MyMemoryTranslationProvider,
  TatoebaExampleProvider,
  WiktionaryProvider,
} from './providers';
import type { LookupVocabularyOptions, VocabularyLookupResult } from './types';
import { VocabularyLookupError } from './types';

export * from './types';
export * from './providers';
export * from './practice-generator';

async function withTimeout<T>(request: Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      request,
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(
          () => reject(new VocabularyLookupError('timeout', 'Tra cứu đã quá thời gian chờ.')),
          timeoutMs,
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function lookupVocabularyOnline(
  termInput: string,
  options: LookupVocabularyOptions = {},
) {
  const term = normalizeSearchText(termInput);
  if (!term) throw new VocabularyLookupError('no-result', 'Hãy nhập một từ hoặc cụm từ.');
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new VocabularyLookupError('offline', 'Thiết bị đang offline.');
  }
  const fetcher = options.fetcher ?? fetch;
  const providers = options.providers ?? [new FreeDictionaryProvider(), new WiktionaryProvider()];
  const exampleProvider = options.exampleProvider ?? new TatoebaExampleProvider();
  const translator = options.translator ?? new MyMemoryTranslationProvider();
  const timeoutMs = options.timeoutMs ?? 10_000;
  const tried: string[] = [];
  const providerErrors: unknown[] = [];
  let lookup: VocabularyLookupResult | undefined;
  for (const provider of providers) {
    tried.push(provider.name);
    try {
      lookup = await withTimeout(provider.lookup(term, fetcher), timeoutMs);
      if (lookup.definitionEnglish) break;
    } catch (error) {
      providerErrors.push(error);
      // The next public provider is the intended fallback.
    }
  }
  if (!lookup) {
    if (providerErrors.some((error) => error instanceof VocabularyLookupError && error.code === 'timeout')) {
      throw new VocabularyLookupError('timeout', 'Các nguồn tra cứu đã quá thời gian chờ.');
    }
    if (
      providerErrors.length > 0 &&
      providerErrors.every((error) => /404|no definition|no english definition/i.test(String(error)))
    ) {
      throw new VocabularyLookupError('no-result', `Không tìm thấy “${termInput.trim()}” trên các nguồn công khai.`);
    }
    throw new VocabularyLookupError(
      'providers-unavailable',
      'Không nguồn từ điển nào trả về kết quả phù hợp.',
    );
  }
  try {
    const examples = await withTimeout(exampleProvider.find(term, fetcher), timeoutMs).catch(
      () => [],
    );
    lookup = {
      ...lookup,
      examples: [...lookup.examples, ...examples].filter(
        (item, index, all) =>
          all.findIndex(
            (candidate) =>
              normalizeSearchText(candidate.english) === normalizeSearchText(item.english),
          ) === index,
      ),
    };
    const meaning = await withTimeout(
      translator.translateEnglishToVietnamese(lookup.definitionEnglish, fetcher),
      timeoutMs,
    );
    const id = `custom:${normalizeVocabularyIdentityKey(term)}`;
    const now = (options.now ?? (() => new Date()))().toISOString();
    const practice = await withTimeout(
      generatePracticeItems(lookup, translator, fetcher, {
        vocabularyId: id,
        level: options.level ?? 'mixed',
        count: options.count ?? 5,
        existingCanonicalAnswers: options.existingCanonicalAnswers ?? [],
      }),
      timeoutMs,
    );
    if (practice.length < (options.count ?? 5)) {
      throw new VocabularyLookupError('quality-gate', 'Không đủ câu vượt qua kiểm tra chất lượng.');
    }
    const vocabularyExamples: VocabularyExample[] = lookup.examples
      .slice(0, 8)
      .map((item, index) => ({
        id: `${id}:online-example-${index + 1}`,
        english: item.english,
        vietnamese: '',
        sourceReferences: [item.source],
      }));
    return {
      entry: {
        id,
        term: termInput.trim(),
        normalizedTerm: term,
        type: inferVocabularyType(lookup),
        partOfSpeech: lookup.partOfSpeech,
        ipa: lookup.ipa,
        meanings: [{ id: `${id}:sense-1`, partOfSpeech: lookup.partOfSpeech, meaning }],
        definitionEnglish: lookup.definitionEnglish,
        explanationVietnamese: meaning,
        collocations: extractUsagePatterns(
          term,
          lookup.examples.map((item) => item.english),
        ),
        phrases: [],
        wordFamily: [],
        synonyms: lookup.synonyms,
        antonyms: lookup.antonyms,
        examples: vocabularyExamples,
        tags: ['Custom', 'Online lookup'],
        sourceTopicIds: [],
        custom: true,
        sourceReferences: lookup.sourceReferences,
        lookupUpdatedAt: now,
      },
      practice,
      providersTried: tried,
      providerUsed: lookup.sourceReferences[0]?.provider ?? tried.at(-1) ?? 'Unknown',
    };
  } catch (error) {
    if (error instanceof VocabularyLookupError) throw error;
    throw new VocabularyLookupError(
      'translation-unavailable',
      'Không thể tạo bản dịch và câu luyện an toàn.',
    );
  }
}
