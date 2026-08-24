# Writing Practice Coverage Report

Generated and verified: 2026-08-19.

## Content

| Metric | Result |
| --- | ---: |
| Writing Topics | 500 |
| Daily Communication | 300 |
| IT/Work Communication | 200 |
| A1 | 96 |
| A2 | 137 |
| B1 | 162 |
| B2 | 105 |
| Average required ideas | 3.34 |
| Critical-fact topic coverage | 9.6% |
| Sample answers | 1,030 |
| Exact/normalized duplicates | 0 |
| Near duplicates at 0.88 threshold | 0 |

IT content is sourced only from real `Work`, `Technology`, and `Business` conversations; it is not a relabeling of health, banking, travel, or other daily scenarios.

## Evaluator and QA

All 500 topics pass deterministic validation, including required ideas, critical facts, semantic pattern references and sample-answer semantic coverage. Manual product review covered 160 topics: A1/A2/B1/B2 = 30/40/50/40 and Daily/IT = 100/60. It found a baseline template ambiguity between the full conversation goal and one participant's selected ideas; all Writing prompts now state the one-participant perspective explicitly. Duplicate punctuation after closing quotes was also fixed.

The 500-case golden set contains 300 positive paraphrases and 200 critical negatives. Results: 0 false negatives and 0 critical false positives.

Persistence stress with 250 attempted Writing topics × 3 attempts, 5,950 vocabulary progress rows and 500 conversation progress rows serializes to 2,625,950 bytes (2.50 MiB), below a conservative 5 MiB budget.

## Performance

| Asset | Before | After |
| --- | ---: | ---: |
| Main JS | 252.16 kB / 81.32 kB gzip | 256.48 kB / 82.54 kB gzip |
| Writing Practice page + evaluator | — | 22.91 kB / 8.72 kB gzip |
| Writing manifest/repository lazy chunk | — | 199.83 kB / 35.25 kB gzip |
| Writing content shards | — | 10 chunks, 146.40–196.46 kB |
| Largest Writing content chunk | — | 196.46 kB / 22.85 kB gzip |

The main JS increase from the pre-Writing baseline is about 4.32 kB. The semantic evaluator stays in the lazy Writing page chunk, and no NLP dependency was added. Full Writing content is not included in the initial bundle; an opened shard enters the PWA runtime cache.

Evaluator warm p95 is 7.501 ms for A1 (38 words), 9.223 ms for A2 (55 words), 16.809 ms for B1 (88 words), and 10.816 ms for a long B2 paragraph (131 words). No heavy NLP dependency was added.
