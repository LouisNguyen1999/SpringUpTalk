import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PracticeBankEditor } from '../components/vocabulary/PracticeBankEditor';
import type { VocabularyPracticeItem } from '../types/domain';

const practice: VocabularyPracticeItem = {
  id: 'custom-practice:runlate:1',
  vocabularyId: 'custom:runlate',
  vietnamese: 'Tôi có thể đến trễ.',
  canonicalAnswer: 'I might run late.',
  acceptedAnswers: ['I might run late.'],
  naturalAlternatives: [],
  targetExpressions: ['run late'],
  grammarFocus: [],
  context: 'Daily life',
  level: 'A2',
  custom: true,
};

describe('practice bank editor', () => {
  it('edits an exercise and validates it through the vocabulary evaluator', () => {
    const onSave = vi.fn();
    render(
      <PracticeBankEditor
        vocabularyId="custom:runlate"
        term="run late"
        rows={[{ item: practice, disabled: false, local: true }]}
        onSave={onSave}
        onDelete={vi.fn()}
        onToggleDisabled={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText('Tôi có thể đến trễ.'));
    fireEvent.click(screen.getByRole('button', { name: /Edit/ }));
    fireEvent.change(screen.getByLabelText('Vietnamese prompt'), {
      target: { value: 'Hôm nay tôi có thể đến trễ.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu câu luyện' }));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        id: practice.id,
        vietnamese: 'Hôm nay tôi có thể đến trễ.',
        edited: true,
      }),
    );
  });

  it('exposes disable and delete controls for a local generated exercise', () => {
    const onDelete = vi.fn();
    const onToggleDisabled = vi.fn();
    render(
      <PracticeBankEditor
        vocabularyId="custom:runlate"
        term="run late"
        rows={[{ item: practice, disabled: false, local: true }]}
        onSave={vi.fn()}
        onDelete={onDelete}
        onToggleDisabled={onToggleDisabled}
      />,
    );
    fireEvent.click(screen.getByText('Tôi có thể đến trễ.'));
    fireEvent.click(screen.getByRole('button', { name: /Disable/ }));
    fireEvent.click(screen.getByRole('button', { name: /Delete/ }));
    expect(onToggleDisabled).toHaveBeenCalledWith(practice.id);
    expect(onDelete).toHaveBeenCalledWith(practice);
  });
});
