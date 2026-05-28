'use client';

import { create } from 'zustand';
import type { Question, QuizSession, QuizResult } from './types';
import type { ExamId } from '@/config/exams';

interface QuizStore {
    session: QuizSession | null;
    result: QuizResult | null;
    startQuiz: (examId: ExamId, questions: Question[], timeLimit?: number) => void;
    answerQuestion: (questionId: string, optionId: string) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    finishQuiz: () => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
    session: null,
    result: null,

    startQuiz: (examId, questions, timeLimit) =>
        set({
            session: {
                id: Date.now().toString(),
                examId,
                questions,
                currentIndex: 0,
                answers: {},
                startedAt: Date.now(),
                timeLimit,
                status: 'active',
            },
            result: null,
        }),

    answerQuestion: (questionId, optionId) =>
        set((s) => {
            if (!s.session) return s;
            return {
                session: {
                    ...s.session,
                    answers: { ...s.session.answers, [questionId]: optionId },
                },
            };
        }),

    nextQuestion: () =>
        set((s) => {
            if (!s.session) return s;
            const next = Math.min(s.session.currentIndex + 1, s.session.questions.length - 1);
            return { session: { ...s.session, currentIndex: next } };
        }),

    prevQuestion: () =>
        set((s) => {
            if (!s.session) return s;
            const prev = Math.max(s.session.currentIndex - 1, 0);
            return { session: { ...s.session, currentIndex: prev } };
        }),

    finishQuiz: () => {
        const { session } = get();
        if (!session) return;

        let correct = 0;
        session.questions.forEach((q) => {
            const chosen = session.answers[q.id];
            if (chosen && q.options.find((o) => o.id === chosen)?.isCorrect) correct++;
        });

        const total = session.questions.length;
        const answered = Object.keys(session.answers).length;
        const timeTaken = Math.round((Date.now() - session.startedAt) / 1000);

        set({
            session: { ...session, status: 'completed' },
            result: {
                sessionId: session.id,
                total,
                correct,
                incorrect: answered - correct,
                skipped: total - answered,
                timeTaken,
                xpEarned: correct * 5,
                accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
            },
        });
    },

    resetQuiz: () => set({ session: null, result: null }),
}));
