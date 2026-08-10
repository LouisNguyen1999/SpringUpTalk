import type { Difficulty, MistakeType, TopicManifestItem, UserProgress } from '../../types/domain';
import { topicRoleCounts } from '../progress';

const TYPE_TERMS: Partial<Record<MistakeType, string[]>> = {
  tense: ['tense','past','present','future','perfect','conditional'],
  article: ['article','a/an','the'],
  preposition: ['preposition','phrasal'],
  'word-order': ['question','word order','sentence'],
  auxiliary: ['question','auxiliary','do/does','did'],
  modal: ['modal','request','advice'],
  'subject-verb-agreement': ['present simple','agreement'],
  'singular-plural': ['plural','countable'],
  pronoun: ['pronoun'],
  collocation: ['collocation','phrases'],
};

function weakTypes(progress: Pick<UserProgress, 'mistakes'>): Map<MistakeType, number> {
  const scores = new Map<MistakeType, number>();
  for (const mistake of progress.mistakes) {
    for (const type of mistake.types.length ? mistake.types : ['grammar']) scores.set(type, (scores.get(type) ?? 0) + 1);
  }
  return scores;
}

export function recommendTopics<T extends TopicManifestItem>(
  topics: readonly T[],
  progress: Pick<UserProgress, 'completedTopics'|'currentLevel'|'mistakes'|'favorites'> & Partial<Pick<UserProgress,'conversationProgress'>>,
  limit = 5,
): T[] {
  const weakness = weakTypes(progress as Pick<UserProgress, 'mistakes'>);
  return topics
    .map((topic, index) => {
      const searchable = `${topic.grammar.join(' ')} ${topic.vocabularyTags.join(' ')}`.toLowerCase();
      const completed = progress.conversationProgress
        ? topicRoleCounts(progress.conversationProgress,topic.id,topic.conversationCount).state === 'completed'
        : progress.completedTopics.includes(topic.id);
      const weakScore = [...weakness].reduce((score, [type, count]) => score + (TYPE_TERMS[type]?.some((term) => searchable.includes(term)) ? Math.min(12, count * 3) : 0), 0);
      const score = (topic.level === progress.currentLevel ? 20 : 0)
        + (completed ? -40 : 25)
        + (progress.favorites.includes(topic.id) ? 8 : 0)
        + weakScore
        - index / Math.max(1, topics.length);
      return { topic, score, index };
    })
    .sort((a,b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ topic }) => topic);
}

export function strongestWeaknesses(progress: Pick<UserProgress, 'mistakes'>, limit = 4): Array<{ type:MistakeType; count:number }> {
  return [...weakTypes(progress)].sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([type,count]) => ({ type,count }));
}

export function levelOrder(level: Difficulty): number {
  return ({ A1:0, A2:1, B1:2, B2:3 })[level];
}
