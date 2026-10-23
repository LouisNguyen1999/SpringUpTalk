import { BookHeart, Code2, FilePenLine, Home, Library, Settings, TriangleAlert } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useProgressStore } from '../../store/progress-store';

const nav = [
  { to: '/', label: 'Học', icon: Home, end: true },
  { to: '/topics', label: 'Chủ đề', icon: Library },
  { to: '/mistakes', label: 'Lỗi sai', icon: TriangleAlert },
  { to: '/vocabulary', label: 'Luyện từ', icon: BookHeart },
  { to: '/writing', label: 'Viết', icon: FilePenLine },
  { to: '/it-english', label: 'IT English', icon: Code2 },
  { to: '/settings', label: 'Cài đặt', icon: Settings },
];

export function AppShell() {
  const { streak, xp } = useProgressStore();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="SpringUpTalk home">
          <span className="brand-mark">S</span>
          <span>SpringUpTalk</span>
        </NavLink>
        <nav aria-label="Điều hướng chính">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={21} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <span>Học theo nhịp của bạn</span>
          <small>Mọi dữ liệu được lưu trên thiết bị này.</small>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">S</span>
            <b>SpringUpTalk</b>
          </div>
          <div className="stat-chips" aria-label="Tiến độ">
            <span title="Chuỗi ngày học">
              🔥 <b>{streak}</b>
            </span>
            <span title="Tổng điểm kinh nghiệm">
              ⚡ <b>{xp}</b>
            </span>
            <span title="Lượt làm không giới hạn">
              ❤️ <b aria-label="Vô hạn">∞</b>
            </span>
          </div>
        </header>
        <main id="main-content">
          <Outlet />
        </main>
      </div>
      <nav className="bottom-nav" aria-label="Điều hướng trên điện thoại">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Icon size={21} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
