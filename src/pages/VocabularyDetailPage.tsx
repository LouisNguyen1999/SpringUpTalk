import {
  ArrowLeft,
  BookMinus,
  BookPlus,
  CloudDownload,
  LoaderCircle,
  Pencil,
  Play,
  RefreshCw,
  Star,
  Trash2,
  WifiOff,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PracticeBankEditor } from '../components/vocabulary/PracticeBankEditor';
import {
  mergeVocabularyPracticeBank,
  type PracticeBankRow,
} from '../data/vocabulary/vocabulary-practice-bank';
import { vocabularyIndex, vocabularyRepository } from '../data/vocabulary/vocabulary-repository';
import {
  lookupVocabularyOnline,
  VocabularyLookupError,
  type VocabularyLevelChoice,
} from '../services/vocabulary-lookup';
import { useProgressStore } from '../store/progress-store';
import type { VocabularyEntry, VocabularyPracticeItem, VocabularyType } from '../types/domain';
import { normalizeSearchText, normalizeVocabularyIdentityKey } from '../utils/search';

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const term = [...terms]
    .sort((a, b) => b.length - a.length)
    .find((item) => text.toLowerCase().includes(item.toLowerCase()));
  if (!term) return <>{text}</>;
  const index = text.toLowerCase().indexOf(term.toLowerCase());
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + term.length)}</mark>
      {text.slice(index + term.length)}
    </>
  );
}

export default function VocabularyDetailPage() {
  const { vocabularyId = '' } = useParams();
  const id = decodeURIComponent(vocabularyId);
  const navigate = useNavigate();
  const store = useProgressStore();
  const [loaded, setLoaded] = useState<{ id: string; entry?: VocabularyEntry }>({ id: '' });
  const [senseId, setSenseId] = useState<string>();
  const [relatedData, setRelatedData] = useState<{ id: string; items: VocabularyEntry[] }>({
    id: '',
    items: [],
  });
  const [bank, setBank] = useState<{ id: string; rows: PracticeBankRow[] }>({ id: '', rows: [] });
  const [level, setLevel] = useState<VocabularyLevelChoice>('mixed');
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );
  const [lookupState, setLookupState] = useState<{
    loading: boolean;
    message?: string;
    error?: string;
  }>({ loading: false });
  const [editingEntry, setEditingEntry] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDraft, setEditDraft] = useState({
    term: '',
    meaning: '',
    ipa: '',
    partOfSpeech: '',
    type: 'word' as VocabularyType,
    collocations: '',
  });
  const [editError, setEditError] = useState('');

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);
  useEffect(() => {
    let active = true;
    const custom = store.customVocabulary.find((item) => item.id === id);
    (custom ? Promise.resolve(custom) : vocabularyRepository.getById(id)).then((value) => {
      if (!active) return;
      setLoaded({ id, entry: value });
      setSenseId(value?.meanings[0]?.id);
    });
    return () => {
      active = false;
    };
  }, [id, store.customVocabulary]);
  const loading = loaded.id !== id;
  const entry = loading ? undefined : loaded.entry;
  useEffect(() => {
    if (!entry || entry.custom) return;
    let active = true;
    vocabularyRepository.getRelatedTerms(entry.id).then((items) => {
      if (active) setRelatedData({ id: entry.id, items });
    });
    return () => {
      active = false;
    };
  }, [entry]);
  const related = entry && !entry.custom && relatedData.id === entry.id ? relatedData.items : [];
  useEffect(() => {
    if (!entry) return;
    let active = true;
    const request = entry.custom ? Promise.resolve([]) : vocabularyRepository.getPracticeItems(id);
    request.then((staticItems) => {
      if (!active) return;
      setBank({
        id,
        rows: mergeVocabularyPracticeBank(
          staticItems,
          store.customVocabularyPractice.filter((item) => item.vocabularyId === id),
          store.disabledVocabularyPracticeIds,
        ),
      });
    });
    return () => {
      active = false;
    };
  }, [entry, id, store.customVocabularyPractice, store.disabledVocabularyPracticeIds]);

  const progress = store.vocabulary.find((item) => item.id === id);
  const sense = entry?.meanings.find((item) => item.id === senseId) ?? entry?.meanings[0];
  const rows = bank.id === id ? bank.rows : [];
  const activePractice = rows.filter((row) => !row.disabled).length;
  const targetTerms = useMemo(
    () => [entry?.term ?? '', ...(entry?.collocations ?? [])].filter(Boolean),
    [entry],
  );

  if (loading) return <div className="page-loader">Đang mở từ vựng…</div>;
  if (!entry)
    return (
      <div className="page">
        <Link className="text-link" to="/vocabulary">
          <ArrowLeft size={16} /> Quay lại
        </Link>
        <h1>Không tìm thấy từ</h1>
        <p>Từ này chưa có trong từ điển offline.</p>
      </div>
    );

  const openEntryEditor = () => {
    setEditDraft({
      term: entry.term,
      meaning: sense?.meaning ?? '',
      ipa: entry.ipa ?? '',
      partOfSpeech: entry.partOfSpeech ?? '',
      type: entry.type,
      collocations: entry.collocations.join('\n'),
    });
    setEditError('');
    setEditingEntry(true);
  };
  const saveEntryEdit = () => {
    if (!editDraft.term.trim() || !editDraft.meaning.trim()) {
      setEditError('Vocabulary và meaning là bắt buộc.');
      return;
    }
    const identity = normalizeVocabularyIdentityKey(editDraft.term);
    const duplicateStatic = vocabularyIndex.find(
      (item) => item.id !== id && normalizeVocabularyIdentityKey(item.term) === identity,
    );
    const duplicateCustom = store.customVocabulary.find(
      (item) => item.id !== id && normalizeVocabularyIdentityKey(item.term) === identity,
    );
    if (duplicateStatic || duplicateCustom) {
      setEditError(`“${duplicateStatic?.term ?? duplicateCustom?.term}” đã tồn tại.`);
      return;
    }
    store.addCustomVocabulary({
      ...entry,
      term: editDraft.term.trim(),
      normalizedTerm: normalizeSearchText(editDraft.term),
      type: editDraft.type,
      ipa: editDraft.ipa.trim() || undefined,
      partOfSpeech: editDraft.partOfSpeech.trim() || undefined,
      meanings: entry.meanings.map((item, index) =>
        index === 0
          ? {
              ...item,
              meaning: editDraft.meaning.trim(),
              partOfSpeech: editDraft.partOfSpeech.trim() || item.partOfSpeech,
            }
          : item,
      ),
      collocations: Array.from(
        new Set(
          editDraft.collocations
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      ),
    });
    setEditingEntry(false);
  };

  const runLookup = async (refreshDefinition: boolean) => {
    if (!online) {
      setLookupState({
        loading: false,
        error:
          'Bạn đang offline. Dữ liệu đã cache vẫn dùng được; hãy kết nối mạng để tạo thêm câu.',
      });
      return;
    }
    setLookupState({ loading: true });
    try {
      const bundle = await lookupVocabularyOnline(entry.term, {
        level,
        count: 5,
        existingCanonicalAnswers: rows.map((row) => row.item.canonicalAnswer),
      });
      if (refreshDefinition && entry.custom) {
        store.addCustomVocabulary({ ...bundle.entry, id: entry.id, term: entry.term });
      }
      bundle.practice.forEach((item) =>
        store.addCustomVocabularyPractice({
          ...item,
          vocabularyId: entry.id,
          senseId,
        }),
      );
      setLookupState({
        loading: false,
        message: refreshDefinition
          ? 'Đã cập nhật dữ liệu và thêm 5 câu mới vượt qua quality gate.'
          : 'Đã thêm 5 câu luyện mới, không trùng với practice bank hiện tại.',
      });
    } catch (lookupError) {
      setLookupState({
        loading: false,
        error:
          lookupError instanceof VocabularyLookupError
            ? lookupError.message
            : 'Nguồn online tạm thời không khả dụng. Hãy thử lại sau.',
      });
    }
  };

  const deletePractice = (item: VocabularyPracticeItem) => {
    if (window.confirm(`Xóa câu luyện “${item.vietnamese}”?`)) {
      store.deleteVocabularyPractice(item.id);
    }
  };

  return (
    <div className="page vocabulary-detail-page">
      <Link className="text-link" to="/vocabulary">
        <ArrowLeft size={16} /> Vocabulary Practice
      </Link>
      {!online && (
        <div className="offline-vocabulary-notice" role="status">
          <WifiOff size={18} /> Đang offline · definition và practice đã cache vẫn dùng được.
        </div>
      )}
      <div className="vocabulary-detail-layout">
        <main>
          <header className="vocabulary-word-header">
            <div>
              <p className="eyebrow">
                {entry.custom ? 'Custom · ' : ''}
                {entry.type}
                {entry.cefr ? ` · ${entry.cefr}` : ''}
              </p>
              <h1>{entry.term}</h1>
              <p className="ipa">{entry.ipa ?? 'IPA chưa có trong dữ liệu hiện tại.'}</p>
            </div>
            <div className="vocabulary-header-actions">
              {entry.custom && (
                <button className="icon-btn" aria-label="Sửa vocabulary" onClick={openEntryEditor}>
                  <Pencil />
                </button>
              )}
              <button
                className={`icon-btn ${progress?.favorite ? 'active' : ''}`}
                aria-label={progress?.favorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
                onClick={() => store.toggleVocabularyFavorite(entry.id)}
              >
                <Star fill={progress?.favorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </header>

          {editingEntry && (
            <section className="card vocabulary-entry-editor form-stack">
              <h2>Sửa vocabulary</h2>
              <label>
                Vocabulary
                <input
                  value={editDraft.term}
                  onChange={(event) => setEditDraft({ ...editDraft, term: event.target.value })}
                />
              </label>
              <label>
                Meaning
                <input
                  value={editDraft.meaning}
                  onChange={(event) => setEditDraft({ ...editDraft, meaning: event.target.value })}
                />
              </label>
              <div className="practice-editor-row">
                <label>
                  IPA
                  <input
                    value={editDraft.ipa}
                    onChange={(event) => setEditDraft({ ...editDraft, ipa: event.target.value })}
                  />
                </label>
                <label>
                  Part of speech
                  <input
                    value={editDraft.partOfSpeech}
                    onChange={(event) =>
                      setEditDraft({ ...editDraft, partOfSpeech: event.target.value })
                    }
                  />
                </label>
              </div>
              <label>
                Type
                <select
                  value={editDraft.type}
                  onChange={(event) =>
                    setEditDraft({ ...editDraft, type: event.target.value as VocabularyType })
                  }
                >
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
                Collocations · mỗi cụm một dòng
                <textarea
                  value={editDraft.collocations}
                  onChange={(event) =>
                    setEditDraft({ ...editDraft, collocations: event.target.value })
                  }
                />
              </label>
              {editError && <p className="form-error">{editError}</p>}
              <div className="inline-actions">
                <button className="btn btn-secondary" onClick={() => setEditingEntry(false)}>
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={saveEntryEdit}>
                  Lưu thay đổi
                </button>
              </div>
            </section>
          )}

          {entry.meanings.length > 1 && (
            <div className="sense-picker" role="tablist" aria-label="Chọn nghĩa">
              {entry.meanings.map((item, index) => (
                <button
                  role="tab"
                  aria-selected={sense?.id === item.id}
                  className={sense?.id === item.id ? 'active' : ''}
                  onClick={() => setSenseId(item.id)}
                  key={item.id}
                >
                  Nghĩa {index + 1} · {item.partOfSpeech ?? entry.partOfSpeech ?? entry.type}
                </button>
              ))}
            </div>
          )}
          <section className="card vocabulary-definition">
            <small>MEANING</small>
            <h2>{sense?.meaning}</h2>
            {entry.definitionEnglish && <p>{entry.definitionEnglish}</p>}
            <span className="tag">{sense?.partOfSpeech ?? entry.partOfSpeech ?? entry.type}</span>
          </section>

          {entry.collocations.length > 0 && (
            <section>
              <div className="section-heading">
                <h2>Collocations hữu ích</h2>
                <span>Usage patterns</span>
              </div>
              <div className="collocation-list">
                {entry.collocations.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="section-heading">
              <h2>Examples</h2>
              <span>{entry.examples.length} câu tham khảo</span>
            </div>
            {entry.examples.length ? (
              <div className="vocabulary-examples">
                {entry.examples.map((example) => (
                  <article className="card" key={example.id}>
                    <p>
                      <Highlight text={example.english} terms={targetTerms} />
                    </p>
                    <span>{example.vietnamese || 'Chưa có bản dịch tiếng Việt.'}</span>
                    {example.context && <small>{example.context}</small>}
                    {example.sourceTopicId && (
                      <Link to={`/topics/${example.sourceTopicId}`}>Mở chủ đề nguồn</Link>
                    )}
                    {example.sourceReferences?.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                        Nguồn: {source.provider}
                      </a>
                    ))}
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-copy">Chưa có example trong cache. Bạn có thể thêm thủ công.</p>
            )}
          </section>

          <section className="card online-practice-controls">
            <div>
              <p className="eyebrow">Online enrichment · lưu offline sau khi tạo</p>
              <h2>Tạo thêm câu luyện</h2>
              <p>App chỉ thêm đúng 5 câu mới vượt quality gate và tự loại câu trùng.</p>
            </div>
            <label>
              Level
              <select
                value={level}
                onChange={(event) => setLevel(event.target.value as VocabularyLevelChoice)}
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="advanced">Advanced</option>
                <option value="mixed">Mixed</option>
              </select>
            </label>
            <div className="inline-actions">
              <button
                className="btn btn-primary"
                onClick={() => runLookup(false)}
                disabled={lookupState.loading || !online}
              >
                {lookupState.loading ? (
                  <LoaderCircle className="spin" size={17} />
                ) : (
                  <CloudDownload size={17} />
                )}
                +5 câu
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => runLookup(true)}
                disabled={lookupState.loading || !online}
              >
                <RefreshCw size={17} /> Cập nhật dữ liệu từ Internet
              </button>
            </div>
            {lookupState.message && (
              <p className="lookup-success" role="status">
                {lookupState.message}
              </p>
            )}
            {lookupState.error && (
              <div className="lookup-error" role="alert">
                <p>{lookupState.error}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => runLookup(false)}
                  disabled={!online}
                >
                  Thử lại
                </button>
              </div>
            )}
          </section>

          <PracticeBankEditor
            vocabularyId={entry.id}
            term={entry.term}
            rows={rows}
            onSave={store.addCustomVocabularyPractice}
            onDelete={deletePractice}
            onToggleDisabled={store.toggleVocabularyPracticeDisabled}
          />

          {related.length > 0 && (
            <section>
              <h2>Từ liên quan</h2>
              <div className="related-vocabulary">
                {related.map((item) => (
                  <Link key={item.id} to={`/vocabulary/${encodeURIComponent(item.id)}`}>
                    {item.term}
                  </Link>
                ))}
              </div>
            </section>
          )}
          {entry.sourceReferences?.length ? (
            <section className="vocabulary-sources">
              <h2>Sources</h2>
              <p>Dữ liệu ngắn dùng để xác nhận definition/usage; practice được lưu cục bộ.</p>
              {entry.sourceReferences.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  {source.provider}
                  {source.license ? ` · ${source.license}` : ''}
                </a>
              ))}
            </section>
          ) : null}
        </main>

        <aside className="vocabulary-progress-card card">
          <span className={`mastery ${progress?.mastery ?? 'new'}`}>
            {progress?.mastery ?? 'new'}
          </span>
          <h2>Tiến độ</h2>
          <dl>
            <div>
              <dt>Practice active</dt>
              <dd>{activePractice}</dd>
            </div>
            <div>
              <dt>Đã luyện</dt>
              <dd>{progress?.practiceCount ?? 0}</dd>
            </div>
            <div>
              <dt>Dùng đúng target</dt>
              <dd>{progress?.targetUsageCorrectCount ?? 0}</dd>
            </div>
            <div>
              <dt>Đúng lần đầu</dt>
              <dd>{progress?.firstTryCorrectCount ?? 0}</dd>
            </div>
          </dl>
          {!progress ? (
            <button
              className="btn btn-secondary"
              onClick={() => store.addVocabulary(entry.id, entry.sourceTopicIds[0])}
            >
              <BookPlus size={17} /> Thêm vào My Vocabulary
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() =>
                entry.custom ? setDeleteDialog(true) : store.removeVocabulary(entry.id)
              }
            >
              {entry.custom ? <Trash2 size={17} /> : <BookMinus size={17} />}
              {entry.custom ? 'Xóa từ' : 'Remove from My Vocabulary'}
            </button>
          )}
          <Link
            className={`btn btn-primary ${activePractice ? '' : 'disabled'}`}
            aria-disabled={!activePractice}
            to={
              activePractice
                ? `/vocabulary/${encodeURIComponent(entry.id)}/practice?sense=${encodeURIComponent(sense?.id ?? '')}`
                : '#'
            }
          >
            <Play size={17} /> Luyện từ này
          </Link>
        </aside>
      </div>

      {deleteDialog && (
        <div className="dialog-backdrop" role="presentation">
          <section
            className="confirm-dialog card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-vocabulary-title"
          >
            <h2 id="delete-vocabulary-title">Xóa “{entry.term}”?</h2>
            <p>
              Bạn có muốn xóa “{entry.term}” cùng toàn bộ bài luyện và tiến độ của từ này không?
            </p>
            <div className="inline-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteDialog(false)}>
                Hủy
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  store.deleteCustomVocabulary(entry.id);
                  navigate('/vocabulary');
                }}
              >
                Xóa từ và progress
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
