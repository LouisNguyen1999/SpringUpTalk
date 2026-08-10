# Two-Sided Conversation Progress

## Completion rules

`conversationProgress[conversationId].roles.A/B` là nguồn sự thật. Một role hoàn thành khi có `completedAt`; conversation hoàn thành khi và chỉ khi cả A và B có `completedAt`. Topic hoàn thành khi mọi conversation bắt buộc đều đạt điều kiện đó.

`completedLessons` và `completedTopics` được giữ để tương thích với recommendation/achievement hiện có, nhưng action V5 chỉ thêm ID vào hai index sau khi kiểm tra role progress. UI, phần trăm và filter đều đọc role progress trực tiếp: một topic ba conversation có sáu practice roles.

Mỗi lượt người học chỉ ghi thống kê cho turn có speaker trùng role đã chọn. Turn của partner là context và không gọi `recordAnswer`, nên không làm tăng sentence mastery, accuracy, mistake hoặc vocabulary production.

## XP and replay

Turn XP được ghi khi người học thực sự trả lời. Lần hoàn thành đầu tiên của mỗi role nhận role bonus hiện có. Khi role thứ hai hoàn thành lần đầu, conversation nhận thêm 10 XP mastery bonus. `completedAt` không bị xóa khi replay; replay tăng attempts nhưng không nhận lại role hoặc conversation completion bonus.

Streak vẫn phụ thuộc daily XP goal. Vì role A/B lưu riêng, người học có thể hoàn thành chúng ở hai ngày khác nhau.

## V4 → V5 migration

Migration luôn giữ XP, today XP, streak, hearts, sentence progress/mastery, mistakes, vocabulary, achievements, favorites, daily goal và settings.

V4 chỉ có `completedLessons` và không lưu role trực tiếp. V5 không giả định ID đó đồng nghĩa cả hai vai đã hoàn thành. Với mỗi conversation cũ:

- migration xem các `sentenceProgress` có prefix của conversation và khôi phục topic từ invariant ID `topic-id-cN` (fallback sang mistake record);
- turn lẻ cung cấp bằng chứng cho Person A, turn chẵn cho Person B theo invariant ID xen kẽ của dataset;
- chỉ role có bằng chứng mới nhận `completedAt` từ lần học gần nhất;
- nếu cả hai phía đều có bằng chứng, conversation được giữ là completed;
- nếu chỉ một phía có bằng chứng, conversation trở thành in progress;
- nếu không có bằng chứng, không role nào được tự động cấp completion.

Legacy topic completion bị bỏ khỏi completion index vì V4 có thể đã cấp nó sau một role. Topic sẽ tự được thêm lại khi các conversation đạt đủ A+B theo V5. Không có dữ liệu học chi tiết nào bị xóa.
