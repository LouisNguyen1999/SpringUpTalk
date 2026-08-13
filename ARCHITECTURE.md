# Architecture

Ứng dụng chia thành bốn lớp nhỏ:

- `data/types`: schema và content thuần, không phụ thuộc React.
- `engine`: các hàm thuần cho normalize, similarity, evaluation, mistake rules, XP và scheduling.
- `store`: persistence và các action thay đổi progress.
- `components/pages`: trình bày và điều phối interaction; không chứa thuật toán chấm câu.

Dependency đi từ UI → store/engine → types/data. Engine không import UI hoặc browser state nên test nhanh và có thể tái sử dụng trong worker sau này.

Route được lazy-load. Topic list và search dùng generated manifest không chứa turns; mỗi topic chỉ giữ metadata khám phá, tối đa bảy vocabulary tags và alias tìm kiếm được kiểm soát. `contentRepository` tải conversation/depth/scale chunks theo category khi mở topic. App shell được PWA precache, còn content chunks dùng `StaleWhileRevalidate` trong cache `lesson-content-v1`, tối đa 80 entry và hết hạn sau 30 ngày, nên không precache toàn bộ 500 topic. Topic đã mở dùng được từ runtime cache; nếu chunk chưa có khi offline, repository trả lỗi có kiểu và UI hiện thông báo quay lại thư viện thay vì blank screen. Không cần tạo component mới khi thêm topic.

localStorage được chọn cho progress nhỏ và đồng bộ. `CURRENT_PROGRESS_VERSION` cùng `migrateProgress` bảo đảm dữ liệu cũ có default mới. V5 thêm `conversationProgress` với hai nhánh role A/B; V6 loại bỏ hearts để lượt luyện luôn vô hạn. Conversation completion luôn được derive từ hai `completedAt`, còn `completedLessons`/`completedTopics` chỉ là compatibility indexes được ghi khi điều kiện thật đã đạt. Migration giữ toàn bộ XP, streak, sentence mastery, mistakes, vocabulary và settings; role cũ chỉ được suy ra khi các turn đã luyện cung cấp bằng chứng. Settings hiển thị chẩn đoán dung lượng. Mô phỏng deterministic gồm 100 role hoàn thành, 50 lỗi/review, 100 sentence progress và 300 vocabulary entry chiếm 170.021 byte so với 367 byte mặc định, vẫn xa ngưỡng cảnh báo 2 MiB. Không persist topic/conversation content. Khi history vượt quy mô phù hợp, repository có thể thay storage adapter bằng IndexedDB mà không đổi component.

Review có hai vòng độc lập: hàng đợi trong lesson vẫn đưa câu sai trở lại sau ba câu, còn scheduler dài hạn gán mastery `new → learning → familiar → strong → mastered` với khoảng ngay lập tức/1/3/7/14 ngày. Mistakes page hợp nhất câu đến hạn, điểm yếu, từ vựng và lỗi gần đây bằng ID ổn định; recommendation engine xếp hạng đường học deterministically theo level, mastery và hoạt động gần nhất.

Content pipeline gồm manifest/search-index generator, Content Report V4, generated content index, scaffold CLI V2 và content lint. Validator quét schema, TODO, canonical/accepted, prerequisite, duplicate exact/normalized/sequence và near-duplicate theo bucket; report thêm accepted-answer distribution, flexible-turn depth, structural signature, objective, intent/register, role balance, filler, phrase ratio và coverage matrices.

Layout dùng sidebar ở desktop và bottom navigation có safe-area ở mobile. Lesson đứng ngoài AppShell để navigation không che composer; `100dvh` làm workspace co theo browser chrome/keyboard, message area tự scroll và input/action luôn ở cuối workspace. Breakpoint CSS điều khiển layout, không dùng user-agent hoặc `window.innerWidth`.
