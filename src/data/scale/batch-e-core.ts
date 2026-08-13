import { scaleTopic as t } from './scale-builder';

export const batchECoreTopics = [
  t({id:'using-a-vending-machine',title:'Using a Vending Machine',titleVi:'Sử dụng máy bán hàng',category:'Daily Life',icon:'🥤',level:'A1',description:'Chọn món, thanh toán và nhận lại tiền thừa.',grammar:['can','imperatives','basic-questions'],scenarios:[
    ['Choosing a Drink','Chọn đồ uống','Hai người dừng trước máy bán nước.','Tìm đúng món và đọc giá.',[
      ['Bạn muốn uống gì?','What would you like to drink?','Mình muốn một chai nước không ga.','I would like a bottle of still water.',['still water','nước không ga']],
      ['Nước ở hàng thứ hai.','The water is on the second row.','Mình thấy rồi, mã của nó là B4.','I see it. Its code is B4.',['item code','mã sản phẩm']],
      ['Nó có giá bao nhiêu?','How much does it cost?','Giá là mười hai nghìn đồng.','It costs twelve thousand dong.',['displayed price','giá hiển thị']],
    ]],
    ['Paying by Card','Thanh toán bằng thẻ','Người mua dùng đầu đọc thẻ của máy.','Chạm thẻ và xác nhận giao dịch.',[
      ['Máy này có nhận thẻ không?','Does this machine accept cards?','Có, hãy chạm thẻ vào biểu tượng bên phải.','Yes. Tap your card on the symbol to the right.',['tap a card','chạm thẻ']],
      ['Màn hình đang ghi đang xử lý.','The screen says the payment is processing.','Hãy giữ thẻ ở đó thêm một giây.','Keep the card there for one more second.',['process a payment','xử lý thanh toán']],
      ['Bây giờ có dấu tích màu xanh.','There is a green tick now.','Tốt, giao dịch đã được chấp nhận.','Good. The transaction has been approved.',['approved transaction','giao dịch được chấp nhận']],
    ]],
    ['A Snack Gets Stuck','Món ăn bị mắc','Gói bánh không rơi xuống sau khi mua.','Báo lỗi mà không rung máy.',[
      ['Gói bánh của mình bị mắc bên trong máy rồi.','My snack is stuck inside the machine.','Đừng lắc máy vì có thể nguy hiểm.','Do not shake the machine because it may be dangerous.',['get stuck','bị mắc']],
      ['Mình nên làm gì để nhờ hỗ trợ an toàn?','What should I do to get help safely?','Hãy gọi số hỗ trợ trên nhãn này.','Call the support number on this label.',['support label','nhãn hỗ trợ']],
      ['Mình cần đọc mã nào cho nhân viên hỗ trợ?','Which code should I give the support team?','Đọc số máy ở góc dưới bên trái.','Give them the machine number in the bottom-left corner.',['machine number','số máy']],
    ]],
  ]}),
  t({id:'visiting-a-bookshop',title:'Visiting a Bookshop',titleVi:'Đi nhà sách',category:'Shopping',icon:'📚',level:'A1',description:'Tìm khu sách, hỏi giá và thanh toán.',grammar:['where-questions','there-is-are','present-simple'],scenarios:[
    ['Finding a Section','Tìm khu sách','Khách muốn tìm sách học tiếng Anh.','Hỏi vị trí và đi đúng tầng.',[
      ['Khu sách tiếng Anh ở đâu?','Where is the English book section?','Nó ở tầng hai, gần cầu thang.','It is on the second floor near the stairs.',['book section','khu sách']],
      ['Ở đó có sách cho người mới bắt đầu không?','Are there books for beginners there?','Có, chúng ở trên kệ màu xanh.','Yes. They are on the green shelf.',['beginner book','sách cho người mới bắt đầu']],
      ['Mình có thể dùng thang máy không?','Can I use the lift?','Có, thang máy ở phía sau quầy thu ngân.','Yes. The lift is behind the checkout desk.',['checkout desk','quầy thu ngân']],
    ]],
    ['Checking a Book','Xem một cuốn sách','Bạn bè xem nội dung trước khi mua.','Kiểm tra trình độ và tình trạng sách.',[
      ['Cuốn này có phù hợp với trình độ A1 không?','Is this book suitable for level A1?','Có, mỗi bài chỉ dùng các câu ngắn.','Yes. Each lesson uses only short sentences.',['suitable for','phù hợp với']],
      ['Sách có kèm phần nghe không?','Does the book include audio practice?','Có mã để tải phần nghe ở bìa sau.','There is a code for the audio on the back cover.',['back cover','bìa sau']],
      ['Cuốn này bị rách một trang.','This copy has a torn page.','Mình sẽ lấy cho bạn một cuốn khác.','I will get you another copy.',['torn page','trang bị rách']],
    ]],
    ['Paying for the Books','Thanh toán sách','Khách mang hai cuốn ra quầy.','Kiểm tra giảm giá và lấy hóa đơn.',[
      ['Hai cuốn này tổng cộng bao nhiêu?','How much are these two books altogether?','Tất cả hết ba trăm hai mươi nghìn đồng.','Together, they come to three hundred and twenty thousand dong.',['altogether','tổng cộng']],
      ['Thẻ học sinh có được giảm giá không?','Is there a discount with a student card?','Có, bạn được giảm mười phần trăm.','Yes. You receive a ten-percent discount.',['student discount','giảm giá học sinh']],
      ['Cho mình xin hóa đơn nhé.','Could I have the receipt, please?','Tất nhiên, hóa đơn ở trong túi giấy.','Of course. The receipt is inside the paper bag.',['paper bag','túi giấy']],
    ]],
  ]}),
  t({id:'packing-a-school-bag',title:'Packing a School Bag',titleVi:'Soạn cặp đi học',category:'Education',icon:'🎒',level:'A1',description:'Xem thời khóa biểu, chuẩn bị đồ và kiểm tra cặp.',grammar:['have-got','imperatives','tomorrow'],scenarios:[
    ['Reading the Timetable','Xem thời khóa biểu','Học sinh chuẩn bị sách cho ngày mai.','Chọn đúng sách theo môn học.',[
      ['Ngày mai con có môn gì đầu tiên?','What is your first subject tomorrow?','Con có môn toán lúc tám giờ.','I have maths at eight o’clock.',['first subject','môn đầu tiên']],
      ['Con đã lấy sách toán chưa?','Have you got your maths book?','Rồi, nó ở cạnh hộp bút.','Yes. It is beside my pencil case.',['pencil case','hộp bút']],
      ['Sau môn toán là môn gì?','What comes after maths?','Sau đó là môn khoa học.','Science comes after that.',['school timetable','thời khóa biểu']],
    ]],
    ['Preparing Supplies','Chuẩn bị đồ dùng','Học sinh kiểm tra dụng cụ trong cặp.','Mang đủ đồ mà không quá nặng.',[
      ['Con cần bao nhiêu quyển vở?','How many notebooks do you need?','Con cần hai quyển cho ngày mai.','I need two notebooks for tomorrow.',['notebook','quyển vở']],
      ['Hộp bút có bút chì không?','Are there any pencils in your pencil case?','Có ba cây bút chì đã gọt.','There are three sharpened pencils.',['sharpened pencil','bút chì đã gọt']],
      ['Đừng mang mọi cuốn sách nhé.','Do not take every book with you.','Vâng, con chỉ mang những cuốn cần dùng.','Okay. I will take only the books I need.',['school supplies','đồ dùng học tập']],
    ]],
    ['The Final Check','Kiểm tra lần cuối','Cặp đã soạn xong trước giờ ngủ.','Kiểm tra bài tập và bình nước.',[
      ['Bài tập của con ở đâu?','Where is your homework?','Nó ở trong ngăn trước của cặp.','It is in the front pocket of my bag.',['front pocket','ngăn trước']],
      ['Bình nước đã đầy chưa?','Is your water bottle full?','Chưa, con sẽ đổ nước vào sáng mai.','Not yet. I will fill it tomorrow morning.',['fill a bottle','đổ đầy bình']],
      ['Bây giờ cặp có nặng quá không?','Is the bag too heavy now?','Không, con có thể mang nó thoải mái.','No. I can carry it comfortably.',['too heavy','quá nặng']],
    ]],
  ]}),
  t({id:'buying-fruit-at-a-market',title:'Buying Fruit at a Market',titleVi:'Mua trái cây ở chợ',category:'Food & Drink',icon:'🍊',level:'A1',description:'Chọn trái cây chín, hỏi số lượng và trả tiền.',grammar:['how-much-many','would-like','this-that'],scenarios:[
    ['Choosing Oranges','Chọn cam','Khách xem một rổ cam tại quầy.', 'Hỏi độ ngọt và chọn quả chín.',[
      ['Những quả cam này có ngọt không?','Are these oranges sweet?','Có, chúng vừa được hái sáng nay.','Yes. They were picked this morning.',['freshly picked','mới được hái']],
      ['Mình có thể xem quả này không?','Can I look at this one?','Được, quả đó đã chín và khá mọng.','Sure. That one is ripe and juicy.',['ripe and juicy','chín và mọng']],
      ['Mình lấy sáu quả nhé.','I would like six oranges, please.','Tôi sẽ chọn sáu quả cùng kích cỡ.','I will choose six of a similar size.',['similar size','kích cỡ tương tự']],
    ]],
    ['Buying Bananas','Mua chuối','Khách cần chuối dùng trong vài ngày.', 'Chọn nải có độ chín phù hợp.',[
      ['Một nải chuối này bao nhiêu tiền?','How much is this bunch of bananas?','Nải này có giá bốn mươi nghìn đồng.','This bunch costs forty thousand dong.',['a bunch of bananas','một nải chuối']],
      ['Mình muốn chuối chưa chín hẳn.','I want bananas that are not fully ripe.','Nải xanh hơn này sẽ để được lâu hơn.','This greener bunch will last longer.',['last longer','để được lâu hơn']],
      ['Bạn cân nải đó giúp mình nhé.','Could you weigh that bunch for me?','Được, nó nặng gần một cân.','Certainly. It weighs nearly one kilogram.',['weigh produce','cân nông sản']],
    ]],
    ['Checking the Change','Kiểm tra tiền thừa','Người mua trả tiền mặt cho nhiều loại quả.', 'Xác nhận tổng tiền và tiền trả lại.',[
      ['Tổng tiền trái cây là bao nhiêu?','What is the total for the fruit?','Tổng cộng là một trăm mười nghìn đồng.','The total comes to one hundred and ten thousand dong.',['come to','có tổng là']],
      ['Mình gửi bạn hai trăm nghìn.','Here is two hundred thousand dong.','Cảm ơn, tôi sẽ trả lại chín mươi nghìn.','Thank you. Your change is ninety thousand dong.',['give change','trả tiền thừa']],
      ['Bạn cho cam và chuối vào túi riêng nhé.','Please put the oranges and bananas in separate bags.','Được, như vậy cam sẽ không làm dập chuối.','Sure. That will stop the oranges bruising the bananas.',['bruise fruit','làm dập trái cây']],
    ]],
  ]}),
  t({id:'booking-a-doctor-appointment',title:'Booking a Doctor Appointment',titleVi:'Đặt lịch khám bác sĩ',category:'Health',icon:'🩺',level:'A2',description:'Mô tả nhu cầu, chọn giờ và đổi lịch khám.',grammar:['present-perfect','time-questions','polite-requests'],scenarios:[
    ['Explaining the Reason','Nêu lý do khám','Bệnh nhân gọi đến phòng khám.','Nói ngắn gọn triệu chứng và mức khẩn cấp.',[
      ['Tôi muốn đặt lịch khám với bác sĩ đa khoa.','I would like to book an appointment with a general practitioner.','Bạn cần khám về vấn đề gì?','What would you like the doctor to examine?',['general practitioner','bác sĩ đa khoa']],
      ['Tôi bị ho khan từ cuối tuần.','I have had a dry cough since the weekend.','Bạn có bị sốt hoặc khó thở không?','Have you had a fever or any difficulty breathing?',['dry cough','ho khan']],
      ['Tôi không sốt và vẫn thở bình thường.','I do not have a fever, and I can breathe normally.','Vậy tôi sẽ tìm lịch thường sớm nhất cho bạn.','Then I will find the earliest routine appointment.',['routine appointment','lịch khám thông thường']],
      ['Nếu tình trạng nặng hơn, tôi nên làm gì?','What should I do if it gets worse?','Hãy gọi lại ngay hoặc đến cơ sở cấp cứu.','Call us again immediately or visit an urgent care centre.',['urgent care','chăm sóc khẩn cấp']],
    ]],
    ['Choosing a Time','Chọn thời gian','Lễ tân đưa ra hai khung giờ khám.','Chọn giờ phù hợp và xác nhận bác sĩ.',[
      ['Sáng mai còn giờ nào không?','Are there any appointments left tomorrow morning?','Chúng tôi còn lịch lúc chín giờ mười lăm.','We have an opening at nine fifteen.',['available opening','khung giờ trống']],
      ['Giờ đó hơi sớm vì tôi phải đưa con đi học.','That is a little early because I have to take my child to school.','Buổi chiều có lịch lúc ba giờ bốn mươi.','There is an appointment at three forty in the afternoon.',['afternoon slot','khung giờ buổi chiều']],
      ['Lịch chiều là với bác sĩ nào?','Which doctor is the afternoon appointment with?','Bạn sẽ gặp bác sĩ Nguyễn ở phòng số bốn.','You will see Doctor Nguyen in room four.',['see a doctor','được bác sĩ khám']],
      ['Ba giờ bốn mươi phù hợp với tôi.','Three forty works for me.','Tôi đã giữ lịch đó dưới tên của bạn.','I have reserved that time under your name.',['reserve a time','giữ khung giờ']],
    ]],
    ['Rescheduling the Visit','Đổi lịch khám','Bệnh nhân có cuộc họp đột xuất.','Đổi lịch sớm và giữ thông tin khám.',[
      ['Tôi cần đổi lịch khám chiều nay.','I need to reschedule my appointment this afternoon.','Bạn vui lòng cho tôi mã đặt lịch được không?','Could you give me your booking reference, please?',['booking reference','mã đặt lịch']],
      ['Mã của tôi là H27.','My reference is H27.','Cảm ơn, tôi đã tìm thấy hồ sơ của bạn.','Thank you. I have found your booking.',['patient record','hồ sơ bệnh nhân']],
      ['Ngày mai cùng giờ còn trống không?','Is the same time available tomorrow?','Không, nhưng bốn giờ mười lăm vẫn còn.','No, but four fifteen is still available.',['reschedule','đổi lịch']],
      ['Hãy chuyển tôi sang giờ đó nhé.','Please move my appointment to that time.','Đã xong, bạn sẽ nhận tin nhắn xác nhận mới.','Done. You will receive a new confirmation message.',['confirmation message','tin nhắn xác nhận']],
    ]],
  ]}),
  t({id:'reporting-lost-property',title:'Reporting Lost Property',titleVi:'Báo mất đồ',category:'Services',icon:'🧤',level:'A2',description:'Mô tả đồ thất lạc, xác định nơi mất và nhận lại.',grammar:['past-simple','describing-objects','relative-clauses'],scenarios:[
    ['Describing the Missing Bag','Mô tả chiếc túi bị mất','Hành khách đến quầy đồ thất lạc.','Cung cấp đặc điểm nhận dạng rõ ràng.',[
      ['Tôi để quên một chiếc túi trên xe buýt.','I left a bag on a bus.','Bạn có thể mô tả chiếc túi không?','Could you describe the bag for me?',['describe an item','mô tả đồ vật']],
      ['Đó là túi đeo chéo nhỏ màu xanh đậm.','It is a small dark-blue shoulder bag.','Túi có nhãn hiệu hoặc dấu đặc biệt nào không?','Does it have a brand name or any distinctive marks?',['distinctive mark','dấu hiệu đặc biệt']],
      ['Khóa kéo có một sợi dây màu cam.','There is an orange cord on the zip.','Bên trong có gì để chúng tôi kiểm tra?','What is inside it so that we can verify the item?',['verify ownership','xác minh sở hữu']],
      ['Có một cuốn sổ và chìa khóa nhà.','It contains a notebook and my house keys.','Tôi sẽ ghi những chi tiết đó vào báo cáo.','I will add those details to the report.',['lost-property report','biên bản đồ thất lạc']],
    ]],
    ['Remembering the Journey','Nhớ lại hành trình','Nhân viên hỏi chuyến xe và chỗ ngồi.','Thu hẹp nơi cần tìm kiếm.',[
      ['Bạn đi tuyến xe buýt nào?','Which bus route did you take?','Tôi đi tuyến số 18 từ trung tâm.','I took route 18 from the city centre.',['bus route','tuyến xe buýt']],
      ['Bạn xuống xe lúc mấy giờ?','What time did you get off?','Tôi xuống ở bến đại học khoảng sáu giờ.','I got off at the university stop at about six.',['get off','xuống xe']],
      ['Bạn ngồi ở phần nào của xe?','Where were you sitting on the bus?','Tôi ngồi gần cửa sau, phía bên trái.','I was sitting near the rear door on the left.',['rear door','cửa sau']],
      ['Bạn có nhớ số xe không?','Do you remember the vehicle number?','Không, nhưng tài xế mặc áo khoác màu đỏ.','No, but the driver was wearing a red jacket.',['vehicle number','số phương tiện']],
    ]],
    ['Collecting the Item','Nhận lại đồ','Quầy gọi báo đã tìm thấy chiếc túi.','Xác minh danh tính và ký nhận.',[
      ['Chúng tôi tin rằng đã tìm thấy túi của bạn.','We believe we have found your bag.','Tuyệt, tôi có thể đến lấy lúc nào?','That is great. When can I collect it?',['collect an item','đến nhận đồ']],
      ['Quầy mở cửa đến tám giờ tối.','The desk is open until eight this evening.','Tôi cần mang theo giấy tờ gì?','What identification do I need to bring?',['photo identification','giấy tờ có ảnh']],
      ['Hãy mang giấy tờ có ảnh và mã báo mất.','Bring photo identification and your report number.','Tôi đã lưu mã trong điện thoại.','I have saved the number on my phone.',['report number','mã báo mất']],
      ['Bạn cũng cần ký vào phiếu nhận đồ.','You will also need to sign the collection form.','Được, tôi sẽ đến trước bảy giờ.','Okay. I will arrive before seven.',['collection form','phiếu nhận đồ']],
    ]],
  ]}),
  t({id:'choosing-a-mobile-plan',title:'Choosing a Mobile Plan',titleVi:'Chọn gói cước di động',category:'Technology',icon:'📱',level:'A2',description:'So sánh dữ liệu, phí và điều kiện hợp đồng.',grammar:['comparatives','much-many','conditionals'],scenarios:[
    ['Checking Data Use','Kiểm tra nhu cầu dữ liệu','Khách xem lượng dữ liệu dùng hàng tháng.','Ước tính dung lượng phù hợp.',[
      ['Bạn thường dùng bao nhiêu dữ liệu mỗi tháng?','How much mobile data do you usually use each month?','Tôi dùng khoảng mười hai gigabyte.','I use around twelve gigabytes.',['mobile data','dữ liệu di động']],
      ['Bạn có xem video khi không có Wi-Fi không?','Do you stream videos when Wi-Fi is unavailable?','Thỉnh thoảng tôi xem video trên đường đi làm.','I occasionally stream videos during my commute.',['stream video','xem video trực tuyến']],
      ['Gói mười lăm gigabyte có lẽ vừa đủ.','The fifteen-gigabyte plan may be sufficient.','Nếu dùng hết sớm thì tôi có thể mua thêm không?','Can I buy extra data if I use it all early?',['data allowance','dung lượng cho phép']],
      ['Có, bạn có thể mua gói bổ sung trong ứng dụng.','Yes. You can purchase an add-on in the app.','Tôi muốn xem giá của gói bổ sung trước.','I would like to check the add-on price first.',['data add-on','gói dữ liệu bổ sung']],
    ]],
    ['Comparing Two Plans','So sánh hai gói','Nhân viên giải thích gói tháng và gói trả trước.','So sánh giá cùng quyền lợi.',[
      ['Gói nào rẻ hơn nếu tôi dùng lâu dài?','Which plan is cheaper if I use it long term?','Gói theo tháng rẻ hơn sau sáu tháng.','The monthly plan is cheaper after six months.',['monthly plan','gói theo tháng']],
      ['Gói trả trước có phí kích hoạt không?','Does the prepaid plan have an activation fee?','Không, nhưng giá mỗi gigabyte cao hơn.','No, but the price per gigabyte is higher.',['activation fee','phí kích hoạt']],
      ['Cả hai gói đều có cuộc gọi không giới hạn chứ?','Do both plans include unlimited calls?','Có, nhưng chỉ gói tháng có chuyển vùng miễn phí.','Yes, but only the monthly plan includes free roaming.',['free roaming','chuyển vùng miễn phí']],
      ['Tôi ít đi nước ngoài nên quyền lợi đó không quan trọng.','I rarely travel abroad, so that benefit is not important to me.','Vậy gói trả trước cho bạn nhiều linh hoạt hơn.','Then the prepaid option gives you more flexibility.',['prepaid option','lựa chọn trả trước']],
    ]],
    ['Reading the Contract','Đọc hợp đồng','Khách kiểm tra điều khoản trước khi ký.','Hiểu thời hạn và phí hủy.',[
      ['Hợp đồng này kéo dài bao lâu?','How long does this contract last?','Thời hạn tối thiểu là mười hai tháng.','The minimum term is twelve months.',['minimum term','thời hạn tối thiểu']],
      ['Nếu chuyển nhà ra nước ngoài thì sao?','What happens if I move abroad?','Bạn có thể hủy sớm nếu cung cấp bằng chứng.','You may cancel early if you provide evidence.',['cancel early','hủy sớm']],
      ['Có phí tăng trong thời hạn hợp đồng không?','Can the price increase during the contract?','Giá có thể được điều chỉnh mỗi năm một lần.','The price may be adjusted once a year.',['annual adjustment','điều chỉnh hàng năm']],
      ['Tôi có thời gian cân nhắc sau khi đăng ký chứ?','Do I have time to reconsider after signing up?','Có, bạn có thời hạn đổi ý trong mười bốn ngày.','Yes. You have a fourteen-day cooling-off period.',['cooling-off period','thời hạn đổi ý']],
    ]],
  ]}),
  t({id:'attending-a-potluck',title:'Attending a Potluck',titleVi:'Tham dự tiệc góp món',category:'Friends & Social Life',icon:'🥗',level:'A2',description:'Chọn món mang theo, hỏi dị ứng và hỗ trợ dọn dẹp.',grammar:['going-to','some-any','polite-offers'],scenarios:[
    ['Choosing a Dish','Chọn món mang theo','Bạn bè chia nhau chuẩn bị đồ ăn.','Chọn món không trùng và dễ vận chuyển.',[
      ['Mọi người đã đăng ký mang món gì rồi?','What dishes have people already offered to bring?','Hiện có hai món chính và một món tráng miệng.','We currently have two main dishes and one dessert.',['main dish','món chính']],
      ['Vậy mình có thể làm món salad mì.','Then I could make a noodle salad.','Ý hay, món đó có thể ăn nguội.','Good idea. It can be served cold.',['serve cold','dùng khi nguội']],
      ['Mình sẽ đựng trong hộp có nắp chặt.','I will carry it in a container with a tight lid.','Như vậy nước sốt sẽ không bị đổ trên đường.','That will prevent the dressing from spilling on the way.',['tight lid','nắp kín']],
      ['Mình cần chuẩn bị phần cho bao nhiêu người?','How many servings should I prepare?','Làm đủ cho khoảng tám người nhé.','Make enough for about eight people.',['serving','khẩu phần']],
    ]],
    ['Checking Dietary Needs','Hỏi nhu cầu ăn uống','Chủ tiệc thu thập thông tin dị ứng.','Gắn nhãn món và tránh lẫn nguyên liệu.',[
      ['Có ai bị dị ứng với đậu phộng không?','Does anyone have a peanut allergy?','Có, Mai phải tránh hoàn toàn các loại hạt.','Yes. Mai must avoid all nuts completely.',['peanut allergy','dị ứng đậu phộng']],
      ['Món của mình không có hạt nhưng nước sốt mua sẵn.','My dish has no nuts, but the dressing is store-bought.','Hãy kiểm tra danh sách nguyên liệu trên chai.','Check the ingredient list on the bottle.',['ingredient list','danh sách nguyên liệu']],
      ['Mình cũng sẽ dùng dụng cụ gắp riêng.','I will also use separate serving tongs.','Cách đó giảm nguy cơ lẫn thức ăn.','That reduces the risk of cross-contamination.',['cross-contamination','lẫn chéo thực phẩm']],
      ['Mình sẽ viết nhãn ghi rõ món chay.','I will write a label saying that it is vegetarian.','Cảm ơn, nhãn rõ sẽ giúp mọi người chọn món.','Thanks. Clear labels will help everyone choose safely.',['food label','nhãn món ăn']],
    ]],
    ['Helping After Dinner','Giúp dọn sau bữa ăn','Bữa tiệc kết thúc và nhà bếp bừa bộn.','Chia việc dọn cùng chủ nhà.',[
      ['Mình có thể giúp việc gì trước?','What can I help with first?','Bạn gom đĩa bẩn vào bồn rửa nhé.','Could you collect the dirty plates by the sink?',['dirty dishes','bát đĩa bẩn']],
      ['Đồ ăn thừa nên để ở đâu?','Where should the leftovers go?','Cho chúng vào các hộp nhỏ trong tủ lạnh.','Put them in the small containers in the fridge.',['leftovers','đồ ăn thừa']],
      ['Mình sẽ lau bàn sau khi dọn hết cốc.','I will wipe the table after clearing the glasses.','Mình sẽ quét những mẩu vụn dưới ghế.','I will sweep up the crumbs under the chairs.',['sweep up crumbs','quét vụn thức ăn']],
      ['Bạn có muốn mình mang rác xuống không?','Would you like me to take the rubbish downstairs?','Có, túi tái chế để riêng cạnh cửa.','Yes. The recycling bag is separate beside the door.',['recycling bag','túi tái chế']],
    ]],
  ]}),
  t({id:'comparing-bank-accounts',title:'Comparing Bank Accounts',titleVi:'So sánh tài khoản ngân hàng',category:'Services',icon:'🏦',level:'A2',description:'So sánh phí, lãi suất và cách truy cập tài khoản.',grammar:['comparatives','conditionals','much-many'],scenarios:[
    ['Understanding the Fees','Hiểu các khoản phí','Khách hỏi về hai loại tài khoản.','So sánh phí tháng và số dư tối thiểu.',[
      ['Tài khoản này có phí hàng tháng không?','Does this account have a monthly fee?','Có, phí là năm mươi nghìn đồng mỗi tháng.','Yes. The fee is fifty thousand dong per month.',['monthly fee','phí hàng tháng']],
      ['Có cách nào được miễn phí không?','Is there a way to avoid the fee?','Phí được miễn nếu số dư trên năm triệu.','The fee is waived if your balance stays above five million.',['waive a fee','miễn phí']],
      ['Tài khoản cơ bản có yêu cầu số dư không?','Does the basic account require a minimum balance?','Không, nhưng mỗi lần rút tiền sẽ mất phí.','No, but it charges for each cash withdrawal.',['minimum balance','số dư tối thiểu']],
      ['Tôi rút tiền khá thường xuyên.','I withdraw cash quite often.','Vậy tài khoản có phí tháng có thể rẻ hơn cho bạn.','Then the account with a monthly fee may be cheaper for you.',['cash withdrawal','rút tiền mặt']],
    ]],
    ['Comparing Savings Rates','So sánh lãi tiết kiệm','Khách muốn để dành quỹ khẩn cấp.','Hiểu lãi suất và quyền rút tiền.',[
      ['Tài khoản nào trả lãi cao hơn?','Which account pays a higher interest rate?','Tài khoản có kỳ hạn trả ba phẩy tám phần trăm.','The fixed-term account pays three point eight percent.',['interest rate','lãi suất']],
      ['Tôi có thể rút tiền bất cứ lúc nào không?','Can I withdraw the money at any time?','Không, bạn sẽ mất một phần lãi nếu rút sớm.','No. You will lose some interest if you withdraw early.',['fixed-term account','tài khoản có kỳ hạn']],
      ['Tài khoản linh hoạt trả bao nhiêu?','How much does the flexible account pay?','Nó trả ít hơn nhưng không phạt khi rút.','It pays less, but there is no withdrawal penalty.',['withdrawal penalty','phí phạt rút tiền']],
      ['Tôi cần dùng quỹ khẩn cấp ngay khi cần.','I need immediate access to my emergency fund.','Vậy lựa chọn linh hoạt phù hợp hơn.','Then the flexible option is more suitable.',['emergency fund','quỹ khẩn cấp']],
    ]],
    ['Using the Account Online','Dùng tài khoản trực tuyến','Khách hỏi cách quản lý tài khoản.','Kiểm tra ứng dụng và bảo mật đăng nhập.',[
      ['Tôi có thể mở tài khoản hoàn toàn trực tuyến không?','Can I open the account entirely online?','Có, bạn chỉ cần chụp giấy tờ tùy thân.','Yes. You only need to photograph your identification.',['identity check','kiểm tra danh tính']],
      ['Ứng dụng có thông báo giao dịch không?','Does the app send transaction alerts?','Có, bạn có thể bật thông báo tức thì.','Yes. You can enable instant notifications.',['transaction alert','thông báo giao dịch']],
      ['Nếu mất điện thoại thì tôi khóa ứng dụng thế nào?','How do I lock the app if I lose my phone?','Hãy gọi đường dây bảo mật để vô hiệu hóa thiết bị.','Call the security line to deactivate the device.',['deactivate a device','vô hiệu hóa thiết bị']],
      ['Tôi có thể đăng nhập bằng vân tay chứ?','Can I sign in with my fingerprint?','Có, sau khi bạn thiết lập mã truy cập đầu tiên.','Yes, after you set up your initial passcode.',['biometric login','đăng nhập sinh trắc học']],
    ]],
  ]}),
  t({id:'negotiating-project-scope',title:'Negotiating Project Scope',titleVi:'Thương lượng phạm vi dự án',category:'Work',icon:'📐',level:'B1',description:'Làm rõ yêu cầu, đánh đổi và tiêu chí hoàn thành.',grammar:['conditionals','modals','scope-language'],scenarios:[
    ['Clarifying the Request','Làm rõ yêu cầu','Khách hàng thêm một tính năng chưa có trong kế hoạch.','Phân biệt nhu cầu và giải pháp được đề xuất.',[
      ['Yêu cầu mới nhằm giải quyết vấn đề nào cho người dùng?','Which user problem is the new request intended to solve?','Khách hàng cần tải nhiều hóa đơn trong một lần.','Customers need to download several invoices at once.',['user problem','vấn đề người dùng']],
      ['Họ có cần chọn hóa đơn theo ngày không?','Do they need to select invoices by date?','Có, và họ muốn một tệp duy nhất để lưu trữ.','Yes, and they want a single file for archiving.',['archive file','tệp lưu trữ']],
      ['Phần chọn theo ngày đã nằm trong phạm vi hiện tại.','Date selection is already within the current scope.','Vậy phần mới chỉ là gộp các tệp tải xuống.','Then the new element is only bundling the downloads.',['current scope','phạm vi hiện tại']],
      ['Tôi sẽ ghi lại giả định đó để khách hàng xác nhận.','I will document that assumption for the client to confirm.','Như vậy đội sẽ không xây nhiều hơn mức cần thiết.','That will prevent the team from building more than necessary.',['document an assumption','ghi lại giả định']],
    ]],
    ['Discussing Trade-offs','Thảo luận đánh đổi','Đội không thể thêm mọi tính năng trong thời hạn cũ.','Đưa ra lựa chọn về thời gian, chi phí và chất lượng.',[
      ['Nếu thêm chức năng này, lịch phát hành sẽ bị ảnh hưởng thế nào?','How would adding this function affect the release schedule?','Chúng ta cần thêm khoảng một tuần để phát triển và kiểm thử.','We would need roughly one extra week for development and testing.',['release schedule','lịch phát hành']],
      ['Có thể giữ ngày phát hành bằng cách bỏ hạng mục khác không?','Could we keep the release date by removing another item?','Có thể hoãn bảng điều khiển quản trị sang đợt tiếp theo.','We could defer the admin dashboard to the next release.',['defer a feature','hoãn tính năng']],
      ['Việc đó có tạo rủi ro vận hành không?','Would that create any operational risk?','Đội hỗ trợ sẽ phải xử lý một số việc thủ công lâu hơn.','The support team would need to handle some tasks manually for longer.',['operational trade-off','đánh đổi vận hành']],
      ['Hãy trình bày cả hai phương án cùng tác động.','Let us present both options with their consequences.','Khách hàng có thể chọn dựa trên ưu tiên thực tế.','The client can then decide based on their actual priorities.',['consequence','hệ quả']],
    ]],
    ['Agreeing on Acceptance','Thống nhất nghiệm thu','Hai bên cần định nghĩa khi nào tính năng hoàn tất.','Chốt tiêu chí kiểm thử đo được.',[
      ['“Tải nhanh” chưa phải tiêu chí có thể kiểm thử.','“Downloads quickly” is not a testable acceptance criterion.','Chúng ta có thể đặt giới hạn dưới mười giây.','We could set a limit of under ten seconds.',['acceptance criterion','tiêu chí nghiệm thu']],
      ['Giới hạn đó áp dụng cho bao nhiêu hóa đơn?','How many invoices should that limit cover?','Áp dụng cho tối đa một trăm hóa đơn trong một lần.','It should apply to up to one hundred invoices at a time.',['performance limit','giới hạn hiệu năng']],
      ['Điều gì xảy ra nếu một tệp không tạo được?','What should happen if one file cannot be generated?','Người dùng phải thấy tệp nào lỗi mà vẫn nhận các tệp còn lại.','The user must see which file failed and still receive the others.',['partial failure','lỗi một phần']],
      ['Tôi sẽ thêm ba tiêu chí này vào thỏa thuận phạm vi.','I will add these three criteria to the scope agreement.','Sau khi hai bên ký duyệt, đội có thể ước tính chính xác.','Once both sides approve them, the team can estimate accurately.',['scope agreement','thỏa thuận phạm vi']],
    ]],
  ]}),
  t({id:'requesting-a-data-correction',title:'Requesting a Data Correction',titleVi:'Yêu cầu sửa dữ liệu cá nhân',category:'Services',icon:'🗂️',level:'B1',description:'Xác định dữ liệu sai, cung cấp bằng chứng và theo dõi sửa đổi.',grammar:['passive-voice','formal-requests','present-perfect'],scenarios:[
    ['Identifying the Error','Xác định lỗi dữ liệu','Khách thấy ngày sinh sai trong hồ sơ.','Chỉ rõ trường dữ liệu và ảnh hưởng.',[
      ['Ngày sinh trong tài khoản của tôi không chính xác.','The date of birth recorded on my account is incorrect.','Bạn có thể cho biết ngày đang hiển thị không?','Could you tell me the date that is currently displayed?',['recorded data','dữ liệu được ghi nhận']],
      ['Hệ thống hiển thị ngày 12 thay vì ngày 21.','The system shows the twelfth instead of the twenty-first.','Sai lệch đó có ảnh hưởng dịch vụ nào không?','Has that discrepancy affected any service?',['data discrepancy','sai lệch dữ liệu']],
      ['Tôi không thể hoàn tất bước xác minh danh tính.','I have been unable to complete the identity check.','Tôi hiểu, vì câu trả lời không khớp với hồ sơ.','I understand, because your answer does not match the record.',['match a record','khớp hồ sơ']],
      ['Tôi muốn yêu cầu sửa ngày sinh chính thức.','I would like to request a formal correction to my date of birth.','Tôi sẽ mở một yêu cầu sửa dữ liệu cho bạn.','I will open a data correction request for you.',['formal correction','chỉnh sửa chính thức']],
    ]],
    ['Providing Evidence','Cung cấp bằng chứng','Nhân viên giải thích giấy tờ cần thiết.','Gửi đủ bằng chứng qua kênh an toàn.',[
      ['Tôi cần gửi loại giấy tờ nào?','What kind of document do I need to provide?','Hộ chiếu hoặc giấy khai sinh đều được chấp nhận.','A passport or birth certificate will be accepted.',['supporting document','giấy tờ hỗ trợ']],
      ['Tôi có nên gửi qua email thường không?','Should I send it through ordinary email?','Không, hãy tải lên cổng bảo mật bằng liên kết này.','No. Upload it through the secure portal using this link.',['secure portal','cổng bảo mật']],
      ['Tôi có thể che số hộ chiếu không?','May I cover the passport number?','Có, miễn là tên và ngày sinh vẫn nhìn rõ.','Yes, provided that your name and date of birth remain visible.',['redact a number','che một dãy số']],
      ['Hệ thống có xác nhận khi tải lên xong không?','Will the system confirm when the upload is complete?','Bạn sẽ nhận biên nhận có mã hồ sơ ngay lập tức.','You will receive a receipt with a case number immediately.',['case receipt','biên nhận hồ sơ']],
    ]],
    ['Following Up','Theo dõi yêu cầu','Thời hạn dự kiến đã qua mà dữ liệu chưa đổi.','Hỏi trạng thái và bước tiếp theo.',[
      ['Yêu cầu của tôi đã được gửi mười ngày trước.','My request was submitted ten days ago.','Tôi sẽ kiểm tra tiến độ bằng mã hồ sơ.','I will check its progress using the case number.',['check progress','kiểm tra tiến độ']],
      ['Trạng thái vẫn ghi đang xem xét.','The status still says that it is under review.','Đội xác minh đã yêu cầu kiểm tra thêm hôm qua.','The verification team requested an additional check yesterday.',['under review','đang xem xét']],
      ['Họ có cần thêm thông tin từ tôi không?','Do they need any further information from me?','Không, yêu cầu hiện đang chờ quản lý phê duyệt.','No. The correction is currently awaiting manager approval.',['await approval','chờ phê duyệt']],
      ['Khi hoàn tất tôi sẽ được thông báo thế nào?','How will I be notified when it is complete?','Chúng tôi sẽ gửi tin nhắn và thư xác nhận thay đổi.','We will send a message and a letter confirming the change.',['confirm a change','xác nhận thay đổi']],
    ]],
  ]}),
  t({id:'mentoring-a-junior-colleague',title:'Mentoring a Junior Colleague',titleVi:'Cố vấn đồng nghiệp mới',category:'Work',icon:'🌱',level:'B1',description:'Đặt mục tiêu, quan sát công việc và đưa phản hồi phát triển.',grammar:['coaching-questions','modals','present-perfect'],scenarios:[
    ['Setting a Focus','Chọn trọng tâm','Người hướng dẫn bắt đầu buổi cố vấn đầu tiên.','Chọn một kỹ năng có thể luyện trong tháng.',[
      ['Bạn muốn cải thiện phần nào nhất trong tháng này?','Which area would you most like to improve this month?','Tôi muốn tự tin hơn khi trình bày cập nhật kỹ thuật.','I would like to feel more confident when presenting technical updates.',['development focus','trọng tâm phát triển']],
      ['Điều gì khiến phần trình bày trở nên khó khăn?','What makes those presentations difficult for you?','Tôi thường đưa quá nhiều chi tiết trước khi nêu kết luận.','I often give too much detail before stating the conclusion.',['state a conclusion','nêu kết luận']],
      ['Một kết quả tốt sau bốn tuần sẽ trông thế nào?','What would a good result look like after four weeks?','Tôi có thể tóm tắt vấn đề và quyết định trong hai phút.','I could summarize the issue and decision within two minutes.',['measurable outcome','kết quả đo được']],
      ['Chúng ta sẽ dùng mục tiêu đó cho các buổi luyện.','We will use that outcome to guide our practice sessions.','Tôi sẽ chuẩn bị một cập nhật ngắn cho tuần tới.','I will prepare a short update for next week.',['practice session','buổi luyện tập']],
    ]],
    ['Observing a Practice Run','Quan sát buổi luyện','Nhân viên thử trình bày trước người hướng dẫn.','Nhận phản hồi cụ thể dựa trên quan sát.',[
      ['Tôi sẽ trình bày như trong cuộc họp thật.','I will present this as if it were the real meeting.','Được, tôi sẽ ghi lại điểm rõ và điểm khó theo dõi.','Good. I will note what is clear and what is difficult to follow.',['practice run','lần diễn tập']],
      ['Trước hết, dịch vụ thanh toán đã gặp lỗi vào thứ Ba.','First, the payment service experienced a failure on Tuesday.','Bạn có thể mở đầu bằng tác động đến khách hàng không?','Could you begin with the impact on customers?',['customer impact','tác động đến khách hàng']],
      ['Khoảng sáu phần trăm giao dịch đã bị chậm.','Approximately six percent of transactions were delayed.','Con số đó giúp người nghe hiểu mức độ ngay lập tức.','That figure helps the audience understand the scale immediately.',['understand the scale','hiểu quy mô']],
      ['Sau đó tôi sẽ giải thích nguyên nhân và cách sửa.','I will then explain the cause and the fix.','Hãy kết thúc bằng quyết định bạn cần từ nhóm.','Finish with the decision you need from the group.',['decision request','yêu cầu quyết định']],
    ]],
    ['Reviewing Progress','Xem lại tiến bộ','Hai người nhìn lại sau một tháng luyện tập.','Dùng bằng chứng để chọn bước phát triển tiếp theo.',[
      ['Bạn thấy cách cập nhật của mình đã thay đổi thế nào?','How do you think your updates have changed?','Tôi đưa kết luận lên đầu và dùng ít trang trình bày hơn.','I lead with the conclusion and use fewer slides.',['lead with','mở đầu bằng']],
      ['Bạn đã nhận phản hồi nào từ nhóm?','What feedback have you received from the team?','Họ nói các rủi ro và yêu cầu của tôi rõ hơn.','They said that my risks and requests were clearer.',['peer feedback','phản hồi đồng nghiệp']],
      ['Điểm nào vẫn cần luyện thêm?','Which area still needs more practice?','Tôi trả lời câu hỏi bất ngờ hơi dài dòng.','My answers to unexpected questions are still rather long.',['unexpected question','câu hỏi bất ngờ']],
      ['Tháng tới chúng ta sẽ luyện trả lời theo ba ý.','Next month we will practise answering in three points.','Mục tiêu đó tiếp nối tốt những gì tôi đã học.','That goal builds naturally on what I have learned.',['build on progress','phát triển từ tiến bộ']],
    ]],
  ]}),
  t({id:'planning-an-accessible-event',title:'Planning an Accessible Event',titleVi:'Lên kế hoạch sự kiện dễ tiếp cận',category:'Community',icon:'♿',level:'B1',description:'Xem xét lối vào, giao tiếp và hỗ trợ cho nhiều nhu cầu.',grammar:['inclusive-language','modals','passive-voice'],scenarios:[
    ['Reviewing the Venue','Kiểm tra địa điểm','Ban tổ chức khảo sát hội trường cộng đồng.','Xác định rào cản di chuyển và giải pháp.',[
      ['Lối vào chính có ba bậc thang và không có đường dốc.','The main entrance has three steps and no ramp.','Có một lối không bậc ở phía sau tòa nhà.','There is a step-free entrance at the rear of the building.',['step-free entrance','lối vào không bậc']],
      ['Lối đó có được mở trong suốt sự kiện không?','Will that entrance remain open throughout the event?','Có, nhưng chúng ta cần biển chỉ dẫn từ bãi xe.','Yes, but we need clear signs from the car park.',['directional sign','biển chỉ dẫn']],
      ['Nhà vệ sinh dễ tiếp cận ở tầng nào?','Which floor is the accessible toilet on?','Nó ở tầng trệt, bên cạnh phòng họp.','It is on the ground floor beside the meeting room.',['accessible toilet','nhà vệ sinh dễ tiếp cận']],
      ['Hãy kiểm tra lối đi không bị bàn ghế chặn.','Let us ensure that furniture does not block the route.','Tôi sẽ thêm việc đó vào danh sách kiểm tra địa điểm.','I will add that to the venue checklist.',['venue checklist','danh sách kiểm tra địa điểm']],
    ]],
    ['Making Information Clear','Làm thông tin rõ ràng','Đội chuẩn bị trang đăng ký và tài liệu.','Cho người tham dự chọn định dạng phù hợp.',[
      ['Biểu mẫu đăng ký có hỏi nhu cầu hỗ trợ không?','Does the registration form ask about access requirements?','Có, người tham dự có thể mô tả hỗ trợ họ cần.','Yes. Attendees can describe any support they require.',['access requirement','nhu cầu tiếp cận']],
      ['Tài liệu có thể cung cấp bằng chữ lớn không?','Can the materials be provided in large print?','Có, và chúng ta cũng sẽ có bản điện tử dễ đọc.','Yes, and we will also have an accessible digital version.',['large print','chữ in lớn']],
      ['Video mở đầu cần phụ đề.','The opening video needs captions.','Tôi sẽ yêu cầu nhà sản xuất gửi tệp có phụ đề.','I will ask the producer for a captioned file.',['captioned video','video có phụ đề']],
      ['Ngôn ngữ trên trang nên ngắn và trực tiếp.','The language on the page should be brief and direct.','Như vậy thông tin sẽ dễ hiểu cho nhiều người hơn.','That will make the information easier for more people to understand.',['plain language','ngôn ngữ rõ ràng']],
    ]],
    ['Organizing Support','Sắp xếp hỗ trợ','Ban tổ chức phân vai cho ngày diễn ra.','Cung cấp hỗ trợ mà vẫn tôn trọng quyền tự chủ.',[
      ['Ai sẽ đón người cần trợ giúp tại lối sau?','Who will welcome guests who use the rear entrance?','Hai tình nguyện viên sẽ trực ở đó theo ca.','Two volunteers will cover that entrance in shifts.',['volunteer shift','ca tình nguyện']],
      ['Họ có được hướng dẫn cách đề nghị hỗ trợ chưa?','Have they been briefed on how to offer assistance?','Chưa, chúng ta sẽ nhắc họ hỏi trước khi giúp.','Not yet. We will remind them to ask before helping.',['offer assistance','đề nghị hỗ trợ']],
      ['Có khu yên tĩnh cho người cần nghỉ không?','Is there a quiet area for anyone who needs a break?','Phòng nhỏ cạnh sảnh sẽ được dành cho mục đích đó.','The small room beside the lobby will be reserved for that purpose.',['quiet area','khu vực yên tĩnh']],
      ['Sau sự kiện mình nên xin phản hồi về khả năng tiếp cận.','We should request feedback on accessibility after the event.','Ý kiến thật sẽ giúp kế hoạch lần sau tốt hơn.','Direct feedback will improve our planning next time.',['accessibility feedback','phản hồi về khả năng tiếp cận']],
    ]],
  ]}),
  t({id:'mediating-a-team-disagreement',title:'Mediating a Team Disagreement',titleVi:'Hòa giải bất đồng trong nhóm',category:'Work',icon:'⚖️',level:'B2',description:'Tách lợi ích khỏi lập trường và xây thỏa thuận công bằng.',grammar:['mediation-language','reported-speech','hedging'],scenarios:[
    ['Establishing the Facts','Thống nhất dữ kiện','Hai nhóm tranh luận về nguyên nhân chậm tiến độ.','Tạo bức tranh chung trước khi quy trách nhiệm.',[
      ['Trước khi bàn giải pháp, tôi muốn xác nhận chuỗi sự kiện.','Before discussing solutions, I would like to establish the sequence of events.','Đội thiết kế bàn giao tệp cuối vào chiều thứ Năm.','The design team delivered the final files on Thursday afternoon.',['establish the facts','xác lập dữ kiện']],
      ['Đội phát triển nói họ chỉ thấy tệp vào sáng thứ Hai.','The development team says that it did not see the files until Monday morning.','Thông báo đã được gửi vào kênh cũ thay vì kênh dự án.','The notification was posted in an old channel rather than the project channel.',['communication channel','kênh giao tiếp']],
      ['Vậy có vẻ việc bàn giao xảy ra nhưng không được nhìn thấy.','It appears that the handover occurred but was not noticed.','Đúng, cả quy trình và việc theo dõi đều góp phần gây chậm.','Yes. Both the process and the follow-up contributed to the delay.',['contributing factor','yếu tố góp phần']],
      ['Mọi người có đồng ý với bản tóm tắt trung lập đó không?','Can everyone agree with that neutral summary?','Có, nó phản ánh sự việc mà không đổ lỗi cho một phía.','Yes. It reflects what happened without assigning blame to one side.',['neutral summary','bản tóm tắt trung lập']],
    ]],
    ['Surfacing Interests','Làm rõ lợi ích','Mỗi đội đang bảo vệ một quy tắc làm việc khác nhau.','Tìm nhu cầu thực sự phía sau lập trường.',[
      ['Đội thiết kế muốn giữ kênh riêng vì lý do gì?','What concern lies behind the design team’s preference for a separate channel?','Họ muốn tránh phản hồi chưa hoàn chỉnh bị hiểu là quyết định cuối.','They want to prevent unfinished feedback from being mistaken for a final decision.',['underlying concern','mối lo cốt lõi']],
      ['Đội phát triển cần điều gì từ một kênh chung?','What does the development team need from a shared channel?','Họ cần một nơi đáng tin để theo dõi mọi thay đổi đã duyệt.','They need one reliable place to track every approved change.',['reliable source','nguồn đáng tin cậy']],
      ['Hai nhu cầu đó không nhất thiết mâu thuẫn nhau.','Those needs are not necessarily in conflict.','Chúng ta có thể tách thảo luận nháp khỏi thông báo bàn giao.','We could separate draft discussion from formal handover notices.',['formal handover','bàn giao chính thức']],
      ['Giải pháp nên bảo vệ cả không gian sáng tạo và khả năng truy vết.','The solution should preserve both creative space and traceability.','Đó là cách mô tả cân bằng về mục tiêu chung.','That is a balanced description of the shared objective.',['traceability','khả năng truy vết']],
    ]],
    ['Creating a Working Agreement','Tạo thỏa thuận làm việc','Người hòa giải giúp hai đội chốt quy trình mới.','Gán hành vi, chủ sở hữu và thời điểm xem lại.',[
      ['Mỗi lần bàn giao sẽ có một bài đăng theo mẫu trong kênh dự án.','Every handover will have a templated post in the project channel.','Bài đăng phải nêu phiên bản tệp và người phê duyệt.','The post must identify the file version and the approver.',['working agreement','thỏa thuận làm việc']],
      ['Ai chịu trách nhiệm xác nhận đội phát triển đã nhận?','Who is responsible for confirming that development has received it?','Trưởng nhóm thiết kế sẽ yêu cầu phản hồi xác nhận trong ngày.','The design lead will request an acknowledgement that day.',['acknowledgement','xác nhận đã nhận']],
      ['Nếu không có phản hồi thì vấn đề được chuyển cấp thế nào?','How will the issue be escalated if there is no response?','Sau bốn giờ, chủ dự án sẽ được gắn thẻ để xử lý.','After four hours, the project owner will be tagged to intervene.',['escalation path','đường chuyển cấp']],
      ['Chúng ta xem lại quy trình sau hai lần bàn giao nhé.','Let us review the process after two handovers.','Như vậy thỏa thuận có thể được điều chỉnh dựa trên bằng chứng.','That allows the agreement to be refined in light of evidence.',['refine an agreement','điều chỉnh thỏa thuận']],
    ]],
  ]}),
  t({id:'evaluating-health-information',title:'Evaluating Health Information',titleVi:'Đánh giá thông tin sức khỏe',category:'Health',icon:'🔎',level:'B2',description:'Đánh giá nguồn, bằng chứng và mức độ chắc chắn của tuyên bố sức khỏe.',grammar:['modals-of-deduction','hedging','evidence-language'],scenarios:[
    ['Checking the Source','Kiểm tra nguồn','Một bài đăng đưa ra lời khuyên chữa bệnh mạnh mẽ.','Xác minh tác giả và mục đích xuất bản.',[
      ['Bài viết tuyên bố loại trà này có thể chữa chứng mất ngủ.','The article claims that this tea can cure insomnia.','Ai đã viết bài và chuyên môn của họ là gì?','Who wrote it, and what relevant expertise do they have?',['relevant expertise','chuyên môn liên quan']],
      ['Tên tác giả không xuất hiện, chỉ có tên cửa hàng.','No author is identified; only the shop’s name appears.','Điều đó cho thấy nội dung có thể chủ yếu nhằm quảng cáo sản phẩm.','That suggests the content may primarily be intended to market the product.',['commercial motive','động cơ thương mại']],
      ['Trang có trích dẫn một bác sĩ nhưng không dẫn nguồn.','The page quotes a doctor without linking to a source.','Chúng ta không thể kiểm tra câu nói có đầy đủ bối cảnh hay không.','We cannot verify whether the statement is presented in its full context.',['verify a quotation','xác minh trích dẫn']],
      ['Tôi sẽ tìm hướng dẫn từ cơ quan y tế độc lập.','I will look for guidance from an independent health authority.','Nguồn đó phù hợp hơn để bắt đầu kiểm tra tuyên bố.','That would be a more appropriate starting point for checking the claim.',['independent authority','cơ quan độc lập']],
    ]],
    ['Reading the Evidence','Đọc bằng chứng','Hai người tìm được nghiên cứu được bài đăng nhắc tới.','Phân biệt kết quả ban đầu với kết luận chắc chắn.',[
      ['Nghiên cứu chỉ có ba mươi người tham gia.','The study involved only thirty participants.','Cỡ mẫu nhỏ khiến kết quả khó khái quát rộng.','A small sample makes the findings difficult to generalize.',['sample size','cỡ mẫu']],
      ['Nghiên cứu có nhóm đối chứng không?','Did the study include a control group?','Không, mọi người đều biết họ đang uống loại trà nào.','No. Everyone knew which tea they were drinking.',['control group','nhóm đối chứng']],
      ['Mức cải thiện được người tham gia tự báo cáo.','The improvement was self-reported by the participants.','Điều đó có thể hữu ích nhưng dễ chịu ảnh hưởng kỳ vọng.','That may be informative, but it is vulnerable to expectation bias.',['self-reported outcome','kết quả tự báo cáo']],
      ['Vậy nghiên cứu gợi ý khả năng chứ chưa chứng minh cách chữa.','So the study suggests a possibility rather than proving a cure.','Đúng, ngôn ngữ của bài quảng cáo đã mạnh hơn bằng chứng.','Exactly. The advertising language overstates what the evidence supports.',['overstate evidence','phóng đại bằng chứng']],
    ]],
    ['Making a Safe Decision','Đưa ra quyết định an toàn','Một người cân nhắc thử sản phẩm khi đang dùng thuốc.','Kết hợp bằng chứng với lời khuyên chuyên môn.',[
      ['Dù bằng chứng yếu, uống trà này có thể vẫn vô hại không?','Even if the evidence is weak, might the tea still be harmless?','Không thể giả định vậy vì thảo dược có thể tương tác với thuốc.','We cannot assume that, because herbal products may interact with medication.',['drug interaction','tương tác thuốc']],
      ['Nhãn không ghi rõ lượng của từng thành phần.','The label does not state the amount of each ingredient.','Sự thiếu minh bạch đó làm việc đánh giá rủi ro khó hơn.','That lack of transparency makes the risk harder to assess.',['ingredient quantity','hàm lượng thành phần']],
      ['Tôi nên hỏi dược sĩ trước khi dùng chứ?','Should I ask a pharmacist before trying it?','Có, hãy mang theo cả sản phẩm và danh sách thuốc hiện tại.','Yes. Take both the product and your current medication list.',['medication list','danh sách thuốc']],
      ['Tôi cũng sẽ không thay thế phương pháp điều trị đã kê.','I will also avoid replacing my prescribed treatment.','Đó là cách thận trọng trong khi tìm hiểu thêm bằng chứng.','That is a prudent approach while you seek better evidence.',['prudent approach','cách tiếp cận thận trọng']],
    ]],
  ]}),
];
