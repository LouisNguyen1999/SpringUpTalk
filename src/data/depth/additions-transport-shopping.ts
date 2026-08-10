import { depthConversation as c } from './depth-builder';
import type { ConversationAdditions } from '../content-expander';

export const transportShoppingDepth: ConversationAdditions = {
  'booking-a-grab': [
    c('Finding the Driver','Tìm tài xế','Khách và tài xế đang ở hai phía khác nhau của trung tâm thương mại.','Mô tả vị trí chính xác và thống nhất điểm đón.',[
      ['Anh đang ở cổng nào vậy?','Which entrance are you at?','Tôi đang ở cổng đường Nguyễn Huệ, cạnh hiệu thuốc.','I\'m at the Nguyen Hue entrance, next to the pharmacy.',['entrance','lối vào']],
      ['Tôi lại đang đứng ở cổng phía bãi xe.','I\'m actually waiting by the parking entrance.','Bạn đi thẳng qua sảnh rồi ra cửa có biển màu xanh nhé.','Walk through the lobby and use the door with the blue sign.',['lobby','sảnh']],
      ['Xe anh có đặc điểm gì dễ nhận ra không?','Is there anything distinctive about your car?','Tôi bật đèn khẩn cấp và biển số kết thúc bằng bốn tám.','My hazard lights are on, and the plate ends in four eight.',['hazard lights','đèn khẩn cấp']],
      ['Tôi thấy xe rồi, đang đi về phía anh.','I can see the car now. I\'m walking toward you.','Tốt, tôi sẽ đợi ngay sát lề đường.','Great. I\'ll wait right by the curb.',['curb','lề đường']],
    ]),
  ],
  'riding-a-motorbike': [
    c('Riding in Sudden Rain','Đi xe khi mưa bất chợt','Trời đổ mưa lớn khi hai người đang đi xe máy.','Chọn nơi dừng an toàn và điều chỉnh hành trình.',[
      ['Mưa nặng hạt quá, mình có nên đi tiếp không?','The rain is getting heavy. Should we keep going?','Không, mình tấp vào cây xăng phía trước nhé.','No. Let\'s pull over at the petrol station ahead.',['pull over','tấp xe vào lề']],
      ['Đường đang trơn và mình nhìn không rõ.','The road is slippery, and I can\'t see clearly.','Giảm tốc từ từ, đừng phanh gấp.','Slow down gradually and avoid braking suddenly.',['slippery','trơn trượt']],
      ['Áo mưa của bạn ở đâu?','Where is your raincoat?','Nó ở dưới yên, nhưng mình cần chỗ khô.','It\'s under the seat, but I need somewhere dry.',['under the seat','ở dưới yên xe']],
      ['Đợi mưa nhẹ hơn rồi mình đi đường lớn.','Let\'s wait until the rain eases and take the main road.','Đồng ý, đường đó sáng và ít ngập hơn.','Agreed. That road is better lit and less likely to flood.',['ease','dịu bớt']],
    ]),
  ],
  'traffic-jam': [
    c('Choosing Another Route','Chọn tuyến đường khác','Hai đồng nghiệp bị kẹt xe trước một cuộc họp quan trọng.','So sánh tuyến thay thế và báo giờ đến mới.',[
      ['Bản đồ báo đoạn phía trước chậm thêm ba mươi phút.','The map says the road ahead will add thirty minutes.','Mình có thể rẽ qua cầu, nhưng đường đó xa hơn.','We could go over the bridge, but that route is longer.',['route','tuyến đường']],
      ['Xa hơn nhưng có vẻ đang thông thoáng.','It\'s longer, but the traffic seems to be moving.','Vậy rẽ ở đèn xanh tiếp theo nhé.','Then turn at the next traffic light.',['traffic light','đèn giao thông']],
      ['Mình nên báo cho đội dự án ngay.','We should update the project team now.','Mình sẽ nhắn rằng chúng ta đến muộn khoảng mười phút.','I\'ll message them that we\'ll be about ten minutes late.',['update the team','cập nhật cho cả nhóm']],
      ['Nếu tình hình thay đổi thì gọi cho lễ tân.','Call reception if the situation changes.','Được, mình sẽ theo dõi giờ đến dự kiến.','Okay. I\'ll keep an eye on the estimated arrival time.',['estimated arrival time','giờ đến dự kiến']],
    ]),
    c('A Minor Road Accident','Va chạm nhẹ trên đường','Một va chạm nhỏ làm ùn xe và hai người cần xử lý an toàn.','Kiểm tra an toàn, ghi nhận thông tin và tránh cản đường.',[
      ['Bạn có bị thương ở đâu không?','Are you hurt anywhere?','Không, mình ổn, chỉ hơi hoảng thôi.','No, I\'m okay. I\'m just a little shaken.',['shaken','bị hoảng sau sự cố']],
      ['Xe vẫn chạy được chứ?','Is the motorbike still safe to ride?','Có vẻ được, nhưng tay phanh bị xước.','It seems fine, but the brake lever is scratched.',['brake lever','tay phanh']],
      ['Mình chụp hiện trường trước khi dắt xe vào lề nhé.','Let\'s photograph the scene before moving the bikes aside.','Được, mình cũng sẽ chụp biển số hai xe.','Okay. I\'ll take pictures of both number plates too.',['the scene','hiện trường']],
      ['Sau đó mình trao đổi số điện thoại và thông tin bảo hiểm.','Then we can exchange phone numbers and insurance details.','Đồng ý, miễn là không chặn dòng xe nữa.','Agreed, as long as we stop blocking traffic.',['exchange details','trao đổi thông tin']],
    ]),
  ],
  'asking-for-directions': [
    c('Finding a Hidden Entrance','Tìm lối vào khó thấy','Khách đã tới đúng địa chỉ nhưng không thấy lối vào tòa nhà.','Làm rõ mốc và đi theo chỉ dẫn nhiều bước.',[
      ['Xin lỗi, lối vào số 28 có ở đây không ạ?','Excuse me, is the entrance to number 28 around here?','Nó nằm trong con hẻm giữa tiệm hoa và ngân hàng.','It\'s down the alley between the flower shop and the bank.',['alley','hẻm']],
      ['Tôi có cần đi hết con hẻm không?','Do I need to walk all the way down it?','Không, rẽ trái ngay sau bãi giữ xe.','No. Turn left just after the parking area.',['all the way','suốt đến tận cuối']],
      ['Ở đó có biển chỉ dẫn nào không?','Is there a sign there?','Có một biển nhỏ ghi “Khối B” phía trên cửa kính.','There\'s a small sign saying “Block B” above a glass door.',['block','khối nhà']],
      ['Vậy thang máy ở ngay bên trong phải không?','So the lift is just inside, right?','Đúng, quầy lễ tân ở bên phải thang máy.','Yes. Reception is to the right of the lift.',['reception','quầy lễ tân']],
    ]),
  ],
  'taking-a-bus': [
    c('The Last Bus Home','Chuyến xe buýt cuối','Hai người rời sự kiện muộn và cần kiểm tra chuyến xe cuối.','Xác nhận giờ chạy và chuẩn bị phương án dự phòng.',[
      ['Chuyến xe số 18 cuối cùng chạy lúc mấy giờ?','What time does the last number 18 bus leave?','Theo ứng dụng thì nó rời bến lúc mười giờ mười lăm.','According to the app, it leaves the terminal at ten fifteen.',['terminal','bến đầu cuối']],
      ['Nó tới trạm này khoảng bao lâu sau đó?','Roughly how long does it take to reach this stop?','Khoảng mười hai phút nếu đường không đông.','About twelve minutes if traffic is light.',['traffic is light','đường ít xe']],
      ['Nếu lỡ chuyến thì mình không còn xe nối tuyến.','If we miss it, we won\'t have a connecting bus.','Mình nên ra trạm ngay thay vì chờ hết chương trình.','We should head to the stop now instead of waiting for the event to end.',['connecting bus','xe buýt nối tuyến']],
      ['Mình cũng lưu số hãng taxi để dự phòng.','I\'ll save a taxi company\'s number as a backup.','Tốt, nhưng chắc mình vẫn kịp nếu đi ngay.','Good, but we should still make it if we leave now.',['as a backup','để dự phòng']],
    ]),
  ],
  'at-the-supermarket': [
    c('A Price at the Checkout','Giá tại quầy thanh toán','Giá tính ở quầy khác với nhãn giảm giá trên kệ.','Hỏi lại giá và cung cấp bằng chứng lịch sự.',[
      ['Xin lỗi, hộp ngũ cốc này được tính giá cao hơn trên kệ.','Excuse me, this cereal rang up higher than the shelf price.','Bạn có nhớ nhãn trên kệ ghi bao nhiêu không?','Do you remember what the shelf label said?',['ring up','được máy tính giá']],
      ['Nhãn ghi giảm còn sáu mươi chín nghìn đến hết hôm nay.','It said it was reduced to sixty-nine thousand through today.','Tôi sẽ gọi nhân viên kiểm tra mã sản phẩm.','I\'ll ask a colleague to check the product code.',['product code','mã sản phẩm']],
      ['Tôi có chụp ảnh nhãn giá nếu cần.','I took a photo of the price tag if that helps.','Cảm ơn, ảnh cho thấy đúng cùng kích cỡ sản phẩm.','Thanks. The photo shows the same product size.',['price tag','nhãn giá']],
      ['Vậy quầy có thể điều chỉnh lại giá không?','Can the price be adjusted, then?','Có, tôi sẽ áp dụng giá khuyến mãi ngay.','Yes. I\'ll apply the promotional price now.',['promotional price','giá khuyến mãi']],
    ]),
  ],
  'convenience-store': [
    c('Sending a Parcel','Gửi bưu kiện','Khách muốn gửi một gói hàng nhỏ tại cửa hàng tiện lợi.','Hỏi giới hạn, đóng gói và lấy biên nhận.',[
      ['Cửa hàng có nhận gửi bưu kiện không?','Can I send a parcel from this store?','Có, nhưng mỗi kiện không được nặng quá năm ký.','Yes, but each parcel must weigh no more than five kilos.',['weigh','có trọng lượng']],
      ['Tôi đã đóng hộp nhưng chưa dán kín.','I\'ve boxed it, but I haven\'t sealed it yet.','Bạn có thể mua băng keo ở quầy rồi đóng tại bàn kia.','You can buy tape here and seal it at that table.',['seal a box','dán kín hộp']],
      ['Tôi cần ghi địa chỉ người nhận ở đâu?','Where should I write the recipient\'s address?','Điền vào nhãn này và dán lên mặt phẳng của hộp.','Fill in this label and attach it to a flat side of the box.',['recipient','người nhận']],
      ['Sau khi thanh toán tôi có nhận mã theo dõi không?','Will I get a tracking number after I pay?','Có, mã sẽ được in trên biên nhận.','Yes. It will be printed on your receipt.',['tracking number','mã theo dõi']],
    ]),
  ],
  'buying-clothes': [
    c('Checking the Fit','Kiểm tra độ vừa vặn','Khách phân vân giữa hai cỡ áo khoác.','Mô tả độ vừa và hỏi về chỉnh sửa.',[
      ['Cỡ vừa ôm vai nhưng tay áo hơi ngắn.','The medium fits my shoulders, but the sleeves are a little short.','Bạn thử cỡ lớn để so sánh nhé.','Try the large so you can compare the fit.',['fit the shoulders','vừa phần vai']],
      ['Cỡ lớn lại rộng ở phần eo.','The large is too loose around the waist.','Mẫu này có dây rút nên bạn có thể siết lại.','This style has a drawstring, so you can tighten it.',['drawstring','dây rút']],
      ['Cửa hàng có sửa ngắn tay áo không?','Does the store offer sleeve alterations?','Có, chỉnh sửa cơ bản mất khoảng ba ngày.','Yes. Basic alterations take about three days.',['alteration','việc chỉnh sửa quần áo']],
      ['Vậy tôi lấy cỡ lớn và nhờ chỉnh phần eo.','Then I\'ll take the large and have the waist adjusted.','Tôi sẽ đo và ghi yêu cầu vào phiếu.','I\'ll take your measurements and note the request on the form.',['take measurements','lấy số đo']],
    ]),
  ],
  'online-shopping': [
    c('Changing the Delivery Address','Đổi địa chỉ giao hàng','Khách vừa đặt hàng nhưng chọn nhầm địa chỉ cũ.','Kiểm tra trạng thái và đổi địa chỉ trước khi gửi.',[
      ['Tôi vừa nhận ra đơn đang dùng địa chỉ cũ.','I\'ve just noticed that the order has my old address.','Đơn đã được đóng gói nhưng chưa bàn giao cho đơn vị vận chuyển.','It has been packed but hasn\'t been handed to the carrier yet.',['carrier','đơn vị vận chuyển']],
      ['Tôi có thể sửa địa chỉ ngay trên ứng dụng không?','Can I edit the address in the app?','Sau khi đóng gói, nhân viên hỗ trợ phải cập nhật thủ công.','Once it is packed, support has to update it manually.',['manually','theo cách thủ công']],
      ['Địa chỉ mới vẫn ở cùng quận.','The new address is still in the same district.','Vậy sẽ không phát sinh phí giao hàng.','Then there won\'t be an additional delivery fee.',['additional fee','phí phát sinh']],
      ['Bạn gửi xác nhận sau khi sửa giúp tôi nhé.','Please send me confirmation after the change.','Tôi sẽ gửi email và cập nhật phần theo dõi đơn.','I\'ll email you and update the order tracking page.',['confirmation','xác nhận']],
    ]),
    c('Comparing Seller Reviews','So sánh đánh giá người bán','Người mua chọn giữa hai gian hàng bán cùng sản phẩm.','Đọc đánh giá có chọn lọc và cân bằng giá với độ tin cậy.',[
      ['Gian hàng này rẻ hơn nhưng chỉ có vài đánh giá.','This seller is cheaper but has only a few reviews.','Gian kia đắt hơn một chút và đã bán hơn hai nghìn món.','The other costs a little more and has sold over two thousand items.',['seller rating','điểm đánh giá người bán']],
      ['Mình nên xem các đánh giá gần đây trước.','We should look at the recent reviews first.','Đúng, điểm cao từ hai năm trước có thể không còn phản ánh dịch vụ.','Right. A high score from two years ago may not reflect current service.',['reflect','phản ánh']],
      ['Nhiều người khen đóng gói nhưng chê giao chậm.','Several buyers praise the packaging but mention slow delivery.','Mình không cần gấp nên điều đó chấp nhận được.','We aren\'t in a hurry, so that trade-off is acceptable.',['trade-off','sự đánh đổi']],
      ['Vậy chọn gian có chính sách đổi trả rõ ràng hơn nhé.','Then let\'s choose the seller with the clearer return policy.','Đồng ý, thêm một ít tiền để giảm rủi ro cũng đáng.','Agreed. Paying a little more to reduce the risk is worthwhile.',['worthwhile','đáng làm, đáng tiền']],
    ]),
  ],
  'returning-an-item': [
    c('A Missing Receipt','Không còn hóa đơn','Khách muốn trả máy xay bị lỗi nhưng đã mất hóa đơn giấy.','Chứng minh giao dịch và thương lượng phương án phù hợp.',[
      ['Máy xay ngừng chạy sau hai lần dùng, nhưng tôi làm mất hóa đơn.','The blender stopped working after two uses, but I\'ve lost the receipt.','Bạn đã thanh toán bằng thẻ thành viên hay thẻ ngân hàng?','Did you pay with a membership account or a bank card?',['proof of purchase','bằng chứng mua hàng']],
      ['Tôi dùng thẻ ngân hàng và còn giao dịch trong ứng dụng.','I used my bank card and still have the transaction in the app.','Chúng tôi có thể tra cứu nếu bạn nhớ ngày và cửa hàng mua.','We may be able to look it up if you remember the date and branch.',['look up a transaction','tra cứu giao dịch']],
      ['Tôi mua ở chi nhánh này vào thứ Bảy tuần trước.','I bought it at this branch last Saturday.','Tôi đã thấy giao dịch trùng số tiền và mã sản phẩm.','I found a transaction matching the amount and product code.',['matching','khớp với']],
      ['Tôi muốn đổi máy mới thay vì nhận phiếu mua hàng.','I would prefer a replacement rather than store credit.','Được, sau khi kỹ thuật xác nhận lỗi, chúng tôi sẽ đổi ngay.','That\'s possible. Once the fault is confirmed, we\'ll replace it.',['store credit','phiếu/số dư mua hàng']],
    ]),
  ],
};
