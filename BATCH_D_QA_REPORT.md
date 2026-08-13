# Batch D QA report

Date: 2026-08-12. Final checkpoint: 500 topics.

## Result

Errors: 0

Warnings: 0

Audited warnings: 30 original CEFR warnings, all corrected as Type A content issues

Unaudited warnings: 0

The weighted manual sample covered 50 Batch D conversations: A1 10, A2 12, B1 14, B2 14. Every conversation was reviewed for realistic context, Vietnamese/English equivalence, CEFR length, grammar, role balance, factual continuity, learning-objective uniqueness, and natural progression. Result: 50/50 PASS.

## Reviewed conversations

### A1 — 10/10 PASS

`using-a-public-charging-point/c1`, `reporting-a-vending-machine-problem/c1`, `asking-for-a-queue-ticket/c2`, `checking-a-municipal-office-opening-time/c3`, `asking-about-recycling-day/c1`, `borrowing-a-household-tool/c2`, `checking-school-pickup-authorization/c3`, `reporting-a-wrong-locker-key/c1`, `asking-about-a-station-elevator/c2`, `reporting-a-missing-street-sign/c3`.

### A2 — 12/12 PASS

`correcting-a-name-on-a-booking/c1`, `asking-for-a-copy-of-a-receipt/c3`, `arranging-a-delivery-window/c2`, `collecting-a-public-service-document/c4`, `splitting-a-household-energy-bill/c3`, `asking-about-a-bank-transfer-fee/c4`, `replacing-a-damaged-debit-card/c2`, `recovering-missing-loyalty-points/c1`, `correcting-an-incorrect-warranty-date/c4`, `changing-an-intercity-bus-connection/c1`, `asking-about-embassy-document-requirements/c1`, `arranging-pickup-after-a-flight-diversion/c3`.

### B1 — 14/14 PASS

`resolving-a-double-booked-appointment/c1`, `following-up-on-a-repair-request/c2`, `disputing-a-service-waiting-time/c4`, `coordinating-a-last-minute-rota-change/c2`, `negotiating-a-rent-payment-date/c4`, `planning-care-during-a-caregiver-absence/c1`, `handling-a-delayed-home-repair/c3`, `resolving-a-shared-subscription-payment/c5`, `negotiating-a-replacement-for-a-discontinued-product/c2`, `responding-to-repeated-support-handoffs/c4`, `requesting-an-accessibility-accommodation-at-an-event/c1`, `rebooking-after-a-multi-leg-journey-disruption/c3`, `coordinating-community-heatwave-check-ins/c1`, `resolving-a-noise-complaint-at-a-public-event/c3`.

### B2 — 14/14 PASS

`negotiating-priority-service-after-a-delay/c1`, `negotiating-priority-service-after-a-delay/c5`, `resolving-conflicting-appointment-records/c5`, `disputing-an-unrecognized-account-charge/c4`, `negotiating-responsibility-for-shared-expenses/c4`, `mediating-a-cross-team-ownership-dispute/c3`, `giving-feedback-on-an-insensitive-remark/c4`, `challenging-a-decision-without-undermining-a-manager/c4`, `negotiating-confidentiality-boundaries/c3`, `repairing-trust-after-a-missed-commitment/c3`, `challenging-an-unsafe-crowd-management-plan/c2`, `mediating-a-dispute-over-a-community-resource/c2`, `negotiating-assistance-after-a-transport-strike/c1`, `coordinating-a-response-to-conflicting-emergency-alerts/c1`.

## Automated corpus QA

| Check | Result |
|---|---:|
| Topics | 500 |
| Conversations | 1,765 |
| Turns | 12,458 |
| Unique vocabulary/collocations | 5,948 |
| Average turns/conversation | 7.06 |
| Exact canonical duplicates | 0 |
| Normalized canonical duplicates | 0 |
| Exact Vietnamese duplicates | 0 |
| Duplicate sequences | 0 |
| Near-duplicate warnings | 0 |
| Structural warnings | 0 |
| Objective warnings | 0 |
| Canonical evaluator | 12,458/12,458 |
| Accepted evaluator | 21,821/21,821 |

## Application QA

- Typecheck, ESLint, content lint, build: PASS.
- Evaluator golden set: 300/300 cases PASS; reveal behavior tests PASS.
- Responsive Playwright: 19/19 PASS across 320, 360, 375, 390, 412, 430, 600, 768, 820, 1024, 1366, 1440, 1920, and landscape.
- Mobile feedback: one natural alternative visible; additional alternatives are collapsed under “Xem thêm”.
- Production PWA A/B/C: continue cached lesson offline PASS; reopen cached lesson offline PASS; uncached category shows graceful fallback PASS.
- Runtime content cache remains `StaleWhileRevalidate`, 80 entries, 30 days. No expansion was needed because chunks are category/set based rather than one cache entry per topic.
- Persistence stress: 250 completed roles, 100 completed conversations, 100 mistakes, 750 vocabulary records; 481,408 serialized bytes; warning false; full content persisted: NO.

## Performance

- Main application bundle: 79.99 KiB gzip (target <90 KiB).
- PWA precache: 22 entries, 1,019.68 KiB; Batch D content chunks remain runtime-cached.
- Largest Batch D content chunk: 24.26 KiB raw / 9.21 KiB gzip.
- Largest JS chunk: 583.18 KiB raw / 148.76 KiB gzip (existing progress/chart dependency chunk; Vite emits one non-blocking size advisory).
- Validator: 26.54 seconds wall time; 283,340 KiB peak RSS. Runtime is within the requested 25–30 second investigation band and grows proportionately from the 435-topic baseline.
