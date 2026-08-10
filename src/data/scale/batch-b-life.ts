import { scaleTopic as t } from './scale-builder';

export const batchBLifeTopics = [
  t({id:'talking-about-school-day',title:'Talking About a School Day',titleVi:'Kể về ngày đi học',category:'Education',icon:'🎒',level:'A1',description:'Nói môn học, thời khóa biểu và đồ dùng học tập.',grammar:['present-simple','time-expressions','have'],scenarios:[
    ['The First Class','Tiết học đầu tiên','Hai học sinh kiểm tra lịch học buổi sáng.','Hỏi môn học, phòng và giờ bắt đầu.',[
      ['Tiết đầu hôm nay là môn gì?','What is our first class today?','Là môn toán, bắt đầu lúc bảy giờ ba mươi.','It is maths, and it starts at seven thirty.',['first class','tiết học đầu']],
      ['Lớp học ở phòng 204 phải không?','Is the class in room 204?','Không, hôm nay chúng ta học ở phòng máy tính.','No. Today we are in the computer room.',['computer room','phòng máy tính']],
      ['Mình cần mang theo sách toán không?','Do I need to bring the maths book?','Có, và nhớ mang cả thước kẻ.','Yes, and remember your ruler too.',['ruler','thước kẻ']],
    ]],
    ['Lunch at School','Ăn trưa ở trường','Hai học sinh nói về bữa trưa và giờ nghỉ.','Chọn món và hẹn chỗ ngồi.',[
      ['Hôm nay căng tin có món gì?','What is the canteen serving today?','Có cơm gà và mì xào.','There is chicken rice and fried noodles.',['canteen','căng tin']],
      ['Bạn muốn ăn cùng mình không?','Would you like to have lunch with me?','Có, mình sẽ gặp bạn sau tiết tiếng Anh.','Yes. I\'ll meet you after English class.',['lunch break','giờ nghỉ trưa']],
      ['Mình ngồi ở bàn gần cửa sổ nhé.','Let\'s sit at the table near the window.','Được, mình sẽ giữ chỗ cho bạn.','Okay. I\'ll save you a seat.',['save a seat','giữ chỗ']],
    ]],
    ['After-school Homework','Bài tập sau giờ học','Hai bạn kiểm tra bài tập trước khi về.','Xác nhận yêu cầu và hạn nộp.',[
      ['Bài tập khoa học là trang nào?','Which page is the science homework on?','Chúng ta phải làm bài bốn ở trang ba mươi.','We have to do exercise four on page thirty.',['exercise four','bài tập số bốn']],
      ['Ngày mai phải nộp à?','Is it due tomorrow?','Không, thầy cho đến thứ Sáu.','No. The teacher gave us until Friday.',['be due','đến hạn nộp']],
      ['Mình sẽ chụp bảng để khỏi quên.','I\'ll take a photo of the board so I do not forget.','Gửi ảnh cho mình với nhé.','Please send me the photo too.',['class board','bảng trong lớp']],
    ]],
    ['A Missing Pencil Case','Hộp bút bị thất lạc','Học sinh không tìm thấy hộp bút sau giờ mỹ thuật.','Nhớ lại vị trí và hỏi phòng đồ thất lạc.',[
      ['Bạn có thấy hộp bút màu xanh của mình không?','Have you seen my blue pencil case?','Lần cuối mình thấy nó ở trên bàn phòng mỹ thuật.','I last saw it on the art room table.',['pencil case','hộp bút']],
      ['Phòng đó đã khóa rồi.','That room is already locked.','Mình có thể hỏi cô ở văn phòng trường.','We can ask the teacher in the school office.',['school office','văn phòng trường']],
      ['Nếu có người nhặt được thì họ để ở đâu?','Where would someone leave it if they found it?','Đồ thất lạc được giữ trong hộp cạnh quầy lễ tân.','Lost property is kept in a box beside reception.',['lost property','đồ thất lạc']],
    ]],
  ]}),
  t({id:'using-a-public-library',title:'Using a Public Library',titleVi:'Sử dụng thư viện công cộng',category:'Community',icon:'📚',level:'A1',description:'Làm thẻ, tìm sách và mượn trả tài liệu.',grammar:['can','basic-questions','there-is-are'],scenarios:[
    ['Getting a Library Card','Làm thẻ thư viện','Người dân lần đầu đăng ký thư viện.','Hỏi giấy tờ và thời hạn thẻ.',[
      ['Tôi muốn làm thẻ thư viện.','I\'d like to get a library card.','Bạn có giấy tờ có địa chỉ hiện tại không?','Do you have a document with your current address?',['library card','thẻ thư viện']],
      ['Hóa đơn điện trên điện thoại có được không?','Can I show an electricity bill on my phone?','Được, cùng với căn cước của bạn.','Yes, together with your ID.',['current address','địa chỉ hiện tại']],
      ['Thẻ có dùng được ngay hôm nay không?','Can I use the card today?','Có, thẻ có hiệu lực ngay sau khi đăng ký.','Yes. It is active as soon as you register.',['be active','có hiệu lực']],
    ]],
    ['Finding a Book','Tìm một cuốn sách','Độc giả cần tìm sách thiếu nhi cụ thể.','Hỏi khu vực và đọc mã kệ.',[
      ['Tôi có thể tìm sách thiếu nhi ở đâu?','Where can I find the children\'s books?','Chúng ở tầng hai, phía sau cầu thang.','They are on the second floor, behind the stairs.',['children\'s section','khu sách thiếu nhi']],
      ['Tôi đang tìm cuốn có mã JF 823.','I am looking for a book with the code JF 823.','Mã đó nằm ở dãy kệ số sáu.','That code is in aisle six.',['shelf code','mã xếp kệ']],
      ['Nếu sách không ở đó thì tôi hỏi ai?','Who should I ask if the book is not there?','Hãy đến bàn thông tin cạnh thang máy.','Go to the information desk beside the lift.',['information desk','bàn thông tin']],
    ]],
    ['Renewing a Loan','Gia hạn sách','Độc giả chưa đọc xong sách sắp đến hạn.','Gia hạn và hiểu giới hạn mượn.',[
      ['Cuốn sách này đến hạn vào ngày mai.','This book is due tomorrow.','Bạn muốn gia hạn thêm hai tuần phải không?','Would you like to renew it for another two weeks?',['renew a book','gia hạn sách']],
      ['Đúng, tôi chưa đọc xong.','Yes. I have not finished reading it.','Để tôi kiểm tra xem có ai đặt trước không.','Let me check whether anyone has reserved it.',['reserve a book','đặt trước sách']],
      ['Không có người chờ thì tôi được gia hạn chứ?','Can I renew it if nobody is waiting?','Có, ngày trả mới sẽ hiện trong tài khoản của bạn.','Yes. The new return date will appear in your account.',['return date','ngày trả']],
    ]],
  ]}),
  t({id:'parent-teacher-meeting',title:'Parent–Teacher Meeting',titleVi:'Họp phụ huynh với giáo viên',category:'Education',icon:'🏫',level:'A2',description:'Trao đổi tiến bộ, khó khăn và hỗ trợ học tập.',grammar:['present-perfect','comparatives','should'],scenarios:[
    ['Discussing Progress','Trao đổi tiến bộ','Giáo viên cập nhật kết quả gần đây của học sinh.','Hiểu điểm mạnh và thay đổi theo thời gian.',[
      ['Gần đây cháu học trên lớp thế nào?','How has she been doing in class recently?','Khả năng đọc của cháu đã tiến bộ rõ rệt.','Her reading has improved noticeably.',['improve noticeably','tiến bộ rõ rệt']],
      ['Môn nào cháu làm tốt nhất?','Which subject is she strongest in?','Cháu tự tin nhất ở khoa học và thường đặt câu hỏi hay.','She is most confident in science and often asks thoughtful questions.',['be confident in','tự tin ở môn/lĩnh vực']],
      ['Tôi rất vui khi nghe điều đó.','I am glad to hear that.','Cháu cũng tham gia thảo luận nhiều hơn trước.','She also participates in discussions more than before.',['participate','tham gia']],
    ]],
    ['A Difficulty With Homework','Khó khăn với bài tập','Phụ huynh thấy con mất quá lâu để làm toán.','Làm rõ vấn đề và chọn hỗ trợ tại nhà.',[
      ['Cháu thường mất hơn một giờ cho bài tập toán.','He often spends over an hour on his maths homework.','Cháu gặp khó ở dạng bài nào?','Which type of problem does he find difficult?',['spend time on','dành thời gian cho']],
      ['Chủ yếu là bài toán có lời văn dài.','Mostly the problems with long written instructions.','Có thể cháu hiểu phép tính nhưng chưa xác định thông tin chính.','He may understand the calculation but struggle to identify the key information.',['key information','thông tin chính']],
      ['Ở nhà tôi nên giúp cháu thế nào?','How should I help him at home?','Hãy để cháu gạch chân dữ kiện trước khi chọn phép tính.','Ask him to underline the facts before choosing an operation.',['underline','gạch chân']],
    ]],
    ['Agreeing on a Support Plan','Thống nhất kế hoạch hỗ trợ','Gia đình và giáo viên lập kế hoạch bốn tuần.','Chọn hành động và cách theo dõi.',[
      ['Tôi đề xuất cháu tham gia nhóm đọc hai buổi một tuần.','I suggest that she join the reading group twice a week.','Nhóm đó học trong giờ hay sau giờ học?','Does the group meet during or after school?',['reading group','nhóm luyện đọc']],
      ['Nhóm học hai mươi phút trước tiết đầu.','It meets for twenty minutes before the first lesson.','Gia đình tôi có thể đưa cháu đến sớm vào thứ Ba và thứ Năm.','We can bring her early on Tuesdays and Thursdays.',['bring someone early','đưa ai đến sớm']],
      ['Sau bốn tuần chúng ta sẽ xem lại kết quả.','We will review her progress after four weeks.','Tôi sẽ ghi lại việc đọc ở nhà để cùng đối chiếu.','I\'ll keep a record of her reading at home so we can compare.',['keep a record','ghi chép theo dõi']],
    ]],
  ]}),
  t({id:'planning-a-movie-night',title:'Planning a Movie Night',titleVi:'Lên kế hoạch xem phim',category:'Entertainment',icon:'🎬',level:'A2',description:'Chọn phim, mua vé và sắp xếp đồ ăn.',grammar:['suggestions','comparatives','future-will'],scenarios:[
    ['Choosing a Film','Chọn phim','Ba người có sở thích phim khác nhau.','So sánh lựa chọn và thống nhất thể loại.',[
      ['Mọi người muốn xem phim hài hay phim hành động?','Would everyone prefer a comedy or an action film?','Mình thích phim hài vì tuần này đã khá căng thẳng.','I\'d prefer a comedy because this week has been stressful.',['prefer a comedy','thích phim hài hơn']],
      ['Bộ mới dài gần hai tiếng rưỡi.','The new one is almost two and a half hours long.','Vậy phim chiếu lại ngắn hơn sẽ hợp tối nay.','Then the shorter classic may suit tonight better.',['classic film','phim kinh điển']],
      ['Mình xem trailer trước khi quyết định nhé.','Let\'s watch the trailer before deciding.','Được, rồi cả nhóm bỏ phiếu.','Sure. Then the group can vote.',['trailer','đoạn giới thiệu phim']],
    ]],
    ['Booking Seats Together','Đặt ghế cùng nhau','Nhóm mua vé trực tuyến cho sáu người.','Chọn vị trí và thu tiền vé.',[
      ['Còn sáu ghế liền nhau không?','Are there six seats together left?','Chỉ còn hàng thứ ba hoặc hàng cuối.','Only the third row and the back row are available.',['seats together','các ghế liền nhau']],
      ['Hàng thứ ba có quá gần màn hình không?','Is the third row too close to the screen?','Có lẽ vậy, mình chọn hàng cuối ở giữa nhé.','Probably. Let\'s choose the middle of the back row.',['back row','hàng ghế cuối']],
      ['Mình sẽ đặt trước rồi gửi số tiền cho mọi người.','I\'ll book them now and send everyone the amount.','Nhớ tính cả phí đặt vé trực tuyến.','Remember to include the online booking fee.',['booking fee','phí đặt vé']],
    ]],
    ['Snacks for Everyone','Đồ ăn cho cả nhóm','Nhóm chuẩn bị đồ ăn cho buổi xem phim tại nhà.','Hỏi sở thích và tránh dị ứng.',[
      ['Mình sẽ làm bỏng ngô mặn và ngọt.','I\'ll make both salty and sweet popcorn.','Đừng cho bơ vào phần của Mai nhé.','Do not put butter on Mai\'s portion.',['portion','phần ăn']],
      ['Bạn ấy không dùng được sữa phải không?','She cannot have dairy, right?','Đúng, mình sẽ dùng một bát riêng cho bạn ấy.','Right. I\'ll use a separate bowl for her.',['separate bowl','bát riêng']],
      ['Mọi người tự mang đồ uống được không?','Can everyone bring their own drink?','Được, như vậy mình chỉ cần chuẩn bị đồ ăn nhẹ.','Yes. Then I only need to prepare the snacks.',['bring your own','tự mang theo']],
    ]],
  ]}),
  t({id:'using-the-post-office',title:'Using the Post Office',titleVi:'Sử dụng bưu điện',category:'Services',icon:'📮',level:'A2',description:'Gửi thư, chọn dịch vụ và xử lý địa chỉ thiếu.',grammar:['polite-requests','comparatives','have-to'],scenarios:[
    ['Sending a Registered Letter','Gửi thư bảo đảm','Khách cần bằng chứng thư đã được giao.','Chọn dịch vụ có theo dõi và ký nhận.',[
      ['Tôi cần gửi thư này và biết khi nào nó được nhận.','I need to send this letter and know when it is delivered.','Bạn nên dùng dịch vụ thư bảo đảm.','You should use the registered mail service.',['registered mail','thư bảo đảm']],
      ['Người nhận có phải ký không?','Will the recipient have to sign for it?','Có, chữ ký sẽ được ghi trong hệ thống theo dõi.','Yes. The signature will be recorded in the tracking system.',['sign for','ký xác nhận nhận']],
      ['Tôi lấy mã theo dõi ở đâu?','Where do I find the tracking number?','Nó sẽ được in dưới mã vạch trên biên nhận.','It will be printed below the barcode on your receipt.',['barcode','mã vạch']],
    ]],
    ['Choosing Parcel Speed','Chọn tốc độ gửi hàng','Khách cân nhắc gửi thường và gửi nhanh.','So sánh giá với ngày giao dự kiến.',[
      ['Gửi gói hàng này đến Cần Thơ mất bao lâu?','How long will this parcel take to reach Can Tho?','Dịch vụ thường mất bốn ngày làm việc.','Standard service takes four business days.',['standard service','dịch vụ thường']],
      ['Còn dịch vụ nhanh thì sao?','What about the express service?','Nó dự kiến đến ngày mai nhưng giá gần gấp đôi.','It should arrive tomorrow, but it costs nearly twice as much.',['express service','dịch vụ chuyển phát nhanh']],
      ['Tôi cần nó trước thứ Sáu nên gửi thường vẫn kịp.','I need it before Friday, so standard delivery is still soon enough.','Vậy tôi sẽ tính cước theo dịch vụ thường.','Then I\'ll charge you the standard rate.',['delivery rate','mức cước giao hàng']],
    ]],
    ['Completing the Address','Hoàn thiện địa chỉ','Nhân viên thấy địa chỉ người nhận thiếu thông tin.','Bổ sung mã bưu chính và số liên hệ.',[
      ['Địa chỉ này chưa có mã bưu chính.','This address does not include a postal code.','Tôi có thể tra mã đó ở đâu?','Where can I look it up?',['postal code','mã bưu chính']],
      ['Bạn có thể tìm theo quận trên bảng điện tử kia.','You can search by district on that screen.','Tôi cũng cần ghi số điện thoại người nhận chứ?','Do I also need the recipient\'s phone number?',['search by district','tìm theo quận']],
      ['Có, tài xế có thể gọi nếu không tìm thấy nhà.','Yes. The driver may call if the house is difficult to find.','Tôi sẽ bổ sung cả hai thông tin trước khi gửi.','I\'ll add both details before posting it.',['delivery address','địa chỉ giao nhận']],
    ]],
  ]}),
  t({id:'buying-travel-insurance',title:'Buying Travel Insurance',titleVi:'Mua bảo hiểm du lịch',category:'Travel',icon:'🛡️',level:'B1',description:'So sánh quyền lợi, khai báo sức khỏe và hiểu yêu cầu bồi thường.',grammar:['conditionals','present-perfect','modals'],scenarios:[
    ['Comparing Medical Cover','So sánh bảo hiểm y tế','Khách so sánh hai gói trước chuyến đi nước ngoài.','Đọc hạn mức và trường hợp loại trừ.',[
      ['Gói cơ bản chi trả bao nhiêu cho cấp cứu y tế?','How much emergency medical cover does the basic plan provide?','Nó chi trả tối đa hai tỷ đồng cho mỗi chuyến đi.','It covers up to two billion dong per trip.',['medical cover','quyền lợi chi trả y tế']],
      ['Gói đó có bao gồm bệnh có sẵn không?','Does that include pre-existing conditions?','Không, trừ khi tình trạng đã được khai báo và chấp thuận riêng.','No, unless the condition has been declared and specifically accepted.',['pre-existing condition','bệnh có từ trước']],
      ['Gói cao hơn còn chi trả sơ tán y tế.','The higher plan also covers medical evacuation.','Đi vùng xa thì quyền lợi đó có vẻ đáng cân nhắc.','That benefit seems worth considering for a remote destination.',['medical evacuation','sơ tán y tế']],
    ]],
    ['Declaring a Health Condition','Khai báo tình trạng sức khỏe','Khách không chắc có cần khai báo hen suyễn nhẹ.','Cung cấp thông tin trung thực để bảo vệ quyền lợi.',[
      ['Tôi bị hen nhẹ nhưng đã lâu không cần điều trị.','I have mild asthma but have not needed treatment for a long time.','Bạn vẫn nên khai báo trong bảng câu hỏi sức khỏe.','You should still declare it in the medical questionnaire.',['declare a condition','khai báo bệnh/tình trạng']],
      ['Việc đó có tự động làm tăng phí không?','Will that automatically increase the premium?','Không nhất thiết; bộ phận thẩm định sẽ xem lịch sử và điểm đến.','Not necessarily. Underwriting will review your history and destination.',['insurance premium','phí bảo hiểm']],
      ['Nếu không khai báo thì yêu cầu bồi thường có thể bị từ chối phải không?','Could a claim be rejected if I failed to declare it?','Đúng, đặc biệt nếu sự cố có liên quan đến tình trạng đó.','Yes, particularly if the incident were related to that condition.',['reject a claim','từ chối bồi thường']],
    ]],
    ['Starting a Claim Abroad','Bắt đầu yêu cầu bồi thường','Du khách mất hành lý và liên hệ công ty bảo hiểm.','Bảo toàn chứng từ và mở hồ sơ đúng hạn.',[
      ['Hãng bay xác nhận vali của tôi đã thất lạc.','The airline has confirmed that my suitcase is missing.','Bạn đã lấy báo cáo bất thường hành lý tại sân bay chưa?','Did you obtain a baggage irregularity report at the airport?',['baggage report','biên bản hành lý bất thường']],
      ['Có, và tôi cũng giữ thẻ hành lý cùng thẻ lên máy bay.','Yes. I also kept my baggage tag and boarding pass.','Tốt, hãy tải bản chụp của cả ba giấy tờ lên hồ sơ.','Good. Upload copies of all three documents to the claim.',['supporting document','chứng từ hỗ trợ']],
      ['Tôi có thể mua quần áo thiết yếu trong lúc chờ không?','May I buy essential clothing while I wait?','Có, trong giới hạn mỗi ngày, nhưng bạn phải giữ hóa đơn.','Yes, within the daily limit, but you must keep the receipts.',['daily limit','hạn mức mỗi ngày']],
    ]],
  ]}),
  t({id:'building-healthy-habits',title:'Building Healthy Habits',titleVi:'Xây dựng thói quen lành mạnh',category:'Health',icon:'🌿',level:'B1',description:'Đổi thói quen nhỏ, theo dõi rào cản và tránh mục tiêu cực đoan.',grammar:['present-perfect-continuous','conditionals','modals'],scenarios:[
    ['Improving Sleep','Cải thiện giấc ngủ','Một người thường thức khuya vì dùng điện thoại.','Tìm tác nhân và thử thay đổi cụ thể.',[
      ['Mình đã ngủ dưới sáu tiếng suốt tuần này.','I\'ve been sleeping fewer than six hours all week.','Điều gì khiến bạn chưa thể đi ngủ sớm hơn?','What has been keeping you from going to bed earlier?',['keep someone from','ngăn ai làm gì']],
      ['Mình thường xem video trên giường mà không để ý thời gian.','I often watch videos in bed and lose track of time.','Hãy sạc điện thoại ngoài phòng ngủ trong một tuần.','Try charging your phone outside the bedroom for a week.',['lose track of time','không để ý thời gian']],
      ['Nếu cần báo thức, mình có thể dùng đồng hồ riêng.','If I need an alarm, I can use a separate clock.','Như vậy bạn loại bỏ được lý do giữ điện thoại cạnh giường.','That removes the reason to keep the phone by your bed.',['remove a trigger','loại bỏ tác nhân']],
    ]],
    ['Making Lunch More Balanced','Bữa trưa cân bằng hơn','Nhân viên thường ăn nhanh và mệt vào buổi chiều.','Thêm thực phẩm có lợi mà không thay đổi cực đoan.',[
      ['Mình thường buồn ngủ ngay sau bữa trưa.','I often feel sleepy immediately after lunch.','Bữa trưa của bạn thường gồm những gì?','What does your lunch usually consist of?',['consist of','bao gồm']],
      ['Phần lớn là mì và một ly nước ngọt.','Mostly noodles and a soft drink.','Bạn có thể thêm rau cùng protein và đổi sang nước lọc.','You could add vegetables and protein and switch to water.',['protein','chất đạm']],
      ['Mình sẽ chuẩn bị trứng và rau từ tối hôm trước.','I\'ll prepare eggs and vegetables the night before.','Chuẩn bị sẵn sẽ giúp lựa chọn lành mạnh dễ hơn.','Preparing ahead will make the healthier choice easier.',['prepare ahead','chuẩn bị trước']],
    ]],
    ['Recovering From a Missed Week','Quay lại sau một tuần bỏ dở','Một người bỏ kế hoạch sức khỏe vì bận công việc.','Tiếp tục mà không tự trách và giảm mục tiêu.',[
      ['Tuần rồi mình không làm được bất kỳ mục tiêu nào.','I did not meet any of my goals last week.','Một tuần bận không xóa đi tiến bộ trước đó.','One difficult week does not erase your earlier progress.',['erase progress','xóa bỏ tiến bộ']],
      ['Mình có nên bù bằng cách tập mỗi ngày tuần này không?','Should I make up for it by exercising every day this week?','Không cần; làm quá sức có thể khiến bạn lại bỏ cuộc.','No. Overdoing it could make you give up again.',['overdo it','làm quá sức']],
      ['Mình sẽ quay lại hai buổi tập và giờ ngủ cố định.','I\'ll return to two workouts and a consistent bedtime.','Đó là một cách bắt đầu lại thực tế hơn.','That is a more sustainable way to restart.',['sustainable','có thể duy trì lâu dài']],
    ]],
  ]}),
  t({id:'joining-a-language-exchange',title:'Joining a Language Exchange',titleVi:'Tham gia trao đổi ngôn ngữ',category:'Education',icon:'🗣️',level:'B1',description:'Thống nhất cách luyện, sửa lỗi và cân bằng thời gian hai ngôn ngữ.',grammar:['reported-speech','polite-requests','conditionals'],scenarios:[
    ['Agreeing on a Format','Thống nhất hình thức','Hai người lần đầu gặp để trao đổi ngôn ngữ.','Chia thời gian và chọn chủ đề phù hợp.',[
      ['Bạn muốn chia buổi nói chuyện thế nào?','How would you like to divide our conversation time?','Mình đề xuất ba mươi phút tiếng Anh rồi ba mươi phút tiếng Việt.','I suggest thirty minutes in English followed by thirty in Vietnamese.',['divide the time','chia thời gian']],
      ['Mình có nên chọn trước chủ đề không?','Should we choose a topic in advance?','Có, như vậy cả hai có thể chuẩn bị một ít từ vựng.','Yes. That way, we can both prepare some vocabulary.',['in advance','trước, từ trước']],
      ['Tuần đầu mình nói về công việc và sở thích nhé.','Let\'s discuss work and hobbies in the first week.','Được, đó là chủ đề đủ rộng cho cả hai trình độ.','Great. That is broad enough for both of our levels.',['broad topic','chủ đề rộng']],
    ]],
    ['Correcting Mistakes Helpfully','Sửa lỗi hữu ích','Người học muốn được sửa nhưng không muốn liên tục bị ngắt lời.','Thống nhất thời điểm và mức độ sửa.',[
      ['Bạn có muốn mình sửa mọi lỗi ngay khi nghe thấy không?','Would you like me to correct every mistake as soon as I hear it?','Nếu sửa liên tục, mình có thể mất mạch nói.','If I am corrected constantly, I may lose my train of thought.',['lose your train of thought','mất mạch suy nghĩ']],
      ['Vậy mình sẽ ghi chú và sửa ba lỗi quan trọng ở cuối.','Then I\'ll take notes and review three important errors at the end.','Hãy ngắt lời nếu lỗi làm thay đổi hoàn toàn ý nghĩa.','Please interrupt if a mistake completely changes the meaning.',['take notes','ghi chú']],
      ['Bạn cũng muốn mình sửa phát âm theo cách đó chứ?','Would you like pronunciation feedback in the same way?','Có, và bạn có thể đọc mẫu để mình lặp lại.','Yes, and you can model the word so I can repeat it.',['model pronunciation','đọc phát âm mẫu']],
    ]],
    ['When One Language Takes Over','Khi một ngôn ngữ chiếm hết thời gian','Cả hai vô tình chỉ dùng ngôn ngữ dễ hơn.','Nhận ra mất cân bằng và điều chỉnh buổi học.',[
      ['Chúng ta đã nói tiếng Anh gần hết buổi rồi.','We have spoken English for almost the entire session.','Đúng, mình đã chuyển ngôn ngữ mỗi khi không biết từ tiếng Việt.','True. I switched languages whenever I did not know a Vietnamese word.',['switch languages','chuyển ngôn ngữ']],
      ['Mình có thể giải thích từ đó thay vì nói ngay bằng tiếng Anh.','You could describe the word instead of immediately using English.','Ý hay, như vậy mình vẫn luyện được cách diễn đạt vòng.','Good idea. That would let me practise talking around an unknown word.',['talk around a word','diễn giải khi không biết từ']],
      ['Hai mươi phút cuối mình chỉ dùng tiếng Việt nhé.','Let\'s use only Vietnamese for the final twenty minutes.','Đồng ý, bạn nhắc mình nếu mình lại chuyển nhé.','Agreed. Remind me if I switch again.',['language balance','sự cân bằng ngôn ngữ']],
    ]],
  ]}),
  t({id:'discussing-a-medical-treatment',title:'Discussing a Medical Treatment',titleVi:'Trao đổi phương án điều trị',category:'Health',icon:'🏥',level:'B2',description:'Cân nhắc lợi ích, rủi ro và lựa chọn điều trị cùng bác sĩ.',grammar:['advanced-modals','conditionals','nuanced-polite-language'],scenarios:[
    ['Weighing Two Options','Cân nhắc hai lựa chọn','Bệnh nhân được đề xuất vật lý trị liệu hoặc thủ thuật.','So sánh bằng chứng, thời gian phục hồi và ưu tiên cá nhân.',[
      ['Hai phương án này khác nhau thế nào về khả năng phục hồi?','How do these two options differ in terms of likely recovery?','Vật lý trị liệu chậm hơn nhưng tránh được rủi ro của thủ thuật.','Physiotherapy is slower but avoids the risks associated with a procedure.',['likely recovery','khả năng phục hồi dự kiến']],
      ['Nếu chọn thủ thuật, tôi có thể trở lại làm việc sớm hơn không?','If I chose the procedure, might I return to work sooner?','Có thể, mặc dù kết quả còn phụ thuộc mức độ tổn thương.','Possibly, although the outcome would still depend on the extent of the injury.',['extent of injury','mức độ tổn thương']],
      ['Tôi ưu tiên tránh can thiệp nếu hai kết quả dài hạn tương đương.','I would prefer to avoid intervention if the long-term outcomes are comparable.','Với ưu tiên đó, thử điều trị bảo tồn trước là hợp lý.','Given that preference, a trial of conservative treatment is reasonable.',['conservative treatment','điều trị bảo tồn']],
    ]],
    ['Understanding Side Effects','Hiểu tác dụng phụ','Bác sĩ giải thích một loại thuốc mới có nhiều lưu ý.','Phân biệt tác dụng thường gặp và dấu hiệu nguy hiểm.',[
      ['Tờ hướng dẫn liệt kê chóng mặt và buồn nôn; chúng thường gặp đến mức nào?','The leaflet lists dizziness and nausea; how common are they?','Chúng xảy ra ở một số ít bệnh nhân và thường giảm trong vài ngày.','They occur in a minority of patients and usually settle within a few days.',['a minority of patients','một số ít bệnh nhân']],
      ['Dấu hiệu nào có nghĩa là tôi phải ngừng thuốc ngay?','Which symptoms would mean I should stop the medication immediately?','Khó thở hoặc sưng mặt cần được xử lý cấp cứu.','Breathing difficulty or facial swelling would require urgent attention.',['urgent attention','xử lý y tế khẩn cấp']],
      ['Tôi có nên tránh lái xe trong liều đầu không?','Should I avoid driving after the first dose?','Có, cho đến khi bạn biết thuốc ảnh hưởng sự tỉnh táo ra sao.','Yes, until you know how it affects your alertness.',['alertness','sự tỉnh táo']],
    ]],
    ['Making a Shared Decision','Cùng đưa ra quyết định','Bệnh nhân chưa sẵn sàng quyết định ngay tại buổi khám.','Xin thêm thời gian và nguồn thông tin đáng tin cậy.',[
      ['Tôi muốn cân nhắc lựa chọn này thay vì quyết định hôm nay.','I would like to consider the option rather than decide today.','Tất nhiên; trừ khi triệu chứng xấu đi, quyết định không cần gấp.','Of course. Unless your symptoms worsen, the decision is not urgent.',['not urgent','không cần quyết định gấp']],
      ['Bác sĩ có thể cho tôi tài liệu dựa trên bằng chứng để đọc không?','Could you give me evidence-based information to read?','Tôi sẽ gửi bản hướng dẫn của bệnh viện và một công cụ hỗ trợ quyết định.','I\'ll send the hospital guide and a decision aid.',['decision aid','công cụ hỗ trợ quyết định']],
      ['Sau khi đọc, tôi muốn có cuộc hẹn cùng một người nhà.','After reading it, I\'d like a follow-up with a family member present.','Được, chúng ta sẽ dành thời gian giải đáp câu hỏi của cả hai.','Certainly. We\'ll allow time to address both of your questions.',['follow-up appointment','cuộc hẹn tái khám']],
    ]],
  ]}),
];
