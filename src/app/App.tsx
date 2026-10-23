import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../components/common/AppShell';

const HomePage = lazy(() => import('../pages/HomePage'));
const TopicsPage = lazy(() => import('../pages/TopicsPage'));
const TopicPage = lazy(() => import('../pages/TopicPage'));
const LessonPage = lazy(() => import('../pages/LessonPage'));
const VocabularyPage = lazy(() => import('../pages/VocabularyPage'));
const VocabularyDetailPage = lazy(() => import('../pages/VocabularyDetailPage'));
const VocabularyPracticePage = lazy(() => import('../pages/VocabularyPracticePage'));
const AddCustomVocabularyPage = lazy(() => import('../pages/AddCustomVocabularyPage'));
const MistakesPage = lazy(() => import('../pages/MistakesPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const WritingPage = lazy(() => import('../pages/WritingPage'));
const WritingPracticePage = lazy(() => import('../pages/WritingPracticePage'));
const WritingUnitPage = lazy(() => import('../pages/WritingUnitPage'));
const DailyLearningPage = lazy(() => import('../pages/DailyLearningPage'));
const ITEnglishPage = lazy(() => import('../pages/ITEnglishPage'));
const ITEnglishTopicPage = lazy(() => import('../pages/ITEnglishTopicPage'));

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
          <Route path="vocabulary/custom" element={<AddCustomVocabularyPage />} />
          <Route path="vocabulary/:vocabularyId" element={<VocabularyDetailPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="writing/path/:unitId" element={<WritingUnitPage />} />
          <Route path="writing/:writingId" element={<WritingPracticePage />} />
          <Route path="daily" element={<DailyLearningPage />} />
          <Route path="it-english" element={<ITEnglishPage />} />
          <Route path="it-english/:topicId" element={<ITEnglishTopicPage />} />
          <Route path="mistakes" element={<MistakesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="lesson/:topicId/:conversationId" element={<LessonPage />} />
        <Route path="vocabulary/:vocabularyId/practice" element={<VocabularyPracticePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
