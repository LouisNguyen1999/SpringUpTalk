# Writing Vietnamese → English Rewrite Report

## Baseline audit

Trước phase này, 500 topic có `context` nhưng phần cần viết vẫn nằm trong `vietnamesePrompt` cùng instruction “Hãy kể lại…” hoặc “Hãy giải thích…”. Vì context, target text và task instruction chưa tách riêng, 500/500 topic cần migration nội dung.

## Rewrite result

| Metric | Result |
|---|---:|
| Writing topics | 500 |
| Daily / IT | 300 / 200 |
| Context present | 500/500 |
| Vietnamese source text | 500/500 |
| Translation-ready | 500/500 |
| Open-ended prompts | 0 |
| Instruction-only prompts | 0 |
| Required ideas grounded in source | 500/500 |
| Samples | 1,500 |
| Exact / near duplicates | 0 / 0 |
| A1 / A2 / B1 / B2 | 96 / 137 / 162 / 105 |

`context` chỉ hiển thị tình huống. `vietnameseSourceText` là nội dung hoàn chỉnh người học cần viết lại. Instruction dùng một câu chung tại UI và không được lưu lặp lại trong từng topic.

## Semantic evaluator

Evaluator vẫn dựa trên required ideas, semantic concepts và critical facts; không so exact với sample. Golden set giữ nguyên 500 case: 300/300 positive accepted và 200/200 negative rejected/downgraded.

## QA

- Automated content audit: 500/500.
- Manual sample: 100 topic — A1/A2/B1/B2 mỗi level 25, Daily 60, IT 40.
- Validator: context/source separation, source length, open-ended/instruction-only patterns, required idea grounding, sample semantic truth và duplicate control.

## Progress compatibility

Toàn bộ ID giữ nguyên (`writing:{sourceTopicId}` cho Daily và `writing:{sourceTopicId}:{conversationId}` cho IT). Nội dung tiếp tục cùng source conversation và learning purpose, nên draft, mastery và review schedule hiện có không cần reset hoặc migration.
