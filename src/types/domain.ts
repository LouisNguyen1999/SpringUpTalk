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
  achievements: string[];
  favorites: string[];
  dailyGoal: number;
  settings: UserSettings;
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
