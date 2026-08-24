# Daily Learning Engine

## Purpose

Daily Learning is a deterministic orchestration layer. It answers “what should I practice today?” from existing progress and lightweight manifests, then opens the original Conversation, Vocabulary, or Writing UI. It does not own evaluation, mastery, review dates, or static content.

```text
Progress + due dates + mistakes + mastery
                    ↓
          Daily Learning Engine
                    ↓
       ordered ID/reference session
                    ↓
 Conversation / Vocabulary / Writing
                    ↓
        compact history + summary
```

## Session generation

Priority is deterministic:

1. overdue review;
2. repeated mistakes;
3. missing Conversation role and weak mastery;
4. in-progress work;
5. level-compatible new content;
6. a date-seeded deterministic tie-break and variety ordering.

Due review receives the highest score. Overdue days, mistake count, low Vocabulary accuracy, Writing weakness count, and the selected focus add score. Recent new content receives a seven-day cooldown penalty; due review may repeat. New content is normally capped at 40% when non-new candidates exist.

Conversation selection uses manifest IDs and always ranks a missing Person A/B role above a new conversation. Vocabulary selection reuses its mastery and `nextReviewAt`. Writing selection reuses `weaknessCounts`, mastery, and `nextReviewAt`. New content never exceeds the learner's level.

Vocabulary is arranged into mini-blocks and interleaved with Conversation/Writing when the candidate mix permits it.

## Modes and preferences

| Mode | Target | Nominal capacity |
| --- | ---: | ---: |
| Quick | ~10 minutes | 8 activities |
| Standard | ~20 minutes | 15 activities |
| Focus | ~30 minutes | 23 activities |

`Balanced`, `Conversation`, `Vocabulary`, and `Writing` adjust target quotas and scores. A completely new learner receives a smaller onboarding session: one Conversation role, five basic Vocabulary items, and one short Writing topic. Backlog-heavy sessions can use their full capacity for due review instead of forcing new content.

## Completion, skip, XP, and streak

A session is complete when:

- at least 70% of planned activities are completed;
- every skill type present in the plan has at least one completed activity;
- every mandatory due-review activity selected for the session is completed.

Skipped activities remain `skipped`, do not count toward completion, do not change mastery, and can be recommended later.

The original module grants its normal XP exactly once. Daily Learning grants no per-item XP and therefore cannot duplicate rewards. If the existing XP goal has not already awarded today's streak, completing the Daily rule awards it once; `streakAwarded` prevents regenerate/reload farming.

## Persistence and rollover

Progress schema V12 stores the same Daily references introduced in V11:

- preferences;
- one current session with content references and item states;
- current item, timestamps, status, and compact result metrics;
- at most 90 compact daily history rows.

No Topic, Conversation, Vocabulary, or Writing definition is duplicated. A refresh restores the same dated session. Regenerate preserves completed/skipped states for matching references. A new local calendar date archives the previous session and creates a new one; it does not use UTC-midnight slicing.

## Summary

The completion screen derives counts, first-try accuracy, Vocabulary mastery changes, Writing result, XP, recurring issue labels, tomorrow's scheduled review count, and seven-day history from stored module results. It does not generate AI insights.

## Offline and loading

The engine only scans lightweight manifests. Full static content is lazy-loaded by the original repository when an activity opens. A generated session is local and remains available offline. Previously cached activity shards continue normally; an uncached shard uses the module's typed offline fallback rather than a blank screen.

## Verification commands

```bash
npm run daily:benchmark
npm run daily:stress
npm run test
npm run test:e2e
npm run test:e2e:pwa
```

The stress scenario includes 500 Conversation progress rows, 5,950 Vocabulary rows, 250 Writing topics with three retained attempts, a 23-item Daily session, and 90 days of compact Daily history.

Latest measured verification on the project machine:

- generation median 10.134 ms, p95 19.804 ms;
- persistence stress 2.38 MiB, below the conservative 5 MiB budget;
- main bundle 260.98 kB / 83.74 kB gzip;
- lazy Daily scoring chunk 6.39 kB / 2.29 kB gzip;
- lazy Daily page chunk 9.92 kB / 3.45 kB gzip;
- 457/457 unit/integration, 33/33 browser E2E, and 1/1 production PWA E2E passed.

## Known limitations

- Estimated minutes are activity-based, not a timer.
- Browser-local progress has no cross-device sync.
- Offline use of a never-opened lazy content shard depends on the original module fallback; Daily Learning does not eagerly cache all content.
- Weekly “strongest/needs practice” prose is intentionally omitted until enough clean multi-day data exists; the seven-day counts remain available.
