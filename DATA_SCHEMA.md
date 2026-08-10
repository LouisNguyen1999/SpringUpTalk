# Data Schema

Hierarchy: `Topic → Conversation → ConversationTurn`.

Topic chứa ID, title song ngữ, category, CEFR level, grammar tags, vocabulary search tags, prerequisite và conversation list. Conversation chứa tình huống, mục tiêu, partner và turns. Turn chứa speaker, Vietnamese prompt, canonical/accepted/natural answers, keywords, grammar, vocabulary, mistake rules, explanation, hint, difficulty và semantic constraints tùy chọn.

`SemanticConstraints` có thể mô tả `intent`, `polarity`, nhóm concept bắt buộc/cấm, giá trị quan trọng, token ngữ pháp và kỳ vọng tense. Mỗi nhóm là danh sách cách biểu đạt tương đương; evaluator yêu cầu ít nhất một lựa chọn trong nhóm. Đây là metadata biên tập có chủ đích, không thay thế canonical/accepted answers.

Progress schema V5 gồm XP/today XP, activity date, streak, hearts, current level, role/conversation progress, completed indexes, sentence statistics, mistake records, vocabulary mastery, achievements, favorites, goal và settings. `SentenceProgress` lưu attempts, correct, incorrect, first-try correct, consecutive correct, mastery và `nextReviewAt`. `ConversationProgress` lưu `roles.A` và `roles.B`; mỗi role có attempts, completedAt, accuracy và XP. Conversation không lưu boolean completion độc lập: `A.completedAt && B.completedAt` là nguồn sự thật. `version` bắt buộc; mọi trường mới phải có migration/default.

ID phải ổn định và duy nhất vì progress tham chiếu ID. Không tái sử dụng ID cho nội dung có ý nghĩa khác.
