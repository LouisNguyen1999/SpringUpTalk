import { scaleTopic as t } from './scale-builder';

export const batchFCoreTopics = [
  t({id:'using-a-ticket-machine',title:'Using a Ticket Machine',titleVi:'Dùng máy bán vé',category:'Transportation',icon:'🎫',level:'A1',description:'Chọn hành trình, loại vé và lấy vé in.',grammar:['basic-questions','imperatives','this-that'],scenarios:[
    ['Choosing a Destination','Chọn điểm đến','Khách đứng trước máy bán vé tàu.','Tìm ga đến trên màn hình.',[
      ['Bạn muốn đi đến ga nào?','Which station do you want to travel to?','Mình cần đi đến ga Riverside.','I need to travel to Riverside station.',['destination station','ga đến']],
      ['Hãy nhập chữ R vào ô tìm kiếm.','Type the letter R in the search box.','Riverside đang hiện ở đầu danh sách.','Riverside appears at the top of the list.',['search box','ô tìm kiếm']],
      ['Mình chạm vào tên ga này phải không?','Do I tap this station name?','Đúng, rồi máy sẽ hiện các loại vé.','Yes. The machine will then show the ticket types.',['ticket type','loại vé']],
    ]],
    ['Selecting a Fare','Chọn loại giá vé','Máy đưa ra vé một chiều và khứ hồi.','Chọn đúng hành trình và số người.',[
      ['Mình chỉ đi một chiều hôm nay.','I am making a one-way journey today.','Vậy hãy chọn vé một chiều cho một người lớn.','Then select a single ticket for one adult.',['single ticket','vé một chiều']],
      ['Trẻ em có giá thấp hơn không?','Is there a lower fare for children?','Có, chọn mục trẻ em dưới mười hai tuổi.','Yes. Choose the option for children under twelve.',['child fare','giá vé trẻ em']],
      ['Tổng cộng có ba vé trên màn hình.','There are three tickets on the screen altogether.','Hãy kiểm tra trước khi chuyển sang thanh toán.','Check the selection before continuing to payment.',['fare selection','lựa chọn giá vé']],
    ]],
    ['Collecting the Tickets','Lấy vé','Thanh toán hoàn tất nhưng vé ra chậm.','Nhận đủ vé và hóa đơn.',[
      ['Vé sẽ ra ở đâu?','Where will the tickets come out?','Chúng sẽ rơi vào khay phía dưới màn hình.','They will drop into the tray below the screen.',['ticket tray','khay vé']],
      ['Mình mới thấy hai tấm.','I can see only two tickets so far.','Hãy đợi đến khi đèn xử lý tắt.','Wait until the processing light goes off.',['processing light','đèn xử lý']],
      ['Bây giờ vé cuối cùng và hóa đơn đã ra.','The final ticket and the receipt have appeared now.','Tốt, hãy giữ vé khô và phẳng.','Good. Keep the tickets dry and flat.',['printed receipt','hóa đơn in']],
    ]],
  ]}),
  t({id:'collecting-a-parcel-locker',title:'Collecting from a Parcel Locker',titleVi:'Nhận hàng từ tủ thông minh',category:'Services',icon:'📦',level:'A1',description:'Tìm tủ, nhập mã và đóng ngăn nhận hàng.',grammar:['where-questions','can','imperatives'],scenarios:[
    ['Finding the Locker','Tìm tủ nhận hàng','Người nhận đến một khu chung cư lớn.','Tìm đúng dãy tủ theo tin nhắn.',[
      ['Tủ nhận hàng nằm ở đâu?','Where are the parcel lockers?','Chúng ở cạnh sảnh phía đông.','They are beside the east lobby.',['parcel locker','tủ nhận hàng']],
      ['Mình đang ở sảnh phía tây.','I am at the west lobby now.','Hãy đi qua sân và theo biển màu cam.','Walk across the courtyard and follow the orange signs.',['east lobby','sảnh phía đông']],
      ['Dãy tủ có số 3 phải không?','Is it locker bank number three?','Đúng, số dãy có trong tin nhắn của bạn.','Yes. The bank number is in your message.',['locker bank','dãy tủ']],
    ]],
    ['Entering the Code','Nhập mã','Người nhận dùng màn hình cảm ứng.','Mở ngăn bằng mã dùng một lần.',[
      ['Mình cần nhập mã nào?','Which code do I need to enter?','Dùng mã sáu chữ số bên dưới mã đơn hàng.','Use the six-digit code below the order number.',['six-digit code','mã sáu chữ số']],
      ['Màn hình nói mã không đúng.','The screen says the code is incorrect.','Hãy kiểm tra bạn chưa nhập thêm khoảng trắng.','Check that you did not enter an extra space.',['one-time code','mã dùng một lần']],
      ['Bây giờ ngăn số 18 đã mở.','Locker number 18 has opened now.','Kiện hàng của bạn ở trong ngăn đó.','Your parcel is inside that compartment.',['locker compartment','ngăn tủ']],
    ]],
    ['Closing the Door','Đóng cửa tủ','Người nhận đã lấy hộp ra.','Hoàn tất lượt nhận và giữ khu vực an toàn.',[
      ['Mình đã lấy đúng hộp rồi.','I have collected the correct box.','Hãy đóng chắc cửa ngăn trước khi rời đi.','Close the compartment door firmly before leaving.',['close firmly','đóng chắc']],
      ['Đèn vẫn nhấp nháy màu đỏ.','The light is still flashing red.','Ấn cửa cho đến khi bạn nghe tiếng tách.','Press the door until you hear a click.',['flashing light','đèn nhấp nháy']],
      ['Bây giờ màn hình ghi đã hoàn tất.','The screen now says that collection is complete.','Bạn có thể giữ tin nhắn làm bằng chứng nhận hàng.','You can keep the message as proof of collection.',['proof of collection','bằng chứng nhận hàng']],
    ]],
  ]}),
  t({id:'shopping-at-a-florist',title:'Shopping at a Florist',titleVi:'Mua hoa ở cửa hàng',category:'Shopping',icon:'💐',level:'A1',description:'Chọn hoa, yêu cầu bó và giữ hoa tươi.',grammar:['would-like','colours','imperatives'],scenarios:[
    ['Choosing Flowers','Chọn hoa','Khách cần hoa tặng một người bạn.','Chọn màu và loại hoa phù hợp.',[
      ['Mình muốn một bó hoa nhỏ.','I would like a small bouquet.','Bạn thích màu sáng hay màu nhạt?','Would you prefer bright or soft colours?',['small bouquet','bó hoa nhỏ']],
      ['Bạn mình rất thích màu vàng.','My friend really likes yellow.','Hoa hướng dương này đang rất tươi.','These sunflowers are very fresh.',['sunflower','hoa hướng dương']],
      ['Hãy thêm vài bông hoa trắng nhé.','Please add a few white flowers.','Hoa cúc trắng sẽ hợp với hoa hướng dương.','White daisies will go well with the sunflowers.',['go well with','hợp với']],
    ]],
    ['Wrapping the Bouquet','Gói bó hoa','Nhân viên hỏi cách trình bày món quà.','Chọn giấy gói và thiệp.',[
      ['Bạn muốn gói bằng giấy màu nào?','Which colour paper would you like?','Giấy màu xanh lá nhạt sẽ đẹp.','Pale-green paper would look nice.',['wrapping paper','giấy gói']],
      ['Mình có thể thêm một tấm thiệp không?','Can I add a card?','Có, những tấm thiệp trống ở cạnh quầy.','Yes. The blank cards are beside the counter.',['blank card','thiệp trống']],
      ['Xin buộc bó hoa bằng ruy băng vàng.','Please tie the bouquet with yellow ribbon.','Tôi sẽ làm một chiếc nơ nhỏ ở phía trước.','I will make a small bow at the front.',['tie a ribbon','buộc ruy băng']],
    ]],
    ['Keeping Flowers Fresh','Giữ hoa tươi','Khách sẽ chưa tặng hoa trong vài giờ.','Mang và bảo quản hoa đúng cách.',[
      ['Hoa có tươi đến tối không?','Will the flowers stay fresh until this evening?','Có, hãy giữ phần thân trong túi nước này.','Yes. Keep the stems in this water pouch.',['water pouch','túi nước']],
      ['Mình có nên để hoa trong xe không?','Should I leave them in the car?','Không, nhiệt độ trong xe có thể quá nóng.','No. The temperature inside the car may become too hot.',['flower stems','cành hoa']],
      ['Khi về nhà mình sẽ đặt chúng ở nơi mát.','I will put them somewhere cool when I get home.','Tốt, và tránh ánh nắng trực tiếp.','Good. Keep them away from direct sunlight.',['direct sunlight','ánh nắng trực tiếp']],
    ]],
  ]}),
  t({id:'visiting-a-farm',title:'Visiting a Farm',titleVi:'Tham quan nông trại',category:'Entertainment',icon:'🚜',level:'A1',description:'Theo hướng dẫn, gặp động vật và mua nông sản.',grammar:['can-cannot','imperatives','present-simple'],scenarios:[
    ['Following the Farm Rules','Theo quy định','Gia đình nghe hướng dẫn ở cổng.','Giữ an toàn quanh động vật và máy móc.',[
      ['Trẻ em có thể chạy trong sân không?','Can children run in the yard?','Không, máy kéo có thể đi qua khu vực này.','No. Tractors may pass through this area.',['farmyard','sân nông trại']],
      ['Mình nên đi theo đường nào?','Which path should we follow?','Hãy ở trên con đường có hàng rào trắng.','Stay on the path with the white fence.',['fenced path','đường có hàng rào']],
      ['Mình có được mở cổng chuồng không?','May we open the animal gates?','Không, chỉ nhân viên được mở chúng.','No. Only farm staff may open them.',['animal gate','cổng chuồng']],
    ]],
    ['Meeting the Goats','Gặp đàn dê','Khách vào khu cho dê ăn.','Cho ăn đúng thức ăn và đúng cách.',[
      ['Mình có thể cho dê ăn không?','Can we feed the goats?','Có, nhưng chỉ dùng thức ăn trong chiếc xô xanh.','Yes, but use only the feed in the green bucket.',['animal feed','thức ăn vật nuôi']],
      ['Mình đưa thức ăn bằng tay được chứ?','Can I offer the food by hand?','Hãy đặt nó trên lòng bàn tay phẳng.','Place it on your flat palm.',['flat palm','lòng bàn tay phẳng']],
      ['Con dê nhỏ này có tên không?','Does this little goat have a name?','Có, nó tên là Pepper và được ba tháng tuổi.','Yes. Her name is Pepper, and she is three months old.',['young goat','dê con']],
    ]],
    ['Buying Farm Produce','Mua nông sản','Gia đình ghé quầy nhỏ trước khi về.','Hỏi nguồn gốc và chọn sản phẩm.',[
      ['Những quả trứng này có từ nông trại không?','Are these eggs from this farm?','Có, chúng được thu vào sáng nay.','Yes. They were collected this morning.',['farm eggs','trứng nông trại']],
      ['Mứt dâu có được làm ở đây không?','Is the strawberry jam made here?','Có, chúng tôi dùng dâu từ cánh đồng phía sau.','Yes. We use strawberries from the field behind us.',['homemade jam','mứt nhà làm']],
      ['Mình lấy sáu quả trứng và một lọ mứt.','I will take six eggs and one jar of jam.','Tôi sẽ đặt trứng trong hộp cứng để bảo vệ.','I will put the eggs in a firm box for protection.',['firm carton','hộp cứng']],
    ]],
  ]}),
  t({id:'borrowing-an-umbrella',title:'Borrowing an Umbrella',titleVi:'Mượn ô',category:'Daily Life',icon:'☂️',level:'A1',description:'Hỏi mượn, dùng cẩn thận và trả lại đồ.',grammar:['can-could','possessives','future-will'],scenarios:[
    ['Asking to Borrow','Hỏi mượn','Trời mưa khi một đồng nghiệp chuẩn bị ra ngoài.','Mượn ô và xác nhận thời gian dùng.',[
      ['Bạn có chiếc ô nào mình có thể mượn không?','Do you have an umbrella that I could borrow?','Có một chiếc ô gấp trong ngăn kéo dưới.','There is a folding umbrella in the bottom drawer.',['folding umbrella','ô gấp']],
      ['Mình chỉ cần dùng trong giờ ăn trưa.','I need it only during my lunch break.','Không sao, chiều nay mình chưa cần dùng.','That is fine. I will not need it this afternoon.',['borrow briefly','mượn trong thời gian ngắn']],
      ['Chiếc ô màu xanh là của bạn phải không?','Is the blue umbrella yours?','Đúng, tên mình được viết trên tay cầm.','Yes. My name is written on the handle.',['umbrella handle','tay cầm ô']],
    ]],
    ['Using It Carefully','Dùng cẩn thận','Gió mạnh làm chiếc ô khó giữ.','Tránh làm hỏng đồ mượn.',[
      ['Gió ngoài kia khá mạnh.','The wind is quite strong outside.','Hãy đóng ô nếu nó bắt đầu lật ngược.','Close it if it begins to turn inside out.',['turn inside out','bị lật ngược']],
      ['Một nan ô trông hơi lỏng.','One of the umbrella ribs looks slightly loose.','Cảm ơn đã nói, hãy tránh kéo mạnh phần đó.','Thanks for mentioning it. Avoid pulling that section.',['umbrella rib','nan ô']],
      ['Mình sẽ đi dưới mái hiên khi có thể.','I will walk under the covered areas when possible.','Như vậy chiếc ô sẽ chịu ít gió hơn.','That will expose the umbrella to less wind.',['covered walkway','lối đi có mái che']],
    ]],
    ['Returning It','Trả lại ô','Người mượn quay lại sau giờ trưa.','Làm khô và trả đúng chỗ.',[
      ['Cảm ơn bạn, chiếc ô đã giúp mình không bị ướt.','Thank you. The umbrella kept me dry.','Rất vui vì nó hữu ích.','I am glad that it was useful.',['keep dry','giữ khô']],
      ['Mình nên để ô ướt ở đâu?','Where should I leave the wet umbrella?','Hãy mở nó trong khu để ô cho khô.','Leave it open in the umbrella stand to dry.',['umbrella stand','giá để ô']],
      ['Khi khô mình sẽ cất lại vào ngăn kéo.','I will return it to the drawer when it is dry.','Cảm ơn bạn đã chăm sóc nó cẩn thận.','Thank you for taking good care of it.',['return an item','trả đồ']],
    ]],
  ]}),
  t({id:'changing-a-train-ticket',title:'Changing a Train Ticket',titleVi:'Đổi vé tàu',category:'Transportation',icon:'🚆',level:'A2',description:'Kiểm tra điều kiện đổi, chọn chuyến mới và trả chênh lệch.',grammar:['past-simple','conditionals','polite-requests'],scenarios:[
    ['Checking the Fare Rules','Kiểm tra điều kiện vé','Hành khách muốn đi chuyến muộn hơn.','Xác định vé có thể đổi hay không.',[
      ['Tôi có vé chuyến mười giờ nhưng cần đi muộn hơn.','I have a ticket for the ten o’clock train, but I need to travel later.','Tôi sẽ kiểm tra loại giá vé của bạn.','I will check the fare type on your ticket.',['fare type','loại giá vé']],
      ['Tôi đã mua loại tiết kiệm qua ứng dụng.','I bought the saver fare through the app.','Vé này cho phép đổi trước giờ khởi hành.','This ticket allows changes before departure.',['change before departure','đổi trước giờ khởi hành']],
      ['Có mất phí đổi vé không?','Is there a fee for changing it?','Không có phí cố định, nhưng bạn phải trả chênh lệch giá.','There is no fixed fee, but you must pay any fare difference.',['fare difference','chênh lệch giá']],
    ]],
    ['Choosing a New Train','Chọn chuyến mới','Nhân viên tìm chuyến vào buổi chiều.','Chọn giờ còn ghế và phù hợp lịch.',[
      ['Chiều nay có những chuyến nào đến Riverside?','Which afternoon trains go to Riverside?','Có chuyến lúc một giờ hai mươi và ba giờ năm.','There are services at one twenty and three oh five.',['afternoon service','chuyến buổi chiều']],
      ['Chuyến một giờ còn ghế gần cửa sổ không?','Are there any window seats left on the one o’clock train?','Chỉ còn một ghế cửa sổ ở toa số bốn.','There is one window seat left in carriage four.',['window seat','ghế gần cửa sổ']],
      ['Chuyến đó đến nơi lúc mấy giờ?','What time does that train arrive?','Nó đến Riverside lúc hai giờ bốn mươi lăm.','It reaches Riverside at two forty-five.',['arrival time','giờ đến']],
    ]],
    ['Confirming the Change','Xác nhận thay đổi','Hành khách thanh toán và nhận vé mới.','Kiểm tra vé cũ bị hủy đúng.',[
      ['Giá vé mới cao hơn bao nhiêu?','How much more expensive is the new fare?','Bạn cần trả thêm tám mươi nghìn đồng.','You need to pay an additional eighty thousand dong.',['additional payment','khoản trả thêm']],
      ['Tôi có thể thanh toán bằng thẻ này.','I can pay with this card.','Cảm ơn, thay đổi đã được xử lý.','Thank you. The change has been processed.',['process a change','xử lý thay đổi']],
      ['Vé cũ còn xuất hiện trong ứng dụng.','The old ticket is still visible in the app.','Nó sẽ được đánh dấu đã hủy khi bạn làm mới màn hình.','It will be marked as cancelled when you refresh the screen.',['cancelled ticket','vé đã hủy']],
    ]],
  ]}),
  t({id:'setting-up-a-home-router',title:'Setting Up a Home Router',titleVi:'Cài đặt bộ định tuyến tại nhà',category:'Technology',icon:'📡',level:'A2',description:'Kết nối cáp, đổi tên mạng và đặt mật khẩu.',grammar:['imperatives','present-perfect','conditionals'],scenarios:[
    ['Connecting the Cables','Kết nối dây','Người dùng mở hộp bộ định tuyến mới.','Cắm đúng nguồn và dây mạng.',[
      ['Dây màu xanh cắm vào cổng nào?','Which port should the blue cable go into?','Cắm nó vào cổng Internet ở mặt sau.','Plug it into the Internet port on the back.',['Internet port','cổng Internet']],
      ['Cáp nguồn đã được cắm chắc chưa?','Is the power cable connected firmly?','Có, đèn nguồn vừa chuyển sang màu trắng.','Yes. The power light has just turned white.',['power indicator','đèn nguồn']],
      ['Mình có cần nối máy tính bằng dây không?','Do I need to connect a computer by cable?','Không, bạn có thể hoàn tất cài đặt bằng điện thoại.','No. You can complete the setup with your phone.',['router setup','cài đặt bộ định tuyến']],
    ]],
    ['Naming the Network','Đặt tên mạng','Ứng dụng yêu cầu thông tin Wi-Fi mới.','Chọn tên dễ nhận ra mà không lộ dữ liệu.',[
      ['Mình nên dùng tên căn hộ cho mạng không?','Should I use the apartment number as the network name?','Tốt hơn là chọn tên không tiết lộ địa chỉ.','It is better to choose a name that does not reveal your address.',['network name','tên mạng']],
      ['Mình sẽ gọi nó là BlueRiver.','I will call it BlueRiver.','Tên đó dễ nhận ra và không chứa thông tin cá nhân.','That name is recognizable without containing personal information.',['personal information','thông tin cá nhân']],
      ['Có nên tách mạng 2,4 và 5 gigahertz không?','Should I separate the 2.4 and 5 gigahertz networks?','Bạn có thể để bộ định tuyến tự chọn cho từng thiết bị.','You can let the router choose automatically for each device.',['frequency band','băng tần']],
    ]],
    ['Securing the Wi-Fi','Bảo mật Wi-Fi','Gia đình tạo mật khẩu và mạng khách.','Ngăn truy cập trái phép.',[
      ['Mật khẩu tám ký tự có đủ mạnh không?','Is an eight-character password strong enough?','Hãy dùng ít nhất mười hai ký tự không dễ đoán.','Use at least twelve characters that are difficult to guess.',['strong password','mật khẩu mạnh']],
      ['Mình có nên dùng cùng mật khẩu quản trị không?','Should I use the same password for the admin account?','Không, hai mật khẩu nên khác nhau.','No. The two passwords should be different.',['admin password','mật khẩu quản trị']],
      ['Khách đến nhà sẽ kết nối thế nào?','How will visitors connect when they come over?','Hãy tạo mạng khách tách khỏi thiết bị gia đình.','Create a guest network that is separate from home devices.',['guest network','mạng khách']],
    ]],
  ]}),
  t({id:'preparing-a-class-presentation',title:'Preparing a Class Presentation',titleVi:'Chuẩn bị bài thuyết trình trên lớp',category:'Education',icon:'🖥️',level:'A2',description:'Chọn nội dung, chia phần và luyện thời gian.',grammar:['going-to','sequencing','should'],scenarios:[
    ['Selecting the Main Points','Chọn ý chính','Hai học sinh có mười phút trình bày.','Giảm nội dung xuống ba thông điệp.',[
      ['Bài của mình có quá nhiều số liệu.','Our presentation contains too many statistics.','Mình chỉ nên giữ những số liệu hỗ trợ kết luận chính.','We should keep only the figures that support our main conclusion.',['main point','ý chính']],
      ['Ba ý nào quan trọng nhất?','Which three points are the most important?','Nguyên nhân, tác động và giải pháp đề xuất.','The causes, the impact, and the proposed solution.',['proposed solution','giải pháp đề xuất']],
      ['Mỗi ý nên có một ví dụ cụ thể.','Each point should include one concrete example.','Như vậy người nghe sẽ dễ nhớ hơn.','That will make the ideas easier for the audience to remember.',['concrete example','ví dụ cụ thể']],
    ]],
    ['Dividing the Speaking','Chia phần nói','Nhóm có ba thành viên.','Phân phần công bằng và chuyển ý mượt.',[
      ['Ai muốn mở đầu bài thuyết trình?','Who would like to open the presentation?','Mình có thể giới thiệu chủ đề và câu hỏi nghiên cứu.','I can introduce the topic and the research question.',['research question','câu hỏi nghiên cứu']],
      ['Mình sẽ giải thích dữ liệu ở phần giữa.','I will explain the data in the middle section.','Vậy Mai có thể trình bày giải pháp và kết luận.','Then Mai can present the solution and conclusion.',['middle section','phần giữa']],
      ['Mình cần một câu chuyển giữa mỗi người.','We need a transition between each speaker.','Hãy viết tên người tiếp theo ở cuối mỗi phần.','Add the next speaker’s name at the end of each section.',['speaker transition','chuyển người nói']],
    ]],
    ['Rehearsing the Timing','Luyện thời gian','Lần chạy thử dài hơn giới hạn.','Rút gọn mà vẫn giữ thông điệp.',[
      ['Lần luyện đầu kéo dài mười hai phút.','Our first practice run lasted twelve minutes.','Chúng ta cần cắt khoảng hai phút.','We need to cut roughly two minutes.',['practice run','lần chạy thử']],
      ['Phần nào đang mất nhiều thời gian nhất?','Which section is taking the most time?','Phần mô tả từng biểu đồ dài gần bốn phút.','The explanation of every chart lasts nearly four minutes.',['time limit','giới hạn thời gian']],
      ['Mình có thể gộp hai biểu đồ tương tự.','We can combine the two similar charts.','Ý đó sẽ tiết kiệm thời gian mà không mất bằng chứng.','That will save time without removing the evidence.',['combine charts','gộp biểu đồ']],
    ]],
  ]}),
  t({id:'organizing-a-wardrobe',title:'Organizing a Wardrobe',titleVi:'Sắp xếp tủ quần áo',category:'Home',icon:'👚',level:'A2',description:'Phân loại, quyết định giữ đồ và bảo quản theo mùa.',grammar:['present-perfect','too-enough','relative-clauses'],scenarios:[
    ['Sorting by Use','Phân loại theo nhu cầu','Tủ chật và khó tìm quần áo.','Chia đồ thường mặc và ít dùng.',[
      ['Mình đã không mặc chiếc áo này hơn một năm.','I have not worn this shirt for over a year.','Hãy đặt nó vào nhóm cần xem lại.','Put it in the pile that needs reviewing.',['sorting pile','nhóm phân loại']],
      ['Những món mặc hằng tuần nên ở ngang tầm mắt.','The items we wear weekly should be at eye level.','Như vậy mình sẽ không phải lục mọi ngăn.','Then we will not have to search through every shelf.',['at eye level','ngang tầm mắt']],
      ['Quần áo dự tiệc có thể treo ở bên phải.','Formal clothes can hang on the right.','Chúng ít dùng nhưng cần giữ không bị nhăn.','They are used less often but need to stay crease-free.',['formal clothes','quần áo trang trọng']],
    ]],
    ['Deciding What to Keep','Quyết định giữ đồ','Hai người xem quần áo không còn phù hợp.','Chọn sửa, tặng hoặc tái chế.',[
      ['Chiếc quần này vẫn tốt nhưng hơi rộng.','These trousers are still in good condition but slightly loose.','Mình có thể mang đi sửa thay vì bỏ.','We could have them altered instead of discarding them.',['have altered','mang đi sửa']],
      ['Áo khoác này có một vết rách lớn.','This jacket has a large tear.','Nếu không sửa được, mình sẽ đưa đến điểm tái chế vải.','If it cannot be repaired, I will take it to textile recycling.',['textile recycling','tái chế vải']],
      ['Những chiếc áo trẻ em vẫn còn rất mới.','The children’s shirts are still nearly new.','Hãy tặng chúng cho nhóm hỗ trợ gia đình.','Let us donate them to the family support group.',['donate clothing','tặng quần áo']],
    ]],
    ['Storing Seasonal Clothes','Cất đồ theo mùa','Thời tiết ấm lên nên đồ đông được cất.','Giặt, dán nhãn và tránh ẩm.',[
      ['Áo len đã sạch hết chưa?','Have all the jumpers been washed?','Rồi, chúng đã khô hoàn toàn trước khi cất.','Yes. They are completely dry before storage.',['seasonal storage','cất đồ theo mùa']],
      ['Mình sẽ dùng hộp trong suốt có nắp.','I will use clear boxes with lids.','Hãy dán nhãn kích cỡ và loại đồ bên ngoài.','Label the size and clothing type on the outside.',['storage label','nhãn hộp cất']],
      ['Tủ phía trên có hơi ẩm không?','Is the upper cupboard damp?','Không, nhưng mình sẽ thêm một gói hút ẩm.','No, but I will add a moisture absorber.',['moisture absorber','gói hút ẩm']],
    ]],
  ]}),
  t({id:'visiting-an-optician',title:'Visiting an Optician',titleVi:'Đi khám mắt',category:'Health',icon:'👓',level:'A2',description:'Mô tả thị lực, làm kiểm tra và chọn kính.',grammar:['present-perfect','comparatives','describing-symptoms'],scenarios:[
    ['Describing Vision Changes','Mô tả thay đổi thị lực','Khách thấy khó đọc màn hình.','Nói khi nào và ở khoảng cách nào vấn đề xảy ra.',[
      ['Gần đây chữ trên màn hình trông hơi mờ.','Text on screens has looked slightly blurred recently.','Điều đó xảy ra khi nhìn gần hay nhìn xa?','Does that happen when you look at nearby or distant objects?',['blurred vision','thị lực mờ']],
      ['Chủ yếu khi đọc gần vào cuối ngày.','It mainly happens when I read closely at the end of the day.','Bạn có bị đau đầu sau khi làm việc không?','Do you get headaches after working?',['eye strain','mỏi mắt']],
      ['Có, cơn đau thường ở quanh mắt.','Yes. The discomfort is usually around my eyes.','Tôi sẽ kiểm tra cả thị lực gần và cách hai mắt phối hợp.','I will test both your near vision and how your eyes work together.',['near vision','thị lực gần']],
    ]],
    ['Taking the Eye Test','Làm kiểm tra mắt','Chuyên viên hướng dẫn đọc bảng và đổi kính thử.','So sánh độ rõ giữa các lựa chọn.',[
      ['Hãy che mắt trái và đọc dòng nhỏ nhất bạn thấy.','Cover your left eye and read the smallest line you can see.','Mình đọc được bốn chữ đầu nhưng chữ cuối bị mờ.','I can read the first four letters, but the final one is unclear.',['eye chart','bảng đo thị lực']],
      ['Hình rõ hơn với thấu kính một hay hai?','Is the image clearer with lens one or lens two?','Thấu kính hai rõ hơn một chút.','Lens two is slightly clearer.',['corrective lens','thấu kính điều chỉnh']],
      ['Bây giờ các vòng tròn có nằm cùng một hàng không?','Are the circles aligned in one row now?','Có, chúng không còn lệch nhau nữa.','Yes. They no longer appear offset from each other.',['appear aligned','trông thẳng hàng']],
    ]],
    ['Choosing New Glasses','Chọn kính mới','Khách thử gọng cho công việc máy tính.','Chọn độ vừa và loại tròng phù hợp.',[
      ['Gọng này có quá rộng với mặt mình không?','Is this frame too wide for my face?','Nó hơi trượt ở sống mũi khi bạn cúi xuống.','It slides slightly down the bridge of your nose when you look down.',['glasses frame','gọng kính']],
      ['Gọng nhỏ hơn này cảm thấy chắc hơn.','This smaller frame feels more secure.','Nó cũng giữ tâm tròng kính đúng trước mắt.','It also keeps the lens centres correctly in front of your eyes.',['secure fit','độ vừa chắc chắn']],
      ['Tôi có cần lớp phủ chống phản chiếu không?','Do I need an anti-reflective coating?','Nó có thể giảm ánh chói nếu bạn dùng màn hình nhiều.','It may reduce glare if you spend long periods using screens.',['reduce glare','giảm ánh chói']],
    ]],
  ]}),
  t({id:'booking-a-sports-court',title:'Booking a Sports Court',titleVi:'Đặt sân thể thao',category:'Fitness',icon:'🏸',level:'A2',description:'Tìm giờ trống, chọn thời lượng và hiểu quy định hủy.',grammar:['time-questions','future-arrangements','conditionals'],scenarios:[
    ['Finding an Available Time','Tìm giờ trống','Nhóm muốn đặt sân cầu lông cuối tuần.','Tìm khung giờ và số sân phù hợp.',[
      ['Sáng Chủ nhật còn sân nào trống không?','Are any badminton courts available on Sunday morning?','Sân số hai còn trống từ chín đến mười giờ.','Court two is available from nine until ten.',['court availability','tình trạng sân']],
      ['Mình cần đặt hai sân cho tám người.','We need two courts for eight people.','Sân thứ hai chỉ trống từ chín giờ rưỡi.','A second court becomes available only at nine thirty.',['second court','sân thứ hai']],
      ['Vậy cả hai sân có thể bắt đầu lúc chín rưỡi chứ?','Could both courts start at nine thirty, then?','Có, tôi có thể giữ chúng trong một giờ.','Yes. I can reserve them for one hour.',['reserve a court','giữ sân']],
    ]],
    ['Adding Equipment','Thêm dụng cụ','Một số người không có vợt riêng.','Thuê đủ dụng cụ và kiểm tra phí.',[
      ['Chúng tôi có thể thuê vợt tại trung tâm không?','Can we hire rackets at the centre?','Có, mỗi chiếc có giá bốn mươi nghìn đồng.','Yes. Each racket costs forty thousand dong to hire.',['equipment hire','thuê dụng cụ']],
      ['Giá đó có bao gồm cầu không?','Does that price include shuttlecocks?','Không, một ống cầu được bán riêng.','No. A tube of shuttlecocks is sold separately.',['shuttlecock tube','ống cầu']],
      ['Hãy thêm bốn chiếc vợt vào đơn đặt.','Please add four rackets to the booking.','Tôi sẽ để chúng sẵn tại quầy tiếp tân.','I will have them ready at reception.',['booking extra','dịch vụ thêm']],
    ]],
    ['Changing the Booking','Đổi lịch đặt sân','Một thành viên bị ốm trước ngày chơi.','Giảm số sân mà không mất toàn bộ phí.',[
      ['Chúng tôi chỉ cần một sân vào ngày mai.','We will need only one court tomorrow.','Bạn đang gọi trước thời hạn hủy hai mươi bốn giờ.','You are calling before the twenty-four-hour cancellation deadline.',['cancellation deadline','hạn hủy']],
      ['Vậy phí sân thứ hai có được hoàn không?','Will the fee for the second court be refunded?','Có, khoản hoàn sẽ về phương thức thanh toán ban đầu.','Yes. The refund will go to the original payment method.',['original payment method','phương thức thanh toán ban đầu']],
      ['Giờ của sân còn lại vẫn giữ nguyên chứ?','Will the remaining court keep the same time?','Đúng, sân số hai vẫn được đặt lúc chín rưỡi.','Correct. Court two remains booked for nine thirty.',['remaining booking','lịch còn lại']],
    ]],
  ]}),
  t({id:'planning-a-product-launch',title:'Planning a Product Launch',titleVi:'Lên kế hoạch ra mắt sản phẩm',category:'Work',icon:'🚀',level:'B1',description:'Xác định đối tượng, phối hợp kênh và đo kết quả ra mắt.',grammar:['future-forms','conditionals','project-language'],scenarios:[
    ['Defining the Audience','Xác định đối tượng','Đội chuẩn bị ra mắt một ứng dụng học tập.','Chọn nhóm người dùng đầu tiên và nhu cầu chính.',[
      ['Sản phẩm này nên nhắm đến ai trong đợt đầu?','Who should this product target in its first release?','Những người đi làm đang học trong thời gian ngắn mỗi ngày.','Working adults who study in short daily sessions.',['target audience','đối tượng mục tiêu']],
      ['Vấn đề quan trọng nhất của họ là gì?','What is their most important problem?','Họ khó duy trì thói quen khi lịch làm việc thay đổi.','They struggle to maintain a habit when their work schedule changes.',['user need','nhu cầu người dùng']],
      ['Thông điệp không nên hứa rằng họ sẽ thành thạo ngay.','The message should not promise that they will become fluent immediately.','Đúng, hãy nhấn mạnh sự tiến bộ đều trong thời gian thực tế.','Agreed. We should emphasize steady progress within realistic time limits.',['realistic promise','lời hứa thực tế']],
      ['Mình sẽ kiểm tra thông điệp với mười người dùng hiện tại.','I will test the message with ten current users.','Phản hồi của họ sẽ cho biết ngôn ngữ có phù hợp không.','Their feedback will indicate whether the wording resonates.',['message testing','kiểm tra thông điệp']],
    ]],
    ['Coordinating the Channels','Phối hợp kênh truyền thông','Website, email và mạng xã hội cần cùng thời điểm.','Giao chủ sở hữu và phụ thuộc.',[
      ['Trang ra mắt phải hoàn tất trước khi email được gửi.','The launch page must be complete before the email is sent.','Đội web có thể bàn giao bản cuối vào thứ Tư.','The web team can deliver the final version on Wednesday.',['launch page','trang ra mắt']],
      ['Ai sẽ kiểm tra mọi đường dẫn theo dõi?','Who will verify all of the tracking links?','Mai sẽ kiểm tra chúng trong môi trường thử nghiệm.','Mai will validate them in the staging environment.',['tracking link','đường dẫn theo dõi']],
      ['Bài mạng xã hội có thể được lên lịch trước không?','Can the social posts be scheduled in advance?','Có, nhưng nội dung phải chờ ảnh sản phẩm được duyệt.','Yes, but the copy depends on the product images being approved.',['content dependency','phụ thuộc nội dung']],
      ['Hãy ghi mỗi phụ thuộc cùng thời hạn và người chịu trách nhiệm.','Let us record each dependency with its deadline and owner.','Như vậy một chậm trễ sẽ không bị phát hiện quá muộn.','That will prevent a delay from being discovered too late.',['launch dependency','phụ thuộc ra mắt']],
    ]],
    ['Measuring the Launch','Đo kết quả ra mắt','Đội chọn chỉ số cho tuần đầu.','Phân biệt sự chú ý với hành vi có giá trị.',[
      ['Số lượt xem trang có đủ để đánh giá thành công không?','Are page views enough to judge whether the launch succeeds?','Không, lượt xem không cho biết người dùng có thử sản phẩm.','No. Views do not show whether people actually try the product.',['success metric','chỉ số thành công']],
      ['Mình nên theo dõi tỷ lệ bắt đầu bài học đầu tiên.','We should track the proportion who start their first lesson.','Và tỷ lệ quay lại trong vòng ba ngày.','We should also measure how many return within three days.',['return rate','tỷ lệ quay lại']],
      ['Mục tiêu ban đầu nên dựa trên dữ liệu nào?','Which data should inform our initial target?','Hãy dùng hành vi của nhóm thử nghiệm thay vì đoán.','Use the behaviour of the pilot group rather than guessing.',['pilot benchmark','mốc nhóm thử nghiệm']],
      ['Sau một tuần mình sẽ xem cả số liệu và phản hồi.','After one week, we will review both the figures and the feedback.','Cách đó kết hợp quy mô với lý do đằng sau hành vi.','That combines scale with the reasons behind the behaviour.',['qualitative feedback','phản hồi định tính']],
    ]],
  ]}),
  t({id:'discussing-salary-expectations',title:'Discussing Salary Expectations',titleVi:'Trao đổi kỳ vọng lương',category:'Work',icon:'💼',level:'B1',description:'Nêu kỳ vọng dựa trên phạm vi vai trò và tổng đãi ngộ.',grammar:['comparatives','polite-negotiation','conditionals'],scenarios:[
    ['Understanding the Range','Hiểu khoảng lương','Ứng viên hỏi về ngân sách cho vai trò.','Làm rõ mức cơ bản và cách xác định đề nghị.',[
      ['Bạn có thể chia sẻ khoảng lương cho vị trí này không?','Could you share the salary range budgeted for this position?','Mức cơ bản nằm trong khoảng bốn mươi đến năm mươi triệu mỗi tháng.','The base salary ranges from forty to fifty million dong per month.',['salary range','khoảng lương']],
      ['Điều gì quyết định một đề nghị ở đầu trên của khoảng?','What would justify an offer at the upper end of that range?','Kinh nghiệm dẫn dắt dự án tương tự và kỹ năng chuyên môn hiếm.','Experience leading similar projects and scarce specialist skills.',['upper end','đầu trên']],
      ['Vai trò này bao gồm quản lý nhân sự ngay không?','Does the role include people management from the start?','Ban đầu bạn sẽ dẫn dắt kỹ thuật mà không quản lý trực tiếp.','Initially, you would provide technical leadership without direct reports.',['direct report','nhân viên báo cáo trực tiếp']],
      ['Thông tin đó giúp mình so sánh đúng phạm vi trách nhiệm.','That helps me compare the scope of responsibility accurately.','Chúng tôi muốn kỳ vọng dựa trên công việc thực tế.','We want expectations to be grounded in the actual role.',['role scope','phạm vi vai trò']],
    ]],
    ['Stating an Expectation','Nêu kỳ vọng','Nhà tuyển dụng hỏi mức lương mong muốn.','Đưa ra con số cùng lý do liên quan.',[
      ['Dựa trên phạm vi đã trao đổi, kỳ vọng của bạn là gì?','Based on the scope we discussed, what are your expectations?','Tôi đang hướng đến mức cơ bản khoảng bốn mươi tám triệu.','I am targeting a base salary of around forty-eight million dong.',['target salary','mức lương mục tiêu']],
      ['Bạn có thể giải thích cơ sở của con số đó không?','Could you explain the basis for that figure?','Nó phản ánh sáu năm kinh nghiệm và trách nhiệm dẫn dắt kỹ thuật.','It reflects six years of experience and the technical leadership responsibility.',['justify a figure','giải thích con số']],
      ['Mức đó gần đầu trên ngân sách của chúng tôi.','That is close to the upper end of our budget.','Tôi sẵn sàng xem xét tổng gói đãi ngộ, không chỉ lương cơ bản.','I am open to considering the overall package rather than base salary alone.',['overall package','tổng gói đãi ngộ']],
      ['Cách tiếp cận đó cho phép chúng ta xem thêm thưởng và phúc lợi.','That approach allows us to consider the bonus and benefits as well.','Đúng, giá trị và điều kiện của từng phần đều quan trọng.','Exactly. The value and conditions of each element matter.',['compensation element','thành phần đãi ngộ']],
    ]],
    ['Reviewing an Offer','Xem đề nghị','Ứng viên nhận đề nghị thấp hơn kỳ vọng một chút.','Hỏi khả năng điều chỉnh có căn cứ.',[
      ['Cảm ơn đề nghị; tôi rất hào hứng với vai trò.','Thank you for the offer. I am genuinely excited about the role.','Tôi rất vui khi nghe bạn vẫn quan tâm.','I am pleased to hear that you remain interested.',['express enthusiasm','thể hiện hứng thú']],
      ['Mức cơ bản thấp hơn kỳ vọng của tôi ba triệu.','The base salary is three million below my expectation.','Phần nào của đề nghị bạn muốn chúng tôi xem lại?','Which aspect of the offer would you like us to reconsider?',['reconsider an offer','xem lại đề nghị']],
      ['Nếu mức cơ bản không thể đổi, ngày xem xét lương có thể sớm hơn không?','If the base cannot change, could the salary review take place earlier?','Chúng tôi có thể cân nhắc mốc sáu tháng với mục tiêu rõ.','We could consider a six-month review tied to clear objectives.',['salary review','xem xét lương']],
      ['Tôi muốn các mục tiêu và cơ chế điều chỉnh được ghi bằng văn bản.','I would like the objectives and adjustment process recorded in writing.','Điều đó hợp lý; chúng tôi sẽ bổ sung vào thư đề nghị.','That is reasonable. We will add it to the offer letter.',['written term','điều khoản bằng văn bản']],
    ]],
  ]}),
  t({id:'appealing-a-parking-fine',title:'Appealing a Parking Fine',titleVi:'Khiếu nại phạt đỗ xe',category:'Community',icon:'🅿️',level:'B1',description:'Kiểm tra căn cứ, trình bày bằng chứng và theo dõi quyết định.',grammar:['past-simple','formal-writing','passive-voice'],scenarios:[
    ['Reviewing the Notice','Xem thông báo phạt','Người lái nhận thông báo vì quá giờ.','Kiểm tra thời gian, địa điểm và lý do.',[
      ['Thông báo nói xe ở lại sau khi vé hết hạn mười phút.','The notice says that the car remained ten minutes after the ticket expired.','Ảnh của nhân viên ghi thời gian nào?','What time is shown in the officer’s photographs?',['penalty notice','thông báo phạt']],
      ['Ảnh đầu chụp lúc 14:02 và ảnh sau lúc 14:12.','The first was taken at 14:02 and the second at 14:12.','Vé giấy của bạn có hiệu lực đến mấy giờ?','Until what time was your paper ticket valid?',['valid until','có hiệu lực đến']],
      ['Vé ghi 14:15 nên dường như chưa hết hạn.','It shows 14:15, so it appears not to have expired.','Có thể máy đã ghi sai biển số hoặc thời gian.','The machine may have recorded the registration or time incorrectly.',['record incorrectly','ghi nhận sai']],
      ['Tôi sẽ giữ cả vé gốc và phong bì thông báo.','I will keep both the original ticket and the notice envelope.','Những tài liệu đó giúp chứng minh chuỗi thời gian.','Those documents will help establish the timeline.',['supporting evidence','bằng chứng hỗ trợ']],
    ]],
    ['Writing the Appeal','Viết đơn khiếu nại','Người lái điền biểu mẫu trực tuyến.','Trình bày sự kiện ngắn gọn và yêu cầu rõ.',[
      ['Mình nên mở đầu bằng việc nói mức phạt không công bằng không?','Should I begin by saying that the fine is unfair?','Tốt hơn là nêu lý do cụ thể khiến thông báo có thể sai.','It is better to state the specific reason the notice may be incorrect.',['grounds for appeal','căn cứ khiếu nại']],
      ['Tôi sẽ ghi rằng vé có hiệu lực sau thời gian quan sát.','I will state that the ticket remained valid beyond the observation period.','Sau đó dẫn ngày giờ hiển thị trên từng tài liệu.','Then cite the date and time shown on each document.',['observation period','thời gian quan sát']],
      ['Tôi có nên đính kèm ảnh toàn bộ vé không?','Should I attach a photograph of the entire ticket?','Có, bảo đảm mã giao dịch và biển số đều đọc được.','Yes. Make sure the transaction code and registration are legible.',['legible evidence','bằng chứng đọc được']],
      ['Yêu cầu cuối nên là hủy thông báo phải không?','Should the final request be for the notice to be cancelled?','Đúng, hãy yêu cầu hủy dựa trên bằng chứng đã cung cấp.','Yes. Request cancellation on the basis of the evidence provided.',['request cancellation','yêu cầu hủy']],
    ]],
    ['Following the Decision','Theo dõi quyết định','Cơ quan trả lời nhưng chưa giải thích đầy đủ.','Yêu cầu lý do và hiểu bước tiếp theo.',[
      ['Email nói khiếu nại bị từ chối nhưng không nêu lý do.','The email says that the appeal was rejected without giving a reason.','Quyết định có kèm đường dẫn đến bằng chứng được xem xét không?','Does the decision link to the evidence that was considered?',['appeal decision','quyết định khiếu nại']],
      ['Không, nó chỉ lặp lại nội dung thông báo ban đầu.','No. It merely repeats the wording of the original notice.','Bạn có thể yêu cầu bản giải thích và hồ sơ ảnh đầy đủ.','You can request an explanation and the complete photographic record.',['decision rationale','lý do quyết định']],
      ['Hạn để yêu cầu xem xét độc lập là khi nào?','What is the deadline for requesting an independent review?','Bạn có hai mươi tám ngày kể từ ngày ghi trên quyết định.','You have twenty-eight days from the date of the decision.',['independent review','xem xét độc lập']],
      ['Tôi sẽ gửi yêu cầu hôm nay và lưu biên nhận.','I will submit the request today and save the receipt.','Việc đó sẽ chứng minh bạn đã hành động trong thời hạn.','That will demonstrate that you acted within the deadline.',['meet a deadline','đúng thời hạn']],
    ]],
  ]}),
  t({id:'supporting-a-grieving-friend',title:'Supporting a Grieving Friend',titleVi:'Đồng hành cùng người bạn đang chịu mất mát',category:'Friends & Social Life',icon:'🕯️',level:'B1',description:'Lắng nghe, đề nghị hỗ trợ cụ thể và tôn trọng nhịp hồi phục.',grammar:['empathetic-language','modals','present-perfect'],scenarios:[
    ['Reaching Out Gently','Chủ động hỏi thăm','Một người bạn vừa mất người thân.','Thể hiện quan tâm mà không ép họ trả lời.',[
      ['Mình vừa nghe tin về bố của bạn và rất tiếc.','I have just heard about your father, and I am deeply sorry.','Cảm ơn bạn; mọi thứ vẫn cảm thấy khó tin.','Thank you. Everything still feels difficult to take in.',['express sympathy','bày tỏ chia buồn']],
      ['Bạn không cần trả lời ngay, mình chỉ muốn bạn biết mình ở đây.','You do not need to reply now; I simply wanted you to know that I am here.','Điều đó có ý nghĩa vì mình chưa sẵn sàng nói nhiều.','That means a great deal, because I am not ready to talk much.',['give space','cho không gian riêng']],
      ['Mình có thể gọi lại sau vài ngày nếu bạn muốn.','I could check in again in a few days if that would help.','Có, một tin nhắn ngắn vào cuối tuần sẽ tốt.','Yes. A brief message at the weekend would be welcome.',['check in gently','hỏi thăm nhẹ nhàng']],
      ['Mình sẽ làm vậy và không mong bạn phải tiếp chuyện.','I will do that without expecting you to hold a conversation.','Cảm ơn vì đã hiểu mình có thể cần yên lặng.','Thank you for understanding that I may need quiet.',['respect silence','tôn trọng sự im lặng']],
    ]],
    ['Offering Practical Help','Đề nghị giúp thiết thực','Người bạn đang phải xử lý nhiều việc trong gia đình.','Đưa ra lựa chọn cụ thể thay vì câu hỏi chung.',[
      ['Tuần này có việc thực tế nào mình có thể làm giúp không?','Is there a practical task I could take care of this week?','Mình đang gặp khó với việc nấu ăn cho cả nhà.','I am finding it difficult to prepare meals for everyone.',['practical support','hỗ trợ thiết thực']],
      ['Mình có thể mang bữa tối vào thứ Tư hoặc thứ Sáu.','I can bring dinner on either Wednesday or Friday.','Thứ Tư sẽ hữu ích vì hôm đó gia đình có buổi gặp.','Wednesday would help, because the family has an appointment that day.',['bring a meal','mang bữa ăn']],
      ['Có dị ứng hoặc món nào mọi người không ăn không?','Are there any allergies or foods that the family avoids?','Mẹ mình không ăn sữa, còn lại mọi người khá linh hoạt.','My mother does not eat dairy; everyone else is fairly flexible.',['dietary need','nhu cầu ăn uống']],
      ['Mình sẽ làm món không có sữa và để trong hộp dễ hâm.','I will make something dairy-free in containers that are easy to reheat.','Như vậy sẽ giảm được một quyết định trong ngày khó khăn.','That will remove one decision on a difficult day.',['reduce a burden','giảm gánh nặng']],
    ]],
    ['Staying Present Over Time','Tiếp tục đồng hành','Vài tuần đã qua và sự hỗ trợ ban đầu giảm dần.','Duy trì liên hệ mà không đặt thời hạn cho nỗi buồn.',[
      ['Mọi người đã quay lại cuộc sống thường ngày, nhưng bạn thế nào?','Others have returned to their routines, but how are you doing?','Có những ngày ổn hơn, rồi một ký ức lại khiến mình suy sụp.','Some days are easier, and then a memory overwhelms me again.',['grief comes in waves','nỗi buồn đến theo đợt']],
      ['Bạn không cần phải tiến bộ theo một đường thẳng.','You do not have to recover in a straight line.','Mình lo rằng mọi người nghĩ mình nên ổn rồi.','I worry that people think I should be fine by now.',['no fixed timeline','không có thời hạn cố định']],
      ['Mình sẽ không đặt thời hạn cho cảm xúc của bạn.','I will not place a deadline on what you are feeling.','Mình trân trọng việc bạn vẫn nhắc đến bố mình.','I appreciate that you are still willing to mention my father.',['acknowledge a loss','thừa nhận mất mát']],
      ['Nếu muốn, tuần tới mình có thể đi bộ cùng nhau.','If you would like, we could take a walk together next week.','Một buổi đi bộ yên tĩnh nghe vừa sức với mình.','A quiet walk sounds manageable to me.',['manageable plan','kế hoạch vừa sức']],
    ]],
  ]}),
  t({id:'comparing-energy-providers',title:'Comparing Energy Providers',titleVi:'So sánh nhà cung cấp năng lượng',category:'Home',icon:'⚡',level:'B1',description:'So sánh đơn giá, hợp đồng và nguồn năng lượng bằng tổng chi phí.',grammar:['comparatives','conditionals','data-language'],scenarios:[
    ['Reading the Tariff','Đọc biểu giá','Một gia đình xem đề nghị điện mới.','Hiểu đơn giá và phí cố định.',[
      ['Đề nghị này quảng cáo giá điện thấp hơn mười phần trăm.','This offer advertises an electricity rate that is ten percent lower.','Mức giảm đó áp dụng cho đơn giá hay toàn bộ hóa đơn?','Does that reduction apply to the unit rate or the entire bill?',['unit rate','đơn giá']],
      ['Nó chỉ áp dụng cho mỗi kilowatt giờ sử dụng.','It applies only to each kilowatt-hour consumed.','Phí cố định hàng ngày lại cao hơn gói hiện tại.','The daily standing charge is higher than on our current plan.',['standing charge','phí cố định']],
      ['Vậy hộ dùng ít điện có thể không tiết kiệm.','Then a low-usage household might not save anything.','Đúng, cần tính bằng lượng dùng thực tế của mình.','Exactly. We need to calculate the cost using our actual consumption.',['actual consumption','mức dùng thực tế']],
      ['Mình sẽ lấy số kilowatt giờ từ hóa đơn cả năm.','I will take the kilowatt-hour figure from our annual statement.','Một năm đầy đủ sẽ giảm ảnh hưởng của mùa.','A full year will reduce the effect of seasonal variation.',['annual statement','bảng kê năm']],
    ]],
    ['Checking Contract Terms','Kiểm tra điều khoản','Hai gói có thời hạn và phí rời đi khác nhau.','Đánh giá tính linh hoạt cùng giá.',[
      ['Giá cố định này được giữ trong bao lâu?','How long is this fixed price guaranteed?','Mười tám tháng kể từ ngày chuyển nhà cung cấp.','For eighteen months from the date of the switch.',['fixed tariff','biểu giá cố định']],
      ['Nếu chuyển nhà trong thời hạn đó thì sao?','What happens if we move during that period?','Bạn có thể chuyển hợp đồng sang địa chỉ mới mà không mất phí.','You can transfer the contract to the new address without a fee.',['transfer a contract','chuyển hợp đồng']],
      ['Phí rời gói sớm là bao nhiêu?','How much is the early-exit charge?','Mỗi loại năng lượng bị tính một khoản riêng.','A separate charge applies to each type of energy.',['exit charge','phí rời gói']],
      ['Gói biến đổi không có phí nhưng giá có thể tăng.','The variable plan has no exit fee, but its price may rise.','Vậy tính linh hoạt đi kèm ít chắc chắn hơn.','Then greater flexibility comes with less price certainty.',['price certainty','sự chắc chắn về giá']],
    ]],
    ['Assessing Green Claims','Đánh giá tuyên bố xanh','Nhà cung cấp nói điện hoàn toàn tái tạo.','Tìm bằng chứng và tránh chỉ dựa nhãn quảng cáo.',[
      ['“Một trăm phần trăm xanh” nghĩa chính xác là gì?','What exactly does “one hundred percent green” mean here?','Họ mua chứng chỉ tương ứng với lượng điện khách dùng.','They purchase certificates matching the electricity their customers consume.',['renewable certificate','chứng chỉ tái tạo']],
      ['Điện có đến trực tiếp từ các dự án của họ không?','Does the electricity come directly from projects they operate?','Chỉ một phần; phần còn lại được hỗ trợ qua thị trường chứng chỉ.','Only partly. The remainder is supported through the certificate market.',['energy source','nguồn năng lượng']],
      ['Họ có đầu tư vào công suất mới không?','Do they invest in new generating capacity?','Báo cáo năm liệt kê hai dự án gió đang xây dựng.','The annual report lists two wind projects under construction.',['generating capacity','công suất phát điện']],
      ['Thông tin đó có ý nghĩa hơn khẩu hiệu trên trang bán hàng.','That information is more meaningful than the slogan on the sales page.','Mình nên cân nhắc cả tác động và tổng chi phí.','We should consider both environmental impact and total cost.',['green claim','tuyên bố xanh']],
    ]],
  ]}),
  t({id:'organizing-a-study-group',title:'Organizing a Study Group',titleVi:'Tổ chức nhóm học tập',category:'Education',icon:'🧠',level:'B1',description:'Đặt mục tiêu, chia chuẩn bị và xử lý mức tham gia không đều.',grammar:['future-forms','conditionals','collaborative-language'],scenarios:[
    ['Setting a Purpose','Đặt mục đích','Sinh viên muốn học cùng trước kỳ thi.','Chọn kết quả cụ thể cho từng buổi.',[
      ['Nhóm học này nên tập trung vào ôn kiến thức hay làm đề?','Should this study group focus on reviewing content or solving practice questions?','Mình nghĩ nên kết hợp, nhưng mỗi buổi cần một mục tiêu rõ.','I think we should combine both, but each session needs a clear objective.',['session objective','mục tiêu buổi học']],
      ['Buổi đầu có thể ôn hai chương khó nhất.','The first meeting could review the two most difficult chapters.','Sau đó mình dùng câu hỏi để tìm phần chưa hiểu.','We can then use practice questions to reveal gaps in understanding.',['knowledge gap','lỗ hổng kiến thức']],
      ['Mình không muốn buổi học biến thành đọc lại giáo trình.','I do not want the session to become a rereading of the textbook.','Mỗi người nên đến với một câu hỏi và một ví dụ.','Everyone should arrive with one question and one worked example.',['worked example','ví dụ đã giải']],
      ['Mình sẽ ghi mục đích đó vào lời mời nhóm.','I will include that purpose in the group invitation.','Người tham gia sẽ biết cần chuẩn bị gì trước.','Participants will know what preparation is expected.',['preparation expectation','yêu cầu chuẩn bị']],
    ]],
    ['Sharing Preparation','Chia phần chuẩn bị','Nhóm phân công tài liệu cho bốn thành viên.','Chia việc theo khối lượng và thế mạnh.',[
      ['Chương năm dài gấp đôi các chương khác.','Chapter five is twice as long as the other chapters.','Vậy không nên giao nó cho một người duy nhất.','Then it should not be assigned to one person alone.',['divide workload','chia khối lượng']],
      ['Hai người có thể chia phần lý thuyết và bài tập.','Two people could divide the theory and the exercises.','Mình sẽ nhận bài tập vì đã làm phần lớn câu hỏi.','I will take the exercises because I have completed most of the questions.',['take a section','nhận một phần']],
      ['Ai tự tin tóm tắt chương ba?','Who feels confident summarizing chapter three?','Lan có ghi chú tốt và đồng ý dẫn phần đó.','Lan has strong notes and has agreed to lead that section.',['lead a review','dẫn phần ôn']],
      ['Hãy đặt tài liệu vào thư mục chung trước thứ Sáu.','Put the materials in the shared folder by Friday.','Như vậy mọi người có thể xem trước buổi gặp.','That will allow everyone to review them before the meeting.',['shared folder','thư mục chung']],
    ]],
    ['Balancing Participation','Cân bằng tham gia','Một vài thành viên nói nhiều hơn những người khác.','Tạo cách đóng góp công bằng mà không gây ngượng.',[
      ['Buổi trước hai người gần như không có cơ hội nói.','Two people had almost no opportunity to speak at the last session.','Mình đã chuyển chủ đề quá nhanh sau mỗi câu trả lời.','I moved on too quickly after each response.',['participation balance','cân bằng tham gia']],
      ['Mình có thể đi vòng và nghe mỗi người trước.','We could go around the group and hear from everyone first.','Cách đó cho người cần thêm thời gian một lượt rõ ràng.','That gives those who need more time a defined turn.',['structured turn','lượt có cấu trúc']],
      ['Nhưng không nên ép ai trả lời khi chưa chuẩn bị.','However, nobody should be forced to answer when unprepared.','Họ có thể chọn bỏ lượt và quay lại sau.','They can choose to pass and return to the question later.',['pass a turn','bỏ lượt']],
      ['Sau mỗi phần mình sẽ kiểm tra còn câu hỏi chưa được nghe.','After each section, I will check for questions that have not been heard.','Như vậy nhịp buổi học vẫn tiến mà không bỏ ai lại.','That keeps the session moving without leaving anyone behind.',['inclusive discussion','thảo luận bao trùm']],
    ]],
  ]}),
  t({id:'responding-to-a-data-breach',title:'Responding to a Data Breach',titleVi:'Ứng phó sự cố rò rỉ dữ liệu',category:'Technology',icon:'🛡️',level:'B2',description:'Khoanh vùng sự cố, thông báo minh bạch và rút kinh nghiệm hệ thống.',grammar:['passive-voice','incident-language','modals-of-deduction'],scenarios:[
    ['Establishing the Scope','Xác định phạm vi','Đội an ninh phát hiện truy cập bất thường.','Phân biệt điều đã biết, chưa biết và giả định.',[
      ['Cảnh báo ban đầu cho thấy một tài khoản quản trị bị truy cập.','The initial alert indicates that an administrator account was accessed.','Chúng ta đã xác nhận dữ liệu nào được xem chưa?','Have we confirmed which data was viewed?',['breach scope','phạm vi sự cố']],
      ['Nhật ký cho thấy ba bảng được truy vấn nhưng chưa rõ dữ liệu được tải xuống.','The logs show queries against three tables, but it is unclear whether data was downloaded.','Hãy giữ nguyên nhật ký trước khi thực hiện thay đổi hệ thống.','Preserve the logs before making any changes to the system.',['preserve evidence','bảo toàn bằng chứng']],
      ['Thông tin đăng nhập có thể đã bị lấy qua email giả mạo.','The credentials may have been obtained through a phishing message.','Đó vẫn là giả thuyết cho đến khi kiểm tra thiết bị và thư.','That remains a hypothesis until the device and message have been examined.',['working hypothesis','giả thuyết làm việc']],
      ['Mình cần một dòng thời gian có mức độ chắc chắn cho từng sự kiện.','We need a timeline that records the confidence level of each event.','Cách đó sẽ ngăn suy đoán bị báo cáo như dữ kiện.','That will prevent assumptions from being reported as facts.',['confidence level','mức độ chắc chắn']],
    ]],
    ['Containing the Incident','Khoanh vùng sự cố','Đội phải ngăn truy cập tiếp mà vẫn giữ dịch vụ thiết yếu.','Ưu tiên hành động có thể hoàn tác và giám sát.',[
      ['Tài khoản bị ảnh hưởng đã được vô hiệu hóa chưa?','Has the affected account been disabled?','Có, và mọi phiên đang hoạt động của nó đã bị thu hồi.','Yes, and all of its active sessions have been revoked.',['revoke a session','thu hồi phiên']],
      ['Chúng ta có cần đưa toàn bộ nền tảng ngoại tuyến không?','Do we need to take the entire platform offline?','Chưa có bằng chứng cho thấy các dịch vụ công khai đang bị kiểm soát.','There is no evidence yet that the public services are under an attacker’s control.',['containment decision','quyết định khoanh vùng']],
      ['Mình có thể hạn chế truy cập quản trị theo mạng tin cậy.','We can restrict administrative access to trusted networks.','Biện pháp đó giảm rủi ro mà không ngắt dịch vụ khách hàng.','That reduces exposure without interrupting customer services.',['restrict access','hạn chế truy cập']],
      ['Hãy tăng giám sát và chuẩn bị phương án cô lập sâu hơn.','Increase monitoring and prepare a more extensive isolation plan.','Nếu xuất hiện truy vấn mới, mình sẽ kích hoạt phương án ngay.','If new queries appear, we will activate that plan immediately.',['isolation plan','phương án cô lập']],
    ]],
    ['Communicating Responsibly','Thông báo có trách nhiệm','Tổ chức cân nhắc thông báo khách hàng.','Cung cấp điều hữu ích mà không giảm nhẹ hay phóng đại.',[
      ['Chúng ta chưa biết chắc dữ liệu đã bị sao chép, vậy có nên chờ không?','We do not yet know whether data was copied, so should we wait?','Nghĩa vụ thông báo phụ thuộc vào rủi ro, không chỉ mức chắc chắn tuyệt đối.','The notification duty depends on risk, not solely on absolute certainty.',['notification duty','nghĩa vụ thông báo']],
      ['Thông báo đầu tiên nên nói rõ điều gì chưa xác định.','The initial notice should state clearly what remains undetermined.','Nó cũng phải nêu dữ liệu có khả năng liên quan và hành động bảo vệ.','It must also identify the data potentially involved and protective actions.',['protective action','hành động bảo vệ']],
      ['Mình không nên gọi đây là sự cố nhỏ khi điều tra chưa xong.','We should not describe this as a minor incident while the investigation is incomplete.','Đúng, ngôn ngữ trấn an quá mức có thể làm mất niềm tin.','Agreed. Premature reassurance could undermine trust.',['premature reassurance','trấn an quá sớm']],
      ['Hãy cam kết thời điểm cập nhật tiếp theo dù chưa có kết luận.','Let us commit to a time for the next update even if the investigation is ongoing.','Một lịch cập nhật rõ giúp khách hàng biết khi nào có thêm thông tin.','A clear update schedule tells customers when to expect further information.',['update schedule','lịch cập nhật']],
    ]],
  ]}),
  t({id:'debating-remote-work-policy',title:'Debating a Remote Work Policy',titleVi:'Tranh luận chính sách làm việc từ xa',category:'Work',icon:'🏡',level:'B2',description:'Đánh giá hiệu quả, công bằng và nhu cầu phối hợp trong chính sách.',grammar:['concession-clauses','evidence-language','hedging'],scenarios:[
    ['Interpreting Productivity Data','Diễn giải dữ liệu năng suất','Lãnh đạo xem số liệu trước và sau làm việc từ xa.','Tránh kết luận nhân quả từ một chỉ số.',[
      ['Báo cáo cho thấy số nhiệm vụ hoàn thành tăng mười hai phần trăm.','The report shows a twelve-percent increase in completed tasks.','Điều đó không nhất thiết có nghĩa làm từ xa gây ra mức tăng.','That does not necessarily mean that remote work caused the increase.',['causal claim','tuyên bố nhân quả']],
      ['Cùng thời gian đó, đội cũng tự động hóa phần kiểm thử.','The team also automated part of its testing during the same period.','Vậy hai thay đổi đang bị trộn trong phép so sánh.','Then the comparison confounds two simultaneous changes.',['confounding factor','yếu tố gây nhiễu']],
      ['Điểm hài lòng tăng nhưng thời gian phản hồi liên đội dài hơn.','Satisfaction rose, although cross-team response times became longer.','Một chính sách cần xem cả đầu ra cá nhân lẫn phối hợp.','A policy needs to consider both individual output and coordination.',['cross-team coordination','phối hợp liên đội']],
      ['Mình nên phân tích theo loại công việc và thâm niên.','We should analyze the results by work type and tenure.','Dữ liệu tổng hợp có thể che giấu trải nghiệm rất khác nhau.','Aggregate data may conceal substantially different experiences.',['aggregate data','dữ liệu tổng hợp']],
    ]],
    ['Considering Fairness','Cân nhắc công bằng','Một số vai trò không thể làm từ xa.','Phân biệt đối xử công bằng với đối xử giống nhau.',[
      ['Đội kho phải có mặt tại chỗ trong khi đội phần mềm có thể ở nhà.','The warehouse team must be onsite while the software team can work from home.','Đưa cùng một lựa chọn cho mọi người là không khả thi.','Offering the identical option to everyone is not feasible.',['role constraint','ràng buộc vai trò']],
      ['Nhưng lợi ích linh hoạt chỉ dành cho một nhóm có thể gây bất mãn.','However, flexibility available to only one group may create resentment.','Chúng ta có thể tìm hình thức linh hoạt khác cho vai trò tại chỗ.','We could identify alternative forms of flexibility for onsite roles.',['equitable benefit','quyền lợi công bằng']],
      ['Ví dụ đổi ca dễ hơn hoặc chọn giờ bắt đầu trong một khoảng.','For example, easier shift swaps or a choice of start time within a range.','Những phương án đó nên được đồng thiết kế với nhân viên bị ảnh hưởng.','Those options should be co-designed with the employees affected.',['co-design a policy','đồng thiết kế chính sách']],
      ['Công bằng không đòi hỏi lợi ích giống hệt mà đòi hỏi nhu cầu được coi trọng.','Fairness does not require identical benefits; it requires needs to be taken seriously.','Nguyên tắc đó nên được giải thích công khai trong chính sách.','That principle should be explained transparently in the policy.',['procedural fairness','công bằng quy trình']],
    ]],
    ['Designing a Trial','Thiết kế giai đoạn thử','Các bên chưa thống nhất mô hình lâu dài.','Thử chính sách với tiêu chí và cơ chế học hỏi.',[
      ['Thay vì quyết định vĩnh viễn, mình có thể chạy thử sáu tháng.','Rather than making a permanent decision, we could run a six-month trial.','Giai đoạn thử cần giả thuyết rõ về lợi ích và rủi ro.','The trial needs explicit hypotheses about benefits and risks.',['policy trial','giai đoạn thử chính sách']],
      ['Mình sẽ đo năng suất, thời gian phối hợp và khả năng giữ người.','We will measure output, coordination time, and retention.','Hãy thêm trải nghiệm của nhân viên mới và người chăm sóc.','Include the experiences of new starters and employees with caring responsibilities.',['evaluation dimension','khía cạnh đánh giá']],
      ['Quản lý có thể thay đổi số ngày tại văn phòng giữa chừng không?','Can managers change the office-day requirement during the trial?','Chỉ khi có lý do ghi nhận và sau khi tham vấn đội.','Only for a documented reason and after consulting the team.',['documented exception','ngoại lệ có ghi nhận']],
      ['Cuối kỳ một nhóm độc lập nên xem kết quả.','An independent group should review the results at the end.','Điều đó giảm nguy cơ người đề xuất tự chọn bằng chứng có lợi.','That reduces the risk of proponents selecting only favourable evidence.',['independent review','đánh giá độc lập']],
    ]],
  ]}),
  t({id:'reviewing-a-research-proposal',title:'Reviewing a Research Proposal',titleVi:'Phản biện đề cương nghiên cứu',category:'Education',icon:'🔬',level:'B2',description:'Kiểm tra câu hỏi, phương pháp, đạo đức và sức mạnh kết luận.',grammar:['academic-hedging','passive-voice','evidence-language'],scenarios:[
    ['Testing the Research Question','Kiểm tra câu hỏi nghiên cứu','Nhóm phản biện xem câu hỏi về học trực tuyến.','Đánh giá phạm vi và khả năng đo lường.',[
      ['Câu hỏi hỏi liệu học trực tuyến có “tốt hơn” học trực tiếp không.','The question asks whether online learning is “better” than face-to-face learning.','“Tốt hơn” chưa xác định kết quả nào đang được so sánh.','“Better” does not specify which outcome is being compared.',['operational definition','định nghĩa thao tác']],
      ['Nhóm muốn đo điểm thi và mức tham gia.','The team intends to measure examination scores and engagement.','Hai kết quả đó nên được nêu riêng vì có thể đi theo hướng khác nhau.','Those outcomes should be stated separately because they may move in different directions.',['research outcome','kết quả nghiên cứu']],
      ['Đối tượng hiện bao gồm mọi sinh viên đại học.','The proposed population currently includes all university students.','Phạm vi đó quá rộng cho một nghiên cứu ở một khoa.','That scope is too broad for a study conducted in one faculty.',['study population','quần thể nghiên cứu']],
      ['Hãy giới hạn kết luận cho sinh viên năm nhất trong các môn được khảo sát.','Limit the claim to first-year students in the courses sampled.','Cách đó làm câu hỏi phù hợp hơn với dữ liệu có thể thu thập.','That makes the question more consistent with the data that can be collected.',['scope a claim','giới hạn tuyên bố']],
    ]],
    ['Examining the Method','Xem xét phương pháp','Đề cương cho sinh viên tự chọn hình thức học.','Nhận diện thiên lệch và cải thiện so sánh.',[
      ['Sinh viên được tự chọn lớp trực tuyến hoặc trực tiếp.','Students are allowed to choose either the online or face-to-face class.','Sự tự chọn có thể tạo khác biệt trước khi khóa học bắt đầu.','That self-selection may create differences before the course begins.',['selection bias','thiên lệch lựa chọn']],
      ['Nhóm sẽ thu điểm đầu vào để điều chỉnh thống kê.','The team will collect baseline scores for statistical adjustment.','Điều đó hữu ích nhưng không loại bỏ mọi khác biệt không quan sát được.','That is useful, but it will not eliminate every unobserved difference.',['baseline measure','đo lường ban đầu']],
      ['Có thể phân ngẫu nhiên sinh viên không?','Could students be randomly assigned?','Nhà trường không cho phép vì lịch và lựa chọn cá nhân.','The institution will not permit it because of timetables and student choice.',['random assignment','phân bổ ngẫu nhiên']],
      ['Vậy kết luận nên nói về mối liên hệ thay vì hiệu quả nhân quả chắc chắn.','Then the conclusion should concern association rather than definitive causal effects.','Giới hạn đó cần được nêu từ đầu đề cương.','That limitation should be explicit from the outset.',['causal limitation','giới hạn nhân quả']],
    ]],
    ['Reviewing Ethics and Burden','Xem đạo đức và gánh nặng','Nghiên cứu thu dữ liệu hoạt động học chi tiết.','Giảm dữ liệu và bảo vệ quyền từ chối.',[
      ['Đề cương thu mọi lần nhấp và thời gian xem từng trang.','The proposal collects every click and the time spent on each page.','Có phải tất cả dữ liệu đó đều cần cho câu hỏi không?','Is all of that data necessary for the research question?',['data minimization','giảm thiểu dữ liệu']],
      ['Một số trường chỉ được thu vì nền tảng cung cấp sẵn.','Some fields are included merely because the platform makes them available.','Sự sẵn có không phải là lý do đạo đức đủ để thu thập.','Availability is not a sufficient ethical justification for collection.',['ethical justification','lý do đạo đức']],
      ['Nếu sinh viên từ chối, giảng viên có biết không?','Will lecturers know which students decline to participate?','Hiện danh sách đồng ý sẽ do trợ giảng giữ.','The consent list is currently held by the teaching assistant.',['voluntary consent','đồng thuận tự nguyện']],
      ['Nên có bên độc lập quản lý đồng ý để giảm áp lực.','Consent should be managed independently to reduce perceived pressure.','Đồng thời dữ liệu học tập chỉ được chuyển sau khi đã ẩn danh.','Academic data should also be transferred only after de-identification.',['de-identify data','ẩn danh dữ liệu']],
    ]],
  ]}),
];
