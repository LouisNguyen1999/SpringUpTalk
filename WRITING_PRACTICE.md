# Writing Practice

Writing Practice luyện viết đoạn Việt → Anh theo nguyên tắc **Meaning → Understandability → Important details → Grammar clarity → Natural English**. Người học không cần viết giống sample answer.

## Nội dung

- 500 Writing Topics riêng: 300 Daily Communication và 200 IT/Work Communication.
- Level: A1 20–40 words, A2 30–60, B1 50–90, B2 70–130. Khoảng từ chỉ là gợi ý.
- Mỗi topic tách `context` (chỉ giúp hiểu tình huống, không chấm) khỏi `vietnameseSourceText` (toàn bộ nội dung cần viết lại bằng tiếng Anh).
- Mỗi source là một đoạn tiếng Việt translation-ready có nội dung cụ thể; không chứa instruction yêu cầu người học tự nghĩ hoặc tự tạo câu chuyện.
- Mỗi topic có required semantic ideas bám trực tiếp source, critical facts, 2–3 samples, vocabulary, structures, ba cấp hint và common mistakes.
- Manifest chỉ chứa metadata tìm kiếm. Nội dung đầy đủ nằm trong 10 lazy shards, mỗi shard 50 topics.

```bash
npm run writing:validate
npm run writing:report
npm run writing:golden
npm run writing:audit
npm run writing:benchmark
npm run writing:stress
```

`writing:generate` tái tạo artifacts theo W1–W5 từ taxonomy/context/vocabulary đã biên soạn trong 500 Conversation Topics và không sửa dữ liệu nguồn.

Validator có thể chạy riêng từng batch rewrite:

```bash
npm run writing:validate -- --batch=1
npm run writing:validate -- --batch=2
npm run writing:validate -- --batch=3
npm run writing:validate -- --batch=4
npm run writing:validate -- --batch=5
```

Content lint kiểm tra context/source separation, translation readiness, open-ended/instruction-only source, required idea grounding, độ dài, title chung chung, câu hỏi lý thuyết IT, spacing/punctuation, semantic arc trùng và exact/near duplicate.

## Deterministic evaluator

`engine/writing-evaluator` không gọi backend/LLM và không so exact với sample. Pipeline V2 chuẩn hóa text theo câu/mệnh đề, dùng semantic pattern library nhỏ cho các paraphrase an toàn, phân loại required idea thành `covered / partial / missing / contradicted`, rồi bảo vệ number+unit, time, state, polarity, cause/result và before/after. Score vẫn cố định: meaning 60%, critical facts 20%, grammar clarity 15%, readability 5%.

Kết quả gồm `communicates-well`, `mostly-correct`, `needs-improvement`. Một lỗi grammar nhỏ không làm toàn đoạn fail nếu ý nghĩa vẫn rõ; critical mismatch hoặc đảo polarity luôn được ưu tiên.

## Progress và offline

Schema V11 chỉ persist draft theo topic ID, tối đa ba attempts gần nhất, best attempt, idea-level weakness, mastery và lịch review. Static prompts/samples không được ghi vào localStorage. Draft được autosave; lần viết rõ nghĩa chỉ tăng mastery khi topic mới hoặc đã đến hạn theo lịch 1/3/7/14 ngày. Retry vẫn vô hạn và không có hearts/attempt lock.

Rewrite giữ nguyên toàn bộ Writing IDs và learning purpose của source topic/conversation, vì vậy progress hiện có tiếp tục map đúng và không cần migration hoặc reset.

Writing chunks dùng runtime cache PWA giống lesson/vocabulary shards. Topic đã mở online có thể mở lại và tiếp tục draft offline. Topic chưa cache hiển thị fallback rõ ràng.

## Giới hạn

- Evaluator frontend-only dựa trên concept groups/patterns an toàn; paraphrase quá xa, hàm ý, ẩn dụ hoặc coreference dài có thể cần viết rõ hơn dù người đọc thật vẫn hiểu.
- Grammar feedback chỉ báo các rule chắc chắn, không giả vờ là AI proofreader.
- “Một cách diễn đạt tự nhiên” là sample cố định, không phải bản AI rewrite từ câu người học.
- Xóa browser storage sẽ xóa draft/progress cá nhân.
