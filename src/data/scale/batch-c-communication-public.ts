import { batchCBrief as b, batchCTopic as t } from './batch-c-expansion-builder';

export const batchCCommunicationPublicTopics = [
  t({ id:'leaving-a-voice-message', title:'Leaving a Voice Message', titleVi:'Để lại lời nhắn thoại', category:'Communication', icon:'🎙️', level:'A1', description:'Tự giới thiệu, nêu lý do và nhờ gọi lại rõ ràng.', grammar:['present-simple','can'], intent:'requesting', relationship:'customer', briefs:[
    b('Saying Who You Are','Nói bạn là ai','the caller’s name and company','tên và công ty của người gọi','This is Mai from Green Star Travel.','Tôi là Mai từ Green Star Travel.'),
    b('Giving the Reason','Nêu lý do gọi','the reason for the voice message','lý do để lại lời nhắn thoại','I am calling about booking number B42.','Tôi gọi về mã đặt chỗ B42.'),
    b('Requesting a Return Call','Nhờ gọi lại','a return call after six','cuộc gọi lại sau sáu giờ','Please call me back after six this evening.','Vui lòng gọi lại cho tôi sau sáu giờ tối nay.'),
  ]}),
  t({ id:'asking-someone-to-call-back', title:'Asking Someone to Call Back', titleVi:'Nhờ ai đó gọi lại', category:'Communication', icon:'📞', level:'A1', description:'Để lại thời gian và số máy lẻ để được gọi lại.', grammar:['can','time-prepositions'], intent:'requesting', relationship:'receptionist', briefs:[
    b('Reaching the Right Person','Liên hệ đúng người','a callback from Ms Hoa','cuộc gọi lại từ chị Hoa','Ms Hoa is away from her desk now.','Chị Hoa hiện không có ở bàn làm việc.'),
    b('Choosing a Callback Time','Chọn giờ gọi lại','the callback window before noon','khung giờ gọi lại trước trưa','I am free between ten and twelve.','Tôi rảnh từ mười giờ đến mười hai giờ.'),
    b('Sharing an Extension','Cho số máy lẻ','the caller’s extension 207','số máy lẻ 207 của người gọi','My office extension is two zero seven.','Số máy lẻ văn phòng của tôi là 207.'),
  ]}),
  t({ id:'asking-someone-to-repeat', title:'Asking Someone to Repeat', titleVi:'Nhờ ai đó nói lại', category:'Communication', icon:'🔁', level:'A1', description:'Báo chưa nghe rõ, nhờ nói lại và xác nhận chi tiết.', grammar:['could','question-forms'], intent:'clarifying', relationship:'stranger', briefs:[
    b('Missing a Name','Nghe thiếu tên','the speaker’s family name','họ của người nói','The family name is Nguyen, not Nguyen-An.','Họ là Nguyễn, không phải Nguyễn An.'),
    b('Repeating a Number','Nhắc lại một con số','the final two digits','hai chữ số cuối','The number ends in four eight.','Số điện thoại kết thúc bằng bốn tám.'),
    b('Confirming a Place','Xác nhận địa điểm','the meeting point by gate C','điểm hẹn cạnh cổng C','We are meeting beside gate C.','Chúng ta gặp nhau cạnh cổng C.'),
  ]}),
  t({ id:'sharing-contact-details', title:'Sharing Contact Details', titleVi:'Chia sẻ thông tin liên hệ', category:'Communication', icon:'📇', level:'A1', description:'Đọc số điện thoại, đánh vần email và kiểm tra lại.', grammar:['be','possessives','spelling'], intent:'confirming', relationship:'coworker', briefs:[
    b('Giving a Mobile Number','Cho số di động','Lan’s mobile number ending 936','số di động của Lan kết thúc bằng 936','Lan’s number ends in nine three six.','Số của Lan kết thúc bằng chín ba sáu.'),
    b('Spelling an Email','Đánh vần email','the dot in Minh’s email address','dấu chấm trong email của Minh','There is a dot between minh and tran.','Có dấu chấm giữa minh và tran.'),
    b('Checking the Saved Contact','Kiểm tra liên hệ đã lưu','the saved contact under Mai Work','liên hệ lưu tên Mai Work','Please save it under Mai Work.','Vui lòng lưu tên là Mai Work.'),
  ]}),
  t({ id:'following-up-on-a-message', title:'Following Up on a Message', titleVi:'Hỏi lại về tin nhắn', category:'Communication', icon:'💬', level:'A2', description:'Kiểm tra người nhận đã xem tin và thống nhất lúc phản hồi.', grammar:['present-perfect','by-time'], intent:'asking-follow-up', relationship:'coworker', briefs:[
    b('Checking Receipt','Kiểm tra đã nhận','the message sent on Tuesday','tin nhắn gửi hôm thứ Ba','The delivery mark shows it arrived on Tuesday.','Dấu giao tin cho thấy tin đã đến hôm thứ Ba.'),
    b('Restating the Request','Nhắc lại yêu cầu','the request for revised figures','yêu cầu về số liệu đã sửa','The message asks for the revised figures only.','Tin nhắn chỉ yêu cầu số liệu đã sửa.'),
    b('Explaining the Impact','Nêu ảnh hưởng','the report waiting for those figures','báo cáo đang chờ số liệu đó','The weekly report cannot close without those figures.','Báo cáo tuần chưa thể hoàn tất nếu thiếu số liệu đó.'),
    b('Agreeing a Reply Time','Chốt giờ trả lời','a reply by three this afternoon','phản hồi trước ba giờ chiều','A complete reply will arrive by three today.','Phản hồi đầy đủ sẽ có trước ba giờ hôm nay.'),
  ]}),
  t({ id:'asking-someone-to-speak-more-slowly', title:'Asking Someone to Speak More Slowly', titleVi:'Nhờ nói chậm hơn', category:'Communication', icon:'🐢', level:'A2', description:'Lịch sự yêu cầu tốc độ nói phù hợp và kiểm tra hiểu đúng.', grammar:['could','comparative-adverbs'], intent:'requesting', relationship:'stranger', briefs:[
    b('Explaining the Difficulty','Giải thích khó khăn','the fast station announcement','thông báo nhanh ở nhà ga','The station names are difficult to catch at that speed.','Tên các ga khó nghe kịp ở tốc độ đó.'),
    b('Requesting a Slower Pace','Nhờ nói chậm hơn','a slower explanation of the route','phần giải thích tuyến đường chậm hơn','Short pauses between directions would help.','Nghỉ ngắn giữa các chỉ dẫn sẽ dễ nghe hơn.'),
    b('Checking Understanding','Kiểm tra đã hiểu','the second left after the bridge','lối rẽ trái thứ hai sau cầu','The correct turn is the second left after the bridge.','Lối đúng là rẽ trái lần hai sau cây cầu.'),
  ]}),
  t({ id:'correcting-a-text-misunderstanding', title:'Correcting a Text Misunderstanding', titleVi:'Sửa hiểu nhầm qua tin nhắn', category:'Communication', icon:'✏️', level:'A2', description:'Chỉ ra chi tiết bị đọc nhầm và xác nhận kế hoạch đúng.', grammar:['meant-to','not-but'], intent:'handling-misunderstanding', relationship:'close-friend', briefs:[
    b('Correcting the Day','Sửa lại ngày','Friday rather than Thursday','thứ Sáu chứ không phải thứ Năm','The text meant Friday, not Thursday.','Tin nhắn muốn nói thứ Sáu, không phải thứ Năm.'),
    b('Explaining a Typo','Giải thích lỗi gõ','the typo saying nine instead of six','lỗi gõ chín thay vì sáu','The number nine was a typing mistake.','Số chín là lỗi gõ nhầm.'),
    b('Clarifying the Tone','Làm rõ giọng điệu','the joke in the short reply','câu đùa trong phản hồi ngắn','The short reply was playful, not angry.','Phản hồi ngắn mang ý đùa, không phải tức giận.'),
    b('Reconfirming the Plan','Xác nhận lại kế hoạch','the corrected Friday plan at six','kế hoạch đúng vào sáu giờ thứ Sáu','Everyone now agrees on Friday at six.','Mọi người giờ đã thống nhất sáu giờ thứ Sáu.'),
  ]}),
  t({ id:'changing-plans-by-text', title:'Changing Plans by Text', titleVi:'Đổi kế hoạch qua tin nhắn', category:'Communication', icon:'📱', level:'A2', description:'Báo thay đổi, đề xuất thời gian khác và xác nhận lại.', grammar:['future-arrangements','can-we'], intent:'changing-plans', relationship:'close-friend', briefs:[
    b('Sending an Early Warning','Báo sớm','the delayed bus affecting dinner','xe buýt trễ ảnh hưởng bữa tối','The bus is running about thirty minutes late.','Xe buýt đang trễ khoảng ba mươi phút.'),
    b('Suggesting a New Time','Đề xuất giờ mới','dinner moved from six to seven','bữa tối chuyển từ sáu sang bảy','Seven o’clock gives everyone enough travel time.','Bảy giờ giúp mọi người có đủ thời gian di chuyển.'),
    b('Changing the Meeting Place','Đổi điểm gặp','the quieter cafe across the road','quán cà phê yên tĩnh bên kia đường','The original cafe is closed for repairs.','Quán ban đầu đóng cửa để sửa chữa.'),
    b('Getting Final Confirmation','Nhận xác nhận cuối','the revised plan at the new cafe','kế hoạch đã sửa tại quán mới','All four friends have accepted the revised plan.','Cả bốn người bạn đã đồng ý kế hoạch mới.'),
  ]}),
  t({ id:'borrowing-a-library-book', title:'Borrowing a Library Book', titleVi:'Mượn sách ở thư viện', category:'Public Places', icon:'📚', level:'A2', description:'Tìm sách, dùng thẻ và hiểu hạn trả.', grammar:['can','have-to'], intent:'asking-information', relationship:'service-staff', briefs:[
    b('Finding the Book','Tìm sách','the travel guide on shelf B7','sách hướng dẫn du lịch ở kệ B7','One available copy is on shelf B7.','Một bản còn sẵn nằm ở kệ B7.'),
    b('Using a Library Card','Dùng thẻ thư viện','the active library card barcode','mã vạch thẻ thư viện đang hoạt động','The barcode confirms the membership is active.','Mã vạch xác nhận thẻ thành viên còn hoạt động.'),
    b('Checking the Due Date','Xem hạn trả','the book due back on May twelfth','sách phải trả ngày 12 tháng Năm','The receipt lists May twelfth as the due date.','Biên nhận ghi ngày 12 tháng Năm là hạn trả.'),
  ]}),
  t({ id:'asking-about-museum-admission', title:'Asking About Museum Admission', titleVi:'Hỏi giá vé bảo tàng', category:'Public Places', icon:'🏛️', level:'A2', description:'Hỏi giá, điều kiện vé giảm và chọn loại vé.', grammar:['how-much','comparatives'], intent:'comparing', relationship:'service-staff', briefs:[
    b('Checking the Standard Price','Hỏi giá vé thường','the standard museum ticket at twelve dollars','vé thường của bảo tàng giá mười hai đô','A standard adult ticket costs twelve dollars.','Vé người lớn thông thường giá mười hai đô.'),
    b('Asking About a Discount','Hỏi vé giảm giá','the student admission with identification','vé sinh viên kèm giấy tờ','Students pay eight dollars with valid identification.','Sinh viên trả tám đô khi có giấy tờ hợp lệ.'),
    b('Choosing Exhibition Access','Chọn quyền vào triển lãm','the ticket including the design exhibition','vé bao gồm triển lãm thiết kế','The combined ticket includes both permanent and design galleries.','Vé kết hợp gồm khu thường trực và khu thiết kế.'),
  ]}),
  t({ id:'clarifying-what-someone-meant', title:'Clarifying What Someone Meant', titleVi:'Làm rõ ý của người khác', category:'Communication', icon:'🧩', level:'B1', description:'Kiểm tra cách hiểu, làm rõ hàm ý và thống nhất ý định.', grammar:['reported-speech','did-you-mean'], intent:'clarifying', relationship:'coworker', briefs:[
    b('Quoting the Ambiguous Phrase','Nhắc lại câu mơ hồ','the phrase “we can revisit it”','cụm “mình có thể xem lại”','The phrase could mean delay or further discussion.','Cụm đó có thể nghĩa là hoãn hoặc thảo luận thêm.'),
    b('Testing an Interpretation','Kiểm tra cách hiểu','whether the proposal needs revision','liệu đề xuất có cần sửa','The listener understood that the proposal needed changes.','Người nghe hiểu rằng đề xuất cần được chỉnh sửa.'),
    b('Explaining the Intended Meaning','Giải thích ý định','an open discussion rather than rejection','thảo luận mở chứ không phải từ chối','The speaker intended to invite another discussion.','Người nói muốn mời thảo luận thêm.'),
    b('Aligning on the Next Message','Thống nhất tin tiếp theo','clear wording for the follow-up note','cách viết rõ cho tin nhắn tiếp theo','The follow-up will say that no decision has been made.','Tin tiếp theo sẽ nói rằng chưa có quyết định.'),
  ]}),
  t({ id:'apologizing-for-a-late-reply', title:'Apologizing for a Late Reply', titleVi:'Xin lỗi vì trả lời muộn', category:'Communication', icon:'🙏', level:'B1', description:'Nhận lỗi ngắn gọn, trả lời yêu cầu và khôi phục tin cậy.', grammar:['present-perfect','because'], intent:'apologizing', relationship:'client', briefs:[
    b('Acknowledging the Delay','Thừa nhận chậm trễ','the unanswered email from Monday','email từ thứ Hai chưa được trả lời','The email should have received a reply earlier.','Email đáng lẽ phải được trả lời sớm hơn.'),
    b('Giving a Brief Explanation','Giải thích ngắn','the urgent support work causing the delay','việc hỗ trợ gấp gây chậm trễ','An urgent service issue took priority yesterday.','Một sự cố dịch vụ gấp được ưu tiên hôm qua.'),
    b('Answering the Original Request','Trả lời yêu cầu ban đầu','the requested draft attached today','bản nháp được yêu cầu đính kèm hôm nay','The requested draft is now attached to the reply.','Bản nháp được yêu cầu giờ đã đính kèm trong thư trả lời.'),
    b('Setting a Better Expectation','Đặt kỳ vọng tốt hơn','same-day acknowledgment for future messages','xác nhận trong ngày cho tin nhắn sau','Future requests will receive an acknowledgment the same day.','Yêu cầu sau sẽ được xác nhận ngay trong ngày.'),
  ]}),
  t({ id:'confirming-details-by-message', title:'Confirming Details by Message', titleVi:'Xác nhận chi tiết qua tin nhắn', category:'Communication', icon:'✅', level:'B1', description:'Tóm tắt, phát hiện sai lệch và lưu xác nhận bằng văn bản.', grammar:['future-forms','question-tags'], intent:'confirming', relationship:'coworker', briefs:[
    b('Summarizing the Arrangement','Tóm tắt thỏa thuận','the workshop on June eighth at nine','hội thảo lúc chín giờ ngày 8 tháng Sáu','The current plan says June eighth at nine.','Kế hoạch hiện tại ghi chín giờ ngày 8 tháng Sáu.'),
    b('Spotting a Location Mismatch','Phát hiện sai địa điểm','room 402 instead of room 204','phòng 402 thay vì phòng 204','The booking system lists room 402.','Hệ thống đặt phòng ghi phòng 402.'),
    b('Correcting the Attendee Count','Sửa số người tham dự','twenty-four confirmed attendees','hai mươi bốn người tham dự đã xác nhận','The final list contains twenty-four names.','Danh sách cuối có hai mươi bốn tên.'),
    b('Saving Written Confirmation','Lưu xác nhận bằng văn bản','the final workshop details in one message','chi tiết hội thảo cuối trong một tin','One final message will contain the date, room, and headcount.','Một tin cuối sẽ gồm ngày, phòng và số người.'),
  ]}),
  t({ id:'following-up-by-email', title:'Following Up by Email', titleVi:'Gửi email hỏi lại', category:'Professional Communication', icon:'📧', level:'B1', description:'Nhắc email trước, hỏi trạng thái và thống nhất cập nhật.', grammar:['present-perfect','indirect-questions'], intent:'asking-follow-up', relationship:'client', briefs:[
    b('Referencing the Earlier Email','Nhắc email trước','the proposal emailed last Wednesday','đề xuất gửi email thứ Tư trước','The proposal was sent with two pricing options.','Đề xuất đã được gửi kèm hai lựa chọn giá.'),
    b('Requesting a Status Update','Yêu cầu cập nhật trạng thái','the client review still in progress','phần khách hàng xem xét vẫn đang diễn ra','Two reviewers have responded and one is pending.','Hai người đã phản hồi và một người vẫn đang xem.'),
    b('Explaining the Schedule Impact','Nêu ảnh hưởng lịch trình','the launch slot held until Friday','khung ra mắt được giữ đến thứ Sáu','The launch slot cannot be held after Friday.','Khung ra mắt không thể giữ sau thứ Sáu.'),
    b('Agreeing the Next Update','Chốt cập nhật tiếp theo','a decision update by Thursday afternoon','cập nhật quyết định trước chiều thứ Năm','The client will send a decision by Thursday afternoon.','Khách hàng sẽ gửi quyết định trước chiều thứ Năm.'),
  ]}),
  t({ id:'resolving-a-misread-message', title:'Resolving a Misread Message', titleVi:'Giải quyết tin nhắn bị hiểu sai', category:'Communication', icon:'🕊️', level:'B2', description:'Tháo gỡ cách hiểu sai về giọng điệu và thống nhất cách diễn đạt mới.', grammar:['hedging','concession'], intent:'resolving-conflict', relationship:'coworker', briefs:[
    b('Acknowledging the Interpretation','Ghi nhận cách hiểu','the message that sounded dismissive','tin nhắn nghe có vẻ xem nhẹ','The short wording could reasonably sound dismissive.','Cách viết ngắn có thể khiến người đọc thấy bị xem nhẹ.'),
    b('Explaining the Original Intent','Giải thích ý ban đầu','the attempt to pause an unready decision','ý muốn tạm dừng quyết định chưa sẵn sàng','The sender meant to request more evidence before approval.','Người gửi muốn có thêm bằng chứng trước khi phê duyệt.'),
    b('Comparing Clearer Wording','So cách viết rõ hơn','a direct but respectful replacement sentence','câu thay thế thẳng thắn nhưng tôn trọng','The replacement states the concern without judging the person.','Câu thay thế nêu lo ngại mà không phán xét người khác.'),
    b('Repairing the Working Relationship','Khôi phục quan hệ làm việc','a private conversation after the misunderstanding','cuộc nói chuyện riêng sau hiểu nhầm','A private conversation will prevent the tension spreading.','Trao đổi riêng sẽ tránh để căng thẳng lan rộng.'),
    b('Agreeing a Messaging Norm','Thống nhất cách nhắn tin','a shared rule for sensitive feedback','quy ước chung cho góp ý nhạy cảm','Sensitive feedback will include context and a chance to respond.','Góp ý nhạy cảm sẽ kèm bối cảnh và cơ hội phản hồi.'),
  ]}),
  t({ id:'handling-lost-property-at-a-public-place', title:'Handling Lost Property at a Public Place', titleVi:'Xử lý đồ thất lạc nơi công cộng', category:'Public Places', icon:'🧳', level:'B2', description:'Mô tả đồ, xác minh quyền nhận và sắp xếp trả an toàn.', grammar:['past-simple','passive','conditionals'], intent:'reporting', relationship:'security-staff', briefs:[
    b('Describing the Missing Item','Mô tả đồ bị mất','a navy backpack with a red zip','ba lô xanh đậm có khóa đỏ','The missing backpack has a red zip and grey strap.','Ba lô bị mất có khóa đỏ và quai xám.'),
    b('Reconstructing the Timeline','Dựng lại thời gian','the bag last seen near the west entrance','túi được thấy lần cuối gần cửa tây','It was beside the west entrance at four ten.','Túi ở cạnh cửa tây lúc bốn giờ mười.'),
    b('Checking a Possible Match','Kiểm tra đồ phù hợp','the found bag containing a green notebook','túi được tìm thấy có sổ xanh','A green notebook is visible inside the recovered bag.','Một cuốn sổ xanh nằm trong chiếc túi được tìm thấy.'),
    b('Verifying the Claim','Xác minh người nhận','the private receipt used as proof','hóa đơn riêng dùng làm bằng chứng','The owner can name the shop and exact purchase amount.','Chủ sở hữu có thể nêu cửa hàng và đúng số tiền mua.'),
    b('Arranging Secure Collection','Sắp xếp nhận đồ an toàn','collection from desk two before eight','nhận đồ tại quầy hai trước tám giờ','Desk two will hold the item until eight tonight.','Quầy hai sẽ giữ đồ đến tám giờ tối nay.'),
  ]}),
];
