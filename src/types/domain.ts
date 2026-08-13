export type Difficulty = 'A1' | 'A2' | 'B1' | 'B2';
export type Speaker = 'A' | 'B';
export type LearningRole = Speaker;
export type CommunicativeIntent =
  | 'greeting' | 'introducing' | 'asking-information' | 'clarifying' | 'confirming'
  | 'requesting' | 'suggesting' | 'inviting' | 'accepting' | 'refusing'
  | 'negotiating' | 'apologizing' | 'complaining' | 'explaining' | 'reporting'
  | 'troubleshooting' | 'comparing' | 'persuading' | 'giving-advice'
  | 'giving-instructions' | 'expressing-concern' | 'reassuring'
  | 'disagreeing-politely' | 'handling-misunderstanding' | 'asking-follow-up'
  | 'changing-plans' | 'resolving-conflict' | 'summarizing' | 'making-decisions'
  | 'planning' | 'polite-offers' | 'giving-feedback';
export type ConversationRelationship =
  | 'close-friend' | 'partner' | 'family' | 'coworker' | 'manager' | 'client'
  | 'customer' | 'service-staff' | 'stranger' | 'teacher' | 'student'
  | 'doctor' | 'patient' | 'tenant' | 'landlord' | 'resident' | 'building-security'
  | 'technician' | 'delivery-staff' | 'employee' | 'stakeholder' | 'hr'
  | 'senior-colleague' | 'junior-colleague' | 'receptionist' | 'pharmacist'
  | 'bank-staff' | 'merchant' | 'advisor' | 'support-staff' | 'hotel-staff'
  | 'airline-staff' | 'immigration-officer' | 'postal-staff' | 'stylist'
  | 'council-staff' | 'neighbor' | 'volunteer' | 'security-staff';
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
  tenseExpectation?: 'present-simple-question' | 'past-simple' | 'past-simple-question' | 'present-perfect' | 'present-perfect-duration' | 'first-conditional' | 'third-conditional';
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
}

export type Mastery = 'new' | 'learning' | 'familiar' | 'strong' | 'mastered';
export interface VocabularyProgress extends VocabularyItem {
  id: string;
  sourceTopic: string;
  timesSeen: number;
  timesCorrect: number;
  mastery: Mastery;
  favorite: boolean;
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
