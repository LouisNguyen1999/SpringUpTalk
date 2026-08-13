import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TopicPage from '../pages/TopicPage';
import LessonPage from '../pages/LessonPage';
import { loadTopic } from '../data/content-repository';

vi.mock('../data/content-repository', () => ({
  loadTopic:vi.fn(),
}));

describe('offline content fallbacks', () => {
  beforeEach(() => {
    vi.mocked(loadTopic).mockRejectedValue(new Error('simulated offline cache miss'));
  });

  it('shows a useful message instead of a blank topic page for uncached content', async () => {
    render(<MemoryRouter initialEntries={['/topics/new-topic']}><Routes><Route path="/topics/:topicId" element={<TopicPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByRole('heading',{name:'Chủ đề này chưa có trong bộ nhớ ngoại tuyến'})).toBeInTheDocument();
    expect(screen.getByRole('link',{name:'Về thư viện'})).toBeInTheDocument();
  });

  it('shows a useful message instead of a blank lesson for uncached content', async () => {
    render(<MemoryRouter initialEntries={['/lesson/new-topic/new-conversation']}><Routes><Route path="/lesson/:topicId/:conversationId" element={<LessonPage />} /></Routes></MemoryRouter>);
    expect(await screen.findByRole('heading',{name:'Nội dung chưa được lưu ngoại tuyến'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'Về thư viện'})).toBeInTheDocument();
  });
});
