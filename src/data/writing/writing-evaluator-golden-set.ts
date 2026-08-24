import type { Difficulty, WritingEvaluationStatus, WritingPracticeTopic } from '../../types/domain';

export interface WritingGoldenCase {
  id: string;
  topicId: string;
  topic: WritingPracticeTopic;
  userAnswer: string;
  expectedStatus: WritingEvaluationStatus;
  expectedCoveredIdeas: string[];
  expectedMissingIdeas: string[];
  expectedContradictions: string[];
  polarity: 'positive' | 'negative';
  reason: string;
}

interface Scenario {
  id: string;
  title: string;
  titleVi: string;
  prompt: string;
  ideas: Array<{
    id: string;
    label: string;
    variants: [string, string, string, string, string];
    kind: NonNullable<WritingPracticeTopic['requiredIdeas'][number]['kind']>;
  }>;
  criticalFacts: WritingPracticeTopic['criticalFacts'];
  negatives: Array<{ answer: string; reason: string }>;
}

const scenarios: Scenario[] = [
  {
    id: 'daily-notify-manager', title: 'Running late', titleVi: 'Báo đi làm trễ',
    prompt: 'Tôi báo quản lý rằng mình sẽ đến trễ 20 phút và sẽ bù thời gian.',
    ideas: [
      { id: 'notify', label: 'báo quản lý', kind: 'action', variants: ['I told my manager', 'I informed my supervisor', 'I let my boss know', 'My manager was notified', 'I gave my team lead notice'] },
      { id: 'late', label: 'đến trễ 20 phút', kind: 'time-details', variants: ['that I would be 20 minutes late', 'I was running twenty minutes late', 'about my 20-minute delay', 'that my arrival would be twenty minutes late', 'I would not arrive on time and would be 20 minutes late'] },
      { id: 'plan', label: 'bù thời gian', kind: 'future-plan', variants: ['and I will make up the time', 'and I plan to stay later', 'I will work an extra twenty minutes', 'and the lost time will be made up', 'I intend to work longer today'] },
    ],
    criticalFacts: [{ id: 'duration', labelVietnamese: '20 phút', type: 'time', expected: ['20 minutes', 'twenty minutes'], anchors: ['late', 'delay', 'arrival'] }],
    negatives: [
      { answer: 'I told my manager that I would be two hours late and would stay later.', reason: 'wrong duration' },
      { answer: 'My supervisor knows I am 30 minutes late, and I will make up the time.', reason: 'number changed' },
      { answer: 'I let my boss know about my ten-minute delay and offered to work longer.', reason: 'number changed' },
      { answer: 'I will arrive an hour late; my manager was notified and I will stay later.', reason: 'wrong duration' },
      { answer: 'I informed my manager that I was five minutes late and would make up the time.', reason: 'number changed' },
      { answer: 'My team lead was told that my delay would be forty minutes, so I will work longer.', reason: 'number changed' },
      { answer: 'I told my boss I would be 25 minutes late and would compensate for it.', reason: 'number changed' },
      { answer: 'I notified my supervisor about a ninety-minute delay and planned to stay.', reason: 'wrong duration' },
      { answer: 'I was fifteen minutes late, informed my manager, and offered to stay later.', reason: 'number changed' },
      { answer: 'I gave my manager notice that I would arrive 45 minutes late and work extra.', reason: 'number changed' },
    ],
  },
  {
    id: 'daily-traffic-cause', title: 'Heavy traffic', titleVi: 'Kẹt xe',
    prompt: 'Kẹt xe nghiêm trọng khiến tôi đến chỗ làm trễ.',
    ideas: [
      { id: 'traffic', label: 'kẹt xe nghiêm trọng', kind: 'cause-explanation', variants: ['Heavy traffic', 'A bad traffic jam', 'Road congestion', 'Being stuck in traffic', 'The unusually heavy traffic'] },
      { id: 'cause', label: 'kẹt xe là nguyên nhân', kind: 'cause-explanation', variants: ['made me arrive late', 'caused my delay', 'was why I was late', 'prevented me from arriving on time', 'resulted in me running late'] },
      { id: 'work', label: 'đến chỗ làm trễ', kind: 'outcome', variants: ['for work', 'at the office', 'to my workplace', 'when I got to work', 'for my shift'] },
    ],
    criticalFacts: [{ id: 'cause', labelVietnamese: 'kẹt xe gây đến trễ', type: 'cause-result', expected: ['traffic caused lateness'], cause: ['heavy traffic', 'traffic jam', 'congestion'], result: ['late for work', 'arrive late', 'delay'] }],
    negatives: [
      { answer: 'Being late for work caused heavy traffic.', reason: 'cause/result inverted' },
      { answer: 'My delayed arrival made the roads congested.', reason: 'cause/result inverted' },
      { answer: 'I was late, and that resulted in a traffic jam.', reason: 'cause/result inverted' },
      { answer: 'My late shift caused unusually heavy traffic.', reason: 'cause/result inverted' },
      { answer: 'Arriving after everyone else made the traffic heavy.', reason: 'cause/result inverted' },
      { answer: 'My delay at work led to road congestion.', reason: 'cause/result inverted' },
      { answer: 'I got to the office late, which caused the traffic jam.', reason: 'cause/result inverted' },
      { answer: 'The fact that I ran late resulted in heavy traffic.', reason: 'cause/result inverted' },
      { answer: 'My failure to arrive on time made the roads busy.', reason: 'cause/result inverted' },
      { answer: 'A late arrival at work caused congestion on the road.', reason: 'cause/result inverted' },
    ],
  },
  {
    id: 'daily-reschedule', title: 'Move an appointment', titleVi: 'Dời lịch hẹn',
    prompt: 'Tôi xin dời lịch hẹn từ thứ Ba sang thứ Tư lúc 3 giờ chiều.',
    ideas: [
      { id: 'request', label: 'xin dời lịch', kind: 'polite-request', variants: ['Could we reschedule my appointment', 'Can we move the appointment', 'I would like to change my booking', 'Would it be possible to move our meeting', 'I am asking to reschedule the appointment'] },
      { id: 'from', label: 'không còn vào thứ Ba', kind: 'time-details', variants: ['from Tuesday', 'instead of Tuesday', 'currently set for Tuesday', 'which is booked on Tuesday', 'away from its Tuesday slot'] },
      { id: 'to', label: 'sang thứ Tư lúc 3 giờ chiều', kind: 'time-details', variants: ['to Wednesday at 3 p.m.', 'for 3 p.m. on Wednesday', 'and make it Wednesday at three in the afternoon', 'so it takes place Wednesday at 3 p.m.', 'with a new time of three in the afternoon on Wednesday'] },
    ],
    criticalFacts: [
      { id: 'new-time', labelVietnamese: '3 giờ chiều', type: 'time', expected: ['3 p.m.'], anchors: ['Wednesday', 'new time'] },
      { id: 'new-day', labelVietnamese: 'thứ Tư', type: 'state', expected: ['Wednesday'], forbidden: ['Thursday', 'Friday', 'Monday'] },
    ],
    negatives: [
      { answer: 'Could we move my Tuesday appointment to Wednesday at 5 p.m.?', reason: 'wrong time' },
      { answer: 'I would like to reschedule from Tuesday to Thursday at 3 p.m.', reason: 'wrong day' },
      { answer: 'Can we move the booking to Wednesday at 9 a.m. instead of Tuesday?', reason: 'wrong time' },
      { answer: 'Please change Tuesday to Friday at 3 p.m.', reason: 'wrong day' },
      { answer: 'Would Wednesday at 4 p.m. work instead of Tuesday?', reason: 'wrong time' },
      { answer: 'I need to move the Tuesday meeting to Monday at 3 p.m.', reason: 'wrong day' },
      { answer: 'Could the appointment be changed to Wednesday at 1 p.m.?', reason: 'wrong time' },
      { answer: 'Please reschedule my appointment from Tuesday to Thursday at three.', reason: 'wrong day' },
      { answer: 'I am asking for Wednesday at 6 p.m. rather than Tuesday.', reason: 'wrong time' },
      { answer: 'Move my Tuesday slot to Friday at 3 p.m., please.', reason: 'wrong day' },
    ],
  },
  {
    id: 'daily-refund', title: 'Request a refund', titleVi: 'Yêu cầu hoàn tiền',
    prompt: 'Món hàng bị lỗi nên tôi yêu cầu cửa hàng hoàn tiền.',
    ideas: [
      { id: 'item', label: 'món hàng bị lỗi', kind: 'cause-explanation', variants: ['The item is defective', 'The product has a fault', 'What I bought is broken', 'There is a problem with the item', 'The product does not work'] },
      { id: 'request', label: 'yêu cầu hoàn tiền', kind: 'polite-request', variants: ['so I requested a refund', 'and I asked for my money back', 'so I would like to be reimbursed', 'I therefore asked the store to refund me', 'and I requested repayment'] },
      { id: 'store', label: 'liên hệ cửa hàng', kind: 'action', variants: ['from the store', 'from the shop', 'from the seller', 'and contacted customer service', 'through the retailer'] },
    ],
    criticalFacts: [{ id: 'resolution', labelVietnamese: 'hoàn tiền, không phải đổi hàng', type: 'state', expected: ['refund', 'money back', 'reimbursed'], forbidden: ['exchange only', 'replacement only', 'store credit only'] }],
    negatives: [
      { answer: 'The item is defective, so I asked the store for an exchange only.', reason: 'refund changed to exchange' },
      { answer: 'I contacted the shop because the product was broken and requested a replacement only.', reason: 'wrong resolution' },
      { answer: 'The faulty item should be replaced; I only want another product.', reason: 'wrong resolution' },
      { answer: 'Customer service offered store credit only for the defective item.', reason: 'refund changed to credit' },
      { answer: 'The product does not work, but I asked for an exchange only.', reason: 'wrong resolution' },
      { answer: 'I reported the fault and requested a replacement only from the seller.', reason: 'wrong resolution' },
      { answer: 'Instead of money back, I requested store credit only for the broken item.', reason: 'refund contradicted' },
      { answer: 'I contacted the retailer to exchange the defective item only.', reason: 'wrong resolution' },
      { answer: 'The shop should give me a replacement only because the product failed.', reason: 'wrong resolution' },
      { answer: 'For the faulty item, I asked customer service for store credit only.', reason: 'refund changed to credit' },
    ],
  },
  {
    id: 'daily-bank-transfer', title: 'Bank transfer', titleVi: 'Chuyển khoản',
    prompt: 'Tôi đã chuyển tiền cho Lan và giao dịch thành công.',
    ideas: [
      { id: 'transfer', label: 'đã chuyển tiền', kind: 'action', variants: ['I transferred the money', 'I sent the payment', 'The money was transferred', 'I made the bank transfer', 'I moved the funds'] },
      { id: 'person', label: 'cho Lan', kind: 'action', variants: ['to Lan', 'to Lan’s account', 'and Lan received it', 'with Lan as the recipient', 'for Lan'] },
      { id: 'success', label: 'giao dịch thành công', kind: 'outcome', variants: ['and it was successful', 'and the transaction went through', 'with no payment error', 'and the transfer completed', 'and the payment succeeded'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'giao dịch thành công', type: 'state', expected: ['successful transfer', 'transaction went through', 'transfer completed', 'payment succeeded', 'no payment error'], forbidden: ['transfer failed', 'transaction was rejected', 'did not go through', 'still pending'] }],
    negatives: [
      { answer: 'I transferred the money to Lan, but the transfer failed.', reason: 'failed state' },
      { answer: 'The payment for Lan did not go through.', reason: 'failed state' },
      { answer: 'I made a bank transfer to Lan, but the transaction was rejected.', reason: 'rejected state' },
      { answer: 'The funds for Lan are still pending.', reason: 'pending state' },
      { answer: 'I tried to send Lan the money, but the transfer failed.', reason: 'failed state' },
      { answer: 'Lan was the recipient, although the transaction did not go through.', reason: 'failed state' },
      { answer: 'My transfer to Lan was rejected by the bank.', reason: 'rejected state' },
      { answer: 'I sent the payment to Lan, but it is still pending.', reason: 'pending state' },
      { answer: 'The bank did not complete my transfer to Lan.', reason: 'not completed' },
      { answer: 'I moved the funds to Lan’s account, but the payment failed.', reason: 'failed state' },
    ],
  },
  {
    id: 'daily-delay-dinner', title: 'Dinner plans', titleVi: 'Dời bữa tối',
    prompt: 'Chúng tôi dời bữa tối sang 8 giờ, không hủy kế hoạch.',
    ideas: [
      { id: 'delay', label: 'dời bữa tối', kind: 'action', variants: ['We postponed dinner', 'We pushed dinner back', 'Dinner was delayed', 'We moved our dinner plans', 'We changed the dinner time'] },
      { id: 'time', label: 'sang 8 giờ', kind: 'time-details', variants: ['to 8 p.m.', 'until eight tonight', 'so it starts at eight', 'with the new time set for 8 p.m.', 'and will meet at eight'] },
      { id: 'not-cancel', label: 'không hủy', kind: 'outcome', variants: ['but did not cancel it', 'and the plan is still happening', 'rather than calling it off', 'so dinner is still on', 'without canceling our plans'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'dời, không hủy', type: 'state', expected: ['postponed dinner', 'dinner delayed', 'dinner still on', 'changed dinner time', 'did not cancel dinner'], forbidden: ['dinner canceled', 'dinner cancelled', 'called dinner off', 'will not have dinner'] }],
    negatives: [
      { answer: 'We canceled dinner instead of meeting at 8 p.m.', reason: 'delay changed to cancel' },
      { answer: 'Dinner was called off, so nobody will meet at eight.', reason: 'canceled state' },
      { answer: 'We will not have dinner; the 8 p.m. plan is canceled.', reason: 'canceled state' },
      { answer: 'The family dinner at eight has been cancelled.', reason: 'canceled state' },
      { answer: 'We called dinner off rather than postponing it to 8 p.m.', reason: 'delay changed to cancel' },
      { answer: 'Our dinner plans were canceled completely.', reason: 'canceled state' },
      { answer: 'There will be no dinner at eight because we called it off.', reason: 'canceled state' },
      { answer: 'We decided not to meet for dinner at 8 p.m.', reason: 'canceled state' },
      { answer: 'Dinner is no longer happening; it was canceled.', reason: 'canceled state' },
      { answer: 'Instead of delaying dinner, we cancelled the plan.', reason: 'delay changed to cancel' },
    ],
  },
  {
    id: 'daily-housing-leak', title: 'Report a leak', titleVi: 'Báo rò rỉ nước',
    prompt: 'Tôi báo chủ nhà về chỗ rò nước trong bếp và xin sửa hôm nay.',
    ideas: [
      { id: 'report', label: 'báo chủ nhà', kind: 'action', variants: ['I told my landlord', 'I informed the property owner', 'I let the landlord know', 'The landlord was notified', 'I reported the problem to my landlord'] },
      { id: 'leak', label: 'rò nước trong bếp', kind: 'action', variants: ['about a leak in the kitchen', 'that water was leaking in the kitchen', 'about the kitchen water leak', 'there is a plumbing leak in my kitchen', 'the kitchen has a leak'] },
      { id: 'today', label: 'xin sửa hôm nay', kind: 'polite-request', variants: ['and asked for it to be fixed today', 'and requested a repair today', 'could someone repair it today', 'hoping it can be fixed today', 'and asked for same-day repair'] },
    ],
    criticalFacts: [{ id: 'location', labelVietnamese: 'trong bếp', type: 'location', expected: ['kitchen'], forbidden: ['bathroom', 'bedroom', 'garage'] }],
    negatives: [
      { answer: 'I told my landlord about a leak in the bathroom and asked for a repair today.', reason: 'wrong location' },
      { answer: 'The property owner was notified that water was leaking in the bedroom.', reason: 'wrong location' },
      { answer: 'I reported the garage leak and requested same-day repair.', reason: 'wrong location' },
      { answer: 'Could the landlord fix the bathroom leak today?', reason: 'wrong location' },
      { answer: 'There is a plumbing leak in my bedroom, so I contacted the owner.', reason: 'wrong location' },
      { answer: 'I let my landlord know about water in the garage and asked for help today.', reason: 'wrong location' },
      { answer: 'The bathroom has a leak that needs to be repaired today.', reason: 'wrong location' },
      { answer: 'I requested an urgent repair for a leak in the bedroom.', reason: 'wrong location' },
      { answer: 'My landlord knows about the garage leak and will repair it today.', reason: 'wrong location' },
      { answer: 'I informed the owner about a bathroom water leak.', reason: 'wrong location' },
    ],
  },
  {
    id: 'daily-train-platform', title: 'Train update', titleVi: 'Thông tin tàu',
    prompt: 'Tàu trễ 30 phút và sẽ khởi hành ở sân ga số 4.',
    ideas: [
      { id: 'train', label: 'chuyến tàu', kind: 'action', variants: ['The train', 'Our rail service', 'The service', 'The scheduled train', 'This train'] },
      { id: 'delay', label: 'trễ 30 phút', kind: 'time-details', variants: ['is 30 minutes late', 'has a thirty-minute delay', 'will leave thirty minutes late', 'is delayed by 30 minutes', 'is running half an hour late'] },
      { id: 'platform', label: 'khởi hành ở sân ga 4', kind: 'time-details', variants: ['and departs from platform 4', 'with departure from platform four', 'and will leave at platform 4', 'and platform four is the departure point', 'departing from platform 4'] },
    ],
    criticalFacts: [
      { id: 'delay', labelVietnamese: '30 phút', type: 'time', expected: ['30 minutes', 'thirty minutes'], anchors: ['train', 'delay', 'late'] },
      { id: 'platform', labelVietnamese: 'sân ga số 4', type: 'location', expected: ['platform 4', 'platform four'], forbidden: ['platform 2', 'platform 3', 'platform 5'] },
    ],
    negatives: [
      { answer: 'The train is 30 minutes late and departs from platform 2.', reason: 'wrong platform' },
      { answer: 'Our train leaves from platform 4 after a ten-minute delay.', reason: 'wrong duration' },
      { answer: 'The service is delayed by 45 minutes and will leave at platform 4.', reason: 'wrong duration' },
      { answer: 'The train has a thirty-minute delay but departs from platform 5.', reason: 'wrong platform' },
      { answer: 'Platform four is correct, but the train is an hour late.', reason: 'wrong duration' },
      { answer: 'The delayed train leaves from platform 3 in thirty minutes.', reason: 'wrong platform' },
      { answer: 'This train is twenty minutes late and departs from platform 4.', reason: 'wrong duration' },
      { answer: 'The rail service has a thirty-minute delay and leaves from platform 2.', reason: 'wrong platform' },
      { answer: 'The train will depart from platform 4 after a 90-minute delay.', reason: 'wrong duration' },
      { answer: 'The train is running half an hour late and leaves at platform 5.', reason: 'wrong platform' },
    ],
  },
  {
    id: 'daily-health-appointment', title: 'Clinic appointment', titleVi: 'Lịch khám',
    prompt: 'Tôi đặt lịch khám cho mẹ vào thứ Sáu lúc 9 giờ sáng.',
    ideas: [
      { id: 'book', label: 'đặt lịch khám', kind: 'action', variants: ['I booked a clinic appointment', 'I arranged a medical visit', 'A clinic visit was scheduled', 'I made a doctor’s appointment', 'I reserved an appointment at the clinic'] },
      { id: 'person', label: 'cho mẹ', kind: 'action', variants: ['for my mother', 'for my mom', 'on my mother’s behalf', 'with my mom as the patient', 'so my mother can attend'] },
      { id: 'time', label: 'thứ Sáu lúc 9 giờ sáng', kind: 'time-details', variants: ['for Friday at 9 a.m.', 'at nine on Friday morning', 'with a Friday 9 a.m. slot', 'scheduled for 9 a.m. on Friday', 'on Friday morning at nine'] },
    ],
    criticalFacts: [{ id: 'time', labelVietnamese: '9 giờ sáng thứ Sáu', type: 'time', expected: ['9 a.m.'], anchors: ['Friday'], forbidden: ['Thursday', 'Monday'] }],
    negatives: [
      { answer: 'I booked my mother a clinic appointment for Friday at 2 p.m.', reason: 'wrong time' },
      { answer: 'My mom has a doctor’s appointment on Thursday at 9 a.m.', reason: 'wrong day' },
      { answer: 'I arranged a Friday clinic visit for my mother at 11 a.m.', reason: 'wrong time' },
      { answer: 'A medical visit for my mother is scheduled Monday at 9 a.m.', reason: 'wrong day' },
      { answer: 'I reserved a Friday appointment for my mom at 8 a.m.', reason: 'wrong time' },
      { answer: 'The clinic gave my mother a Thursday 9 a.m. slot.', reason: 'wrong day' },
      { answer: 'My mother can attend the clinic on Friday at 4 p.m.', reason: 'wrong time' },
      { answer: 'I made a Monday appointment at nine for my mom.', reason: 'wrong day' },
      { answer: 'The Friday appointment for my mother starts at 10 a.m.', reason: 'wrong time' },
      { answer: 'I booked a Thursday morning appointment at nine for my mother.', reason: 'wrong day' },
    ],
  },
  {
    id: 'daily-internet-recovered', title: 'Internet restored', titleVi: 'Mạng hoạt động lại',
    prompt: 'Mạng đã bị gián đoạn nhưng hiện hoạt động trở lại.',
    ideas: [
      { id: 'outage', label: 'mạng từng bị gián đoạn', kind: 'action', variants: ['The internet went down', 'There was a network outage', 'Our connection stopped working', 'The internet service was interrupted', 'We experienced network downtime'] },
      { id: 'past', label: 'sự cố xảy ra trước đó', kind: 'time-details', variants: ['earlier today', 'for a while', 'this morning', 'temporarily', 'a short time ago'] },
      { id: 'recover', label: 'hiện hoạt động trở lại', kind: 'outcome', variants: ['but it is working again now', 'and the connection is back up', 'but service has recovered', 'and the network is now online', 'but everything has returned to normal'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'hiện đã hoạt động lại', type: 'state', expected: ['working again', 'back up', 'service recovered', 'now online', 'returned to normal'], forbidden: ['still down', 'still offline', 'has not recovered', 'not working now'] }],
    negatives: [
      { answer: 'The internet went down earlier and is still down.', reason: 'opposite current state' },
      { answer: 'We had a network outage, and the connection is still offline.', reason: 'opposite current state' },
      { answer: 'Our connection stopped working and has not recovered.', reason: 'opposite current state' },
      { answer: 'The service was interrupted and is not working now.', reason: 'opposite current state' },
      { answer: 'We experienced downtime; the network remains unavailable.', reason: 'opposite current state' },
      { answer: 'The internet failed this morning and is still offline.', reason: 'opposite current state' },
      { answer: 'There was an outage, but service has not come back.', reason: 'opposite current state' },
      { answer: 'The connection went down and remains broken.', reason: 'opposite current state' },
      { answer: 'Our internet is not working after the earlier interruption.', reason: 'opposite current state' },
      { answer: 'Network downtime started earlier, and the system is still down.', reason: 'opposite current state' },
    ],
  },
  {
    id: 'daily-apology-party', title: 'Missed a party', titleVi: 'Xin lỗi vì lỡ tiệc',
    prompt: 'Tôi xin lỗi vì không thể dự tiệc do bị ốm.',
    ideas: [
      { id: 'apology', label: 'xin lỗi', kind: 'action', variants: ['I am sorry', 'I apologize', 'Please accept my apology', 'I wanted to say sorry', 'My apologies'] },
      { id: 'missed', label: 'không thể dự tiệc', kind: 'outcome', variants: ['that I could not attend the party', 'for missing your party', 'because I was unable to come to the party', 'for not making it to the celebration', 'that I did not attend'] },
      { id: 'illness', label: 'do bị ốm', kind: 'cause-explanation', variants: ['because I was sick', 'because I felt unwell', 'due to an illness', 'as I had become ill', 'since I was not feeling well'] },
    ],
    criticalFacts: [{ id: 'attendance', labelVietnamese: 'không dự tiệc', type: 'polarity', expected: ['negative'], anchors: ['attend party', 'come party', 'make it celebration'], forbidden: ['attended the party', 'attending the party', 'came to the party', 'made it to the party'] }],
    negatives: [
      { answer: 'I attended the party even though I was sick, and I apologized.', reason: 'attendance polarity changed' },
      { answer: 'I was unwell but still came to your party.', reason: 'attendance polarity changed' },
      { answer: 'Although I felt sick, I did attend the celebration.', reason: 'attendance polarity changed' },
      { answer: 'I went to the party while ill and said sorry.', reason: 'attendance polarity changed' },
      { answer: 'I was sick, but I managed to attend your party.', reason: 'attendance polarity changed' },
      { answer: 'Please accept my apology; I came to the party despite being ill.', reason: 'attendance polarity changed' },
      { answer: 'I did go to the celebration, although I was not well.', reason: 'attendance polarity changed' },
      { answer: 'My illness did not stop me from attending the party.', reason: 'attendance polarity changed' },
      { answer: 'I attended your party and felt sick there.', reason: 'attendance polarity changed' },
      { answer: 'I made it to the party even though I had become ill.', reason: 'attendance polarity changed' },
    ],
  },
  {
    id: 'daily-coffee-plan', title: 'Coffee plan', titleVi: 'Hẹn cà phê',
    prompt: 'Tôi xác nhận gặp bạn ở quán Central lúc 10 giờ sáng thứ Bảy.',
    ideas: [
      { id: 'confirm', label: 'xác nhận cuộc hẹn', kind: 'action', variants: ['I confirmed our coffee plan', 'Our coffee meeting is confirmed', 'I said the coffee plan works', 'We agreed to meet for coffee', 'I confirmed that we would meet'] },
      { id: 'place', label: 'ở quán Central', kind: 'time-details', variants: ['at Central Cafe', 'at the Central coffee shop', 'inside Central Cafe', 'with Central Cafe as the meeting place', 'at Central'] },
      { id: 'time', label: '10 giờ sáng thứ Bảy', kind: 'time-details', variants: ['at 10 a.m. on Saturday', 'Saturday morning at ten', 'for ten on Saturday morning', 'at ten o’clock Saturday morning', 'on Saturday at 10 a.m.'] },
    ],
    criticalFacts: [
      { id: 'time', labelVietnamese: '10 giờ sáng', type: 'time', expected: ['10 a.m.'], anchors: ['Saturday', 'meet', 'coffee'] },
      { id: 'place', labelVietnamese: 'quán Central', type: 'location', expected: ['Central Cafe', 'Central coffee shop', 'Central'], forbidden: ['Riverside Cafe', 'Station Cafe'] },
    ],
    negatives: [
      { answer: 'We agreed to meet at Central Cafe on Saturday at 2 p.m.', reason: 'wrong time' },
      { answer: 'Our coffee plan is Saturday at ten at Riverside Cafe.', reason: 'wrong place' },
      { answer: 'I confirmed Central Cafe for 9 a.m. on Saturday.', reason: 'wrong time' },
      { answer: 'We will meet for coffee at Station Cafe at ten Saturday morning.', reason: 'wrong place' },
      { answer: 'Central is our meeting place, but the time is 11 a.m. Saturday.', reason: 'wrong time' },
      { answer: 'The confirmed Saturday meeting is at Riverside Cafe at 10 a.m.', reason: 'wrong place' },
      { answer: 'Coffee at Central Cafe is set for Saturday at 8 a.m.', reason: 'wrong time' },
      { answer: 'We agreed on Station Cafe at ten this Saturday.', reason: 'wrong place' },
      { answer: 'I confirmed a Saturday 3 p.m. meeting at Central Cafe.', reason: 'wrong time' },
      { answer: 'At 10 a.m. Saturday, we will meet inside Riverside Cafe.', reason: 'wrong place' },
    ],
  },
  {
    id: 'it-deploy-outage', title: 'Deployment incident', titleVi: 'Sự cố sau deploy',
    prompt: 'Bản deploy mới làm service lỗi; team rollback và service đã hồi phục.',
    ideas: [
      { id: 'deploy', label: 'deploy mới gây lỗi', kind: 'cause-explanation', variants: ['The new deployment caused a service failure', 'The service developed problems after the new version was deployed', 'We ran into a service issue after rolling out the new release', 'A new rollout made the service fail', 'Putting the new version into production caused an outage'] },
      { id: 'rollback', label: 'team rollback', kind: 'action', variants: ['so the team rolled it back', 'and we reverted the release', 'so the previous version was restored', 'which forced us to roll back', 'and the rollout was reversed'] },
      { id: 'recover', label: 'service đã hồi phục', kind: 'outcome', variants: ['and the service recovered', 'and the system is back up', 'after which the service worked again', 'and everything returned to normal', 'bringing the system online again'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'service đã hồi phục', type: 'state', expected: ['service recovered', 'system back up', 'service worked again', 'returned to normal', 'system online again'], forbidden: ['still down', 'still failing', 'has not recovered', 'remains offline'] }],
    negatives: [
      { answer: 'The new deployment caused an outage. We rolled back, but the service is still down.', reason: 'recovery contradicted' },
      { answer: 'After the rollout failed, we reverted it; the system is still failing.', reason: 'recovery contradicted' },
      { answer: 'We restored the old version after the service issue, but it has not recovered.', reason: 'recovery contradicted' },
      { answer: 'The release caused problems. A rollback was done, yet the service remains offline.', reason: 'recovery contradicted' },
      { answer: 'Putting the version into production caused an outage; rollback did not bring it back.', reason: 'recovery contradicted' },
      { answer: 'We reverted the deployment after it broke the service, which is still down.', reason: 'recovery contradicted' },
      { answer: 'The rollout caused a failure. The previous version is restored, but the system remains broken.', reason: 'recovery contradicted' },
      { answer: 'A deployment issue forced a rollback, although the service has not recovered.', reason: 'recovery contradicted' },
      { answer: 'After the new release failed, we rolled back and the service stayed offline.', reason: 'recovery contradicted' },
      { answer: 'The deployment caused downtime; the rollback completed but everything is still failing.', reason: 'recovery contradicted' },
    ],
  },
  {
    id: 'it-critical-bug-delay', title: 'Release delay', titleVi: 'Dời release',
    prompt: 'Team dời release vì phát hiện critical bug, không hủy release.',
    ideas: [
      { id: 'bug', label: 'phát hiện critical bug', kind: 'cause-explanation', variants: ['We found a critical bug', 'A severe defect was discovered', 'The team identified a critical issue', 'Testing uncovered a blocking bug', 'We detected a major defect'] },
      { id: 'delay', label: 'dời release', kind: 'action', variants: ['so we postponed the release', 'which forced us to delay the release', 'and the release was pushed back', 'so the rollout was put off', 'leading the team to move the release date'] },
      { id: 'not-cancel', label: 'không hủy release', kind: 'outcome', variants: ['rather than canceling it', 'but the release is still planned', 'and did not call it off', 'with the rollout still expected later', 'without canceling the release'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'dời chứ không hủy', type: 'state', expected: ['release postponed', 'release delayed', 'release pushed back', 'rollout put off', 'move release date', 'rollout still expected later', 'without canceling the release'], forbidden: ['release canceled', 'release cancelled', 'called off the release', 'will never release'] }],
    negatives: [
      { answer: 'We found a critical bug and canceled the release.', reason: 'delay changed to cancel' },
      { answer: 'A severe defect forced us to call off the release.', reason: 'delay changed to cancel' },
      { answer: 'Testing uncovered a blocking bug, so the rollout was canceled.', reason: 'delay changed to cancel' },
      { answer: 'The critical issue means we will never release this version.', reason: 'release canceled' },
      { answer: 'We detected a major defect and cancelled the release completely.', reason: 'delay changed to cancel' },
      { answer: 'The team called off the release after finding the bug.', reason: 'release canceled' },
      { answer: 'A blocking defect resulted in the release being canceled.', reason: 'release canceled' },
      { answer: 'Instead of postponing, we canceled the rollout because of the bug.', reason: 'delay changed to cancel' },
      { answer: 'The release is no longer planned after a critical bug was found.', reason: 'release canceled' },
      { answer: 'We found a severe issue and decided not to release the version.', reason: 'release canceled' },
    ],
  },
  {
    id: 'it-reproduce', title: 'Reproduction status', titleVi: 'Chưa reproduce được bug',
    prompt: 'Team vẫn chưa reproduce được bug và đang thu thập thêm log.',
    ideas: [
      { id: 'not-reproduced', label: 'vẫn chưa reproduce được', kind: 'outcome', variants: ['has not reproduced the bug yet', 'still cannot reproduce the issue', 'has not been able to replicate the defect', 'says the issue is not reproducible so far', 'is still unable to make the bug happen again'] },
      { id: 'logs', label: 'đang thu thập thêm log', kind: 'future-plan', variants: ['and is collecting more logs', 'while we gather additional log data', 'and requested more diagnostic logs', 'so more logs are being collected', 'and continues to collect evidence'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'chưa reproduce được', type: 'polarity', expected: ['negative'], anchors: ['reproduce bug', 'replicate defect', 'reproducible issue', 'make bug happen'] }],
    negatives: [
      { answer: 'The team reproduced the bug and is collecting more logs.', reason: 'reproduction state reversed' },
      { answer: 'We can now reproduce the issue and requested diagnostic data.', reason: 'reproduction state reversed' },
      { answer: 'Our engineers successfully replicated the defect while gathering logs.', reason: 'reproduction state reversed' },
      { answer: 'The issue is reproducible, and the team continues to collect evidence.', reason: 'reproduction state reversed' },
      { answer: 'Developers made the bug happen again and are collecting logs.', reason: 'reproduction state reversed' },
      { answer: 'Support reproduced the problem before asking for more log data.', reason: 'reproduction state reversed' },
      { answer: 'We have been able to replicate the issue and are gathering diagnostics.', reason: 'reproduction state reversed' },
      { answer: 'The defect was reproduced successfully; more logs are being collected.', reason: 'reproduction state reversed' },
      { answer: 'Engineers can reproduce the bug now and still want additional logs.', reason: 'reproduction state reversed' },
      { answer: 'The team confirmed the issue is reproducible and requested logs.', reason: 'reproduction state reversed' },
    ],
  },
  {
    id: 'it-login-rollback', title: 'Login rollback', titleVi: 'Rollback lỗi đăng nhập',
    prompt: 'Sau deploy, user không đăng nhập được; team rollback và login hoạt động lại.',
    ideas: [
      { id: 'login-fail', label: 'user không đăng nhập được sau deploy', kind: 'cause-explanation', variants: ['Users could not log in after deployment', 'The rollout caused login failures', 'People were unable to sign in after the release', 'Login stopped working after we deployed', 'The new version prevented users from signing in'] },
      { id: 'rollback', label: 'team rollback', kind: 'action', variants: ['so the team rolled back', 'and we reverted the release', 'so the deployment was reversed', 'which led us to restore the old version', 'and the team performed a rollback'] },
      { id: 'working', label: 'login hoạt động lại', kind: 'outcome', variants: ['and login works again', 'and users can sign in now', 'after which access was restored', 'bringing authentication back online', 'and the login service recovered'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'login hoạt động lại', type: 'state', expected: ['login works again', 'users can sign in now', 'access restored', 'authentication back online', 'login service recovered'], forbidden: ['still cannot log in', 'login is still broken', 'access remains unavailable', 'still have no access', 'did not fix it', 'has not recovered'] }],
    negatives: [
      { answer: 'Users could not log in after deployment. We rolled back, but they still cannot log in.', reason: 'login recovery contradicted' },
      { answer: 'The rollout caused login failures; after reverting it, login is still broken.', reason: 'login recovery contradicted' },
      { answer: 'We restored the old version, but access remains unavailable.', reason: 'login recovery contradicted' },
      { answer: 'The release prevented sign-in. A rollback was done, yet users still have no access.', reason: 'login recovery contradicted' },
      { answer: 'Authentication failed after deployment and stayed offline after rollback.', reason: 'login recovery contradicted' },
      { answer: 'We reversed the deployment, although people remain unable to sign in.', reason: 'login recovery contradicted' },
      { answer: 'Login stopped working after release; reverting did not fix it.', reason: 'login recovery contradicted' },
      { answer: 'The team rolled back the version, but the login service has not recovered.', reason: 'login recovery contradicted' },
      { answer: 'Users lost access after deployment and still cannot log in after rollback.', reason: 'login recovery contradicted' },
      { answer: 'A rollback followed the sign-in failure, but authentication remains down.', reason: 'login recovery contradicted' },
    ],
  },
  {
    id: 'it-root-cause', title: 'Root cause investigation', titleVi: 'Điều tra root cause',
    prompt: 'Team vẫn đang điều tra và chưa xác định được root cause.',
    ideas: [
      { id: 'investigate', label: 'vẫn đang điều tra', kind: 'action', variants: ['The team is still investigating the issue', 'We continue to look into the problem', 'Engineering is performing an ongoing investigation', 'Our engineers are still analyzing the incident', 'The incident team continues examining the failure'] },
      { id: 'unknown', label: 'chưa xác định root cause', kind: 'outcome', variants: ['and has not identified the root cause yet', 'because we still do not know the underlying cause', 'with the root cause still unknown', 'and has not found the cause so far', 'while the source of the failure remains unclear'] },
    ],
    criticalFacts: [{ id: 'state', labelVietnamese: 'root cause chưa xác định', type: 'polarity', expected: ['negative'], anchors: ['identify root cause', 'know underlying cause', 'root cause unknown', 'find cause', 'source unclear'], forbidden: ['confirmed the root cause', 'knows what caused', 'determined the root cause', 'source is clear'] }],
    negatives: [
      { answer: 'The team finished investigating and identified the root cause.', reason: 'root cause state reversed' },
      { answer: 'We now know the underlying cause after looking into the issue.', reason: 'root cause state reversed' },
      { answer: 'Engineering found the root cause and completed the investigation.', reason: 'root cause state reversed' },
      { answer: 'Our engineers identified the source of the failure.', reason: 'root cause state reversed' },
      { answer: 'The incident team has confirmed the root cause.', reason: 'root cause state reversed' },
      { answer: 'Investigation is complete because we found the underlying problem.', reason: 'root cause state reversed' },
      { answer: 'The team knows what caused the issue and no longer needs to investigate.', reason: 'root cause state reversed' },
      { answer: 'We successfully determined the root cause of the incident.', reason: 'root cause state reversed' },
      { answer: 'Engineers completed their analysis and found the cause.', reason: 'root cause state reversed' },
      { answer: 'The source is clear now, and the investigation has ended.', reason: 'root cause state reversed' },
    ],
  },
  {
    id: 'it-change-approval', title: 'Change request', titleVi: 'Change bị từ chối',
    prompt: 'Change request đã bị từ chối và chưa được deploy.',
    ideas: [
      { id: 'request', label: 'change request', kind: 'action', variants: ['The change request', 'Our proposed change', 'The deployment request', 'The requested update', 'This change'] },
      { id: 'rejected', label: 'đã bị từ chối', kind: 'outcome', variants: ['was rejected', 'was not approved', 'was declined', 'did not receive approval', 'was turned down'] },
      { id: 'not-deployed', label: 'chưa được deploy', kind: 'outcome', variants: ['and was not deployed', 'so it has not gone to production', 'and the rollout did not happen', 'so the update remains undeployed', 'and it was never rolled out'] },
    ],
    criticalFacts: [{ id: 'approval', labelVietnamese: 'bị từ chối', type: 'state', expected: ['rejected', 'not approved', 'declined', 'did not receive approval', 'turned down'], forbidden: ['was approved', 'received approval', 'signed off'] }],
    negatives: [
      { answer: 'The change request was approved and deployed.', reason: 'approval reversed' },
      { answer: 'Our proposed change received approval and went to production.', reason: 'approval reversed' },
      { answer: 'The deployment request was signed off and rolled out.', reason: 'approval reversed' },
      { answer: 'The requested update was approved for deployment.', reason: 'approval reversed' },
      { answer: 'This change received approval and is now in production.', reason: 'approval reversed' },
      { answer: 'The request passed review and was deployed successfully.', reason: 'approval reversed' },
      { answer: 'Reviewers approved the change before the rollout.', reason: 'approval reversed' },
      { answer: 'The update was signed off and put into production.', reason: 'approval reversed' },
      { answer: 'Approval was granted, so the team deployed the change.', reason: 'approval reversed' },
      { answer: 'The change request was accepted and rolled out.', reason: 'approval reversed' },
    ],
  },
  {
    id: 'it-database-api', title: 'API timeout', titleVi: 'Database làm API timeout',
    prompt: 'Database chậm làm API timeout; team tăng connection pool để giảm lỗi.',
    ideas: [
      { id: 'database', label: 'database chậm', kind: 'cause-explanation', variants: ['The slow database', 'Database latency', 'Poor database performance', 'The database slowdown', 'Slow queries in the database'] },
      { id: 'timeout', label: 'gây API timeout', kind: 'outcome', variants: ['caused API timeouts', 'made API requests time out', 'led to timeout errors in the API', 'resulted in API request failures', 'was why the API kept timing out'] },
      { id: 'pool', label: 'tăng connection pool', kind: 'action', variants: ['so the team increased the connection pool', 'and we raised the pool size', 'so more database connections were added', 'and the connection limit was increased', 'leading us to expand the connection pool'] },
    ],
    criticalFacts: [{ id: 'cause', labelVietnamese: 'database chậm gây API timeout', type: 'cause-result', expected: ['database caused API timeout'], cause: ['slow database', 'database latency', 'database slowdown', 'slow queries'], result: ['API timeout', 'API request time out', 'timeout errors'] }],
    negatives: [
      { answer: 'API timeouts caused the database to become slow, so we increased the connection pool.', reason: 'cause/result inverted' },
      { answer: 'Timeout errors made database performance worse; the pool was expanded.', reason: 'cause/result inverted' },
      { answer: 'API request failures led to database latency, so we added connections.', reason: 'cause/result inverted' },
      { answer: 'The API timing out resulted in slow database queries; we raised the pool size.', reason: 'cause/result inverted' },
      { answer: 'A timeout in the API caused the database slowdown, and the limit was increased.', reason: 'cause/result inverted' },
      { answer: 'Database latency was the result of API timeouts, so the team expanded the pool.', reason: 'cause/result inverted' },
      { answer: 'The database became slow because the API timed out; we added connections.', reason: 'cause/result inverted' },
      { answer: 'API failures caused poor database performance, leading us to raise the pool size.', reason: 'cause/result inverted' },
      { answer: 'The timeout problem made queries slow, so the connection pool was increased.', reason: 'cause/result inverted' },
      { answer: 'Slow database performance resulted from API timeouts; the team expanded the pool.', reason: 'cause/result inverted' },
    ],
  },
  {
    id: 'it-before-deploy', title: 'Pre-deployment bug', titleVi: 'Tìm bug trước deploy',
    prompt: 'Team tìm thấy bug trước khi deploy và đã hoãn rollout.',
    ideas: [
      { id: 'find', label: 'tìm thấy bug', kind: 'action', variants: ['The team found the bug', 'We discovered a defect', 'Testing identified the issue', 'Engineers detected the problem', 'The bug was uncovered'] },
      { id: 'before', label: 'trước khi deploy', kind: 'time-details', variants: ['before deployment', 'prior to the rollout', 'before the release went live', 'ahead of deploying the version', 'before putting it into production'] },
      { id: 'delay', label: 'đã hoãn rollout', kind: 'outcome', variants: ['and postponed the rollout', 'so we delayed deployment', 'and pushed the release back', 'which made us put off the launch', 'and the rollout was deferred'] },
    ],
    criticalFacts: [{ id: 'sequence', labelVietnamese: 'trước khi deploy', type: 'sequence', expected: ['before deployment', 'prior to rollout'], forbidden: ['after deployment', 'after the rollout', 'once it was live'] }],
    negatives: [
      { answer: 'The team found the bug after deployment and postponed the next rollout.', reason: 'before/after reversed' },
      { answer: 'We discovered the defect after the rollout went live.', reason: 'before/after reversed' },
      { answer: 'Testing identified the issue once it was live and delayed another release.', reason: 'before/after reversed' },
      { answer: 'Engineers detected the problem after putting the version into production.', reason: 'before/after reversed' },
      { answer: 'The bug was uncovered after deployment, so the next launch was delayed.', reason: 'before/after reversed' },
      { answer: 'Only after the release went live did we find the bug.', reason: 'before/after reversed' },
      { answer: 'We postponed a later rollout because the issue appeared after deployment.', reason: 'before/after reversed' },
      { answer: 'The defect was discovered after the version reached production.', reason: 'before/after reversed' },
      { answer: 'After deployment, testing found the issue and the team delayed a follow-up.', reason: 'before/after reversed' },
      { answer: 'The team detected the bug after the rollout had completed.', reason: 'before/after reversed' },
    ],
  },
];

const positiveStyles = [
  'same wording', 'synonym', 'active/passive', 'noun/verb', 'phrase/clause',
  'informal/professional', 'sentence merge', 'lexical paraphrase', 'grammatical variant',
  'natural connector', 'register difference', 'phrasal variant', 'sentence split',
  'equivalent expression', 'safe paraphrase',
] as const;

function levelFor(index: number): Difficulty {
  if (index < 100) return 'A1';
  if (index < 225) return 'A2';
  if (index < 375) return 'B1';
  if (index < 475) return 'B2';
  return index < 480 ? 'A2' : 'B2';
}

function makeTopic(scenario: Scenario, index: number): WritingPracticeTopic {
  const domain = index < 300 ? 'daily-life' : 'it-work';
  const level = levelFor(index);
  return {
    id: `golden:${scenario.id}`,
    titleEnglish: scenario.title,
    titleVietnamese: scenario.titleVi,
    category: domain === 'daily-life' ? 'Daily Communication' : 'IT Communication',
    domain,
    level,
    writingType: 'problem-explanation',
    context: scenario.prompt,
    vietnameseSourceText: scenario.prompt,
    requiredIdeas: scenario.ideas.map((idea) => ({
      id: idea.id,
      labelVietnamese: idea.label,
      concepts: [...idea.variants],
      kind: idea.kind,
    })),
    criticalFacts: scenario.criticalFacts,
    usefulVocabulary: [], usefulStructures: [], hints: [], commonMistakes: [],
    sampleAnswers: [scenario.ideas.map((idea) => idea.variants[0]).join('. ')],
    expectedWordRange: level === 'A1' ? [15, 40] : level === 'A2' ? [25, 60] : level === 'B1' ? [40, 90] : [60, 130],
  };
}

export const writingEvaluatorGoldenSet: WritingGoldenCase[] = scenarios.flatMap((scenario, scenarioIndex) => {
  const start = scenarioIndex * 25;
  const positives = positiveStyles.map((style, caseIndex) => {
    const ideas = scenario.ideas.map((idea) => idea.variants[caseIndex % 5]);
    const prefix = caseIndex < 5 ? '' : caseIndex < 10 ? 'To be clear, ' : 'As an update, ';
    const topic = makeTopic(scenario, start + caseIndex);
    return {
      id: `${scenario.id}:positive:${caseIndex + 1}`,
      topicId: topic.id,
      topic,
      userAnswer: `${prefix}${ideas.join(' ')}`,
      expectedStatus: 'communicates-well' as const,
      expectedCoveredIdeas: scenario.ideas.map((idea) => idea.id),
      expectedMissingIdeas: [], expectedContradictions: [], polarity: 'positive' as const,
      reason: style,
    };
  });
  const negatives = scenario.negatives.map((item, caseIndex) => {
    const topic = makeTopic(scenario, start + 15 + caseIndex);
    return {
      id: `${scenario.id}:negative:${caseIndex + 1}`,
      topicId: topic.id,
      topic,
      userAnswer: item.answer,
      expectedStatus: 'needs-improvement' as const,
      expectedCoveredIdeas: [], expectedMissingIdeas: [], expectedContradictions: [],
      polarity: 'negative' as const,
      reason: item.reason,
    };
  });
  return [...positives, ...negatives];
});

if (writingEvaluatorGoldenSet.length !== 500) {
  throw new Error(`Writing golden set must contain 500 cases, received ${writingEvaluatorGoldenSet.length}.`);
}
