const idIndex = process.argv.indexOf('--id');
const id = idIndex >= 0 ? process.argv[idIndex + 1] : undefined;
if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
  console.error('Usage: npm run content:new -- --id topic-id');
  process.exit(1);
}

console.log(`{
  id:'${id}', title:'', titleVi:'', description:'', category:'', icon:'💬', level:'A1',
  grammar:[], vocabularyTags:[],
  conversations:[
    { title:'', titleVi:'', situation:'', goal:'', lines:[
      ['A','',''], ['B','',''], ['A','',''], ['B','',''], ['A','',''], ['B','',''],
    ]},
    { title:'', titleVi:'', situation:'', goal:'', lines:[
      ['A','',''], ['B','',''], ['A','',''], ['B','',''], ['A','',''], ['B','',''],
    ]},
    { title:'', titleVi:'', situation:'', goal:'', lines:[
      ['A','',''], ['B','',''], ['A','',''], ['B','',''], ['A','',''], ['B','',''],
    ]},
  ],
}`);
