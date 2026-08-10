import { depthConversation as c } from './depth-builder';
import type { ConversationAdditions } from '../content-expander';

export const homeServicesTravelTechDepth: ConversationAdditions = {
  'renting-a-room': [
    c('Viewing the Room','Đi xem phòng','Người thuê đến xem phòng và cần kiểm tra điều kiện thực tế.','Hỏi rõ tiện nghi, chi phí và thời điểm chuyển vào.',[
      ['Phòng này có đúng là phòng trong ảnh không?','Is this the same room shown in the photos?','Đúng, nhưng chiếc bàn vừa được chuyển sang sát cửa sổ.','Yes, although the desk has just been moved beside the window.',['shown in the photos','được thể hiện trong ảnh']],
      ['Tiền thuê đã bao gồm Internet chưa?','Is internet included in the rent?','Có, còn điện và nước được tính theo đồng hồ riêng.','Yes. Electricity and water are charged by separate meters.',['utility meter','đồng hồ điện nước']],
      ['Nhà bếp có dùng chung với các phòng khác không?','Is the kitchen shared with the other rooms?','Có, ba người dùng chung và mỗi người có một ngăn tủ.','Yes. Three tenants share it, and each has a cupboard.',['tenant','người thuê nhà']],
      ['Nếu đặt cọc hôm nay, tôi có thể chuyển vào thứ Hai không?','If I pay the deposit today, can I move in on Monday?','Được, sau khi chúng ta ký biên bản bàn giao.','Yes, once we sign the move-in condition report.',['condition report','biên bản hiện trạng']],
    ]),
  ],
  'talking-to-the-landlord': [
    c('Requesting a Small Change','Xin thay đổi nhỏ trong phòng','Người thuê muốn lắp thêm kệ nhưng hợp đồng yêu cầu xin phép.','Trình bày thay đổi và cam kết hoàn trả hiện trạng.',[
      ['Tôi muốn lắp hai chiếc kệ nhỏ trên bàn làm việc.','I\'d like to install two small shelves above the desk.','Việc đó có cần khoan vào tường không?','Would that require drilling into the wall?',['drill into','khoan vào']],
      ['Có bốn lỗ nhỏ, và tôi sẽ dùng thợ chuyên nghiệp.','Yes, four small holes, and I\'ll use a professional installer.','Tường đó có đường điện nên vị trí phải được kiểm tra trước.','That wall contains electrical wiring, so the position must be checked first.',['electrical wiring','hệ thống dây điện']],
      ['Tôi có thể gửi bản vẽ vị trí để ông duyệt.','I can send a placement sketch for your approval.','Được, và hãy giữ lại hóa đơn của người lắp.','All right, and please keep the installer\'s receipt.',['for approval','để được phê duyệt']],
      ['Khi chuyển đi, tôi sẽ tháo kệ và sửa lại các lỗ.','When I move out, I\'ll remove the shelves and repair the holes.','Với điều kiện đó, tôi đồng ý bằng văn bản.','On that condition, I\'ll give you written permission.',['written permission','sự cho phép bằng văn bản']],
    ]),
  ],
  'broken-air-conditioner': [
    c('A Repair That Did Not Last','Sửa xong lại hỏng','Điều hòa lại ngừng làm mát hai ngày sau khi sửa.','Mô tả tái phát và yêu cầu bảo hành dịch vụ.',[
      ['Điều hòa lại thổi khí nóng từ tối qua.','The air conditioner has been blowing warm air again since last night.','Đèn báo có nhấp nháy giống lần trước không?','Is the indicator flashing as it did before?',['indicator light','đèn báo']],
      ['Không, nhưng dàn nóng tắt sau khoảng năm phút.','No, but the outdoor unit shuts down after about five minutes.','Bạn đã thử đặt lại aptomat chưa?','Have you tried resetting the circuit breaker?',['circuit breaker','aptomat, cầu dao tự động']],
      ['Rồi, lỗi vẫn quay lại và phòng không hạ nhiệt.','Yes. The problem returns, and the room does not cool down.','Vì lần sửa trước còn bảo hành, kỹ thuật viên sẽ kiểm tra miễn phí.','Since the previous repair is under warranty, a technician will inspect it at no charge.',['under warranty','còn trong thời hạn bảo hành']],
      ['Tôi cần lịch sau sáu giờ vì ban ngày không có ai ở nhà.','I need an appointment after six because no one is home during the day.','Chúng tôi còn khung giờ sáu rưỡi tối mai.','We still have a six-thirty slot tomorrow evening.',['appointment slot','khung giờ hẹn']],
    ]),
    c('Choosing a Temporary Solution','Chọn giải pháp tạm thời','Chủ nhà chưa thể thay máy ngay trong đợt nóng.','Đánh giá phương án tạm và chia sẻ chi phí hợp lý.',[
      ['Kỹ thuật viên nói máy nén phải được thay mới.','The technician says the compressor needs to be replaced.','Linh kiện phải mất năm ngày mới về.','The part will take five days to arrive.',['compressor','máy nén']],
      ['Nhiệt độ trong phòng ban đêm gần ba mươi hai độ.','The room is nearly thirty-two degrees at night.','Tôi có thể cung cấp một máy điều hòa di động tạm thời.','I can provide a portable air conditioner in the meantime.',['in the meantime','trong thời gian chờ']],
      ['Máy đó có đủ cho phòng ngủ không?','Will it be enough for the bedroom?','Nó không mạnh bằng máy chính nhưng sẽ giảm nhiệt đáng kể.','It is not as powerful as the main unit, but it should lower the temperature considerably.',['considerably','đáng kể']],
      ['Nếu tiền điện tăng nhiều thì chúng ta xử lý thế nào?','What happens if it adds significantly to the electricity bill?','Tôi sẽ trừ một khoản cố định vào tiền thuê tháng này.','I\'ll deduct a fixed amount from this month\'s rent.',['deduct','khấu trừ']],
    ]),
  ],
  'noisy-neighbor': [
    c('Contacting Building Management','Liên hệ ban quản lý','Tiếng ồn tiếp diễn sau nhiều lần góp ý trực tiếp.','Báo cáo bằng dữ kiện và đề nghị quy trình chính thức.',[
      ['Tôi muốn báo tiếng nhạc lớn từ căn hộ phía trên.','I\'d like to report persistent loud music from the apartment above.','Việc này xảy ra thường xuyên đến mức nào?','How frequently has this been happening?',['persistent','kéo dài, liên tục tái diễn']],
      ['Bốn đêm tuần này, thường từ nửa đêm đến gần hai giờ.','Four nights this week, usually from midnight until nearly two.','Bạn đã thử trao đổi trực tiếp với người ở đó chưa?','Have you tried discussing it directly with the resident?',['resident','cư dân']],
      ['Rồi, họ giảm âm lượng một lúc rồi lại bật lớn.','Yes. They turn it down briefly and then raise it again.','Bạn vui lòng gửi nhật ký ngày giờ để chúng tôi ghi nhận chính thức.','Please send a dated log so we can create a formal record.',['dated log','nhật ký có ngày giờ']],
      ['Tôi muốn tránh đối đầu nhưng cũng cần ngủ để đi làm.','I want to avoid confrontation, but I also need to sleep for work.','Chúng tôi sẽ gửi cảnh báo mà không nêu tên người khiếu nại.','We will issue a warning without identifying the complainant.',['complainant','người khiếu nại']],
    ]),
  ],
  'at-the-bank': [
    c('Replacing a Bank Card','Đổi thẻ ngân hàng','Khách làm mất thẻ và cần khóa thẻ trước khi cấp lại.','Xác minh giao dịch, khóa thẻ và hỏi thời gian nhận thẻ mới.',[
      ['Tôi làm mất thẻ ghi nợ sáng nay.','I lost my debit card this morning.','Bạn đã khóa thẻ tạm thời trong ứng dụng chưa?','Have you temporarily locked it in the app?',['debit card','thẻ ghi nợ']],
      ['Rồi, và tôi không thấy giao dịch nào lạ.','Yes, and I don\'t see any unfamiliar transactions.','Tôi sẽ xác minh ba giao dịch gần nhất với bạn.','I\'ll verify the three most recent transactions with you.',['unfamiliar transaction','giao dịch lạ']],
      ['Sau đó thẻ cũ sẽ bị hủy vĩnh viễn phải không?','Will the old card be permanently cancelled after that?','Đúng, nó sẽ không thể dùng lại kể cả khi bạn tìm thấy.','Yes. It cannot be reactivated even if you find it.',['reactivate','kích hoạt lại']],
      ['Thẻ mới mất bao lâu để gửi đến nhà?','How long will the replacement take to reach my home?','Khoảng năm ngày làm việc, hoặc bạn có thể nhận tại chi nhánh.','About five business days, or you can collect it at a branch.',['replacement card','thẻ cấp lại']],
    ]),
    c('Questioning a Transfer Fee','Hỏi về phí chuyển tiền','Khách bị tính phí cho giao dịch mà mình nghĩ là miễn phí.','Xác định loại giao dịch và yêu cầu giải thích minh bạch.',[
      ['Tại sao giao dịch này bị tính phí bốn mươi nghìn?','Why was I charged a forty-thousand-dong fee for this transfer?','Để tôi kiểm tra loại tiền và ngân hàng nhận.','Let me check the currency and receiving bank.',['receiving bank','ngân hàng nhận']],
      ['Đó là chuyển khoản bằng đồng Việt Nam đến tài khoản trong nước.','It was a dong transfer to a domestic account.','Nhưng lệnh được gửi qua mạng chuyển tiền nhanh quốc tế.','However, it was routed through the international express network.',['be routed through','được chuyển qua một hệ thống']],
      ['Ứng dụng không nói rõ điều đó trước khi tôi xác nhận.','The app did not make that clear before I confirmed.','Màn hình xác nhận có hiển thị phí, nhưng nhãn dịch vụ có thể gây nhầm.','The confirmation screen showed the fee, though the service label may be confusing.',['service label','nhãn tên dịch vụ']],
      ['Tôi muốn yêu cầu xem xét hoàn phí lần đầu.','I\'d like to request a one-time fee review.','Tôi sẽ nộp yêu cầu và gửi phản hồi trong hai ngày làm việc.','I\'ll submit the request and respond within two business days.',['fee review','việc xem xét lại khoản phí']],
    ]),
  ],
  'at-the-pharmacy': [
    c('Checking Medicine Interactions','Kiểm tra tương tác thuốc','Khách đang dùng thuốc kê đơn và muốn mua thuốc cảm.','Cung cấp thông tin, tránh tương tác và biết lúc cần bác sĩ.',[
      ['Tôi muốn mua thuốc trị nghẹt mũi, nhưng đang dùng thuốc huyết áp.','I need something for congestion, but I take blood pressure medicine.','Bạn có tên hoặc ảnh của thuốc đang dùng không?','Do you have the name or a photo of your current medication?',['congestion','tình trạng nghẹt mũi']],
      ['Có, tôi uống viên này mỗi sáng.','Yes. I take this tablet every morning.','Một số thuốc thông mũi có thể làm tăng huyết áp.','Some decongestants can raise blood pressure.',['decongestant','thuốc thông mũi']],
      ['Vậy có lựa chọn nào an toàn hơn không?','Is there a safer option, then?','Bạn có thể dùng nước muối xịt mũi và theo dõi triệu chứng.','You can use a saline nasal spray and monitor your symptoms.',['saline spray','nước muối xịt mũi']],
      ['Khi nào tôi nên đi khám bác sĩ?','When should I see a doctor?','Nếu khó thở, sốt cao hoặc triệu chứng kéo dài hơn một tuần.','If you have trouble breathing, a high fever, or symptoms lasting over a week.',['lasting over','kéo dài hơn']],
    ]),
  ],
  'receiving-a-delivery': [
    c('Inspecting a Damaged Box','Kiểm tra thùng hàng móp','Shipper giao một hộp có dấu hiệu bị va đập.','Ghi nhận tình trạng trước khi nhận và chọn từ chối hợp lý.',[
      ['Góc thùng này bị móp và băng keo đã rách.','This corner is crushed, and the tape has torn.','Tôi sẽ chụp tình trạng kiện hàng trước khi bàn giao.','I\'ll photograph the parcel\'s condition before handing it over.',['crushed corner','góc bị móp nặng']],
      ['Tôi có thể mở ra kiểm tra cùng anh không?','Can I open it and inspect the contents with you?','Đơn này cho phép đồng kiểm, nên bạn có thể mở trước khi ký.','This order allows inspection, so you may open it before signing.',['inspect the contents','kiểm tra đồ bên trong']],
      ['Vỏ máy bên trong bị nứt rồi.','The device casing inside is already cracked.','Trong trường hợp đó bạn nên từ chối nhận hàng.','In that case, you should refuse the delivery.',['refuse delivery','từ chối nhận hàng']],
      ['Anh ghi rõ lý do là hư hỏng khi vận chuyển nhé.','Please record the reason as damage in transit.','Được, tôi sẽ cập nhật biên bản và gửi lại người bán.','Certainly. I\'ll update the report and return it to the seller.',['in transit','trong quá trình vận chuyển']],
    ]),
  ],
  'getting-a-haircut': [
    c('Correcting the Length','Điều chỉnh độ dài tóc','Khách nhận ra một bên tóc ngắn hơn mong muốn trong lúc cắt.','Phản hồi sớm, cụ thể và thống nhất cách cân chỉnh.',[
      ['Xin dừng một chút, bên này có vẻ ngắn hơn ảnh mẫu.','Could we pause for a moment? This side looks shorter than the reference photo.','Bạn nói phần quanh tai hay toàn bộ lớp bên ngoài?','Do you mean the area around the ear or the whole outer layer?',['reference photo','ảnh mẫu tham khảo']],
      ['Chủ yếu là phần quanh tai; tôi muốn nó che khoảng nửa tai.','Mainly around the ear. I wanted it to cover about half the ear.','Tôi hiểu, tôi đã tỉa góc quá cao.','I see. I have trimmed the angle too high.',['trim','tỉa tóc']],
      ['Có thể cân bên kia mà không làm cả kiểu quá ngắn không?','Can you balance the other side without making the whole style too short?','Có, tôi sẽ nối mềm các lớp thay vì cắt theo điểm ngắn nhất.','Yes. I\'ll blend the layers rather than cutting everything to the shortest point.',['blend the layers','nối mềm các lớp tóc']],
      ['Hãy cho tôi xem lại sau mỗi bước nhé.','Please show me after each step.','Tất nhiên, chúng ta sẽ kiểm tra trước khi tôi cắt thêm.','Of course. We\'ll check before I remove any more length.',['remove length','cắt ngắn bớt']],
    ]),
  ],
  'hotel-check-in': [
    c('A Room Is Not Ready','Phòng chưa sẵn sàng','Khách đến đúng giờ nhận phòng nhưng phòng vẫn đang dọn.','Hỏi thời gian chờ và yêu cầu hỗ trợ phù hợp.',[
      ['Tôi đến nhận phòng lúc hai giờ như xác nhận.','I arrived for the two o\'clock check-in shown in my confirmation.','Tôi xin lỗi, phòng của bạn vẫn đang được dọn.','I\'m sorry. Your room is still being cleaned.',['still being cleaned','vẫn đang được dọn']],
      ['Khoảng bao lâu nữa phòng mới sẵn sàng?','Roughly how much longer will it take?','Bộ phận buồng phòng dự kiến thêm ba mươi phút.','Housekeeping estimates another thirty minutes.',['housekeeping','bộ phận buồng phòng']],
      ['Tôi có cuộc gọi công việc sau mười lăm phút.','I have a work call in fifteen minutes.','Bạn có thể dùng phòng làm việc riêng cạnh sảnh.','You are welcome to use the private business room beside the lobby.',['business room','phòng làm việc cho khách']],
      ['Khách sạn giữ hành lý và báo tôi khi phòng sẵn sàng nhé.','Please store my bags and tell me when the room is ready.','Chắc chắn rồi, chúng tôi cũng sẽ mời bạn một đồ uống trong lúc chờ.','Certainly. We\'ll also offer you a drink while you wait.',['store luggage','giữ hành lý']],
    ]),
  ],
  'airport-check-in': [
    c('An Overweight Suitcase','Vali quá cân','Vali ký gửi vượt giới hạn và khách cần sắp xếp lại.','Hiểu mức phí và chọn chuyển đồ sang hành lý xách tay.',[
      ['Vali của bạn nặng hai mươi sáu ký, vượt ba ký.','Your suitcase weighs twenty-six kilos, which is three kilos over the limit.','Phí hành lý quá cân là bao nhiêu?','How much is the excess baggage fee?',['over the limit','vượt quá giới hạn']],
      ['Phí là bốn trăm nghìn cho mỗi ký tại sân bay.','It is four hundred thousand dong per kilo at the airport.','Tôi có thể chuyển đồ sang vali xách tay không?','May I move some items into my cabin bag?',['excess baggage','hành lý quá cân']],
      ['Bạn có thể sắp xếp lại, với điều kiện tổng hành lý xách tay dưới bảy ký.','You may repack, provided your total cabin baggage stays under seven kilos.','Tôi sẽ chuyển sách và áo khoác sang túi nhỏ trước.','I\'ll move the books and jacket into the smaller bag first.',['cabin bag','hành lý xách tay']],
      ['Sau khi sắp xếp, tôi đặt vali lên cân lại ở đây chứ?','Should I put the suitcase back on this scale afterward?','Đúng, rồi chúng tôi sẽ in thẻ hành lý.','Yes. Then we can print the baggage tag.',['baggage tag','thẻ hành lý']],
    ]),
  ],
  'planning-a-da-lat-trip': [
    c('Planning for Changing Weather','Chuẩn bị thời tiết thay đổi','Nhóm đi Đà Lạt thấy dự báo mưa cho hai ngày tham quan.','Tạo lịch trình linh hoạt và chuẩn bị trang phục.',[
      ['Bản tin mới dự báo mưa to bắt đầu từ trưa thứ Bảy.','The latest forecast predicts heavy rain from Saturday noon onward.','Vậy mình chuyển chuyến đi thác sang sáng sớm nhé.','Then let\'s move the waterfall visit to early morning.',['forecast','dự báo thời tiết']],
      ['Buổi chiều mình có thể đi bảo tàng hoặc quán cà phê trong nhà.','In the afternoon, we could visit a museum or an indoor café.','Mình sẽ lưu cả hai địa điểm để quyết định theo tình hình.','I\'ll save both places so we can decide based on the conditions.',['based on the conditions','dựa trên tình hình']],
      ['Ban đêm còn xuống khoảng mười bốn độ.','It also drops to around fourteen degrees at night.','Mọi người nên mang áo khoác nhẹ chống nước.','Everyone should bring a light waterproof jacket.',['waterproof','chống nước']],
      ['Nếu mưa cả ngày, vé tour nông trại có đổi được không?','If it rains all day, can the farm tour be rescheduled?','Có, họ cho đổi trước hai tiếng nếu thời tiết xấu.','Yes. They allow changes two hours ahead in bad weather.',['reschedule','đổi lịch']],
    ]),
  ],
  'flight-disruption': [
    c('A Missed Connection','Lỡ chuyến bay nối','Chuyến đầu bị trễ khiến khách không kịp chuyến nối cùng hãng.','Yêu cầu đặt lại, chỗ nghỉ và bảo vệ hành lý.',[
      ['Chuyến bay đến trễ nên tôi đã lỡ chuyến nối đi Seoul.','My arriving flight was delayed, so I missed my connection to Seoul.','Cả hai chặng có cùng một mã đặt chỗ không?','Were both flights issued under the same booking reference?',['booking reference','mã đặt chỗ']],
      ['Có, và hành lý của tôi đã được gửi thẳng đến điểm cuối.','Yes, and my bag was checked through to the final destination.','Hãng sẽ đặt bạn vào chuyến sớm nhất còn chỗ.','We will rebook you on the earliest flight with available seats.',['check a bag through','gửi hành lý thẳng đến điểm cuối']],
      ['Chuyến đó là sáng mai, vậy tối nay tôi ở đâu?','That flight is tomorrow morning, so where am I supposed to stay tonight?','Vì gián đoạn thuộc trách nhiệm hãng, chúng tôi sẽ cấp khách sạn và xe đưa đón.','Since the disruption was within our control, we will provide a hotel and transfers.',['within our control','thuộc phạm vi kiểm soát']],
      ['Xin xác nhận hành lý sẽ không bị đưa lên chuyến khác.','Please confirm that my bag will not be loaded onto another flight.','Tôi sẽ gắn lại thẻ hành lý theo hành trình mới và đưa biên nhận cho bạn.','I\'ll retag it for the new itinerary and give you the receipt.',['itinerary','hành trình']],
      ['Tôi cũng cần giấy xác nhận trễ chuyến cho bảo hiểm.','I also need written confirmation of the delay for my insurer.','Tôi sẽ gửi giấy xác nhận vào email cùng phiếu khách sạn.','I\'ll email the confirmation together with the hotel voucher.',['written confirmation','giấy xác nhận']],
    ]),
    c('Negotiating an Alternative Airport','Thương lượng sân bay thay thế','Hãng chỉ còn chuyến đến sân bay xa điểm đến ban đầu.','Đánh giá toàn bộ hành trình và chi phí phát sinh.',[
      ['Lựa chọn duy nhất hôm nay hạ cánh ở sân bay cách thành phố chín mươi cây số.','The only option today lands at an airport ninety kilometres from the city.','Hãng có chi trả việc di chuyển từ sân bay đó không?','Will the airline cover transport from that airport?',['alternative airport','sân bay thay thế']],
      ['Chúng tôi cấp vé tàu đến ga trung tâm.','We can provide a train ticket to the central station.','Chuyến tàu cuối có còn chạy sau khi máy bay hạ cánh không?','Will the last train still be running when the flight lands?',['central station','ga trung tâm']],
      ['Theo lịch, bạn có bốn mươi lăm phút để lấy hành lý và lên tàu.','The schedule gives you forty-five minutes to collect your bag and board.','Khoảng đó quá sát nếu chuyến bay trễ thêm.','That connection is too tight if the flight is delayed again.',['tight connection','thời gian nối chuyến quá sát']],
      ['Nếu lỡ tàu, hãng sẽ cung cấp taxi chứ?','If I miss the train, will the airline provide a taxi?','Tôi có thể ghi cam kết đó vào phiếu đổi chuyến.','I can add that commitment to your rebooking document.',['commitment','cam kết']],
    ]),
  ],
  'wifi-problem': [
    c('Only One Device Is Offline','Chỉ một thiết bị mất mạng','Điện thoại kết nối bình thường nhưng laptop không vào mạng.','Khoanh vùng lỗi thiết bị và làm mới cấu hình mạng.',[
      ['Wi-Fi có hoạt động trên điện thoại của bạn không?','Is the Wi-Fi working on your phone?','Có, chỉ laptop báo đã kết nối nhưng không có Internet.','Yes. Only the laptop says it is connected without internet access.',['internet access','khả năng truy cập Internet']],
      ['Bạn đã thử quên mạng rồi kết nối lại chưa?','Have you tried forgetting the network and reconnecting?','Chưa, mình chỉ khởi động lại máy.','Not yet. I only restarted the computer.',['forget a network','xóa cấu hình mạng đã lưu']],
      ['Hãy quên mạng, rồi nhập lại mật khẩu.','Forget it, then enter the password again.','Mình đã làm nhưng trình duyệt vẫn không mở trang nào.','I\'ve done that, but the browser still won\'t load any pages.',['load a page','tải/mở một trang']],
      ['Vậy thử tắt VPN; có thể cấu hình cũ đang chặn kết nối.','Then disable the VPN. An old configuration may be blocking the connection.','Đúng rồi, tắt VPN xong thì mạng hoạt động lại.','That was it. The connection works again with the VPN off.',['configuration','cấu hình']],
    ]),
  ],
  'laptop-problem': [
    c('Recovering an Unsaved File','Khôi phục tệp chưa lưu','Ứng dụng bị treo trước khi người dùng lưu tài liệu.','Tìm bản tự động lưu mà không ghi đè dữ liệu.',[
      ['Máy bị treo và tôi phải khởi động lại khi tài liệu chưa lưu.','The laptop froze, and I had to restart before saving the document.','Ứng dụng có hiện bảng khôi phục khi bạn mở lại không?','Did the application show a recovery panel when you reopened it?',['recovery panel','bảng khôi phục']],
      ['Có hai bản nhưng tôi không biết bản nào mới hơn.','There are two versions, but I don\'t know which is newer.','Đừng lưu đè ngay; hãy mở cả hai ở chế độ chỉ đọc.','Do not overwrite anything yet. Open both versions in read-only mode.',['overwrite','ghi đè']],
      ['Một bản có nội dung đến mười giờ mười hai.','One version contains my work up to ten twelve.','Hãy sao chép bản đó sang tên tệp mới trước khi chỉnh sửa.','Copy that version under a new filename before editing it.',['under a new filename','với một tên tệp mới']],
      ['Sau đó tôi nên bật tự động lưu trên thư mục đám mây.','I should enable autosave in the cloud folder afterward.','Đúng, và kiểm tra lịch sử phiên bản trước khi xóa bản khôi phục.','Yes, and check the version history before deleting the recovery files.',['version history','lịch sử phiên bản']],
    ]),
  ],
  'online-meeting': [
    c('Regaining Control of the Discussion','Đưa thảo luận trở lại trọng tâm','Cuộc họp trực tuyến lệch chủ đề và hai người nói chồng lên nhau.','Can thiệp lịch sự, ghi nhận vấn đề và chốt bước tiếp theo.',[
      ['Xin phép ngắt lời một chút vì chúng ta còn mười phút.','May I step in for a moment? We have ten minutes left.','Đồng ý, cuộc trao đổi đã đi khá xa khỏi quyết định cần chốt.','Agreed. The discussion has moved quite far from the decision we need.',['step in','can thiệp vào cuộc trao đổi']],
      ['Mình nghe thấy hai vấn đề: ngân sách và rủi ro bảo mật.','I\'m hearing two issues: budget and security risk.','Rủi ro bảo mật phải được giải quyết trước khi phê duyệt.','The security risk must be resolved before approval.',['resolve a risk','xử lý một rủi ro']],
      ['Hãy ghi ngân sách vào danh sách thảo luận riêng.','Let\'s put the budget question in the parking lot.','Được, nhưng cần chỉ định người theo dõi sau cuộc họp.','Fine, but we need an owner to follow it up afterward.',['parking lot','danh sách vấn đề để thảo luận sau']],
      ['Thảo sẽ làm việc với tài chính; còn Huy xác nhận phương án bảo mật.','Thao will work with finance, while Huy confirms the security approach.','Vậy quyết định hôm nay là tạm hoãn phê duyệt đến sáng mai.','Then today\'s decision is to defer approval until tomorrow morning.',['defer approval','hoãn phê duyệt']],
      ['Mọi người xác nhận phần tóm tắt đó chính xác chứ?','Can everyone confirm that summary is accurate?','Chính xác. Hãy gửi kèm thời hạn và người phụ trách trong biên bản.','Yes. Include the deadlines and owners in the minutes.',['meeting minutes','biên bản họp']],
    ]),
    c('Handling a Confidential Topic','Xử lý nội dung bảo mật','Một người bắt đầu chia sẻ thông tin nhạy cảm khi có khách ngoài dự án.','Dừng chia sẻ, kiểm tra người tham dự và chuyển kênh an toàn.',[
      ['Trước khi mở bảng lương, mình cần kiểm tra ai đang trong cuộc gọi.','Before opening the salary sheet, I need to check who is on this call.','Có một nhà tư vấn bên ngoài tham gia cho phần đầu.','An external consultant is attending the first section.',['external consultant','tư vấn viên bên ngoài']],
      ['Vậy chúng ta chưa nên chia sẻ màn hình đó.','Then we should not share that screen yet.','Mình sẽ chuyển nội dung này xuống cuối chương trình.','I\'ll move this item to the end of the agenda.',['agenda item','mục trong chương trình họp']],
      ['Sau khi khách rời đi, hãy kiểm tra lại danh sách người tham dự.','Once the guest leaves, verify the participant list again.','Đồng ý, và mình sẽ tắt tính năng ghi hình trước phần bảo mật.','Agreed. I\'ll stop the recording before the confidential section.',['confidential','mang tính bảo mật']],
      ['Tệp cũng không nên được gửi trong phần chat chung.','The file should not be posted in the general chat either.','Mình sẽ chia sẻ qua thư mục giới hạn quyền truy cập.','I\'ll share it through a restricted-access folder.',['restricted access','quyền truy cập hạn chế']],
    ]),
  ],
};
