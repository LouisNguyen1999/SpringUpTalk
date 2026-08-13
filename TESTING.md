# Testing

- Unit: contraction-aware normalizer, tokenizer, evaluator/rule engine, mistake detection, XP, two-sided role/conversation/topic completion, duplicate reward protection, date-based review scheduling, recommendations, storage diagnostics và migration V6.
- Component: answer direction/labels, feedback/correction/retry.
- Data: unique IDs, 3–5 conversation/topic, 6–12 turns/conversation, non-empty prompts/answers và canonical acceptance.
- Validator/Report V4: prerequisites/cycle, TODO, level/category/grammar matrices, learning objective/signature, vocabulary normalization/frequency/phrase ratio, sentence length theo CEFR, role balance, intent/register, structural signature, filler language, malformed metadata, duplicate IDs/answers/VI/sequences, near-duplicate và evaluator sweep.

Chạy `npm run content:lint`, `npm run test`, `npm run test:e2e` và `npm run build`. Playwright kiểm tra 320/360/375/390/412/430/768/820/1024/1366/1440/1920 cùng mobile landscape, page overflow, mobile navigation, topic columns, role selector, textarea 16px, long B2 feedback/accepted alternatives và feedback controls. Build luôn chạy validator và typecheck trước Vite. Evaluator regression gồm toàn bộ canonical/accepted answer, Golden set 200 case positive/negative và critical semantics; content repository/search, offline uncached fallback, active-user persistence simulation và progress migration cũng có test riêng.
