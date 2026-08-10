import type { ConversationTurn, EvaluationStatus, SemanticConstraints } from '../../types/domain';

type GoldenAnswer = readonly [userAnswer:string, expectedStatus:EvaluationStatus, reason:string];
interface GoldenScenario { id:string; prompt:string; canonical:string; accepted?:string[]; keywords?:string[]; constraints?:SemanticConstraints; mistakes?:ConversationTurn['commonMistakes']; answers:GoldenAnswer[] }

const scenarios: GoldenScenario[] = [
  {id:'on-way',prompt:'Mình đang trên đường rồi.',canonical:"I'm on my way.",accepted:['I am on my way.'],keywords:[],constraints:{intent:'traveling now',requiredConcepts:[['on my way','heading there','coming']],polarity:'positive'},answers:[
    ["I'm on my way.",'correct','canonical'],['I am on my way','correct','contraction'],["I'm heading there now.",'acceptable','authored paraphrase'],["I'm on way.",'incorrect','missing required phrase'],["I'm not coming.",'incorrect','opposite meaning'],
  ]},
  {id:'called-driver',prompt:'Bạn đã gọi cho tài xế hôm qua chưa?',canonical:'Did you call the driver yesterday?',accepted:['Did you contact the driver yesterday?'],keywords:['driver','yesterday'],constraints:{intent:'ask about completed call',requiredConcepts:[['call','contact'],['driver']],criticalValues:[['yesterday']],polarity:'question',tenseExpectation:'past-simple-question'},answers:[
    ['Did you call the driver yesterday?','correct','canonical'],['Did you contact the driver yesterday?','correct','accepted synonym'],['Did you phone the driver yesterday?','incorrect','phone not authored concept'],['Do you call the driver yesterday?','incorrect','wrong tense'],['You called the driver yesterday.','incorrect','statement not question'],
  ]},
  {id:'negative-spicy',prompt:'Tôi không thích đồ ăn cay.',canonical:"I don't like spicy food.",accepted:['I do not like spicy food.'],keywords:['spicy','food'],constraints:{intent:'negative preference',requiredConcepts:[['like','enjoy'],['spicy food','spicy dishes']],polarity:'negative'},answers:[
    ["I don't like spicy food.",'correct','canonical'],['I do not like spicy food','correct','contraction'],["I don't enjoy spicy dishes.",'acceptable','semantic alternative'],['I like spicy food.','incorrect','polarity reversed'],["I don't like food.",'incorrect','missing spicy concept'],
  ]},
  {id:'three-years',prompt:'Tôi đã sống ở đây được ba năm.',canonical:"I've lived here for three years.",accepted:['I have lived here for three years.'],keywords:['lived','three','years'],constraints:{intent:'duration until now',requiredConcepts:[['live','lived','living'],['here']],criticalValues:[['three','3'],['years']],tenseExpectation:'present-perfect-duration',polarity:'positive'},answers:[
    ["I've lived here for three years.",'correct','canonical'],['I have lived here for three years','correct','contraction'],['I have been living here for three years.','acceptable','continuous paraphrase'],['I have lived here for five years.','incorrect','wrong critical number'],['I lived here for three years.','incorrect','wrong tense for continuing state'],
  ]},
  {id:'third-conditional',prompt:'Nếu biết trước, tôi đã gọi cho bạn.',canonical:'If I had known, I would have called you.',accepted:["Had I known, I would have called you."],keywords:['known','called'],constraints:{intent:'past counterfactual',requiredConcepts:[['know','known'],['call','called','phone','phoned']],criticalTokens:[['if','had i']],tenseExpectation:'third-conditional'},answers:[
    ['If I had known, I would have called you.','correct','canonical'],['Had I known, I would have called you.','correct','accepted inversion'],['If I had known, I would have phoned you.','acceptable','semantic synonym'],['If I know, I will call you.','incorrect','first conditional changes time'],['If I had known, I called you.','incorrect','missing result form'],
  ]},
  {id:'work-here-question',prompt:'Bạn có làm việc ở đây không?',canonical:'Do you work here?',accepted:['Are you employed here?'],keywords:['work','here'],constraints:{intent:'ask workplace',requiredConcepts:[['work','employed','job'],['here']],polarity:'question',tenseExpectation:'present-simple-question'},answers:[
    ['Do you work here?','correct','canonical'],['Are you employed here?','correct','accepted passive'],['Do you have a job here?','acceptable','equivalent question'],['You work here.','incorrect','statement'],['Did you work here?','incorrect','past changes meaning'],
  ]},
  {id:'since-monday',prompt:'Tôi đã chờ từ thứ Hai.',canonical:"I've been waiting since Monday.",accepted:['I have been waiting since Monday.'],keywords:['waiting','monday'],constraints:{intent:'duration from point',requiredConcepts:[['wait','waiting','waited']],criticalValues:[['monday']],criticalTokens:[['since']],tenseExpectation:'present-perfect-duration'},answers:[
    ["I've been waiting since Monday.",'correct','canonical'],['I have been waiting since Monday','correct','contraction'],['I have waited since Monday.','acceptable','perfect alternative'],['I have been waiting for Monday.','incorrect','since/for error'],['I waited since Monday.','incorrect','wrong tense'],
  ]},
  {id:'rain-cancel',prompt:'Nếu trời mưa, chúng ta sẽ hủy chuyến đi.',canonical:"If it rains, we'll cancel the trip.",accepted:['If it rains, we will cancel the trip.'],keywords:['rains','cancel','trip'],constraints:{intent:'future consequence',requiredConcepts:[['rain','rains'],['cancel','call off'],['trip']],tenseExpectation:'first-conditional'},answers:[
    ["If it rains, we'll cancel the trip.",'correct','canonical'],['If it rains, we will cancel the trip','correct','contraction'],['We will call off the trip if it rains.','acceptable','order and phrasal synonym'],['If it rained, we cancelled the trip.','incorrect','wrong conditional'],['We will take the trip if it rains.','incorrect','missing cancel concept'],
  ]},
  {id:'restaurant-typo',prompt:'Nhà hàng ở bên kia đường.',canonical:'The restaurant is across the street.',keywords:['restaurant','street'],answers:[
    ['The restaurant is across the street.','correct','canonical'],['the restaurant is across the street!!!','correct','punctuation'],['The restarant is across the street.','almost-correct','single typo'],['The cafe is across the street.','incorrect','different place'],['The restaurant across street.','incorrect','missing structure'],
  ]},
  {id:'how-go',prompt:'Bạn thường đi làm bằng cách nào?',canonical:'How do you usually go to work?',keywords:['usually','work'],constraints:{intent:'ask commute',requiredConcepts:[['go','travel','get'],['work']],polarity:'question',tenseExpectation:'present-simple-question'},mistakes:[{pattern:'^how you ',type:'auxiliary',correction:'How do you ...?',explanation:'Câu hỏi Present Simple với “you” cần trợ động từ “do”.'}],answers:[
    ['How do you usually go to work?','correct','canonical'],['How do you normally get to work?','acceptable','semantic paraphrase'],['How do you usually travel to work?','acceptable','semantic paraphrase'],['How you usually go to work?','incorrect','missing auxiliary'],['You usually go to work how?','incorrect','wrong question order'],
  ]},
  {id:'really-like',prompt:'Tôi rất thích nó.',canonical:'I really like it.',accepted:['I like it very much.'],keywords:['like'],mistakes:[{pattern:'\bi very like\b',type:'word-order',correction:'I really like ...',explanation:'Dùng “really” trước động từ, không dùng “very like”.'}],answers:[
    ['I really like it.','correct','canonical'],['I like it very much.','correct','accepted'],['I absolutely love it.','incorrect','not semantically authored'],['I very like it.','incorrect','Vietnamese word order'],['I like very it.','incorrect','wrong word order'],
  ]},
  {id:'age',prompt:'Tôi 25 tuổi.',canonical:'I am twenty-five years old.',accepted:["I'm 25 years old."],keywords:['years','old'],constraints:{intent:'state age',requiredConcepts:[['years old']],criticalValues:[['twenty five','25']],polarity:'positive'},mistakes:[{pattern:'^i have .*years old',type:'grammar',correction:'I am ... years old.',explanation:'Tiếng Anh dùng động từ “be” để nói tuổi.'}],answers:[
    ['I am twenty-five years old.','correct','canonical'],["I'm 25 years old.",'correct','accepted numeric'],['I am twenty five years old.','correct','punctuation normalization'],['I have 25 years old.','incorrect','learner transfer error'],['I am 35 years old.','incorrect','wrong age'],
  ]},
  {id:'agree',prompt:'Tôi đồng ý với bạn.',canonical:'I agree with you.',accepted:["I agree."],keywords:['agree'],mistakes:[{pattern:'^i am agree',type:'grammar',correction:'I agree.',explanation:'“Agree” là động từ nên không dùng “am” ở đây.'}],answers:[
    ['I agree with you.','correct','canonical'],['I agree.','correct','accepted'],['I completely agree with you.','almost-correct','close intensifier'],['I am agree with you.','incorrect','be plus verb error'],['I disagree with you.','incorrect','opposite meaning'],
  ]},
  {id:'enough-money',prompt:'Tôi không có đủ tiền.',canonical:"I don't have enough money.",accepted:['I do not have enough money.'],keywords:['enough','money'],constraints:{intent:'insufficient funds',requiredConcepts:[['have'],['enough'],['money']],polarity:'negative'},mistakes:[{pattern:'money enough',type:'word-order',correction:'enough money',explanation:'“Enough” đứng trước danh từ “money”.'}],answers:[
    ["I don't have enough money.",'correct','canonical'],['I do not have enough money','correct','contraction'],["I haven't got enough money.",'acceptable','have got paraphrase'],["I don't have money enough.",'incorrect','wrong word order'],['I have enough money.','incorrect','opposite polarity'],
  ]},
  {id:'wait-for',prompt:'Tôi sẽ đợi bạn ở ngoài.',canonical:"I'll wait for you outside.",accepted:['I will wait for you outside.'],keywords:['wait','outside'],constraints:{intent:'future waiting',requiredConcepts:[['wait','waiting'],['you'],['outside']],criticalTokens:[['will']]},mistakes:[{pattern:'wait you',type:'preposition',correction:'wait for you',explanation:'Động từ “wait” cần “for” trước người được chờ.'}],answers:[
    ["I'll wait for you outside.",'correct','canonical'],['I will wait for you outside','correct','contraction'],['I will be waiting for you outside.','acceptable','natural semantic alternative'],['I will wait you outside.','incorrect','missing for'],['I waited for you outside.','incorrect','wrong time'],
  ]},
  {id:'air-conditioner',prompt:'Bật điều hòa lên giúp tôi.',canonical:'Please turn on the air conditioner.',accepted:['Could you turn on the air conditioner?'],keywords:['turn','air','conditioner'],constraints:{intent:'activate appliance',requiredConcepts:[['turn on','switch on'],['air conditioner']],forbiddenConcepts:['turn off','switch off']},mistakes:[{pattern:'open the air conditioner',type:'collocation',correction:'turn on the air conditioner',explanation:'Thiết bị được “turn on”, không dùng “open”.'}],answers:[
    ['Please turn on the air conditioner.','correct','canonical'],['Could you turn on the air conditioner?','correct','accepted'],['Would you switch on the air conditioner?','acceptable','semantic synonym'],['Please open the air conditioner.','incorrect','literal collocation'],['Please turn off the air conditioner.','incorrect','opposite action'],
  ]},
  {id:'many-bags',prompt:'Bạn có bao nhiêu chiếc túi?',canonical:'How many bags do you have?',keywords:['many','bags'],constraints:{intent:'ask count',requiredConcepts:[['bags']],criticalTokens:[['many']],polarity:'question'},answers:[
    ['How many bags do you have?','correct','canonical'],['How many bags have you got?','acceptable','have got question'],['How many bags are there with you?','acceptable','equivalent count'],['How much bags do you have?','incorrect','countable quantity'],['You have many bags.','incorrect','statement'],
  ]},
  {id:'before-meeting',prompt:'Hãy gọi tôi trước cuộc họp.',canonical:'Please call me before the meeting.',keywords:['call','meeting'],constraints:{intent:'call earlier',requiredConcepts:[['call','phone'],['meeting']],criticalTokens:[['before']],forbiddenConcepts:['after']},answers:[
    ['Please call me before the meeting.','correct','canonical'],['Call me before the meeting, please.','acceptable','semantic reorder'],['Could you phone me before the meeting?','acceptable','semantic alternative'],['Please call me after the meeting.','incorrect','time relation reversed'],['Please message me before the meeting.','incorrect','different action'],
  ]},
  {id:'price',prompt:'Vé có giá hai trăm nghìn đồng.',canonical:'The ticket costs two hundred thousand dong.',accepted:['The ticket is 200,000 dong.'],keywords:['ticket','dong'],constraints:{intent:'state price',requiredConcepts:[['ticket','it'],['cost','costs','is']],criticalValues:[['two hundred thousand','200000','200 000']]},answers:[
    ['The ticket costs two hundred thousand dong.','correct','canonical'],['The ticket is 200,000 dong.','correct','accepted numeric'],['It costs two hundred thousand dong for the ticket.','acceptable','semantic reorder'],['The ticket costs three hundred thousand dong.','incorrect','wrong price'],['The ticket costs two hundred dong.','incorrect','wrong magnitude'],
  ]},
  {id:'tomorrow-appointment',prompt:'Tôi có lịch hẹn vào sáng mai.',canonical:'I have an appointment tomorrow morning.',accepted:["I've got an appointment tomorrow morning."],keywords:['appointment','tomorrow','morning'],constraints:{intent:'future appointment',requiredConcepts:[['appointment']],criticalValues:[['tomorrow'],['morning']],forbiddenConcepts:['yesterday']},answers:[
    ['I have an appointment tomorrow morning.','correct','canonical'],["I've got an appointment tomorrow morning.",'correct','accepted'],['My appointment is tomorrow morning.','acceptable','semantic alternative'],['I have an appointment tomorrow evening.','incorrect','wrong time'],['I had an appointment yesterday morning.','incorrect','wrong day'],
  ]},
];

export interface EvaluatorGoldenCase {
  id:string;
  prompt:string;
  turn:ConversationTurn;
  userAnswer:string;
  expectedStatus:EvaluationStatus;
  reason:string;
}

export const evaluatorGoldenSet: EvaluatorGoldenCase[] = scenarios.flatMap((scenario) => scenario.answers.map(([userAnswer,expectedStatus,reason],index) => ({
  id:`${scenario.id}-${index+1}`,
  prompt:scenario.prompt,
  userAnswer,
  expectedStatus,
  reason,
  turn:{
    id:`golden-${scenario.id}`,
    speaker:'A',
    vietnamese:scenario.prompt,
    canonicalAnswer:scenario.canonical,
    acceptedAnswers:[scenario.canonical,...(scenario.accepted ?? [])],
    naturalAlternatives:[],
    requiredKeywords:scenario.keywords ?? [],
    grammarPoints:[],
    vocabulary:[],
    commonMistakes:scenario.mistakes ?? [],
    explanation:'Giữ đúng ý nghĩa và cấu trúc trọng tâm của câu tiếng Việt.',
    hint:'Golden benchmark',
    difficulty:'B1',
    semanticConstraints:scenario.constraints,
  },
})));
