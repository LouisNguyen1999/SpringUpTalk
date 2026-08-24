import { beforeEach, describe, expect, it } from 'vitest';
import { buildDailyLearningSession, dailyItemKey } from '../engine/daily-learning';
import type { DailyLearningCatalog } from '../engine/daily-learning';
import { CURRENT_PROGRESS_VERSION, defaultProgress, migrateProgress, useProgressStore } from '../store/progress-store';

const catalog: DailyLearningCatalog = {
  conversations: [{ id: 'topic', title: 'Topic', titleVi: 'Chủ đề', description: '', category: 'Daily Life', icon: '💬', level: 'A1', grammar: [], vocabularyTags: [], conversationCount: 3 }],
  vocabulary: Array.from({ length: 8 }, (_, index) => ({ id: `vocab:${index}`, term: `word ${index}`, normalizedTerm: `word ${index}`, shortMeaning: '', cefr: 'A1' as const, type: 'word' as const, tags: [], practiceCount: 5, shard: 0 })),
  writing: [{ id: 'writing:1', titleEnglish: 'Write', titleVietnamese: 'Viết', category: 'Daily Life', domain: 'daily-life', level: 'A1', keywords: [], shard: 0 }],
};

describe('daily learning persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState(structuredClone(defaultProgress));
  });

  it('migrates V10 with compact Daily defaults', () => {
    const migrated = migrateProgress({ ...defaultProgress, dailyLearningPreferences: undefined, dailyLearningHistory: undefined }, 10);
    expect(migrated.version).toBe(CURRENT_PROGRESS_VERSION);
    expect(migrated.dailyLearningPreferences).toEqual({ mode: 'standard', focus: 'balanced' });
    expect(migrated.dailyLearningHistory).toEqual([]);
  });

  it('restores the same session and current item after several completed activities', () => {
    const session = buildDailyLearningSession(useProgressStore.getState(), defaultProgress.dailyLearningPreferences, catalog, new Date());
    useProgressStore.getState().saveDailyLearningSession(session);
    for (const item of session.items.slice(0, 3)) useProgressStore.getState().completeDailyLearningItem(item.id, { firstTryCorrect: true });
    const saved = structuredClone(useProgressStore.getState().dailyLearningSession!);
    useProgressStore.setState({ dailyLearningSession: saved });
    expect(useProgressStore.getState().dailyLearningSession?.id).toBe(session.id);
    expect(useProgressStore.getState().dailyLearningSession?.items.filter((item) => item.status === 'completed')).toHaveLength(3);
    expect(useProgressStore.getState().dailyLearningSession?.currentItemId).toBe(session.items[3]?.id);
  });

  it('regenerates without turning a completed item back into unfinished content', () => {
    const state = useProgressStore.getState();
    const session = buildDailyLearningSession(state, state.dailyLearningPreferences, catalog, new Date());
    state.saveDailyLearningSession(session);
    const completed = session.items[0]!;
    useProgressStore.getState().completeDailyLearningItem(completed.id);
    const regenerated = buildDailyLearningSession(useProgressStore.getState(), { mode: 'focus', focus: 'balanced' }, catalog, new Date());
    useProgressStore.getState().saveDailyLearningSession(regenerated, true);
    const matching = useProgressStore.getState().dailyLearningSession?.items.find((item) => dailyItemKey(item) === dailyItemKey(completed));
    expect(matching?.status).not.toBe('pending');
  });

  it('stores skipped separately and does not award streak or completion', () => {
    const session = buildDailyLearningSession(useProgressStore.getState(), defaultProgress.dailyLearningPreferences, catalog, new Date());
    useProgressStore.getState().saveDailyLearningSession(session);
    useProgressStore.getState().skipDailyLearningItem(session.items[0]!.id);
    expect(useProgressStore.getState().dailyLearningSession?.items[0]?.status).toBe('skipped');
    expect(useProgressStore.getState().dailyLearningSession?.status).toBe('in-progress');
    expect(useProgressStore.getState().streak).toBe(0);
  });

  it('awards Daily streak once without adding duplicate module XP', () => {
    const session = buildDailyLearningSession(useProgressStore.getState(), defaultProgress.dailyLearningPreferences, catalog, new Date());
    session.items = [session.items.find((item) => item.target === 'vocabulary')!];
    session.currentItemId = session.items[0]?.id;
    useProgressStore.setState({ xp: 10, todayXp: 10, dailyGoal: 20, streak: 0 });
    useProgressStore.getState().saveDailyLearningSession(session);
    useProgressStore.getState().completeDailyLearningItem(session.items[0]!.id, { firstTryCorrect: true });
    expect(useProgressStore.getState()).toMatchObject({ xp: 10, todayXp: 10, streak: 1 });
    useProgressStore.getState().completeDailyLearningItem(session.items[0]!.id, { firstTryCorrect: true });
    expect(useProgressStore.getState().streak).toBe(1);
  });

  it('archives yesterday compactly when a new local-day session is saved', () => {
    const yesterday = new Date(2026, 7, 18, 9);
    const today = new Date(2026, 7, 19, 9);
    const oldSession = buildDailyLearningSession(useProgressStore.getState(), defaultProgress.dailyLearningPreferences, catalog, yesterday);
    useProgressStore.getState().saveDailyLearningSession(oldSession);
    const newSession = buildDailyLearningSession(useProgressStore.getState(), defaultProgress.dailyLearningPreferences, catalog, today);
    useProgressStore.getState().saveDailyLearningSession(newSession);
    expect(useProgressStore.getState().dailyLearningSession?.date).toBe(newSession.date);
    expect(useProgressStore.getState().dailyLearningHistory.at(-1)).toMatchObject({ date: oldSession.date, planned: oldSession.items.length });
    expect(JSON.stringify(useProgressStore.getState().dailyLearningHistory)).not.toContain('titleEnglish');
  });
});
