import { scaleTopic as t } from './scale-builder';

export const batchHCoreTopics = [
  t({id:'using-a-photo-booth',title:'Using a Photo Booth',titleVi:'Dùng buồng chụp ảnh',category:'Services',icon:'📸',level:'A1',description:'Chọn loại ảnh, tạo dáng và nhận ảnh in.',grammar:['imperatives','can','how-many'],scenarios:[
    ['Choosing the Format','Chọn định dạng','Khách cần ảnh cho giấy tờ.','Chọn kích cỡ và số bản.',[
      ['Mình cần ảnh hộ chiếu.','I need passport photographs.','Chọn mục ảnh giấy tờ trên màn hình.','Select the identity-photo option on the screen.',['identity photo','ảnh giấy tờ']],
      ['Máy sẽ in bao nhiêu tấm?','How many photographs will the machine print?','Nó in một tờ gồm bốn tấm.','It prints one sheet with four photographs.',['photo sheet','tờ ảnh']],
      ['Kích cỡ có đúng cho hộ chiếu không?','Is the size correct for a passport?','Có, mẫu này theo đúng kích cỡ tiêu chuẩn.','Yes. This template uses the standard size.',['standard size','kích cỡ tiêu chuẩn']],
    ]],
    ['Getting Ready','Chuẩn bị chụp','Khách ngồi trước máy ảnh.','Chỉnh ghế và khuôn mặt.',[
      ['Ghế có thể nâng cao hơn không?','Can the seat be raised higher?','Có, xoay tay cầm dưới ghế.','Yes. Turn the handle beneath the seat.',['adjust the seat','chỉnh ghế']],
      ['Mắt mình nên ở đâu trên màn hình?','Where should my eyes be on the screen?','Đưa mắt ngang với đường màu xanh.','Align your eyes with the green line.',['align your eyes','đặt mắt thẳng hàng']],
      ['Mình có được đeo kính không?','May I wear my glasses?','Có, miễn là tròng kính không bị chói.','Yes, provided that the lenses have no glare.',['lens glare','chói tròng kính']],
    ]],
    ['Taking the Picture','Chụp ảnh','Máy bắt đầu đếm ngược.','Giữ tư thế đúng.',[
      ['Mình có cần cười không?','Do I need to smile?','Giữ nét mặt tự nhiên và khép miệng.','Keep a neutral expression with your mouth closed.',['neutral expression','nét mặt tự nhiên']],
      ['Máy đang đếm từ ba.','The machine is counting down from three.','Nhìn thẳng vào ống kính và giữ yên.','Look directly at the lens and stay still.',['look at the lens','nhìn ống kính']],
      ['Ảnh xem trước trông hơi tối.','The preview looks slightly dark.','Bạn có thể chọn chụp lại một lần.','You can choose one retake.',['photo retake','chụp lại']],
    ]],
    ['Collecting the Print','Nhận ảnh in','Ảnh đang được xử lý.','Lấy ảnh và giữ không lem.',[
      ['Ảnh sẽ ra ở khay nào?','Which tray will the photographs come from?','Chúng sẽ ra ở khe bên dưới nút thanh toán.','They will appear in the slot below the payment button.',['print slot','khe ảnh']],
      ['Mực có khô ngay không?','Is the ink dry immediately?','Hãy cầm ở mép và đợi một phút.','Hold the sheet by the edges and wait one minute.',['hold by the edges','cầm ở mép']],
      ['Mình sẽ để ảnh phẳng trong phong bì.','I will keep the photographs flat in the envelope.','Cách đó giúp chúng không bị cong.','That will prevent them from bending.',['keep flat','giữ phẳng']],
    ]],
  ]}),
  t({id:'shopping-at-a-pet-store',title:'Shopping at a Pet Store',titleVi:'Mua đồ ở cửa hàng thú cưng',category:'Shopping',icon:'🦴',level:'A1',description:'Chọn thức ăn, đồ chơi và đồ dùng phù hợp.',grammar:['has-have','can','comparatives'],scenarios:[
    ['Choosing Cat Food','Chọn thức ăn mèo','Khách tìm thức ăn cho mèo trưởng thành.','Đọc độ tuổi và khẩu phần.',[
      ['Thức ăn này dành cho mèo con à?','Is this food intended for kittens?','Đúng, túi có nhãn dành cho dưới một tuổi.','Yes. The bag is labelled for cats under one year old.',['kitten food','thức ăn mèo con']],
      ['Mèo của mình đã ba tuổi.','My cat is three years old.','Hãy chọn công thức cho mèo trưởng thành.','Choose the adult-cat formula.',['adult formula','công thức trưởng thành']],
      ['Túi nhỏ dùng được bao nhiêu ngày?','How many days will the small bag last?','Với khẩu phần này, nó dùng được khoảng hai tuần.','At this portion size, it will last about two weeks.',['feeding guide','hướng dẫn cho ăn']],
    ]],
    ['Finding a Toy','Tìm đồ chơi','Khách cần đồ chơi cho chó nhỏ.','Chọn kích cỡ và chất liệu an toàn.',[
      ['Quả bóng này có quá lớn cho chó nhỏ không?','Is this ball too large for a small dog?','Mẫu nhỏ hơn sẽ dễ ngậm hơn.','The smaller model will be easier to carry in its mouth.',['dog toy','đồ chơi chó']],
      ['Đồ chơi có dễ bị cắn vỡ không?','Is the toy easy to chew apart?','Nó được làm từ cao su dày cho người nhai khỏe.','It is made from thick rubber for strong chewers.',['durable rubber','cao su bền']],
      ['Mình sẽ chọn màu sáng để dễ tìm.','I will choose a bright colour so it is easy to find.','Màu cam này nổi bật trên cỏ.','This orange one stands out on grass.',['stand out','nổi bật']],
    ]],
    ['Buying a Lead','Mua dây dắt','Khách so sánh hai chiều dài.','Chọn dây chắc và vừa tay.',[
      ['Dây này dài bao nhiêu?','How long is this lead?','Nó dài một mét rưỡi.','It is one and a half metres long.',['dog lead','dây dắt chó']],
      ['Móc có vừa vòng cổ nhỏ không?','Will the clip fit a small collar?','Có, móc nhẹ này được thiết kế cho chó nhỏ.','Yes. This light clip is designed for small dogs.',['light clip','móc nhẹ']],
      ['Tay cầm có lớp đệm không?','Does the handle have padding?','Có, lớp đệm giúp cầm thoải mái hơn.','Yes. The padding makes it more comfortable to hold.',['padded handle','tay cầm có đệm']],
    ]],
    ['Checking Out','Thanh toán','Khách mang ba món ra quầy.','Dùng điểm thành viên và lấy hóa đơn.',[
      ['Thẻ thành viên có giảm cho thức ăn không?','Does the membership card give a discount on food?','Có, hôm nay thức ăn được giảm năm phần trăm.','Yes. Food receives a five-percent discount today.',['member discount','giảm giá thành viên']],
      ['Điểm của mình có đủ đổi một món đồ chơi không?','Do I have enough points for a toy?','Bạn còn thiếu hai mươi điểm.','You are twenty points short.',['loyalty points','điểm tích lũy']],
      ['Vậy mình sẽ để dành điểm cho lần sau.','Then I will save the points for next time.','Được, số dư mới có trên hóa đơn.','Certainly. The new balance is printed on the receipt.',['points balance','số dư điểm']],
    ]],
  ]}),
  t({id:'visiting-a-botanical-garden',title:'Visiting a Botanical Garden',titleVi:'Tham quan vườn thực vật',category:'Entertainment',icon:'🌺',level:'A1',description:'Tìm khu cây, tham gia tuyến đi và bảo vệ thực vật.',grammar:['where-questions','can-cannot','imperatives'],scenarios:[
    ['Finding the Glasshouse','Tìm nhà kính','Khách muốn xem cây nhiệt đới.','Đi theo bản đồ đến nhà kính.',[
      ['Nhà kính nhiệt đới ở đâu?','Where is the tropical glasshouse?','Nó ở sau hồ sen, cạnh quán cà phê.','It is behind the lotus pond beside the café.',['tropical glasshouse','nhà kính nhiệt đới']],
      ['Mình đi theo đường màu đỏ phải không?','Do we follow the red path?','Đúng, rồi rẽ trái ở đài phun nước.','Yes. Then turn left at the fountain.',['red path','đường màu đỏ']],
      ['Nhà kính mở đến mấy giờ?','What time does the glasshouse close?','Nó đóng cửa lúc năm giờ chiều.','It closes at five in the afternoon.',['closing time','giờ đóng cửa']],
    ]],
    ['Joining a Garden Walk','Tham gia tuyến tham quan','Có một buổi đi bộ có hướng dẫn.','Hỏi điểm bắt đầu và thời lượng.',[
      ['Chuyến đi bộ bắt đầu ở đâu?','Where does the garden walk begin?','Nó bắt đầu tại bảng thông tin chính.','It begins at the main information board.',['guided walk','chuyến đi có hướng dẫn']],
      ['Mình có cần đặt chỗ không?','Do I need to reserve a place?','Không, hãy đến trước mười phút.','No. Arrive ten minutes early.',['arrive early','đến sớm']],
      ['Tuyến đi có dài không?','Is the route long?','Nó dài khoảng một cây số và có nhiều ghế nghỉ.','It is about one kilometre with plenty of benches.',['resting bench','ghế nghỉ']],
    ]],
    ['Inside the Glasshouse','Trong nhà kính','Khách vào khu nóng ẩm.','Đi cẩn thận và không chạm cây.',[
      ['Sàn ở đây hơi ướt.','The floor is slightly wet here.','Hãy đi chậm và dùng tay vịn.','Walk slowly and use the handrail.',['slippery floor','sàn trơn']],
      ['Mình có thể chạm vào lá lớn không?','May I touch the large leaves?','Không, dầu trên tay có thể làm hại cây.','No. Oils from your hands may damage the plant.',['protect a plant','bảo vệ cây']],
      ['Mình sẽ chụp ảnh mà không dùng đèn flash.','I will take a photograph without using flash.','Cách đó được phép trong nhà kính.','That is permitted inside the glasshouse.',['photography rule','quy định chụp ảnh']],
    ]],
    ['Buying a Seed Packet','Mua gói hạt','Khách ghé cửa hàng vườn.','Chọn hạt phù hợp ban công.',[
      ['Loại hoa nào trồng tốt trong chậu nhỏ?','Which flowers grow well in a small pot?','Cúc vạn thọ này phù hợp cho ban công nắng.','These marigolds suit a sunny balcony.',['seed packet','gói hạt']],
      ['Khi nào mình nên gieo hạt?','When should I sow the seeds?','Gieo vào đầu mùa xuân khi đêm bớt lạnh.','Sow them in early spring when nights are milder.',['sowing season','mùa gieo']],
      ['Mình lấy một gói và tờ hướng dẫn.','I will take one packet and the instruction sheet.','Hướng dẫn cũng ghi độ sâu và khoảng cách.','The sheet also gives the depth and spacing.',['planting instruction','hướng dẫn trồng']],
    ]],
  ]}),
  t({id:'making-a-fruit-smoothie',title:'Making a Fruit Smoothie',titleVi:'Làm sinh tố trái cây',category:'Food & Drink',icon:'🥭',level:'A1',description:'Chuẩn bị trái cây, dùng máy xay và điều chỉnh độ đặc.',grammar:['imperatives','some-any','how-much'],scenarios:[
    ['Choosing the Fruit','Chọn trái cây','Hai người chọn nguyên liệu trong bếp.','Dùng trái chín và lượng vừa đủ.',[
      ['Mình còn chuối chín không?','Do we have any ripe bananas left?','Có hai quả trong chiếc bát màu xanh.','There are two in the blue bowl.',['ripe banana','chuối chín']],
      ['Mình cần bao nhiêu xoài?','How much mango do we need?','Nửa quả xoài lớn là đủ.','Half of a large mango is enough.',['half a mango','nửa quả xoài']],
      ['Mình sẽ thêm một ít dâu đông lạnh.','I will add some frozen strawberries.','Chúng sẽ làm sinh tố lạnh hơn.','They will make the smoothie colder.',['frozen fruit','trái cây đông lạnh']],
    ]],
    ['Preparing the Blender','Chuẩn bị máy xay','Nguyên liệu đã được rửa.','Cắt nhỏ và đóng nắp.',[
      ['Mình cắt chuối thành miếng nhỏ nhé.','I will cut the banana into small pieces.','Đặt chúng vào cối trước chất lỏng.','Put them into the jug before the liquid.',['blender jug','cối xay']],
      ['Cần bao nhiêu sữa?','How much milk do we need?','Đổ đến vạch hai trăm mililit.','Pour it up to the two-hundred-millilitre line.',['measurement line','vạch đo']],
      ['Nắp đã được đóng chắc chưa?','Is the lid closed firmly?','Có, mũi tên trên nắp đã thẳng hàng.','Yes. The arrows on the lid are aligned.',['secure lid','nắp chắc']],
    ]],
    ['Blending Safely','Xay an toàn','Máy chuẩn bị chạy.','Bắt đầu chậm và không mở nắp.',[
      ['Mình dùng tốc độ nào trước?','Which speed should I use first?','Bắt đầu ở mức thấp trong mười giây.','Start on low for ten seconds.',['low speed','tốc độ thấp']],
      ['Vẫn còn vài miếng lớn.','There are still a few large pieces.','Tắt máy trước khi dùng thìa đẩy xuống.','Switch it off before pushing them down with a spoon.',['switch off first','tắt trước']],
      ['Bây giờ mình có thể xay thêm.','I can blend it again now.','Giữ tay trên nắp khi tăng tốc.','Keep one hand on the lid as the speed increases.',['blend smoothly','xay mịn']],
    ]],
    ['Adjusting the Texture','Chỉnh độ đặc','Sinh tố hơi đặc.','Thêm chất lỏng và nếm.',[
      ['Sinh tố đặc quá để uống.','The smoothie is too thick to drink.','Thêm một ít sữa, không thêm hết cùng lúc.','Add a little milk rather than all of it at once.',['smoothie texture','độ đặc sinh tố']],
      ['Bây giờ nó chảy dễ hơn.','It pours more easily now.','Hãy nếm trước khi thêm mật ong.','Taste it before adding any honey.',['taste first','nếm trước']],
      ['Trái cây đã đủ ngọt rồi.','The fruit is sweet enough already.','Vậy mình không cần thêm đường.','Then we do not need any extra sugar.',['naturally sweet','ngọt tự nhiên']],
    ]],
  ]}),
  t({id:'wrapping-a-present',title:'Wrapping a Present',titleVi:'Gói quà',category:'Daily Life',icon:'🎁',level:'A1',description:'Đo giấy, gấp góc và gắn thiệp.',grammar:['imperatives','too-enough','can'],scenarios:[
    ['Measuring the Paper','Đo giấy','Hai người gói một hộp sách.','Cắt lượng giấy vừa đủ.',[
      ['Tờ giấy này có đủ lớn không?','Is this sheet of paper large enough?','Đặt hộp vào giữa để kiểm tra hai mép gặp nhau.','Place the box in the centre and check that the edges meet.',['wrapping paper','giấy gói']],
      ['Có quá nhiều giấy ở hai đầu.','There is too much paper at both ends.','Cắt bớt nhưng để đủ che nửa cạnh hộp.','Trim it, but leave enough to cover half the side.',['trim the paper','cắt bớt giấy']],
      ['Mình sẽ dùng thước để cắt thẳng.','I will use a ruler to make a straight cut.','Giữ giấy phẳng trên bàn.','Keep the paper flat on the table.',['straight edge','cạnh thẳng']],
    ]],
    ['Folding the Sides','Gấp hai bên','Hộp đã nằm úp trên giấy.','Tạo nếp gọn và dán.',[
      ['Mình gấp mép dài trước phải không?','Do I fold the long edge first?','Đúng, kéo giấy vừa chặt quanh hộp.','Yes. Pull the paper gently tight around the box.',['fold an edge','gấp mép']],
      ['Băng dính nên dài bao nhiêu?','How long should the tape be?','Một miếng ngắn đủ giữ đường nối.','A short piece is enough to hold the join.',['tape the join','dán đường nối']],
      ['Hai góc bên này không đều.','The two corners on this side are uneven.','Gấp cạnh trên xuống trước rồi ép hai góc vào.','Fold the top down first and press both corners inward.',['neat corner','góc gọn']],
    ]],
    ['Adding Ribbon','Thêm ruy băng','Hộp đã được gói kín.','Buộc nơ mà không làm rách giấy.',[
      ['Ruy băng này có quấn đủ quanh hộp không?','Is this ribbon long enough to go around the box?','Có, vẫn còn đủ để buộc một chiếc nơ.','Yes. There is still enough to tie a bow.',['tie a bow','buộc nơ']],
      ['Mình nên siết chặt đến đâu?','How tightly should I pull it?','Chỉ siết đủ để ruy băng không trượt.','Pull only enough to stop the ribbon from slipping.',['ribbon slips','ruy băng trượt']],
      ['Chiếc nơ sẽ nằm ở góc trên.','The bow will sit in the top corner.','Vị trí đó để lại chỗ cho tấm thiệp.','That position leaves space for the card.',['top corner','góc trên']],
    ]],
    ['Attaching the Card','Gắn thiệp','Người gói hoàn tất món quà.','Ghi người nhận và giữ thiệp chắc.',[
      ['Mình viết tên ở mặt nào?','Which side should I write the name on?','Viết ở mặt trống bên dưới lời chúc.','Write it on the blank side beneath the greeting.',['gift tag','thẻ quà']],
      ['Mình sẽ ký tên ở cuối.','I will sign my name at the bottom.','Thêm ngày nếu bạn muốn họ nhớ dịp này.','Add the date if you want them to remember the occasion.',['sign a card','ký thiệp']],
      ['Làm sao gắn thiệp mà không bị rơi?','How can I attach the card so it does not fall off?','Luồn dây của thiệp dưới ruy băng.','Thread the card string beneath the ribbon.',['attach securely','gắn chắc']],
    ]],
  ]}),
  t({id:'preparing-for-a-vaccination',title:'Preparing for a Vaccination',titleVi:'Chuẩn bị tiêm chủng',category:'Health',icon:'💉',level:'A2',description:'Kiểm tra lịch, cung cấp thông tin và chăm sóc sau tiêm.',grammar:['present-perfect','should','conditionals'],scenarios:[
    ['Checking the Appointment','Kiểm tra lịch','Người bệnh gọi trước ngày tiêm.','Xác nhận loại vaccine và giấy tờ.',[
      ['Lịch của tôi là lúc mười giờ sáng mai phải không?','Is my appointment at ten tomorrow morning?','Đúng, bạn được đặt cho mũi nhắc lại lúc mười giờ.','Yes. You are booked for a booster dose at ten.',['booster dose','mũi nhắc lại']],
      ['Tôi cần mang theo hồ sơ tiêm cũ chứ?','Do I need to bring my previous vaccination record?','Có, mang bản giấy hoặc bản điện tử nếu có.','Yes. Bring a paper or digital copy if available.',['vaccination record','hồ sơ tiêm']],
      ['Tôi cũng sẽ mang giấy tờ tùy thân có ảnh.','I will also bring photo identification.','Hãy đến sớm mười phút để làm thủ tục.','Arrive ten minutes early for registration.',['appointment check-in','làm thủ tục lịch hẹn']],
    ]],
    ['Sharing Health Information','Cung cấp thông tin sức khỏe','Nhân viên hỏi trước khi tiêm.','Nêu dị ứng, thuốc và tình trạng hiện tại.',[
      ['Bạn đã từng phản ứng nặng với vaccine chưa?','Have you ever had a severe reaction to a vaccine?','Chưa, tôi chỉ đau tay trong một ngày.','No. I have only had a sore arm for one day.',['previous reaction','phản ứng trước']],
      ['Bạn có đang sốt hoặc cảm thấy rất không khỏe không?','Do you currently have a fever or feel seriously unwell?','Không, tôi chỉ hơi nghẹt mũi do dị ứng theo mùa.','No. I have only mild congestion from seasonal allergies.',['current symptom','triệu chứng hiện tại']],
      ['Tôi đang dùng thuốc này mỗi ngày.','I take this medicine every day.','Cảm ơn, tôi sẽ ghi nó vào bảng sàng lọc.','Thank you. I will record it on the screening form.',['screening form','phiếu sàng lọc']],
    ]],
    ['Receiving the Injection','Nhận mũi tiêm','Người bệnh hơi lo trước kim tiêm.','Chọn tư thế và báo cảm giác.',[
      ['Tôi hơi chóng mặt khi nhìn thấy kim.','I sometimes feel faint when I see needles.','Bạn có thể nằm xuống trong lúc tiêm.','You can lie down while the injection is given.',['feel faint','cảm thấy choáng']],
      ['Tôi sẽ nhìn sang hướng khác và thở chậm.','I will look away and breathe slowly.','Hãy thả lỏng cánh tay thay vì gồng vai.','Relax your arm rather than tensing your shoulder.',['relax your arm','thả lỏng tay']],
      ['Mũi tiêm đã xong rồi à?','Is the injection already finished?','Rồi, hãy giữ miếng bông ở đó một lúc.','Yes. Hold the cotton pad there briefly.',['cotton pad','miếng bông']],
    ]],
    ['After the Vaccination','Sau tiêm','Nhân viên giải thích theo dõi.','Nhận biết phản ứng thường và lúc cần trợ giúp.',[
      ['Tôi cần ngồi chờ bao lâu?','How long do I need to wait here?','Hãy ở lại khu quan sát mười lăm phút.','Remain in the observation area for fifteen minutes.',['observation period','thời gian theo dõi']],
      ['Đau tay nhẹ có bình thường không?','Is mild arm pain normal?','Có, nó thường giảm sau một hoặc hai ngày.','Yes. It usually improves after one or two days.',['mild side effect','phản ứng nhẹ']],
      ['Nếu khó thở hoặc sưng mặt, tôi sẽ gọi cấp cứu.','If I develop breathing difficulty or facial swelling, I will call emergency services.','Đúng, những dấu hiệu đó cần trợ giúp ngay.','Correct. Those signs require immediate assistance.',['urgent reaction','phản ứng khẩn']],
    ]],
  ]}),
  t({id:'choosing-cloud-storage',title:'Choosing Cloud Storage',titleVi:'Chọn dịch vụ lưu trữ đám mây',category:'Technology',icon:'☁️',level:'A2',description:'So sánh dung lượng, chia sẻ và khả năng khôi phục.',grammar:['comparatives','conditionals','present-perfect'],scenarios:[
    ['Estimating Space','Ước tính dung lượng','Gia đình cần sao lưu ảnh và tài liệu.','Chọn gói theo nhu cầu thật.',[
      ['Thư viện ảnh hiện dùng bao nhiêu dung lượng?','How much storage does the photo library currently use?','Nó dùng khoảng một trăm hai mươi gigabyte.','It uses around one hundred and twenty gigabytes.',['storage usage','dung lượng sử dụng']],
      ['Tài liệu chỉ thêm khoảng mười gigabyte.','The documents add only about ten gigabytes.','Gói hai trăm gigabyte sẽ còn khoảng trống để tăng.','The two-hundred-gigabyte plan would leave some room for growth.',['room for growth','chỗ để tăng']],
      ['Mình không cần gói hai terabyte ngay.','We do not need the two-terabyte plan yet.','Đúng, có thể nâng cấp sau nếu gần đầy.','Correct. You can upgrade later if the space becomes nearly full.',['storage plan','gói lưu trữ']],
    ]],
    ['Sharing with Family','Chia sẻ gia đình','Nhiều người dùng chung gói nhưng cần riêng tư.','Hiểu dung lượng chung và tệp riêng.',[
      ['Gói gia đình có làm mọi người thấy ảnh của nhau không?','Does the family plan allow everyone to see one another’s photographs?','Không, dung lượng được chia sẻ nhưng tệp vẫn riêng.','No. Storage is shared, but files remain private.',['family sharing','chia sẻ gia đình']],
      ['Mỗi người có tài khoản riêng chứ?','Does each person keep a separate account?','Có, bạn chỉ mời địa chỉ email vào nhóm.','Yes. You simply invite each email address to the group.',['private file','tệp riêng']],
      ['Ai có thể thay đổi phương thức thanh toán?','Who can change the payment method?','Chỉ người tổ chức gói gia đình có quyền đó.','Only the family organizer has that permission.',['family organizer','người tổ chức gia đình']],
    ]],
    ['Understanding Recovery','Hiểu khôi phục','Người dùng lo xóa nhầm tệp.','Kiểm tra thùng rác và lịch sử phiên bản.',[
      ['Tệp bị xóa được giữ trong bao lâu?','How long are deleted files retained?','Chúng ở trong thùng rác ba mươi ngày.','They remain in the recycle bin for thirty days.',['deleted-file retention','thời gian giữ tệp xóa']],
      ['Nếu ghi đè tài liệu thì sao?','What happens if I overwrite a document?','Bạn có thể khôi phục phiên bản cũ trong chín mươi ngày.','You can restore an earlier version for ninety days.',['version history','lịch sử phiên bản']],
      ['Dịch vụ này có thay thế mọi bản sao lưu không?','Does this service replace every other backup?','Không, tệp quan trọng vẫn nên có bản sao độc lập.','No. Important files should still have an independent copy.',['independent backup','bản sao độc lập']],
    ]],
    ['Checking Offline Access','Kiểm tra truy cập ngoại tuyến','Gia đình đi nơi mạng yếu.','Chọn tệp có sẵn và hiểu đồng bộ.',[
      ['Mình có thể mở tài liệu khi không có mạng không?','Can I open documents without an internet connection?','Có, nếu bạn đánh dấu chúng dùng ngoại tuyến trước.','Yes, if you mark them for offline use in advance.',['offline access','truy cập ngoại tuyến']],
      ['Các chỉnh sửa sẽ được lưu ở đâu?','Where will the changes be saved?','Chúng được lưu trên thiết bị rồi đồng bộ khi có mạng.','They are stored on the device and synchronized when you reconnect.',['sync changes','đồng bộ thay đổi']],
      ['Nếu hai người sửa cùng lúc thì sao?','What happens if two people edit at the same time?','Dịch vụ có thể tạo bản xung đột để bạn so sánh.','The service may create a conflicting copy for you to compare.',['conflicting copy','bản xung đột']],
    ]],
  ]}),
  t({id:'arranging-a-home-cleaner',title:'Arranging a Home Cleaner',titleVi:'Sắp xếp người dọn nhà',category:'Home',icon:'🧹',level:'A2',description:'Thống nhất phạm vi, quyền vào nhà và phản hồi.',grammar:['polite-requests','future-arrangements','conditionals'],scenarios:[
    ['Agreeing on Tasks','Thống nhất công việc','Chủ nhà đặt buổi dọn lần đầu.','Phân biệt việc thường và việc thêm.',[
      ['Buổi dọn tiêu chuẩn bao gồm những phòng nào?','Which rooms are included in a standard cleaning visit?','Nó gồm bếp, hai phòng tắm và các khu sinh hoạt.','It covers the kitchen, two bathrooms, and the living areas.',['standard cleaning','dọn tiêu chuẩn']],
      ['Lau bên trong lò nướng có nằm trong gói không?','Is cleaning inside the oven included?','Không, đó là dịch vụ thêm cần đặt trước.','No. That is an extra service that needs advance booking.',['extra service','dịch vụ thêm']],
      ['Tuần này hãy ưu tiên bếp hơn phòng khách.','Please prioritize the kitchen over the living room this week.','Tôi sẽ ghi ưu tiên đó vào hướng dẫn buổi dọn.','I will add that priority to the visit notes.',['task priority','ưu tiên công việc']],
    ]],
    ['Sharing Access','Chia sẻ quyền vào','Chủ nhà không có mặt trong giờ dọn.','Cấp chìa khóa và báo động an toàn.',[
      ['Bạn sẽ vào nhà bằng cách nào khi tôi đi làm?','How will you enter the house while I am at work?','Chìa khóa có thể được giữ trong hộp khóa có mã.','The key can be kept in a coded lockbox.',['coded lockbox','hộp khóa có mã']],
      ['Mã có được lưu trong hệ thống của công ty không?','Will the code be stored in the company system?','Chỉ người dọn được phân công và quản lý mới truy cập được.','Only the assigned cleaner and manager can access it.',['assigned cleaner','người dọn được phân công']],
      ['Hệ thống báo động cần tắt trong mười giây.','The alarm needs to be disarmed within ten seconds.','Hãy cho tôi luyện quy trình khi bạn còn ở đây.','Let me practise the process while you are still here.',['disarm an alarm','tắt báo động']],
    ]],
    ['Protecting Belongings','Bảo vệ đồ đạc','Chủ nhà có vật dễ vỡ và phòng riêng.','Đặt giới hạn rõ trước buổi dọn.',[
      ['Bình gốm trên kệ rất dễ vỡ.','The ceramic vase on the shelf is extremely fragile.','Tôi sẽ không di chuyển nó và sẽ lau xung quanh.','I will leave it in place and clean around it.',['fragile item','đồ dễ vỡ']],
      ['Phòng làm việc sẽ khóa và không cần dọn.','The study will be locked and does not need cleaning.','Tôi sẽ đánh dấu phòng đó nằm ngoài phạm vi.','I will mark that room as out of scope.',['private room','phòng riêng']],
      ['Chất tẩy mạnh không được dùng trên mặt đá.','Strong cleaner must not be used on the stone surface.','Tôi sẽ dùng sản phẩm có nhãn dành cho đá tự nhiên.','I will use the product labelled for natural stone.',['surface-safe product','sản phẩm an toàn bề mặt']],
    ]],
    ['Giving Feedback','Đưa phản hồi','Sau buổi đầu có một việc bị bỏ sót.','Nêu cụ thể và điều chỉnh lần sau.',[
      ['Phòng tắm rất sạch, nhưng sàn bếp chưa được lau.','The bathroom is very clean, but the kitchen floor was not mopped.','Tôi xin lỗi; ghi chú cho thấy thời gian đã hết trước công việc đó.','I am sorry. The notes show that the visit ended before that task.',['missed task','việc bị bỏ sót']],
      ['Lần sau hãy bỏ lau bụi phòng khách để đủ thời gian.','Next time, skip dusting the living room so there is enough time.','Tôi sẽ thay đổi thứ tự và xác nhận khi sàn hoàn tất.','I will change the order and confirm when the floor is finished.',['adjust the scope','điều chỉnh phạm vi']],
      ['Nếu vẫn thiếu thời gian, hãy báo trước khi rời đi.','If time is still short, please tell me before leaving.','Được, như vậy bạn có thể chọn việc ưu tiên.','Certainly. That allows you to choose the priority.',['specific feedback','phản hồi cụ thể']],
    ]],
  ]}),
  t({id:'taking-a-pottery-class',title:'Taking a Pottery Class',titleVi:'Học lớp làm gốm',category:'Entertainment',icon:'🏺',level:'A2',description:'Chuẩn bị đất, tạo hình và hoàn thiện sản phẩm.',grammar:['imperatives','present-perfect','sequencing'],scenarios:[
    ['Preparing the Clay','Chuẩn bị đất sét','Học viên bắt đầu một chiếc bát.','Loại bọt khí và chọn lượng đất.',[
      ['Mình cần bao nhiêu đất sét cho chiếc bát nhỏ?','How much clay do I need for a small bowl?','Một khối cỡ quả cam là đủ.','A piece about the size of an orange is enough.',['clay portion','phần đất sét']],
      ['Mình có cần nhào đất trước không?','Do I need to knead the clay first?','Có, hãy ép và gập để loại bọt khí.','Yes. Press and fold it to remove air pockets.',['air pocket','bọt khí']],
      ['Đất đã mềm và có màu đều.','The clay is soft and evenly coloured now.','Vậy nó đã sẵn sàng để đặt lên bàn xoay.','Then it is ready to place on the wheel.',['pottery wheel','bàn xoay gốm']],
    ]],
    ['Shaping the Bowl','Tạo hình bát','Bàn xoay đang chạy chậm.','Đặt tâm và nâng thành bát.',[
      ['Khối đất cứ lệch sang một bên.','The clay keeps moving to one side.','Giữ khuỷu tay chắc và đưa đất vào tâm.','Keep your elbows steady and guide the clay to the centre.',['centre the clay','đặt tâm đất']],
      ['Mình nên dùng bao nhiêu nước?','How much water should I use?','Chỉ làm ẩm tay; quá nhiều nước sẽ làm đất yếu.','Dampen your hands only. Too much water will weaken the clay.',['dampen your hands','làm ẩm tay']],
      ['Thành bát đang mỏng hơn ở phía trên.','The bowl wall is becoming thinner at the top.','Dùng lực đều khi kéo thành lên.','Use even pressure as you pull the wall upward.',['even pressure','lực đều']],
    ]],
    ['Adding a Design','Thêm họa tiết','Bát đã khô vừa đủ để trang trí.','Khắc mà không làm thủng.',[
      ['Bề mặt đã đủ khô để khắc chưa?','Is the surface dry enough for carving?','Có, nó cứng như da nhưng vẫn hơi ẩm.','Yes. It is leather-hard but still slightly damp.',['leather-hard','độ cứng da']],
      ['Mình muốn vẽ ba đường quanh mép.','I want to carve three lines around the rim.','Giữ dụng cụ nghiêng nhẹ và xoay bát từ từ.','Hold the tool at a slight angle and turn the bowl slowly.',['carving tool','dụng cụ khắc']],
      ['Một đường hơi sâu hơn hai đường kia.','One line is slightly deeper than the others.','Bạn có thể làm mịn mép bằng miếng bọt biển ẩm.','You can smooth the edge with a damp sponge.',['smooth an edge','làm mịn mép']],
    ]],
    ['Firing and Collection','Nung và nhận sản phẩm','Giảng viên giải thích bước sau lớp.','Chọn men và nhận đồ an toàn.',[
      ['Khi nào chiếc bát sẽ được nung?','When will the bowl be fired?','Lần nung đầu sẽ diễn ra sau khi nó khô hoàn toàn.','The first firing will happen after it is completely dry.',['first firing','lần nung đầu']],
      ['Mình có thể chọn men màu xanh này không?','May I choose this blue glaze?','Có, đánh dấu mã B7 trên phiếu của bạn.','Yes. Mark code B7 on your form.',['glaze code','mã men']],
      ['Bao lâu nữa mình có thể nhận sản phẩm?','How soon can I collect the finished piece?','Nó sẽ sẵn sàng trong khoảng ba tuần.','It will be ready in approximately three weeks.',['finished piece','sản phẩm hoàn thiện']],
    ]],
  ]}),
  t({id:'buying-secondhand-furniture',title:'Buying Secondhand Furniture',titleVi:'Mua đồ nội thất cũ',category:'Shopping',icon:'🛋️',level:'A2',description:'Kiểm tra kích thước, tình trạng và vận chuyển.',grammar:['present-perfect','comparatives','conditionals'],scenarios:[
    ['Measuring the Item','Đo đồ','Khách xem một chiếc bàn cũ.','Kiểm tra vừa phòng và cửa.',[
      ['Chiếc bàn rộng bao nhiêu?','How wide is the table?','Nó rộng chín mươi centimet và dài một mét tư.','It is ninety centimetres wide and one metre forty long.',['item dimensions','kích thước món đồ']],
      ['Cửa căn hộ mình chỉ rộng tám mươi centimet.','My apartment door is only eighty centimetres wide.','Chân bàn có thể tháo ra để vận chuyển.','The table legs can be removed for transport.',['removable legs','chân tháo được']],
      ['Mình sẽ đo cả góc cầu thang trước khi mua.','I will measure the staircase turn before buying it.','Điều đó tránh bị mắc dù qua được cửa.','That prevents it becoming stuck even if it passes through the door.',['measure access','đo lối vào']],
    ]],
    ['Checking the Condition','Kiểm tra tình trạng','Bàn có dấu đã dùng.','Phân biệt lỗi thẩm mỹ và kết cấu.',[
      ['Vết này chỉ ở bề mặt hay là vết nứt?','Is this mark only on the surface, or is it a crack?','Đó là vết xước trong lớp phủ, không đi vào gỗ.','It is a scratch in the finish and does not enter the wood.',['surface scratch','vết xước bề mặt']],
      ['Một chân bàn hơi lung lay.','One of the legs feels slightly loose.','Con ốc cần siết lại nhưng ren vẫn còn tốt.','The screw needs tightening, but the thread is still sound.',['loose leg','chân lỏng']],
      ['Ngăn kéo có trượt hết hành trình không?','Does the drawer slide through its full range?','Có, nó mở và đóng mà không bị kẹt.','Yes. It opens and closes without sticking.',['smooth drawer','ngăn kéo trơn']],
    ]],
    ['Agreeing on the Price','Thống nhất giá','Khách cân nhắc chi phí sửa nhỏ.','Đưa đề nghị dựa trên tình trạng.',[
      ['Giá niêm yết là hai triệu phải không?','Is the listed price two million dong?','Đúng, giá đó đã tính đến các vết xước.','Yes. That price already reflects the scratches.',['listed price','giá niêm yết']],
      ['Bạn có chấp nhận một triệu tám nếu mình tự vận chuyển?','Would you accept one million eight if I arrange transport myself?','Tôi có thể đồng ý vì bạn lấy trong hôm nay.','I can agree because you are collecting it today.',['make an offer','đưa đề nghị']],
      ['Mình sẽ chuyển khoản sau khi ghi biên nhận.','I will transfer the payment after we write a receipt.','Hãy ghi rõ bàn được bán theo tình trạng đã kiểm tra.','State clearly that the table is sold in the condition inspected.',['sale condition','tình trạng bán']],
    ]],
    ['Moving It Safely','Vận chuyển an toàn','Hai người chuẩn bị đưa bàn lên xe.','Tháo, bọc và nâng đúng.',[
      ['Mình sẽ chụp ảnh vị trí từng chân trước khi tháo.','I will photograph the position of each leg before removing it.','Như vậy lắp lại sẽ dễ hơn.','That will make reassembly easier.',['reassembly guide','hướng dẫn lắp lại']],
      ['Mặt bàn cần được bọc bằng chăn.','The tabletop needs to be wrapped in a blanket.','Dùng dây mềm để giữ mà không làm xước mép.','Use soft straps to secure it without scratching the edges.',['protective blanket','chăn bảo vệ']],
      ['Mình nên nâng từ hai đầu chứ?','Should we lift it from opposite ends?','Có, giữ lưng thẳng và thống nhất trước khi nâng.','Yes. Keep your backs straight and coordinate before lifting.',['coordinate a lift','phối hợp nâng']],
    ]],
  ]}),
  t({id:'planning-a-family-reunion',title:'Planning a Family Reunion',titleVi:'Lên kế hoạch họp mặt gia đình',category:'Family',icon:'👪',level:'A2',description:'Chọn ngày, địa điểm và hoạt động cho nhiều thế hệ.',grammar:['future-arrangements','comparatives','suggestions'],scenarios:[
    ['Finding a Date','Tìm ngày','Người thân sống ở nhiều thành phố.','Thu thập lựa chọn và chốt công bằng.',[
      ['Mình nên gửi ba ngày để mọi người bình chọn.','We should send three dates for everyone to vote on.','Hãy gồm một cuối tuần trong kỳ nghỉ học.','Include one weekend during the school holiday.',['date poll','bình chọn ngày']],
      ['Bao lâu thì đóng bình chọn?','How long should the poll remain open?','Năm ngày là đủ để các gia đình kiểm tra lịch.','Five days is enough for families to check their schedules.',['check availability','kiểm tra lịch']],
      ['Nếu hai ngày có số phiếu bằng nhau thì sao?','What if two dates receive the same number of votes?','Chọn ngày giúp người đi xa có nhiều lựa chọn tàu hơn.','Choose the date that gives distant relatives more travel options.',['tie-break rule','quy tắc phá hòa']],
    ]],
    ['Choosing the Venue','Chọn địa điểm','Nhóm có trẻ nhỏ và người đi lại khó.','Cân bằng vị trí, chi phí và tiếp cận.',[
      ['Nhà hàng trung tâm thuận tiện nhưng khá đắt.','The central restaurant is convenient but rather expensive.','Hội trường cộng đồng rẻ hơn và có bếp riêng.','The community hall is cheaper and has its own kitchen.',['venue option','lựa chọn địa điểm']],
      ['Hội trường có lối vào không bậc không?','Does the hall have a step-free entrance?','Có, và bãi xe có hai chỗ tiếp cận gần cửa.','Yes. The car park has two accessible spaces near the door.',['accessible venue','địa điểm tiếp cận']],
      ['Mình sẽ kiểm tra sức chứa trước khi đặt cọc.','I will check the capacity before paying a deposit.','Cần chỗ cho khoảng sáu mươi người và khu chơi nhỏ.','We need room for about sixty people and a small play area.',['venue capacity','sức chứa địa điểm']],
    ]],
    ['Planning the Food','Lên đồ ăn','Gia đình muốn mỗi người góp một phần.','Tránh trùng món và đáp ứng nhu cầu.',[
      ['Mình có thể chia danh sách thành món chính, món phụ và tráng miệng.','We can divide the list into mains, side dishes, and desserts.','Mỗi gia đình chọn một mục chưa có người nhận.','Each family can choose an item that has not been taken.',['shared meal list','danh sách bữa ăn chung']],
      ['Ai sẽ thu thập thông tin dị ứng?','Who will collect the allergy information?','Tôi sẽ thêm một ô riêng vào biểu mẫu xác nhận.','I will add a separate field to the response form.',['dietary information','thông tin ăn uống']],
      ['Món nên có nhãn nguyên liệu tại bàn.','Dishes should have ingredient labels at the table.','Như vậy khách không phải đoán hoặc hỏi trước mọi món.','That prevents guests from guessing or asking about every dish.',['ingredient label','nhãn nguyên liệu']],
    ]],
    ['Including Every Generation','Bao gồm mọi thế hệ','Chương trình cần phù hợp trẻ nhỏ và người lớn tuổi.','Chọn hoạt động linh hoạt.',[
      ['Trò chơi vận động cả buổi sẽ không phù hợp với mọi người.','Active games throughout the day will not suit everyone.','Hãy có cả khu kể chuyện và bàn xem ảnh cũ.','Include a storytelling area and a table of old photographs.',['multi-generation activity','hoạt động nhiều thế hệ']],
      ['Trẻ em có thể chuẩn bị một câu hỏi phỏng vấn người lớn tuổi.','Children can prepare one question to interview an older relative.','Cách đó tạo cuộc trò chuyện thay vì biểu diễn một chiều.','That creates conversation rather than a one-way performance.',['family story','câu chuyện gia đình']],
      ['Mình cũng nên dành một phòng yên tĩnh để nghỉ.','We should also reserve a quiet room for breaks.','Một lịch tự chọn giúp mọi người tham gia theo sức.','An optional schedule lets people participate at their own pace.',['quiet break room','phòng nghỉ yên tĩnh']],
    ]],
  ]}),
  t({id:'planning-a-customer-survey',title:'Planning a Customer Survey',titleVi:'Lên kế hoạch khảo sát khách hàng',category:'Work',icon:'📋',level:'B1',description:'Đặt câu hỏi trung lập, chọn mẫu và dùng kết quả có giới hạn.',grammar:['question-forms','data-language','hedging'],scenarios:[
    ['Defining the Decision','Xác định quyết định','Đội muốn gửi khảo sát nhưng chưa biết sẽ dùng kết quả ra sao.','Nối khảo sát với một quyết định cụ thể.',[
      ['Quyết định nào sẽ thay đổi dựa trên khảo sát này?','Which decision will change as a result of this survey?','Chúng ta cần chọn ưu tiên cho ba cải tiến hỗ trợ.','We need to prioritize three improvements to customer support.',['survey objective','mục tiêu khảo sát']],
      ['Vậy câu hỏi nên tập trung vào khó khăn khi nhận hỗ trợ.','Then the questions should focus on difficulties in receiving support.','Đúng, hỏi mức yêu thích thương hiệu sẽ không giúp quyết định này.','Exactly. Asking about general brand preference would not inform this decision.',['decision-relevant','liên quan quyết định']],
      ['Mình sẽ viết một câu mục đích ở đầu bản kế hoạch.','I will write a one-sentence purpose at the top of the plan.','Nó sẽ giúp loại các câu hỏi tò mò nhưng không hữu ích.','That will help remove questions that are interesting but not useful.',['survey scope','phạm vi khảo sát']],
    ]],
    ['Writing Neutral Questions','Viết câu hỏi trung lập','Bản nháp có câu dẫn dắt và câu kép.','Tạo câu dễ hiểu, đo một ý.',[
      ['Câu “Bạn thích dịch vụ nhanh và thân thiện của chúng tôi chứ?” có vấn đề gì?','What is wrong with asking, “Do you like our fast and friendly service?”','Nó giả định dịch vụ nhanh và hỏi hai điều cùng lúc.','It assumes the service is fast and asks about two things at once.',['leading question','câu hỏi dẫn dắt']],
      ['Mình nên tách tốc độ và cách giao tiếp thành hai câu.','We should separate speed and communication into two questions.','Và dùng thang đo có lựa chọn tích cực lẫn tiêu cực cân bằng.','Use a scale with balanced positive and negative options.',['balanced scale','thang đo cân bằng']],
      ['Hãy thử câu hỏi với năm người trước khi gửi rộng.','Test the questions with five people before sending them widely.','Họ có thể chỉ ra từ ngữ mà nội bộ mình thấy hiển nhiên.','They may identify wording that seems obvious only to insiders.',['pilot survey','khảo sát thử']],
    ]],
    ['Interpreting Responses','Diễn giải phản hồi','Khảo sát có tỷ lệ trả lời thấp.','Báo kết quả mà không khái quát quá mức.',[
      ['Chỉ mười hai phần trăm người nhận đã trả lời.','Only twelve percent of recipients responded.','Người có trải nghiệm rất tốt hoặc rất xấu có thể trả lời nhiều hơn.','People with very positive or negative experiences may be more likely to respond.',['response bias','thiên lệch phản hồi']],
      ['Mình có thể nói sáu mươi phần trăm khách hàng muốn chat không?','Can we say that sixty percent of customers prefer chat?','Chỉ nên nói sáu mươi phần trăm người trả lời trong mẫu này.','Say that sixty percent of respondents in this sample preferred chat.',['qualified claim','tuyên bố có giới hạn']],
      ['Kết quả nên được kết hợp với dữ liệu sử dụng thực tế.','The findings should be combined with actual usage data.','Hai nguồn cùng hướng sẽ tạo cơ sở quyết định mạnh hơn.','Agreement between the two sources would provide stronger grounds for a decision.',['triangulate data','đối chiếu nguồn dữ liệu']],
    ]],
  ]}),
  t({id:'coordinating-a-volunteer-rota',title:'Coordinating a Volunteer Rota',titleVi:'Điều phối lịch tình nguyện',category:'Community',icon:'🗓️',level:'B1',description:'Thu thập thời gian, bảo đảm năng lực và xử lý đổi ca.',grammar:['future-arrangements','conditionals','polite-requests'],scenarios:[
    ['Gathering Availability','Thu thập thời gian','Điều phối viên chuẩn bị lịch cho bếp cộng đồng.','Thu thời gian và giới hạn rõ.',[
      ['Biểu mẫu nên hỏi ngày rảnh hay ca cụ thể?','Should the form ask about available days or specific shifts?','Hỏi từng ca sẽ tránh giả định người rảnh cả ngày.','Ask about individual shifts to avoid assuming all-day availability.',['shift availability','thời gian rảnh theo ca']],
      ['Mình cũng cần biết số ca tối đa mỗi người muốn nhận.','We also need to know the maximum number of shifts each person wants.','Điều đó giúp không phụ thuộc quá mức vào người nhiệt tình nhất.','That prevents us from over-relying on the most enthusiastic volunteers.',['maximum commitment','mức cam kết tối đa']],
      ['Hãy cho họ chọn những ngày hoàn toàn không thể.','Allow them to mark dates when they are completely unavailable.','Thông tin đó giảm việc phải đổi lịch sau này.','That information will reduce later rescheduling.',['unavailable date','ngày không thể tham gia']],
    ]],
    ['Matching Skills','Ghép kỹ năng','Một số ca cần người đã được đào tạo.','Bảo đảm năng lực mà vẫn tạo cơ hội học.',[
      ['Mỗi ca bếp cần ít nhất một người có chứng nhận an toàn thực phẩm.','Each kitchen shift needs at least one person with food-safety certification.','Mình có bảy tình nguyện viên đã được đào tạo.','We have seven trained volunteers.',['trained volunteer','tình nguyện viên đã đào tạo']],
      ['Người mới có thể được xếp cùng họ thay vì bị loại khỏi ca.','New volunteers can be paired with them rather than excluded from the shift.','Cách đó vừa bảo đảm an toàn vừa xây năng lực.','That protects safety while building capability.',['buddy arrangement','sắp xếp người kèm']],
      ['Không nên để cùng một người có chuyên môn trực mọi cuối tuần.','The same skilled person should not cover every weekend.','Hãy phân phối ca có trách nhiệm đồng đều nhất có thể.','Distribute responsibility shifts as evenly as possible.',['skill coverage','phủ kỹ năng']],
    ]],
    ['Publishing the Rota','Công bố lịch','Bản nháp đã ghép mọi người.','Xin xác nhận và bảo vệ thông tin liên hệ.',[
      ['Mình sẽ gửi lịch trong nhóm chat chung.','I will share the rota in the group chat.','Chỉ dùng tên, không đăng số điện thoại lên bảng công khai.','Use names only; do not place phone numbers on the public board.',['publish a rota','công bố lịch']],
      ['Mọi người có ba ngày để xác nhận ca.','Everyone has three days to confirm their shifts.','Những ca chưa xác nhận sẽ được đánh dấu thay vì giả định đã đồng ý.','Unconfirmed shifts will be marked rather than treated as accepted.',['shift confirmation','xác nhận ca']],
      ['Sau khi chốt, chỉ điều phối viên mới sửa bản chính.','Once finalized, only the coordinator should edit the master copy.','Như vậy sẽ không có nhiều phiên bản mâu thuẫn.','That prevents multiple conflicting versions.',['master rota','lịch chính']],
    ]],
    ['Handling a Swap','Xử lý đổi ca','Một tình nguyện viên không thể đến phút chót.','Đổi người mà vẫn giữ kỹ năng cần.',[
      ['Tôi không thể làm ca sáng mai vì con bị ốm.','I cannot cover tomorrow morning because my child is ill.','Cảm ơn đã báo; bạn không cần tìm người thay một mình.','Thank you for telling us. You do not have to find a replacement alone.',['last-minute absence','vắng phút chót']],
      ['Có hai người rảnh nhưng chưa có chứng nhận bếp.','Two people are free, but neither has kitchen certification.','Vậy cần chuyển một người có chứng nhận từ ca chiều.','Then a certified volunteer needs to move from the afternoon shift.',['safe substitution','thay ca an toàn']],
      ['Mình sẽ hỏi trước chứ không tự đổi lịch của họ.','I will ask before changing anyone’s assignment.','Khi xác nhận, cập nhật bản chính và báo cả hai ca.','Once confirmed, update the master copy and notify both shifts.',['confirm a swap','xác nhận đổi ca']],
    ]],
  ]}),
  t({id:'setting-a-boundary-with-a-friend',title:'Setting a Boundary with a Friend',titleVi:'Đặt ranh giới với bạn bè',category:'Friends & Social Life',icon:'🧱',level:'B1',description:'Nêu giới hạn, giữ sự quan tâm và phản hồi khi bị gây áp lực.',grammar:['assertive-language','conditionals','empathetic-language'],scenarios:[
    ['Naming the Pattern','Nêu mẫu hành vi','Một người bạn thường gọi muộn để trút bầu tâm sự.','Mô tả tác động mà không phủ nhận tình bạn.',[
      ['Mình quan tâm bạn, nhưng các cuộc gọi sau nửa đêm đang ảnh hưởng giấc ngủ.','I care about you, but calls after midnight are affecting my sleep.','Mình không nhận ra việc đó xảy ra thường xuyên đến vậy.','I did not realize that it had become so frequent.',['name a boundary','nêu ranh giới']],
      ['Tuần này đã có ba cuộc gọi khi mình đang ngủ.','There have been three calls this week while I was asleep.','Mình hiểu tại sao bạn cần thay đổi điều này.','I understand why you need this to change.',['describe impact','mô tả tác động']],
      ['Ranh giới không có nghĩa mình không muốn nghe bạn.','The boundary does not mean that I am unwilling to listen.','Nó chỉ đặt thời gian mà bạn có khả năng hỗ trợ.','It simply defines when you have the capacity to help.',['emotional capacity','khả năng cảm xúc']],
    ]],
    ['Making a Clear Request','Đưa yêu cầu rõ','Hai người thống nhất cách liên hệ.','Nói điều được và ngoại lệ khẩn.',[
      ['Sau mười giờ, hãy nhắn trước thay vì gọi.','After ten o’clock, please message before calling.','Nếu mình đang rất hoảng loạn thì sao?','What if I am extremely distressed?',['clear request','yêu cầu rõ']],
      ['Nếu có nguy hiểm ngay, hãy gọi dịch vụ khẩn hoặc đường dây hỗ trợ.','If there is immediate danger, contact emergency services or a crisis line.','Còn nếu cần nói chuyện, mình có thể trả lời sáng hôm sau.','If I need to talk, you can respond the following morning.',['urgent exception','ngoại lệ khẩn']],
      ['Mình sẽ tắt chuông điện thoại khi đi ngủ.','I will silence my phone when I go to bed.','Biết trước điều đó giúp mình không hiểu im lặng là bị bỏ rơi.','Knowing that helps me avoid interpreting silence as rejection.',['communication limit','giới hạn liên lạc']],
    ]],
    ['Responding to Pressure','Phản hồi khi bị gây áp lực','Người bạn nói “bạn thật sự quan tâm thì sẽ luôn nghe”.','Giữ giới hạn mà không tranh cãi về tình cảm.',[
      ['Nếu bạn thật sự quan tâm, bạn sẽ nghe bất cứ lúc nào.','If you genuinely cared, you would listen at any time.','Mình quan tâm và vẫn không thể luôn sẵn sàng vào ban đêm.','I care about you, and I still cannot be available throughout the night.',['guilt pressure','áp lực tội lỗi']],
      ['Vậy mình phải tự xoay xở hết sao?','So am I supposed to handle everything alone?','Mình có thể giúp bạn lập danh sách nhiều nguồn hỗ trợ hơn.','I can help you build a broader list of support options.',['repeat a boundary','nhắc lại ranh giới']],
      ['Mình sẽ không tranh luận về việc giới hạn có được phép hay không.','I will not debate whether I am allowed to have this limit.','Mình cần thời gian để quen, nhưng đã nghe rõ.','I need time to adjust, but I have heard you clearly.',['hold a boundary','giữ ranh giới']],
    ]],
    ['Reviewing the Agreement','Xem lại thỏa thuận','Vài tuần sau, cách liên lạc đã thay đổi.','Củng cố điều hiệu quả và sửa điểm khó.',[
      ['Việc nhắn trước đã giúp mình trả lời khi có khả năng.','Messaging first has helped me respond when I have capacity.','Mình cũng bắt đầu gọi cho chị gái vào những tối bạn bận.','I have also begun calling my sister on evenings when you are unavailable.',['broader support','mạng hỗ trợ rộng hơn']],
      ['Có lần mình bỏ lỡ tin nhắn đến tận trưa hôm sau.','On one occasion, I missed your message until the following afternoon.','Mình đã thất vọng nhưng dùng một lựa chọn khác trong danh sách.','I was disappointed, but I used another option from the list.',['boundary review','xem lại ranh giới']],
      ['Mình muốn tiếp tục thỏa thuận hiện tại.','I would like to continue with the current agreement.','Mình đồng ý; nó rõ hơn và ít gây tổn thương cho cả hai.','I agree. It is clearer and less harmful for both of us.',['sustainable support','hỗ trợ bền vững']],
    ]],
  ]}),
  t({id:'appealing-an-insurance-decision',title:'Appealing an Insurance Decision',titleVi:'Khiếu nại quyết định bảo hiểm',category:'Services',icon:'📨',level:'B1',description:'Đọc lý do, bổ sung bằng chứng và yêu cầu xem xét độc lập.',grammar:['formal-requests','passive-voice','reported-speech'],scenarios:[
    ['Reading the Decision','Đọc quyết định','Khách nhận thư từ chối yêu cầu.','Xác định điều khoản và căn cứ.',[
      ['Thư nói yêu cầu bị từ chối vì tình trạng có sẵn.','The letter says that the claim was declined because of a pre-existing condition.','Nó có nêu điều khoản hợp đồng cụ thể không?','Does it identify the specific policy clause?',['claim decision','quyết định yêu cầu']],
      ['Có số điều khoản nhưng không giải thích bằng chứng nào được dùng.','It gives a clause number but does not explain which evidence was used.','Hãy yêu cầu bản lý do đầy đủ và tài liệu được xem xét.','Request the full rationale and the documents considered.',['decision rationale','lý do quyết định']],
      ['Ngày chẩn đoán trong thư cũng sớm hơn hồ sơ bác sĩ.','The diagnosis date in the letter is also earlier than the medical record.','Sai lệch đó có thể là trọng tâm của khiếu nại.','That discrepancy may be central to the appeal.',['factual discrepancy','sai lệch dữ kiện']],
    ]],
    ['Gathering Evidence','Thu thập bằng chứng','Khách chuẩn bị hồ sơ từ bác sĩ.','Chọn tài liệu liên quan và có ngày.',[
      ['Bác sĩ có thể viết thư xác nhận ngày triệu chứng bắt đầu.','The doctor can write a letter confirming when the symptoms began.','Thư nên dựa trên hồ sơ khám, không chỉ ký ức.','The letter should refer to clinical records rather than memory alone.',['clinical evidence','bằng chứng lâm sàng']],
      ['Mình cũng có hóa đơn cho thấy hợp đồng bắt đầu trước chẩn đoán.','I also have a statement showing that the policy began before the diagnosis.','Hãy thêm nó để làm rõ dòng thời gian bảo hiểm.','Include it to clarify the coverage timeline.',['coverage timeline','dòng thời gian bảo hiểm']],
      ['Có cần gửi toàn bộ bệnh án không?','Do I need to submit my complete medical history?','Chỉ gửi phần liên quan, trừ khi họ giải thích nhu cầu rộng hơn.','Provide the relevant sections unless they justify a broader request.',['relevant record','hồ sơ liên quan']],
    ]],
    ['Writing the Appeal','Viết khiếu nại','Khách soạn thư chính thức.','Nêu lỗi và kết quả mong muốn rõ.',[
      ['Mình nên kể toàn bộ trải nghiệm cảm xúc không?','Should I describe the entire emotional experience?','Bạn có thể nêu tác động ngắn, nhưng lập luận chính nên dựa trên dữ kiện.','You may state the impact briefly, but the main argument should rely on facts.',['appeal ground','căn cứ khiếu nại']],
      ['Tôi sẽ đối chiếu từng ngày với tài liệu đính kèm.','I will match each date to the attached evidence.','Đánh số phụ lục để người xem dễ kiểm tra.','Number the appendices so that the reviewer can verify them easily.',['evidence appendix','phụ lục bằng chứng']],
      ['Yêu cầu của tôi là đánh giá lại và trả lời bằng văn bản.','My requested outcome is a reassessment and a written response.','Hãy thêm thời hạn phản hồi theo quy trình của họ.','Add the response timeframe stated in their process.',['requested outcome','kết quả yêu cầu']],
    ]],
    ['Escalating Fairly','Chuyển xem xét','Khiếu nại nội bộ vẫn bị từ chối.','Hiểu cơ chế độc lập và giữ hồ sơ.',[
      ['Quyết định mới chỉ lặp lại kết luận cũ.','The new decision merely repeats the earlier conclusion.','Nó có giải quyết bằng chứng về ngày chẩn đoán không?','Does it address the evidence about the diagnosis date?',['address evidence','xử lý bằng chứng']],
      ['Không, bằng chứng đó không được nhắc đến.','No. That evidence is not mentioned.','Bạn có thể yêu cầu cơ quan độc lập xem cả quy trình lẫn nội dung.','You can ask the independent body to review both process and substance.',['independent appeal','khiếu nại độc lập']],
      ['Tôi sẽ gửi toàn bộ thư từ theo thứ tự thời gian.','I will submit all correspondence in chronological order.','Một hồ sơ rõ giúp người xem thấy điểm nào chưa được trả lời.','A clear record helps the reviewer identify what remains unanswered.',['chronological record','hồ sơ theo thời gian']],
    ]],
  ]}),
  t({id:'onboarding-a-remote-employee',title:'Onboarding a Remote Employee',titleVi:'Hướng dẫn nhân viên làm từ xa mới',category:'Work',icon:'🧑‍💻',level:'B1',description:'Chuẩn bị quyền truy cập, quan hệ và mục tiêu đầu kỳ.',grammar:['future-forms','present-perfect','workplace-language'],scenarios:[
    ['Preparing Before Day One','Chuẩn bị trước ngày đầu','Quản lý kiểm tra thiết bị và tài khoản.','Tránh ngày đầu bị chặn vì quyền truy cập.',[
      ['Laptop đã được giao và xác nhận nhận chưa?','Has the laptop been delivered and receipt confirmed?','Có, nhân viên mới đã nhận nó sáng nay.','Yes. The new employee received it this morning.',['equipment delivery','giao thiết bị']],
      ['Những tài khoản nào cần hoạt động trước thứ Hai?','Which accounts need to be active before Monday?','Email, chat, kho mã và cổng học tập là thiết yếu.','Email, chat, the code repository, and the learning portal are essential.',['essential access','quyền truy cập thiết yếu']],
      ['Mình sẽ kiểm tra bằng tài khoản thử thay vì giả định lời mời đủ.','I will test with a temporary account rather than assume invitations are sufficient.','Cách đó phát hiện quyền thiếu trước ngày đầu.','That will reveal missing permissions before the first day.',['access check','kiểm tra quyền']],
    ]],
    ['Structuring the First Week','Cấu trúc tuần đầu','Lịch có quá nhiều cuộc họp giới thiệu.','Cân bằng gặp người và thời gian tự học.',[
      ['Lịch thứ Hai hiện có bảy cuộc gọi liên tiếp.','Monday’s schedule currently has seven consecutive calls.','Như vậy người mới sẽ không có thời gian xử lý thông tin.','That leaves the new starter no time to process information.',['onboarding schedule','lịch hướng dẫn']],
      ['Hãy giữ ba cuộc gặp thiết yếu và chuyển phần còn lại trong tuần.','Keep three essential meetings and spread the rest across the week.','Mỗi cuộc gặp nên có mục đích và tài liệu chuẩn bị.','Each meeting should have a purpose and preparation material.',['learning time','thời gian học']],
      ['Mình cũng sẽ để một khối hai giờ không họp mỗi ngày.','I will also reserve a two-hour meeting-free block each day.','Thời gian đó cho phép họ thực hành thay vì chỉ nghe.','That allows them to practise rather than only listen.',['meeting-free block','khối không họp']],
    ]],
    ['Building Connections','Xây kết nối','Người mới không có trò chuyện hành lang.','Tạo quan hệ mà không ép giao tiếp liên tục.',[
      ['Mình sẽ chỉ định một người hỗ trợ trong ba tháng đầu.','I will assign an onboarding buddy for the first three months.','Vai trò đó khác quản lý trực tiếp thế nào?','How does that role differ from the line manager?',['onboarding buddy','người hỗ trợ hội nhập']],
      ['Buddy trả lời câu hỏi thực tế và giới thiệu cách đội làm việc.','The buddy answers practical questions and explains how the team works.','Quản lý vẫn chịu trách nhiệm mục tiêu và phản hồi hiệu suất.','The manager remains responsible for objectives and performance feedback.',['informal support','hỗ trợ không chính thức']],
      ['Hãy hỏi người mới thích nhịp liên hệ nào.','Ask the new employee what check-in rhythm they prefer.','Một số người thích tin nhắn ngắn hơn cuộc gọi mỗi ngày.','Some people prefer brief messages to a daily video call.',['check-in preference','nhịp liên hệ mong muốn']],
    ]],
    ['Setting Early Goals','Đặt mục tiêu đầu kỳ','Quản lý tránh giao dự án lớn ngay.','Chọn kết quả học và đóng góp vừa sức.',[
      ['Mục tiêu tuần đầu không nên là giao một tính năng sản xuất.','The first-week goal should not be to deliver a production feature.','Họ cần hiểu kiến trúc và hoàn tất một thay đổi thử nghiệm.','They need to understand the architecture and complete a practice change.',['early milestone','mốc đầu kỳ']],
      ['Sau một tháng, kết quả thực tế nào là hợp lý?','What practical outcome would be reasonable after one month?','Tự xử lý một lỗi nhỏ với hỗ trợ review.','Resolving one small defect independently with review support.',['supported ownership','tự chủ có hỗ trợ']],
      ['Mình sẽ xem lại mục tiêu sau hai tuần dựa trên tốc độ học.','I will revisit the goal after two weeks based on the learning pace.','Điều đó giữ kỳ vọng rõ nhưng không cứng nhắc.','That keeps expectations explicit without making them inflexible.',['review an objective','xem lại mục tiêu']],
    ]],
  ]}),
  t({id:'assessing-a-privacy-policy',title:'Assessing a Privacy Policy',titleVi:'Đánh giá chính sách quyền riêng tư',category:'Technology',icon:'🔏',level:'B2',description:'Kiểm tra mục đích, chia sẻ dữ liệu và quyền kiểm soát thực tế.',grammar:['legal-plain-language','passive-voice','conditionals'],scenarios:[
    ['Finding the Purpose','Tìm mục đích','Người dùng đọc chính sách của ứng dụng sức khỏe.','Nối từng loại dữ liệu với nhu cầu cụ thể.',[
      ['Chính sách nói dữ liệu được dùng để “cải thiện dịch vụ”.','The policy says that data is used to “improve services.”','Cụm đó quá rộng để người dùng hiểu hoạt động thực tế.','That phrase is too broad for users to understand the actual processing.',['specified purpose','mục đích cụ thể']],
      ['Nó nên nói dữ liệu nào cải thiện tính năng nào.','It should explain which data improves which feature.','Ví dụ, lịch sử tìm kiếm có thể dùng để đề xuất nội dung.','For example, search history may be used to recommend content.',['purpose limitation','giới hạn mục đích']],
      ['Dữ liệu sức khỏe không nên được gom vào một mục đích chung.','Health data should not be bundled into a generic purpose.','Đúng, dữ liệu nhạy cảm cần lý do và bảo vệ rõ hơn.','Correct. Sensitive data requires clearer justification and safeguards.',['sensitive data','dữ liệu nhạy cảm']],
    ]],
    ['Understanding Sharing','Hiểu việc chia sẻ','Chính sách nêu “đối tác đáng tin cậy”.','Xác định ai nhận gì và vì sao.',[
      ['“Đối tác đáng tin cậy” có thể gồm những loại công ty nào?','Which kinds of companies could “trusted partners” include?','Danh sách sau nêu nhà cung cấp lưu trữ, phân tích và quảng cáo.','A later list names hosting, analytics, and advertising providers.',['data recipient','bên nhận dữ liệu']],
      ['Nhà quảng cáo có nhận dữ liệu sức khỏe trực tiếp không?','Do advertisers receive health data directly?','Chính sách nói không, nhưng cho phép mã thiết bị và hành vi ứng dụng.','The policy says no, but permits device identifiers and app behaviour.',['device identifier','mã thiết bị']],
      ['Kết hợp dữ liệu đó vẫn có thể tạo hồ sơ nhạy cảm.','Combining that data could still create a sensitive profile.','Người dùng cần biết giới hạn kết hợp và mục tiêu quảng cáo.','Users need to know the limits on combination and advertising purpose.',['data combination','kết hợp dữ liệu']],
    ]],
    ['Testing User Control','Kiểm tra quyền kiểm soát','Chính sách hứa người dùng có thể xóa dữ liệu.','Xem quyền có dễ dùng và đầy đủ không.',[
      ['Nút xóa tài khoản nằm ở đâu trong ứng dụng?','Where is the account-deletion control in the app?','Nó nằm sau năm màn hình trong phần trợ giúp.','It is buried five screens deep in the help section.',['deletion control','nút xóa']],
      ['Một quyền khó tìm có thể không tạo kiểm soát thực tế.','A right that is difficult to locate may not provide effective control.','Quy trình cũng yêu cầu gọi điện trong giờ hành chính.','The process also requires a phone call during business hours.',['effective control','kiểm soát thực tế']],
      ['Xóa tài khoản có xóa dữ liệu khỏi đối tác không?','Does account deletion remove data held by partners?','Chính sách không nói rõ cách yêu cầu được chuyển đến họ.','The policy does not explain how the request is passed to them.',['downstream deletion','xóa ở bên nhận']],
    ]],
    ['Checking Retention','Kiểm tra thời gian lưu','Dữ liệu được giữ “khi cần thiết”.','Yêu cầu tiêu chí và mốc khác nhau.',[
      ['“Khi cần thiết” không cho người dùng biết dữ liệu tồn tại bao lâu.','“As long as necessary” does not tell users how long data persists.','Chính sách nên có mốc hoặc tiêu chí cho từng mục.','The policy should give periods or criteria for each category.',['retention period','thời gian lưu']],
      ['Hồ sơ giao dịch có thể phải giữ theo luật lâu hơn lịch tìm kiếm.','Transaction records may need legal retention longer than search history.','Vậy không nên dùng một câu chung cho cả hai.','Then one generic sentence should not cover both.',['retention criterion','tiêu chí lưu']],
      ['Sau khi hết thời hạn, dữ liệu được xóa hay ẩn danh?','After the period ends, is data deleted or anonymized?','Sự khác biệt đó cần được nêu vì dữ liệu ẩn danh có thể tiếp tục được dùng.','That distinction matters because anonymized data may continue to be used.',['anonymize data','ẩn danh dữ liệu']],
    ]],
  ]}),
  t({id:'correcting-online-misinformation',title:'Correcting Online Misinformation',titleVi:'Đính chính thông tin sai trực tuyến',category:'Communication',icon:'🧯',level:'B2',description:'Xác minh, sửa mà không khuếch đại và theo dõi nguồn sai.',grammar:['reported-speech','evidence-language','nuanced-language'],scenarios:[
    ['Verifying Before Correcting','Xác minh trước khi sửa','Một tin sai đang lan trong nhóm cộng đồng.','Xác nhận dữ kiện và nguồn gốc.',[
      ['Bài đăng nói nước máy sẽ bị cắt trong ba ngày.','The post claims that tap water will be unavailable for three days.','Trang của công ty nước chỉ thông báo giảm áp lực trong hai giờ.','The water company’s page announces only a two-hour pressure reduction.',['primary source','nguồn gốc']],
      ['Ngày và khu vực trong ảnh có khớp không?','Do the date and area in the image match?','Không, ảnh là thông báo từ thành phố khác vào năm ngoái.','No. The image is a notice from another city last year.',['misattributed image','ảnh gán sai']],
      ['Mình đã có đủ bằng chứng để đính chính cụ thể.','We now have enough evidence to make a specific correction.','Hãy lưu đường dẫn nguồn chính thức và ảnh chụp bài sai.','Preserve the official link and a screenshot of the false post.',['verify a claim','xác minh tuyên bố']],
    ]],
    ['Avoiding Amplification','Tránh khuếch đại','Người sửa cân nhắc chia sẻ lại ảnh sai.','Cung cấp sự thật mà không tăng độ phủ nội dung sai.',[
      ['Nếu đăng lại toàn bộ ảnh sai, nhiều người có thể chỉ thấy phần đó.','If we repost the entire false image, many people may see only that part.','Hãy dẫn lại tuyên bố bằng chữ và gắn nhãn sai rõ ràng.','Refer to the claim in text and label it false explicitly.',['avoid amplification','tránh khuếch đại']],
      ['Tiêu đề nên bắt đầu bằng thông tin đúng.','The heading should begin with the accurate information.','Đúng, “Nước vẫn hoạt động” rõ hơn lặp lại cảnh báo giả.','Yes. “Water service remains available” is clearer than repeating the false warning.',['truth sandwich','cấu trúc đặt sự thật trước']],
      ['Không cần gắn thẻ tài khoản nhỏ đã đăng đầu tiên.','There is no need to tag the small account that first posted it.','Việc đó có thể đẩy thêm người tới nguồn sai.','That could direct additional attention to the misleading source.',['limit reach','hạn chế độ phủ']],
    ]],
    ['Writing the Correction','Viết đính chính','Nhóm cần thông báo ngắn có hành động.','Nêu sai ở đâu, đúng là gì và kiểm tra ở đâu.',[
      ['Mở đầu bằng việc dịch vụ nước không bị cắt.','Begin by stating that the water supply is not being shut off.','Sau đó giải thích ảnh được lấy từ đâu và sai ngày nào.','Then explain where the image came from and why its date is wrong.',['specific correction','đính chính cụ thể']],
      ['Người dân có cần làm gì trong hai giờ giảm áp lực không?','Do residents need to take any action during the two-hour pressure reduction?','Nguồn chính thức chỉ khuyên hạn chế dùng thiết bị nhiều nước.','The official source advises only limiting water-intensive appliances.',['actionable guidance','hướng dẫn hành động']],
      ['Hãy kết thúc bằng đường dẫn trực tiếp đến thông báo.','End with a direct link to the notice.','Như vậy người đọc có thể tự kiểm tra cập nhật.','That allows readers to verify updates themselves.',['verification link','đường dẫn xác minh']],
    ]],
    ['Following the Spread','Theo dõi lan truyền','Bản đính chính đã đăng nhưng ảnh sai còn trong nhóm khác.','Ưu tiên nơi có nguy cơ và cập nhật nhất quán.',[
      ['Mình không thể trả lời từng bản chia sẻ riêng lẻ.','We cannot respond to every individual share.','Hãy ưu tiên các nhóm địa phương có nhiều người xem và người dễ bị ảnh hưởng.','Prioritize local groups with high reach and vulnerable audiences.',['correction strategy','chiến lược đính chính']],
      ['Một quản trị viên đã ghim bản đính chính bên dưới bài gốc.','One administrator has pinned the correction beneath the original post.','Điều đó giữ lịch sử và đặt thông tin đúng cạnh tuyên bố sai.','That preserves the record while placing accurate information beside the claim.',['pin a correction','ghim đính chính']],
      ['Nếu thông tin chính thức đổi, mình cần sửa cùng bài.','If the official information changes, we need to update the same post.','Dùng một nguồn cập nhật nhất quán sẽ giảm các phiên bản mâu thuẫn.','Using one maintained source will reduce conflicting versions.',['maintained update','cập nhật được duy trì']],
    ]],
  ]}),
  t({id:'evaluating-a-public-health-programme',title:'Evaluating a Public Health Programme',titleVi:'Đánh giá chương trình y tế công cộng',category:'Health',icon:'🩺',level:'B2',description:'Đánh giá tiếp cận, kết quả và chênh lệch mà không vượt quá bằng chứng.',grammar:['causal-reasoning','evidence-language','hedging'],scenarios:[
    ['Defining Success','Định nghĩa thành công','Chương trình sàng lọc báo số lượt khám cao.','Phân biệt hoạt động và kết quả sức khỏe.',[
      ['Mười nghìn lượt sàng lọc cho thấy chương trình hoạt động lớn.','Ten thousand screenings show that the programme operated at scale.','Nhưng số lượt không cho biết người có nguy cơ được điều trị.','However, volume does not show whether at-risk patients received treatment.',['process measure','chỉ số quy trình']],
      ['Mình cần theo dõi tỷ lệ chuyển khám và hoàn tất chăm sóc.','We need to track referral and completed-care rates.','Đúng, chuỗi kết quả quan trọng hơn một điểm tiếp xúc.','Exactly. The outcome pathway matters more than a single contact.',['outcome pathway','chuỗi kết quả']],
      ['Thành công cũng nên gồm phát hiện sớm hơn trước.','Success should also include earlier detection than before.','Chỉ số đó cần dữ liệu nền từ giai đoạn trước chương trình.','That measure requires baseline data from before the programme.',['baseline outcome','kết quả nền']],
    ]],
    ['Assessing Reach','Đánh giá tiếp cận','Số tổng cao nhưng các khu vực tham gia không đều.','Xem ai được phục vụ và ai bị bỏ lại.',[
      ['Tỷ lệ tham gia cao nhất ở khu gần bệnh viện.','Participation is highest in districts close to hospitals.','Khu nông thôn có thể gặp rào cản đi lại thay vì ít nhu cầu.','Rural areas may face transport barriers rather than lower need.',['access disparity','chênh lệch tiếp cận']],
      ['Báo cáo có điều chỉnh theo độ tuổi và mức nguy cơ không?','Does the report adjust for age and level of risk?','Chưa, nó chỉ so số người thô giữa các khu.','No. It compares only raw counts between areas.',['risk-adjusted rate','tỷ lệ điều chỉnh nguy cơ']],
      ['Mình cần mẫu số dân đủ điều kiện ở từng khu.','We need the eligible-population denominator for each area.','Nếu không, nơi đông dân luôn có vẻ tiếp cận tốt hơn.','Without it, more populated areas will always appear to have greater reach.',['eligible population','dân số đủ điều kiện']],
    ]],
    ['Considering Unintended Effects','Xem tác động ngoài ý muốn','Sàng lọc nhiều hơn có thể tạo lo lắng và xét nghiệm thêm.','Cân bằng lợi ích với tác hại.',[
      ['Bao nhiêu kết quả dương tính hóa ra không có bệnh?','How many positive results were later found not to indicate disease?','Tỷ lệ dương tính giả chưa được nêu trong tóm tắt.','The false-positive rate is not reported in the summary.',['false positive','dương tính giả']],
      ['Những kết quả đó có thể gây lo âu và thủ thuật không cần thiết.','Those results can cause anxiety and unnecessary procedures.','Đánh giá phải theo dõi tác hại cùng số trường hợp phát hiện.','The evaluation must track harms alongside detected cases.',['unintended harm','tác hại ngoài ý muốn']],
      ['Thông tin đồng ý có giải thích khả năng này không?','Did the consent information explain that possibility?','Ngôn ngữ chỉ nhấn mạnh lợi ích phát hiện sớm.','The wording emphasized only the benefits of early detection.',['balanced consent','đồng ý cân bằng']],
    ]],
    ['Judging Attribution','Đánh giá đóng góp','Kết quả bệnh giảm trong khi nhiều chính sách khác cùng thay đổi.','Không gán toàn bộ thay đổi cho một chương trình.',[
      ['Tỷ lệ nhập viện giảm sau khi chương trình bắt đầu.','Hospital admissions fell after the programme began.','Cùng lúc đó thuốc mới và hướng dẫn điều trị mới cũng được đưa vào.','New medication and treatment guidance were introduced at the same time.',['concurrent change','thay đổi đồng thời']],
      ['Vậy trước-sau đơn giản không tách được ảnh hưởng.','Then a simple before-and-after comparison cannot isolate the effect.','Mình có thể so với khu triển khai muộn hơn nếu nhóm tương đồng.','We could compare with areas implementing later if the populations are comparable.',['comparison area','khu so sánh']],
      ['Kết luận nên nói chương trình có thể đóng góp, không nói đã gây ra toàn bộ giảm.','The conclusion should say that the programme may have contributed, not caused the entire reduction.','Ngôn ngữ đó phản ánh bằng chứng mà không phủ nhận tiến bộ.','That wording reflects the evidence without dismissing the improvement.',['contribution statement','tuyên bố đóng góp']],
    ]],
  ]}),
  t({id:'negotiating-a-partnership-agreement',title:'Negotiating a Partnership Agreement',titleVi:'Thương lượng thỏa thuận hợp tác',category:'Work',icon:'🧾',level:'B2',description:'Căn chỉnh mục tiêu, quản trị và lối ra trước khi hợp tác.',grammar:['contract-language','conditionals','formal-hedging'],scenarios:[
    ['Aligning Objectives','Căn chỉnh mục tiêu','Hai tổ chức muốn cùng chạy chương trình đào tạo.','Phát hiện mục tiêu tương thích và khác biệt.',[
      ['Bên chúng tôi ưu tiên số người tiếp cận, còn bên bạn nhấn mạnh chất lượng sâu.','Our organization prioritizes reach, whereas yours emphasizes depth of quality.','Hai mục tiêu có thể cùng tồn tại nếu phân bổ nguồn lực được nói rõ.','Those aims can coexist if resource allocation is explicit.',['shared objective','mục tiêu chung']],
      ['Mình có thể đặt mức tối thiểu về chất lượng trước khi mở rộng.','We could set a minimum quality threshold before scaling.','Sau khi đạt ngưỡng, ngân sách thêm sẽ dùng để tăng số người.','Once the threshold is met, additional funding can increase participation.',['quality threshold','ngưỡng chất lượng']],
      ['Thỏa thuận nên nêu ưu tiên khi hai mục tiêu xung đột.','The agreement should state which objective prevails when they conflict.','Đúng, nếu không đội vận hành sẽ phải tự giải quyết mâu thuẫn.','Agreed. Otherwise, delivery teams will be left to resolve strategic tensions.',['strategic priority','ưu tiên chiến lược']],
    ]],
    ['Defining Governance','Định nghĩa quản trị','Hai bên cần ra quyết định chung.','Gán quyền, ngưỡng và cách phá bế tắc.',[
      ['Ủy ban chung sẽ có bao nhiêu đại diện từ mỗi bên?','How many representatives will each party have on the joint board?','Mỗi bên có hai người và một ghế độc lập.','Each party will have two members and there will be one independent seat.',['joint governance','quản trị chung']],
      ['Quyết định ngân sách có cần nhất trí tuyệt đối không?','Do budget decisions require unanimous approval?','Khoản lớn cần cả hai bên đồng ý; khoản thường có thể theo đa số.','Major expenditure needs both parties’ consent; routine spending can use a majority.',['decision threshold','ngưỡng quyết định']],
      ['Nếu biểu quyết bế tắc thì sao?','What happens if a vote is deadlocked?','Trước hết chuyển sang hòa giải độc lập, rồi mới kích hoạt cơ chế thoát.','Refer it first to independent mediation before triggering an exit mechanism.',['deadlock process','quy trình bế tắc']],
    ]],
    ['Handling Data and Brand','Xử lý dữ liệu và thương hiệu','Chương trình dùng danh sách học viên và logo hai bên.','Giới hạn quyền dùng theo mục đích.',[
      ['Ai là bên kiểm soát dữ liệu đăng ký?','Who will control the participant registration data?','Hai bên cùng quyết định mục đích nên trách nhiệm cần được ghi chung.','Both parties determine the purposes, so the responsibilities need to be jointly documented.',['data responsibility','trách nhiệm dữ liệu']],
      ['Dữ liệu có thể dùng cho marketing riêng sau chương trình không?','May the data be used for separate marketing after the programme?','Chỉ khi người tham gia đồng ý riêng cho mục đích đó.','Only if participants provide separate consent for that purpose.',['separate consent','đồng ý riêng']],
      ['Logo của mỗi bên chỉ dùng trên tài liệu đã duyệt.','Each party’s logo may be used only on approved materials.','Hãy đặt thời gian phản hồi duyệt để không làm chậm phát hành.','Set an approval response time so publication is not delayed.',['brand approval','duyệt thương hiệu']],
    ]],
    ['Planning an Exit','Lập phương án kết thúc','Các bên muốn bảo vệ người tham gia nếu hợp tác dừng.','Đặt chuyển tiếp, tài sản và thông báo.',[
      ['Một bên có thể chấm dứt với thông báo trước chín mươi ngày.','Either party may terminate with ninety days’ notice.','Điều gì xảy ra với khóa học đang diễn ra trong thời gian đó?','What happens to courses already in progress during that period?',['termination notice','thông báo chấm dứt']],
      ['Hai bên phải hoàn tất nhóm hiện tại hoặc tài trợ chuyển sang nhà cung cấp khác.','The parties must complete the current cohort or fund a transfer to another provider.','Người học không nên chịu hậu quả của tranh chấp tổ chức.','Participants should not bear the consequences of an organizational dispute.',['continuity plan','kế hoạch liên tục']],
      ['Tài liệu chung sẽ được cấp phép thế nào sau khi kết thúc?','How will jointly created materials be licensed after termination?','Mỗi bên có thể tiếp tục dùng nội bộ nhưng không bán nếu chưa có đồng ý.','Each party may continue internal use but not sell them without consent.',['post-exit licence','giấy phép sau kết thúc']],
    ]],
  ]}),
];
