import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ConversationProgress, Difficulty, EvaluationResult, LearningRole, UserProgress, UserSettings, VocabularyItem, VocabularyProgress } from '../types/domain';
import { normalizeVocabularyKey } from '../utils/search';
import { masteryFor, scheduleNextReview } from '../engine/review-scheduler';
import { isConversationCompleted, isTopicCompleted } from '../engine/progress';

const TODAY = () => new Date().toISOString().slice(0, 10);
export const CURRENT_PROGRESS_VERSION = 5;
export const CONVERSATION_MASTERY_BONUS = 10;

export const defaultSettings: UserSettings = {
  heartsEnabled: true,
  soundEnabled: true,
  animationsEnabled: true,
  showDifficulty: true,
  explanationLanguage: 'vi',
};

export const defaultProgress: UserProgress = {
  version: CURRENT_PROGRESS_VERSION,
  xp: 0,
  todayXp: 0,
  activityDate: TODAY(),
  streak: 0,
  hearts: 5,
  currentLevel: 'A1',
  completedTopics: [],
  completedLessons: [],
  conversationProgress: {},
  sentenceProgress: {},
  mistakes: [],
  vocabulary: [],
  achievements: [],
  favorites: [],
  dailyGoal: 20,
  settings: defaultSettings,
};

function mergeVocabularyEntries(entries: VocabularyProgress[]): VocabularyProgress[] {
  const merged = new Map<string, VocabularyProgress>();
  for (const entry of entries) {
    const key = normalizeVocabularyKey(entry.word);
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...entry, id: `vocab:${key}` });
      continue;
    }
    const timesSeen = existing.timesSeen + entry.timesSeen;
    const timesCorrect = existing.timesCorrect + entry.timesCorrect;
    merged.set(key, {
      ...existing,
      timesSeen,
      timesCorrect,
      favorite: existing.favorite || entry.favorite,
      mastery: timesCorrect >= 5 ? 'mastered' : timesSeen > 1 ? 'learning' : 'new',
    });
  }
  return [...merged.values()];
}

export function migrateProgress(value: unknown, version: number): UserProgress {
  const persisted = value && typeof value === 'object' ? (value as Partial<UserProgress>) : {};
  const base = { ...defaultProgress, ...persisted, settings: { ...defaultSettings, ...persisted.settings } };
  if (version < 2) {
    base.todayXp = persisted.activityDate === TODAY() ? (persisted.todayXp ?? 0) : 0;
    base.activityDate = TODAY();
  }
  if (version < 3) base.vocabulary = mergeVocabularyEntries(base.vocabulary);
  if (version < 4) {
    base.sentenceProgress = Object.fromEntries(Object.entries(base.sentenceProgress).map(([turnId, progress]) => {
      const incorrectCount = progress.incorrectCount ?? Math.max(0, progress.attempts - progress.correct);
      const consecutiveCorrect = progress.consecutiveCorrect ?? (progress.correct > 0 ? 1 : 0);
      return [turnId, {
        ...progress,
        incorrectCount,
        firstTryCorrect: progress.firstTryCorrect ?? 0,
        consecutiveCorrect,
        mastery: progress.mastery ?? masteryFor(progress.correct, consecutiveCorrect),
        nextReviewAt: progress.nextReviewAt ?? progress.lastSeenAt,
      }];
    }));
  }
  if (version < 5) {
    const migrated: Record<string, ConversationProgress> = { ...(base.conversationProgress ?? {}) };
    for (const conversationId of base.completedLessons ?? []) {
      if (migrated[conversationId]) continue;
      const practiced = Object.entries(base.sentenceProgress).filter(([turnId]) => turnId.startsWith(`${conversationId}-t`));
      const completedAt = (role: LearningRole) => practiced
        .filter(([turnId]) => {
          const number = Number(turnId.match(/-t(\d+)$/)?.[1]);
          return Number.isInteger(number) && (role === 'A' ? number % 2 === 1 : number % 2 === 0);
        })
        .map(([, progress]) => progress.lastSeenAt)
        .sort()
        .at(-1);
      const topicFromStableId = conversationId.match(/^(.*)-c\d+$/)?.[1];
      const topicId = topicFromStableId
        ?? base.mistakes.find((item) => item.conversationId === conversationId)?.topicId
        ?? '';
      migrated[conversationId] = {
        conversationId,
        topicId,
        roles: {
          A:{ attempts:0, completedAt:completedAt('A') },
          B:{ attempts:0, completedAt:completedAt('B') },
        },
      };
    }
    base.conversationProgress = migrated;
    base.completedLessons = Object.values(migrated).filter(isConversationCompleted).map((item) => item.conversationId);
    // Legacy topic completion represented one unknown role, so it cannot safely unlock a topic in V5.
    base.completedTopics = [];
  }
  return { ...base, version: CURRENT_PROGRESS_VERSION };
}

interface AnswerPayload {
  turnId: string;
  topicId: string;
  conversationId: string;
  role: LearningRole;
  vietnamese: string;
  result: EvaluationResult;
  xp: number;
  vocabulary: VocabularyItem[];
  firstTry: boolean;
}

export interface CompleteRolePayload {
  conversationId: string;
  topicId: string;
  topicConversationIds: string[];
  role: LearningRole;
  accuracy: number;
  sessionXp: number;
  roleBonusXp: number;
}

export interface RoleCompletionOutcome {
  roleWasNew: boolean;
  conversationCompleted: boolean;
  conversationWasNew: boolean;
  topicCompleted: boolean;
  completionXp: number;
  rolesCompleted: number;
}

interface ProgressActions {
  recordAnswer: (payload: AnswerPayload) => void;
  completeConversationRole: (payload: CompleteRolePayload) => RoleCompletionOutcome;
  setDailyGoal: (goal: number) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  toggleFavoriteTopic: (topicId: string) => void;
  toggleVocabularyFavorite: (id: string) => void;
  markVocabularySeen: (items: VocabularyItem[], topicId: string, correct: boolean) => void;
  resetProgress: () => void;
  setLevel: (level: Difficulty) => void;
}

type ProgressStore = UserProgress & ProgressActions;

function dailyState(state: UserProgress): Pick<UserProgress, 'todayXp' | 'activityDate'> {
  return state.activityDate === TODAY()
    ? { todayXp: state.todayXp, activityDate: state.activityDate }
    : { todayXp: 0, activityDate: TODAY() };
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...defaultProgress,
      recordAnswer: (payload) =>
        set((state) => {
          const daily = dailyState(state);
          const previousSentence = state.sentenceProgress[payload.turnId];
          const now = new Date();
          const successful = payload.result.status === 'correct' || payload.result.status === 'acceptable';
          const schedule = scheduleNextReview(previousSentence, successful, now);
          const sentenceProgress = {
            ...state.sentenceProgress,
            [payload.turnId]: {
              attempts: (previousSentence?.attempts ?? 0) + 1,
              correct: (previousSentence?.correct ?? 0) + (successful ? 1 : 0),
              incorrectCount: (previousSentence?.incorrectCount ?? 0) + (successful ? 0 : 1),
              firstTryCorrect: (previousSentence?.firstTryCorrect ?? 0) + (successful && payload.firstTry ? 1 : 0),
              lastSeenAt: now.toISOString(),
              lastCorrectAt: successful ? now.toISOString() : previousSentence?.lastCorrectAt,
              ...schedule,
            },
          };
          const isWrong = payload.result.status === 'incorrect';
          const todayXp = daily.todayXp + payload.xp;
          const goalReachedBefore = daily.todayXp >= state.dailyGoal;
          const goalReachedNow = todayXp >= state.dailyGoal;
          const mistakes = isWrong
            ? (() => {
                const existingIndex = state.mistakes.findIndex((item) => item.turnId === payload.turnId);
                const next = [...state.mistakes];
                const record = {
                  id: `${payload.turnId}-${Date.now()}`,
                  turnId: payload.turnId,
                  topicId: payload.topicId,
                  conversationId: payload.conversationId,
                  role: payload.role,
                  vietnamese: payload.vietnamese,
                  userAnswer: payload.result.userAnswer,
                  canonicalAnswer: payload.result.canonicalAnswer,
                  types: payload.result.mistakes.map((item) => item.type),
                  createdAt: now.toISOString(),
                  reviewCount: existingIndex >= 0 ? (state.mistakes[existingIndex]?.reviewCount ?? 0) + 1 : 0,
                  nextReviewAt: schedule.nextReviewAt,
                };
                if (existingIndex >= 0) next.splice(existingIndex, 1);
                return [record, ...next].slice(0, 500);
              })()
            : state.mistakes;
          return {
            ...daily,
            xp: state.xp + payload.xp,
            todayXp,
            streak: !goalReachedBefore && goalReachedNow ? state.streak + 1 : state.streak,
            hearts: isWrong && state.settings.heartsEnabled ? Math.max(0, state.hearts - 1) : state.hearts,
            sentenceProgress,
            mistakes,
          };
        }),
      completeConversationRole: (payload) => {
        const state = get();
        const previous = state.conversationProgress[payload.conversationId];
        const roleWasNew = !previous?.roles[payload.role].completedAt;
        const conversationWasComplete = isConversationCompleted(previous);
        const now = new Date().toISOString();
        const roleProgress = previous?.roles[payload.role] ?? { attempts:0 };
        const updatedConversation: ConversationProgress = {
          conversationId:payload.conversationId,
          topicId:payload.topicId,
          roles:{
            A:previous?.roles.A ?? { attempts:0 },
            B:previous?.roles.B ?? { attempts:0 },
            [payload.role]:{
              ...roleProgress,
              attempts:roleProgress.attempts + 1,
              completedAt:roleProgress.completedAt ?? now,
              accuracy:payload.accuracy,
              xpEarned:(roleProgress.xpEarned ?? 0) + payload.sessionXp,
            },
          },
        };
        const conversationProgress = { ...state.conversationProgress, [payload.conversationId]:updatedConversation };
        const conversationCompleted = isConversationCompleted(updatedConversation);
        const conversationWasNew = conversationCompleted && !conversationWasComplete;
        const completionXp = (roleWasNew ? payload.roleBonusXp : 0) + (conversationWasNew ? CONVERSATION_MASTERY_BONUS : 0);
        const topicCompleted = isTopicCompleted(conversationProgress, payload.topicId, payload.topicConversationIds);
        set((current) => {
          const daily = dailyState(state);
          const todayXp = daily.todayXp + completionXp;
          const goalReachedBefore = daily.todayXp >= state.dailyGoal;
          const goalReachedNow = todayXp >= state.dailyGoal;
          return {
            ...daily,
            xp: state.xp + completionXp,
            todayXp,
            streak: !goalReachedBefore && goalReachedNow ? state.streak + 1 : state.streak,
            conversationProgress,
            completedLessons: conversationCompleted ? Array.from(new Set([...current.completedLessons, payload.conversationId])) : current.completedLessons,
            completedTopics: topicCompleted ? Array.from(new Set([...current.completedTopics, payload.topicId])) : current.completedTopics,
            hearts: roleWasNew ? Math.min(5, state.hearts + 1) : state.hearts,
          };
        });
        return {
          roleWasNew,
          conversationCompleted,
          conversationWasNew,
          topicCompleted,
          completionXp,
          rolesCompleted:Number(Boolean(updatedConversation.roles.A.completedAt)) + Number(Boolean(updatedConversation.roles.B.completedAt)),
        };
      },
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
      toggleFavoriteTopic: (topicId) =>
        set((state) => ({ favorites: state.favorites.includes(topicId) ? state.favorites.filter((id) => id !== topicId) : [...state.favorites, topicId] })),
      toggleVocabularyFavorite: (id) => set((state) => ({ vocabulary: state.vocabulary.map((item) => item.id === id ? { ...item, favorite: !item.favorite } : item) })),
      markVocabularySeen: (items, topicId, correct) =>
        set((state) => {
          const vocabulary = [...state.vocabulary];
          for (const item of items) {
            const key = normalizeVocabularyKey(item.word);
            const id = `vocab:${key}`;
            const index = vocabulary.findIndex((entry) => normalizeVocabularyKey(entry.word) === key);
            if (index >= 0) {
              const old = vocabulary[index];
              if (!old) continue;
              const timesSeen = old.timesSeen + 1;
              const timesCorrect = old.timesCorrect + (correct ? 1 : 0);
              vocabulary[index] = { ...old, timesSeen, timesCorrect, mastery: timesCorrect >= 5 ? 'mastered' : 'learning' };
            } else {
              vocabulary.push({ ...item, id, sourceTopic: topicId, timesSeen: 1, timesCorrect: correct ? 1 : 0, mastery: 'new', favorite: false });
            }
          }
          return { vocabulary };
        }),
      resetProgress: () => set(defaultProgress),
      setLevel: (currentLevel) => set({ currentLevel }),
    }),
    {
      name: 'lingotalk-progress',
      version: CURRENT_PROGRESS_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: migrateProgress,
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([, value]) => typeof value !== 'function')) as UserProgress,
    },
  ),
);
