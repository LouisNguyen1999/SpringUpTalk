import { batchCBrief as b, batchCTopic as t } from './batch-c-expansion-builder';

export const batchCTravelEmergencyTopics = [
  t({id:'reporting-a-lost-phone',title:'Reporting a Lost Phone',titleVi:'Báo mất điện thoại',category:'Emergencies',icon:'📵',level:'A1',description:'Mô tả điện thoại, nơi thấy lần cuối và nhờ bảo vệ hỗ trợ.',grammar:['past-simple','can'],intent:'reporting',relationship:'security-staff',briefs:[
    b('Describing the Phone','Mô tả điện thoại','a black phone in a clear case','điện thoại đen có ốp trong','The missing phone is black with a clear case.','Điện thoại bị mất màu đen, có ốp trong.'),
    b('Giving the Last Location','Nêu nơi thấy lần cuối','the phone last seen at table eight','điện thoại thấy lần cuối ở bàn tám','I last saw it on table eight.','Tôi thấy nó lần cuối trên bàn tám.'),
    b('Asking Security','Nhờ bảo vệ','a lost-phone check at the security desk','việc kiểm tra điện thoại mất tại quầy bảo vệ','Security can check the lost-property box.','Bảo vệ có thể kiểm tra hộp đồ thất lạc.'),
  ]}),
  t({id:'asking-for-emergency-contact-information',title:'Asking for Emergency Contact Information',titleVi:'Hỏi thông tin liên hệ khẩn cấp',category:'Emergencies',icon:'🆘',level:'A1',description:'Hỏi đúng số liên hệ, dịch vụ và đọc lại thông tin.',grammar:['what-number','is-this'],intent:'asking-information',relationship:'stranger',briefs:[
    b('Asking for the Number','Hỏi số điện thoại','the local emergency number 112','số khẩn cấp địa phương 112','The local emergency number is one one two.','Số khẩn cấp địa phương là một một hai.'),
    b('Checking the Service','Kiểm tra dịch vụ','the building emergency desk','bàn hỗ trợ khẩn cấp của tòa nhà','This number reaches the building emergency desk.','Số này gọi đến bàn khẩn cấp của tòa nhà.'),
    b('Repeating the Details','Đọc lại thông tin','the emergency desk open all night','bàn khẩn cấp mở suốt đêm','The desk is available all night.','Bàn hỗ trợ hoạt động suốt đêm.'),
  ]}),
  t({id:'finding-a-pharmacy-at-night',title:'Finding a Pharmacy at Night',titleVi:'Tìm nhà thuốc ban đêm',category:'Travel',icon:'🌙',level:'A2',description:'Tìm nhà thuốc mở muộn, hỏi đường và giờ đóng cửa.',grammar:['is-there','open-until'],intent:'asking-information',relationship:'stranger',briefs:[
    b('Finding an Open Pharmacy','Tìm nhà thuốc đang mở','the night pharmacy on King Street','nhà thuốc đêm trên phố King','One pharmacy on King Street stays open overnight.','Một nhà thuốc trên phố King mở qua đêm.'),
    b('Following the Route','Đi theo chỉ đường','the pharmacy across from the central station','nhà thuốc đối diện ga trung tâm','It is across from the station’s main entrance.','Nhà thuốc đối diện cửa chính nhà ga.'),
    b('Checking the Entrance','Tìm đúng cửa','the side entrance marked Night Service','cửa bên có biển Night Service','After midnight, customers use the side entrance.','Sau nửa đêm, khách dùng cửa bên.'),
  ]}),
  t({id:'asking-where-the-nearest-clinic-is',title:'Asking Where the Nearest Clinic Is',titleVi:'Hỏi phòng khám gần nhất',category:'Travel',icon:'🏥',level:'A2',description:'Hỏi vị trí, phương tiện và giờ tiếp nhận, không tư vấn y tế.',grammar:['superlatives','should'],intent:'asking-information',relationship:'hotel-staff',briefs:[
    b('Locating the Clinic','Xác định phòng khám','the nearest walk-in clinic on Lake Road','phòng khám không hẹn gần nhất ở đường Lake','The nearest walk-in clinic is on Lake Road.','Phòng khám không hẹn gần nhất ở đường Lake.'),
    b('Choosing Transport','Chọn phương tiện','a five-minute taxi ride','chuyến taxi năm phút','A taxi takes about five minutes from the hotel.','Taxi đi từ khách sạn mất khoảng năm phút.'),
    b('Checking Reception Hours','Hỏi giờ tiếp nhận','clinic reception open until ten','quầy tiếp nhận phòng khám mở đến mười giờ','Reception accepts walk-in visitors until ten tonight.','Quầy tiếp nhận khách không hẹn đến mười giờ tối nay.'),
  ]}),
  t({id:'losing-a-hotel-key',title:'Losing a Hotel Key',titleVi:'Làm mất chìa khóa khách sạn',category:'Travel',icon:'🗝️',level:'A2',description:'Báo mất thẻ, xác minh danh tính và nhận thẻ thay thế.',grammar:['past-simple','have-to'],intent:'reporting',relationship:'hotel-staff',briefs:[
    b('Reporting the Lost Key','Báo mất chìa khóa','the missing key card for room 614','thẻ khóa bị mất của phòng 614','The key card disappeared after breakfast.','Thẻ khóa bị mất sau bữa sáng.'),
    b('Verifying the Guest','Xác minh khách','photo identification matching room 614','giấy tờ ảnh khớp phòng 614','The passport name matches the room booking.','Tên trên hộ chiếu khớp đặt phòng.'),
    b('Issuing a Replacement','Cấp thẻ thay thế','a replacement card disabling the old key','thẻ thay thế vô hiệu thẻ cũ','The new card will deactivate the missing one.','Thẻ mới sẽ vô hiệu chiếc bị mất.'),
    b('Explaining the Fee','Giải thích phí','the waived first replacement fee','phí thay lần đầu được miễn','The hotel waives the first replacement charge.','Khách sạn miễn phí thay thẻ lần đầu.'),
  ]}),
  t({id:'rebooking-a-missed-connection',title:'Rebooking a Missed Connection',titleVi:'Đặt lại chuyến nối bị lỡ',category:'Travel',icon:'✈️',level:'B1',description:'Xử lý trễ chuyến bay đến, so lộ trình và xác nhận vé nối mới.',grammar:['past-simple','present-perfect'],intent:'requesting',relationship:'airline-staff',briefs:[
    b('Explaining the Missed Flight','Giải thích lỡ chuyến','flight Q18 missed after an inbound delay','chuyến Q18 bị lỡ sau khi chuyến đến trễ','The inbound flight arrived after Q18 had closed.','Chuyến đến hạ cánh sau khi Q18 đã đóng cửa.'),
    b('Comparing New Routes','So lộ trình mới','a direct evening flight versus a daytime connection','chuyến thẳng buổi tối so với nối ban ngày','The daytime route arrives earlier but changes in Seoul.','Lộ trình ban ngày đến sớm hơn nhưng đổi ở Seoul.'),
    b('Protecting the Onward Booking','Giữ đặt chỗ tiếp theo','the hotel transfer waiting at the destination','xe khách sạn đang chờ tại điểm đến','The transfer can move to the later arrival time.','Xe đưa đón có thể chuyển sang giờ đến muộn hơn.'),
    b('Confirming the New Ticket','Xác nhận vé mới','the daytime connection on one ticket','chuyến nối ban ngày trên một vé','Both new flight segments appear on one confirmed ticket.','Cả hai chặng mới hiển thị trên một vé đã xác nhận.'),
  ]}),
  t({id:'handling-a-train-cancellation',title:'Handling a Train Cancellation',titleVi:'Xử lý chuyến tàu bị hủy',category:'Travel',icon:'🚆',level:'B1',description:'Phân biệt hủy với trễ, tìm tàu thay và kiểm tra vé.',grammar:['passive','future-forms'],intent:'changing-plans',relationship:'service-staff',briefs:[
    b('Confirming the Cancellation','Xác nhận chuyến bị hủy','the 14:20 train fully cancelled','chuyến tàu 14:20 bị hủy hoàn toàn','The board marks the 14:20 service as cancelled.','Bảng ghi chuyến 14:20 là bị hủy.'),
    b('Finding a Replacement Train','Tìm tàu thay','the 15:05 service from platform seven','chuyến 15:05 từ sân ga bảy','The next direct service leaves at 15:05.','Chuyến thẳng tiếp theo khởi hành lúc 15:05.'),
    b('Checking Ticket Validity','Kiểm tra hiệu lực vé','the original ticket accepted on the replacement','vé cũ được chấp nhận trên chuyến thay','The same ticket is valid without an exchange.','Vé cũ có hiệu lực mà không cần đổi.'),
    b('Updating the Arrival Plan','Cập nhật kế hoạch đến','arrival delayed by fifty minutes','giờ đến trễ năm mươi phút','The replacement reaches the destination fifty minutes later.','Chuyến thay đến điểm cuối muộn năm mươi phút.'),
  ]}),
  t({id:'reporting-lost-property-abroad',title:'Reporting Lost Property Abroad',titleVi:'Báo thất lạc đồ ở nước ngoài',category:'Travel',icon:'👜',level:'B1',description:'Mô tả vật, dựng lại lộ trình và lấy mã báo cáo.',grammar:['past-simple','present-perfect'],intent:'reporting',relationship:'service-staff',briefs:[
    b('Describing the Wallet','Mô tả ví','a brown wallet with a blue travel card','ví nâu có thẻ đi lại màu xanh','The wallet contains a blue travel card and no cash.','Ví có thẻ đi lại màu xanh và không có tiền mặt.'),
    b('Reconstructing the Journey','Dựng lại hành trình','the wallet last used at Central Station','ví được dùng lần cuối ở ga Central','It was last used at the station ticket machine.','Ví được dùng lần cuối tại máy bán vé ga.'),
    b('Filing the Lost-property Report','Lập báo cáo thất lạc','lost-property report LP304','báo cáo thất lạc LP304','The desk has created report LP304.','Quầy đã tạo báo cáo LP304.'),
    b('Arranging an Update','Sắp xếp cập nhật','an email if a matching wallet appears','email nếu tìm thấy ví phù hợp','The service will email if a matching item arrives.','Dịch vụ sẽ gửi email nếu có đồ phù hợp.'),
  ]}),
  t({id:'asking-an-embassy-for-information',title:'Asking an Embassy for Information',titleVi:'Hỏi thông tin tại đại sứ quán',category:'Travel',icon:'🏢',level:'B1',description:'Nêu vấn đề và hỏi quy trình, giấy tờ, lịch hẹn chính thức.',grammar:['indirect-questions','need-to'],intent:'asking-information',relationship:'service-staff',briefs:[
    b('Explaining the Passport Problem','Nêu vấn đề hộ chiếu','a damaged passport during the trip','hộ chiếu bị hỏng trong chuyến đi','Water damage has made one passport page unreadable.','Nước làm một trang hộ chiếu không đọc được.'),
    b('Asking About the Process','Hỏi quy trình','the emergency travel-document application process','quy trình xin giấy thông hành khẩn cấp','Applications begin with an online information form.','Hồ sơ bắt đầu bằng mẫu thông tin trực tuyến.'),
    b('Checking Required Documents','Kiểm tra giấy tờ','a police note and two passport photographs','biên bản cảnh sát và hai ảnh hộ chiếu','The appointment requires the damaged passport and two photos.','Buổi hẹn cần hộ chiếu hỏng và hai ảnh.'),
    b('Booking an Appointment','Đặt lịch hẹn','the embassy appointment at ten tomorrow','lịch đại sứ quán lúc mười giờ mai','The earliest available appointment is ten tomorrow.','Lịch sớm nhất còn trống là mười giờ ngày mai.'),
  ]}),
  t({id:'reporting-a-minor-accident',title:'Reporting a Minor Accident',titleVi:'Báo một tai nạn nhẹ',category:'Emergencies',icon:'⚠️',level:'B1',description:'Giữ bình tĩnh, mô tả sự việc và ghi thông tin liên hệ.',grammar:['past-simple','passive'],intent:'reporting',relationship:'security-staff',briefs:[
    b('Checking Immediate Safety','Kiểm tra an toàn trước mắt','both people safely away from traffic','cả hai người an toàn ngoài luồng xe','Both people have moved onto the pavement.','Cả hai người đã di chuyển lên vỉa hè.'),
    b('Describing What Happened','Mô tả sự việc','a bicycle touching a parked car door','xe đạp va vào cửa ô tô đang đỗ','The bicycle touched the open door at low speed.','Xe đạp chạm cửa đang mở ở tốc độ thấp.'),
    b('Identifying a Witness','Xác định nhân chứng','a shop worker who saw the accident','nhân viên cửa hàng thấy tai nạn','A shop worker witnessed the full incident.','Một nhân viên cửa hàng đã chứng kiến toàn bộ sự việc.'),
    b('Recording Contact Details','Ghi thông tin liên hệ','names and phone numbers exchanged calmly','tên và số điện thoại được trao đổi bình tĩnh','Both people have exchanged names and phone numbers.','Cả hai đã trao đổi tên và số điện thoại.'),
  ]}),
  t({id:'asking-someone-to-contact-family',title:'Asking Someone to Contact Family',titleVi:'Nhờ ai đó liên hệ gia đình',category:'Emergencies',icon:'☎️',level:'B1',description:'Nhờ liên hệ đúng người, gửi đúng thông điệp và xác nhận đã gọi.',grammar:['could','reported-speech'],intent:'requesting',relationship:'stranger',briefs:[
    b('Making the Request','Đưa ra yêu cầu','a call to the traveler’s sister','cuộc gọi cho chị gái của du khách','The traveler needs someone to call her sister.','Du khách cần ai đó gọi cho chị gái.'),
    b('Providing the Number','Cung cấp số','the sister’s number ending 441','số của chị gái kết thúc bằng 441','The correct number ends in four four one.','Số đúng kết thúc bằng bốn bốn một.'),
    b('Giving the Message','Nêu nội dung nhắn','a message saying the traveler is safe','tin nhắn nói du khách an toàn','The family should know she is safe and delayed.','Gia đình cần biết cô ấy an toàn và bị chậm.'),
    b('Confirming Contact','Xác nhận đã liên hệ','the sister reached on the second attempt','chị gái được liên lạc ở lần gọi hai','The second call connected successfully.','Cuộc gọi thứ hai đã kết nối thành công.'),
  ]}),
  t({id:'renting-a-car-abroad',title:'Renting a Car Abroad',titleVi:'Thuê xe ở nước ngoài',category:'Travel',icon:'🚙',level:'B1',description:'So xe, hỏi điều khoản, kiểm tra hiện trạng và chốt trả xe.',grammar:['comparatives','passive'],intent:'comparing',relationship:'service-staff',briefs:[
    b('Choosing the Vehicle','Chọn xe','a compact car with space for two cases','xe nhỏ có chỗ cho hai va-li','The compact model fits two large cases.','Mẫu xe nhỏ chứa vừa hai va-li lớn.'),
    b('Checking Included Mileage','Hỏi số ki-lô-mét bao gồm','two hundred kilometres included each day','hai trăm ki-lô-mét bao gồm mỗi ngày','The daily rate includes two hundred kilometres.','Giá ngày bao gồm hai trăm ki-lô-mét.'),
    b('Recording Existing Marks','Ghi vết xước có sẵn','a scratch photographed on the rear door','vết xước được chụp ở cửa sau','The rear-door scratch appears on the pickup report.','Vết xước cửa sau có trong biên bản nhận xe.'),
    b('Confirming the Return Terms','Chốt điều kiện trả','the car returned full by nine','xe được trả đầy xăng trước chín giờ','The agreement requires a full tank by nine.','Hợp đồng yêu cầu đầy bình trước chín giờ.'),
  ]}),
  t({id:'handling-hotel-overbooking',title:'Handling Hotel Overbooking',titleVi:'Xử lý khách sạn nhận quá số phòng',category:'Travel',icon:'🏨',level:'B2',description:'Dùng xác nhận đặt phòng để thương lượng phương án tương đương.',grammar:['concession','conditionals'],intent:'negotiating',relationship:'hotel-staff',briefs:[
    b('Establishing the Confirmed Booking','Xác lập đặt phòng đã xác nhận','a paid double room for three nights','phòng đôi đã trả tiền cho ba đêm','The confirmation shows a paid double room for three nights.','Xác nhận ghi phòng đôi đã trả tiền trong ba đêm.'),
    b('Evaluating the First Remedy','Đánh giá cách xử lý đầu','a single room offered without price adjustment','phòng đơn được đề nghị nhưng không giảm giá','The offered single room is smaller than the booking.','Phòng đơn được đề nghị nhỏ hơn phòng đã đặt.'),
    b('Requesting a Comparable Alternative','Yêu cầu phương án tương đương','a nearby double room with transport covered','phòng đôi gần đó kèm chi phí di chuyển','A partner hotel has a comparable double room.','Khách sạn đối tác có phòng đôi tương đương.'),
    b('Negotiating the Transfer Cost','Thương lượng chi phí chuyển','the original hotel covering taxi and rate difference','khách sạn cũ trả taxi và chênh lệch giá','The manager agrees to cover both additional costs.','Quản lý đồng ý chi trả cả hai khoản thêm.'),
    b('Documenting the Remedy','Ghi phương án xử lý','written confirmation for all three replacement nights','xác nhận bằng văn bản cho cả ba đêm thay thế','The new confirmation lists room, transport, and unchanged price.','Xác nhận mới ghi phòng, phương tiện và giá không đổi.'),
  ]}),
  t({id:'asking-about-flight-compensation-process',title:'Asking About the Flight Compensation Process',titleVi:'Hỏi quy trình bồi hoàn chuyến bay',category:'Travel',icon:'🧾',level:'B2',description:'Hỏi quy trình thông tin, phân biệt yêu cầu và giữ mã hồ sơ.',grammar:['indirect-questions','passive'],intent:'asking-information',relationship:'airline-staff',briefs:[
    b('Identifying the Disrupted Flight','Xác định chuyến bị ảnh hưởng','flight VN214 cancelled on August third','chuyến VN214 bị hủy ngày 3 tháng Tám','The booking record shows VN214 was cancelled.','Hồ sơ đặt chỗ cho thấy VN214 đã bị hủy.'),
    b('Separating Refund and Claim','Phân biệt hoàn vé và yêu cầu','the ticket refund separate from an expense claim','hoàn vé tách biệt với yêu cầu chi phí','The airline uses different forms for refunds and expenses.','Hãng dùng mẫu khác nhau cho hoàn vé và chi phí.'),
    b('Listing Supporting Evidence','Liệt kê bằng chứng','receipts and the cancellation notice','hóa đơn và thông báo hủy','The process asks for receipts and the cancellation notice.','Quy trình yêu cầu hóa đơn và thông báo hủy.'),
    b('Checking the Review Timeline','Hỏi thời gian xem xét','a review taking up to thirty days','thời gian xem xét tối đa ba mươi ngày','Complete claims are reviewed within thirty days.','Yêu cầu đầy đủ được xem trong vòng ba mươi ngày.'),
    b('Keeping the Reference','Giữ mã tham chiếu','claim reference FC908','mã yêu cầu FC908','Reference FC908 will track every process update.','Mã FC908 sẽ theo dõi mọi cập nhật quy trình.'),
  ]}),
  t({id:'handling-rental-vehicle-damage',title:'Handling Rental Vehicle Damage',titleVi:'Xử lý hư hại xe thuê',category:'Travel',icon:'🔧',level:'B2',description:'Báo hư hại, tách vết cũ và làm theo quy trình hợp đồng.',grammar:['past-simple','passive','conditionals'],intent:'reporting',relationship:'service-staff',briefs:[
    b('Reporting the New Damage','Báo hư hại mới','a cracked side mirror after parking','gương bên bị nứt sau khi đỗ xe','The side mirror was intact before the parking stop.','Gương bên còn nguyên trước khi dừng đỗ.'),
    b('Separating Existing Marks','Tách vết có sẵn','the old rear-door scratch already recorded','vết xước cửa sau cũ đã được ghi','The pickup report already lists the rear-door scratch.','Biên bản nhận xe đã ghi vết xước cửa sau.'),
    b('Following the Contract Process','Làm theo quy trình hợp đồng','the rental incident form submitted today','mẫu sự cố xe thuê nộp hôm nay','The contract requires the incident form before repair.','Hợp đồng yêu cầu mẫu sự cố trước khi sửa.'),
    b('Confirming the Next Action','Xác nhận bước tiếp theo','the vehicle inspected at the airport branch','xe được kiểm tra tại chi nhánh sân bay','The airport branch will inspect the mirror at return.','Chi nhánh sân bay sẽ kiểm tra gương khi trả xe.'),
  ]}),
  t({id:'changing-itinerary-due-to-weather',title:'Changing an Itinerary Due to Weather',titleVi:'Đổi hành trình vì thời tiết',category:'Travel',icon:'🌧️',level:'B2',description:'Đánh giá gián đoạn, so tuyến và thông báo thay đổi kịp thời.',grammar:['concession','future-conditionals'],intent:'changing-plans',relationship:'close-friend',briefs:[
    b('Assessing the Disruption','Đánh giá gián đoạn','the mountain road closed by heavy snow','đường núi bị đóng vì tuyết lớn','The mountain road will remain closed through tomorrow.','Đường núi sẽ tiếp tục đóng đến hết ngày mai.'),
    b('Protecting the Main Commitment','Giữ cam kết chính','the international flight leaving Friday','chuyến bay quốc tế khởi hành thứ Sáu','Reaching the airport by Thursday night remains essential.','Đến sân bay trước tối thứ Năm vẫn là điều thiết yếu.'),
    b('Comparing Alternative Routes','So tuyến thay thế','a coastal train versus an evening flight','tàu ven biển so với chuyến bay tối','The train is slower but less exposed to weather.','Tàu chậm hơn nhưng ít bị ảnh hưởng thời tiết.'),
    b('Notifying Booked Services','Thông báo dịch vụ đã đặt','hotel and transfer changes sent before noon','thay đổi khách sạn và xe đưa đón gửi trước trưa','Both providers allow changes until noon today.','Cả hai nhà cung cấp cho đổi đến trưa hôm nay.'),
  ]}),
  t({id:'reporting-a-stolen-item-abroad',title:'Reporting a Stolen Item Abroad',titleVi:'Báo đồ bị trộm ở nước ngoài',category:'Emergencies',icon:'🚨',level:'B2',description:'Trình bày sự thật, mã nhận diện và nhận mã báo cáo chính thức.',grammar:['past-simple','passive','reported-speech'],intent:'reporting',relationship:'security-staff',briefs:[
    b('Stating Only Known Facts','Chỉ nêu sự thật đã biết','a camera missing after the crowded market','máy ảnh mất sau khi qua khu chợ đông','The camera was present before entering the crowded market.','Máy ảnh vẫn còn trước khi vào khu chợ đông.'),
    b('Providing Identifiers','Cung cấp mã nhận diện','camera serial number CX44019','số sê-ri máy ảnh CX44019','The purchase receipt lists serial CX44019.','Hóa đơn mua hàng ghi số CX44019.'),
    b('Giving the Time and Place','Nêu thời gian và địa điểm','the loss noticed near the north market exit','việc mất đồ được phát hiện gần cửa bắc chợ','The owner noticed the loss at five near the north exit.','Chủ đồ phát hiện mất lúc năm giờ gần cửa bắc.'),
    b('Obtaining the Official Record','Nhận hồ sơ chính thức','the official report reference SR771','mã báo cáo chính thức SR771','Report SR771 contains the item, time, and location.','Báo cáo SR771 có đồ vật, thời gian và địa điểm.'),
  ]}),
];
