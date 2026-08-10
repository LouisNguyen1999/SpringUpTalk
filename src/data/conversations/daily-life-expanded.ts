import { buildTopic, type LineMeta, type TopicSeed } from '../content-builder';

const note = (accepted: string[], alternatives: string[], explanation: string, word?: string, meaning?: string, example?: string): LineMeta => ({
  accepted,
  alternatives,
  explanation,
  vocabulary: word && meaning && example ? [{ word, meaning, example }] : undefined,
});

const seeds: TopicSeed[] = [
  {
    id:'coming-home',title:'Coming Home',titleVi:'Về đến nhà',category:'Daily Life',icon:'🚪',level:'A1',description:'Chào nhau, hỏi thăm và sắp xếp việc nhà sau một ngày dài.',grammar:['present-continuous','past-simple','basic-questions'],defaultExplanation:'Dùng thì phù hợp để nói việc đang diễn ra hoặc một sự việc vừa xảy ra trong ngày.',prerequisite:'morning-routine',conversations:[
      {title:'Back from Work',titleVi:'Vừa đi làm về',situation:'Hai người cùng nhà gặp nhau vào buổi tối.',goal:'Hỏi thăm ngày làm việc và đề nghị giúp đỡ.',lines:[
        ['A','Bạn mới về à?','Did you just get home?',note(['Have you just got home?'],['Just got home?'],'“Get home” nghĩa là về đến nhà; không dùng giới từ “to” trước “home”.','get home','về đến nhà','I usually get home before seven.')],
        ['B','Ừ, hôm nay mình về hơi muộn.','Yes, I got home a little late today.'],
        ['A','Ngày làm việc của bạn thế nào?','How was your day at work?',note(['How was work today?'],['How did your day go?'],'Dùng “How was…?” để hỏi trải nghiệm đã kết thúc trong ngày.')],
        ['B','Khá bận, nhưng mọi việc đều ổn.','It was quite busy, but everything went well.'],
        ['A','Bạn nghỉ một lát đi. Mình sẽ lấy nước cho bạn.','Take a break. I\'ll get you some water.',note(['Have a rest. I\'ll get you some water.'],['Put your feet up. I\'ll grab you some water.'],'“Will” phù hợp với quyết định giúp đỡ được đưa ra ngay lúc nói.','take a break','nghỉ một lát','Let\'s take a short break.')],
        ['B','Cảm ơn nhé. Mình đang khát quá.','Thanks. I\'m really thirsty.'],
      ]},
      {title:'Forgotten Keys',titleVi:'Quên chìa khóa',situation:'Một người bị đứng ngoài cửa vì quên chìa khóa.',goal:'Giải thích vấn đề và nhờ mở cửa.',lines:[
        ['A','Bạn đang đứng ngoài cửa làm gì vậy?','Why are you standing outside?'],
        ['B','Mình để quên chìa khóa ở văn phòng rồi.','I left my keys at the office.',note(['I forgot my keys at the office.'],['My keys are still at work.'],'“Leave something at a place” diễn tả để quên đồ ở một địa điểm.','leave something behind','để quên đồ','I left my umbrella behind.')],
        ['A','Bạn có gọi cho bạn cùng phòng chưa?','Have you called your roommate yet?'],
        ['B','Rồi, nhưng bạn ấy vẫn đang trên đường về.','Yes, but she\'s still on her way home.',note(['Yes, but she is still on her way home.'],['Yes, but she hasn\'t made it home yet.'],'“Be on one’s way” nghĩa là đang trên đường đến đâu.','on the way','đang trên đường','I\'m on my way to the station.')],
        ['A','Vào nhà mình đợi nhé.','You can wait at my place.'],
        ['B','Cảm ơn. Chắc bạn ấy sắp về rồi.','Thanks. She should be home soon.'],
      ]},
    ]
  },
  {
    id:'cooking-dinner',title:'Cooking Dinner',titleVi:'Nấu bữa tối',category:'Daily Life',icon:'🍲',level:'A2',description:'Phân công nấu ăn, xử lý nguyên liệu thiếu và điều chỉnh món.',grammar:['imperatives','countable-uncountable','some-any','infinitive-gerund-basics'],defaultExplanation:'Khi nấu ăn, dùng mệnh lệnh lịch sự, lượng từ và động từ chỉ thao tác để hướng dẫn rõ ràng.',prerequisite:'breakfast-at-home',conversations:[
      {title:'Cooking Together',titleVi:'Cùng nhau nấu ăn',situation:'Hai anh em chuẩn bị bữa tối cho gia đình.',goal:'Phân công và hướng dẫn các bước nấu ăn.',lines:[
        ['A','Tối nay mình nấu món gì?','What should we cook for dinner?'],
        ['B','Hay là làm gà xào rau nhé?','How about making stir-fried chicken with vegetables?',note(['Why don\'t we make stir-fried chicken with vegetables?'],['We could do a chicken and vegetable stir-fry.'],'Sau “How about” dùng động từ thêm “-ing”.','stir-fry','xào nhanh trên lửa lớn','Stir-fry the vegetables for three minutes.')],
        ['A','Được đấy. Bạn thái rau giúp mình nhé.','Sounds good. Could you chop the vegetables?',note(['Okay. Can you chop the vegetables?'],['Great. Would you mind chopping the vegetables?'],'“Could you…?” là yêu cầu lịch sự, tự nhiên khi phân công.','chop','thái nhỏ','Chop the onions into small pieces.')],
        ['B','Được. Mình thái miếng nhỏ hay miếng to?','Sure. Should I cut them into small or large pieces?'],
        ['A','Miếng vừa thôi để rau chín đều.','Make them medium-sized so they cook evenly.'],
        ['B','Rõ rồi. Bạn nhớ nêm ít muối nhé.','Got it. Remember to go easy on the salt.',note(['Okay. Remember not to add too much salt.'],['Got it. Don\'t overdo the salt.'],'“Go easy on” là cách tự nhiên để yêu cầu dùng ít một thứ.','go easy on','dùng vừa phải, đừng cho quá nhiều','Go easy on the chili, please.')],
      ]},
      {title:'Missing Ingredient',titleVi:'Thiếu nguyên liệu',situation:'Đang nấu thì hai người phát hiện hết nước mắm.',goal:'Tìm nguyên liệu thay thế và điều chỉnh món.',lines:[
        ['A','Hình như nhà mình hết nước mắm rồi.','It looks like we\'re out of fish sauce.',note(['I think we\'ve run out of fish sauce.'],['Looks like there\'s no fish sauce left.'],'“Be out of” và “run out of” đều diễn tả đã dùng hết.','run out of','dùng hết','We\'ve run out of cooking oil.')],
        ['B','Bạn kiểm tra ngăn trên cùng chưa?','Have you checked the top shelf?'],
        ['A','Rồi, chỉ còn nước tương thôi.','Yes. There\'s only soy sauce left.'],
        ['B','Vậy dùng một ít nước tương thay thế nhé.','Then let\'s use a little soy sauce instead.'],
        ['A','Có cần bớt muối không?','Should we use less salt?',note(['Do we need to use less salt?'],['Should we cut back on the salt?'],'“Less” dùng với danh từ không đếm được như “salt”.')],
        ['B','Có, không thì món sẽ mặn quá.','Yes, otherwise the dish will be too salty.'],
      ]},
    ]
  },
  {
    id:'evening-wind-down',title:'Evening Wind-down',titleVi:'Thư giãn buổi tối',category:'Daily Life',icon:'🌙',level:'B1',description:'Nói về thói quen giảm căng thẳng và cải thiện giấc ngủ.',grammar:['gerunds','present-perfect','modals'],defaultExplanation:'Dùng gerund sau một số động từ và Present Perfect để liên hệ thay đổi gần đây với hiện tại.',prerequisite:'coming-home',conversations:[
      {title:'Too Much Screen Time',titleVi:'Dùng màn hình quá lâu',situation:'Hai người bạn nói về việc khó ngủ gần đây.',goal:'Mô tả nguyên nhân và đưa lời khuyên thực tế.',lines:[
        ['A','Dạo này bạn ngủ có ngon không?','Have you been sleeping well lately?',note(['Have you slept well lately?'],['How has your sleep been lately?'],'Present Perfect Continuous nhấn mạnh tình trạng kéo dài gần đây.','lately','gần đây','I haven\'t exercised much lately.')],
        ['B','Không hẳn. Mình cứ xem điện thoại đến khuya.','Not really. I keep scrolling on my phone until late.'],
        ['A','Ánh sáng màn hình có thể khiến bạn khó ngủ hơn.','Screen light can make it harder for you to fall asleep.',note(['The light from your screen can make it harder to sleep.'],['All that screen time can keep you awake.'],'“Make it harder to + verb” diễn tả một việc gây khó khăn hơn.','fall asleep','bắt đầu ngủ, thiếp đi','It took me an hour to fall asleep.')],
        ['B','Mình biết, nhưng bỏ thói quen đó khó thật.','I know, but it\'s hard to break the habit.'],
        ['A','Bạn thử để điện thoại ngoài phòng ngủ xem.','You could try leaving your phone outside the bedroom.'],
        ['B','Tối nay mình sẽ thử và đọc sách thay vào đó.','I\'ll try that tonight and read a book instead.'],
      ]},
      {title:'A Calmer Routine',titleVi:'Thói quen thư thái hơn',situation:'Một người vừa thay đổi thói quen trước khi ngủ.',goal:'Kể về thay đổi và tác động của nó.',lines:[
        ['A','Bạn có vẻ tỉnh táo hơn tuần trước đấy.','You seem more rested than you did last week.'],
        ['B','Mình bắt đầu thiền mười phút trước khi ngủ.','I\'ve started meditating for ten minutes before bed.',note(['I started meditating for ten minutes before bed.'],['I\'ve taken up a ten-minute bedtime meditation.'],'“Start” có thể đi với gerund; Present Perfect nhấn mạnh thay đổi mới có tác động hiện tại.','meditate','thiền','She meditates before starting work.')],
        ['A','Việc đó có giúp bạn dễ ngủ hơn không?','Has it helped you fall asleep more easily?'],
        ['B','Có, và mình không còn thức giấc giữa đêm nhiều nữa.','Yes, and I don\'t wake up during the night as often.'],
        ['A','Nghe như một thói quen đáng duy trì đấy.','That sounds like a habit worth keeping.',note(['It sounds like a habit you should keep.'],['Sounds like one to stick with.'],'“Worth” đi với động từ thêm “-ing”: worth keeping.','worth doing','đáng làm','This book is worth reading.')],
        ['B','Chắc chắn rồi. Sáng mình cũng tập trung tốt hơn.','Definitely. I can focus better in the morning too.'],
      ]},
    ]
  },
];

export const expandedDailyLifeTopics = seeds.map(buildTopic);
