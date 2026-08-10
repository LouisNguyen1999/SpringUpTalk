# SpringUpTalk

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

Dữ liệu học nằm trong `src/data/conversations`, `src/data/depth` và `src/data/scale`. Dataset hiện có **250 topic, 813 conversation, 5.372 lượt và 2.459 vocabulary/collocation duy nhất** thuộc 19 category; danh mục tổng hợp nằm trong [CONTENT_INDEX.md](CONTENT_INDEX.md). UI chỉ import manifest nhẹ; `contentRepository` tải dynamic chunk theo category khi người học mở topic.

## Thêm nội dung

Dùng `npm run content:new -- <topic-id>` để tạo khung hoặc biên soạn bằng `TopicSeed`/`scaleTopic`; ưu tiên 3–5 conversation với 6–12 lượt. Sau khi đăng ký category chunk, chạy `npm run content:manifest`, `npm run content:lint` và `npm run validate:content`. Mỗi canonical answer phải nằm trong `acceptedAnswers`. Xem [CONTENT_GUIDE.md](CONTENT_GUIDE.md), [DATA_SCHEMA.md](DATA_SCHEMA.md) và [CONTENT_QA.md](CONTENT_QA.md).

## Chấm câu và lưu dữ liệu

Quy trình chấm được mô tả trong [ANSWER_EVALUATION.md](ANSWER_EVALUATION.md). Một conversation chỉ hoàn thành khi cả Person A và Person B đã hoàn thành; role progress được lưu độc lập và replay không nhận lại completion bonus. Review dài hạn dùng các mốc ngay lập tức/1/3/7/14 ngày theo mastery. Progress dùng Zustand persist vào legacy key `lingotalk-progress` trong localStorage để người dùng hiện tại không mất dữ liệu; schema đang ở V5. Xem [TWO_SIDED_PROGRESS.md](TWO_SIDED_PROGRESS.md). Không có dữ liệu nào được gửi ra ngoài.

Kiến trúc, test và hướng mở rộng nằm trong [ARCHITECTURE.md](ARCHITECTURE.md), [TESTING.md](TESTING.md), và [ROADMAP.md](ROADMAP.md).
