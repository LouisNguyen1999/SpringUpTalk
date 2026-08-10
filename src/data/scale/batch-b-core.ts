import { scaleTopic as t } from './scale-builder';

export const batchBCoreTopics = [
  t({id:'introducing-your-family',title:'Introducing Your Family',titleVi:'Giới thiệu gia đình',category:'Family',icon:'👨‍👩‍👧',level:'A1',description:'Giới thiệu thành viên, nghề nghiệp và nơi ở.',grammar:['be','have','possessives'],scenarios:[
    ['A Family Photo','Ảnh gia đình','Hai người cùng xem một bức ảnh gia đình.','Chỉ người trong ảnh và nói mối quan hệ.',[
      ['Người đứng cạnh bạn là ai?','Who is the person standing next to you?','Đó là chị gái tôi, tên chị ấy là Hoa.','That is my older sister, Hoa.',['older sister','chị gái']],
      ['Chị ấy sống cùng bạn à?','Does she live with you?','Không, chị ấy sống ở Huế với chồng.','No. She lives in Hue with her husband.',['husband','chồng']],
      ['Còn em bé phía trước là ai?','And who is the baby in front?','Đó là con trai của chị Hoa.','That is Hoa\'s son.',['son','con trai']],
    ]],
    ['Meeting a Cousin','Gặp anh họ','Một người bạn lần đầu gặp người họ hàng của bạn.','Giới thiệu ngắn và tìm điểm chung.',[
      ['Nam này, đây là anh họ mình, Tuấn.','Nam, this is my cousin, Tuan.','Chào Tuấn, rất vui được gặp bạn.','Hi, Tuan. It\'s nice to meet you.',['cousin','anh/chị/em họ']],
      ['Tuấn đang học ở cùng trường với bạn đấy.','Tuan studies at the same school as you.','Thật à? Bạn học ngành gì vậy?','Really? What do you study?',['same school','cùng trường']],
      ['Mình học thiết kế đồ họa.','I study graphic design.','Hay quá, mình cũng thích vẽ.','That\'s great. I enjoy drawing too.',['graphic design','thiết kế đồ họa']],
    ]],
    ['Talking About Parents','Nói về bố mẹ','Hai bạn học hỏi về gia đình của nhau.','Nói nghề nghiệp và nơi làm việc của bố mẹ.',[
      ['Bố bạn làm nghề gì?','What does your father do?','Bố mình là đầu bếp ở một khách sạn.','My father is a chef at a hotel.',['chef','đầu bếp']],
      ['Mẹ bạn cũng làm ở đó phải không?','Does your mother work there too?','Không, mẹ mình dạy ở trường tiểu học.','No. My mother teaches at a primary school.',['primary school','trường tiểu học']],
      ['Họ có đi làm xa nhà không?','Do they work far from home?','Không, cả hai nơi đều cách nhà khoảng mười phút.','No. Both places are about ten minutes from home.',['far from home','xa nhà']],
    ]],
    ['A Big Family Gathering','Buổi họp mặt đại gia đình','Một người kể về bữa ăn đông thành viên cuối tuần.','Nói số người và vai trò trong gia đình.',[
      ['Cuối tuần nhà bạn có nhiều khách à?','Did your family have many visitors at the weekend?','Có, mười hai người họ hàng đến ăn trưa.','Yes. Twelve relatives came for lunch.',['relative','họ hàng']],
      ['Ai đã nấu ăn cho mọi người?','Who cooked for everyone?','Bà ngoại nấu món chính, còn các cô chú mang đồ uống.','My grandmother cooked the main dish, and my aunts and uncles brought drinks.',['aunt and uncle','cô/dì và chú/cậu']],
      ['Bạn có thường gặp cả gia đình như vậy không?','Do you often see the whole family like that?','Không, chúng tôi chỉ tụ họp lớn vào ngày đặc biệt.','No. We only have a large gathering on special occasions.',['family gathering','buổi họp mặt gia đình']],
    ]],
  ]}),
  t({id:'making-a-grocery-list',title:'Making a Grocery List',titleVi:'Lập danh sách đi chợ',category:'Daily Life',icon:'📝',level:'A1',description:'Kiểm tra đồ còn lại và ghi món cần mua.',grammar:['some-any','much-many','have'],scenarios:[
    ['Checking the Fridge','Kiểm tra tủ lạnh','Hai người kiểm tra thức ăn trước khi đi chợ.','Nói món còn và món đã hết.',[
      ['Trong tủ còn quả trứng nào không?','Are there any eggs left in the fridge?','Còn hai quả, nhưng mình cần mua thêm sáu quả.','There are two left, but we need six more.',['be left','còn lại']],
      ['Sữa thì sao?','What about milk?','Hộp sữa gần hết rồi.','The carton is almost empty.',['carton','hộp giấy']],
      ['Vậy mình ghi cả trứng và sữa nhé.','Then I\'ll add eggs and milk to the list.','Nhớ ghi thêm một ít bơ nữa.','Remember to add some butter too.',['add to the list','thêm vào danh sách']],
    ]],
    ['Planning Three Meals','Lên ba bữa ăn','Hai người mua đồ cho ba bữa tối.','Chọn nguyên liệu dùng được nhiều món.',[
      ['Bữa tối đầu tiên trong kế hoạch là món nào?','What is the first dinner in our plan?','Mình làm cơm gà với rau nhé.','Let\'s make chicken and rice with vegetables.',['vegetables','rau củ']],
      ['Ngày mai có thể dùng phần gà còn lại không?','Can we use the remaining chicken tomorrow?','Có, mình sẽ làm bánh mì kẹp cho bữa trưa.','Yes. I\'ll make sandwiches for lunch.',['remaining','còn lại sau khi dùng']],
      ['Vậy mua một ký thịt gà là đủ.','Then one kilo of chicken should be enough.','Được, mình sẽ ghi đúng số lượng.','Okay. I\'ll write down the exact amount.',['exact amount','số lượng chính xác']],
    ]],
    ['Sharing the Shopping','Chia nhau mua đồ','Hai người chia danh sách để mua nhanh hơn.','Phân công quầy hàng và điểm gặp.',[
      ['Bạn lấy trái cây và rau được không?','Can you get the fruit and vegetables?','Được, còn bạn lấy đồ khô nhé.','Sure. You get the dry goods.',['dry goods','đồ khô']],
      ['Mình gặp nhau ở đâu sau khi mua xong?','Where shall we meet when we are done?','Gặp ở quầy bánh mì sau mười phút.','Meet me at the bakery section in ten minutes.',['bakery section','quầy bánh mì']],
      ['Nếu không thấy một món thì gọi mình nhé.','Call me if you cannot find something.','Ừ, mình sẽ mang theo danh sách trên điện thoại.','Okay. I\'ll keep the list on my phone.',['shopping list','danh sách mua sắm']],
    ]],
  ]}),
  t({id:'visiting-a-clinic',title:'Visiting a Clinic',titleVi:'Đi phòng khám',category:'Health',icon:'🩺',level:'A1',description:'Đăng ký khám, nói triệu chứng cơ bản và nhận hướng dẫn.',grammar:['have','present-simple','should'],scenarios:[
    ['At Reception','Tại quầy tiếp nhận','Bệnh nhân lần đầu đến một phòng khám.','Đăng ký và cung cấp thông tin cơ bản.',[
      ['Chào bạn, tôi có thể giúp gì?','Hello. How can I help you?','Tôi muốn gặp bác sĩ vì bị đau họng.','I\'d like to see a doctor because I have a sore throat.',['sore throat','đau họng']],
      ['Bạn đã từng đến đây chưa?','Have you been here before?','Chưa, đây là lần đầu của tôi.','No. This is my first visit.',['first visit','lần khám đầu']],
      ['Vui lòng điền tên và số điện thoại vào mẫu này.','Please write your name and phone number on this form.','Được, tôi ngồi chờ ở đâu?','All right. Where should I wait?',['fill in a form','điền biểu mẫu']],
    ]],
    ['Describing a Headache','Mô tả đau đầu','Bác sĩ hỏi về cơn đau đầu mới xuất hiện.','Nói vị trí, thời gian và mức đau.',[
      ['Bạn đau ở chỗ nào?','Where does it hurt?','Tôi đau ở phía trước đầu.','It hurts at the front of my head.',['hurt','đau']],
      ['Cơn đau bắt đầu khi nào?','When did the pain start?','Nó bắt đầu sáng nay sau khi tôi thức dậy.','It started this morning after I woke up.',['start this morning','bắt đầu sáng nay']],
      ['Cơn đau nhẹ hay nặng?','Is the pain mild or severe?','Khá nhẹ, nhưng tôi thấy rất mệt.','It is quite mild, but I feel very tired.',['mild','nhẹ, không nghiêm trọng']],
    ]],
    ['Following Simple Advice','Làm theo lời khuyên','Bác sĩ hướng dẫn chăm sóc tại nhà.','Hiểu liều thuốc và dấu hiệu cần quay lại.',[
      ['Bạn nên uống nhiều nước và nghỉ ngơi.','You should drink plenty of water and rest.','Tôi có thể đi làm vào ngày mai không?','Can I go to work tomorrow?',['plenty of water','nhiều nước']],
      ['Nếu hết sốt thì bạn có thể đi.','You can go if your fever is gone.','Tôi uống thuốc này mấy lần một ngày?','How many times a day should I take this medicine?',['fever','sốt']],
      ['Uống một viên sau bữa ăn, ngày hai lần.','Take one tablet after meals, twice a day.','Tôi hiểu rồi, cảm ơn bác sĩ.','I understand. Thank you, doctor.',['tablet','viên thuốc']],
    ]],
    ['Paying for the Visit','Thanh toán buổi khám','Bệnh nhân hỏi chi phí sau khi khám xong.','Xác nhận phí, phương thức trả và biên nhận.',[
      ['Phí khám hôm nay là bao nhiêu?','How much is today\'s consultation fee?','Phí khám là hai trăm nghìn đồng.','The consultation fee is two hundred thousand dong.',['consultation fee','phí khám']],
      ['Tôi có thể thanh toán bằng thẻ không?','Can I pay by card?','Có, bạn chạm thẻ vào máy ở quầy này.','Yes. Tap your card on the reader at this desk.',['pay by card','thanh toán bằng thẻ']],
      ['Cho tôi xin biên nhận để nộp bảo hiểm.','Could I have a receipt for my insurance?','Tất nhiên, tôi sẽ in biên nhận có tên của bạn.','Certainly. I\'ll print a receipt with your name on it.',['medical receipt','biên nhận y tế']],
    ]],
  ]}),
  t({id:'sharing-family-chores',title:'Sharing Family Chores',titleVi:'Chia việc nhà trong gia đình',category:'Family',icon:'🧹',level:'A2',description:'Chia lịch dọn dẹp và xử lý việc chưa hoàn thành.',grammar:['have-to','frequency','suggestions'],scenarios:[
    ['A Weekend Chore Plan','Lịch việc nhà cuối tuần','Các thành viên chia việc cho sáng thứ Bảy.','Phân công dựa trên thời gian của mỗi người.',[
      ['Sáng thứ Bảy ai có thể lau nhà?','Who can mop the floor on Saturday morning?','Con làm được sau khi học thêm về.','I can do it after my extra class.',['mop the floor','lau nhà']],
      ['Vậy bố sẽ đi chợ và mẹ giặt quần áo.','Then Dad will shop for groceries, and Mum will do the laundry.','Còn em có thể đổ rác và dọn bàn.','My younger brother can take out the rubbish and clear the table.',['clear the table','dọn bàn ăn']],
      ['Mình ghi lịch lên tủ lạnh nhé.','Let\'s put the schedule on the fridge.','Như vậy mọi người sẽ nhớ phần của mình.','That way, everyone will remember their part.',['chore schedule','lịch việc nhà']],
    ]],
    ['A Chore Was Missed','Quên làm việc nhà','Một người quên rửa bát theo lịch.','Nhắc việc không đổ lỗi và thống nhất bù lại.',[
      ['Tối qua đến lượt bạn rửa bát phải không?','Wasn\'t it your turn to wash the dishes last night?','Đúng, mình quên vì về nhà quá muộn.','Yes. I forgot because I got home very late.',['your turn','đến lượt của bạn']],
      ['Sáng nay bồn rửa đầy nên mình không nấu được.','The sink was full this morning, so I could not cook.','Mình xin lỗi, mình sẽ rửa hết ngay bây giờ.','I\'m sorry. I\'ll wash everything right now.',['sink','bồn rửa']],
      ['Lần sau hãy nhắn để mình đổi lượt.','Next time, send me a message so we can swap turns.','Được, cuối tuần này mình cũng sẽ làm thêm phần của bạn.','Okay. I\'ll take one of your chores this weekend too.',['swap turns','đổi lượt']],
    ]],
    ['Choosing a Fair Rotation','Lịch luân phiên công bằng','Anh chị em thấy một người luôn làm việc khó hơn.','Thiết kế lịch luân phiên dễ theo dõi.',[
      ['Mình luôn phải cọ phòng tắm, như vậy không công bằng.','I always have to scrub the bathroom, and that is not fair.','Bạn nói đúng, mình nên đổi việc mỗi tuần.','You\'re right. We should rotate the chores every week.',['rotate chores','luân phiên việc nhà']],
      ['Việc nấu ăn cần nhiều thời gian hơn đổ rác.','Cooking takes much longer than taking out the rubbish.','Vậy người nấu ăn không phải rửa bát hôm đó.','Then whoever cooks should not have to wash up that day.',['wash up','rửa bát đĩa']],
      ['Mình thử lịch mới trong một tháng nhé.','Let\'s try the new system for a month.','Sau đó cả nhà sẽ xem cách nào cần điều chỉnh.','After that, the family can review what needs changing.',['fair rotation','lịch luân phiên công bằng']],
    ]],
  ]}),
  t({id:'starting-an-exercise-routine',title:'Starting an Exercise Routine',titleVi:'Bắt đầu thói quen tập luyện',category:'Health',icon:'🏃',level:'A2',description:'Đặt mục tiêu vừa sức và theo dõi tiến bộ.',grammar:['be-going-to','frequency','comparatives'],scenarios:[
    ['Setting a Weekly Goal','Đặt mục tiêu tuần','Hai người muốn tập đều hơn nhưng ít thời gian.','Chọn tần suất có thể duy trì.',[
      ['Bạn muốn tập mấy buổi mỗi tuần?','How many times a week do you want to exercise?','Mình định bắt đầu với ba buổi ngắn.','I\'m going to start with three short sessions.',['session','buổi tập']],
      ['Mỗi buổi khoảng bao lâu?','How long will each session be?','Khoảng ba mươi phút là vừa với lịch của mình.','About thirty minutes fits my schedule.',['fit a schedule','phù hợp lịch trình']],
      ['Mình tập cùng nhau vào thứ Hai nhé.','Let\'s exercise together on Monday.','Được, có bạn tập cùng sẽ dễ giữ thói quen hơn.','Sure. Having a workout partner will help me stay consistent.',['stay consistent','duy trì đều đặn']],
    ]],
    ['Choosing a Beginner Class','Chọn lớp cho người mới','Khách hỏi nhân viên phòng tập về lớp phù hợp.','So sánh cường độ và chuẩn bị cho buổi đầu.',[
      ['Lớp nào phù hợp với người mới bắt đầu?','Which class is suitable for a complete beginner?','Lớp yoga cơ bản chậm hơn lớp circuit.','The basic yoga class is gentler than the circuit class.',['gentle exercise','bài tập nhẹ nhàng']],
      ['Tôi có cần mang dụng cụ riêng không?','Do I need to bring my own equipment?','Không, phòng tập có thảm và khối yoga.','No. The gym provides mats and yoga blocks.',['yoga mat','thảm yoga']],
      ['Tôi nên đến sớm bao nhiêu phút?','How early should I arrive?','Hãy đến trước mười phút để nói với huấn luyện viên.','Arrive ten minutes early so you can speak to the instructor.',['instructor','huấn luyện viên']],
    ]],
    ['Adjusting After Soreness','Điều chỉnh khi đau cơ','Người mới tập bị đau cơ sau buổi đầu.','Phân biệt đau cơ nhẹ và điều chỉnh cường độ.',[
      ['Chân mình đau sau buổi chạy hôm qua.','My legs are sore after yesterday\'s run.','Đau cơ nhẹ là bình thường khi mới tập.','Mild muscle soreness is normal when you are starting out.',['muscle soreness','đau mỏi cơ']],
      ['Hôm nay mình có nên chạy tiếp không?','Should I run again today?','Bạn nên đi bộ nhẹ hoặc nghỉ một ngày.','You should take a gentle walk or have a rest day.',['rest day','ngày nghỉ tập']],
      ['Lần tới mình sẽ chạy chậm hơn và khởi động lâu hơn.','Next time, I\'ll run more slowly and warm up for longer.','Đó là cách tăng cường độ an toàn hơn.','That is a safer way to increase the intensity.',['intensity','cường độ']],
    ]],
  ]}),
  t({id:'going-to-the-dentist',title:'Going to the Dentist',titleVi:'Đi nha sĩ',category:'Health',icon:'🦷',level:'A2',description:'Mô tả đau răng, hiểu thủ thuật và đặt lịch tái khám.',grammar:['present-perfect','should','polite-questions'],scenarios:[
    ['Booking a Dental Visit','Đặt lịch nha khoa','Bệnh nhân gọi vì đau răng kéo dài.','Mô tả mức khẩn và chọn giờ khám.',[
      ['Tôi bị đau một chiếc răng hàm từ hôm qua.','I\'ve had pain in a back tooth since yesterday.','Cơn đau có làm bạn mất ngủ không?','Has the pain kept you awake?',['back tooth','răng hàm']],
      ['Có, tối qua nó đau hơn nhiều.','Yes. It became much worse last night.','Chúng tôi còn một lịch khẩn lúc ba giờ chiều.','We have an emergency appointment at three this afternoon.',['emergency appointment','lịch khám khẩn']],
      ['Tôi sẽ đến, tôi cần mang giấy tờ gì?','I\'ll take it. What documents should I bring?','Hãy mang căn cước và thông tin bảo hiểm nếu có.','Bring your ID and insurance information if you have it.',['insurance information','thông tin bảo hiểm']],
    ]],
    ['Understanding an X-ray','Hiểu ảnh X-quang','Nha sĩ giải thích nguyên nhân đau răng.','Hỏi vị trí sâu răng và lựa chọn điều trị.',[
      ['Ảnh X-quang cho thấy một lỗ sâu dưới miếng trám cũ.','The X-ray shows decay beneath the old filling.','Nó có nghiêm trọng đến mức phải nhổ răng không?','Is it serious enough to require an extraction?',['tooth decay','sâu răng']],
      ['Chưa, tôi nghĩ có thể làm sạch và trám lại.','No. I believe we can clean it and replace the filling.','Thủ thuật đó mất khoảng bao lâu?','Roughly how long will that procedure take?',['filling','miếng trám răng']],
      ['Khoảng bốn mươi phút với thuốc tê tại chỗ.','About forty minutes with local anaesthetic.','Vậy tôi muốn điều trị hôm nay nếu có thể.','Then I\'d like to have it treated today if possible.',['local anaesthetic','thuốc tê tại chỗ']],
    ]],
    ['After Dental Treatment','Sau điều trị răng','Bệnh nhân nhận hướng dẫn sau khi trám.','Biết thời gian ăn uống và dấu hiệu bất thường.',[
      ['Khi nào tôi có thể ăn lại?','When can I eat again?','Hãy chờ đến khi môi hết tê hoàn toàn.','Wait until your lip is no longer numb.',['numb','bị tê']],
      ['Tối nay tôi nên tránh món gì?','What should I avoid eating tonight?','Tránh thức ăn quá cứng hoặc quá nóng ở bên răng đó.','Avoid very hard or hot food on that side.',['avoid hard food','tránh đồ ăn cứng']],
      ['Nếu răng vẫn nhạy cảm thì sao?','What if the tooth remains sensitive?','Hơi ê trong hai ngày là bình thường; đau tăng thì hãy gọi lại.','Mild sensitivity for two days is normal; call us if the pain increases.',['sensitivity','tình trạng ê buốt']],
    ]],
  ]}),
  t({id:'moving-to-a-new-apartment',title:'Moving to a New Apartment',titleVi:'Chuyển sang căn hộ mới',category:'Home',icon:'📦',level:'B1',description:'Lập kế hoạch chuyển nhà, phối hợp vận chuyển và kiểm tra bàn giao.',grammar:['future-forms','conditionals','passive-voice'],scenarios:[
    ['Planning Moving Day','Lên kế hoạch ngày chuyển','Hai người chuẩn bị chuyển nhà cuối tháng.','Xếp thứ tự công việc và nguồn lực.',[
      ['Chúng ta nên đóng gói phòng nào trước?','Which room should we pack first?','Hãy bắt đầu với phòng khách vì đồ ở đó ít dùng hàng ngày.','Let\'s start with the living room because those items are used less often.',['pack first','đóng gói trước']],
      ['Mình cần đặt xe tải trước bao lâu?','How far in advance should we book a van?','Cuối tháng thường bận, nên mình đặt ngay hôm nay.','The end of the month is busy, so we should book it today.',['book a van','đặt xe tải nhỏ']],
      ['Nếu trời mưa, mình sẽ bọc đồ gỗ bằng tấm chống nước.','If it rains, we\'ll cover the furniture with waterproof sheets.','Mình sẽ thêm chúng vào danh sách vật tư.','I\'ll add them to the supply list.',['waterproof sheet','tấm phủ chống nước']],
    ]],
    ['Coordinating the Lift','Đặt thang máy chuyển đồ','Tòa nhà yêu cầu đặt trước thang máy dịch vụ.','Đáp ứng quy định và tránh ảnh hưởng cư dân.',[
      ['Ban quản lý nói chúng ta phải đặt thang máy dịch vụ.','Building management says we must reserve the service lift.','Khung giờ sáng thứ Bảy còn trống không?','Is Saturday morning still available?',['service lift','thang máy chở hàng']],
      ['Chỉ còn từ chín đến mười một giờ.','Only the nine-to-eleven slot is open.','Hai giờ có lẽ không đủ để chuyển hết đồ.','Two hours may not be enough to move everything.',['time slot','khung giờ']],
      ['Mình sẽ chuyển các hộp nhỏ bằng xe cá nhân từ hôm trước.','I\'ll move the small boxes by car the day before.','Như vậy xe tải chỉ cần chở đồ nội thất lớn.','Then the van will only need to carry the large furniture.',['large furniture','đồ nội thất lớn']],
    ]],
    ['Checking the Empty Flat','Kiểm tra nhà sau khi dọn','Người thuê kiểm tra căn hộ cũ trước khi trả khóa.','Ghi nhận hiện trạng và xử lý hư hỏng nhỏ.',[
      ['Mọi tủ đã được lấy hết đồ chưa?','Have all the cupboards been emptied?','Rồi, nhưng mình thấy một vết xước mới trên sàn.','Yes, but I noticed a new scratch on the floor.',['scratch','vết xước']],
      ['Có lẽ nó xuất hiện khi đội chuyển nhà kéo ghế.','It may have happened when the movers dragged the chair.','Mình nên chụp ảnh và báo chủ nhà trước khi bàn giao.','We should photograph it and tell the landlord before the inspection.',['final inspection','buổi kiểm tra bàn giao']],
      ['Mình cũng sẽ đọc và chụp các chỉ số điện nước.','I\'ll also record and photograph the utility readings.','Tốt, như vậy hóa đơn cuối có thể được đối chiếu.','Good. That way, the final bills can be verified.',['utility reading','chỉ số điện nước']],
    ]],
  ]}),
  t({id:'preparing-for-a-job-interview',title:'Preparing for a Job Interview',titleVi:'Chuẩn bị phỏng vấn',category:'Work',icon:'💼',level:'B1',description:'Nghiên cứu vai trò, luyện câu trả lời và chuẩn bị câu hỏi.',grammar:['present-perfect','past-simple','indirect-questions'],scenarios:[
    ['Researching the Role','Tìm hiểu vị trí','Ứng viên xem mô tả công việc trước phỏng vấn.','Nối kinh nghiệm cá nhân với yêu cầu chính.',[
      ['Yêu cầu nào của vị trí này quan trọng nhất?','Which requirement seems most important for this role?','Họ nhắc quản lý dự án ở cả phần mô tả và tiêu chí.','They mention project management in both the description and criteria.',['job criteria','tiêu chí công việc']],
      ['Bạn có ví dụ nào chứng minh kỹ năng đó không?','Do you have an example that demonstrates that skill?','Có, mình đã điều phối một dự án kéo dài sáu tháng.','Yes. I coordinated a project that lasted six months.',['coordinate a project','điều phối dự án']],
      ['Hãy chuẩn bị kết quả cụ thể thay vì chỉ nói nhiệm vụ.','Prepare specific outcomes rather than only listing duties.','Mình sẽ nêu việc nhóm giao sớm hai tuần.','I\'ll explain how the team delivered two weeks early.',['specific outcome','kết quả cụ thể']],
    ]],
    ['Practising a Difficult Question','Luyện câu hỏi khó','Bạn bè diễn tập câu hỏi về một điểm yếu.','Trả lời trung thực và cho thấy cách cải thiện.',[
      ['Điểm yếu lớn nhất trong công việc của bạn là gì?','What is your biggest weakness at work?','Trước đây tôi thường nhận quá nhiều việc cùng lúc.','I used to take on too many tasks at once.',['take on too much','nhận quá nhiều việc']],
      ['Điều đó đã ảnh hưởng công việc thế nào?','How did that affect your work?','Đôi khi tôi cập nhật tiến độ muộn hơn mức đội cần.','Sometimes I provided progress updates later than the team needed.',['progress update','cập nhật tiến độ']],
      ['Bạn đã thay đổi điều gì?','What have you changed since then?','Bây giờ tôi xác nhận ưu tiên hàng tuần và báo rủi ro sớm.','I now confirm priorities weekly and raise risks early.',['raise a risk','nêu/cảnh báo rủi ro']],
    ]],
    ['Questions for the Interviewer','Câu hỏi cho nhà tuyển dụng','Ứng viên chuẩn bị phần hỏi ngược cuối buổi.','Hỏi sâu về kỳ vọng và cách làm việc.',[
      ['Bạn định hỏi gì khi họ mời đặt câu hỏi?','What will you ask when they invite your questions?','Mình muốn biết thành công trong ba tháng đầu được đánh giá thế nào.','I want to know how success is measured in the first three months.',['measure success','đánh giá thành công']],
      ['Câu đó sẽ giúp làm rõ kỳ vọng của họ.','That question should clarify their expectations.','Mình cũng sẽ hỏi đội thường đưa ra quyết định ra sao.','I\'ll also ask how the team usually makes decisions.',['clarify expectations','làm rõ kỳ vọng']],
      ['Đừng hỏi điều đã có rõ trên trang tuyển dụng.','Avoid asking something already answered on the careers page.','Đúng, mình sẽ dùng câu hỏi để hiểu văn hóa làm việc thực tế.','Right. I\'ll use my questions to understand the actual working culture.',['working culture','văn hóa làm việc']],
    ]],
    ['Checking the Interview Setup','Kiểm tra buổi phỏng vấn online','Ứng viên chuẩn bị cho cuộc phỏng vấn video sáng hôm sau.','Kiểm tra thiết bị và phương án dự phòng.',[
      ['Bạn đã thử đường dẫn phỏng vấn chưa?','Have you tested the interview link yet?','Rồi, camera hoạt động nhưng micro đôi khi bị rè.','Yes. The camera works, but the microphone occasionally crackles.',['crackle','phát tiếng rè']],
      ['Bạn nên dùng tai nghe và gọi thử cho mình.','You should use a headset and make a test call with me.','Mình cũng sẽ để điện thoại sẵn nếu mạng bị ngắt.','I\'ll also keep my phone ready in case the connection drops.',['test call','cuộc gọi thử']],
      ['Hãy đăng nhập sớm năm phút nhưng đừng vào quá sớm.','Log in five minutes early, but do not join excessively early.','Được, mình sẽ đóng các ứng dụng không cần thiết trước đó.','Okay. I\'ll close unnecessary applications beforehand.',['beforehand','từ trước']],
    ]],
  ]}),
  t({id:'handling-workplace-conflict',title:'Handling Workplace Conflict',titleVi:'Xử lý xung đột nơi làm việc',category:'Work',icon:'⚖️',level:'B2',description:'Hạ nhiệt xung đột, làm rõ trách nhiệm và thống nhất cách phối hợp.',grammar:['discourse-markers','mixed-conditionals','nuanced-polite-language'],scenarios:[
    ['A Disputed Decision','Tranh cãi về quyết định','Hai trưởng nhóm bất đồng về một thay đổi đã triển khai.','Tách ý định khỏi tác động và xác định dữ kiện.',[
      ['Bạn đã thay đổi quy trình mà không tham khảo đội của tôi.','You changed the process without consulting my team.','Tôi đã hiểu rằng cuộc họp thứ Hai là sự phê duyệt cuối cùng.','I understood Monday\'s meeting to be the final approval.',['final approval','phê duyệt cuối cùng']],
      ['Chúng tôi chỉ đồng ý thử nghiệm, không đồng ý triển khai toàn bộ.','We agreed to a pilot, not a full rollout.','Vậy rõ ràng hai bên đã diễn giải quyết định khác nhau.','Then we clearly interpreted the decision differently.',['full rollout','triển khai toàn bộ']],
      ['Trước khi bàn trách nhiệm, hãy xem lại biên bản cuộc họp.','Before assigning blame, let\'s review the meeting record.','Tôi đồng ý; chúng ta cần xác lập sự kiện trước.','I agree. We need to establish the facts first.',['establish the facts','xác lập dữ kiện']],
    ]],
    ['Mediating Between Colleagues','Hòa giải giữa đồng nghiệp','Quản lý giúp hai người đang đổ lỗi cho nhau.','Chuyển từ cáo buộc sang nhu cầu làm việc.',[
      ['Mỗi người hãy mô tả vấn đề mà không suy đoán động cơ.','Please describe the problem without assuming the other person\'s motives.','Tôi nhận thông tin quá muộn để kiểm tra thay đổi.','I received the information too late to test the change.',['assume motives','suy đoán động cơ']],
      ['Còn điều gì khiến bạn phản ứng gay gắt?','What else contributed to your strong reaction?','Tôi cảm thấy cảnh báo trước đó của mình đã bị bỏ qua.','I felt that my earlier warning had been dismissed.',['dismiss a warning','gạt bỏ cảnh báo']],
      ['Hai bạn cần cam kết trao đổi điều gì trong lần tới?','What communication commitment do you both need next time?','Chúng tôi sẽ xác nhận thay đổi bằng văn bản trước khi triển khai.','We will confirm changes in writing before implementation.',['in writing','bằng văn bản']],
    ]],
    ['Rebuilding a Working Relationship','Xây lại quan hệ làm việc','Hai đồng nghiệp gặp lại sau một xung đột đã được xử lý.','Thiết lập hành vi cụ thể để phục hồi hợp tác.',[
      ['Dù vấn đề đã khép lại, cách phối hợp của chúng ta vẫn gượng gạo.','Although the issue is closed, our working relationship still feels strained.','Tôi đồng ý, và tránh nói chuyện sẽ chỉ làm tình hình kéo dài.','I agree, and avoiding each other will only prolong it.',['strained relationship','quan hệ căng thẳng']],
      ['Tôi đề xuất họp mười lăm phút mỗi tuần trong tháng tới.','I suggest a fifteen-minute weekly check-in for the next month.','Cách đó cho phép xử lý bất đồng trước khi chúng tích tụ.','That would let us address disagreements before they build up.',['build up','tích tụ dần']],
      ['Chúng ta cũng nên phản hồi trực tiếp thay vì qua người thứ ba.','We should also give feedback directly rather than through a third person.','Đồng ý, miễn là cả hai giữ cuộc trao đổi cụ thể và tôn trọng.','Agreed, provided we keep the conversation specific and respectful.',['third person','người thứ ba']],
    ]],
  ]}),
];
