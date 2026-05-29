import type { ExamId } from '@/config/exams';

export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    text: string;
    options: Option[];
    explanation?: string;
    subjectId?: string;
    subject?: string;
    topic?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface QuizSession {
    id: string;
    examId: ExamId;
    subject?: string;
    questions: Question[];
    currentIndex: number;
    answers: Record<string, string>;
    startedAt: number;
    timeLimit?: number;
    status: 'idle' | 'active' | 'completed';
    answerMode: 'editable' | 'lockOnce';
}

export interface QuizResult {
    sessionId: string;
    total: number;
    correct: number;
    incorrect: number;
    skipped: number;
    timeTaken: number;
    xpEarned: number;
    accuracy: number;
}
