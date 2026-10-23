export type Difficulty = 'A1' | 'A2' | 'B1' | 'B2';
export type Speaker = 'A' | 'B';
export type LearningRole = Speaker;
export type CommunicativeIntent =
  | 'greeting'
  | 'introducing'
  | 'asking-information'
  | 'clarifying'
  | 'confirming'
  | 'requesting'
  | 'suggesting'
  | 'inviting'
  | 'accepting'
  | 'refusing'
  | 'negotiating'
  | 'apologizing'
  | 'complaining'
  | 'explaining'
  | 'reporting'
  | 'troubleshooting'
  | 'comparing'
  | 'persuading'
  | 'giving-advice'
  | 'giving-instructions'
  | 'expressing-concern'
  | 'reassuring'
  | 'disagreeing-politely'
  | 'handling-misunderstanding'
  | 'asking-follow-up'
  | 'changing-plans'
  | 'resolving-conflict'
  | 'summarizing'
  | 'making-decisions'
  | 'planning'
  | 'polite-offers'
  | 'giving-feedback';
export type ConversationRelationship =
  | 'close-friend'
  | 'partner'
  | 'family'
  | 'coworker'
  | 'manager'
  | 'client'
  | 'customer'
  | 'service-staff'
  | 'stranger'
  | 'teacher'
  | 'student'
  | 'doctor'
  | 'patient'
  | 'tenant'
  | 'landlord'
  | 'resident'
  | 'building-security'
  | 'technician'
  | 'delivery-staff'
  | 'employee'
  | 'stakeholder'
  | 'hr'
  | 'senior-colleague'
  | 'junior-colleague'
  | 'receptionist'
  | 'pharmacist'
  | 'bank-staff'
  | 'merchant'
  | 'advisor'
  | 'support-staff'
  | 'hotel-staff'
  | 'airline-staff'
  | 'immigration-officer'
  | 'postal-staff'
  | 'stylist'
  | 'council-staff'
  | 'neighbor'
  | 'volunteer'
  | 'security-staff';
export type MistakeType =
  | 'grammar'
  | 'vocabulary'
  | 'spelling'
  | 'tense'
  | 'article'
  | 'preposition'
  | 'word-order'
  | 'singular-plural'
  | 'subject-verb-agreement'
  | 'pronoun'
  | 'auxiliary'
  | 'modal'
  | 'collocation'
  | 'unnatural-expression'
  | 'missing-word'
  | 'unnecessary-word';

export interface VocabularyItem {
  word: string;
  ipa?: string;
  meaning: string;
  example: string;
  exampleVi?: string;
}

export type VocabularyType =
  | 'word'
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'phrasal-verb'
  | 'idiom'
  | 'phrase'
  | 'expression'
  | 'collocation';

export interface VocabularyMeaning {
  id: string;
  partOfSpeech?: string;
  meaning: string;
  explanationVietnamese?: string;
}

export interface VocabularyExample {
  id: string;
  english: string;
  vietnamese: string;
  context?: string;
  sourceTopicId?: string;
  sourceConversationId?: string;
  sourceReferences?: VocabularySourceReference[];
}

export interface VocabularySourceReference {
  provider: string;
  url: string;
  license?: string;
  retrievedAt: string;
}

export interface VocabularyEntry {
  id: string;
  term: string;
  normalizedTerm: string;
  type: VocabularyType;
  partOfSpeech?: string;
  ipa?: string;
  meanings: VocabularyMeaning[];
  definitionEnglish?: string;
  explanationVietnamese?: string;
  collocations: string[];
  phrases: string[];
  wordFamily: string[];
  synonyms: string[];
  antonyms: string[];
  examples: VocabularyExample[];
  cefr?: Difficulty;
  tags: string[];
  sourceTopicIds: string[];
  custom?: boolean;
  sourceReferences?: VocabularySourceReference[];
  lookupUpdatedAt?: string;
}

export interface VocabularySummary {
  id: string;
  term: string;
  normalizedTerm: string;
  shortMeaning: string;
  cefr?: Difficulty;
  type: VocabularyType;
  partOfSpeech?: string;
  tags: string[];
  practiceCount: number;
  shard: number;
}

export interface VocabularyPracticeItem {
  id: string;
  vocabularyId: string;
  senseId?: string;
  vietnamese: string;
  canonicalAnswer: string;
  acceptedAnswers: string[];
  naturalAlternatives: string[];
  targetExpressions: string[];
  grammarFocus: string[];
  hint?: string;
  explanation?: string;
  context?: string;
  level: Difficulty;
  sourceTopicId?: string;
  sourceConversationId?: string;
  semanticConstraints?: SemanticConstraints;
  commonMistakes?: CommonMistake[];
  custom?: boolean;
  generated?: boolean;
  edited?: boolean;
  sourceReferences?: VocabularySourceReference[];
}

export interface CommonMistake {
  pattern: string;
  type: MistakeType;
  correction: string;
  explanation: string;
}

export type AnswerPolarity = 'positive' | 'negative' | 'question';

export interface SemanticConstraints {
  intent?: string;
  requiredConcepts?: string[][];
  forbiddenConcepts?: string[];
  tenseExpectation?:
    | 'present-simple-question'
    | 'past-simple'
    | 'past-simple-question'
    | 'present-perfect'
    | 'present-perfect-duration'
    | 'first-conditional'
    | 'third-conditional';
  polarity?: AnswerPolarity;
  criticalValues?: string[][];
  criticalTokens?: string[][];
}

export interface ConversationTurn {
  id: string;
  speaker: Speaker;
  vietnamese: string;
  canonicalAnswer: string;
  acceptedAnswers: string[];
  naturalAlternatives: string[];
  requiredKeywords?: string[];
  optionalKeywords?: string[];
  grammarPoints?: string[];
  vocabulary?: VocabularyItem[];
  commonMistakes?: CommonMistake[];
  explanation?: string;
  hint?: string;
  semanticConstraints?: SemanticConstraints;
  acceptedAnswerAudit?: {
    batch: 'D0';
    status: 'expanded' | 'justified-fixed' | 'already-flexible';
    reason: string;
    baselineCanonicalOnly?: boolean;
  };
  difficulty: Difficulty;
}

export interface Conversation {
  id: string;
  title: string;
  titleVi: string;
  situation: string;
  goal: string;
  intent?: CommunicativeIntent;
  relationship?: ConversationRelationship;
  partner: { name: string; avatar: string };
  turns: ConversationTurn[];
}

export interface Topic {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  category: string;
  icon: string;
  level: Difficulty;
  grammar: string[];
  vocabularyTags: string[];
  prerequisite?: string;
  conversations: Conversation[];
}

export interface TopicManifestItem extends Omit<Topic, 'conversations'> {
  conversationCount: number;
}

export interface Mistake {
  type: MistakeType;
  original: string;
  correction: string;
  explanation: string;
}

export type EvaluationStatus = 'correct' | 'acceptable' | 'almost-correct' | 'incorrect';

export interface EvaluationResult {
  status: EvaluationStatus;
  score: number;
  userAnswer: string;
  canonicalAnswer: string;
  matchedAnswer?: string;
  mistakes: Mistake[];
  explanation: string[];
  suggestions: string[];
  naturalAlternatives: string[];
  revealCanonical?: boolean;
  matchedBy?: 'canonical' | 'accepted' | 'semantic' | 'similarity';
}

export interface MistakeRecord {
  id: string;
  turnId: string;
  topicId: string;
  conversationId: string;
  role?: LearningRole;
  vietnamese: string;
  userAnswer: string;
  canonicalAnswer: string;
  types: MistakeType[];
  createdAt: string;
  reviewCount: number;
  nextReviewAt?: string;
  vocabularyId?: string;
}

export type Mastery = 'new' | 'learning' | 'familiar' | 'strong' | 'mastered';
export interface VocabularyProgress {
  id: string;
  sourceTopic: string;
  timesSeen: number;
  timesCorrect: number;
  practiceCount?: number;
  firstTryCorrectCount?: number;
  targetUsageCorrectCount?: number;
  incorrectCount?: number;
  consecutiveCorrect?: number;
  lastPracticedAt?: string;
  nextReviewAt?: string;
  mastery: Mastery;
  favorite: boolean;
  /** Legacy V1–V6 fields; migration removes these from static entries. */
  word?: string;
  meaning?: string;
  ipa?: string;
  example?: string;
  exampleVi?: string;
}

export interface SentenceProgress {
  attempts: number;
  correct: number;
  incorrectCount?: number;
  firstTryCorrect?: number;
  lastSeenAt: string;
  lastCorrectAt?: string;
  consecutiveCorrect?: number;
  mastery?: Mastery;
  nextReviewAt?: string;
}

export interface ConversationRoleProgress {
  completedAt?: string;
  attempts: number;
  accuracy?: number;
  xpEarned?: number;
}

export interface ConversationProgress {
  conversationId: string;
  topicId: string;
  roles: Record<LearningRole, ConversationRoleProgress>;
}

export type WritingDomain = 'daily-life' | 'it-work';
export type WritingEvaluationStatus =
  | 'communicates-well'
  | 'mostly-correct'
  | 'needs-improvement';

export type WritingFeedbackCategory =
  | 'GRAMMAR'
  | 'VOCABULARY'
  | 'WORD_ORDER'
  | 'TENSE'
  | 'SUBJECT_VERB_AGREEMENT'
  | 'ARTICLE'
  | 'PREPOSITION'
  | 'PRONOUN'
  | 'PLURAL'
  | 'SPELLING'
  | 'PUNCTUATION'
  | 'CAPITALIZATION'
  | 'MISSING_IDEA'
  | 'EXTRA_MEANING'
  | 'WRONG_MEANING'
  | 'UNNATURAL_EXPRESSION'
  | 'COLLOCATION'
  | 'WORD_FORM'
  | 'CONNECTOR'
  | 'SENTENCE_STRUCTURE';

export type WritingFeedbackLayer = 'normalization' | 'structure' | 'meaning' | 'naturalness';
export type WritingQualityBand =
  | 'correct-natural'
  | 'correct-less-natural'
  | 'understandable-needs-improvement'
  | 'meaning-changed'
  | 'incorrect';
export type WritingQualityDimensionStatus = 'good' | 'needs-work' | 'not-assessed';

export interface WritingFeedbackIssue {
  id: string;
  category: WritingFeedbackCategory;
  layer: WritingFeedbackLayer;
  severity: 'info' | 'warning' | 'error';
  original?: string;
  correction?: string;
  location?: string;
  explanationVietnamese: string;
  /** Progressive disclosure: error type, location, then the applicable rule. */
  hints: [string, string, string];
  grammarTarget?: string;
  vocabularyTerm?: string;
}

export interface WritingQualityDimension {
  status: WritingQualityDimensionStatus;
  score: number;
  labelVietnamese: string;
}

export interface WritingTargetAchievement {
  meaningPreserved: boolean;
  grammarTargetMet: boolean;
  vocabularyTargetMet: boolean;
  missingGrammarTargets: string[];
  missingVocabularyTargets: string[];
}

export interface WritingDiffSegment {
  operation: 'equal' | 'insert' | 'delete' | 'replace';
  original?: string;
  corrected?: string;
}

export interface WritingSpecializedFeedback {
  kind: WritingContentType;
  sequence: 'good' | 'needs-work' | 'not-assessed';
  tenseConsistency: 'good' | 'needs-work' | 'not-assessed';
  connectors: 'good' | 'needs-work' | 'not-assessed';
  structureCompleteness: 'good' | 'needs-work';
  missingStages: WritingArcStage[];
  messageVietnamese: string;
}

export type WritingMasterySkill =
  | 'subject-be'
  | 'present-simple'
  | 'negation'
  | 'question-formation'
  | 'past-narration'
  | 'time-expressions'
  | 'connectors'
  | 'word-order'
  | 'collocations'
  | 'sentence-expansion'
  | 'story-sequencing'
  | 'problem-solution-writing'
  | 'workplace-writing'
  | 'it-communication'
  | 'paraphrasing'
  | 'natural-expression';

export interface WritingSkillProgress {
  skill: WritingMasterySkill;
  attempts: number;
  correct: number;
  almostCorrect: number;
  incorrect: number;
  recentAccuracy: number;
  masteryScore: number;
  lastPracticedAt: string;
  reviewDueAt: string;
  recentResults: Array<'correct' | 'almost-correct' | 'incorrect'>;
}

export type WritingReviewMode = 'exact-retry' | 'variant-retry' | 'skill-retry';

export type WritingIdeaStatus = 'covered' | 'partial' | 'missing' | 'contradicted';
export type WritingIdeaKind =
  | 'cause-explanation'
  | 'time-details'
  | 'action'
  | 'outcome'
  | 'future-plan'
  | 'polite-request';

export type WritingContentType = 'story' | 'problem-explanation';

export type WritingSkill =
  | 'describe-situation'
  | 'sequence-events'
  | 'explain-reason'
  | 'explain-cause-result'
  | 'report-problem'
  | 'explain-action-taken'
  | 'explain-result'
  | 'explain-next-step'
  | 'apologize-explain'
  | 'request-change-plan'
  | 'summarize-event'
  | 'explain-technical-issue'
  | 'explain-blocker'
  | 'explain-risk'
  | 'explain-tradeoff'
  | 'incident-update';

export type WritingPathPreference = 'all' | WritingDomain;

export interface WritingLearningMetadata {
  topicId: string;
  unitId: string;
  /** One-based order inside the main unit. */
  order: number;
  skills: WritingSkill[];
  prerequisites?: string[];
  /** Deterministic 0–100 content difficulty, never an AI-generated estimate. */
  difficultyScore: number;
}

export interface WritingLearningUnit {
  id: string;
  order: number;
  level: Difficulty;
  title: string;
  titleVietnamese: string;
  goal: string;
  targetSkills: WritingSkill[];
  vocabularyFocus: string[];
  targetStructures: string[];
  prerequisiteUnitId?: string;
}

export type WritingArcStage =
  | 'context'
  | 'event'
  | 'problem'
  | 'cause'
  | 'impact'
  | 'action'
  | 'result'
  | 'reflection'
  | 'next-step';

export interface WritingRequiredIdea {
  id: string;
  labelVietnamese: string;
  /** Alternative English ways to communicate the same idea. */
  concepts: string[];
  /** Optional reusable pattern IDs from the deterministic semantic library. */
  semanticPatterns?: string[];
  /** Helpful details which may earn partial credit but are not sufficient alone. */
  supportingConcepts?: string[];
  /** Meaning-bearing details whose reversal contradicts the idea. */
  criticalConcepts?: string[];
  /** Explicit opposite expressions for context-specific contradictions. */
  contradictions?: string[];
  kind?: WritingIdeaKind;
  /** The idea's role in the topic's story/problem progression. */
  arcStage?: WritingArcStage;
  weight?: number;
}

export interface WritingCriticalFact {
  id: string;
  labelVietnamese: string;
  type: 'number' | 'time' | 'polarity' | 'person' | 'location' | 'state' | 'sequence' | 'cause-result';
  expected: string[];
  forbidden?: string[];
  /** Optional anchors keep polarity/value checks scoped to the relevant clause. */
  anchors?: string[];
  cause?: string[];
  result?: string[];
}

export interface WritingHint {
  level: 1 | 2 | 3;
  title: string;
  content: string[];
}

export interface WritingPracticeTopic {
  id: string;
  titleEnglish: string;
  titleVietnamese: string;
  category: string;
  domain: WritingDomain;
  level: Difficulty;
  writingType: WritingContentType;
  context: string;
  /** Complete Vietnamese content the learner rewrites in English. Context is not scored. */
  vietnameseSourceText: string;
  requiredIdeas: WritingRequiredIdea[];
  criticalFacts: WritingCriticalFact[];
  usefulVocabulary: string[];
  usefulStructures: string[];
  sampleAnswers: string[];
  hints: WritingHint[];
  commonMistakes: CommonMistake[];
  expectedWordRange: [number, number];
  sourceTopicId?: string;
}

export interface WritingTopicSummary {
  id: string;
  titleEnglish: string;
  titleVietnamese: string;
  category: string;
  domain: WritingDomain;
  level: Difficulty;
  writingType: WritingContentType;
  keywords: string[];
  shard: number;
}

export interface WritingIdeaEvaluation {
  id: string;
  labelVietnamese: string;
  status: WritingIdeaStatus;
  score: number;
  kind: WritingIdeaKind;
  message?: string;
  /** Backward-compatible summary used by existing progress/UI code. */
  communicated: boolean;
}

export interface WritingFactEvaluation {
  id: string;
  labelVietnamese: string;
  correct: boolean;
  status: 'correct' | 'missing' | 'contradicted';
  message?: string;
}

export interface WritingEvaluation {
  status: WritingEvaluationStatus;
  communicationScore: number;
  meaningCoverage: number;
  communicatedIdeas: number;
  totalIdeas: number;
  ideas: WritingIdeaEvaluation[];
  facts: WritingFactEvaluation[];
  languageIssues: Mistake[];
  userAnswer: string;
  betterVersion: string;
  otherNaturalWay?: string;
  qualityBand?: WritingQualityBand;
  dimensions?: {
    meaning: WritingQualityDimension;
    grammar: WritingQualityDimension;
    vocabulary: WritingQualityDimension;
    naturalness: WritingQualityDimension;
  };
  feedbackIssues?: WritingFeedbackIssue[];
  targetAchievement?: WritingTargetAchievement;
  correctedAnswer?: string;
  diff?: WritingDiffSegment[];
  specializedFeedback?: WritingSpecializedFeedback;
  practicedSkills?: WritingMasterySkill[];
}

export interface WritingAttempt {
  id: string;
  answer: string;
  status: WritingEvaluationStatus;
  communicationScore: number;
  meaningCoverage: number;
  missingIdeaIds: string[];
  contradictedIdeaIds: string[];
  missingIdeaKinds: WritingIdeaKind[];
  criticalErrorIds: string[];
  languageIssueTypes: MistakeType[];
  feedbackCategories?: WritingFeedbackCategory[];
  practicedSkills?: WritingMasterySkill[];
  qualityBand?: WritingQualityBand;
  createdAt: string;
}

export interface WritingTopicProgress {
  topicId: string;
  attempts: WritingAttempt[];
  bestAttempt?: WritingAttempt;
  successfulCount: number;
  consecutiveCorrect: number;
  lastPracticedAt: string;
  nextReviewAt: string;
  mastery: Mastery;
  favorite: boolean;
  weaknessCounts: Partial<Record<WritingIdeaKind, number>>;
  lastSuccessfulAt?: string;
  recommendedReviewMode?: WritingReviewMode;
}

export interface WritingPedagogicalFingerprint {
  stableId: string;
  unitId: string;
  cefr: Difficulty;
  writingSkill: WritingSkill[];
  writingGoal: string;
  grammarTargets: string[];
  vocabularyFocus: string[];
  sentencePatterns: string[];
  communicationFunction: string;
  contextType: string;
  cognitiveLevel: 'recall' | 'apply' | 'organize' | 'analyze' | 'evaluate';
  difficulty: number;
  criticalFacts: WritingCriticalFact[];
  requiredIdeas: WritingRequiredIdea[];
  optionalIdeas: string[];
  acceptableVariations: string[];
  commonMistakes: CommonMistake[];
  reasoningPattern: string;
  writingPattern: string;
  grammarPattern: string;
  contextPattern: string;
  semanticPattern: string;
  masterySkills: WritingMasterySkill[];
}

export type DailyLearningMode = 'quick' | 'standard' | 'focus';
export type DailyLearningFocus = 'balanced' | 'conversation' | 'vocabulary' | 'writing';
export type DailyLearningItemKind = 'conversation' | 'vocabulary' | 'writing' | 'review';
export type DailyLearningTarget = 'conversation' | 'vocabulary' | 'writing';
export type DailyLearningReason =
  | 'due-review'
  | 'repeated-mistake'
  | 'weak-mastery'
  | 'weak-skill'
  | 'missing-role'
  | 'in-progress'
  | 'new-content'
  | 'variety';
export type DailyLearningItemStatus = 'pending' | 'completed' | 'skipped';
export type DailyLearningSessionStatus = 'not-started' | 'in-progress' | 'completed';

export interface DailyLearningPreferences {
  mode: DailyLearningMode;
  focus: DailyLearningFocus;
}

/** Stores references and activity results only; static learning content remains in its repository. */
export interface DailyLearningItem {
  id: string;
  kind: DailyLearningItemKind;
  target: DailyLearningTarget;
  reason: DailyLearningReason;
  status: DailyLearningItemStatus;
  mandatory: boolean;
  priority: number;
  topicId?: string;
  conversationId?: string;
  role?: LearningRole;
  vocabularyId?: string;
  writingTopicId?: string;
  completedAt?: string;
  skippedAt?: string;
  result?: {
    firstTryCorrect?: boolean;
    writingStatus?: WritingEvaluationStatus;
    vocabularyMastered?: boolean;
    weaknessTypes?: string[];
  };
}

export interface DailyLearningSession {
  id: string;
  date: string;
  estimatedMinutes: number;
  mode: DailyLearningMode;
  focus: DailyLearningFocus;
  status: DailyLearningSessionStatus;
  items: DailyLearningItem[];
  currentItemId?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  xpAtStart: number;
  streakAwarded: boolean;
}

export interface DailyLearningHistoryEntry {
  date: string;
  status: DailyLearningSessionStatus;
  planned: number;
  completed: number;
  xpEarned: number;
  counts: Record<DailyLearningItemKind, number>;
  firstTryCorrect: number;
  firstTryTotal: number;
  focusAreas: string[];
  recentItemKeys: string[];
}

export interface UserProgress {
  version: number;
  xp: number;
  todayXp: number;
  activityDate: string;
  streak: number;
  currentLevel: Difficulty;
  completedTopics: string[];
  completedLessons: string[];
  conversationProgress: Record<string, ConversationProgress>;
  sentenceProgress: Record<string, SentenceProgress>;
  mistakes: MistakeRecord[];
  vocabulary: VocabularyProgress[];
  customVocabulary: VocabularyEntry[];
  customVocabularyPractice: VocabularyPracticeItem[];
  disabledVocabularyPracticeIds: string[];
  writingProgress: Record<string, WritingTopicProgress>;
  writingDrafts: Record<string, string>;
  writingPathPreference: WritingPathPreference;
  writingCurrentUnitId?: string;
  writingSkillProgress: Partial<Record<WritingMasterySkill, WritingSkillProgress>>;
  itEnglishProgress: Record<string, ITEnglishProgress>;
  achievements: string[];
  favorites: string[];
  dailyGoal: number;
  dailyLearningPreferences: DailyLearningPreferences;
  dailyLearningSession?: DailyLearningSession;
  dailyLearningHistory: DailyLearningHistoryEntry[];
  settings: UserSettings;
}

export type ITEnglishMode = 'speaking' | 'writing';

export interface ITEnglishAttemptResult {
  passed: boolean;
  similarity: number;
  coverage: number;
  feedback: string;
  corrections: string[];
}

export interface ITEnglishSentenceProgress {
  passed: boolean;
  revealedAfterLimit?: boolean;
  attemptCount: number;
  latestMode: ITEnglishMode;
  latestResult: string;
  latestSimilarity: number;
  bestSimilarity: number;
  updatedAt: string;
  completedAt?: string;
}

export interface ITEnglishProgress {
  sentences: Record<string, ITEnglishSentenceProgress>;
}

export interface UserSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  showDifficulty: boolean;
  explanationLanguage: 'vi' | 'bilingual' | 'en';
}

export interface LessonStats {
  total: number;
  correctFirstTry: number;
  grammarMistakes: number;
  vocabularyMistakes: number;
  scoreTotal: number;
  xpEarned: number;
  wordsLearned: number;
}
