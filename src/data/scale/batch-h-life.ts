import { scaleTopic as t } from './scale-builder';

export const batchHLifeTopics = [
  t({id:'eating-at-a-food-court',title:'Eating at a Food Court',titleVi:'Ăn ở khu ẩm thực',category:'Food & Drink',icon:'🍱',level:'A1',description:'Chọn quầy, giữ bàn và dọn khay.',grammar:['where-questions','can','imperatives'],scenarios:[
    ['Choosing a Stall','Chọn quầy','Bạn bè xem bảng các quầy ăn.','Chọn món và tìm quầy.',[
      ['Quầy bán cơm ở đâu?','Where is the rice stall?','Nó ở hàng cuối, cạnh quầy nước.','It is in the final row beside the drinks stall.',['food stall','quầy đồ ăn']],
      ['Ở đó có món chay không?','Are there any vegetarian dishes there?','Có, họ có cơm với đậu phụ và rau.','Yes. They serve rice with tofu and vegetables.',['vegetarian dish','món chay']],
      ['Mình sẽ xếp hàng ở quầy đó.','I will join the queue at that stall.','Tôi sẽ lấy đồ uống trong lúc bạn gọi món.','I will get the drinks while you order.',['join a queue','xếp hàng']],
    ]],
    ['Finding a Table','Tìm bàn','Khu ngồi đông vào giờ trưa.','Chọn bàn sạch và đủ ghế.',[
      ['Bạn thấy bàn nào trống không?','Can you see an empty table?','Có một bàn bốn ghế gần cửa sổ.','There is a four-seat table near the window.',['empty table','bàn trống']],
      ['Có ai đang giữ bàn đó không?','Is anyone saving that table?','Không có đồ hay người nào ở đó.','There are no belongings or people there.',['save a seat','giữ chỗ']],
      ['Mình sẽ đặt khay xuống rồi ngồi.','I will put the tray down and sit.','Hãy để lối đi cạnh bàn thông thoáng.','Keep the walkway beside the table clear.',['clear walkway','lối đi thông thoáng']],
    ]],
    ['Collecting the Order','Nhận món','Thiết bị báo món đã sẵn sàng.','Nhận đúng số đơn và gia vị.',[
      ['Máy rung của mình vừa sáng.','My pager has just lit up.','Đơn của bạn đã sẵn sàng ở quầy số 6.','Your order is ready at counter six.',['order pager','máy báo món']],
      ['Mình cần đưa phiếu nào?','Which receipt do I need to show?','Đưa phiếu có số A42.','Show the receipt marked A42.',['order number','số đơn']],
      ['Cho mình thêm một đôi đũa nhé.','Could I have one more pair of chopsticks?','Tất nhiên, chúng ở trong hộp bên trái.','Certainly. They are in the box on the left.',['pair of chopsticks','đôi đũa']],
    ]],
    ['Returning the Tray','Trả khay','Bữa ăn đã xong.','Phân loại rác và trả khay.',[
      ['Mình để khay bẩn ở đâu?','Where should I leave the dirty tray?','Đưa nó đến điểm trả cạnh cột màu xanh.','Take it to the return station beside the green pillar.',['tray return','điểm trả khay']],
      ['Thức ăn thừa đi vào thùng nào?','Which bin is for leftover food?','Đổ thức ăn vào thùng nâu trước.','Empty the food into the brown bin first.',['food-waste bin','thùng thức ăn']],
      ['Cốc giấy có để cùng khay không?','Does the paper cup stay on the tray?','Không, đặt cốc vào thùng tái chế có nhãn.','No. Put it in the labelled recycling bin.',['labelled bin','thùng có nhãn']],
    ]],
  ]}),
  t({id:'checking-a-weather-app',title:'Checking a Weather App',titleVi:'Xem ứng dụng thời tiết',category:'Technology',icon:'🌦️',level:'A1',description:'Đọc nhiệt độ, mưa và cảnh báo theo giờ.',grammar:['future-will','time','comparatives'],scenarios:[
    ['Reading Today’s Forecast','Đọc dự báo hôm nay','Hai người chọn quần áo buổi sáng.','Hiểu nhiệt độ cao và thấp.',[
      ['Hôm nay nhiệt độ cao nhất bao nhiêu?','What is the highest temperature today?','Nó sẽ đạt ba mươi độ vào buổi chiều.','It will reach thirty degrees in the afternoon.',['highest temperature','nhiệt độ cao nhất']],
      ['Buổi sáng có mát hơn nhiều không?','Is the morning much cooler?','Bây giờ là hai mươi hai độ.','It is twenty-two degrees now.',['current temperature','nhiệt độ hiện tại']],
      ['Mình sẽ mặc áo nhẹ và mang mũ.','I will wear light clothes and take a hat.','Đó là lựa chọn tốt cho nắng chiều.','That is a good choice for the afternoon sun.',['afternoon sun','nắng chiều']],
    ]],
    ['Checking Rain by Hour','Xem mưa theo giờ','Có khả năng mưa trong ngày.','Chọn giờ ra ngoài.',[
      ['Mưa sẽ bắt đầu lúc mấy giờ?','What time will the rain begin?','Dự báo theo giờ cho thấy mưa từ bốn giờ.','The hourly forecast shows rain from four o’clock.',['hourly forecast','dự báo theo giờ']],
      ['Khả năng mưa lúc năm giờ là bao nhiêu?','What is the chance of rain at five?','Nó là tám mươi phần trăm.','It is eighty percent.',['rain chance','khả năng mưa']],
      ['Mình nên đi chợ trước ba giờ.','We should go to the market before three.','Như vậy mình có thời gian về trước mưa.','That gives us time to return before the rain.',['before the rain','trước cơn mưa']],
    ]],
    ['Understanding Wind','Hiểu gió','Gia đình cân nhắc đi xe đạp.','Đọc tốc độ và hướng gió.',[
      ['Gió hôm nay có mạnh không?','Is the wind strong today?','Tốc độ trung bình là hai mươi cây số mỗi giờ.','The average speed is twenty kilometres per hour.',['wind speed','tốc độ gió']],
      ['Mũi tên đang chỉ về phía đông.','The arrow is pointing east.','Điều đó nghĩa là gió đang thổi về hướng đông.','That means the wind is blowing towards the east.',['wind direction','hướng gió']],
      ['Mình sẽ chọn tuyến có nhiều cây che.','I will choose the route with more shelter.','Nó sẽ dễ đi hơn ở đoạn trống.','That will be easier than riding across open ground.',['sheltered route','tuyến có che chắn']],
    ]],
    ['Reading an Alert','Đọc cảnh báo','Ứng dụng hiện biểu tượng màu cam.','Hiểu khu vực và hành động.',[
      ['Biểu tượng màu cam có nghĩa gì?','What does the orange symbol mean?','Có cảnh báo mưa lớn cho khu vực này.','There is a heavy-rain warning for this area.',['weather warning','cảnh báo thời tiết']],
      ['Cảnh báo có hiệu lực đến khi nào?','Until when is the warning active?','Nó có hiệu lực từ sáu giờ tối đến nửa đêm.','It is active from six in the evening until midnight.',['active period','thời gian hiệu lực']],
      ['Mình sẽ kiểm tra lại trước khi lái xe tối nay.','I will check again before driving this evening.','Thông tin có thể được cập nhật khi cơn mưa đến gần.','The information may be updated as the rain approaches.',['updated alert','cảnh báo cập nhật']],
    ]],
  ]}),
  t({id:'at-a-shoe-repair-shop',title:'At a Shoe Repair Shop',titleVi:'Ở tiệm sửa giày',category:'Services',icon:'👞',level:'A1',description:'Mô tả hỏng hóc, chọn cách sửa và nhận giày.',grammar:['present-simple','can','time-questions'],scenarios:[
    ['Showing the Damage','Chỉ chỗ hỏng','Khách mang một đôi giày bị bong đế.','Mô tả vấn đề và thời điểm.',[
      ['Đế giày này đang bong ở phía trước.','The sole of this shoe is coming away at the front.','Phần bong dài khoảng bao nhiêu?','How long is the loose section?',['loose sole','đế bong']],
      ['Nó dài khoảng năm centimet.','It is about five centimetres long.','Phần còn lại vẫn được gắn chắc.','The rest is still attached firmly.',['attached firmly','gắn chắc']],
      ['Mình mới thấy sau khi đi dưới mưa.','I noticed it after walking in the rain.','Nước có thể đã làm lớp keo cũ yếu đi.','Water may have weakened the old adhesive.',['old adhesive','keo cũ']],
    ]],
    ['Choosing the Repair','Chọn cách sửa','Thợ giải thích dán và khâu.','Chọn giải pháp theo độ bền.',[
      ['Chỉ dán lại có đủ không?','Is gluing it back enough?','Nó sẽ giữ, nhưng thêm đường khâu sẽ bền hơn.','It will hold, but adding stitches will be more durable.',['reinforce with stitching','gia cố bằng chỉ']],
      ['Đường khâu có nhìn thấy nhiều không?','Will the stitching be very visible?','Tôi có thể dùng chỉ đen gần giống màu đế.','I can use black thread that closely matches the sole.',['matching thread','chỉ cùng màu']],
      ['Mình chọn dán và khâu nhé.','I will choose glue and stitching.','Đó là lựa chọn tốt hơn cho giày đi hằng ngày.','That is the stronger option for everyday shoes.',['durable repair','sửa bền']],
    ]],
    ['Checking the Price','Hỏi giá','Khách hỏi chi phí trước khi để giày.','Hiểu giá và thời gian.',[
      ['Việc sửa này tốn bao nhiêu?','How much will this repair cost?','Dán và khâu có giá một trăm tám mươi nghìn đồng.','Gluing and stitching costs one hundred and eighty thousand dong.',['repair cost','chi phí sửa']],
      ['Giá đó áp dụng cho cả hai chiếc à?','Is that price for both shoes?','Chỉ một chiếc cần sửa, nên giá là cho một chiếc.','Only one shoe needs work, so the price is for one.',['single shoe','một chiếc giày']],
      ['Khi nào mình có thể nhận?','When can I collect it?','Nó sẽ sẵn sàng sau bốn giờ chiều mai.','It will be ready after four tomorrow afternoon.',['collection time','giờ nhận']],
    ]],
    ['Collecting the Shoes','Nhận giày','Khách quay lại và kiểm tra.','Xác nhận sửa và chăm sóc.',[
      ['Đây là phiếu nhận số 31.','Here is collection ticket number 31.','Cảm ơn, đôi giày của bạn ở trên kệ này.','Thank you. Your shoes are on this shelf.',['collection ticket','phiếu nhận']],
      ['Đường nối trông rất chắc.','The repaired edge looks very secure.','Hãy tránh làm ướt trong hai mươi bốn giờ đầu.','Avoid getting it wet for the first twenty-four hours.',['curing time','thời gian khô keo']],
      ['Mình sẽ thử đi vài bước trong cửa hàng.','I will try walking a few steps in the shop.','Hãy báo nếu bạn cảm thấy cạnh đế không đều.','Tell me if the sole edge feels uneven.',['check the repair','kiểm tra chỗ sửa']],
    ]],
  ]}),
  t({id:'joining-a-public-queue',title:'Joining a Public Queue',titleVi:'Xếp hàng nơi công cộng',category:'Daily Life',icon:'🚶',level:'A1',description:'Tìm cuối hàng, giữ chỗ và đi qua hàng.',grammar:['is-this','can','polite-requests'],scenarios:[
    ['Finding the End','Tìm cuối hàng','Nhiều người chờ vào một sự kiện.','Hỏi đúng cuối hàng.',[
      ['Xin lỗi, đây có phải cuối hàng không?','Excuse me. Is this the end of the queue?','Không, hàng tiếp tục quanh góc kia.','No. It continues around that corner.',['end of the queue','cuối hàng']],
      ['Mình nên đi theo hàng rào phải không?','Should I follow the barrier?','Đúng, người cuối đang đứng cạnh biển xanh.','Yes. The last person is beside the blue sign.',['queue barrier','hàng rào xếp hàng']],
      ['Cảm ơn, mình sẽ ra phía sau họ.','Thanks. I will join behind them.','Như vậy bạn sẽ ở đúng hàng.','That will put you in the correct line.',['join behind','xếp phía sau']],
    ]],
    ['Keeping a Place','Giữ chỗ','Một người cần đi vệ sinh ngắn.','Nhờ giữ chỗ lịch sự.',[
      ['Bạn có thể giữ chỗ cho mình hai phút không?','Could you hold my place for two minutes?','Được, mình sẽ nói nếu hàng di chuyển.','Yes. I will explain if the queue moves.',['hold a place','giữ chỗ']],
      ['Túi của mình sẽ ở lại đây.','My bag will remain here.','Hãy mang theo đồ có giá trị.','Take your valuable belongings with you.',['keep valuables','giữ đồ quý']],
      ['Mình sẽ quay lại ngay.','I will return straight away.','Tìm mình cạnh chiếc ô màu đỏ.','Look for me beside the red umbrella.',['return shortly','quay lại sớm']],
    ]],
    ['Letting Someone Pass','Cho người đi qua','Lối đi cắt ngang hàng.','Chừa đường mà không mất vị trí.',[
      ['Xin lỗi, tôi cần đi qua để tới cửa.','Excuse me. I need to pass through to reach the door.','Tất nhiên, chúng tôi sẽ lùi lại một chút.','Of course. We will step back slightly.',['let someone pass','cho người đi qua']],
      ['Cảm ơn, xe đẩy của tôi hơi rộng.','Thanks. My pushchair is rather wide.','Tôi sẽ giữ hàng rào để bạn qua an toàn.','I will hold the barrier so you can pass safely.',['make space','chừa chỗ']],
      ['Bây giờ mọi người có thể khép hàng lại.','Everyone can close the gap now.','Không ai bị mất vị trí.','Nobody has lost their place.',['close the gap','khép khoảng trống']],
    ]],
    ['Reaching the Front','Đến đầu hàng','Người xếp hàng đến quầy kiểm tra.','Chuẩn bị vé và không chặn dòng.',[
      ['Hãy chuẩn bị vé trước khi đến cửa.','Have your ticket ready before reaching the door.','Mình đã mở mã trên điện thoại.','I have opened the code on my phone.',['ticket ready','vé sẵn sàng']],
      ['Độ sáng màn hình có đủ không?','Is the screen bright enough?','Mình sẽ tăng sáng để máy quét đọc được.','I will increase it so the scanner can read it.',['screen brightness','độ sáng màn hình']],
      ['Sau khi quét, hãy đi sang bên phải.','After scanning, move to the right.','Như vậy người tiếp theo có thể bước lên.','That allows the next person to come forward.',['keep moving','tiếp tục di chuyển']],
    ]],
  ]}),
  t({id:'visiting-a-fishing-pond',title:'Visiting a Fishing Pond',titleVi:'Đi câu ở hồ',category:'Entertainment',icon:'🎣',level:'A1',description:'Thuê cần, chọn vị trí và thả cá an toàn.',grammar:['can-cannot','imperatives','where-questions'],scenarios:[
    ['Hiring Equipment','Thuê dụng cụ','Khách chưa có cần câu.','Thuê bộ cơ bản và mồi.',[
      ['Mình có thể thuê một chiếc cần không?','Can I hire a fishing rod?','Có, bộ cơ bản gồm cần, dây và phao.','Yes. The basic set includes a rod, line, and float.',['fishing rod','cần câu']],
      ['Mồi có được bán riêng không?','Is bait sold separately?','Một hộp mồi nhỏ có giá ba mươi nghìn.','A small tub of bait costs thirty thousand dong.',['bait tub','hộp mồi']],
      ['Mình thuê trong hai giờ nhé.','I will hire the set for two hours.','Hãy giữ thẻ thời gian này để trả đồ.','Keep this time card for returning the equipment.',['hire period','thời gian thuê']],
    ]],
    ['Choosing a Spot','Chọn vị trí','Khách tìm chỗ an toàn quanh hồ.','Ngồi đúng khu và giữ khoảng cách.',[
      ['Mình được câu ở phía nào của hồ?','Which side of the pond can I fish from?','Dùng các bục được đánh số ở bờ phía bắc.','Use the numbered platforms on the north bank.',['fishing platform','bục câu']],
      ['Bục số 7 đang trống phải không?','Is platform seven free?','Có, nhưng lối xuống hơi trơn.','Yes, but the path down is slightly slippery.',['north bank','bờ phía bắc']],
      ['Mình sẽ đi chậm và mang giày chắc.','I will walk slowly and wear firm shoes.','Đừng đứng sát mép nước.','Do not stand close to the water’s edge.',['water edge','mép nước']],
    ]],
    ['Using the Rod','Dùng cần câu','Người mới học ném dây.','Giữ móc xa người khác.',[
      ['Mình nên kiểm tra gì trước khi ném?','What should I check before casting?','Nhìn phía sau và hai bên để không có người.','Look behind and to both sides to ensure nobody is there.',['cast a line','ném dây']],
      ['Móc câu đang quá gần tay mình.','The hook is too close to my hand.','Giữ dây ở phần trên phao, không cầm móc.','Hold the line above the float rather than touching the hook.',['fishing hook','móc câu']],
      ['Mình sẽ ném nhẹ về phía giữa hồ.','I will cast gently towards the middle of the pond.','Thả ngón tay khỏi dây khi cần hướng về trước.','Release the line as the rod points forward.',['release the line','thả dây']],
    ]],
    ['Releasing a Fish','Thả cá','Một con cá nhỏ vừa cắn câu.','Xử lý nhẹ và thả nhanh.',[
      ['Mình vừa câu được một con cá nhỏ.','I have just caught a small fish.','Làm ướt tay trước khi chạm vào nó.','Wet your hands before touching it.',['handle gently','xử lý nhẹ']],
      ['Làm sao tháo móc an toàn?','How do I remove the hook safely?','Dùng kìm nhỏ và giữ cá gần mặt nước.','Use the small pliers and keep the fish close to the water.',['hook-removal pliers','kìm tháo móc']],
      ['Mình sẽ thả nó lại ngay.','I will release it immediately.','Đỡ cá trong nước đến khi nó tự bơi.','Support it in the water until it swims away.',['release a fish','thả cá']],
    ]],
  ]}),
  t({id:'reporting-a-broken-streetlight',title:'Reporting a Broken Streetlight',titleVi:'Báo đèn đường bị hỏng',category:'Community',icon:'💡',level:'A2',description:'Mô tả vị trí, mức nguy hiểm và theo dõi sửa chữa.',grammar:['present-perfect','describing-location','passive-voice'],scenarios:[
    ['Identifying the Light','Xác định cột đèn','Cư dân báo đèn tối nhiều đêm.','Cung cấp số cột và địa điểm.',[
      ['Đèn đường trước nhà tôi đã tắt ba đêm.','The streetlight outside my house has been off for three nights.','Bạn có thấy số nhận dạng trên cột không?','Can you see an identification number on the pole?',['streetlight number','số đèn đường']],
      ['Nhãn ghi SL-1842.','The label reads SL-1842.','Nó ở gần địa chỉ hoặc ngã tư nào?','Which address or junction is it close to?',['nearest junction','ngã tư gần nhất']],
      ['Nó nằm giữa số 24 và lối vào công viên.','It stands between number 24 and the park entrance.','Thông tin đó đủ để đội tìm đúng cột.','That is enough information for the team to locate the correct pole.',['exact location','vị trí chính xác']],
    ]],
    ['Describing the Fault','Mô tả lỗi','Biểu mẫu hỏi loại hỏng.','Phân biệt tắt hẳn và nhấp nháy.',[
      ['Đèn hoàn toàn không sáng hay nhấp nháy?','Is the light completely off, or does it flicker?','Nó bật vài phút lúc chạng vạng rồi tắt.','It comes on for a few minutes at dusk and then goes out.',['intermittent fault','lỗi chập chờn']],
      ['Bạn có nghe tiếng nổ hoặc thấy dây lộ không?','Have you heard a bang or seen any exposed wires?','Không, cột trông nguyên vẹn.','No. The pole appears undamaged.',['exposed wire','dây điện lộ']],
      ['Tôi sẽ ghi lỗi nguồn sáng không ổn định.','I will record an intermittent lighting failure.','Mô tả đó chính xác hơn chỉ ghi đèn hỏng.','That is more precise than merely saying the light is broken.',['fault description','mô tả lỗi']],
    ]],
    ['Explaining the Risk','Nêu mức nguy hiểm','Khu vực tối nằm cạnh lối qua đường.','Ưu tiên dựa trên nguy cơ.',[
      ['Cột đèn có gần nơi người đi bộ qua đường không?','Is the pole close to a pedestrian crossing?','Có, vạch qua đường cách khoảng mười mét.','Yes. The crossing is about ten metres away.',['pedestrian crossing','vạch qua đường']],
      ['Trẻ em dùng lối đó để đến trường sớm.','Children use that route to reach school early.','Tôi sẽ đánh dấu nguy cơ an toàn cao hơn.','I will mark the report as having a higher safety risk.',['safety priority','ưu tiên an toàn']],
      ['Trong lúc chờ sửa, có thể đặt biển tạm không?','Can a temporary warning be placed while we wait?','Đội hiện trường sẽ đánh giá khi họ kiểm tra cột.','The field team will assess that when they inspect the pole.',['temporary warning','cảnh báo tạm']],
    ]],
    ['Following the Report','Theo dõi báo cáo','Một tuần sau đèn chưa sửa.','Dùng mã hồ sơ và xin trạng thái.',[
      ['Tôi gọi để theo dõi báo cáo có mã L-9021.','I am following up on report reference L-9021.','Tôi thấy đội đã kiểm tra vào thứ Ba.','I can see that a team inspected it on Tuesday.',['report reference','mã báo cáo']],
      ['Đội kiểm tra đã phát hiện vấn đề gì?','What problem did the inspection team find?','Bộ phận điều khiển cần thay và đang chờ linh kiện.','The control unit needs replacement, and they are waiting for a part.',['replacement part','linh kiện thay']],
      ['Đội đã đưa ra ngày sửa dự kiến chưa?','Has the team provided an estimated repair date?','Công việc được lên lịch trước cuối thứ Sáu.','The work is scheduled before the end of Friday.',['estimated repair','ngày sửa dự kiến']],
    ]],
  ]}),
  t({id:'working-with-a-language-tutor',title:'Working with a Language Tutor',titleVi:'Học cùng gia sư ngôn ngữ',category:'Education',icon:'🗣️',level:'A2',description:'Đặt mục tiêu, chuẩn bị buổi học và dùng phản hồi.',grammar:['present-perfect','learning-language','future-forms'],scenarios:[
    ['Setting a Goal','Đặt mục tiêu','Người học bắt đầu với gia sư mới.','Chọn kỹ năng và bối cảnh cụ thể.',[
      ['Mục tiêu chính của bạn trong ba tháng tới là gì?','What is your main goal for the next three months?','Tôi muốn tự tin hơn khi nói trong các cuộc họp ngắn.','I want to feel more confident speaking in short meetings.',['learning goal','mục tiêu học']],
      ['Bạn gặp khó ở việc hiểu hay diễn đạt ý?','Do you struggle more with understanding others or expressing ideas?','Tôi hiểu phần lớn nhưng cần quá lâu để trả lời.','I understand most of the discussion, but I take too long to respond.',['response fluency','độ trôi chảy phản hồi']],
      ['Mình sẽ tập trung vào cụm câu để mở đầu và làm rõ.','We will focus on phrases for entering the discussion and clarifying points.','Đó là những tình huống tôi gặp hằng tuần.','Those are situations I encounter every week.',['meeting phrase','cụm câu họp']],
    ]],
    ['Preparing a Lesson','Chuẩn bị buổi học','Gia sư muốn dùng tình huống thật.','Mang tài liệu mà không lộ thông tin mật.',[
      ['Bạn có thể mang một chương trình họp mẫu không?','Can you bring a sample meeting agenda?','Tôi có thể tạo bản giả không có tên dự án.','I can create an anonymized version without project names.',['anonymized material','tài liệu ẩn danh']],
      ['Hãy đánh dấu ba điểm bạn thường muốn phát biểu.','Mark three points where you would normally want to speak.','Tôi sẽ chuẩn bị một cập nhật, một câu hỏi và một phản đối.','I will prepare an update, a question, and a disagreement.',['practice scenario','tình huống luyện']],
      ['Mình sẽ ghi âm phần luyện nếu bạn đồng ý.','I will record the practice if you consent.','Được, miễn là bản ghi chỉ dùng cho phản hồi và được xóa sau.','Yes, provided it is used only for feedback and deleted afterwards.',['lesson recording','bản ghi buổi học']],
    ]],
    ['Using Corrections','Dùng lời sửa','Người học bị ngắt quá nhiều khi nói.','Thống nhất thời điểm và loại phản hồi.',[
      ['Khi bạn sửa từng lỗi ngay, tôi mất dòng suy nghĩ.','When every error is corrected immediately, I lose my train of thought.','Mình có thể ghi lỗi và phản hồi sau khi bạn nói xong.','I can note errors and give feedback after you finish speaking.',['delayed correction','sửa sau']],
      ['Hãy ngắt ngay chỉ khi lỗi làm ý khó hiểu.','Interrupt immediately only when an error makes the meaning unclear.','Vậy lỗi nhỏ về mạo từ sẽ được xem ở cuối.','Then small article errors will be reviewed at the end.',['feedback preference','cách phản hồi mong muốn']],
      ['Tôi cũng muốn biết một lỗi lặp quan trọng nhất mỗi buổi.','I also want to know the most important recurring error in each lesson.','Một trọng tâm rõ sẽ dễ áp dụng hơn danh sách dài.','One clear focus will be easier to apply than a long list.',['recurring error','lỗi lặp']],
    ]],
    ['Reviewing Progress','Xem lại tiến bộ','Sau sáu tuần, hai người đánh giá bằng bằng chứng.','Điều chỉnh mục tiêu tiếp theo.',[
      ['Bạn đã nói trong bốn cuộc họp tuần này.','You contributed in four meetings this week.','Trước đây tôi thường im lặng trong cả tuần.','Previously, I often remained silent throughout the week.',['progress evidence','bằng chứng tiến bộ']],
      ['Cụm mở đầu nào đã trở nên tự nhiên?','Which opening phrase has become automatic?','Tôi dùng “Could I add one point?” mà không phải dịch.','I use “Could I add one point?” without translating it first.',['automatic phrase','cụm tự động']],
      ['Bước tiếp theo có thể là xử lý câu hỏi bất ngờ.','The next step could be handling unexpected questions.','Tôi muốn luyện xin thời gian suy nghĩ mà vẫn giữ lượt nói.','I want to practise buying thinking time while keeping my turn.',['next learning step','bước học tiếp']],
    ]],
  ]}),
  t({id:'preparing-for-a-mountain-trip',title:'Preparing for a Mountain Trip',titleVi:'Chuẩn bị chuyến đi vùng núi',category:'Travel',icon:'🏔️',level:'A2',description:'Chuẩn bị lớp áo, độ cao và kế hoạch liên lạc.',grammar:['should-must','conditionals','future-forms'],scenarios:[
    ['Packing Layers','Chuẩn bị lớp áo','Dự báo thay đổi nhiệt độ lớn.','Mang lớp khô và chống gió.',[
      ['Dưới thung lũng là hai mươi độ nhưng trên cao chỉ tám độ.','It will be twenty degrees in the valley but only eight higher up.','Mình cần nhiều lớp thay vì một áo rất dày.','We need several layers rather than one extremely thick coat.',['clothing layer','lớp áo']],
      ['Lớp ngoài có chống gió không?','Is the outer layer windproof?','Có, nó cũng chống mưa nhẹ.','Yes. It is also resistant to light rain.',['windproof jacket','áo chống gió']],
      ['Mình sẽ để một lớp khô trong túi chống nước.','I will keep one dry layer in a waterproof bag.','Phần đó nên giữ riêng cho tình huống lạnh bất ngờ.','That should remain separate for an unexpected drop in temperature.',['dry spare layer','lớp khô dự phòng']],
    ]],
    ['Planning for Altitude','Chuẩn bị độ cao','Một thành viên chưa từng lên cao.','Đi chậm và nhận biết triệu chứng.',[
      ['Điểm cao nhất của tuyến là bao nhiêu?','What is the highest altitude on the route?','Nó đạt khoảng hai nghìn tám trăm mét.','It reaches approximately two thousand eight hundred metres.',['highest altitude','độ cao lớn nhất']],
      ['Mình nên lên thẳng trong một ngày không?','Should we go directly there in one day?','Hãy ngủ một đêm ở độ cao thấp hơn và tăng từ từ.','Spend one night lower down and ascend gradually.',['ascend gradually','lên cao từ từ']],
      ['Nếu đau đầu và buồn nôn tăng thì sao?','What if a headache and nausea become worse?','Đừng đi cao hơn; hãy xuống thấp và tìm tư vấn.','Do not ascend further. Descend and seek advice.',['altitude symptom','triệu chứng độ cao']],
    ]],
    ['Sharing the Route','Chia sẻ tuyến','Tuyến có đoạn không có sóng.','Để người khác biết lịch và điểm kiểm tra.',[
      ['Mình sẽ gửi bản đồ tuyến cho ai?','Who should receive a copy of our route?','Gửi cho người liên hệ ở nhà cùng giờ dự kiến về.','Send it to our home contact with the expected return time.',['route plan','kế hoạch tuyến']],
      ['Trên đường có những điểm báo an toàn nào?','Which safety check-in points are on the route?','Mình sẽ nhắn ở nhà nghỉ và trạm kiểm lâm nếu có sóng.','We will message at the hut and ranger station if there is signal.',['check-in point','điểm báo tin']],
      ['Nếu quá giờ hai tiếng mà không có tin thì sao?','What happens if we are two hours late without contact?','Người liên hệ sẽ gọi trung tâm kiểm lâm với thông tin tuyến.','The contact will call the ranger centre with our route details.',['overdue procedure','quy trình quá giờ']],
    ]],
    ['Checking Conditions','Kiểm tra điều kiện','Ngày khởi hành có mây thấp và mưa.','Dùng thông tin địa phương để quyết định.',[
      ['Dự báo thành phố có đủ cho khu núi không?','Is the city forecast sufficient for the mountain area?','Không, điều kiện trên cao có thể rất khác.','No. Conditions at altitude can be substantially different.',['mountain forecast','dự báo vùng núi']],
      ['Trung tâm kiểm lâm báo tầm nhìn dưới năm mươi mét.','The ranger centre reports visibility below fifty metres.','Vậy tuyến sườn núi không an toàn hôm nay.','Then the ridge route is not safe today.',['poor visibility','tầm nhìn kém']],
      ['Mình sẽ chọn tuyến rừng thấp hơn hoặc hoãn.','We will choose the lower forest route or postpone.','Mục tiêu là trở về an toàn, không phải hoàn thành bằng mọi giá.','The goal is to return safely, not to finish at any cost.',['turnaround decision','quyết định quay lại']],
    ]],
  ]}),
  t({id:'managing-household-subscriptions',title:'Managing Household Subscriptions',titleVi:'Quản lý các gói đăng ký gia đình',category:'Home',icon:'📺',level:'A2',description:'Kiểm kê, hủy trùng và theo dõi gia hạn.',grammar:['present-perfect','comparatives','conditionals'],scenarios:[
    ['Listing the Services','Liệt kê dịch vụ','Gia đình xem các khoản tự động hàng tháng.','Tìm gói bị quên và người dùng.',[
      ['Mình đang trả cho bao nhiêu dịch vụ xem phim?','How many streaming services are we paying for?','Bảng kê cho thấy bốn khoản riêng.','The statement shows four separate charges.',['recurring subscription','gói định kỳ']],
      ['Có một dịch vụ mình không nhớ đã đăng ký.','There is one service that I do not remember joining.','Hãy tìm email xác nhận theo tên nhà bán.','Search for a confirmation email using the merchant name.',['merchant name','tên nhà bán']],
      ['Nó là bản dùng thử đã chuyển thành gói trả phí.','It was a trial that converted into a paid plan.','Mình sẽ đánh dấu để hủy trước kỳ tiếp theo.','We will mark it for cancellation before the next cycle.',['trial conversion','chuyển từ dùng thử']],
    ]],
    ['Checking Actual Use','Kiểm tra mức sử dụng','Gia đình không muốn hủy dịch vụ có giá trị.','So sánh phí với việc dùng thật.',[
      ['Có ai đã dùng ứng dụng tập luyện tháng này không?','Has anyone used the fitness app this month?','Chỉ mình dùng hai lần trong sáu tuần.','Only I have used it twice in six weeks.',['usage history','lịch sử sử dụng']],
      ['Gói năm rẻ theo tháng nhưng vẫn lãng phí nếu không dùng.','The annual plan is cheaper monthly but still wasteful if unused.','Mình có thể tạm dừng thay vì hủy hoàn toàn không?','Can we pause it rather than cancel completely?',['pause a plan','tạm dừng gói']],
      ['Dịch vụ cho phép tạm dừng ba tháng.','The service allows a three-month pause.','Hãy dùng thời gian đó để xem mình có quay lại không.','Use that period to see whether we return to it.',['value for money','đáng tiền']],
    ]],
    ['Removing Overlap','Loại gói trùng','Hai gói âm nhạc cung cấp nội dung giống nhau.','Chọn theo nhu cầu và tính năng.',[
      ['Cả hai gói đều có danh sách nhạc gia đình.','Both plans provide family music libraries.','Gói nào hoạt động trên loa trong bếp?','Which one works with the kitchen speaker?',['overlapping service','dịch vụ trùng']],
      ['Chỉ gói A kết nối trực tiếp với thiết bị đó.','Only plan A connects directly to that device.','Gói B có âm thanh tốt hơn nhưng ít người nhận ra khác biệt.','Plan B has higher audio quality, but few of us notice the difference.',['feature comparison','so sánh tính năng']],
      ['Vậy giữ gói A phù hợp cách dùng thật hơn.','Then keeping plan A better matches our actual use.','Mình sẽ tải danh sách yêu thích trước khi hủy gói B.','I will export the favourites before cancelling plan B.',['export data','xuất dữ liệu']],
    ]],
    ['Tracking Renewals','Theo dõi gia hạn','Gia đình muốn tránh phí bất ngờ.','Ghi ngày và cảnh báo trước.',[
      ['Gói lưu trữ sẽ gia hạn năm vào ngày nào?','On which date will the storage plan renew annually?','Nó gia hạn vào ngày 18 tháng sau.','It renews on the eighteenth of next month.',['renewal date','ngày gia hạn']],
      ['Mình sẽ đặt lịch nhắc trước hai tuần.','I will set a reminder two weeks beforehand.','Như vậy còn thời gian so sánh hoặc đổi gói.','That leaves time to compare options or switch plans.',['renewal reminder','nhắc gia hạn']],
      ['Bảng chung nên ghi giá, ngày và người phụ trách.','The shared list should record price, date, and the person responsible.','Một người rõ ràng sẽ tránh mọi người nghĩ người khác đã hủy.','A named owner prevents everyone assuming someone else cancelled it.',['subscription owner','người phụ trách gói']],
    ]],
  ]}),
  t({id:'planning-a-park-picnic',title:'Planning a Park Picnic',titleVi:'Lên kế hoạch dã ngoại công viên',category:'Friends & Social Life',icon:'🧺',level:'A2',description:'Chọn địa điểm, chia đồ và có phương án thời tiết.',grammar:['future-arrangements','some-any','conditionals'],scenarios:[
    ['Choosing the Spot','Chọn địa điểm','Bạn bè chọn khu trong công viên.','Cân bằng bóng râm, nhà vệ sinh và đông người.',[
      ['Bãi cỏ gần hồ có nhiều bóng râm không?','Does the lawn near the lake have much shade?','Có vài cây lớn nhưng khu đó đông vào buổi trưa.','There are several large trees, but that area becomes crowded at midday.',['shaded lawn','bãi cỏ có bóng râm']],
      ['Khu phía bắc yên hơn nhưng xa nhà vệ sinh.','The northern area is quieter but farther from the toilets.','Vì có trẻ nhỏ, vị trí gần tiện ích thực tế hơn.','With young children, the place near the facilities is more practical.',['near facilities','gần tiện ích']],
      ['Mình sẽ đến sớm để tìm bàn dưới cây.','I will arrive early to find a table beneath a tree.','Đừng giữ nhiều bàn hơn nhóm thực sự cần.','Do not reserve more tables than the group genuinely needs.',['picnic table','bàn dã ngoại']],
    ]],
    ['Sharing the Food','Chia đồ ăn','Nhóm muốn tránh quá nhiều món giống nhau.','Phân loại và ghi dị ứng.',[
      ['Hiện ai cũng đăng ký mang đồ ăn ngọt.','At present, everyone has offered to bring sweet food.','Mình cần thêm món mặn, trái cây và nước.','We need more savoury dishes, fruit, and water.',['savoury dish','món mặn']],
      ['Tôi có thể làm bánh mì kẹp không có sữa.','I can make dairy-free sandwiches.','Hãy ghi nguyên liệu để người dị ứng kiểm tra.','List the ingredients so that people with allergies can check.',['ingredient list','danh sách nguyên liệu']],
      ['Mỗi người nên mang hộp và cốc tái sử dụng.','Everyone should bring reusable containers and cups.','Điều đó giảm rác và giúp mang đồ thừa về.','That reduces waste and makes leftovers easier to take home.',['reusable container','hộp tái sử dụng']],
    ]],
    ['Planning Activities','Lên hoạt động','Nhóm có nhiều độ tuổi và sở thích.','Chọn hoạt động tự chọn, an toàn.',[
      ['Mình có thể mang bóng và bộ bài.','We can bring a ball and a pack of cards.','Như vậy có cả hoạt động vận động và ngồi.','That provides both an active and a seated activity.',['optional activity','hoạt động tự chọn']],
      ['Trò chơi bóng nên ở xa khu ăn.','The ball game should take place away from the food area.','Khu trống cạnh đường đi phù hợp hơn.','The open area beside the path is more suitable.',['open play area','khu chơi trống']],
      ['Không ai phải tham gia mọi trò.','Nobody has to join every activity.','Mọi người có thể nghỉ hoặc trò chuyện khi muốn.','People can rest or talk whenever they wish.',['join freely','tham gia tự do']],
    ]],
    ['Preparing for Weather','Chuẩn bị thời tiết','Dự báo có mưa rào chiều.','Đặt điểm quyết định và địa điểm thay thế.',[
      ['Khả năng mưa sau hai giờ là sáu mươi phần trăm.','The chance of rain after two is sixty percent.','Mình nên xem dự báo lại vào sáng hôm đó.','We should check the forecast again that morning.',['rain shower','mưa rào']],
      ['Nếu mưa kéo dài, mình có thể chuyển đến nhà cộng đồng.','If the rain is persistent, we can move to the community hall.','Phòng nhỏ ở đó cần đặt trước.','The small room there needs advance reservation.',['indoor backup','phương án trong nhà']],
      ['Mình sẽ giữ phòng với quyền hủy đến tám giờ sáng.','I will hold the room with cancellation allowed until eight in the morning.','Như vậy nhóm có lựa chọn mà không trả hai lần.','That gives the group an option without paying twice.',['weather backup','dự phòng thời tiết']],
    ]],
  ]}),
  t({id:'planning-small-business-cashflow',title:'Planning Small-Business Cash Flow',titleVi:'Lập dòng tiền cho doanh nghiệp nhỏ',category:'Business',icon:'💵',level:'B1',description:'Dự báo tiền vào, ưu tiên chi và chuẩn bị thiếu hụt.',grammar:['future-forms','conditionals','quantifiers'],scenarios:[
    ['Mapping Money In','Lập bản đồ tiền vào','Chủ cửa hàng rà soát tiền dự kiến tháng tới.','Phân biệt doanh thu và tiền thực nhận.',[
      ['Doanh số tháng trước khá tốt, sao tài khoản vẫn thấp?','Sales were healthy last month, so why is the account balance still low?','Một số khách hàng chưa thanh toán hóa đơn ba mươi ngày.','Several clients have not yet paid their thirty-day invoices.',['accounts receivable','khoản phải thu']],
      ['Mình nên ghi doanh thu khi bán hay khi nhận tiền?','Should we record income when we sell or when cash arrives?','Trong dự báo dòng tiền, hãy dùng ngày tiền thực sự có sẵn.','For the cash-flow forecast, use the date when funds are actually available.',['cash inflow','tiền vào']],
      ['Vậy tuần thứ hai có khoảng trống lớn.','Then there is a significant gap in the second week.','Đúng, hai hóa đơn lớn chỉ đến vào cuối tháng.','Correct. Two large invoices are not due until month-end.',['payment timing','thời điểm thanh toán']],
    ]],
    ['Prioritising Payments','Ưu tiên thanh toán','Tiền hiện có không đủ trả mọi khoản cùng lúc.','Xếp chi phí theo mức thiết yếu và hạn.',[
      ['Khoản nào phải được trả trước?','Which payments must be made first?','Lương, thuế đến hạn và tiền thuê là các nghĩa vụ thiết yếu.','Payroll, tax due, and rent are essential obligations.',['essential obligation','nghĩa vụ thiết yếu']],
      ['Mình có thể hoãn đơn bao bì mới không?','Could we postpone the new packaging order?','Có, lượng tồn kho hiện tại đủ dùng thêm ba tuần.','Yes. Current stock will last for another three weeks.',['defer a purchase','hoãn mua hàng']],
      ['Đừng chỉ trả nhà cung cấp nào gọi trước.','We should not simply pay whichever supplier calls first.','Hãy dùng ngày đến hạn và tác động kinh doanh để quyết định.','Use due dates and business impact to decide.',['payment priority','ưu tiên thanh toán']],
    ]],
    ['Handling a Shortfall','Xử lý thiếu hụt','Dự báo cho thấy thiếu tiền trong mười ngày.','Chọn biện pháp ít tốn kém nhất.',[
      ['Mình thiếu khoảng bốn mươi triệu trong thời gian ngắn.','We are short by about forty million for a brief period.','Trước tiên hãy hỏi khách liệu họ có thể thanh toán sớm để được giảm nhỏ.','First ask whether clients can pay early for a small discount.',['temporary shortfall','thiếu hụt tạm thời']],
      ['Nếu vậy chưa đủ thì sao?','What if that is not enough?','So sánh hạn mức tín dụng với việc chủ sở hữu góp tạm thời.','Compare the credit facility with a temporary owner contribution.',['credit facility','hạn mức tín dụng']],
      ['Mình sẽ tính cả phí chứ không chỉ lãi suất.','I will calculate the fees as well as the interest rate.','Chi phí toàn phần mới cho thấy lựa chọn nào rẻ hơn.','The total cost shows which option is cheaper.',['total borrowing cost','tổng chi phí vay']],
    ]],
    ['Updating the Forecast','Cập nhật dự báo','Kết quả thật khác dự báo ban đầu.','Học từ chênh lệch và cập nhật hằng tuần.',[
      ['Chi phí giao hàng cao hơn dự tính mười hai phần trăm.','Delivery costs were twelve percent above the estimate.','Hãy ghi nguyên nhân thay vì chỉ thay con số tháng sau.','Record the reason rather than merely changing next month’s number.',['forecast variance','chênh lệch dự báo']],
      ['Giá nhiên liệu tăng và mình có nhiều đơn xa hơn.','Fuel prices rose, and we had more distant orders.','Vậy hãy tách tác động giá khỏi thay đổi số chuyến.','Then separate the price effect from the change in trip volume.',['cost driver','yếu tố chi phí']],
      ['Mình sẽ cập nhật dự báo vào mỗi thứ Sáu.','I will update the forecast every Friday.','Một nhịp đều giúp phát hiện vấn đề trước khi tài khoản cạn.','A regular rhythm helps reveal problems before the account runs dry.',['rolling forecast','dự báo cuốn chiếu']],
    ]],
  ]}),
  t({id:'resolving-a-school-bullying-report',title:'Resolving a School Bullying Report',titleVi:'Xử lý báo cáo bắt nạt học đường',category:'Education',icon:'🏫',level:'B1',description:'Ghi nhận an toàn, thu thập sự kiện và theo dõi hỗ trợ.',grammar:['reported-speech','past-tenses','modal-verbs'],scenarios:[
    ['Receiving the Report','Tiếp nhận báo cáo','Một học sinh kể về hành vi lặp lại.','Lắng nghe mà không dẫn dắt câu trả lời.',[
      ['Cảm ơn em đã nói với cô; hiện giờ em có an toàn không?','Thank you for telling me. Are you safe right now?','Em an toàn trong lớp này, nhưng em sợ giờ ra chơi.','I am safe in this room, but I am worried about break time.',['immediate safety','an toàn tức thời']],
      ['Em có thể kể điều gì đã xảy ra bằng lời của mình không?','Can you describe what happened in your own words?','Ba bạn đã giấu cặp và gọi tên em nhiều lần.','Three students hid my bag and repeatedly called me names.',['open question','câu hỏi mở']],
      ['Cô sẽ ghi đúng điều em nói và giải thích bước tiếp theo.','I will record your words accurately and explain the next step.','Xin đừng bắt em đối mặt với họ một mình.','Please do not make me face them alone.',['record a disclosure','ghi nhận lời kể']],
    ]],
    ['Establishing Facts','Xác minh sự kiện','Nhà trường cần hiểu mẫu hành vi.','Tách điều quan sát được khỏi suy đoán.',[
      ['Sự việc xảy ra vào ngày và nơi nào?','On which dates and in which places did the incidents occur?','Hai lần ở sân bóng và một lần trên xe buýt tuần này.','Twice on the sports field and once on the bus this week.',['incident timeline','dòng thời gian sự việc']],
      ['Có ai nhìn thấy hoặc có tin nhắn liên quan không?','Did anyone witness it, or are there relevant messages?','Một bạn đã thấy ở sân, và em còn ảnh chụp màn hình.','One classmate saw it in the yard, and I still have screenshots.',['supporting evidence','bằng chứng hỗ trợ']],
      ['Chúng ta chưa kết luận động cơ cho đến khi nghe riêng từng người.','We will not conclude motives until each person has been heard separately.','Nhưng nhà trường có thể bảo vệ em trong lúc xác minh.','But the school can protect me while it investigates.',['fair investigation','xác minh công bằng']],
    ]],
    ['Creating a Safety Plan','Lập kế hoạch an toàn','Cần hỗ trợ ngay trong thời gian điều tra.','Thống nhất người lớn và địa điểm an toàn.',[
      ['Em muốn tìm ai nếu cảm thấy không an toàn?','Who would you like to approach if you feel unsafe?','Em có thể đến cô phụ trách thư viện.','I could go to the librarian.',['trusted adult','người lớn tin cậy']],
      ['Giáo viên trực sẽ để ý khu sân bóng mà không làm em nổi bật.','The duty teacher will monitor the sports field without singling you out.','Em cũng muốn đi cùng một người bạn ra xe buýt.','I would also like to walk to the bus with a friend.',['safety plan','kế hoạch an toàn']],
      ['Cô sẽ kiểm tra với em vào cuối mỗi ngày trong tuần này.','I will check in with you at the end of each day this week.','Nếu có chuyện mới, em sẽ báo ngay thay vì chờ buổi kiểm tra.','If anything new happens, I will report it immediately rather than wait.',['daily check-in','kiểm tra hằng ngày']],
    ]],
    ['Reviewing the Response','Rà soát xử lý','Nhà trường gặp gia đình sau một tuần.','Đánh giá an toàn và thay đổi hành vi.',[
      ['Từ khi áp dụng kế hoạch, sự việc có lặp lại không?','Have any incidents occurred since the plan began?','Không có việc giấu đồ, nhưng một tin nhắn khó chịu đã đến hôm qua.','Nothing has been hidden, but an upsetting message arrived yesterday.',['ongoing monitoring','theo dõi liên tục']],
      ['Nhà trường đã lưu tin nhắn và điều chỉnh biện pháp hỗ trợ.','The school has saved the message and adjusted the support measures.','Khi nào gia đình nhận được bản cập nhật bằng văn bản?','When will the family receive a written update?',['written update','cập nhật bằng văn bản']],
      ['Chúng tôi sẽ gửi vào thứ Sáu và họp lại sau hai tuần.','We will send it on Friday and meet again in two weeks.','Mục tiêu là an toàn bền vững, không chỉ dừng sự việc vài ngày.','The goal is lasting safety, not merely stopping incidents for a few days.',['follow-up review','rà soát tiếp theo']],
    ]],
  ]}),
  t({id:'negotiating-event-sponsorship',title:'Negotiating Event Sponsorship',titleVi:'Đàm phán tài trợ sự kiện',category:'Business',icon:'🤝',level:'B1',description:'Làm rõ giá trị, quyền lợi và cách đo kết quả tài trợ.',grammar:['conditionals','comparatives','negotiation-language'],scenarios:[
    ['Understanding Objectives','Hiểu mục tiêu','Nhà tổ chức gặp một doanh nghiệp địa phương.','Tìm mục tiêu thật thay vì bán gói có sẵn.',[
      ['Điều gì khiến công ty quan tâm đến sự kiện này?','What has made the company interested in this event?','Chúng tôi muốn tiếp cận các gia đình trẻ trong khu vực.','We want to reach young families in the local area.',['sponsor objective','mục tiêu nhà tài trợ']],
      ['Nhận diện thương hiệu hay đăng ký dùng thử quan trọng hơn?','Is brand awareness or trial registration more important?','Đăng ký đo được quan trọng hơn logo xuất hiện đơn thuần.','Measurable registrations matter more than logo exposure alone.',['measurable outcome','kết quả đo được']],
      ['Vậy mình nên thiết kế quyền lợi quanh tương tác trực tiếp.','Then we should design the benefits around direct engagement.','Đúng, miễn là trải nghiệm của khách tham dự vẫn tự nhiên.','Yes, provided that the attendee experience remains natural.',['audience engagement','tương tác khán giả']],
    ]],
    ['Shaping the Package','Thiết kế gói','Gói tiêu chuẩn chưa phù hợp mục tiêu.','Đổi quyền lợi trong cùng ngân sách.',[
      ['Gói vàng gồm hai banner lớn mà chúng tôi không cần.','The gold package includes two large banners that we do not need.','Mình có thể đổi một banner lấy khu trải nghiệm nhỏ.','We could exchange one banner for a small demonstration area.',['sponsorship benefit','quyền lợi tài trợ']],
      ['Khu đó cần điện và hai bàn.','That area would require power and two tables.','Chúng tôi có thể cung cấp nếu công ty tự bố trí nhân sự.','We can provide those if the company supplies its own staff.',['in-kind support','hỗ trợ hiện vật']],
      ['Giá có giữ nguyên nếu mình đổi quyền lợi không?','Would the price remain unchanged if we exchanged those benefits?','Có, vì chi phí vận hành tương đương.','Yes, because the operating costs are comparable.',['custom package','gói tùy chỉnh']],
    ]],
    ['Agreeing Measurement','Thống nhất đo lường','Hai bên cần biết tài trợ có hiệu quả không.','Chọn chỉ số và cách thu thập hợp lệ.',[
      ['Mình sẽ đếm đăng ký tại gian hàng thế nào?','How will we count registrations at the stand?','Mỗi lượt sẽ dùng mã QR riêng của sự kiện.','Each one will use an event-specific QR code.',['tracking code','mã theo dõi']],
      ['Nhà tổ chức có chia sẻ địa chỉ email không?','Will the organiser share visitors’ email addresses?','Chỉ khi từng người đồng ý rõ ràng với công ty tài trợ.','Only when each person explicitly consents to the sponsor.',['explicit consent','đồng ý rõ ràng']],
      ['Báo cáo cuối sẽ gồm lượt quét, đăng ký và phản hồi ẩn danh.','The final report will include scans, registrations, and anonymous feedback.','Như vậy mình có cả phạm vi tiếp cận và chuyển đổi.','That gives us both reach and conversion.',['sponsor report','báo cáo tài trợ']],
    ]],
    ['Confirming the Agreement','Xác nhận thỏa thuận','Các điều chính đã thống nhất.','Ghi trách nhiệm, hạn và phương án hủy.',[
      ['Công ty cần gửi logo cuối cùng trước ngày 12.','The company needs to provide the final logo by the twelfth.','Nhà tổ chức sẽ duyệt thiết kế trong hai ngày làm việc.','The organiser will approve the artwork within two working days.',['delivery deadline','hạn bàn giao']],
      ['Nếu sự kiện bị hủy vì thời tiết thì khoản phí ra sao?','What happens to the fee if weather causes the event to be cancelled?','Bảy mươi phần trăm được hoàn, còn chi phí đã phát sinh được khấu trừ.','Seventy percent is refunded, with incurred costs deducted.',['cancellation clause','điều khoản hủy']],
      ['Hãy đưa mọi thay đổi vào phụ lục trước khi ký.','Let us put every modification into the schedule before signing.','Như vậy hợp đồng phản ánh đúng gói tùy chỉnh.','That ensures the contract reflects the customised package.',['written schedule','phụ lục văn bản']],
    ]],
  ]}),
  t({id:'preparing-for-a-panel-interview',title:'Preparing for a Panel Interview',titleVi:'Chuẩn bị phỏng vấn hội đồng',category:'Work',icon:'🪑',level:'B1',description:'Nghiên cứu hội đồng, cấu trúc ví dụ và xử lý câu hỏi nối tiếp.',grammar:['past-tenses','indirect-questions','discourse-markers'],scenarios:[
    ['Researching the Panel','Tìm hiểu hội đồng','Ứng viên nhận tên ba người phỏng vấn.','Hiểu vai trò mà không suy đoán cá nhân.',[
      ['Mình biết trưởng nhóm và đại diện nhân sự sẽ tham dự.','I know the team lead and an HR representative will attend.','Người thứ ba phụ trách vận hành tại khu vực.','The third person manages regional operations.',['panel member','thành viên hội đồng']],
      ['Mình nên chuẩn bị câu trả lời khác cho từng người không?','Should I prepare different answers for each person?','Hãy giữ thông điệp nhất quán nhưng liên hệ ví dụ với mối quan tâm của họ.','Keep the message consistent, but relate examples to their likely concerns.',['consistent message','thông điệp nhất quán']],
      ['Mình sẽ không giả định ai là người quyết định duy nhất.','I will not assume that one person is the sole decision-maker.','Hãy giao tiếp bằng mắt với cả hội đồng khi trả lời.','Make eye contact with the whole panel while answering.',['decision-maker','người quyết định']],
    ]],
    ['Structuring Evidence','Cấu trúc bằng chứng','Ứng viên luyện một ví dụ về cải tiến quy trình.','Làm rõ hành động cá nhân và kết quả.',[
      ['Câu chuyện của mình bắt đầu bằng quá nhiều bối cảnh.','My story begins with too much background.','Tóm tắt tình huống trong hai câu rồi chuyển sang nhiệm vụ.','Summarise the situation in two sentences, then move to the task.',['concise context','bối cảnh ngắn gọn']],
      ['Mình đã phân tích lỗi và đề xuất bước kiểm tra mới.','I analysed the errors and proposed a new checking step.','Hãy nói rõ bạn tự làm gì và phối hợp việc gì.','Clarify what you did personally and what was collaborative.',['individual contribution','đóng góp cá nhân']],
      ['Tỷ lệ lỗi giảm từ tám xuống ba phần trăm trong hai tháng.','The error rate fell from eight to three percent in two months.','Kết quả định lượng làm bằng chứng đáng tin hơn.','The quantified result makes the evidence more credible.',['quantified result','kết quả định lượng']],
    ]],
    ['Handling Follow-ups','Xử lý câu hỏi nối tiếp','Hội đồng có thể thử độ sâu của câu trả lời.','Dừng, làm rõ và trả lời trực tiếp.',[
      ['Nếu họ hỏi điều mình sẽ làm khác đi thì sao?','What if they ask what I would do differently?','Thừa nhận một cải tiến thật và giải thích bài học.','Acknowledge a genuine improvement and explain the lesson.',['reflective answer','câu trả lời phản tư']],
      ['Mình có thể xin họ nhắc lại câu hỏi phức tạp không?','Can I ask them to repeat a complicated question?','Có, hoặc diễn đạt lại để xác nhận bạn hiểu đúng.','Yes, or paraphrase it to confirm your understanding.',['clarifying question','câu hỏi làm rõ']],
      ['Đừng lấp khoảng lặng bằng câu trả lời vội.','Do not fill every pause with a rushed answer.','Vài giây suy nghĩ thường tạo câu trả lời rõ hơn.','A few seconds of thought usually produces a clearer response.',['thinking pause','khoảng dừng suy nghĩ']],
    ]],
    ['Closing Well','Kết thúc tốt','Cuộc phỏng vấn dành thời gian cho ứng viên hỏi.','Hỏi cụ thể và xác nhận bước tiếp theo.',[
      ['Mình muốn hỏi thành công trong sáu tháng đầu được đo thế nào.','I want to ask how success is measured in the first six months.','Đó là câu hỏi cụ thể cho thấy bạn nghĩ về kết quả.','That is a specific question showing that you think about outcomes.',['success measure','thước đo thành công']],
      ['Có nên hỏi ba câu không?','Should I ask three questions?','Chuẩn bị ba nhưng chọn một hoặc hai theo thời gian còn lại.','Prepare three, but choose one or two according to the remaining time.',['remaining time','thời gian còn lại']],
      ['Cuối cùng mình sẽ hỏi khi nào có quyết định.','Finally, I will ask when a decision is expected.','Bạn cũng có thể xác nhận người liên hệ cho câu hỏi bổ sung.','You can also confirm the contact for any follow-up questions.',['next step','bước tiếp theo']],
    ]],
  ]}),
  t({id:'managing-community-conflict',title:'Managing Community Conflict',titleVi:'Quản lý xung đột cộng đồng',category:'Community',icon:'🕊️',level:'B1',description:'Hạ nhiệt tranh luận, tìm nhu cầu chung và thử giải pháp.',grammar:['reported-speech','conditionals','contrast-linkers'],scenarios:[
    ['Setting Ground Rules','Đặt quy tắc','Một cuộc họp khu phố căng thẳng vì tiếng ồn.','Tạo điều kiện để mọi bên được nghe.',[
      ['Mọi người đang ngắt lời nhau nên mình chưa nghe đủ vấn đề.','People are interrupting one another, so we have not heard the full issue.','Hãy để mỗi người nói hai phút mà không bị chen ngang.','Let each person speak for two minutes without interruption.',['ground rule','quy tắc nền']],
      ['Mình sẽ nói về hành vi cụ thể, không công kích cá nhân.','We will discuss specific behaviour rather than attack individuals.','Nếu giọng nói tăng lên, chủ tọa sẽ tạm dừng cuộc họp.','If voices rise, the chair will pause the meeting.',['personal attack','công kích cá nhân']],
      ['Mọi ý kiến sẽ được ghi vào bảng chung.','Every concern will be recorded on the shared board.','Điều đó giúp không ai phải lặp lại chỉ để được chú ý.','That means nobody needs to repeat a point merely to be noticed.',['facilitated discussion','thảo luận có điều phối']],
    ]],
    ['Identifying Interests','Xác định lợi ích','Các bên đang bảo vệ vị trí trái ngược.','Tìm nhu cầu nằm dưới yêu cầu.',[
      ['Cư dân muốn sự kiện kết thúc lúc chín giờ.','Residents want the event to finish at nine.','Nhà tổ chức nói mười một giờ mới đủ doanh thu.','The organiser says that only an eleven o’clock finish provides enough income.',['stated position','lập trường nêu ra']],
      ['Điều quan trọng nhất với cư dân là giấc ngủ hay giao thông?','Is sleep or traffic the residents’ main concern?','Âm trầm sau mười giờ làm nhà rung mới là vấn đề lớn nhất.','Bass after ten, which makes houses vibrate, is the main problem.',['underlying interest','lợi ích cốt lõi']],
      ['Nhà tổ chức cần thời lượng bán hàng, không nhất thiết cần âm lượng cao.','The organiser needs trading time, not necessarily high volume.','Điều đó mở ra nhiều giải pháp hơn hai giờ kết thúc đối lập.','That creates more options than two opposing finish times.',['shared understanding','hiểu biết chung']],
    ]],
    ['Testing an Option','Thử giải pháp','Nhóm đề xuất thay đổi âm thanh sau mười giờ.','Đặt thử nghiệm đo được và có thời hạn.',[
      ['Sự kiện có thể tiếp tục nhưng tắt loa âm trầm lúc mười giờ.','The event could continue but switch off the bass speakers at ten.','Mình sẽ đo tiếng ồn tại ba ngôi nhà gần nhất.','We will measure noise at the three nearest homes.',['trial arrangement','thỏa thuận thử nghiệm']],
      ['Ai sẽ ghi nhận khi có khiếu nại?','Who will log any complaints?','Một số điện thoại trực sẽ hoạt động trong toàn bộ sự kiện.','A staffed phone number will operate throughout the event.',['complaint log','sổ khiếu nại']],
      ['Hãy thử trong hai cuối tuần rồi xem dữ liệu.','Let us test it for two weekends and then review the data.','Thử nghiệm ngắn giảm rủi ro cho cả hai bên.','A short trial reduces risk for both sides.',['review period','giai đoạn rà soát']],
    ]],
    ['Recording the Outcome','Ghi kết quả','Các bên đạt đồng thuận có điều kiện.','Viết rõ trách nhiệm và cách mở lại vấn đề.',[
      ['Biên bản nên ghi cả mức âm thanh tối đa và thời gian.','The record should state both the maximum sound level and the time.','Nó cũng cần nêu ai thực hiện phép đo.','It should also identify who carries out the measurement.',['written agreement','thỏa thuận bằng văn bản']],
      ['Nếu có hai vi phạm trong một tối thì sao?','What happens if there are two breaches in one evening?','Nhà tổ chức sẽ dừng nhạc khu ngoài trời trong phần còn lại của tối đó.','The organiser will stop outdoor music for the rest of that evening.',['breach response','xử lý vi phạm']],
      ['Nhóm sẽ họp lại sau tháng thử nghiệm.','The group will meet again after the trial month.','Mọi thay đổi tiếp theo phải dựa trên dữ liệu và trải nghiệm của các bên.','Any further change must reflect both the data and the parties’ experience.',['reopen an issue','mở lại vấn đề']],
    ]],
  ]}),
  t({id:'evaluating-a-training-course',title:'Evaluating a Training Course',titleVi:'Đánh giá khóa đào tạo',category:'Education',icon:'📋',level:'B1',description:'Đánh giá mục tiêu, chuyển giao kỹ năng và cải tiến khóa học.',grammar:['present-perfect','comparatives','cause-and-effect'],scenarios:[
    ['Checking Learning','Kiểm tra học tập','Nhóm vừa hoàn thành khóa xử lý dữ liệu.','Đo năng lực thay vì chỉ mức hài lòng.',[
      ['Điểm hài lòng cao có chứng minh mọi người đã học không?','Do high satisfaction scores prove that people have learned?','Không, mình cần một nhiệm vụ thực hành gắn với mục tiêu khóa học.','No. We need a practical task linked to the course objectives.',['learning outcome','kết quả học tập']],
      ['Người học sẽ làm sạch một bộ dữ liệu có lỗi.','Learners will clean a dataset containing known errors.','Mình có thể so kết quả trước và sau khóa học.','We can compare performance before and after the course.',['skills assessment','đánh giá kỹ năng']],
      ['Tiêu chí phải giống nhau ở cả hai lần.','The criteria must be identical on both occasions.','Như vậy thay đổi sẽ dễ diễn giải hơn.','That will make the change easier to interpret.',['assessment criterion','tiêu chí đánh giá']],
    ]],
    ['Observing Transfer','Quan sát chuyển giao','Quản lý muốn biết kỹ năng có được dùng tại việc thật.','Theo dõi sau khóa học với bằng chứng.',[
      ['Mình nên kiểm tra ngay tuần sau không?','Should we check as early as next week?','Hãy cho người học thời gian áp dụng, rồi xem lại sau một tháng.','Give learners time to apply the skills, then review after one month.',['learning transfer','chuyển giao học tập']],
      ['Quản lý có thể quan sát quy trình và số lỗi.','Managers can observe the process and the number of errors.','Đừng chỉ hỏi họ có cảm thấy tự tin hơn không.','Do not rely solely on whether they feel more confident.',['workplace evidence','bằng chứng tại nơi làm việc']],
      ['Nếu công cụ mới chưa được cấp thì kết quả sẽ bị ảnh hưởng.','If the new tool has not been provided, the result will be affected.','Mình phải ghi cả rào cản môi trường ngoài chất lượng đào tạo.','We must record environmental barriers as well as training quality.',['application barrier','rào cản áp dụng']],
    ]],
    ['Improving the Next Run','Cải thiện đợt sau','Dữ liệu cho thấy một phần khóa học chưa hiệu quả.','Ưu tiên thay đổi có bằng chứng.',[
      ['Phần báo cáo có điểm thấp nhất và nhiều người bỏ dở bài tập.','The reporting section had the lowest scores, and many people abandoned the exercise.','Phản hồi cho biết hướng dẫn thiếu một ví dụ hoàn chỉnh.','Feedback indicates that the instructions lacked a complete example.',['course revision','điều chỉnh khóa học']],
      ['Mình sẽ thêm ví dụ và chia bài tập thành hai bước.','We will add an example and divide the exercise into two stages.','Giữ nguyên phần nhập dữ liệu vì kết quả ở đó đã tốt.','Keep the data-entry section unchanged because its results were already strong.',['targeted improvement','cải thiện có mục tiêu']],
      ['Đợt sau sẽ dùng cùng tiêu chí để kiểm tra tác động thay đổi.','The next run will use the same criteria to test the effect of the change.','Một thay đổi có kiểm soát sẽ dễ học hỏi hơn việc viết lại mọi thứ.','One controlled change is easier to learn from than rewriting everything.',['evaluation cycle','chu kỳ đánh giá']],
    ]],
  ]}),
  t({id:'reviewing-an-environmental-impact',title:'Reviewing an Environmental Impact',titleVi:'Rà soát tác động môi trường',category:'Environment',icon:'🌱',level:'B2',description:'Thẩm định đường cơ sở, tác động tích lũy và biện pháp giảm thiểu.',grammar:['passive-voice','hedging','conditionals'],scenarios:[
    ['Testing the Baseline','Kiểm tra đường cơ sở','Nhóm rà soát báo cáo cho một dự án ven sông.','Đánh giá dữ liệu trước dự án có đủ đại diện không.',[
      ['Khảo sát chim chỉ được thực hiện trong hai tuần mùa khô.','The bird survey was conducted for only two weeks in the dry season.','Vậy nó không đại diện đầy đủ cho các loài di cư theo mùa.','It is therefore unlikely to represent seasonal migratory species adequately.',['ecological baseline','đường cơ sở sinh thái']],
      ['Báo cáo nói địa điểm có giá trị sinh thái thấp.','The report describes the site as having low ecological value.','Kết luận đó cần được giới hạn theo thời điểm và phương pháp lấy mẫu.','That conclusion should be qualified by the timing and sampling method.',['sampling limitation','hạn chế lấy mẫu']],
      ['Mình nên yêu cầu thêm khảo sát vào mùa mưa.','We should request an additional survey during the wet season.','Dữ liệu bổ sung có thể thay đổi thiết kế chứ không chỉ bổ sung phụ lục.','The extra evidence may alter the design rather than merely fill an appendix.',['seasonal survey','khảo sát theo mùa']],
    ]],
    ['Considering Cumulative Effects','Xem tác động tích lũy','Nhiều dự án nhỏ cùng tác động một lưu vực.','Tránh đánh giá từng dự án trong cô lập.',[
      ['Mỗi điểm xả riêng lẻ đều nằm dưới giới hạn.','Each discharge point is individually below the limit.','Nhưng báo cáo chưa mô hình hóa tổng tải lượng trong mùa nước thấp.','However, the report has not modelled the combined load during low-flow periods.',['cumulative impact','tác động tích lũy']],
      ['Dự án đường ở thượng nguồn cũng sẽ tăng phù sa.','The upstream road project will also increase sediment.','Nó phải được đưa vào kịch bản tương lai hợp lý.','It must be included in a reasonably foreseeable future scenario.',['combined load','tải lượng kết hợp']],
      ['Nếu chỉ dùng điều kiện hiện tại, rủi ro sẽ bị đánh giá thấp.','If only current conditions are used, the risk will be underestimated.','Đánh giá lưu vực sẽ phản ánh hệ thống thật tốt hơn.','A catchment-level assessment will reflect the real system more accurately.',['catchment assessment','đánh giá lưu vực']],
    ]],
    ['Examining Mitigation','Xem biện pháp giảm thiểu','Chủ dự án đề xuất trồng cây bù.','Kiểm tra thứ bậc và tính khả thi.',[
      ['Báo cáo chuyển thẳng sang bù đắp mà chưa tránh mất sinh cảnh.','The report moves directly to offsetting without first avoiding habitat loss.','Thiết kế nên chứng minh vì sao hành lang ven sông không thể được giữ lại.','The design should demonstrate why the riverside corridor cannot be retained.',['mitigation hierarchy','thứ bậc giảm thiểu']],
      ['Khu trồng bù mất ít nhất tám năm để trưởng thành.','The replacement planting will take at least eight years to mature.','Cần tính đến khoảng trống thời gian về chức năng sinh thái.','The temporal gap in ecological function needs to be accounted for.',['temporal loss','mất mát theo thời gian']],
      ['Ai chịu trách nhiệm nếu cây sống dưới tỷ lệ mục tiêu?','Who is responsible if survival falls below the target rate?','Kế hoạch phải có ngân sách, giám sát và nghĩa vụ trồng lại.','The plan must specify funding, monitoring, and a replanting obligation.',['enforceable mitigation','giảm thiểu có thể thực thi']],
    ]],
    ['Recommending a Decision','Đề xuất quyết định','Nhóm cần nêu điều kiện phê duyệt.','Liên kết bất định với hành động cụ thể.',[
      ['Bằng chứng hiện tại chưa đủ để từ chối toàn bộ dự án.','The present evidence is insufficient to justify rejecting the entire project.','Nhưng phê duyệt vô điều kiện cũng không hợp lý.','Yet unconditional approval would also be unjustified.',['conditional approval','phê duyệt có điều kiện']],
      ['Mình đề xuất khảo sát mùa mưa và mô hình tích lũy trước thi công.','I recommend a wet-season survey and cumulative model before construction.','Kết quả phải kích hoạt thiết kế lại nếu vượt ngưỡng đã định.','The findings must trigger redesign if the specified thresholds are exceeded.',['decision threshold','ngưỡng quyết định']],
      ['Khuyến nghị cần nói rõ điều gì đã biết và điều gì còn bất định.','The recommendation should distinguish what is known from what remains uncertain.','Sự minh bạch đó giúp cơ quan phê duyệt quản lý rủi ro.','That transparency enables the authority to manage risk.',['residual uncertainty','bất định còn lại']],
    ]],
  ]}),
  t({id:'governing-workplace-surveillance',title:'Governing Workplace Surveillance',titleVi:'Quản trị giám sát nơi làm việc',category:'Work',icon:'🔍',level:'B2',description:'Cân bằng mục đích, tính tương xứng và quyền của nhân viên.',grammar:['modal-verbs','passive-voice','concession'],scenarios:[
    ['Defining the Purpose','Xác định mục đích','Công ty cân nhắc phần mềm theo dõi thiết bị.','Biến lý do chung thành mục đích cụ thể.',[
      ['Đề xuất nói hệ thống cần thiết để tăng năng suất.','The proposal says the system is needed to improve productivity.','Mục tiêu đó quá rộng để đánh giá dữ liệu nào thực sự cần thiết.','That purpose is too broad to determine which data is genuinely necessary.',['purpose limitation','giới hạn mục đích']],
      ['Vấn đề cụ thể là các yêu cầu hỗ trợ bị bỏ sót ngoài giờ.','The specific problem is that support requests are being missed out of hours.','Vậy đo thời gian phản hồi theo ca có thể đủ mà không ghi từng thao tác bàn phím.','Then shift-level response times may suffice without logging every keystroke.',['less intrusive measure','biện pháp ít xâm phạm']],
      ['Công nghệ không nên được chọn trước khi vấn đề được định nghĩa.','The technology should not be selected before the problem is defined.','Nếu không, dữ liệu thu được sẽ dễ mở rộng ngoài nhu cầu ban đầu.','Otherwise, the collected data may expand beyond the original need.',['function creep','mở rộng sai mục đích']],
    ]],
    ['Assessing Proportionality','Đánh giá tương xứng','Nhóm so sánh lợi ích với tác động quyền riêng tư.','Kiểm tra cần thiết, phạm vi và lựa chọn thay thế.',[
      ['Chụp màn hình mỗi phút sẽ thu cả tin nhắn cá nhân và dữ liệu khách hàng.','Taking a screenshot every minute would capture personal messages and customer data.','Mức xâm nhập đó không tương xứng với vấn đề phản hồi theo ca.','That degree of intrusion is disproportionate to a shift-level response problem.',['proportionality test','kiểm tra tính tương xứng']],
      ['Có thể dùng số vé chưa xử lý ở cấp nhóm không?','Could the number of unresolved tickets be used at team level?','Có, và chỉ xem dữ liệu cá nhân khi một mẫu vấn đề đã được xác lập.','Yes, with individual data examined only after a problem pattern has been established.',['aggregate monitoring','giám sát tổng hợp']],
      ['Một giai đoạn thử nghiệm bốn tuần nên có tiêu chí dừng.','A four-week pilot should include stopping criteria.','Nếu lợi ích không đo được, việc giám sát không được trở thành mặc định.','If the benefit is not measurable, surveillance must not become the default.',['stopping criterion','tiêu chí dừng']],
    ]],
    ['Protecting Employees','Bảo vệ nhân viên','Chính sách cần minh bạch và có biện pháp khắc phục.','Quy định thông báo, truy cập và phản đối.',[
      ['Nhân viên phải biết dữ liệu nào được thu và giữ bao lâu.','Employees must know which data is collected and how long it is retained.','Thông báo cũng phải nêu ai có thể truy cập và vì mục đích nào.','The notice must also state who can access it and for which purposes.',['transparent notice','thông báo minh bạch']],
      ['Quản lý có được dùng dữ liệu thử nghiệm để kỷ luật không?','May managers use pilot data for disciplinary action?','Không, trừ rủi ro an toàn nghiêm trọng đã được quy định trước.','No, except for a serious safety risk defined in advance.',['disciplinary use','sử dụng kỷ luật']],
      ['Cần có kênh để nhân viên sửa dữ liệu sai hoặc phản đối quyết định.','There must be a route for employees to correct inaccurate data or challenge a decision.','Giám sát không thể là bằng chứng duy nhất cho đánh giá bất lợi.','Monitoring cannot be the sole evidence for an adverse assessment.',['right to challenge','quyền phản đối']],
    ]],
    ['Reviewing Governance','Rà soát quản trị','Hội đồng đánh giá hệ thống sau thử nghiệm.','Kiểm tra hiệu quả, thiên lệch và xóa dữ liệu.',[
      ['Thời gian phản hồi đã cải thiện, nhưng chủ yếu vì lịch trực mới.','Response times improved, but mainly because of the new rota.','Vậy không thể quy toàn bộ lợi ích cho công cụ giám sát.','The entire benefit therefore cannot be attributed to the monitoring tool.',['causal attribution','quy kết nguyên nhân']],
      ['Nhân viên khuyết tật báo nhiều cảnh báo không chính xác hơn.','Disabled employees reported a higher rate of inaccurate alerts.','Ngưỡng có thể đang phạt các cách làm việc hợp lý khác nhau.','The thresholds may be penalising legitimate differences in working patterns.',['disparate impact','tác động bất lợi khác biệt']],
      ['Hội đồng nên thu hẹp hệ thống và xóa ảnh chụp thử nghiệm.','The board should narrow the system and delete the pilot screenshots.','Quyết định cùng lý do phải được ghi để lần rà soát sau có thể kiểm chứng.','The decision and its rationale must be recorded for the next review.',['governance record','hồ sơ quản trị']],
    ]],
  ]}),
  t({id:'planning-ethical-research-consent',title:'Planning Ethical Research Consent',titleVi:'Lập quy trình đồng thuận nghiên cứu có đạo đức',category:'Education',icon:'🧭',level:'B2',description:'Thiết kế đồng thuận tự nguyện, dễ hiểu và có thể rút lại.',grammar:['passive-voice','conditionals','formal-register'],scenarios:[
    ['Explaining the Study','Giải thích nghiên cứu','Nhóm chuẩn bị tài liệu cho người tham gia.','Trình bày mục đích và quy trình bằng ngôn ngữ rõ.',[
      ['Bản thông tin mở đầu bằng thuật ngữ thống kê khó hiểu.','The information sheet opens with inaccessible statistical terminology.','Người tham gia cần biết họ sẽ làm gì trước khi nghe chi tiết phương pháp.','Participants need to know what they will do before hearing methodological detail.',['participant information','thông tin người tham gia']],
      ['Hãy nói cuộc phỏng vấn kéo dài bốn mươi phút và được ghi âm.','State that the interview lasts forty minutes and will be audio-recorded.','Mục đích của từng loại dữ liệu cũng phải được giải thích.','The purpose of each type of data must also be explained.',['plain-language statement','tuyên bố ngôn ngữ dễ hiểu']],
      ['Bản dịch phải được kiểm tra với người dùng, không chỉ dịch máy.','Translations must be tested with users rather than merely machine-translated.','Hiểu thực chất quan trọng hơn chữ ký trên mẫu.','Substantive understanding matters more than a signature on a form.',['informed understanding','hiểu biết đầy đủ']],
    ]],
    ['Ensuring Voluntariness','Bảo đảm tự nguyện','Nhà nghiên cứu tuyển người qua một dịch vụ họ đang dùng.','Giảm áp lực và phụ thuộc.',[
      ['Nếu nhân viên chăm sóc trực tiếp mời, khách hàng có thể thấy khó từ chối.','If direct care staff invite clients, they may find it difficult to refuse.','Một người độc lập nên quản lý lời mời và đồng thuận.','An independent person should manage recruitment and consent.',['undue influence','ảnh hưởng không phù hợp']],
      ['Khoản cảm ơn có quá lớn không?','Is the participation payment excessively high?','Nó nên bù thời gian và chi phí mà không khiến rủi ro bị xem nhẹ.','It should compensate time and expenses without encouraging risks to be discounted.',['proportionate payment','khoản trả tương xứng']],
      ['Từ chối tham gia không được ảnh hưởng dịch vụ họ nhận.','Declining participation must not affect the service they receive.','Thông điệp đó cần xuất hiện cả bằng lời và trong tài liệu.','That message should appear both verbally and in writing.',['voluntary participation','tham gia tự nguyện']],
    ]],
    ['Designing Ongoing Consent','Thiết kế đồng thuận liên tục','Nghiên cứu kéo dài một năm và có nhiều lần liên hệ.','Xem đồng thuận là quy trình, không phải một thời điểm.',[
      ['Một chữ ký ban đầu có đủ cho mọi cuộc phỏng vấn không?','Is one initial signature sufficient for every interview?','Nhóm nên xác nhận lại trước mỗi lần thu thập dữ liệu.','The team should reconfirm willingness before each data-collection session.',['ongoing consent','đồng thuận liên tục']],
      ['Nếu mục đích phân tích thay đổi thì sao?','What if the purpose of the analysis changes?','Việc sử dụng mới ngoài phạm vi ban đầu có thể cần đồng thuận lại.','A new use beyond the original scope may require fresh consent.',['scope of consent','phạm vi đồng thuận']],
      ['Dấu hiệu khó chịu phải kích hoạt khoảng nghỉ và lựa chọn dừng.','Signs of distress must prompt a break and a genuine option to stop.','Không nên tiếp tục chỉ vì người tham gia chưa nói từ chối rõ ràng.','Researchers should not continue merely because no explicit refusal was voiced.',['affirmative agreement','đồng ý chủ động']],
    ]],
    ['Supporting Withdrawal','Hỗ trợ rút lui','Tài liệu nói người tham gia có thể rút bất cứ lúc nào.','Làm rõ cách rút và giới hạn xử lý dữ liệu.',[
      ['Câu “rút bất cứ lúc nào” chưa nói họ phải liên hệ ai.','The phrase “withdraw at any time” does not say whom participants should contact.','Hãy cung cấp email độc lập và mã nghiên cứu của họ.','Provide an independent email address and their study identifier.',['withdrawal route','cách rút lui']],
      ['Dữ liệu có thể bị xóa sau khi đã đưa vào phân tích tổng hợp không?','Can data be removed after it has entered an aggregated analysis?','Có thể không, nên thời điểm không thể rút phải được nêu trước.','Possibly not, so the point after which withdrawal is impossible must be stated in advance.',['withdrawal limit','giới hạn rút lui']],
      ['Rút lui không yêu cầu người tham gia giải thích lý do.','Withdrawal must not require participants to justify their decision.','Nhóm cần ghi yêu cầu và xác nhận dữ liệu nào đã được xóa.','The team should record the request and confirm which data has been deleted.',['deletion confirmation','xác nhận xóa']],
    ]],
  ]}),
  t({id:'balancing-heritage-and-housing',title:'Balancing Heritage and Housing',titleVi:'Cân bằng di sản và nhà ở',category:'Community',icon:'🏘️',level:'B2',description:'Đánh giá giá trị di sản, nhu cầu nhà ở và phương án thích ứng.',grammar:['concession','conditionals','evaluative-language'],scenarios:[
    ['Clarifying Public Value','Làm rõ giá trị công','Một kho cũ được đề xuất chuyển thành nhà ở.','Tách giá trị kiến trúc, xã hội và sử dụng.',[
      ['Tòa nhà không được xếp hạng nên có phải không có giá trị di sản không?','Does the lack of formal listing mean the building has no heritage value?','Không, nó vẫn có thể mang ý nghĩa xã hội hoặc cảnh quan địa phương.','No. It may still hold social or townscape significance locally.',['heritage significance','ý nghĩa di sản']],
      ['Mặt tiền là phần nguyên bản nhất, còn bên trong đã thay đổi nhiều.','The façade is the most intact element, whereas the interior has been heavily altered.','Đánh giá nên xác định chính xác đặc điểm nào tạo nên giá trị.','The assessment should identify precisely which features carry significance.',['character-defining feature','đặc điểm tạo bản sắc']],
      ['Ký ức của công nhân cũ cũng là bằng chứng liên quan.','Former workers’ memories are also relevant evidence.','Giá trị cộng đồng không chỉ nằm trong vật liệu xây dựng.','Community value does not reside solely in building fabric.',['social value','giá trị xã hội']],
    ]],
    ['Testing Housing Claims','Kiểm tra lập luận nhà ở','Dự án hứa cung cấp tám mươi căn hộ.','Đánh giá loại nhà và khả năng chi trả thực tế.',[
      ['Tám mươi căn nghe đáng kể, nhưng bao nhiêu căn thực sự vừa túi tiền?','Eighty homes sounds substantial, but how many are genuinely affordable?','Đề xuất hiện dành mười hai căn với giá thuê thấp hơn thị trường.','The current proposal allocates twelve units at below-market rent.',['affordable provision','nguồn cung vừa túi tiền']],
      ['Định nghĩa giá phải gắn với thu nhập địa phương chứ không chỉ giá thị trường.','Affordability should relate to local incomes rather than market prices alone.','Nếu không, lợi ích nhà ở có thể bị phóng đại.','Otherwise, the housing benefit may be overstated.',['local housing need','nhu cầu nhà ở địa phương']],
      ['Nhóm cũng cần xem kích thước và khả năng tiếp cận của các căn.','The team should also examine unit sizes and accessibility.','Số lượng tổng không nói liệu dự án phục vụ những hộ đang cần nhất.','The total count does not reveal whether the scheme serves households in greatest need.',['housing mix','cơ cấu nhà ở']],
    ]],
    ['Developing an Adaptive Option','Phát triển phương án thích ứng','Hai lập trường ban đầu là giữ toàn bộ hoặc phá toàn bộ.','Tìm thiết kế giữ phần giá trị và cung cấp nhà.',[
      ['Có thể giữ mặt tiền và khung thép của gian trung tâm.','The façade and steel frame of the central bay could be retained.','Các khối mới thấp hơn ở mép phố sẽ bảo vệ đường chân trời.','Lower new blocks along the street edge would protect the skyline.',['adaptive reuse','tái sử dụng thích ứng']],
      ['Phương án đó giảm số căn từ tám mươi xuống bảy mươi hai.','That option reduces the number of homes from eighty to seventy-two.','Nhưng nó tạo sân chung và giữ được không gian đặc trưng.','However, it creates a shared courtyard and retains a distinctive space.',['design trade-off','đánh đổi thiết kế']],
      ['Mình nên so sánh cả lượng carbon của phá dỡ và tái sử dụng.','We should compare the embodied carbon of demolition and reuse.','Lợi ích môi trường có thể củng cố phương án bảo tồn một phần.','The environmental benefit may strengthen the partial-retention option.',['embodied carbon','carbon hàm chứa']],
    ]],
    ['Forming a Recommendation','Lập khuyến nghị','Hội đồng cần cân các lợi ích không cùng đơn vị.','Nêu trọng số và điều kiện minh bạch.',[
      ['Không thể quy đổi ký ức cộng đồng trực tiếp thành số căn hộ.','Community memory cannot be converted directly into a number of homes.','Nhưng quyết định vẫn có thể giải thích mức trọng số dành cho từng lợi ích.','The decision can nevertheless explain the weight given to each benefit.',['planning balance','cân bằng quy hoạch']],
      ['Mình ủng hộ phương án thích ứng nếu số căn giá hợp lý được bảo đảm.','I support the adaptive option provided that the affordable units are secured.','Điều kiện cũng nên yêu cầu ghi lại lịch sử truyền miệng trước thi công.','A condition should also require an oral-history record before construction.',['secured benefit','lợi ích được bảo đảm']],
      ['Khuyến nghị phải thừa nhận tám căn bị mất so với phương án tối đa.','The recommendation must acknowledge the eight-home reduction from the maximum scheme.','Minh bạch về chi phí giúp kết luận đáng tin hơn.','Transparency about the cost makes the conclusion more credible.',['reasoned judgment','phán đoán có lý do']],
    ]],
  ]}),
];
