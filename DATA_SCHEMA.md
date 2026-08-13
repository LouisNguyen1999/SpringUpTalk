# Data Schema

Hierarchy: `Topic → Conversation → ConversationTurn`.

Topic chứa ID, title song ngữ, category, CEFR level, grammar tags, vocabulary search tags, prerequisite và conversation list. Conversation chứa tình huống, mục tiêu, partner và turns. Turn chứa speaker, Vietnamese prompt, canonical/accepted/natural answers, keywords, grammar, vocabulary, mistake rules, explanation, hint, difficulty và semantic constraints tùy chọn.

`SemanticConstraints` có thể mô tả `intent`, `polarity`, nhóm concept bắt buộc/cấm, giá trị quan trọng, token ngữ pháp và kỳ vọng tense. Mỗi nhóm là danh sách cách biểu đạt tương đương; evaluator yêu cầu ít nhất một lựa chọn trong nhóm. Đây là metadata biên tập có chủ đích, không thay thế canonical/accepted answers.

Progress schema V8 gồm XP/today XP, activity date, streak, current level, role/conversation progress, completed indexes, sentence statistics, mistake records, vocabulary mastery, custom vocabulary/practice, disabled practice IDs, achievements, favorites, goal và settings. V7 lưu progress của static vocabulary bằng ID thay vì sao chép definition; V8 thêm CRUD/disable state và giữ nguyên dữ liệu V7 qua migration. `SentenceProgress` lưu attempts, correct, incorrect, first-try correct, consecutive correct, mastery và `nextReviewAt`. `ConversationProgress` lưu `roles.A` và `roles.B`; mỗi role có attempts, completedAt, accuracy và XP. Conversation không lưu boolean completion độc lập: `A.completedAt && B.completedAt` là nguồn sự thật. `version` bắt buộc; mọi trường mới phải có migration/default.

`VocabularyEntry` là definition nhiều nghĩa, POS/IPA/collocation/example/source. `VocabularySummary` là index nhẹ. `VocabularyPracticeItem` liên kết `vocabularyId`/`senseId` với prompt Việt, canonical/accepted/natural answers, target expressions và semantic constraints. `VocabularyProgress` chỉ chứa counters, first-try/target-use, mastery, favorite và review dates.

Online/custom records có `VocabularySourceReference`, `lookupUpdatedAt`, `generated` và `edited`. Static edit là local override cùng ID; generated practice có ID riêng; `disabledVocabularyPracticeIds` chỉ điều khiển active bank và không sửa generated shard.

ID phải ổn định và duy nhất vì progress tham chiếu ID. Không tái sử dụng ID cho nội dung có ý nghĩa khác.
