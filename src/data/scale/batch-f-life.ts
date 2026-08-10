import { scaleTopic as t } from './scale-builder';

export const batchFLifeTopics = [
  t({id:'at-a-car-wash',title:'At a Car Wash',titleVi:'Ở tiệm rửa xe',category:'Services',icon:'🚙',level:'A1',description:'Chọn gói rửa, chuẩn bị xe và kiểm tra kết quả.',grammar:['would-like','imperatives','present-simple'],scenarios:[
    ['Choosing a Wash','Chọn gói rửa','Khách xem bảng dịch vụ.','Chọn vệ sinh bên ngoài hoặc cả nội thất.',[
      ['Mình muốn rửa bên ngoài xe.','I would like an exterior wash.','Gói cơ bản gồm rửa và làm khô.','The basic package includes washing and drying.',['exterior wash','rửa bên ngoài']],
      ['Gói đó có làm sạch bánh xe không?','Does that package clean the wheels?','Không, vệ sinh bánh xe nằm trong gói tiêu chuẩn.','No. Wheel cleaning is included in the standard package.',['wheel cleaning','vệ sinh bánh xe']],
      ['Vậy mình chọn gói tiêu chuẩn.','Then I will choose the standard package.','Xe của bạn sẽ sẵn sàng trong ba mươi phút.','Your car will be ready in thirty minutes.',['standard package','gói tiêu chuẩn']],
    ]],
    ['Preparing the Car','Chuẩn bị xe','Nhân viên hướng dẫn trước khi đưa xe vào.','Lấy đồ quý và đóng cửa kính.',[
      ['Mình có cần lấy đồ trong xe ra không?','Do I need to remove anything from the car?','Hãy mang theo đồ có giá trị và điện thoại.','Take your valuables and phone with you.',['valuable item','đồ có giá trị']],
      ['Các cửa sổ đã đóng hết chưa?','Are all of the windows closed?','Cửa kính sau vẫn mở một chút.','The rear window is still slightly open.',['rear window','cửa kính sau']],
      ['Mình sẽ đóng nó và để chìa khóa ở đây.','I will close it and leave the key here.','Cảm ơn, hãy giữ phiếu nhận xe này.','Thanks. Keep this collection ticket.',['collection ticket','phiếu nhận xe']],
    ]],
    ['Checking the Finish','Kiểm tra kết quả','Khách nhận lại xe sau khi rửa.','Báo một chỗ còn bẩn lịch sự.',[
      ['Xe trông sạch hơn nhiều rồi.','The car looks much cleaner now.','Chúng tôi cũng đã làm khô kính và gương.','We also dried the windows and mirrors.',['dry the mirrors','lau khô gương']],
      ['Vẫn còn một vết bẩn gần tay nắm cửa.','There is still a mark near the door handle.','Tôi xin lỗi, tôi sẽ lau lại chỗ đó ngay.','I am sorry. I will clean that spot again now.',['missed spot','chỗ bị bỏ sót']],
      ['Bây giờ đã sạch, cảm ơn bạn.','It is clean now. Thank you.','Rất vui vì mọi thứ đã ổn.','I am glad that everything is satisfactory.',['final check','kiểm tra cuối']],
    ]],
  ]}),
  t({id:'buying-stationery',title:'Buying Stationery',titleVi:'Mua văn phòng phẩm',category:'Shopping',icon:'✏️',level:'A1',description:'Tìm đồ dùng, so sánh kích cỡ và thanh toán.',grammar:['this-these','how-many','can'],scenarios:[
    ['Finding Supplies','Tìm đồ dùng','Học sinh cần bút và vở.','Tìm đúng khu trong cửa hàng.',[
      ['Bút mực xanh ở đâu?','Where are the blue pens?','Chúng ở lối số ba cạnh bút chì.','They are in aisle three beside the pencils.',['blue pen','bút mực xanh']],
      ['Ở đó có bút xóa được không?','Are there any erasable pens there?','Có, chúng nằm trên kệ trên cùng.','Yes. They are on the top shelf.',['erasable pen','bút xóa được']],
      ['Mình cũng cần một chiếc thước dài.','I also need a long ruler.','Thước được treo ở cuối lối đi.','Rulers are hanging at the end of the aisle.',['long ruler','thước dài']],
    ]],
    ['Choosing Notebooks','Chọn vở','Khách so sánh hai loại vở.','Chọn kích thước và kiểu giấy.',[
      ['Quyển vở này có bao nhiêu trang?','How many pages does this notebook have?','Nó có một trăm hai mươi trang kẻ ngang.','It has one hundred and twenty lined pages.',['lined page','trang kẻ ngang']],
      ['Mình cần loại nhỏ hơn để mang theo.','I need a smaller one to carry around.','Quyển A5 này sẽ vừa túi của bạn.','This A5 notebook will fit in your bag.',['A5 notebook','vở A5']],
      ['Bìa có đủ cứng không?','Is the cover firm enough?','Có, bìa cứng giúp các trang không bị cong.','Yes. The hard cover keeps the pages from bending.',['hard cover','bìa cứng']],
    ]],
    ['Paying at the Counter','Thanh toán ở quầy','Khách mua nhiều món nhỏ.','Đếm đồ và hỏi túi.',[
      ['Mình có ba cây bút và hai quyển vở.','I have three pens and two notebooks.','Tôi sẽ quét từng món để kiểm tra.','I will scan each item to check.',['scan an item','quét món hàng']],
      ['Bạn muốn lấy thêm một chiếc túi cho các món này không?','Would you like an extra bag for these items?','Không, mình có thể để mọi thứ trong ba lô.','No. I can put everything in my backpack.',['carry without a bag','mang không cần túi']],
      ['Mình thanh toán bằng tiền mặt nhé.','I will pay in cash, please.','Cảm ơn, đây là tiền thừa và hóa đơn.','Thank you. Here are your change and receipt.',['cash payment','thanh toán tiền mặt']],
    ]],
  ]}),
  t({id:'planting-kitchen-herbs',title:'Planting Kitchen Herbs',titleVi:'Trồng rau thơm trong bếp',category:'Home',icon:'🌿',level:'A1',description:'Chọn chậu, gieo hạt và chăm cây non.',grammar:['imperatives','need','present-simple'],scenarios:[
    ['Choosing the Pots','Chọn chậu','Hai người chuẩn bị trồng húng quế.','Dùng chậu có kích thước và thoát nước phù hợp.',[
      ['Chậu nhỏ này có đủ không?','Is this small pot large enough?','Hãy dùng chậu rộng hơn cho rễ phát triển.','Use a wider pot so the roots can grow.',['wide pot','chậu rộng']],
      ['Đáy chậu có lỗ không?','Does the bottom of the pot have holes?','Có ba lỗ để nước thừa chảy ra.','There are three holes for extra water to drain away.',['drainage hole','lỗ thoát nước']],
      ['Mình sẽ đặt một chiếc đĩa bên dưới.','I will put a saucer underneath.','Như vậy nước sẽ không chảy lên bàn.','That will stop water from reaching the table.',['plant saucer','đĩa lót chậu']],
    ]],
    ['Sowing the Seeds','Gieo hạt','Đất đã được cho vào chậu.','Gieo đúng độ sâu và khoảng cách.',[
      ['Mình gieo hạt sâu bao nhiêu?','How deep should I sow the seeds?','Chỉ phủ chúng bằng một lớp đất mỏng.','Cover them with only a thin layer of soil.',['thin soil layer','lớp đất mỏng']],
      ['Các hạt có cần cách xa nhau không?','Do the seeds need space between them?','Có, để khoảng hai centimet giữa mỗi hạt.','Yes. Leave about two centimetres between each seed.',['space seeds','giãn cách hạt']],
      ['Mình tưới nhiều nước ngay chứ?','Should I add plenty of water now?','Chỉ phun nhẹ để đất ẩm, không ướt sũng.','Mist the soil lightly so it is damp, not soaked.',['mist the soil','phun ẩm đất']],
    ]],
    ['Caring for Seedlings','Chăm cây non','Hạt đã nảy mầm sau một tuần.','Cung cấp ánh sáng và nước vừa đủ.',[
      ['Những cây non đang nghiêng về cửa sổ.','The seedlings are leaning towards the window.','Hãy xoay chậu mỗi ngày để chúng mọc thẳng.','Turn the pot each day so they grow upright.',['seedling','cây non']],
      ['Khi nào mình nên tưới thêm?','When should I water them again?','Tưới khi bề mặt đất cảm thấy khô.','Water them when the surface of the soil feels dry.',['soil surface','bề mặt đất']],
      ['Mình có thể hái lá ngay không?','Can I pick the leaves now?','Hãy đợi đến khi mỗi cây có vài lá lớn.','Wait until each plant has several full-sized leaves.',['full-sized leaf','lá trưởng thành']],
    ]],
  ]}),
  t({id:'visiting-an-aquarium',title:'Visiting an Aquarium',titleVi:'Tham quan thủy cung',category:'Entertainment',icon:'🐠',level:'A1',description:'Tìm khu trưng bày, xem giờ hoạt động và bảo vệ động vật.',grammar:['where-questions','can-cannot','time'],scenarios:[
    ['Finding the Sharks','Tìm khu cá mập','Gia đình đọc sơ đồ thủy cung.','Đi đến đường hầm cá mập.',[
      ['Khu cá mập ở đâu?','Where is the shark exhibit?','Nó ở tầng dưới, qua khu san hô.','It is downstairs beyond the coral area.',['shark exhibit','khu cá mập']],
      ['Mình đi bằng thang cuốn được không?','Can we take the escalator?','Có, nó ở phía sau bể cá lớn.','Yes. It is behind the large fish tank.',['fish tank','bể cá']],
      ['Đường hầm bắt đầu ở bên trái phải không?','Does the tunnel begin on the left?','Đúng, hãy đi theo dấu cá mập trên sàn.','Yes. Follow the shark symbols on the floor.',['aquarium tunnel','đường hầm thủy cung']],
    ]],
    ['Watching a Talk','Xem buổi giới thiệu','Khách muốn nghe nhân viên nói về rùa biển.','Hỏi giờ và điểm tập trung.',[
      ['Buổi nói về rùa bắt đầu lúc mấy giờ?','What time does the turtle talk begin?','Nó bắt đầu lúc hai giờ mười lăm.','It begins at two fifteen.',['animal talk','buổi giới thiệu động vật']],
      ['Mình nên đứng ở đâu?','Where should we stand?','Nhân viên sẽ gặp mọi người cạnh bể rùa.','The guide will meet everyone beside the turtle pool.',['meeting point','điểm tập trung']],
      ['Buổi nói kéo dài bao lâu?','How long does the talk last?','Khoảng hai mươi phút, gồm cả câu hỏi.','About twenty minutes, including questions.',['including questions','gồm phần hỏi đáp']],
    ]],
    ['Protecting the Animals','Bảo vệ động vật','Một đứa trẻ muốn chạm vào kính.','Tuân thủ quy định ánh sáng và tiếng ồn.',[
      ['Con có thể gõ lên kính không?','Can I tap on the glass?','Không, âm thanh có thể làm cá sợ.','No. The sound may frighten the fish.',['tap the glass','gõ kính']],
      ['Mình có thể chụp ảnh chứ?','May we take photographs?','Có, nhưng đừng dùng đèn flash.','Yes, but do not use a flash.',['camera flash','đèn flash']],
      ['Con sẽ đứng yên và nhìn chúng bơi.','I will stand quietly and watch them swim.','Cách đó giúp động vật không bị làm phiền.','That helps the animals remain undisturbed.',['remain undisturbed','không bị làm phiền']],
    ]],
  ]}),
  t({id:'sending-a-greeting-card',title:'Sending a Greeting Card',titleVi:'Gửi thiệp chúc mừng',category:'Friends & Social Life',icon:'💌',level:'A1',description:'Chọn thiệp, viết lời nhắn và gửi bưu điện.',grammar:['would-like','present-simple','future-will'],scenarios:[
    ['Choosing a Card','Chọn thiệp','Khách cần thiệp cho người vừa chuyển nhà.','Chọn đúng dịp và phong cách.',[
      ['Mình cần một tấm thiệp mừng nhà mới.','I need a card for someone who has moved house.','Những tấm thiệp nhà mới ở trên giá này.','The new-home cards are on this display.',['new-home card','thiệp mừng nhà mới']],
      ['Mình muốn kiểu đơn giản, không quá vui nhộn.','I would like something simple, not too playful.','Tấm này có hình ngôi nhà nhỏ và không có lời sẵn.','This one has a small house and no printed message.',['printed message','lời in sẵn']],
      ['Tốt, mình có thể tự viết bên trong.','Good. I can write my own note inside.','Một phong bì màu kem được kèm theo.','A cream envelope is included.',['matching envelope','phong bì đi kèm']],
    ]],
    ['Writing the Message','Viết lời nhắn','Người gửi muốn lời chúc ngắn và ấm áp.','Viết đủ cá nhân mà vẫn tự nhiên.',[
      ['Mình nên bắt đầu lời nhắn thế nào?','How should I begin the message?','Hãy viết rằng bạn hy vọng họ hạnh phúc trong ngôi nhà mới.','Write that you hope they will be happy in their new home.',['warm wish','lời chúc ấm áp']],
      ['Mình cũng muốn nhắc đến khu vườn đẹp.','I also want to mention their lovely garden.','Bạn có thể nói mong sớm được ngồi cùng họ ở đó.','You could say that you hope to sit there with them soon.',['personal detail','chi tiết cá nhân']],
      ['Cuối thiệp mình sẽ ký tên cả gia đình.','I will sign the card from the whole family.','Như vậy lời chúc đến từ mọi người.','That makes the greeting come from everyone.',['sign a card','ký thiệp']],
    ]],
    ['Posting the Card','Gửi thiệp','Người gửi kiểm tra địa chỉ và tem.','Gửi đúng hạng thư trước giờ lấy.',[
      ['Địa chỉ có cần mã bưu chính không?','Does the address need a postal code?','Có, hãy viết mã ở dòng cuối cùng.','Yes. Write the code on the final line.',['postal code','mã bưu chính']],
      ['Một con tem thường có đủ không?','Is one standard stamp enough?','Có, tấm thiệp nằm trong giới hạn kích thước.','Yes. The card is within the standard size limit.',['standard stamp','tem thường']],
      ['Hộp thư được lấy lúc mấy giờ?','What time is the post collected?','Lượt lấy cuối hôm nay là lúc năm giờ.','The final collection today is at five o’clock.',['final collection','lượt lấy thư cuối']],
    ]],
  ]}),
  t({id:'planning-a-camping-trip',title:'Planning a Camping Trip',titleVi:'Lên kế hoạch cắm trại',category:'Travel',icon:'⛺',level:'A2',description:'Đặt chỗ, chuẩn bị thiết bị và xử lý thời tiết.',grammar:['future-forms','should','conditionals'],scenarios:[
    ['Choosing a Campsite','Chọn khu cắm trại','Bạn bè so sánh hai khu trong công viên.','Chọn tiện nghi và vị trí phù hợp.',[
      ['Khu ven sông có nhà vệ sinh không?','Does the riverside campsite have toilets?','Có, nhưng không có vòi tắm nước nóng.','Yes, but it does not have hot showers.',['riverside campsite','khu cắm trại ven sông']],
      ['Khu trên đồi cách bãi xe bao xa?','How far is the hill campsite from the car park?','Bạn phải mang đồ đi bộ khoảng một cây số.','You have to carry your equipment for about one kilometre.',['carry equipment','mang thiết bị']],
      ['Mình có nhiều đồ nên khu ven sông thực tế hơn.','We have a lot of equipment, so the riverside site is more practical.','Đồng ý, mình sẽ đặt hai chỗ cạnh nhau.','Agreed. I will reserve two neighbouring pitches.',['camping pitch','ô cắm trại']],
    ]],
    ['Checking the Equipment','Kiểm tra thiết bị','Nhóm dựng thử lều ở nhà.','Phát hiện đồ thiếu trước chuyến đi.',[
      ['Tất cả cọc lều có trong túi không?','Are all of the tent pegs in the bag?','Thiếu hai chiếc cọc ở góc.','Two of the corner pegs are missing.',['tent peg','cọc lều']],
      ['Mình sẽ mua cọc thay thế trước thứ Sáu.','I will buy replacements before Friday.','Hãy kiểm tra cả dây kéo của tấm phủ mưa.','Check the zips on the rain cover as well.',['rain cover','tấm phủ mưa']],
      ['Bếp ga vẫn hoạt động nhưng bình gần hết.','The camping stove works, but the canister is nearly empty.','Mình nên mang một bình đầy và một bình dự phòng.','We should take one full canister and one spare.',['gas canister','bình ga']],
    ]],
    ['Adapting to Rain','Điều chỉnh khi có mưa','Dự báo mưa kéo dài trong đêm đầu.','Giữ đồ khô và có ngưỡng hủy an toàn.',[
      ['Mưa nhẹ có làm mình phải hủy không?','Will light rain force us to cancel?','Không, nếu lều chống nước và đường vẫn mở.','No, provided that the tent is waterproof and the roads remain open.',['waterproof tent','lều chống nước']],
      ['Mình sẽ để quần áo trong túi chống nước.','I will keep our clothes in waterproof bags.','Hãy đặt một bộ khô riêng cho lúc ngủ.','Keep one dry set separate for sleeping.',['dry clothing set','bộ đồ khô']],
      ['Nếu công viên phát cảnh báo lũ thì sao?','What if the park issues a flood warning?','Chúng ta sẽ hủy ngay vì khu ven sông không còn an toàn.','We will cancel immediately because the riverside site would no longer be safe.',['flood warning','cảnh báo lũ']],
    ]],
  ]}),
  t({id:'choosing-an-insurance-excess',title:'Choosing an Insurance Excess',titleVi:'Chọn mức khấu trừ bảo hiểm',category:'Services',icon:'🧾',level:'A2',description:'Cân bằng phí bảo hiểm, mức tự trả và khả năng chi trả.',grammar:['comparatives','conditionals','much-many'],scenarios:[
    ['Understanding the Excess','Hiểu mức khấu trừ','Khách xem báo giá bảo hiểm xe.','Phân biệt phí bảo hiểm và khoản tự trả.',[
      ['Mức khấu trừ năm triệu nghĩa là gì?','What does a five-million-dong excess mean?','Bạn trả năm triệu đầu tiên của một yêu cầu bồi thường.','You pay the first five million dong of a claim.',['insurance excess','mức khấu trừ']],
      ['Khoản đó được trả mỗi năm hay mỗi sự cố?','Is that amount paid each year or for each incident?','Nó áp dụng cho mỗi yêu cầu được chấp nhận.','It applies to each claim that is accepted.',['accepted claim','yêu cầu được chấp nhận']],
      ['Phí hàng tháng là khoản riêng phải không?','The monthly premium is separate, correct?','Đúng, phí duy trì hợp đồng dù bạn có yêu cầu hay không.','Yes. The premium keeps the policy active whether or not you claim.',['monthly premium','phí bảo hiểm hàng tháng']],
    ]],
    ['Comparing Two Options','So sánh hai lựa chọn','Khách cân nhắc mức tự trả thấp hoặc cao.','Tính tổng chi phí theo rủi ro thực tế.',[
      ['Mức khấu trừ thấp làm phí tăng bao nhiêu?','How much does the lower excess increase the premium?','Nó làm phí tăng hai trăm nghìn mỗi tháng.','It increases the premium by two hundred thousand dong per month.',['lower excess','mức khấu trừ thấp']],
      ['Như vậy mình trả thêm hai triệu bốn mỗi năm.','That means I pay an extra two million four hundred thousand each year.','Đổi lại, khoản tự trả khi có sự cố giảm ba triệu.','In return, your contribution after an incident falls by three million.',['policyholder contribution','phần người mua tự trả']],
      ['Tôi ít lái xe nhưng không có nhiều tiền dự phòng.','I drive infrequently, but I do not have much emergency cash.','Mức giữa có thể cân bằng rủi ro và phí tốt hơn.','The middle option may balance risk and cost more effectively.',['balance risk','cân bằng rủi ro']],
    ]],
    ['Checking Affordability','Kiểm tra khả năng chi trả','Khách kiểm tra mình có trả nổi khi có tai nạn.','Chọn mức không tạo khủng hoảng tiền mặt.',[
      ['Nếu tai nạn xảy ra ngày mai, tôi có thể trả mức này không?','Could I pay this excess if an accident happened tomorrow?','Đó là câu hỏi quan trọng hơn việc chỉ nhìn phí thấp.','That is more important than considering only the lowest premium.',['affordable excess','mức tự trả có thể chi trả']],
      ['Tôi có khoảng bốn triệu trong quỹ khẩn cấp.','I have around four million in my emergency fund.','Vậy mức khấu trừ tám triệu sẽ quá cao ở hiện tại.','Then an eight-million excess would currently be too high.',['cash reserve','khoản tiền dự phòng']],
      ['Tôi sẽ chọn mức bốn triệu và xem lại năm sau.','I will choose the four-million option and review it next year.','Bạn có thể điều chỉnh khi hoàn cảnh tài chính thay đổi.','You can adjust it when your financial circumstances change.',['review annually','xem lại hàng năm']],
    ]],
  ]}),
  t({id:'hosting-an-exchange-student',title:'Hosting an Exchange Student',titleVi:'Đón học sinh trao đổi',category:'Family',icon:'🌍',level:'A2',description:'Chuẩn bị phòng, chia sẻ nếp nhà và hỗ trợ hòa nhập.',grammar:['future-arrangements','should','polite-questions'],scenarios:[
    ['Preparing the Room','Chuẩn bị phòng','Gia đình dọn phòng trước ngày khách đến.','Cung cấp chỗ cất đồ và thông tin cần thiết.',[
      ['Phòng có đủ chỗ cho vali lớn không?','Is there enough room for a large suitcase?','Mình có thể dọn ngăn dưới của tủ quần áo.','We can clear the lower section of the wardrobe.',['clear storage space','dọn chỗ cất đồ']],
      ['Học sinh sẽ cần bàn để làm bài.','The student will need a desk for homework.','Hãy chuyển chiếc đèn bàn sang cạnh cửa sổ.','Move the desk lamp beside the window.',['study desk','bàn học']],
      ['Mình nên để mật khẩu Wi-Fi ở đâu?','Where should we leave the Wi-Fi password?','Viết nó trên tấm thẻ cùng số điện thoại gia đình.','Write it on a card with the family phone numbers.',['welcome card','thẻ chào mừng']],
    ]],
    ['Explaining House Routines','Nói về nếp nhà','Gia đình trò chuyện trong tối đầu tiên.','Giải thích quy tắc mà không khiến khách ngại.',[
      ['Mọi người thường ăn tối lúc mấy giờ?','What time does everyone usually have dinner?','Chúng tôi thường ăn khoảng bảy giờ nhưng có thể linh hoạt.','We usually eat at around seven, but we can be flexible.',['household routine','nếp sinh hoạt']],
      ['Mình có cần báo nếu về muộn không?','Should I let you know if I will be home late?','Có, chỉ cần nhắn để chúng tôi không lo.','Yes. Just send a message so that we do not worry.',['keep informed','báo thông tin']],
      ['Mình có thể dùng máy giặt vào cuối tuần chứ?','May I use the washing machine at weekends?','Tất nhiên, chúng tôi sẽ chỉ bạn chọn chế độ.','Of course. We will show you how to select a cycle.',['feel at home','cảm thấy như ở nhà']],
    ]],
    ['Helping Them Settle In','Giúp hòa nhập','Học sinh thấy hơi cô đơn sau vài ngày.','Đề nghị hoạt động mà vẫn cho không gian.',[
      ['Tuần đầu của bạn ở trường thế nào?','How has your first week at school been?','Các lớp ổn nhưng mình chưa kết bạn nhiều.','The classes are fine, but I have not made many friends yet.',['settle in','hòa nhập']],
      ['Cuối tuần có câu lạc bộ thể thao cho học sinh mới.','There is a sports club for new students this weekend.','Mình muốn thử nếu có người chỉ đường.','I would like to try it if someone can show me the way.',['new-student club','câu lạc bộ học sinh mới']],
      ['Con chúng tôi cũng đi và có thể đi cùng bạn.','Our child is going and can travel there with you.','Cảm ơn, đi cùng ai đó sẽ dễ hơn nhiều.','Thanks. Going with someone will make it much easier.',['make a connection','tạo kết nối']],
    ]],
  ]}),
  t({id:'attending-a-first-aid-course',title:'Attending a First-Aid Course',titleVi:'Tham gia khóa sơ cứu',category:'Health',icon:'🩹',level:'A2',description:'Đăng ký, thực hành kỹ năng và hiểu giới hạn hỗ trợ.',grammar:['should-must','imperatives','present-perfect'],scenarios:[
    ['Registering for the Course','Đăng ký khóa học','Người học hỏi về khóa sơ cứu cơ bản.','Chọn ngày và hiểu chứng nhận.',[
      ['Khóa này có phù hợp cho người chưa có kinh nghiệm không?','Is this course suitable for someone with no experience?','Có, nó bắt đầu từ kỹ năng sơ cứu cơ bản.','Yes. It begins with basic first-aid skills.',['basic first aid','sơ cứu cơ bản']],
      ['Khóa kéo dài bao lâu?','How long does the course last?','Nó gồm hai buổi, mỗi buổi ba giờ.','It consists of two three-hour sessions.',['course session','buổi học']],
      ['Tôi có nhận chứng nhận sau khi hoàn thành không?','Will I receive a certificate after completing it?','Có, chứng nhận có hiệu lực trong ba năm.','Yes. The certificate is valid for three years.',['valid certificate','chứng nhận có hiệu lực']],
    ]],
    ['Practising CPR','Thực hành hồi sức','Giảng viên hướng dẫn trên mô hình.','Thực hành nhịp và vị trí tay đúng.',[
      ['Tay mình nên đặt ở đâu?','Where should I place my hands?','Đặt gót bàn tay vào giữa ngực mô hình.','Place the heel of your hand in the centre of the manikin’s chest.',['hand position','vị trí tay']],
      ['Mình ấn với tốc độ nào?','How quickly should I press?','Giữ nhịp khoảng một trăm đến một trăm hai mươi lần mỗi phút.','Maintain a rate of about one hundred to one hundred and twenty compressions per minute.',['compression rate','nhịp ép tim']],
      ['Mình đang thấy vai bị mỏi.','My shoulders are becoming tired.','Giữ cánh tay thẳng và dùng trọng lượng cơ thể.','Keep your arms straight and use your body weight.',['chest compression','ép ngực']],
    ]],
    ['Knowing When to Call','Biết lúc cần gọi trợ giúp','Lớp thảo luận giới hạn của người sơ cứu.','Ưu tiên an toàn và gọi dịch vụ chuyên môn.',[
      ['Mình nên kiểm tra nguy hiểm trước khi đến gần phải không?','Should I check for danger before approaching?','Đúng, bạn không thể giúp nếu chính mình gặp nguy hiểm.','Yes. You cannot help if you also become endangered.',['scene safety','an toàn hiện trường']],
      ['Khi nào cần gọi cấp cứu?','When should emergency services be called?','Gọi ngay khi người đó bất tỉnh hoặc thở bất thường.','Call immediately if the person is unresponsive or breathing abnormally.',['unresponsive person','người không phản ứng']],
      ['Mình có nên cho họ uống thuốc không?','Should I give them any medicine?','Không, hãy ở trong phạm vi được đào tạo và làm theo hướng dẫn.','No. Stay within your training and follow professional instructions.',['scope of training','phạm vi đào tạo']],
    ]],
  ]}),
  t({id:'selling-a-used-bicycle',title:'Selling a Used Bicycle',titleVi:'Bán xe đạp cũ',category:'Shopping',icon:'🚲',level:'A2',description:'Mô tả tình trạng, sắp xếp xem xe và thanh toán an toàn.',grammar:['present-perfect','past-simple','conditionals'],scenarios:[
    ['Writing the Listing','Viết tin đăng','Người bán chuẩn bị thông tin xe.','Mô tả trung thực tình trạng và sửa chữa.',[
      ['Mình nên ghi xe đã dùng bao lâu?','Should I say how long the bicycle has been used?','Có, ghi rằng bạn đã sở hữu nó ba năm.','Yes. State that you have owned it for three years.',['used condition','tình trạng đã qua dùng']],
      ['Phanh trước vừa được thay tháng trước.','The front brake was replaced last month.','Hãy nêu việc đó và giữ hóa đơn sửa chữa.','Mention that and keep the repair receipt.',['repair receipt','hóa đơn sửa chữa']],
      ['Khung có vài vết xước nhỏ.','The frame has a few minor scratches.','Chụp ảnh rõ để người mua thấy trước.','Take clear photographs so buyers can see them in advance.',['minor scratch','vết xước nhỏ']],
    ]],
    ['Meeting a Buyer','Gặp người mua','Người mua đến thử xe tại nơi công cộng.','Kiểm tra xe an toàn và bảo vệ tài sản.',[
      ['Mình có thể đi thử quanh bãi xe không?','May I test-ride it around the car park?','Được, nhưng vui lòng để lại giấy tờ có ảnh trong lúc thử.','Yes, but please leave photo identification while you ride.',['test ride','đi thử']],
      ['Yên xe có thể hạ thấp hơn không?','Can the saddle be lowered further?','Có, tôi mang theo dụng cụ để điều chỉnh.','Yes. I have brought a tool to adjust it.',['adjust the saddle','chỉnh yên']],
      ['Các bánh răng chuyển hơi chậm ở số cao.','The gears shift a little slowly in the highest setting.','Đúng, điều đó đã được ghi rõ trong tin đăng.','Correct. That was disclosed in the listing.',['disclose a fault','nêu rõ lỗi']],
    ]],
    ['Completing the Sale','Hoàn tất giao dịch','Hai bên thống nhất giá.','Nhận tiền và ghi bằng chứng bán.',[
      ['Bạn có chấp nhận giá ba triệu rưỡi không?','Would you accept three and a half million dong?','Tôi có thể đồng ý nếu bạn tự lo việc vận chuyển.','I can agree if you arrange the transport yourself.',['agree a price','thống nhất giá']],
      ['Tôi sẽ chuyển khoản ngay và cho bạn xem xác nhận.','I will transfer the money now and show you the confirmation.','Tôi sẽ kiểm tra tiền đã vào tài khoản trước khi giao xe.','I will verify that the funds have arrived before releasing the bicycle.',['verify funds','xác minh tiền']],
      ['Mình có cần giấy biên nhận không?','Do we need a written receipt?','Có, cả hai nên giữ một bản ghi ngày, giá và số khung.','Yes. We should both retain a record of the date, price, and frame number.',['sale receipt','biên nhận bán']],
    ]],
  ]}),
  t({id:'adopting-a-rescue-cat',title:'Adopting a Rescue Cat',titleVi:'Nhận nuôi mèo cứu hộ',category:'Home',icon:'🐈',level:'A2',description:'Hiểu tính cách, chuẩn bị nhà và hỗ trợ mèo hòa nhập.',grammar:['present-perfect','should','future-forms'],scenarios:[
    ['Learning the Cat’s History','Tìm hiểu lịch sử','Gia đình nói chuyện với trung tâm cứu hộ.','Hiểu sức khỏe và hành vi đã biết.',[
      ['Con mèo này đã ở trung tâm bao lâu?','How long has this cat been at the rescue centre?','Cô ấy đã ở đây gần hai tháng.','She has been here for nearly two months.',['rescue centre','trung tâm cứu hộ']],
      ['Cô ấy có sống cùng trẻ em trước đây không?','Has she lived with children before?','Chúng tôi chưa biết, nên việc giới thiệu cần diễn ra từ từ.','We do not know, so introductions need to happen gradually.',['gradual introduction','làm quen từ từ']],
      ['Mèo có vấn đề sức khỏe nào không?','Does she have any health conditions?','Cô ấy khỏe mạnh và đã được tiêm phòng đầy đủ.','She is healthy and fully vaccinated.',['fully vaccinated','tiêm phòng đầy đủ']],
    ]],
    ['Preparing the Home','Chuẩn bị nhà','Gia đình dọn một phòng yên tĩnh.','Tạo nơi an toàn cho những ngày đầu.',[
      ['Mình nên đặt giường mèo ở đâu?','Where should we put the cat’s bed?','Đặt nó trong phòng yên tĩnh, xa cửa chính.','Place it in a quiet room away from the front door.',['safe room','phòng an toàn']],
      ['Khay vệ sinh có nên ở cạnh thức ăn không?','Should the litter tray be beside the food?','Không, hãy đặt chúng ở hai góc khác nhau.','No. Keep them in separate corners.',['litter tray','khay vệ sinh']],
      ['Mình đã che các dây điện lỏng.','I have covered the loose electrical cables.','Tốt, hãy kiểm tra cửa sổ cũng được đóng chắc.','Good. Check that the windows are also secure.',['pet-proof','làm nhà an toàn cho thú']],
    ]],
    ['The First Few Days','Những ngày đầu','Mèo trốn dưới bàn sau khi về nhà.','Cho thời gian và quan sát dấu hiệu căng thẳng.',[
      ['Cô ấy chưa ra khỏi chỗ trốn từ sáng.','She has not come out of hiding since this morning.','Điều đó có thể bình thường trong môi trường mới.','That can be normal in a new environment.',['hide away','trốn đi']],
      ['Mình có nên bế cô ấy ra không?','Should I lift her out?','Không, hãy ngồi gần và để cô ấy tự đến.','No. Sit nearby and allow her to approach you.',['approach voluntarily','tự nguyện đến gần']],
      ['Cô ấy đã ăn một ít khi phòng yên tĩnh.','She ate a little when the room was quiet.','Đó là dấu hiệu tốt; hãy giữ lịch sinh hoạt ổn định.','That is encouraging. Keep the routine consistent.',['consistent routine','nếp sinh hoạt ổn định']],
    ]],
  ]}),
  t({id:'preparing-a-community-garden',title:'Preparing a Community Garden',titleVi:'Chuẩn bị vườn cộng đồng',category:'Community',icon:'🌻',level:'A2',description:'Chọn luống, chia dụng cụ và tổ chức buổi trồng.',grammar:['future-arrangements','suggestions','have-to'],scenarios:[
    ['Assigning the Beds','Phân luống','Nhóm có sáu luống cho nhiều hộ gia đình.','Phân chia công bằng và dành khu chung.',[
      ['Mỗi gia đình có nên nhận một luống riêng không?','Should each family receive a separate bed?','Mình chỉ có sáu luống cho tám gia đình.','We have only six beds for eight families.',['garden bed','luống vườn']],
      ['Hai luống lớn có thể chia đôi.','The two larger beds could be divided in half.','Vậy mọi gia đình sẽ có một phần tương tự nhau.','Then every family will have a roughly equal section.',['divide equally','chia đều']],
      ['Hãy giữ một góc cho thảo mộc dùng chung.','Let us reserve one corner for shared herbs.','Mọi người có thể hái một lượng nhỏ khi cần.','Everyone can pick a small amount when needed.',['shared herb patch','góc rau thơm chung']],
    ]],
    ['Organizing Tools','Sắp xếp dụng cụ','Nhóm kiểm kê đồ làm vườn.','Chia sẻ dụng cụ và theo dõi mượn trả.',[
      ['Mình có bao nhiêu chiếc xẻng nhỏ?','How many hand trowels do we have?','Có bốn chiếc tốt và một chiếc cần thay cán.','We have four good ones and one that needs a new handle.',['hand trowel','xẻng nhỏ']],
      ['Ai có thể mang bình tưới vào ngày trồng?','Who can bring watering cans on planting day?','Hai người đã đăng ký mang tổng cộng ba chiếc.','Two people have offered to bring three altogether.',['watering can','bình tưới']],
      ['Dụng cụ chung nên được đánh dấu tên vườn.','Shared tools should be marked with the garden name.','Mình cũng sẽ tạo một bảng mượn đơn giản.','I will also create a simple borrowing sheet.',['tool register','bảng mượn dụng cụ']],
    ]],
    ['Planning Planting Day','Lên kế hoạch ngày trồng','Nhóm chọn việc cho buổi sáng thứ Bảy.','Xếp thứ tự chuẩn bị đất và trồng cây.',[
      ['Việc nào cần làm trước khi trồng?','Which task needs to be completed before planting?','Chúng ta phải nhổ cỏ và trộn phân ủ vào đất.','We have to remove weeds and mix compost into the soil.',['mix compost','trộn phân ủ']],
      ['Nhóm đầu có thể bắt đầu lúc tám giờ.','The first group can begin at eight o’clock.','Nhóm trồng cây sẽ đến sau khoảng một giờ.','The planting group will arrive about one hour later.',['planting group','nhóm trồng cây']],
      ['Nếu trời mưa lớn thì sao?','What happens if it rains heavily?','Mình sẽ chuyển sang Chủ nhật và báo trước tối thứ Sáu.','We will move the event to Sunday and confirm on Friday evening.',['rain date','ngày dự phòng mưa']],
    ]],
  ]}),
  t({id:'negotiating-flexible-hours',title:'Negotiating Flexible Hours',titleVi:'Thương lượng giờ làm linh hoạt',category:'Work',icon:'🕘',level:'B1',description:'Đề xuất lịch làm, giải quyết lo ngại và đặt giai đoạn thử.',grammar:['conditionals','polite-negotiation','future-forms'],scenarios:[
    ['Explaining the Need','Nêu nhu cầu','Nhân viên muốn bắt đầu và kết thúc sớm hơn.','Giải thích nhu cầu mà không chia sẻ quá mức.',[
      ['Tôi muốn thảo luận khả năng chuyển giờ làm sớm hơn.','I would like to discuss the possibility of shifting my working hours earlier.','Bạn đang đề xuất khung giờ cụ thể nào?','What specific schedule are you proposing?',['flexible hours','giờ làm linh hoạt']],
      ['Tôi muốn làm từ bảy rưỡi đến bốn giờ.','I would like to work from seven thirty until four.','Sự thay đổi đó giúp bạn giải quyết điều gì?','What would that change enable you to manage?',['proposed schedule','lịch đề xuất']],
      ['Nó giúp tôi chia việc đưa đón người thân mà vẫn làm đủ giờ.','It would allow me to share family transport while still working my full hours.','Cảm ơn, tôi không cần thêm chi tiết cá nhân ngoài điều đó.','Thank you. I do not need further personal details beyond that.',['full working hours','đủ giờ làm']],
      ['Tôi muốn tìm một thỏa thuận ổn định thay vì xin đổi từng ngày.','I am hoping for a consistent arrangement rather than requesting changes each day.','Một lịch ổn định cũng sẽ dễ lập kế hoạch hơn cho đội.','A consistent schedule would also be easier for the team to plan around.',['consistent arrangement','thỏa thuận ổn định']],
    ]],
    ['Addressing Coverage','Giải quyết thời gian phối hợp','Quản lý lo thiếu người vào cuối ngày.','Bảo đảm cuộc họp và hỗ trợ khách hàng.',[
      ['Đội thường có yêu cầu khách hàng sau bốn giờ.','The team often receives customer requests after four o’clock.','Tôi có thể chuyển các hồ sơ cuối ngày cho đồng nghiệp theo ca.','I could hand over late cases to a colleague on the later shift.',['handover coverage','bàn giao ca']],
      ['Điều đó cần một người đồng ý nhận trách nhiệm rõ ràng.','That would require someone to accept clear responsibility.','Lan đã nói cô ấy thích bắt đầu muộn và có thể đổi phạm vi với tôi.','Lan has said that she prefers a later start and could exchange coverage with me.',['exchange coverage','đổi thời gian phụ trách']],
      ['Các cuộc họp toàn đội vào bốn rưỡi thì sao?','What about full-team meetings at four thirty?','Tôi có thể tham dự các buổi đã lên lịch trước và điều chỉnh giờ hôm đó.','I can attend pre-scheduled sessions and adjust my hours on those days.',['core meeting','cuộc họp cốt lõi']],
      ['Hãy quy định trước bao lâu để tránh thay đổi phút cuối.','Let us define how much notice is needed to avoid last-minute changes.','Tôi đề xuất lịch họp được xác nhận trước ít nhất ba ngày.','I propose that late meetings be confirmed at least three days ahead.',['notice period','thời gian báo trước']],
    ]],
    ['Agreeing on a Trial','Thống nhất thử nghiệm','Hai bên muốn kiểm tra tác động trước khi duyệt lâu dài.','Đặt thời gian, chỉ số và ngày xem lại.',[
      ['Chúng ta có thể thử lịch này trong tám tuần.','We could trial the schedule for eight weeks.','Những kết quả nào sẽ được dùng để đánh giá?','Which outcomes will be used to evaluate it?',['trial arrangement','thỏa thuận thử']],
      ['Hãy theo dõi thời gian phản hồi, bàn giao và việc tham dự họp.','Let us monitor response times, handovers, and meeting attendance.','Tôi cũng muốn phản hồi từ những đồng nghiệp bị ảnh hưởng trực tiếp.','I would also like feedback from colleagues directly affected.',['evaluation measure','thước đo đánh giá']],
      ['Nếu một vấn đề xuất hiện, lịch có bị hủy ngay không?','Will the arrangement be cancelled immediately if an issue appears?','Không, trước hết chúng ta sẽ xem có thể điều chỉnh quy trình không.','No. We will first consider whether the process can be adjusted.',['adjust a process','điều chỉnh quy trình']],
      ['Hãy đặt buổi xem lại vào ngày cuối của tuần thứ tám.','Let us schedule the review for the final day of week eight.','Tôi sẽ ghi các điều khoản và gửi cho nhân sự xác nhận.','I will document the terms and send them to HR for confirmation.',['formal review date','ngày xem lại chính thức']],
    ]],
  ]}),
  t({id:'discussing-elder-care',title:'Discussing Elder Care',titleVi:'Trao đổi việc chăm sóc người cao tuổi',category:'Family',icon:'🫶',level:'B1',description:'Tôn trọng lựa chọn, chia trách nhiệm và chuẩn bị hỗ trợ an toàn.',grammar:['modals','future-forms','empathetic-language'],scenarios:[
    ['Listening to Preferences','Lắng nghe mong muốn','Gia đình trao đổi với mẹ về hỗ trợ tại nhà.','Đặt quyền tự chủ của bà ở trung tâm.',[
      ['Mẹ muốn điều gì tiếp tục tự làm ở nhà?','Which things would you like to continue doing independently at home?','Mẹ muốn tự nấu bữa sáng và chăm cây.','I want to prepare my own breakfast and look after the plants.',['independent living','sống tự chủ']],
      ['Phần nào hiện khiến mẹ thấy khó hoặc không an toàn?','Which tasks currently feel difficult or unsafe?','Đi mua đồ nặng và bước vào bồn tắm làm mẹ lo.','Carrying heavy shopping and stepping into the bath worry me.',['care preference','mong muốn chăm sóc']],
      ['Mình sẽ không quyết định thay mẹ khi chưa hỏi ý kiến.','We will not make decisions for you without asking.','Mẹ muốn thử hỗ trợ nhỏ trước khi thay đổi lớn.','I would prefer to try limited support before making major changes.',['respect autonomy','tôn trọng quyền tự chủ']],
      ['Vậy mình bắt đầu từ mua sắm và an toàn phòng tắm.','Then we will begin with shopping and bathroom safety.','Hai phần đó đúng với ưu tiên của mẹ.','Those two areas reflect my priorities.',['support priority','ưu tiên hỗ trợ']],
    ]],
    ['Sharing Responsibilities','Chia trách nhiệm','Anh chị em sống ở những nơi khác nhau.','Phân việc thực tế và tránh một người gánh hết.',[
      ['Mình có thể đưa mẹ đi khám vì sống gần nhất.','I can take Mum to appointments because I live closest.','Mình ở xa nhưng có thể quản lý hóa đơn và đặt lịch trực tuyến.','I live farther away, but I can manage bills and online bookings.',['share caring duties','chia việc chăm sóc']],
      ['Ai sẽ phụ trách mua đồ mỗi tuần?','Who will be responsible for the weekly shopping?','Chúng ta có thể đặt giao hàng và thay phiên kiểm tra danh sách.','We could arrange delivery and take turns checking the order.',['grocery delivery','giao đồ ăn']],
      ['Nếu người phụ trách không làm được tuần đó thì sao?','What happens if the assigned person cannot manage it one week?','Hãy có người dự phòng trong lịch chung thay vì chờ khẩn cấp.','Include a backup person in the shared calendar rather than waiting for a crisis.',['backup carer','người chăm sóc dự phòng']],
      ['Mỗi tháng mình nên xem khối lượng có còn cân bằng không.','We should review monthly whether the workload remains balanced.','Như vậy bất mãn có thể được xử lý trước khi tích tụ.','That allows resentment to be addressed before it builds.',['care workload','khối lượng chăm sóc']],
    ]],
    ['Improving Home Safety','Cải thiện an toàn tại nhà','Chuyên viên đánh giá nguy cơ té ngã.','Chọn thay đổi ít hạn chế nhất.',[
      ['Tấm thảm ở hành lang đang cuộn lên ở mép.','The hallway rug is curling up at the edge.','Mình có thể bỏ nó hoặc cố định bằng lớp chống trượt.','We can remove it or secure it with a non-slip backing.',['trip risk','nguy cơ vấp']],
      ['Mẹ muốn giữ tấm thảm vì nó có ý nghĩa kỷ niệm.','Mum would like to keep the rug because it has sentimental value.','Vậy cố định nó là giải pháp tôn trọng sở thích hơn.','Then securing it is the option that better respects her preference.',['least restrictive','ít hạn chế nhất']],
      ['Thanh vịn cạnh bồn tắm có cần khoan tường không?','Does the grab rail beside the bath need to be fixed into the wall?','Có, loại hút chân không không đủ an toàn để chịu toàn bộ trọng lượng.','Yes. A suction rail is not reliable enough to support full body weight.',['grab rail','thanh vịn']],
      ['Hãy xin phép mẹ trước khi đặt lịch lắp đặt.','Ask Mum before arranging the installation.','Mẹ đồng ý nếu có thể chọn vị trí cùng kỹ thuật viên.','She agrees, provided that she can choose the position with the installer.',['home adaptation','điều chỉnh nhà']],
    ]],
  ]}),
  t({id:'planning-a-zero-waste-event',title:'Planning a Zero-Waste Event',titleVi:'Lên kế hoạch sự kiện không rác thải',category:'Community',icon:'♻️',level:'B1',description:'Giảm đồ dùng một lần, thiết kế điểm phân loại và đo chất thải.',grammar:['conditionals','passive-voice','sustainability-language'],scenarios:[
    ['Reducing Waste at Source','Giảm rác từ đầu nguồn','Đội xem danh sách vật tư sự kiện.','Loại bỏ đồ dùng một lần trước khi nghĩ đến tái chế.',[
      ['Danh sách hiện có ba nghìn cốc nhựa dùng một lần.','The list currently includes three thousand single-use plastic cups.','Mình có thể dùng cốc tái sử dụng với tiền đặt cọc.','We could use reusable cups with a deposit system.',['single-use item','đồ dùng một lần']],
      ['Khách trả cốc sẽ nhận lại tiền đặt cọc ở đâu?','Where would guests recover their deposit when returning a cup?','Hai quầy trả cốc sẽ được đặt cạnh lối ra.','Two return stations would be positioned beside the exits.',['deposit system','hệ thống đặt cọc']],
      ['Vé giấy và chương trình in có cần thiết không?','Are printed tickets and programmes necessary?','Mã vé có thể được quét trên điện thoại, còn lịch sẽ đặt trên bảng lớn.','Tickets can be scanned on phones, and the schedule can be displayed on large boards.',['avoid waste','tránh tạo rác']],
      ['Nhà cung cấp cũng phải giao hàng trong thùng có thể trả lại.','Suppliers should also deliver goods in returnable containers.','Điều khoản đó cần được ghi trong hợp đồng mua hàng.','That requirement needs to be included in the purchasing contract.',['returnable container','thùng có thể trả lại']],
    ]],
    ['Designing Waste Stations','Thiết kế điểm phân loại','Khách dễ bỏ sai thùng nếu biển khó hiểu.','Dùng nhãn nhất quán và nhân viên hướng dẫn.',[
      ['Mỗi điểm nên có những dòng rác nào?','Which waste streams should each station include?','Thực phẩm, tái chế và rác còn lại cần ba thùng riêng.','Food waste, recycling, and residual waste require three separate bins.',['waste stream','dòng rác']],
      ['Màu thùng có giống hệ thống thu gom địa phương không?','Do the bin colours match the local collection system?','Chưa, thùng xanh và nâu hiện đang bị đảo.','No. The green and brown bins are currently reversed.',['consistent signage','biển nhất quán']],
      ['Hình ảnh đồ thật có thể rõ hơn chỉ dùng chữ.','Pictures of actual items may be clearer than text alone.','Hãy thử biển với một nhóm tình nguyện viên trước sự kiện.','Test the signs with a group of volunteers before the event.',['sorting station','điểm phân loại']],
      ['Giờ ăn trưa nên có người đứng cạnh mỗi điểm.','Each station should be staffed during the lunch period.','Hướng dẫn tại chỗ sẽ giảm việc phải phân loại lại sau đó.','On-the-spot guidance will reduce the need to re-sort waste later.',['contamination rate','tỷ lệ lẫn sai']],
    ]],
    ['Measuring the Outcome','Đo kết quả','Nhóm muốn biết sự kiện có thật sự giảm rác.','Đặt đường cơ sở và cân từng dòng.',[
      ['Mình sẽ so sánh với sự kiện nào làm đường cơ sở?','Which previous event will provide the baseline?','Hãy dùng hội chợ năm ngoái vì số khách tương tự.','Use last year’s fair because attendance was similar.',['waste baseline','đường cơ sở rác']],
      ['Tổng rác nên được chia theo số khách.','The total waste should be divided by the number of attendees.','Như vậy thay đổi quy mô không làm sai so sánh.','That prevents a change in event size from distorting the comparison.',['per-attendee measure','chỉ số trên mỗi khách']],
      ['Ai sẽ cân các thùng sau sự kiện?','Who will weigh the bins after the event?','Đội thu gom sẽ ghi khối lượng trước khi vận chuyển.','The collection team will record each weight before transport.',['record waste weight','ghi khối lượng rác']],
      ['Mình cũng cần báo tỷ lệ đồ tái sử dụng được trả lại.','We should also report the return rate for reusable items.','Chỉ số đó cho thấy hệ thống đặt cọc có hoạt động không.','That measure will show whether the deposit system worked.',['return rate','tỷ lệ hoàn trả']],
    ]],
  ]}),
  t({id:'resolving-a-subscription-dispute',title:'Resolving a Subscription Dispute',titleVi:'Giải quyết tranh chấp gói đăng ký',category:'Services',icon:'🧩',level:'B1',description:'Dựng lại lịch sử đồng ý, tính phí và yêu cầu khắc phục phù hợp.',grammar:['reported-speech','present-perfect','formal-requests'],scenarios:[
    ['Tracing the Renewal','Truy lại lần gia hạn','Khách bị tính phí năm dù nghĩ đã hủy.','Xác định hành động, ngày và thông báo.',[
      ['Tôi đã hủy bản dùng thử trước khi nó kết thúc.','I cancelled the trial before it ended.','Bạn nhớ mình đã hủy qua ứng dụng hay trang web không?','Do you remember whether you cancelled through the app or the website?',['renewal history','lịch sử gia hạn']],
      ['Tôi dùng ứng dụng và thấy thông báo “yêu cầu đã nhận”.','I used the app and saw a message saying that the request had been received.','Bạn có ảnh chụp hoặc email xác nhận không?','Do you have a screenshot or confirmation email?',['cancellation confirmation','xác nhận hủy']],
      ['Không có email, nhưng lịch sử điện thoại ghi ngày tôi mở ứng dụng.','There is no email, but my phone history shows the date I opened the app.','Nhật ký hệ thống của chúng tôi cũng ghi một yêu cầu vào ngày đó.','Our system log also records a request on that date.',['system log','nhật ký hệ thống']],
      ['Vậy tại sao tài khoản vẫn được gia hạn?','Why was the account renewed, then?','Yêu cầu dường như bị lỗi trước bước xác nhận cuối.','The request appears to have failed before the final confirmation step.',['failed request','yêu cầu thất bại']],
    ]],
    ['Assessing the Disclosure','Đánh giá thông tin được cung cấp','Hai bên kiểm tra giao diện hủy và điều khoản.','Xem người dùng có được cảnh báo rõ hay không.',[
      ['Ứng dụng có nói tôi cần hoàn tất bước thứ hai không?','Did the app tell me that I needed to complete a second step?','Nút tiếp tục xuất hiện bên dưới thông báo đầu tiên.','A continue button appears below the initial message.',['clear disclosure','thông báo rõ ràng']],
      ['Nhưng thông báo nói yêu cầu đã được nhận, nghe như đã hoàn tất.','However, saying that the request was received sounds like completion.','Tôi đồng ý cách diễn đạt có thể gây hiểu nhầm.','I agree that the wording could reasonably be misleading.',['misleading wording','cách diễn đạt gây hiểu nhầm']],
      ['Điều khoản có giải thích quy trình hai bước không?','Do the terms explain the two-step process?','Có, nhưng chúng nằm trong một mục không được liên kết từ màn hình hủy.','Yes, but they are in a section that is not linked from the cancellation screen.',['accessible term','điều khoản dễ tiếp cận']],
      ['Vậy người dùng khó biết trạng thái thực tế.','Then it would be difficult for a user to understand the actual status.','Tôi sẽ ghi nhận vấn đề thiết kế đó trong hồ sơ.','I will record that design issue in the case.',['actual status','trạng thái thực']],
    ]],
    ['Agreeing on a Remedy','Thống nhất khắc phục','Công ty xác nhận trải nghiệm gây hiểu nhầm.','Hoàn tiền và ngăn tái diễn.',[
      ['Tôi muốn được hoàn toàn bộ phí năm.','I would like the annual charge to be refunded in full.','Vì bạn không sử dụng dịch vụ sau ngày hủy, chúng tôi có thể làm vậy.','As you did not use the service after the cancellation date, we can do that.',['full refund','hoàn tiền đầy đủ']],
      ['Tài khoản có được đóng ngay không?','Will the account be closed immediately?','Có, quyền truy cập trả phí sẽ kết thúc hôm nay mà không tính thêm.','Yes. Paid access will end today with no further charge.',['end paid access','kết thúc quyền trả phí']],
      ['Tôi cần xác nhận bằng văn bản cho cả hai việc.','I need written confirmation of both actions.','Bạn sẽ nhận email nêu ngày hủy và thời gian hoàn tiền.','You will receive an email stating the cancellation date and refund timeframe.',['written confirmation','xác nhận bằng văn bản']],
      ['Công ty sẽ sửa thông báo gây hiểu nhầm chứ?','Will the company correct the misleading message?','Tôi đã chuyển nó thành lỗi ưu tiên cho đội sản phẩm.','I have escalated it as a priority issue for the product team.',['prevent recurrence','ngăn tái diễn']],
    ]],
  ]}),
  t({id:'recovering-a-compromised-account',title:'Recovering a Compromised Account',titleVi:'Khôi phục tài khoản bị xâm nhập',category:'Technology',icon:'🔐',level:'B1',description:'Xác minh xâm nhập, bảo vệ email và khôi phục truy cập an toàn.',grammar:['present-perfect','passive-voice','security-language'],scenarios:[
    ['Recognizing the Compromise','Nhận biết xâm nhập','Người dùng thấy hoạt động mình không thực hiện.','Xác nhận dấu hiệu mà không tương tác với kẻ xấu.',[
      ['Tài khoản của tôi vừa đăng một tin nhắn mà tôi không viết.','My account has just posted a message that I did not write.','Bạn còn đăng nhập được trên thiết bị tin cậy không?','Can you still sign in on a trusted device?',['unauthorized activity','hoạt động trái phép']],
      ['Có, nhưng mật khẩu đã bị thay đổi khi tôi thử trên máy tính.','Yes, but the password had been changed when I tried on my computer.','Đừng trả lời bất kỳ tin nhắn nào được gửi từ tài khoản.','Do not respond to any messages sent from the account.',['trusted device','thiết bị tin cậy']],
      ['Bạn bè nói họ nhận đường dẫn lạ từ tôi.','Friends say that they have received suspicious links from me.','Hãy cảnh báo họ bằng kênh khác và yêu cầu không mở liên kết.','Warn them through another channel and ask them not to open the links.',['suspicious link','đường dẫn đáng ngờ']],
      ['Tôi sẽ chụp lại hoạt động trước khi xóa.','I will capture the activity before deleting anything.','Bằng chứng đó có thể giúp xác định thời điểm xâm nhập.','That evidence may help establish when the compromise began.',['capture evidence','lưu bằng chứng']],
    ]],
    ['Securing the Email','Bảo vệ email','Email khôi phục có thể là đường vào tài khoản.','Đổi thông tin xác thực theo đúng thứ tự.',[
      ['Tôi nên đổi mật khẩu tài khoản hay email trước?','Should I change the account password or the email password first?','Bảo vệ email trước vì nó có thể đặt lại các tài khoản khác.','Secure the email first because it can reset other accounts.',['recovery email','email khôi phục']],
      ['Tôi sẽ đăng xuất email khỏi mọi phiên.','I will sign the email account out of every session.','Sau đó kiểm tra quy tắc chuyển tiếp mà bạn không tạo.','Then check for forwarding rules that you did not create.',['forwarding rule','quy tắc chuyển tiếp']],
      ['Có một địa chỉ lạ đang nhận bản sao thư.','An unfamiliar address is receiving copies of my messages.','Hãy xóa quy tắc và lưu địa chỉ đó vào báo cáo.','Remove the rule and preserve the address for the report.',['unfamiliar address','địa chỉ lạ']],
      ['Mình cũng sẽ bật xác thực bằng ứng dụng.','I will also enable authentication through an app.','Cách đó mạnh hơn chỉ dựa vào tin nhắn văn bản.','That is stronger than relying only on text messages.',['authenticator app','ứng dụng xác thực']],
    ]],
    ['Restoring Safely','Khôi phục an toàn','Bộ phận hỗ trợ đã xác minh danh tính.','Lấy lại quyền và kiểm tra cài đặt bị đổi.',[
      ['Yêu cầu khôi phục của tôi đã được chấp nhận.','My recovery request has been approved.','Hãy dùng liên kết một lần trên thiết bị đã kiểm tra.','Use the one-time link on a device that you have checked.',['one-time recovery link','liên kết khôi phục một lần']],
      ['Sau khi đăng nhập, mình cần xem gì trước?','What should I review first after signing in?','Kiểm tra email, số điện thoại và ứng dụng được kết nối.','Review the email address, phone number, and connected applications.',['connected application','ứng dụng kết nối']],
      ['Một ứng dụng mình không biết có toàn quyền truy cập.','An application I do not recognize has full access.','Thu hồi quyền đó và ghi lại tên ứng dụng.','Revoke that access and record the application’s name.',['revoke access','thu hồi quyền']],
      ['Mình có nên xóa mọi bài đăng lạ ngay không?','Should I delete every unfamiliar post immediately?','Sau khi lưu bằng chứng, hãy xóa chúng và thông báo cho người bị ảnh hưởng.','After preserving evidence, remove them and notify anyone affected.',['account recovery','khôi phục tài khoản']],
    ]],
  ]}),
  t({id:'evaluating-charity-impact',title:'Evaluating Charity Impact',titleVi:'Đánh giá tác động tổ chức từ thiện',category:'Community',icon:'📊',level:'B2',description:'Đọc chỉ số, kiểm tra phản thực và cân nhắc tiếng nói người thụ hưởng.',grammar:['evidence-language','hedging','causal-reasoning'],scenarios:[
    ['Reading Beyond Headline Numbers','Đọc sâu hơn con số nổi bật','Nhà tài trợ xem báo cáo nói đã hỗ trợ mười nghìn người.','Phân biệt số người tiếp cận với thay đổi có ý nghĩa.',[
      ['Báo cáo nói chương trình đã “tác động” đến mười nghìn người.','The report says that the programme “impacted” ten thousand people.','Từ đó có nghĩa họ nhận dịch vụ hay đạt kết quả lâu dài?','Does that mean they received a service or achieved a lasting outcome?',['headline metric','chỉ số nổi bật']],
      ['Phần chú thích cho biết con số đếm người dự một buổi tập huấn.','The footnote says that the figure counts people attending one workshop.','Vậy đây là mức tiếp cận, chưa phải bằng chứng đời sống đã cải thiện.','Then this is reach, not yet evidence that people’s lives improved.',['programme reach','mức tiếp cận']],
      ['Báo cáo cũng nêu tám mươi phần trăm hài lòng.','The report also cites an eighty-percent satisfaction rate.','Mình cần biết bao nhiêu người trả lời và câu hỏi được đặt thế nào.','We need to know how many responded and how the question was framed.',['response rate','tỷ lệ phản hồi']],
      ['Không có mẫu số khiến tỷ lệ khó diễn giải.','The absence of a denominator makes the percentage difficult to interpret.','Hãy yêu cầu bảng phương pháp thay vì dựa vào tóm tắt.','Let us request the methodology appendix rather than rely on the summary.',['methodology appendix','phụ lục phương pháp']],
    ]],
    ['Considering What Would Have Happened','Xem điều gì có thể đã xảy ra','Tỷ lệ việc làm tăng sau chương trình đào tạo.','Tránh gán mọi thay đổi cho chương trình.',[
      ['Sáu tháng sau khóa học, năm mươi lăm phần trăm người tham gia có việc.','Six months after the course, fifty-five percent of participants were employed.','Tỷ lệ của nhóm tương tự không tham gia là bao nhiêu?','What was the rate among similar people who did not participate?',['comparison group','nhóm so sánh']],
      ['Báo cáo không có nhóm so sánh nhưng nêu thị trường lao động cũng cải thiện.','The report has no comparison group, although it notes that the labour market also improved.','Vậy một phần thay đổi có thể đã xảy ra dù không có chương trình.','Then some of the change might have occurred without the programme.',['counterfactual','phản thực']],
      ['Điều đó có làm kết quả hoàn toàn vô dụng không?','Does that make the result entirely useless?','Không, nhưng mức đóng góp của chương trình vẫn chưa chắc chắn.','No, but the programme’s contribution remains uncertain.',['contribution claim','tuyên bố đóng góp']],
      ['Một đợt tiếp theo có thể dùng danh sách chờ làm nhóm so sánh.','A future round could use the waiting list as a comparison group.','Thiết kế đó sẽ mạnh hơn nếu việc phân nhóm được làm công bằng.','That design would be stronger if allocation were handled fairly.',['evaluation design','thiết kế đánh giá']],
    ]],
    ['Including Participant Voice','Đưa tiếng nói người tham gia','Số liệu tích cực nhưng phỏng vấn nêu một số tác hại.','Kết hợp hiệu quả trung bình với trải nghiệm đa dạng.',[
      ['Điểm trung bình tăng, nhưng vài người nói khóa học không tiếp cận được.','Average scores increased, yet several participants described the course as inaccessible.','Những người nào có khả năng bị bỏ lại?','Which participants were most likely to be excluded?',['participant voice','tiếng nói người tham gia']],
      ['Người chăm sóc và người dùng trình đọc màn hình bỏ học nhiều hơn.','Carers and screen-reader users had higher dropout rates.','Kết quả trung bình đang che giấu sự chênh lệch phân nhóm.','The average outcome is concealing subgroup disparities.',['subgroup disparity','chênh lệch phân nhóm']],
      ['Tổ chức có hỏi người bỏ học vì sao không?','Did the charity ask those who withdrew why they left?','Chỉ người hoàn thành nhận khảo sát cuối khóa.','Only those who completed the programme received the final survey.',['survivorship bias','thiên lệch người còn lại']],
      ['Lần tới việc đánh giá cần chủ động nghe người rời chương trình.','Future evaluation needs to seek out the experiences of those who leave.','Nếu không, tác động tích cực sẽ bị trình bày quá mức.','Otherwise, the positive impact is likely to be overstated.',['overstate impact','phóng đại tác động']],
    ]],
  ]}),
  t({id:'managing-organizational-change',title:'Managing Organizational Change',titleVi:'Quản lý thay đổi tổ chức',category:'Work',icon:'🔄',level:'B2',description:'Giải thích lý do, phân biệt tham vấn thật và hỗ trợ chuyển đổi.',grammar:['change-language','concession-clauses','reported-speech'],scenarios:[
    ['Explaining the Case for Change','Giải thích lý do thay đổi','Tổ chức hợp nhất hai đội dịch vụ.','Kết nối vấn đề, bằng chứng và mục tiêu mà không giả vờ chắc chắn.',[
      ['Thông báo nói việc hợp nhất sẽ “cải thiện hiệu quả” nhưng không giải thích.','The announcement says that the merger will “improve efficiency” without explaining how.','Nhân viên cần biết vấn đề cụ thể mà thay đổi nhằm giải quyết.','Employees need to understand the specific problem the change is intended to address.',['case for change','lý do thay đổi']],
      ['Hiện khách hàng phải chuyển giữa hai đội cho cùng một yêu cầu.','Customers currently move between two teams for a single request.','Vậy mục tiêu là giảm bàn giao và tạo một chủ sở hữu hồ sơ.','Then the objective is to reduce handoffs and create single-case ownership.',['reduce handoffs','giảm bàn giao']],
      ['Có bằng chứng cấu trúc mới sẽ đạt được điều đó không?','Is there evidence that the new structure will achieve that?','Thử nghiệm nhỏ đã giảm thời gian giải quyết, nhưng chỉ ở một loại hồ sơ.','A small pilot reduced resolution time, although only for one case type.',['limited pilot','thử nghiệm giới hạn']],
      ['Mình nên trình bày kết quả là tín hiệu tích cực, không phải bảo đảm.','We should present the result as an encouraging signal rather than a guarantee.','Sự trung thực đó sẽ đáng tin hơn một lời hứa quá chắc chắn.','That honesty will be more credible than an overly confident promise.',['credible rationale','lập luận đáng tin']],
    ]],
    ['Designing Genuine Consultation','Thiết kế tham vấn thực chất','Nhân viên được hỏi ý kiến sau khi sơ đồ tổ chức đã công bố.','Làm rõ phần nào còn có thể ảnh hưởng.',[
      ['Nếu cấu trúc đã quyết định, tham vấn còn có ý nghĩa gì?','If the structure is already decided, what can consultation meaningfully influence?','Vai trò cụ thể, quy trình bàn giao và lịch chuyển đổi vẫn chưa chốt.','Specific roles, handover processes, and the transition timetable remain open.',['scope of consultation','phạm vi tham vấn']],
      ['Điều đó phải được nói rõ để mọi người không nghĩ toàn bộ quyết định sẽ đảo ngược.','That needs to be explicit so people do not assume that the entire decision can be reversed.','Đồng thời phản hồi trái ý vẫn phải được ghi nhận và trả lời.','At the same time, dissenting feedback must still be recorded and answered.',['dissenting feedback','phản hồi trái ý']],
      ['Ai sẽ tổng hợp chủ đề mà không làm mất quan điểm thiểu số?','Who will synthesize themes without erasing minority views?','Một nhóm hỗn hợp có đại diện nhân viên và người hỗ trợ độc lập.','A mixed panel with employee representatives and an independent facilitator.',['independent facilitator','người hỗ trợ độc lập']],
      ['Sau tham vấn cần công bố điều gì đã đổi và điều gì không.','After consultation, publish what changed and what did not.','Và giải thích lý do cho cả hai để cho thấy phản hồi được cân nhắc.','Explain the reasons for both so that people can see how feedback was weighed.',['feedback response','phản hồi lại ý kiến']],
    ]],
    ['Supporting the Transition','Hỗ trợ chuyển đổi','Đội mới cần học hệ thống và cách làm khác.','Cung cấp thời gian, hỗ trợ và tiêu chí ổn định.',[
      ['Kế hoạch chỉ dành một buổi đào tạo cho hệ thống mới.','The plan allocates only one training session for the new system.','Điều đó khó đủ cho người phải đổi toàn bộ quy trình.','That is unlikely to be sufficient for those changing their whole workflow.',['transition support','hỗ trợ chuyển đổi']],
      ['Mình có thể thêm giờ thực hành và người hỗ trợ trực tiếp.','We could add practice clinics and named peer support.','Quản lý cũng cần giảm mục tiêu đầu ra trong thời gian học.','Managers also need to reduce output targets during the learning period.',['learning allowance','thời gian dành cho học']],
      ['Khi nào mình coi quá trình chuyển đổi đã ổn định?','When will we regard the transition as stable?','Khi thời gian xử lý và lỗi trở lại phạm vi nền trong bốn tuần.','When resolution times and errors remain within the baseline range for four weeks.',['stability criterion','tiêu chí ổn định']],
      ['Nếu không đạt, đội không nên bị trách vì kế hoạch thiếu nguồn lực.','If that is not achieved, the team should not be blamed for an under-resourced plan.','Đúng, đánh giá phải bao gồm mức hỗ trợ thực tế đã được cung cấp.','Agreed. The review must include the support that was actually provided.',['implementation review','đánh giá triển khai']],
    ]],
  ]}),
  t({id:'discussing-ai-ethics',title:'Discussing AI Ethics',titleVi:'Thảo luận đạo đức AI',category:'Technology',icon:'🤖',level:'B2',description:'Đánh giá dữ liệu, trách nhiệm và quyền phản đối trong quyết định tự động.',grammar:['ethical-reasoning','passive-voice','modals'],scenarios:[
    ['Questioning the Training Data','Đặt câu hỏi về dữ liệu huấn luyện','Đội cân nhắc mô hình sàng lọc hồ sơ xin việc.','Kiểm tra tính đại diện và nguồn gốc dữ liệu.',[
      ['Mô hình được huấn luyện trên hồ sơ tuyển dụng của năm năm trước.','The model was trained on five years of past hiring records.','Dữ liệu lịch sử có thể phản ánh thiên lệch trong quyết định cũ.','Historical data may encode bias from earlier decisions.',['training data','dữ liệu huấn luyện']],
      ['Nhóm đã kiểm tra tỷ lệ chọn giữa các nhóm ứng viên chưa?','Has the team tested selection rates across applicant groups?','Họ có báo cáo tổng thể nhưng chưa phân tích kết hợp nhiều đặc điểm.','They report overall rates but have not analyzed intersecting characteristics.',['selection disparity','chênh lệch lựa chọn']],
      ['Dữ liệu cũng thiếu hồ sơ của người chưa từng được phỏng vấn.','The data also lacks outcomes for people who were never interviewed.','Vậy mô hình học từ lựa chọn trước đó chứ không phải năng lực thực của mọi ứng viên.','Then the model learns from previous choices rather than the actual ability of all applicants.',['missing outcome','thiếu kết quả']],
      ['Trước khi dùng, cần đánh giá độc lập về dữ liệu và tác động.','An independent assessment of the data and impacts is needed before use.','Chỉ kiểm tra độ chính xác trung bình sẽ không đủ.','Testing average accuracy alone would be inadequate.',['impact assessment','đánh giá tác động']],
    ]],
    ['Preserving Human Responsibility','Giữ trách nhiệm con người','Nhà cung cấp gọi hệ thống là công cụ hỗ trợ quyết định.','Xác định ai có quyền và nghĩa vụ xem xét.',[
      ['Nếu nhân viên luôn làm theo điểm của mô hình, con người có thật sự quyết định không?','If staff always follow the model’s score, is a human genuinely making the decision?','Việc có người trong quy trình không tự động tạo ra giám sát có ý nghĩa.','Having a person in the process does not automatically create meaningful oversight.',['meaningful oversight','giám sát có ý nghĩa']],
      ['Người xem cần được đào tạo để chất vấn kết quả.','Reviewers need training and authority to challenge the output.','Họ cũng phải thấy những yếu tố chính ảnh hưởng điểm.','They must also be shown the principal factors influencing the score.',['challenge an output','chất vấn kết quả']],
      ['Ai chịu trách nhiệm nếu công cụ tạo phân biệt đối xử?','Who is accountable if the tool produces discriminatory outcomes?','Tổ chức sử dụng không thể chuyển toàn bộ trách nhiệm cho nhà cung cấp.','The deploying organization cannot transfer all responsibility to the vendor.',['organizational accountability','trách nhiệm tổ chức']],
      ['Hợp đồng nên hỗ trợ kiểm toán nhưng quản trị nội bộ vẫn thiết yếu.','The contract should support audits, but internal governance remains essential.','Trách nhiệm cần được gán cho một vai trò có quyền dừng hệ thống.','Accountability should sit with a role empowered to suspend the system.',['suspension authority','quyền dừng hệ thống']],
    ]],
    ['Enabling Explanation and Appeal','Cho phép giải thích và khiếu nại','Ứng viên không biết công cụ tự động được dùng.','Thiết kế thông báo, giải thích và con đường xem xét.',[
      ['Ứng viên nên được biết khi nào AI ảnh hưởng quyết định quan trọng.','Applicants should be told when AI influences a consequential decision.','Thông báo cần đến trước quyết định chứ không chỉ sau khi bị từ chối.','The notice should come before the decision, not only after rejection.',['advance notice','thông báo trước']],
      ['Họ có quyền biết toàn bộ mã nguồn không?','Are they entitled to see the entire source code?','Không nhất thiết, nhưng họ cần lời giải thích đủ để hiểu và phản đối.','Not necessarily, but they need an explanation sufficient to understand and contest the outcome.',['contest a decision','phản đối quyết định']],
      ['Quy trình khiếu nại có thể chỉ chạy lại cùng mô hình không?','Can the appeal process simply rerun the same model?','Không, việc xem xét phải do người có quyền cân nhắc thông tin mới thực hiện.','No. The review must be conducted by someone able to consider new information.',['human appeal','khiếu nại do người xem']],
      ['Kết quả khiếu nại cũng nên được dùng để phát hiện lỗi hệ thống.','Appeal outcomes should also be used to identify systemic problems.','Như vậy quyền cá nhân có thể cải thiện quản trị cho mọi người.','That allows individual rights to strengthen governance for everyone.',['systemic learning','học hỏi hệ thống']],
    ]],
  ]}),
];
