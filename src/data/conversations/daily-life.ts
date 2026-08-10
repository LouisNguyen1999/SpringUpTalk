import { buildTopic, type TopicSeed } from '../content-builder';

const seeds: TopicSeed[] = [
  {
    id: 'meeting-a-friend', title: 'Meeting a Friend', titleVi: 'Gặp một người bạn', category: 'Daily Life', icon: '☕', level: 'A1', description: 'Rủ bạn đi uống cà phê cuối tuần.', grammar: ['be', 'present-simple', 'suggestions'],
    conversations: [
      { title: 'Weekend Coffee', titleVi: 'Cà phê cuối tuần', situation: 'Bạn đang nhắn tin với một người bạn sau giờ làm.', goal: 'Hẹn bạn đi uống cà phê cuối tuần.', lines: [
        ['A','Cuối tuần này bạn có rảnh không?','Are you free this weekend?'], ['B','Có. Bạn có muốn đi uống cà phê không?','Yes. Do you want to get some coffee?'], ['A','Được đấy. Bạn muốn đi lúc mấy giờ?','Sure. What time do you want to go?'], ['B','Khoảng ba giờ chiều thì sao?','How about around three in the afternoon?'], ['A','Được. Mình gặp nhau ở đâu?','Sounds good. Where should we meet?'], ['B','Gặp nhau ở quán cà phê gần công viên nhé.','Let\'s meet at the coffee shop near the park.'],
      ]},
      { title: 'Change of Plan', titleVi: 'Đổi kế hoạch', situation: 'Trời sắp mưa và hai bạn cần đổi địa điểm.', goal: 'Đề nghị một kế hoạch khác và xác nhận lại.', lines: [
        ['A','Có vẻ trời sắp mưa.','It looks like it\'s going to rain.'], ['B','Vậy mình gặp ở trung tâm thương mại nhé?','Shall we meet at the mall instead?'], ['A','Ý hay đấy. Ở đó có một quán cà phê mới.','Good idea. There\'s a new coffee shop there.'], ['B','Bạn có biết nó ở tầng mấy không?','Do you know which floor it\'s on?'], ['A','Hình như nó ở tầng hai.','I think it\'s on the second floor.'], ['B','Tuyệt. Hẹn gặp bạn lúc ba giờ.','Great. See you at three.'],
      ]},
    ],
  },
  {
    id:'greeting-a-neighbor',title:'Greeting a Neighbor',titleVi:'Chào hỏi hàng xóm',category:'Daily Life',icon:'🏡',level:'A1',description:'Chào hỏi và làm quen với hàng xóm mới.',grammar:['be','subject-pronouns','possessives','introductions'], conversations:[
      {title:'New Neighbor',titleVi:'Hàng xóm mới',situation:'Bạn gặp hàng xóm mới ở hành lang.',goal:'Chào hỏi và giới thiệu bản thân.',lines:[['A','Chào bạn, bạn mới chuyển đến à?','Hi, did you just move in?'],['B','Vâng, tôi chuyển đến hôm qua.','Yes, I moved in yesterday.'],['A','Tôi là Nam, tôi sống ở phòng bên cạnh.','I\'m Nam. I live next door.'],['B','Rất vui được gặp bạn. Tôi là Mai.','Nice to meet you. I\'m Mai.'],['A','Nếu cần gì, cứ nói với tôi nhé.','Let me know if you need anything.'],['B','Cảm ơn bạn. Bạn thật tốt bụng.','Thank you. That\'s very kind of you.']]},
      {title:'Morning Hello',titleVi:'Chào buổi sáng',situation:'Hai người gặp nhau ở thang máy.',goal:'Trò chuyện ngắn về ngày mới.',lines:[['A','Chào buổi sáng. Hôm nay bạn đi làm sớm nhỉ.','Good morning. You\'re going to work early today.'],['B','Vâng, tôi có một cuộc họp lúc tám giờ.','Yes, I have a meeting at eight.'],['A','Bạn có muốn tôi giữ thang máy không?','Would you like me to hold the elevator?'],['B','Có, làm ơn. Cảm ơn bạn.','Yes, please. Thank you.'],['A','Chúc bạn một ngày tốt lành.','Have a good day.'],['B','Bạn cũng vậy nhé.','You too.']]},
    ]
  },
  {
    id:'morning-routine',title:'Morning Routine',titleVi:'Thói quen buổi sáng',category:'Daily Life',icon:'🌤️',level:'A1',description:'Nói về giờ thức dậy và chuẩn bị buổi sáng.',grammar:['present-simple','adverbs-of-frequency'], conversations:[
      {title:'Waking Up',titleVi:'Thức dậy',situation:'Bạn cùng phòng hỏi về lịch buổi sáng.',goal:'Mô tả thói quen thường ngày.',lines:[['A','Bạn thường thức dậy lúc mấy giờ?','What time do you usually wake up?'],['B','Tôi thường thức dậy lúc sáu giờ rưỡi.','I usually wake up at six thirty.'],['A','Bạn có đặt báo thức không?','Do you set an alarm?'],['B','Có, nhưng đôi khi tôi tắt nó đi.','Yes, but sometimes I turn it off.'],['A','Sau khi thức dậy bạn làm gì?','What do you do after you wake up?'],['B','Tôi uống một cốc nước và tập giãn cơ.','I drink a glass of water and stretch.']]},
      {title:'Running Late',titleVi:'Sắp muộn giờ',situation:'Bạn cùng phòng đang vội đi làm.',goal:'Hỏi và giúp người khác chuẩn bị.',lines:[['A','Bạn vẫn chưa thay đồ à?','Haven\'t you changed yet?'],['B','Chưa, sáng nay tôi ngủ quên.','No, I overslept this morning.'],['A','Bạn còn bao nhiêu thời gian?','How much time do you have?'],['B','Tôi phải rời nhà trong mười phút nữa.','I have to leave in ten minutes.'],['A','Tôi sẽ chuẩn bị cà phê cho bạn.','I\'ll make you some coffee.'],['B','Cảm ơn. Bạn cứu tôi rồi.','Thanks. You\'re a lifesaver.']]},
    ]
  },
  {
    id:'breakfast-at-home',title:'Breakfast at Home',titleVi:'Ăn sáng ở nhà',category:'Daily Life',icon:'🍳',level:'A1',description:'Chuẩn bị và nói về bữa sáng.',grammar:['articles','countable-uncountable','some-any'], conversations:[
      {title:'What Is for Breakfast?',titleVi:'Sáng nay ăn gì?',situation:'Hai anh em chuẩn bị đồ ăn sáng.',goal:'Hỏi và chọn món ăn.',lines:[['A','Sáng nay chúng ta ăn gì?','What are we having for breakfast?'],['B','Có trứng và bánh mì trong bếp.','There are eggs and bread in the kitchen.'],['A','Bạn muốn trứng chiên hay trứng luộc?','Do you want fried eggs or boiled eggs?'],['B','Cho tôi trứng chiên nhé.','I\'d like fried eggs, please.'],['A','Bạn có muốn uống sữa không?','Would you like some milk?'],['B','Không, tôi sẽ uống trà.','No, I\'ll have tea.']]},
      {title:'No Time to Eat',titleVi:'Không kịp ăn',situation:'Bạn sắp trễ học và cần ăn nhanh.',goal:'Đề nghị một bữa sáng mang đi.',lines:[['A','Bạn không ăn sáng à?','Aren\'t you having breakfast?'],['B','Tôi không có đủ thời gian.','I don\'t have enough time.'],['A','Hãy mang theo quả chuối này.','Take this banana with you.'],['B','Ý hay đấy. Tôi cũng cần một chai nước.','Good idea. I also need a bottle of water.'],['A','Nó ở trong tủ lạnh.','It\'s in the fridge.'],['B','Cảm ơn. Tối nay gặp lại nhé.','Thanks. See you tonight.']]},
    ]
  },
  {
    id:'going-to-work',title:'Going to Work',titleVi:'Đi làm',category:'Daily Life',icon:'🛵',level:'A1',description:'Hỏi về phương tiện và thời gian đi làm.',grammar:['present-simple','how-questions','basic-prepositions'], conversations:[
      {title:'The Commute',titleVi:'Đường đi làm',situation:'Đồng nghiệp nói chuyện trước giờ làm.',goal:'Mô tả cách đi làm.',lines:[['A','Bạn thường đi làm bằng gì?','How do you usually get to work?'],['B','Tôi thường đi làm bằng xe máy.','I usually go to work by motorbike.'],['A','Bạn mất bao lâu để đến đây?','How long does it take you to get here?'],['B','Khoảng ba mươi phút nếu đường không đông.','About thirty minutes if traffic is light.'],['A','Hôm nay đường có đông không?','Was traffic bad today?'],['B','Có, tôi bị kẹt xe gần cầu.','Yes, I got stuck in traffic near the bridge.']]},
      {title:'Sharing a Ride',titleVi:'Đi chung xe',situation:'Xe của đồng nghiệp đang sửa.',goal:'Đề nghị cho đi nhờ.',lines:[['A','Xe máy của bạn đâu?','Where\'s your motorbike?'],['B','Nó đang ở tiệm sửa xe.','It\'s at the repair shop.'],['A','Tôi có thể chở bạn về.','I can give you a ride home.'],['B','Thật à? Như vậy có tiện cho bạn không?','Really? Is that convenient for you?'],['A','Có, nhà bạn cùng đường với tôi.','Yes, your place is on my way.'],['B','Cảm ơn bạn rất nhiều.','Thank you so much.']]},
    ]
  },
  {
    id:'lunch-break',title:'Lunch Break',titleVi:'Giờ nghỉ trưa',category:'Daily Life',icon:'🍱',level:'A2',description:'Rủ đồng nghiệp ăn trưa và chọn quán.',grammar:['suggestions','present-perfect'], conversations:[
      {title:'Choosing Lunch',titleVi:'Chọn món trưa',situation:'Nhóm đồng nghiệp đang chọn chỗ ăn.',goal:'Đưa ra và phản hồi đề nghị.',lines:[['A','Bạn đã nghĩ ra món gì để ăn chưa?','Have you decided what to eat yet?'],['B','Chưa. Hay là mình ăn cơm tấm?','Not yet. How about com tam?'],['A','Quán gần đây hôm nay đóng cửa.','The nearby place is closed today.'],['B','Vậy chúng ta gọi đồ ăn nhé.','Then let\'s order delivery.'],['A','Tôi sẽ tìm một quán được đánh giá tốt.','I\'ll look for a place with good reviews.'],['B','Nhớ đặt phần của tôi ít cay nhé.','Remember to ask for mine to be less spicy.']]},
      {title:'Quick Lunch',titleVi:'Bữa trưa nhanh',situation:'Bạn chỉ còn ít thời gian nghỉ.',goal:'Sắp xếp bữa trưa trong thời gian ngắn.',lines:[['A','Chúng ta còn bao nhiêu phút nghỉ?','How many minutes do we have left?'],['B','Chỉ còn khoảng hai mươi phút.','Only about twenty minutes.'],['A','Quán mì bên kia đường phục vụ nhanh.','The noodle shop across the street has quick service.'],['B','Hôm qua tôi vừa ăn mì rồi.','I had noodles yesterday.'],['A','Vậy mua bánh mì mang về nhé.','Then let\'s get banh mi to go.'],['B','Được, tôi sẽ đi cùng bạn.','Okay, I\'ll come with you.']]},
    ]
  },
];

export const dailyLifeTopics = seeds.map(buildTopic);

const demo = dailyLifeTopics.find((topic) => topic.id === 'meeting-a-friend')?.conversations[0];
if (demo) {
  const enrichments: Record<string, { accepted: string[]; alternatives: string[]; explanation: string; vocabulary?: NonNullable<(typeof demo.turns)[number]['vocabulary']> }> = {
    'Are you free this weekend?': { accepted: ['Are you free this weekend?', 'Are you available this weekend?', 'Do you have any free time this weekend?'], alternatives: ['Got any plans this weekend?'], explanation: 'Dùng “be + free” để hỏi ai đó có thời gian rảnh. “This weekend” không cần giới từ.', vocabulary: [{ word:'be free', ipa:'/biː friː/', meaning:'rảnh, có thời gian', example:'Are you free after work?', exampleVi:'Bạn có rảnh sau giờ làm không?' }] },
    'Yes. Do you want to get some coffee?': { accepted: ['Yes. Do you want to get some coffee?', 'Yes, do you want to have coffee?', 'Yes. Would you like to get some coffee?'], alternatives: ['Yeah. Want to grab a coffee?'], explanation: '“Do you want to…?” là cách rủ thân mật. “Get/grab some coffee” tự nhiên hơn bản dịch từng chữ “go drink coffee”.', vocabulary: [{ word:'get some coffee', ipa:'/ɡet sʌm ˈkɒfi/', meaning:'đi uống cà phê', example:'Let\'s get some coffee.', exampleVi:'Mình đi uống cà phê nhé.' }] },
    'Sure. What time do you want to go?': { accepted: ['Sure. What time do you want to go?', 'Sure, what time would you like to go?', 'Okay. What time do you want to go?'], alternatives: ['Sounds good. What time works for you?'], explanation: 'Câu hỏi Present Simple dùng “What time + do + subject + verb?”.', vocabulary: [{ word:'work for someone', meaning:'phù hợp với lịch của ai', example:'Does three o\'clock work for you?', exampleVi:'Ba giờ có phù hợp với bạn không?' }] },
    'How about around three in the afternoon?': { accepted: ['How about around three in the afternoon?', 'How about three in the afternoon?', 'Would around three p.m. work?'], alternatives: ['How does three-ish sound?'], explanation: 'Dùng “How about + time?” để đề xuất thời gian. “Around” cho biết đây là thời gian gần đúng.', vocabulary: [{ word:'around', ipa:'/əˈraʊnd/', meaning:'khoảng (thời gian)', example:'I\'ll arrive around noon.', exampleVi:'Tôi sẽ đến vào khoảng trưa.' }] },
    'Sounds good. Where should we meet?': { accepted: ['Sounds good. Where should we meet?', 'Okay. Where should we meet?', 'Great. Where do you want to meet?'], alternatives: ['Perfect. Where shall we meet?'], explanation: '“Sounds good” dùng để đồng ý với đề xuất; “should we” hỏi ý kiến về địa điểm.', vocabulary: [{ word:'sounds good', ipa:'/saʊndz ɡʊd/', meaning:'nghe ổn đấy', example:'Saturday sounds good.', exampleVi:'Thứ Bảy nghe ổn đấy.' }] },
    "Let's meet at the coffee shop near the park.": { accepted: ["Let's meet at the coffee shop near the park.", 'We can meet at the coffee shop near the park.', 'How about meeting at the coffee shop near the park?'], alternatives: ['See you at the café by the park.'], explanation: '“Let’s + verb” là cấu trúc đề nghị cùng làm gì. Dùng “at” trước một địa điểm gặp cụ thể.', vocabulary: [{ word:'near', ipa:'/nɪr/', meaning:'gần', example:'There\'s a café near my office.', exampleVi:'Có một quán cà phê gần văn phòng tôi.' }] },
  };
  for (const turn of demo.turns) {
    const item = enrichments[turn.canonicalAnswer];
    if (item) {
      turn.acceptedAnswers = item.accepted;
      turn.naturalAlternatives = item.alternatives;
      turn.explanation = item.explanation;
      turn.vocabulary = item.vocabulary;
    }
  }
}
