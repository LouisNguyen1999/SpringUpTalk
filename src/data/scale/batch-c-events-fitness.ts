import { batchCBrief as b, batchCTopic as t } from './batch-c-expansion-builder';

export const batchCEventsFitnessTopics = [
  t({id:'responding-to-a-birthday-invitation',title:'Responding to a Birthday Invitation',titleVi:'Trả lời lời mời sinh nhật',category:'Events',icon:'🎂',level:'A1',description:'Cảm ơn, nhận hoặc từ chối lời mời và xác nhận thời gian.',grammar:['can','time-prepositions'],intent:'inviting',relationship:'close-friend',briefs:[
    b('Accepting the Invitation','Nhận lời mời','the birthday invitation for Saturday','lời mời sinh nhật vào thứ Bảy','I can come to the party on Saturday.','Tôi có thể đến dự tiệc vào thứ Bảy.'),
    b('Asking About the Start Time','Hỏi giờ bắt đầu','the party starting at half past six','bữa tiệc bắt đầu lúc sáu rưỡi','The party starts at half past six.','Bữa tiệc bắt đầu lúc sáu rưỡi.'),
    b('Declining Kindly','Từ chối khéo','the invitation declined because of work','lời mời bị từ chối vì công việc','I cannot come because I work that evening.','Tôi không thể đến vì tối đó phải làm việc.'),
  ]}),
  t({id:'buying-a-birthday-gift',title:'Buying a Birthday Gift',titleVi:'Mua quà sinh nhật',category:'Shopping',icon:'🎁',level:'A1',description:'Nêu người nhận, ngân sách và chọn món quà phù hợp.',grammar:['for','comparatives'],intent:'making-decisions',relationship:'service-staff',briefs:[
    b('Naming the Recipient','Nêu người nhận','a gift for a ten-year-old nephew','món quà cho cháu trai mười tuổi','The gift is for my ten-year-old nephew.','Món quà dành cho cháu trai mười tuổi của tôi.'),
    b('Keeping Within Budget','Giữ đúng ngân sách','a birthday gift under twenty dollars','quà sinh nhật dưới hai mươi đô','The puzzle set costs eighteen dollars.','Bộ xếp hình có giá mười tám đô.'),
    b('Adding Gift Wrap','Thêm gói quà','blue wrapping with a birthday card','giấy gói xanh kèm thiệp sinh nhật','Blue wrapping and a small card are available.','Có giấy gói xanh và một tấm thiệp nhỏ.'),
  ]}),
  t({id:'choosing-a-karaoke-song',title:'Choosing a Karaoke Song',titleVi:'Chọn bài hát karaoke',category:'Entertainment',icon:'🎤',level:'A1',description:'Tìm bài, chọn phiên bản và thêm vào hàng chờ.',grammar:['would-like','can'],intent:'suggesting',relationship:'close-friend',briefs:[
    b('Finding a Familiar Song','Tìm bài quen thuộc','the familiar song called Summer Road','bài quen thuộc tên Summer Road','Summer Road is in the English song list.','Summer Road có trong danh sách bài tiếng Anh.'),
    b('Choosing a Duet Version','Chọn bản song ca','the duet version with two parts','bản song ca có hai phần','The duet version has one part for each singer.','Bản song ca có một phần cho mỗi người hát.'),
    b('Adding the Song','Thêm bài hát','Summer Road at number twelve in the queue','Summer Road ở số mười hai trong hàng chờ','The screen shows the song at number twelve.','Màn hình hiển thị bài ở số mười hai.'),
  ]}),
  t({id:'asking-someone-to-exercise-together',title:'Asking Someone to Exercise Together',titleVi:'Rủ ai đó tập cùng',category:'Fitness',icon:'🏃',level:'A1',description:'Rủ bạn tập, chọn hoạt động và thống nhất điểm gặp.',grammar:['would-you-like','lets'],intent:'inviting',relationship:'close-friend',briefs:[
    b('Inviting a Friend','Mời bạn tập cùng','a short run on Sunday morning','buổi chạy ngắn sáng Chủ nhật','I would like to run together on Sunday.','Tôi muốn cùng chạy vào Chủ nhật.'),
    b('Choosing the Activity','Chọn hoạt động','a gentle walk instead of a long run','đi bộ nhẹ thay vì chạy dài','A gentle walk suits both friends today.','Đi bộ nhẹ phù hợp với cả hai hôm nay.'),
    b('Setting the Meeting Point','Chọn điểm gặp','the park gate at seven thirty','cổng công viên lúc bảy rưỡi','We will meet at the park gate at seven thirty.','Chúng ta sẽ gặp ở cổng công viên lúc bảy rưỡi.'),
  ]}),
  t({id:'asking-about-a-wedding-dress-code',title:'Asking About a Wedding Dress Code',titleVi:'Hỏi quy định trang phục đám cưới',category:'Events',icon:'👗',level:'A2',description:'Hỏi mức độ trang trọng, màu cần tránh và chọn trang phục.',grammar:['should','have-to'],intent:'asking-information',relationship:'close-friend',briefs:[
    b('Checking Formality','Hỏi mức độ trang trọng','the smart-casual wedding dress code','quy định trang phục lịch sự thoải mái','The couple requested smart-casual clothes.','Cặp đôi yêu cầu trang phục lịch sự thoải mái.'),
    b('Asking About Colors','Hỏi về màu sắc','white reserved for the bride','màu trắng dành riêng cho cô dâu','Guests have been asked not to wear white.','Khách được nhờ không mặc màu trắng.'),
    b('Planning for the Garden','Chuẩn bị cho khu vườn','flat shoes for the garden reception','giày đế bằng cho tiệc ngoài vườn','Flat shoes will be easier on the grass.','Giày đế bằng sẽ dễ đi hơn trên cỏ.'),
    b('Confirming the Outfit','Xác nhận bộ đồ','a navy dress with flat shoes','váy xanh đậm cùng giày đế bằng','A navy dress follows the requested dress code.','Váy xanh đậm phù hợp quy định trang phục.'),
  ]}),
  t({id:'finding-an-event-venue',title:'Finding an Event Venue',titleVi:'Tìm địa điểm tổ chức sự kiện',category:'Events',icon:'📍',level:'A2',description:'Theo mốc chỉ đường, tìm cửa vào và đúng phòng.',grammar:['imperatives','prepositions'],intent:'asking-information',relationship:'service-staff',briefs:[
    b('Finding the Main Entrance','Tìm cửa chính','the venue entrance behind the fountain','cửa vào địa điểm phía sau đài phun nước','The main entrance is directly behind the fountain.','Cửa chính nằm ngay phía sau đài phun nước.'),
    b('Checking at Reception','Hỏi tại quầy lễ tân','the conference registration desk','quầy đăng ký hội nghị','Registration is at the desk beside the lifts.','Quầy đăng ký nằm cạnh thang máy.'),
    b('Locating the Hall','Tìm hội trường','the Lotus Hall on the second floor','hội trường Lotus ở tầng hai','Lotus Hall is the first room on the left upstairs.','Hội trường Lotus là phòng đầu bên trái trên tầng.'),
  ]}),
  t({id:'buying-concert-tickets',title:'Buying Concert Tickets',titleVi:'Mua vé hòa nhạc',category:'Entertainment',icon:'🎫',level:'A2',description:'So khu vực, phí đặt chỗ và hoàn tất mua vé.',grammar:['how-much','comparatives'],intent:'comparing',relationship:'service-staff',briefs:[
    b('Comparing Seating Areas','So khu vực ghế','balcony seats versus the standing area','ghế ban công so với khu đứng','Balcony seats cost more but have a clear view.','Ghế ban công đắt hơn nhưng có tầm nhìn rõ.'),
    b('Checking Availability','Kiểm tra vé còn','three adjacent seats in section B','ba ghế liền nhau ở khu B','Section B still has three seats together.','Khu B vẫn còn ba ghế cạnh nhau.'),
    b('Reviewing Booking Fees','Xem phí đặt vé','the four-dollar online booking fee','phí đặt vé trực tuyến bốn đô','The four-dollar fee applies to the whole order.','Phí bốn đô áp dụng cho toàn bộ đơn.'),
    b('Completing the Purchase','Hoàn tất mua vé','three section B tickets by email','ba vé khu B gửi qua email','The tickets will arrive by email within five minutes.','Vé sẽ đến qua email trong vòng năm phút.'),
  ]}),
  t({id:'planning-a-game-night',title:'Planning a Game Night',titleVi:'Lên kế hoạch tối chơi game',category:'Entertainment',icon:'🎲',level:'A2',description:'Mời nhóm, chọn trò phù hợp và chia phần chuẩn bị.',grammar:['going-to','quantifiers'],intent:'planning',relationship:'close-friend',briefs:[
    b('Counting Players','Đếm người chơi','six confirmed game-night players','sáu người đã xác nhận chơi','Six people have confirmed for Friday night.','Sáu người đã xác nhận tối thứ Sáu.'),
    b('Choosing a Game','Chọn trò chơi','a cooperative game for six people','trò chơi hợp tác cho sáu người','The island game supports exactly six players.','Trò đảo hỗ trợ đúng sáu người chơi.'),
    b('Sharing Food Tasks','Chia việc đồ ăn','two friends bringing snacks and drinks','hai người bạn mang đồ ăn và đồ uống','Lan will bring snacks while Minh brings drinks.','Lan sẽ mang đồ ăn còn Minh mang đồ uống.'),
  ]}),
  t({id:'changing-a-workout-schedule',title:'Changing a Workout Schedule',titleVi:'Đổi lịch tập',category:'Fitness',icon:'📅',level:'A2',description:'Đổi buổi tập ở phòng gym và xác nhận lại huấn luyện viên.',grammar:['future-arrangements','instead'],intent:'changing-plans',relationship:'service-staff',briefs:[
    b('Explaining the Conflict','Nêu lịch bị trùng','the Tuesday workout conflicting with work','buổi tập thứ Ba trùng giờ làm','A late meeting now overlaps the Tuesday session.','Một cuộc họp muộn giờ trùng buổi tập thứ Ba.'),
    b('Finding a New Slot','Tìm giờ mới','the open Thursday slot at seven','khung trống bảy giờ thứ Năm','The trainer is available Thursday at seven.','Huấn luyện viên rảnh lúc bảy giờ thứ Năm.'),
    b('Keeping the Same Trainer','Giữ huấn luyện viên cũ','the Thursday session with trainer Linh','buổi thứ Năm với huấn luyện viên Linh','Linh can lead the replacement session.','Linh có thể hướng dẫn buổi tập thay thế.'),
    b('Confirming the Change','Xác nhận thay đổi','the cancelled Tuesday and booked Thursday sessions','buổi thứ Ba bị hủy và thứ Năm được đặt','The calendar now shows Thursday at seven only.','Lịch giờ chỉ hiển thị bảy giờ thứ Năm.'),
  ]}),
  t({id:'cancelling-a-sports-booking',title:'Cancelling a Sports Booking',titleVi:'Hủy lịch đặt sân',category:'Fitness',icon:'🏸',level:'A2',description:'Xác định mã đặt, yêu cầu hủy và kiểm tra tín dụng.',grammar:['present-perfect','can'],intent:'requesting',relationship:'service-staff',briefs:[
    b('Identifying the Booking','Xác định lịch đặt','court booking S84 for Saturday','lịch sân S84 vào thứ Bảy','Booking S84 is for court three on Saturday.','Mã S84 là sân ba vào thứ Bảy.'),
    b('Requesting Cancellation','Yêu cầu hủy','the cancellation before the twenty-four-hour limit','việc hủy trước hạn hai mươi bốn giờ','The request arrived more than twenty-four hours early.','Yêu cầu được gửi sớm hơn hai mươi bốn giờ.'),
    b('Receiving Account Credit','Nhận tín dụng tài khoản','the thirty-dollar court credit','khoản tín dụng sân ba mươi đô','Thirty dollars will return as account credit.','Ba mươi đô sẽ được trả thành tín dụng tài khoản.'),
  ]}),
  t({id:'planning-a-birthday-party',title:'Planning a Birthday Party',titleVi:'Lên kế hoạch tiệc sinh nhật',category:'Events',icon:'🎉',level:'B1',description:'Xác định nhu cầu khách, chọn địa điểm và chia trách nhiệm.',grammar:['future-forms','quantifiers'],intent:'planning',relationship:'family',briefs:[
    b('Confirming the Guest List','Chốt danh sách khách','twenty adults and six children attending','hai mươi người lớn và sáu trẻ em tham dự','Twenty adults and six children have confirmed.','Hai mươi người lớn và sáu trẻ em đã xác nhận.'),
    b('Comparing Two Venues','So hai địa điểm','the garden room versus the upstairs hall','phòng vườn so với hội trường tầng trên','The garden room costs less and has step-free access.','Phòng vườn rẻ hơn và không có bậc.'),
    b('Covering Dietary Needs','Đáp ứng nhu cầu ăn uống','three vegetarian meals and one nut allergy','ba suất chay và một trường hợp dị ứng hạt','The caterer can label all four special meals.','Đơn vị đồ ăn có thể ghi nhãn cả bốn suất đặc biệt.'),
    b('Dividing the Tasks','Chia nhiệm vụ','the cake, decorations, and guest messages','bánh, trang trí và tin nhắn cho khách','Three relatives will each own one preparation task.','Ba người thân sẽ phụ trách mỗi người một việc chuẩn bị.'),
  ]}),
  t({id:'handling-an-event-postponement',title:'Handling an Event Postponement',titleVi:'Xử lý sự kiện bị hoãn',category:'Events',icon:'⏸️',level:'B1',description:'Phân biệt hoãn với hủy, chọn ngày mới và thông báo rõ.',grammar:['passive','future-forms'],intent:'changing-plans',relationship:'customer',briefs:[
    b('Explaining the Postponement','Giải thích việc hoãn','the outdoor event postponed by heavy rain','sự kiện ngoài trời bị hoãn vì mưa lớn','Heavy rain has made the field unsafe today.','Mưa lớn khiến sân hôm nay không an toàn.'),
    b('Selecting a Revised Date','Chọn ngày mới','the replacement date next Sunday','ngày thay thế vào Chủ nhật tới','The venue is available at the same time next Sunday.','Địa điểm còn trống cùng giờ Chủ nhật tới.'),
    b('Handling Existing Tickets','Xử lý vé hiện tại','tickets remaining valid for the revised date','vé vẫn có hiệu lực cho ngày mới','Existing tickets will transfer automatically to next Sunday.','Vé hiện tại sẽ tự chuyển sang Chủ nhật tới.'),
    b('Notifying Every Attendee','Thông báo mọi người','the postponement notice by email and text','thông báo hoãn qua email và tin nhắn','All registered guests will receive both messages today.','Mọi khách đăng ký sẽ nhận cả hai tin hôm nay.'),
  ]}),
  t({id:'training-for-a-race',title:'Training for a Race',titleVi:'Tập luyện cho cuộc đua',category:'Fitness',icon:'🏁',level:'B1',description:'Đặt mục tiêu hợp lý, sắp lịch tập và điều chỉnh khi lỡ buổi.',grammar:['conditionals','present-perfect'],intent:'planning',relationship:'close-friend',briefs:[
    b('Setting the Race Goal','Đặt mục tiêu cuộc đua','finishing the ten-kilometre race comfortably','hoàn thành cuộc đua mười ki-lô-mét thoải mái','The main goal is a steady and comfortable finish.','Mục tiêu chính là hoàn thành đều và thoải mái.'),
    b('Building Weekly Distance','Tăng quãng đường tuần','three gradual runs each week','ba buổi chạy tăng dần mỗi tuần','The plan adds distance gradually across three runs.','Kế hoạch tăng quãng đường dần qua ba buổi chạy.'),
    b('Responding to a Missed Run','Xử lý buổi chạy bị lỡ','the missed Wednesday training session','buổi tập thứ Tư bị lỡ','The missed session will not be doubled the next day.','Buổi bị lỡ sẽ không được tập gấp đôi vào hôm sau.'),
    b('Reviewing Progress','Xem tiến độ','the Saturday distance and recovery notes','quãng đường thứ Bảy và ghi chú hồi phục','Saturday notes will show whether the plan remains manageable.','Ghi chú thứ Bảy sẽ cho biết kế hoạch còn phù hợp không.'),
  ]}),
  t({id:'discussing-fitness-goals',title:'Discussing Fitness Goals',titleVi:'Trao đổi mục tiêu thể lực',category:'Fitness',icon:'🎯',level:'B1',description:'Chuyển mục tiêu chung thành thói quen đo được, không đưa tư vấn y tế.',grammar:['want-to','by-date'],intent:'giving-advice',relationship:'close-friend',briefs:[
    b('Defining a Useful Goal','Xác định mục tiêu hữu ích','a consistent twice-weekly exercise habit','thói quen tập đều hai lần mỗi tuần','Consistency matters more than one very hard session.','Sự đều đặn quan trọng hơn một buổi quá nặng.'),
    b('Choosing a Simple Measure','Chọn cách đo đơn giản','two completed sessions recorded each week','hai buổi hoàn thành được ghi mỗi tuần','A calendar mark will record every completed session.','Một dấu trên lịch sẽ ghi mỗi buổi hoàn thành.'),
    b('Removing a Schedule Barrier','Gỡ trở ngại lịch trình','short morning sessions before work','buổi tập ngắn buổi sáng trước giờ làm','Morning sessions avoid the busiest evening hours.','Buổi sáng tránh được khung giờ tối bận nhất.'),
    b('Setting a Review Point','Đặt mốc xem lại','a four-week review of the new routine','buổi xem lại nếp mới sau bốn tuần','The review will focus on consistency and enjoyment.','Buổi xem lại sẽ tập trung vào sự đều đặn và hứng thú.'),
  ]}),
  t({id:'cancelling-a-community-event',title:'Cancelling a Community Event',titleVi:'Hủy sự kiện cộng đồng',category:'Events',icon:'📣',level:'B2',description:'Đánh giá ràng buộc, ra quyết định hủy và hỗ trợ người tham dự.',grammar:['concession','conditionals','passive'],intent:'making-decisions',relationship:'volunteer',briefs:[
    b('Reviewing the Safety Constraint','Xem ràng buộc an toàn','the storm warning covering the event hours','cảnh báo bão trong giờ sự kiện','The official warning covers the full event period.','Cảnh báo chính thức bao trùm toàn bộ thời gian sự kiện.'),
    b('Separating Cancellation from Postponement','Phân biệt hủy và hoãn','cancellation rather than an uncertain postponement','hủy thay vì hoãn chưa rõ ngày','The venue has no alternative date this month.','Địa điểm không còn ngày thay thế trong tháng này.'),
    b('Explaining the Public Decision','Giải thích quyết định công khai','a clear notice focused on attendee safety','thông báo rõ tập trung vào an toàn khách','The notice will explain the evidence without creating alarm.','Thông báo sẽ giải thích bằng chứng mà không gây hoang mang.'),
    b('Supporting Registered Attendees','Hỗ trợ người đã đăng ký','automatic refunds within five working days','hoàn tiền tự động trong năm ngày làm việc','Every paid booking will be refunded automatically.','Mọi lượt đặt có trả phí sẽ được hoàn tự động.'),
    b('Preserving Future Interest','Giữ sự quan tâm cho lần sau','an optional update list for a future event','danh sách cập nhật tùy chọn cho sự kiện sau','Guests may join a list for the next confirmed event.','Khách có thể vào danh sách cho sự kiện tiếp theo đã chốt.'),
  ]}),
  t({id:'negotiating-a-team-dinner-plan',title:'Negotiating a Team Dinner Plan',titleVi:'Thương lượng kế hoạch ăn tối nhóm',category:'Events',icon:'🍽️',level:'B2',description:'Bộc lộ ràng buộc, so lựa chọn và đạt thỏa hiệp công bằng.',grammar:['hedging','concession'],intent:'negotiating',relationship:'coworker',briefs:[
    b('Surfacing Dietary Needs','Nêu nhu cầu ăn uống','two vegetarian choices and a nut-free kitchen','hai lựa chọn chay và bếp không hạt','Three colleagues need clearly labelled safe options.','Ba đồng nghiệp cần lựa chọn an toàn có nhãn rõ.'),
    b('Comparing the Budget','So ngân sách','a thirty-dollar limit per person','giới hạn ba mươi đô mỗi người','Only two shortlisted restaurants stay within the limit.','Chỉ hai nhà hàng trong danh sách nằm trong giới hạn.'),
    b('Challenging the Late Start','Trao đổi về giờ bắt đầu muộn','the proposed nine o’clock dinner','bữa tối đề xuất lúc chín giờ','A nine o’clock start excludes colleagues with early trains.','Bắt đầu lúc chín giờ khiến người có tàu sớm không tham gia được.'),
    b('Reaching a Compromise','Đạt thỏa hiệp','the Riverside restaurant at seven fifteen','nhà hàng Riverside lúc bảy giờ mười lăm','Riverside meets the dietary, budget, and timing needs.','Riverside đáp ứng nhu cầu ăn uống, ngân sách và thời gian.'),
    b('Confirming Individual Choices','Xác nhận lựa chọn từng người','meal selections due by Wednesday','lựa chọn món cần gửi trước thứ Tư','Each colleague will choose a meal by Wednesday.','Mỗi đồng nghiệp sẽ chọn món trước thứ Tư.'),
  ]}),
];
