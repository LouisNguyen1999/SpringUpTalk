import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type {
  ConversationProgress,
  DailyLearningItem,
  DailyLearningPreferences,
  DailyLearningSession,
  Difficulty,
  EvaluationResult,
  ITEnglishAttemptResult,
  ITEnglishMode,
  ITEnglishProgress,
  ITEnglishSentenceProgress,
  LearningRole,
  UserProgress,
  UserSettings,
  VocabularyEntry,
  VocabularyItem,
  VocabularyPracticeItem,
  VocabularyProgress,
  WritingEvaluation,
  WritingPathPreference,
  WritingTopicProgress,
} from '../types/domain';
import { normalizeVocabularyIdentityKey } from '../utils/search';
import { masteryFor, scheduleNextReview } from '../engine/review-scheduler';
import { isConversationCompleted, isTopicCompleted } from '../engine/progress';
import { dailyItemKey, dailySessionCounts, isDailySessionComplete } from '../engine/daily-learning/session';
import { localDateKey } from '../utils/local-date';
import { masteryResultForEvaluation, updateWritingSkillMastery } from '../engine/writing-mastery';
import { canAttemptSentence, updateSentenceProgress } from '../engine/it-english/progression';
import { itEnglishTopics } from '../data/it-english/curriculum';

const TODAY = () => localDateKey();
export const CURRENT_PROGRESS_VERSION = 14;
export const CONVERSATION_MASTERY_BONUS = 10;

export const defaultSettings: UserSettings = {
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
  currentLevel: 'A1',
  completedTopics: [],
  completedLessons: [],
  conversationProgress: {},
  sentenceProgress: {},
  mistakes: [],
  vocabulary: [],
  customVocabulary: [],
  customVocabularyPractice: [],
  disabledVocabularyPracticeIds: [],
  writingProgress: {},
  writingDrafts: {},
  writingPathPreference: 'all',
  writingCurrentUnitId: undefined,
  writingSkillProgress: {},
  itEnglishProgress: {},
  achievements: [],
  favorites: [],
  dailyGoal: 20,
  dailyLearningPreferences: { mode: 'standard', focus: 'balanced' },
  dailyLearningSession: undefined,
  dailyLearningHistory: [],
  settings: defaultSettings,
};

function mergeVocabularyEntries(entries: VocabularyProgress[]): VocabularyProgress[] {
  const merged = new Map<string, VocabularyProgress>();
  for (const entry of entries) {
    const key = normalizeVocabularyIdentityKey(entry.word ?? entry.id.replace(/^vocab:/, ''));
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, {
        id: `vocab:${key}`,
        sourceTopic: entry.sourceTopic,
        timesSeen: entry.timesSeen,
        timesCorrect: entry.timesCorrect,
        mastery: entry.mastery,
        favorite: entry.favorite,
        practiceCount: entry.practiceCount,
        firstTryCorrectCount: entry.firstTryCorrectCount,
        targetUsageCorrectCount: entry.targetUsageCorrectCount,
        incorrectCount: entry.incorrectCount,
        consecutiveCorrect: entry.consecutiveCorrect,
        lastPracticedAt: entry.lastPracticedAt,
        nextReviewAt: entry.nextReviewAt,
      });
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
  type LegacyProgress = Partial<UserProgress> & {
    hearts?: number;
    settings?: Partial<UserSettings> & { heartsEnabled?: boolean };
  };
  const persisted = value && typeof value === 'object' ? (value as LegacyProgress) : {};
  const base: UserProgress & {
    hearts?: number;
    settings: UserSettings & { heartsEnabled?: boolean };
  } = {
    ...defaultProgress,
    ...persisted,
    settings: { ...defaultSettings, ...persisted.settings },
  };
  delete base.hearts;
  delete base.settings.heartsEnabled;
  if (version < 2) {
    base.todayXp = persisted.activityDate === TODAY() ? (persisted.todayXp ?? 0) : 0;
    base.activityDate = TODAY();
  }
  if (version < 3) base.vocabulary = mergeVocabularyEntries(base.vocabulary);
  if (version < 4) {
    base.sentenceProgress = Object.fromEntries(
      Object.entries(base.sentenceProgress).map(([turnId, progress]) => {
        const incorrectCount =
          progress.incorrectCount ?? Math.max(0, progress.attempts - progress.correct);
        const consecutiveCorrect = progress.consecutiveCorrect ?? (progress.correct > 0 ? 1 : 0);
        return [
          turnId,
          {
            ...progress,
            incorrectCount,
            firstTryCorrect: progress.firstTryCorrect ?? 0,
            consecutiveCorrect,
            mastery: progress.mastery ?? masteryFor(progress.correct, consecutiveCorrect),
            nextReviewAt: progress.nextReviewAt ?? progress.lastSeenAt,
          },
        ];
      }),
    );
  }
  if (version < 5) {
    const migrated: Record<string, ConversationProgress> = { ...(base.conversationProgress ?? {}) };
    for (const conversationId of base.completedLessons ?? []) {
      if (migrated[conversationId]) continue;
      const practiced = Object.entries(base.sentenceProgress).filter(([turnId]) =>
        turnId.startsWith(`${conversationId}-t`),
      );
      const completedAt = (role: LearningRole) =>
        practiced
          .filter(([turnId]) => {
            const number = Number(turnId.match(/-t(\d+)$/)?.[1]);
            return Number.isInteger(number) && (role === 'A' ? number % 2 === 1 : number % 2 === 0);
          })
          .map(([, progress]) => progress.lastSeenAt)
          .sort()
          .at(-1);
      const topicFromStableId = conversationId.match(/^(.*)-c\d+$/)?.[1];
      const topicId =
        topicFromStableId ??
        base.mistakes.find((item) => item.conversationId === conversationId)?.topicId ??
        '';
      migrated[conversationId] = {
        conversationId,
        topicId,
        roles: {
          A: { attempts: 0, completedAt: completedAt('A') },
          B: { attempts: 0, completedAt: completedAt('B') },
        },
      };
    }
    base.conversationProgress = migrated;
    base.completedLessons = Object.values(migrated)
      .filter(isConversationCompleted)
      .map((item) => item.conversationId);
    // Legacy topic completion represented one unknown role, so it cannot safely unlock a topic in V5.
    base.completedTopics = [];
  }
  if (version < 7) {
    base.vocabulary = mergeVocabularyEntries(base.vocabulary ?? []);
    base.customVocabulary = base.customVocabulary ?? [];
    base.customVocabularyPractice = base.customVocabularyPractice ?? [];
  }
  if (version < 8) {
    base.disabledVocabularyPracticeIds = base.disabledVocabularyPracticeIds ?? [];
  }
  if (version < 9) {
    base.writingProgress = base.writingProgress ?? {};
    base.writingDrafts = base.writingDrafts ?? {};
  }
  if (version < 10) {
    base.writingProgress = Object.fromEntries(
      Object.entries(base.writingProgress ?? {}).map(([topicId, progress]) => [
        topicId,
        {
          ...progress,
          attempts: (progress.attempts ?? []).map((attempt) => ({
            ...attempt,
            contradictedIdeaIds: attempt.contradictedIdeaIds ?? [],
            missingIdeaKinds: attempt.missingIdeaKinds ?? [],
          })),
          bestAttempt: progress.bestAttempt
            ? {
                ...progress.bestAttempt,
                contradictedIdeaIds: progress.bestAttempt.contradictedIdeaIds ?? [],
                missingIdeaKinds: progress.bestAttempt.missingIdeaKinds ?? [],
              }
            : undefined,
          weaknessCounts: progress.weaknessCounts ?? {},
        },
      ]),
    );
  }
  if (version < 11) {
    base.dailyLearningPreferences = base.dailyLearningPreferences ?? {
      mode: 'standard',
      focus: 'balanced',
    };
    base.dailyLearningHistory = base.dailyLearningHistory ?? [];
    base.dailyLearningSession = base.dailyLearningSession
      ? { ...base.dailyLearningSession, streakAwarded: base.dailyLearningSession.streakAwarded ?? false }
      : undefined;
  }
  if (version < 12) {
    base.writingPathPreference = base.writingPathPreference ?? 'all';
    base.writingCurrentUnitId = base.writingCurrentUnitId || undefined;
  }
  if (version < 13) {
    base.writingSkillProgress = base.writingSkillProgress ?? {};
    base.writingProgress = Object.fromEntries(
      Object.entries(base.writingProgress ?? {}).map(([topicId, progress]) => [
        topicId,
        {
          ...progress,
          recommendedReviewMode: progress.recommendedReviewMode ?? (
            progress.bestAttempt?.contradictedIdeaIds.length ? 'exact-retry' : 'variant-retry'
          ),
        },
      ]),
    );
  }
  base.writingSkillProgress = base.writingSkillProgress ?? {};
  base.itEnglishProgress = base.itEnglishProgress ?? {};
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
  recordITEnglishAttempt: (topicId: string, sentenceId: string, mode: ITEnglishMode, result: ITEnglishAttemptResult) => void;
  recordAnswer: (payload: AnswerPayload) => void;
  completeConversationRole: (payload: CompleteRolePayload) => RoleCompletionOutcome;
  setDailyGoal: (goal: number) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  toggleFavoriteTopic: (topicId: string) => void;
  toggleVocabularyFavorite: (id: string) => void;
  markVocabularySeen: (items: VocabularyItem[], topicId: string, correct: boolean) => void;
  addVocabulary: (id: string, sourceTopic?: string) => void;
  addCustomVocabulary: (entry: VocabularyEntry) => void;
  addCustomVocabularyPractice: (item: VocabularyPracticeItem) => void;
  deleteCustomVocabulary: (id: string) => void;
  removeVocabulary: (id: string) => void;
  deleteVocabularyPractice: (id: string) => void;
  toggleVocabularyPracticeDisabled: (id: string) => void;
  recordVocabularyPractice: (payload: {
    item: VocabularyPracticeItem;
    evaluation: EvaluationResult;
    targetUsed: boolean;
    firstTry: boolean;
    shownAnswer: boolean;
  }) => void;
  saveWritingDraft: (topicId: string, draft: string) => void;
  clearWritingDraft: (topicId: string) => void;
  toggleWritingFavorite: (topicId: string) => void;
  recordWritingAttempt: (topicId: string, evaluation: WritingEvaluation) => void;
  setWritingPathPreference: (preference: WritingPathPreference) => void;
  setWritingCurrentUnit: (unitId?: string) => void;
  setDailyLearningPreferences: (preferences: Partial<DailyLearningPreferences>) => void;
  saveDailyLearningSession: (session: DailyLearningSession, regenerate?: boolean) => void;
  startDailyLearningItem: (itemId: string) => void;
  completeDailyLearningItem: (itemId: string, result?: DailyLearningItem['result']) => void;
  skipDailyLearningItem: (itemId: string) => void;
  resetProgress: () => void;
  setLevel: (level: Difficulty) => void;
}

type ProgressStore = UserProgress & ProgressActions;

function dailyState(state: UserProgress): Pick<UserProgress, 'todayXp' | 'activityDate'> {
  return state.activityDate === TODAY()
    ? { todayXp: state.todayXp, activityDate: state.activityDate }
    : { todayXp: 0, activityDate: TODAY() };
}

function dailyHistoryEntry(session: DailyLearningSession, xp: number) {
  const completed = session.items.filter((item) => item.status === 'completed');
  const firstTry = completed.filter((item) => item.result?.firstTryCorrect !== undefined);
  const focusAreas = Array.from(
    new Set(completed.flatMap((item) => item.result?.weaknessTypes ?? [])),
  ).slice(0, 4);
  return {
    date: session.date,
    status: session.status,
    planned: session.items.length,
    completed: completed.length,
    xpEarned: Math.max(0, xp - session.xpAtStart),
    counts: dailySessionCounts(completed),
    firstTryCorrect: firstTry.filter((item) => item.result?.firstTryCorrect).length,
    firstTryTotal: firstTry.length,
    focusAreas,
    recentItemKeys: completed.map(dailyItemKey).slice(-30),
  };
}

function upsertDailyHistory(
  history: UserProgress['dailyLearningHistory'],
  session: DailyLearningSession,
  xp: number,
) {
  return [...history.filter((item) => item.date !== session.date), dailyHistoryEntry(session, xp)]
    .sort((left, right) => left.date.localeCompare(right.date))
    .slice(-90);
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...defaultProgress,
      recordITEnglishAttempt: (topicId, sentenceId, mode, result) =>
        set((state) => {
          if (!canAttemptSentence(itEnglishTopics, state.itEnglishProgress, topicId, sentenceId)) return state;
          const topicProgress: ITEnglishProgress = state.itEnglishProgress[topicId] ?? { sentences: {} };
          const previous: ITEnglishSentenceProgress | undefined = topicProgress.sentences[sentenceId];
          const sentence = updateSentenceProgress(previous, mode, result, new Date().toISOString(), 3);
          return {
            itEnglishProgress: {
              ...state.itEnglishProgress,
              [topicId]: { sentences: { ...topicProgress.sentences, [sentenceId]: sentence } },
            },
          };
        }),
      recordAnswer: (payload) =>
        set((state) => {
          const daily = dailyState(state);
          const previousSentence = state.sentenceProgress[payload.turnId];
          const now = new Date();
          const successful =
            payload.result.status === 'correct' || payload.result.status === 'acceptable';
          const schedule = scheduleNextReview(previousSentence, successful, now);
          const sentenceProgress = {
            ...state.sentenceProgress,
            [payload.turnId]: {
              attempts: (previousSentence?.attempts ?? 0) + 1,
              correct: (previousSentence?.correct ?? 0) + (successful ? 1 : 0),
              incorrectCount: (previousSentence?.incorrectCount ?? 0) + (successful ? 0 : 1),
              firstTryCorrect:
                (previousSentence?.firstTryCorrect ?? 0) + (successful && payload.firstTry ? 1 : 0),
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
                const existingIndex = state.mistakes.findIndex(
                  (item) => item.turnId === payload.turnId,
                );
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
                  reviewCount:
                    existingIndex >= 0 ? (state.mistakes[existingIndex]?.reviewCount ?? 0) + 1 : 0,
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
        const roleProgress = previous?.roles[payload.role] ?? { attempts: 0 };
        const updatedConversation: ConversationProgress = {
          conversationId: payload.conversationId,
          topicId: payload.topicId,
          roles: {
            A: previous?.roles.A ?? { attempts: 0 },
            B: previous?.roles.B ?? { attempts: 0 },
            [payload.role]: {
              ...roleProgress,
              attempts: roleProgress.attempts + 1,
              completedAt: roleProgress.completedAt ?? now,
              accuracy: payload.accuracy,
              xpEarned: (roleProgress.xpEarned ?? 0) + payload.sessionXp,
            },
          },
        };
        const conversationProgress = {
          ...state.conversationProgress,
          [payload.conversationId]: updatedConversation,
        };
        const conversationCompleted = isConversationCompleted(updatedConversation);
        const conversationWasNew = conversationCompleted && !conversationWasComplete;
        const completionXp =
          (roleWasNew ? payload.roleBonusXp : 0) +
          (conversationWasNew ? CONVERSATION_MASTERY_BONUS : 0);
        const topicCompleted = isTopicCompleted(
          conversationProgress,
          payload.topicId,
          payload.topicConversationIds,
        );
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
            completedLessons: conversationCompleted
              ? Array.from(new Set([...current.completedLessons, payload.conversationId]))
              : current.completedLessons,
            completedTopics: topicCompleted
              ? Array.from(new Set([...current.completedTopics, payload.topicId]))
              : current.completedTopics,
          };
        });
        return {
          roleWasNew,
          conversationCompleted,
          conversationWasNew,
          topicCompleted,
          completionXp,
          rolesCompleted:
            Number(Boolean(updatedConversation.roles.A.completedAt)) +
            Number(Boolean(updatedConversation.roles.B.completedAt)),
        };
      },
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
      toggleFavoriteTopic: (topicId) =>
        set((state) => ({
          favorites: state.favorites.includes(topicId)
            ? state.favorites.filter((id) => id !== topicId)
            : [...state.favorites, topicId],
        })),
      toggleVocabularyFavorite: (id) =>
        set((state) => ({
          vocabulary: state.vocabulary.some((item) => item.id === id)
            ? state.vocabulary.map((item) =>
                item.id === id ? { ...item, favorite: !item.favorite } : item,
              )
            : [
                ...state.vocabulary,
                {
                  id,
                  sourceTopic: 'vocabulary-practice',
                  timesSeen: 0,
                  timesCorrect: 0,
                  mastery: 'new',
                  favorite: true,
                },
              ],
        })),
      addVocabulary: (id, sourceTopic = 'vocabulary-practice') =>
        set((state) =>
          state.vocabulary.some((item) => item.id === id)
            ? state
            : {
                vocabulary: [
                  ...state.vocabulary,
                  {
                    id,
                    sourceTopic,
                    timesSeen: 0,
                    timesCorrect: 0,
                    practiceCount: 0,
                    firstTryCorrectCount: 0,
                    targetUsageCorrectCount: 0,
                    incorrectCount: 0,
                    consecutiveCorrect: 0,
                    mastery: 'new',
                    favorite: false,
                  },
                ],
              },
        ),
      addCustomVocabulary: (entry) =>
        set((state) => ({
          customVocabulary: [
            ...state.customVocabulary.filter((item) => item.id !== entry.id),
            entry,
          ],
        })),
      addCustomVocabularyPractice: (item) =>
        set((state) => ({
          customVocabularyPractice: [
            ...state.customVocabularyPractice.filter((existing) => existing.id !== item.id),
            item,
          ],
          disabledVocabularyPracticeIds: state.disabledVocabularyPracticeIds.filter(
            (id) => id !== item.id,
          ),
        })),
      deleteCustomVocabulary: (id) =>
        set((state) => {
          const practiceIds = new Set(
            state.customVocabularyPractice
              .filter((item) => item.vocabularyId === id)
              .map((item) => item.id),
          );
          return {
            customVocabulary: state.customVocabulary.filter((item) => item.id !== id),
            customVocabularyPractice: state.customVocabularyPractice.filter(
              (item) => item.vocabularyId !== id,
            ),
            disabledVocabularyPracticeIds: state.disabledVocabularyPracticeIds.filter(
              (practiceId) => !practiceIds.has(practiceId),
            ),
            vocabulary: state.vocabulary.filter((item) => item.id !== id),
            mistakes: state.mistakes.filter((item) => item.vocabularyId !== id),
            sentenceProgress: Object.fromEntries(
              Object.entries(state.sentenceProgress).filter(
                ([practiceId]) => !practiceIds.has(practiceId),
              ),
            ),
          };
        }),
      removeVocabulary: (id) =>
        set((state) => ({
          vocabulary: state.vocabulary.filter((item) => item.id !== id),
          mistakes: state.mistakes.filter((item) => item.vocabularyId !== id),
        })),
      deleteVocabularyPractice: (id) =>
        set((state) => ({
          customVocabularyPractice: state.customVocabularyPractice.filter((item) => item.id !== id),
          disabledVocabularyPracticeIds: state.disabledVocabularyPracticeIds.filter(
            (practiceId) => practiceId !== id,
          ),
          mistakes: state.mistakes.filter((item) => item.turnId !== id),
          sentenceProgress: Object.fromEntries(
            Object.entries(state.sentenceProgress).filter(([practiceId]) => practiceId !== id),
          ),
        })),
      toggleVocabularyPracticeDisabled: (id) =>
        set((state) => ({
          disabledVocabularyPracticeIds: state.disabledVocabularyPracticeIds.includes(id)
            ? state.disabledVocabularyPracticeIds.filter((practiceId) => practiceId !== id)
            : [...state.disabledVocabularyPracticeIds, id],
        })),
      recordVocabularyPractice: ({ item, evaluation, targetUsed, firstTry, shownAnswer }) =>
        set((state) => {
          const now = new Date();
          const successful = evaluation.status === 'correct' || evaluation.status === 'acceptable';
          const productionSuccess = successful && targetUsed && !shownAnswer;
          const existing = state.vocabulary.find((entry) => entry.id === item.vocabularyId);
          const targetCorrect =
            (existing?.targetUsageCorrectCount ?? 0) + (productionSuccess ? 1 : 0);
          const consecutive = productionSuccess ? (existing?.consecutiveCorrect ?? 0) + 1 : 0;
          const mastery = productionSuccess
            ? masteryFor(targetCorrect, consecutive)
            : targetCorrect > 0
              ? 'learning'
              : 'new';
          const priorSentence = state.sentenceProgress[item.id];
          const schedule = scheduleNextReview(priorSentence, productionSuccess, now);
          const progress: VocabularyProgress = {
            id: item.vocabularyId,
            sourceTopic: item.sourceTopicId ?? existing?.sourceTopic ?? 'vocabulary-practice',
            timesSeen: (existing?.timesSeen ?? 0) + 1,
            timesCorrect: (existing?.timesCorrect ?? 0) + (successful ? 1 : 0),
            practiceCount: (existing?.practiceCount ?? 0) + 1,
            firstTryCorrectCount:
              (existing?.firstTryCorrectCount ?? 0) + (productionSuccess && firstTry ? 1 : 0),
            targetUsageCorrectCount: targetCorrect,
            incorrectCount: (existing?.incorrectCount ?? 0) + (successful ? 0 : 1),
            consecutiveCorrect: consecutive,
            lastPracticedAt: now.toISOString(),
            nextReviewAt: schedule.nextReviewAt,
            mastery,
            favorite: existing?.favorite ?? false,
          };
          const sentenceProgress = {
            ...state.sentenceProgress,
            [item.id]: {
              attempts: (priorSentence?.attempts ?? 0) + 1,
              correct: (priorSentence?.correct ?? 0) + (productionSuccess ? 1 : 0),
              incorrectCount: (priorSentence?.incorrectCount ?? 0) + (productionSuccess ? 0 : 1),
              firstTryCorrect:
                (priorSentence?.firstTryCorrect ?? 0) + (productionSuccess && firstTry ? 1 : 0),
              lastSeenAt: now.toISOString(),
              lastCorrectAt: productionSuccess ? now.toISOString() : priorSentence?.lastCorrectAt,
              ...schedule,
            },
          };
          const vocabulary = [
            ...state.vocabulary.filter((entry) => entry.id !== item.vocabularyId),
            progress,
          ];
          const mistakes = !successful
            ? [
                {
                  id: `${item.id}-${Date.now()}`,
                  turnId: item.id,
                  topicId: item.sourceTopicId ?? 'vocabulary',
                  conversationId: item.sourceConversationId ?? item.vocabularyId,
                  vocabularyId: item.vocabularyId,
                  vietnamese: item.vietnamese,
                  userAnswer: evaluation.userAnswer,
                  canonicalAnswer: item.canonicalAnswer,
                  types: evaluation.mistakes.length
                    ? evaluation.mistakes.map((mistake) => mistake.type)
                    : ['vocabulary' as const],
                  createdAt: now.toISOString(),
                  reviewCount: 0,
                  nextReviewAt: schedule.nextReviewAt,
                },
                ...state.mistakes.filter((mistake) => mistake.turnId !== item.id),
              ].slice(0, 500)
            : state.mistakes;
          const rewardXp = productionSuccess ? 5 : successful ? 2 : 0;
          const daily = dailyState(state);
          const todayXp = daily.todayXp + rewardXp;
          return {
            ...daily,
            vocabulary,
            sentenceProgress,
            mistakes,
            xp: state.xp + rewardXp,
            todayXp,
            streak:
              daily.todayXp < state.dailyGoal && todayXp >= state.dailyGoal
                ? state.streak + 1
                : state.streak,
          };
        }),
      saveWritingDraft: (topicId, draft) =>
        set((state) => ({
          writingDrafts: draft.trim()
            ? { ...state.writingDrafts, [topicId]: draft }
            : Object.fromEntries(
                Object.entries(state.writingDrafts).filter(([id]) => id !== topicId),
              ),
        })),
      clearWritingDraft: (topicId) =>
        set((state) => ({
          writingDrafts: Object.fromEntries(
            Object.entries(state.writingDrafts).filter(([id]) => id !== topicId),
          ),
        })),
      toggleWritingFavorite: (topicId) =>
        set((state) => {
          const current = state.writingProgress[topicId];
          const now = new Date().toISOString();
          const next: WritingTopicProgress = current ?? {
            topicId,
            attempts: [],
            successfulCount: 0,
            consecutiveCorrect: 0,
            lastPracticedAt: now,
            nextReviewAt: now,
            mastery: 'new',
            favorite: false,
            weaknessCounts: {},
          };
          return {
            writingProgress: {
              ...state.writingProgress,
              [topicId]: { ...next, favorite: !next.favorite },
            },
          };
        }),
      recordWritingAttempt: (topicId, evaluation) =>
        set((state) => {
          const now = new Date();
          const previous = state.writingProgress[topicId];
          const successful =
            evaluation.status === 'communicates-well' &&
            evaluation.facts.every((fact) => fact.correct);
          const qualifiesForMastery = successful &&
            (!previous?.lastSuccessfulAt || Date.parse(previous.nextReviewAt) <= now.getTime());
          const schedule = successful && !qualifiesForMastery && previous
            ? {
                mastery: previous.mastery,
                nextReviewAt: previous.nextReviewAt,
                consecutiveCorrect: previous.consecutiveCorrect,
              }
            : scheduleNextReview(
                previous
                  ? {
                      attempts: previous.attempts.length,
                      correct: previous.successfulCount,
                      consecutiveCorrect: previous.consecutiveCorrect,
                      lastSeenAt: previous.lastPracticedAt,
                      nextReviewAt: previous.nextReviewAt,
                    }
                  : undefined,
                successful,
                now,
              );
          const attempt = {
            id: `${topicId}:attempt:${now.getTime()}`,
            answer: evaluation.userAnswer,
            status: evaluation.status,
            communicationScore: evaluation.communicationScore,
            meaningCoverage: evaluation.meaningCoverage,
            missingIdeaIds: evaluation.ideas
              .filter((idea) => idea.status === 'missing' || idea.status === 'partial')
              .map((idea) => idea.id),
            contradictedIdeaIds: evaluation.ideas
              .filter((idea) => idea.status === 'contradicted')
              .map((idea) => idea.id),
            missingIdeaKinds: Array.from(new Set(evaluation.ideas
              .filter((idea) => idea.status !== 'covered')
              .map((idea) => idea.kind))),
            criticalErrorIds: evaluation.facts
              .filter((fact) => !fact.correct)
              .map((fact) => fact.id),
            languageIssueTypes: evaluation.languageIssues.map((issue) => issue.type),
            feedbackCategories: Array.from(new Set(evaluation.feedbackIssues?.map((issue) => issue.category) ?? [])),
            practicedSkills: evaluation.practicedSkills ?? [],
            qualityBand: evaluation.qualityBand,
            createdAt: now.toISOString(),
          };
          const isBetter = !previous?.bestAttempt ||
            attempt.meaningCoverage > previous.bestAttempt.meaningCoverage ||
            (attempt.meaningCoverage === previous.bestAttempt.meaningCoverage &&
              attempt.criticalErrorIds.length < previous.bestAttempt.criticalErrorIds.length) ||
            (attempt.meaningCoverage === previous.bestAttempt.meaningCoverage &&
              attempt.criticalErrorIds.length === previous.bestAttempt.criticalErrorIds.length &&
              attempt.languageIssueTypes.length < previous.bestAttempt.languageIssueTypes.length);
          const bestAttempt =
            isBetter ? attempt : previous.bestAttempt;
          const weaknessCounts = { ...(previous?.weaknessCounts ?? {}) };
          for (const kind of attempt.missingIdeaKinds) {
            weaknessCounts[kind] = (weaknessCounts[kind] ?? 0) + 1;
          }
          const writingProgress: WritingTopicProgress = {
            topicId,
            attempts: [...(previous?.attempts ?? []), attempt].slice(-3),
            bestAttempt,
            successfulCount: (previous?.successfulCount ?? 0) + (qualifiesForMastery ? 1 : 0),
            consecutiveCorrect: schedule.consecutiveCorrect,
            lastPracticedAt: now.toISOString(),
            nextReviewAt: schedule.nextReviewAt,
            mastery: schedule.mastery,
            favorite: previous?.favorite ?? false,
            weaknessCounts,
            lastSuccessfulAt: qualifiesForMastery ? now.toISOString() : previous?.lastSuccessfulAt,
            recommendedReviewMode: evaluation.qualityBand === 'meaning-changed' || evaluation.qualityBand === 'incorrect'
              ? 'exact-retry'
              : 'variant-retry',
          };
          const xp = successful ? 8 : evaluation.status === 'mostly-correct' ? 3 : 0;
          const daily = dailyState(state);
          const todayXp = daily.todayXp + xp;
          return {
            ...daily,
            xp: state.xp + xp,
            todayXp,
            streak:
              daily.todayXp < state.dailyGoal && todayXp >= state.dailyGoal
                ? state.streak + 1
                : state.streak,
            writingProgress: { ...state.writingProgress, [topicId]: writingProgress },
            writingSkillProgress: updateWritingSkillMastery(
              state.writingSkillProgress,
              evaluation.practicedSkills ?? [],
              masteryResultForEvaluation(evaluation),
              now,
            ),
            writingDrafts: successful
              ? Object.fromEntries(
                  Object.entries(state.writingDrafts).filter(([id]) => id !== topicId),
                )
              : state.writingDrafts,
          };
        }),
      setWritingPathPreference: (writingPathPreference) => set({ writingPathPreference }),
      setWritingCurrentUnit: (writingCurrentUnitId) => set({ writingCurrentUnitId }),
      markVocabularySeen: (items, topicId, correct) =>
        set((state) => {
          const vocabulary = [...state.vocabulary];
          for (const item of items) {
            const key = normalizeVocabularyIdentityKey(item.word);
            const id = `vocab:${key}`;
            const index = vocabulary.findIndex(
              (entry) =>
                entry.id === id ||
                normalizeVocabularyIdentityKey(entry.word ?? entry.id.replace(/^vocab:/, '')) ===
                  key,
            );
            if (index >= 0) {
              const old = vocabulary[index];
              if (!old) continue;
              const timesSeen = old.timesSeen + 1;
              const timesCorrect = old.timesCorrect + (correct ? 1 : 0);
              vocabulary[index] = {
                ...old,
                timesSeen,
                timesCorrect,
                mastery: timesCorrect >= 5 ? 'mastered' : 'learning',
              };
            } else {
              vocabulary.push({
                id,
                sourceTopic: topicId,
                timesSeen: 1,
                timesCorrect: correct ? 1 : 0,
                mastery: 'new',
                favorite: false,
              });
            }
          }
          return { vocabulary };
        }),
      setDailyLearningPreferences: (preferences) =>
        set((state) => ({
          dailyLearningPreferences: { ...state.dailyLearningPreferences, ...preferences },
        })),
      saveDailyLearningSession: (session, regenerate = false) =>
        set((state) => {
          const previous = state.dailyLearningSession;
          let dailyLearningHistory = state.dailyLearningHistory;
          if (previous && previous.date !== session.date) {
            dailyLearningHistory = upsertDailyHistory(dailyLearningHistory, previous, state.xp);
          }
          if (!regenerate || !previous || previous.date !== session.date) {
            return { dailyLearningSession: session, dailyLearningHistory };
          }
          const previousItems = new Map(previous.items.map((item) => [dailyItemKey(item), item]));
          const items = session.items.map((item) => {
            const old = previousItems.get(dailyItemKey(item));
            return old?.status === 'completed' || old?.status === 'skipped'
              ? { ...item, status: old.status, completedAt: old.completedAt, skippedAt: old.skippedAt, result: old.result }
              : item;
          });
          const now = new Date().toISOString();
          const merged: DailyLearningSession = {
            ...session,
            items,
            currentItemId: items.find((item) => item.status === 'pending')?.id,
            status: isDailySessionComplete(items)
              ? 'completed'
              : items.some((item) => item.status !== 'pending')
                ? 'in-progress'
                : 'not-started',
            startedAt: previous.startedAt,
            completedAt: isDailySessionComplete(items) ? previous.completedAt ?? now : undefined,
            updatedAt: now,
            xpAtStart: previous.xpAtStart,
            streakAwarded: previous.streakAwarded,
          };
          return {
            dailyLearningSession: merged,
            dailyLearningHistory: upsertDailyHistory(dailyLearningHistory, merged, state.xp),
          };
        }),
      startDailyLearningItem: (itemId) =>
        set((state) => {
          const session = state.dailyLearningSession;
          if (!session || !session.items.some((item) => item.id === itemId)) return state;
          const now = new Date().toISOString();
          return {
            dailyLearningSession: {
              ...session,
              status: session.status === 'not-started' ? 'in-progress' : session.status,
              currentItemId: itemId,
              startedAt: session.startedAt ?? now,
              updatedAt: now,
            },
          };
        }),
      completeDailyLearningItem: (itemId, result) =>
        set((state) => {
          const session = state.dailyLearningSession;
          if (!session || session.date !== TODAY()) return state;
          const target = session.items.find((item) => item.id === itemId);
          if (!target || target.status === 'completed') return state;
          const now = new Date().toISOString();
          const items = session.items.map((item) =>
            item.id === itemId
              ? { ...item, status: 'completed' as const, completedAt: now, skippedAt: undefined, result }
              : item,
          );
          const completed = isDailySessionComplete(items);
          const daily = dailyState(state);
          const awardStreak = completed && !session.streakAwarded && daily.todayXp < state.dailyGoal;
          const updated: DailyLearningSession = {
            ...session,
            items,
            currentItemId: items.find((item) => item.status === 'pending')?.id,
            status: completed ? 'completed' : 'in-progress',
            startedAt: session.startedAt ?? now,
            completedAt: completed ? session.completedAt ?? now : undefined,
            streakAwarded: session.streakAwarded || completed,
            updatedAt: now,
          };
          return {
            ...daily,
            streak: state.streak + (awardStreak ? 1 : 0),
            dailyLearningSession: updated,
            dailyLearningHistory: upsertDailyHistory(state.dailyLearningHistory, updated, state.xp),
          };
        }),
      skipDailyLearningItem: (itemId) =>
        set((state) => {
          const session = state.dailyLearningSession;
          if (!session || session.date !== TODAY()) return state;
          const now = new Date().toISOString();
          const items = session.items.map((item) =>
            item.id === itemId && item.status !== 'completed'
              ? { ...item, status: 'skipped' as const, skippedAt: now }
              : item,
          );
          const updated: DailyLearningSession = {
            ...session,
            items,
            currentItemId: items.find((item) => item.status === 'pending')?.id,
            status: 'in-progress',
            startedAt: session.startedAt ?? now,
            updatedAt: now,
          };
          return {
            dailyLearningSession: updated,
            dailyLearningHistory: upsertDailyHistory(state.dailyLearningHistory, updated, state.xp),
          };
        }),
      resetProgress: () => set(defaultProgress),
      setLevel: (currentLevel) => set({ currentLevel }),
    }),
    {
      name: 'lingotalk-progress',
      version: CURRENT_PROGRESS_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: migrateProgress,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([, value]) => typeof value !== 'function'),
        ) as UserProgress,
    },
  ),
);
