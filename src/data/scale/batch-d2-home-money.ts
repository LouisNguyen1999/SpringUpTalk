import { batchDBrief as b, batchDTopic as t } from './batch-d-expansion-builder';

export const batchD2HomeMoneyTopics = [
  t({id:'batch-d-reporting-a-broken-hallway-light',title:'Reporting a Broken Hallway Light',titleVi:'Báo đèn hành lang bị hỏng',category:'Home',icon:'💡',level:'A1',description:'Nêu vị trí đèn hỏng và cách đi lại an toàn.',grammar:['present-simple','there-is-are'],intent:'reporting',relationship:'landlord',briefs:[
    b('Naming the Floor','Nói đúng tầng','the dark light on the third floor','đèn tắt ở tầng ba','The light outside apartment 3B is off.','Đèn ngoài căn 3B đang tắt.'),
    b('Explaining the Risk','Nêu nguy hiểm','the dark stairs at night','cầu thang tối vào ban đêm','People cannot see the top step clearly.','Mọi người không nhìn rõ bậc trên cùng.'),
    b('Requesting a Repair','Yêu cầu sửa','a new hallway bulb today','bóng đèn hành lang mới hôm nay','Maintenance can replace the bulb this afternoon.','Bảo trì có thể thay bóng chiều nay.'),
  ]}),
  t({id:'batch-d-asking-about-recycling-day',title:'Asking about Recycling Day',titleVi:'Hỏi ngày thu gom tái chế',category:'Community',icon:'♻️',level:'A1',description:'Hỏi ngày, loại thùng và nơi đặt đồ tái chế.',grammar:['present-simple','where-questions'],intent:'asking-information',relationship:'neighbor',briefs:[
    b('Checking the Day','Kiểm tra ngày','the Wednesday recycling collection','lịch thu gom tái chế thứ Tư','Recycling is collected every Wednesday morning.','Đồ tái chế được lấy mỗi sáng thứ Tư.'),
    b('Choosing the Bin','Chọn đúng thùng','the blue bin for paper and cans','thùng xanh cho giấy và lon','Paper and clean cans go in the blue bin.','Giấy và lon sạch bỏ vào thùng xanh.'),
    b('Placing the Bin','Đặt thùng đúng chỗ','the bin beside the front gate','thùng cạnh cổng trước','The collection team checks beside the front gate.','Đội thu gom kiểm tra cạnh cổng trước.'),
  ]}),
  t({id:'batch-d-borrowing-a-household-tool',title:'Borrowing a Household Tool',titleVi:'Mượn dụng cụ gia đình',category:'Home',icon:'🪛',level:'A1',description:'Mượn đúng dụng cụ và hẹn trả rõ ràng.',grammar:['can','possessives'],intent:'requesting',relationship:'neighbor',briefs:[
    b('Asking for the Tool','Hỏi mượn dụng cụ','a medium Phillips screwdriver','tua vít bake cỡ vừa','The shelf bracket needs a Phillips screwdriver.','Giá kệ cần tua vít bake.'),
    b('Saying How Long','Nói thời gian mượn','the screwdriver for one hour','tua vít trong một giờ','The small repair will take about one hour.','Việc sửa nhỏ mất khoảng một giờ.'),
    b('Returning It Safely','Trả lại an toàn','the tool returned in its red case','dụng cụ trả trong hộp đỏ','I will bring the case back before dinner.','Tôi sẽ mang hộp trả trước bữa tối.'),
  ]}),
  t({id:'batch-d-checking-school-pickup-authorization',title:'Checking School Pickup Authorization',titleVi:'Kiểm tra quyền đón học sinh',category:'Family',icon:'🏫',level:'A1',description:'Xác nhận người đón, giấy tờ và cổng trường.',grammar:['can','be'],intent:'confirming',relationship:'teacher',briefs:[
    b('Naming the Collector','Nói tên người đón','Aunt Lan collecting Nam','dì Lan đón Nam','Lan is listed as Nam’s aunt.','Lan được ghi là dì của Nam.'),
    b('Checking Identification','Kiểm tra giấy tờ','Lan’s identity card','căn cước của Lan','The school needs to see Lan’s identity card.','Trường cần xem căn cước của Lan.'),
    b('Finding the Pickup Gate','Tìm cổng đón','pickup at the east gate','đón ở cổng phía đông','Authorized adults meet children at the east gate.','Người được phép đón trẻ ở cổng phía đông.'),
  ]}),
  t({id:'batch-d-arranging-a-maintenance-visit',title:'Arranging a Maintenance Visit',titleVi:'Sắp lịch bảo trì tại nhà',category:'Home',icon:'🔧',level:'A2',description:'Chọn giờ, mô tả quyền vào nhà và xác nhận thợ.',grammar:['future-arrangements','can'],intent:'planning',relationship:'landlord',briefs:[
    b('Describing the Job','Mô tả việc sửa','the loose kitchen cabinet door','cánh tủ bếp bị lỏng','The lower hinge has pulled away from the cabinet.','Bản lề dưới đã bung khỏi tủ.'),
    b('Choosing a Visit Time','Chọn giờ đến','a maintenance visit after five','lịch bảo trì sau năm giờ','Someone will be home from five thirty.','Sẽ có người ở nhà từ năm rưỡi.'),
    b('Confirming Access','Xác nhận cách vào','the technician calling at the gate','thợ gọi khi đến cổng','The building guard will not admit an unknown visitor.','Bảo vệ không cho khách lạ vào.'),
  ]}),
  t({id:'batch-d-splitting-a-household-energy-bill',title:'Splitting a Household Energy Bill',titleVi:'Chia hóa đơn năng lượng',category:'Home',icon:'⚡',level:'A2',description:'Đọc tổng, tính phần chia và ghi nhận thanh toán.',grammar:['fractions','how-much'],intent:'negotiating',relationship:'roommate',briefs:[
    b('Reading the Total','Đọc tổng hóa đơn','the 1.2-million-dong energy bill','hóa đơn năng lượng 1,2 triệu đồng','The current statement totals one million two hundred thousand dong.','Sao kê hiện tại tổng một triệu hai trăm nghìn đồng.'),
    b('Separating the Fixed Fee','Tách phí cố định','the 200,000-dong shared fee','phí chung 200.000 đồng','The fixed service fee is shared equally.','Phí dịch vụ cố định được chia đều.'),
    b('Calculating Each Share','Tính phần mỗi người','each roommate paying six hundred thousand dong','mỗi người trả sáu trăm nghìn đồng','Two equal shares are six hundred thousand dong each.','Hai phần bằng nhau là sáu trăm nghìn đồng mỗi người.'),
    b('Recording Payment','Ghi nhận thanh toán','the transfer note Energy July','nội dung chuyển khoản Energy July','Both transfers will use the same clear reference.','Cả hai giao dịch sẽ dùng cùng nội dung rõ ràng.'),
  ]}),
  t({id:'batch-d-asking-about-a-bank-transfer-fee',title:'Asking about a Bank Transfer Fee',titleVi:'Hỏi phí chuyển khoản ngân hàng',category:'Money & Banking',icon:'🏦',level:'A2',description:'Phân biệt phí trong nước, quốc tế và phí người nhận.',grammar:['how-much','conditionals'],intent:'asking-information',relationship:'bank-staff',briefs:[
    b('Naming the Transfer Type','Nêu loại chuyển khoản','a same-day domestic transfer','chuyển khoản trong nước cùng ngày','The transfer goes to another bank in Vietnam.','Tiền được chuyển tới ngân hàng khác tại Việt Nam.'),
    b('Checking the Sender Fee','Kiểm tra phí người gửi','the sender fee of eleven thousand dong','phí người gửi mười một nghìn đồng','The app shows an eleven-thousand-dong service fee.','Ứng dụng hiện phí dịch vụ mười một nghìn đồng.'),
    b('Checking Recipient Deductions','Kiểm tra khoản trừ người nhận','the recipient receiving the full amount','người nhận nhận đủ số tiền','No additional fee is deducted from the recipient.','Người nhận không bị trừ thêm phí.'),
    b('Comparing a Slower Option','So phương án chậm hơn','the free next-day transfer','chuyển miễn phí vào ngày hôm sau','The next-day option has no service fee.','Phương án ngày hôm sau không có phí dịch vụ.'),
  ]}),
  t({id:'batch-d-updating-a-school-emergency-contact',title:'Updating a School Emergency Contact',titleVi:'Cập nhật liên hệ khẩn cấp ở trường',category:'Family',icon:'📞',level:'A2',description:'Thay số liên hệ và kiểm tra thứ tự gọi khẩn cấp.',grammar:['present-simple','not-but'],intent:'clarifying',relationship:'teacher',briefs:[
    b('Removing the Old Number','Xóa số cũ','the inactive number ending 244','số cũ kết thúc 244','The number ending 244 no longer works.','Số kết thúc 244 không còn hoạt động.'),
    b('Adding the New Contact','Thêm liên hệ mới','Uncle Minh at the number ending 781','chú Minh với số kết thúc 781','Minh can answer during school hours.','Minh có thể nghe máy trong giờ học.'),
    b('Setting Call Order','Đặt thứ tự gọi','the parent called before Uncle Minh','gọi phụ huynh trước chú Minh','The parent remains the first emergency contact.','Phụ huynh vẫn là liên hệ khẩn cấp đầu tiên.'),
    b('Confirming the Record','Xác nhận hồ sơ','the updated contact form signed today','phiếu liên hệ mới ký hôm nay','The office saved the signed form this afternoon.','Văn phòng đã lưu phiếu ký chiều nay.'),
  ]}),
  t({id:'batch-d-replacing-a-damaged-debit-card',title:'Replacing a Damaged Debit Card',titleVi:'Đổi thẻ ghi nợ bị hỏng',category:'Money & Banking',icon:'💳',level:'A2',description:'Báo phần thẻ hỏng, bảo vệ tài khoản và chọn cách nhận.',grammar:['present-perfect','passive'],intent:'requesting',relationship:'bank-staff',briefs:[
    b('Describing the Damage','Mô tả hư hỏng','the cracked chip on the debit card','chip thẻ ghi nợ bị nứt','The card fails whenever a terminal reads the chip.','Thẻ lỗi mỗi khi máy đọc chip.'),
    b('Checking Account Safety','Kiểm tra an toàn tài khoản','the account remaining active','tài khoản vẫn hoạt động','No unknown transaction appears on the account.','Không có giao dịch lạ trong tài khoản.'),
    b('Choosing a Replacement','Chọn thẻ thay thế','a standard replacement card','thẻ thay thế tiêu chuẩn','A standard replacement has no emergency fee.','Thẻ thay thế tiêu chuẩn không có phí khẩn.'),
    b('Arranging Collection','Sắp xếp nhận thẻ','card collection at the Central branch','nhận thẻ tại chi nhánh Central','The new card will reach the branch in five days.','Thẻ mới sẽ đến chi nhánh trong năm ngày.'),
  ]}),
  t({id:'batch-d-negotiating-a-rent-payment-date',title:'Negotiating a Rent Payment Date',titleVi:'Thương lượng ngày trả tiền thuê',category:'Home',icon:'🏠',level:'B1',description:'Nêu dòng tiền, đề xuất ngày mới và bảo vệ cam kết.',grammar:['future-forms','conditionals'],intent:'negotiating',relationship:'landlord',briefs:[
    b('Acknowledging the Due Date','Ghi nhận ngày đến hạn','rent due on the first of the month','tiền thuê đến hạn ngày đầu tháng','The lease sets payment for the first day.','Hợp đồng quy định trả vào ngày đầu tháng.'),
    b('Explaining the Timing Gap','Giải thích khoảng trống dòng tiền','salary arriving on the third','lương về ngày mùng ba','This month’s salary will clear two days later than usual.','Lương tháng này sẽ về muộn hơn thường lệ hai ngày.'),
    b('Proposing a Firm Date','Đề xuất ngày chắc chắn','full rent paid on the third','trả đủ tiền thuê ngày mùng ba','The entire amount can be transferred on the third morning.','Toàn bộ số tiền có thể chuyển sáng mùng ba.'),
    b('Preventing a Pattern','Ngăn thành tiền lệ','the exception limited to this month','ngoại lệ chỉ áp dụng tháng này','Future payments will return to the first.','Các tháng sau sẽ trả lại vào ngày đầu tháng.'),
  ]}),
  t({id:'batch-d-correcting-an-estimated-water-bill',title:'Correcting an Estimated Water Bill',titleVi:'Sửa hóa đơn nước ước tính',category:'Home',icon:'🚰',level:'B1',description:'So chỉ số thực, ước tính sai và yêu cầu điều chỉnh.',grammar:['comparatives','passive'],intent:'complaining',relationship:'service-staff',briefs:[
    b('Identifying the Estimate','Xác định số ước tính','the estimated reading of 184 units','chỉ số ước tính 184 đơn vị','The bill marks the reading as estimated, not measured.','Hóa đơn ghi chỉ số là ước tính, không phải đo thực.'),
    b('Providing the Actual Reading','Cung cấp chỉ số thật','the meter photo showing 161 units','ảnh đồng hồ hiện 161 đơn vị','The dated photo clearly shows 161.','Ảnh có ngày cho thấy rõ 161.'),
    b('Calculating the Difference','Tính chênh lệch','the overestimate of twenty-three units','phần ước tính thừa 23 đơn vị','The estimate exceeds the meter by twenty-three units.','Ước tính cao hơn đồng hồ 23 đơn vị.'),
    b('Requesting Rebilling','Yêu cầu tính lại','a corrected bill using 161 units','hóa đơn sửa theo 161 đơn vị','The provider will issue a revised statement within three days.','Nhà cung cấp sẽ phát hành hóa đơn sửa trong ba ngày.'),
  ]}),
  t({id:'batch-d-planning-care-during-a-caregiver-absence',title:'Planning Care during a Caregiver Absence',titleVi:'Lập kế hoạch chăm sóc khi người chăm vắng mặt',category:'Family',icon:'🤝',level:'B1',description:'Phân ca chăm sóc, thuốc và liên hệ dự phòng.',grammar:['future-arrangements','must'],intent:'planning',relationship:'family',briefs:[
    b('Mapping the Absence','Xác định thời gian vắng','the caregiver away from Monday through Wednesday','người chăm vắng từ thứ Hai đến thứ Tư','The regular caregiver returns Wednesday evening.','Người chăm thường xuyên trở lại tối thứ Tư.'),
    b('Covering Morning Care','Sắp người chăm buổi sáng','morning support from Aunt Hoa','dì Hoa hỗ trợ buổi sáng','Hoa can prepare breakfast and morning medicine.','Hoa có thể chuẩn bị bữa sáng và thuốc buổi sáng.'),
    b('Covering Evening Care','Sắp người chăm buổi tối','evening visits from the older brother','anh trai ghé buổi tối','He can stay until the night medicine is taken.','Anh ấy có thể ở đến khi uống thuốc tối.'),
    b('Preparing Backup','Chuẩn bị dự phòng','the neighbor holding the emergency key','hàng xóm giữ chìa khóa khẩn cấp','The neighbor will respond if either relative is delayed.','Hàng xóm sẽ hỗ trợ nếu người thân đến muộn.'),
  ]}),
  t({id:'batch-d-handling-a-delayed-home-repair',title:'Handling a Delayed Home Repair',titleVi:'Xử lý sửa chữa nhà bị chậm',category:'Home',icon:'🏚️',level:'B1',description:'Đánh giá mức khẩn, biện pháp tạm và lịch sửa mới.',grammar:['present-perfect','conditionals'],intent:'resolving-conflict',relationship:'landlord',briefs:[
    b('Reviewing the Missed Visit','Xem lại lịch bị lỡ','the plumber missing the Monday appointment','thợ nước lỡ lịch thứ Hai','No cancellation message arrived before the missed visit.','Không có tin hủy trước lịch bị lỡ.'),
    b('Reassessing Urgency','Đánh giá lại mức khẩn','the leak spreading under the sink','vết rò lan dưới bồn rửa','The cabinet floor is now wet every morning.','Sàn tủ giờ ướt mỗi sáng.'),
    b('Agreeing Temporary Protection','Chốt biện pháp tạm','a shutoff valve used overnight','van khóa dùng qua đêm','Closing the valve prevents further overnight damage.','Đóng van ngăn hư hại thêm qua đêm.'),
    b('Securing a New Visit','Chốt lịch mới','a confirmed plumber visit on Wednesday morning','lịch thợ nước xác nhận sáng thứ Tư','The contractor accepted the first Wednesday slot.','Nhà thầu đã nhận lịch đầu tiên sáng thứ Tư.'),
  ]}),
  t({id:'batch-d-resolving-a-shared-subscription-payment',title:'Resolving a Shared Subscription Payment',titleVi:'Giải quyết thanh toán gói dùng chung',category:'Money & Banking',icon:'📺',level:'B1',description:'Đối chiếu thành viên, giá mới và khoản hoàn giữa bạn bè.',grammar:['present-perfect','reported-speech'],intent:'resolving-conflict',relationship:'close-friend',briefs:[
    b('Checking Active Members','Kiểm tra thành viên','four active members on the family plan','bốn thành viên đang dùng gói gia đình','The account history shows four profiles used this month.','Lịch sử tài khoản cho thấy bốn hồ sơ dùng tháng này.'),
    b('Explaining the Price Increase','Giải thích tăng giá','the monthly plan rising by eighty thousand dong','gói tháng tăng tám mươi nghìn đồng','The provider raised the price at renewal.','Nhà cung cấp tăng giá lúc gia hạn.'),
    b('Recalculating Shares','Tính lại phần chia','each member owing an extra twenty thousand dong','mỗi người thêm hai mươi nghìn đồng','Four equal shares add twenty thousand dong each.','Bốn phần đều nhau tăng hai mươi nghìn đồng mỗi người.'),
    b('Handling an Accidental Overpayment','Xử lý trả thừa','one member overpaying by forty thousand dong','một người trả thừa bốn mươi nghìn đồng','The bank record confirms the duplicate amount.','Sao kê ngân hàng xác nhận khoản bị trùng.'),
    b('Closing the Balance','Chốt số dư','the overpayment returned before renewal','khoản thừa được trả trước lần gia hạn','A return transfer will settle the account tonight.','Một giao dịch hoàn sẽ cân bằng tài khoản tối nay.'),
  ]}),
  t({id:'batch-d-disputing-an-unrecognized-account-charge',title:'Disputing an Unrecognized Account Charge',titleVi:'Khiếu nại khoản trừ tiền không nhận ra',category:'Money & Banking',icon:'🚨',level:'B2',description:'Phân biệt giao dịch, khóa rủi ro và theo dõi tranh chấp.',grammar:['past-perfect','passive','conditionals'],intent:'complaining',relationship:'bank-staff',briefs:[
    b('Isolating the Transaction','Xác định giao dịch','an unknown online charge labeled NORA88','khoản trực tuyến lạ ghi NORA88','The charge appeared at two fifteen while the cardholder was asleep.','Khoản trừ xuất hiện lúc hai giờ mười lăm khi chủ thẻ đang ngủ.'),
    b('Ruling Out Familiar Activity','Loại trừ hoạt động quen thuộc','no subscription matching NORA88','không có gói đăng ký nào khớp NORA88','Neither family purchases nor subscriptions use that label.','Không giao dịch gia đình hay gói đăng ký nào dùng nhãn đó.'),
    b('Containing Further Risk','Ngăn rủi ro tiếp tục','online card payments frozen immediately','thanh toán thẻ trực tuyến bị khóa ngay','Cash access remains available while online use is blocked.','Rút tiền vẫn dùng được trong khi giao dịch trực tuyến bị chặn.'),
    b('Opening the Dispute','Mở hồ sơ tranh chấp','dispute reference DC904','mã tranh chấp DC904','The bank opened case DC904 with the transaction evidence.','Ngân hàng mở hồ sơ DC904 kèm bằng chứng giao dịch.'),
    b('Tracking Provisional Credit','Theo dõi hoàn tạm','a provisional credit review within ten days','xét hoàn tạm trong mười ngày','The bank will update the customer before the tenth day.','Ngân hàng sẽ cập nhật trước ngày thứ mười.'),
  ]}),
  t({id:'batch-d-negotiating-responsibility-for-shared-expenses',title:'Negotiating Responsibility for Shared Expenses',titleVi:'Thương lượng trách nhiệm chi phí chung',category:'Home',icon:'⚖️',level:'B2',description:'Phân biệt chi phí chung, riêng và ngoại lệ có căn cứ.',grammar:['concession','conditionals','reported-speech'],intent:'negotiating',relationship:'roommate',briefs:[
    b('Defining Shared Use','Xác định sử dụng chung','the internet plan used equally by three roommates','gói mạng được ba người dùng như nhau','All three people use the same speed and data allowance.','Cả ba dùng cùng tốc độ và dung lượng.'),
    b('Separating Private Purchases','Tách mua sắm riêng','one premium sports package','một gói thể thao cao cấp','Only one roommate requested and watches the sports package.','Chỉ một người yêu cầu và xem gói thể thao.'),
    b('Addressing Unequal Absence','Xử lý thời gian vắng khác nhau','a roommate away for six weeks','một người vắng sáu tuần','The base internet fee continued during the absence.','Phí mạng cơ bản vẫn tiếp tục trong thời gian vắng.'),
    b('Designing a Fair Rule','Thiết kế quy tắc công bằng','base services shared and add-ons paid privately','dịch vụ cơ bản chia chung và tiện ích riêng tự trả','The rule separates access for everyone from optional extras.','Quy tắc tách quyền dùng chung khỏi tiện ích tùy chọn.'),
    b('Recording Future Exceptions','Ghi ngoại lệ sau này','written approval before adding a shared expense','xác nhận bằng văn bản trước khi thêm chi phí chung','A group message will document consent before any upgrade.','Tin nhắn nhóm sẽ ghi sự đồng ý trước mọi nâng cấp.'),
  ]}),
];
