import { evaluateVocabularyAnswer, usesTargetExpression } from '../../engine/vocabulary-evaluator';
import type {
  Difficulty,
  VocabularyPracticeItem,
  VocabularySourceReference,
  VocabularyType,
} from '../../types/domain';
import { normalizeSearchText } from '../../utils/search';
import type {
  FetchLike,
  VocabularyLevelChoice,
  VocabularyLookupResult,
  VocabularyTranslationProvider,
} from './types';
import { LEVELS_BY_CHOICE } from './types';

interface Seed {
  english: string;
  context: string;
  sourceReferences: VocabularySourceReference[];
}

const CONTEXTS = [
  'Daily life',
  'Work',
  'Travel',
  'Shopping',
  'Friends',
  'Technology',
  'Services',
  'Vietnam everyday life',
  'Health',
  'Study',
];

function typeFor(result: VocabularyLookupResult): VocabularyType {
  if (result.type) return result.type;
  const pos = result.partOfSpeech?.toLowerCase() ?? '';
  if (['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition'].includes(pos)) {
    return pos as VocabularyType;
  }
  const words = normalizeSearchText(result.term).split(' ');
  if (words.length === 1) return 'word';
  if (
    words.length === 2 &&
    ['up', 'down', 'in', 'out', 'off', 'on', 'over', 'back', 'to'].includes(words[1]!)
  ) {
    return 'phrasal-verb';
  }
  return words.length === 2 ? 'collocation' : 'expression';
}

function controlledSeeds(term: string, type: VocabularyType, partOfSpeech?: string): Seed[] {
  const sourceReferences: VocabularySourceReference[] = [];
  if (term === 'look forward to') {
    return [
      'I look forward to our meeting next week.',
      'We look forward to visiting Da Nang this summer.',
      'I always look forward to the weekend.',
      'The team can look forward to working with you.',
      'She has something exciting to look forward to.',
      'They look forward to hearing your feedback.',
      'I look forward to seeing my friends after work.',
      'We can look forward to better results next month.',
      'He can look forward to trying the new restaurant.',
      'Do you look forward to travelling during Tet?',
    ].map((english, index) => ({ english, context: CONTEXTS[index]!, sourceReferences }));
  }
  const verbLike = type === 'verb' || type === 'phrasal-verb' || /verb/i.test(partOfSpeech ?? '');
  const adjectiveLike =
    type === 'adjective' ||
    /adjective/i.test(partOfSpeech ?? '') ||
    /^(out of|in stock|ready|available)\b/i.test(term);
  const needsObject = /\b(to|for|on|at|with|about|from|into|through|over)$/i.test(term);
  if (adjectiveLike) {
    return [
      `This item is ${term} today.`,
      `Please check whether it is ${term} before we leave.`,
      `The service was ${term} when I called this morning.`,
      `Is this option still ${term} in Vietnam?`,
      `The app says the product is ${term}.`,
      `My friend told me it might be ${term} tomorrow.`,
      `We need something that is ${term} for the trip.`,
      `Customer service confirmed that it was ${term}.`,
      `I did not expect it to be ${term} so soon.`,
      `Could you let me know when it is ${term}?`,
    ].map((english, index) => ({ english, context: CONTEXTS[index]!, sourceReferences }));
  }
  if (verbLike || type === 'expression' || type === 'phrase') {
    const object = needsObject ? ' the issue' : '';
    return [
      needsObject ? `I ${term}${object} this week.` : `I might ${term} today.`,
      needsObject ? `We ${term} the meeting next week.` : `Please let me know if you ${term}.`,
      `Can you ${term}${object} before lunch?`,
      `We should not ${term}${object} during the trip.`,
      `My friend asked whether I could ${term}${object}.`,
      `I had to ${term}${object} because the situation changed.`,
      `The support team will ${term}${object} this afternoon.`,
      `It is important to ${term}${object} before Tet.`,
      `They usually ${term}${object} when they work remotely.`,
      `Could we ${term}${object} one more time?`,
    ].map((english, index) => ({ english, context: CONTEXTS[index]!, sourceReferences }));
  }
  const nounPhrase = /^(a|an|the|this|that|my|your|our)\b/i.test(term) ? term : `the ${term}`;
  return [
    `I heard about ${nounPhrase} this morning.`,
    `We discussed ${nounPhrase} at work today.`,
    `Could you explain ${nounPhrase} before we leave?`,
    `I asked the shop assistant about ${nounPhrase}.`,
    `My friend and I talked about ${nounPhrase}.`,
    `The app shows more information about ${nounPhrase}.`,
    `I called customer service about ${nounPhrase}.`,
    `We need to check ${nounPhrase} before Tet.`,
    `The doctor gave me advice about ${nounPhrase}.`,
    `I wrote a short note about ${nounPhrase} for class.`,
  ].map((english, index) => ({ english, context: CONTEXTS[index]!, sourceReferences }));
}

function acceptedVariants(answer: string): string[] {
  const variants = [
    answer,
    answer
      .replace(/\bI am\b/g, "I'm")
      .replace(/\bdo not\b/g, "don't")
      .replace(/\bcannot\b/g, "can't"),
    answer
      .replace(/\bI'm\b/g, 'I am')
      .replace(/\bdon't\b/g, 'do not')
      .replace(/\bcan't\b/g, 'cannot'),
  ];
  return Array.from(new Set(variants));
}

export async function generatePracticeItems(
  result: VocabularyLookupResult,
  translator: VocabularyTranslationProvider,
  fetcher: FetchLike,
  options: {
    vocabularyId: string;
    level: VocabularyLevelChoice;
    count: number;
    existingCanonicalAnswers: string[];
  },
): Promise<VocabularyPracticeItem[]> {
  const term = normalizeSearchText(result.term);
  const existing = new Set(options.existingCanonicalAnswers.map(normalizeSearchText));
  const onlineSeeds: Seed[] = result.examples
    .filter(
      (item) =>
        usesTargetExpression(item.english, [term]) &&
        !/\b(kill|die|dead|sex|weapon|suicide|murder|hate)\b/i.test(item.english),
    )
    .map((item, index) => ({
      english: item.english,
      context: CONTEXTS[index % CONTEXTS.length]!,
      sourceReferences: [item.source],
    }));
  const seeds = [
    ...controlledSeeds(term, typeFor(result), result.partOfSpeech),
    ...onlineSeeds,
  ].filter(
    (seed, index, all) =>
      usesTargetExpression(seed.english, [term]) &&
      !existing.has(normalizeSearchText(seed.english)) &&
      all.findIndex(
        (item) => normalizeSearchText(item.english) === normalizeSearchText(seed.english),
      ) === index,
  );
  const chosen = seeds.slice(0, options.count);
  if (chosen.length < options.count) throw new Error('Not enough distinct quality candidates');
  const vietnamese = await Promise.all(
    chosen.map((seed) => translator.translateEnglishToVietnamese(seed.english, fetcher)),
  );
  const levels = LEVELS_BY_CHOICE[options.level];
  const stamp = Date.now().toString(36);
  const items = chosen.map((seed, index): VocabularyPracticeItem => {
    const canonicalAnswer = seed.english.trim();
    const acceptedAnswers = acceptedVariants(canonicalAnswer);
    return {
      id: `generated-practice:${options.vocabularyId.replace(/^[^:]+:/, '')}:${stamp}:${index + 1}`,
      vocabularyId: options.vocabularyId,
      vietnamese: vietnamese[index]!.trim(),
      canonicalAnswer,
      acceptedAnswers,
      naturalAlternatives: acceptedAnswers.slice(1),
      targetExpressions: [term],
      grammarFocus: [],
      context: seed.context,
      level: levels[index % levels.length] as Difficulty,
      custom: true,
      generated: true,
      sourceReferences: seed.sourceReferences,
    };
  });
  return items.filter((item) => {
    if (
      !item.vietnamese ||
      normalizeSearchText(item.vietnamese) === normalizeSearchText(item.canonicalAnswer)
    )
      return false;
    if (!usesTargetExpression(item.canonicalAnswer, item.targetExpressions)) return false;
    const canonical = evaluateVocabularyAnswer(item.canonicalAnswer, item);
    const accepted = item.acceptedAnswers.every((answer) => {
      const resultForAnswer = evaluateVocabularyAnswer(answer, item);
      return resultForAnswer.status === 'correct-target';
    });
    return canonical.status === 'correct-target' && accepted;
  });
}

export function inferVocabularyType(result: VocabularyLookupResult): VocabularyType {
  return typeFor(result);
}

export function extractUsagePatterns(term: string, examples: string[]): string[] {
  const target = normalizeSearchText(term);
  return Array.from(
    new Set(
      examples.flatMap((example) => {
        const words = normalizeSearchText(example).split(' ');
        const needle = target.split(' ');
        const index = words.findIndex((_word, start) =>
          needle.every((word, offset) => words[start + offset] === word),
        );
        if (index < 0) return [];
        return [
          words
            .slice(Math.max(0, index - 1), Math.min(words.length, index + needle.length + 1))
            .join(' '),
        ];
      }),
    ),
  )
    .filter((pattern) => pattern !== target)
    .slice(0, 8);
}
