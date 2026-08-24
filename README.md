# SpringUpTalk

Home hiện dẫn vào **Luyện tập hôm nay**: một Daily Learning session bền vững kết hợp due review, Conversation, Vocabulary và Writing dựa trên mastery/lỗi thật. Quick, Standard, Focus cùng bốn preference thay đổi kế hoạch mà không thay evaluator của module gốc.

SpringUpTalk là ứng dụng frontend giúp người Việt luyện viết tiếng Anh qua hội thoại hai vai. Ứng dụng không có backend, không gọi AI/API và không giả vờ hiểu mọi câu tự do: câu trả lời được đánh giá cục bộ dựa trên đáp án được biên soạn, chuẩn hoá, độ tương đồng token, từ khoá bắt buộc và rule lỗi phổ biến.

## Chạy dự án

Yêu cầu Node.js 20+.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run validate:content
npm run content:report
npm run content:lint
npm run content:new -- --help
npm run vocabulary:generate
npm run vocabulary:validate
npm run vocabulary:report
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
```

## Cách học

1. Mở một chủ đề và chọn cuộc hội thoại.
2. Chọn đóng vai Person A hoặc Person B. Nhân vật còn lại phản hồi từ dataset.
3. Đọc prompt có nhãn `VIETNAMESE`, viết vào ô `YOUR ENGLISH`, rồi kiểm tra.
4. Nếu sai, xem diff/giải thích và thử lại; sau ba lần có thể xem đáp án.
5. Học lại với vai còn lại để luyện cả đặt câu hỏi lẫn phản hồi.

Ba mức hint lần lượt hiện từ khoá, điểm ngữ pháp và chữ cái đầu. Hint làm giảm XP. Câu sai hoặc câu xem đáp án được lưu vào Review. Hoàn thành mục tiêu XP mới tăng streak.

Vocabulary Practice cho phép tìm offline, xem nhiều nghĩa/collocation/ví dụ nguồn và luyện Việt–Anh theo Quick 5, Standard 10 hoặc Master 5 lần đúng liên tiếp. Người học có thể thêm/sửa/xóa custom vocabulary và practice bank. Khi online, app tra cứu qua nhiều public providers, tạo đúng 5 câu đã qua quality gate rồi cache local; khi offline vẫn có thể nhập/sửa/luyện thủ công. Xem [VOCABULARY_PRACTICE.md](VOCABULARY_PRACTICE.md).

Writing Practice bổ sung 500 bài luyện viết đoạn riêng (300 Daily, 200 IT/Work). Evaluator deterministic chấm semantic idea coverage, critical facts và feedback 4 tầng thay vì exact sample; module có progressive hints không lộ đáp án, word-aware diff, autosave draft, retry vô hạn, mastery theo 16 skill, variant review và lazy PWA shards. 24-unit Writing Learning Path tổ chức A1→B2, có Daily/IT filter, soft unlock, Continue Learning theo draft→review→weak skill→next topic và vẫn giữ Free Browse. Xem [WRITING_PRACTICE.md](WRITING_PRACTICE.md), [WRITING_LEARNING_PATH.md](WRITING_LEARNING_PATH.md) và [WRITING_QUALITY_FEEDBACK_ENGINE.md](WRITING_QUALITY_FEEDBACK_ENGINE.md).

## Cấu trúc

```text
src/
  app/                 route composition
  components/          UI tái sử dụng theo domain
  data/                content builder, manifest, category chunks
  engine/              pure business rules
  pages/               route-level screens
  store/               versioned local persistence
  tests/               unit/component/data tests
  types/               domain contracts
scripts/validate-content.ts
```

Dữ liệu học nằm trong `src/data/conversations`, `src/data/depth` và `src/data/scale`. Số liệu authoritative của checkpoint hiện tại được tạo tự động trong [CONTENT_INDEX.md](CONTENT_INDEX.md). UI chỉ import manifest nhẹ có search index dựng sẵn; `contentRepository` tải dynamic chunk khi người học mở topic.

## Thêm nội dung

Dùng `npm run content:new-topic -- --help` để tạo khung có TODO bắt buộc review hoặc biên soạn bằng `TopicSeed`/`scaleTopic`; ưu tiên 3–5 conversation với 6–12 lượt. Sau khi đăng ký chunk, chạy `npm run content:manifest`, `npm run content:index`, `npm run content:lint` và `npm run validate:content`. Mỗi canonical answer phải nằm trong `acceptedAnswers`. Xem [CONTENT_GUIDE.md](CONTENT_GUIDE.md), [DATA_SCHEMA.md](DATA_SCHEMA.md) và [CONTENT_QA.md](CONTENT_QA.md).

## Chấm câu và lưu dữ liệu

Quy trình chấm được mô tả trong [ANSWER_EVALUATION.md](ANSWER_EVALUATION.md). Một conversation chỉ hoàn thành khi cả Person A và Person B đã hoàn thành; role progress được lưu độc lập và replay không nhận lại completion bonus. Review dài hạn dùng các mốc ngay lập tức/1/3/7/14 ngày theo mastery. Progress dùng Zustand persist vào legacy key `lingotalk-progress` trong localStorage để người dùng hiện tại không mất dữ liệu; schema đang ở V13 và lượt luyện luôn vô hạn. Static vocabulary definitions không được sao chép vào progress; chỉ custom definition, generated/edited practice và disabled IDs được lưu cục bộ. Writing chỉ lưu draft/attempt/mastery/idea weakness, feedback category, skill mastery và Path preference/current unit theo topic ID; Daily chỉ lưu content references và history gọn. Tra cứu online chỉ gửi term/segment ngắn tới các public providers khi người dùng chủ động bấm lookup/refresh. Xem [TWO_SIDED_PROGRESS.md](TWO_SIDED_PROGRESS.md) và [DAILY_LEARNING_ENGINE.md](DAILY_LEARNING_ENGINE.md).

Kiến trúc, test và hướng mở rộng nằm trong [ARCHITECTURE.md](ARCHITECTURE.md), [TESTING.md](TESTING.md), và [ROADMAP.md](ROADMAP.md).
