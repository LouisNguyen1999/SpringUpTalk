import { scaleTopic as t } from './scale-builder';

export const batchELifeTopics = [
  t({id:'waiting-at-a-bus-stop',title:'Waiting at a Bus Stop',titleVi:'Chờ ở trạm xe buýt',category:'Transportation',icon:'🚏',level:'A1',description:'Đọc tuyến xe, xếp hàng và lên đúng chuyến.',grammar:['present-simple','where-questions','imperatives'],scenarios:[
    ['Checking the Route','Kiểm tra tuyến xe','Hai người đứng trước bảng thông tin.','Xác nhận xe và điểm xuống.',[
      ['Xe số 12 có đi qua bệnh viện không?','Does bus number 12 go past the hospital?','Có, bệnh viện là điểm dừng thứ năm.','Yes. The hospital is the fifth stop.',['fifth stop','điểm dừng thứ năm']],
      ['Xe đi từ phía nào?','Which direction does the bus go from here?','Chúng ta cần xe đi về phía trung tâm.','We need the bus heading towards the city centre.',['heading towards','đi về phía']],
      ['Mất bao lâu để đến đó?','How long does it take to get there?','Chuyến đi mất khoảng hai mươi phút.','The journey takes about twenty minutes.',['journey time','thời gian di chuyển']],
    ]],
    ['Joining the Queue','Xếp hàng','Nhiều người đang chờ vào giờ cao điểm.','Xếp đúng hàng và chừa lối đi.',[
      ['Đây có phải cuối hàng không?','Is this the end of the queue?','Đúng, hàng bắt đầu gần cột biển.','Yes. The queue starts near the signpost.',['end of the queue','cuối hàng']],
      ['Mình đứng tránh lối xe đạp nhé.','Let us stand clear of the cycle lane.','Được, mình có thể đợi sát mái che.','Okay. We can wait beside the shelter.',['bus shelter','mái che trạm xe']],
      ['Người dùng xe lăn nên lên trước.','The wheelchair user should board first.','Mình sẽ lùi lại để chừa đủ chỗ.','I will step back to leave enough room.',['board first','lên xe trước']],
    ]],
    ['Boarding the Right Bus','Lên đúng xe','Hai xe đến gần như cùng lúc.','Kiểm tra số tuyến trước khi lên.',[
      ['Chiếc xe đang đến là số mấy?','What number is the bus that is approaching?','Đó là xe số 21, không phải xe của mình.','It is number 21, not our bus.',['approaching bus','xe đang đến']],
      ['Xe số 12 ở ngay phía sau.','Bus number 12 is directly behind it.','Mình hãy chuẩn bị thẻ xe buýt.','Let us get our travel cards ready.',['travel card','thẻ đi lại']],
      ['Mình có cần vẫy xe không?','Do we need to signal to the driver?','Có, hãy giơ tay để tài xế thấy.','Yes. Raise your hand so that the driver sees us.',['signal a bus','ra hiệu xe buýt']],
    ]],
  ]}),
  t({id:'using-a-public-restroom',title:'Using a Public Restroom',titleVi:'Dùng nhà vệ sinh công cộng',category:'Daily Life',icon:'🚻',level:'A1',description:'Tìm nhà vệ sinh, hỏi tiện nghi và báo vấn đề.',grammar:['is-there','can','prepositions'],scenarios:[
    ['Finding the Restroom','Tìm nhà vệ sinh','Khách hỏi nhân viên trong trung tâm thương mại.','Đi theo chỉ dẫn ngắn.',[
      ['Nhà vệ sinh gần nhất ở đâu?','Where is the nearest restroom?','Nó ở cuối hành lang bên phải.','It is at the end of the corridor on the right.',['nearest restroom','nhà vệ sinh gần nhất']],
      ['Nó có ở cùng tầng này không?','Is it on this floor?','Có, ngay sau cửa hàng giày.','Yes. It is just past the shoe shop.',['just past','ngay qua']],
      ['Có biển chỉ đường không?','Are there any direction signs?','Có, hãy đi theo biểu tượng màu xanh.','Yes. Follow the blue symbols.',['direction symbol','biểu tượng chỉ đường']],
    ]],
    ['Checking the Facilities','Hỏi tiện nghi','Một phụ huynh cần chỗ thay tã.','Tìm đúng phòng tiện ích.',[
      ['Ở đây có bàn thay tã không?','Is there a baby-changing table here?','Có một bàn trong phòng gia đình.','There is one in the family room.',['baby-changing table','bàn thay tã']],
      ['Phòng gia đình có khóa không?','Does the family room have a lock?','Có, và có đèn báo khi đang dùng.','Yes. A light shows when it is occupied.',['occupied light','đèn báo đang dùng']],
      ['Mình có thể mang xe đẩy vào không?','Can I take the pushchair inside?','Có, cửa đủ rộng cho xe đẩy.','Yes. The doorway is wide enough for it.',['wide doorway','cửa rộng']],
    ]],
    ['Reporting a Problem','Báo một vấn đề','Người dùng thấy vòi nước bị rò.','Báo vị trí cho nhân viên vệ sinh.',[
      ['Vòi nước bên trái đang bị rò.','The tap on the left is leaking.','Cảm ơn bạn đã báo cho tôi.','Thank you for letting me know.',['leaking tap','vòi nước bị rò']],
      ['Nước đang chảy xuống sàn.','Water is running onto the floor.','Tôi sẽ đặt biển cảnh báo ở đó ngay.','I will put a warning sign there now.',['warning sign','biển cảnh báo']],
      ['Nhà vệ sinh khác vẫn dùng được chứ?','Can the other restroom still be used?','Có, nó ở phía đối diện hành lang.','Yes. It is across the corridor.',['across the corridor','đối diện hành lang']],
    ]],
  ]}),
  t({id:'meeting-a-new-classmate',title:'Meeting a New Classmate',titleVi:'Làm quen bạn cùng lớp mới',category:'Education',icon:'👋',level:'A1',description:'Giới thiệu bản thân, hỏi về lớp và mời tham gia.',grammar:['be-questions','present-simple','can'],scenarios:[
    ['Saying Hello','Chào hỏi','Một học sinh mới ngồi cạnh bạn.','Trao đổi tên và nơi ở.',[
      ['Chào bạn, mình tên là Nam.','Hi. My name is Nam.','Chào Nam, mình là Julia.','Hello, Nam. I am Julia.',['introduce yourself','tự giới thiệu']],
      ['Bạn mới chuyển đến trường này à?','Are you new to this school?','Đúng, hôm nay là ngày đầu tiên của mình.','Yes. Today is my first day.',['first day','ngày đầu tiên']],
      ['Bạn đang sống gần trường không?','Do you live near the school?','Mình sống cách đây khoảng mười phút.','I live about ten minutes from here.',['live nearby','sống gần đây']],
    ]],
    ['Talking About Lessons','Nói về tiết học','Hai bạn xem thời khóa biểu.','Giải thích môn học và phòng học.',[
      ['Tiết tiếp theo của chúng ta là môn gì?','What is our next lesson?','Chúng ta có môn lịch sử ở phòng 204.','We have history in room 204.',['next lesson','tiết tiếp theo']],
      ['Giáo viên môn lịch sử là ai?','Who is the history teacher?','Thầy Long dạy lớp của chúng ta.','Mr Long teaches our class.',['class teacher','giáo viên lớp']],
      ['Mình có cần mang sách giáo khoa không?','Do I need to bring a textbook?','Không, sách đã có sẵn trong phòng.','No. The books are already in the room.',['textbook','sách giáo khoa']],
    ]],
    ['Joining at Lunch','Cùng ăn trưa','Học sinh mới chưa biết ngồi đâu.','Mời bạn cùng bàn một cách thân thiện.',[
      ['Bạn thường ăn trưa ở đâu?','Where do you usually eat lunch?','Mình ngồi với vài bạn gần cửa sổ.','I sit with some classmates near the window.',['classmate','bạn cùng lớp']],
      ['Mình có thể ngồi cùng không?','Can I sit with you?','Tất nhiên, bọn mình còn một ghế trống.','Of course. We have one empty seat.',['empty seat','ghế trống']],
      ['Cảm ơn, mình chưa biết nhiều người ở đây.','Thanks. I do not know many people here yet.','Bọn mình sẽ giới thiệu bạn với mọi người.','We will introduce you to everyone.',['meet everyone','làm quen mọi người']],
    ]],
  ]}),
  t({id:'feeding-a-pet',title:'Feeding a Pet',titleVi:'Cho thú cưng ăn',category:'Home',icon:'🐾',level:'A1',description:'Chuẩn bị khẩu phần, nước uống và giữ thức ăn an toàn.',grammar:['how-much','imperatives','present-simple'],scenarios:[
    ['Measuring the Food','Đong thức ăn','Hai người chuẩn bị bữa tối cho chó.','Dùng đúng lượng thức ăn.',[
      ['Mỗi bữa nó ăn bao nhiêu?','How much does she eat at each meal?','Nó ăn một cốc thức ăn khô.','She eats one cup of dry food.',['dry food','thức ăn khô']],
      ['Cốc đong để ở đâu?','Where is the measuring cup?','Nó ở trong hộp thức ăn.','It is inside the food container.',['measuring cup','cốc đong']],
      ['Mình có thể cho thêm một ít không?','Can I give her a little more?','Không, một cốc là khẩu phần phù hợp.','No. One cup is the correct portion.',['correct portion','khẩu phần phù hợp']],
    ]],
    ['Changing the Water','Thay nước','Bát nước gần cạn và có bụi.','Rửa bát rồi thêm nước sạch.',[
      ['Bát nước gần hết rồi.','The water bowl is nearly empty.','Hãy đổ nước cũ đi trước.','Pour the old water away first.',['water bowl','bát nước']],
      ['Mình có cần rửa bát không?','Do I need to wash the bowl?','Có, rửa nhanh bằng nước sạch nhé.','Yes. Give it a quick rinse with clean water.',['rinse a bowl','tráng bát']],
      ['Mình sẽ đổ nước đến vạch này.','I will fill it up to this line.','Tốt, hãy đặt bát lại trên tấm lót.','Good. Put it back on the mat.',['pet mat','tấm lót thú cưng']],
    ]],
    ['Storing Pet Food','Cất thức ăn thú cưng','Túi thức ăn mới vừa được mở.','Giữ thức ăn khô và xa tầm với.',[
      ['Mình để túi thức ăn ở đâu?','Where should I keep the bag of food?','Đổ nó vào hộp có nắp kín.','Pour it into the container with a sealed lid.',['sealed container','hộp kín']],
      ['Tại sao không để nguyên túi?','Why can I not leave it in the bag?','Hộp giúp thức ăn khô và tươi hơn.','The container keeps the food dry and fresh.',['keep fresh','giữ tươi']],
      ['Mình đặt hộp dưới kệ nhé.','I will put the container under the shelf.','Hãy để cao hơn để chó không mở được.','Keep it higher so that the dog cannot open it.',['out of reach','ngoài tầm với']],
    ]],
  ]}),
  t({id:'preparing-for-a-power-cut',title:'Preparing for a Power Cut',titleVi:'Chuẩn bị khi mất điện',category:'Home',icon:'🔦',level:'A2',description:'Chuẩn bị ánh sáng, bảo quản đồ ăn và dùng điện an toàn.',grammar:['future-forms','should','conditionals'],scenarios:[
    ['Gathering Essentials','Chuẩn bị đồ thiết yếu','Khu phố được báo sẽ cắt điện tối nay.','Tìm đèn, pin và nguồn dự phòng.',[
      ['Thông báo nói điện sẽ bị cắt lúc bảy giờ.','The notice says the power will be cut at seven.','Vậy mình nên sạc đầy điện thoại ngay.','Then we should fully charge our phones now.',['charge fully','sạc đầy']],
      ['Đèn pin có pin mới không?','Does the torch have fresh batteries?','Có, nhưng mình sẽ để thêm một bộ bên cạnh.','Yes, but I will keep a spare set beside it.',['spare batteries','pin dự phòng']],
      ['Mình có hai chiếc đèn sạc trong tủ.','We have two rechargeable lamps in the cupboard.','Hãy đặt một chiếc ở bếp và một chiếc ở hành lang.','Put one in the kitchen and one in the hallway.',['rechargeable lamp','đèn sạc']],
      ['Bộ sạc dự phòng còn bao nhiêu pin?','How much power is left in the power bank?','Nó còn tám mươi phần trăm nên đủ cho tối nay.','It is at eighty percent, so it should be enough for tonight.',['power bank','sạc dự phòng']],
    ]],
    ['Protecting Food','Bảo quản thức ăn','Gia đình muốn giữ tủ lạnh đủ lạnh.','Hạn chế mở cửa và ưu tiên đồ dễ hỏng.',[
      ['Đồ trong tủ lạnh có an toàn không?','Will the food in the fridge remain safe?','Có, nếu mình không mở cửa quá thường xuyên.','Yes, provided that we do not open the door too often.',['remain chilled','giữ lạnh']],
      ['Tủ đông sẽ lạnh được bao lâu?','How long will the freezer stay cold?','Một tủ đông đầy có thể giữ lạnh lâu hơn.','A full freezer can remain cold for longer.',['full freezer','tủ đông đầy']],
      ['Mình nên ăn món nào trước?','Which food should we eat first?','Hãy dùng sữa và đồ ăn thừa dễ hỏng.','Let us use the milk and perishable leftovers first.',['perishable food','thực phẩm dễ hỏng']],
      ['Mình sẽ để một chai nước trong ngăn mát.','I will keep a bottle of water in the fridge.','Như vậy không cần mở cửa mỗi lần muốn uống.','That means we will not open the door whenever we need a drink.',['limit opening','hạn chế mở cửa']],
    ]],
    ['Staying Safe in the Dark','Giữ an toàn trong bóng tối','Điện đã tắt và gia đình di chuyển trong nhà.','Tránh nến và giữ lối đi thông thoáng.',[
      ['Mình có nên thắp nến không?','Should we light some candles?','Đèn pin an toàn hơn, đặc biệt khi có trẻ nhỏ.','Torches are safer, especially with young children nearby.',['fire risk','nguy cơ cháy']],
      ['Có vài món đồ chơi trên sàn hành lang.','There are some toys on the hallway floor.','Hãy dọn chúng để không ai bị vấp.','Clear them away so that nobody trips over them.',['trip hazard','vật gây vấp']],
      ['Bếp điện đã được tắt chưa?','Has the electric cooker been switched off?','Rồi, các nút đều ở vị trí tắt.','Yes. Every control is in the off position.',['switch off','tắt thiết bị']],
      ['Khi có điện lại mình kiểm tra thiết bị từng cái.','When the power returns, we will check each appliance separately.','Cách đó tránh bật mọi thứ cùng lúc.','That will avoid everything switching on at once.',['restore power','khôi phục điện']],
    ]],
  ]}),
  t({id:'arranging-childcare',title:'Arranging Childcare',titleVi:'Sắp xếp người trông trẻ',category:'Family',icon:'🧸',level:'A2',description:'Thống nhất thời gian, nếp sinh hoạt và liên hệ khẩn cấp.',grammar:['future-arrangements','have-to','time-clauses'],scenarios:[
    ['Confirming the Schedule','Xác nhận lịch','Phụ huynh trao đổi giờ trông trẻ tối thứ Sáu.','Chốt giờ đến và giờ về dự kiến.',[
      ['Bạn có thể đến lúc sáu giờ tối thứ Sáu không?','Can you arrive at six on Friday evening?','Được, tôi sẽ đến sớm hơn khoảng mười phút.','Yes. I will arrive about ten minutes early.',['arrive early','đến sớm']],
      ['Chúng tôi dự kiến về trước mười một giờ.','We expect to return before eleven.','Nếu muộn hơn, hãy nhắn cho tôi trước nhé.','If you are later, please message me in advance.',['in advance','trước']],
      ['Bạn có cần chúng tôi đưa về không?','Will you need us to drive you home?','Có, vì chuyến xe buýt cuối chạy lúc mười giờ rưỡi.','Yes, because the last bus leaves at ten thirty.',['last bus','chuyến xe cuối']],
      ['Vậy chúng tôi sẽ đưa bạn về ngay khi về nhà.','Then we will drive you home as soon as we return.','Cảm ơn, lịch như vậy phù hợp với tôi.','Thanks. That arrangement works for me.',['childcare arrangement','sắp xếp trông trẻ']],
    ]],
    ['Explaining the Routine','Nói về nếp sinh hoạt','Phụ huynh hướng dẫn bữa tối và giờ ngủ.','Giữ lịch quen thuộc cho trẻ.',[
      ['Bữa tối của bé đã để sẵn trong tủ lạnh.','Her dinner is already prepared in the fridge.','Tôi nên hâm trong bao lâu?','How long should I heat it for?',['prepared meal','bữa ăn chuẩn bị sẵn']],
      ['Hâm hai phút rồi kiểm tra nhiệt độ.','Heat it for two minutes and then check the temperature.','Bé thường uống nước cùng bữa tối phải không?','Does she usually have water with dinner?',['check temperature','kiểm tra nhiệt độ']],
      ['Đúng, và bé đánh răng lúc tám giờ.','Yes, and she brushes her teeth at eight.','Sau đó tôi có thể đọc cho bé một câu chuyện.','I can read her a story after that.',['bedtime routine','nếp giờ ngủ']],
      ['Đèn ngủ nên được bật ở mức thấp.','The night light should be left on at a low setting.','Tôi sẽ nhớ để cửa phòng hơi mở.','I will remember to leave the bedroom door slightly open.',['night light','đèn ngủ']],
    ]],
    ['Sharing Emergency Details','Chia sẻ thông tin khẩn cấp','Phụ huynh để lại số liên hệ và thông tin y tế.','Biết gọi ai và xử lý dị ứng.',[
      ['Số của chúng tôi được dán trên tủ lạnh.','Our phone numbers are posted on the fridge.','Tôi sẽ lưu cả hai số vào điện thoại.','I will save both numbers on my phone.',['emergency contact','liên hệ khẩn cấp']],
      ['Hàng xóm tầng dưới cũng có chìa khóa dự phòng.','The downstairs neighbour also has a spare key.','Tôi nên gọi cô ấy nếu không liên lạc được với bạn chứ?','Should I call her if I cannot reach you?',['spare key','chìa khóa dự phòng']],
      ['Đúng, và bé bị dị ứng với hạt điều.','Yes, and our child is allergic to cashews.','Tôi sẽ kiểm tra nhãn trước khi cho bé ăn gì.','I will check every label before giving her any food.',['cashew allergy','dị ứng hạt điều']],
      ['Thuốc dị ứng ở ngăn trên cùng trong bếp.','Her allergy medicine is in the top kitchen drawer.','Tôi đã hiểu hướng dẫn trên tờ thông tin này.','I understand the instructions on this information sheet.',['medicine instruction','hướng dẫn dùng thuốc']],
    ]],
  ]}),
  t({id:'planning-a-hiking-day',title:'Planning a Hiking Day',titleVi:'Lên kế hoạch đi bộ đường dài',category:'Travel',icon:'🥾',level:'A2',description:'Chọn tuyến, chuẩn bị đồ và theo dõi thời tiết.',grammar:['comparatives','going-to','should'],scenarios:[
    ['Choosing a Trail','Chọn đường đi','Bạn bè so sánh hai tuyến đi bộ.','Chọn độ dài và độ khó phù hợp.',[
      ['Tuyến ven hồ dài bao nhiêu?','How long is the lakeside trail?','Nó dài khoảng tám cây số và khá bằng phẳng.','It is about eight kilometres long and fairly flat.',['lakeside trail','đường ven hồ']],
      ['Tuyến lên đỉnh có khó hơn nhiều không?','Is the summit route much more difficult?','Có, nó dốc và có vài đoạn đá lỏng.','Yes. It is steep and has some loose rocky sections.',['steep section','đoạn dốc']],
      ['Lan mới hồi phục sau chấn thương đầu gối.','Lan has only recently recovered from a knee injury.','Vậy tuyến ven hồ là lựa chọn an toàn hơn.','Then the lakeside route is the safer choice.',['safer option','lựa chọn an toàn hơn']],
      ['Ở nửa đường có chỗ nghỉ không?','Is there a rest area halfway around?','Có một khu dã ngoại gần cây cầu gỗ.','There is a picnic area near the wooden bridge.',['rest area','chỗ nghỉ']],
    ]],
    ['Packing for the Walk','Chuẩn bị đồ','Nhóm kiểm tra ba lô trước khi đi.','Mang đủ nước, đồ ăn và lớp áo.',[
      ['Mỗi người nên mang bao nhiêu nước?','How much water should each person carry?','Ít nhất một lít rưỡi cho tuyến này.','At least one and a half litres for this route.',['carry water','mang nước']],
      ['Mình đã chuẩn bị bánh mì và vài quả chuối.','I have packed sandwiches and some bananas.','Hãy thêm một món ăn nhẹ có muối.','Add a salty snack as well.',['salty snack','đồ ăn nhẹ có muối']],
      ['Buổi sáng có thể khá lạnh.','It may be quite cool in the morning.','Mọi người nên mang một lớp áo nhẹ.','Everyone should bring a light extra layer.',['extra layer','lớp áo thêm']],
      ['Ai sẽ mang bộ sơ cứu?','Who is going to carry the first-aid kit?','Tôi sẽ để nó ở ngăn ngoài ba lô.','I will keep it in the outer pocket of my backpack.',['first-aid kit','bộ sơ cứu']],
    ]],
    ['Watching the Weather','Theo dõi thời tiết','Dự báo có mưa dông vào buổi chiều.','Đổi giờ và đặt điều kiện quay về.',[
      ['Dự báo mới nói gì?','What does the latest forecast say?','Mưa dông có thể bắt đầu sau ba giờ.','Thunderstorms may develop after three o’clock.',['latest forecast','dự báo mới nhất']],
      ['Nếu xuất phát lúc bảy giờ, mình về kịp không?','Will we return in time if we start at seven?','Có, tuyến đi mất khoảng bốn giờ kể cả nghỉ.','Yes. The route takes about four hours including breaks.',['including breaks','kể cả nghỉ']],
      ['Nếu nghe tiếng sấm thì mình nên làm gì?','What should we do if we hear thunder?','Chúng ta phải quay lại ngay và tránh chỗ trống.','We must turn back immediately and avoid open ground.',['turn back','quay lại']],
      ['Mình sẽ kiểm tra cảnh báo công viên trước khi đi.','I will check the park alerts before we leave.','Tốt, họ có thể đóng tuyến nếu thời tiết xấu.','Good. They may close the trail in severe weather.',['park alert','cảnh báo công viên']],
    ]],
  ]}),
  t({id:'renewing-a-library-card',title:'Renewing a Library Card',titleVi:'Gia hạn thẻ thư viện',category:'Education',icon:'🪪',level:'A2',description:'Kiểm tra thẻ hết hạn, cập nhật địa chỉ và khôi phục tài khoản.',grammar:['present-perfect','polite-questions','passive-voice'],scenarios:[
    ['Checking the Expiry','Kiểm tra hạn thẻ','Người đọc không thể mượn sách tại máy.','Xác định trạng thái thẻ.',[
      ['Máy nói thẻ thư viện của tôi không hợp lệ.','The machine says that my library card is invalid.','Tôi sẽ kiểm tra ngày hết hạn trên tài khoản.','I will check the expiry date on your account.',['expiry date','ngày hết hạn']],
      ['Tôi đã dùng thẻ này tuần trước mà không gặp vấn đề.','I used this card last week without any problem.','Thẻ của bạn đã hết hạn vào ngày hôm qua.','Your card expired yesterday.',['expired card','thẻ hết hạn']],
      ['Tôi có thể gia hạn ngay tại quầy không?','Can I renew it here at the desk?','Có, nếu thông tin liên hệ của bạn vẫn chính xác.','Yes, provided that your contact details are still correct.',['renew a card','gia hạn thẻ']],
      ['Việc gia hạn có mất phí không?','Is there a charge for renewal?','Không, tư cách thành viên thư viện vẫn miễn phí.','No. Library membership remains free.',['library membership','tư cách thành viên thư viện']],
    ]],
    ['Updating an Address','Cập nhật địa chỉ','Người đọc đã chuyển nhà từ lần đăng ký trước.','Cung cấp bằng chứng địa chỉ mới.',[
      ['Tôi đã chuyển đến một địa chỉ mới.','I have moved to a new address.','Bạn sẽ cần cập nhật địa chỉ trước khi gia hạn.','You will need to update it before we renew the card.',['update an address','cập nhật địa chỉ']],
      ['Hóa đơn điện tử trên điện thoại có được không?','Will a digital utility bill on my phone be acceptable?','Có, miễn là hóa đơn hiện tên và địa chỉ đầy đủ.','Yes, as long as it shows your full name and address.',['proof of address','bằng chứng địa chỉ']],
      ['Hóa đơn được phát hành cách đây hai tuần.','The bill was issued two weeks ago.','Như vậy vẫn nằm trong thời hạn ba tháng.','That is within the three-month limit.',['issued recently','được phát hành gần đây']],
      ['Bạn có thể cập nhật số điện thoại cùng lúc chứ?','Can you update my phone number at the same time?','Tất nhiên, hãy kiểm tra lại số mới trên màn hình.','Certainly. Please verify the new number on the screen.',['verify details','xác minh thông tin']],
    ]],
    ['Restoring Online Access','Khôi phục truy cập trực tuyến','Thẻ đã gia hạn nhưng người đọc quên mã PIN.','Đặt lại đăng nhập an toàn.',[
      ['Tôi không nhớ mã PIN của tài khoản.','I cannot remember my account PIN.','Tôi có thể gửi liên kết đặt lại tới email đã đăng ký.','I can send a reset link to your registered email address.',['reset link','liên kết đặt lại']],
      ['Email cũ của tôi không còn hoạt động.','My old email address is no longer active.','Vậy trước hết chúng ta cần xác minh danh tính tại quầy.','Then we first need to verify your identity at the desk.',['registered email','email đã đăng ký']],
      ['Tôi có mang theo bằng lái xe.','I have brought my driving licence with me.','Giấy tờ đó đủ để cập nhật email của bạn.','That document is sufficient to update your email address.',['sufficient identification','giấy tờ đầy đủ']],
      ['Khi nào tôi có thể đăng nhập lại?','When will I be able to sign in again?','Ngay sau khi bạn tạo mã PIN mới từ liên kết.','As soon as you create a new PIN through the link.',['restore access','khôi phục truy cập']],
    ]],
  ]}),
  t({id:'joining-a-dance-class',title:'Joining a Dance Class',titleVi:'Tham gia lớp nhảy',category:'Fitness',icon:'💃',level:'A2',description:'Chọn trình độ, chuẩn bị trang phục và theo kịp buổi học.',grammar:['present-perfect','should','can'],scenarios:[
    ['Choosing a Level','Chọn trình độ','Người mới hỏi về lớp salsa.','Chọn lớp theo kinh nghiệm thực tế.',[
      ['Tôi chưa từng học salsa trước đây.','I have never taken a salsa class before.','Vậy lớp nhập môn tối thứ Ba sẽ phù hợp.','Then the introductory class on Tuesday evening should suit you.',['introductory class','lớp nhập môn']],
      ['Tôi có cần đăng ký cùng bạn nhảy không?','Do I need to register with a dance partner?','Không, học viên sẽ đổi bạn trong giờ học.','No. Students rotate partners during the lesson.',['rotate partners','đổi bạn nhảy']],
      ['Lớp có bao nhiêu người?','How many people are in the class?','Chúng tôi giới hạn ở mười sáu học viên.','We limit it to sixteen participants.',['class limit','giới hạn lớp']],
      ['Tôi có thể học thử một buổi không?','Can I attend one trial session?','Có, buổi đầu tiên có giá riêng.','Yes. The first session is available at a trial rate.',['trial session','buổi học thử']],
    ]],
    ['Getting Ready','Chuẩn bị đi học','Học viên hỏi về quần áo và giày.','Chọn trang phục an toàn, thoải mái.',[
      ['Tôi nên mặc gì đến lớp?','What should I wear to the class?','Hãy mặc quần áo nhẹ để bạn di chuyển thoải mái.','Wear light clothing that allows you to move comfortably.',['move comfortably','di chuyển thoải mái']],
      ['Tôi có cần giày nhảy chuyên dụng không?','Do I need specialist dance shoes?','Không, giày sạch có đế trơn vừa phải là được.','No. Clean shoes with moderately smooth soles are fine.',['smooth sole','đế trơn']],
      ['Tôi nên mang theo nước chứ?','Should I bring some water with me?','Có, có một khoảng nghỉ ngắn giữa buổi.','Yes. There is a short break halfway through the class.',['short break','giờ nghỉ ngắn']],
      ['Trong phòng thay đồ có chỗ khóa đồ không?','Is there somewhere secure for my things in the changing room?','Có, nhưng bạn cần mang một ổ khóa nhỏ.','Yes, but you need to bring a small padlock.',['small padlock','ổ khóa nhỏ']],
    ]],
    ['Following the Lesson','Theo kịp buổi học','Học viên thấy chuỗi bước quá nhanh.','Xin nhắc lại và luyện an toàn.',[
      ['Tôi đang gặp khó ở bước xoay thứ hai.','I am having difficulty with the second turn.','Hãy luyện phần chân chậm hơn mà chưa cần nhạc.','Practise the footwork more slowly without the music first.',['footwork','bộ pháp']],
      ['Tôi luôn đặt chân sai phía.','I keep placing my foot on the wrong side.','Hãy nhìn hướng vai của tôi trước khi bước.','Watch the direction of my shoulders before you step.',['body direction','hướng cơ thể']],
      ['Chúng ta có thể lặp lại tám nhịp cuối không?','Could we repeat the final eight counts?','Tất nhiên, cả lớp cũng sẽ được lợi khi ôn lại.','Of course. The whole class will benefit from reviewing them.',['eight counts','tám nhịp']],
      ['Bây giờ tôi theo kịp hơn nhiều rồi.','I can follow it much more easily now.','Tốt, hãy giữ bước nhỏ khi tốc độ tăng.','Good. Keep your steps small as the tempo increases.',['increase the tempo','tăng tốc độ nhạc']],
    ]],
  ]}),
  t({id:'discussing-food-allergies',title:'Discussing Food Allergies',titleVi:'Trao đổi về dị ứng thực phẩm',category:'Food & Drink',icon:'🥜',level:'B1',description:'Thông báo dị ứng, kiểm tra chế biến và phản ứng an toàn.',grammar:['present-perfect','passive-voice','conditionals'],scenarios:[
    ['Explaining an Allergy','Nói về dị ứng','Khách báo dị ứng trước khi gọi món.','Mô tả mức độ và nguyên liệu cần tránh.',[
      ['Trước khi gọi món, tôi cần báo rằng mình dị ứng với mè.','Before ordering, I need to mention that I am allergic to sesame.','Phản ứng của bạn có nghiêm trọng không?','Is your reaction severe?',['sesame allergy','dị ứng mè']],
      ['Có, ngay cả một lượng nhỏ cũng có thể gây sưng.','Yes. Even a small amount can cause swelling.','Cảm ơn bạn đã nói rõ mức độ nhạy cảm.','Thank you for explaining the level of sensitivity.',['severe reaction','phản ứng nghiêm trọng']],
      ['Tôi cần tránh cả dầu mè và hạt mè.','I need to avoid both sesame oil and sesame seeds.','Tôi sẽ ghi cả hai mục vào phiếu gọi món.','I will note both items on the order ticket.',['order ticket','phiếu gọi món']],
      ['Bạn có thể trao đổi trực tiếp với bếp trưởng chứ?','Could you speak directly with the head chef?','Có, tôi sẽ yêu cầu bếp trưởng kiểm tra lựa chọn an toàn.','Yes. I will ask the chef to confirm a safe option.',['confirm a safe option','xác nhận lựa chọn an toàn']],
    ]],
    ['Checking Preparation','Kiểm tra chế biến','Nhân viên quay lại với thông tin từ nhà bếp.','Đánh giá nguy cơ lẫn chéo.',[
      ['Món cá không chứa mè trong công thức.','The fish dish does not contain sesame in its recipe.','Nó có được nấu trên bề mặt dùng chung không?','Is it cooked on a shared surface?',['shared surface','bề mặt dùng chung']],
      ['Vỉ nướng cũng được dùng cho món có sốt mè.','The grill is also used for dishes with sesame sauce.','Vậy nguy cơ lẫn chéo có thể quá cao với tôi.','Then the cross-contact risk may be too high for me.',['cross-contact risk','nguy cơ tiếp xúc chéo']],
      ['Bếp có thể dùng chảo sạch riêng cho phần của bạn.','The kitchen can use a separate clean pan for your portion.','Dụng cụ cũng cần được thay trước khi nấu.','The utensils would also need to be changed before cooking.',['separate utensil','dụng cụ riêng']],
      ['Bếp trưởng đã đồng ý với quy trình đó.','The chef has agreed to that procedure.','Cảm ơn, tôi sẽ chọn món cá được chuẩn bị riêng.','Thank you. I will choose the separately prepared fish.',['allergy procedure','quy trình dị ứng']],
    ]],
    ['Responding to Symptoms','Xử lý triệu chứng','Khách cảm thấy ngứa sau vài miếng ăn.','Ngừng ăn và tìm trợ giúp ngay.',[
      ['Môi tôi bắt đầu ngứa và hơi sưng.','My lips are beginning to itch and swell slightly.','Hãy ngừng ăn ngay trong khi tôi gọi quản lý.','Stop eating immediately while I call the manager.',['early symptom','triệu chứng sớm']],
      ['Tôi có bút tiêm tự động trong túi.','I have an auto-injector in my bag.','Bạn có muốn tôi lấy nó và gọi cấp cứu không?','Would you like me to get it and call emergency services?',['auto-injector','bút tiêm tự động']],
      ['Có, hãy nói rằng tôi đang có phản ứng dị ứng.','Yes. Tell them that I am having an allergic reaction.','Tôi sẽ ở cùng bạn và làm theo hướng dẫn của họ.','I will stay with you and follow their instructions.',['emergency instruction','hướng dẫn cấp cứu']],
      ['Bạn tôi đang lấy danh sách thuốc của tôi.','My friend is getting my medication information.','Tốt, thông tin đó sẽ hữu ích cho nhân viên y tế.','Good. That information will help the medical team.',['medical information','thông tin y tế']],
    ]],
  ]}),
  t({id:'resolving-shared-house-issues',title:'Resolving Shared House Issues',titleVi:'Giải quyết vấn đề nhà ở chung',category:'Home',icon:'🏠',level:'B1',description:'Nêu tác động, chia trách nhiệm và tạo quy tắc chung.',grammar:['diplomatic-language','modals','conditionals'],scenarios:[
    ['Raising a Concern','Nêu vấn đề','Một người thường để bếp bẩn qua đêm.','Nói về hành vi mà không công kích cá nhân.',[
      ['Mình muốn nói về tình trạng bếp sau bữa tối.','I would like to talk about how the kitchen is left after dinner.','Có điều gì cụ thể đang gây phiền cho bạn?','Is there something specific that has been bothering you?',['raise a concern','nêu mối quan ngại']],
      ['Hai lần tuần này bát đĩa đã để qua đêm.','Twice this week, the dishes have been left overnight.','Mình hiểu việc đó khiến bạn không thể dùng bồn rửa buổi sáng.','I understand that this prevents you from using the sink in the morning.',['describe impact','mô tả tác động']],
      ['Đúng, mình phải dọn trước khi làm bữa sáng.','Exactly. I have to clear it before preparing breakfast.','Mình xin lỗi; hai hôm đó mình về phòng vì quá mệt.','I am sorry. I went to bed exhausted on those evenings.',['take responsibility','nhận trách nhiệm']],
      ['Mình không yêu cầu bếp hoàn hảo, chỉ cần bồn rửa trống.','I am not asking for a perfect kitchen, only a clear sink.','Yêu cầu đó cụ thể và hợp lý.','That is a specific and reasonable request.',['reasonable request','yêu cầu hợp lý']],
    ]],
    ['Sharing the Chores','Chia việc nhà','Các thành viên thấy lịch dọn dẹp không cân bằng.','Phân việc theo thời gian và sở thích.',[
      ['Lịch hiện tại giao cho mình cả phòng tắm và sàn nhà.','The current rota assigns me both the bathroom and the floors.','Đúng, tuần này phần việc của bạn nặng hơn.','You are right. Your share is heavier this week.',['cleaning rota','lịch dọn dẹp']],
      ['Mình có thể đổi việc lau sàn lấy việc đổ rác không?','Could I swap mopping the floors for taking out the bins?','Mình sẵn sàng lau sàn nếu bạn xử lý tái chế.','I am willing to mop if you handle the recycling.',['swap chores','đổi việc nhà']],
      ['Ai sẽ dọn khu vực chung vào cuối tuần?','Who will clean the shared area at the weekend?','Chúng ta có thể luân phiên thay vì giao cố định.','We could rotate that task instead of assigning it permanently.',['rotate a task','luân phiên công việc']],
      ['Hãy thử lịch mới trong hai tuần rồi xem lại.','Let us try the new rota for two weeks and then review it.','Như vậy mình có thể điều chỉnh nếu vẫn chưa cân bằng.','That way, we can adjust it if the workload remains uneven.',['uneven workload','khối lượng việc không đều']],
    ]],
    ['Agreeing on Quiet Hours','Thống nhất giờ yên tĩnh','Lịch ngủ và làm việc của các thành viên khác nhau.','Đặt quy tắc linh hoạt cho tiếng ồn.',[
      ['Cuộc gọi tối muộn của bạn đôi khi làm mình thức giấc.','Your late-night calls sometimes wake me up.','Mình không nhận ra giọng nói truyền qua bức tường đó.','I did not realize that voices carried through that wall.',['sound carries','âm thanh truyền qua']],
      ['Mình bắt đầu làm sớm nên cần ngủ trước mười một giờ.','I start work early, so I need to sleep before eleven.','Mình có thể chuyển các cuộc gọi muộn sang phòng khách.','I can move late calls to the living room.',['quiet hours','giờ yên tĩnh']],
      ['Cuối tuần có thể linh hoạt hơn một chút.','We can be slightly more flexible at weekends.','Đồng ý, miễn là mình báo trước nếu có khách.','Agreed, as long as we give notice when guests are coming.',['give notice','báo trước']],
      ['Mình sẽ ghi thỏa thuận vào nhóm chat chung.','I will write the agreement in our shared chat.','Một quy tắc rõ sẽ dễ thực hiện hơn giả định ngầm.','A clear rule will be easier to follow than an unspoken assumption.',['shared agreement','thỏa thuận chung']],
    ]],
  ]}),
  t({id:'managing-a-travel-itinerary',title:'Managing a Travel Itinerary',titleVi:'Quản lý lịch trình du lịch',category:'Travel',icon:'🗺️',level:'B1',description:'Cân bằng thời gian, đặt khoảng đệm và ứng phó thay đổi.',grammar:['future-perfect','conditionals','time-clauses'],scenarios:[
    ['Building a Realistic Day','Lập lịch một ngày thực tế','Nhóm đang xếp quá nhiều điểm tham quan.','Ước tính thời gian và ưu tiên.',[
      ['Chúng ta đang cố thăm bốn địa điểm trước bữa trưa.','We are trying to visit four sites before lunch.','Lịch đó không tính thời gian di chuyển giữa các nơi.','That schedule does not account for travel time between them.',['account for time','tính đến thời gian']],
      ['Bảo tàng lớn có thể mất ít nhất hai giờ.','The main museum could take at least two hours.','Vậy mình nên chọn bảo tàng hoặc khu phố cổ vào buổi sáng.','Then we should choose either the museum or the old quarter for the morning.',['set a priority','đặt ưu tiên']],
      ['Khu phố cổ đóng cửa muộn hơn.','The old quarter stays open later.','Hãy để nơi đó sau bữa tối khi đường phố lên đèn.','Let us save it for after dinner when the streets are illuminated.',['save for later','để lại sau']],
      ['Như vậy buổi sáng chỉ còn bảo tàng và công viên.','That leaves only the museum and the park in the morning.','Lịch mới có khoảng trống để nghỉ và di chuyển.','The revised plan leaves enough space for breaks and transport.',['realistic itinerary','lịch trình thực tế']],
    ]],
    ['Planning Transfer Time','Tính thời gian chuyển chặng','Nhóm cần nối chuyến tàu với chuyến bay.','Thêm khoảng đệm cho chậm trễ và kiểm tra an ninh.',[
      ['Tàu dự kiến đến sân bay lúc mười giờ mười lăm.','The train is scheduled to reach the airport at ten fifteen.','Chuyến bay khởi hành lúc mười hai giờ có quá sát không?','Is a noon departure too close?',['scheduled arrival','giờ đến dự kiến']],
      ['Chúng ta vẫn phải ký gửi hành lý và qua an ninh.','We will still need to check our bags and pass through security.','Hãng yêu cầu có mặt ít nhất hai giờ trước chuyến bay.','The airline asks passengers to arrive at least two hours before departure.',['transfer time','thời gian chuyển chặng']],
      ['Vậy chuyến tàu đó không để lại khoảng đệm nào.','Then that train leaves us no margin for delay.','Chuyến sớm hơn đến lúc tám giờ bốn mươi.','The earlier service arrives at eight forty.',['time buffer','khoảng đệm thời gian']],
      ['Mình nên chọn chuyến sớm dù phải thức sớm hơn.','We should take the earlier train despite the earlier start.','Giảm rủi ro lỡ chuyến bay đáng để bất tiện một chút.','Reducing the risk of missing the flight is worth some inconvenience.',['miss a connection','lỡ chuyến nối']],
    ]],
    ['Adapting to a Closure','Điều chỉnh khi điểm đến đóng cửa','Một điểm tham quan đóng đột xuất vì thời tiết.','Thay thế mà không làm đảo lộn cả ngày.',[
      ['Cáp treo đã đóng vì gió mạnh.','The cable car has closed because of high winds.','Họ có nói khi nào sẽ đánh giá lại không?','Have they said when conditions will be reviewed?',['temporary closure','đóng cửa tạm thời']],
      ['Thông báo tiếp theo sẽ có vào hai giờ chiều.','The next announcement will be made at two o’clock.','Chờ đến lúc đó sẽ làm mất phần lớn buổi sáng.','Waiting until then would use up most of the morning.',['reassessment time','thời điểm đánh giá lại']],
      ['Mình có thể chuyển chuyến tham quan chợ từ ngày mai sang hôm nay.','We could move tomorrow’s market visit to today.','Sau đó nếu cáp treo mở, mình vẫn có thể đi cuối giờ chiều.','If the cable car reopens, we could still go in the late afternoon.',['swap activities','đổi hoạt động']],
      ['Nếu nó vẫn đóng, ngày mai mình sẽ đi tuyến đi bộ thấp hơn.','If it remains closed, we will take the lower walking route tomorrow.','Phương án dự phòng đó vẫn giữ được mục tiêu ngắm cảnh.','That contingency still preserves our goal of seeing the landscape.',['contingency plan','phương án dự phòng']],
    ]],
  ]}),
  t({id:'discussing-family-screen-time',title:'Discussing Family Screen Time',titleVi:'Trao đổi thời gian dùng màn hình trong gia đình',category:'Family',icon:'⏱️',level:'B1',description:'Hiểu thói quen, đặt giới hạn và làm gương nhất quán.',grammar:['habit-language','conditionals','reported-speech'],scenarios:[
    ['Understanding the Pattern','Hiểu thói quen','Gia đình xem lại việc dùng thiết bị buổi tối.','Phân biệt mục đích học tập và giải trí.',[
      ['Con thường dùng máy tính bảng bao lâu sau bữa tối?','How long do you usually use the tablet after dinner?','Khoảng một giờ, nhưng đôi khi con dùng để làm bài tập.','About an hour, although I sometimes use it for homework.',['screen-time pattern','thói quen dùng màn hình']],
      ['Tuần này con đã xem video khá muộn ba tối.','You have watched videos quite late on three evenings this week.','Con mất cảm giác về thời gian khi các video tự chạy tiếp.','I lose track of time when the videos play automatically.',['lose track of time','quên mất thời gian']],
      ['Buổi sáng con có thấy mệt hơn không?','Have you felt more tired in the mornings?','Có, con khó thức dậy vào những ngày đi học.','Yes. I have found it difficult to wake up on school days.',['sleep routine','nếp ngủ']],
      ['Vậy vấn đề chính là nội dung giải trí trước giờ ngủ.','Then the main issue is entertainment close to bedtime.','Con đồng ý, bài tập trên máy không gây cùng vấn đề.','I agree. Homework on the device does not create the same problem.',['separate purposes','tách mục đích']],
    ]],
    ['Agreeing on Limits','Thống nhất giới hạn','Phụ huynh và con cùng đề xuất quy tắc.','Tạo giới hạn rõ và có ngoại lệ hợp lý.',[
      ['Con nghĩ giờ dừng xem video nào là thực tế?','What time do you think would be realistic for stopping videos?','Con có thể dừng lúc chín giờ vào ngày đi học.','I could stop at nine on school nights.',['school-night limit','giới hạn tối ngày học']],
      ['Sau đó thiết bị sẽ được sạc ngoài phòng ngủ.','The device will then be charged outside the bedroom.','Con muốn được nghe nhạc bằng loa nhỏ khi đọc sách.','I would like to listen to music on a small speaker while reading.',['device-free bedroom','phòng ngủ không thiết bị']],
      ['Điều đó được nếu màn hình vẫn tắt.','That is fine as long as the screen remains off.','Cuối tuần con có thể dùng muộn hơn nửa giờ không?','Could I use it half an hour later at weekends?',['reasonable exception','ngoại lệ hợp lý']],
      ['Được, miễn là con vẫn thức đúng giờ sáng hôm sau.','Yes, provided that you still get up on time the next morning.','Mình sẽ thử quy tắc này trong hai tuần.','We will try this rule for two weeks.',['trial period','thời gian thử']],
    ]],
    ['Sharing Responsibility','Cùng chịu trách nhiệm','Trẻ nhận thấy người lớn cũng dùng điện thoại khi ăn.','Áp dụng nguyên tắc công bằng cho cả nhà.',[
      ['Bố mẹ cũng kiểm tra điện thoại trong bữa tối.','You also check your phones during dinner.','Con nói đúng; quy tắc nên áp dụng cho mọi người.','You are right. The rule should apply to everyone.',['apply equally','áp dụng công bằng']],
      ['Mình có thể để tất cả điện thoại trong một chiếc giỏ.','We could place every phone in a basket.','Nếu có cuộc gọi công việc khẩn cấp thì sao?','What if there is an urgent work call?',['phone basket','giỏ đựng điện thoại']],
      ['Người chờ cuộc gọi có thể báo trước cho cả nhà.','Anyone expecting a call can let the family know beforehand.','Như vậy ngoại lệ sẽ rõ thay vì diễn ra âm thầm.','That makes the exception explicit rather than unspoken.',['explicit exception','ngoại lệ rõ ràng']],
      ['Mỗi Chủ nhật mình sẽ xem quy tắc có hiệu quả không.','Every Sunday, we will review whether the rule is working.','Con thích việc mọi người cùng chịu trách nhiệm.','I like the fact that everyone is accountable.',['shared accountability','trách nhiệm chung']],
    ]],
  ]}),
  t({id:'negotiating-a-vendor-contract',title:'Negotiating a Vendor Contract',titleVi:'Thương lượng hợp đồng nhà cung cấp',category:'Work',icon:'🤝',level:'B2',description:'Làm rõ cam kết dịch vụ, phân bổ rủi ro và chốt cơ chế xử lý.',grammar:['contract-language','conditionals','formal-hedging'],scenarios:[
    ['Defining Service Levels','Định nghĩa mức dịch vụ','Hai bên xem điều khoản về thời gian hoạt động.','Biến lời hứa chung thành chỉ số đo được.',[
      ['Dự thảo mô tả dịch vụ là “có độ sẵn sàng cao”.','The draft describes the service as “highly available.”','Cụm đó cần được chuyển thành một cam kết có thể đo lường.','That phrase needs to be translated into a measurable commitment.',['service-level commitment','cam kết mức dịch vụ']],
      ['Chúng tôi có thể cam kết độ sẵn sàng 99,9 phần trăm mỗi tháng.','We could commit to 99.9 percent monthly availability.','Thời gian bảo trì có kế hoạch có được loại khỏi phép tính không?','Would scheduled maintenance be excluded from the calculation?',['scheduled maintenance','bảo trì theo kế hoạch']],
      ['Có, nếu khách hàng được báo trước ít nhất bảy ngày.','Yes, provided that customers receive at least seven days’ notice.','Chúng tôi cũng cần giới hạn tổng thời gian bảo trì được loại trừ.','We would also need a cap on the total excluded maintenance time.',['exclusion cap','giới hạn loại trừ']],
      ['Giới hạn bốn giờ mỗi tháng có thể chấp nhận được.','A cap of four hours per month would be acceptable.','Tôi sẽ phản ánh cả tỷ lệ và giới hạn trong phụ lục.','I will reflect both the percentage and the cap in the schedule.',['contract schedule','phụ lục hợp đồng']],
    ]],
    ['Allocating Security Risk','Phân bổ rủi ro bảo mật','Khách hàng yêu cầu trách nhiệm không giới hạn cho mọi sự cố.','Phân biệt lỗi nhà cung cấp và yếu tố ngoài kiểm soát.',[
      ['Điều khoản hiện tại khiến nhà cung cấp chịu mọi tổn thất bảo mật.','The current clause makes the supplier liable for every security loss.','Chúng tôi cần trách nhiệm rõ nếu dữ liệu bị lộ.','We need clear accountability if customer data is exposed.',['security liability','trách nhiệm bảo mật']],
      ['Chúng tôi chấp nhận trách nhiệm khi vi phạm do sơ suất của mình.','We accept responsibility where a breach results from our negligence.','Còn sự cố do thông tin đăng nhập của khách hàng bị chia sẻ thì sao?','What about an incident caused by a customer sharing credentials?',['customer credential','thông tin đăng nhập khách hàng']],
      ['Trường hợp đó nên được điều tra chung trước khi phân bổ trách nhiệm.','Such a case should be jointly investigated before liability is allocated.','Đồng ý, miễn là việc điều tra có thời hạn rõ.','Agreed, provided that the investigation has a defined timetable.',['joint investigation','điều tra chung']],
      ['Chúng ta có thể yêu cầu báo cáo ban đầu trong năm ngày làm việc.','We could require an initial report within five business days.','Thời hạn đó cân bằng tốc độ với việc thu thập bằng chứng.','That timeframe balances urgency with proper evidence gathering.',['initial incident report','báo cáo sự cố ban đầu']],
    ]],
    ['Agreeing on Remedies','Thống nhất biện pháp khắc phục','Hai bên bàn cách xử lý khi dịch vụ không đạt cam kết.','Kết hợp tín dụng dịch vụ và quyền chấm dứt.',[
      ['Tín dụng dịch vụ là biện pháp duy nhất trong dự thảo.','Service credits are the sole remedy in the current draft.','Điều đó chưa đủ nếu vi phạm nghiêm trọng xảy ra nhiều lần.','That would be insufficient if a serious failure occurred repeatedly.',['sole remedy','biện pháp duy nhất']],
      ['Bạn đề xuất ngưỡng nào cho quyền chấm dứt?','What threshold would you propose for a termination right?','Ba tháng dưới mức cam kết trong bất kỳ giai đoạn sáu tháng nào.','Three months below the commitment in any six-month period.',['termination threshold','ngưỡng chấm dứt']],
      ['Chúng tôi có thể chấp nhận nếu mỗi vi phạm đều được xác minh.','We could accept that if each failure is independently verified.','Dữ liệu giám sát chung sẽ là nguồn xác minh.','The shared monitoring data would provide the verification source.',['monitoring data','dữ liệu giám sát']],
      ['Vậy tín dụng áp dụng tự động và quyền chấm dứt áp dụng theo ngưỡng.','Then credits will apply automatically, and termination will depend on the threshold.','Cấu trúc đó tạo động lực khắc phục mà không phản ứng quá mức.','That structure encourages remediation without being disproportionate.',['proportionate remedy','biện pháp tương xứng']],
    ]],
  ]}),
  t({id:'discussing-urban-development',title:'Discussing Urban Development',titleVi:'Thảo luận phát triển đô thị',category:'Community',icon:'🏙️',level:'B2',description:'Cân nhắc nhà ở, giao thông và tác động cộng đồng bằng bằng chứng.',grammar:['concession-clauses','hedging','policy-language'],scenarios:[
    ['Examining the Proposal','Xem xét đề xuất','Cư dân đọc kế hoạch xây khu phức hợp mới.','Tách quy mô, mục đích và giả định.',[
      ['Đề xuất gồm sáu trăm căn hộ trên khu đất nhà máy cũ.','The proposal includes six hundred homes on the former factory site.','Bao nhiêu căn trong số đó được định giá phải chăng?','How many of those homes are designated as affordable?',['affordable housing','nhà ở giá phải chăng']],
      ['Nhà phát triển cam kết hai mươi phần trăm, nhưng định nghĩa chưa rõ.','The developer has committed to twenty percent, although the definition is unclear.','Chúng ta cần biết mức giá được gắn với thu nhập nào.','We need to know which income level the prices are tied to.',['income threshold','ngưỡng thu nhập']],
      ['Kế hoạch cũng dành tầng trệt cho cửa hàng và phòng khám.','The plan also reserves the ground floor for shops and a clinic.','Tiện ích đó có thể giảm nhu cầu đi xa của cư dân.','Those facilities could reduce residents’ need to travel elsewhere.',['mixed-use development','phát triển đa chức năng']],
      ['Tuy nhiên, lợi ích phụ thuộc vào việc các dịch vụ thực sự được lấp đầy.','However, that benefit depends on the commercial spaces actually being occupied.','Đúng, một bản vẽ không bảo đảm dịch vụ sẽ tồn tại.','Exactly. A plan on paper does not guarantee that services will materialize.',['materialize','trở thành hiện thực']],
    ]],
    ['Considering Transport Impact','Cân nhắc tác động giao thông','Cư dân lo đường hiện tại sẽ quá tải.','Đánh giá dữ liệu và giải pháp ngoài ô tô.',[
      ['Báo cáo dự đoán thêm bốn trăm chuyến xe vào giờ cao điểm.','The report predicts four hundred additional car journeys at peak time.','Dự đoán đó dựa trên tỷ lệ sở hữu xe hiện tại hay giả định mới?','Is that forecast based on current car ownership or a new assumption?',['traffic forecast','dự báo giao thông']],
      ['Nó dùng dữ liệu khu vực từ năm năm trước.','It uses area-wide data collected five years ago.','Dữ liệu có thể chưa phản ánh tuyến tàu mới mở.','The data may not reflect the recently opened rail line.',['outdated dataset','bộ dữ liệu cũ']],
      ['Nhà phát triển đề xuất giảm chỗ đậu xe và thêm chỗ xe đạp.','The developer proposes fewer parking spaces and more cycle storage.','Điều đó chỉ hiệu quả nếu đường đi bộ và xe buýt cũng đáng tin cậy.','That will work only if walking routes and bus services are reliable as well.',['transport mix','kết hợp phương tiện']],
      ['Mình nên yêu cầu phân tích độ nhạy với nhiều giả định.','We should request a sensitivity analysis using several assumptions.','Như vậy quyết định không phụ thuộc vào một dự báo duy nhất.','That would prevent the decision from resting on a single forecast.',['sensitivity analysis','phân tích độ nhạy']],
    ]],
    ['Shaping Community Benefits','Định hình lợi ích cộng đồng','Hội đồng hỏi dự án nên đóng góp gì cho khu vực.','Ưu tiên lợi ích lâu dài và có trách nhiệm thực hiện.',[
      ['Nhà phát triển đề nghị tài trợ một sân chơi mới.','The developer has offered to fund a new playground.','Sân chơi hữu ích, nhưng trường địa phương cũng đang thiếu chỗ.','A playground would be useful, although the local school also lacks capacity.',['community benefit','lợi ích cộng đồng']],
      ['Khoản đóng góp có thể được chia giữa giáo dục và không gian công cộng.','The contribution could be divided between education and public space.','Ai sẽ quyết định tỷ lệ dựa trên nhu cầu cập nhật?','Who would determine the split based on current needs?',['funding allocation','phân bổ tài trợ']],
      ['Hội đồng có thể tham vấn cư dân trước khi chốt.','The council could consult residents before finalizing the allocation.','Cuộc tham vấn cần bao gồm người thuê nhà, không chỉ chủ sở hữu.','The consultation should include renters rather than only property owners.',['inclusive consultation','tham vấn bao trùm']],
      ['Cam kết cũng phải được thực hiện trước khi phần lớn căn hộ có người ở.','The commitment must also be delivered before most homes are occupied.','Một mốc ràng buộc sẽ tránh lợi ích bị trì hoãn vô thời hạn.','A binding milestone would prevent the benefit from being delayed indefinitely.',['binding milestone','mốc ràng buộc']],
    ]],
  ]}),
];
