import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ITEnglishPage from '../pages/ITEnglishPage';
import ITEnglishTopicPage from '../pages/ITEnglishTopicPage';
import { itEnglishTopics } from '../data/it-english/curriculum';
import { defaultProgress, useProgressStore } from '../store/progress-store';

beforeEach(() => {
  localStorage.clear();
  useProgressStore.setState(defaultProgress);
});

afterEach(() => {
  Reflect.deleteProperty(window, 'SpeechRecognition');
  Reflect.deleteProperty(window, 'webkitSpeechRecognition');
});

function installSpeechRecognition(result: string | undefined, error?: string) {
  class MockRecognition {
    lang = '';
    interimResults = false;
    maxAlternatives = 1;
    onresult: ((event: never) => void) | null = null;
    onerror: ((event: { error: string }) => void) | null = null;
    onend: (() => void) | null = null;
    start() {
      if (error) this.onerror?.({ error });
      else this.onresult?.({ results: [[{ transcript: result ?? '' }]] } as never);
    }
    stop() {}
  }
  Object.defineProperty(window, 'SpeechRecognition', { configurable: true, value: MockRecognition });
}

describe('IT English practice screens', () => {
  it('shows all 30 topics with only the first one available initially', () => {
    render(<MemoryRouter><ITEnglishPage /></MemoryRouter>);
    expect(screen.getByText('0 / 30 topics completed')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: itEnglishTopics[0]!.title })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /start practice/i })).toHaveLength(1);
    expect(screen.getAllByText('Locked')).toHaveLength(29);
  });

  it('renders Vietnamese prompts and speaker roles without exposing unrevealed English', () => {
    render(<MemoryRouter initialEntries={[`/it-english/${itEnglishTopics[0]!.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    const topic = itEnglishTopics[0]!;
    expect(screen.getByRole('heading', { name: topic.title })).toBeInTheDocument();
    expect(screen.getAllByText('Maya')).toHaveLength(4);
    for (const turn of topic.turns) expect(document.body.textContent).not.toContain(turn.text);
    expect(screen.getAllByText(topic.turns[0]!.vietnamese)).toHaveLength(2);
    expect(screen.getByText('Sentence 1 of 8')).toBeInTheDocument();
  });

  it('lets a learner retry writing, pass a sentence, then unlock the next one', async () => {
    const user = userEvent.setup();
    const first = itEnglishTopics[0]!;
    render(<MemoryRouter initialEntries={[`/it-english/${first.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('tab', { name: 'Writing' }));
    const input = screen.getByLabelText('Type the English sentence');
    expect(document.body.textContent).not.toContain(first.turns[0]!.text);
    await user.type(input, 'Hello Maya');
    await user.click(screen.getByRole('button', { name: /check sentence/i }));
    expect(screen.getByText('Try once more')).toBeInTheDocument();
    expect(screen.getByText(/check the word order/i)).toBeInTheDocument();
    expect(document.body.textContent).not.toContain(first.turns[0]!.text);
    await user.clear(input);
    await user.type(input, first.turns[0]!.text);
    await user.click(screen.getByRole('button', { name: /check sentence/i }));
    expect(await screen.findByText('Sentence passed')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next sentence/i }));
    expect(screen.getByText('Sentence 2 of 8')).toBeInTheDocument();
    expect(useProgressStore.getState().itEnglishProgress[first.id]?.sentences[first.turns[0]!.id]?.passed).toBe(true);
    expect(document.body.textContent).toContain(first.turns[0]!.text);
  });

  it('shares two hidden failures across modes and reveals on the third evaluated failure', async () => {
    const user = userEvent.setup();
    const first = itEnglishTopics[0]!;
    render(<MemoryRouter initialEntries={[`/it-english/${first.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('tab', { name: 'Writing' }));
    const input = screen.getByLabelText('Type the English sentence');
    await user.type(input, 'wrong words');
    await user.click(screen.getByRole('button', { name: /check sentence/i }));
    expect(screen.getByText('Lần thử: 1/3')).toBeInTheDocument();
    expect(document.body.textContent).not.toContain(first.turns[0]!.text);

    await user.click(screen.getByRole('tab', { name: 'Speaking' }));
    await user.click(screen.getByRole('tab', { name: 'Writing' }));
    const retryInput = screen.getByLabelText('Type the English sentence');
    await user.type(retryInput, 'still wrong');
    await user.click(screen.getByRole('button', { name: /check sentence/i }));
    expect(screen.getByText('Lần thử: 2/3')).toBeInTheDocument();
    expect(document.body.textContent).not.toContain(first.turns[0]!.text);

    await user.clear(retryInput);
    await user.type(retryInput, 'third wrong');
    await user.click(screen.getByRole('button', { name: /check sentence/i }));
    expect(screen.getByText('Answer revealed')).toBeInTheDocument();
    expect(document.body.textContent).toContain(first.turns[0]!.text);
    expect(useProgressStore.getState().itEnglishProgress[first.id]?.sentences[first.turns[0]!.id]).toMatchObject({ attemptCount: 3, passed: false, revealedAfterLimit: true });
    await user.click(screen.getByRole('button', { name: /next sentence/i }));
    expect(screen.getByText('Sentence 2 of 8')).toBeInTheDocument();
  });

  it('does not count an empty writing submission', async () => {
    const user = userEvent.setup();
    const first = itEnglishTopics[0]!;
    render(<MemoryRouter initialEntries={[`/it-english/${first.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('tab', { name: 'Writing' }));
    expect(screen.getByRole('button', { name: /check sentence/i })).toBeDisabled();
    expect(useProgressStore.getState().itEnglishProgress).toEqual({});
    expect(document.body.textContent).not.toContain(first.turns[0]!.text);
  });

  it('counts and reveals a passing speech transcript on the first evaluated submission', async () => {
    const user = userEvent.setup();
    const first = itEnglishTopics[0]!;
    installSpeechRecognition(first.turns[0]!.text);
    render(<MemoryRouter initialEntries={[`/it-english/${first.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: /start speaking/i }));
    expect(await screen.findByText('Sentence passed')).toBeInTheDocument();
    expect(document.body.textContent).toContain(first.turns[0]!.text);
    expect(useProgressStore.getState().itEnglishProgress[first.id]?.sentences[first.turns[0]!.id]).toMatchObject({ attemptCount: 1, passed: true });
  });

  it('does not count an empty speech transcript or a recognition error', async () => {
    const user = userEvent.setup();
    const first = itEnglishTopics[0]!;
    installSpeechRecognition('');
    render(<MemoryRouter initialEntries={[`/it-english/${first.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: /start speaking/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/did not count as an attempt/i);
    expect(useProgressStore.getState().itEnglishProgress).toEqual({});
    expect(document.body.textContent).not.toContain(first.turns[0]!.text);
    installSpeechRecognition(undefined, 'network');
    await user.click(screen.getByRole('button', { name: /start speaking/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not complete/i);
    expect(useProgressStore.getState().itEnglishProgress).toEqual({});
  });

  it('explains when speech recognition is unavailable and keeps Writing available', async () => {
    render(<MemoryRouter initialEntries={[`/it-english/${itEnglishTopics[0]!.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    expect(screen.getByText(/speech recognition is unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Writing' })).toBeEnabled();
  });

  it('does not allow opening a later topic before completing its prerequisite', () => {
    const second = itEnglishTopics[1]!;
    render(<MemoryRouter initialEntries={[`/it-english/${second.id}`]}><Routes><Route path="/it-english/:topicId" element={<ITEnglishTopicPage />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'This topic is locked' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Writing' })).not.toBeInTheDocument();
  });
});
