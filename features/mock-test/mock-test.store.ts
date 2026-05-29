'use client';

import { create } from 'zustand';
import type { Question } from '@/types/quiz';

export interface MockTestResult {
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
    score: number;          // after negative marking
    maxScore: number;
    timeTaken: number;      // seconds used
    xpEarned: number;
    answers: Record<string, string>;
    questions: Question[];
}

interface MockTestStore {
    quizId: string;
    quizTitle: string;
    questions: Question[];
    answers: Record<string, string>;    // questionId → chosen optionId
    timeRemaining: number;              // seconds
    totalTime: number;                  // seconds
    status: 'idle' | 'active' | 'finished';
    result: MockTestResult | null;
    negativeMarkValue: number;

    startTest: (quizId: string, quizTitle: string, questions: Question[], durationMinutes: number, negativeMarkValue?: number) => void;
    selectOption: (questionId: string, optionId: string) => void;
    decrementTimer: () => void;
    finishTest: () => void;
    resetTest: () => void;
}

export const useMockTestStore = create<MockTestStore>((set, get) => ({
    quizId: '',
    quizTitle: '',
    questions: [],
    answers: {},
    timeRemaining: 0,
    totalTime: 0,
    status: 'idle',
    result: null,
    negativeMarkValue: 0.25,

    startTest: (quizId, quizTitle, questions, durationMinutes, negativeMarkValue = 0.25) => {
        const totalSeconds = durationMinutes * 60;
        set({
            quizId,
            quizTitle,
            questions,
            answers: {},
            timeRemaining: totalSeconds,
            totalTime: totalSeconds,
            status: 'active',
            result: null,
            negativeMarkValue,
        });
    },

    // lockOnce — only records the first selection per question
    selectOption: (questionId, optionId) => {
        const { answers } = get();
        if (answers[questionId] !== undefined) return;
        set((s) => ({ answers: { ...s.answers, [questionId]: optionId } }));
    },

    decrementTimer: () => set((s) => ({ timeRemaining: Math.max(0, s.timeRemaining - 1) })),

    finishTest: () => {
        const { questions, answers, negativeMarkValue, totalTime, timeRemaining, status } = get();
        if (status === 'finished') return;

        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;

        questions.forEach((q) => {
            const selectedId = answers[q.id];
            if (!selectedId) {
                unanswered++;
            } else if (q.options.find((o) => o.id === selectedId)?.isCorrect) {
                correct++;
            } else {
                incorrect++;
            }
        });

        const score = Math.max(0, correct - incorrect * negativeMarkValue);

        set({
            status: 'finished',
            result: {
                correct,
                incorrect,
                unanswered,
                total: questions.length,
                score,
                maxScore: questions.length,
                timeTaken: totalTime - timeRemaining,
                xpEarned: correct * 5,
                answers: { ...answers },
                questions: [...questions],
            },
        });
    },

    resetTest: () =>
        set({
            quizId: '',
            quizTitle: '',
            questions: [],
            answers: {},
            timeRemaining: 0,
            totalTime: 0,
            status: 'idle',
            result: null,
            negativeMarkValue: 0.25,
        }),
}));
