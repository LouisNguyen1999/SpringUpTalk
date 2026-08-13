# Batch D0 — Accepted-answer audit

Audit date: 2026-08-12. Scope: the frozen 435-topic corpus before Batch D content expansion.

## Gate result

| Measure | Result | Gate |
|---|---:|---:|
| Baseline canonical-only flexible turns found | 1,594 | exact baseline |
| Baseline turns audited | 1,594 | 1,594 |
| Baseline turns remaining | 0 | 0 |
| Expanded with two context-preserving alternatives | 1,258 | reviewed |
| Justified fixed | 336 | reason required |
| V2 flexible turns | 2,820 | informational |
| V2 turns with 3+ accepted forms | 2,343 | informational |
| V2 justified-fixed turns | 477 | informational |
| Flexible coverage (3+ forms or fixed justification) | 100% | >=75% |
| Average accepted-answer depth | 2.669 | >=2.4 |

No evaluator similarity threshold, semantic constraint, polarity check, tense check, or critical-value rule was loosened. New forms are explicit accepted answers. Fixed cases retain one answer when a number, time, date, location, identifier, polarity, tense, or other critical semantic value makes generic paraphrasing unsafe.

## Deterministic baseline spot-check — 100 turns

This broader spot-check includes both expanded and deliberately fixed records. `E3` means the canonical plus two meaning-preserving alternatives passed review. `F1` means the canonical was deliberately fixed and its audit record contains a reason. All 100 retained the original proposition, actor/action, polarity, and critical values.

| # | Turn | Intent | Result |
|---:|---|---|---|
| 1 | changing-a-pickup-point-c1-t1 | changing-plans | F1 |
| 2 | driver-cannot-find-location-c1-t4 | clarifying | E3 |
| 3 | lost-parking-ticket-c2-t1 | clarifying | E3 |
| 4 | asking-about-a-rental-deposit-c3-t4 | requesting | E3 |
| 5 | requesting-building-maintenance-c3-t1 | requesting | E3 |
| 6 | negotiating-apartment-damage-responsibility-c1-t8 | clarifying | E3 |
| 7 | negotiating-apartment-damage-responsibility-c3-t7 | negotiating | E3 |
| 8 | clarifying-sprint-requirements-c1-t6 | clarifying | E3 |
| 9 | preparing-for-refinement-c1-t5 | clarifying | E3 |
| 10 | giving-code-review-feedback-c3-t4 | explaining | E3 |
| 11 | handling-a-production-incident-c5-t3 | explaining | E3 |
| 12 | explaining-a-release-delay-c3-t2 | suggesting | F1 |
| 13 | discussing-a-performance-review-c3-t1 | disagreeing-politely | E3 |
| 14 | correcting-an-account-number-c1-t2 | clarifying | E3 |
| 15 | tracing-a-pending-transaction-c3-t5 | requesting | F1 |
| 16 | reporting-an-atm-retained-card-c2-t2 | clarifying | E3 |
| 17 | reporting-an-atm-retained-card-c4-t5 | requesting | E3 |
| 18 | calling-a-delivery-driver-c2-t2 | changing-plans | F1 |
| 19 | discussing-a-phone-repair-quote-c3-t5 | clarifying | E3 |
| 20 | calling-parents-after-work-c2-t2 | explaining | E3 |
| 21 | preparing-for-tet-c2-t5 | clarifying | E3 |
| 22 | caring-for-a-sick-child-c2-t2 | negotiating | E3 |
| 23 | asking-a-pharmacist-for-advice-c2-t5 | clarifying | E3 |
| 24 | discussing-treatment-risks-c2-t2 | clarifying | E3 |
| 25 | weighing-privacy-tradeoffs-c1-t5 | clarifying | E3 |
| 26 | weighing-privacy-tradeoffs-c4-t2 | negotiating | E3 |
| 27 | splitting-a-restaurant-bill-c1-t5 | clarifying | E3 |
| 28 | explaining-a-food-allergy-c2-t2 | clarifying | E3 |
| 29 | negotiating-a-catering-plan-c1-t5 | clarifying | E3 |
| 30 | negotiating-a-catering-plan-c4-t2 | negotiating | F1 |
| 31 | reviewing-a-cultural-event-c2-t5 | disagreeing-politely | E3 |
| 32 | adjusting-a-workout-plan-c3-t2 | suggesting | E3 |
| 33 | arranging-laundry-pickup-c1-t5 | requesting | F1 |
| 34 | handling-a-shared-schedule-c2-t2 | negotiating | E3 |
| 35 | requesting-a-deadline-extension-c2-t5 | negotiating | E3 |
| 36 | negotiating-a-tour-change-c1-t2 | explaining | E3 |
| 37 | resolving-an-event-conflict-c1-t5 | clarifying | E3 |
| 38 | preparing-for-a-routine-checkup-c1-t2 | requesting | F1 |
| 39 | rescheduling-a-clinic-appointment-c3-t1 | clarifying | E3 |
| 40 | describing-a-migraine-at-a-clinic-c2-t5 | clarifying | E3 |
| 41 | discussing-medication-side-effects-c3-t1 | requesting | E3 |
| 42 | following-up-on-test-results-c2-t3 | clarifying | E3 |
| 43 | planning-a-return-to-work-after-illness-c3-t5 | clarifying | E3 |
| 44 | understanding-bank-fees-c2-t7 | explaining | E3 |
| 45 | asking-a-friend-to-repay-c1-t2 | requesting | E3 |
| 46 | asking-a-friend-to-repay-c3-t6 | negotiating | E3 |
| 47 | correcting-a-wrong-bank-transfer-c4-t1 | asking-follow-up | E3 |
| 48 | recovering-after-a-missed-class-c1-t2 | explaining | E3 |
| 49 | clarifying-teacher-feedback-c1-t5 | clarifying | E3 |
| 50 | coordinating-a-group-assignment-c3-t2 | clarifying | E3 |
| 51 | discussing-exam-results-c2-t5 | giving-feedback | E3 |
| 52 | handling-a-failed-file-upload-c2-t2 | clarifying | E3 |
| 53 | choosing-between-courses-c1-t5 | clarifying | E3 |
| 54 | handling-unequal-group-work-c4-t2 | disagreeing-politely | E3 |
| 55 | challenging-a-software-rollout-c3-t5 | disagreeing-politely | E3 |
| 56 | reviewing-digital-exam-proctoring-c1-t2 | clarifying | E3 |
| 57 | correcting-a-delivery-address-c1-t5 | clarifying | F1 |
| 58 | changing-a-hotel-reservation-c3-t2 | clarifying | F1 |
| 59 | handling-a-room-not-ready-c1-t5 | clarifying | F1 |
| 60 | requesting-a-late-checkout-c1-t2 | requesting | E3 |
| 61 | reporting-lost-luggage-c2-t5 | clarifying | E3 |
| 62 | cancelling-a-repair-appointment-c3-t2 | changing-plans | F1 |
| 63 | correcting-a-bad-haircut-c3-t5 | clarifying | E3 |
| 64 | resolving-a-hotel-billing-dispute-c4-t2 | negotiating | F1 |
| 65 | reporting-damaged-baggage-c4-t5 | negotiating | E3 |
| 66 | escalating-an-internet-provider-complaint-c5-t2 | asking-follow-up | E3 |
| 67 | returning-a-borrowed-household-item-c1-t5 | requesting | E3 |
| 68 | helping-a-new-neighbor-settle-in-c1-t2 | explaining | E3 |
| 69 | sharing-family-care-responsibilities-c3-t5 | negotiating | E3 |
| 70 | resolving-a-parking-space-dispute-c1-t2 | clarifying | E3 |
| 71 | negotiating-family-care-boundaries-c1-t5 | explaining | E3 |
| 72 | negotiating-family-care-boundaries-c4-t2 | negotiating | E3 |
| 73 | reviewing-a-community-safety-policy-c1-t5 | clarifying | F1 |
| 74 | leaving-a-voice-message-c1-t4 | requesting | E3 |
| 75 | asking-someone-to-call-back-c3-t4 | requesting | F1 |
| 76 | following-up-on-a-message-c2-t2 | asking-follow-up | E3 |
| 77 | asking-someone-to-speak-more-slowly-c1-t8 | requesting | E3 |
| 78 | correcting-a-text-misunderstanding-c2-t6 | handling-misunderstanding | F1 |
| 79 | changing-plans-by-text-c2-t4 | changing-plans | E3 |
| 80 | clarifying-what-someone-meant-c2-t2 | clarifying | E3 |
| 81 | apologizing-for-a-late-reply-c1-t8 | apologizing | F1 |
| 82 | following-up-by-email-c1-t6 | asking-follow-up | F1 |
| 83 | resolving-a-misread-message-c1-t4 | resolving-conflict | E3 |
| 84 | resolving-a-misread-message-c4-t4 | resolving-conflict | E3 |
| 85 | choosing-a-karaoke-song-c3-t2 | suggesting | F1 |
| 86 | changing-a-workout-schedule-c4-t2 | changing-plans | F1 |
| 87 | cancelling-a-sports-booking-c3-t8 | requesting | F1 |
| 88 | handling-an-event-postponement-c4-t6 | changing-plans | E3 |
| 89 | negotiating-a-team-dinner-plan-c3-t8 | negotiating | E3 |
| 90 | asking-for-an-update-at-work-c1-t8 | asking-follow-up | F1 |
| 91 | clarifying-client-requirements-c2-t6 | clarifying | F1 |
| 92 | asking-for-more-context-at-work-c2-t4 | clarifying | E3 |
| 93 | managing-conflicting-priorities-c1-t10 | negotiating | F1 |
| 94 | managing-conflicting-priorities-c4-t10 | negotiating | E3 |
| 95 | negotiating-project-resources-c2-t10 | negotiating | E3 |
| 96 | negotiating-project-resources-c5-t10 | negotiating | E3 |
| 97 | handling-a-scope-change-c3-t10 | negotiating | E3 |
| 98 | pushing-back-on-an-urgent-request-c1-t10 | disagreeing-politely | F1 |
| 99 | pushing-back-on-an-urgent-request-c4-t10 | disagreeing-politely | F1 |
| 100 | giving-difficult-feedback-c2-t10 | giving-feedback | E3 |

## Original CEFR-length warning audit

All 30 original warnings were A1 response turns generated by the old Batch B guided helper. They appeared in six topics: `renting-a-motorbike-abroad`, `correcting-a-delivery-address`, `returning-a-parcel`, `helping-parents-use-video-calls`, `checking-in-with-building-security`, and `returning-a-borrowed-household-item` (five warnings each).

Classification: 30 Type A content problems, 0 Type B legitimate exceptions. The helper now chooses compact A1 actions tied to each scenario focus. Re-running the unchanged CEFR ranges reports 0 outliers.

## Automated evidence

- Golden evaluator: 300 curated answer cases; 300/300 pass (plus two reveal-behavior checks).
- Dataset evaluator: 10,384/10,384 canonical and 16,309/16,309 explicit accepted forms pass at the 435-topic checkpoint.
- Regression test asserts the exact 1,594 baseline, zero missing statuses, non-empty fixed reasons, normalized uniqueness, at least 75% coverage, and depth at least 2.4.

## Required manual QA — 100 expanded flexible turns

A second deterministic sample was taken only from the 1,258 expanded baseline records, evenly across stable corpus order. Each case passed grammar, naturalness, semantic equivalence, register, critical-value preservation, normalized uniqueness, and over-accept review. Result: 100/100 PASS.

```text
001 changing-a-pickup-point-c1-t2
002 driver-cannot-find-location-c1-t5
003 lost-parking-ticket-c2-t1
004 asking-about-a-rental-deposit-c3-t5
005 requesting-building-maintenance-c3-t3
006 negotiating-apartment-damage-responsibility-c1-t8
007 negotiating-apartment-damage-responsibility-c3-t6
008 clarifying-sprint-requirements-c1-t5
009 preparing-for-refinement-c1-t3
010 giving-code-review-feedback-c3-t1
011 giving-code-review-feedback-c4-t7
012 explaining-a-release-delay-c2-t5
013 explaining-a-release-delay-c4-t6
014 checking-a-qr-payment-c3-t5
015 tracing-a-pending-transaction-c3-t3
016 reporting-an-atm-retained-card-c2-t1
017 reporting-an-atm-retained-card-c4-t4
018 exchanging-currency-c2-t6
019 discussing-a-phone-repair-quote-c3-t4
020 calling-parents-after-work-c2-t3
021 preparing-for-tet-c2-t3
022 caring-for-a-sick-child-c3-t1
023 comparing-dental-treatments-c1-t3
024 discussing-treatment-risks-c2-t4
025 weighing-privacy-tradeoffs-c1-t5
026 weighing-privacy-tradeoffs-c4-t2
027 splitting-a-restaurant-bill-c1-t3
028 splitting-a-restaurant-bill-c3-t4
029 explaining-a-food-allergy-c3-t5
030 negotiating-a-catering-plan-c3-t2
031 reviewing-a-cultural-event-c1-t4
032 reviewing-a-cultural-event-c3-t4
033 discussing-injury-limitations-c2-t1
034 planning-weekend-errands-c3-t5
035 requesting-a-deadline-extension-c1-t3
036 handling-a-delayed-flight-c3-t1
037 negotiating-a-tour-change-c3-t1
038 resolving-an-event-conflict-c2-t2
039 preparing-for-a-routine-checkup-c1-t5
040 rescheduling-a-clinic-appointment-c3-t7
041 describing-a-migraine-at-a-clinic-c4-t2
042 discussing-medication-side-effects-c3-t2
043 following-up-on-test-results-c2-t3
044 planning-a-return-to-work-after-illness-c3-t2
045 understanding-bank-fees-c2-t3
046 asking-a-friend-to-repay-c1-t1
047 asking-a-friend-to-repay-c3-t5
048 correcting-a-wrong-bank-transfer-c3-t7
049 negotiating-a-refund-delay-c3-t7
050 clarifying-teacher-feedback-c1-t6
051 coordinating-a-group-assignment-c3-t1
052 discussing-exam-results-c2-t6
053 handling-a-failed-file-upload-c2-t1
054 choosing-between-courses-c1-t2
055 handling-unequal-group-work-c3-t3
056 challenging-a-software-rollout-c1-t4
057 challenging-a-software-rollout-c4-t5
058 reviewing-digital-exam-proctoring-c1-t6
059 changing-a-hotel-reservation-c2-t6
060 handling-a-room-not-ready-c2-t2
061 requesting-a-late-checkout-c3-t1
062 reporting-lost-luggage-c4-t3
063 cancelling-a-repair-appointment-c3-t5
064 correcting-a-bad-haircut-c3-t6
065 resolving-a-hotel-billing-dispute-c4-t3
066 reporting-damaged-baggage-c4-t4
067 escalating-an-internet-provider-complaint-c5-t1
068 returning-a-borrowed-household-item-c1-t1
069 reporting-a-broken-elevator-c3-t4
070 sharing-family-care-responsibilities-c1-t6
071 discussing-household-expenses-c2-t6
072 negotiating-family-care-boundaries-c1-t1
073 negotiating-family-care-boundaries-c3-t1
074 handling-a-disagreement-about-childcare-c3-t4
075 leaving-a-voice-message-c1-t4
076 asking-someone-to-repeat-c2-t4
077 asking-someone-to-speak-more-slowly-c1-t8
078 correcting-a-text-misunderstanding-c3-t6
079 changing-plans-by-text-c4-t2
080 clarifying-what-someone-meant-c3-t4
081 apologizing-for-a-late-reply-c4-t4
082 resolving-a-misread-message-c2-t2
083 resolving-a-misread-message-c4-t8
084 changing-a-workout-schedule-c3-t2
085 handling-an-event-postponement-c4-t6
086 negotiating-a-team-dinner-plan-c4-t2
087 asking-for-an-update-at-work-c3-t6
088 asking-for-more-context-at-work-c1-t2
089 asking-for-more-context-at-work-c4-t4
090 managing-conflicting-priorities-c4-t4
091 negotiating-project-resources-c2-t10
092 negotiating-project-resources-c5-t4
093 handling-a-scope-change-c2-t10
094 handling-a-scope-change-c5-t4
095 pushing-back-on-an-urgent-request-c3-t10
096 giving-difficult-feedback-c2-t4
097 giving-difficult-feedback-c4-t8
098 rebooking-a-missed-connection-c4-t6
099 handling-a-train-cancellation-c4-t4
100 handling-hotel-overbooking-c4-t2
```
