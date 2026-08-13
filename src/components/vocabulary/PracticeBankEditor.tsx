import { Eye, EyeOff, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { evaluateVocabularyAnswer } from '../../engine/vocabulary-evaluator';
import type { PracticeBankRow } from '../../data/vocabulary/vocabulary-practice-bank';
import type { Difficulty, VocabularyPracticeItem } from '../../types/domain';

interface Draft {
  vietnamese: string;
  canonicalAnswer: string;
  acceptedAnswers: string;
  naturalAlternatives: string;
  targetExpression: string;
  context: string;
  level: Difficulty;
}

function draftFor(item?: VocabularyPracticeItem, target = ''): Draft {
  return {
    vietnamese: item?.vietnamese ?? '',
    canonicalAnswer: item?.canonicalAnswer ?? '',
    acceptedAnswers: (item?.acceptedAnswers ?? []).join('\n'),
    naturalAlternatives: (item?.naturalAlternatives ?? []).join('\n'),
    targetExpression: item?.targetExpressions[0] ?? target,
    context: item?.context ?? '',
    level: item?.level ?? 'A2',
  };
}

function lines(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

export function PracticeBankEditor({
  vocabularyId,
  term,
  rows,
  onSave,
  onDelete,
  onToggleDisabled,
}: {
  vocabularyId: string;
  term: string;
  rows: PracticeBankRow[];
  onSave: (item: VocabularyPracticeItem) => void;
  onDelete: (item: VocabularyPracticeItem) => void;
  onToggleDisabled: (id: string) => void;
}) {
  const [editing, setEditing] = useState<VocabularyPracticeItem | 'new'>();
  const [draft, setDraft] = useState(() => draftFor(undefined, term));
  const [error, setError] = useState('');
  const open = (item?: VocabularyPracticeItem) => {
    setEditing(item ?? 'new');
    setDraft(draftFor(item, term));
    setError('');
  };
  const close = () => {
    setEditing(undefined);
    setError('');
  };
  const save = () => {
    const canonicalAnswer = draft.canonicalAnswer.trim();
    const acceptedAnswers = Array.from(new Set([canonicalAnswer, ...lines(draft.acceptedAnswers)]));
    const targetExpressions = [draft.targetExpression.trim()].filter(Boolean);
    if (!draft.vietnamese.trim() || !canonicalAnswer || !targetExpressions.length) {
      setError('Tiếng Việt, canonical answer và target expression là bắt buộc.');
      return;
    }
    const original = editing === 'new' ? undefined : editing;
    const item: VocabularyPracticeItem = {
      ...original,
      id: original?.id ?? `custom-practice:${vocabularyId.replace(/^[^:]+:/, '')}:${Date.now()}`,
      vocabularyId,
      vietnamese: draft.vietnamese.trim(),
      canonicalAnswer,
      acceptedAnswers,
      naturalAlternatives: lines(draft.naturalAlternatives),
      targetExpressions,
      grammarFocus: original?.grammarFocus ?? [],
      context: draft.context.trim() || undefined,
      level: draft.level,
      custom: true,
      edited: Boolean(original),
    };
    const canonical = evaluateVocabularyAnswer(canonicalAnswer, item);
    const acceptedPass = acceptedAnswers.every(
      (answer) => evaluateVocabularyAnswer(answer, item).status === 'correct-target',
    );
    if (canonical.status !== 'correct-target' || !acceptedPass) {
      setError('Câu chưa vượt qua evaluator hoặc chưa dùng đúng target expression.');
      return;
    }
    onSave(item);
    close();
  };

  return (
    <section className="practice-bank-section" aria-labelledby="practice-bank-heading">
      <div className="section-heading">
        <div>
          <h2 id="practice-bank-heading">Practice sentences</h2>
          <span>
            {rows.filter((row) => !row.disabled).length} active · {rows.length} total
          </span>
        </div>
        <button className="btn btn-secondary" onClick={() => open()}>
          <Plus size={16} /> Add Practice Sentence
        </button>
      </div>
      {editing && (
        <div className="card practice-editor form-stack">
          <header>
            <h3>{editing === 'new' ? 'Thêm câu luyện' : 'Sửa câu luyện'}</h3>
            <button className="icon-btn" aria-label="Đóng trình sửa" onClick={close}>
              <X size={18} />
            </button>
          </header>
          <label>
            Vietnamese prompt
            <textarea
              value={draft.vietnamese}
              onChange={(event) => setDraft({ ...draft, vietnamese: event.target.value })}
            />
          </label>
          <label>
            Canonical answer
            <textarea
              value={draft.canonicalAnswer}
              onChange={(event) => setDraft({ ...draft, canonicalAnswer: event.target.value })}
            />
          </label>
          <label>
            Accepted answers · mỗi câu một dòng
            <textarea
              value={draft.acceptedAnswers}
              onChange={(event) => setDraft({ ...draft, acceptedAnswers: event.target.value })}
            />
          </label>
          <label>
            Natural alternatives · mỗi câu một dòng
            <textarea
              value={draft.naturalAlternatives}
              onChange={(event) => setDraft({ ...draft, naturalAlternatives: event.target.value })}
            />
          </label>
          <div className="practice-editor-row">
            <label>
              Target expression
              <input
                value={draft.targetExpression}
                onChange={(event) => setDraft({ ...draft, targetExpression: event.target.value })}
              />
            </label>
            <label>
              Level
              <select
                value={draft.level}
                onChange={(event) =>
                  setDraft({ ...draft, level: event.target.value as Difficulty })
                }
              >
                {['A1', 'A2', 'B1', 'B2'].map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Context
            <input
              value={draft.context}
              onChange={(event) => setDraft({ ...draft, context: event.target.value })}
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary" onClick={save}>
            Lưu câu luyện
          </button>
        </div>
      )}
      <div className="practice-bank-list">
        {rows.map(({ item, disabled, local }, index) => (
          <details
            className={`card practice-bank-item ${disabled ? 'disabled' : ''}`}
            key={item.id}
          >
            <summary>
              <span>{index + 1}</span>
              <div>
                <b>{item.vietnamese}</b>
                <small>
                  {item.context ?? 'General'} · {item.level} ·{' '}
                  {item.generated ? 'Generated' : local ? 'Edited' : 'Static'}
                </small>
              </div>
              <span className="tag">{disabled ? 'Disabled' : 'Active'}</span>
            </summary>
            <div className="practice-bank-content">
              <p>
                <small>CANONICAL</small>
                {item.canonicalAnswer}
              </p>
              <p>
                <small>TARGET</small>
                {item.targetExpressions.join(' / ')}
              </p>
              {item.acceptedAnswers.length > 1 && (
                <p>
                  <small>ACCEPTED</small>
                  {item.acceptedAnswers.slice(1).join(' · ')}
                </p>
              )}
              <div className="practice-bank-actions">
                <button className="btn btn-ghost" onClick={() => open(item)}>
                  <Pencil size={15} /> Edit
                </button>
                <button className="btn btn-ghost" onClick={() => onToggleDisabled(item.id)}>
                  {disabled ? <Eye size={15} /> : <EyeOff size={15} />}{' '}
                  {disabled ? 'Enable' : 'Disable'}
                </button>
                {local &&
                  (item.generated ||
                    item.id.startsWith('custom-practice:') ||
                    item.id.startsWith('generated-practice:')) && (
                  <button className="btn btn-danger" onClick={() => onDelete(item)}>
                    <Trash2 size={15} /> Delete
                  </button>
                  )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
