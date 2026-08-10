import { describe, expect, it } from 'vitest';
import { calculateLessonBonus, calculateTurnXp } from '../engine/xp-calculator';
import { isReviewDue, scheduleNextReview, scheduleReview, takeDueReviews } from '../engine/review-scheduler';
import { CURRENT_PROGRESS_VERSION, migrateProgress } from '../store/progress-store';

describe('XP calculator', () => {
  it('rewards first try and penalizes hints', () => { expect(calculateTurnXp({attempt:1,hintLevel:0,showedAnswer:false})).toBe(10); expect(calculateTurnXp({attempt:1,hintLevel:2,showedAnswer:false})).toBe(6); });
  it('gives only one XP for shown answers', () => expect(calculateTurnXp({attempt:1,hintLevel:0,showedAnswer:true})).toBe(1));
  it('adds a perfect lesson bonus', () => expect(calculateLessonBonus(true)).toBe(35));
});

describe('review scheduler', () => it('reintroduces an error after three turns', () => { const item=scheduleReview('turn-1',2); expect(takeDueReviews([item],4)).toEqual([]); expect(takeDueReviews([item],5)).toEqual([item]); }));

describe('calendar review scheduler', () => {
  const now = new Date('2026-08-10T00:00:00.000Z');
  it('makes a failed answer due immediately', () => {
    const result = scheduleNextReview(undefined, false, now);
    expect(result).toMatchObject({ mastery:'new', consecutiveCorrect:0, nextReviewAt:now.toISOString() });
    expect(isReviewDue({ attempts:1, correct:0, lastSeenAt:now.toISOString(), ...result }, now)).toBe(true);
  });
  it('expands intervals as consecutive mastery grows', () => {
    const learning = scheduleNextReview(undefined, true, now);
    const familiar = scheduleNextReview({ attempts:1, correct:1, lastSeenAt:now.toISOString(), ...learning }, true, now);
    const strong = scheduleNextReview({ attempts:2, correct:2, lastSeenAt:now.toISOString(), ...familiar }, true, now);
    expect(learning.mastery).toBe('learning');
    expect(familiar.mastery).toBe('familiar');
    expect(strong.mastery).toBe('strong');
    expect(Date.parse(strong.nextReviewAt) - now.getTime()).toBe(7 * 86_400_000);
  });
});

describe('persistence migration', () => it('fills new settings without dropping XP', () => { const migrated=migrateProgress({xp:42,settings:{heartsEnabled:false}},1); expect(migrated.xp).toBe(42); expect(migrated.settings.heartsEnabled).toBe(false); expect(migrated.version).toBe(CURRENT_PROGRESS_VERSION); }));
