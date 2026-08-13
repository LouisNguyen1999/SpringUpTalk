import { scaleTopic as t } from './scale-builder';

export const batchATransportHomeTopics = [
  t({id:'changing-a-pickup-point',title:'Changing a Pickup Point',titleVi:'Đổi điểm đón',category:'Transportation',icon:'📍',level:'A2',description:'Đề nghị đổi điểm đón, mô tả vị trí và xác nhận với tài xế.',grammar:['polite-requests','prepositions-of-place','future-arrangements'],scenarios:[
    ['Requesting the Change','Đề nghị đổi điểm','Tài xế đang đi tới cổng trước nhưng đường bị chặn.','Đề nghị đổi điểm đón và nêu lý do.',[
      ['Anh đang đến cổng trước phải không?','Are you heading to the front gate?','Đúng, tôi còn cách đó khoảng hai phút.','Yes, I am about two minutes away.',['head to a place','đi về phía một nơi']],
      ['Đường đó đang bị chặn, anh đón tôi ở cổng sau được không?','That road is blocked. Could you pick me up at the back gate instead?','Được, tôi sẽ đổi hướng ở ngã tư tiếp theo.','Sure. I will change direction at the next junction.',['pick someone up','đón ai']],
      ['Tôi xin lỗi vì báo hơi muộn.','I am sorry for the late notice.','Không sao, điểm mới vẫn ở gần đây.','No problem. The new point is still nearby.',['late notice','thông báo muộn']],
    ],'changing-plans','customer'],
    ['Describing the New Spot','Mô tả vị trí mới','Tài xế cần nhận ra đúng cổng sau.','Mô tả mốc dễ thấy và vị trí đứng.',[
      ['Cổng sau nằm ở đường nào vậy?','Which street is the back gate on?','Nó nằm trên đường Lê Lợi, đối diện hiệu thuốc.','It is on Le Loi Street, opposite the pharmacy.',['opposite the pharmacy','đối diện hiệu thuốc']],
      ['Bạn đang đứng ngay trước cổng à?','Are you standing right in front of the gate?','Tôi đứng cạnh biển màu xanh, dưới mái che.','I am beside a blue sign, under the shelter.',['under the shelter','dưới mái che']],
      ['Tôi thấy biển rồi nhưng chưa thấy bạn.','I can see the sign, but I cannot see you yet.','Tôi đang vẫy tay cạnh chiếc xe máy màu trắng.','I am waving beside a white motorbike.',['wave to the driver','vẫy tay với tài xế']],
    ],'clarifying','customer'],
    ['Confirming the Pickup','Xác nhận điểm đón','Hai bên đã nhìn thấy nhau.','Xác nhận xe, thời gian và điểm đến.',[
      ['Xe của anh có biển số kết thúc bằng 52 không?','Does your number plate end in fifty-two?','Đúng, tôi đang bật đèn cảnh báo.','Yes, and I have my hazard lights on.',['hazard lights','đèn cảnh báo']],
      ['Tôi thấy xe rồi, tôi sẽ qua đường ngay.','I can see your car. I will cross the road now.','Bạn cứ đợi đèn xanh rồi sang nhé.','Please wait for the green light before crossing.',['wait for the green light','đợi đèn xanh']],
      ['Sau khi lên xe tôi sẽ xác nhận lại điểm đến.','I will confirm the destination once I get in.','Được, tôi sẽ đợi bạn ở vị trí này.','Okay. I will wait for you right here.',['confirm the destination','xác nhận điểm đến']],
    ],'confirming','customer'],
  ]}),
  t({id:'driver-cannot-find-location',title:'When the Driver Cannot Find You',titleVi:'Tài xế không tìm thấy vị trí',category:'Transportation',icon:'🛵',level:'A2',description:'Làm rõ ghim bản đồ, đưa chỉ dẫn ngắn và giữ liên lạc.',grammar:['present-continuous','imperatives','prepositions-of-place'],scenarios:[
    ['Checking the Map Pin','Kiểm tra ghim bản đồ','Tài xế gọi vì ghim nằm sai phía tòa nhà.','Xác định sai lệch giữa ghim và vị trí thật.',[
      ['Tôi đang ở vị trí trên bản đồ nhưng không thấy bạn.','I am at the map pin, but I cannot see you.','Ghim đang ở nhầm phía của tòa nhà.','The pin is on the wrong side of the building.',['map pin','ghim bản đồ']],
      ['Bạn đang ở gần lối vào bãi xe phải không?','Are you near the car park entrance?','Đúng, còn tôi đang ở lối vào dành cho khách.','Yes, but I am at the visitor entrance.',['visitor entrance','lối vào dành cho khách']],
      ['Hai lối vào có thông nhau không?','Are the two entrances connected?','Có, anh có thể đi vòng qua góc bên phải.','Yes. You can go around the corner on your right.',['go around the corner','đi vòng qua góc']],
    ],'clarifying','customer'],
    ['Giving Step-by-Step Directions','Chỉ đường từng bước','Tài xế cần hướng dẫn từ cổng bãi xe.','Đưa ba bước ngắn và dễ làm theo.',[
      ['Tôi vừa ra khỏi bãi xe, giờ đi hướng nào?','I have just left the car park. Which way should I go now?','Rẽ trái rồi đi thẳng khoảng một trăm mét.','Turn left and go straight for about one hundred metres.',['go straight','đi thẳng']],
      ['Tôi sẽ thấy gì ở cuối đường?','What will I see at the end of the road?','Anh sẽ thấy một cửa hàng tiện lợi có biển đỏ.','You will see a convenience store with a red sign.',['convenience store','cửa hàng tiện lợi']],
      ['Tôi nên dừng trước cửa hàng à?','Should I stop in front of the store?','Đi qua cửa hàng một chút; tôi đang đứng bên cây ATM.','Go slightly past it. I am standing beside the cash machine.',['go past something','đi qua một nơi']],
    ],'giving-instructions','customer'],
    ['Staying in Contact','Giữ liên lạc','Đường đông khiến hai bên khó nhận ra nhau.','Thống nhất cách liên lạc an toàn.',[
      ['Đoạn này đông quá nên tôi không thể dừng lâu.','This area is busy, so I cannot stop for long.','Anh cứ chạy chậm; tôi sẽ gọi khi thấy xe.','Drive slowly, and I will call when I see your car.',['drive slowly','chạy chậm']],
      ['Nếu lỡ đi qua bạn thì sao?','What should I do if I pass you?','Anh rẽ vào con hẻm kế tiếp rồi gọi lại cho tôi.','Turn into the next side street and call me again.',['side street','đường nhánh']],
      ['Được, tôi sẽ giữ điện thoại ở chế độ rảnh tay.','Okay. I will keep the call on hands-free.','Cảm ơn, an toàn là quan trọng nhất.','Thank you. Safety is the most important thing.',['hands-free call','cuộc gọi rảnh tay']],
    ],'troubleshooting','customer'],
  ]}),
  t({id:'flooded-road-detour',title:'Taking a Detour Around a Flooded Road',titleVi:'Đi đường vòng khi đường ngập',category:'Transportation',icon:'🌧️',level:'B1',description:'Đánh giá đường ngập, so sánh đường vòng và cập nhật thời gian đến.',grammar:['present-perfect','conditionals','comparatives'],scenarios:[
    ['Assessing the Flooding','Đánh giá đoạn ngập','Hai đồng nghiệp đang đi taxi sau mưa lớn.','Hỏi mức ngập và tránh quyết định nguy hiểm.',[
      ['Tại sao xe phía trước đều quay đầu vậy?','Why are all the cars ahead turning around?','Con đường dưới cầu đã ngập sau trận mưa.','The road under the bridge has flooded after the storm.',['flooded road','đường bị ngập']],
      ['Nước có đủ nông để xe mình đi qua không?','Is the water shallow enough for our car to get through?','Không chắc; vài xe máy đã bị chết máy ở đó.','I am not sure. Several motorbikes have stalled there.',['stall in floodwater','chết máy trong nước ngập']],
      ['Vậy chúng ta không nên mạo hiểm đi tiếp.','Then we should not risk going any farther.','Tôi đồng ý, quay lại bây giờ sẽ an toàn hơn.','I agree. Turning back now will be safer.',['risk going farther','mạo hiểm đi tiếp']],
    ],'expressing-concern','coworker'],
    ['Comparing Detours','So sánh đường vòng','Ứng dụng đề xuất hai tuyến thay thế.','So sánh thời gian, giao thông và độ tin cậy.',[
      ['Tuyến qua đường vành đai dài hơn bao nhiêu?','How much longer is the route via the ring road?','Nó dài hơn sáu cây số nhưng hiện ít tắc hơn.','It is six kilometres longer, but it is less congested right now.',['ring road','đường vành đai']],
      ['Còn tuyến qua chợ thì sao?','What about the route past the market?','Tuyến đó ngắn hơn, nhưng cũng có cảnh báo ngập.','That route is shorter, but it also has a flood warning.',['flood warning','cảnh báo ngập']],
      ['Tôi chọn đường vành đai vì chắc chắn hơn.','I would choose the ring road because it is more reliable.','Đồng ý, thêm mười phút vẫn tốt hơn bị mắc kẹt.','Agreed. Ten extra minutes is better than getting stuck.',['get stuck','bị mắc kẹt']],
    ],'comparing','coworker'],
    ['Updating the Arrival Time','Cập nhật giờ đến','Đường vòng khiến hai người trễ cuộc hẹn.','Báo trễ, giải thích ngắn và đưa ETA mới.',[
      ['Chúng ta cần báo cho khách hàng ngay.','We need to update the client right away.','Tôi sẽ nói đường ngập đã buộc chúng ta đi đường vòng.','I will explain that flooding has forced us to take a detour.',['take a detour','đi đường vòng']],
      ['Giờ đến dự kiến mới là mấy giờ?','What is our revised arrival time?','Nếu giao thông ổn định, chúng ta sẽ đến lúc ba giờ hai mươi.','If traffic stays steady, we will arrive at three twenty.',['revised arrival time','giờ đến dự kiến mới'],undefined,undefined,{semanticConstraints:{intent:'state revised arrival time',requiredConcepts:[['arrive','arrival']],criticalValues:[['three twenty','3 20','3:20']]}}],
      ['Hãy đề nghị lùi phần trình bày lại hai mươi phút.','Let us ask to push the presentation back by twenty minutes.','Được, tôi sẽ gửi cập nhật cùng vị trí hiện tại.','Okay. I will send the update with our current location.',['push something back','lùi một lịch hẹn']],
    ],'reporting','coworker'],
  ]}),
  t({id:'motorbike-flat-tire',title:'Dealing with a Flat Motorbike Tyre',titleVi:'Xử lý xe máy thủng lốp',category:'Transportation',icon:'🛞',level:'A2',description:'Nhận biết lốp xẹp, gọi thợ và hỏi chi phí sửa.',grammar:['present-perfect','polite-questions','future-forms'],scenarios:[
    ['Spotting the Problem','Nhận ra vấn đề','Người đi xe cảm thấy bánh sau không ổn định.','Mô tả dấu hiệu và dừng xe an toàn.',[
      ['Xe của bạn có vẻ bị lắc ở bánh sau.','Your motorbike seems to be wobbling at the back.','Đúng, tay lái vừa trở nên khó kiểm soát.','Yes. The steering has just become difficult to control.',['wobble','bị lắc']],
      ['Có thể lốp sau đang bị xẹp.','The rear tyre may be going flat.','Tôi sẽ tấp vào chỗ sáng phía trước.','I will pull over in the well-lit area ahead.',['pull over','tấp vào lề']],
      ['Đừng phanh gấp khi bánh đang mềm.','Do not brake suddenly while the tyre is soft.','Được, tôi sẽ giảm tốc từ từ.','Okay. I will slow down gradually.',['slow down gradually','giảm tốc từ từ']],
    ],'giving-advice','close-friend'],
    ['Calling a Repair Shop','Gọi tiệm sửa xe','Hai người tìm được tiệm sửa gần đó.','Hỏi dịch vụ lưu động và đưa vị trí.',[
      ['Bên anh có thể đến sửa lốp tại chỗ không?','Can you repair a tyre at the roadside?','Có, nếu bạn ở trong bán kính ba cây số.','Yes, if you are within three kilometres.',['roadside repair','sửa xe ven đường']],
      ['Chúng tôi đang ở trước số 18 đường Nguyễn Huệ.','We are in front of number eighteen on Nguyen Hue Street.','Kỹ thuật viên có thể đến trong khoảng mười lăm phút.','A mechanic can reach you in about fifteen minutes.',['reach someone','đến chỗ ai']],
      ['Tôi sẽ gửi vị trí chính xác qua tin nhắn.','I will send the exact location by message.','Cảm ơn, vui lòng đứng xa dòng xe đang chạy.','Thanks. Please wait away from moving traffic.',['moving traffic','dòng xe đang chạy']],
    ],'requesting','customer'],
    ['Agreeing on the Repair','Thống nhất cách sửa','Thợ kiểm tra thấy một chiếc đinh nhỏ.','Hỏi phương án, giá và thời gian hoàn tất.',[
      ['Lốp có cần thay mới hoàn toàn không?','Does the tyre need to be completely replaced?','Không, lỗ thủng nhỏ nên có thể vá được.','No. The puncture is small enough to patch.',['patch a puncture','vá lỗ thủng']],
      ['Sửa như vậy sẽ tốn bao nhiêu?','How much will that repair cost?','Giá là tám mươi nghìn đồng, gồm cả công.','It will cost eighty thousand dong, including labour.',['including labour','gồm tiền công'],undefined,undefined,{semanticConstraints:{intent:'state repair price',requiredConcepts:[['cost','price'],['labour']],criticalValues:[['eighty thousand','80000']]}}],
      ['Anh có thể làm xong trong hai mươi phút chứ?','Can you finish it within twenty minutes?','Được, tôi sẽ bắt đầu ngay sau khi bạn đồng ý.','Yes. I will start as soon as you approve the repair.',['approve the repair','đồng ý sửa chữa']],
    ],'confirming','customer'],
  ]}),
  t({id:'booking-an-intercity-bus',title:'Booking an Intercity Bus',titleVi:'Đặt vé xe khách',category:'Transportation',icon:'🚌',level:'A1',description:'Hỏi giờ xe, chọn ghế và xác nhận điểm đón.',grammar:['what-time','would-like','basic-prepositions'],scenarios:[
    ['Asking About Departures','Hỏi giờ khởi hành','Hành khách gọi quầy vé cho chuyến đi ngày mai.','Hỏi chuyến xe và thời gian di chuyển.',[
      ['Ngày mai có xe nào đi Nha Trang không?','Is there a bus to Nha Trang tomorrow?','Có, chuyến đầu tiên rời bến lúc bảy giờ.','Yes. The first bus leaves at seven o’clock.',['leave the station','rời bến'],undefined,undefined,{semanticConstraints:{intent:'state departure time',requiredConcepts:[['bus'],['leave','leaves','depart','departs']],criticalValues:[['seven','7']]}}],
      ['Chuyến đi mất bao lâu?','How long does the journey take?','Nó mất khoảng bốn tiếng rưỡi.','It takes about four and a half hours.',['journey time','thời gian hành trình']],
      ['Xe có dừng nghỉ giữa đường không?','Does the bus stop for a break?','Có, xe dừng một lần sau hai giờ.','Yes. It stops once after two hours.',['stop for a break','dừng nghỉ']],
    ],'asking-information','customer'],
    ['Choosing a Seat','Chọn chỗ ngồi','Hành khách chọn chỗ trên chuyến bảy giờ.','Yêu cầu loại ghế và kiểm tra chỗ trống.',[
      ['Tôi muốn đặt một vé cho chuyến bảy giờ.','I would like to book one ticket for the seven o’clock bus.','Bạn muốn ghế gần cửa sổ hay gần lối đi?','Would you like a window seat or an aisle seat?',['book a ticket','đặt vé']],
      ['Cho tôi ghế cửa sổ nếu còn nhé.','I would like a window seat if one is available.','Ghế 8A gần cửa sổ vẫn còn trống.','Seat 8A by the window is still available.',['available seat','ghế còn trống']],
      ['Ghế đó có gần nhà vệ sinh không?','Is that seat near the toilet?','Không, nó ở gần giữa xe.','No. It is near the middle of the bus.',['middle of the bus','giữa xe']],
    ],'requesting','customer'],
    ['Confirming the Pickup Stop','Xác nhận điểm đón','Nhà xe có nhiều điểm đón trong thành phố.','Chọn điểm đón và hỏi giờ có mặt.',[
      ['Tôi có thể lên xe ở đường Điện Biên Phủ không?','Can I board the bus on Dien Bien Phu Street?','Có, xe đón khách trước siêu thị lớn.','Yes. The bus picks passengers up in front of the supermarket.',['board the bus','lên xe']],
      ['Tôi cần có mặt lúc mấy giờ?','What time do I need to be there?','Vui lòng đến trước giờ khởi hành hai mươi phút.','Please arrive twenty minutes before departure.',['before departure','trước giờ khởi hành']],
      ['Tôi sẽ mang theo mã vé trên điện thoại.','I will bring the ticket code on my phone.','Được, tài xế sẽ kiểm tra mã khi bạn lên xe.','Okay. The driver will check it when you board.',['ticket code','mã vé']],
    ],'confirming','customer'],
  ]}),
  t({id:'lost-parking-ticket',title:'Reporting a Lost Parking Ticket',titleVi:'Báo mất vé gửi xe',category:'Transportation',icon:'🎫',level:'B1',description:'Báo mất vé, xác minh quyền sở hữu và hiểu phí xử lý.',grammar:['present-perfect','passive-voice','polite-requests'],scenarios:[
    ['Reporting the Loss','Báo mất vé','Người gửi xe không tìm thấy vé giấy khi ra về.','Thông báo sự việc và mô tả lần cuối thấy vé.',[
      ['Tôi e là mình đã làm mất vé gửi xe.','I am afraid I have lost my parking ticket.','Bạn nhớ lần cuối cầm vé là khi nào không?','Do you remember when you last had it?',['parking ticket','vé gửi xe']],
      ['Tôi để nó trong túi áo sau khi vào bãi.','I put it in my jacket pocket after entering the car park.','Bạn đã kiểm tra túi và khu vực quanh xe chưa?','Have you checked the pocket and the area around your vehicle?',['area around the vehicle','khu vực quanh xe']],
      ['Rồi, nhưng tôi vẫn không tìm thấy.','Yes, but I still cannot find it anywhere.','Được, chúng ta sẽ làm thủ tục xác minh.','All right. We will complete an ownership check.',['ownership check','kiểm tra quyền sở hữu']],
    ],'reporting','customer'],
    ['Verifying Ownership','Xác minh xe','Nhân viên cần đối chiếu giấy tờ và camera.','Cung cấp bằng chứng mà không tranh cãi.',[
      ['Tôi cần đưa những giấy tờ nào?','Which documents do I need to provide?','Vui lòng cho tôi xem đăng ký xe và giấy tờ tùy thân.','Please show me the vehicle registration and your identification.',['vehicle registration','đăng ký xe']],
      ['Đăng ký xe là bản điện tử có được không?','Will a digital copy of the registration be accepted?','Được, miễn là tên và biển số đọc rõ.','Yes, provided that the name and number plate are clearly visible.',['digital copy','bản điện tử']],
      ['Các anh có kiểm tra giờ tôi vào bãi không?','Will you check what time I entered the car park?','Có, chúng tôi sẽ đối chiếu biển số với camera cổng vào.','Yes. We will match your number plate against the entrance camera.',['entrance camera','camera cổng vào']],
    ],'clarifying','customer'],
    ['Understanding the Fee','Hiểu phí xử lý','Việc xác minh hoàn tất nhưng có phí mất vé.','Hỏi căn cứ phí và nhận biên lai.',[
      ['Tại sao tôi phải trả phí mất vé?','Why do I need to pay a lost-ticket fee?','Phí đó chi trả thời gian xác minh và ngăn sử dụng vé sai mục đích.','It covers the verification time and prevents ticket misuse.',['lost-ticket fee','phí mất vé']],
      ['Phí này có được ghi trong quy định của bãi không?','Is this fee stated in the car park rules?','Có, mức phí được niêm yết ở lối vào và quầy trực.','Yes. The charge is displayed at the entrance and the service desk.',['displayed charge','mức phí niêm yết']],
      ['Vui lòng cho tôi biên lai sau khi thanh toán.','Please give me a receipt after I pay.','Tất nhiên, biên lai sẽ ghi rõ phí xử lý.','Certainly. The receipt will show the processing charge clearly.',['processing charge','phí xử lý']],
    ],'asking-information','customer'],
  ]}),
  t({id:'asking-about-a-rental-deposit',title:'Asking About a Rental Deposit',titleVi:'Hỏi về tiền cọc thuê phòng',category:'Home',icon:'🔑',level:'A2',description:'Làm rõ số tiền, điều kiện hoàn cọc và chứng từ.',grammar:['how-much','conditionals','polite-questions'],scenarios:[
    ['Checking the Amount','Kiểm tra số tiền','Người thuê đọc hợp đồng trước khi đặt cọc.','Hỏi số tiền và thời hạn thanh toán.',[
      ['Tiền cọc cho căn phòng này là bao nhiêu?','How much is the deposit for this room?','Tiền cọc bằng hai tháng tiền thuê.','The deposit is equal to two months’ rent.',['security deposit','tiền đặt cọc thuê nhà'],undefined,undefined,{semanticConstraints:{intent:'state deposit amount',requiredConcepts:[['deposit'],['rent']],criticalValues:[['two','2'],['months']]}}],
      ['Tôi cần trả toàn bộ ngay hôm nay à?','Do I need to pay the full amount today?','Bạn có thể trả một nửa hôm nay và phần còn lại khi ký hợp đồng.','You can pay half today and the rest when you sign the lease.',['sign the lease','ký hợp đồng thuê']],
      ['Tôi có thể chuyển khoản thay vì trả tiền mặt không?','Can I pay by bank transfer instead of cash?','Có, tôi sẽ gửi thông tin tài khoản cho bạn.','Yes. I will send you the bank details.',['bank details','thông tin tài khoản']],
    ],'asking-information','customer'],
    ['Understanding Refund Conditions','Hiểu điều kiện hoàn cọc','Người thuê hỏi khi nào chủ nhà được giữ tiền cọc.','Phân biệt hao mòn và hư hỏng.',[
      ['Khi nào tiền cọc sẽ được hoàn lại?','When will the deposit be returned?','Nó sẽ được hoàn trong vòng bảy ngày sau khi bạn trả phòng.','It will be returned within seven days after you move out.',['return a deposit','hoàn tiền cọc'],undefined,undefined,{semanticConstraints:{intent:'state refund deadline',requiredConcepts:[['return','returned','refund','refunded']],criticalValues:[['seven','7'],['days']]}}],
      ['Hao mòn thông thường có bị trừ tiền không?','Will normal wear and tear be deducted?','Không, chỉ hư hỏng vượt quá sử dụng thông thường mới bị tính phí.','No. Only damage beyond normal use will be charged.',['wear and tear','hao mòn thông thường']],
      ['Nếu có khoản khấu trừ, tôi sẽ nhận danh sách chứ?','Will I receive a list if there are any deductions?','Có, mỗi khoản sẽ được ghi rõ cùng bằng chứng.','Yes. Each deduction will be itemised with evidence.',['itemised deduction','khoản khấu trừ chi tiết']],
    ],'clarifying','customer'],
    ['Getting Written Proof','Nhận chứng từ','Người thuê muốn lưu bằng chứng đã thanh toán.','Yêu cầu biên nhận và ghi đúng nội dung.',[
      ['Tôi sẽ nhận biên nhận cho khoản cọc chứ?','Will I receive a receipt for the deposit?','Có, tôi sẽ gửi biên nhận điện tử ngay khi tiền về.','Yes. I will send an electronic receipt as soon as the payment arrives.',['electronic receipt','biên nhận điện tử']],
      ['Biên nhận có ghi địa chỉ căn phòng không?','Will the receipt include the room address?','Có, nó sẽ ghi địa chỉ, số tiền và ngày thanh toán.','Yes. It will show the address, amount, and payment date.',['payment date','ngày thanh toán']],
      ['Vui lòng ghi rõ đây là tiền cọc có hoàn lại.','Please state clearly that this is a refundable deposit.','Được, tôi sẽ dùng đúng cụm đó trên biên nhận.','Certainly. I will use that exact wording on the receipt.',['refundable deposit','tiền cọc có hoàn lại']],
    ],'requesting','customer'],
  ]}),
  t({id:'questioning-a-utility-bill',title:'Questioning a Utility Bill',titleVi:'Hỏi về hóa đơn điện nước',category:'Home',icon:'🧾',level:'A2',description:'Đối chiếu chỉ số, hỏi khoản phí và thống nhất bước kiểm tra.',grammar:['comparatives','past-simple','polite-questions'],scenarios:[
    ['Comparing the Amount','So sánh số tiền','Hóa đơn tháng này cao hơn bình thường.','Nêu chênh lệch mà không buộc tội.',[
      ['Hóa đơn điện tháng này cao hơn tháng trước nhiều.','This month’s electricity bill is much higher than last month’s.','Đúng, mức sử dụng được ghi nhận đã tăng gần gấp đôi.','Yes. The recorded usage has almost doubled.',['recorded usage','mức sử dụng được ghi nhận']],
      ['Nhà tôi không dùng thêm thiết bị nào.','We have not used any additional appliances.','Vậy chúng ta nên kiểm tra lại chỉ số công tơ.','Then we should check the meter reading again.',['meter reading','chỉ số công tơ']],
      ['Tôi có ảnh công tơ chụp cuối tháng.','I have a photo of the meter from the end of the month.','Tốt, ảnh đó sẽ giúp đối chiếu số liệu.','Good. That photo will help us compare the figures.',['compare the figures','đối chiếu số liệu']],
    ],'reporting','customer'],
    ['Asking About a New Charge','Hỏi khoản phí mới','Hóa đơn có một dòng phí chưa từng xuất hiện.','Hỏi tên phí, lý do và thời điểm áp dụng.',[
      ['Chính xác thì khoản phí dịch vụ chung trên hóa đơn này dùng cho việc gì?','What exactly is this shared service charge on the bill for?','Nó chi trả điện và vệ sinh ở khu vực chung.','It covers electricity and cleaning in the common areas.',['shared service charge','phí dịch vụ chung']],
      ['Khoản phí mới này được áp dụng lần đầu khi nào?','When was this new charge first introduced?','Nó được áp dụng từ đầu tháng này.','It was introduced at the beginning of this month.',['introduce a charge','bắt đầu áp dụng phí']],
      ['Cư dân được thông báo thế nào trước khi khoản phí có hiệu lực?','How were residents informed before the charge took effect?','Ban quản lý đã gửi email và dán thông báo ở sảnh.','Management sent an email and posted a notice in the lobby.',['post a notice','dán thông báo']],
    ],'asking-information','customer'],
    ['Agreeing on a Check','Thống nhất kiểm tra','Hai bên chưa xác định được nguyên nhân chênh lệch.','Chốt bước kiểm tra và thời hạn phản hồi.',[
      ['Anh có thể cho người kiểm tra công tơ không?','Could you arrange for someone to inspect the meter?','Được, kỹ thuật viên có thể đến vào sáng thứ Sáu.','Yes. A technician can come on Friday morning.',['inspect the meter','kiểm tra công tơ']],
      ['Tôi có cần ở nhà trong lúc kiểm tra không?','Do I need to be home during the inspection?','Không, công tơ nằm ở hành lang bên ngoài.','No. The meter is in the corridor outside.',['during the inspection','trong lúc kiểm tra']],
      ['Khi nào tôi sẽ nhận kết quả?','When will I receive the result?','Chúng tôi sẽ phản hồi bằng văn bản trong hai ngày làm việc.','We will respond in writing within two working days.',['respond in writing','phản hồi bằng văn bản']],
    ],'confirming','customer'],
  ]}),
  t({id:'replacing-an-access-card',title:'Replacing an Access Card',titleVi:'Thay thẻ ra vào',category:'Home',icon:'💳',level:'A1',description:'Báo thẻ hỏng, xác nhận căn hộ và nhận thẻ mới.',grammar:['present-simple','have','basic-requests'],scenarios:[
    ['Reporting the Problem','Báo thẻ hỏng','Cư dân không mở được cửa sảnh.','Mô tả lỗi đơn giản và xin hỗ trợ.',[
      ['Thẻ ra vào của tôi không hoạt động.','My access card is not working.','Bạn đã thử ở đầu đọc bên cạnh chưa?','Have you tried the reader beside this one?',['access card','thẻ ra vào']],
      ['Rồi, nhưng đèn vẫn hiện màu đỏ.','Yes, but the light still turns red.','Có thể thẻ đã bị hỏng.','The card may be damaged.',['damaged card','thẻ bị hỏng']],
      ['Bạn có thể giúp tôi vào sảnh trước không?','Can you help me enter the lobby first?','Được, tôi sẽ mở cửa bằng thẻ nhân viên.','Yes. I will open the door with my staff card.',['enter the lobby','vào sảnh']],
    ],'reporting','customer'],
    ['Confirming the Apartment','Xác nhận căn hộ','Nhân viên cần kiểm tra thông tin cư dân.','Cung cấp số căn hộ và giấy tờ.',[
      ['Bạn sống ở căn hộ nào?','Which apartment do you live in?','Tôi sống ở căn 604, tòa B.','I live in apartment 604 in Block B.',['apartment number','số căn hộ']],
      ['Tôi có thể xem giấy tờ tùy thân không?','May I see your identification?','Đây là căn cước của tôi.','Here is my identity card.',['identity card','căn cước']],
      ['Tên của bạn có trong danh sách cư dân.','Your name is on the resident list.','Cảm ơn, tôi mới chuyển đến tuần trước.','Thank you. I moved in last week.',['resident list','danh sách cư dân']],
    ],'confirming','customer'],
    ['Collecting the New Card','Nhận thẻ mới','Thẻ thay thế đã được kích hoạt.','Hỏi phí và thử thẻ trước khi rời đi.',[
      ['Thẻ mới đã sẵn sàng chưa?','Is the new card ready?','Rồi, tôi vừa kích hoạt nó.','Yes. I have just activated it.',['activate a card','kích hoạt thẻ']],
      ['Tôi có phải trả phí thay thẻ không?','Do I need to pay a replacement fee?','Không, thẻ cũ bị lỗi nên không có phí.','No. The old card was faulty, so there is no charge.',['replacement fee','phí thay thẻ']],
      ['Tôi có thể thử thẻ ở cửa này không?','Can I test the card at this door?','Tất nhiên, hãy chạm thẻ vào đầu đọc.','Of course. Tap it on the reader.',['tap the card','chạm thẻ']],
    ],'confirming','customer'],
  ]}),
  t({id:'following-up-on-noise',title:'Following Up on a Noise Complaint',titleVi:'Theo dõi khiếu nại tiếng ồn',category:'Home',icon:'🔊',level:'B1',description:'Ghi nhận tiếng ồn lặp lại, đưa bằng chứng và đề nghị giải pháp.',grammar:['present-perfect','reported-speech','polite-requests'],scenarios:[
    ['Describing the Pattern','Mô tả tình trạng lặp lại','Cư dân gọi lại sau khi đã báo tiếng ồn.','Nêu tần suất, khung giờ và ảnh hưởng.',[
      ['Tôi gọi để theo dõi khiếu nại tiếng ồn tuần trước.','I am calling to follow up on last week’s noise complaint.','Tình trạng đó có tiếp tục xảy ra không?','Has the problem continued since you reported it?',['follow up on a complaint','theo dõi khiếu nại']],
      ['Có, nhạc lớn lại bật sau nửa đêm ba lần.','Yes. Loud music has started again after midnight three times.','Nó thường kéo dài trong bao lâu?','How long does it usually continue?',['after midnight','sau nửa đêm']],
      ['Mỗi lần khoảng một giờ và làm con tôi thức giấc.','It lasts for about an hour each time and wakes my child.','Tôi hiểu, đó là ảnh hưởng đáng kể.','I understand. That is a significant disturbance.',['significant disturbance','sự làm phiền đáng kể']],
    ],'reporting','customer'],
    ['Providing Evidence','Cung cấp bằng chứng','Ban quản lý cần hồ sơ cụ thể trước khi can thiệp.','Đưa nhật ký mà vẫn tôn trọng riêng tư.',[
      ['Tôi đã ghi ngày giờ của từng lần xảy ra.','I have recorded the date and time of each incident.','Nhật ký đó sẽ giúp chúng tôi xác minh tình trạng lặp lại.','That log will help us verify the repeated pattern.',['incident log','nhật ký sự việc']],
      ['Tôi cũng có đoạn ghi âm từ trong căn hộ mình.','I also have a recording made inside my apartment.','Bạn có thể gửi nó mà không quay vào nhà hàng xóm không?','Can you send it without showing inside your neighbour’s home?',['respect privacy','tôn trọng riêng tư']],
      ['Có, đoạn ghi âm chỉ cho thấy mức âm thanh tôi nghe được.','Yes. It only captures the noise level that I can hear.','Như vậy phù hợp cho việc xem xét ban đầu.','That is appropriate for our initial review.',['initial review','xem xét ban đầu']],
    ],'explaining','customer'],
    ['Requesting the Next Step','Đề nghị bước tiếp theo','Cư dân muốn biết ban quản lý sẽ hành động thế nào.','Yêu cầu biện pháp và thời hạn rõ.',[
      ['Ban quản lý sẽ thực hiện hành động gì tiếp theo?','What action will management take next?','Chúng tôi sẽ gửi cảnh báo chính thức cho căn hộ đó hôm nay.','We will issue a formal warning to that apartment today.',['formal warning','cảnh báo chính thức']],
      ['Nếu tiếng ồn ban đêm vẫn tiếp tục thì bước sau là gì?','What will happen if the late-night noise continues?','Chúng tôi sẽ chuyển vụ việc sang quy trình vi phạm của tòa nhà.','We will move the case into the building’s violation process.',['violation process','quy trình xử lý vi phạm']],
      ['Vui lòng cập nhật kết quả cho tôi trước thứ Sáu.','Please update me on the result by Friday.','Được, tôi sẽ gửi kết quả qua email.','Certainly. I will send you the outcome by email.',['send an outcome','gửi kết quả']],
    ],'requesting','customer'],
  ]}),
];
