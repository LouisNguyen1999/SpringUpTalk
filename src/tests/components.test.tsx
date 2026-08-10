import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AnswerInput } from '../components/conversation/AnswerInput';
import { FeedbackPanel } from '../components/feedback/FeedbackPanel';
import { LessonSummary } from '../components/conversation/LessonSummary';
import { MemoryRouter } from 'react-router-dom';

describe('AnswerInput', () => it('labels the required translation direction', () => { render(<AnswerInput value="" onChange={vi.fn()} onSubmit={vi.fn()} onHint={vi.fn()} onShowAnswer={vi.fn()} hintLevel={0} />); expect(screen.getByText('YOUR ENGLISH')).toBeInTheDocument(); expect(screen.getByLabelText('Câu trả lời bằng tiếng Anh')).toBeInTheDocument(); }));

describe('FeedbackPanel', () => it('renders a correction and retry action', () => { render(<FeedbackPanel xp={0} canRetry result={{status:'incorrect',score:50,userAnswer:'How you go?',canonicalAnswer:'How do you go?',mistakes:[],explanation:['Cần trợ động từ do.'],suggestions:[],naturalAlternatives:[]}} onNext={vi.fn()} onRetry={vi.fn()} />); expect(screen.getByText('Chưa đúng lắm')).toBeInTheDocument(); expect(screen.getByText('Thử lại')).toBeInTheDocument(); expect(screen.getByText('Cần trợ động từ do.')).toBeInTheDocument(); }));

describe('LessonSummary', () => it('shows role completion without claiming conversation completion', () => {
  render(<MemoryRouter><LessonSummary stats={{total:3,correctFirstTry:2,grammarMistakes:1,vocabularyMistakes:0,scoreTotal:270,xpEarned:45,wordsLearned:3}} topicId="topic-1" conversationId="conversation-1" role="A" progress={{conversationId:'conversation-1',topicId:'topic-1',roles:{A:{attempts:1,completedAt:'2026-08-10T00:00:00.000Z'},B:{attempts:0}}}} outcome={{roleWasNew:true,conversationCompleted:false,conversationWasNew:false,topicCompleted:false,completionXp:20,rolesCompleted:1}} onRestart={vi.fn()} onPracticeOther={vi.fn()} /></MemoryRouter>);
  expect(screen.getByText('Role A completed')).toBeInTheDocument();
  expect(screen.queryByText('Conversation complete')).not.toBeInTheDocument();
  expect(screen.getByRole('button',{name:/Luyện Person B/})).toBeInTheDocument();
  expect(screen.getByText('1 / 2 vai')).toBeInTheDocument();
}));
