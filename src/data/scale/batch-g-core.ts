import { scaleTopic as t } from './scale-builder';

export const batchGCoreTopics = [
  t({id:'reading-a-metro-map',title:'Reading a Metro Map',titleVi:'Đọc bản đồ metro',category:'Transportation',icon:'🚇',level:'A1',description:'Tìm tuyến, điểm đổi tàu và lối ra.',grammar:['where-questions','can','prepositions'],scenarios:[
    ['Finding the Line','Tìm tuyến','Khách xem sơ đồ metro.','Chọn tuyến đến đúng ga.',[
      ['Ga Central nằm trên tuyến màu nào?','Which colour line is Central station on?','Nó nằm trên tuyến màu tím.','It is on the purple line.',['metro line','tuyến metro']],
      ['Mình đang ở tuyến màu xanh lá.','I am on the green line now.','Bạn cần đổi tàu tại ga Museum.','You need to change at Museum station.',['change trains','đổi tàu']],
      ['Có bao nhiêu ga trước điểm đổi?','How many stops are there before the change?','Có bốn ga từ đây đến Museum.','There are four stops from here to Museum.',['four stops','bốn ga']],
    ]],
    ['Changing Trains','Đổi tàu','Hành khách xuống tại ga trung chuyển.','Theo biển đến đúng sân ga.',[
      ['Biển nào dẫn đến tuyến màu tím?','Which sign leads to the purple line?','Hãy theo mũi tên có chữ Platform 2.','Follow the arrow marked Platform 2.',['platform sign','biển sân ga']],
      ['Mình có cần ra khỏi cổng vé không?','Do I need to leave through the ticket gates?','Không, lối đổi tuyến ở bên trong ga.','No. The interchange is inside the station.',['interchange','điểm đổi tuyến']],
      ['Thang cuốn này đi xuống đúng không?','Does this escalator go down?','Đúng, sân ga nằm ở tầng dưới.','Yes. The platform is on the lower level.',['lower level','tầng dưới']],
    ]],
    ['Choosing an Exit','Chọn lối ra','Ga đến có sáu lối ra.','Ra gần thư viện nhất.',[
      ['Lối ra nào gần thư viện?','Which exit is closest to the library?','Lối C mở ra đường King.','Exit C leads to King Street.',['station exit','lối ra nhà ga']],
      ['Thư viện ở cùng phía đường không?','Is the library on the same side of the street?','Có, nó ở bên trái khi bạn ra khỏi ga.','Yes. It is on your left when you leave the station.',['same side','cùng phía']],
      ['Mình sẽ đi theo biển chữ C.','I will follow the signs for C.','Bạn sẽ thấy thư viện sau khoảng hai phút.','You will see the library after about two minutes.',['follow signs','đi theo biển']],
    ]],
  ]}),
  t({id:'visiting-a-play-centre',title:'Visiting a Play Centre',titleVi:'Đến khu vui chơi trẻ em',category:'Entertainment',icon:'🛝',level:'A1',description:'Đăng ký, cất đồ và chơi an toàn.',grammar:['can-cannot','imperatives','age'],scenarios:[
    ['Checking In','Đăng ký vào chơi','Phụ huynh đến quầy với hai trẻ.','Ghi tên và chọn khu đúng tuổi.',[
      ['Mình cần đăng ký cho hai bé.','I need to register two children.','Vui lòng ghi tên và tuổi của từng bé.','Please write each child’s name and age.',['registration form','phiếu đăng ký']],
      ['Bé nhỏ mới ba tuổi.','The younger child is only three.','Bé có thể chơi ở khu dành cho trẻ nhỏ.','She can play in the toddler area.',['toddler area','khu trẻ nhỏ']],
      ['Bé lớn có thể dùng cầu trượt cao không?','Can the older child use the tall slide?','Có, trẻ trên sáu tuổi được dùng khu đó.','Yes. Children over six may use that section.',['age limit','giới hạn tuổi']],
    ]],
    ['Storing Belongings','Cất đồ','Gia đình mang giày và áo khoác.','Dùng tủ khóa và đi tất chống trượt.',[
      ['Mình để giày ở đâu?','Where should we leave our shoes?','Đặt chúng trên giá cạnh lối vào.','Put them on the rack beside the entrance.',['shoe rack','giá giày']],
      ['Có tủ cho túi xách không?','Are there lockers for bags?','Có, tủ nhỏ dùng đồng xu này.','Yes. The small lockers use this coin.',['small locker','tủ nhỏ']],
      ['Trẻ có phải đi tất không?','Do the children have to wear socks?','Có, tất chống trượt là bắt buộc.','Yes. Grip socks are required.',['grip socks','tất chống trượt']],
    ]],
    ['Playing Safely','Chơi an toàn','Một bé trèo ngược lên cầu trượt.','Nhắc quy tắc và tìm nhân viên.',[
      ['Con hãy đi xuống cầu trượt bằng chân trước.','Go down the slide feet first, please.','Con muốn trèo lên cùng bạn.','I want to climb up with my friend.',['feet first','chân trước']],
      ['Mình không được trèo ngược vì có người đang trượt xuống.','We must not climb up because someone may be sliding down.','Vậy con sẽ dùng cầu thang bên cạnh.','Then I will use the stairs beside it.',['safety rule','quy tắc an toàn']],
      ['Nếu con bị đau, hãy báo nhân viên áo đỏ.','If you get hurt, tell a staff member in red.','Con thấy một cô ở cạnh khu bóng.','I can see one beside the ball pit.',['staff member','nhân viên']],
    ]],
  ]}),
  t({id:'buying-movie-snacks',title:'Buying Movie Snacks',titleVi:'Mua đồ ăn xem phim',category:'Food & Drink',icon:'🍿',level:'A1',description:'Chọn kích cỡ, đồ uống và mang đồ vào rạp.',grammar:['would-like','how-much','some-any'],scenarios:[
    ['Choosing Popcorn','Chọn bắp rang','Khách xem ba kích cỡ bắp rang.','Chọn phần đủ chia sẻ.',[
      ['Một phần bắp rang vừa có đủ cho hai người không?','Is a medium popcorn enough for two people?','Có, nếu mỗi người chỉ muốn một ít.','Yes, if each person wants only a small amount.',['medium popcorn','bắp rang cỡ vừa']],
      ['Vị nào không có đường?','Which flavour does not contain sugar?','Bắp rang muối không thêm đường.','The salted popcorn has no added sugar.',['salted popcorn','bắp rang muối']],
      ['Mình lấy một phần vừa vị muối.','I will have one medium salted popcorn.','Tôi sẽ chuẩn bị ngay cho bạn.','I will prepare that for you now.',['snack portion','phần đồ ăn']],
    ]],
    ['Adding Drinks','Thêm đồ uống','Khách chọn đồ uống cho trẻ và người lớn.','Hỏi đá và loại không caffeine.',[
      ['Nước cam có cho đá không?','Does the orange drink come with ice?','Có, nhưng bạn có thể yêu cầu không đá.','Yes, but you can ask for it without ice.',['without ice','không đá']],
      ['Có đồ uống nào không có caffeine?','Are there any drinks without caffeine?','Nước và nước trái cây đều không có caffeine.','Water and fruit juice are both caffeine-free.',['caffeine-free','không caffeine']],
      ['Cho mình hai chai nước nhỏ nhé.','Please give me two small bottles of water.','Tôi sẽ thêm chúng vào đơn của bạn.','I will add them to your order.',['bottled water','nước đóng chai']],
    ]],
    ['Carrying the Order','Mang đồ vào rạp','Khách có nhiều món và vé trên điện thoại.','Dùng khay và giữ lối đi sạch.',[
      ['Mình có thể lấy một chiếc khay không?','Could I have a tray?','Tất nhiên, khay ở bên phải quầy.','Certainly. The trays are on the right of the counter.',['snack tray','khay đồ ăn']],
      ['Phòng chiếu số bốn ở đâu?','Where is screen four?','Đi thẳng rồi rẽ trái sau quầy soát vé.','Go straight and turn left after the ticket check.',['cinema screen','phòng chiếu']],
      ['Mình sẽ giữ nắp đồ uống khi đi.','I will keep the drink lids on while walking.','Cách đó sẽ tránh làm đổ trên lối đi.','That will prevent spills in the aisle.',['prevent a spill','tránh làm đổ']],
    ]],
  ]}),
  t({id:'using-a-printer',title:'Using a Printer',titleVi:'Sử dụng máy in',category:'Technology',icon:'🖨️',level:'A1',description:'Chọn máy, cài số bản và xử lý hết giấy.',grammar:['imperatives','can','how-many'],scenarios:[
    ['Sending the Document','Gửi tài liệu in','Nhân viên in từ máy tính dùng chung.','Chọn đúng máy và trang.',[
      ['Mình nên chọn máy in nào?','Which printer should I select?','Chọn máy có tên Office-2.','Choose the printer named Office-2.',['printer name','tên máy in']],
      ['Mình chỉ cần in trang đầu.','I need to print only the first page.','Nhập số 1 vào ô phạm vi trang.','Enter 1 in the page-range box.',['page range','phạm vi trang']],
      ['Mình muốn hai bản giống nhau.','I would like two identical copies.','Đặt số bản sao thành hai trước khi bấm in.','Set the number of copies to two before printing.',['print copy','bản in']],
    ]],
    ['Choosing the Settings','Chọn cài đặt','Tài liệu có màu nhưng không cần in màu.','Tiết kiệm giấy và mực.',[
      ['Mình có thể in đen trắng không?','Can I print this in black and white?','Có, chọn mục màu xám trong cài đặt.','Yes. Select grayscale in the settings.',['grayscale','chế độ xám']],
      ['In hai mặt có đang bật không?','Is double-sided printing turned on?','Có, biểu tượng hai mặt đã được chọn.','Yes. The double-sided icon is selected.',['double-sided','hai mặt']],
      ['Bản xem trước chỉ có một tờ giấy.','The preview shows only one sheet of paper.','Đúng, hai trang sẽ in trên hai mặt.','Correct. The two pages will print on opposite sides.',['print preview','xem trước bản in']],
    ]],
    ['Adding Paper','Thêm giấy','Máy dừng vì khay trống.','Nạp giấy đúng cách.',[
      ['Đèn giấy đang nhấp nháy.','The paper light is flashing.','Khay dưới đã hết giấy.','The lower tray has run out of paper.',['paper tray','khay giấy']],
      ['Mình đặt giấy theo chiều nào?','Which way should I place the paper?','Đặt cạnh ngắn sát phía trước khay.','Place the short edge against the front of the tray.',['short edge','cạnh ngắn']],
      ['Mình đã đóng khay lại.','I have closed the tray again.','Máy sẽ tiếp tục công việc sau vài giây.','The printer will resume the job in a few seconds.',['resume printing','tiếp tục in']],
    ]],
  ]}),
  t({id:'taking-a-ferry',title:'Taking a Ferry',titleVi:'Đi phà',category:'Transportation',icon:'⛴️',level:'A1',description:'Mua vé, lên tàu và giữ an toàn trên boong.',grammar:['time-questions','can','imperatives'],scenarios:[
    ['Buying the Fare','Mua vé','Hành khách đi phà qua sông.','Hỏi giá và chuyến tiếp theo.',[
      ['Chuyến phà tiếp theo rời lúc mấy giờ?','What time does the next ferry leave?','Nó rời bến lúc mười một giờ hai mươi.','It leaves the pier at eleven twenty.',['ferry departure','giờ phà rời']],
      ['Một vé người lớn bao nhiêu?','How much is an adult ticket?','Vé một chiều có giá sáu mươi nghìn đồng.','A one-way ticket costs sixty thousand dong.',['one-way fare','giá một chiều']],
      ['Mình có thể thanh toán trên phà không?','Can I pay on the ferry?','Không, bạn phải mua vé trước khi lên.','No. You must buy the ticket before boarding.',['buy before boarding','mua trước khi lên']],
    ]],
    ['Boarding the Ferry','Lên phà','Cổng lên tàu vừa mở.','Xếp hàng và tìm ghế.',[
      ['Đây có phải hàng cho hành khách đi bộ không?','Is this the queue for foot passengers?','Đúng, xe máy dùng lối bên phải.','Yes. Motorbikes use the lane on the right.',['foot passenger','hành khách đi bộ']],
      ['Mình đưa vé cho ai?','Who should I show my ticket to?','Nhân viên áo xanh sẽ quét ở cổng.','The staff member in blue will scan it at the gate.',['boarding gate','cổng lên tàu']],
      ['Bên trong còn chỗ ngồi chứ?','Are there seats available inside?','Có, khoang trong nhà ở cuối cầu lên.','Yes. The indoor cabin is at the end of the ramp.',['indoor cabin','khoang trong nhà']],
    ]],
    ['Staying Safe on Deck','Giữ an toàn trên boong','Hành khách ra ngoài ngắm cảnh.','Tuân thủ lan can và thông báo.',[
      ['Mình có thể đứng gần lan can không?','Can I stand near the railing?','Có, nhưng hãy ở sau vạch vàng.','Yes, but stay behind the yellow line.',['safety railing','lan can an toàn']],
      ['Gió trên boong mạnh hơn mình nghĩ.','The wind on deck is stronger than I expected.','Hãy giữ mũ hoặc cất nó vào túi.','Hold your hat or put it in your bag.',['open deck','boong ngoài']],
      ['Thông báo nói chúng ta sắp cập bến.','The announcement says that we are approaching the pier.','Vậy mình quay lại ghế cho đến khi tàu dừng.','Then we will return to our seats until the ferry stops.',['approach the pier','sắp cập bến']],
    ]],
  ]}),
  t({id:'arranging-a-pet-sitter',title:'Arranging a Pet Sitter',titleVi:'Sắp xếp người trông thú cưng',category:'Home',icon:'🐕',level:'A2',description:'Thống nhất lịch, chăm sóc và liên hệ khi chủ đi xa.',grammar:['future-arrangements','have-to','conditionals'],scenarios:[
    ['Agreeing on Visits','Thống nhất lượt ghé','Chủ mèo đi xa ba ngày.','Chốt số lần và thời điểm chăm sóc.',[
      ['Bạn có thể ghé hai lần mỗi ngày không?','Can you visit twice a day?','Tôi có thể đến trước giờ làm và sau sáu giờ.','I can come before work and after six.',['pet-sitting visit','lượt trông thú']],
      ['Buổi sáng nên vào khoảng mấy giờ?','What time should the morning visit be?','Khoảng bảy rưỡi phù hợp với giờ ăn thường lệ.','Around seven thirty matches her usual feeding time.',['usual feeding time','giờ ăn thường lệ']],
      ['Tối Chủ nhật chúng tôi sẽ về trước lượt cuối.','We will return before the final visit on Sunday evening.','Hãy nhắn khi bạn về để tôi không đến không cần thiết.','Message me when you arrive so that I do not make an unnecessary trip.',['confirm a return','xác nhận trở về']],
    ]],
    ['Explaining the Care','Hướng dẫn chăm sóc','Chủ nhà chỉ thức ăn và thuốc.','Đưa hướng dẫn rõ, đo được.',[
      ['Mỗi bữa cho mèo nửa cốc thức ăn.','Give the cat half a cup of food at each meal.','Tôi sẽ dùng cốc đong trong hộp.','I will use the measuring cup inside the container.',['measured portion','khẩu phần đã đong']],
      ['Thuốc được trộn vào bữa tối phải không?','Is the medicine mixed into the evening meal?','Đúng, một viên nhỏ được nghiền vào thức ăn ướt.','Yes. One small tablet is crushed into the wet food.',['crushed tablet','viên thuốc nghiền']],
      ['Nếu mèo không ăn thì tôi làm gì?','What should I do if the cat refuses to eat?','Gọi cho tôi trước khi cho thêm thuốc hoặc thức ăn khác.','Call me before giving any extra medicine or different food.',['refuse food','từ chối ăn']],
    ]],
    ['Sharing Access Details','Chia sẻ cách vào nhà','Người trông cần chìa khóa và số khẩn cấp.','Cấp quyền an toàn và giới hạn.',[
      ['Tôi sẽ để chìa khóa trong hộp khóa cạnh cửa.','I will leave the key in the lockbox beside the door.','Bạn sẽ gửi mã qua tin nhắn riêng chứ?','Will you send the code in a private message?',['key lockbox','hộp khóa chìa']],
      ['Có, và mã sẽ được đổi sau chuyến đi.','Yes, and the code will be changed after the trip.','Tôi chỉ dùng chìa cho các lượt đã thống nhất.','I will use the key only for the agreed visits.',['temporary access','quyền vào tạm thời']],
      ['Số bác sĩ thú y có trên tủ lạnh.','The vet’s number is on the fridge.','Tôi cũng sẽ lưu số của người liên hệ dự phòng.','I will also save the backup contact’s number.',['backup contact','liên hệ dự phòng']],
    ]],
  ]}),
  t({id:'filing-expense-receipts',title:'Filing Expense Receipts',titleVi:'Nộp hóa đơn chi phí',category:'Work',icon:'🧮',level:'A2',description:'Phân loại chi phí, chụp chứng từ và gửi đúng hạn.',grammar:['past-simple','have-to','passive-voice'],scenarios:[
    ['Sorting the Receipts','Phân loại hóa đơn','Nhân viên trở về sau chuyến công tác.','Ghép từng chứng từ với mục chi.',[
      ['Hóa đơn khách sạn thuộc mục nào?','Which category should the hotel receipt go under?','Đặt nó trong mục chỗ ở công tác.','Put it under business accommodation.',['expense category','mục chi phí']],
      ['Bữa tối với khách hàng có cần ghi tên người dự không?','Does the client dinner need the attendees’ names?','Có, ghi tên và mục đích cuộc gặp.','Yes. Add their names and the purpose of the meeting.',['business purpose','mục đích công việc']],
      ['Vé tàu này bao gồm cả chuyến cá nhân.','This train ticket includes a personal journey.','Hãy chỉ yêu cầu phần liên quan đến công việc.','Claim only the part related to the business trip.',['eligible expense','chi phí hợp lệ']],
    ]],
    ['Uploading Evidence','Tải chứng từ','Nhân viên dùng ứng dụng chi phí.','Tạo ảnh đọc được và tránh nộp trùng.',[
      ['Ảnh hóa đơn này hơi tối.','This photograph of the receipt is rather dark.','Chụp lại trên bề mặt phẳng có đủ ánh sáng.','Take it again on a flat surface with enough light.',['legible receipt','hóa đơn đọc được']],
      ['Mã giao dịch có cần hiện đầy đủ không?','Does the transaction number need to be fully visible?','Có, cùng ngày, số tiền và tên nhà cung cấp.','Yes, together with the date, amount, and supplier name.',['transaction number','mã giao dịch']],
      ['Mình đã tải hóa đơn taxi từ email.','I have uploaded the taxi receipt from my email.','Đừng tải thêm ảnh giấy vì sẽ tạo bản trùng.','Do not add the paper image as well, because that would create a duplicate.',['duplicate claim','yêu cầu trùng']],
    ]],
    ['Meeting the Deadline','Đúng hạn nộp','Cuối kỳ báo cáo sắp đến.','Gửi hồ sơ và xử lý món thiếu.',[
      ['Hạn nộp chi phí tháng này là khi nào?','When is the deadline for this month’s expenses?','Tất cả yêu cầu phải được gửi trước trưa thứ Hai.','All claims must be submitted before noon on Monday.',['submission deadline','hạn nộp']],
      ['Một nhà hàng chưa gửi lại hóa đơn chi tiết.','One restaurant has not yet sent the itemized receipt.','Hãy nộp các mục khác và đánh dấu mục đó đang chờ.','Submit the other items and mark that one as pending.',['itemized receipt','hóa đơn chi tiết']],
      ['Mình có cần báo quản lý không?','Do I need to tell my manager?','Có, gửi một ghi chú ngắn kèm ngày bạn dự kiến bổ sung.','Yes. Send a short note with the date you expect to add it.',['pending evidence','chứng từ đang chờ']],
    ]],
  ]}),
  t({id:'choosing-a-laptop-accessory',title:'Choosing a Laptop Accessory',titleVi:'Chọn phụ kiện laptop',category:'Technology',icon:'⌨️',level:'A2',description:'Kiểm tra tương thích, công thái học và điều kiện đổi.',grammar:['comparatives','too-enough','conditionals'],scenarios:[
    ['Checking Compatibility','Kiểm tra tương thích','Khách chọn bộ chuyển đổi màn hình.','Khớp cổng và độ phân giải.',[
      ['Laptop này dùng loại cổng nào cho màn hình?','Which port does this laptop use for a monitor?','Nó có cổng USB-C hỗ trợ xuất hình.','It has a USB-C port that supports video output.',['video output','xuất hình']],
      ['Bộ chuyển đổi này có chạy màn hình 4K không?','Can this adapter drive a 4K display?','Có, nhưng chỉ ở tốc độ làm mới sáu mươi hertz.','Yes, but only at a sixty-hertz refresh rate.',['refresh rate','tần số làm mới']],
      ['Mình cũng cần cổng sạc cùng lúc.','I also need a charging port at the same time.','Mẫu này có cấp nguồn xuyên qua đến một trăm watt.','This model provides pass-through power up to one hundred watts.',['pass-through charging','sạc xuyên qua']],
    ]],
    ['Improving Comfort','Tăng sự thoải mái','Khách làm việc nhiều giờ với laptop.','Chọn giá đỡ và bàn phím phù hợp.',[
      ['Giá đỡ này nâng màn hình đủ cao không?','Does this stand raise the screen high enough?','Nó có sáu mức để đưa mép trên gần ngang mắt.','It has six positions to bring the top edge close to eye level.',['laptop stand','giá đỡ laptop']],
      ['Nếu nâng laptop, mình sẽ cần bàn phím rời.','If I raise the laptop, I will need an external keyboard.','Bàn phím nhỏ này giữ vai bạn ở tư thế thoải mái hơn.','This compact keyboard keeps your shoulders in a more relaxed position.',['external keyboard','bàn phím rời']],
      ['Chuột này có quá nhỏ cho tay mình không?','Is this mouse too small for my hand?','Hãy thử cầm nó mà không siết các ngón tay.','Try holding it without tightening your fingers.',['relaxed grip','cách cầm thoải mái']],
    ]],
    ['Understanding Returns','Hiểu điều kiện đổi trả','Khách muốn thử phụ kiện tại nhà.','Biết thời hạn và tình trạng cần giữ.',[
      ['Tôi có thể trả nếu bộ chuyển đổi không hoạt động không?','Can I return the adapter if it does not work?','Có, bạn có ba mươi ngày với hóa đơn.','Yes. You have thirty days with the receipt.',['return window','thời hạn trả']],
      ['Tôi có được mở bao bì để thử không?','May I open the packaging to test it?','Có, nhưng giữ mọi phụ kiện và hộp không bị hỏng.','Yes, but keep every accessory and the box undamaged.',['original packaging','bao bì gốc']],
      ['Nếu sản phẩm bị lỗi thì phí giao lại thế nào?','What happens to return postage if the product is faulty?','Cửa hàng sẽ cung cấp nhãn gửi trả miễn phí.','The shop will provide a prepaid return label.',['prepaid label','nhãn trả hàng trả trước']],
    ]],
  ]}),
  t({id:'planning-a-beach-day',title:'Planning a Beach Day',titleVi:'Lên kế hoạch đi biển',category:'Travel',icon:'🏖️',level:'A2',description:'Chọn giờ, bảo vệ da và theo dõi điều kiện biển.',grammar:['future-forms','should','conditionals'],scenarios:[
    ['Choosing the Time','Chọn thời gian','Gia đình tránh nắng mạnh và đông người.','Đến và rời bãi biển vào giờ hợp lý.',[
      ['Ngày mai thủy triều thấp lúc mấy giờ?','What time is low tide tomorrow?','Nó sẽ thấp nhất vào khoảng tám giờ sáng.','It will be at its lowest at around eight in the morning.',['low tide','thủy triều thấp']],
      ['Mình nên đến sớm trước khi bãi đông.','We should arrive early before the beach becomes crowded.','Nếu đi lúc bảy giờ, mình cũng tránh được nắng trưa.','If we leave at seven, we will also avoid the midday sun.',['midday sun','nắng trưa']],
      ['Mình sẽ về trước hai giờ chiều.','We will head home before two in the afternoon.','Lịch đó cho trẻ đủ thời gian chơi mà không quá mệt.','That gives the children enough time to play without becoming overtired.',['head home','về nhà']],
    ]],
    ['Packing Sun Protection','Chuẩn bị chống nắng','Gia đình kiểm tra túi trước khi đi.','Mang bóng râm, quần áo và kem chống nắng.',[
      ['Kem chống nắng này có chỉ số đủ cao không?','Is the protection factor on this sunscreen high enough?','SPF 50 phù hợp cho một ngày dài ngoài trời.','SPF 50 is suitable for a long day outdoors.',['sun protection factor','chỉ số chống nắng']],
      ['Mình cần bôi lại sau bao lâu?','How often do we need to apply it again?','Bôi lại sau khi bơi và ít nhất mỗi hai giờ.','Reapply it after swimming and at least every two hours.',['reapply sunscreen','bôi lại kem chống nắng']],
      ['Mình cũng mang lều che nắng và mũ rộng vành.','I am also packing a sun shelter and wide-brimmed hats.','Như vậy có thêm bóng râm khi mặt trời mạnh hơn.','That provides extra shade as the sun becomes stronger.',['wide-brimmed hat','mũ rộng vành']],
    ]],
    ['Checking Sea Conditions','Kiểm tra điều kiện biển','Bãi có cờ cảnh báo khi gia đình đến.','Đọc cờ và ở khu có cứu hộ.',[
      ['Cờ vàng trên bãi biển có nghĩa gì?','What does the yellow flag on the beach mean?','Điều kiện có nguy cơ, nên chỉ bơi ở khu có cứu hộ.','Conditions present a risk, so swim only in the lifeguarded area.',['warning flag','cờ cảnh báo']],
      ['Trẻ có thể dùng phao bơm hơi không?','Can the children use inflatable rings?','Không nên khi gió thổi ra xa bờ.','They should not when the wind is blowing offshore.',['offshore wind','gió thổi ra khơi']],
      ['Nếu cờ chuyển đỏ, mình sẽ ra khỏi nước ngay.','If the flag turns red, we will leave the water immediately.','Đúng, cờ đỏ nghĩa là không được xuống biển.','Correct. A red flag means that nobody should enter the sea.',['lifeguarded zone','khu có cứu hộ']],
    ]],
  ]}),
  t({id:'joining-a-cooking-workshop',title:'Joining a Cooking Workshop',titleVi:'Tham gia lớp nấu ăn',category:'Food & Drink',icon:'👩‍🍳',level:'A2',description:'Chuẩn bị nguyên liệu, làm theo kỹ thuật và chia món.',grammar:['imperatives','present-perfect','sequencing'],scenarios:[
    ['Preparing the Station','Chuẩn bị bàn bếp','Học viên vào lớp làm mì tươi.','Rửa tay và sắp nguyên liệu.',[
      ['Mình nên bắt đầu từ việc nào?','What should I begin with?','Rửa tay rồi buộc gọn tóc trước.','Wash your hands and tie back your hair first.',['tie back hair','buộc gọn tóc']],
      ['Bột và trứng đã được cân chưa?','Have the flour and eggs been measured?','Có, mỗi khay chứa phần cho hai người.','Yes. Each tray contains enough for two people.',['measured ingredient','nguyên liệu đã cân']],
      ['Dao này dùng cho rau thơm phải không?','Is this knife for the herbs?','Đúng, đặt nó trên thớt xanh để tránh nhầm.','Yes. Keep it on the green board to avoid confusion.',['workstation','bàn bếp']],
    ]],
    ['Making the Dough','Làm bột','Giảng viên hướng dẫn nhào bột.','Nhận biết độ ẩm và kết cấu đúng.',[
      ['Bột của mình đang dính vào tay.','My dough is sticking to my hands.','Rắc một lượng bột rất nhỏ lên mặt bàn.','Dust the surface with a very small amount of flour.',['sticky dough','bột dính']],
      ['Mình nên nhào trong bao lâu?','How long should I knead it?','Nhào khoảng tám phút đến khi bột mịn.','Knead it for about eight minutes until it is smooth.',['knead dough','nhào bột']],
      ['Bột bật lại khi mình ấn vào.','The dough springs back when I press it.','Tốt, hãy bọc và để nó nghỉ hai mươi phút.','Good. Cover it and let it rest for twenty minutes.',['let dough rest','để bột nghỉ']],
    ]],
    ['Sharing the Food','Chia món ăn','Mì đã nấu xong cuối buổi.','Nếm, chia phần và mang về an toàn.',[
      ['Nước sốt có cần thêm muối không?','Does the sauce need any more salt?','Hãy nếm trước vì phô mai đã khá mặn.','Taste it first because the cheese is already quite salty.',['taste before seasoning','nếm trước khi nêm']],
      ['Mỗi nhóm có thể ăn một phần ở đây.','Each group can eat one portion here.','Phần còn lại cho vào hộp mang về.','Put the remaining portion in a takeaway container.',['remaining portion','phần còn lại']],
      ['Mì phải được giữ lạnh trong bao lâu?','How long can the pasta remain unrefrigerated?','Hãy cho vào tủ lạnh trong vòng hai giờ.','Refrigerate it within two hours.',['refrigerate promptly','làm lạnh sớm']],
    ]],
  ]}),
  t({id:'handling-a-minor-sports-injury',title:'Handling a Minor Sports Injury',titleVi:'Xử lý chấn thương thể thao nhẹ',category:'Fitness',icon:'🧊',level:'A2',description:'Dừng vận động, đánh giá dấu hiệu và trở lại từ từ.',grammar:['should-must','present-perfect','conditionals'],scenarios:[
    ['Stopping the Activity','Dừng hoạt động','Người chơi bị đau cổ chân khi chạy.','Ngừng tải trọng và mô tả cơ chế.',[
      ['Mình vừa xoay cổ chân khi đổi hướng.','I have just twisted my ankle while changing direction.','Hãy dừng chạy và ngồi xuống ngay.','Stop running and sit down immediately.',['twist an ankle','xoay cổ chân']],
      ['Mình vẫn có thể đứng lên được.','I can still stand on it.','Đừng thử tiếp tục trận đấu chỉ vì bạn có thể đứng.','Do not try to continue the game merely because you can stand.',['stop activity','dừng hoạt động']],
      ['Cơn đau ở phía ngoài cổ chân.','The pain is on the outside of the ankle.','Tôi sẽ ghi lại vị trí và cách chấn thương xảy ra.','I will note the location and how the injury occurred.',['injury mechanism','cơ chế chấn thương']],
    ]],
    ['Checking Warning Signs','Kiểm tra dấu hiệu cảnh báo','Huấn luyện viên xem chấn thương có cần cấp cứu.','Nhận biết biến dạng, tê và đau nặng.',[
      ['Cổ chân có trông biến dạng không?','Does the ankle look deformed?','Không, nhưng nó bắt đầu sưng nhẹ.','No, but it is beginning to swell slightly.',['visible swelling','sưng nhìn thấy']],
      ['Bạn có cảm thấy tê ở bàn chân không?','Can you feel any numbness in your foot?','Không, mình vẫn cảm nhận và cử động được các ngón.','No. I can still feel and move my toes.',['numbness','tê']],
      ['Nếu đau tăng nhanh, mình sẽ tìm trợ giúp y tế.','If the pain increases rapidly, we will seek medical help.','Mình sẽ báo ngay nếu cảm giác thay đổi.','I will say immediately if the sensation changes.',['warning sign','dấu hiệu cảnh báo']],
    ]],
    ['Returning Gradually','Trở lại từ từ','Vài ngày sau, sưng đã giảm.','Kiểm tra vận động trước khi chơi lại.',[
      ['Cổ chân đã bớt sưng nhưng vẫn cứng buổi sáng.','The ankle is less swollen, but it still feels stiff in the morning.','Vậy chưa nên trở lại trận đấu đầy đủ.','Then you should not return to a full match yet.',['morning stiffness','cứng buổi sáng']],
      ['Mình có thể bắt đầu bằng đi bộ nhẹ không?','Can I begin with gentle walking?','Có, nếu không đau tăng trong hoặc sau hoạt động.','Yes, provided that the pain does not increase during or after it.',['gradual return','trở lại từ từ']],
      ['Nếu chạy và đổi hướng không đau, mình sẽ tăng dần.','If running and changing direction are pain-free, I will build up gradually.','Hãy dừng lại nếu sưng hoặc đau quay lại.','Stop if swelling or pain returns.',['pain-free movement','vận động không đau']],
    ]],
  ]}),
  t({id:'facilitating-a-retrospective',title:'Facilitating a Retrospective',titleVi:'Điều phối buổi nhìn lại',category:'Work',icon:'🔁',level:'B1',description:'Tạo an toàn, tìm mẫu hệ thống và chốt thử nghiệm cải thiện.',grammar:['facilitation-language','past-simple','conditionals'],scenarios:[
    ['Creating a Safe Start','Tạo khởi đầu an toàn','Đội nhìn lại một đợt phát hành khó khăn.','Đặt nguyên tắc tập trung vào học hỏi.',[
      ['Mục đích hôm nay là học từ quy trình, không tìm người để trách.','Today’s purpose is to learn from the process, not to identify someone to blame.','Vậy mình có thể nói về sai sót mà không gắn nó với năng lực cá nhân.','Then we can discuss mistakes without treating them as personal failings.',['blameless review','buổi nhìn lại không đổ lỗi']],
      ['Mọi người hãy mô tả điều đã quan sát trước khi diễn giải.','Describe what you observed before offering an interpretation.','Điều đó sẽ giúp tách dữ kiện khỏi giả định.','That will help us separate facts from assumptions.',['working agreement','thỏa thuận làm việc']],
      ['Nếu chủ đề liên quan người vắng mặt thì sao?','What if a topic involves someone who is not present?','Hãy nói về tác động và mời họ bổ sung bối cảnh sau.','Discuss the impact and invite them to add context later.',['psychological safety','an toàn tâm lý']],
    ]],
    ['Finding the Pattern','Tìm mẫu hệ thống','Nhiều lỗi nhỏ xuất hiện gần hạn phát hành.','Tìm điều kiện chung thay vì danh sách sự cố.',[
      ['Ba lỗi đều được phát hiện trong ngày cuối.','All three defects were found on the final day.','Điểm chung nào khiến kiểm thử diễn ra muộn?','What common condition caused testing to happen so late?',['recurring pattern','mẫu lặp']],
      ['Môi trường kiểm thử không sẵn sàng cho đến sau khi mã hoàn tất.','The test environment was unavailable until after development had finished.','Vậy sự phụ thuộc môi trường có thể là nguyên nhân hệ thống.','Then the environment dependency may be a systemic cause.',['systemic cause','nguyên nhân hệ thống']],
      ['Mình cũng gộp quá nhiều thay đổi vào một lần triển khai.','We also combined too many changes in one deployment.','Hai yếu tố đó cùng làm thời gian phản hồi bị thu hẹp.','Those factors jointly compressed the feedback window.',['feedback window','khoảng phản hồi']],
    ]],
    ['Choosing an Experiment','Chọn thử nghiệm cải thiện','Đội có nhiều ý tưởng nhưng ít khả năng thực hiện.','Chọn một thay đổi nhỏ với dấu hiệu thành công.',[
      ['Giải pháp nào nằm trong quyền kiểm soát trực tiếp của đội?','Which improvement is within the team’s direct control?','Mình có thể giới hạn mỗi đợt triển khai ở hai thay đổi.','We can limit each deployment to two changes.',['improvement experiment','thử nghiệm cải thiện']],
      ['Làm sao biết giới hạn đó có hữu ích?','How will we know whether that limit helps?','Theo dõi thời gian từ triển khai đến phản hồi kiểm thử.','Track the time from deployment to test feedback.',['leading indicator','chỉ báo sớm']],
      ['Hãy thử trong ba lần triển khai rồi xem lại.','Let us test it across three deployments and then review it.','Tôi sẽ ghi chủ sở hữu và ngày xem kết quả.','I will record an owner and a date for reviewing the outcome.',['action owner','người chịu trách nhiệm']],
    ]],
  ]}),
  t({id:'planning-an-evacuation-drill',title:'Planning an Evacuation Drill',titleVi:'Lên kế hoạch diễn tập sơ tán',category:'Community',icon:'🚨',level:'B1',description:'Thiết kế kịch bản, hỗ trợ người cần giúp và học từ quan sát.',grammar:['passive-voice','conditionals','safety-language'],scenarios:[
    ['Defining the Scenario','Xác định kịch bản','Ban an toàn chuẩn bị diễn tập cho tòa nhà.','Chọn mục tiêu và tránh gây hoảng sợ.',[
      ['Diễn tập này đang kiểm tra tốc độ hay chất lượng quy trình?','Is this drill testing speed or the quality of the process?','Ưu tiên là mọi người dùng đúng lối ra và điểm tập trung.','The priority is for everyone to use the correct exits and assembly point.',['drill objective','mục tiêu diễn tập']],
      ['Mình có nên chặn một cầu thang để mô phỏng khói không?','Should we block one staircase to simulate smoke?','Chỉ khi tuyến thay thế đã được kiểm tra và có người giám sát.','Only if the alternative route has been checked and supervised.',['simulated hazard','nguy cơ mô phỏng']],
      ['Thông báo trước nên tiết lộ bao nhiêu?','How much should the advance notice reveal?','Mọi người cần biết tuần diễn tập, nhưng không nhất thiết biết giờ chính xác.','People should know the drill week, but not necessarily the exact time.',['advance notice','thông báo trước']],
    ]],
    ['Supporting Everyone','Hỗ trợ mọi người','Kế hoạch cần bao gồm người có nhu cầu di chuyển và cảm giác.','Gán hỗ trợ được đồng ý trước.',[
      ['Danh sách hỗ trợ có được cập nhật từ từng người không?','Has the assistance plan been updated with each person?','Có, nhưng hai nhân viên mới chưa được hỏi.','Yes, although two new employees have not yet been consulted.',['personal evacuation plan','kế hoạch sơ tán cá nhân']],
      ['Không nên giả định đồng nghiệp xe lăn muốn được bế.','We should not assume that a wheelchair user wishes to be carried.','Đúng, phương án phải được thống nhất với chính người cần hỗ trợ.','Correct. The arrangement must be agreed with the person concerned.',['agreed assistance','hỗ trợ được đồng ý']],
      ['Khu chờ an toàn có hệ thống liên lạc không?','Does the refuge area have a communication system?','Có, nhưng mình cần kiểm tra nút gọi hoạt động.','Yes, but we need to test that the call button works.',['refuge area','khu chờ an toàn']],
    ]],
    ['Reviewing the Drill','Xem lại diễn tập','Quan sát viên thu thập thời gian và hành vi.','Ưu tiên sửa điểm nghẽn có rủi ro cao.',[
      ['Tòa nhà trống sau sáu phút nhưng một cửa thoát bị nghẽn.','The building was clear in six minutes, but one exit became congested.','Bao nhiêu người đã quay lại để lấy đồ?','How many people went back to collect belongings?',['exit congestion','tắc lối thoát']],
      ['Ba người quay lại vì không nghe rõ thông báo bỏ đồ lại.','Three people returned because they did not hear the instruction to leave belongings.','Vậy âm thanh và nội dung thông báo đều cần kiểm tra.','Then both the audio system and the message wording need review.',['observer note','ghi chú quan sát']],
      ['Mình sẽ sửa hai điểm đó trước khi diễn tập lại.','We will correct those two issues before repeating the drill.','Hãy chia sẻ bài học mà không công khai tên cá nhân.','Share the learning without publishing individuals’ names.',['corrective action','hành động khắc phục']],
    ]],
  ]}),
  t({id:'contesting-a-bank-charge',title:'Contesting a Bank Charge',titleVi:'Khiếu nại giao dịch ngân hàng',category:'Services',icon:'💳',level:'B1',description:'Phân biệt giao dịch lạ, bảo vệ thẻ và theo dõi điều tra.',grammar:['past-simple','present-perfect','formal-questions'],scenarios:[
    ['Identifying the Transaction','Xác định giao dịch','Khách thấy một khoản mua không nhận ra.','Kiểm tra tên nhà bán và thời gian.',[
      ['Tôi không nhận ra khoản phí 1,2 triệu này.','I do not recognize this charge for 1.2 million dong.','Tên trên bảng kê là tên pháp lý của nhà bán, có thể khác thương hiệu.','The statement shows the merchant’s legal name, which may differ from its brand.',['unrecognized charge','giao dịch không nhận ra']],
      ['Giao dịch được thực hiện lúc hai giờ sáng.','The transaction was made at two o’clock in the morning.','Bạn hoặc người dùng thẻ phụ có đặt hàng quốc tế không?','Did you or an additional cardholder place an international order?',['additional cardholder','người dùng thẻ phụ']],
      ['Không, thẻ đã ở trong ví của tôi cả đêm.','No. The card remained in my wallet all night.','Vậy chúng ta sẽ xử lý nó như giao dịch có thể trái phép.','Then we will treat it as potentially unauthorized.',['unauthorized transaction','giao dịch trái phép']],
    ]],
    ['Securing the Card','Bảo vệ thẻ','Ngân hàng cần ngăn giao dịch tiếp.','Khóa thẻ mà vẫn duy trì thanh toán thiết yếu.',[
      ['Thẻ có cần bị hủy ngay không?','Does the card need to be cancelled immediately?','Có, vì thông tin thẻ có thể đã bị lộ.','Yes, because the card details may have been compromised.',['cancel a card','hủy thẻ']],
      ['Các khoản thanh toán định kỳ sẽ ra sao?','What will happen to my recurring payments?','Một số nhà bán sẽ tự cập nhật, nhưng bạn nên kiểm tra từng dịch vụ.','Some merchants may update automatically, but you should review each service.',['recurring payment','thanh toán định kỳ']],
      ['Tôi vẫn cần rút tiền trước khi thẻ mới đến.','I still need access to cash before the replacement arrives.','Bạn có thể rút bằng mã trong ứng dụng tại máy hỗ trợ.','You can withdraw using an in-app code at supported machines.',['cardless withdrawal','rút tiền không thẻ']],
    ]],
    ['Following the Investigation','Theo dõi điều tra','Ngân hàng mở hồ sơ tranh chấp.','Hiểu tín dụng tạm thời và bằng chứng.',[
      ['Khi nào khoản tiền sẽ được hoàn lại?','When will the money be returned?','Chúng tôi sẽ cấp khoản tín dụng tạm thời trong hai ngày làm việc.','We will issue a temporary credit within two business days.',['temporary credit','tín dụng tạm thời']],
      ['Khoản đó có thể bị thu hồi không?','Could that credit later be reversed?','Có, nếu điều tra chứng minh giao dịch đã được bạn cho phép.','Yes, if the investigation establishes that you authorized the transaction.',['reverse a credit','thu hồi tín dụng']],
      ['Tôi sẽ nhận quyết định và bằng chứng bằng cách nào?','How will I receive the decision and supporting evidence?','Một thư bảo mật sẽ xuất hiện trong ứng dụng khi hồ sơ hoàn tất.','A secure letter will appear in the app when the case is complete.',['dispute outcome','kết quả tranh chấp']],
    ]],
  ]}),
  t({id:'coordinating-wedding-guests',title:'Coordinating Wedding Guests',titleVi:'Điều phối khách dự đám cưới',category:'Friends & Social Life',icon:'💒',level:'B1',description:'Quản lý phản hồi, chỗ ngồi và nhu cầu đi lại của khách.',grammar:['future-arrangements','reported-speech','polite-requests'],scenarios:[
    ['Tracking Responses','Theo dõi phản hồi','Cặp đôi kiểm tra khách chưa xác nhận.','Xin phản hồi mà không tạo áp lực.',[
      ['Còn mười hai người chưa trả lời lời mời.','Twelve guests have not yet responded to the invitation.','Hạn xác nhận là thứ Sáu tới, nên mình có thể nhắc nhẹ hôm nay.','The response deadline is next Friday, so we can send a gentle reminder today.',['RSVP deadline','hạn xác nhận']],
      ['Mình không muốn tin nhắn nghe như đòi câu trả lời ngay.','I do not want the message to sound as though we demand an immediate answer.','Hãy nói chúng ta cần con số để chốt với địa điểm.','Explain that we need the numbers to confirm arrangements with the venue.',['gentle reminder','lời nhắc nhẹ']],
      ['Một số khách có thể đang chờ sắp xếp việc chăm trẻ.','Some guests may be waiting to arrange childcare.','Mình có thể mời họ báo nếu cần thêm vài ngày.','We can invite them to tell us if they need a few extra days.',['guest response','phản hồi khách']],
    ]],
    ['Planning the Seating','Xếp chỗ ngồi','Gia đình có một vài mối quan hệ nhạy cảm.','Tạo bàn thoải mái mà không công khai xung đột.',[
      ['Hai người họ hàng này không nên ngồi cùng bàn.','These two relatives should not be seated at the same table.','Mình có thể đặt họ với những nhóm họ đều quen.','We can place them with different groups they each know.',['seating plan','sơ đồ chỗ ngồi']],
      ['Bà cần ghế gần lối đi vì đi lại khó.','Grandmother needs a seat near an aisle because walking is difficult.','Hãy dành ghế đầu bàn gần cửa nhất.','Reserve the end seat closest to the door.',['aisle seat','ghế gần lối đi']],
      ['Khách có trẻ nhỏ nên ở gần nhau không?','Should guests with young children sit near one another?','Có, khu đó gần phòng yên tĩnh và nhà vệ sinh.','Yes. That area is close to the quiet room and toilets.',['accessible seating','chỗ ngồi thuận tiện']],
    ]],
    ['Arranging Transport','Sắp xếp di chuyển','Địa điểm xa ga và một số khách không lái xe.','Gom nhu cầu và thuê xe phù hợp.',[
      ['Có bao nhiêu khách cần xe từ ga?','How many guests need transport from the station?','Hiện có hai mươi ba người trên bảng đăng ký.','There are currently twenty-three people on the transport list.',['guest transport','di chuyển cho khách']],
      ['Xe nhỏ chỉ có hai mươi chỗ.','The smaller coach has only twenty seats.','Mình nên thuê xe ba mươi chỗ để có khoảng đệm.','We should book the thirty-seat coach to provide some spare capacity.',['spare capacity','sức chứa dự phòng']],
      ['Giờ đón phải tính cả chuyến tàu có thể chậm.','The pickup time must allow for a possible train delay.','Hãy đặt giờ khởi hành sau chuyến cuối dự kiến hai mươi phút.','Schedule departure twenty minutes after the final expected train.',['pickup schedule','lịch đón']],
    ]],
  ]}),
  t({id:'discussing-workplace-accessibility',title:'Discussing Workplace Accessibility',titleVi:'Trao đổi khả năng tiếp cận nơi làm việc',category:'Work',icon:'🧑‍🦽',level:'B1',description:'Hỏi nhu cầu, điều chỉnh công việc và bảo vệ quyền riêng tư.',grammar:['inclusive-language','modals','formal-requests'],scenarios:[
    ['Inviting a Request','Mời nêu nhu cầu','Nhân viên mới cần một số điều chỉnh.','Tạo cách yêu cầu riêng tư và không phán xét.',[
      ['Tôi muốn trao đổi về một điều chỉnh giúp mình làm việc hiệu quả.','I would like to discuss an adjustment that would help me work effectively.','Bạn có thể chia sẻ điều bạn cần mà không phải nêu chẩn đoán.','You can describe what you need without disclosing a diagnosis.',['reasonable adjustment','điều chỉnh hợp lý']],
      ['Tôi cần phần mềm đọc màn hình và tài liệu đúng định dạng.','I need screen-reading software and documents in compatible formats.','Cảm ơn, chúng ta có thể tập trung vào công cụ và kết quả công việc.','Thank you. We can focus on the tools and work outcomes.',['functional need','nhu cầu chức năng']],
      ['Ai sẽ được biết thông tin này?','Who will have access to this information?','Chỉ nhân sự cần triển khai hỗ trợ mới nhận chi tiết liên quan.','Only staff implementing the support will receive relevant details.',['need-to-know basis','theo nhu cầu biết']],
    ]],
    ['Testing the Adjustment','Thử điều chỉnh','Phần mềm đã cài nhưng một hệ thống nội bộ không dùng được.','Kiểm tra trong công việc thực và sửa rào cản.',[
      ['Trình đọc hoạt động với email nhưng không đọc biểu mẫu chi phí.','The reader works with email but cannot interpret the expense form.','Vậy giải pháp chưa cho phép bạn hoàn thành toàn bộ vai trò.','Then the adjustment does not yet enable you to perform the full role.',['access barrier','rào cản tiếp cận']],
      ['Tạm thời đồng nghiệp có thể nhập biểu mẫu giúp mình.','A colleague can temporarily enter the form for me.','Đó chỉ nên là giải pháp ngắn hạn, không phải phụ thuộc lâu dài.','That should be a short-term workaround rather than a permanent dependency.',['temporary workaround','giải pháp tạm']],
      ['Đội hệ thống sẽ kiểm tra phiên bản biểu mẫu có thể truy cập.','The systems team will test an accessible version of the form.','Hãy cho mình tham gia kiểm thử vì công cụ tự động có thể bỏ sót.','Include me in the testing, because automated tools may miss practical barriers.',['user testing','kiểm thử người dùng']],
    ]],
    ['Reviewing Without Intrusion','Xem lại không xâm phạm','Quản lý kiểm tra điều chỉnh sau một tháng.','Đánh giá hiệu quả, không đánh giá tình trạng cá nhân.',[
      ['Công cụ mới có giúp bạn hoàn thành nhiệm vụ độc lập hơn không?','Has the new tool enabled you to complete tasks more independently?','Có, ngoại trừ báo cáo cũ vẫn ở định dạng ảnh.','Yes, except that older reports remain in image-only formats.',['adjustment review','xem lại điều chỉnh']],
      ['Bạn có muốn nói về thay đổi sức khỏe của mình không?','Would you like to discuss any changes in your health?','Mình muốn tập trung vào rào cản tài liệu, không phải thông tin y tế.','I would prefer to focus on the document barrier rather than medical information.',['respect privacy','tôn trọng riêng tư']],
      ['Được, chúng ta sẽ ưu tiên chuyển đổi các báo cáo thường dùng.','Understood. We will prioritize converting the reports you use regularly.','Một lịch rõ sẽ giúp mình lập kế hoạch công việc.','A clear timetable will help me plan my work.',['accessible format','định dạng tiếp cận']],
    ]],
  ]}),
  t({id:'interpreting-lab-results',title:'Interpreting Lab Results',titleVi:'Hiểu kết quả xét nghiệm',category:'Health',icon:'🧪',level:'B1',description:'Đọc phạm vi tham chiếu, đặt câu hỏi và tránh tự chẩn đoán.',grammar:['modals-of-deduction','present-perfect','question-forms'],scenarios:[
    ['Understanding the Range','Hiểu phạm vi tham chiếu','Bệnh nhân thấy một chỉ số bị đánh dấu cao.','Hiểu con số trong bối cảnh phù hợp.',[
      ['Kết quả này cao hơn phạm vi tham chiếu một chút.','This result is slightly above the reference range.','Một giá trị ngoài phạm vi không tự nó xác nhận bệnh.','A value outside the range does not by itself confirm an illness.',['reference range','phạm vi tham chiếu']],
      ['Phạm vi có giống nhau cho mọi người không?','Is the range identical for everyone?','Nó có thể khác theo phòng xét nghiệm, tuổi và hoàn cảnh lâm sàng.','It can vary by laboratory, age, and clinical context.',['clinical context','bối cảnh lâm sàng']],
      ['Vậy mình không nên so với con số trên một trang web ngẫu nhiên.','Then I should not compare it with a number on an arbitrary website.','Đúng, hãy dùng phạm vi trên báo cáo và trao đổi với bác sĩ.','Correct. Use the range on your report and discuss it with your clinician.',['single result','một kết quả đơn lẻ']],
    ]],
    ['Asking About Variation','Hỏi về dao động','Kết quả khác nhẹ so với lần trước.','Xem thay đổi có ý nghĩa hay do điều kiện đo.',[
      ['Chỉ số đã tăng từ 5,1 lên 5,4 trong ba tháng.','The value has risen from 5.1 to 5.4 over three months.','Mức thay đổi đó có lớn hơn dao động xét nghiệm thông thường không?','Is that change greater than ordinary test variation?',['test variation','dao động xét nghiệm']],
      ['Mình lấy mẫu lần này sau khi ăn.','This sample was taken after I had eaten.','Điều đó có thể ảnh hưởng một số chỉ số nên cần được ghi nhận.','That may affect some measures and should be taken into account.',['sample condition','điều kiện lấy mẫu']],
      ['Bác sĩ có thể muốn lặp lại trong điều kiện giống lần trước.','The clinician may want to repeat the test under comparable conditions.','Như vậy xu hướng sẽ dễ diễn giải hơn.','That would make the trend easier to interpret.',['repeat a test','lặp lại xét nghiệm']],
    ]],
    ['Planning the Follow-up','Lên bước theo dõi','Bệnh nhân chuẩn bị câu hỏi cho cuộc hẹn.','Hiểu ý nghĩa và hành động tiếp theo.',[
      ['Mình nên hỏi câu gì thay vì chỉ hỏi có nghiêm trọng không?','What should I ask instead of only asking whether it is serious?','Hỏi kết quả này có ý nghĩa gì khi kết hợp triệu chứng và lịch sử của bạn.','Ask what the result means alongside your symptoms and history.',['follow-up question','câu hỏi theo dõi']],
      ['Mình cũng muốn biết có cần thay đổi thuốc không.','I also want to know whether my medication needs to change.','Đừng tự thay đổi liều trước khi được hướng dẫn.','Do not alter the dose yourself before receiving advice.',['alter a dose','đổi liều']],
      ['Nếu cần xét nghiệm lại, mình sẽ hỏi thời điểm và cách chuẩn bị.','If another test is needed, I will ask when and how to prepare.','Đó là kế hoạch cụ thể hơn việc tự suy đoán từ báo cáo.','That is more useful than trying to diagnose yourself from the report.',['follow-up plan','kế hoạch theo dõi']],
    ]],
  ]}),
  t({id:'reviewing-a-public-consultation',title:'Reviewing a Public Consultation',titleVi:'Đánh giá một cuộc tham vấn công chúng',category:'Community',icon:'🗳️',level:'B2',description:'Kiểm tra phạm vi lựa chọn, tính đại diện và cách phản hồi được dùng.',grammar:['policy-language','hedging','passive-voice'],scenarios:[
    ['Examining the Questions','Xem câu hỏi','Cư dân đọc khảo sát về giao thông.','Phát hiện câu hỏi dẫn dắt và lựa chọn thiếu.',[
      ['Khảo sát hỏi mọi người chọn bãi xe mới ở vị trí A hay B.','The survey asks people to choose whether new parking should be at site A or site B.','Nó không cho phép phản đối việc xây thêm bãi xe.','It does not allow respondents to oppose additional parking altogether.',['consultation scope','phạm vi tham vấn']],
      ['Vậy câu hỏi giả định giải pháp trước khi hỏi về vấn đề.','Then the question assumes a solution before exploring the problem.','Đúng, lựa chọn giao thông công cộng cũng không được đưa vào.','Exactly. A public-transport option is also absent.',['leading question','câu hỏi dẫn dắt']],
      ['Một ô trả lời mở có khắc phục được không?','Would an open-response box address that limitation?','Nó hữu ích, nhưng các phương án chính vẫn định hình cách người dân suy nghĩ.','It would help, but the headline options would still frame how people think.',['response option','lựa chọn trả lời']],
    ]],
    ['Assessing Representation','Đánh giá tính đại diện','Báo cáo nói đa số ủng hộ nhưng tỷ lệ phản hồi thấp.','Hiểu ai tham gia và ai vắng mặt.',[
      ['Sáu mươi phần trăm người trả lời ủng hộ đề xuất.','Sixty percent of respondents supported the proposal.','Bao nhiêu phần trăm cư dân đã trả lời?','What proportion of residents actually responded?',['response population','nhóm phản hồi']],
      ['Chỉ khoảng bốn phần trăm hộ gia đình gửi khảo sát.','Only around four percent of households submitted the survey.','Vậy kết quả mô tả người trả lời, không nhất thiết toàn cộng đồng.','Then the result describes respondents, not necessarily the whole community.',['representativeness','tính đại diện']],
      ['Người thuê nhà và người trẻ có ít phản hồi hơn nhiều.','Renters and younger residents were substantially underrepresented.','Cần thêm kênh tiếp cận thay vì chỉ đăng biểu mẫu trực tuyến.','Additional outreach channels are needed rather than relying solely on an online form.',['underrepresented group','nhóm ít đại diện']],
    ]],
    ['Tracing the Decision','Theo dõi quyết định','Hội đồng công bố quyết định sau tham vấn.','Xem phản hồi ảnh hưởng thế nào.',[
      ['Báo cáo liệt kê ý kiến nhưng không nói chúng thay đổi kế hoạch ra sao.','The report lists comments without explaining how they altered the plan.','Một bản tóm tắt tham vấn nên nối chủ đề phản hồi với quyết định.','A consultation summary should connect feedback themes to decisions.',['decision trail','dấu vết quyết định']],
      ['Một số đề xuất bị từ chối mà không có lý do.','Several suggestions were rejected without reasons.','Điều đó khiến quá trình có vẻ mang tính thủ tục hơn thực chất.','That makes the process appear procedural rather than meaningful.',['meaningful consultation','tham vấn thực chất']],
      ['Mình sẽ yêu cầu bảng phản hồi theo từng chủ đề.','I will request a response table organized by theme.','Nó nên nêu điều được chấp nhận, điều bị từ chối và cơ sở.','It should state what was accepted, what was rejected, and on what basis.',['response table','bảng phản hồi']],
    ]],
  ]}),
  t({id:'planning-crisis-communication',title:'Planning Crisis Communication',titleVi:'Lên kế hoạch truyền thông khủng hoảng',category:'Communication',icon:'📣',level:'B2',description:'Xác minh thông tin, phối hợp thông điệp và cập nhật khi sự việc thay đổi.',grammar:['reported-speech','incident-language','modals'],scenarios:[
    ['Creating the First Statement','Soạn thông báo đầu tiên','Một nhà máy gặp sự cố nhưng nguyên nhân chưa rõ.','Nói điều đã biết, hành động và khoảng trống.',[
      ['Mình có thể xác nhận rằng sự cố xảy ra lúc chín giờ mười.','We can confirm that the incident occurred at nine ten.','Đừng suy đoán nguyên nhân trước khi đội kỹ thuật xác minh.','Do not speculate about the cause before the technical team verifies it.',['holding statement','thông báo ban đầu']],
      ['Thông báo nên ưu tiên an toàn con người trước tác động kinh doanh.','The statement should prioritize people’s safety before business impact.','Đúng, hai nhân viên đã được kiểm tra và không cần nhập viện.','Agreed. Two employees were assessed and did not require hospital treatment.',['verified fact','dữ kiện đã xác minh']],
      ['Mình sẽ nêu khu vực đã được cô lập và dịch vụ khẩn cấp đang có mặt.','I will state that the area has been isolated and emergency services are present.','Hãy thêm giờ dự kiến có cập nhật tiếp theo.','Add the time at which the next update can be expected.',['next update time','thời điểm cập nhật tiếp']],
    ]],
    ['Aligning Spokespeople','Thống nhất người phát ngôn','Nhiều quản lý nhận câu hỏi từ báo chí.','Tránh thông tin mâu thuẫn mà không bịt tiếng chuyên gia.',[
      ['Ai có quyền xác nhận thông tin ra bên ngoài?','Who is authorized to confirm information externally?','Người phát ngôn chính sẽ dùng dữ kiện từ trưởng nhóm ứng phó.','The lead spokesperson will use facts supplied by the incident commander.',['authorized spokesperson','người phát ngôn được ủy quyền']],
      ['Chuyên gia kỹ thuật có thể trả lời trực tiếp không?','Can technical specialists answer questions directly?','Có, nếu họ được chuẩn bị và chỉ nói trong phạm vi chuyên môn.','Yes, provided they are briefed and speak within their expertise.',['speak within expertise','nói trong phạm vi chuyên môn']],
      ['Nhân viên khác nên làm gì khi được phóng viên liên hệ?','What should other employees do if a journalist contacts them?','Chuyển yêu cầu tới nhóm truyền thông mà không tranh luận trên mạng.','Refer the request to communications without entering an online argument.',['media enquiry','yêu cầu báo chí']],
    ]],
    ['Correcting New Information','Sửa thông tin mới','Điều tra cho thấy chi tiết ban đầu không chính xác.','Đính chính rõ và giữ lịch sử minh bạch.',[
      ['Thông báo đầu nói không có ảnh hưởng bên ngoài khuôn viên.','The first statement said that there was no impact beyond the site.','Dữ liệu mới cho thấy khói đã đi qua một khu dân cư trong thời gian ngắn.','New data shows that smoke passed over a residential area briefly.',['material correction','đính chính quan trọng']],
      ['Mình có nên xóa thông báo cũ không?','Should we delete the earlier statement?','Không, hãy gắn nhãn đã cập nhật và liên kết đến bản đính chính.','No. Mark it as updated and link to the correction.',['transparent correction','đính chính minh bạch']],
      ['Thông báo mới cần giải thích vì sao đánh giá thay đổi.','The new statement needs to explain why the assessment changed.','Nêu rằng cảm biến ngoài khu vực chỉ báo cáo sau thông báo đầu.','State that off-site sensor data became available only after the first notice.',['explain uncertainty','giải thích bất định']],
    ]],
  ]}),
  t({id:'assessing-algorithmic-bias',title:'Assessing Algorithmic Bias',titleVi:'Đánh giá thiên lệch thuật toán',category:'Technology',icon:'⚙️',level:'B2',description:'Chọn nhóm, chỉ số và cơ chế giám sát cho hệ thống tự động.',grammar:['statistical-language','ethical-reasoning','conditionals'],scenarios:[
    ['Defining the Harm','Xác định tác hại','Đội kiểm toán hệ thống phê duyệt khoản vay.','Nói rõ loại sai sót và người chịu ảnh hưởng.',[
      ['“Mô hình công bằng” chưa phải mục tiêu đủ cụ thể.','“The model should be fair” is not a sufficiently specific objective.','Mình cần xác định quyết định nào và tác hại nào đang được đo.','We need to identify which decision and which harm are being measured.',['defined harm','tác hại xác định']],
      ['Một nguy cơ là người đủ điều kiện bị từ chối sai.','One risk is that eligible applicants are incorrectly rejected.','Nguy cơ khác là một nhóm bị yêu cầu lãi suất cao hơn không hợp lý.','Another is that one group receives unjustifiably higher interest rates.',['false rejection','từ chối sai']],
      ['Hai tác hại cần chỉ số khác nhau.','Those harms require different measures.','Đúng, một điểm tổng hợp có thể che giấu vấn đề cụ thể.','Correct. A composite score could conceal a particular problem.',['bias metric','chỉ số thiên lệch']],
    ]],
    ['Choosing Comparison Groups','Chọn nhóm so sánh','Dữ liệu có nhiều đặc điểm giao nhau.','Tránh chỉ kiểm tra từng nhóm rộng riêng lẻ.',[
      ['Báo cáo so sánh giới tính và tuổi thành hai bảng riêng.','The report compares gender and age in two separate tables.','Điều đó có thể bỏ sót tác động với phụ nữ lớn tuổi.','That may miss the impact on older women.',['intersectional analysis','phân tích giao thoa']],
      ['Một số nhóm nhỏ có quá ít trường hợp cho tỷ lệ ổn định.','Some subgroups contain too few cases for stable rates.','Mình nên báo khoảng bất định thay vì giấu nhóm đó.','We should report uncertainty intervals rather than omit the group.',['small subgroup','phân nhóm nhỏ']],
      ['Có thể bổ sung kiểm tra định tính từ hồ sơ khiếu nại.','We can supplement the figures with qualitative evidence from appeals.','Điều đó giúp phát hiện mẫu mà số lượng nhỏ chưa thể hiện rõ.','That helps identify patterns that small numbers cannot yet establish.',['qualitative audit','kiểm toán định tính']],
    ]],
    ['Monitoring After Launch','Giám sát sau triển khai','Hiệu năng có thể đổi khi người dùng và thị trường thay đổi.','Đặt chỉ báo, ngưỡng và quyền dừng.',[
      ['Kiểm toán trước triển khai không bảo đảm hệ thống sẽ luôn công bằng.','A pre-launch audit does not guarantee that the system will remain fair.','Phân bố người nộp và hành vi có thể thay đổi theo thời gian.','Applicant populations and behaviour may shift over time.',['model drift','trôi mô hình']],
      ['Mình nên tính lại chỉ số bao lâu một lần?','How often should we recalculate the measures?','Theo dõi hàng tháng và xem xét sâu mỗi quý là điểm bắt đầu hợp lý.','Monthly monitoring and a deeper quarterly review are a reasonable starting point.',['monitoring cadence','nhịp giám sát']],
      ['Nếu chênh lệch vượt ngưỡng thì ai có thể dừng hệ thống?','Who can suspend the system if a disparity exceeds the threshold?','Một chủ sở hữu độc lập với đội kinh doanh phải có quyền tạm dừng.','An owner independent of the commercial team must have suspension authority.',['suspension threshold','ngưỡng tạm dừng']],
    ]],
  ]}),
];
