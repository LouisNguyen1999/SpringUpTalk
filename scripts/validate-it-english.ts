import { validateITEnglishCurriculum } from '../src/data/it-english/curriculum';

const errors = validateITEnglishCurriculum();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('IT English curriculum valid: 30 unique topics with complete ordered dialogues.');
}
