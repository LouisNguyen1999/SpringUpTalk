# Writing Golden Set Report

Verified: 2026-08-19.

## Distribution

| Metric | Cases |
| --- | ---: |
| Total | 500 |
| Positive paraphrases | 300 |
| Critical negative cases | 200 |
| A1 | 100 |
| A2 | 130 |
| B1 | 150 |
| B2 | 120 |
| Daily Communication | 300 |
| IT Communication | 200 |

The dataset is authored as 20 reviewed semantic scenarios. Each scenario contains five expression banks, three register/connector presentations, and ten explicit critical contradictions. It covers active/passive, noun/verb, phrase/clause, register, sentence merge, lexical variants, state/polarity, number/time/location, cancellation versus delay, cause/result inversion and temporal reversal. The evaluator contains no case IDs or test-only branches.

## Result

```text
Positive golden cases: 300
Correctly accepted: 300
False negatives: 0
False-negative rate: 0.00%

Negative golden cases: 200
Correctly rejected/downgraded: 200
Critical false positives: 0
False-positive rate: 0.00%
```

Run the source-of-truth benchmark with:

```bash
npm run writing:golden
```

Expected statuses were not weakened during hardening. Failures were resolved in the reusable matcher or semantic data: scoped negation, clock-time normalization, cause direction, unit-aware values and explicit context-specific state expressions.

