# Writing Quality & Feedback Engine

SpringUpTalk evaluates Vietnamese-to-English writing locally and deterministically. The core path does not call an AI service or require a network connection.

## Evaluation pipeline

1. **Normalization** preserves teachable errors while normalizing safe Unicode, apostrophe, spacing and semantic-only variants.
2. **Structure** checks grammar targets, tense, subject–verb agreement, word order, articles, prepositions, pronouns, plural forms and sentence completeness.
3. **Meaning** checks required ideas, critical facts, polarity, time/number, state, sequence and cause/result direction. An unsupported addition is reported separately from a changed meaning.
4. **Naturalness** checks vocabulary choice, word form, collocation, connectors and less-natural expressions.

The result distinguishes `meaningPreserved`, `grammarTargetMet` and `vocabularyTargetMet`. A learner can therefore communicate the right meaning without being incorrectly marked as completely wrong for avoiding the target structure.

## Feedback disclosure

- Submit 1 shows only the error category.
- Hint 2 identifies the location.
- Hint 3 gives a short Vietnamese rule.
- The corrected sentence, word-aware diff and reference samples remain hidden until the learner selects **Xem cách sửa** or **Xem bài mẫu**.
- **Viết lại** supports unlimited retries.

## Mastery and review

Persistence schema V13 stores mastery for 16 Writing skills. Each skill stores attempts, correct/almost-correct/incorrect counts, recent accuracy, mastery score, last practice time and review due time.

Review priority remains due review → current unit → weak skill → new practice. A due Writing item normally selects a same-level, same-domain topic sharing a mastery skill but using another context (`variant-retry`). An exact retry is reserved for incorrect or meaning-changed attempts.

## Quality artifacts

- `writing_quality_report.json`: per-topic quality scores and duplicate-pattern audit.
- `writing_feedback_golden_report.json`: 14 evaluator scenarios for each of 500 topics.
- `src/data/writing/generated/writing-pedagogical-fingerprints.generated.json`: complete topic fingerprints.
- `src/data/writing/generated/writing-feedback-index.generated.json`: compact runtime review index.

Regenerate and validate:

```bash
npm run writing:quality:generate
npm run writing:quality:validate
npm run writing:feedback:golden
```

The quality report intentionally separates exact/near semantic duplication from writing-pattern and reasoning-pattern repetition. Repeated patterns are audit signals; they are not automatically treated as interchangeable topics because context, required facts and communicative goals may differ.
