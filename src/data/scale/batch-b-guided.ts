import type { CommunicativeIntent, ConversationRelationship, Difficulty } from '../../types/domain';
import { practicalTopic, type PracticalBrief } from './batch-a-compact';

export type GuidedBrief=readonly [string,string,string,string,string,string,CommunicativeIntent,ConversationRelationship];
interface GuidedSeed {id:string;title:string;titleVi:string;category:string;icon:string;level:Difficulty;description:string;grammar:string[];briefs:readonly [GuidedBrief,GuidedBrief,GuidedBrief,...GuidedBrief[]]}

const actions=[
  ['We will verify the key details before deciding.','Mình sẽ xác minh các chi tiết chính trước khi quyết định.','A written confirmation will record the outcome.','Xác nhận bằng văn bản sẽ ghi lại kết quả.'],
  ['Use the confirmed information to choose the safest option.','Hãy dùng thông tin đã xác nhận để chọn cách an toàn nhất.','The responsible person will send the next update.','Người phụ trách sẽ gửi cập nhật tiếp theo.'],
  ['Record the agreed action and who will complete it.','Hãy ghi hành động đã thống nhất và người thực hiện.','We will check progress at the stated time.','Mình sẽ kiểm tra tiến độ vào thời điểm đã nêu.'],
  ['Compare the available remedies against the original request.','Hãy so các cách xử lý với yêu cầu ban đầu.','Keep the reference until the matter is closed.','Hãy giữ mã tham chiếu đến khi sự việc được đóng.'],
  ['Escalate with the evidence if the first action fails.','Hãy chuyển cấp kèm bằng chứng nếu hành động đầu thất bại.','The final response should explain the decision clearly.','Phản hồi cuối cần giải thích quyết định rõ ràng.'],
] as const;

const a1Actions=[
  ['Check {e} before choosing.','Hãy kiểm tra {v} trước khi chọn.','Write down the result for {e}.','Hãy ghi lại kết quả về {v}.'],
  ['Use the confirmed details for {e}.','Hãy dùng chi tiết đã xác nhận về {v}.','Send an update about {e}.','Hãy gửi cập nhật về {v}.'],
  ['Note who will handle {e}.','Hãy ghi ai sẽ xử lý {v}.','Check {e} at the agreed time.','Hãy kiểm tra {v} vào giờ đã chốt.'],
] as const;

const fill=(value:string,focusEn:string,focusVi:string)=>value.replace('{e}',focusEn).replace('{v}',focusVi);

export function guidedTopic({briefs,...seed}:GuidedSeed){
  return practicalTopic({...seed,briefs:briefs.map(([title,titleVi,focusEn,focusVi,detailEn,detailVi,intent,relationship],index)=>{
    if(seed.level==='A1'){
      const template=a1Actions[index%a1Actions.length]!;
      return [title,titleVi,`Hai người xử lý tình huống: ${titleVi.toLowerCase()}.`,`Thống nhất thông tin, hành động và cách theo dõi cho ${focusVi}.`,intent,relationship,focusEn,focusVi,detailEn,detailVi,fill(template[0],focusEn,focusVi),fill(template[1],focusEn,focusVi),fill(template[2],focusEn,focusVi),fill(template[3],focusEn,focusVi)] as PracticalBrief;
    }
    const template=actions[index%actions.length]!;
    const followUpEn=index%actions.length===1 ? `An update will cover ${focusEn}.` : `${template[2]} It will refer to ${focusEn}.`;
    const followUpVi=index%actions.length===1 ? `Cập nhật sẽ nêu ${focusVi}.` : `${template[3]} Nội dung sẽ nhắc đến ${focusVi}.`;
    return [title,titleVi,`Hai người xử lý tình huống: ${titleVi.toLowerCase()}.`,`Thống nhất thông tin, hành động và cách theo dõi cho ${focusVi}.`,intent,relationship,focusEn,focusVi,detailEn,detailVi,`${template[0]} The decision concerns ${focusEn}.`,`${template[1]} Quyết định liên quan đến ${focusVi}.`,followUpEn,followUpVi] as PracticalBrief;
  }) as GuidedSeed['briefs']});
}
