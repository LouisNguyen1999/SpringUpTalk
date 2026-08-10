import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TopicsPage from '../pages/TopicsPage';
import { normalizeSearchText } from '../utils/search';
import { topicManifest } from '../data/content-repository';

describe('Topic Browser with expanded content', () => {
  it('normalizes punctuation and Vietnamese diacritics', () => {
    expect(normalizeSearchText('Wi-Fi')).toBe('wi fi');
    expect(normalizeSearchText('Đà Lạt')).toBe('da lat');
    expect(normalizeSearchText('cà phê')).toBe('ca phe');
    expect(normalizeSearchText('TP.HCM')).toBe('tp hcm');
  });
  it('searches and filters the data-driven topic manifest', () => {
    render(<MemoryRouter><TopicsPage /></MemoryRouter>);

    expect(screen.getByText(`${topicManifest.length} chủ đề`)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Lọc danh mục'), { target: { value:'Technology' } });
    expect(screen.getByText(`${topicManifest.filter((topic) => topic.category === 'Technology').length} chủ đề`)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Tìm chủ đề'), { target: { value:'wifi' } });
    expect(screen.getByRole('heading', { name: 'Wi-Fi Problem' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Laptop Problem' })).not.toBeInTheDocument();
  });
});
