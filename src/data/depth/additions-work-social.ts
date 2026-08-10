import { depthConversation as c } from './depth-builder';
import type { ConversationAdditions } from '../content-expander';

export const workSocialDepth: ConversationAdditions = {
  'morning-standup': [
    c('A Blocked Task','Công việc bị tắc','Một thành viên chưa thể hoàn thành vì thiếu quyền truy cập.','Báo trở ngại ngắn gọn và thống nhất người hỗ trợ.',[
      ['Hôm qua bạn hoàn thành phần đồng bộ dữ liệu chưa?','Did you finish the data sync yesterday?','Chưa, mình bị chặn vì tài khoản thử nghiệm không có quyền.','Not yet. I\'m blocked because the test account lacks permission.',['be blocked','bị chặn, chưa thể tiếp tục']],
      ['Bạn đã gửi yêu cầu cấp quyền chưa?','Have you submitted an access request?','Rồi, nhưng yêu cầu vẫn đang chờ quản trị viên duyệt.','Yes, but it is still waiting for an administrator\'s approval.',['access request','yêu cầu cấp quyền']],
      ['Trong lúc chờ bạn có làm phần khác được không?','Can you work on anything else while you wait?','Mình sẽ viết kiểm thử và chuẩn bị dữ liệu mẫu.','I\'ll write the tests and prepare the sample data.',['sample data','dữ liệu mẫu']],
      ['Mình sẽ nhắc đội hạ tầng sau cuộc họp.','I\'ll follow up with the infrastructure team after this meeting.','Cảm ơn, có quyền truy cập thì mình cần thêm khoảng hai giờ.','Thanks. Once I have access, I\'ll need about two more hours.',['follow up with','liên hệ lại để thúc đẩy']],
    ]),
  ],
  'reporting-a-bug': [
    c('An Intermittent Payment Error','Lỗi thanh toán không liên tục','Lỗi chỉ xuất hiện ở một số lần thanh toán trên điện thoại.','Cung cấp điều kiện tái hiện và bằng chứng kỹ thuật.',[
      ['Lỗi thanh toán có xảy ra ở mọi đơn không?','Does the payment error occur on every order?','Không, nó chỉ xuất hiện thỉnh thoảng trên trình duyệt di động.','No. It only occurs intermittently in mobile browsers.',['intermittently','không liên tục, lúc có lúc không']],
      ['Bạn đã tìm thấy điều kiện chung nào chưa?','Have you found any common conditions yet?','Các lần lỗi đều dùng mã giảm giá và thẻ quốc tế.','Every failed attempt involved a discount code and an international card.',['failed attempt','lần thử thất bại']],
      ['Nhật ký có ghi phản hồi từ cổng thanh toán không?','Do the logs show the payment gateway response?','Có, máy chủ nhận mã hết thời gian chờ sau ba mươi giây.','Yes. The server receives a timeout after thirty seconds.',['timeout','lỗi hết thời gian chờ']],
      ['Hãy đính kèm video và mã đơn mẫu vào phiếu lỗi.','Please attach the recording and a sample order ID to the bug ticket.','Mình sẽ thêm cả phiên bản trình duyệt và mức độ ảnh hưởng.','I\'ll include the browser version and impact level as well.',['impact level','mức độ ảnh hưởng']],
      ['Tạm thời mình có thể tắt kết hợp mã giảm giá với loại thẻ đó.','We could temporarily disable that card-and-voucher combination.','Mình đồng ý nếu đội kinh doanh chấp nhận phương án giảm thiểu này.','I agree, provided the business team approves the mitigation.',['mitigation','biện pháp giảm thiểu']],
    ]),
    c('Clarifying Expected Behavior','Làm rõ hành vi mong đợi','Đội phát triển chưa rõ một kết quả là lỗi hay yêu cầu chưa được ghi.','Phân biệt hiện trạng với kỳ vọng và chốt tiêu chí.',[
      ['Phiếu nói nút bị ẩn, nhưng thiết kế cũ cũng như vậy.','The ticket says the button is hidden, but the old design works the same way.','Yêu cầu mới là nút phải hiện khi người dùng có quyền biên tập.','The new requirement is to show it when the user has edit permission.',['requirement','yêu cầu chức năng']],
      ['Điều đó có được ghi trong tiêu chí nghiệm thu không?','Is that documented in the acceptance criteria?','Chưa, nên mình sẽ bổ sung để tránh hiểu khác nhau.','Not yet, so I\'ll add it to prevent different interpretations.',['acceptance criteria','tiêu chí nghiệm thu']],
      ['Vậy hành vi hiện tại đúng với bản cũ nhưng sai với thay đổi mới.','So the current behavior matches the old version but not the new change.','Đúng, hãy liên kết phiếu lỗi với yêu cầu tính năng.','Exactly. Please link the bug to the feature request.',['current behavior','hành vi hiện tại']],
      ['Mình sẽ thêm ảnh cho cả hai trạng thái quyền.','I\'ll add screenshots for both permission states.','Tốt, như vậy kiểm thử có thể xác nhận rõ ràng.','Good. That will give QA an unambiguous check.',['unambiguous','rõ nghĩa, không mơ hồ']],
    ]),
  ],
  'asking-for-help-at-work': [
    c('Requesting a Code Review','Nhờ review code','Một lập trình viên cần review trước khi hết ngày nhưng đồng nghiệp đang bận.','Nêu phạm vi, mức ưu tiên và giảm công sức cho người hỗ trợ.',[
      ['Bạn có thể review thay đổi đăng nhập hôm nay không?','Could you review the login changes today?','Mình có thể xem, nhưng chỉ còn khoảng ba mươi phút trống.','I can, but I only have about thirty minutes free.',['have time free','có thời gian trống']],
      ['Phần quan trọng chỉ có ba tệp và mình đã ghi chú các quyết định.','The critical part is only three files, and I\'ve documented the decisions.','Vậy gửi mình đường dẫn trực tiếp đến phần đó nhé.','Then send me a direct link to that section.',['critical part','phần quan trọng nhất']],
      ['Bạn ưu tiên kiểm tra bảo mật và trường hợp lỗi giúp mình.','Please focus on security and error cases.','Được, các góp ý về cách đặt tên có thể để ngày mai.','Sure. Naming suggestions can wait until tomorrow.',['focus on','tập trung vào']],
      ['Mình sẽ phản hồi ngay để không làm bạn chờ.','I\'ll respond promptly so I don\'t hold you up.','Tốt, mình sẽ bắt đầu sau cuộc gọi hiện tại.','Great. I\'ll start after my current call.',['hold someone up','làm ai đó bị chậm']],
    ]),
  ],
  'deadline-discussion': [
    c('Reducing the Scope','Giảm phạm vi','Nhóm khó hoàn thành toàn bộ tính năng đúng hạn.','Tách phần bắt buộc và phần có thể dời.',[
      ['Với phạm vi hiện tại, thứ Sáu là không thực tế.','Friday isn\'t realistic with the current scope.','Phần nào đang chiếm nhiều thời gian nhất?','Which part is taking the most time?',['current scope','phạm vi hiện tại']],
      ['Bộ lọc nâng cao cần thêm ít nhất ba ngày kiểm thử.','The advanced filters need at least three more days of testing.','Chúng có bắt buộc cho lần phát hành đầu không?','Are they essential for the initial release?',['initial release','lần phát hành đầu']],
      ['Không, tìm kiếm cơ bản đã đáp ứng luồng chính.','No. Basic search already covers the main user journey.','Vậy hãy chuyển bộ lọc sang đợt sau và giữ ngày thứ Sáu.','Then let\'s move the filters to the next release and keep Friday.',['main user journey','luồng người dùng chính']],
      ['Mình sẽ cập nhật phạm vi và nêu rõ phần bị hoãn.','I\'ll update the scope and clearly list what has been deferred.','Hãy để nhóm kiểm thử xác nhận kế hoạch mới trước trưa.','Have QA confirm the revised plan before noon.',['defer','hoãn sang sau']],
    ]),
  ],
  'asking-for-leave': [
    c('Emergency Family Leave','Xin nghỉ vì việc gia đình khẩn cấp','Nhân viên cần nghỉ ngay trong ngày vì người thân nhập viện.','Thông báo riêng tư vừa đủ và đảm bảo bàn giao khẩn.',[
      ['Mình cần xin nghỉ phần còn lại của hôm nay vì việc gia đình khẩn cấp.','I need to take the rest of today off for a family emergency.','Tất nhiên. Bạn có cần nghỉ cả ngày mai không?','Of course. Do you expect to be away tomorrow as well?',['family emergency','việc gia đình khẩn cấp']],
      ['Mình chưa chắc, mình sẽ cập nhật trước chín giờ sáng.','I\'m not sure yet. I\'ll update you before nine tomorrow morning.','Được, đừng lo giải thích chi tiết lúc này.','That\'s fine. Don\'t worry about giving details right now.',['give details','nói chi tiết']],
      ['Cuộc họp khách hàng chiều nay cần người thay mình.','Someone will need to cover my client meeting this afternoon.','Mình sẽ nhờ Huy tham gia và dùng ghi chú bạn đã chuẩn bị.','I\'ll ask Huy to join and use the notes you prepared.',['cover a meeting','tham dự thay một cuộc họp']],
      ['Mình sẽ bật tin nhắn vắng mặt rồi rời đi.','I\'ll set an out-of-office message before I leave.','Cứ đi đi, mình sẽ xử lý các việc còn lại với nhóm.','Go ahead. I\'ll handle the remaining arrangements with the team.',['out-of-office message','thông báo vắng mặt']],
    ]),
  ],
  'being-late-for-work': [
    c('A Repeated Delay','Đi trễ nhiều lần','Quản lý trao đổi về việc nhân viên đi trễ lặp lại.','Nhận trách nhiệm và cam kết giải pháp có thể đo lường.',[
      ['Đây là lần thứ ba bạn đến muộn trong tháng này.','This is the third time you\'ve arrived late this month.','Bạn nói đúng; mình chịu hoàn toàn trách nhiệm.','You\'re right; I take full responsibility.',['take full responsibility','chịu hoàn toàn trách nhiệm']],
      ['Điều này khiến ca sáng thiếu người ở quầy hỗ trợ.','It leaves the morning support desk understaffed.','Mình đã đánh giá thấp thời gian di chuyển sau khi đổi nhà.','I underestimated my commute after moving house.',['underestimate','đánh giá thấp']],
      ['Bạn định ngăn tình trạng này lặp lại thế nào?','How will you prevent it from happening again?','Từ ngày mai mình sẽ đi sớm hơn ba mươi phút và dùng tuyến dự phòng.','Starting tomorrow, I\'ll leave thirty minutes earlier and use a backup route.',['prevent a recurrence','ngăn việc tái diễn']],
      ['Chúng ta sẽ xem lại tình hình sau hai tuần.','We\'ll review the situation in two weeks.','Đồng ý, mình cũng sẽ báo trước ngay nếu có sự cố bất thường.','Agreed. I\'ll also give early notice if an unusual delay occurs.',['give early notice','báo sớm']],
      ['Nếu tiếp tục tái diễn, chúng ta sẽ cần kế hoạch chính thức.','If it continues, we\'ll need a formal improvement plan.','Mình hiểu mức độ nghiêm trọng và sẽ thực hiện đúng cam kết.','I understand the seriousness and will follow through on my commitment.',['follow through','thực hiện đến cùng']],
    ]),
  ],
  'talking-with-a-manager': [
    c('Conflicting Priorities','Các ưu tiên xung đột','Nhân viên nhận hai yêu cầu gấp từ hai bên liên quan.','Làm rõ quyền ưu tiên bằng tác động và rủi ro.',[
      ['Mình đang nhận hai yêu cầu đều được đánh dấu khẩn.','I\'ve received two requests that are both marked urgent.','Bạn có thể tóm tắt tác động của từng việc không?','Can you summarize the impact of each one?',['marked urgent','được đánh dấu khẩn']],
      ['Báo cáo tài chính cần trước trưa; lỗi kia ảnh hưởng khoảng năm khách hàng.','The finance report is due by noon; the other issue affects about five customers.','Nếu dừng báo cáo để sửa lỗi thì sẽ chậm bao lâu?','How much would the report slip if you stopped to fix the issue?',['slip','bị chậm so với kế hoạch']],
      ['Khoảng hai giờ, và đội tài chính không còn thời gian kiểm tra.','By about two hours, leaving finance no time to verify it.','Vậy hoàn thành báo cáo trước, rồi xử lý lỗi ngay sau đó.','Then finish the report first and address the issue immediately afterward.',['verify','kiểm tra xác nhận']],
      ['Mình sẽ báo thời gian dự kiến cho đội hỗ trợ khách hàng.','I\'ll give customer support an estimated resolution time.','Tốt, nếu phạm vi lỗi tăng thì báo mình để đổi ưu tiên.','Good. Escalate it to me if the impact grows so we can reprioritize.',['reprioritize','sắp xếp lại ưu tiên']],
      ['Mình sẽ ghi quyết định này vào cả hai phiếu.','I\'ll document the decision in both tickets.','Như vậy mọi bên sẽ hiểu lý do và thứ tự công việc.','That way, every stakeholder will understand the rationale and sequence.',['rationale','lý do hợp lý đằng sau quyết định']],
    ]),
    c('Discussing Career Growth','Trao đổi phát triển nghề nghiệp','Nhân viên muốn tiến lên vai trò cao hơn và cần phản hồi cụ thể.','Xin tiêu chí rõ ràng và lập kế hoạch phát triển.',[
      ['Mình muốn hiểu cần cải thiện gì để lên vai trò senior.','I\'d like to understand what I need to improve to move into a senior role.','Về kỹ thuật bạn đang tiến bộ tốt, nhưng cần thể hiện ảnh hưởng rộng hơn.','Technically, you\'re progressing well, but you need to demonstrate broader impact.',['broader impact','tầm ảnh hưởng rộng hơn']],
      ['Bạn có thể cho một ví dụ cụ thể không?','Could you give me a concrete example?','Hãy chủ động dẫn dắt một dự án có nhiều nhóm tham gia.','Take ownership of a project involving several teams.',['take ownership','chủ động chịu trách nhiệm']],
      ['Mình cũng muốn cố vấn cho thành viên mới.','I\'d also like to mentor newer team members.','Điều đó sẽ giúp, miễn là bạn đặt mục tiêu và theo dõi tiến bộ.','That would help, provided you set goals and track their progress.',['mentor','cố vấn, hướng dẫn']],
      ['Mình đề xuất xem lại kết quả sau ba tháng.','I suggest reviewing the outcomes in three months.','Được, chúng ta sẽ ghi các tiêu chí đo lường ngay hôm nay.','Agreed. We\'ll document measurable criteria today.',['measurable criteria','tiêu chí đo lường được']],
    ]),
  ],
  'birthday-party': [
    c('Keeping the Party a Surprise','Giữ bí mật tiệc bất ngờ','Nhóm bạn tổ chức tiệc nhưng người được mừng bắt đầu nghi ngờ.','Phân công kín đáo và giữ câu chuyện nhất quán.',[
      ['Lan vừa hỏi tại sao mọi người đều bận tối thứ Bảy.','Lan just asked why everyone is busy on Saturday evening.','Đừng tạo thêm lý do khác nhau; cứ nói nhóm có kế hoạch riêng.','Don\'t invent different excuses. Just say the group has separate plans.',['invent an excuse','bịa lý do']],
      ['Ai sẽ đưa bạn ấy đến nhà hàng?','Who will get her to the restaurant?','Mình sẽ rủ cô ấy đi uống cà phê rồi giả vờ ghé qua.','I\'ll invite her for coffee and pretend we are stopping by.',['pretend','giả vờ']],
      ['Mọi người phải đến trước bảy giờ.','Everyone needs to arrive before seven.','Mình sẽ nhắn riêng địa chỉ để cô ấy không thấy nhóm chat.','I\'ll send the address privately so she doesn\'t see the group chat.',['privately','một cách riêng tư']],
      ['Nhớ để xe ở đường bên cạnh nhé.','Remember to park on the next street.','Đúng, nếu thấy xe quen thì cô ấy sẽ đoán ra ngay.','Right. If she sees familiar vehicles, she\'ll figure it out immediately.',['figure it out','đoán/hiểu ra']],
    ]),
  ],
  'cancelling-plans': [
    c('Cancelling at the Last Minute','Hủy hẹn sát giờ','Một người phải hủy vé xem phim chỉ một giờ trước buổi chiếu.','Xin lỗi cụ thể và giảm thiệt hại cho người kia.',[
      ['Mình rất xin lỗi, nhưng mình phải hủy tối nay.','I\'m really sorry, but I have to cancel tonight.','Có chuyện gì vậy? Phim bắt đầu sau một tiếng nữa.','What happened? The film starts in an hour.',['at the last minute','vào phút chót']],
      ['Mẹ mình bị sốt và mình cần đưa bà đi khám.','My mother has a fever, and I need to take her to a clinic.','Mình hiểu. Vé có đổi sang ngày khác được không?','I understand. Can the tickets be moved to another date?',['move a booking','đổi lịch đặt chỗ']],
      ['Mình đã kiểm tra; có thể đổi một lần trước giờ chiếu.','I checked. They can be changed once before the screening.','Vậy bạn xử lý gia đình đi, mình sẽ gọi rạp.','Then take care of your family. I\'ll call the cinema.',['screening','suất chiếu']],
      ['Mình sẽ trả bất kỳ khoản phí đổi vé nào.','I\'ll cover any fee for changing the tickets.','Đừng lo lúc này. Khi mọi việc ổn mình chọn ngày mới.','Don\'t worry about that now. We\'ll choose a new date when things settle down.',['cover a fee','chịu/trả một khoản phí']],
    ]),
  ],
  'apologizing-to-a-friend': [
    c('Breaking a Confidence','Làm lộ chuyện riêng','Một người đã kể lại thông tin bạn mình nhờ giữ kín.','Nhận lỗi không biện minh và hỏi cách xây lại niềm tin.',[
      ['Mình biết chính bạn đã kể chuyện đó cho Nam.','I know you were the one who told Nam about it.','Đúng, và mình không có lý do chính đáng nào để làm vậy.','Yes, and I don\'t have a valid excuse for doing it.',['valid excuse','lý do có thể chấp nhận']],
      ['Mình đã nói rõ đó là chuyện riêng.','I made it clear that it was private.','Bạn nói đúng. Mình đã phản bội lòng tin của bạn.','You\'re right. I betrayed your trust.',['betray someone\'s trust','phản bội lòng tin']],
      ['Lời xin lỗi không thể làm Nam quên đi.','An apology can\'t make Nam forget it.','Mình hiểu. Mình sẽ nói với cậu ấy rằng không nên nhắc lại.','I understand. I\'ll tell him it wasn\'t mine to share and ask him not to repeat it.',['not mine to share','không phải chuyện mình có quyền kể']],
      ['Mình cần thời gian trước khi tin bạn lại.','I need time before I can trust you again.','Mình tôn trọng điều đó và sẽ không ép bạn tha thứ.','I respect that, and I won\'t pressure you to forgive me.',['pressure someone','gây áp lực cho ai']],
      ['Hãy để hành động của bạn chứng minh lời nói.','Let your actions prove what you\'re saying.','Mình sẽ làm vậy, dù phải mất nhiều thời gian.','I will, even if rebuilding your trust takes a long time.',['rebuild trust','xây dựng lại niềm tin']],
    ]),
    c('A Hurtful Joke','Một câu đùa gây tổn thương','Một câu đùa trước nhóm bạn khiến người nghe xấu hổ.','Thừa nhận tác động và sửa hành vi trong nhóm.',[
      ['Câu đùa của bạn tối qua khiến mình rất xấu hổ.','Your joke last night made me feel humiliated.','Mình xin lỗi. Mình đã cố gây cười mà không nghĩ đến tác động.','I\'m sorry. I was trying to be funny without considering the impact.',['humiliated','cảm thấy bị làm nhục']],
      ['Mọi người cười nên mình không biết phải phản ứng thế nào.','Everyone laughed, so I didn\'t know how to respond.','Mình hiểu việc đó đã đặt bạn vào tình thế khó xử.','I understand that it put you in an uncomfortable position.',['put someone in a position','đặt ai vào một tình thế']],
      ['Mình không muốn chuyện cá nhân bị dùng làm trò đùa.','I don\'t want personal matters used as jokes.','Ranh giới đó hoàn toàn hợp lý và mình sẽ tôn trọng.','That boundary is completely reasonable, and I\'ll respect it.',['boundary','ranh giới cá nhân']],
      ['Bạn nên nói lại với nhóm rằng điều bạn kể không đúng.','You should tell the group that what you implied wasn\'t true.','Mình sẽ đính chính hôm nay mà không kéo bạn vào thêm.','I\'ll correct it today without drawing more attention to you.',['correct the record','đính chính thông tin']],
    ]),
  ],
  'hosting-a-game-night': [
    c('Explaining a New Game','Giải thích trò chơi mới','Một vài khách chưa từng chơi và luật có nhiều bước.','Dạy bằng ví dụ và giữ nhịp vui vẻ.',[
      ['Có ai đã chơi trò này trước đây chưa?','Has anyone played this game before?','Mình chưa chơi, nên hãy giải thích từ đầu nhé.','I haven\'t, so please explain it from the beginning.',['from the beginning','từ đầu']],
      ['Mục tiêu là thu thập ba bộ thẻ trước người khác.','The goal is to collect three sets of cards before anyone else.','Mỗi lượt mình được rút bao nhiêu thẻ?','How many cards can I draw on each turn?',['on each turn','trong mỗi lượt']],
      ['Bạn rút một thẻ rồi có thể đổi với một người.','You draw one card and may trade with one person.','Bạn làm thử một lượt mẫu được không?','Could you demonstrate a sample turn?',['demonstrate','làm mẫu, minh họa']],
      ['Được, vòng đầu mình sẽ nhắc nếu ai bỏ sót bước.','Sure. During the first round, I\'ll remind anyone who misses a step.','Tốt, chơi một vòng chắc sẽ dễ hiểu hơn.','Great. It will probably make more sense after one round.',['make sense','trở nên dễ hiểu']],
    ]),
  ],
  'resolving-a-disagreement': [
    c('Agreeing on a Shared Trip','Thống nhất chuyến đi chung','Hai người bạn bất đồng về ngân sách và lịch trình du lịch.','Tách nhu cầu cốt lõi và tìm thỏa hiệp cụ thể.',[
      ['Mình cảm thấy kế hoạch hiện tại vượt quá ngân sách đã nói.','I feel the current plan goes beyond the budget we discussed.','Mình chọn khách sạn đó vì nó an toàn và gần trung tâm.','I chose that hotel because it is safe and centrally located.',['go beyond a budget','vượt ngân sách']],
      ['Mình hiểu lý do, nhưng ở bốn đêm sẽ rất tốn.','I understand the reasoning, but four nights there would be expensive.','Bạn muốn giảm chi phí phần nào trước?','Which part would you prefer to cut first?',['cut costs','cắt giảm chi phí']],
      ['Mình có thể ở đó hai đêm rồi chuyển sang chỗ rẻ hơn.','We could stay there for two nights and move somewhere cheaper afterward.','Như vậy vẫn tiện cho hai ngày tham quan chính.','That would still be convenient for the two main sightseeing days.',['sightseeing','việc tham quan']],
      ['Đổi lại, mình đồng ý bỏ tour riêng và đi theo nhóm.','In return, I\'m willing to skip the private tour and join a group one.','Đó là một thỏa hiệp công bằng với cả hai.','That sounds like a fair compromise for both of us.',['compromise','sự thỏa hiệp']],
    ]),
  ],
};
