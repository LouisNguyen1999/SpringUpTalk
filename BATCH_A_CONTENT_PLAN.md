# Batch A Content Plan — 250 → 310

Batch A bổ sung 60 nhu cầu giao tiếp thật, theo phân bố **A1 +16, A2 +19, B1 +16, B2 +9**. Sau batch, tổng level dự kiến là A1 81, A2 99, B1 84, B2 46.

Nội dung được biên tập theo sáu editorial sets, mỗi set 10 topic. Mỗi topic có 3–5 conversation, mỗi conversation tối thiểu sáu lượt và có intent/register metadata.

> Lưu ý triển khai: số conversation thực tế là **3–5 theo chiều sâu ngữ nghĩa**, không cố định ở ba. Các bảng đầu mô tả category/level/objective; bảng editorial specification cuối file là source of truth cho count, grammar, phrase, register và intent.

## Set A1 — Transport & Home

| ID | Level | Category | Need |
|---|---|---|---|
| changing-a-pickup-point | A2 | Transportation | Đổi điểm đón với tài xế |
| driver-cannot-find-location | A2 | Transportation | Hướng dẫn tài xế tìm vị trí |
| flooded-road-detour | B1 | Transportation | Thống nhất đường vòng khi ngập |
| motorbike-flat-tire | A2 | Transportation | Xử lý xe máy thủng lốp |
| booking-an-intercity-bus | A1 | Transportation | Đặt vé xe khách |
| lost-parking-ticket | B1 | Transportation | Báo mất vé gửi xe |
| asking-about-a-rental-deposit | A2 | Home | Làm rõ tiền cọc thuê phòng |
| questioning-a-utility-bill | A2 | Home | Hỏi về hóa đơn điện nước |
| replacing-an-access-card | A1 | Home | Xin thay thẻ ra vào |
| following-up-on-noise | B1 | Home | Theo dõi khiếu nại tiếng ồn |

## Set A2 — Home & Work

| ID | Level | Category | Need |
|---|---|---|---|
| requesting-building-maintenance | B1 | Home | Làm việc với ban quản lý |
| negotiating-apartment-damage-responsibility | B2 | Home | Thương lượng trách nhiệm khi căn hộ hư hỏng |
| clarifying-sprint-requirements | A2 | Work | Làm rõ yêu cầu sprint |
| preparing-for-refinement | B1 | Work | Chuẩn bị refinement |
| giving-code-review-feedback | B1 | Work | Feedback code review |
| handling-a-production-incident | B2 | Work | Điều phối sự cố production |
| explaining-a-release-delay | B1 | Work | Giải thích release trễ |
| discussing-a-performance-review | B2 | Work | Trao đổi performance review |
| planning-a-resignation-handover | B2 | Work | Bàn giao khi nghỉ việc |
| checking-a-qr-payment | A1 | Money & Banking | Kiểm tra thanh toán QR |

## Set A3 — Money & Services

| ID | Level | Category | Need |
|---|---|---|---|
| making-a-bank-transfer | A1 | Money & Banking | Chuyển khoản cơ bản |
| correcting-an-account-number | A2 | Money & Banking | Sửa số tài khoản sai |
| tracing-a-pending-transaction | B1 | Money & Banking | Tra giao dịch pending |
| reporting-an-atm-retained-card | A2 | Money & Banking | ATM nuốt thẻ |
| resetting-a-forgotten-pin | A1 | Money & Banking | Quên PIN |
| opening-a-bank-account | A2 | Money & Banking | Mở tài khoản |
| exchanging-currency | A2 | Money & Banking | Đổi ngoại tệ |
| calling-a-delivery-driver | A1 | Services | Trao đổi với shipper |
| discussing-a-phone-repair-quote | B1 | Services | Làm rõ báo giá sửa điện thoại |
| booking-an-admin-appointment | A1 | Services | Đặt lịch hành chính cơ bản |

## Set A4 — Family, Health & Technology

| ID | Level | Category | Need |
|---|---|---|---|
| calling-parents-after-work | A1 | Family | Gọi hỏi thăm bố mẹ |
| planning-a-trip-home | A2 | Family | Sắp xếp về quê |
| preparing-for-tet | A2 | Family | Chuẩn bị Tết |
| visiting-relatives | A1 | Family | Đi thăm họ hàng |
| caring-for-a-sick-child | B1 | Family | Phối hợp chăm trẻ ốm |
| asking-a-pharmacist-for-advice | A2 | Health | Xin tư vấn nhà thuốc |
| comparing-dental-treatments | B1 | Health | So sánh phương án nha khoa |
| discussing-treatment-risks | B2 | Health | Trao đổi rủi ro điều trị |
| recovering-an-online-account | A2 | Technology | Khôi phục tài khoản |
| reporting-a-phishing-message | B1 | Technology | Báo tin nhắn lừa đảo |

## Set A5 — Technology, Food & Leisure

| ID | Level | Category | Need |
|---|---|---|---|
| weighing-privacy-tradeoffs | B2 | Technology | Cân nhắc quyền riêng tư |
| ordering-a-local-breakfast | A1 | Food & Drink | Gọi món sáng |
| splitting-a-restaurant-bill | A2 | Food & Drink | Chia hóa đơn |
| explaining-a-food-allergy | B1 | Food & Drink | Trao đổi dị ứng thực phẩm |
| negotiating-a-catering-plan | B2 | Food & Drink | Cân bằng catering và ngân sách |
| buying-cinema-tickets | A1 | Entertainment | Mua vé xem phim |
| reviewing-a-cultural-event | B2 | Entertainment | Nhận xét sự kiện văn hóa |
| joining-a-local-gym | A1 | Fitness | Đăng ký phòng gym |
| adjusting-a-workout-plan | A2 | Fitness | Điều chỉnh bài tập |
| discussing-injury-limitations | B1 | Fitness | Nói rõ giới hạn chấn thương |

## Set A6 — Daily Life, Education, Travel & Community

| ID | Level | Category | Need |
|---|---|---|---|
| arranging-laundry-pickup | A1 | Daily Life | Đặt lấy đồ giặt |
| planning-weekend-errands | A1 | Daily Life | Sắp xếp việc cuối tuần |
| handling-a-shared-schedule | A2 | Daily Life | Điều phối lịch chung |
| enrolling-in-an-evening-class | A1 | Education | Đăng ký lớp buổi tối |
| requesting-a-deadline-extension | B1 | Education | Xin gia hạn có lý do |
| handling-a-delayed-flight | A2 | Travel | Xử lý chuyến bay delay |
| negotiating-a-tour-change | B2 | Travel | Thương lượng đổi tour |
| asking-at-a-public-office | A1 | Community | Hỏi thông tin nơi công cộng |
| resolving-an-event-conflict | B1 | Community | Giải quyết xung đột sự kiện |
| explaining-a-data-breach | B1 | Technology | Thông báo và xử lý lộ dữ liệu |

## QA gate cho từng set

- Canonical và accepted evaluator 100%.
- Không duplicate ID/canonical/Vietnamese/sequence.
- Không TODO.
- Cả A và B có ba lượt luyện có giá trị trong mỗi conversation.
- Intent và relationship metadata 100% cho content mới.
- Lấy mẫu thủ công tối thiểu hai conversation/topic; toàn Batch A vẫn phải đạt 40 conversation theo level trước khi đóng batch.

## Editorial specification — Sets A2–A6

| Topic ID | Conv | Grammar focus | Phrase/collocation focus | Register | Intent coverage |
|---|---:|---|---|---|---|
| requesting-building-maintenance | 4 | present perfect, passive, polite requests | maintenance request, follow up on | resident ↔ management | report, request, confirm, follow up |
| negotiating-apartment-damage-responsibility | 5 | mixed conditionals, contract language | structural defect, reimbursement cap | tenant ↔ landlord | clarify, explain, negotiate, summarize |
| clarifying-sprint-requirements | 4 | indirect questions, future | acceptance criteria, out of scope | coworker ↔ coworker | clarify, decide, summarize |
| preparing-for-refinement | 4 | modals, conditionals | ready for refinement, split a story | coworker ↔ coworker | clarify, suggest, decide |
| giving-code-review-feedback | 4 | diplomatic language, modals | request changes, address feedback | senior ↔ junior | give feedback, clarify, disagree politely |
| handling-a-production-incident | 5 | advanced modals, passive, third conditional | root cause, roll back, workaround | engineer ↔ stakeholder | report, troubleshoot, decide, explain |
| explaining-a-release-delay | 4 | present perfect, reported speech | flag a delay, revised date | employee ↔ manager/stakeholder | report, explain, suggest, negotiate |
| discussing-a-performance-review | 5 | hedging, evidence language, mixed conditionals | measurable impact, development plan | employee ↔ manager | report, feedback, disagree, negotiate |
| planning-a-resignation-handover | 5 | future perfect, diplomatic language | hand over, transition risk | employee ↔ manager/HR | report, plan, request, summarize |
| checking-a-qr-payment | 3 | basic questions, present perfect | scan a QR code, transaction code | customer ↔ service staff | clarify, confirm, troubleshoot |
| making-a-bank-transfer | 3 | present simple, basic questions | account number, payment message | friend ↔ friend | ask, instruct, confirm |
| correcting-an-account-number | 4 | past simple, should | recipient details, double-check | friend/customer | clarify, confirm, troubleshoot, advise |
| tracing-a-pending-transaction | 5 | present perfect, passive, reported speech | reference number, open a trace | customer ↔ bank staff | report, clarify, request, explain, follow up |
| reporting-an-atm-retained-card | 4 | past simple, present perfect | freeze a card, replacement card | customer ↔ bank staff | report, clarify, request |
| resetting-a-forgotten-pin | 3 | can, imperatives | reset a PIN, verification code | customer ↔ bank staff | request, confirm, advise |
| opening-a-bank-account | 4 | comparatives, have to | maintenance fee, proof of address | customer ↔ bank staff | compare, ask, confirm, instruct |
| exchanging-currency | 3 | how much, comparatives | exchange rate, service fee | customer ↔ exchange staff | ask, clarify, confirm |
| calling-a-delivery-driver | 3 | where questions, present continuous | drop-off point, delivery code | customer ↔ delivery staff | confirm, change plans |
| discussing-a-phone-repair-quote | 4 | passive, conditionals | repair scope, back up data | customer ↔ technician | explain, compare, clarify, decide |
| booking-an-admin-appointment | 3 | would like, time questions | appointment slot, proof of residence | citizen ↔ service staff | request, decide, confirm |
| calling-parents-after-work | 3 | present/past simple | check in, stay in touch | family | follow up, explain, decide |
| planning-a-trip-home | 4 | future arrangements, going to | book a train, arrange pickup | family | compare, decide, suggest, confirm |
| preparing-for-tet | 4 | have to, quantifiers, future | divide chores, family meal | family | decide, clarify, plan, suggest |
| visiting-relatives | 3 | would like, polite offers | arrange a visit, offer help | family | request, decide, offer |
| caring-for-a-sick-child | 4 | present perfect, conditionals | temperature reading, care shift | family/parent ↔ doctor | report, negotiate, request, advise |
| asking-a-pharmacist-for-advice | 4 | present perfect, should | recommended dose, warning signs | patient ↔ pharmacist | report, clarify, instruct, advise |
| comparing-dental-treatments | 4 | comparatives, passive | treatment option, written estimate | patient ↔ dentist | clarify, compare, ask, decide |
| discussing-treatment-risks | 5 | advanced modals, hedging | informed consent, conservative treatment | patient ↔ doctor | explain, clarify, compare, summarize, confirm |
| recovering-an-online-account | 4 | present perfect, imperatives | recovery flow, active session | customer ↔ support | troubleshoot, clarify, advise, report |
| reporting-a-phishing-message | 4 | reported speech, deduction modals | phishing attempt, revoke access | customer/coworker ↔ security | concern, instruct, troubleshoot, report |
| weighing-privacy-tradeoffs | 5 | hedging, complex conditionals | opt-in consent, data retention | team ↔ stakeholder | clarify, suggest, disagree, negotiate, decide |
| ordering-a-local-breakfast | 3 | would like, some/any | on the side, QR payment | customer ↔ server | ask, request, confirm |
| splitting-a-restaurant-bill | 4 | how much, comparatives | split equally, service charge | friends | clarify, negotiate, instruct |
| explaining-a-food-allergy | 4 | conditionals, passive | cross-contact, allergy marker | customer ↔ restaurant staff | report, clarify, request, confirm |
| negotiating-a-catering-plan | 4 | diplomatic language, concession | dietary requirement, revised pricing | client ↔ caterer | clarify, negotiate, request |
| buying-cinema-tickets | 3 | what time, would like | showing time, select seats | customer ↔ cinema staff | ask, decide, confirm |
| reviewing-a-cultural-event | 4 | concession, evaluative language | balanced review, accessibility | coworker/client | explain, disagree, feedback, summarize |
| joining-a-local-gym | 3 | present simple, can | monthly membership, emergency contact | customer ↔ gym staff | ask, request, confirm |
| adjusting-a-workout-plan | 4 | present perfect, comparatives | recovery day, training load | customer ↔ trainer | report, advise, suggest, decide |
| discussing-injury-limitations | 4 | modals, conditionals | safe range, stop rule | customer ↔ trainer | report, suggest, advise, plan |
| arranging-laundry-pickup | 3 | present continuous, time questions | pickup window, special care | customer ↔ service staff | request, instruct, confirm |
| planning-weekend-errands | 3 | going to, sequencing | task list, choose a route | partners | plan, decide, suggest |
| handling-a-shared-schedule | 3 | present continuous, have to | calendar conflict, swap duties | partners | clarify, negotiate, instruct |
| enrolling-in-an-evening-class | 3 | present simple, can | placement test, enroll in | student ↔ school staff | ask, advise, confirm |
| requesting-a-deadline-extension | 3 | present perfect, conditionals | revised deadline, steady progress | student ↔ teacher | explain, negotiate, confirm |
| handling-a-delayed-flight | 3 | present perfect, first conditional | revised departure, protect a connection | passenger ↔ airline staff | ask, request, clarify |
| negotiating-a-tour-change | 3 | diplomatic/contract language | revised itinerary, waive a surcharge | client ↔ operator | explain, compare, negotiate |
| asking-at-a-public-office | 3 | where questions, have to | queue ticket, collection receipt | citizen ↔ service staff | ask, instruct, confirm |
| resolving-an-event-conflict | 3 | reported speech, conditionals | competing booking, booking log | community groups ↔ coordinator | clarify, resolve conflict, advise |
| explaining-a-data-breach | 3 | passive, present perfect | confirmed breach, root-cause review | engineer ↔ stakeholder | report, explain, summarize |
