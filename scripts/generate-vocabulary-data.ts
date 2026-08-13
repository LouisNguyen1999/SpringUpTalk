import { mkdirSync, writeFileSync } from 'node:fs';
import { topics } from '../src/data/index.ts';
import {
  normalizeSearchText,
  normalizeVocabularyIdentityKey,
} from '../src/utils/search.ts';
import type {
  ConversationTurn,
  Difficulty,
  VocabularyEntry,
  VocabularyPracticeItem,
  VocabularySummary,
  VocabularyType,
} from '../src/types/domain.ts';

interface SourceTurn {
  topicId: string;
  category: string;
  level: Difficulty;
  conversationId: string;
  turn: ConversationTurn;
  normalized: string;
  tokens: string[];
}
interface SourceVocabulary {
  word: string;
  meaning: string;
  ipa?: string;
  example: string;
  exampleVi?: string;
  topicId: string;
  category: string;
  level: Difficulty;
  conversationId: string;
}

const outputDirectory = new URL('../src/data/vocabulary/generated/', import.meta.url);
mkdirSync(outputDirectory, { recursive: true });
mkdirSync(new URL('details/', outputDirectory), { recursive: true });
mkdirSync(new URL('practice/', outputDirectory), { recursive: true });

const sourceTurns: SourceTurn[] = topics.flatMap((topic) =>
  topic.conversations.flatMap((conversation) =>
    conversation.turns.map((turn) => {
      const normalized = normalizeSearchText(turn.canonicalAnswer);
      return {
        topicId: topic.id,
        category: topic.category,
        level: topic.level,
        conversationId: conversation.id,
        turn,
        normalized,
        tokens: normalized.split(' '),
      };
    }),
  ),
);
const turnsByToken = new Map<string, SourceTurn[]>();
for (const row of sourceTurns)
  for (const token of new Set(row.tokens))
    turnsByToken.set(token, [...(turnsByToken.get(token) ?? []), row]);
const sourceVocabulary = topics.flatMap((topic) =>
  topic.conversations.flatMap((conversation) =>
    conversation.turns.flatMap((turn) =>
      (turn.vocabulary ?? []).map((item): SourceVocabulary => ({
        ...item,
        topicId: topic.id,
        category: topic.category,
        level: topic.level,
        conversationId: conversation.id,
      })),
    ),
  ),
);

const particleWords = new Set([
  'back',
  'down',
  'in',
  'into',
  'off',
  'on',
  'out',
  'over',
  'through',
  'up',
  'with',
]);
const blockedPracticeTerms = new Set([
  'son',
  'numb',
  'ease',
  'near',
  'around',
  'instead',
  'relative',
  'remaining',
  'matching',
  'recording',
]);
const knownTypes: Record<string, VocabularyType> = { deadline: 'noun', issue: 'noun' };
const knownPartOfSpeech: Record<string, string> = { deadline: 'noun', issue: 'noun' };
const knownCollocations: Record<string, string[]> = {
  deadline: [
    'meet the deadline',
    'miss the deadline',
    'extend the deadline',
    'tight deadline',
    'deadline is approaching',
  ],
  issue: [
    'address the issue',
    'resolve the issue',
    'report an issue',
    'issue a warning',
    'issue a replacement',
  ],
};

function inferType(term: string): VocabularyType {
  const normalized = normalizeSearchText(term);
  if (knownTypes[normalized]) return knownTypes[normalized]!;
  const words = normalized.split(' ');
  if (words.length === 1) return 'word';
  if (words.length === 2 && particleWords.has(words[1]!)) return 'phrasal-verb';
  if (words.length === 2) return 'collocation';
  if (words.length === 3) return 'phrase';
  return 'expression';
}

function containsTerm(row: SourceTurn, term: string): boolean {
  const needle = normalizeSearchText(term).split(' ');
  if (!needle.length) return false;
  return row.tokens.some((_token, index) =>
    needle.every((token, offset) => row.tokens[index + offset] === token),
  );
}

function matchingTurns(term: string): SourceTurn[] {
  const first = normalizeSearchText(term).split(' ')[0];
  return first ? (turnsByToken.get(first) ?? []).filter((row) => containsTerm(row, term)) : [];
}

function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  return [...new Map(items.map((item) => [key(item), item])).values()];
}

function nearbyCollocations(term: string, rows: SourceTurn[]): string[] {
  const known = knownCollocations[normalizeSearchText(term)] ?? [];
  if (known.length) return known;
  const needle = normalizeSearchText(term).split(' ');
  if (needle.length > 1) return [normalizeSearchText(term)];
  const values: string[] = [];
  for (const row of rows) {
    const index = row.tokens.indexOf(needle[0]!);
    if (index < 0) continue;
    const before = row.tokens[index - 1];
    const after = row.tokens[index + 1];
    if (
      before &&
      ![
        'a',
        'an',
        'the',
        'this',
        'that',
        'my',
        'your',
        'our',
        'its',
        'is',
        'are',
        'was',
        'were',
      ].includes(before)
    )
      values.push(`${before} ${needle[0]}`);
    if (
      after &&
      !['a', 'an', 'the', 'this', 'that', 'is', 'are', 'was', 'were', 'and', 'or'].includes(after)
    )
      values.push(`${needle[0]} ${after}`);
  }
  return uniqueBy(values, (value) => value).slice(0, 6);
}

const grouped = new Map<string, SourceVocabulary[]>();
for (const item of sourceVocabulary) {
  const key = normalizeVocabularyIdentityKey(item.word);
  grouped.set(key, [...(grouped.get(key) ?? []), item]);
}

const curated: SourceVocabulary[] = [
  {
    word: 'deadline',
    meaning: 'hạn chót, thời hạn cuối',
    ipa: '/ˈded.laɪn/',
    example: 'We need to meet the deadline by Friday.',
    exampleVi: 'Chúng ta cần hoàn thành đúng hạn trước thứ Sáu.',
    topicId: 'requesting-a-deadline-extension',
    category: 'Work',
    level: 'B1',
    conversationId: 'requesting-a-deadline-extension-c1',
  },
  {
    word: 'issue',
    meaning: 'vấn đề, sự cố',
    example: "We're having an issue with the payment.",
    exampleVi: 'Chúng tôi đang gặp vấn đề với thanh toán.',
    topicId: 'reporting-a-bug',
    category: 'Technology',
    level: 'B1',
    conversationId: 'reporting-a-bug-c1',
  },
  {
    word: 'issue',
    meaning: 'phát hành, cấp',
    example: 'The bank issued me a new card.',
    exampleVi: 'Ngân hàng đã cấp cho tôi một thẻ mới.',
    topicId: 'replacing-a-damaged-debit-card',
    category: 'Money & Banking',
    level: 'B1',
    conversationId: 'batch-d-replacing-a-damaged-debit-card-c1',
  },
];
for (const item of curated) {
  const key = normalizeVocabularyIdentityKey(item.word);
  grouped.set(key, [...(grouped.get(key) ?? []), item]);
}

const entries: VocabularyEntry[] = [];
for (const [key, records] of grouped) {
  const primary = records[0]!;
  const rows = matchingTurns(primary.word);
  const senses = uniqueBy(records, (item) => normalizeSearchText(item.meaning)).map(
    (item, index) => ({
      id: `${key}:sense-${index + 1}`,
      partOfSpeech:
        key === 'issue' && /phát hành|cấp/.test(item.meaning)
          ? 'verb'
          : knownPartOfSpeech[normalizeSearchText(primary.word)],
      meaning: item.meaning,
      explanationVietnamese:
        key === 'deadline'
          ? 'Thời điểm cuối cùng mà một công việc cần được hoàn thành.'
          : undefined,
    }),
  );
  const annotationExamples = records.map((item, index) => ({
    id: `${key}:example-a${index + 1}`,
    english: item.example,
    vietnamese: item.exampleVi ?? '',
    sourceTopicId: item.topicId,
    sourceConversationId: item.conversationId,
  }));
  const sourceExamples = rows.map((row, index) => ({
    id: `${key}:example-s${index + 1}`,
    english: row.turn.canonicalAnswer,
    vietnamese: row.turn.vietnamese,
    context: row.category,
    sourceTopicId: row.topicId,
    sourceConversationId: row.conversationId,
  }));
  entries.push({
    id: `vocab:${key}`,
    term: primary.word,
    normalizedTerm: normalizeSearchText(primary.word),
    type: inferType(primary.word),
    partOfSpeech: knownPartOfSpeech[normalizeSearchText(primary.word)],
    ipa: records.find((item) => item.ipa)?.ipa,
    meanings: senses,
    explanationVietnamese: senses[0]?.explanationVietnamese,
    collocations: nearbyCollocations(primary.word, rows),
    phrases: [],
    wordFamily: [],
    synonyms: [],
    antonyms: [],
    examples: uniqueBy([...annotationExamples, ...sourceExamples], (item) =>
      normalizeSearchText(item.english),
    ).slice(0, 8),
    cefr: records
      .map((item) => item.level)
      .sort((a, b) => ['A1', 'A2', 'B1', 'B2'].indexOf(a) - ['A1', 'A2', 'B1', 'B2'].indexOf(b))[0],
    tags: uniqueBy(
      records.map((item) => item.category),
      (value) => value,
    ).slice(0, 5),
    sourceTopicIds: uniqueBy(
      records.map((item) => item.topicId),
      (value) => value,
    ),
  });
}

interface Candidate {
  entry: VocabularyEntry;
  rows: SourceTurn[];
  score: number;
}
const candidates: Candidate[] = entries
  .flatMap((entry) => {
    const rows = matchingTurns(entry.term);
    const words = entry.normalizedTerm.split(' ');
    if (
      rows.length < 5 ||
      entry.normalizedTerm.length < 3 ||
      /\d/.test(entry.normalizedTerm) ||
      blockedPracticeTerms.has(entry.normalizedTerm)
    )
      return [];
    const topicDiversity = new Set(rows.map((row) => row.topicId)).size;
    const score =
      (words.length > 1 ? 120 : 0) +
      Math.min(words.length, 4) * 35 +
      Math.min(rows.length, 30) +
      Math.min(topicDiversity, 10) * 8;
    return [{ entry, rows, score }];
  })
  .sort(
    (left, right) => right.score - left.score || left.entry.term.localeCompare(right.entry.term),
  );

const requiredIds = ['vocab:deadline', 'vocab:issue'];
const candidatesOfType = (type: VocabularyType, count: number) =>
  candidates.filter((candidate) => candidate.entry.type === type).slice(0, count);
const selected = uniqueBy(
  [
    ...requiredIds
      .map((id) => candidates.find((candidate) => candidate.entry.id === id))
      .filter((item): item is Candidate => Boolean(item)),
    ...candidatesOfType('word', 100),
    ...candidatesOfType('phrasal-verb', 30),
    ...candidatesOfType('collocation', 150),
    ...candidatesOfType('phrase', 100),
    ...candidates,
  ],
  (candidate) => candidate.entry.id,
).slice(0, 500);
if (selected.length !== 500)
  throw new Error(`Expected 500 practice-enabled vocabulary entries; found ${selected.length}`);

function evenlySelect(rows: SourceTurn[], count: number): SourceTurn[] {
  const unique = uniqueBy(rows, (row) => normalizeSearchText(row.turn.canonicalAnswer));
  const byTopic = uniqueBy(unique, (row) => row.topicId);
  const pool = uniqueBy([...byTopic, ...unique], (row) =>
    normalizeSearchText(row.turn.canonicalAnswer),
  );
  return Array.from(
    { length: count },
    (_value, index) => pool[Math.floor((index * pool.length) / count)]!,
  ).filter(Boolean);
}

function targetFor(term: string, answer: string): string {
  const known = knownCollocations[normalizeSearchText(term)]?.filter((collocation) =>
    normalizeSearchText(answer).includes(normalizeSearchText(collocation)),
  );
  return known?.[0] ?? normalizeSearchText(term);
}

const practice: VocabularyPracticeItem[] = [];
for (const { entry, rows } of selected) {
  for (const [index, row] of evenlySelect(rows, 5).entries()) {
    const target = targetFor(entry.term, row.turn.canonicalAnswer);
    const issueVerb =
      entry.id === 'vocab:issue' &&
      /\bissue(?:d|s|ing)?\b/i.test(row.turn.canonicalAnswer) &&
      !/\b(?:an|the|this|same|other) issue\b/i.test(row.turn.canonicalAnswer);
    practice.push({
      id: `vocab-practice:${entry.id.slice(6)}:${index + 1}`,
      vocabularyId: entry.id,
      senseId:
        entry.id === 'vocab:issue'
          ? `${normalizeVocabularyIdentityKey(entry.term)}:sense-${issueVerb ? 2 : 1}`
          : entry.meanings[0]?.id,
      vietnamese: row.turn.vietnamese,
      canonicalAnswer: row.turn.canonicalAnswer,
      acceptedAnswers: Array.from(new Set([row.turn.canonicalAnswer, ...row.turn.acceptedAnswers])),
      naturalAlternatives: row.turn.naturalAlternatives,
      targetExpressions: [target],
      grammarFocus: row.turn.grammarPoints ?? [],
      hint: row.turn.hint,
      explanation: row.turn.explanation,
      context: row.category,
      level: row.level,
      sourceTopicId: row.topicId,
      sourceConversationId: row.conversationId,
      semanticConstraints: row.turn.semanticConstraints,
      commonMistakes: row.turn.commonMistakes,
    });
  }
}

const curatedPractice: Record<
  string,
  Array<
    Pick<
      VocabularyPracticeItem,
      | 'vietnamese'
      | 'canonicalAnswer'
      | 'acceptedAnswers'
      | 'naturalAlternatives'
      | 'targetExpressions'
      | 'level'
      | 'senseId'
      | 'semanticConstraints'
    >
  >
> = {
  'vocab:deadline': [
    {
      vietnamese: 'Chúng ta cần hoàn thành đúng hạn trước thứ Sáu.',
      canonicalAnswer: 'We need to meet the deadline by Friday.',
      acceptedAnswers: [
        'We need to meet the deadline by Friday.',
        'We have to meet the deadline by Friday.',
      ],
      naturalAlternatives: ['We must finish everything by the Friday deadline.'],
      targetExpressions: ['meet the deadline'],
      level: 'B1',
      senseId: 'deadline:sense-1',
      semanticConstraints: {
        requiredConcepts: [['meet', 'finish'], ['deadline']],
        criticalValues: [['friday']],
        polarity: 'positive',
      },
    },
    {
      vietnamese: 'Chúng tôi có thể không kịp hạn chót.',
      canonicalAnswer: 'We might miss the deadline.',
      acceptedAnswers: [
        'We might miss the deadline.',
        'There is a chance we will miss the deadline.',
        'We might finish late.',
      ],
      naturalAlternatives: ['We may not finish by the deadline.'],
      targetExpressions: ['miss the deadline'],
      level: 'A2',
      senseId: 'deadline:sense-1',
      semanticConstraints: {
        requiredConcepts: [['miss', 'not finish'], ['deadline']],
        polarity: 'positive',
      },
    },
    {
      vietnamese: 'Chúng ta có thể xin gia hạn thời hạn không?',
      canonicalAnswer: 'Could we extend the deadline?',
      acceptedAnswers: ['Could we extend the deadline?', 'Can we ask to extend the deadline?'],
      naturalAlternatives: ['Would it be possible to move the deadline back?'],
      targetExpressions: ['extend the deadline'],
      level: 'B1',
      senseId: 'deadline:sense-1',
      semanticConstraints: {
        requiredConcepts: [['extend', 'move back'], ['deadline']],
        polarity: 'question',
      },
    },
    {
      vietnamese: 'Tôi đang làm việc với một thời hạn rất gấp.',
      canonicalAnswer: "I'm working under a tight deadline.",
      acceptedAnswers: [
        "I'm working under a tight deadline.",
        'I am working under a very tight deadline.',
      ],
      naturalAlternatives: ['I have very little time before the deadline.'],
      targetExpressions: ['tight deadline'],
      level: 'B1',
      senseId: 'deadline:sense-1',
      semanticConstraints: { requiredConcepts: [['tight'], ['deadline']], polarity: 'positive' },
    },
    {
      vietnamese: 'Hạn chót đang đến gần, vì vậy chúng ta phải ưu tiên.',
      canonicalAnswer: 'The deadline is approaching, so we have to prioritize.',
      acceptedAnswers: [
        'The deadline is approaching, so we have to prioritize.',
        'We need to prioritize because the deadline is approaching.',
      ],
      naturalAlternatives: ['With the deadline getting closer, we need to set priorities.'],
      targetExpressions: ['deadline is approaching'],
      level: 'B1',
      senseId: 'deadline:sense-1',
      semanticConstraints: {
        requiredConcepts: [
          ['deadline'],
          ['approaching', 'getting closer'],
          ['prioritize', 'priorities'],
        ],
        polarity: 'positive',
      },
    },
  ],
  'vocab:issue': [
    {
      vietnamese: 'Chúng tôi đang gặp vấn đề với thanh toán.',
      canonicalAnswer: "We're having an issue with the payment.",
      acceptedAnswers: [
        "We're having an issue with the payment.",
        'We are experiencing an issue with the payment.',
      ],
      naturalAlternatives: ['There seems to be a problem with the payment.'],
      targetExpressions: ['issue with'],
      level: 'A2',
      senseId: 'issue:sense-1',
      semanticConstraints: {
        requiredConcepts: [['issue', 'problem'], ['payment']],
        polarity: 'positive',
      },
    },
    {
      vietnamese: 'Tôi sẽ xem xét vấn đề rồi báo lại cho bạn.',
      canonicalAnswer: "I'll look into the issue and get back to you.",
      acceptedAnswers: [
        "I'll look into the issue and get back to you.",
        'I will investigate the issue and reply to you.',
      ],
      naturalAlternatives: ["I'll check the problem and let you know what I find."],
      targetExpressions: ['look into the issue'],
      level: 'B1',
      senseId: 'issue:sense-1',
      semanticConstraints: {
        requiredConcepts: [
          ['look into', 'investigate', 'check'],
          ['issue', 'problem'],
          ['get back', 'reply', 'let you know'],
        ],
        polarity: 'positive',
      },
    },
    {
      vietnamese: 'Chúng ta cần giải quyết vấn đề này hôm nay.',
      canonicalAnswer: 'We need to resolve this issue today.',
      acceptedAnswers: [
        'We need to resolve this issue today.',
        'We have to resolve the issue today.',
      ],
      naturalAlternatives: ['This issue needs to be fixed today.'],
      targetExpressions: ['resolve this issue'],
      level: 'A2',
      senseId: 'issue:sense-1',
      semanticConstraints: {
        requiredConcepts: [['resolve', 'fix'], ['issue']],
        criticalValues: [['today']],
        polarity: 'positive',
      },
    },
    {
      vietnamese: 'Ngân hàng sẽ cấp thẻ thay thế.',
      canonicalAnswer: 'The bank will issue a replacement card.',
      acceptedAnswers: [
        'The bank will issue a replacement card.',
        'A replacement card will be issued by the bank.',
      ],
      naturalAlternatives: ['The bank will provide a new card.'],
      targetExpressions: ['issue a replacement'],
      level: 'B1',
      senseId: 'issue:sense-2',
      semanticConstraints: {
        requiredConcepts: [['bank'], ['issue', 'provide'], ['replacement card', 'new card']],
        polarity: 'positive',
      },
    },
    {
      vietnamese: 'Cơ quan đã phát hành một cảnh báo chính thức.',
      canonicalAnswer: 'The authority issued an official warning.',
      acceptedAnswers: [
        'The authority issued an official warning.',
        'An official warning was issued by the authority.',
      ],
      naturalAlternatives: ['The authority released a formal warning.'],
      targetExpressions: ['issued an official warning'],
      level: 'B1',
      senseId: 'issue:sense-2',
      semanticConstraints: {
        requiredConcepts: [
          ['authority'],
          ['issued', 'released'],
          ['official warning', 'formal warning'],
        ],
        tenseExpectation: 'past-simple',
        polarity: 'positive',
      },
    },
  ],
};
for (const [vocabularyId, items] of Object.entries(curatedPractice)) {
  const positions = practice
    .map((item, index) => (item.vocabularyId === vocabularyId ? index : -1))
    .filter((index) => index >= 0);
  for (const [index, item] of items.entries()) {
    const position = positions[index];
    if (position === undefined) throw new Error(`Missing generated slot for ${vocabularyId}`);
    practice[position] = {
      id: `vocab-practice:${vocabularyId.slice(6)}:${index + 1}`,
      vocabularyId,
      grammarFocus: [],
      context: 'Curated high-value vocabulary',
      ...item,
    };
  }
}

const practiceCounts = practice.reduce<Record<string, number>>(
  (result, item) => ({ ...result, [item.vocabularyId]: (result[item.vocabularyId] ?? 0) + 1 }),
  {},
);
function shardFor(id: string): number {
  return [...id].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 16;
}
const summaries: VocabularySummary[] = entries
  .map((entry) => ({
    id: entry.id,
    term: entry.term,
    normalizedTerm: entry.normalizedTerm,
    shortMeaning: entry.meanings.map((meaning) => meaning.meaning).join(' · '),
    cefr: entry.cefr,
    type: entry.type,
    partOfSpeech: entry.partOfSpeech,
    tags: entry.tags,
    practiceCount: practiceCounts[entry.id] ?? 0,
    shard: shardFor(entry.id),
  }))
  .sort((left, right) => left.term.localeCompare(right.term));

writeFileSync(
  new URL('vocabulary-index.generated.json', outputDirectory),
  `${JSON.stringify(summaries)}\n`,
);
for (let shard = 0; shard < 16; shard += 1) {
  writeFileSync(
    new URL(`details/${shard}.generated.json`, outputDirectory),
    `${JSON.stringify(entries.filter((entry) => shardFor(entry.id) === shard))}\n`,
  );
  writeFileSync(
    new URL(`practice/${shard}.generated.json`, outputDirectory),
    `${JSON.stringify(practice.filter((item) => shardFor(item.vocabularyId) === shard))}\n`,
  );
}
console.log(
  `Generated vocabulary data: ${sourceVocabulary.length} annotations · ${entries.length} entries · ${selected.length} enabled · ${practice.length} practice items.`,
);
