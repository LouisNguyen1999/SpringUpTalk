import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TopicsPage from '../pages/TopicsPage';
import { normalizeSearchText, searchIndexMatches } from '../utils/search';
import { topicManifest } from '../data/content-repository';

describe('Topic Browser with expanded content', () => {
  it('normalizes punctuation and Vietnamese diacritics', () => {
    expect(normalizeSearchText('Wi-Fi')).toBe('wi fi');
    expect(normalizeSearchText('Đà Lạt')).toBe('da lat');
    expect(normalizeSearchText('cà phê')).toBe('ca phe');
    expect(normalizeSearchText('TP.HCM')).toBe('tp hcm');
    expect(normalizeSearchText('máy lạnh')).toBe('may lanh');
    expect(normalizeSearchText('tiền điện')).toBe('tien dien');
    expect(searchIndexMatches(normalizeSearchText('Đổi điểm đón · Transportation · requests'),'doi diem don')).toBe(true);
  });
  it('keeps a precomputed search index in the lightweight manifest', () => {
    expect(topicManifest.every((topic) => topic.searchText && !('conversations' in topic))).toBe(true);
    expect(topicManifest.find((topic) => topic.id === 'wifi-problem')?.searchText).toContain('wifi');
    expect(topicManifest.find((topic) => topic.id === 'explaining-a-release-delay')?.searchText).toContain('deadline');
    expect(topicManifest.find((topic) => topic.id === 'negotiating-apartment-damage-responsibility')?.searchText).toContain('landlord');
    expect(topicManifest.find((topic) => topic.id === 'asking-about-a-rental-deposit')?.searchText).toContain('security deposit');
    expect(topicManifest.find((topic) => topic.id === 'planning-tet-travel')?.searchText).toContain('tet travel');
    expect(topicManifest.find((topic) => topic.id === 'reporting-a-broken-elevator')?.searchText).toContain('thang may');
    expect(topicManifest.find((topic) => topic.id === 'negotiating-family-care-boundaries')?.searchText).toContain('ranh gioi');
    expect(topicManifest.find((topic) => topic.id === 'asking-someone-to-call-back')?.searchText).toContain('goi lai');
    expect(topicManifest.find((topic) => topic.id === 'asking-about-a-wedding-dress-code')?.searchText).toContain('dam cuoi');
    expect(topicManifest.find((topic) => topic.id === 'changing-a-workout-schedule')?.searchText).toContain('phong gym');
    expect(topicManifest.find((topic) => topic.id === 'rebooking-a-missed-connection')?.searchText).toContain('tre chuyen bay');
    expect(topicManifest.find((topic) => topic.id === 'pushing-back-on-an-urgent-request')?.searchText).toContain('rui ro');
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
