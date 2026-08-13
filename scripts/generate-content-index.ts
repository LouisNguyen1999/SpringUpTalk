import { writeFileSync } from 'node:fs';
import { topics } from '../src/data/index.ts';
import { createContentReport, validateTopics } from './validate-content.ts';

const report = createContentReport(topics,validateTopics(topics));
const lines = [
  '# Content Index',
  '',
  `Dataset hiện có **${report.topics} topic, ${report.conversations} conversation, ${report.turns.toLocaleString('vi-VN')} lượt** và **${report.vocabularyItems.toLocaleString('vi-VN')} vocabulary/collocation duy nhất**.`,
  '',
  '| Level | Topics | Tỷ lệ |',
  '|---|---:|---:|',
  ...Object.entries(report.levels).map(([level,count]) => `| ${level} | ${count} | ${((count/report.topics)*100).toFixed(1).replace('.',',')}% |`),
  '',
  '| Category | A1 | A2 | B1 | B2 | Total |',
  '|---|---:|---:|---:|---:|---:|',
  ...Object.entries(report.categoryLevelMatrix).map(([category,row]) => `| ${category} | ${row.A1} | ${row.A2} | ${row.B1} | ${row.B2} | ${row.A1+row.A2+row.B1+row.B2} |`),
  '',
  `Conversation/topic: trung bình **${report.conversationsPerTopic.average.toFixed(2)}**, khoảng **${report.conversationsPerTopic.min}–${report.conversationsPerTopic.max}**.`,
  '',
  `Turn/conversation: trung bình **${report.conversationLength.average.toFixed(2)}**, median **${report.conversationLength.median}**, khoảng **${report.conversationLength.min}–${report.conversationLength.max}**.`,
  '',
  `Role A trung bình **${report.roleBalance.averageWords.A.toFixed(2)} từ/lượt**; Role B trung bình **${report.roleBalance.averageWords.B.toFixed(2)} từ/lượt**.`,
  '',
  'File này được tạo tự động bằng `npm run content:index`. Không chỉnh sửa số liệu bằng tay.',
  '',
];

writeFileSync(new URL('../CONTENT_INDEX.md',import.meta.url),lines.join('\n'),'utf8');
console.log(`Generated CONTENT_INDEX.md for ${report.topics} topics.`);
