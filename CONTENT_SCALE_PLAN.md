# Content Scale Plan

Mở rộng theo từng stage có cổng chất lượng; không mass-generate để đạt số lượng.

## 50 → 100 — hoàn thành

- Đã bổ sung Family, Health, Education, Community, Fitness, Communication và Entertainment; mỗi topic hiện có 3–4 conversation với learning objective riêng.
- Hoàn thiện grammar foundation còn ít: articles, subject–verb agreement, basic passive và Past Continuous.
- Đạt 947 practical vocabulary/collocations duy nhất trên 100 topic, 325 conversation và 2.210 lượt.
- Exact/normalized/sequence duplicate: 0; near-duplicate warning dưới 1% lượt.
- Mỗi batch 10 topic chạy evaluator regression, validator, manual bilingual review và production build.
- Category data đã được tách thành dynamic chunks; topic browser chỉ dùng generated manifest nhẹ.

## 100 → 250 — hoàn thành

- Đạt 250 topic, 813 conversation, 5.372 lượt và 2.459 vocabulary/collocation duy nhất; level A1/A2/B1/B2 là 65/80/68/37.
- Bổ sung bốn batch có cổng 130/170/210/250 topic; mỗi batch được lấy mẫu 40 conversation, 10 cho mỗi level.
- Canonical 5.372/5.372 và accepted variants 5.564/5.564 pass; Golden evaluator 100 case gồm positive/negative và các lỗi critical.
- Exact, normalized, Vietnamese, sequence duplicate và near-duplicate warning đều 0; structural warning 0; content lint 0 lỗi/0 cảnh báo.
- Manifest nhẹ và category chunks được lazy-load; app shell offline không precache toàn bộ content; progress V5 migration giữ dữ liệu cũ và bắt buộc luyện đủ hai vai.

## 250 → 500

- Thêm career tracks (office, hospitality, retail, technology), regional travel và tình huống xã hội nhiều sắc thái.
- Thiết lập editorial rubric hai vòng: language review và learning-design review.
- Mục tiêu 3.500 vocabulary/collocation duy nhất; theo dõi độ lặp vocabulary và khoảng cách lần xuất hiện.
- Near-duplicate warning dưới 2%; mọi warning phải được reviewer disposition, không tự động bỏ qua.
- Duy trì content manifest là artifact được tạo/kiểm tra ở build; conversation chỉ lazy-load khi mở topic.

## 500 → 1000

- Chỉ thêm topic có communicative intent mới hoặc progression rõ; mở rộng conversation trong topic thay vì tách topic nhỏ giả tạo.
- Cân bằng CEFR dự kiến A1 24%, A2 32%, B1 28%, B2 16%.
- Mục tiêu tối thiểu 3,500 vocabulary/collocations có example được review.
- Exact duplicate luôn 0; normalized duplicate 0; near-duplicate dưới 2.5% và được audit thủ công.
- Chạy full data validation, prerequisite cycle check, evaluator regression, accessibility smoke test và bundle budget cho mỗi release train.

Ở mọi stage, UI chỉ hiển thị dữ liệu thực trong manifest. Progress ID cũ không được đổi; content correction phải giữ stable ID hoặc có migration mapping.
