# IT English Conversation Practice: Repository Audit and Design

## Phase A — Verified architecture findings

- **Technology:** React 19, TypeScript (strict), Vite, React Router, Zustand, lucide-react, CSS, and PWA support. Vitest/Testing Library cover unit and component behavior; Playwright covers browser journeys and responsive/offline behavior. `package.json`, `vite.config.ts`, `tsconfig.app.json`, `src/main.tsx`.
- **Architecture:** UI routes/pages call small domain engines and repositories; business rules are kept outside React where practical. Static conversation content is authored in TypeScript, indexed in a generated manifest, and loaded by category on demand. Existing route composition is lazy. `ARCHITECTURE.md`, `src/app/App.tsx`, `src/data/content-repository.ts`.
- **Existing learning flow:** learners browse `/topics`, open a topic, select a conversation, choose Person A/B, answer English prompts in a chat interface, receive deterministic feedback, retry, and complete both roles. The topic and role progress screens derive completion from saved role timestamps. `src/pages/TopicsPage.tsx`, `src/pages/TopicPage.tsx`, `src/pages/LessonPage.tsx`, `src/components/conversation/ConversationBubble.tsx`.
- **Content/evaluation:** content has typed topic/conversation/turn contracts and English canonical/accepted answer data. Normalization handles Unicode, case, punctuation, whitespace, and selected contractions. Existing similarity cannot itself approve a sentence; canonical/accepted matches or editor-authored semantic constraints are needed. `src/types/domain.ts`, `src/engine/sentence-normalizer/index.ts`, `src/engine/answer-evaluator/index.ts`, `ANSWER_EVALUATION.md`.
- **Persistence:** no backend, database, accounts, or authentication were found. At initial audit, Zustand persist wrote compact user-on-device progress to localStorage key `lingotalk-progress` at schema V13; implementation adds an additive V14 migration through `migrateProgress`. Therefore account-level isolation is not available: this application currently has one local profile per browser storage origin. `src/store/progress-store.ts`, `src/types/domain.ts`, `README.md`.
- **Audio/speech:** no existing playback, speech synthesis, or speech recognition implementation was found in application TypeScript. Browser speech APIs need feature detection and explicit fallback behavior.
- **Design/responsive/offline:** the shared shell has desktop sidebar and mobile bottom navigation; the app uses CSS breakpoints and a service worker runtime cache for lazy scripts. Route screens use shared card/button/progress styles. `src/components/common/AppShell.tsx`, `src/styles.css`, `vite.config.ts`.
- **Environment/configuration:** npm scripts expose tests, typecheck, lint, content validators, E2E, and build. The production build also validates existing conversation, vocabulary, and writing content. No environment secrets are needed for this feature.

## Existing tests and constraints

Relevant conventions are Vitest with jsdom/Testing Library, `src/tests/*`, and Playwright in `e2e/*`. Store migration and component flows already have direct coverage. The feature should not alter existing lesson evaluators, route behavior, content manifests, or saved legacy fields. New feature content/progress should use independent stable IDs and additive V14 migration fields.

Baseline commands requested before implementation: `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build`. All passed: 30 test files / 483 tests, typecheck exit 0, lint exit 0, and build exit 0. The build prints the existing report for 500 conversation topics and a warning about generated chunks above 500 kB. The test run took 161.53 seconds in this environment.

## Phase B — Feature design

1. Add a separate typed curriculum data module containing exactly 30 stable topics, grouped into four levels with objectives, duration, and ordered 8–12 turn dialogues. Keep this independent of the existing generated 500-topic conversation manifest.
2. Add a `/it-english` overview and `/it-english/:topicId` practice route with one conversation displayed as speaker-labelled chat bubbles. Topic states derive from completed sentence IDs: topic 1 begins available; a topic unlocks after the prior topic is complete.
3. Keep one active sentence at a time. Vietnamese stays visible as the prompt; English is conditionally rendered only after a pass or the third evaluated failure. Speaking uses feature-detected browser speech recognition and compares normalized word order plus coverage. It reports a sentence-match result, not pronunciation quality. Unsupported recognition leaves manual speaking practice plus Writing available. Writing requires equality after case, punctuation, and whitespace normalization; failures give generic feedback without revealing target words.
4. Add a pure progression/evaluation engine and unit tests. Add an optional `itEnglishProgress` record to `UserProgress`, migrate existing data additively to V14, and persist attempt counts, latest mode/result, pass status, and timestamps. This is local profile progress because the repository has no accounts.
5. Add a concise curriculum validation script or validator tests for count, unique IDs, required fields, turn count/order, and non-empty text. Add route/component tests for sequential unlock, retry, switching modes, and persisted progress.

## Integration points, risks, and open constraints

- Files likely to change: `src/app/App.tsx`, `src/components/common/AppShell.tsx`, `src/types/domain.ts`, `src/store/progress-store.ts`, `src/styles.css`; add `src/data/it-english/*`, `src/engine/it-english/*`, `src/pages/ITEnglishPage.tsx`, `src/pages/ITEnglishTopicPage.tsx`, and focused tests.
- Additive localStorage migration avoids resetting existing learning data. The new progress key must be separate from existing conversation/writing progress.
- Speech recognition support and quality vary by browser/device, and results may be noisy. The implementation must disclose transcript limitations, require high ordered similarity and word coverage, and allow retry or writing fallback.
- There is no user/account identity to isolate beyond the current browser's local profile. Cross-account guarantees require an authentication/backend change and are outside the current architecture.
- No unresolved repository issue blocks a safe implementation. No external speech provider or new framework/database is justified.

## Implemented evaluation and progression details

- Writing passes only on exact equality after the existing sentence normalizer removes case, punctuation, and repeated whitespace differences. Failure feedback is generic and word-level correction data is never rendered before reveal.
- Speaking uses browser speech recognition where available. A transcript passes at or above 0.90 ordered word similarity and 0.90 required word coverage, with polarity/opposite-meaning guards. The UI identifies this as transcript matching and does not claim to score pronunciation. Unsupported recognition leaves Writing available. No target audio is played before reveal.
- Evaluated attempts are shared across modes and persist in localStorage. Empty writing and empty/error speech recognition results do not count. The first two failures retain the hidden target; a pass reveals immediately; a third failure records `revealedAfterLimit` and advances sequential progression. The store refuses out-of-order and duplicate-after-completion submissions.
- A topic’s practice session begins on its first visit and remains the same session across reloads and mode changes. There is no separate restart action in the current app; a new local learning profile begins when the existing app progress reset is used. Existing passed sentences and retry counts are preserved through reloads.
- The conversation renders Vietnamese for all unrevealed turns. Revealed English is included in the DOM only for passed sentences or sentences marked `revealedAfterLimit`; failed transcript text and word correction arrays are withheld.
- Curriculum content is static and version-controlled; no database seed or backend change is needed. V14 migration only adds an empty `itEnglishProgress` field for legacy data.

## Baseline results

Initial baseline: `npm run test` — 483 passed; `npm run typecheck` — passed; `npm run lint` — passed; `npm run build` — passed with existing large-chunk warning.

## Final verification

- `npm test -- --maxWorkers=1` — 32 files, 501 tests passed.
- `npm run lint` — passed.
- `npm run typecheck` — passed directly and within the production build.
- `npm run it-english:validate` — passed; exactly 30 unique topics and complete ordered dialogues.
- `npm run build` — passed; existing warning remains for unrelated generated chunks over 500 kB.
- `npx playwright test e2e/it-english.spec.ts --workers=1` — 1 end-to-end journey passed, including hidden targets, retry persistence after reload, and topic progression.
- `git diff --check` — passed.
