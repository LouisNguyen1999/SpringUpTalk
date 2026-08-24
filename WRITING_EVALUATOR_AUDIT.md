# Writing Evaluator Audit

Audited: 2026-08-19.

## Outcome

The evaluator remains deterministic and frontend-only. It does not call an API, compare the paragraph to one sample, or claim to understand unrestricted English. Hardening focused on safe, reusable transformations and scoped critical checks.

## Semantic pipeline V2

1. Normalize punctuation, contractions, number words and common inflections.
2. Split the paragraph into sentences/clauses while also retaining whole-paragraph coverage.
3. Add high-confidence markers from the shared semantic pattern library (`notify`, `delay`, `fix`, `investigate`, `recover`, `rollback`, `reproduce`, and related Daily/IT concepts).
4. Match each required idea independently; sentence order and sentence count are not targets.
5. Classify each idea as `covered`, `partial`, `missing`, or `contradicted`.
6. Scope polarity and values to a relevant clause/anchor.
7. Protect number + unit pairs, state, cause/result direction and before/after relations before grammar affects the final status.

Sample answers are reference expressions only. The UI labels the first one **A natural example**, and sample similarity does not contribute to the score.

## Critical protections

- Positive/negative checks use the relevant expression rather than any `not` in the paragraph.
- Number checks compare number + unit, so an unrelated number cannot satisfy a duration.
- Cause/result checks parse direct and reverse connectors before using safe concept presence fallback.
- Delay/cancel, approved/rejected, online/offline, fixed/failed, reproduced/not reproduced and before/after remain distinct.
- Explicit topic-level `forbidden`, `criticalConcepts`, `contradictions`, and `anchors` are supported where general lexical inference would be unsafe.

## Product audit

All 500 topics were swept deterministically. A stratified 160-topic review used A1/A2/B1/B2 = 30/40/50/40 and Daily/IT = 100/60.

The baseline prompt template described the goal of a complete two-person conversation while required ideas represented one participant. This role/goal ambiguity affected the whole 160-topic sample. The generated Writing prompt now explicitly asks for one participant's perspective; the fix was applied consistently to all 500 Writing topics. No source Conversation Topic was edited.

The audit also found and fixed terminal punctuation duplication when a sample ended with punctuation inside a closing quote. No remaining over-constrained or under-constrained idea was found in the reviewed sample: each prompt explicitly lists the required ideas, while concepts preserve the authored accepted/natural alternatives.

## Review and mastery

V10 progress stores missing/partial idea kinds (`cause-explanation`, `time-details`, `action`, `outcome`, `future-plan`, `polite-request`) as lightweight weakness counts. Writing Review surfaces the most recurring weakness. Grammar issues reuse the existing mistake taxonomy.

Best attempt selection is ordered by meaning coverage, critical correctness, then grammar clarity. Repeated immediate retries remain unlimited but do not advance spaced mastery; a successful attempt qualifies only when the topic is new or due.

## Known limitations

- The semantic library intentionally covers curated, high-confidence language; unusual metaphors, implicit world knowledge and long-distance coreference can still be missed.
- Negation/relation scope is clause-based, not a full syntactic parse.
- Grammar feedback reports a few reliable rules and is not a general proofreader.
- “A natural example” is static authored content, not a generated rewrite of the learner's paragraph.

