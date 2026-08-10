import { depthConversation as c } from './depth-builder';
import type { ConversationAdditions } from '../content-expander';

export const dailyFoodDepth: ConversationAdditions = {
  'meeting-a-friend': [
    c('Running Late','Bạn sắp đến muộn','Một người bạn bị chậm vì trời mưa, còn người kia đang giữ bàn.','Báo trễ, cập nhật vị trí và điều chỉnh việc gọi món.',[
      ['Bạn tới gần chưa? Quán bắt đầu đông rồi.','Are you close? The café is starting to fill up.','Mình đang trên đường nhưng mưa lớn quá.','I\'m on my way, but the rain is really heavy.',['on my way','đang trên đường']],
      ['Bạn nghĩ sẽ trễ bao lâu?','How late do you think you\'ll be?','Chắc mình đến trễ khoảng mười lăm phút.','I\'ll probably be about fifteen minutes late.',['run late','đến muộn hơn dự kiến'],['I think I\'ll be about fifteen minutes late.']],
      ['Không sao, mình sẽ giữ bàn.','No worries. I\'ll hold the table.','Bạn gọi trước giúp mình một trà đào ít ngọt nhé.','Could you order me a peach tea with less sugar?',['hold the table','giữ bàn']],
      ['Được. Nhắn mình khi bạn đến đầu đường nhé.','Sure. Text me when you reach the end of the street.','Ừ, mình sẽ đi bộ vào vì đoạn này đang kẹt xe.','Okay. I\'ll walk from there because traffic is backed up.',['backed up','ùn tắc']],
      ['Mình vừa gọi đồ xong, bạn cứ từ từ.','I\'ve just placed the order, so take your time.','Cảm ơn nhé. Mình còn cách quán khoảng năm phút.','Thanks. I\'m about five minutes away now.',['minutes away','cách khoảng bao nhiêu phút']],
    ]),
    c('Coordinating the Group','Sắp xếp nhóm bạn','Bốn người bạn muốn gặp nhau nhưng mỗi người đến từ một nơi khác.','Chọn địa điểm công bằng và xác nhận với cả nhóm.',[
      ['Quán cũ hơi xa chỗ làm của Mai.','The old café is quite far from Mai\'s office.','Hay mình chọn chỗ nào ở giữa mọi người?','Why don\'t we choose somewhere central for everyone?',['somewhere central','một nơi ở vị trí trung tâm']],
      ['Ga metro Nhà hát Thành phố có tiện không?','Would the Opera House metro station be convenient?','Tiện cho mình, nhưng để mình hỏi hai người còn lại.','It works for me, but let me check with the other two.',['check with','hỏi/xác nhận với']],
      ['Nếu họ đồng ý, mình tìm quán gần lối ra số ba.','If they agree, I\'ll find a café near exit three.','Mai vừa nhắn là cô ấy có thể đến lúc sáu rưỡi.','Mai just said she can make it at six thirty.',['make it','đến/tham gia được']],
      ['Còn Tuấn thì sao?','What about Tuan?','Cậu ấy muốn dời sang bảy giờ vì có cuộc họp muộn.','He\'d prefer to move it to seven because he has a late meeting.',['move it to','dời sang thời gian khác']],
      ['Vậy chốt bảy giờ ở gần ga nhé.','Then let\'s settle on seven near the station.','Được, mình sẽ gửi địa chỉ chính xác vào nhóm.','Great. I\'ll send the exact address to the group.',['settle on','thống nhất chọn']],
    ]),
  ],
  'greeting-a-neighbor': [
    c('Borrowing a Tool','Mượn dụng cụ','Một người hàng xóm cần lắp bàn nhưng thiếu tua vít.','Nhờ mượn đồ, nói thời gian trả và cảm ơn.',[
      ['Xin lỗi đã làm phiền, nhà bạn có tua vít không?','Sorry to bother you, but do you have a screwdriver?','Có. Bạn cần loại đầu dẹt hay đầu chữ thập?','Yes. Do you need a flat-head or a Phillips screwdriver?',['screwdriver','tua vít']],
      ['Đầu chữ thập nhé. Mình đang lắp chiếc bàn mới.','A Phillips one, please. I\'m assembling a new desk.','Mình có cả một bộ, bạn cứ lấy cái hộp này.','I have a full set, so you can take this case.',['assemble','lắp ráp']],
      ['Mình sẽ trả ngay sau khi làm xong.','I\'ll bring it back as soon as I\'m done.','Không vội đâu, cuối tuần trả cũng được.','There\'s no rush. You can return it this weekend.',['no rush','không cần vội']],
      ['Cảm ơn bạn. Mình sẽ giữ đồ cẩn thận.','Thanks. I\'ll take good care of everything.','Nếu cần máy khoan thì cứ nói nhé.','Let me know if you need a drill as well.',['take good care of','giữ gìn cẩn thận']],
    ]),
    c('Taking In a Package','Nhận hộ kiện hàng','Shipper giao hàng khi người hàng xóm đi vắng.','Xin nhận hộ, xác nhận kiện và hẹn lấy lại.',[
      ['Shipper đang đứng trước cửa nhà bạn.','A delivery driver is outside your apartment.','Mình đang ở cơ quan. Bạn nhận hộ được không?','I\'m at work. Could you take the package in for me?',['take a package in','nhận hộ kiện hàng']],
      ['Được. Kiện hàng có cần thanh toán không?','Sure. Does the package require payment?','Không, mình đã thanh toán online rồi.','No. I\'ve already paid for it online.',['require payment','cần thanh toán']],
      ['Anh ấy cần mã nhận hàng gồm bốn số.','He needs the four-digit delivery code.','Mã là tám hai sáu bốn, nhưng đừng đọc trước khi thấy tên mình nhé.','It\'s eight two six four, but check my name before sharing it.',['delivery code','mã nhận hàng']],
      ['Tên và số căn hộ đều đúng rồi.','The name and apartment number both match.','Cảm ơn bạn. Tối nay mình qua lấy sau bảy giờ.','Thank you. I\'ll pick it up after seven tonight.',['match','khớp, trùng với']],
    ]),
  ],
  'morning-routine': [
    c('Sharing the Bathroom','Dùng chung phòng tắm','Hai người cùng nhà có lịch đi làm sớm trùng nhau.','Thương lượng thứ tự và thời lượng dùng phòng tắm.',[
      ['Sáng mai bạn cần ra khỏi nhà lúc mấy giờ?','What time do you need to leave tomorrow morning?','Mình phải đi lúc bảy giờ kém mười.','I have to leave at ten to seven.',['ten to seven','bảy giờ kém mười']],
      ['Mình cũng có cuộc họp sớm. Ai dùng phòng tắm trước?','I have an early meeting too. Who should use the bathroom first?','Bạn tắm trước đi, còn mình chuẩn bị bữa sáng.','You go first while I make breakfast.',['go first','làm trước, đi trước']],
      ['Mình chỉ cần khoảng mười phút thôi.','I\'ll only need about ten minutes.','Vậy nhớ xong trước sáu giờ hai mươi nhé.','Then please be done by six twenty.',['be done by','xong trước thời điểm']],
      ['Được, mình sẽ chuẩn bị quần áo từ tối nay.','Sure. I\'ll lay out my clothes tonight.','Tốt, như vậy sáng mai cả hai đều đỡ vội.','Great. That way, neither of us has to rush tomorrow.',['lay out clothes','chuẩn bị sẵn quần áo']],
    ]),
  ],
  'breakfast-at-home': [
    c('Breakfast for Guests','Chuẩn bị sáng cho khách','Bạn bè ngủ lại và chủ nhà cần hỏi sở thích bữa sáng.','Hỏi chế độ ăn và chuẩn bị đủ phần.',[
      ['Sáng mai mọi người muốn ăn gì?','What would everyone like for breakfast tomorrow?','Mình ăn gì cũng được, nhưng Lan không dùng được sữa.','I\'m fine with anything, but Lan can\'t have dairy.',['can\'t have dairy','không dùng được sản phẩm từ sữa']],
      ['Vậy mình làm cháo gà và để hành riêng nhé.','Then I\'ll make chicken porridge and serve the green onions separately.','Ý hay đấy. Minh lại không ăn được hành.','Good idea. Minh doesn\'t eat green onions.',['serve separately','để/phục vụ riêng']],
      ['Nhà còn đủ trứng cho bốn người không?','Do we have enough eggs for four people?','Chỉ còn ba quả, mình sẽ mua thêm vào sáng sớm.','There are only three left, so I\'ll buy more early tomorrow.',['enough for','đủ cho']],
      ['Bạn mua thêm ít trái cây giúp mình nhé.','Could you pick up some fruit as well?','Được, mình sẽ lấy chuối và thanh long.','Sure. I\'ll get bananas and dragon fruit.',['pick up groceries','ghé mua thực phẩm']],
    ]),
  ],
  'going-to-work': [
    c('Office Parking','Gửi xe ở văn phòng','Một nhân viên mới chưa biết quy trình gửi xe máy.','Hỏi lối vào, vé xe và nơi để mũ.',[
      ['Lối vào bãi xe máy ở đâu vậy?','Where is the entrance to the motorbike parking area?','Nó ở phía sau tòa nhà, cạnh cổng giao hàng.','It\'s behind the building, next to the delivery gate.',['parking entrance','lối vào bãi xe']],
      ['Mình có cần quẹt thẻ nhân viên không?','Do I need to tap my employee card?','Có, rồi máy sẽ in cho bạn một vé xe.','Yes. Then the machine will print a parking ticket.',['tap a card','chạm/quẹt thẻ']],
      ['Mình nên giữ vé ở đâu?','Where should I keep the ticket?','Giữ vé dễ thấy vì bảo vệ kiểm tra khi bạn ra.','Keep it visible because security checks it when you exit.',['parking ticket','vé gửi xe']],
      ['Có chỗ nào để mũ bảo hiểm không?','Is there somewhere to leave my helmet?','Bạn có thể khóa nó vào xe hoặc dùng tủ tầng hầm.','You can lock it to your bike or use the basement locker.',['locker','tủ có khóa']],
    ]),
  ],
  'lunch-break': [
    c('Splitting the Lunch Bill','Chia tiền bữa trưa','Bốn đồng nghiệp vừa ăn xong và cần thanh toán riêng.','Chia hóa đơn công bằng và xử lý một món dùng chung.',[
      ['Hóa đơn đến rồi. Mình chia đều nhé?','The bill is here. Shall we split it evenly?','Ba người gọi món giống nhau, nhưng phần của mình rẻ hơn.','Three of you ordered the same thing, but mine cost less.',['split evenly','chia đều']],
      ['Vậy mỗi người trả phần của mình thì hợp lý hơn.','Then it would be fairer for everyone to pay for their own meal.','Còn đĩa chả giò dùng chung thì chia bốn nhé.','Let\'s divide the shared spring rolls between all four of us.',['pay your share','trả phần của mình']],
      ['Mình sẽ chụp hóa đơn rồi tính từng phần.','I\'ll take a photo of the bill and work out each share.','Bạn gửi số tiền vào nhóm giúp nhé.','Please post the amounts in the group chat.',['work out an amount','tính ra số tiền']],
      ['Mọi người chuyển khoản cho mình sau cũng được.','You can transfer the money to me later.','Được, nhớ gửi kèm mã QR nhé.','Okay. Remember to include your QR code.',['transfer money','chuyển khoản']],
    ]),
  ],
  'coming-home': [
    c('An Unexpected Visitor','Khách đến bất ngờ','Một người bạn ghé qua khi nhà chưa dọn và chủ nhà vừa đi làm về.','Đón khách tự nhiên và điều chỉnh kế hoạch tối.',[
      ['Mình đang ở gần nhà bạn. Ghé qua một lát được không?','I\'m near your place. Can I stop by for a bit?','Được chứ, nhưng nhà mình đang hơi bừa.','Sure, but my place is a little messy right now.',['stop by','ghé qua']],
      ['Không sao đâu, mình chỉ mang đồ bạn để quên.','That\'s fine. I\'m just bringing back something you left behind.','Vậy lên đi, mình sẽ xuống mở cổng.','Come up, then. I\'ll go down and open the gate.',['leave behind','để quên']],
      ['Bạn đã ăn tối chưa?','Have you had dinner yet?','Chưa, mình định mua gì đó trên đường về.','Not yet. I was going to pick something up on my way home.',['pick something up','ghé mua/lấy thứ gì']],
      ['Hay mình gọi đồ ăn rồi ăn cùng nhau?','Why don\'t we order something and eat together?','Được đấy, nhưng mình chỉ ở được khoảng một tiếng.','Sounds good, but I can only stay for about an hour.',['stay for','ở lại trong khoảng']],
    ]),
  ],
  'cooking-dinner': [
    c('Cooking for a Vegetarian','Nấu cho người ăn chay','Một người bạn ăn chay tới dùng bữa tối.','Điều chỉnh món và tránh lẫn dụng cụ nấu.',[
      ['Tối nay Phương ăn cùng, nhưng bạn ấy ăn chay.','Phuong is joining us for dinner, but she\'s vegetarian.','Vậy mình đổi món thịt bò thành đậu hũ nhé.','Then let\'s replace the beef with tofu.',['replace with','thay bằng']],
      ['Mình có thể dùng cùng chảo đã chiên thịt không?','Can we use the same pan we cooked the meat in?','Tốt nhất dùng chảo sạch để tránh lẫn đồ ăn.','It\'s better to use a clean pan to avoid cross-contact.',['cross-contact','sự tiếp xúc chéo thực phẩm']],
      ['Nước sốt này có thành phần từ cá không?','Does this sauce contain any fish?','Có nước mắm, nên mình sẽ pha một phần riêng bằng nước tương.','It contains fish sauce, so I\'ll make a separate portion with soy sauce.',['separate portion','phần riêng']],
      ['Mình cũng sẽ để đậu phộng bên ngoài vì chưa biết bạn ấy có dị ứng không.','I\'ll leave the peanuts out because I don\'t know whether she\'s allergic.','Cẩn thận vậy là tốt. Mình nhắn hỏi bạn ấy nhé.','Good thinking. I\'ll message her and check.',['leave out','không cho vào']],
    ]),
  ],
  'evening-wind-down': [
    c('After a Stressful Day','Sau một ngày căng thẳng','Hai người cùng nhà nói chuyện sau một ngày làm việc khó khăn.','Chia sẻ cảm xúc và chọn cách thư giãn lành mạnh.',[
      ['Hôm nay trông bạn căng thẳng quá. Có muốn nói chuyện không?','You look stressed today. Do you want to talk about it?','Mình vừa trải qua một ngày rất dài với khách hàng.','I\'ve just had an exhausting day with a client.',['exhausting day','một ngày kiệt sức']],
      ['Mình pha trà rồi ra ban công ngồi nhé?','Shall I make some tea so we can sit on the balcony?','Ừ, mình cần tách khỏi màn hình một lúc.','Yes. I need to step away from screens for a while.',['step away from','tạm rời khỏi']],
      ['Bạn không cần giải quyết công việc tối nay đâu.','You don\'t have to solve the work problem tonight.','Mình biết, nhưng đầu óc cứ nghĩ về cuộc họp.','I know, but my mind keeps going back to the meeting.',['keep going back to','cứ nghĩ lại về']],
      ['Thử viết ra việc cần làm ngày mai rồi gác nó lại.','Try writing down tomorrow\'s tasks and setting them aside.','Ý hay đấy. Làm vậy chắc mình sẽ dễ nghỉ ngơi hơn.','That\'s a good idea. It might help me switch off.',['switch off','ngừng nghĩ về công việc và thư giãn']],
      ['Sau đó mình đi bộ quanh khu nhà một vòng nhé.','After that, let\'s take a walk around the block.','Được, không khí mát sẽ giúp mình bình tĩnh lại.','Okay. The cool air should help me unwind.',['unwind','thư giãn sau căng thẳng']],
    ]),
  ],
  'ordering-pho': [
    c('The Usual Cut Is Sold Out','Hết loại thịt thường gọi','Quán hết tái và nhân viên gợi ý lựa chọn khác.','Hỏi lựa chọn thay thế và điều chỉnh món.',[
      ['Xin lỗi, sáng nay quán hết thịt tái rồi.','Sorry, we\'re out of rare beef this morning.','Vậy quán còn những loại thịt nào?','What other cuts do you still have?',['be out of','hết một món']],
      ['Bên em còn nạm, gầu và bò viên.','We still have brisket, fatty brisket, and beef balls.','Nạm có nhiều mỡ không?','Is the brisket very fatty?',['brisket','nạm bò']],
      ['Nạm khá nạc, còn gầu sẽ béo hơn.','The brisket is fairly lean, while the fatty brisket is richer.','Vậy đổi phần của tôi sang nạm nhé.','Then please make mine with brisket instead.',['lean meat','thịt nạc']],
      ['Bạn vẫn muốn tô nhỏ và thêm hành chứ?','Would you still like a small bowl with extra green onions?','Đúng rồi, và cho nước béo riêng giúp tôi.','Yes, and could you serve the fatty broth on the side?',['on the side','để riêng bên cạnh']],
    ]),
    c('Packing Pho to Take Away','Đóng gói phở mang đi','Khách mua phở về nhà và muốn giữ bánh phở không bị nở.','Yêu cầu đóng riêng và hỏi cách hâm lại.',[
      ['Cho tôi hai phần phở mang về nhé.','I\'d like two orders of pho to take away.','Bạn có muốn để bánh phở và nước dùng riêng không?','Would you like the noodles and broth packed separately?',['pack separately','đóng gói riêng']],
      ['Có, như vậy bánh phở sẽ không bị mềm quá.','Yes, so the noodles don\'t get too soft.','Bên em cũng sẽ để rau và chanh trong túi khác.','We\'ll put the herbs and lime in another bag as well.',['get soggy','bị mềm nhũn']],
      ['Về nhà tôi nên hâm nước dùng bao lâu?','How long should I reheat the broth at home?','Đun đến khi sôi rồi mới cho bánh phở vào.','Bring it to a boil before adding the noodles.',['bring to a boil','đun đến khi sôi']],
      ['Quán cho thêm hai đôi đũa giúp tôi nhé.','Could you include two pairs of chopsticks?','Được, em sẽ kiểm tra đủ đồ trước khi giao.','Sure. I\'ll check that everything is included.',['include utensils','kèm dụng cụ ăn']],
    ]),
  ],
  'buying-banh-mi': [
    c('The Wrong Filling','Nhầm nhân bánh mì','Khách phát hiện bánh mì gà thay vì bánh mì thịt đã gọi.','Báo nhầm món và xác nhận phần làm lại.',[
      ['Xin lỗi, hình như ổ này là bánh mì gà.','Excuse me, I think this one has chicken in it.','Bạn đã gọi bánh mì thịt nướng phải không?','You ordered the grilled pork banh mi, right?',['filling','nhân bên trong món ăn']],
      ['Đúng, và phần của tôi không có đồ chua.','Yes, and mine was supposed to have no pickles.','Em xin lỗi, chắc em đã đưa nhầm hai đơn.','I\'m sorry. I must have switched the two orders.',['switch two orders','đưa nhầm hai đơn']],
      ['Bạn làm lại giúp tôi được không?','Could you remake it for me?','Được, em sẽ ưu tiên làm ngay.','Of course. I\'ll make yours next.',['make yours next','ưu tiên làm phần của bạn']],
      ['Tôi có cần trả thêm phần thịt nướng không?','Do I need to pay the price difference for the grilled pork?','Không, quán sẽ giữ nguyên giá vì đây là lỗi của bên em.','No. We\'ll keep the original price because the mistake was ours.',['price difference','phần tiền chênh lệch']],
    ]),
  ],
  'coffee-shop-orders': [
    c('Asking for Wi-Fi','Hỏi Wi-Fi ở quán','Khách muốn làm việc một giờ và cần mạng cùng ổ cắm.','Hỏi mật khẩu, thời hạn sử dụng và chỗ ngồi phù hợp.',[
      ['Quán mình có Wi-Fi cho khách không?','Does the café have Wi-Fi for customers?','Có, mật khẩu được in ở cuối hóa đơn.','Yes. The password is printed at the bottom of your receipt.',['Wi-Fi password','mật khẩu Wi-Fi']],
      ['Mật khẩu có hết hạn sau một khoảng thời gian không?','Does the password expire after a certain amount of time?','Mỗi mã dùng được hai tiếng trên một thiết bị.','Each code works for two hours on one device.',['expire','hết hiệu lực']],
      ['Gần đây có bàn nào có ổ cắm không?','Is there a table near a power outlet?','Bàn cạnh cửa sổ vừa trống, dưới ghế có ổ điện.','The window table just became available, and there\'s an outlet under the seat.',['power outlet','ổ cắm điện']],
      ['Tuyệt. Tôi sẽ gọi thêm món nếu ở lâu hơn.','Perfect. I\'ll order something else if I stay longer.','Không sao, nhưng bạn nhớ trông đồ cá nhân nhé.','That\'s fine. Just keep an eye on your belongings.',['keep an eye on','trông chừng']],
    ]),
    c('Switching to Takeaway','Đổi sang mang đi','Khách đang chờ nhưng cần rời quán sớm hơn dự kiến.','Đổi hình thức phục vụ và đóng gói an toàn.',[
      ['Nước của tôi đã pha chưa? Tôi cần đi sớm.','Has my drink been made yet? I need to leave early.','Đang pha rồi, khoảng hai phút nữa sẽ xong.','It\'s being made now and should be ready in about two minutes.',['be ready in','sẽ xong trong']],
      ['Bạn đổi sang ly mang đi giúp tôi được không?','Could you put it in a takeaway cup instead?','Được, bên em sẽ dùng nắp chống tràn.','Sure. We\'ll use a spill-resistant lid.',['spill-resistant lid','nắp chống tràn']],
      ['Đừng cho đá đầy quá vì tôi phải đi xe máy.','Please don\'t fill it too close to the top because I\'m riding a motorbike.','Em sẽ chừa một khoảng và bọc thêm túi.','I\'ll leave some room and secure it in an extra bag.',['leave some room','chừa một khoảng']],
      ['Cảm ơn. Tôi có thể thanh toán tại đây luôn chứ?','Thanks. Can I pay here now?','Được, bạn chạm thẻ vào máy này nhé.','Yes. Tap your card on this reader.',['card reader','máy đọc thẻ']],
    ]),
  ],
  'bubble-tea': [
    c('A Group Order','Đặt trà sữa cho cả nhóm','Một người đặt sáu ly với nhiều mức đường và topping khác nhau.','Đọc đơn rõ ràng và xác nhận nhãn từng ly.',[
      ['Tôi muốn đặt sáu ly cho văn phòng.','I\'d like to place an order for six drinks.','Bạn có danh sách từng món không?','Do you have a list of each drink?',['place a group order','đặt đơn cho nhóm']],
      ['Có, ba ly đầu đều là trà ô long nhưng khác mức đường.','Yes. The first three are all oolong tea with different sugar levels.','Bạn đọc từng ly để em nhập riêng nhé.','Please read them out one at a time so I can enter them separately.',['one at a time','từng cái một']],
      ['Ly của Mai không đường nhưng thêm thạch nha đam.','Mai\'s has no sugar but comes with aloe vera jelly.','Em sẽ dán tên lên nắp để không bị nhầm.','I\'ll label the lid with her name to avoid a mix-up.',['label the lid','dán tên lên nắp']],
      ['Hai ly cuối giống hệt nhau và đều ít đá.','The last two are identical, both with less ice.','Để em đọc lại toàn bộ đơn trước khi thanh toán.','Let me read the whole order back before you pay.',['read an order back','đọc lại đơn để xác nhận']],
    ]),
  ],
  'restaurant-order': [
    c('Splitting the Dinner Bill','Chia hóa đơn bữa tối','Một nhóm ăn nhiều món chung nhưng có đồ uống riêng.','Đề nghị cách chia và thanh toán bằng nhiều phương thức.',[
      ['Anh chị muốn thanh toán chung hay riêng ạ?','Would you like one bill or separate bills?','Bọn tôi ăn chung món, nhưng đồ uống mỗi người khác nhau.','We shared the food, but everyone ordered a different drink.',['separate bills','hóa đơn riêng']],
      ['Bên em có thể chia tiền món ăn đều rồi cộng đồ uống riêng.','We can split the food evenly and add each person\'s drink separately.','Cách đó hợp lý. Bọn tôi có thể dùng hai thẻ không?','That sounds fair. Can we pay with two cards?',['split the food evenly','chia đều tiền món ăn']],
      ['Được, anh chị cho biết số tiền muốn trừ trên mỗi thẻ.','Yes. Just tell me how much to charge to each card.','Thẻ này trả một triệu, phần còn lại dùng thẻ kia.','Charge one million dong to this card and the rest to the other one.',['charge to a card','trừ tiền vào thẻ']],
      ['Anh chị có cần hóa đơn VAT không?','Do you need a VAT invoice?','Có, vui lòng gửi bản điện tử đến email công ty.','Yes. Please send the electronic invoice to the company email.',['electronic invoice','hóa đơn điện tử']],
      ['Em sẽ đưa mã QR để anh chị điền thông tin xuất hóa đơn.','I\'ll provide a QR code for the invoice details.','Cảm ơn, bọn tôi sẽ điền trước khi rời quán.','Thanks. We\'ll complete it before we leave.',['invoice details','thông tin xuất hóa đơn']],
    ]),
  ],
  'food-delivery': [
    c('A Delayed Order','Đơn giao quá chậm','Đơn vẫn chưa được lấy sau thời gian dự kiến.','Hỏi trạng thái, nguyên nhân và quyết định tiếp tục hay hủy.',[
      ['Đơn của tôi đã trễ bốn mươi phút mà chưa có tài xế.','My order is forty minutes late and still has no driver.','Quán đang chuẩn bị món, nhưng chưa có tài xế nhận đơn.','The restaurant is preparing the food, but no driver has accepted the order yet.',['accept an order','nhận một đơn giao']],
      ['Ứng dụng vẫn báo sẽ giao trong mười phút nữa.','The app still says it will arrive in ten minutes.','Thời gian đó chưa cập nhật theo tình trạng thiếu tài xế.','That estimate hasn\'t updated to reflect the driver shortage.',['delivery estimate','thời gian giao dự kiến']],
      ['Nếu chờ tiếp thì món có bị nguội không?','Will the food get cold if I keep waiting?','Quán chỉ bắt đầu nấu khi có tài xế ở gần.','The restaurant will only start cooking when a driver is nearby.',['keep waiting','tiếp tục chờ']],
      ['Vậy tôi chờ thêm mười lăm phút rồi quyết định.','Then I\'ll wait another fifteen minutes before deciding.','Tôi sẽ thêm voucher vì sự chậm trễ này.','I\'ll add a voucher to your account for the delay.',['delay voucher','mã giảm giá bù trễ']],
    ]),
    c('Food Arrived Cold','Đồ ăn giao đến bị nguội','Món nóng đến nhưng hộp đã lạnh và túi bị ướt.','Cung cấp bằng chứng và chọn hoàn tiền một phần.',[
      ['Tôi vừa nhận đơn nhưng cả hai món nóng đều nguội.','I\'ve just received the order, but both hot dishes are cold.','Tôi xin lỗi. Túi giao hàng có còn niêm phong không?','I\'m sorry. Was the delivery bag still sealed?',['sealed bag','túi còn niêm phong']],
      ['Có, nhưng đá từ ly nước đã chảy ra khắp túi.','Yes, but ice from the drink had melted all over the bag.','Bạn vui lòng chụp hộp đồ ăn và phần túi bị ướt.','Please take photos of the food containers and the wet part of the bag.',['food container','hộp đựng thức ăn']],
      ['Tôi đã tải lên ba ảnh trong phần hỗ trợ.','I\'ve uploaded three photos in the support chat.','Tôi thấy rồi. Chúng tôi có thể hoàn tiền hai món nóng.','I can see them. We can refund both hot dishes.',['partial refund','hoàn tiền một phần']],
      ['Tôi đồng ý giữ đồ uống và chỉ hoàn tiền món ăn.','I\'m happy to keep the drink and receive a refund for the food only.','Được, tiền sẽ về ví ứng dụng trong vài phút.','All right. The credit should appear in your app wallet within a few minutes.',['app credit','số dư trong ứng dụng']],
    ]),
  ],
};
