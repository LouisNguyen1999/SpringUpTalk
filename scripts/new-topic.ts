import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const args = new Map<string,string>();
for (let index=2; index<process.argv.length; index += 1) {
  const key = process.argv[index];
  const value = process.argv[index+1];
  if (key?.startsWith('--') && value && !value.startsWith('--')) { args.set(key.slice(2),value); index += 1; }
}

if (process.argv.includes('--help')) {
  console.log('npm run content:new-topic -- --id topic-id --category "Home" --level A2 --title "English title" --title-vi "Tiêu đề" --grammar present-simple,requests --objectives "objective one;objective two;objective three" --conversations 3');
  process.exit(0);
}

const interactive = process.stdin.isTTY && process.stdout.isTTY;
const reader = interactive ? createInterface({ input,output }) : undefined;
async function value(name:string,question:string,fallback=''):Promise<string> {
  const supplied = args.get(name);
  if (supplied !== undefined) return supplied;
  if (!reader) return fallback;
  const answer = await reader.question(`${question}${fallback ? ` (${fallback})` : ''}: `);
  return answer.trim() || fallback;
}

const id = await value('id','Topic ID');
const category = await value('category','Category','TODO_CATEGORY');
const level = await value('level','Level A1/A2/B1/B2','A1');
const title = await value('title','English title','TODO_TITLE');
const titleVi = await value('title-vi','Vietnamese title','TODO_TITLE_VI');
const grammar = (await value('grammar','Grammar tags, comma separated','TODO_GRAMMAR')).split(',').map((item) => item.trim()).filter(Boolean);
const objectives = (await value('objectives','Learning objectives, separated by semicolons','TODO_OBJECTIVE_1;TODO_OBJECTIVE_2;TODO_OBJECTIVE_3')).split(';').map((item) => item.trim()).filter(Boolean);
const conversationCount = Number(await value('conversations','Number of conversations','3'));
reader?.close();

if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
  console.error('Topic ID phải dùng kebab-case, ví dụ: changing-a-pickup-point');
  process.exit(1);
}
if (!['A1','A2','B1','B2'].includes(level)) {
  console.error('Level phải là A1, A2, B1 hoặc B2.');
  process.exit(1);
}
if (!Number.isInteger(conversationCount) || conversationCount < 3 || conversationCount > 5) {
  console.error('Mỗi topic mới cần 3–5 conversations.');
  process.exit(1);
}

const scenarios = Array.from({length:conversationCount},(_item,index) => {
  const number = index+1;
  const objective = objectives[index] ?? `TODO_OBJECTIVE_${number}`;
  return `    ['TODO_CONVERSATION_${number}','TODO_TITLE_VI_${number}','TODO_SITUATION_${number}','${objective}',[
      ['TODO_VI_A1','TODO_EN_A1','TODO_VI_B1','TODO_EN_B1',['TODO_PHRASE_1','TODO_MEANING_1']],
      ['TODO_VI_A2','TODO_EN_A2','TODO_VI_B2','TODO_EN_B2',['TODO_PHRASE_2','TODO_MEANING_2']],
      ['TODO_VI_A3','TODO_EN_A3','TODO_VI_B3','TODO_EN_B3',['TODO_PHRASE_3','TODO_MEANING_3']],
    ]],`;
}).join('\n');

console.log(`t({
  id:'${id}',
  title:'${title}',
  titleVi:'${titleVi}',
  category:'${category}',
  icon:'💬',
  level:'${level}',
  description:'TODO_DESCRIPTION',
  grammar:${JSON.stringify(grammar)},
  scenarios:[
${scenarios}
  ],
}),`);
