export type ITEnglishLevel = 1 | 2 | 3 | 4;

export interface ITEnglishTurn {
  id: string;
  speaker: string;
  role: string;
  text: string;
  vietnamese: string;
  notes?: string[];
}

export interface ITEnglishTopic {
  id: string;
  number: number;
  title: string;
  level: ITEnglishLevel;
  levelTitle: string;
  description: string;
  objectives: string[];
  estimatedMinutes: number;
  turns: ITEnglishTurn[];
}

type Draft = Omit<ITEnglishTopic, 'number' | 'levelTitle' | 'turns'> & {
  turns: Array<[speaker: string, role: string, text: string, vietnamese: string, notes?: string[]]>;
};

const LEVEL_TITLES: Record<ITEnglishLevel, string> = {
  1: 'Everyday IT Communication',
  2: 'Technical Discussions',
  3: 'Real-World Engineering Scenarios',
  4: 'Senior Developer and Professional Communication',
};

function makeTopic(number: number, draft: Draft): ITEnglishTopic {
  return {
    ...draft,
    number,
    levelTitle: LEVEL_TITLES[draft.level],
    turns: draft.turns.map(([speaker, role, text, vietnamese, notes], index) => ({
      id: `${draft.id}-sentence-${String(index + 1).padStart(2, '0')}`,
      speaker,
      role,
      text,
      vietnamese,
      notes,
    })),
  };
}

const drafts: Draft[] = [
  {
    id: 'introducing-yourself', title: 'Introducing Yourself as a Software Engineer', level: 1,
    description: 'Meet a new teammate and describe your role, experience, and interests without overstating your background.', estimatedMinutes: 8,
    objectives: ['Introduce your role and team', 'Describe current responsibilities', 'Ask a welcoming follow-up question'],
    turns: [
      ['Maya', 'Tech Lead', 'Hi, I’m Maya, the tech lead for the payments team. What should I call you?', 'Chào bạn, mình là Maya, trưởng nhóm kỹ thuật thanh toán. Mình nên gọi bạn là gì?'],
      ['Minh', 'Software Engineer', 'Hi, I’m Minh. I’m a software engineer, and I joined the team this week.', 'Chào Maya, mình là Minh. Mình là kỹ sư phần mềm và mới gia nhập nhóm tuần này.'],
      ['Maya', 'Tech Lead', 'Welcome aboard. What kind of work have you been doing recently?', 'Chào mừng bạn. Gần đây bạn làm những công việc gì?'],
      ['Minh', 'Software Engineer', 'I’ve mainly worked on Java services and REST APIs for an online retail platform.', 'Mình chủ yếu làm dịch vụ Java và REST API cho một nền tảng bán lẻ trực tuyến.'],
      ['Maya', 'Tech Lead', 'That experience will be useful here. Which area would you like to learn first?', 'Kinh nghiệm đó sẽ hữu ích ở đây. Bạn muốn tìm hiểu phần nào trước?'],
      ['Minh', 'Software Engineer', 'I’d like to understand the order flow and how our services handle payment failures.', 'Mình muốn hiểu luồng đặt hàng và cách các dịch vụ xử lý lỗi thanh toán.'],
      ['Maya', 'Tech Lead', 'Let’s pair on a small bug tomorrow, then I’ll walk you through the architecture.', 'Ngày mai chúng ta cùng xử lý một lỗi nhỏ, sau đó mình sẽ giới thiệu kiến trúc cho bạn.'],
      ['Minh', 'Software Engineer', 'That sounds great. I’ll read the onboarding notes before then.', 'Nghe hay đấy. Trước đó mình sẽ đọc tài liệu hướng dẫn cho nhân viên mới.'],
    ],
  },
  {
    id: 'daily-work', title: 'Talking About Your Daily Work', level: 1,
    description: 'Explain a normal engineering day and coordinate focused work with a teammate.', estimatedMinutes: 8,
    objectives: ['Describe routine responsibilities', 'Explain how you plan focused work', 'Coordinate a hand-off'],
    turns: [
      ['Alex', 'Developer', 'How do you usually organize your workday?', 'Bạn thường sắp xếp ngày làm việc như thế nào?'],
      ['Linh', 'Software Engineer', 'I check the team board first, then I handle code reviews before starting my main task.', 'Đầu tiên mình xem bảng công việc của nhóm, sau đó duyệt mã trước khi bắt đầu nhiệm vụ chính.'],
      ['Alex', 'Developer', 'Do you get many interruptions while you are coding?', 'Bạn có thường bị gián đoạn khi đang viết mã không?'],
      ['Linh', 'Software Engineer', 'Sometimes. I block out an hour in the morning for focused work and keep chat notifications quiet.', 'Thỉnh thoảng. Mình dành một giờ buổi sáng để tập trung và tắt thông báo trò chuyện.'],
      ['Alex', 'Developer', 'I need your review on the checkout change. When might you have time?', 'Mình cần bạn xem lại thay đổi ở bước thanh toán. Khi nào bạn có thời gian?'],
      ['Linh', 'Software Engineer', 'I can review it after lunch. Please add the test results to the pull request.', 'Mình có thể xem sau bữa trưa. Bạn hãy thêm kết quả kiểm thử vào pull request nhé.'],
      ['Alex', 'Developer', 'I’ll add them now. Is there anything else you need from me?', 'Mình sẽ thêm ngay. Bạn còn cần mình hỗ trợ gì không?'],
      ['Linh', 'Software Engineer', 'No, that’s enough for now. I’ll leave comments if anything needs clarification.', 'Hiện tại vậy là đủ rồi. Nếu có chỗ cần làm rõ, mình sẽ để lại bình luận.'],
    ],
  },
  {
    id: 'daily-standup', title: 'Daily Stand-up Meetings and Progress Updates', level: 1,
    description: 'Give a concise update, state a blocker clearly, and agree on a useful next step.', estimatedMinutes: 8,
    objectives: ['Summarize completed work', 'State today’s plan', 'Describe a blocker and its impact'],
    turns: [
      ['Nora', 'Scrum Master', 'What did you complete yesterday, Minh?', 'Hôm qua bạn đã hoàn thành việc gì, Minh?'],
      ['Minh', 'Developer', 'I finished the authentication endpoint and fixed two JWT validation bugs.', 'Mình đã hoàn thành endpoint xác thực và sửa hai lỗi kiểm tra JWT.'],
      ['Nora', 'Scrum Master', 'What are you planning to work on today?', 'Hôm nay bạn dự định làm gì?'],
      ['Minh', 'Developer', 'I’ll implement the authorization checks and add integration tests for the admin routes.', 'Mình sẽ triển khai các bước kiểm tra phân quyền và thêm kiểm thử tích hợp cho các tuyến quản trị.'],
      ['Nora', 'Scrum Master', 'Do you have any blockers?', 'Bạn có vướng mắc nào không?'],
      ['Minh', 'Developer', 'The development database connection is failing, so I can’t verify the new migration yet.', 'Kết nối cơ sở dữ liệu phát triển đang lỗi nên mình chưa thể xác minh migration mới.'],
      ['Nora', 'Scrum Master', 'I’ll ask DevOps to check the credentials. Will that affect today’s plan?', 'Mình sẽ nhờ DevOps kiểm tra thông tin kết nối. Việc này có ảnh hưởng kế hoạch hôm nay không?'],
      ['Minh', 'Developer', 'If it is restored this morning, I can stay on schedule. I’ll post an update by noon.', 'Nếu kết nối được khôi phục trong sáng nay, mình vẫn kịp kế hoạch. Mình sẽ cập nhật trước buổi trưa.'],
    ],
  },
  {
    id: 'current-project', title: 'Introducing Your Current Project', level: 1,
    description: 'Give a clear project overview, explain your contribution, and answer a stakeholder’s follow-up.', estimatedMinutes: 9,
    objectives: ['Summarize a project purpose', 'Explain your contribution', 'Describe one current challenge'],
    turns: [
      ['Sofia', 'Product Owner', 'Could you give me a quick overview of the project you’re working on?', 'Bạn có thể giới thiệu nhanh về dự án đang làm không?'],
      ['An', 'Developer', 'We’re building a dashboard that helps support agents resolve delayed orders faster.', 'Chúng tôi đang xây dựng bảng điều khiển giúp nhân viên hỗ trợ xử lý đơn hàng trễ nhanh hơn.'],
      ['Sofia', 'Product Owner', 'What part are you responsible for?', 'Bạn phụ trách phần nào?'],
      ['An', 'Developer', 'I own the order search API and coordinate its integration with the frontend.', 'Tôi phụ trách API tìm kiếm đơn hàng và phối hợp tích hợp với giao diện.'],
      ['Sofia', 'Product Owner', 'How will agents know which orders need attention first?', 'Nhân viên sẽ biết đơn nào cần xử lý trước bằng cách nào?'],
      ['An', 'Developer', 'We rank them by delay and show the latest delivery estimate beside each order.', 'Chúng tôi xếp hạng theo thời gian trễ và hiển thị dự kiến giao hàng mới nhất bên cạnh mỗi đơn.'],
      ['Sofia', 'Product Owner', 'What is the main challenge at the moment?', 'Thách thức lớn nhất hiện tại là gì?'],
      ['An', 'Developer', 'The carrier data arrives in different formats. We’re agreeing on a normalized status model this week.', 'Dữ liệu từ đơn vị vận chuyển có nhiều định dạng. Tuần này chúng tôi đang thống nhất mô hình trạng thái chuẩn hóa.'],
    ],
  },
  {
    id: 'clarifying-requirements', title: 'Asking Questions and Clarifying Requirements', level: 1,
    description: 'Turn an ambiguous product request into testable behavior before implementation starts.', estimatedMinutes: 9,
    objectives: ['Ask focused clarification questions', 'Confirm edge cases', 'Restate acceptance criteria'],
    turns: [
      ['Priya', 'Product Owner', 'Users should be able to export their reports. Can you add that this sprint?', 'Người dùng cần xuất báo cáo. Bạn có thể thêm chức năng đó trong sprint này không?'],
      ['Daniel', 'Developer', 'Sure. Could you clarify which formats they need: CSV, PDF, or both?', 'Được. Bạn làm rõ giúp họ cần định dạng nào: CSV, PDF hay cả hai?'],
      ['Priya', 'Product Owner', 'CSV is enough for the first release. They need the current filters included.', 'CSV là đủ cho bản đầu tiên. Các bộ lọc hiện tại cần được áp dụng.'],
      ['Daniel', 'Developer', 'Should the export contain every matching row, even when the table is paginated?', 'Tệp xuất có cần chứa mọi hàng phù hợp, kể cả khi bảng đang chia trang không?'],
      ['Priya', 'Product Owner', 'Yes, it should include all matching rows, not only the visible page.', 'Có, tệp cần chứa mọi hàng phù hợp, không chỉ trang đang hiển thị.'],
      ['Daniel', 'Developer', 'And should we exclude columns hidden by the user?', 'Còn các cột người dùng đã ẩn thì có loại khỏi tệp không?'],
      ['Priya', 'Product Owner', 'Please include only the columns currently selected in the table settings.', 'Hãy chỉ đưa vào các cột đang được chọn trong cài đặt bảng.'],
      ['Daniel', 'Developer', 'Understood: CSV, current filters, all matching rows, and selected columns. I’ll add those criteria to the ticket.', 'Đã rõ: CSV, bộ lọc hiện tại, mọi hàng phù hợp và các cột được chọn. Tôi sẽ thêm tiêu chí đó vào ticket.'],
    ],
  },
  {
    id: 'tasks-priorities', title: 'Discussing Tasks, Priorities, and Deadlines', level: 1,
    description: 'Compare task urgency with available capacity and agree on a realistic delivery order.', estimatedMinutes: 9,
    objectives: ['Explain task dependencies', 'Negotiate priority', 'Set a realistic date'],
    turns: [
      ['Ravi', 'Tech Lead', 'We have the audit export and the profile redesign due this week. How is your capacity?', 'Tuần này phải xong bản xuất kiểm toán và thiết kế lại hồ sơ. Bạn còn khả năng không?'],
      ['Emma', 'Developer', 'I can finish one of them. The export depends on a permissions change that is still under review.', 'Tôi có thể hoàn thành một việc. Bản xuất phụ thuộc vào thay đổi phân quyền vẫn đang được duyệt.'],
      ['Ravi', 'Tech Lead', 'The compliance team needs the export for Friday’s review.', 'Nhóm tuân thủ cần bản xuất cho buổi đánh giá thứ Sáu.'],
      ['Emma', 'Developer', 'Then I suggest prioritizing the export and moving the redesign to next week.', 'Vậy tôi đề xuất ưu tiên bản xuất và chuyển phần thiết kế lại sang tuần sau.'],
      ['Ravi', 'Tech Lead', 'Could you deliver the export by Thursday if the permissions change is approved today?', 'Nếu thay đổi phân quyền được duyệt hôm nay, bạn có thể giao bản xuất vào thứ Năm không?'],
      ['Emma', 'Developer', 'Yes, if review is complete by noon. Otherwise, I’ll need Friday morning for implementation and verification.', 'Được, nếu việc duyệt xong trước trưa. Nếu không, tôi cần sáng thứ Sáu để triển khai và xác minh.'],
      ['Ravi', 'Tech Lead', 'I’ll ask for an earlier review and update the plan with that dependency.', 'Tôi sẽ đề nghị duyệt sớm và cập nhật kế hoạch kèm phụ thuộc đó.'],
      ['Emma', 'Developer', 'Thanks. I’ll share a status after the review so we can adjust early if needed.', 'Cảm ơn. Tôi sẽ báo tình hình sau khi có kết quả duyệt để chúng ta sớm điều chỉnh nếu cần.'],
    ],
  },
  {
    id: 'international-client', title: 'Communicating with International Clients', level: 1,
    description: 'Discuss a client issue in plain language, confirm impact, and agree on an update cadence.', estimatedMinutes: 9,
    objectives: ['Explain a technical issue simply', 'Confirm business impact', 'Agree on a follow-up update'],
    turns: [
      ['Jordan', 'Client', 'The order page is taking longer to load this morning. Is something wrong?', 'Sáng nay trang đơn hàng tải chậm hơn. Có vấn đề gì không?'],
      ['Thao', 'Software Engineer', 'We’ve noticed the slowdown too. The order service is responding more slowly than usual.', 'Chúng tôi cũng nhận thấy tình trạng chậm. Dịch vụ đơn hàng đang phản hồi chậm hơn bình thường.'],
      ['Jordan', 'Client', 'Are customers unable to place orders, or is the delay only inconvenient?', 'Khách hàng không thể đặt hàng hay chỉ bị chậm gây bất tiện?'],
      ['Thao', 'Software Engineer', 'Orders are still going through, but some pages take about four seconds to load.', 'Đơn hàng vẫn được xử lý, nhưng một số trang mất khoảng bốn giây để tải.'],
      ['Jordan', 'Client', 'What are you doing to address it?', 'Các bạn đang làm gì để xử lý?'],
      ['Thao', 'Software Engineer', 'We’re checking a database query that became slower after this morning’s data import.', 'Chúng tôi đang kiểm tra truy vấn cơ sở dữ liệu chậm đi sau đợt nhập dữ liệu sáng nay.'],
      ['Jordan', 'Client', 'Could you let us know when you have a clearer estimate?', 'Khi nào có ước tính rõ hơn, bạn có thể báo cho chúng tôi không?'],
      ['Thao', 'Software Engineer', 'Absolutely. I’ll send the next update in thirty minutes, even if the investigation is still ongoing.', 'Chắc chắn rồi. Tôi sẽ gửi cập nhật tiếp theo sau ba mươi phút, kể cả khi việc điều tra vẫn đang tiếp diễn.'],
    ],
  },
  {
    id: 'team-collaboration', title: 'Collaborating with Teammates and Sharing Knowledge', level: 1,
    description: 'Ask for context, share a useful explanation, and leave knowledge where the team can reuse it.', estimatedMinutes: 8,
    objectives: ['Request a walkthrough', 'Explain a system area', 'Document reusable knowledge'],
    turns: [
      ['Mai', 'Developer', 'I’m new to the notification service. Could you show me where retries are configured?', 'Mình mới làm quen dịch vụ thông báo. Bạn chỉ giúp cấu hình thử lại ở đâu được không?'],
      ['Chris', 'Senior Developer', 'Of course. Retries are defined in the worker settings, but the limit differs by message type.', 'Được chứ. Số lần thử lại được định nghĩa trong cấu hình worker, nhưng giới hạn khác nhau theo loại tin nhắn.'],
      ['Mai', 'Developer', 'What happens when a message reaches its retry limit?', 'Điều gì xảy ra khi tin nhắn đạt giới hạn thử lại?'],
      ['Chris', 'Senior Developer', 'It moves to the dead-letter queue, where we can inspect it without blocking new messages.', 'Nó được chuyển vào hàng đợi dead-letter để chúng ta kiểm tra mà không chặn tin nhắn mới.'],
      ['Mai', 'Developer', 'Could we review one example together? I want to understand the monitoring alerts too.', 'Chúng ta cùng xem một ví dụ nhé? Mình cũng muốn hiểu cảnh báo giám sát.'],
      ['Chris', 'Senior Developer', 'Sure. Let’s use yesterday’s failed email and follow its trace through the worker.', 'Được. Ta dùng email lỗi hôm qua và lần theo trace qua worker nhé.'],
      ['Mai', 'Developer', 'I’ll take notes and add the queue flow to the team documentation.', 'Mình sẽ ghi chú và bổ sung luồng hàng đợi vào tài liệu nhóm.'],
      ['Chris', 'Senior Developer', 'Great. Please include the alert link so the next person can investigate it quickly.', 'Tốt. Hãy thêm liên kết cảnh báo để người tiếp theo có thể điều tra nhanh.'],
    ],
  },
  {
    id: 'java-oop', title: 'Explaining Java and Object-Oriented Programming', level: 2,
    description: 'Explain an object-oriented design choice using a concrete Java domain example.', estimatedMinutes: 9,
    objectives: ['Explain encapsulation', 'Compare composition and inheritance', 'Justify a class boundary'],
    turns: [
      ['Leo', 'Interviewer', 'How would you model different payment methods in Java?', 'Bạn sẽ mô hình hóa các phương thức thanh toán khác nhau bằng Java thế nào?'],
      ['Aisha', 'Developer', 'I’d define a PaymentProcessor interface and provide separate card and bank-transfer implementations.', 'Tôi sẽ định nghĩa interface PaymentProcessor và triển khai riêng cho thẻ và chuyển khoản.'],
      ['Leo', 'Interviewer', 'Why use an interface instead of checking a payment type in one class?', 'Vì sao dùng interface thay vì kiểm tra loại thanh toán trong một lớp?'],
      ['Aisha', 'Developer', 'Each implementation can encapsulate its rules, and callers depend on a stable contract.', 'Mỗi phần triển khai có thể đóng gói quy tắc riêng, còn bên gọi phụ thuộc vào một hợp đồng ổn định.'],
      ['Leo', 'Interviewer', 'Would you use inheritance for shared validation?', 'Bạn có dùng kế thừa cho phần xác thực chung không?'],
      ['Aisha', 'Developer', 'I’d prefer a validator component injected into each processor unless there is a true “is-a” relationship.', 'Tôi ưu tiên tiêm một thành phần xác thực vào từng processor, trừ khi thực sự có quan hệ “là một”.'],
      ['Leo', 'Interviewer', 'How would you keep these implementations easy to test?', 'Bạn sẽ giúp các phần triển khai dễ kiểm thử thế nào?'],
      ['Aisha', 'Developer', 'I’d inject external dependencies through constructors and test each processor against its expected outcomes.', 'Tôi sẽ tiêm phụ thuộc bên ngoài qua hàm khởi tạo và kiểm thử từng processor với kết quả mong đợi.'],
    ],
  },
  {
    id: 'spring-rest', title: 'Discussing Spring Boot and REST APIs', level: 2,
    description: 'Discuss endpoint design, validation, error responses, and API compatibility.', estimatedMinutes: 9,
    objectives: ['Describe a REST resource', 'Explain request validation', 'Protect API compatibility'],
    turns: [
      ['Noah', 'Tech Lead', 'How should the client create a new support ticket?', 'Client nên tạo ticket hỗ trợ mới bằng cách nào?'],
      ['Hana', 'Backend Developer', 'It can send a POST request to /api/tickets with the subject and description.', 'Client có thể gửi yêu cầu POST đến /api/tickets kèm tiêu đề và mô tả.'],
      ['Noah', 'Tech Lead', 'Where will you validate the request fields?', 'Bạn sẽ xác thực các trường của yêu cầu ở đâu?'],
      ['Hana', 'Backend Developer', 'I’ll use a request DTO with Bean Validation annotations and handle validation errors centrally.', 'Tôi sẽ dùng DTO yêu cầu với annotation Bean Validation và xử lý lỗi xác thực tập trung.'],
      ['Noah', 'Tech Lead', 'What response should the client receive after creation?', 'Sau khi tạo, client sẽ nhận phản hồi gì?'],
      ['Hana', 'Backend Developer', 'A 201 response with the new resource location and a response DTO containing its identifier.', 'Phản hồi 201 với địa chỉ tài nguyên mới và DTO chứa mã định danh.'],
      ['Noah', 'Tech Lead', 'How will you avoid breaking clients when the response changes?', 'Bạn sẽ tránh làm hỏng client khi phản hồi thay đổi thế nào?'],
      ['Hana', 'Backend Developer', 'I’ll keep existing fields stable and add contract tests for the documented API behavior.', 'Tôi sẽ giữ ổn định các trường hiện có và thêm kiểm thử hợp đồng cho hành vi API đã tài liệu hóa.'],
    ],
  },
  {
    id: 'database-sql', title: 'Discussing Database Design and SQL Optimization', level: 2,
    description: 'Trace a slow query to its execution plan and choose an index that fits the workload.', estimatedMinutes: 10,
    objectives: ['Describe a relational model', 'Interpret a query plan', 'Discuss index trade-offs'],
    turns: [
      ['Grace', 'Database Engineer', 'The order history endpoint scans too many rows. Have you checked the query plan?', 'Endpoint lịch sử đơn hàng quét quá nhiều dòng. Bạn đã xem kế hoạch truy vấn chưa?'],
      ['Ibrahim', 'Backend Developer', 'Yes. It filters by customer_id and created_at, but the table has no matching composite index.', 'Rồi. Truy vấn lọc theo customer_id và created_at, nhưng bảng chưa có chỉ mục ghép phù hợp.'],
      ['Grace', 'Database Engineer', 'Which column should come first in the index?', 'Cột nào nên đứng trước trong chỉ mục?'],
      ['Ibrahim', 'Backend Developer', 'Customer IDs are selective, so I’d start with customer_id and then created_at.', 'Mã khách hàng có tính chọn lọc cao, nên tôi sẽ đặt customer_id trước rồi đến created_at.'],
      ['Grace', 'Database Engineer', 'Could the index make writes noticeably slower?', 'Chỉ mục đó có thể làm thao tác ghi chậm đáng kể không?'],
      ['Ibrahim', 'Backend Developer', 'It adds write cost and storage, so I’ll compare the plan and write latency on a staging dataset.', 'Nó tăng chi phí ghi và dung lượng, nên tôi sẽ so sánh kế hoạch truy vấn và độ trễ ghi trên dữ liệu staging.'],
      ['Grace', 'Database Engineer', 'The query also sorts newest first. Can the index help with that?', 'Truy vấn cũng sắp xếp mới nhất trước. Chỉ mục có hỗ trợ được không?'],
      ['Ibrahim', 'Backend Developer', 'Yes, a descending created_at key may avoid a separate sort. I’ll verify it with EXPLAIN ANALYZE.', 'Có, khóa created_at giảm dần có thể tránh bước sắp xếp riêng. Tôi sẽ xác minh bằng EXPLAIN ANALYZE.'],
    ],
  },
  {
    id: 'authn-authz', title: 'Explaining Authentication and Authorization', level: 2,
    description: 'Distinguish identity from permissions and explain safe token and role checks.', estimatedMinutes: 9,
    objectives: ['Distinguish authentication from authorization', 'Explain token validation', 'Apply least privilege'],
    turns: [
      ['Marta', 'Security Engineer', 'Can you explain how a request reaches the admin endpoint?', 'Bạn giải thích yêu cầu đến endpoint quản trị như thế nào được không?'],
      ['Ken', 'Backend Developer', 'First, the service authenticates the user by validating the access token and its signature.', 'Đầu tiên, dịch vụ xác thực người dùng bằng cách kiểm tra access token và chữ ký.'],
      ['Marta', 'Security Engineer', 'Does a valid token automatically give the user access to every endpoint?', 'Token hợp lệ có tự động cho phép người dùng truy cập mọi endpoint không?'],
      ['Ken', 'Backend Developer', 'No. Authorization checks the user’s granted permissions for the specific operation.', 'Không. Phân quyền kiểm tra quyền đã cấp cho người dùng đối với thao tác cụ thể.'],
      ['Marta', 'Security Engineer', 'Where do you get the user identity and roles?', 'Bạn lấy danh tính và vai trò người dùng ở đâu?'],
      ['Ken', 'Backend Developer', 'We read validated claims from the security context; we never trust role values from request parameters.', 'Chúng tôi đọc claim đã xác thực từ security context; không bao giờ tin vai trò truyền qua tham số yêu cầu.'],
      ['Marta', 'Security Engineer', 'What should happen if the user is signed in but lacks the admin permission?', 'Nếu người dùng đã đăng nhập nhưng thiếu quyền quản trị thì sao?'],
      ['Ken', 'Backend Developer', 'The service should return 403 and record the denied action without exposing sensitive details.', 'Dịch vụ nên trả về 403 và ghi nhận thao tác bị từ chối mà không tiết lộ thông tin nhạy cảm.'],
    ],
  },
  {
    id: 'frontend-backend', title: 'Discussing Frontend and Backend Integration', level: 2,
    description: 'Coordinate a UI integration around loading, empty, error, and contract states.', estimatedMinutes: 9,
    objectives: ['Align request and response shapes', 'Discuss loading and error states', 'Coordinate a mock-based integration'],
    turns: [
      ['Ella', 'Frontend Developer', 'The profile screen is ready, but I need the response shape for the preferences endpoint.', 'Màn hình hồ sơ đã sẵn sàng, nhưng tôi cần cấu trúc phản hồi của endpoint tùy chọn.'],
      ['Bao', 'Backend Developer', 'It returns the user ID, locale, and notification settings. I’ll share the OpenAPI schema today.', 'Nó trả về mã người dùng, ngôn ngữ và cài đặt thông báo. Hôm nay tôi sẽ gửi schema OpenAPI.'],
      ['Ella', 'Frontend Developer', 'What should the screen display while the request is pending?', 'Trong lúc chờ yêu cầu, màn hình nên hiển thị gì?'],
      ['Bao', 'Backend Developer', 'The API responds quickly, but please include a loading state and handle a 401 response.', 'API phản hồi nhanh, nhưng hãy thêm trạng thái tải và xử lý phản hồi 401.'],
      ['Ella', 'Frontend Developer', 'Should a user with no saved preferences receive null or default values?', 'Người chưa lưu tùy chọn sẽ nhận null hay giá trị mặc định?'],
      ['Bao', 'Backend Developer', 'We’ll return explicit defaults so the client doesn’t need to infer missing values.', 'Chúng tôi sẽ trả về giá trị mặc định rõ ràng để client không phải suy đoán trường bị thiếu.'],
      ['Ella', 'Frontend Developer', 'I can use a mock response until the endpoint is deployed.', 'Tôi có thể dùng phản hồi giả lập cho đến khi endpoint được triển khai.'],
      ['Bao', 'Backend Developer', 'That works. Let’s compare the mock with the OpenAPI example before merging.', 'Được. Trước khi merge, hãy so sánh dữ liệu giả lập với ví dụ OpenAPI.'],
    ],
  },
  {
    id: 'docker-cicd', title: 'Explaining Docker, CI/CD, and Kubernetes', level: 2,
    description: 'Explain how a tested container moves through a deployment pipeline into a cluster.', estimatedMinutes: 10,
    objectives: ['Describe an image and container', 'Explain pipeline stages', 'Discuss readiness and rollout'],
    turns: [
      ['Viktor', 'DevOps Engineer', 'Can you describe how your service gets from a commit to the cluster?', 'Bạn mô tả dịch vụ đi từ commit đến cụm máy chủ thế nào không?'],
      ['Sara', 'Developer', 'CI runs tests, builds a Docker image, and publishes it with the commit SHA as its tag.', 'CI chạy kiểm thử, tạo Docker image và đẩy lên với commit SHA làm tag.'],
      ['Viktor', 'DevOps Engineer', 'How do we know that image is safe to promote?', 'Làm sao biết image đó an toàn để đưa sang môi trường tiếp theo?'],
      ['Sara', 'Developer', 'The pipeline scans dependencies and deploys the same tested image to staging for smoke tests.', 'Pipeline quét phụ thuộc và triển khai chính image đã kiểm thử lên staging để chạy smoke test.'],
      ['Viktor', 'DevOps Engineer', 'What does Kubernetes check before sending traffic to a new pod?', 'Kubernetes kiểm tra gì trước khi chuyển lưu lượng đến pod mới?'],
      ['Sara', 'Developer', 'A readiness probe confirms the application can serve requests; liveness checks whether it is stuck.', 'Readiness probe xác nhận ứng dụng có thể phục vụ yêu cầu; liveness kiểm tra ứng dụng có bị treo không.'],
      ['Viktor', 'DevOps Engineer', 'What would cause the rollout to stop?', 'Điều gì khiến quá trình triển khai dừng lại?'],
      ['Sara', 'Developer', 'If new pods fail readiness or exceed the error budget, we can pause the rollout and roll back.', 'Nếu pod mới không đạt readiness hoặc vượt ngân sách lỗi, chúng ta có thể tạm dừng và rollback.'],
    ],
  },
  {
    id: 'microservices-architecture', title: 'Discussing Microservices and System Architecture', level: 2,
    description: 'Evaluate service boundaries and failure handling before splitting a component.', estimatedMinutes: 10,
    objectives: ['Discuss service ownership', 'Compare synchronous and asynchronous calls', 'Identify operational trade-offs'],
    turns: [
      ['Mei', 'Architect', 'The catalog team wants to extract pricing from the monolith. What problem would that solve?', 'Nhóm danh mục muốn tách định giá khỏi monolith. Việc đó giải quyết vấn đề gì?'],
      ['Omar', 'Senior Developer', 'Pricing changes often and needs independent ownership, but extraction alone won’t improve every bottleneck.', 'Định giá thay đổi thường xuyên và cần quyền sở hữu riêng, nhưng chỉ tách ra không giải quyết mọi nút thắt.'],
      ['Mei', 'Architect', 'The checkout flow currently reads prices synchronously. What risk does that create?', 'Luồng thanh toán hiện đọc giá đồng bộ. Điều đó tạo ra rủi ro gì?'],
      ['Omar', 'Senior Developer', 'A pricing outage could block checkout, so we need timeouts, bounded retries, and a fallback policy.', 'Sự cố định giá có thể chặn thanh toán, nên cần timeout, thử lại có giới hạn và chính sách dự phòng.'],
      ['Mei', 'Architect', 'Would caching the response be acceptable?', 'Dùng bộ nhớ đệm phản hồi có phù hợp không?'],
      ['Omar', 'Senior Developer', 'Possibly, if the business accepts a short-lived price snapshot and we define invalidation clearly.', 'Có thể, nếu nghiệp vụ chấp nhận bản giá lưu ngắn hạn và chúng ta định nghĩa rõ việc vô hiệu hóa.'],
      ['Mei', 'Architect', 'How would you verify that the new boundary is worth operating?', 'Bạn xác minh ranh giới mới đáng để vận hành bằng cách nào?'],
      ['Omar', 'Senior Developer', 'We should compare deployment independence, failure rates, and operational cost against the current service.', 'Ta nên so sánh tính độc lập triển khai, tỷ lệ lỗi và chi phí vận hành với dịch vụ hiện tại.'],
    ],
  },
  {
    id: 'redis-kafka', title: 'Explaining Redis, Kafka, and Asynchronous Processing', level: 2,
    description: 'Choose a cache or event stream based on consistency and delivery requirements.', estimatedMinutes: 10,
    objectives: ['Distinguish cache from event log', 'Explain consumer offsets', 'Discuss idempotent processing'],
    turns: [
      ['Zoe', 'Tech Lead', 'Should we use Redis or Kafka to distribute inventory updates?', 'Ta nên dùng Redis hay Kafka để phân phối cập nhật tồn kho?'],
      ['Huy', 'Developer', 'They solve different problems. Redis can cache current values, while Kafka keeps an ordered event log.', 'Chúng giải quyết vấn đề khác nhau. Redis có thể lưu giá trị hiện tại, còn Kafka giữ nhật ký sự kiện có thứ tự.'],
      ['Zoe', 'Tech Lead', 'What happens if an inventory consumer is temporarily offline?', 'Điều gì xảy ra nếu consumer tồn kho tạm thời ngoại tuyến?'],
      ['Huy', 'Developer', 'It can resume from its committed offset and process retained events after it reconnects.', 'Nó có thể tiếp tục từ offset đã xác nhận và xử lý các sự kiện còn lưu sau khi kết nối lại.'],
      ['Zoe', 'Tech Lead', 'Could the same event be delivered more than once?', 'Một sự kiện có thể được gửi nhiều lần không?'],
      ['Huy', 'Developer', 'Yes. We should make the handler idempotent, for example by recording each event ID with the update.', 'Có. Ta nên làm handler có tính lặp an toàn, chẳng hạn ghi nhận mã sự kiện cùng với cập nhật.'],
      ['Zoe', 'Tech Lead', 'Where would Redis still be useful in this flow?', 'Redis vẫn hữu ích ở đâu trong luồng này?'],
      ['Huy', 'Developer', 'It could serve a short-lived inventory snapshot, while Kafka remains the durable source for changes.', 'Nó có thể phục vụ ảnh chụp tồn kho ngắn hạn, còn Kafka lưu bền vững các thay đổi.'],
    ],
  },
  {
    id: 'difficult-bug', title: 'Debugging a Difficult Bug', level: 3,
    description: 'Build a reproducible hypothesis, collect evidence, and narrow a bug to a specific change.', estimatedMinutes: 10,
    objectives: ['Describe reproducibility', 'Form and test a hypothesis', 'Communicate evidence and next steps'],
    turns: [
      ['Iris', 'QA Engineer', 'The invoice total is wrong only when a discount and a tax exemption are both applied.', 'Tổng hóa đơn sai chỉ khi áp dụng đồng thời giảm giá và miễn thuế.'],
      ['Pavel', 'Developer', 'Can you share a sample invoice and the expected total?', 'Bạn gửi hóa đơn mẫu và tổng tiền mong đợi được không?'],
      ['Iris', 'QA Engineer', 'Here it is. The discount is applied, but tax is still calculated on the discounted amount.', 'Đây rồi. Giảm giá đã được áp dụng nhưng thuế vẫn tính trên số tiền sau giảm.'],
      ['Pavel', 'Developer', 'I suspect the exemption flag is missing from the pricing request. I’ll trace that field first.', 'Tôi nghi cờ miễn thuế bị thiếu trong yêu cầu tính giá. Trước tiên tôi sẽ lần theo trường đó.'],
      ['Iris', 'QA Engineer', 'I can reproduce it in staging with account 482. It does not happen for taxable accounts.', 'Tôi tái hiện được trên staging với tài khoản 482. Tài khoản chịu thuế thì không gặp lỗi.'],
      ['Pavel', 'Developer', 'The request log confirms the flag is present, so my first hypothesis is wrong. I’m checking the rule order now.', 'Log xác nhận cờ đã có, vậy giả thuyết đầu sai. Tôi đang kiểm tra thứ tự áp dụng quy tắc.'],
      ['Iris', 'QA Engineer', 'The exemption rule runs after the total has been cached. Could that be the cause?', 'Quy tắc miễn thuế chạy sau khi tổng đã được lưu đệm. Có thể đó là nguyên nhân không?'],
      ['Pavel', 'Developer', 'Yes, that explains the stale value. I’ll move the exemption check before calculation and add a regression test.', 'Đúng, điều đó giải thích giá trị cũ. Tôi sẽ chuyển kiểm tra miễn thuế lên trước bước tính và thêm kiểm thử hồi quy.'],
    ],
  },
  {
    id: 'production-incident', title: 'Investigating a Production Incident', level: 3,
    description: 'Coordinate incident response, contain customer impact, and communicate verified facts.', estimatedMinutes: 10,
    objectives: ['State impact and scope', 'Coordinate containment', 'Separate verified facts from hypotheses'],
    turns: [
      ['Renee', 'Incident Commander', 'We’re seeing elevated checkout failures. What do the dashboards show?', 'Chúng ta đang thấy lỗi thanh toán tăng cao. Dashboard cho thấy gì?'],
      ['Duc', 'On-call Engineer', 'Failures began twelve minutes ago and affect card payments in one region; other regions look normal.', 'Lỗi bắt đầu mười hai phút trước và ảnh hưởng thanh toán thẻ ở một khu vực; nơi khác bình thường.'],
      ['Renee', 'Incident Commander', 'Do we know the cause yet?', 'Chúng ta đã biết nguyên nhân chưa?'],
      ['Duc', 'On-call Engineer', 'Not yet. The payment provider is timing out, but we haven’t confirmed whether that is the root cause.', 'Chưa. Nhà cung cấp thanh toán bị timeout, nhưng ta chưa xác nhận đó là nguyên nhân gốc.'],
      ['Renee', 'Incident Commander', 'Can we route traffic to the backup provider safely?', 'Ta có thể chuyển lưu lượng sang nhà cung cấp dự phòng an toàn không?'],
      ['Duc', 'On-call Engineer', 'The fallback is enabled for new sessions. I’ll verify its capacity before shifting existing traffic.', 'Phương án dự phòng bật cho phiên mới. Tôi sẽ xác minh sức tải trước khi chuyển lưu lượng hiện tại.'],
      ['Renee', 'Incident Commander', 'I’ll prepare a customer update with the confirmed impact and current mitigation.', 'Tôi sẽ chuẩn bị thông báo khách hàng về ảnh hưởng đã xác nhận và biện pháp hiện tại.'],
      ['Duc', 'On-call Engineer', 'I’ll post the next technical update in ten minutes and call out any change in scope.', 'Tôi sẽ đăng cập nhật kỹ thuật sau mười phút và báo nếu phạm vi ảnh hưởng thay đổi.'],
    ],
  },
  {
    id: 'api-performance', title: 'Improving API Performance', level: 3,
    description: 'Use latency data to locate a bottleneck and verify that an optimization preserves behavior.', estimatedMinutes: 10,
    objectives: ['Interpret latency percentiles', 'Identify a bottleneck', 'Plan a safe performance comparison'],
    turns: [
      ['Fatima', 'Performance Engineer', 'The search API p95 latency is 1.8 seconds, although the average is under 300 milliseconds.', 'Độ trễ p95 của API tìm kiếm là 1,8 giây dù trung bình dưới 300 mili giây.'],
      ['Evan', 'Developer', 'That suggests a slow tail. Do the traces show where those requests spend time?', 'Điều đó cho thấy đuôi phân bố chậm. Trace có cho biết các yêu cầu đó tốn thời gian ở đâu không?'],
      ['Fatima', 'Performance Engineer', 'Most of the delay is in repeated permission lookups for each result row.', 'Phần lớn độ trễ nằm ở các lần tra quyền lặp lại cho từng dòng kết quả.'],
      ['Evan', 'Developer', 'I can batch those lookups so we request permissions once for the result set.', 'Tôi có thể gom các lần tra cứu để yêu cầu quyền một lần cho cả tập kết quả.'],
      ['Fatima', 'Performance Engineer', 'Could batching change which rows a user is allowed to see?', 'Việc gom nhóm có thể làm thay đổi những dòng người dùng được xem không?'],
      ['Evan', 'Developer', 'It should not. I’ll compare the returned IDs with the current implementation across role-based fixtures.', 'Không nên. Tôi sẽ so sánh mã trả về với bản hiện tại trên các bộ dữ liệu theo vai trò.'],
      ['Fatima', 'Performance Engineer', 'How will you measure the improvement?', 'Bạn sẽ đo mức cải thiện thế nào?'],
      ['Evan', 'Developer', 'I’ll run the same load profile before and after and compare p50, p95, error rate, and database calls.', 'Tôi sẽ chạy cùng cấu hình tải trước và sau, rồi so sánh p50, p95, tỷ lệ lỗi và số lần gọi cơ sở dữ liệu.'],
    ],
  },
  {
    id: 'race-conditions', title: 'Handling Race Conditions and Concurrent Requests', level: 3,
    description: 'Explain a lost-update race and choose a concurrency control that matches the operation.', estimatedMinutes: 10,
    objectives: ['Describe an interleaving', 'Compare optimistic and pessimistic locking', 'Design a conflict response'],
    turns: [
      ['Yuki', 'Backend Engineer', 'Two users can reserve the last seat at nearly the same time. How are we preventing overselling?', 'Hai người có thể gần như đồng thời đặt chỗ cuối cùng. Ta ngăn bán vượt thế nào?'],
      ['Mateo', 'Developer', 'The current code reads availability and updates it in separate steps, so both requests may see one seat.', 'Mã hiện tại đọc tình trạng chỗ và cập nhật ở hai bước, nên cả hai yêu cầu có thể cùng thấy còn một chỗ.'],
      ['Yuki', 'Backend Engineer', 'Would a database transaction alone guarantee only one reservation?', 'Chỉ một transaction cơ sở dữ liệu có đảm bảo chỉ một lượt đặt chỗ không?'],
      ['Mateo', 'Developer', 'Not necessarily under the current isolation level. We can use a conditional update or a row lock.', 'Chưa chắc với mức cô lập hiện tại. Ta có thể dùng cập nhật có điều kiện hoặc khóa dòng.'],
      ['Yuki', 'Backend Engineer', 'Which option fits our traffic pattern?', 'Lựa chọn nào phù hợp với kiểu lưu lượng của chúng ta?'],
      ['Mateo', 'Developer', 'A conditional update is simpler here: decrement only when available_seats is greater than zero.', 'Cập nhật có điều kiện đơn giản hơn ở đây: chỉ giảm khi available_seats lớn hơn không.'],
      ['Yuki', 'Backend Engineer', 'How will the losing request be handled?', 'Yêu cầu thua sẽ được xử lý thế nào?'],
      ['Mateo', 'Developer', 'It will update zero rows, so we can return a clear conflict response and ask the user to refresh.', 'Nó sẽ cập nhật không dòng nào, vì vậy ta trả phản hồi xung đột rõ ràng và yêu cầu tải lại.'],
    ],
  },
  {
    id: 'code-review', title: 'Reviewing Code and Suggesting Improvements', level: 3,
    description: 'Give respectful, specific review feedback with a reason and a practical suggestion.', estimatedMinutes: 9,
    objectives: ['Separate blocking issues from suggestions', 'Explain a maintainability concern', 'Invite discussion'],
    turns: [
      ['Tara', 'Reviewer', 'Thanks for the change. I have one concern about retrying every exception.', 'Cảm ơn về thay đổi này. Tôi có một băn khoăn về việc thử lại mọi ngoại lệ.'],
      ['Luis', 'Developer', 'Could you say more about the risk you see?', 'Bạn có thể nói rõ hơn rủi ro bạn thấy không?'],
      ['Tara', 'Reviewer', 'A validation error would be retried even though the request cannot succeed without a change.', 'Lỗi xác thực cũng bị thử lại dù yêu cầu không thể thành công nếu không thay đổi.'],
      ['Luis', 'Developer', 'That makes sense. I can retry only transient network and server errors.', 'Hợp lý. Tôi có thể chỉ thử lại lỗi mạng tạm thời và lỗi máy chủ.'],
      ['Tara', 'Reviewer', 'Could we also cap the attempts and add a short backoff?', 'Ta có thể giới hạn số lần và thêm khoảng chờ tăng dần không?'],
      ['Luis', 'Developer', 'Yes. I’ll add three attempts with exponential backoff and a maximum delay.', 'Được. Tôi sẽ thêm ba lần thử với thời gian chờ tăng dần và độ trễ tối đa.'],
      ['Tara', 'Reviewer', 'That addresses my concern. Please add a test proving validation errors are not retried.', 'Vậy là giải quyết được băn khoăn. Hãy thêm kiểm thử chứng minh lỗi xác thực không bị thử lại.'],
      ['Luis', 'Developer', 'Will do. I’ll update the tests and request another review.', 'Tôi sẽ làm vậy. Tôi sẽ cập nhật kiểm thử và nhờ xem lại.'],
    ],
  },
  {
    id: 'automated-testing', title: 'Writing Unit Tests and Integration Tests', level: 3,
    description: 'Choose test boundaries that verify business rules and component integration without fragile setup.', estimatedMinutes: 10,
    objectives: ['Distinguish unit and integration coverage', 'Identify useful boundary cases', 'Test observable behavior'],
    turns: [
      ['Bea', 'QA Engineer', 'The discount calculation has several branches. What should the unit tests cover?', 'Phép tính giảm giá có nhiều nhánh. Kiểm thử đơn vị nên bao phủ gì?'],
      ['Jin', 'Developer', 'I’ll cover no discount, a valid discount, an expired code, and a discount above the order total.', 'Tôi sẽ kiểm tra không giảm giá, mã hợp lệ, mã hết hạn và mức giảm vượt tổng đơn.'],
      ['Bea', 'QA Engineer', 'Do we need a test for how the controller maps the request to the service?', 'Ta có cần kiểm thử controller chuyển yêu cầu sang service thế nào không?'],
      ['Jin', 'Developer', 'An integration test can send an HTTP request and verify the response and persisted order.', 'Kiểm thử tích hợp có thể gửi yêu cầu HTTP và xác minh phản hồi cùng đơn hàng đã lưu.'],
      ['Bea', 'QA Engineer', 'How will you keep that test reliable in CI?', 'Bạn giữ kiểm thử đó ổn định trên CI thế nào?'],
      ['Jin', 'Developer', 'I’ll use an isolated test database and fixed clock so the expiry behavior is deterministic.', 'Tôi sẽ dùng cơ sở dữ liệu kiểm thử riêng và đồng hồ cố định để hành vi hết hạn có tính xác định.'],
      ['Bea', 'QA Engineer', 'Should we assert the exact internal method calls?', 'Ta có nên kiểm tra chính xác các lần gọi phương thức nội bộ không?'],
      ['Jin', 'Developer', 'Only when they define an important boundary. Otherwise, I’ll assert the returned behavior and stored result.', 'Chỉ khi chúng xác định ranh giới quan trọng. Nếu không, tôi sẽ kiểm tra hành vi trả về và kết quả lưu trữ.'],
    ],
  },
  {
    id: 'deployment-rollback', title: 'Planning a Deployment and Rollback', level: 3,
    description: 'Coordinate a staged release around schema compatibility, health signals, and a rollback plan.', estimatedMinutes: 10,
    objectives: ['Plan deployment order', 'Define health checks', 'Explain a safe rollback boundary'],
    turns: [
      ['Owen', 'Release Manager', 'The new service version expects a customer_status column. Can we deploy it tonight?', 'Phiên bản dịch vụ mới cần cột customer_status. Tối nay ta triển khai được không?'],
      ['Nina', 'Developer', 'Yes, if we add the nullable column first and keep the old version compatible during the rollout.', 'Được, nếu thêm cột cho phép null trước và giữ tương thích với phiên bản cũ trong lúc triển khai.'],
      ['Owen', 'Release Manager', 'When should we backfill the existing rows?', 'Khi nào nên điền dữ liệu cho các dòng hiện có?'],
      ['Nina', 'Developer', 'After the schema change, in a separate bounded job so it does not hold a long migration lock.', 'Sau thay đổi schema, bằng một tác vụ riêng có giới hạn để không giữ khóa migration lâu.'],
      ['Owen', 'Release Manager', 'What signals would make you stop the rollout?', 'Tín hiệu nào khiến bạn dừng triển khai?'],
      ['Nina', 'Developer', 'A sustained increase in error rate, failed readiness checks, or unexpected database load.', 'Tỷ lệ lỗi tăng kéo dài, readiness thất bại hoặc tải cơ sở dữ liệu bất thường.'],
      ['Owen', 'Release Manager', 'Can we roll back the application without losing the new data?', 'Ta có thể rollback ứng dụng mà không mất dữ liệu mới không?'],
      ['Nina', 'Developer', 'Yes. We’ll keep the additive column and roll back only the application until the issue is understood.', 'Có. Ta sẽ giữ cột được thêm và chỉ rollback ứng dụng cho đến khi hiểu rõ vấn đề.'],
    ],
  },
  {
    id: 'changing-requirements', title: 'Handling Changing Requirements and Technical Trade-offs', level: 3,
    description: 'Respond to a late requirement by making cost, risk, and scope trade-offs explicit.', estimatedMinutes: 10,
    objectives: ['Clarify a new requirement', 'Explain implementation trade-offs', 'Agree on staged scope'],
    turns: [
      ['Inez', 'Product Owner', 'The client now wants the report in multiple time zones, not just the account’s local time.', 'Khách hàng giờ muốn báo cáo theo nhiều múi giờ, không chỉ giờ địa phương của tài khoản.'],
      ['Sam', 'Developer', 'That changes the date filters and export format. Do they need arbitrary zones in the first release?', 'Điều đó làm thay đổi bộ lọc ngày và định dạng xuất. Bản đầu có cần mọi múi giờ tùy ý không?'],
      ['Inez', 'Product Owner', 'They need UTC and the user’s selected zone before launch.', 'Trước khi ra mắt, họ cần UTC và múi giờ người dùng đã chọn.'],
      ['Sam', 'Developer', 'We can support those two options now, but arbitrary per-report zones will need extra testing.', 'Hiện ta có thể hỗ trợ hai lựa chọn đó, còn múi giờ tùy từng báo cáo cần thêm kiểm thử.'],
      ['Inez', 'Product Owner', 'How much would that affect the delivery date?', 'Việc đó ảnh hưởng ngày giao hàng ra sao?'],
      ['Sam', 'Developer', 'The two-option version fits this sprint if we update the acceptance criteria today.', 'Phiên bản hai lựa chọn vẫn kịp sprint này nếu hôm nay cập nhật tiêu chí nghiệm thu.'],
      ['Inez', 'Product Owner', 'Let’s ship UTC and the selected zone first, then review demand for custom zones.', 'Hãy phát hành UTC và múi giờ đã chọn trước, rồi đánh giá nhu cầu múi giờ tùy chỉnh.'],
      ['Sam', 'Developer', 'Agreed. I’ll document the trade-off and add a follow-up item for the remaining scope.', 'Đồng ý. Tôi sẽ ghi lại đánh đổi và tạo mục theo dõi cho phần còn lại.'],
    ],
  },
  {
    id: 'scalable-ecommerce', title: 'Designing a Scalable E-commerce System', level: 4,
    description: 'Explore a scalable order flow while protecting inventory consistency and customer experience.', estimatedMinutes: 11,
    objectives: ['Map core system components', 'Discuss inventory consistency', 'Plan for traffic spikes and failure'],
    turns: [
      ['Ruth', 'Interviewer', 'How would you design an e-commerce platform for a major sale with sudden traffic spikes?', 'Bạn thiết kế nền tảng thương mại điện tử cho đợt giảm giá có lưu lượng tăng đột biến thế nào?'],
      ['Khoa', 'Senior Engineer', 'I’d start with the critical flows: catalog reads, checkout, payment, and inventory reservation.', 'Tôi bắt đầu với luồng cốt lõi: đọc danh mục, thanh toán, xử lý tiền và giữ hàng tồn.'],
      ['Ruth', 'Interviewer', 'Which parts would you scale differently?', 'Bạn sẽ mở rộng các phần nào theo cách khác nhau?'],
      ['Khoa', 'Senior Engineer', 'Catalog reads can use a cache and horizontal replicas; checkout needs stricter controls around writes.', 'Đọc danh mục có thể dùng bộ nhớ đệm và bản sao ngang; thanh toán cần kiểm soát ghi chặt hơn.'],
      ['Ruth', 'Interviewer', 'How would you prevent two buyers from getting the same last item?', 'Bạn ngăn hai người mua cùng nhận món hàng cuối thế nào?'],
      ['Khoa', 'Senior Engineer', 'I’d reserve inventory with an atomic database operation and expire abandoned reservations.', 'Tôi sẽ giữ hàng bằng thao tác nguyên tử trong cơ sở dữ liệu và hết hạn các lượt giữ bị bỏ dở.'],
      ['Ruth', 'Interviewer', 'What happens if payment succeeds but the order service times out?', 'Nếu thanh toán thành công nhưng dịch vụ đơn hàng timeout thì sao?'],
      ['Khoa', 'Senior Engineer', 'We need an idempotency key, durable payment events, and reconciliation for incomplete order transitions.', 'Ta cần khóa idempotency, sự kiện thanh toán lưu bền vững và đối soát các bước chuyển đơn chưa hoàn tất.'],
      ['Ruth', 'Interviewer', 'How would you prepare for the sale itself?', 'Bạn chuẩn bị cho đợt giảm giá như thế nào?'],
      ['Khoa', 'Senior Engineer', 'I’d load-test realistic traffic, pre-warm safe caches, and define queue and latency limits before launch.', 'Tôi sẽ kiểm thử tải thực tế, làm nóng bộ nhớ đệm an toàn và định nghĩa giới hạn hàng đợi, độ trễ trước khi ra mắt.'],
    ],
  },
  {
    id: 'technical-decisions', title: 'Explaining Technical Decisions and Architecture', level: 4,
    description: 'Present an architectural decision with evidence, alternatives, and conditions for revisiting it.', estimatedMinutes: 10,
    objectives: ['State a decision and context', 'Compare realistic alternatives', 'Define review signals'],
    turns: [
      ['Elena', 'Engineering Director', 'Why did the team choose a modular monolith for the new billing service?', 'Vì sao nhóm chọn modular monolith cho dịch vụ thanh toán mới?'],
      ['David', 'Staff Engineer', 'The team is small, the domain is still changing, and we need strong transaction boundaries early.', 'Nhóm còn nhỏ, nghiệp vụ vẫn thay đổi và hiện cần ranh giới transaction rõ ràng.'],
      ['Elena', 'Engineering Director', 'What alternatives did you evaluate?', 'Các bạn đã đánh giá phương án nào?'],
      ['David', 'Staff Engineer', 'We considered separate services, but that would add deployment and operational overhead before ownership is clear.', 'Chúng tôi cân nhắc các dịch vụ riêng, nhưng sẽ tăng chi phí triển khai và vận hành trước khi quyền sở hữu rõ ràng.'],
      ['Elena', 'Engineering Director', 'Does the monolith prevent teams from scaling independently later?', 'Monolith có ngăn các nhóm mở rộng độc lập sau này không?'],
      ['David', 'Staff Engineer', 'Not if we enforce module boundaries and keep dependencies directed through explicit interfaces.', 'Không, nếu ta thực thi ranh giới module và chỉ phụ thuộc qua interface rõ ràng.'],
      ['Elena', 'Engineering Director', 'What evidence would make you revisit the decision?', 'Bằng chứng nào khiến bạn xem xét lại quyết định?'],
      ['David', 'Staff Engineer', 'Repeated ownership conflicts, release coupling, or measurable scaling limits would justify another review.', 'Xung đột quyền sở hữu lặp lại, triển khai phụ thuộc nhau hoặc giới hạn mở rộng đo được sẽ đáng để xem lại.'],
    ],
  },
  {
    id: 'professional-disagreement', title: 'Disagreeing Professionally During a Technical Discussion', level: 4,
    description: 'Challenge a proposal with evidence, acknowledge its strengths, and find a testable path forward.', estimatedMinutes: 10,
    objectives: ['Disagree without personalizing', 'Support a concern with evidence', 'Propose a reversible experiment'],
    turns: [
      ['Alex', 'Principal Engineer', 'I suggest moving all customer events to a single synchronous API for now.', 'Tôi đề xuất chuyển mọi sự kiện khách hàng sang một API đồng bộ trước mắt.'],
      ['Nadia', 'Senior Developer', 'I see the simplicity, but I’m concerned that analytics traffic could slow down checkout.', 'Tôi thấy ưu điểm đơn giản, nhưng lo lưu lượng phân tích có thể làm chậm thanh toán.'],
      ['Alex', 'Principal Engineer', 'That is possible, although the current traffic is still modest.', 'Điều đó có thể xảy ra, dù lưu lượng hiện tại vẫn chưa lớn.'],
      ['Nadia', 'Senior Developer', 'Our load test showed checkout p95 doubled when analytics was delayed by the same database.', 'Kiểm thử tải cho thấy p95 thanh toán tăng gấp đôi khi phân tích làm chậm cùng cơ sở dữ liệu.'],
      ['Alex', 'Principal Engineer', 'Would a separate queue solve the concern without adding too much complexity?', 'Một hàng đợi riêng có giải quyết được vấn đề mà không quá phức tạp không?'],
      ['Nadia', 'Senior Developer', 'It could. We can pilot an asynchronous path for analytics and keep checkout synchronous.', 'Có thể. Ta thử luồng bất đồng bộ cho phân tích và giữ thanh toán đồng bộ.'],
      ['Alex', 'Principal Engineer', 'What would we measure during the pilot?', 'Trong đợt thử nghiệm, ta đo gì?'],
      ['Nadia', 'Senior Developer', 'We should track checkout latency, event loss, queue delay, and operational effort for two weeks.', 'Ta nên theo dõi độ trễ thanh toán, mất sự kiện, độ trễ hàng đợi và công vận hành trong hai tuần.'],
    ],
  },
  {
    id: 'mentoring-junior', title: 'Mentoring Junior Developers and Giving Feedback', level: 4,
    description: 'Coach a teammate through a problem with questions, specific feedback, and a manageable next step.', estimatedMinutes: 10,
    objectives: ['Ask before prescribing', 'Give behavior-focused feedback', 'Agree on a learning next step'],
    turns: [
      ['Cam', 'Junior Developer', 'I’m stuck on the failing test. I changed the mock several times, but it still fails.', 'Em bị mắc ở bài kiểm thử lỗi. Em đã sửa mock vài lần nhưng vẫn thất bại.'],
      ['Jo', 'Senior Developer', 'What does the failure message tell you about the expected and actual values?', 'Thông báo lỗi cho em biết gì về giá trị mong đợi và thực tế?'],
      ['Cam', 'Junior Developer', 'The service returns an empty list, but I expected two results.', 'Dịch vụ trả về danh sách rỗng, nhưng em mong đợi hai kết quả.'],
      ['Jo', 'Senior Developer', 'Let’s trace where the test data enters the repository. What would you check first?', 'Ta cùng lần theo nơi dữ liệu kiểm thử đi vào repository nhé. Em sẽ kiểm tra gì trước?'],
      ['Cam', 'Junior Developer', 'I’ll check whether the fixture uses the same tenant ID as the request.', 'Em sẽ kiểm tra fixture có cùng mã tenant với yêu cầu không.'],
      ['Jo', 'Senior Developer', 'Good approach. In your last change, the test setup was clear; adding one assertion per behavior would make it easier to diagnose.', 'Cách làm tốt. Phần thiết lập trong thay đổi trước khá rõ; thêm một assertion cho mỗi hành vi sẽ dễ chẩn đoán hơn.'],
      ['Cam', 'Junior Developer', 'I found it. The fixture belongs to a different tenant. I’ll add a test for that boundary.', 'Em tìm ra rồi. Fixture thuộc tenant khác. Em sẽ thêm kiểm thử cho ranh giới đó.'],
      ['Jo', 'Senior Developer', 'Great. Please walk me through the fix afterward so we can check the reasoning together.', 'Tốt. Sau đó hãy giải thích cách sửa để chúng ta cùng xem lại lập luận nhé.'],
    ],
  },
  {
    id: 'deadline-risks', title: 'Negotiating Deadlines and Managing Project Risks', level: 4,
    description: 'Make delivery risk visible and negotiate scope, staffing, or time using clear options.', estimatedMinutes: 10,
    objectives: ['Quantify schedule risk', 'Offer delivery options', 'Agree on an escalation point'],
    turns: [
      ['Morgan', 'Client', 'Can the full migration still be delivered by the end of the month?', 'Toàn bộ migration vẫn có thể bàn giao vào cuối tháng chứ?'],
      ['Phuc', 'Engineering Manager', 'The data backfill is taking longer than planned, so the date is at risk by about four days.', 'Việc điền dữ liệu mất lâu hơn dự kiến, nên mốc này có nguy cơ trễ khoảng bốn ngày.'],
      ['Morgan', 'Client', 'What options do we have to protect the launch?', 'Ta có lựa chọn nào để bảo vệ ngày ra mắt?'],
      ['Phuc', 'Engineering Manager', 'We can launch read-only reporting on time and move historical export to the next release.', 'Ta có thể ra mắt báo cáo chỉ đọc đúng hạn và chuyển xuất dữ liệu lịch sử sang bản sau.'],
      ['Morgan', 'Client', 'Would adding another engineer bring the full scope back on schedule?', 'Thêm một kỹ sư có giúp toàn bộ phạm vi kịp tiến độ không?'],
      ['Phuc', 'Engineering Manager', 'Not safely. Onboarding now may add coordination cost, and the backfill still needs verification.', 'Không an toàn. Đào tạo người mới lúc này có thể tăng chi phí phối hợp, còn việc điền dữ liệu vẫn cần xác minh.'],
      ['Morgan', 'Client', 'Let’s keep the launch date and defer the export. When should we review the risk again?', 'Hãy giữ ngày ra mắt và hoãn phần xuất dữ liệu. Khi nào ta đánh giá rủi ro lại?'],
      ['Phuc', 'Engineering Manager', 'We’ll review the backfill rate on Wednesday and escalate immediately if it falls below the safe threshold.', 'Thứ Tư ta sẽ xem tốc độ điền dữ liệu và báo ngay nếu thấp hơn ngưỡng an toàn.'],
    ],
  },
  {
    id: 'senior-interview', title: 'Preparing for a Senior Software Engineer Interview', level: 4,
    description: 'Answer senior-level questions with structure, evidence, and honest reflection.', estimatedMinutes: 11,
    objectives: ['Structure a concise example', 'Explain technical and team impact', 'Reflect on a lesson learned'],
    turns: [
      ['Harper', 'Interviewer', 'Tell me about a difficult technical decision you led.', 'Hãy kể về một quyết định kỹ thuật khó mà bạn dẫn dắt.'],
      ['Bao', 'Candidate', 'Our reporting service was approaching its database limit during peak traffic, and several teams depended on it.', 'Dịch vụ báo cáo gần chạm giới hạn cơ sở dữ liệu lúc cao điểm, trong khi nhiều nhóm phụ thuộc vào nó.'],
      ['Harper', 'Interviewer', 'How did you determine which change would help most?', 'Bạn xác định thay đổi nào có ích nhất bằng cách nào?'],
      ['Bao', 'Candidate', 'I reviewed query traces with the team and found repeated aggregation work that could be precomputed safely.', 'Tôi cùng nhóm xem trace truy vấn và phát hiện phép tổng hợp lặp lại có thể tính trước an toàn.'],
      ['Harper', 'Interviewer', 'What alternatives did you consider?', 'Bạn đã cân nhắc những phương án nào?'],
      ['Bao', 'Candidate', 'We compared a larger database instance with a summary table. The table cost less but required freshness monitoring.', 'Chúng tôi so sánh máy chủ cơ sở dữ liệu lớn hơn với bảng tổng hợp. Bảng rẻ hơn nhưng cần giám sát độ mới.'],
      ['Harper', 'Interviewer', 'What was the outcome, and what would you improve next time?', 'Kết quả ra sao và lần sau bạn sẽ cải thiện điều gì?'],
      ['Bao', 'Candidate', 'Peak query load fell by forty percent. Next time, I’d involve the data team earlier to agree on freshness targets.', 'Tải truy vấn cao điểm giảm bốn mươi phần trăm. Lần sau tôi sẽ mời nhóm dữ liệu sớm hơn để thống nhất mục tiêu độ mới.'],
    ],
  },
];

export const itEnglishTopics: ITEnglishTopic[] = drafts.map((draft, index) => makeTopic(index + 1, draft));
export const itEnglishTopicById = new Map(itEnglishTopics.map((topic) => [topic.id, topic]));

export function validateITEnglishCurriculum(topics: readonly ITEnglishTopic[] = itEnglishTopics): string[] {
  const errors: string[] = [];
  if (topics.length !== 30) errors.push(`Expected exactly 30 topics; found ${topics.length}.`);
  const ids = new Set<string>();
  for (const [index, topic] of topics.entries()) {
    if (!topic.id || ids.has(topic.id)) errors.push(`Topic ${index + 1} has a missing or duplicate ID: ${topic.id}.`);
    ids.add(topic.id);
    if (topic.number !== index + 1) errors.push(`Topic ${topic.id} is out of curriculum order.`);
    if (!topic.title.trim() || !topic.description.trim() || !topic.objectives.length || topic.estimatedMinutes <= 0) {
      errors.push(`Topic ${topic.id} is missing required metadata.`);
    }
    if (topic.turns.length < 8 || topic.turns.length > 12) errors.push(`Topic ${topic.id} must contain 8–12 dialogue turns.`);
    const turnIds = new Set<string>();
    topic.turns.forEach((turn, turnIndex) => {
      if (!turn.id || turnIds.has(turn.id)) errors.push(`Topic ${topic.id} has a missing or duplicate sentence ID.`);
      turnIds.add(turn.id);
      if (!turn.speaker.trim() || !turn.role.trim() || !turn.text.trim() || !turn.vietnamese.trim()) {
        errors.push(`Topic ${topic.id} sentence ${turnIndex + 1} is missing required content.`);
      }
    });
  }
  return errors;
}
