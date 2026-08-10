import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/common/AppShell';

const HomePage = lazy(() => import('../pages/HomePage'));
const TopicsPage = lazy(() => import('../pages/TopicsPage'));
const TopicPage = lazy(() => import('../pages/TopicPage'));
const LessonPage = lazy(() => import('../pages/LessonPage'));
const VocabularyPage = lazy(() => import('../pages/VocabularyPage'));
const MistakesPage = lazy(() => import('../pages/MistakesPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));

function PageLoader() {
  return <div className="page-loader" role="status">Đang mở bài học…</div>;
}

export function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="topics" element={<TopicsPage />} />
          <Route path="topics/:topicId" element={<TopicPage />} />
          <Route path="vocabulary" element={<VocabularyPage />} />
          <Route path="mistakes" element={<MistakesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="lesson/:topicId/:conversationId" element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
