import { normalizeForEvaluation } from '../sentence-normalizer';
import type {
  Mistake,
  MistakeType,
  WritingDiffSegment,
  WritingEvaluation,
  WritingFactEvaluation,
  WritingFeedbackCategory,
  WritingFeedbackIssue,
  WritingIdeaEvaluation,
  WritingMasterySkill,
  WritingPracticeTopic,
  WritingQualityBand,
  WritingQualityDimension,
  WritingSpecializedFeedback,
  WritingTargetAchievement,
} from '../../types/domain';

export const WRITING_FEEDBACK_CATEGORIES: readonly WritingFeedbackCategory[] = [
  'GRAMMAR', 'VOCABULARY', 'WORD_ORDER', 'TENSE', 'SUBJECT_VERB_AGREEMENT', 'ARTICLE',
  'PREPOSITION', 'PRONOUN', 'PLURAL', 'SPELLING', 'PUNCTUATION', 'CAPITALIZATION',
  'MISSING_IDEA', 'EXTRA_MEANING', 'WRONG_MEANING', 'UNNATURAL_EXPRESSION',
  'COLLOCATION', 'WORD_FORM', 'CONNECTOR', 'SENTENCE_STRUCTURE',
] as const;

export const WRITING_FEEDBACK_LABELS: Record<WritingFeedbackCategory, string> = {
  GRAMMAR: 'Ngữ pháp',
  VOCABULARY: 'Từ vựng',
  WORD_ORDER: 'Trật tự từ',
  TENSE: 'Thì của động từ',
  SUBJECT_VERB_AGREEMENT: 'Hòa hợp chủ ngữ – động từ',
  ARTICLE: 'Mạo từ',
  PREPOSITION: 'Giới từ',
  PRONOUN: 'Đại từ',
  PLURAL: 'Danh từ số nhiều',
  SPELLING: 'Chính tả',
  PUNCTUATION: 'Dấu câu',
  CAPITALIZATION: 'Viết hoa',
  MISSING_IDEA: 'Thiếu ý',
  EXTRA_MEANING: 'Thêm nghĩa',
  WRONG_MEANING: 'Sai nghĩa',
  UNNATURAL_EXPRESSION: 'Diễn đạt chưa tự nhiên',
  COLLOCATION: 'Cụm từ tự nhiên',
  WORD_FORM: 'Dạng từ',
  CONNECTOR: 'Từ nối',
  SENTENCE_STRUCTURE: 'Cấu trúc câu',
};

const LEGACY_CATEGORY: Record<MistakeType, WritingFeedbackCategory> = {
  grammar: 'GRAMMAR', vocabulary: 'VOCABULARY', spelling: 'SPELLING', tense: 'TENSE',
  article: 'ARTICLE', preposition: 'PREPOSITION', 'word-order': 'WORD_ORDER',
  'singular-plural': 'PLURAL', 'subject-verb-agreement': 'SUBJECT_VERB_AGREEMENT',
  pronoun: 'PRONOUN', auxiliary: 'GRAMMAR', modal: 'GRAMMAR', collocation: 'COLLOCATION',
  'unnatural-expression': 'UNNATURAL_EXPRESSION', 'missing-word': 'SENTENCE_STRUCTURE',
  'unnecessary-word': 'SENTENCE_STRUCTURE',
};

const CATEGORY_SKILLS: Partial<Record<WritingFeedbackCategory, WritingMasterySkill[]>> = {
  GRAMMAR: ['subject-be'],
  WORD_ORDER: ['word-order'],
  TENSE: ['past-narration', 'time-expressions'],
  SUBJECT_VERB_AGREEMENT: ['present-simple'],
  ARTICLE: ['sentence-expansion'],
  PREPOSITION: ['natural-expression'],
  PRONOUN: ['subject-be'],
  COLLOCATION: ['collocations'],
  UNNATURAL_EXPRESSION: ['natural-expression', 'paraphrasing'],
  CONNECTOR: ['connectors'],
  SENTENCE_STRUCTURE: ['sentence-expansion'],
};

export function masterySkillsForEvaluation(
  evaluation: Pick<WritingEvaluation, 'feedbackIssues' | 'specializedFeedback'>,
  topic?: Pick<WritingPracticeTopic, 'domain' | 'writingType' | 'usefulStructures'>,
): WritingMasterySkill[] {
  const skills = new Set<WritingMasterySkill>();
  for (const issue of evaluation.feedbackIssues ?? []) {
    for (const skill of CATEGORY_SKILLS[issue.category] ?? []) skills.add(skill);
  }
  for (const target of topic?.usefulStructures ?? []) {
    if (target === 'present-simple') skills.add('present-simple');
    if (target === 'past-simple') skills.add('past-narration');
    if (target === 'questions') skills.add('question-formation');
    if (target === 'negation') skills.add('negation');
  }
  if (topic?.writingType === 'story') skills.add('story-sequencing');
  if (topic?.writingType === 'problem-explanation') skills.add('problem-solution-writing');
  if (topic?.domain === 'it-work') skills.add('it-communication');
  else if (topic) skills.add('workplace-writing');
  return [...skills];
}

function issue(
  category: WritingFeedbackCategory,
  layer: WritingFeedbackIssue['layer'],
  explanationVietnamese: string,
  options: Partial<Omit<WritingFeedbackIssue, 'category' | 'layer' | 'explanationVietnamese'>> = {},
): WritingFeedbackIssue {
  const original = options.original;
  const location = options.location ?? original;
  return {
    id: options.id ?? `${category.toLocaleLowerCase('en')}:${location ?? explanationVietnamese}`,
    category,
    layer,
    severity: options.severity ?? 'warning',
    explanationVietnamese,
    hints: options.hints ?? [
      `Bạn đang có lỗi ${WRITING_FEEDBACK_LABELS[category].toLocaleLowerCase('vi')}.`,
      location ? `Kiểm tra phần “${location}”.` : 'Kiểm tra lại câu vừa viết.',
      explanationVietnamese,
    ],
    ...options,
  };
}

function inflectThirdPerson(verb: string): string {
  if (verb === 'have') return 'has';
  if (verb === 'do') return 'does';
  if (/[^aeiou]y$/i.test(verb)) return `${verb.slice(0, -1)}ies`;
  if (/(?:s|sh|ch|x|z|o)$/i.test(verb)) return `${verb}es`;
  return `${verb}s`;
}

function replaceFirst(value: string, pattern: RegExp, replacement: string): string {
  return pattern.test(value) ? value.replace(pattern, replacement) : value;
}

interface RuleResult { issue: WritingFeedbackIssue; apply: (value: string) => string }

function languageRules(answer: string): RuleResult[] {
  const results: RuleResult[] = [];
  const add = (feedback: WritingFeedbackIssue, apply: RuleResult['apply']) => results.push({ issue: feedback, apply });
  const normalized = normalizeForEvaluation(answer);

  const subjectVerb = answer.match(/\b(he|she|it)\s+(go|work|need|want|like|live|have|do|say|send|make|take|feel|seem|look|arrive|leave|start|finish|try|use|help|ask|plan|check|fix|run)\b/i);
  if (subjectVerb?.[1] && subjectVerb[2]) {
    const verb = subjectVerb[2];
    const corrected = inflectThirdPerson(verb.toLocaleLowerCase('en'));
    add(issue('SUBJECT_VERB_AGREEMENT', 'structure', `Chủ ngữ “${subjectVerb[1]}” là ngôi thứ ba số ít trong Present Simple nên động từ cần thêm s/es.`, {
      original: verb,
      correction: corrected,
      location: verb,
      grammarTarget: 'present-simple-third-person',
    }), (value) => replaceFirst(value, new RegExp(`\\b${verb}\\b`, 'i'), corrected));
  }

  if (/\beveryday\b/i.test(answer)) {
    add(issue('WORD_FORM', 'naturalness', '“every day” nghĩa là mỗi ngày; “everyday” là tính từ đứng trước danh từ.', {
      original: 'everyday', correction: 'every day', location: 'everyday', vocabularyTerm: 'every day',
    }), (value) => value.replace(/\beveryday\b/gi, 'every day'));
  }
  if (/\bI\s+very\s+like\b/i.test(answer)) {
    add(issue('WORD_ORDER', 'structure', 'Không đặt “very” trực tiếp trước động từ “like”. Hãy dùng “really like”.', {
      original: 'very like', correction: 'really like', location: 'very like', grammarTarget: 'adverb-position',
    }), (value) => value.replace(/\bvery\s+like\b/gi, 'really like'));
  }
  if (/\bI\s+am\s+(go|work|need|want|like|live|send|make|take)\b/i.test(answer)) {
    const verb = answer.match(/\bI\s+am\s+(go|work|need|want|like|live|send|make|take)\b/i)?.[1] ?? 'go';
    add(issue('GRAMMAR', 'structure', 'Không dùng “am” trực tiếp trước động từ nguyên mẫu. Dùng Present Simple hoặc “am + V-ing” tùy nghĩa.', {
      original: `am ${verb}`, correction: verb, location: `am ${verb}`, grammarTarget: 'be-and-main-verb',
    }), (value) => value.replace(new RegExp(`\\bam\\s+${verb}\\b`, 'i'), verb));
  }
  if (/\byesterday\b/.test(normalized)) {
    const present = answer.match(/\b(I|we|he|she|they)\s+(go|come|feel|tell|send|discuss|arrive|leave|start|finish)\b/i);
    if (present?.[2]) {
      const past: Record<string, string> = { go: 'went', come: 'came', feel: 'felt', tell: 'told', send: 'sent', discuss: 'discussed', arrive: 'arrived', leave: 'left', start: 'started', finish: 'finished' };
      const correction = past[present[2].toLocaleLowerCase('en')] ?? `${present[2]}ed`;
      add(issue('TENSE', 'structure', 'Mốc “yesterday” nói về sự việc đã kết thúc nên động từ cần ở Past Simple.', {
        original: present[2], correction, location: present[2], grammarTarget: 'past-simple',
      }), (value) => replaceFirst(value, new RegExp(`\\b${present[2]}\\b`, 'i'), correction));
    }
  }

  const singularAfterNumber = answer.match(/\b([2-9]|\d{2,})\s+(minute|hour|day|week|month|year)\b/i);
  if (singularAfterNumber?.[2]) {
    const noun = singularAfterNumber[2];
    add(issue('PLURAL', 'structure', 'Sau số lớn hơn một, danh từ đếm được cần ở dạng số nhiều.', {
      original: noun, correction: `${noun}s`, location: noun,
    }), (value) => replaceFirst(value, new RegExp(`\\b${noun}\\b`, 'i'), `${noun}s`));
  }
  const missingArticle = answer.match(/\b(opened|bought|need|have)\s+(new\s+)?(account|ticket|car|book|phone)\b/i);
  if (missingArticle?.[1] && missingArticle[3]) {
    const phrase = `${missingArticle[2] ?? ''}${missingArticle[3]}`;
    add(issue('ARTICLE', 'structure', 'Danh từ đếm được số ít cần “a/an” khi được nhắc đến chưa xác định.', {
      original: phrase, correction: `a ${phrase}`, location: phrase, grammarTarget: 'articles',
    }), (value) => replaceFirst(value, new RegExp(`\\b${phrase}\\b`, 'i'), `a ${phrase}`));
  }
  const wrongPreposition = answer.match(/\b(arrive|arrived)\s+to\s+(the\s+)?(office|station|airport|bank)\b/i);
  if (wrongPreposition?.[0]) {
    const correction = wrongPreposition[0].replace(/\bto\b/i, 'at');
    add(issue('PREPOSITION', 'structure', 'Dùng “arrive at” với một địa điểm cụ thể.', {
      original: wrongPreposition[0], correction, location: 'to', grammarTarget: 'prepositions-of-place',
    }), (value) => value.replace(wrongPreposition[0], correction));
  }
  if (/\bme\s+(?:go|went|work|worked|need|needed|want|wanted)\b/i.test(answer)) {
    add(issue('PRONOUN', 'structure', 'Ở vị trí chủ ngữ, dùng “I” thay vì tân ngữ “me”.', {
      original: 'me', correction: 'I', location: 'me', grammarTarget: 'subject-pronouns',
    }), (value) => replaceFirst(value, /\bme\b/i, 'I'));
  }
  if (/\bborrow me\b/i.test(answer)) {
    add(issue('VOCABULARY', 'naturalness', '“borrow” là mượn từ ai; khi đưa cho ai mượn, dùng “lend”.', {
      original: 'borrow me', correction: 'lend me', location: 'borrow', vocabularyTerm: 'lend',
    }), (value) => value.replace(/\bborrow me\b/i, 'lend me'));
  }

  const collocations: Array<[RegExp, string, string]> = [
    [/\bmake (?:a )?photo\b/i, 'make a photo', 'take a photo'],
    [/\bdo (?:a )?mistake\b/i, 'do a mistake', 'make a mistake'],
    [/\bstrong rain\b/i, 'strong rain', 'heavy rain'],
    [/\bdiscuss about\b/i, 'discuss about', 'discuss'],
  ];
  for (const [pattern, original, correction] of collocations) {
    if (!pattern.test(answer)) continue;
    add(issue('COLLOCATION', 'naturalness', `“${correction}” là cụm từ tự nhiên hơn trong tiếng Anh.`, {
      original, correction, location: original, vocabularyTerm: correction,
    }), (value) => value.replace(pattern, correction));
  }

  const spellings: Array<[RegExp, string, string]> = [
    [/\bbecuase\b/i, 'becuase', 'because'], [/\bteh\b/i, 'teh', 'the'],
    [/\brecieve\b/i, 'recieve', 'receive'], [/\badress\b/i, 'adress', 'address'],
    [/\bseperate\b/i, 'seperate', 'separate'],
  ];
  for (const [pattern, original, correction] of spellings) {
    if (!pattern.test(answer)) continue;
    add(issue('SPELLING', 'normalization', `Cách viết đúng của “${original}” là “${correction}”.`, {
      original, correction, location: original, severity: 'info', vocabularyTerm: correction,
    }), (value) => value.replace(pattern, correction));
  }

  if (/\baccording to me\b/i.test(answer)) {
    add(issue('UNNATURAL_EXPRESSION', 'naturalness', 'Khi nêu quan điểm cá nhân, “in my opinion” tự nhiên hơn “according to me”.', {
      original: 'according to me', correction: 'in my opinion', location: 'according to me',
    }), (value) => value.replace(/\baccording to me\b/i, 'In my opinion'));
  }
  if (/\b(?:I am|I'm) interesting in\b/i.test(answer)) {
    add(issue('WORD_FORM', 'naturalness', 'Dùng “interested” để nói cảm xúc của người; “interesting” mô tả sự vật gây hứng thú.', {
      original: 'interesting', correction: 'interested', location: 'interesting', vocabularyTerm: 'interested in',
    }), (value) => value.replace(/\binteresting in\b/i, 'interested in'));
  }
  if (/\bbecause\s*[.!?]?$/i.test(answer.trim()) || (answer.split(/\s+/).length > 45 && !/[.!?;]/.test(answer))) {
    add(issue('SENTENCE_STRUCTURE', 'structure', 'Câu đang thiếu một mệnh đề hoàn chỉnh hoặc cần được tách để người đọc theo dõi dễ hơn.', {
      original: 'cấu trúc câu', location: 'cuối câu', grammarTarget: 'complete-sentence',
    }), (value) => value);
  }

  const firstLetter = answer.match(/\p{L}/u)?.[0];
  if (firstLetter && firstLetter === firstLetter.toLocaleLowerCase('en')) {
    add(issue('CAPITALIZATION', 'normalization', 'Câu tiếng Anh cần bắt đầu bằng chữ viết hoa.', {
      original: firstLetter, correction: firstLetter.toLocaleUpperCase('en'), location: 'đầu câu', severity: 'info',
    }), (value) => value.replace(/\p{L}/u, firstLetter.toLocaleUpperCase('en')));
  }
  if (answer.trim().split(/\s+/).length >= 3 && !/[.!?][”"']?$/.test(answer.trim())) {
    add(issue('PUNCTUATION', 'normalization', 'Thêm dấu câu phù hợp ở cuối câu để đoạn viết rõ ràng hơn.', {
      original: 'cuối câu', correction: '.', location: 'cuối câu', severity: 'info',
    }), (value) => `${value.trim()}.`);
  }
  return results;
}

function legacyIssues(issues: Mistake[]): WritingFeedbackIssue[] {
  return issues.map((item, index) => issue(LEGACY_CATEGORY[item.type], 'structure', item.explanation, {
    id: `legacy:${item.type}:${index}`,
    original: item.original,
    correction: item.correction,
    location: item.original,
  }));
}

function meaningIssues(ideas: WritingIdeaEvaluation[], facts: WritingFactEvaluation[]): WritingFeedbackIssue[] {
  const results: WritingFeedbackIssue[] = [];
  for (const ideaResult of ideas) {
    if (ideaResult.status === 'covered') continue;
    const category = ideaResult.status === 'contradicted' ? 'WRONG_MEANING' : 'MISSING_IDEA';
    const message = ideaResult.message ?? `Bạn chưa truyền đạt đủ ý “${ideaResult.labelVietnamese}”.`;
    results.push(issue(category, 'meaning', message, {
      severity: ideaResult.status === 'contradicted' ? 'error' : 'warning',
      location: ideaResult.labelVietnamese,
      hints: [
        ideaResult.status === 'contradicted' ? 'Một ý quan trọng đang bị đổi nghĩa.' : 'Đoạn viết đang thiếu một ý.',
        `Đối chiếu lại phần tiếng Việt: “${ideaResult.labelVietnamese}”.`,
        'Bổ sung hoặc diễn đạt lại ý này bằng từ ngữ của bạn; không cần giống bài mẫu.',
      ],
    }));
  }
  for (const fact of facts.filter((item) => !item.correct)) {
    results.push(issue(fact.status === 'contradicted' ? 'WRONG_MEANING' : 'MISSING_IDEA', 'meaning', fact.message ?? `Kiểm tra lại “${fact.labelVietnamese}”.`, {
      severity: 'error', location: fact.labelVietnamese,
    }));
  }
  return results;
}

function detectExtraMeaning(answer: string, topic: WritingPracticeTopic): WritingFeedbackIssue[] {
  const reference = normalizeForEvaluation([
    topic.vietnameseSourceText,
    ...topic.requiredIdeas.flatMap((idea) => idea.concepts),
    ...topic.sampleAnswers,
  ].join(' '));
  const additions = [
    { pattern: /\bwith my friends?\b/i, key: 'friend', text: 'with my friend' },
    { pattern: /\bwith my (?:wife|husband)\b/i, key: 'wife', text: 'with my wife/husband' },
    { pattern: /\bfor my birthday\b/i, key: 'birthday', text: 'for my birthday' },
  ];
  return additions
    .filter(({ pattern, key }) => pattern.test(answer) && !reference.includes(key))
    .map(({ text }) => issue('EXTRA_MEANING', 'meaning', `Phần “${text}” bổ sung thông tin không có trong nội dung nguồn. Ý chính vẫn có thể đúng, nhưng bản dịch không còn hoàn toàn tương đương.`, {
      original: text, location: text, severity: 'warning',
    }));
}

function targetAchievement(answer: string, topic: WritingPracticeTopic, meaningPreserved: boolean, issues: WritingFeedbackIssue[]): WritingTargetAchievement {
  const normalized = normalizeForEvaluation(answer);
  const missingGrammarTargets = topic.usefulStructures.filter((target) => {
    if (target === 'present-perfect') return !/\b(?:have|has)\s+(?:been|\w+(?:ed|en))\b/.test(normalized);
    if (target === 'past-simple') return !/\b(?:was|were|did|went|came|had|made|told|said|\w+ed)\b/.test(normalized);
    if (target === 'questions') return !/\?/.test(answer);
    if (target === 'negation') return !/\b(?:not|never|no|cannot|can't|don't|doesn't|didn't)\b/.test(normalized);
    return false;
  });
  const structureErrors = new Set<WritingFeedbackCategory>(['GRAMMAR', 'WORD_ORDER', 'TENSE', 'SUBJECT_VERB_AGREEMENT', 'ARTICLE', 'PREPOSITION', 'PRONOUN', 'PLURAL', 'SENTENCE_STRUCTURE']);
  const grammarTargetMet = missingGrammarTargets.length === 0 && !issues.some((item) => structureErrors.has(item.category) && item.severity !== 'info');
  const vocabularyUsed = topic.usefulVocabulary.some((value) => normalized.includes(normalizeForEvaluation(value)));
  const vocabularyErrors = issues.some((item) => ['VOCABULARY', 'COLLOCATION', 'WORD_FORM'].includes(item.category));
  const vocabularyTargetMet = !vocabularyErrors && (vocabularyUsed || meaningPreserved);
  return {
    meaningPreserved,
    grammarTargetMet,
    vocabularyTargetMet,
    missingGrammarTargets,
    missingVocabularyTargets: vocabularyTargetMet ? [] : topic.usefulVocabulary.slice(0, 3),
  };
}

function specializedFeedback(topic: WritingPracticeTopic, ideas: WritingIdeaEvaluation[], issues: WritingFeedbackIssue[]): WritingSpecializedFeedback {
  const missingStages = topic.requiredIdeas
    .filter((_, index) => ideas[index]?.status !== 'covered')
    .map((idea) => idea.arcStage)
    .filter((stage): stage is NonNullable<typeof stage> => Boolean(stage));
  const hasTenseIssue = issues.some((item) => item.category === 'TENSE');
  const hasConnectorIssue = issues.some((item) => item.category === 'CONNECTOR');
  const sequenceStages = new Set(topic.requiredIdeas.map((item) => item.arcStage));
  const structureComplete = missingStages.length === 0;
  const story = topic.writingType === 'story';
  return {
    kind: topic.writingType,
    sequence: story && sequenceStages.size > 1 ? (structureComplete ? 'good' : 'needs-work') : 'not-assessed',
    tenseConsistency: hasTenseIssue ? 'needs-work' : 'good',
    connectors: hasConnectorIssue ? 'needs-work' : 'good',
    structureCompleteness: structureComplete ? 'good' : 'needs-work',
    missingStages: [...new Set(missingStages)],
    messageVietnamese: structureComplete
      ? story ? 'Trình tự sự việc và các mốc chính đã được giữ.' : 'Đoạn viết đã có đủ các phần của vấn đề và cách xử lý.'
      : story ? 'Hãy bổ sung sự kiện còn thiếu để mạch kể đầy đủ.' : 'Hãy bổ sung phần còn thiếu trong mạch vấn đề → xử lý → kết quả.',
  };
}

function dimension(score: number, labelVietnamese: string): WritingQualityDimension {
  return { score, status: score >= 85 ? 'good' : 'needs-work', labelVietnamese };
}

function tokenize(value: string): string[] {
  return value.match(/\p{L}+(?:['’]\p{L}+)?|\d+|[^\s\p{L}\d]/gu) ?? [];
}

export function wordAwareDiff(original: string, corrected: string): WritingDiffSegment[] {
  const left = tokenize(original);
  const right = tokenize(corrected);
  const matrix = Array.from({ length: left.length + 1 }, () => Array<number>(right.length + 1).fill(0));
  for (let i = left.length - 1; i >= 0; i -= 1) {
    for (let j = right.length - 1; j >= 0; j -= 1) {
      matrix[i]![j] = left[i]?.toLocaleLowerCase('en') === right[j]?.toLocaleLowerCase('en')
        ? 1 + matrix[i + 1]![j + 1]!
        : Math.max(matrix[i + 1]![j]!, matrix[i]![j + 1]!);
    }
  }
  const raw: WritingDiffSegment[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    if (i < left.length && j < right.length && left[i]?.toLocaleLowerCase('en') === right[j]?.toLocaleLowerCase('en')) {
      raw.push({ operation: 'equal', original: left[i], corrected: right[j] }); i += 1; j += 1;
    } else if (j < right.length && (i >= left.length || matrix[i]![j + 1]! >= matrix[i + 1]![j]!)) {
      raw.push({ operation: 'insert', corrected: right[j] }); j += 1;
    } else {
      raw.push({ operation: 'delete', original: left[i] }); i += 1;
    }
  }
  const combined: WritingDiffSegment[] = [];
  for (const segment of raw) {
    const previous = combined.at(-1);
    if (previous?.operation === 'delete' && segment.operation === 'insert') {
      previous.operation = 'replace'; previous.corrected = segment.corrected; continue;
    }
    if (previous?.operation === 'insert' && segment.operation === 'delete') {
      previous.operation = 'replace'; previous.original = segment.original; continue;
    }
    if (previous && previous.operation === segment.operation && segment.operation !== 'equal') {
      if (segment.original) previous.original = [previous.original, segment.original].filter(Boolean).join(' ');
      if (segment.corrected) previous.corrected = [previous.corrected, segment.corrected].filter(Boolean).join(' ');
      continue;
    }
    combined.push({ ...segment });
  }
  return combined;
}

export interface WritingFeedbackAnalysis {
  qualityBand: WritingQualityBand;
  dimensions: NonNullable<WritingEvaluation['dimensions']>;
  feedbackIssues: WritingFeedbackIssue[];
  targetAchievement: WritingTargetAchievement;
  correctedAnswer: string;
  diff: WritingDiffSegment[];
  specializedFeedback: WritingSpecializedFeedback;
  practicedSkills: WritingMasterySkill[];
}

export function analyzeWritingFeedback(
  answer: string,
  topic: WritingPracticeTopic,
  ideas: WritingIdeaEvaluation[],
  facts: WritingFactEvaluation[],
  previousLanguageIssues: Mistake[],
): WritingFeedbackAnalysis {
  const ruleResults = languageRules(answer);
  let correctedAnswer = answer.trim();
  for (const rule of ruleResults) correctedAnswer = rule.apply(correctedAnswer);
  const directRuleIssues = ruleResults.map((item) => item.issue);
  const directCategories = new Set(directRuleIssues.map((item) => item.category));
  const allIssues = [
    ...directRuleIssues,
    ...legacyIssues(previousLanguageIssues).filter((item) => !directCategories.has(item.category)),
    ...meaningIssues(ideas, facts),
    ...detectExtraMeaning(answer, topic),
  ].filter((item, index, list) => list.findIndex((other) => other.category === item.category && other.location === item.location) === index);
  const connectorPattern = /\b(?:first|firstly|then|next|later|after that|finally|in the end|because|so|therefore|however|although)\b/i;
  if ((topic.level === 'B1' || topic.level === 'B2') && topic.requiredIdeas.length >= 4 &&
    answer.split(/[.!?]+/).filter((part) => part.trim()).length >= 2 && !connectorPattern.test(answer)) {
    allIssues.push(issue('CONNECTOR', 'naturalness', 'Các ý đã có nhưng cần một từ nối phù hợp để mạch đoạn rõ hơn. Bạn có thể dùng nhiều lựa chọn khác nhau, không bắt buộc một từ cố định.', {
      location: 'giữa các câu', grammarTarget: 'cohesive-devices',
    }));
  }
  const meaningPreserved = ideas.every((item) => item.status !== 'contradicted') &&
    facts.every((item) => item.status !== 'contradicted') &&
    ideas.reduce((sum, item) => sum + item.score, 0) / Math.max(1, ideas.length) >= 0.8;
  const targets = targetAchievement(answer, topic, meaningPreserved, allIssues);
  if (!targets.grammarTargetMet && targets.missingGrammarTargets.length) {
    allIssues.push(issue('GRAMMAR', 'structure', `Bạn truyền tải đúng ý, nhưng bài này đang luyện ${targets.missingGrammarTargets.join(', ')}.`, {
      grammarTarget: targets.missingGrammarTargets[0],
      location: 'cấu trúc mục tiêu',
      hints: ['Bạn chưa dùng cấu trúc ngữ pháp mục tiêu.', `Bài này đang luyện ${targets.missingGrammarTargets.join(', ')}.`, 'Thử viết lại bằng cấu trúc mục tiêu nhưng giữ nguyên nghĩa.'],
    }));
  }
  const meaningErrors = allIssues.filter((item) => item.layer === 'meaning' && item.category !== 'EXTRA_MEANING');
  const structural = allIssues.filter((item) => item.layer === 'structure' && item.severity !== 'info');
  const vocabulary = allIssues.filter((item) => ['VOCABULARY', 'COLLOCATION', 'WORD_FORM'].includes(item.category));
  const naturalness = allIssues.filter((item) => item.layer === 'naturalness');
  const completelyIncorrect = ideas.every((item) => item.status === 'missing') && normalizeForEvaluation(answer).split(' ').length < 5;
  const qualityBand: WritingQualityBand = completelyIncorrect
    ? 'incorrect'
    : ideas.some((item) => item.status === 'contradicted') || facts.some((item) => item.status === 'contradicted')
      ? 'meaning-changed'
      : !meaningPreserved || structural.length > 0
        ? 'understandable-needs-improvement'
        : naturalness.length || vocabulary.length || allIssues.some((item) => item.severity === 'info')
          ? 'correct-less-natural'
          : 'correct-natural';
  const meaningScore = Math.round(ideas.reduce((sum, item) => sum + item.score, 0) / Math.max(1, ideas.length) * 100);
  const dimensions = {
    meaning: dimension(Math.max(0, meaningScore - meaningErrors.length * 8), 'Ý nghĩa'),
    grammar: dimension(Math.max(0, 100 - structural.length * 24), 'Ngữ pháp'),
    vocabulary: dimension(Math.max(0, 100 - vocabulary.length * 24), 'Từ vựng'),
    naturalness: dimension(Math.max(0, 100 - naturalness.length * 20 - allIssues.filter((item) => item.severity === 'info').length * 5), 'Độ tự nhiên'),
  };
  return {
    qualityBand,
    dimensions,
    feedbackIssues: allIssues,
    targetAchievement: targets,
    correctedAnswer,
    diff: wordAwareDiff(answer, correctedAnswer),
    specializedFeedback: specializedFeedback(topic, ideas, allIssues),
    practicedSkills: masterySkillsForEvaluation({ feedbackIssues: allIssues }, topic),
  };
}
