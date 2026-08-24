import type { Difficulty, WritingLearningUnit, WritingSkill } from '../../types/domain';

type UnitInput = Omit<WritingLearningUnit, 'id' | 'order' | 'prerequisiteUnitId'>;

const unit = (
  order: number,
  input: UnitInput,
): WritingLearningUnit => ({
  ...input,
  id: `writing-unit-${String(order).padStart(2, '0')}`,
  order,
  prerequisiteUnitId: order > 1 ? `writing-unit-${String(order - 1).padStart(2, '0')}` : undefined,
});

export const WRITING_SKILL_LABELS: Record<WritingSkill, string> = {
  'describe-situation': 'Describe situation',
  'sequence-events': 'Sequence events',
  'explain-reason': 'Explain reason',
  'explain-cause-result': 'Explain cause/result',
  'report-problem': 'Report problem',
  'explain-action-taken': 'Explain action taken',
  'explain-result': 'Explain result',
  'explain-next-step': 'Explain next step',
  'apologize-explain': 'Apologize/explain',
  'request-change-plan': 'Request/change plan',
  'summarize-event': 'Summarize event',
  'explain-technical-issue': 'Explain technical issue',
  'explain-blocker': 'Explain blocker',
  'explain-risk': 'Explain risk',
  'explain-tradeoff': 'Explain tradeoff',
  'incident-update': 'Incident update',
};

export const writingLearningUnits: readonly WritingLearningUnit[] = [
  unit(1, { level: 'A1', title: 'Simple Situations', titleVietnamese: 'Tình huống đơn giản', goal: 'Nói rõ ai đang làm gì và tình huống diễn ra ở đâu.', targetSkills: ['describe-situation'], vocabularyFocus: ['people', 'places', 'daily actions'], targetStructures: ['be', 'present simple', 'there is / there are'] }),
  unit(2, { level: 'A1', title: 'People, Place & Time', titleVietnamese: 'Người, nơi chốn và thời gian', goal: 'Thêm người, nơi chốn và thời điểm để người đọc hiểu đủ bối cảnh.', targetSkills: ['describe-situation', 'sequence-events'], vocabularyFocus: ['time expressions', 'locations', 'relationships'], targetStructures: ['at / in / on', 'before / after', 'who / where / when'] }),
  unit(3, { level: 'A1', title: 'Events in Order', titleVietnamese: 'Sự việc theo thứ tự', goal: 'Kể các hành động ngắn theo đúng trình tự.', targetSkills: ['sequence-events', 'summarize-event'], vocabularyFocus: ['first', 'then', 'after that'], targetStructures: ['past simple', 'and then', 'next'] }),
  unit(4, { level: 'A1', title: 'Simple Plans', titleVietnamese: 'Kế hoạch đơn giản', goal: 'Diễn đạt một kế hoạch, lời đề nghị hoặc thay đổi nhỏ.', targetSkills: ['request-change-plan', 'explain-next-step'], vocabularyFocus: ['plans', 'meeting time', 'requests'], targetStructures: ['want to', 'can we', 'going to'] }),
  unit(5, { level: 'A1', title: 'Daily Problems', titleVietnamese: 'Vấn đề hằng ngày', goal: 'Nêu vấn đề đơn giản và hành động đã làm.', targetSkills: ['report-problem', 'explain-action-taken'], vocabularyFocus: ['common problems', 'help', 'simple actions'], targetStructures: ['cannot', 'need to', 'so'] }),
  unit(6, { level: 'A1', title: 'Simple Outcomes', titleVietnamese: 'Kết quả đơn giản', goal: 'Kết nối sự việc với kết quả hoặc bước tiếp theo ngắn gọn.', targetSkills: ['explain-result', 'explain-next-step'], vocabularyFocus: ['results', 'feelings', 'next actions'], targetStructures: ['so', 'now', 'will'] }),

  unit(7, { level: 'A2', title: 'Clear Reasons', titleVietnamese: 'Lý do rõ ràng', goal: 'Giải thích chuyện gì xảy ra và vì sao.', targetSkills: ['describe-situation', 'explain-reason'], vocabularyFocus: ['reasons', 'circumstances', 'because'], targetStructures: ['because', 'because of', 'when'] }),
  unit(8, { level: 'A2', title: 'Cause & Result', titleVietnamese: 'Nguyên nhân và kết quả', goal: 'Nối nguyên nhân, hành động và kết quả thành một đoạn mạch lạc.', targetSkills: ['explain-cause-result', 'explain-result'], vocabularyFocus: ['cause', 'effect', 'outcome'], targetStructures: ['so', 'as a result', 'caused'] }),
  unit(9, { level: 'A2', title: 'Changes of Plan', titleVietnamese: 'Thay đổi kế hoạch', goal: 'Giải thích thay đổi, lý do và kế hoạch mới.', targetSkills: ['request-change-plan', 'explain-reason', 'explain-next-step'], vocabularyFocus: ['reschedule', 'cancel', 'alternative'], targetStructures: ['have to', 'instead', 'could we'] }),
  unit(10, { level: 'A2', title: 'Everyday Problems', titleVietnamese: 'Giải thích vấn đề thường ngày', goal: 'Mô tả vấn đề, ảnh hưởng và cách xử lý thực tế.', targetSkills: ['report-problem', 'explain-action-taken'], vocabularyFocus: ['issue', 'impact', 'solution'], targetStructures: ['cannot', 'tried to', 'need to'] }),
  unit(11, { level: 'A2', title: 'Action & Outcome', titleVietnamese: 'Hành động và kết quả', goal: 'Cho biết đã làm gì, kết quả ra sao và còn việc gì tiếp theo.', targetSkills: ['explain-action-taken', 'explain-result', 'explain-next-step'], vocabularyFocus: ['actions', 'progress', 'follow-up'], targetStructures: ['already', 'but', 'will next'] }),
  unit(12, { level: 'A2', title: 'Clear Updates', titleVietnamese: 'Cập nhật rõ ràng', goal: 'Tóm tắt một sự việc hoặc cập nhật công việc có đủ ý chính.', targetSkills: ['summarize-event', 'explain-result', 'explain-next-step'], vocabularyFocus: ['status', 'completed', 'remaining work'], targetStructures: ['present perfect', 'currently', 'next'] }),

  unit(13, { level: 'B1', title: 'Complete Account', titleVietnamese: 'Kể sự việc đầy đủ', goal: 'Kể đủ bối cảnh, sự việc, hành động, kết quả và follow-up.', targetSkills: ['sequence-events', 'summarize-event', 'explain-next-step'], vocabularyFocus: ['event sequence', 'turning points', 'follow-up'], targetStructures: ['while', 'afterward', 'eventually'] }),
  unit(14, { level: 'B1', title: 'Detailed Causes', titleVietnamese: 'Giải thích nguyên nhân', goal: 'Phân biệt bối cảnh, nguyên nhân trực tiếp và kết quả.', targetSkills: ['explain-reason', 'explain-cause-result'], vocabularyFocus: ['root reason', 'contributing factor', 'effect'], targetStructures: ['due to', 'therefore', 'led to'] }),
  unit(15, { level: 'B1', title: 'Problem Explanation', titleVietnamese: 'Giải thích vấn đề', goal: 'Trình bày vấn đề, ảnh hưởng và cách xử lý dễ theo dõi.', targetSkills: ['report-problem', 'explain-action-taken', 'explain-result'], vocabularyFocus: ['problem', 'impact', 'resolution'], targetStructures: ['which meant that', 'to resolve this', 'as a result'] }),
  unit(16, { level: 'B1', title: 'Blockers & Actions', titleVietnamese: 'Blocker và hành động', goal: 'Nêu blocker, phần phụ thuộc và hành động đang thực hiện.', targetSkills: ['explain-blocker', 'explain-action-taken', 'explain-next-step'], vocabularyFocus: ['blocked', 'dependency', 'workaround'], targetStructures: ['cannot proceed until', 'in the meantime', 'once'] }),
  unit(17, { level: 'B1', title: 'Bug & Issue Reporting', titleVietnamese: 'Báo cáo bug và sự cố', goal: 'Mô tả lỗi kỹ thuật bằng tác động, dấu hiệu và xử lý thay vì chỉ nêu tên lỗi.', targetSkills: ['explain-technical-issue', 'report-problem', 'explain-result'], vocabularyFocus: ['bug', 'error', 'reproduce', 'fix'], targetStructures: ['occurs when', 'results in', 'has been fixed'] }),
  unit(18, { level: 'B1', title: 'Follow-up & Summary', titleVietnamese: 'Tổng kết và follow-up', goal: 'Tóm tắt rõ kết quả hiện tại và trách nhiệm tiếp theo.', targetSkills: ['summarize-event', 'explain-result', 'explain-next-step'], vocabularyFocus: ['summary', 'owner', 'deadline'], targetStructures: ['so far', 'the outcome was', 'the next step is'] }),

  unit(19, { level: 'B2', title: 'Complex Context', titleVietnamese: 'Bối cảnh phức tạp', goal: 'Giải thích tình huống có nhiều bên, nhiều điều kiện nhưng vẫn rõ trọng tâm.', targetSkills: ['describe-situation', 'summarize-event', 'explain-reason'], vocabularyFocus: ['constraints', 'stakeholders', 'conditions'], targetStructures: ['although', 'whereas', 'given that'] }),
  unit(20, { level: 'B2', title: 'Uncertain Causes', titleVietnamese: 'Nguyên nhân chưa chắc chắn', goal: 'Phân biệt dữ kiện, giả thuyết và phần cần xác minh.', targetSkills: ['explain-cause-result', 'explain-risk', 'explain-technical-issue'], vocabularyFocus: ['evidence', 'likely cause', 'investigation'], targetStructures: ['may have', 'appears to', 'we are verifying'] }),
  unit(21, { level: 'B2', title: 'Incident Updates', titleVietnamese: 'Cập nhật incident', goal: 'Tóm tắt incident theo impact, action, recovery và next step.', targetSkills: ['incident-update', 'explain-action-taken', 'explain-next-step'], vocabularyFocus: ['incident', 'impact', 'mitigation', 'recovery'], targetStructures: ['was affected', 'has been restored', 'we are monitoring'] }),
  unit(22, { level: 'B2', title: 'Impact & Risk', titleVietnamese: 'Tác động và rủi ro', goal: 'Giải thích tác động hiện tại, rủi ro có thể xảy ra và biện pháp giảm thiểu.', targetSkills: ['explain-risk', 'explain-cause-result', 'explain-next-step'], vocabularyFocus: ['risk', 'impact', 'likelihood', 'mitigation'], targetStructures: ['could lead to', 'unless', 'to reduce the risk'] }),
  unit(23, { level: 'B2', title: 'Tradeoffs & Decisions', titleVietnamese: 'Tradeoff và quyết định', goal: 'So sánh lựa chọn và giải thích vì sao một quyết định phù hợp hơn.', targetSkills: ['explain-tradeoff', 'explain-risk', 'explain-result'], vocabularyFocus: ['option', 'benefit', 'cost', 'tradeoff'], targetStructures: ['on the one hand', 'however', 'we chose to'] }),
  unit(24, { level: 'B2', title: 'Professional Explanation', titleVietnamese: 'Giải thích chuyên nghiệp', goal: 'Trình bày quyết định, trách nhiệm và bước tiếp theo cho stakeholder một cách súc tích.', targetSkills: ['summarize-event', 'apologize-explain', 'explain-next-step'], vocabularyFocus: ['decision', 'accountability', 'stakeholder update'], targetStructures: ['we acknowledge', 'the rationale is', 'going forward'] }),
] as const;

export const WRITING_LEVEL_ORDER: Record<Difficulty, number> = { A1: 0, A2: 1, B1: 2, B2: 3 };
