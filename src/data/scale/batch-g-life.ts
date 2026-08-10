import { scaleTopic as t } from './scale-builder';

export const batchGLifeTopics = [
  t({id:'sorting-home-recycling',title:'Sorting Home Recycling',titleVi:'Phân loại rác tái chế tại nhà',category:'Home',icon:'🗑️',level:'A1',description:'Rửa hộp, phân loại và đưa thùng ra đúng ngày.',grammar:['can-cannot','imperatives','present-simple'],scenarios:[
    ['Checking an Item','Kiểm tra món đồ','Gia đình không chắc một hộp có tái chế được không.','Đọc nhãn và tháo các phần khác loại.',[
      ['Hộp sữa chua này có tái chế được không?','Can this yoghurt pot be recycled?','Có, nhưng hãy tháo lớp màng ở trên.','Yes, but remove the film from the top.',['recyclable pot','hộp có thể tái chế']],
      ['Mình có cần rửa hộp không?','Do I need to wash the pot?','Hãy tráng nhanh để không còn thức ăn.','Give it a quick rinse so no food remains.',['quick rinse','tráng nhanh']],
      ['Lớp màng đi vào thùng rác thường.','The film goes into the general waste bin.','Đúng, hai phần được làm từ vật liệu khác nhau.','Correct. The two parts are made from different materials.',['separate material','vật liệu khác nhau']],
    ]],
    ['Using the Right Bin','Dùng đúng thùng','Nhà có ba thùng màu.','Đặt giấy, thủy tinh và rác đúng chỗ.',[
      ['Giấy báo đi vào thùng màu nào?','Which colour bin is for newspapers?','Giấy và bìa cứng đi vào thùng màu xanh dương.','Paper and cardboard go into the blue bin.',['paper recycling','tái chế giấy']],
      ['Chai thủy tinh có để cùng lon không?','Do glass bottles go with cans?','Không, thủy tinh vào hộp nhỏ màu xanh lá.','No. Glass goes into the small green box.',['glass container','hộp thủy tinh']],
      ['Mình sẽ ép phẳng các hộp bìa.','I will flatten the cardboard boxes.','Như vậy thùng sẽ có thêm chỗ.','That will create more room in the bin.',['flatten cardboard','ép phẳng bìa']],
    ]],
    ['Collection Morning','Sáng thu gom','Gia đình chuẩn bị đưa thùng ra đường.','Kiểm tra lịch và vị trí.',[
      ['Hôm nay họ lấy thùng nào?','Which bin are they collecting today?','Lịch ghi thùng xanh dương và hộp thủy tinh.','The calendar shows the blue bin and the glass box.',['collection calendar','lịch thu gom']],
      ['Mình đặt thùng ở đâu?','Where should I leave the bins?','Đặt chúng ở mép đường trước bảy giờ.','Leave them at the kerb before seven o’clock.',['kerbside','mép đường']],
      ['Nắp thùng phải đóng hoàn toàn chứ?','Does the lid need to close completely?','Có, họ sẽ không lấy thùng bị tràn.','Yes. They will not empty an overflowing bin.',['overflowing bin','thùng bị tràn']],
    ]],
  ]}),
  t({id:'cleaning-the-windows',title:'Cleaning the Windows',titleVi:'Lau cửa sổ',category:'Home',icon:'🪟',level:'A1',description:'Chuẩn bị dụng cụ, lau kính và làm việc an toàn.',grammar:['imperatives','can','present-continuous'],scenarios:[
    ['Getting the Supplies','Chuẩn bị dụng cụ','Hai người lau cửa sổ phòng khách.','Chọn khăn và dung dịch.',[
      ['Chai nước lau kính ở đâu?','Where is the glass cleaner?','Nó ở trong tủ dưới bồn rửa.','It is in the cupboard under the sink.',['glass cleaner','nước lau kính']],
      ['Mình dùng khăn giấy được không?','Can I use paper towels?','Khăn sợi nhỏ sẽ để lại ít xơ hơn.','A microfibre cloth will leave less lint.',['microfibre cloth','khăn sợi nhỏ']],
      ['Mình cũng cần một xô nước ấm.','I also need a bucket of warm water.','Tôi sẽ đổ đầy nửa xô.','I will fill the bucket halfway.',['warm water','nước ấm']],
    ]],
    ['Washing the Glass','Lau mặt kính','Cửa sổ có bụi và dấu tay.','Lau từ trên xuống không để vệt.',[
      ['Mình nên bắt đầu ở góc nào?','Which corner should I start in?','Bắt đầu từ trên và lau dần xuống.','Start at the top and work downwards.',['work downwards','lau từ trên xuống']],
      ['Kính vẫn còn vài vệt.','There are still a few streaks on the glass.','Dùng khăn khô lau theo vòng tròn nhỏ.','Use a dry cloth in small circles.',['window streak','vệt trên kính']],
      ['Góc dưới có nhiều bụi hơn.','The bottom corner has more dirt.','Hãy lau khung trước khi lau lại kính.','Clean the frame before wiping the glass again.',['window frame','khung cửa']],
    ]],
    ['Staying Safe','Giữ an toàn','Một cửa sổ nằm khá cao.','Không đứng trên đồ không ổn định.',[
      ['Mình có thể đứng lên chiếc ghế này không?','Can I stand on this chair?','Không, ghế có thể trượt trên sàn.','No. The chair may slide on the floor.',['unstable chair','ghế không ổn định']],
      ['Mình sẽ dùng cây lau có cán dài.','I will use the cleaner with a long handle.','Cách đó giúp bạn giữ cả hai chân trên sàn.','That lets you keep both feet on the floor.',['long handle','cán dài']],
      ['Cửa sổ ngoài cùng vẫn quá xa.','The outer pane is still too far away.','Hãy để người có thiết bị phù hợp lau mặt đó.','Leave that side for someone with suitable equipment.',['safe reach','tầm với an toàn']],
    ]],
  ]}),
  t({id:'at-an-ice-cream-shop',title:'At an Ice-Cream Shop',titleVi:'Ở cửa hàng kem',category:'Food & Drink',icon:'🍨',level:'A1',description:'Chọn vị, cốc hoặc ốc quế và gọi món.',grammar:['would-like','or','how-much'],scenarios:[
    ['Choosing a Flavour','Chọn vị','Khách xem nhiều vị kem.','Hỏi vị và nếm mẫu.',[
      ['Vị màu tím là vị gì?','What flavour is the purple ice cream?','Đó là khoai môn và dừa.','That is taro and coconut.',['ice-cream flavour','vị kem']],
      ['Mình có thể nếm thử một chút không?','May I try a small sample?','Tất nhiên, đây là một thìa nhỏ.','Of course. Here is a small spoonful.',['small sample','mẫu thử nhỏ']],
      ['Vị đó ngọt nhẹ, mình thích nó.','That flavour is mildly sweet. I like it.','Bạn muốn một hay hai viên?','Would you like one scoop or two?',['one scoop','một viên kem']],
    ]],
    ['Cup or Cone','Cốc hay ốc quế','Khách chọn cách đựng kem.','Hỏi kích cỡ và nguyên liệu.',[
      ['Một viên có thể để trong cốc không?','Can I have one scoop in a cup?','Có, cốc nhỏ phù hợp cho một viên.','Yes. The small cup is suitable for one scoop.',['small cup','cốc nhỏ']],
      ['Ốc quế có chứa hạt không?','Does the cone contain nuts?','Nó không có hạt nhưng được làm trong cùng cơ sở.','It contains no nuts, but it is made in a shared facility.',['waffle cone','ốc quế']],
      ['Vậy mình sẽ chọn cốc để an toàn.','Then I will choose the cup to be safe.','Tôi sẽ dùng một chiếc thìa mới cho phần của bạn.','I will use a clean spoon for your serving.',['clean utensil','dụng cụ sạch']],
    ]],
    ['Completing the Order','Hoàn tất gọi món','Khách thêm topping và trả tiền.','Giữ đơn đơn giản và rõ.',[
      ['Mình có thể thêm xoài tươi không?','Can I add fresh mango?','Có, một phần topping có giá mười nghìn.','Yes. One topping costs ten thousand dong.',['fresh topping','topping tươi']],
      ['Chỉ thêm một ít xoài, không cần sốt.','Add only a little mango and no sauce, please.','Được, tổng cộng là năm mươi nghìn đồng.','Certainly. The total is fifty thousand dong.',['no sauce','không sốt']],
      ['Mình sẽ thanh toán bằng mã QR.','I will pay with a QR code.','Mã thanh toán nằm trên màn hình nhỏ.','The payment code is on the small screen.',['QR payment','thanh toán QR']],
    ]],
  ]}),
  t({id:'using-a-bike-share',title:'Using a Bike Share',titleVi:'Dùng xe đạp chia sẻ',category:'Transportation',icon:'🚴',level:'A1',description:'Mở khóa, kiểm tra xe và trả đúng trạm.',grammar:['can','imperatives','present-simple'],scenarios:[
    ['Unlocking a Bike','Mở khóa xe','Hai người đứng ở trạm xe chia sẻ.','Quét mã và lấy xe.',[
      ['Mình mở khóa xe bằng cách nào?','How do I unlock a bicycle?','Quét mã QR trên tay lái bằng ứng dụng.','Scan the QR code on the handlebar with the app.',['unlock a bike','mở khóa xe']],
      ['Ứng dụng đang hỏi số xe.','The app is asking for the bicycle number.','Số 42 được in dưới yên xe.','Number 42 is printed below the saddle.',['bicycle number','số xe']],
      ['Đèn khóa vừa chuyển xanh.','The lock light has just turned green.','Kéo nhẹ xe ra khỏi giá.','Pull the bicycle gently out of the dock.',['bike dock','giá xe']],
    ]],
    ['Checking Before Riding','Kiểm tra trước khi đi','Người dùng kiểm tra chiếc xe.','Phát hiện phanh hoặc lốp không an toàn.',[
      ['Phanh trước có hoạt động không?','Does the front brake work?','Có, tay phanh chắc và bánh dừng.','Yes. The lever feels firm, and the wheel stops.',['brake lever','tay phanh']],
      ['Lốp sau trông hơi xẹp.','The rear tyre looks slightly flat.','Hãy trả xe này và chọn chiếc khác.','Return this bicycle and choose another one.',['flat tyre','lốp xẹp']],
      ['Mình có cần báo lỗi trong ứng dụng không?','Do I need to report the fault in the app?','Có, chọn biểu tượng dụng cụ cạnh số xe.','Yes. Select the tool icon beside the bicycle number.',['report a fault','báo lỗi']],
    ]],
    ['Returning the Bike','Trả xe','Chuyến đi kết thúc ở một trạm khác.','Khóa xe và xác nhận phiên kết thúc.',[
      ['Trạm này còn chỗ trống không?','Does this station have an empty dock?','Có hai chỗ trống ở cuối hàng.','There are two empty docks at the end of the row.',['empty dock','giá trống']],
      ['Mình đẩy xe vào đến đâu?','How far should I push the bicycle in?','Đẩy đến khi khóa phát tiếng tách.','Push it in until the lock clicks.',['lock click','tiếng khóa tách']],
      ['Ứng dụng ghi chuyến đi đã kết thúc.','The app says that the ride has ended.','Tốt, hãy kiểm tra phí cuối trước khi rời đi.','Good. Check the final charge before leaving.',['end a ride','kết thúc chuyến']],
    ]],
  ]}),
  t({id:'choosing-breakfast-cereal',title:'Choosing Breakfast Cereal',titleVi:'Chọn ngũ cốc ăn sáng',category:'Shopping',icon:'🥣',level:'A1',description:'Đọc đường, khẩu phần và chọn sản phẩm phù hợp.',grammar:['how-much','comparatives','has-have'],scenarios:[
    ['Comparing Sugar','So sánh đường','Hai người đọc nhãn hai hộp ngũ cốc.','Chọn loại ít đường hơn.',[
      ['Hộp nào có ít đường hơn?','Which box contains less sugar?','Hộp màu xanh có sáu gram mỗi khẩu phần.','The blue box has six grams per serving.',['sugar per serving','đường mỗi khẩu phần']],
      ['Hộp đỏ có bao nhiêu?','How much does the red box contain?','Nó có mười hai gram, gấp đôi hộp xanh.','It has twelve grams, twice as much as the blue one.',['twice as much','gấp đôi']],
      ['Vậy mình chọn hộp màu xanh.','Then I will choose the blue box.','Nó cũng không có thêm lớp đường phủ.','It also has no added sugar coating.',['added sugar','đường thêm']],
    ]],
    ['Checking the Portion','Kiểm tra khẩu phần','Khách muốn biết hộp dùng được bao lâu.','Hiểu khẩu phần trên nhãn.',[
      ['Một khẩu phần là bao nhiêu gram?','How many grams are in one serving?','Nhãn ghi một khẩu phần là bốn mươi gram.','The label defines one serving as forty grams.',['serving size','kích cỡ khẩu phần']],
      ['Hộp có tổng cộng bốn trăm gram.','The box contains four hundred grams altogether.','Vậy nó có khoảng mười khẩu phần.','Then it provides around ten servings.',['ten servings','mười khẩu phần']],
      ['Mình sẽ dùng cốc đong trong vài ngày đầu.','I will use a measuring cup for the first few days.','Cách đó giúp bạn nhìn được một khẩu phần thật.','That will help you recognize an actual portion.',['measure a portion','đong khẩu phần']],
    ]],
    ['Checking Ingredients','Kiểm tra nguyên liệu','Gia đình cần loại không chứa hạt.','Đọc nguyên liệu và cảnh báo nhà máy.',[
      ['Ngũ cốc này có hạnh nhân không?','Does this cereal contain almonds?','Hạnh nhân không nằm trong danh sách nguyên liệu.','Almonds are not listed among the ingredients.',['ingredient panel','bảng nguyên liệu']],
      ['Nhưng nhãn nói có thể chứa các loại hạt.','However, the label says that it may contain nuts.','Nó được làm trong nhà máy cũng xử lý hạt.','It is made in a factory that also handles nuts.',['allergy warning','cảnh báo dị ứng']],
      ['Vậy nó không phù hợp với người dị ứng nặng.','Then it is not suitable for someone with a severe allergy.','Hãy chọn hộp có nhãn cơ sở không hạt.','Choose the box labelled as made in a nut-free facility.',['nut-free facility','cơ sở không hạt']],
    ]],
  ]}),
  t({id:'managing-household-food-waste',title:'Managing Household Food Waste',titleVi:'Quản lý lãng phí thực phẩm gia đình',category:'Home',icon:'🥕',level:'A2',description:'Kiểm kê, dùng đồ sắp hỏng và phân biệt nhãn ngày.',grammar:['present-perfect','should','conditionals'],scenarios:[
    ['Taking an Inventory','Kiểm kê thực phẩm','Gia đình kiểm tra tủ lạnh trước khi mua sắm.','Biết đồ đang có và cần dùng trước.',[
      ['Mình còn những loại rau nào?','Which vegetables do we still have?','Có hai củ cà rốt, nửa cây bắp cải và rau chân vịt.','We have two carrots, half a cabbage, and some spinach.',['fridge inventory','kiểm kê tủ lạnh']],
      ['Rau chân vịt đã bắt đầu mềm.','The spinach has begun to wilt.','Vậy mình nên dùng nó trong bữa tối nay.','Then we should use it in tonight’s dinner.',['use first','dùng trước']],
      ['Mình sẽ ghi đồ hiện có trước khi lập danh sách mua.','I will note what we have before writing the shopping list.','Như vậy mình không mua trùng.','That will prevent us from buying duplicates.',['avoid duplicate buying','tránh mua trùng']],
    ]],
    ['Understanding Date Labels','Hiểu nhãn ngày','Hai hộp thực phẩm có nhãn khác nhau.','Phân biệt an toàn và chất lượng.',[
      ['Sữa có nhãn “use by” ngày hôm qua.','The milk has a “use by” date of yesterday.','Mình không nên uống vì nhãn đó liên quan an toàn.','We should not drink it because that label concerns safety.',['use-by date','hạn sử dụng an toàn']],
      ['Gạo có nhãn “best before” từ tháng trước.','The rice has a “best before” date from last month.','Nhãn đó thường nói về chất lượng, không tự động nghĩa là không an toàn.','That label usually concerns quality and does not automatically mean it is unsafe.',['best-before date','hạn chất lượng tốt']],
      ['Mình sẽ kiểm tra bao bì và cách bảo quản.','I will check the packaging and how it has been stored.','Đúng, không dùng mùi để đánh giá thực phẩm có nhãn use by.','Right. Do not use smell to judge food past a use-by date.',['date label','nhãn ngày']],
    ]],
    ['Using Leftovers Safely','Dùng đồ ăn thừa an toàn','Gia đình còn cơm và rau đã nấu.','Làm lạnh, ghi ngày và hâm đúng.',[
      ['Cơm được nấu từ tối qua phải không?','Was the rice cooked last night?','Có, nó được làm nguội nhanh và cho vào tủ lạnh.','Yes. It was cooled quickly and placed in the fridge.',['cool quickly','làm nguội nhanh']],
      ['Mình nên dùng nó vào bữa trưa hôm nay.','We should use it for lunch today.','Hãy hâm đến khi nóng đều và chỉ hâm một lần.','Heat it until it is hot throughout, and reheat it only once.',['reheat thoroughly','hâm nóng đều']],
      ['Rau thừa có thể cho vào súp.','The leftover vegetables can go into a soup.','Mình sẽ dán ngày lên hộp súp mới.','I will label the new soup container with today’s date.',['label leftovers','ghi ngày đồ thừa']],
    ]],
  ]}),
  t({id:'booking-a-guided-tour',title:'Booking a Guided Tour',titleVi:'Đặt tour có hướng dẫn',category:'Travel',icon:'🧭',level:'A2',description:'Chọn ngôn ngữ, quy mô nhóm và hiểu lịch hủy.',grammar:['polite-questions','future-arrangements','conditionals'],scenarios:[
    ['Choosing a Tour','Chọn tour','Khách so sánh tour phố cổ sáng và chiều.','Chọn thời lượng và ngôn ngữ.',[
      ['Tour tiếng Anh buổi sáng kéo dài bao lâu?','How long does the morning tour in English last?','Nó kéo dài hai giờ và kết thúc ở chợ trung tâm.','It lasts two hours and finishes at the central market.',['guided tour','tour có hướng dẫn']],
      ['Tour chiều có vào bên trong bảo tàng không?','Does the afternoon tour enter the museum?','Có, vé bảo tàng đã gồm trong giá.','Yes. Museum admission is included in the price.',['admission included','đã gồm vé vào']],
      ['Mình muốn tour sáng vì chỉ có nửa ngày.','I prefer the morning tour because I have only half a day.','Tour đó vẫn còn sáu chỗ vào thứ Bảy.','That tour still has six places on Saturday.',['available place','chỗ còn trống']],
    ]],
    ['Checking Accessibility','Kiểm tra khả năng tiếp cận','Một người trong nhóm dùng gậy chống.','Hiểu quãng đi và chỗ nghỉ.',[
      ['Tuyến đi có nhiều bậc thang không?','Does the route include many steps?','Có một cầu thang dài ở khu thành cổ.','There is one long staircase in the old citadel.',['walking route','tuyến đi bộ']],
      ['Có tuyến thay thế không bậc không?','Is there a step-free alternative?','Hướng dẫn viên có thể dùng đường dốc dài hơn khoảng năm phút.','The guide can use a ramped route that adds about five minutes.',['step-free route','tuyến không bậc']],
      ['Đoàn có nghỉ giữa chặng không?','Does the group take a break halfway through?','Có, mọi người nghỉ mười phút tại quảng trường có ghế.','Yes. Everyone stops for ten minutes in a square with seating.',['rest stop','điểm nghỉ']],
    ]],
    ['Understanding Cancellation','Hiểu hủy lịch','Khách lo dự báo bão.','Biết hoàn tiền và đổi ngày.',[
      ['Nếu mưa thì tour vẫn diễn ra chứ?','Will the tour still run if it rains?','Mưa nhẹ không làm hủy, nhưng thời tiết nguy hiểm thì có.','Light rain does not cause cancellation, but dangerous weather does.',['weather cancellation','hủy do thời tiết']],
      ['Nếu công ty hủy, mình có được hoàn đầy đủ không?','Will I receive a full refund if the company cancels?','Có, hoặc bạn có thể chuyển sang ngày khác.','Yes, or you may transfer to another date.',['full refund','hoàn đầy đủ']],
      ['Nếu mình tự hủy thì hạn là khi nào?','What is the deadline if I cancel myself?','Hủy trước bốn mươi tám giờ được hoàn toàn bộ.','Cancellations made forty-eight hours ahead receive a full refund.',['cancellation window','thời hạn hủy']],
    ]],
  ]}),
  t({id:'caring-for-houseplants',title:'Caring for Houseplants',titleVi:'Chăm cây trong nhà',category:'Home',icon:'🪴',level:'A2',description:'Điều chỉnh ánh sáng, nước và xử lý lá có vấn đề.',grammar:['present-perfect','too-enough','should'],scenarios:[
    ['Checking the Light','Kiểm tra ánh sáng','Một cây có lá nhạt gần cửa sổ.','Chọn ánh sáng phù hợp mà không làm cháy lá.',[
      ['Cây này có nhận đủ ánh sáng không?','Is this plant receiving enough light?','Thân đang vươn dài về phía cửa sổ.','The stems are stretching towards the window.',['indirect light','ánh sáng gián tiếp']],
      ['Mình nên đặt nó sát kính hơn chứ?','Should I move it directly against the glass?','Không, nắng chiều ở đó có thể làm cháy lá.','No. The afternoon sun there may scorch the leaves.',['scorch leaves','làm cháy lá']],
      ['Mình sẽ chuyển nó đến kệ có ánh sáng gián tiếp.','I will move it to the shelf with indirect light.','Hãy xoay chậu mỗi tuần để cây mọc đều.','Rotate the pot weekly so the plant grows evenly.',['rotate a pot','xoay chậu']],
    ]],
    ['Watering Correctly','Tưới đúng cách','Đất trên mặt khô nhưng đáy còn ẩm.','Kiểm tra trước khi tưới.',[
      ['Bề mặt đất khô nghĩa là cần tưới ngay phải không?','Does a dry soil surface mean that it needs water immediately?','Hãy kiểm tra sâu khoảng hai centimet trước.','Check about two centimetres below the surface first.',['check soil moisture','kiểm tra độ ẩm đất']],
      ['Đất bên dưới vẫn hơi ẩm.','The soil underneath still feels slightly damp.','Vậy hãy đợi thêm một hoặc hai ngày.','Then wait another day or two.',['overwatering','tưới quá nhiều']],
      ['Khi tưới, mình nên đổ đến khi nước chảy ra đáy.','When watering, I should add enough for water to drain from the bottom.','Đúng, rồi đổ nước thừa khỏi đĩa.','Correct. Then empty the excess water from the saucer.',['drain excess water','thoát nước thừa']],
    ]],
    ['Responding to Brown Leaves','Xử lý lá nâu','Một số đầu lá chuyển nâu.','Xem nhiều nguyên nhân trước khi dùng thuốc.',[
      ['Đầu lá đã chuyển nâu trong tuần này.','The leaf tips have turned brown this week.','Không khí khô hoặc tưới không đều đều có thể gây ra.','Dry air or inconsistent watering could both cause that.',['brown leaf tip','đầu lá nâu']],
      ['Mình không thấy côn trùng dưới lá.','I cannot see any insects beneath the leaves.','Tốt, đừng dùng thuốc trừ sâu khi chưa thấy dấu hiệu sâu bệnh.','Good. Do not use pesticide without evidence of pests.',['pest evidence','dấu hiệu sâu bệnh']],
      ['Mình sẽ cắt phần nâu và theo dõi lá mới.','I will trim the brown sections and monitor new growth.','Ghi lại lịch tưới sẽ giúp tìm mẫu.','Recording the watering dates will help reveal a pattern.',['monitor new growth','theo dõi lá mới']],
    ]],
  ]}),
  t({id:'preparing-for-a-driving-test',title:'Preparing for a Driving Test',titleVi:'Chuẩn bị thi lái xe',category:'Transportation',icon:'🚘',level:'A2',description:'Kiểm tra giấy tờ, luyện kỹ năng và quản lý căng thẳng.',grammar:['present-perfect','should','conditionals'],scenarios:[
    ['Checking the Documents','Kiểm tra giấy tờ','Người học chuẩn bị cho ngày thi.','Mang đúng giấy tờ và đến sớm.',[
      ['Mình cần mang giấy tờ gì đến kỳ thi?','Which documents do I need to bring to the test?','Mang giấy phép học lái và thư xác nhận lịch.','Bring your learner permit and appointment confirmation.',['learner permit','giấy phép học lái']],
      ['Bản xác nhận trên điện thoại có đủ không?','Is the confirmation on my phone sufficient?','Có, nhưng hãy tải trước phòng khi không có mạng.','Yes, but download it in advance in case there is no signal.',['appointment confirmation','xác nhận lịch']],
      ['Trung tâm yêu cầu mình có mặt sớm bao nhiêu phút?','How many minutes early does the test centre require me to be there?','Hãy có mặt trước ít nhất ba mươi phút.','Arrive at least thirty minutes early.',['test centre','trung tâm thi']],
    ]],
    ['Practising Weak Areas','Luyện điểm yếu','Giáo viên xem lại các buổi học gần đây.','Tập trung vào lỗi lặp có rủi ro.',[
      ['Mình vẫn khó quan sát khi lùi vào chỗ đỗ.','I still find observation difficult when reversing into a space.','Bạn thường nhìn gương mà quên kiểm tra điểm mù bên phải.','You often use the mirrors but forget the right blind spot.',['blind-spot check','kiểm tra điểm mù']],
      ['Mình sẽ nói nhỏ từng bước khi luyện.','I will quietly name each check while practising.','Cách đó có thể giúp xây chuỗi quan sát ổn định.','That may help you build a consistent observation sequence.',['observation routine','chuỗi quan sát']],
      ['Nếu mất góc, mình có được chỉnh lại không?','Can I correct the position if I lose the angle?','Có, điều chỉnh an toàn tốt hơn tiếp tục một thao tác không kiểm soát.','Yes. A safe correction is better than continuing an uncontrolled manoeuvre.',['safe correction','điều chỉnh an toàn']],
    ]],
    ['Managing Test Nerves','Quản lý căng thẳng','Người học lo sẽ mắc lỗi nhỏ.','Giữ tập trung vào quyết định tiếp theo.',[
      ['Mình sợ một lỗi nhỏ sẽ làm hỏng cả bài thi.','I am afraid that one small mistake will ruin the whole test.','Một lỗi nhỏ không nhất thiết là lỗi nghiêm trọng.','A minor error is not necessarily a serious fault.',['test nerves','căng thẳng thi']],
      ['Nếu mình đi sai đường thì sao?','What if I take the wrong route?','Hãy tiếp tục lái an toàn; giám khảo sẽ hướng dẫn lại.','Continue driving safely. The examiner will redirect you.',['wrong route','đi sai đường']],
      ['Mình sẽ tập trung vào tình huống hiện tại thay vì lỗi trước.','I will focus on the current situation rather than the previous mistake.','Đó là cách tốt nhất để giữ quyết định an toàn.','That is the best way to maintain safe decisions.',['recover focus','lấy lại tập trung']],
    ]],
  ]}),
  t({id:'joining-a-parent-group',title:'Joining a Parent Group',titleVi:'Tham gia nhóm phụ huynh',category:'Family',icon:'👨‍👩‍👧',level:'A2',description:'Giới thiệu, hiểu mục đích và tham gia tôn trọng.',grammar:['present-perfect','polite-questions','suggestions'],scenarios:[
    ['Attending the First Meeting','Dự buổi đầu','Một phụ huynh mới đến nhóm tại trường.','Giới thiệu và hiểu cách hoạt động.',[
      ['Chào mọi người, đây là lần đầu mình tham gia.','Hello, everyone. This is my first time attending.','Chào mừng bạn; chúng tôi gặp nhau vào thứ Năm đầu mỗi tháng.','Welcome. We meet on the first Thursday of each month.',['parent group','nhóm phụ huynh']],
      ['Nhóm tập trung vào những chủ đề nào?','Which topics does the group focus on?','Chúng tôi chia sẻ thông tin trường và tổ chức hỗ trợ gia đình.','We share school information and organize support for families.',['group purpose','mục đích nhóm']],
      ['Mình có cần đăng ký vai trò ngay không?','Do I need to volunteer for a role immediately?','Không, bạn có thể quan sát vài buổi trước.','No. You can observe for a few meetings first.',['observe first','quan sát trước']],
    ]],
    ['Sharing Information Carefully','Chia sẻ thông tin cẩn thận','Nhóm nói về một vấn đề của học sinh.','Bảo vệ riêng tư và tránh tin đồn.',[
      ['Mình nghe một học sinh bị đình chỉ tuần trước.','I heard that a student was suspended last week.','Mình không nên thảo luận trường hợp cá nhân khi không có thông tin xác nhận.','We should not discuss an individual case without verified information.',['student privacy','riêng tư học sinh']],
      ['Nhưng phụ huynh đang lo về an toàn nói chung.','However, parents are concerned about safety more broadly.','Hãy đặt câu hỏi về chính sách mà không nêu tên trẻ.','Ask about the policy without identifying any child.',['avoid gossip','tránh tin đồn']],
      ['Mình sẽ yêu cầu nhà trường giải thích quy trình báo sự cố.','I will ask the school to explain the incident-reporting process.','Cách đó giải quyết nhu cầu thật mà vẫn giữ riêng tư.','That addresses the genuine concern while preserving privacy.',['policy question','câu hỏi chính sách']],
    ]],
    ['Helping with an Activity','Giúp một hoạt động','Nhóm cần người cho hội chợ sách.','Nhận việc phù hợp thời gian.',[
      ['Hội chợ cần hỗ trợ vào những giờ nào?','Which times need support at the book fair?','Ca sáng đã đủ người, nhưng ca từ ba đến năm còn trống.','The morning shift is covered, but the three-to-five slot is still open.',['volunteer slot','khung tình nguyện']],
      ['Mình có thể giúp từ ba đến bốn rưỡi.','I can help from three until four thirty.','Khoảng đó vẫn hữu ích nếu có người thay nửa giờ cuối.','That would still help if someone covers the final half hour.',['partial shift','một phần ca']],
      ['Mình sẽ ghi thời gian rõ trên bảng.','I will add the exact time to the rota.','Cảm ơn, như vậy không ai giả định bạn ở cả ca.','Thanks. That prevents anyone assuming you are available for the whole slot.',['volunteer rota','lịch tình nguyện']],
    ]],
  ]}),
  t({id:'selecting-an-ergonomic-chair',title:'Selecting an Ergonomic Chair',titleVi:'Chọn ghế công thái học',category:'Work',icon:'🪑',level:'A2',description:'Điều chỉnh ghế, thử hỗ trợ và hiểu lựa chọn mua.',grammar:['comparatives','too-enough','should'],scenarios:[
    ['Setting the Height','Chỉnh độ cao','Khách thử ghế cho bàn làm việc.','Đặt chân và khuỷu tay đúng vị trí.',[
      ['Ghế này có hạ thấp thêm được không?','Can this chair be lowered any further?','Có, kéo cần bên phải khi bạn đang ngồi.','Yes. Pull the lever on the right while seated.',['seat-height lever','cần chỉnh độ cao']],
      ['Bây giờ bàn chân mình đặt phẳng trên sàn.','My feet rest flat on the floor now.','Khuỷu tay của bạn cũng gần ngang với mặt bàn.','Your elbows are also close to desk height.',['feet flat','bàn chân đặt phẳng']],
      ['Mép ghế có ép sau đầu gối không?','Does the seat edge press behind my knees?','Không, vẫn còn khoảng trống rộng hai ngón tay.','No. There is still a two-finger gap.',['seat depth','độ sâu ghế']],
    ]],
    ['Testing Back Support','Thử hỗ trợ lưng','Khách ngồi thử nhiều tư thế.','Chỉnh lưng dưới mà không ép quá mạnh.',[
      ['Phần hỗ trợ lưng dưới cảm thấy hơi cao.','The lower-back support feels slightly too high.','Bạn có thể trượt nó xuống bằng nút phía sau.','You can slide it down using the rear control.',['lumbar support','hỗ trợ lưng dưới']],
      ['Mình nên cảm thấy lực đẩy mạnh không?','Should I feel strong pressure?','Không, nó nên lấp khoảng cong mà không đẩy bạn về trước.','No. It should fill the curve without pushing you forward.',['neutral posture','tư thế trung tính']],
      ['Lưng ghế có thể ngả khi mình đổi tư thế.','The backrest can recline when I change position.','Chuyển động nhẹ tốt hơn giữ một tư thế cả ngày.','Gentle movement is better than holding one posture all day.',['recline tension','độ căng ngả']],
    ]],
    ['Choosing How to Buy','Chọn cách mua','Khách cần dùng thử lâu hơn vài phút.','Kiểm tra thời gian dùng thử và lắp ráp.',[
      ['Tôi có thể dùng thử ghế tại nhà không?','Can I test the chair at home?','Bạn có thể trả trong mười bốn ngày nếu giữ bao bì.','You may return it within fourteen days if you keep the packaging.',['home trial','dùng thử tại nhà']],
      ['Ghế được giao lắp sẵn chứ?','Is the chair delivered fully assembled?','Phần chân và tựa lưng cần được gắn sau khi giao.','The base and backrest need to be attached after delivery.',['assembly service','dịch vụ lắp ráp']],
      ['Cửa hàng có thể lắp với một khoản phí không?','Can the shop assemble it for a fee?','Có, bạn có thể thêm dịch vụ khi thanh toán.','Yes. You can add that service at checkout.',['delivery option','lựa chọn giao hàng']],
    ]],
  ]}),
  t({id:'arranging-an-airport-pickup',title:'Arranging an Airport Pickup',titleVi:'Sắp xếp đón ở sân bay',category:'Travel',icon:'🛬',level:'A2',description:'Chia sẻ chuyến bay, điểm gặp và kế hoạch khi chậm.',grammar:['future-arrangements','conditionals','time-clauses'],scenarios:[
    ['Sharing Flight Details','Chia sẻ chuyến bay','Một người bạn sẽ đến từ nước ngoài.','Gửi đúng chuyến và giờ dự kiến.',[
      ['Chuyến bay của bạn hạ cánh lúc mấy giờ?','What time is your flight due to land?','Giờ dự kiến là sáu giờ bốn mươi tối.','The scheduled arrival time is six forty in the evening.',['scheduled arrival','giờ đến dự kiến']],
      ['Bạn gửi mình số chuyến bay nhé.','Please send me the flight number.','Đó là VN214 từ Singapore.','It is VN214 from Singapore.',['flight number','số chuyến bay']],
      ['Mình sẽ theo dõi chuyến trước khi rời nhà.','I will track the flight before leaving home.','Như vậy bạn không phải chờ nếu nó bị chậm.','That means you will not wait unnecessarily if it is delayed.',['track a flight','theo dõi chuyến bay']],
    ]],
    ['Choosing a Meeting Point','Chọn điểm gặp','Sảnh đến đông và có nhiều cửa.','Chọn điểm dễ nhận ra.',[
      ['Mình gặp nhau ngay ngoài cửa hải quan nhé?','Shall we meet just outside the customs exit?','Khu đó thường rất đông người đón.','That area is usually crowded with people waiting.',['customs exit','cửa hải quan']],
      ['Có quán cà phê gần cột số 8.','There is a café near pillar number eight.','Điểm đó dễ tìm hơn và có chỗ ngồi.','That point is easier to identify and has seating.',['meeting landmark','mốc gặp']],
      ['Mình sẽ đứng cạnh biển của quán, không chặn lối.','I will wait beside the café sign without blocking the walkway.','Mình sẽ nhắn khi lấy xong hành lý.','I will message when I have collected my baggage.',['arrival hall','sảnh đến']],
    ]],
    ['Handling a Delay','Xử lý khi chậm','Chuyến bay đổi giờ trong lúc đang bay.','Điều chỉnh đón và giữ liên lạc.',[
      ['Ứng dụng nói chuyến bay chậm chín mươi phút.','The app says that the flight is delayed by ninety minutes.','Mình sẽ hoãn giờ rời nhà một tiếng.','I will postpone leaving home by one hour.',['flight delay','chuyến bay chậm']],
      ['Nếu điện thoại mình không có mạng khi đến thì sao?','What if my phone has no signal when I arrive?','Hãy cứ đến điểm gặp và chờ ở đó.','Go directly to the meeting point and wait there.',['fallback plan','kế hoạch dự phòng']],
      ['Mình cũng sẽ kiểm tra bảng đến trước khi đỗ xe.','I will also check the arrivals board before parking.','Tốt, giờ hạ cánh có thể thay đổi thêm.','Good. The landing time may change again.',['arrivals board','bảng chuyến đến']],
    ]],
  ]}),
  t({id:'negotiating-a-freelance-brief',title:'Negotiating a Freelance Brief',titleVi:'Thương lượng đề bài freelance',category:'Work',icon:'📝',level:'B1',description:'Làm rõ sản phẩm bàn giao, vòng sửa và quyền sử dụng.',grammar:['conditionals','contract-language','polite-negotiation'],scenarios:[
    ['Clarifying Deliverables','Làm rõ sản phẩm bàn giao','Khách hàng yêu cầu “một bộ nhận diện hoàn chỉnh”.','Chuyển mô tả rộng thành danh sách cụ thể.',[
      ['“Bộ nhận diện hoàn chỉnh” gồm chính xác những tệp nào?','Which files does “a complete identity package” include exactly?','Chúng tôi cần logo, bảng màu và mẫu bài đăng mạng xã hội.','We need a logo, a colour palette, and social-media post templates.',['project deliverable','sản phẩm bàn giao']],
      ['Mẫu bài đăng gồm bao nhiêu bố cục và kích thước?','How many layouts and sizes should the post templates cover?','Ba bố cục, mỗi bố cục cho hai nền tảng.','Three layouts, each adapted for two platforms.',['scope detail','chi tiết phạm vi']],
      ['Tôi sẽ liệt kê sáu tệp đó trong đề xuất.','I will list those six files in the proposal.','Như vậy hai bên có cùng định nghĩa về hoàn thành.','That gives both sides the same definition of completion.',['definition of done','định nghĩa hoàn thành']],
    ]],
    ['Agreeing on Revisions','Thống nhất vòng sửa','Khách hàng muốn sửa “đến khi hài lòng”.','Đặt vòng và cách tổng hợp phản hồi.',[
      ['Ngân sách này bao gồm hai vòng sửa cho mỗi hạng mục.','This budget includes two revision rounds for each deliverable.','Nếu nhóm mình gửi phản hồi rời rạc thì tính thế nào?','What happens if our team sends feedback separately?',['revision round','vòng sửa']],
      ['Mỗi vòng bắt đầu khi tôi nhận một danh sách phản hồi tổng hợp.','Each round begins when I receive one consolidated feedback list.','Mình sẽ chỉ định một người gom ý kiến nội bộ.','We will appoint one person to combine internal comments.',['consolidated feedback','phản hồi tổng hợp']],
      ['Các yêu cầu ngoài phạm vi sẽ được báo giá riêng.','Requests outside the agreed scope will be quoted separately.','Hãy báo chi phí trước khi bắt đầu phần thêm.','Provide the cost before beginning any additional work.',['out-of-scope work','việc ngoài phạm vi']],
    ]],
    ['Discussing Usage Rights','Trao đổi quyền sử dụng','Hai bên nói về tệp nguồn và bản quyền.', 'Ghi quyền sử dụng theo giá và mục đích.',[
      ['Giá đã gồm quyền dùng logo trên mọi kênh chưa?','Does the fee include the right to use the logo across all channels?','Có, sau khi thanh toán đầy đủ, bạn có quyền sử dụng thương mại toàn cầu.','Yes. After full payment, you receive worldwide commercial usage rights.',['usage right','quyền sử dụng']],
      ['Chúng tôi có nhận tệp nguồn có thể chỉnh sửa không?','Will we receive the editable source files?','Có, tệp nguồn nằm trong gói bàn giao cuối.','Yes. Source files are included in the final handover.',['source file','tệp nguồn']],
      ['Bạn có thể trưng dự án trong hồ sơ năng lực chứ?','May you display the project in your portfolio?','Tôi đề nghị quyền trưng sau khi thương hiệu ra mắt công khai.','I propose the right to show it after the brand launches publicly.',['portfolio permission','quyền trưng hồ sơ']],
    ]],
  ]}),
  t({id:'discussing-a-rental-deposit',title:'Discussing a Rental Deposit',titleVi:'Trao đổi tiền đặt cọc thuê nhà',category:'Home',icon:'🔑',level:'B1',description:'Ghi tình trạng, hiểu khấu trừ và yêu cầu hoàn tiền minh bạch.',grammar:['passive-voice','formal-requests','past-simple'],scenarios:[
    ['Recording the Condition','Ghi tình trạng','Người thuê nhận nhà và xem biên bản hiện trạng.','Bổ sung ảnh và lỗi có sẵn.',[
      ['Biên bản nói tường không có dấu vết, nhưng góc này bị xước.','The inventory says that the walls are unmarked, but this corner is scratched.','Hãy chụp ảnh có ngày và yêu cầu thêm vào biên bản.','Take a dated photograph and request that it be added to the record.',['condition report','biên bản hiện trạng']],
      ['Thảm cũng có một vết ố gần cửa sổ.','The carpet also has a stain near the window.','Ghi kích thước và vị trí thay vì chỉ nói “bị bẩn”.','Record its size and location rather than merely saying “dirty”.',['pre-existing damage','hư hỏng có sẵn']],
      ['Chủ nhà cần xác nhận các bổ sung bằng văn bản.','The landlord needs to acknowledge the additions in writing.','Như vậy sẽ rõ tình trạng nào tồn tại trước khi thuê.','That establishes which conditions existed before the tenancy.',['dated evidence','bằng chứng có ngày']],
    ]],
    ['Understanding Deductions','Hiểu khoản khấu trừ','Người thuê chuẩn bị trả nhà.','Phân biệt hao mòn thường với thiệt hại.',[
      ['Chủ nhà có thể trừ tiền vì sơn bị phai không?','Can the landlord deduct money because the paint has faded?','Sự phai màu thông thường theo thời gian có thể là hao mòn hợp lý.','Ordinary fading over time may constitute fair wear and tear.',['fair wear and tear','hao mòn hợp lý']],
      ['Một lỗ lớn do treo TV thì sao?','What about a large hole from mounting a television?','Việc sửa lỗ đó có thể là khoản khấu trừ hợp lý.','The cost of repairing that hole may be a reasonable deduction.',['reasonable deduction','khấu trừ hợp lý']],
      ['Khoản trừ phải dựa trên chi phí thực, không phải nâng cấp.','A deduction should reflect the actual loss rather than fund an upgrade.','Đúng, không thể tính giá thảm mới cho thảm đã cũ nhiều năm.','Correct. An old carpet cannot simply be charged at the price of a new one.',['betterment','nâng cấp bằng tiền người thuê']],
    ]],
    ['Requesting the Return','Yêu cầu hoàn cọc','Hạn hoàn đã qua mà chưa có bảng chi tiết.','Xin số tiền, lý do và cơ chế tranh chấp.',[
      ['Tôi đã trả chìa khóa cách đây mười bốn ngày.','I returned the keys fourteen days ago.','Bạn đã nhận thông báo về khoản khấu trừ nào chưa?','Have you received notice of any proposed deductions?',['deposit return','hoàn tiền cọc']],
      ['Chưa, chỉ có tin nói đang kiểm tra.','No. I have received only a message saying that checks are ongoing.','Hãy yêu cầu ngày hoàn và bảng chi tiết từng khoản.','Request a repayment date and an itemized list of any deductions.',['itemized deduction','khấu trừ chi tiết']],
      ['Nếu không đồng ý, tôi có thể dùng cơ chế bảo vệ tiền cọc.','If I disagree, I can use the deposit protection dispute process.','Hãy giữ biên bản, ảnh và mọi thư trao đổi cho hồ sơ.','Keep the inventory, photographs, and all correspondence for the case.',['deposit dispute','tranh chấp tiền cọc']],
    ]],
  ]}),
  t({id:'planning-a-career-change',title:'Planning a Career Change',titleVi:'Lên kế hoạch chuyển nghề',category:'Work',icon:'🧭',level:'B1',description:'Xác định động lực, kiểm tra giả định và lập bước chuyển ít rủi ro.',grammar:['present-perfect','conditionals','future-forms'],scenarios:[
    ['Clarifying the Motivation','Làm rõ động lực','Một người muốn rời công việc hiện tại.','Phân biệt chạy khỏi vấn đề và hướng tới mục tiêu.',[
      ['Điều gì khiến bạn nghĩ đến chuyển nghề lúc này?','What has led you to consider changing careers now?','Tôi muốn công việc có nhiều phân tích và ít bán hàng hơn.','I want work involving more analysis and less sales activity.',['career motivation','động lực chuyển nghề']],
      ['Bạn không thích ngành hay chỉ không thích vai trò hiện tại?','Do you dislike the field itself or only your current role?','Tôi vẫn thích lĩnh vực năng lượng nhưng muốn làm với dữ liệu.','I still value the energy sector, but I want to work with data.',['transferable interest','mối quan tâm có thể chuyển']],
      ['Vậy chuyển sang phân tích trong cùng ngành có thể là bước hợp lý.','Then moving into analytics within the same sector may be a logical step.','Nó tận dụng hiểu biết hiện có thay vì bắt đầu lại hoàn toàn.','It would use my existing knowledge rather than requiring a complete restart.',['adjacent career','nghề gần kề']],
    ]],
    ['Testing the Assumptions','Kiểm tra giả định','Người chuyển nghề chưa biết công việc hàng ngày thực tế.','Thu thập bằng chứng trước khi đầu tư lớn.',[
      ['Tôi đang nghĩ đến học một khóa phân tích kéo dài một năm.','I am considering a year-long analytics course.','Bạn đã nói chuyện với ai đang làm vai trò đó chưa?','Have you spoken to anyone currently doing that work?',['informational interview','phỏng vấn tìm hiểu']],
      ['Chưa, tôi chủ yếu xem video giới thiệu nghề.','Not yet. I have mainly watched career introduction videos.','Video có thể không cho thấy phần việc lặp lại hoặc khó khăn.','Videos may not reveal the repetitive or difficult parts of the job.',['test an assumption','kiểm tra giả định']],
      ['Tôi sẽ phỏng vấn ba người và thử một dự án dữ liệu nhỏ.','I will interview three people and attempt a small data project.','Hai bước đó sẽ tạo bằng chứng trước khi cam kết khóa dài.','Those steps will provide evidence before you commit to a long course.',['small experiment','thử nghiệm nhỏ']],
    ]],
    ['Building a Transition Plan','Lập kế hoạch chuyển đổi','Người học cần duy trì thu nhập trong lúc chuyển.','Chia kỹ năng, tài chính và tìm việc thành giai đoạn.',[
      ['Tôi không thể nghỉ việc để học toàn thời gian.','I cannot leave my job to study full time.','Vậy hãy lập kế hoạch học bán thời gian trong sáu tháng đầu.','Then build a part-time learning plan for the first six months.',['transition plan','kế hoạch chuyển đổi']],
      ['Khi nào mình nên bắt đầu nộp đơn?','When should I begin applying for roles?','Sau khi có hai dự án minh chứng và có thể giải thích kỹ năng chuyển đổi.','After you have two portfolio projects and can explain your transferable skills.',['portfolio evidence','minh chứng hồ sơ']],
      ['Mình cũng sẽ tích lũy quỹ dự phòng ba tháng chi phí.','I will also build a reserve covering three months of expenses.','Khoản đó giảm áp lực phải nhận đề nghị đầu tiên.','That reduces pressure to accept the first offer available.',['financial runway','khoảng đệm tài chính']],
    ]],
  ]}),
  t({id:'supporting-teen-exam-stress',title:'Supporting Teen Exam Stress',titleVi:'Hỗ trợ tuổi teen khi căng thẳng thi cử',category:'Family',icon:'🌤️',level:'B1',description:'Lắng nghe, lập kế hoạch vừa sức và nhận biết lúc cần hỗ trợ thêm.',grammar:['empathetic-language','modals','conditionals'],scenarios:[
    ['Listening Before Solving','Lắng nghe trước khi giải quyết','Một học sinh nói mình không thể theo kịp.','Hiểu cảm xúc và nguồn áp lực.',[
      ['Dạo này con thấy việc học thế nào?','How have you been feeling about your schoolwork lately?','Con thấy dù học bao nhiêu cũng vẫn bị tụt lại.','I feel that however much I study, I am still falling behind.',['exam stress','căng thẳng thi']],
      ['Điều gì làm cảm giác đó mạnh nhất?','What makes that feeling strongest?','Khi nhìn lịch ôn của bạn bè, con nghĩ mình chưa làm đủ.','When I see my friends’ revision schedules, I think I am not doing enough.',['social comparison','so sánh xã hội']],
      ['Bố mẹ sẽ nghe trước, chưa cần đưa giải pháp ngay.','We will listen first; we do not need to solve it immediately.','Con muốn được hiểu trước khi nói về một kế hoạch mới.','I want to feel understood before discussing another plan.',['listen without fixing','lắng nghe không vội sửa']],
    ]],
    ['Making a Manageable Plan','Lập kế hoạch vừa sức','Gia đình chia khối lượng ôn lớn thành bước nhỏ.','Ưu tiên và giữ thời gian nghỉ.',[
      ['Môn nào có bài thi gần nhất?','Which subject has the nearest examination?','Sinh học vào thứ Hai, rồi toán sau đó bốn ngày.','Biology is on Monday, followed by maths four days later.',['revision priority','ưu tiên ôn']],
      ['Hãy chọn hai chủ đề sinh học cho tối nay.','Let us choose two biology topics for this evening.','Con có thể học hai mươi lăm phút rồi nghỉ năm phút.','I can work for twenty-five minutes and then take a five-minute break.',['manageable block','khối học vừa sức']],
      ['Mục tiêu là hoàn thành hai phần, không học đến kiệt sức.','The goal is to complete two sections, not to study until exhaustion.','Con sẽ dừng lúc chín rưỡi để ngủ đúng giờ.','I will stop at nine thirty so that I can sleep on time.',['stopping time','giờ dừng']],
    ]],
    ['Recognizing Extra Support','Nhận biết cần hỗ trợ thêm','Căng thẳng ảnh hưởng giấc ngủ nhiều tuần.','Tìm hỗ trợ chuyên môn mà không gắn nhãn.',[
      ['Con đã khó ngủ gần như mỗi đêm trong ba tuần.','I have struggled to sleep almost every night for three weeks.','Điều đó đang ảnh hưởng năng lượng và khả năng tập trung của con.','That is affecting your energy and ability to concentrate.',['persistent stress','căng thẳng kéo dài']],
      ['Con sợ nói với giáo viên sẽ làm mọi người nghĩ con yếu.','I worry that speaking to a teacher will make people think I am weak.','Xin hỗ trợ là cách xử lý một vấn đề thật, không phải thất bại.','Seeking support is a way of addressing a real problem, not a failure.',['seek support','tìm hỗ trợ']],
      ['Mình có thể cùng nói với cố vấn trường vào ngày mai.','We can speak to the school counsellor together tomorrow.','Con muốn bố mẹ ở đó trong phần đầu cuộc nói chuyện.','I would like you to be there for the beginning of the conversation.',['school counsellor','cố vấn trường']],
    ]],
  ]}),
  t({id:'managing-club-finances',title:'Managing Club Finances',titleVi:'Quản lý tài chính câu lạc bộ',category:'Community',icon:'📒',level:'B1',description:'Lập ngân sách, phê duyệt chi và báo cáo minh bạch.',grammar:['passive-voice','conditionals','financial-language'],scenarios:[
    ['Building the Budget','Lập ngân sách','Câu lạc bộ lên kế hoạch cho năm mới.','Dùng thu nhập chắc chắn và chi phí thực tế.',[
      ['Ngân sách đang tính phí thành viên từ một trăm người.','The budget assumes membership fees from one hundred people.','Năm ngoái chỉ có tám mươi sáu thành viên trả phí.','Only eighty-six members paid last year.',['conservative estimate','ước tính thận trọng']],
      ['Mình nên dùng con số thấp hơn làm cơ sở.','We should use the lower figure as our baseline.','Thu nhập thêm có thể được phân bổ khi thực sự nhận được.','Additional income can be allocated once it is actually received.',['budget baseline','cơ sở ngân sách']],
      ['Chi phí thuê phòng đã tăng bảy phần trăm.','The room-hire cost has increased by seven percent.','Hãy cập nhật cả phí và khoản dự phòng nhỏ.','Update the fee and include a modest contingency.',['budget contingency','dự phòng ngân sách']],
    ]],
    ['Approving Spending','Phê duyệt chi','Một thành viên muốn mua thiết bị khẩn.','Áp dụng quyền phê duyệt mà không làm chậm việc cần.',[
      ['Thiết bị thay thế có giá cao hơn giới hạn một người duyệt.','The replacement equipment costs more than the single-approver limit.','Vậy cần hai thành viên ban điều hành đồng ý.','Then two committee members need to authorize it.',['approval threshold','ngưỡng phê duyệt']],
      ['Nhưng sự kiện diễn ra sau ba ngày.','However, the event takes place in three days.','Quy trình khẩn cho phép phê duyệt điện tử nếu lý do được ghi lại.','The urgent process allows electronic approval if the reason is documented.',['urgent purchase','mua khẩn']],
      ['Mình sẽ lấy hai báo giá và lưu quyết định trong hồ sơ.','I will obtain two quotations and retain the decision in the records.','Như vậy tốc độ không loại bỏ trách nhiệm giải trình.','That preserves accountability without creating unnecessary delay.',['spending control','kiểm soát chi']],
    ]],
    ['Reporting to Members','Báo cáo thành viên','Cuối năm câu lạc bộ công bố thu chi.','Trình bày số liệu dễ kiểm tra.',[
      ['Báo cáo chỉ ghi tổng tiền còn lại.','The report shows only the total amount remaining.','Thành viên cần thấy thu nhập, chi phí và thay đổi dự trữ.','Members need to see income, expenditure, and the movement in reserves.',['financial statement','báo cáo tài chính']],
      ['Có nên liệt kê từng hóa đơn nhỏ không?','Should every small receipt be listed?','Không cần trong báo cáo chính, nhưng hồ sơ chi tiết phải sẵn để kiểm tra.','Not in the main report, but detailed records must be available for inspection.',['supporting record','hồ sơ hỗ trợ']],
      ['Mình sẽ thêm ghi chú giải thích khoản chi bất thường.','I will add notes explaining unusual expenses.','Bối cảnh đó giúp người đọc không hiểu sai một con số lớn.','That context prevents readers from misinterpreting a large figure.',['transparent reporting','báo cáo minh bạch']],
    ]],
  ]}),
  t({id:'resolving-an-authorship-dispute',title:'Resolving an Authorship Dispute',titleVi:'Giải quyết tranh chấp quyền tác giả nghiên cứu',category:'Education',icon:'✍️',level:'B2',description:'Đối chiếu đóng góp, tiêu chuẩn tác giả và ghi nhận minh bạch.',grammar:['academic-language','reported-speech','mediation-language'],scenarios:[
    ['Mapping Contributions','Đối chiếu đóng góp','Hai nhà nghiên cứu bất đồng về thứ tự tên.','Ghi công việc cụ thể trước khi tranh vị trí.',[
      ['Mỗi người hãy liệt kê đóng góp thực tế thay vì bắt đầu từ thứ tự tên.','Each person should list concrete contributions rather than beginning with name order.','Tôi thiết kế nghiên cứu và viết bản thảo đầu.','I designed the study and wrote the first draft.',['contribution statement','bản ghi đóng góp']],
      ['Tôi xây bộ dữ liệu, thực hiện phân tích và sửa kết luận.','I built the dataset, conducted the analysis, and revised the conclusions.','Cả hai vai trò đều có tính trí tuệ đáng kể.','Both roles represent substantial intellectual contributions.',['intellectual contribution','đóng góp trí tuệ']],
      ['Ai chịu trách nhiệm trả lời phản biện và bảo đảm tính toàn vẹn?','Who will take responsibility for reviewer responses and research integrity?','Chúng tôi có thể chia phần phản hồi nhưng cùng phê duyệt bản cuối.','We can divide the responses but jointly approve the final version.',['accountability','trách nhiệm giải trình']],
    ]],
    ['Applying a Standard','Áp dụng tiêu chuẩn','Nhóm dùng hướng dẫn tạp chí thay vì thông lệ ngầm.','Tách tư cách tác giả và lời cảm ơn.',[
      ['Hướng dẫn yêu cầu đóng góp, tham gia viết và chịu trách nhiệm.','The guidance requires contribution, involvement in writing, and accountability.','Người chỉ cung cấp kinh phí không tự động đủ điều kiện tác giả.','Someone who provided funding alone does not automatically qualify as an author.',['authorship criterion','tiêu chí tác giả']],
      ['Nhưng trưởng khoa thường được thêm tên trong nhóm mình.','However, our department traditionally adds the head’s name.','Thông lệ địa phương không nên vượt tiêu chuẩn công bố minh bạch.','Local custom should not override transparent publication standards.',['honorary authorship','tác giả danh dự']],
      ['Đóng góp kinh phí vẫn có thể được ghi nhận rõ ở lời cảm ơn.','The funding contribution can still be recognized clearly in the acknowledgements.','Đồng thời vai trò tài trợ nên xuất hiện trong tuyên bố đóng góp.','The funding role should also appear in the contribution declaration.',['acknowledgement','lời cảm ơn']],
    ]],
    ['Agreeing on Order','Thống nhất thứ tự','Hai người đều có đóng góp lớn nhưng khác loại.','Dùng lý do được ghi và xem lại nếu công việc đổi.',[
      ['Thứ tự tên nên phản ánh đóng góp cho toàn bộ bài, không chỉ số giờ.','Name order should reflect contribution to the paper as a whole, not merely hours spent.','Vai trò ý tưởng và vai trò phân tích đều quyết định kết luận.','Both the conceptual and analytical roles were decisive for the conclusions.',['author order','thứ tự tác giả']],
      ['Đồng tác giả thứ nhất có phù hợp không?','Would joint first authorship be appropriate?','Có, nếu tạp chí cho phép và tuyên bố giải thích phần đóng góp ngang nhau.','Yes, if the journal permits it and the statement explains the equal contribution.',['joint first author','đồng tác giả thứ nhất']],
      ['Mình sẽ ghi thỏa thuận và xem lại trước khi nộp.','We will document the agreement and revisit it before submission.','Nếu phạm vi công việc thay đổi, thứ tự có thể được điều chỉnh minh bạch.','If the work changes, the order can be revised transparently.',['document an agreement','ghi thỏa thuận']],
    ]],
  ]}),
  t({id:'evaluating-a-climate-claim',title:'Evaluating a Climate Claim',titleVi:'Đánh giá một tuyên bố khí hậu',category:'Communication',icon:'🌡️',level:'B2',description:'Phân biệt thời tiết với khí hậu, đọc xu hướng và hiểu bất định.',grammar:['evidence-language','hedging','comparison-language'],scenarios:[
    ['Separating Weather and Climate','Tách thời tiết và khí hậu','Một bài đăng dùng ngày lạnh để phủ nhận xu hướng ấm lên.','Đặt sự kiện ngắn trong phân bố dài hạn.',[
      ['Bài đăng nói hôm nay lạnh kỷ lục nên khí hậu không ấm lên.','The post argues that today’s record cold disproves global warming.','Một sự kiện thời tiết địa phương không xác định xu hướng khí hậu toàn cầu.','A local weather event does not determine a global climate trend.',['weather event','sự kiện thời tiết']],
      ['Vậy điều gì mới là bằng chứng phù hợp?','What would constitute relevant evidence, then?','Chuỗi nhiệt độ dài hạn trên nhiều khu vực và nhiều thập kỷ.','Long-term temperature records across many regions and decades.',['climate trend','xu hướng khí hậu']],
      ['Ngày cực lạnh vẫn có thể xảy ra trong một phân bố ấm hơn.','Extremely cold days can still occur within a warmer distribution.','Đúng, xu hướng thay đổi xác suất chứ không xóa mọi biến động.','Exactly. A trend changes probabilities rather than eliminating all variation.',['natural variability','biến động tự nhiên']],
    ]],
    ['Reading a Graph','Đọc biểu đồ','Biểu đồ bắt đầu ở một năm bất thường.','Kiểm tra trục, giai đoạn và nguồn dữ liệu.',[
      ['Đường nhiệt độ có vẻ giảm từ năm đầu đến năm cuối.','The temperature line appears to decline from the first year to the last.','Năm đầu là một năm đặc biệt nóng, nên điểm bắt đầu có thể gây hiểu lầm.','The first year was exceptionally warm, so the starting point may be misleading.',['cherry-pick dates','chọn lọc mốc thời gian']],
      ['Mở rộng biểu đồ đến bốn mươi năm cho thấy xu hướng tăng.','Extending the chart to forty years reveals an upward trend.','Giai đoạn dài giảm ảnh hưởng của biến động ngắn hạn.','The longer period reduces the influence of short-term variation.',['long-term record','chuỗi dài hạn']],
      ['Trục dọc cũng bị cắt rất hẹp.','The vertical axis is also truncated very narrowly.','Điều đó có thể phóng đại dao động nhỏ về mặt thị giác.','That can visually exaggerate modest fluctuations.',['truncated axis','trục bị cắt']],
    ]],
    ['Understanding Uncertainty','Hiểu bất định','Dự báo đưa ra một khoảng thay vì một số duy nhất.','Không nhầm khoảng với thiếu hiểu biết hoàn toàn.',[
      ['Mô hình dự báo mức tăng từ 1,8 đến 2,6 độ.','The model projects an increase between 1.8 and 2.6 degrees.','Khoảng đó có nghĩa các nhà khoa học không biết gì chắc chắn sao?','Does that range mean that scientists know nothing with confidence?',['projection range','khoảng dự báo']],
      ['Không, mọi kết quả trong khoảng đều cho thấy nhiệt độ tăng đáng kể.','No. Every outcome in the range indicates substantial warming.','Bất định liên quan mức độ, không phải hướng thay đổi.','The uncertainty concerns magnitude, not the direction of change.',['uncertainty range','khoảng bất định']],
      ['Quyết định vẫn phải cân nhắc rủi ro ở đầu cao của khoảng.','Decisions still need to consider the risk at the upper end of the range.','Đúng, bất định có thể là lý do quản lý rủi ro chứ không phải trì hoãn.','Exactly. Uncertainty can justify risk management rather than delay.',['risk under uncertainty','rủi ro trong bất định']],
    ]],
  ]}),
  t({id:'designing-inclusive-hiring',title:'Designing Inclusive Hiring',titleVi:'Thiết kế tuyển dụng bao trùm',category:'Work',icon:'🧑‍💼',level:'B2',description:'Xác định tiêu chí, giảm thiên lệch và tạo tiếp cận trong tuyển dụng.',grammar:['passive-voice','policy-language','conditionals'],scenarios:[
    ['Reviewing the Job Criteria','Xem tiêu chí công việc','Đội tuyển dụng viết yêu cầu cho vai trò mới.','Tách điều thiết yếu khỏi tín hiệu địa vị.',[
      ['Mô tả yêu cầu bằng thạc sĩ dù công việc không dùng kiến thức chuyên biệt đó.','The description requires a master’s degree although the role does not use that specialist knowledge.','Vậy bằng cấp có thể là đại diện không cần thiết cho năng lực.','Then the degree may be an unnecessary proxy for capability.',['essential criterion','tiêu chí thiết yếu']],
      ['Mình có thể yêu cầu kinh nghiệm tương đương thay thế.','We could accept equivalent experience instead.','Tốt hơn nữa, hãy mô tả nhiệm vụ ứng viên phải thực hiện được.','Better still, describe the tasks candidates need to perform.',['equivalent experience','kinh nghiệm tương đương']],
      ['Cụm “phù hợp văn hóa” cũng quá mơ hồ.','The phrase “cultural fit” is also too vague.','Hãy thay bằng hành vi hợp tác có thể đánh giá.','Replace it with observable collaborative behaviours.',['observable behaviour','hành vi quan sát được']],
    ]],
    ['Structuring the Assessment','Cấu trúc đánh giá','Phỏng vấn viên thường đặt câu hỏi khác nhau.','Tạo bằng chứng so sánh công bằng.',[
      ['Mỗi ứng viên nên được hỏi cùng câu hỏi cốt lõi.','Each candidate should be asked the same core questions.','Như vậy điểm số dựa trên bằng chứng tương đương.','That makes the scores depend on comparable evidence.',['structured interview','phỏng vấn có cấu trúc']],
      ['Câu hỏi tiếp theo có được phép không?','Are follow-up questions permitted?','Có, nếu chúng làm rõ câu trả lời chứ không đưa gợi ý cho một người.','Yes, if they clarify an answer rather than coach one candidate.',['consistent scoring','chấm điểm nhất quán']],
      ['Người phỏng vấn nên chấm độc lập trước khi thảo luận.','Interviewers should score independently before discussing candidates.','Điều đó giảm việc người nói đầu tiên neo ý kiến cả nhóm.','That reduces the influence of the first speaker anchoring the group.',['independent score','điểm độc lập']],
    ]],
    ['Providing Access','Cung cấp khả năng tiếp cận','Ứng viên có thể cần điều chỉnh khi thi tuyển.','Mời nhu cầu mà không yêu cầu tiết lộ quá mức.',[
      ['Lời mời nên hỏi ứng viên có cần điều chỉnh không.','The invitation should ask whether candidates require an adjustment.','Nó không nên yêu cầu họ nêu chẩn đoán chi tiết.','It should not require them to disclose a detailed diagnosis.',['candidate adjustment','điều chỉnh cho ứng viên']],
      ['Bài kiểm tra có giới hạn thời gian không cần thiết.','The exercise has a time limit that is not essential to the role.','Bỏ giới hạn có thể làm bài đánh giá tiếp cận hơn cho mọi người.','Removing it may make the assessment more accessible to everyone.',['accessible assessment','đánh giá dễ tiếp cận']],
      ['Nếu thời gian là kỹ năng thật, mình phải giải thích và cho điều chỉnh hợp lý.','If speed is genuinely relevant, we must explain why and provide reasonable adjustments.','Đúng, tiếp cận không có nghĩa bỏ tiêu chuẩn thiết yếu.','Correct. Accessibility does not mean removing essential standards.',['reasonable adjustment','điều chỉnh hợp lý']],
    ]],
  ]}),
];
