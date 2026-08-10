import { scaleTopic as t } from './scale-builder';

export const batchCLifeTopics = [
  t({id:'visiting-a-museum',title:'Visiting a Museum',titleVi:'Tham quan bảo tàng',category:'Entertainment',icon:'🏛️',level:'A2',description:'Mua vé, dùng thuyết minh và tuân thủ quy định.',grammar:['polite-questions','present-perfect','have-to'],scenarios:[
    ['Buying Admission Tickets','Mua vé vào cửa','Hai khách chọn loại vé tại quầy.','Hỏi giá, ưu đãi và giờ đóng cửa.',[
      ['Hai vé người lớn vào triển lãm chính là bao nhiêu?','How much are two adult tickets for the main exhibition?','Tổng cộng là ba trăm nghìn đồng.','The total is three hundred thousand dong.',['admission ticket','vé vào cửa']],
      ['Sinh viên có được giảm giá không?','Is there a student discount?','Có, nếu bạn xuất trình thẻ sinh viên còn hiệu lực.','Yes, if you show a valid student card.',['valid student card','thẻ sinh viên còn hiệu lực']],
      ['Bảo tàng đóng cửa lúc mấy giờ?','What time does the museum close?','Các phòng trưng bày đóng lúc năm rưỡi.','The galleries close at five thirty.',['gallery','phòng trưng bày']],
    ]],
    ['Using an Audio Guide','Dùng máy thuyết minh','Khách thuê thiết bị thuyết minh bằng tiếng Anh.','Chọn ngôn ngữ và vận hành thiết bị.',[
      ['Máy thuyết minh có bản tiếng Anh không?','Is the audio guide available in English?','Có, bạn chọn ngôn ngữ trên màn hình đầu tiên.','Yes. Select the language on the first screen.',['audio guide','máy thuyết minh']],
      ['Làm sao để nghe phần về bức tranh này?','How do I hear the section about this painting?','Nhập số ba chữ số bên cạnh nhãn tác phẩm.','Enter the three-digit number beside the object label.',['object label','nhãn hiện vật']],
      ['Tôi trả máy ở đâu sau khi xem xong?','Where do I return the device afterward?','Hãy trả tại quầy bên cạnh lối ra.','Return it at the desk beside the exit.',['return a device','trả thiết bị']],
    ]],
    ['Following Gallery Rules','Tuân thủ quy định phòng trưng bày','Nhân viên nhắc khách về chụp ảnh và đồ ăn.','Hiểu lý do và cất đồ đúng nơi.',[
      ['Tôi có được chụp ảnh trong phòng này không?','May I take photographs in this room?','Được, nhưng không dùng đèn flash.','Yes, but flash photography is not permitted.',['flash photography','chụp ảnh có đèn flash']],
      ['Tôi có thể mang chai nước vào không?','Can I take this bottle of water inside?','Không, đồ ăn và thức uống phải để trong tủ gửi đồ.','No. Food and drinks must be left in a locker.',['leave in a locker','để trong tủ gửi đồ']],
      ['Tôi sẽ quay lại sảnh để cất nó.','I\'ll return to the lobby and put it away.','Cảm ơn bạn đã giúp bảo vệ các hiện vật.','Thank you for helping us protect the exhibits.',['exhibit','hiện vật trưng bày']],
    ]],
    ['A Sold-out Special Exhibition','Triển lãm đặc biệt hết vé','Khách đến nhưng vé theo giờ đã bán hết.','Tìm lựa chọn chờ, đặt ngày khác hoặc xem khu thường.',[
      ['Tôi muốn mua vé triển lãm gốm lúc hai giờ.','I\'d like a ticket for the two o\'clock ceramics exhibition.','Rất tiếc, mọi khung giờ hôm nay đã bán hết.','I\'m sorry. Every time slot today is sold out.',['sold out','đã bán hết']],
      ['Có danh sách chờ nếu ai đó hủy không?','Is there a waiting list in case someone cancels?','Không có danh sách chờ, nhưng vé ngày mai vẫn còn.','There is no waiting list, but tickets are available tomorrow.',['waiting list','danh sách chờ']],
      ['Vé thường hôm nay vẫn cho vào bộ sưu tập chính chứ?','Does a standard ticket still include the main collection today?','Có, và bạn có thể đặt triển lãm đặc biệt online cho ngày mai.','Yes, and you can book the special exhibition online for tomorrow.',['main collection','bộ sưu tập chính']],
    ]],
  ]}),
  t({id:'organizing-a-neighborhood-event',title:'Organizing a Neighborhood Event',titleVi:'Tổ chức sự kiện khu phố',category:'Community',icon:'🎪',level:'A2',description:'Chọn địa điểm, tuyển người hỗ trợ và báo cư dân.',grammar:['be-going-to','suggestions','future-will'],scenarios:[
    ['Choosing the Courtyard','Chọn sân chung','Cư dân tìm chỗ tổ chức ngày hội nhỏ.','Đánh giá không gian, điện và phương án mưa.',[
      ['Sân giữa hai tòa nhà có đủ rộng không?','Is the courtyard between the buildings large enough?','Có, nếu mình để khu trò chơi ở một bên.','Yes, if we keep the games area on one side.',['courtyard','sân chung']],
      ['Ở đó có ổ điện cho loa không?','Are there power sockets for the speakers?','Có một ổ gần phòng bảo vệ, nhưng cần dây nối dài.','There is one near security, but we need an extension cable.',['extension cable','dây điện nối dài']],
      ['Nếu trời mưa thì chuyển vào đâu?','Where will we move if it rains?','Phòng sinh hoạt chung đã được giữ làm phương án dự phòng.','The community room has been reserved as a backup.',['community room','phòng sinh hoạt chung']],
    ]],
    ['Finding Volunteers','Tìm tình nguyện viên','Ban tổ chức cần người phụ trách ba khu vực.','Chia ca ngắn và vai trò rõ ràng.',[
      ['Chúng ta vẫn thiếu người ở bàn đăng ký.','We still need someone at the registration desk.','Mình có thể trực từ tám đến mười giờ.','I can cover it from eight until ten.',['registration desk','bàn đăng ký']],
      ['Sau mười giờ ai thay bạn được?','Who can take over after ten?','Cô Lan đồng ý nếu có người hướng dẫn trước.','Ms Lan agreed, provided someone shows her what to do first.',['take over','tiếp quản']],
      ['Mình sẽ viết hướng dẫn một trang cho mọi ca.','I\'ll prepare a one-page guide for every shift.','Như vậy người mới cũng có thể hỗ trợ nhanh.','That will let new volunteers help without much delay.',['volunteer shift','ca tình nguyện']],
    ]],
    ['Informing the Residents','Thông báo cho cư dân','Nhóm cần báo giờ sự kiện và khả năng có tiếng ồn.','Chọn kênh và thông tin cần thiết.',[
      ['Mình nên thông báo trước bao lâu?','How far in advance should we notify residents?','Ít nhất một tuần vì bãi xe sẽ đóng một phần.','At least a week, because part of the parking area will be closed.',['notify residents','thông báo cho cư dân']],
      ['Chỉ đăng trong nhóm chat có đủ không?','Is a message in the group chat enough?','Không, hãy dán thông báo ở thang máy cho người không dùng ứng dụng.','No. Put notices in the lifts for people who do not use the app.',['put up a notice','dán thông báo']],
      ['Mình sẽ ghi cả số liên hệ nếu ai có câu hỏi.','I\'ll include a contact number for questions.','Nhớ nêu sự kiện kết thúc lúc chín giờ tối.','Remember to state that the event ends at nine in the evening.',['contact number','số liên hệ']],
    ]],
  ]}),
  t({id:'discussing-mental-wellbeing',title:'Discussing Mental Wellbeing',titleVi:'Trao đổi về sức khỏe tinh thần',category:'Health',icon:'🧠',level:'B1',description:'Chia sẻ khó khăn, lắng nghe và tìm hỗ trợ phù hợp.',grammar:['present-perfect-continuous','modals','conditionals'],scenarios:[
    ['Checking In With a Friend','Hỏi thăm một người bạn','Một người nhận thấy bạn mình rút lui khỏi hoạt động chung.','Hỏi mở và lắng nghe không phán xét.',[
      ['Dạo này bạn ít tham gia với mọi người; bạn có ổn không?','You have been joining us less recently. Are you doing okay?','Mình thấy quá tải và thường chỉ muốn ở một mình.','I have been feeling overwhelmed and often just want to be alone.',['feel overwhelmed','cảm thấy quá tải']],
      ['Bạn có muốn nói về điều đang gây áp lực không?','Would you like to talk about what has been putting you under pressure?','Công việc liên tục thay đổi và mình không ngủ ngon.','Work keeps changing, and I have not been sleeping well.',['put under pressure','gây áp lực']],
      ['Mình có thể nghe, không cần phải tìm giải pháp ngay.','I can listen; we do not have to find a solution immediately.','Cảm ơn, chỉ cần được nói ra đã giúp mình nhẹ hơn.','Thanks. Being able to say it aloud already helps.',['say it aloud','nói ra thành lời']],
    ]],
    ['Setting a Work Boundary','Đặt ranh giới công việc','Nhân viên nhận tin nhắn công việc đến tận đêm.','Chọn ranh giới thực tế và cách truyền đạt.',[
      ['Mình cứ kiểm tra tin nhắn công việc sau mười giờ tối.','I keep checking work messages after ten at night.','Bạn có thật sự phải phản hồi ngoài giờ không?','Are you actually required to respond outside working hours?',['outside working hours','ngoài giờ làm']],
      ['Không, nhưng mình lo bỏ lỡ việc khẩn.','No, but I worry that I will miss something urgent.','Bạn có thể tắt thông báo và cho nhóm số gọi khi có khẩn cấp.','You could mute notifications and give the team a number for real emergencies.',['mute notifications','tắt thông báo']],
      ['Mình sẽ nói rõ rằng tin nhắn thường được trả lời sáng hôm sau.','I\'ll make it clear that routine messages will be answered the next morning.','Một ranh giới nhất quán sẽ giúp mọi người điều chỉnh kỳ vọng.','A consistent boundary will help everyone adjust their expectations.',['consistent boundary','ranh giới nhất quán']],
    ]],
    ['Seeking Professional Support','Tìm hỗ trợ chuyên môn','Một người cân nhắc gặp chuyên gia sau nhiều tuần khó ngủ.','Giảm kỳ thị và chọn bước đầu an toàn.',[
      ['Tình trạng lo âu đã ảnh hưởng giấc ngủ gần một tháng.','The anxiety has been affecting my sleep for almost a month.','Bạn đã cân nhắc nói chuyện với bác sĩ hoặc chuyên gia tư vấn chưa?','Have you considered speaking with a doctor or counsellor?',['counsellor','chuyên gia tư vấn']],
      ['Mình lo vấn đề chưa đủ nghiêm trọng để tìm giúp đỡ.','I worry that the problem is not serious enough to seek help.','Bạn không cần chờ đến khủng hoảng mới được hỗ trợ.','You do not have to wait for a crisis before getting support.',['seek help','tìm sự giúp đỡ']],
      ['Mình sẽ bắt đầu bằng cách đặt hẹn với bác sĩ gia đình.','I\'ll start by booking an appointment with my family doctor.','Đó là bước đầu hợp lý, và bạn có thể ghi lại triệu chứng trước.','That is a sensible first step, and you can note your symptoms beforehand.',['first step','bước đầu tiên']],
    ]],
    ['Supporting a Friend From Afar','Hỗ trợ bạn từ xa','Một người bạn ở thành phố khác vừa trải qua tuần khó khăn.','Đề nghị hỗ trợ cụ thể mà không tạo áp lực.',[
      ['Ước gì mình ở gần để giúp bạn trực tiếp.','I wish I lived closer so I could help in person.','Việc bạn gọi điện đều đã có ý nghĩa với mình rồi.','Your regular calls already mean a great deal to me.',['mean a great deal','có ý nghĩa rất lớn']],
      ['Bạn muốn mình gọi mỗi tối hay cho bạn thêm không gian?','Would you prefer a call each evening or a little more space?','Có lẽ hai ngày một lần sẽ giúp mà không khiến mình quá tải.','Every other day would probably help without feeling overwhelming.',['every other day','cách một ngày']],
      ['Mình cũng có thể đặt đồ ăn gửi đến vào ngày bạn bận.','I can also arrange a meal delivery on your busiest day.','Cảm ơn; một bữa tối thứ Tư sẽ giúp mình rất nhiều.','Thank you. Dinner on Wednesday would help a lot.',['practical support','sự hỗ trợ thiết thực']],
    ]],
  ]}),
  t({id:'building-a-remote-work-routine',title:'Building a Remote-work Routine',titleVi:'Xây dựng nếp làm việc từ xa',category:'Work',icon:'🏡',level:'B1',description:'Thiết kế lịch, giảm xao nhãng và duy trì kết nối nhóm.',grammar:['present-perfect-continuous','time-clauses','conditionals'],scenarios:[
    ['Starting the Day Consistently','Bắt đầu ngày làm việc đều đặn','Nhân viên làm ở nhà nhưng bắt đầu mỗi ngày quá muộn.','Tạo tín hiệu bắt đầu và ưu tiên đầu ngày.',[
      ['Mình thường mở máy mà chưa biết bắt đầu từ việc nào.','I often open my laptop without knowing what to start with.','Hãy chọn ba ưu tiên vào cuối ngày hôm trước.','Choose three priorities at the end of the previous day.',['daily priority','ưu tiên trong ngày']],
      ['Mình cũng dễ làm việc nhà trước rồi trễ giờ.','I also get distracted by chores and start work late.','Một chuyến đi bộ ngắn có thể đóng vai trò như quãng đường đi làm.','A short walk could act as a commute.',['act as a commute','đóng vai trò như quãng đường đi làm']],
      ['Khi về từ buổi đi bộ, mình sẽ ngồi thẳng vào bàn.','When I return from the walk, I\'ll go directly to my desk.','Lặp lại tín hiệu đó sẽ giúp giờ bắt đầu ổn định hơn.','Repeating that cue should make your start time more consistent.',['routine cue','tín hiệu tạo thói quen']],
    ]],
    ['Reducing Home Distractions','Giảm xao nhãng ở nhà','Tiếng ồn và việc nhà làm gián đoạn tập trung.','Thiết lập không gian và khoảng tập trung.',[
      ['Mình bị ngắt quãng mỗi khi người nhà đi qua phòng khách.','I get interrupted whenever my family walks through the living room.','Bạn có thể dùng phòng ngủ cho các khung tập trung không?','Could you use the bedroom for focused work blocks?',['focused work block','khoảng làm việc tập trung']],
      ['Có, nhưng bàn ở đó khá nhỏ.','Yes, although the desk there is rather small.','Chỉ mang laptop và đồ cần cho một nhiệm vụ vào đó.','Take only the laptop and what you need for one task.',['one task at a time','một việc tại một thời điểm']],
      ['Mình sẽ treo biển trong lúc gọi với khách hàng.','I\'ll put up a sign during client calls.','Như vậy người nhà biết lúc nào không nên làm phiền.','That will show your family when you should not be disturbed.',['do not disturb','không làm phiền']],
    ]],
    ['Staying Connected to the Team','Duy trì kết nối với nhóm','Nhân viên từ xa thấy bỏ lỡ trao đổi không chính thức.','Tạo điểm kết nối có mục đích mà không tăng họp quá mức.',[
      ['Mình thường biết quyết định sau những người ở văn phòng.','I often hear about decisions later than colleagues in the office.','Có vẻ thông tin đang được chia sẻ trong các cuộc nói chuyện không chính thức.','It sounds as though information is being shared in informal conversations.',['informal conversation','trao đổi không chính thức']],
      ['Mình không muốn giải pháp lại là thêm nhiều cuộc họp.','I do not want the solution to be more meetings.','Nhóm có thể ghi quyết định ngắn vào một kênh chung.','The team could post short decision notes in a shared channel.',['decision note','ghi chú quyết định']],
      ['Mình cũng sẽ tham gia một buổi cà phê online mỗi tuần.','I\'ll also join one virtual coffee each week.','Cách đó tạo kết nối xã hội mà không chiếm mọi ngày.','That provides social contact without filling every day.',['virtual coffee','buổi trò chuyện online không chính thức']],
    ]],
  ]}),
  t({id:'booking-event-tickets',title:'Booking Event Tickets',titleVi:'Đặt vé sự kiện',category:'Entertainment',icon:'🎟️',level:'B1',description:'Chọn hạng vé, xử lý lỗi thanh toán và chuyển nhượng vé.',grammar:['conditionals','present-perfect','passive-voice'],scenarios:[
    ['Comparing Ticket Sections','So sánh khu vực ghế','Hai người chọn chỗ cho buổi hòa nhạc.','Cân bằng tầm nhìn, âm thanh và giá.',[
      ['Khu đứng gần sân khấu rẻ hơn hàng ghế giữa.','The standing section near the stage is cheaper than the central seats.','Nhưng mình không muốn đứng suốt ba tiếng.','But I do not want to stand for three hours.',['standing section','khu vực đứng']],
      ['Ghế bên hông còn trống và có tầm nhìn khá rõ.','Side seats are still available and have a fairly clear view.','Chúng có bị loa che không?','Are any of them obstructed by the speakers?',['obstructed view','tầm nhìn bị che']],
      ['Trang vé đánh dấu hàng G là không bị hạn chế tầm nhìn.','The ticket page marks row G as having an unrestricted view.','Vậy chọn hai ghế gần lối đi ở hàng đó.','Then choose two seats near the aisle in that row.',['unrestricted view','tầm nhìn không bị che']],
    ]],
    ['A Payment Timed Out','Thanh toán hết thời gian','Trang bán vé treo khi khách vừa xác nhận thẻ.','Tránh mua trùng và kiểm tra trạng thái đơn.',[
      ['Trang báo hết thời gian chờ sau khi mình xác nhận thanh toán.','The page timed out after I confirmed the payment.','Tài khoản ngân hàng đã trừ tiền chưa?','Has the money left your bank account?',['time out','hết thời gian chờ']],
      ['Chưa, nhưng hai ghế vẫn hiện đang được giữ.','Not yet, but the two seats still appear to be reserved.','Đừng thử thanh toán lại cho đến khi kiểm tra email xác nhận.','Do not try again until we check for a confirmation email.',['confirmation email','email xác nhận']],
      ['Không có email và mục đơn hàng cũng trống.','There is no email, and the orders page is empty.','Vậy đợi thời gian giữ ghế hết rồi đặt lại một lần.','Then wait for the seat hold to expire before making one new attempt.',['seat hold','thời gian giữ ghế']],
    ]],
    ['Transferring a Ticket','Chuyển vé cho người khác','Một thành viên không thể tham dự và muốn chuyển vé.','Thực hiện chuyển nhượng chính thức và tránh lừa đảo.',[
      ['Huy không thể đi nữa; mình gửi ảnh mã QR cho người khác được không?','Huy cannot attend. Can we send someone else a screenshot of his QR code?','Tốt hơn là dùng chức năng chuyển vé chính thức.','It is safer to use the official ticket-transfer feature.',['ticket transfer','việc chuyển nhượng vé']],
      ['Người nhận cần có tài khoản trên nền tảng à?','Does the recipient need an account on the platform?','Có, vé mới chỉ xuất hiện sau khi họ chấp nhận qua email.','Yes. The new ticket appears only after they accept it by email.',['recipient account','tài khoản người nhận']],
      ['Mã cũ của Huy sẽ bị vô hiệu phải không?','Will Huy\'s old code be invalidated?','Đúng, hệ thống cấp mã mới để không thể dùng cả hai.','Yes. The system issues a new code so both cannot be used.',['invalidate a code','làm mã mất hiệu lực']],
    ]],
  ]}),
  t({id:'giving-constructive-feedback',title:'Giving Constructive Feedback',titleVi:'Đưa phản hồi mang tính xây dựng',category:'Work',icon:'🗨️',level:'B2',description:'Đưa phản hồi cụ thể, lắng nghe phản ứng và thống nhất thay đổi.',grammar:['discourse-markers','advanced-modals','nuanced-polite-language'],scenarios:[
    ['Feedback on a Presentation','Phản hồi bài thuyết trình','Quản lý góp ý về bài trình bày nhiều dữ liệu nhưng thiếu trọng tâm.','Nêu quan sát, tác động và đề xuất có thể hành động.',[
      ['Bài trình bày cho thấy bạn nghiên cứu rất kỹ.','The presentation clearly showed the depth of your research.','Cảm ơn; phần nào bạn nghĩ cần cải thiện nhất?','Thank you. Which part do you think needs the most improvement?',['depth of research','độ sâu nghiên cứu']],
      ['Thông điệp chính bị chìm giữa quá nhiều số liệu chi tiết.','The central message was obscured by the amount of detailed data.','Vậy mình nên bỏ bớt biểu đồ hay thay đổi cấu trúc?','Should I remove some charts or change the structure?',['central message','thông điệp chính']],
      ['Hãy mở đầu bằng quyết định bạn cần, rồi dùng ba biểu đồ làm bằng chứng.','Lead with the decision you need, then use three charts as evidence.','Cách đó sẽ giúp khán giả hiểu mục đích ngay từ đầu.','That should help the audience understand the purpose immediately.',['lead with','mở đầu bằng điều quan trọng']],
    ]],
    ['Responding Without Defensiveness','Phản hồi mà không phòng thủ','Nhân viên bất ngờ trước góp ý về cách giao tiếp.','Làm rõ ví dụ và tách ý định khỏi tác động.',[
      ['Một số đồng nghiệp thấy cách bạn phản hồi trong chat khá cụt.','Several colleagues experience your responses in chat as abrupt.','Mình không định thiếu lịch sự; mình chỉ cố trả lời nhanh.','I did not intend to be rude; I was trying to respond quickly.',['come across as abrupt','tạo cảm giác cụt lủn']],
      ['Tôi tin ý định đó, nhưng tác động vẫn khiến họ ngại hỏi.','I believe that intention, but the impact still makes them reluctant to ask.','Bạn có thể chỉ cho mình một ví dụ cụ thể không?','Could you show me a specific example?',['reluctant to ask','ngại đặt câu hỏi']],
      ['Trong câu này, chỉ thêm lý do và lời mời trao đổi sẽ tạo khác biệt.','In this message, adding a reason and an invitation to discuss would make a difference.','Mình hiểu; mình sẽ đọc lại tin nhắn trước khi gửi khi đang vội.','I see. I\'ll review messages before sending them when I am rushed.',['make a difference','tạo ra khác biệt']],
    ]],
    ['Following Up on Change','Theo dõi sự thay đổi','Hai người xem lại tiến bộ sau một tháng áp dụng phản hồi.','Đánh giá bằng ví dụ và điều chỉnh mục tiêu tiếp.',[
      ['Tháng này bạn đã tóm tắt quyết định rõ ràng hơn sau mỗi cuộc họp.','This month you have summarized decisions more clearly after each meeting.','Mình đã dùng mẫu ba dòng và thấy ít câu hỏi lặp lại hơn.','I have been using a three-line template and have noticed fewer repeated questions.',['follow-up summary','bản tóm tắt sau cuộc họp']],
      ['Đó là bằng chứng tốt cho thấy thay đổi đang có tác dụng.','That is good evidence that the change is working.','Mình vẫn gặp khó khi cuộc họp kết thúc mà chưa có quyết định.','I still struggle when a meeting ends without a clear decision.',['clear decision','quyết định rõ ràng']],
      ['Khi đó hãy ghi rõ điều còn mở và người chịu trách nhiệm chốt.','In that case, explicitly record what remains open and who owns the decision.','Mình sẽ thêm mục “chưa giải quyết” vào mẫu hiện tại.','I\'ll add an “unresolved” section to the current format.',['remain open','vẫn chưa được giải quyết']],
    ]],
  ]}),
  t({id:'negotiating-a-rent-renewal',title:'Negotiating a Rent Renewal',titleVi:'Thương lượng gia hạn thuê nhà',category:'Home',icon:'📝',level:'B2',description:'Đánh giá mức tăng, thương lượng điều khoản và ghi nhận thỏa thuận.',grammar:['conditionals','complex-clauses','nuanced-polite-language'],scenarios:[
    ['Questioning a Rent Increase','Hỏi về mức tăng tiền thuê','Chủ nhà đề xuất tăng giá cao hơn thị trường khu vực.','Yêu cầu cơ sở và đưa dữ liệu so sánh.',[
      ['Thông báo đề xuất tăng tiền thuê mười hai phần trăm.','The notice proposes a twelve-percent rent increase.','Chi phí bảo trì và phí quản lý tòa nhà đều đã tăng.','Maintenance costs and building charges have both risen.',['rent increase','mức tăng tiền thuê']],
      ['Tôi hiểu chi phí tăng, nhưng các căn tương tự chỉ tăng khoảng sáu phần trăm.','I appreciate that costs have risen, but comparable flats have increased by about six percent.','Bạn có thể gửi các tin đăng mà bạn đang so sánh không?','Could you send me the listings you are using for comparison?',['comparable flat','căn hộ tương đương']],
      ['Có, và tôi cũng đã thuê ổn định ba năm mà không chậm tiền.','Yes. I have also been a reliable tenant for three years without a late payment.','Lịch sử đó chắc chắn sẽ được cân nhắc trong mức giá cuối.','That record will certainly be considered in the final figure.',['reliable tenant','người thuê đáng tin cậy']],
    ]],
    ['Trading Term for Price','Đổi thời hạn lấy mức giá','Người thuê đề nghị hợp đồng dài hơn để giảm mức tăng.','Tạo trao đổi có lợi cho cả hai bên.',[
      ['Nếu tôi ký thêm hai năm, ông có thể giữ mức tăng ở sáu phần trăm không?','If I committed to another two years, could you limit the increase to six percent?','Thời hạn dài hơn sẽ giảm rủi ro phòng bị trống cho tôi.','A longer term would reduce my risk of the flat being vacant.',['longer term','thời hạn dài hơn']],
      ['Đổi lại, tôi cần điều khoản cho phép chuyển công tác sau năm đầu.','In return, I would need a clause allowing relocation after the first year.','Tôi có thể chấp nhận nếu bạn báo trước ba tháng.','I could agree, provided you gave three months\' notice.',['relocation clause','điều khoản chuyển nơi ở']],
      ['Vậy sáu phần trăm, hợp đồng hai năm và điều khoản báo trước ba tháng.','Then six percent, a two-year lease, and a three-month relocation notice.','Đúng, với điều kiện không có phí chấm dứt thêm.','Correct, with no additional termination fee.',['termination fee','phí chấm dứt hợp đồng']],
    ]],
    ['Confirming Repairs in the Renewal','Xác nhận sửa chữa khi gia hạn','Người thuê muốn đưa các hạng mục sửa đã hứa vào hợp đồng mới.','Chuyển cam kết miệng thành lịch rõ ràng.',[
      ['Trước khi ký, tôi muốn xác nhận việc xử lý cửa sổ bị dột.','Before signing, I would like to confirm the repair to the leaking window.','Nhà thầu đã được đặt lịch trong tuần thứ hai của tháng tới.','The contractor has been scheduled for the second week of next month.',['leaking window','cửa sổ bị dột']],
      ['Cam kết đó có thể được ghi trong phụ lục hợp đồng không?','Could that commitment be included in a lease addendum?','Có, tôi sẽ ghi phạm vi sửa và ngày hoàn thành mục tiêu.','Yes. I\'ll state the repair scope and target completion date.',['lease addendum','phụ lục hợp đồng thuê']],
      ['Nếu thời tiết làm chậm lịch, tôi cần được thông báo bằng văn bản.','If weather delays the work, I need to be notified in writing.','Hợp lý; phụ lục sẽ yêu cầu cập nhật trong vòng hai ngày làm việc.','That is reasonable. The addendum will require an update within two business days.',['target completion date','ngày hoàn thành mục tiêu']],
    ]],
  ]}),
];
