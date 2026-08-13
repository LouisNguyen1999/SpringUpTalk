import { ArrowLeft, CloudDownload, LoaderCircle, Save, WifiOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { vocabularyIndex } from '../data/vocabulary/vocabulary-repository';
import {
  lookupVocabularyOnline,
  VocabularyLookupError,
  type VocabularyLevelChoice,
} from '../services/vocabulary-lookup';
import { useProgressStore } from '../store/progress-store';
import type { VocabularyType } from '../types/domain';
import { normalizeSearchText, normalizeVocabularyIdentityKey } from '../utils/search';

function useOnlineStatus() {
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);
  return online;
}

export default function AddCustomVocabularyPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { customVocabulary, addCustomVocabulary, addVocabulary, addCustomVocabularyPractice } =
    useProgressStore();
  const online = useOnlineStatus();
  const [term, setTerm] = useState(params.get('term') ?? '');
  const [meaning, setMeaning] = useState('');
  const [type, setType] = useState<VocabularyType>('word');
  const [note, setNote] = useState('');
  const [example, setExample] = useState('');
  const [level, setLevel] = useState<VocabularyLevelChoice>('mixed');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const existing = useMemo(() => {
    const identity = normalizeVocabularyIdentityKey(term);
    if (!identity) return undefined;
    return (
      customVocabulary.find((item) => normalizeVocabularyIdentityKey(item.term) === identity) ??
      vocabularyIndex.find((item) => normalizeVocabularyIdentityKey(item.term) === identity)
    );
  }, [customVocabulary, term]);

  const openExisting = () => {
    if (!existing) return false;
    addVocabulary(
      existing.id,
      existing.id.startsWith('custom:') ? 'custom' : 'vocabulary-practice',
    );
    navigate(`/vocabulary/${encodeURIComponent(existing.id)}`);
    return true;
  };

  const lookupAndSave = async () => {
    setError('');
    if (!term.trim()) {
      setError('Hãy nhập một từ hoặc cụm từ.');
      return;
    }
    if (openExisting()) return;
    if (!online) {
      setError(
        'Bạn đang offline. Có thể thêm nghĩa và câu luyện thủ công, hoặc tra cứu tự động khi có mạng.',
      );
      return;
    }
    setLoading(true);
    try {
      const bundle = await lookupVocabularyOnline(term, { level, count: 5 });
      addCustomVocabulary(bundle.entry);
      bundle.practice.forEach(addCustomVocabularyPractice);
      addVocabulary(bundle.entry.id, 'online-lookup');
      navigate(`/vocabulary/${encodeURIComponent(bundle.entry.id)}`);
    } catch (lookupError) {
      const message =
        lookupError instanceof VocabularyLookupError
          ? lookupError.message
          : 'Không thể tra cứu lúc này. Bạn có thể thử lại hoặc nhập thủ công.';
      setError(`${message} Bạn có thể thử lại hoặc nhập thủ công.`);
    } finally {
      setLoading(false);
    }
  };

  const saveManual = () => {
    setError('');
    if (!term.trim() || !meaning.trim()) {
      setError('Hãy nhập từ và nghĩa tiếng Việt.');
      return;
    }
    if (openExisting()) return;
    const id = `custom:${normalizeVocabularyIdentityKey(term)}`;
    addCustomVocabulary({
      id,
      term: term.trim(),
      normalizedTerm: normalizeSearchText(term),
      type,
      meanings: [
        {
          id: `${id}:sense-1`,
          partOfSpeech: type,
          meaning: meaning.trim(),
          explanationVietnamese: note.trim() || undefined,
        },
      ],
      explanationVietnamese: note.trim() || undefined,
      collocations: [],
      phrases: [],
      wordFamily: [],
      synonyms: [],
      antonyms: [],
      examples: example.trim()
        ? [{ id: `${id}:example-1`, english: example.trim(), vietnamese: '' }]
        : [],
      tags: ['Custom', 'Manual'],
      sourceTopicIds: [],
      custom: true,
    });
    addVocabulary(id, 'custom');
    navigate(`/vocabulary/${encodeURIComponent(id)}`);
  };

  return (
    <div className="page custom-vocabulary-page">
      <Link className="text-link" to="/vocabulary">
        <ArrowLeft size={16} /> Quay lại
      </Link>
      <p className="eyebrow">Flexible Vocabulary</p>
      <h1>+ Thêm từ mới</h1>
      <p className="subhead">
        Thêm word, phrase, collocation, phrasal verb hoặc expression. App kiểm tra trùng trước khi
        tạo dữ liệu mới.
      </p>

      {!online && (
        <div className="offline-vocabulary-notice" role="status">
          <WifiOff size={19} />
          <span>
            Bạn đang offline. Có thể thêm nghĩa và câu luyện thủ công, hoặc tra cứu tự động khi có
            mạng.
          </span>
        </div>
      )}

      <section className="card vocabulary-lookup-form form-stack">
        <label>
          Vocabulary
          <input
            aria-label="Vocabulary"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="look forward to"
            autoFocus
          />
        </label>
        {existing && (
          <div className="existing-vocabulary-notice" role="status">
            <b>“{existing.term}” đã tồn tại.</b>
            <button className="btn btn-secondary" onClick={openExisting}>
              Mở vocabulary này
            </button>
          </div>
        )}
        <label>
          Mức câu luyện tự động
          <select
            aria-label="Mức câu luyện tự động"
            value={level}
            onChange={(event) => setLevel(event.target.value as VocabularyLevelChoice)}
          >
            <option value="easy">Easy · A1–A2</option>
            <option value="normal">Normal · A2–B1</option>
            <option value="advanced">Advanced · B1–B2</option>
            <option value="mixed">Mixed · A1–B2</option>
          </select>
        </label>
        <button
          className="btn btn-primary"
          onClick={lookupAndSave}
          disabled={loading || Boolean(existing) || !term.trim()}
        >
          {loading ? (
            <>
              <LoaderCircle className="spin" size={17} /> Đang tra cứu và kiểm tra 5 câu…
            </>
          ) : (
            <>
              <CloudDownload size={17} /> Tra cứu online và tạo 5 câu
            </>
          )}
        </button>
        <small>
          Dữ liệu thành công sẽ được cache trên thiết bị. Không có API key hoặc secret trong ứng
          dụng.
        </small>
      </section>

      <div className="manual-divider">
        <span>hoặc nhập thủ công</span>
      </div>
      <section className="card form-stack">
        <label>
          Vietnamese meaning
          <input
            value={meaning}
            onChange={(event) => setMeaning(event.target.value)}
            placeholder="nghĩa do bạn xác nhận"
          />
        </label>
        <label>
          Type
          <select value={type} onChange={(event) => setType(event.target.value as VocabularyType)}>
            {[
              'word',
              'noun',
              'verb',
              'adjective',
              'adverb',
              'phrasal-verb',
              'idiom',
              'phrase',
              'expression',
              'collocation',
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Note
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Cách dùng hoặc ghi chú…"
          />
        </label>
        <label>
          Optional example
          <textarea
            value={example}
            onChange={(event) => setExample(event.target.value)}
            placeholder="I look forward to meeting you."
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button
          className="btn btn-secondary"
          onClick={saveManual}
          disabled={loading || Boolean(existing)}
        >
          <Save size={17} /> Lưu từ thủ công
        </button>
      </section>
    </div>
  );
}
