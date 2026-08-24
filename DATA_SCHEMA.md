# Data Schema

Progress V13 giữ toàn bộ dữ liệu V12 và thêm `writingSkillProgress` cùng feedback category/review mode gọn trên Writing attempt/progress. Session item chỉ chứa module ID, role, reason, priority, status, timestamp và kết quả hoạt động gọn; không sao chép Conversation, Vocabulary hay Writing definition. History được giới hạn 90 ngày.

Hierarchy: `Topic → Conversation → ConversationTurn`.

Topic chứa ID, title song ngữ, category, CEFR level, grammar tags, vocabulary search tags, prerequisite và conversation list. Conversation chứa tình huống, mục tiêu, partner và turns. Turn chứa speaker, Vietnamese prompt, canonical/accepted/natural answers, keywords, grammar, vocabulary, mistake rules, explanation, hint, difficulty và semantic constraints tùy chọn.

`SemanticConstraints` có thể mô tả `intent`, `polarity`, nhóm concept bắt buộc/cấm, giá trị quan trọng, token ngữ pháp và kỳ vọng tense. Mỗi nhóm là danh sách cách biểu đạt tương đương; evaluator yêu cầu ít nhất một lựa chọn trong nhóm. Đây là metadata biên tập có chủ đích, không thay thế canonical/accepted answers.

Progress schema V13 gồm XP/today XP, activity date, streak, current level, role/conversation progress, completed indexes, sentence statistics, mistake records, vocabulary mastery, custom vocabulary/practice, disabled practice IDs, writing drafts/progress/path preference/current unit/skill mastery, Daily session/history, achievements, favorites, goal và settings. V7 lưu progress của static vocabulary bằng ID; V8 thêm CRUD/disable state; V9 thêm Writing; V10 thêm contradiction IDs, missing idea kinds, weakness counts và `lastSuccessfulAt`; V11 thêm Daily orchestration references; V12 thêm Writing Path references; V13 thêm mastery theo 16 Writing skill, error taxonomy và exact/variant/skill review mode qua migration an toàn. `SentenceProgress` lưu attempts, correct, incorrect, first-try correct, consecutive correct, mastery và `nextReviewAt`. `ConversationProgress` lưu `roles.A` và `roles.B`; mỗi role có attempts, completedAt, accuracy và XP. Conversation không lưu boolean completion độc lập: `A.completedAt && B.completedAt` là nguồn sự thật. Static `WritingLearningMetadata`, fingerprints và unit definitions không persist. `version` bắt buộc; mọi trường mới phải có migration/default.

Writing static schema gồm `WritingPracticeTopic`, `WritingRequiredIdea`, `WritingCriticalFact`, hints, samples và expected word range. `context` chỉ giải thích tình huống; `vietnameseSourceText` là nội dung translation-ready và là nguồn của required ideas. Required idea hỗ trợ reusable `semanticPatterns`, supporting/critical concepts, explicit contradictions và `kind`. Critical fact hỗ trợ anchors cùng cause/result direction. Persistence chỉ chứa `writingDrafts: Record<topicId,string>` và `writingProgress: Record<topicId,WritingTopicProgress>`. Mỗi progress cap ba attempts, lưu best attempt, missing/contradicted ideas, idea-kind weakness, critical error IDs, spaced mastery và `nextReviewAt`; không persist context, Vietnamese source hoặc sample answer.

`VocabularyEntry` là definition nhiều nghĩa, POS/IPA/collocation/example/source. `VocabularySummary` là index nhẹ. `VocabularyPracticeItem` liên kết `vocabularyId`/`senseId` với prompt Việt, canonical/accepted/natural answers, target expressions và semantic constraints. `VocabularyProgress` chỉ chứa counters, first-try/target-use, mastery, favorite và review dates.

Online/custom records có `VocabularySourceReference`, `lookupUpdatedAt`, `generated` và `edited`. Static edit là local override cùng ID; generated practice có ID riêng; `disabledVocabularyPracticeIds` chỉ điều khiển active bank và không sửa generated shard.

ID phải ổn định và duy nhất vì progress tham chiếu ID. Không tái sử dụng ID cho nội dung có ý nghĩa khác.
