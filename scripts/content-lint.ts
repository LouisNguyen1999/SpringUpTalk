import { topics } from '../src/data/index.ts';
import { normalizeSentence } from '../src/engine/sentence-normalizer/index.ts';
import { analyzeRoleBalance, structuralSignature } from '../src/data/content-analysis.ts';
import type { Difficulty } from '../src/types/domain.ts';
import { validateTopics } from './validate-content.ts';
import { D0_BASELINE_CANONICAL_ONLY, FLEXIBLE_INTENTS_V2 } from '../src/data/accepted-answer-hardening.ts';

const ranges: Record<Difficulty,[number,number]> = { A1:[2,13], A2:[3,18], B1:[4,26], B2:[5,34] };
const extraWarnings: string[] = [];
let cosmeticAccepted = 0;
let localVocabularyDuplicates = 0;
let lengthOutliers = 0;
let speakerImbalances = 0;
let flexibleTurns = 0;
let flexibleCanonicalOnly = 0;
const signatures = new Map<string,number>();
let d0BaselineAudited = 0;
let d0BaselineRemaining = 0;

for (const topic of topics) for (const conversation of topic.conversations) {
  const speakers = conversation.turns.reduce<Record<string,number>>((counts,turn) => ({ ...counts,[turn.speaker]:(counts[turn.speaker] ?? 0)+1 }),{});
  if (Math.abs((speakers.A ?? 0) - (speakers.B ?? 0)) > 1) speakerImbalances += 1;
  for (const turn of conversation.turns) {
    if (conversation.intent && FLEXIBLE_INTENTS_V2.has(conversation.intent)) {
      flexibleTurns += 1;
      if (turn.acceptedAnswers.length === 1) flexibleCanonicalOnly += 1;
    }
    if (turn.acceptedAnswerAudit?.baselineCanonicalOnly) {
      d0BaselineAudited += 1;
      if (!turn.acceptedAnswerAudit.status) d0BaselineRemaining += 1;
    }
    const signature = structuralSignature(turn.canonicalAnswer);
    signatures.set(signature,(signatures.get(signature) ?? 0)+1);
  }
  for (const turn of conversation.turns) {
    const words = normalizeSentence(turn.canonicalAnswer).split(' ').filter(Boolean).length;
    const [min,max] = ranges[topic.level];
    if (words < min || words > max) lengthOutliers += 1;
    const canonical = normalizeSentence(turn.canonicalAnswer);
    cosmeticAccepted += turn.acceptedAnswers.slice(1).filter((answer) => normalizeSentence(answer) === canonical).length;
    const vocabulary = (turn.vocabulary ?? []).map((item) => normalizeSentence(item.word));
    localVocabularyDuplicates += vocabulary.length - new Set(vocabulary).size;
  }
}

const repeatedStructures = [...signatures.values()].filter((count) => count >= Math.max(25,Math.ceil(topics.flatMap((topic) => topic.conversations.flatMap((conversation) => conversation.turns)).length*.015))).length;
const roleBalance = analyzeRoleBalance(topics);
if (lengthOutliers) extraWarnings.push(`${lengthOutliers} sentence-length outliers for their CEFR level`);
if (cosmeticAccepted) extraWarnings.push(`${cosmeticAccepted} accepted variants differ only cosmetically`);
if (localVocabularyDuplicates) extraWarnings.push(`${localVocabularyDuplicates} duplicate vocabulary annotations within a turn`);
if (speakerImbalances) extraWarnings.push(`${speakerImbalances} conversations have speaker imbalance greater than one turn`);
if (roleBalance.warnings.length) extraWarnings.push(`${roleBalance.warnings.length} conversations have weak or imbalanced learner roles`);
if (repeatedStructures) extraWarnings.push(`${repeatedStructures} structural signatures are unusually frequent`);
if (flexibleTurns && flexibleCanonicalOnly / flexibleTurns > .5) extraWarnings.push(`${flexibleCanonicalOnly}/${flexibleTurns} flexible turns still have only the canonical answer`);
if (d0BaselineAudited !== D0_BASELINE_CANONICAL_ONLY) extraWarnings.push(`D0 audited ${d0BaselineAudited}/${D0_BASELINE_CANONICAL_ONLY} baseline canonical-only turns`);
if (d0BaselineRemaining) extraWarnings.push(`${d0BaselineRemaining} D0 baseline turns remain unaudited`);

const issues = validateTopics(topics);
for (const issue of issues) console[issue.severity === 'error' ? 'error' : 'warn'](`[${issue.severity}] ${issue.path}: ${issue.message}`);
for (const warning of extraWarnings) console.warn(`[lint] ${warning}`);
console.log(`Content lint: ${topics.length} topics · ${issues.filter((issue) => issue.severity === 'error').length} errors · ${issues.filter((issue) => issue.severity === 'warning').length + extraWarnings.length} warnings`);
if (issues.some((issue) => issue.severity === 'error')) process.exit(1);
