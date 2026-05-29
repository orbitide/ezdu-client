'use client';

import { create } from 'zustand';
import type { Question } from '@/types/quiz';

const MILESTONE_STREAKS = new Set([3, 5, 10]);

export interface PlanConfig {
    lessonId: number;
    dayNumber: number;
    subjectId: number;
}

interface ChallengeStore {
    questions: Question[];
    currentIndex: number;
    status: 'idle' | 'answered_correct' | 'answered_wrong' | 'finished';
    wrongOptionIds: string[];
    currentStreak: number;
    maxStreak: number;
    startedAt: number | null;
    timeTaken: number | null;
    correct: number;
    subjectName: string;
    lessonName: string;
    celebrationStreak: number | null;
    selectedAnswers: Record<string, string>;
    planMode: boolean;
    planConfig: PlanConfig | null;

    startChallenge: (questions: Question[], subjectName: string, lessonName: string, plan?: PlanConfig) => void;
    selectOption: (optionId: string, isCorrect: boolean) => void;
    nextQuestion: () => void;
    dismissCelebration: () => void;
    resetChallenge: () => void;
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
    questions: [],
    currentIndex: 0,
    status: 'idle',
    wrongOptionIds: [],
    currentStreak: 0,
    maxStreak: 0,
    startedAt: null,
    timeTaken: null,
    correct: 0,
    subjectName: '',
    lessonName: '',
    celebrationStreak: null,
    selectedAnswers: {},
    planMode: false,
    planConfig: null,

    startChallenge: (questions, subjectName, lessonName, plan) =>
        set({
            questions,
            currentIndex: 0,
            status: 'idle',
            wrongOptionIds: [],
            currentStreak: 0,
            maxStreak: 0,
            startedAt: Date.now(),
            timeTaken: null,
            correct: 0,
            subjectName,
            lessonName,
            celebrationStreak: null,
            selectedAnswers: {},
            planMode: plan != null,
            planConfig: plan ?? null,
        }),

    selectOption: (optionId, isCorrect) => {
        const { status, currentStreak, maxStreak, correct, wrongOptionIds, questions, currentIndex } = get();
        if (status !== 'idle') return;

        const questionId = questions[currentIndex]?.id;
        const newSelectedAnswers = questionId
            ? { ...get().selectedAnswers, [questionId]: optionId }
            : get().selectedAnswers;

        if (isCorrect) {
            const newStreak = currentStreak + 1;
            const newMax = Math.max(newStreak, maxStreak);
            set({
                status: 'answered_correct',
                currentStreak: newStreak,
                maxStreak: newMax,
                correct: correct + 1,
                celebrationStreak: MILESTONE_STREAKS.has(newStreak) ? newStreak : null,
                selectedAnswers: newSelectedAnswers,
            });
        } else {
            set({
                status: 'answered_wrong',
                wrongOptionIds: [...wrongOptionIds, optionId],
                currentStreak: 0,
                selectedAnswers: newSelectedAnswers,
            });
        }
    },

    nextQuestion: () => {
        const { currentIndex, questions, startedAt } = get();
        const isLast = currentIndex === questions.length - 1;

        if (isLast) {
            set({
                status: 'finished',
                timeTaken: startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0,
                celebrationStreak: null,
            });
        } else {
            set({
                currentIndex: currentIndex + 1,
                status: 'idle',
                wrongOptionIds: [],
                celebrationStreak: null,
            });
        }
    },

    dismissCelebration: () => set({ celebrationStreak: null }),

    resetChallenge: () =>
        set({
            questions: [],
            currentIndex: 0,
            status: 'idle',
            wrongOptionIds: [],
            currentStreak: 0,
            maxStreak: 0,
            startedAt: null,
            timeTaken: null,
            correct: 0,
            subjectName: '',
            lessonName: '',
            celebrationStreak: null,
            selectedAnswers: {},
            planMode: false,
            planConfig: null,
        }),
}));