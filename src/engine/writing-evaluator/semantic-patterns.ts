/**
 * Small, curated semantic vocabulary for Writing Practice.
 *
 * It deliberately maps only high-confidence equivalents. Context-sensitive pairs
 * such as delay/cancel or deploy/release remain separate so critical meaning is
 * not flattened into a generic similarity score.
 */
export const SEMANTIC_PATTERNS: Record<string, readonly string[]> = {
  notify: ['notify', 'inform', 'tell', 'let know', 'give notice', 'report to'],
  delay: ['delay', 'postpone', 'put off', 'push back'],
  cancel: ['cancel', 'call off'],
  fix: ['fix', 'resolve', 'repair', 'correct'],
  investigate: ['investigate', 'look into', 'examine', 'analyze'],
  recover: ['recover', 'be back up', 'work again', 'return to normal', 'restore service'],
  fail: ['fail', 'stop working', 'go down', 'have a problem'],
  request: ['request', 'ask for'],
  suggest: ['suggest', 'recommend', 'propose'],
  disagree: ['disagree', 'not agree', 'object to'],
  decide: ['decide', 'make a decision', 'choose'],
  explain: ['explain', 'clarify', 'make clear'],
  apologize: ['apologize', 'say sorry', 'be sorry'],
  late: ['be late', 'arrive late', 'run late', 'not arrive on time'],
  reschedule: ['reschedule', 'move the appointment', 'change the date', 'change the time'],
  refund: ['refund', 'reimburse', 'give the money back', 'repayment', 'money back'],
  pay: ['pay', 'make a payment'],
  transfer: ['transfer', 'send money', 'move money'],
  'report-issue': ['report an issue', 'raise a problem', 'flag a problem', 'let know about a problem'],
  deploy: ['deploy', 'roll out', 'put into production'],
  release: ['release', 'new version'],
  rollback: ['roll back', 'rollback', 'revert the release', 'restore the previous version'],
  reproduce: ['reproduce', 'replicate', 'make happen again'],
  approve: ['approve', 'accept', 'sign off'],
  reject: ['reject', 'decline', 'turn down'],
  complete: ['complete', 'finish', 'be done'],
  available: ['available', 'free'],
  online: ['online', 'back up', 'operational', 'working'],
  offline: ['offline', 'down', 'unavailable', 'not working'],
  send: ['send', 'deliver', 'dispatch'],
  receive: ['receive', 'get'],
  problem: ['problem', 'issue', 'fault'],
  bug: ['bug', 'defect'],
  outage: ['outage', 'downtime', 'service disruption'],
  manager: ['manager', 'boss', 'supervisor', 'team lead'],
  traffic: ['heavy traffic', 'traffic jam', 'congestion', 'stuck in traffic'],
  workplace: ['work', 'office', 'workplace', 'company'],
  customer: ['customer', 'client'],
};

export const OPPOSITE_PATTERN_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['delay', 'cancel'],
  ['fix', 'fail'],
  ['recover', 'offline'],
  ['approve', 'reject'],
  ['complete', 'not-complete'],
  ['online', 'offline'],
  ['send', 'not-send'],
  ['receive', 'not-receive'],
  ['deploy', 'not-deploy'],
  ['rollback', 'not-rollback'],
  ['reproduce', 'not-reproduce'],
  ['before', 'after'],
];

export const SEMANTIC_PATTERN_IDS = new Set(Object.keys(SEMANTIC_PATTERNS));
