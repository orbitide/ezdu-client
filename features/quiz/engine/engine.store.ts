'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Question } from '@/types/quiz';
import {
    resolveConfig,
    isWrong,
    isUnanswered,
    type QuizEngineConfig,
    type ResolvedQuizEngineConfig,
    type PerQuestionOutcome,
} from './types';

/**
 * The single quiz engine store, mirroring the state held by ezdu-mobile's
 * `_QuizEnginePageState` (features/quiz_engine/pages/quiz_engine_page.dart).
 *
 * Persisted to sessionStorage so a mid-quiz refresh resumes rather than
 * silently losing the attempt.
 */
interface EngineStore {
    config: ResolvedQuizEngineConfig | null;
    questions: Question[];
    currentIndex: number;
    answers: Record<string, string>;
    visited: boolean[];
    skipped: boolean[];
    remainingSeconds: number;
    startedAt: number | null;
    submitted: boolean;

    start: (config: QuizEngineConfig, questions: Question[]) => void;
    selectOption: (questionId: string, optionId: string) => void;
    goTo: (index: number) => void;
    next: () => void;
    prev: () => void;
    skip: () => void;
    tick: () => void;
    markSubmitted: () => void;
    reset: () => void;

    computePerQuestionOutcome: () => PerQuestionOutcome[];
    durationSeconds: () => number;
}

const initialState = {
    config: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    visited: [],
    skipped: [],
    remainingSeconds: 0,
    startedAt: null,
    submitted: false,
} satisfies Partial<EngineStore>;

export const useEngineStore = create<EngineStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            start: (config, questions) => {
                const resolved = resolveConfig(config);
                set({
                    config: resolved,
                    questions,
                    currentIndex: 0,
                    answers: {},
                    visited: Array(questions.length).fill(false),
                    skipped: Array(questions.length).fill(false),
                    remainingSeconds: resolved.timeInMinutes * 60,
                    startedAt: Date.now(),
                    submitted: false,
                });
            },

            selectOption: (questionId, optionId) =>
                set((s) => {
                    if (!s.config) return s;
                    // Mobile: lockOnce short-circuits once an answer exists.
                    if (s.config.answerMode === 'lockOnce' && s.answers[questionId] !== undefined) {
                        return s;
                    }
                    const visited = [...s.visited];
                    if (s.config.layout === 'perQuestion') {
                        visited[s.currentIndex] = true;
                    } else {
                        const idx = s.questions.findIndex((q) => q.id === questionId);
                        if (idx >= 0) visited[idx] = true;
                    }
                    return {
                        answers: { ...s.answers, [questionId]: optionId },
                        visited,
                    };
                }),

            goTo: (index) =>
                set((s) => ({
                    currentIndex: Math.min(Math.max(index, 0), Math.max(s.questions.length - 1, 0)),
                })),

            next: () =>
                set((s) => ({
                    currentIndex: Math.min(s.currentIndex + 1, Math.max(s.questions.length - 1, 0)),
                })),

            prev: () => set((s) => ({ currentIndex: Math.max(s.currentIndex - 1, 0) })),

            skip: () =>
                set((s) => {
                    const skipped = [...s.skipped];
                    skipped[s.currentIndex] = true;
                    return {
                        skipped,
                        currentIndex: Math.min(s.currentIndex + 1, Math.max(s.questions.length - 1, 0)),
                    };
                }),

            tick: () => set((s) => ({ remainingSeconds: Math.max(s.remainingSeconds - 1, 0) })),

            markSubmitted: () => set({ submitted: true }),

            reset: () => set({ ...initialState }),

            /**
             * Ported 1:1 from mobile's `_computePerQuestionOutcome`.
             * An unanswered question is neither correct nor wrong.
             */
            computePerQuestionOutcome: () => {
                const { questions, answers } = get();
                return questions.map((q) => {
                    const selectedId = answers[q.id];
                    const correctOption = q.options.find((o) => o.isCorrect);
                    return {
                        question: q,
                        selectedOptionId: selectedId,
                        correctOptionId: correctOption?.id,
                        isCorrect: selectedId != null && selectedId === correctOption?.id,
                    };
                });
            },

            durationSeconds: () => {
                const { config, remainingSeconds } = get();
                if (!config) return 0;
                return config.timeInMinutes * 60 - remainingSeconds;
            },
        }),
        {
            name: 'ezdu-quiz-engine',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

/** Tallies used by both the engine and its result screens. */
export function tallyOutcome(perQuestion: PerQuestionOutcome[], negativeMarkValue: number) {
    const correctCount = perQuestion.filter((o) => o.isCorrect).length;
    const wrongCount = perQuestion.filter(isWrong).length;
    const unansweredCount = perQuestion.filter(isUnanswered).length;
    return {
        correctCount,
        wrongCount,
        unansweredCount,
        scoreWithNegativeMarks: correctCount - wrongCount * negativeMarkValue,
    };
}
