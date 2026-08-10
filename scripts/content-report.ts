import { topics } from '../src/data/index.ts';
import { createContentReport, printReport, validateTopics } from './validate-content.ts';

const issues = validateTopics(topics);
printReport(createContentReport(topics, issues));
const warnings = issues.filter((issue) => issue.severity === 'warning');
if (warnings.length) {
  console.log('\nWarnings');
  for (const warning of warnings) console.log(`- ${warning.path}: ${warning.message}`);
}
