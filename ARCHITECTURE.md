# Architecture

Ứng dụng chia thành bốn lớp nhỏ:

- `data/types`: schema và content thuần, không phụ thuộc React.
- `engine`: các hàm thuần cho normalize, similarity, evaluation, mistake rules, XP và scheduling.
- `store`: persistence và các action thay đổi progress.
- `components/pages`: trình bày và điều phối interaction; không chứa thuật toán chấm câu.

Dependency đi từ UI → store/engine → types/data. Engine không import UI hoặc browser state nên test nhanh và có thể tái sử dụng trong worker sau này.

Route được lazy-load. Topic list và search dùng generated manifest không chứa turns; mỗi topic chỉ giữ metadata khám phá, tối đa bảy vocabulary tags và alias tìm kiếm được kiểm soát. `contentRepository` tải conversation/depth/scale chunks theo category khi mở topic. App shell được PWA precache, còn content chunks dùng `StaleWhileRevalidate` trong cache `lesson-content-v1`, tối đa 80 entry và hết hạn sau 30 ngày, nên không precache toàn bộ 500 topic. Topic đã mở dùng được từ runtime cache; nếu chunk chưa có khi offline, repository trả lỗi có kiểu và UI hiện thông báo quay lại thư viện thay vì blank screen. Không cần tạo component mới khi thêm topic.

Vocabulary có repository tập trung riêng. Search chỉ tải generated index nhẹ; detail và 2.500 practice item được chia 16 shard và lazy-load bằng ID. Generator lấy vocabulary annotation và câu nguồn từ 500 topic, còn validator kiểm tra schema, source reference, evaluator acceptance, target expression và coverage 500 mục × 5 câu. Route practice dùng evaluator chung qua adapter `vocabulary-evaluator`; adapter chỉ thêm phân loại đã dùng target expression hay mới truyền đạt đúng nghĩa.

Flexible vocabulary dùng provider abstraction ở `services/vocabulary-lookup`: Free Dictionary → Wiktionary fallback, Tatoeba usage seeds và MyMemory cho segment EN→VI. Mỗi request có timeout; provider failure không treo UI. Pipeline chỉ persist bundle sau khi đủ 5 item qua quality gate. `vocabulary-practice-bank` hợp nhất static shard với local override/generated items và disabled IDs trước khi đưa vào cùng Practice/Review/mastery flow.

localStorage được chọn cho progress nhỏ và đồng bộ. `CURRENT_PROGRESS_VERSION` cùng `migrateProgress` bảo đảm dữ liệu cũ có default mới. V5 thêm `conversationProgress` với hai nhánh role A/B; V6 loại bỏ hearts; V7 chuyển static vocabulary progress sang tham chiếu ID và thêm custom vocabulary/practice; V8 thêm practice disabled state và CRUD cleanup mà không mất V7 progress. Conversation completion luôn được derive từ hai `completedAt`. Không persist topic/conversation/static vocabulary definitions. Khi history vượt quy mô phù hợp, repository có thể thay storage adapter bằng IndexedDB mà không đổi component.

Review có hai vòng độc lập: hàng đợi trong lesson vẫn đưa câu sai trở lại sau ba câu, còn scheduler dài hạn gán mastery `new → learning → familiar → strong → mastered` với khoảng ngay lập tức/1/3/7/14 ngày. Mistakes page hợp nhất câu đến hạn, điểm yếu, từ vựng và lỗi gần đây bằng ID ổn định; recommendation engine xếp hạng đường học deterministically theo level, mastery và hoạt động gần nhất.

Content pipeline gồm manifest/search-index generator, Content Report V4, generated content index, scaffold CLI V2 và content lint. Validator quét schema, TODO, canonical/accepted, prerequisite, duplicate exact/normalized/sequence và near-duplicate theo bucket; report thêm accepted-answer distribution, flexible-turn depth, structural signature, objective, intent/register, role balance, filler, phrase ratio và coverage matrices.

Layout dùng sidebar ở desktop và bottom navigation có safe-area ở mobile. Lesson đứng ngoài AppShell để navigation không che composer; `100dvh` làm workspace co theo browser chrome/keyboard, message area tự scroll và input/action luôn ở cuối workspace. Breakpoint CSS điều khiển layout, không dùng user-agent hoặc `window.innerWidth`.
