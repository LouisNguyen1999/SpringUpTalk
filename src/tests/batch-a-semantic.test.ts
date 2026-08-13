import { describe, expect, it } from 'vitest';
import { findTurn } from '../data';
import { evaluateAnswer } from '../engine/answer-evaluator';

const criticalCases = [
  ['flooded-road-detour-c3-t4','If traffic stays steady, we will arrive at four twenty.'],
  ['motorbike-flat-tire-c3-t4','It will cost one hundred thousand dong, including labour.'],
  ['booking-an-intercity-bus-c1-t2','Yes. The first bus leaves at eight o’clock.'],
  ['asking-about-a-rental-deposit-c1-t2','The deposit is equal to three months’ rent.'],
  ['asking-about-a-rental-deposit-c2-t2','It will be returned within fourteen days after you move out.'],
  ['handling-a-production-incident-c1-t1','The alert shows that the payment failure rate has just exceeded twenty percent.'],
  ['explaining-a-release-delay-c3-t7','I will propose Friday morning rather than forcing a weekend release.'],
  ['checking-a-qr-payment-c1-t4','No. The bill for one hundred and fifty thousand dong is already shown.'],
  ['negotiating-apartment-damage-responsibility-c5-t3','You will cover the full floor replacement and up to five million dong for temporary accommodation.'],
  ['preparing-for-a-routine-checkup-c1-t2','Friday at eleven is available.'],
  ['collecting-a-prescription-c3-t2','The prescription contains five sealed packs.'],
  ['rescheduling-a-clinic-appointment-c4-t2','Your new appointment is Thursday at three.'],
  ['describing-a-migraine-at-a-clinic-c1-t6','Each episode lasts for about five hours.'],
  ['following-up-on-test-results-c3-t10','The duty clinician will call between two and five today.'],
  ['changing-a-transfer-limit-c1-t2','Your current daily limit is fifty million dong.'],
  ['understanding-bank-fees-c2-t2','The bank fee is five percent plus fifty thousand dong.'],
  ['requesting-a-merchant-refund-c2-t4','I would like a full refund of two million dong.'],
  ['correcting-a-wrong-bank-transfer-c1-t2','I transferred five million dong to the wrong recipient at ten fifteen.'],
  ['negotiating-a-refund-delay-c4-t2','The total refund is now two million two hundred and fifty thousand dong.'],
] as const;

describe('Batch A critical semantic values', () => {
  it.each(criticalCases)('rejects a changed value for %s', (turnId,answer) => {
    const item = findTurn(turnId);
    expect(item).toBeDefined();
    expect(evaluateAnswer(answer,item!.turn).status).toBe('incorrect');
  });
});
