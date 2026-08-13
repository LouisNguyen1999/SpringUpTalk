import {
  ArrowRight,
  BookOpenCheck,
  MessageCircleMore,
  RotateCcw,
  Sparkles,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { topicManifest } from '../data/content-repository';
import { useProgressStore } from '../store/progress-store';
import { ProgressBar } from '../components/common/ProgressBar';
import { buildCurriculum } from '../data/curriculum';
import { recommendTopics } from '../engine/recommendations';
import { isReviewDue } from '../engine/review-scheduler';
import {
  conversationCompletionState,
  conversationsMastered,
  nextMissingRole,
  rolesPracticed,
  topicRoleCounts,
} from '../engine/progress';

export default function HomePage() {
  const progress = useProgressStore();
  const recommendations = recommendTopics(topicManifest, progress);
  const unfinishedConversation = Object.values(progress.conversationProgress).find(
    (item) => conversationCompletionState(item) === 'in-progress',
  );
  const unfinishedTopic = unfinishedConversation
    ? topicManifest.find((item) => item.id === unfinishedConversation.topicId)
    : undefined;
  const nextTopic = unfinishedTopic ?? recommendations[0] ?? topicManifest[0];
  const currentUnit = buildCurriculum(topicManifest)
    .find((level) => level.level === progress.currentLevel)
    ?.units.find((unit) =>
      unit.topics.some(
        (topic) =>
          topicRoleCounts(progress.conversationProgress, topic.id, topic.conversationCount)
            .state !== 'completed',
      ),
    );
  const pathTopics = currentUnit?.topics ?? recommendations;
  const dueCount = progress.mistakes.filter((item) =>
    isReviewDue(progress.sentenceProgress[item.turnId]),
  ).length;
  return (
    <div className="page home-page">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">Chào ngày mới</p>
          <h1>
            Biến từng câu viết
            <br />
            thành một cuộc trò chuyện.
          </h1>
          <p className="subhead">
            Luyện phản xạ tiếng Anh từ những tình huống gần gũi, nhận giải thích rõ ràng bằng tiếng
            Việt.
          </p>
        </div>
        <div className="goal-card card">
          <div className="goal-icon">
            <Target />
          </div>
          <div>
            <span>Mục tiêu hôm nay</span>
            <b>
              {Math.min(progress.todayXp, progress.dailyGoal)} / {progress.dailyGoal} XP
            </b>
          </div>
          <ProgressBar value={progress.todayXp} max={progress.dailyGoal} />
          <small>
            {progress.todayXp >= progress.dailyGoal
              ? 'Tuyệt! Bạn đã giữ chuỗi học hôm nay.'
              : `Còn ${progress.dailyGoal - progress.todayXp} XP để hoàn thành.`}
          </small>
        </div>
      </section>

      {nextTopic && (
        <section className="continue-card">
          <div className="continue-copy">
            <span className="pill">
              <Sparkles size={15} />{' '}
              {unfinishedConversation ? 'Tiếp tục hội thoại' : 'Bài tiếp theo'}
            </span>
            <h2>
              {nextTopic.icon} {nextTopic.title}
            </h2>
            <p>
              {nextTopic.titleVi} · {nextTopic.level} ·{' '}
              {unfinishedConversation
                ? '1 / 2 vai đã hoàn thành'
                : `${nextTopic.conversationCount} hội thoại`}
            </p>
            <Link
              className="btn btn-primary"
              to={
                unfinishedConversation
                  ? `/lesson/${nextTopic.id}/${unfinishedConversation.conversationId}?role=${nextMissingRole(unfinishedConversation)}`
                  : `/topics/${nextTopic.id}`
              }
            >
              {unfinishedConversation
                ? `Tiếp tục với Person ${nextMissingRole(unfinishedConversation)}`
                : 'Tiếp tục học'}{' '}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="chat-preview" aria-hidden="true">
            <div className="mini-bubble partner">Cuối tuần này bạn có rảnh không?</div>
            <div className="mini-bubble user">Are you free this weekend?</div>
            <span>✓ Cách viết tự nhiên!</span>
          </div>
        </section>
      )}

      <div className="quick-grid">
        <Link to="/mistakes" className="quick-card card">
          <span className="quick-icon coral">
            <RotateCcw />
          </span>
          <div>
            <b>Ôn lỗi sai</b>
            <small>{dueCount} câu đến hạn hôm nay</small>
          </div>
          <ArrowRight size={18} />
        </Link>
        <Link to="/vocabulary" className="quick-card card">
          <span className="quick-icon yellow">
            <BookOpenCheck />
          </span>
          <div>
            <b>Vocabulary Practice</b>
            <small>500 từ · 2.500 câu luyện</small>
          </div>
          <ArrowRight size={18} />
        </Link>
        <Link to="/topics" className="quick-card card">
          <span className="quick-icon green">
            <MessageCircleMore />
          </span>
          <div>
            <b>Khám phá chủ đề</b>
            <small>{topicManifest.length} chủ đề thật</small>
          </div>
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="practice-stats" aria-label="Thống kê luyện hai vai">
        <div className="card">
          <span>Vai đã luyện</span>
          <b>{rolesPracticed(progress.conversationProgress)}</b>
        </div>
        <div className="card">
          <span>Hội thoại thành thạo</span>
          <b>{conversationsMastered(progress.conversationProgress)}</b>
        </div>
      </div>

      <div className="section-heading">
        <h2>
          {currentUnit
            ? `${currentUnit.level} · Unit ${currentUnit.number}: ${currentUnit.title}`
            : 'Gợi ý dành cho bạn'}
        </h2>
        <Link className="text-link" to="/topics">
          Xem tất cả
        </Link>
      </div>
      <div className="learning-path">
        {pathTopics.map((topic, index) => {
          const topicProgress = topicRoleCounts(
            progress.conversationProgress,
            topic.id,
            topic.conversationCount,
          );
          return (
            <div key={topic.id} className={`path-node ${topicProgress.state}`}>
              <span className="path-line" />
              <span className="path-dot">
                {topicProgress.state === 'completed'
                  ? '✓'
                  : topicProgress.state === 'in-progress'
                    ? '◐'
                    : topic.icon}
              </span>
              <div>
                <small>
                  Bài {index + 1} · {topic.level} ·{' '}
                  {topicProgress.state === 'completed'
                    ? 'Hoàn thành'
                    : topicProgress.state === 'in-progress'
                      ? 'Đang học'
                      : 'Chưa học'}
                </small>
                <b>{topic.title}</b>
                <span>{topic.titleVi}</span>
              </div>
              <Link aria-label={`Mở ${topic.title}`} to={`/topics/${topic.id}`}>
                <ArrowRight />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
