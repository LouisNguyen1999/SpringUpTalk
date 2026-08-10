import { scaleTopic as t } from './scale-builder';

export const batchCCoreTopics = [
  t({id:'talking-about-the-weather',title:'Talking About the Weather',titleVi:'Nói về thời tiết',category:'Daily Life',icon:'🌤️',level:'A1',description:'Hỏi thời tiết, chọn trang phục và đổi kế hoạch.',grammar:['present-simple','be-going-to','should'],scenarios:[
    ['A Rainy Morning','Buổi sáng có mưa','Hai người chuẩn bị rời nhà khi trời chuyển mưa.','Mô tả thời tiết và mang đồ phù hợp.',[
      ['Ngoài trời đang mưa phải không?','Is it raining outside?','Có, mưa khá to và có gió.','Yes. It is raining quite heavily, and it is windy.',['windy','có gió']],
      ['Mình nên mang ô hay áo mưa?','Should I take an umbrella or a raincoat?','Hãy mang áo mưa vì bạn đi xe máy.','Take a raincoat because you are riding a motorbike.',['raincoat','áo mưa']],
      ['Giày này có bị ướt không nhỉ?','Will these shoes get wet?','Có lẽ có, bạn nên đi đôi chống nước.','Probably. You should wear your waterproof pair.',['waterproof shoes','giày chống nước']],
      ['Mình sẽ đi sớm hơn vì đường có thể chậm.','I\'ll leave earlier because the roads may be slow.','Nhớ đi cẩn thận và nhắn khi bạn đến.','Ride carefully, and message me when you arrive.',['leave earlier','đi sớm hơn']],
    ]],
    ['A Hot Afternoon','Buổi chiều nóng','Hai đồng nghiệp chọn nơi ăn trưa trong ngày nóng.','Nói nhiệt độ và chọn nơi mát.',[
      ['Hôm nay nóng hơn hôm qua nhiều.','It is much hotter today than yesterday.','Đúng, nhiệt độ gần ba mươi tám độ.','Yes. The temperature is nearly thirty-eight degrees.',['temperature','nhiệt độ']],
      ['Mình đi bộ đến quán cũ chứ?','Shall we walk to the usual restaurant?','Quán đó hơi xa; mình chọn chỗ có điều hòa gần đây.','It is rather far. Let\'s choose somewhere nearby with air conditioning.',['air conditioning','điều hòa không khí']],
      ['Nhớ mang theo chai nước nhé.','Remember to bring a bottle of water.','Ừ, mình không muốn bị mất nước.','Yes. I do not want to get dehydrated.',['bottle of water','chai nước']],
    ]],
    ['Changing a Picnic Plan','Đổi kế hoạch dã ngoại','Dự báo có giông đúng giờ đi công viên.','Đổi sang hoạt động trong nhà.',[
      ['Chiều mai có còn đi dã ngoại không?','Are we still having the picnic tomorrow afternoon?','Dự báo nói có giông từ ba giờ.','The forecast says there will be thunderstorms from three o\'clock.',['thunderstorm','giông bão']],
      ['Vậy công viên sẽ không an toàn.','Then the park will not be safe.','Mình có thể gặp ở trung tâm thương mại thay thế.','We can meet at the shopping centre instead.',['instead','thay vào đó']],
      ['Mình sẽ báo thay đổi trong nhóm.','I\'ll tell the group about the change.','Tốt, cuối tuần sau trời đẹp thì mình đi công viên.','Good. We can try the park next weekend if the weather is fine.',['fine weather','thời tiết đẹp']],
    ]],
  ]}),
  t({id:'taking-care-of-a-pet',title:'Taking Care of a Pet',titleVi:'Chăm sóc thú cưng',category:'Family',icon:'🐕',level:'A1',description:'Cho ăn, dắt đi và nhờ trông thú cưng.',grammar:['present-simple','have-to','frequency'],scenarios:[
    ['Feeding the Dog','Cho chó ăn','Một người hướng dẫn em nhỏ cho chó ăn.','Nói khẩu phần và giờ ăn.',[
      ['Bông ăn vào lúc mấy giờ?','What time does Bong eat?','Nó ăn lúc bảy giờ sáng và sáu giờ tối.','She eats at seven in the morning and six in the evening.',['twice a day','hai lần một ngày']],
      ['Mỗi bữa cho nó bao nhiêu thức ăn?','How much food does she get at each meal?','Cho một cốc thức ăn khô vào bát.','Put one cup of dry food in her bowl.',['dry food','thức ăn khô']],
      ['Mình có thể cho nó xúc xích không?','Can I give her some sausage?','Không, hãy chỉ dùng đồ ăn dành cho chó.','No. Only give her food made for dogs.',['pet food','thức ăn thú cưng']],
      ['Sau đó mình thay nước trong bát nhé.','I\'ll change the water in her bowl afterward.','Đúng rồi, nước sạch phải luôn có sẵn.','That\'s right. Fresh water must always be available.',['fresh water','nước sạch']],
    ]],
    ['Walking in the Park','Dắt chó trong công viên','Hai người đưa chó đi dạo buổi tối.','Chuẩn bị dây dắt và giữ an toàn.',[
      ['Dây dắt của Bông ở đâu?','Where is Bong\'s lead?','Nó treo cạnh cửa cùng với túi đựng rác.','It is hanging by the door with the waste bags.',['lead','dây dắt chó']],
      ['Trong công viên mình có thể thả nó không?','Can we let her off the lead in the park?','Không, khu này yêu cầu luôn giữ chó bằng dây.','No. This area requires dogs to stay on a lead.',['stay on a lead','luôn được giữ bằng dây']],
      ['Mình sẽ mang theo một ít bánh thưởng.','I\'ll bring a few treats.','Tốt, dùng chúng khi gọi nó quay lại.','Good. Use them when you call her back.',['pet treat','bánh thưởng thú cưng']],
    ]],
    ['Asking a Friend to Pet-sit','Nhờ bạn trông thú cưng','Chủ chó đi vắng một đêm và nhờ bạn hỗ trợ.','Hỏi khả năng và bàn giao chìa khóa.',[
      ['Tối thứ Sáu bạn có thể trông Bông giúp mình không?','Could you look after Bong on Friday evening?','Được, bạn về vào lúc nào thứ Bảy?','Sure. What time will you return on Saturday?',['look after a pet','trông thú cưng']],
      ['Mình sẽ về trước bữa trưa.','I\'ll be back before lunch.','Vậy mình sẽ cho nó ăn tối và sáng hôm sau.','Then I\'ll feed her in the evening and the next morning.',['feed a pet','cho thú cưng ăn']],
      ['Mình đưa chìa khóa cho bạn vào ngày mai nhé.','I\'ll give you the key tomorrow.','Nhớ viết số bác sĩ thú y để phòng khi cần.','Remember to write down the vet\'s number just in case.',['vet','bác sĩ thú y']],
    ]],
  ]}),
  t({id:'at-the-playground',title:'At the Playground',titleVi:'Ở sân chơi',category:'Community',icon:'🛝',level:'A1',description:'Xin chơi cùng, thay phiên và xử lý va chạm nhỏ.',grammar:['can','imperatives','possessives'],scenarios:[
    ['Joining a Game','Xin chơi cùng','Một em nhỏ muốn tham gia trò ném bóng.','Xin phép và hiểu luật đơn giản.',[
      ['Mình chơi cùng các bạn được không?','Can I play with you?','Được, bạn đứng cùng đội màu xanh nhé.','Yes. You can join the blue team.',['join a team','tham gia một đội']],
      ['Mình phải ném bóng vào đâu?','Where do I throw the ball?','Hãy ném qua vạch trắng cho đồng đội.','Throw it across the white line to your teammate.',['white line','vạch trắng']],
      ['Nếu bóng chạm đất thì sao?','What happens if the ball touches the ground?','Đội kia sẽ được một điểm.','The other team gets one point.',['score a point','ghi một điểm']],
      ['Mình hiểu rồi, ai bắt đầu trước?','I understand. Who starts first?','Đội bạn bắt đầu vì đội mình vừa thắng lượt trước.','Your team starts because ours won the last round.',['last round','lượt trước']],
    ]],
    ['Taking Turns on the Slide','Thay phiên chơi cầu trượt','Hai trẻ cùng muốn dùng cầu trượt.','Xếp hàng và chờ đến lượt.',[
      ['Mình đang chờ cầu trượt trước mà.','I was waiting for the slide first.','Xin lỗi, mình không thấy bạn đang xếp hàng.','Sorry. I did not see you in the queue.',['queue','hàng chờ']],
      ['Bạn có thể đi sau mình nhé.','You can go after me.','Được, rồi em mình sẽ đi sau mình.','Okay. Then my little brother can go after me.',['take turns','thay phiên']],
      ['Đừng leo lên từ phía dưới nhé.','Do not climb up from the bottom.','Ừ, mình sẽ dùng thang bên cạnh.','Okay. I\'ll use the steps at the side.',['climb up','leo lên']],
    ]],
    ['A Scraped Knee','Trầy đầu gối','Một em nhỏ ngã khi chạy trên sân.','Kiểm tra vết thương và tìm người lớn.',[
      ['Bạn có đứng dậy được không?','Can you stand up?','Được, nhưng đầu gối mình bị trầy.','Yes, but I have scraped my knee.',['scrape a knee','làm trầy đầu gối']],
      ['Máu chảy nhiều không?','Is it bleeding a lot?','Không nhiều, nhưng vết thương có đất.','Not much, but there is dirt in the cut.',['cut','vết cắt/trầy']],
      ['Mình đi tìm bố mẹ bạn nhé.','I\'ll go and find your parents.','Cảm ơn, họ đang ngồi gần cổng.','Thank you. They are sitting near the gate.',['near the gate','gần cổng']],
    ]],
  ]}),
  t({id:'making-a-basic-phone-call',title:'Making a Basic Phone Call',titleVi:'Gọi điện thoại cơ bản',category:'Communication',icon:'📞',level:'A1',description:'Giới thiệu khi gọi, xin gặp người và để lại lời nhắn.',grammar:['can-could','present-simple','object-pronouns'],scenarios:[
    ['Calling a Friend','Gọi cho bạn','Một người gọi để xác nhận giờ gặp.','Chào, kiểm tra người nghe và xác nhận lịch.',[
      ['A lô, mình có đang nói chuyện với Mai không?','Hello. Am I speaking to Mai?','Đúng, Mai nghe đây. Ai vậy?','Yes, this is Mai. Who is calling?',['speaking to','đang nói chuyện với']],
      ['Mình là Lan. Mình gọi về buổi học tối nay.','It is Lan. I\'m calling about our study session tonight.','À chào Lan, mình vẫn gặp lúc bảy giờ nhé.','Hi, Lan. Yes, we are still meeting at seven.',['call about','gọi về việc gì']],
      ['Mình mang sách bài tập đến nhà bạn chứ?','Shall I bring the workbook to your house?','Có, và hãy gọi mình khi bạn đến cổng.','Yes, and call me when you reach the gate.',['reach the gate','đến cổng']],
    ]],
    ['Asking for Someone','Xin gặp một người','Khách gọi đến cửa hàng để gặp quản lý.','Xin chuyển máy và biết người cần gặp vắng mặt.',[
      ['Tôi có thể nói chuyện với quản lý được không?','Could I speak to the manager, please?','Chị ấy đang họp; bạn có thể gọi lại sau ba giờ.','She is in a meeting. You can call back after three.',['call back','gọi lại']],
      ['Tôi có thể để lại tên không?','Can I leave my name?','Được, vui lòng cho tôi tên và số điện thoại.','Certainly. Please give me your name and phone number.',['leave your name','để lại tên']],
      ['Tôi là Hùng, số kết thúc bằng 562.','This is Hung, and my number ends in 562.','Tôi sẽ nhờ chị ấy gọi cho bạn khi họp xong.','I\'ll ask her to call you when the meeting finishes.',['phone number ends in','số điện thoại kết thúc bằng']],
    ]],
    ['Leaving a Voicemail','Để lại thư thoại','Cuộc gọi không được trả lời và chuyển sang hộp thư.','Để lại lời nhắn ngắn có mục đích và liên hệ.',[
      ['Chào Minh, mình là Phương từ lớp tiếng Anh.','Hi, Minh. This is Phuong from your English class.','Mình gọi để hỏi về bài tập ngày mai.','I\'m calling to ask about tomorrow\'s homework.',['voicemail','thư thoại']],
      ['Khi nghe được, bạn gọi lại cho mình nhé.','Please call me back when you get this message.','Số của mình có trong nhóm lớp rồi.','My number is already in the class group.',['get a message','nhận/nghe được tin nhắn']],
      ['Cảm ơn, nói chuyện với bạn sau.','Thanks. I\'ll speak to you later.','Tút một tiếng sau khi ghi âm xong.','A tone sounds after the recording ends.',['recording','bản ghi âm']],
    ]],
    ['Returning a Missed Call','Gọi lại cuộc gọi nhỡ','Một người thấy cuộc gọi nhỡ từ số quen.','Gọi lại và xác nhận thời điểm thuận tiện.',[
      ['Chào An, mình vừa thấy cuộc gọi nhỡ của bạn.','Hi, An. I just saw your missed call.','Cảm ơn đã gọi lại; lúc này bạn nói chuyện được không?','Thanks for calling back. Is now a good time to talk?',['missed call','cuộc gọi nhỡ']],
      ['Mình có khoảng năm phút trước khi vào lớp.','I have about five minutes before my class starts.','Mình chỉ cần hỏi địa chỉ bữa tiệc ngày mai.','I only need to ask for tomorrow\'s party address.',['good time to talk','thời điểm thuận tiện để nói chuyện']],
      ['Mình sẽ nhắn địa chỉ ngay sau cuộc gọi.','I\'ll text you the address as soon as we hang up.','Tuyệt, như vậy mình có thể lưu vào bản đồ.','Perfect. Then I can save it in my map.',['hang up','kết thúc cuộc gọi']],
    ]],
  ]}),
  t({id:'cooking-with-family',title:'Cooking With Family',titleVi:'Nấu ăn cùng gia đình',category:'Family',icon:'🥘',level:'A2',description:'Chia bước nấu, thay nguyên liệu và phục vụ đúng giờ.',grammar:['imperatives','time-clauses','much-many'],scenarios:[
    ['Dividing the Kitchen Tasks','Chia việc trong bếp','Ba người cùng chuẩn bị bữa tối.','Phân công việc theo kỹ năng và thời gian.',[
      ['Ai sẽ rửa và cắt rau?','Who is going to wash and chop the vegetables?','Con làm được, nhưng con chưa biết thái hành.','I can do it, but I do not know how to slice onions.',['slice onions','thái hành']],
      ['Bố sẽ làm hành; con gọt cà rốt nhé.','Dad will handle the onions. You can peel the carrots.','Còn mẹ sẽ ướp thịt trong lúc đó.','Mum will marinate the meat in the meantime.',['peel carrots','gọt cà rốt']],
      ['Nồi cơm đã được bật chưa?','Has the rice cooker been switched on?','Chưa, con sẽ vo gạo và bật ngay.','Not yet. I\'ll rinse the rice and switch it on now.',['rinse rice','vo gạo']],
      ['Mỗi người làm một phần thì sẽ kịp giờ.','We will finish on time if everyone handles one task.','Đúng, bữa tối có thể sẵn sàng trước bảy giờ.','Right. Dinner can be ready before seven.',['handle a task','đảm nhận một việc']],
    ]],
    ['Replacing a Missing Ingredient','Thay nguyên liệu thiếu','Gia đình phát hiện hết nước cốt dừa giữa lúc nấu.','Chọn nguyên liệu thay thế phù hợp.',[
      ['Công thức cần một lon nước cốt dừa nhưng nhà mình hết rồi.','The recipe calls for a can of coconut milk, but we have run out.','Mình có thể dùng sữa tươi không?','Could we use regular milk instead?',['call for','cần một nguyên liệu']],
      ['Món sẽ loãng hơn và không có vị dừa.','The dish would be thinner and would not have the coconut flavour.','Hay mình dùng kem cùng một ít dừa nạo.','We could use cream with a little grated coconut.',['grated coconut','dừa nạo']],
      ['Cách đó hợp lý, nhưng giảm lượng kem để món không quá béo.','That should work, but use less cream so it is not too rich.','Mình sẽ thêm từng ít một rồi nếm.','I\'ll add it gradually and taste as I go.',['gradually','từ từ từng ít']],
    ]],
    ['Getting Dinner Ready Together','Cùng hoàn thành bữa tối','Khách sắp đến nhưng món ăn chưa xong.','Ưu tiên bước cuối và giữ món nóng.',[
      ['Khách sẽ đến trong hai mươi phút.','The guests will arrive in twenty minutes.','Món canh đã xong nhưng cá vẫn đang nướng.','The soup is ready, but the fish is still in the oven.',['still in the oven','vẫn đang trong lò']],
      ['Mẹ giữ canh ấm, còn con dọn bàn nhé.','I\'ll keep the soup warm while you set the table.','Con cũng sẽ đặt nước và bát cho sáu người.','I\'ll put out water and bowls for six people too.',['set the table','dọn bàn ăn']],
      ['Khi cá chín, hãy để nó nghỉ năm phút.','When the fish is cooked, let it rest for five minutes.','Như vậy mọi món sẽ sẵn sàng cùng lúc.','That way, everything will be ready at the same time.',['let food rest','để món nghỉ sau khi nấu']],
    ]],
    ['Adjusting the Seasoning','Điều chỉnh gia vị','Cả nhà nếm món hầm trước khi dọn.','Mô tả vị và điều chỉnh từng bước.',[
      ['Món hầm hơi mặn phải không?','Does the stew taste a little too salty?','Đúng, chắc mình đã cho quá nhiều nước tương.','Yes. I may have added too much soy sauce.',['taste salty','có vị mặn']],
      ['Mình thêm nước dùng không muối để làm nhạt nhé.','Let\'s add some unsalted stock to dilute it.','Thêm nửa cốc trước rồi nếm lại.','Add half a cup first, then taste it again.',['unsalted stock','nước dùng không muối']],
      ['Bây giờ vị cân bằng hơn nhưng còn thiếu mùi thơm.','The flavour is more balanced now, but it needs more aroma.','Mình sẽ thêm rau thơm ngay trước khi dọn.','I\'ll add fresh herbs just before serving.',['balance the flavour','cân bằng hương vị']],
    ]],
  ]}),
  t({id:'joining-a-gym',title:'Joining a Gym',titleVi:'Đăng ký phòng tập',category:'Fitness',icon:'🏋️',level:'A2',description:'Tham quan phòng tập, chọn gói và đặt buổi hướng dẫn.',grammar:['comparatives','polite-questions','have-to'],scenarios:[
    ['Touring the Facilities','Tham quan cơ sở vật chất','Khách xem phòng tập trước khi đăng ký.','Hỏi khu tập, tủ đồ và giờ đông.',[
      ['Khu tập tạ nằm ở tầng nào?','Which floor is the weight-training area on?','Nó ở tầng hai, cạnh phòng tập nhóm.','It is on the second floor beside the group studio.',['weight-training area','khu tập tạ']],
      ['Phòng thay đồ có tủ khóa không?','Are there lockers in the changing room?','Có, bạn tự mang ổ khóa hoặc thuê ở quầy.','Yes. Bring your own padlock or rent one at reception.',['padlock','ổ khóa']],
      ['Buổi tối thường đông nhất lúc nào?','When is the gym busiest in the evening?','Khoảng sáu đến tám giờ, đặc biệt vào thứ Hai.','Between six and eight, especially on Mondays.',['busiest time','giờ đông nhất']],
      ['Tôi có thể thử một buổi trước khi đăng ký không?','Can I try one session before joining?','Có, vé dùng thử một ngày là một trăm nghìn.','Yes. A one-day trial pass costs one hundred thousand dong.',['trial pass','vé dùng thử']],
    ]],
    ['Comparing Memberships','So sánh gói hội viên','Khách cân nhắc gói tháng và gói năm.','Tính tổng chi phí và điều kiện hủy.',[
      ['Gói theo tháng đắt hơn bao nhiêu?','How much more expensive is the monthly plan?','Nó cao hơn ba trăm nghìn mỗi tháng nhưng không có cam kết dài hạn.','It costs three hundred thousand more per month but has no long-term commitment.',['monthly plan','gói theo tháng']],
      ['Gói năm có thể tạm dừng khi đi công tác không?','Can the annual plan be paused when I travel for work?','Bạn được tạm dừng tối đa hai tháng mỗi năm.','You may freeze it for up to two months per year.',['freeze a membership','tạm dừng gói hội viên']],
      ['Nếu chuyển nhà thì tôi hủy sớm được chứ?','Can I cancel early if I move house?','Được nếu địa chỉ mới cách mọi chi nhánh hơn ba mươi cây số.','Yes, if your new address is over thirty kilometres from every branch.',['cancel early','hủy trước hạn']],
    ]],
    ['A Fitness Induction','Buổi hướng dẫn tập đầu','Hội viên mới đặt buổi kiểm tra với huấn luyện viên.','Chia sẻ mục tiêu và giới hạn sức khỏe.',[
      ['Buổi hướng dẫn ban đầu gồm những gì?','What does the initial fitness induction include?','Huấn luyện viên sẽ hỏi mục tiêu và hướng dẫn dùng máy an toàn.','A trainer will discuss your goals and show you how to use the machines safely.',['fitness induction','buổi hướng dẫn ban đầu']],
      ['Tôi từng đau đầu gối nên muốn tránh bài nhảy.','I have had knee pain, so I want to avoid jumping exercises.','Hãy nói rõ điều đó để họ điều chỉnh bài tập.','Make that clear so they can adapt the exercises.',['adapt an exercise','điều chỉnh bài tập']],
      ['Tôi đặt buổi vào sáng thứ Tư được không?','Can I book the session for Wednesday morning?','Có, khung chín giờ vẫn còn trống.','Yes. The nine o\'clock appointment is still available.',['trainer appointment','lịch với huấn luyện viên']],
    ]],
  ]}),
  t({id:'working-on-a-school-project',title:'Working on a School Project',titleVi:'Làm dự án ở trường',category:'Education',icon:'🧪',level:'A2',description:'Chọn đề tài, chia nhiệm vụ và chuẩn bị thuyết trình.',grammar:['be-going-to','suggestions','present-perfect'],scenarios:[
    ['Choosing the Project Question','Chọn câu hỏi dự án','Nhóm học sinh cần thu hẹp đề tài môi trường.','Chọn câu hỏi cụ thể có thể nghiên cứu.',[
      ['Đề tài “ô nhiễm” quá rộng phải không?','Is the topic of pollution too broad?','Đúng, mình nên tập trung vào rác nhựa ở trường.','Yes. We should focus on plastic waste at our school.',['focus on','tập trung vào']],
      ['Mình có thể đo lượng chai nhựa trong một tuần.','We could measure the number of plastic bottles used in one week.','Rồi nhóm đề xuất cách giảm con số đó.','Then the group can suggest ways to reduce that number.',['measure','đo lường']],
      ['Câu hỏi dự án sẽ là trường mình dùng bao nhiêu chai nhựa.','Our project question will ask how many plastic bottles our school uses.','Cụ thể như vậy sẽ dễ thu thập dữ liệu hơn.','A specific question like that will make data collection easier.',['collect data','thu thập dữ liệu']],
      ['Mình gửi câu hỏi cho cô giáo duyệt nhé.','Let\'s send the question to our teacher for approval.','Được, sau đó nhóm mới bắt đầu khảo sát.','Okay. We will begin the survey after she approves it.',['survey','khảo sát']],
    ]],
    ['Dividing the Research','Chia việc nghiên cứu','Bốn thành viên phân công phần việc.','Giao nhiệm vụ rõ và đặt hạn nội bộ.',[
      ['Ai muốn thiết kế bảng khảo sát?','Who would like to design the survey form?','Mình làm được vì đã dùng công cụ đó trước đây.','I can do it because I have used that tool before.',['survey form','biểu mẫu khảo sát']],
      ['Hai bạn khác có thể đếm chai ở căng tin.','The other two can count bottles in the canteen.','Nhóm cần đếm cùng thời điểm mỗi ngày để số liệu nhất quán.','They need to count at the same time each day so the data is consistent.',['consistent data','dữ liệu nhất quán']],
      ['Mình sẽ tổng hợp kết quả vào thứ Năm.','I\'ll compile the results on Thursday.','Hãy gửi số liệu thô cho bạn trước tối thứ Tư.','Let\'s send you the raw figures by Wednesday evening.',['raw figures','số liệu thô']],
    ]],
    ['Rehearsing the Presentation','Luyện thuyết trình','Nhóm tập trình bày trước ngày nộp.','Điều chỉnh thời lượng và chuyển phần mượt.',[
      ['Lần tập vừa rồi dài gần mười hai phút.','Our last practice run lasted nearly twelve minutes.','Giới hạn chỉ tám phút nên mình cần cắt bớt.','The limit is eight minutes, so we need to shorten it.',['practice run','lần tập thử']],
      ['Phần phương pháp có quá nhiều chi tiết.','The methods section contains too much detail.','Mình giữ một ví dụ và đưa phần còn lại lên slide phụ.','Let\'s keep one example and move the rest to a backup slide.',['backup slide','slide dự phòng']],
      ['Ai sẽ chuyển từ kết quả sang đề xuất?','Who will transition from the results to the recommendations?','Mình sẽ làm và dùng câu nối đã ghi trong kịch bản.','I will, using the transition sentence in our script.',['transition sentence','câu chuyển ý']],
    ]],
  ]}),
  t({id:'repairing-a-car',title:'Repairing a Car',titleVi:'Sửa ô tô',category:'Transportation',icon:'🚗',level:'B1',description:'Mô tả lỗi, hiểu báo giá và duyệt sửa chữa.',grammar:['present-perfect-continuous','modals-of-deduction','passive-voice'],scenarios:[
    ['Describing an Unusual Noise','Mô tả tiếng động lạ','Tài xế đưa xe đến xưởng vì có tiếng kêu khi phanh.','Nêu điều kiện xuất hiện và thay đổi gần đây.',[
      ['Xe phát ra tiếng rít mỗi khi tôi phanh ở tốc độ thấp.','The car makes a squealing noise whenever I brake at low speed.','Hiện tượng đó đã xảy ra bao lâu rồi?','How long has that been happening?',['squealing noise','tiếng rít']],
      ['Khoảng một tuần, và hôm nay tiếng kêu lớn hơn.','About a week, and it became louder today.','Bàn đạp phanh có mềm hoặc rung không?','Does the brake pedal feel soft or vibrate?',['brake pedal','bàn đạp phanh']],
      ['Không mềm, nhưng vô lăng hơi rung khi xuống dốc.','It is not soft, but the steering wheel vibrates slightly downhill.','Chúng tôi sẽ kiểm tra má phanh và đĩa phanh trước.','We\'ll inspect the brake pads and discs first.',['brake pad','má phanh']],
    ]],
    ['Reviewing the Estimate','Xem báo giá sửa chữa','Xưởng phát hiện hai hạng mục cần xử lý.','Phân biệt việc khẩn với bảo dưỡng có thể chờ.',[
      ['Báo giá gồm thay má phanh và vệ sinh điều hòa.','The estimate includes replacing the brake pads and cleaning the air conditioning system.','Cả hai việc đều cần làm ngay sao?','Do both items need to be done immediately?',['repair estimate','báo giá sửa chữa']],
      ['Má phanh đã gần giới hạn an toàn nên không nên trì hoãn.','The brake pads are near the safety limit and should not be delayed.','Còn điều hòa chỉ có mùi nhẹ khi mới bật.','The air conditioning only smells slightly when first switched on.',['safety limit','giới hạn an toàn']],
      ['Vậy hãy làm phanh hôm nay và để điều hòa sang tháng sau.','Then do the brakes today and leave the air conditioning until next month.','Tôi sẽ cập nhật báo giá chỉ với phần đã duyệt.','I\'ll revise the estimate to include only the approved work.',['approved work','hạng mục được duyệt']],
    ]],
    ['Collecting the Car','Nhận xe sau sửa','Khách nhận xe và hỏi về phụ tùng cùng bảo hành.','Xác nhận công việc hoàn tất và chăm sóc sau sửa.',[
      ['Má phanh cũ có bị mòn đều không?','Were the old brake pads worn evenly?','Bên phải mòn nhiều hơn, nên chúng tôi đã kiểm tra cả kẹp phanh.','The right side was more worn, so we also checked the calliper.',['wear evenly','mòn đều']],
      ['Phụ tùng mới được bảo hành bao lâu?','How long are the new parts guaranteed for?','Má phanh có bảo hành mười hai tháng hoặc hai mươi nghìn cây số.','The pads are covered for twelve months or twenty thousand kilometres.',['parts warranty','bảo hành phụ tùng']],
      ['Tôi có cần chạy nhẹ trong vài ngày đầu không?','Do I need to drive gently for the first few days?','Có, tránh phanh gấp trong hai trăm cây số đầu nếu có thể.','Yes. Avoid hard braking for the first two hundred kilometres if possible.',['hard braking','phanh gấp']],
    ]],
  ]}),
];
