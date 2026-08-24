import { RotateCcw, Settings2 } from 'lucide-react';
import { useProgressStore } from '../store/progress-store';
import type { DailyLearningFocus, DailyLearningMode } from '../types/domain';
import { storageDiagnostics } from '../utils/storage-diagnostics';

const dailyModes: Array<{ id: DailyLearningMode; title: string; description: string }> = [
  { id: 'quick', title: 'Quick', description: '~10 phút' },
  { id: 'standard', title: 'Standard', description: '~20 phút' },
  { id: 'focus', title: 'Focus', description: '~30 phút' },
];
const dailyFocus: Array<{ id: DailyLearningFocus; title: string }> = [
  { id: 'balanced', title: 'Balanced' },
  { id: 'conversation', title: 'Conversation' },
  { id: 'vocabulary', title: 'Vocabulary' },
  { id: 'writing', title: 'Writing' },
];

export default function SettingsPage() {
  const progress = useProgressStore();
  const {
    dailyGoal,
    dailyLearningPreferences,
    settings,
    setDailyGoal,
    setDailyLearningPreferences,
    updateSettings,
    resetProgress,
  } = progress;
  const storage = storageDiagnostics(progress);
  return (
    <div className="page narrow">
      <p className="eyebrow">Cá nhân hoá</p>
      <h1>Cài đặt học tập</h1>
      <p className="subhead">Chọn nhịp học phù hợp. Mọi thay đổi được lưu ngay trên thiết bị.</p>
      <section className="settings-section card">
        <div className="settings-title"><Settings2 /><div><h2>Mục tiêu hằng ngày</h2><p>Chuỗi ngày học tăng khi đạt mục tiêu XP hoặc hoàn thành đủ Daily Practice.</p></div></div>
        <div className="choice-grid">{[5, 10, 20, 50].map((goal) => <button className={dailyGoal === goal ? 'selected' : ''} onClick={() => setDailyGoal(goal)} key={goal}><b>{goal}</b><span>XP</span></button>)}</div>
      </section>
      <section className="settings-section card">
        <h2>Daily Practice</h2>
        <p>Kế hoạch mới dùng lựa chọn này. Bạn vẫn có thể đổi và tạo lại ngay trong buổi học.</p>
        <div className="daily-settings-group"><b>Nhịp học</b><div className="choice-grid daily-settings-choices">{dailyModes.map((item) => <button className={dailyLearningPreferences.mode === item.id ? 'selected' : ''} onClick={() => setDailyLearningPreferences({ mode: item.id })} key={item.id}><b>{item.title}</b><span>{item.description}</span></button>)}</div></div>
        <div className="daily-settings-group"><b>Ưu tiên</b><div className="choice-grid daily-settings-choices">{dailyFocus.map((item) => <button className={dailyLearningPreferences.focus === item.id ? 'selected' : ''} onClick={() => setDailyLearningPreferences({ focus: item.id })} key={item.id}><b>{item.title}</b></button>)}</div></div>
      </section>
      <section className="settings-section card">
        <h2>Trải nghiệm học</h2>
        <div className="setting-row unlimited-practice"><span><b>Lượt làm vô hạn</b><small>Trả lời sai không bị trừ tim và bạn luôn có thể luyện tiếp.</small></span><strong aria-label="Vô hạn">∞</strong></div>
        <SettingToggle label="Âm thanh" description="Phản hồi âm thanh khi trả lời." checked={settings.soundEnabled} onChange={(soundEnabled) => updateSettings({ soundEnabled })} />
        <SettingToggle label="Chuyển động" description="Hiệu ứng nhẹ trong bài học." checked={settings.animationsEnabled} onChange={(animationsEnabled) => updateSettings({ animationsEnabled })} />
        <SettingToggle label="Hiển thị độ khó" description="Hiện nhãn A1–B2 trên thẻ chủ đề." checked={settings.showDifficulty} onChange={(showDifficulty) => updateSettings({ showDifficulty })} />
      </section>
      <section className="settings-section card"><div className="field"><label htmlFor="language">Ngôn ngữ giải thích</label><select id="language" className="select" value={settings.explanationLanguage} onChange={(event) => updateSettings({ explanationLanguage: event.target.value as 'vi' | 'bilingual' | 'en' })}><option value="vi">Tiếng Việt</option><option value="bilingual">Song ngữ</option><option value="en">English</option></select></div></section>
      <section className="settings-section card"><h2>Chẩn đoán lưu trữ</h2><p>Tiến độ đang dùng <b>{storage.kilobytes.toFixed(1)} KB</b> trên thiết bị.</p>{storage.warning && <p className="storage-warning">Dữ liệu tiến độ đã lớn; hãy hoàn thành các lượt ôn gần đây trước khi tiếp tục tích lũy.</p>}</section>
      <section className="danger-zone card"><div><h2>Xoá tiến độ</h2><p>Đưa XP, bài học, lỗi sai và từ vựng về trạng thái ban đầu.</p></div><button className="btn btn-danger" onClick={() => { if (window.confirm('Bạn chắc chắn muốn xoá toàn bộ tiến độ trên thiết bị này?')) resetProgress(); }}><RotateCcw size={17} /> Đặt lại</button></section>
    </div>
  );
}

function SettingToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="setting-row"><span><b>{label}</b><small>{description}</small></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>;
}
