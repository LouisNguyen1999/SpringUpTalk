import type { CommonMistake, Conversation, ConversationTurn, Difficulty, SemanticConstraints, Topic, VocabularyItem } from '../types/domain';

export interface LineMeta {
  accepted?: string[];
  alternatives?: string[];
  keywords?: string[];
  grammar?: string[];
  vocabulary?: VocabularyItem[];
  mistakes?: CommonMistake[];
  explanation?: string;
  hint?: string;
  semanticConstraints?: SemanticConstraints;
}

export type Line = readonly [speaker: 'A' | 'B', vietnamese: string, english: string, meta?: LineMeta];

const commonRules: CommonMistake[] = [
  {
    pattern: '^how you ',
    type: 'auxiliary',
    correction: 'How do you ...?',
    explanation: 'Câu hỏi Present Simple với “you” cần trợ động từ “do”.',
  },
  {
    pattern: '\\byesterday\\b.*\\b(go|come|eat|see)\\b|\\b(go|come|eat|see)\\b.*\\byesterday\\b',
    type: 'tense',
    correction: 'Dùng động từ ở Past Simple.',
    explanation: '“Yesterday” là dấu hiệu của Past Simple, vì vậy động từ cần ở dạng quá khứ.',
  },
  {
    pattern: '\\bi very like\\b',
    type: 'word-order',
    correction: 'I really like ...',
    explanation: 'Không đặt “very” trước động từ “like”; dùng “really like” hoặc “like ... very much”.',
  },
];

function keywords(answer: string): string[] {
  const ignored = new Set(['a', 'an', 'the', 'i', 'you', 'we', 'it', 'is', 'are', 'to', 'do', 'of', 'this', 'that', 'what', 'when', 'where', 'how', 'some']);
  return answer
    .toLowerCase()
    .replace(/[^a-z' ]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !ignored.has(word))
    .slice(0, 2);
}

function makeTurn(seed: TopicSeed, conversationIndex: number, index: number, line: Line): ConversationTurn {
  const [speaker, vietnamese, english, meta] = line;
  const requiredKeywords = meta?.keywords ?? keywords(english);
  return {
    id: `${seed.id}-c${conversationIndex + 1}-t${index + 1}`,
    speaker,
    vietnamese,
    canonicalAnswer: english,
    acceptedAnswers: Array.from(new Set([english, ...(meta?.accepted ?? [])])),
    naturalAlternatives: meta?.alternatives ?? [],
    requiredKeywords,
    grammarPoints: meta?.grammar ?? seed.grammar ?? (seed.level === 'A1' ? ['present-simple'] : seed.level === 'A2' ? ['everyday-communication'] : ['natural-conversation']),
    vocabulary: meta?.vocabulary,
    commonMistakes: [...commonRules, ...(meta?.mistakes ?? [])],
    explanation: meta?.explanation ?? seed.defaultExplanation ?? 'Câu mẫu ưu tiên cách diễn đạt tự nhiên, đúng ngữ cảnh hội thoại và đúng thì.',
    hint: meta?.hint ?? (requiredKeywords.join(' / ') || 'Cụm đáp lời ngắn theo ngữ cảnh'),
    semanticConstraints: meta?.semanticConstraints,
    difficulty: seed.level,
  };
}

export interface ConversationSeed {
  title: string;
  titleVi: string;
  situation: string;
  goal: string;
  lines: readonly Line[];
}

export interface TopicSeed {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  icon: string;
  level: Difficulty;
  description: string;
  grammar?: string[];
  defaultExplanation?: string;
  prerequisite?: string;
  conversations: readonly [ConversationSeed, ConversationSeed, ...ConversationSeed[]];
}

export function buildTopic(seed: TopicSeed): Topic {
  const conversations: Conversation[] = seed.conversations.map((conversation, conversationIndex) => ({
    id: `${seed.id}-c${conversationIndex + 1}`,
    title: conversation.title,
    titleVi: conversation.titleVi,
    situation: conversation.situation,
    goal: conversation.goal,
    partner: { name: conversationIndex === 0 ? 'Linh' : 'Minh', avatar: conversationIndex === 0 ? 'L' : 'M' },
    turns: conversation.lines.map((line, index) => makeTurn(seed, conversationIndex, index, line)),
  }));
  return {
    id: seed.id,
    title: seed.title,
    titleVi: seed.titleVi,
    category: seed.category,
    icon: seed.icon,
    level: seed.level,
    description: seed.description,
    grammar: seed.grammar ?? ['present-simple'],
    vocabularyTags: Array.from(new Set(conversations.flatMap((item) => item.turns.flatMap((turn) => turn.requiredKeywords ?? [])))),
    prerequisite: seed.prerequisite,
    conversations,
  };
}

export function buildAdditionalConversation(topic: Topic, conversation: ConversationSeed, conversationIndex: number): Conversation {
  const seed: TopicSeed = {
    id: topic.id,
    title: topic.title,
    titleVi: topic.titleVi,
    category: topic.category,
    icon: topic.icon,
    level: topic.level,
    description: topic.description,
    grammar: topic.grammar,
    prerequisite: topic.prerequisite,
    conversations: [conversation, conversation],
  };
  const partnerNames = ['Linh', 'Minh', 'An', 'Thảo', 'Huy'];
  const name = partnerNames[conversationIndex % partnerNames.length] ?? 'An';
  return {
    id: `${topic.id}-c${conversationIndex + 1}`,
    title: conversation.title,
    titleVi: conversation.titleVi,
    situation: conversation.situation,
    goal: conversation.goal,
    partner: { name, avatar: name.slice(0, 1) },
    turns: conversation.lines.map((line, index) => makeTurn(seed, conversationIndex, index, line)),
  };
}
