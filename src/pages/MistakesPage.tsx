import { AlertTriangle, ArrowRight, FilePenLine } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { strongestWeaknesses } from '../engine/recommendations';
import { isReviewDue } from '../engine/review-scheduler';
import { useProgressStore } from '../store/progress-store';
import type { MistakeRecord } from '../types/domain';
import { vocabularyIndex } from '../data/vocabulary/vocabulary-repository';
import { writingManifest } from '../data/writing/writing-repository';
import { writingVariantForTopic } from '../engine/writing-learning-path';

function ReviewCard({ item }: { item: MistakeRecord }) {
  return (
    <article className="review-card card">
      <div className="review-prompt">
        <small>
          🇻🇳 VIETNAMESE{' '}
          {item.role ? `· PERSON ${item.role}` : item.vocabularyId ? '· VOCABULARY' : ''}
        </small>
        <h2>{item.vietnamese}</h2>
      </div>
      <div className="review-answers">
        <div>
          <small>CÂU CỦA BẠN</small>
          <p className="wrong">{item.userAnswer}</p>
        </div>
        <ArrowRight />
        <div>
          <small>CÁCH VIẾT TỐT HƠN</small>
          <p className="right">{item.canonicalAnswer}</p>
        </div>
      </div>
      <footer>
        <div>
          {(item.types.length ? item.types : ['grammar']).map((type, index) => (
            <span className="tag" key={`${type}-${index}`}>
              {type}
            </span>
          ))}
        </div>
        <Link
          className="btn btn-secondary"
          to={
            item.vocabularyId
              ? `/vocabulary/${encodeURIComponent(item.vocabularyId)}/practice`
              : `/lesson/${item.topicId}/${item.conversationId}${item.role ? `?role=${item.role}` : ''}`
          }
        >
          {item.vocabularyId ? 'Ôn từ này' : 'Ôn trong hội thoại'} <ArrowRight size={16} />
        </Link>
      </footer>
    </article>
  );
}

export default function MistakesPage() {
  const progress = useProgressStore();
  const [now] = useState(Date.now);
  const due = progress.mistakes
    .filter((item) => isReviewDue(progress.sentenceProgress[item.turnId]))
    .sort((a, b) => (a.nextReviewAt ?? a.createdAt).localeCompare(b.nextReviewAt ?? b.createdAt));
  const weaknesses = strongestWeaknesses(progress);
  const weakVocabulary = progress.vocabulary
    .filter(
      (item) =>
        item.mastery !== 'mastered' && item.timesCorrect / Math.max(1, item.timesSeen) < 0.8,
    )
    .slice(0, 12);
  const vocabularyById = new Map(vocabularyIndex.map((item) => [item.id, item]));
  const dueVocabulary = progress.vocabulary
    .filter((item) => item.nextReviewAt && Date.parse(item.nextReviewAt) <= now)
    .slice(0, 12);
  const dueWriting = Object.values(progress.writingProgress)
    .filter((item) => item.attempts.length > 0 && Date.parse(item.nextReviewAt) <= now)
    .sort((left, right) => left.nextReviewAt.localeCompare(right.nextReviewAt))
    .slice(0, 12);
  return (
    <div className="page">
      <p className="eyebrow">Biến lỗi sai thành tiến bộ</p>
      <h1>Ôn tập thông minh</h1>
      <p className="subhead">
        Lịch ôn theo ngày ưu tiên câu đến hạn, điểm ngữ pháp yếu và từ vựng cần củng cố. Mỗi lỗi chỉ
        có một bản ghi đang hoạt động.
      </p>
      {progress.mistakes.length === 0 && dueVocabulary.length === 0 && dueWriting.length === 0 ? (
        <EmptyState
          icon={AlertTriangle}
          title="Chưa có nội dung đến hạn"
          text="Các câu và từ vựng cần ôn sẽ tự xuất hiện ở đây sau khi bạn học."
        />
      ) : (
        <>
          {progress.mistakes.length > 0 && (
            <>
              <div className="section-heading">
                <h2>Đến hạn hôm nay</h2>
                <span>{due.length} câu</span>
              </div>
              {due.length ? (
                <div className="review-list">
                  {due.map((item) => (
                    <ReviewCard item={item} key={item.id} />
                  ))}
                </div>
              ) : (
                <div className="card empty-review">
                  <b>Bạn đã hoàn thành lượt ôn hôm nay.</b>
                  <span>Các câu tiếp theo sẽ xuất hiện đúng ngày đã lên lịch.</span>
                </div>
              )}
            </>
          )}
          <div className="section-heading">
            <h2>Ngữ pháp cần củng cố</h2>
            <span>Dựa trên lỗi thật</span>
          </div>
          <div className="mistake-groups">
            {weaknesses.map(({ type, count }) => (
              <div className="card" key={type}>
                <span>{type}</span>
                <b>{count}</b>
                <small>lần cần sửa</small>
              </div>
            ))}
          </div>
          {dueVocabulary.length > 0 && (
            <>
              <div className="section-heading">
                <h2>Vocabulary Due</h2>
                <span>{dueVocabulary.length} từ</span>
              </div>
              <div className="weak-vocab-list">
                {dueVocabulary.map((item) => (
                  <Link
                    className="tag"
                    to={`/vocabulary/${encodeURIComponent(item.id)}/practice`}
                    key={item.id}
                  >
                    {vocabularyById.get(item.id)?.term ??
                      progress.customVocabulary.find((entry) => entry.id === item.id)?.term ??
                      item.id}
                  </Link>
                ))}
              </div>
            </>
          )}
          {dueWriting.length > 0 && (
            <>
              <div className="section-heading">
                <h2>Writing Due</h2>
                <span>{dueWriting.length} đoạn</span>
              </div>
              <div className="review-list">
                {dueWriting.map((item) => {
                  const topic = writingManifest.find((candidate) => candidate.id === item.topicId);
                  const variant = item.recommendedReviewMode === 'exact-retry'
                    ? undefined
                    : writingVariantForTopic(item.topicId, new Set(Object.keys(progress.writingProgress)));
                  const reviewTopicId = variant?.topicId ?? item.topicId;
                  const recurringWeakness = Object.entries(item.weaknessCounts ?? {})
                    .sort((left, right) => right[1] - left[1])[0];
                  return (
                    <article className="review-card card writing-review-card" key={item.topicId}>
                      <div className="review-prompt">
                        <small>WRITING · {topic?.domain === 'it-work' ? 'IT' : 'DAILY'} · {topic?.level}</small>
                        <h2>{topic?.titleVietnamese ?? item.topicId}</h2>
                        <p>
                          {item.bestAttempt
                            ? `Best meaning coverage: ${Math.round(item.bestAttempt.meaningCoverage * 100)}%`
                            : 'Topic đã được đánh dấu để luyện.'}
                        </p>
                        {recurringWeakness && <small>Ưu tiên: {recurringWeakness[0]} · gặp lại {recurringWeakness[1]} lần</small>}
                      </div>
                      <footer>
                        <span className={`mastery ${item.mastery}`}>{item.mastery}</span>
                        <Link className="btn btn-secondary" to={`/writing/${encodeURIComponent(reviewTopicId)}?session=review`}>
                          <FilePenLine size={16} /> {variant ? 'Luyện biến thể' : 'Ôn đoạn này'}
                        </Link>
                      </footer>
                    </article>
                  );
                })}
              </div>
            </>
          )}
          {weakVocabulary.length > 0 && (
            <>
              <div className="section-heading">
                <h2>Từ vựng cần ôn</h2>
                <Link className="text-link" to="/vocabulary">
                  Mở sổ từ
                </Link>
              </div>
              <div className="weak-vocab-list">
                {weakVocabulary.map((item) => (
                  <Link
                    className="tag"
                    to={`/vocabulary/${encodeURIComponent(item.id)}/practice`}
                    key={item.id}
                  >
                    {vocabularyById.get(item.id)?.term ??
                      progress.customVocabulary.find((entry) => entry.id === item.id)?.term ??
                      item.id}{' '}
                    · {item.timesCorrect}/{item.timesSeen}
                  </Link>
                ))}
              </div>
            </>
          )}
          {progress.mistakes.length > 0 && (
            <>
              <div className="section-heading">
                <h2>Lỗi gần đây</h2>
                <span>{progress.mistakes.length} lỗi duy nhất</span>
              </div>
              <div className="review-list">
                {progress.mistakes.slice(0, 20).map((item) => (
                  <ReviewCard item={item} key={item.id} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
