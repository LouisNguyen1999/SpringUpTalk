import type {
  Difficulty,
  VocabularyEntry,
  VocabularyPracticeItem,
  VocabularySourceReference,
  VocabularyType,
} from '../../types/domain';

export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export type VocabularyLevelChoice = 'easy' | 'normal' | 'advanced' | 'mixed';

export interface VocabularyLookupResult {
  term: string;
  definitionEnglish: string;
  partOfSpeech?: string;
  type?: VocabularyType;
  ipa?: string;
  examples: Array<{ english: string; context?: string; source: VocabularySourceReference }>;
  synonyms: string[];
  antonyms: string[];
  sourceReferences: VocabularySourceReference[];
}

export interface VocabularyLookupProvider {
  readonly name: string;
  lookup(term: string, fetcher: FetchLike): Promise<VocabularyLookupResult>;
}

export interface VocabularyExampleProvider {
  readonly name: string;
  find(term: string, fetcher: FetchLike): Promise<VocabularyLookupResult['examples']>;
}

export interface VocabularyTranslationProvider {
  readonly name: string;
  translateEnglishToVietnamese(text: string, fetcher: FetchLike): Promise<string>;
}

export interface VocabularyLookupBundle {
  entry: VocabularyEntry;
  practice: VocabularyPracticeItem[];
  providersTried: string[];
  providerUsed: string;
}

export interface LookupVocabularyOptions {
  fetcher?: FetchLike;
  providers?: VocabularyLookupProvider[];
  exampleProvider?: VocabularyExampleProvider;
  translator?: VocabularyTranslationProvider;
  level?: VocabularyLevelChoice;
  count?: number;
  existingCanonicalAnswers?: string[];
  timeoutMs?: number;
  now?: () => Date;
}

export type VocabularyLookupErrorCode =
  | 'offline'
  | 'timeout'
  | 'no-result'
  | 'providers-unavailable'
  | 'translation-unavailable'
  | 'quality-gate';

export class VocabularyLookupError extends Error {
  constructor(
    public readonly code: VocabularyLookupErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'VocabularyLookupError';
  }
}

export const LEVELS_BY_CHOICE: Record<VocabularyLevelChoice, Difficulty[]> = {
  easy: ['A1', 'A2'],
  normal: ['A2', 'B1'],
  advanced: ['B1', 'B2'],
  mixed: ['A1', 'A2', 'B1', 'B2'],
};
