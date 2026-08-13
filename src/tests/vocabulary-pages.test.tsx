import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddCustomVocabularyPage from '../pages/AddCustomVocabularyPage';
import VocabularyDetailPage from '../pages/VocabularyDetailPage';
import VocabularyPage from '../pages/VocabularyPage';
import VocabularyPracticePage from '../pages/VocabularyPracticePage';
import { defaultProgress, useProgressStore } from '../store/progress-store';

describe('vocabulary pages', () => {
  beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState(defaultProgress);
  });

  it('searches the offline repository and offers honest custom entry for unknown terms', () => {
    const { unmount } = render(
      <MemoryRouter>
        <VocabularyPage />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText('Tìm một từ hoặc cụm từ'), {
      target: { value: 'deadline' },
    });
    expect(screen.getByRole('link', { name: 'deadline' })).toBeInTheDocument();
    unmount();

    render(
      <MemoryRouter>
        <VocabularyPage />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText('Tìm một từ hoặc cụm từ'), {
      target: { value: 'not-a-real-offline-term-xyz' },
    });
    expect(screen.getByText('Từ này chưa có trong từ điển offline.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Thêm từ thủ công/ })).toBeInTheDocument();
  });

  it('makes Vocabulary Practice and direct practice starters visible immediately', () => {
    render(
      <MemoryRouter>
        <VocabularyPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Vocabulary Practice' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bắt đầu luyện ngay' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Luyện ngay/ })).toHaveLength(6);
  });

  it('renders multiple senses and sourced usage on the detail page', async () => {
    render(
      <MemoryRouter initialEntries={['/vocabulary/vocab%3Aissue']}>
        <Routes>
          <Route path="/vocabulary/:vocabularyId" element={<VocabularyDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'issue' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Nghĩa 1 · noun/ })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Nghĩa 2 · verb/ })).toBeInTheDocument();
    expect(screen.getByText('Collocations hữu ích')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Mở chủ đề nguồn' }).length).toBeGreaterThan(0);
  });

  it('creates a custom entry without inventing a translation', async () => {
    render(
      <MemoryRouter initialEntries={['/vocabulary/custom?term=latency']}>
        <Routes>
          <Route path="/vocabulary/custom" element={<AddCustomVocabularyPage />} />
          <Route path="/vocabulary/:vocabularyId" element={<VocabularyDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText('Vietnamese meaning'), {
      target: { value: 'độ trễ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Lưu từ/ }));
    expect(await screen.findByRole('heading', { name: 'latency' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'độ trễ' })).toBeInTheDocument();
    expect(useProgressStore.getState().customVocabulary).toHaveLength(1);
  });

  it('blocks canonical duplicates across case, hyphens and whitespace', () => {
    useProgressStore.getState().addCustomVocabulary({
      id: 'custom:lookforwardto',
      term: 'look forward to',
      normalizedTerm: 'look forward to',
      type: 'phrasal-verb',
      meanings: [{ id: 'custom:lookforwardto:sense-1', meaning: 'mong chờ' }],
      collocations: [],
      phrases: [],
      wordFamily: [],
      synonyms: [],
      antonyms: [],
      examples: [],
      tags: ['Custom'],
      sourceTopicIds: [],
      custom: true,
    });
    render(
      <MemoryRouter initialEntries={['/vocabulary/custom?term=LOOK-forward%20%20to']}>
        <Routes>
          <Route path="/vocabulary/custom" element={<AddCustomVocabularyPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('“look forward to” đã tồn tại.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tra cứu online/ })).toBeDisabled();
  });

  it('shows the manual fallback when adding vocabulary offline', () => {
    const online = vi.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(false);
    render(
      <MemoryRouter initialEntries={['/vocabulary/custom?term=run%20late']}>
        <Routes>
          <Route path="/vocabulary/custom" element={<AddCustomVocabularyPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/Bạn đang offline\. Có thể thêm nghĩa và câu luyện thủ công/),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tra cứu online/ })).toBeDisabled();
    expect(screen.getByLabelText('Vietnamese meaning')).toBeEnabled();
    online.mockRestore();
  });

  it('starts a five-item practice session and supports unlimited retry', async () => {
    render(
      <MemoryRouter initialEntries={['/vocabulary/vocab%3Adeadline/practice']}>
        <Routes>
          <Route path="/vocabulary/:vocabularyId/practice" element={<VocabularyPracticePage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole('heading', { name: 'Luyện “deadline”' }, { timeout: 10_000 }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu luyện/ }));
    expect(screen.getByText('Practice 1 / 5')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('YOUR ENGLISH'), {
      target: { value: 'I do not know.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
    expect(screen.getByRole('heading', { name: 'Chưa đúng lắm' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Thử lại/ }));
    expect(screen.getByLabelText('YOUR ENGLISH')).toHaveValue('');
    expect(screen.getByText('Practice 1 / 5')).toBeInTheDocument();
  });

  it('includes a custom generic practice item when the detail link selects a sense', async () => {
    useProgressStore.getState().addCustomVocabulary({
      id: 'custom:offlinelatency',
      term: 'offline-latency',
      normalizedTerm: 'offline latency',
      type: 'expression',
      meanings: [{ id: 'custom:offlinelatency:sense-1', meaning: 'độ trễ ngoại tuyến' }],
      collocations: [],
      phrases: [],
      wordFamily: [],
      synonyms: [],
      antonyms: [],
      examples: [],
      tags: ['Custom'],
      sourceTopicIds: [],
      custom: true,
    });
    useProgressStore.getState().addCustomVocabularyPractice({
      id: 'custom-practice:offlinelatency:1',
      vocabularyId: 'custom:offlinelatency',
      vietnamese: 'Độ trễ đang quá cao.',
      canonicalAnswer: 'The offline-latency is too high.',
      acceptedAnswers: ['The offline-latency is too high.'],
      naturalAlternatives: [],
      targetExpressions: ['offline-latency'],
      grammarFocus: [],
      level: 'A2',
      custom: true,
    });
    render(
      <MemoryRouter
        initialEntries={[
          '/vocabulary/custom%3Aofflinelatency/practice?sense=custom%3Aofflinelatency%3Asense-1',
        ]}
      >
        <Routes>
          <Route path="/vocabulary/:vocabularyId/practice" element={<VocabularyPracticePage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole('heading', { name: 'Luyện “offline-latency”' }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Bắt đầu luyện/ }));
    expect(screen.getByText('Practice 1 / 1')).toBeInTheDocument();
  });
});
