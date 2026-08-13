import { batchDBrief as b, batchDTopic as t } from './batch-d-expansion-builder';

export const batchD1EverydayServicesTopics = [
  t({id:'batch-d-using-a-public-charging-point',title:'Using a Public Charging Point',titleVi:'Dùng điểm sạc công cộng',category:'Public Places',icon:'🔋',level:'A1',description:'Hỏi đúng ổ cắm, thời gian và cách thanh toán khi sạc.',grammar:['can','present-simple'],intent:'requesting',relationship:'stranger',briefs:[
    b('Finding the Right Socket','Tìm đúng ổ cắm','the free USB-C socket','ổ USB-C còn trống','The socket beside the map is free.','Ổ cạnh bản đồ đang trống.'),
    b('Checking the Time Limit','Kiểm tra giới hạn giờ','the thirty-minute charging limit','giới hạn sạc ba mươi phút','Each person can charge for thirty minutes.','Mỗi người được sạc ba mươi phút.'),
    b('Starting the Charger','Bắt đầu sạc','the green start button','nút bắt đầu màu xanh','Press the green button after connecting the cable.','Bấm nút xanh sau khi cắm cáp.'),
  ]}),
  t({id:'batch-d-reporting-a-vending-machine-problem',title:'Reporting a Vending Machine Problem',titleVi:'Báo lỗi máy bán hàng',category:'Public Places',icon:'🥤',level:'A1',description:'Mô tả lỗi thanh toán và nhờ hỗ trợ đơn giản.',grammar:['past-simple','can'],intent:'complaining',relationship:'staff',briefs:[
    b('Naming the Machine','Xác định máy','the drink machine near platform two','máy nước gần sân ga hai','The broken machine is beside platform two.','Máy lỗi ở cạnh sân ga hai.'),
    b('Reporting the Payment','Báo khoản đã trả','the card payment for one juice','giao dịch thẻ cho một chai nước','My card was charged, but no drink came out.','Thẻ đã bị trừ tiền nhưng máy không đưa nước.'),
    b('Asking for Help','Nhờ hỗ trợ','a refund at the information desk','khoản hoàn tại quầy thông tin','The desk can refund the card payment.','Quầy có thể hoàn giao dịch thẻ.'),
  ]}),
  t({id:'batch-d-asking-for-a-queue-ticket',title:'Asking for a Queue Ticket',titleVi:'Xin phiếu xếp hàng',category:'Services',icon:'🎟️',level:'A1',description:'Chọn đúng dịch vụ và nhận số thứ tự.',grammar:['can','which-question'],intent:'requesting',relationship:'receptionist',briefs:[
    b('Choosing the Service','Chọn dịch vụ','the address-change queue','hàng chờ đổi địa chỉ','Address changes use the blue queue.','Đổi địa chỉ dùng hàng chờ màu xanh.'),
    b('Taking a Number','Lấy số thứ tự','ticket number A18','phiếu số A18','The machine printed number A18.','Máy đã in số A18.'),
    b('Finding the Screen','Tìm bảng gọi số','the queue screen above desk four','bảng gọi số trên quầy bốn','Desk four calls numbers on the large screen.','Quầy bốn gọi số trên màn hình lớn.'),
  ]}),
  t({id:'batch-d-checking-a-municipal-office-opening-time',title:'Checking a Municipal Office Opening Time',titleVi:'Kiểm tra giờ mở cửa cơ quan',category:'Services',icon:'🏛️',level:'A1',description:'Hỏi ngày, giờ và thời điểm ngừng nhận hồ sơ.',grammar:['present-simple','time-prepositions'],intent:'clarifying',relationship:'receptionist',briefs:[
    b('Checking the Weekday','Kiểm tra ngày làm việc','the office opening on Friday','văn phòng mở cửa thứ Sáu','The office is open this Friday.','Văn phòng mở cửa thứ Sáu này.'),
    b('Checking Morning Hours','Kiểm tra giờ sáng','the morning opening time at eight','giờ mở cửa buổi sáng lúc tám giờ','The doors open at eight in the morning.','Cửa mở lúc tám giờ sáng.'),
    b('Checking the Last Intake','Kiểm tra giờ nhận hồ sơ cuối','the final application time at four thirty','giờ nhận hồ sơ cuối lúc bốn rưỡi','New applications stop at four thirty.','Văn phòng ngừng nhận hồ sơ mới lúc bốn rưỡi.'),
  ]}),
  t({id:'batch-d-correcting-a-name-on-a-booking',title:'Correcting a Name on a Booking',titleVi:'Sửa tên trên đơn đặt chỗ',category:'Travel',icon:'🪪',level:'A2',description:'Chỉ ra lỗi chính tả và xác nhận tên đúng trên đặt chỗ.',grammar:['not-but','passive'],intent:'clarifying',relationship:'agent',briefs:[
    b('Finding the Booking','Tìm đơn đặt chỗ','booking code HT26','mã đặt chỗ HT26','The booking appears under code HT26.','Đơn đặt chỗ có mã HT26.'),
    b('Showing the Misspelling','Chỉ lỗi chính tả','the surname written as Nugen','họ bị viết thành Nugen','The record says Nugen instead of Nguyen.','Hồ sơ ghi Nugen thay vì Nguyen.'),
    b('Confirming the Correction','Xác nhận đã sửa','the corrected surname Nguyen','họ đúng là Nguyen','The revised ticket now shows Nguyen.','Vé đã sửa giờ hiển thị Nguyen.'),
  ]}),
  t({id:'batch-d-asking-for-a-copy-of-a-receipt',title:'Asking for a Copy of a Receipt',titleVi:'Xin bản sao hóa đơn',category:'Shopping',icon:'🧾',level:'A2',description:'Tìm giao dịch và xin hóa đơn điện tử thay thế.',grammar:['past-simple','could'],intent:'requesting',relationship:'staff',briefs:[
    b('Identifying the Purchase','Xác định món đã mua','the kettle bought on Saturday','ấm điện mua hôm thứ Bảy','The card record shows a kettle bought on Saturday.','Sao kê thẻ ghi một ấm điện mua hôm thứ Bảy.'),
    b('Matching the Payment','Đối chiếu thanh toán','the payment of six hundred thousand dong','khoản trả sáu trăm nghìn đồng','The transaction total was six hundred thousand dong.','Tổng giao dịch là sáu trăm nghìn đồng.'),
    b('Choosing the Copy Format','Chọn dạng hóa đơn','an emailed receipt copy','bản sao hóa đơn qua email','The store can email a replacement receipt today.','Cửa hàng có thể gửi hóa đơn thay thế hôm nay.'),
  ]}),
  t({id:'batch-d-reporting-a-parking-meter-problem',title:'Reporting a Parking Meter Problem',titleVi:'Báo lỗi đồng hồ đỗ xe',category:'Transportation',icon:'🅿️',level:'A2',description:'Báo mã máy, lỗi thanh toán và bảo vệ vé đỗ xe.',grammar:['past-simple','present-perfect'],intent:'complaining',relationship:'staff',briefs:[
    b('Locating the Meter','Xác định đồng hồ','parking meter P14 on Oak Street','đồng hồ P14 trên phố Oak','The faulty meter is P14 near the library.','Đồng hồ lỗi là P14 gần thư viện.'),
    b('Describing the Error','Mô tả lỗi','the rejected contactless payment','giao dịch không chạm bị từ chối','The screen froze after the contactless tap.','Màn hình treo sau khi chạm thẻ.'),
    b('Recording the Attempt','Ghi nhận lần thanh toán','the payment attempt at nine twenty','lần thanh toán lúc chín giờ hai mươi','A phone photo records the attempt at nine twenty.','Ảnh điện thoại ghi lại lần thử lúc chín giờ hai mươi.'),
    b('Protecting the Parking Session','Bảo vệ lượt đỗ','a temporary parking reference','mã đỗ xe tạm thời','Support issued a temporary reference for the car.','Hỗ trợ đã cấp mã tạm thời cho xe.'),
  ]}),
  t({id:'batch-d-arranging-a-delivery-window',title:'Arranging a Delivery Window',titleVi:'Sắp xếp khung giờ giao hàng',category:'Services',icon:'🚚',level:'A2',description:'So khung giờ, nêu khả năng có mặt và xác nhận liên lạc.',grammar:['future-arrangements','between-and'],intent:'changing-plans',relationship:'agent',briefs:[
    b('Checking Available Windows','Kiểm tra khung giờ','the Tuesday afternoon delivery window','khung giao chiều thứ Ba','Tuesday has a window from two until four.','Thứ Ba có khung từ hai đến bốn giờ.'),
    b('Explaining Availability','Nêu thời gian có mặt','someone being home after three','có người ở nhà sau ba giờ','A family member will be home after three.','Một người nhà sẽ có mặt sau ba giờ.'),
    b('Adding Driver Instructions','Thêm hướng dẫn cho tài xế','a call before entering the lane','cuộc gọi trước khi vào ngõ','The driver should call before entering the narrow lane.','Tài xế nên gọi trước khi vào ngõ hẹp.'),
    b('Confirming the Window','Xác nhận khung giờ','delivery between three and four on Tuesday','giao từ ba đến bốn giờ thứ Ba','The confirmed window is Tuesday from three to four.','Khung giờ đã chốt là thứ Ba từ ba đến bốn.'),
  ]}),
  t({id:'batch-d-collecting-a-public-service-document',title:'Collecting a Public Service Document',titleVi:'Nhận giấy tờ hành chính',category:'Services',icon:'📄',level:'A2',description:'Kiểm tra thông báo, giấy tờ tùy thân và quầy nhận.',grammar:['present-perfect','must'],intent:'confirming',relationship:'clerk',briefs:[
    b('Checking Readiness','Kiểm tra đã sẵn sàng','the residence certificate ready for collection','giấy xác nhận cư trú đã sẵn sàng','The collection message was sent this morning.','Tin nhắn nhận giấy đã được gửi sáng nay.'),
    b('Preparing Identification','Chuẩn bị giấy tờ','the original identity card','căn cước bản gốc','Collection requires the original identity card.','Khi nhận cần căn cước bản gốc.'),
    b('Finding the Counter','Tìm đúng quầy','counter seven on the ground floor','quầy bảy ở tầng trệt','Completed certificates are at counter seven.','Giấy đã hoàn tất được nhận tại quầy bảy.'),
    b('Signing the Register','Ký sổ nhận','the collection signature','chữ ký nhận giấy','The recipient signs once before leaving.','Người nhận ký một lần trước khi rời đi.'),
  ]}),
  t({id:'batch-d-resolving-a-double-booked-appointment',title:'Resolving a Double-booked Appointment',titleVi:'Giải quyết lịch hẹn bị trùng',category:'Services',icon:'📅',level:'B1',description:'Đối chiếu hai xác nhận và giữ đúng lịch ưu tiên.',grammar:['present-perfect','relative-clauses'],intent:'resolving-conflict',relationship:'receptionist',briefs:[
    b('Comparing Confirmations','So hai xác nhận','two appointments under one reference','hai lịch hẹn cùng một mã','The email lists ten o’clock while the app lists eleven.','Email ghi mười giờ còn ứng dụng ghi mười một giờ.'),
    b('Finding the Original Slot','Tìm lịch ban đầu','the first confirmed slot at ten','lịch xác nhận đầu tiên lúc mười giờ','The timestamp shows ten was confirmed first.','Dấu thời gian cho thấy mười giờ được xác nhận trước.'),
    b('Releasing the Duplicate','Hủy lịch trùng','the duplicate eleven o’clock slot','lịch trùng lúc mười một giờ','The later duplicate can be released without a fee.','Lịch trùng sau có thể được bỏ mà không mất phí.'),
    b('Recording the Resolution','Ghi lại kết quả','one valid appointment at ten','một lịch hợp lệ lúc mười giờ','A new message confirms only the ten o’clock appointment.','Tin nhắn mới chỉ xác nhận lịch mười giờ.'),
  ]}),
  t({id:'batch-d-following-up-on-a-repair-request',title:'Following Up on a Repair Request',titleVi:'Theo dõi yêu cầu sửa chữa',category:'Home',icon:'🛠️',level:'B1',description:'Nhắc mã yêu cầu, ảnh hưởng và thời hạn xử lý.',grammar:['present-perfect','indirect-questions'],intent:'asking-follow-up',relationship:'landlord',briefs:[
    b('Referencing the Request','Nhắc yêu cầu trước','repair request R58 for the bedroom window','yêu cầu R58 cho cửa sổ phòng ngủ','Request R58 was submitted nine days ago.','Yêu cầu R58 được gửi chín ngày trước.'),
    b('Explaining the Impact','Nêu ảnh hưởng','rain entering through the window frame','mưa lọt qua khung cửa','Water now reaches the bedroom floor during heavy rain.','Nước giờ chảy xuống sàn phòng khi mưa lớn.'),
    b('Checking Contractor Status','Hỏi trạng thái thợ','the contractor visit still unscheduled','lịch thợ vẫn chưa được xếp','No contractor has accepted the job yet.','Chưa có thợ nào nhận việc.'),
    b('Agreeing a Response Deadline','Chốt hạn phản hồi','a confirmed repair date by Thursday','ngày sửa được xác nhận trước thứ Năm','The landlord will provide a date by Thursday afternoon.','Chủ nhà sẽ báo ngày trước chiều thứ Năm.'),
  ]}),
  t({id:'batch-d-disputing-a-service-waiting-time',title:'Disputing a Service Waiting Time',titleVi:'Phản hồi về thời gian chờ dịch vụ',category:'Services',icon:'⏳',level:'B1',description:'Đối chiếu thời gian cam kết và yêu cầu phương án thực tế.',grammar:['reported-speech','present-perfect'],intent:'complaining',relationship:'customer',briefs:[
    b('Restating the Promise','Nhắc cam kết','the promised twenty-minute wait','thời gian chờ đã hứa là hai mươi phút','The confirmation screen quoted twenty minutes.','Màn hình xác nhận báo hai mươi phút.'),
    b('Documenting the Actual Wait','Ghi thời gian thực tế','the current seventy-minute delay','độ trễ hiện tại bảy mươi phút','The queue ticket was issued seventy minutes ago.','Phiếu xếp hàng được cấp bảy mươi phút trước.'),
    b('Asking for a Realistic Estimate','Xin ước tính thực tế','an honest completion estimate','ước tính hoàn tất trung thực','Staff now expect another forty minutes.','Nhân viên hiện dự kiến thêm bốn mươi phút.'),
    b('Choosing a Remedy','Chọn cách khắc phục','a callback instead of continued waiting','cuộc gọi lại thay vì tiếp tục chờ','The team will call when the service is ready.','Bộ phận sẽ gọi khi dịch vụ sẵn sàng.'),
  ]}),
  t({id:'batch-d-requesting-an-exception-to-a-deadline',title:'Requesting an Exception to a Deadline',titleVi:'Xin ngoại lệ về thời hạn',category:'Education',icon:'🗓️',level:'B1',description:'Giải thích trở ngại có bằng chứng và đề xuất hạn mới hợp lý.',grammar:['present-perfect','conditionals'],intent:'negotiating',relationship:'teacher',briefs:[
    b('Acknowledging the Deadline','Ghi nhận hạn hiện tại','the assignment deadline on Wednesday','hạn bài tập vào thứ Tư','The course page clearly lists Wednesday at noon.','Trang khóa học ghi rõ trưa thứ Tư.'),
    b('Explaining the Barrier','Giải thích trở ngại','the documented internet outage','sự cố mạng có xác nhận','The provider confirmed an outage lasting most of Tuesday.','Nhà mạng xác nhận sự cố kéo dài gần hết thứ Ba.'),
    b('Proposing a Limited Extension','Đề xuất gia hạn giới hạn','a new deadline on Thursday morning','hạn mới vào sáng thứ Năm','Thursday morning adds less than one full day.','Sáng thứ Năm chỉ thêm chưa đầy một ngày.'),
    b('Accepting Conditions','Chấp nhận điều kiện','the extension recorded without further delay','gia hạn được ghi nhận và không trễ thêm','The revised submission must arrive by ten on Thursday.','Bài sửa phải được nộp trước mười giờ thứ Năm.'),
  ]}),
  t({id:'batch-d-coordinating-a-last-minute-rota-change',title:'Coordinating a Last-minute Rota Change',titleVi:'Phối hợp đổi ca phút chót',category:'Work',icon:'🔄',level:'B1',description:'Tìm người thay, bảo vệ thời gian nghỉ và xác nhận bàn giao.',grammar:['future-arrangements','modal-verbs'],intent:'changing-plans',relationship:'coworker',briefs:[
    b('Identifying the Gap','Xác định ca trống','the uncovered Friday evening shift','ca tối thứ Sáu chưa có người','The assigned colleague became ill this morning.','Đồng nghiệp được xếp ca bị ốm sáng nay.'),
    b('Checking Qualified Cover','Tìm người thay phù hợp','a trained closer for Friday','người đã được đào tạo đóng cửa thứ Sáu','Only two available colleagues can complete closing checks.','Chỉ hai đồng nghiệp rảnh có thể làm kiểm tra đóng cửa.'),
    b('Balancing Hours','Cân bằng số giờ','time off after the replacement shift','thời gian nghỉ bù sau ca thay','The volunteer can take Monday morning off.','Người nhận thay có thể nghỉ sáng thứ Hai.'),
    b('Confirming the Handover','Xác nhận bàn giao','the updated rota and closing notes','lịch ca mới và ghi chú đóng cửa','The manager will publish both before four today.','Quản lý sẽ đăng cả hai trước bốn giờ hôm nay.'),
  ]}),
  t({id:'batch-d-negotiating-priority-service-after-a-delay',title:'Negotiating Priority Service after a Delay',titleVi:'Thương lượng ưu tiên sau khi bị trễ',category:'Services',icon:'⚡',level:'B2',description:'Lập luận về ảnh hưởng, giới hạn công bằng và phương án ưu tiên.',grammar:['concession','conditionals','hedging'],intent:'negotiating',relationship:'manager',briefs:[
    b('Establishing Responsibility','Xác định trách nhiệm','the provider-caused two-day delay','độ trễ hai ngày do nhà cung cấp','The original booking was ready, but the provider cancelled twice.','Lịch ban đầu đã sẵn sàng nhưng nhà cung cấp hủy hai lần.'),
    b('Explaining Consequences','Nêu hậu quả','the delay threatening a medical deadline','độ trễ ảnh hưởng hạn y tế','Missing tomorrow would postpone treatment by another week.','Nếu lỡ ngày mai, điều trị sẽ bị lùi thêm một tuần.'),
    b('Requesting Proportionate Priority','Xin ưu tiên tương xứng','the first cancellation slot tomorrow','suất hủy đầu tiên ngày mai','A cancellation slot would not displace a confirmed customer.','Suất trống do hủy sẽ không đẩy khách đã xác nhận.'),
    b('Respecting Fairness','Tôn trọng công bằng','priority limited to matching availability','ưu tiên giới hạn theo thời gian phù hợp','The request applies only if a suitable slot becomes free.','Yêu cầu chỉ áp dụng nếu có suất phù hợp trống.'),
    b('Documenting the Agreement','Ghi thỏa thuận','a written priority-call note','ghi chú gọi ưu tiên bằng văn bản','The manager will record the criteria and callback order.','Quản lý sẽ ghi tiêu chí và thứ tự gọi lại.'),
  ]}),
  t({id:'batch-d-resolving-conflicting-appointment-records',title:'Resolving Conflicting Appointment Records',titleVi:'Giải quyết hồ sơ lịch hẹn mâu thuẫn',category:'Health',icon:'🩺',level:'B2',description:'Đối chiếu nguồn, bảo toàn an toàn và sửa dấu vết kiểm toán.',grammar:['passive','reported-speech','conditionals'],intent:'resolving-conflict',relationship:'receptionist',briefs:[
    b('Mapping the Conflict','Lập bản đồ mâu thuẫn','three systems showing different appointment times','ba hệ thống hiện giờ hẹn khác nhau','The email says nine, the app says ten, and reception says eleven.','Email ghi chín, ứng dụng ghi mười, lễ tân ghi mười một.'),
    b('Ranking the Evidence','Xếp mức tin cậy bằng chứng','the signed referral timestamp','dấu thời gian giấy giới thiệu đã ký','The signed referral predates both automated updates.','Giấy giới thiệu có trước cả hai cập nhật tự động.'),
    b('Protecting Clinical Safety','Bảo vệ an toàn khám','the fasting instruction tied to the earliest slot','hướng dẫn nhịn ăn gắn với lịch sớm nhất','Changing the time could affect the fasting window.','Đổi giờ có thể ảnh hưởng thời gian nhịn ăn.'),
    b('Correcting Every Record','Sửa tất cả hồ sơ','one synchronized appointment at nine','một lịch đồng bộ lúc chín giờ','All three systems will be updated to nine.','Cả ba hệ thống sẽ được cập nhật thành chín giờ.'),
    b('Preventing Recurrence','Ngăn tái diễn','an audit note linking each correction','ghi chú kiểm toán liên kết từng sửa đổi','The audit note will preserve the original entries and reason.','Ghi chú kiểm toán sẽ giữ mục cũ và lý do sửa.'),
  ]}),
];
