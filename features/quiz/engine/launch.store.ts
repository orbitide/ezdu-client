'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Question } from '@/types/quiz';
import type { QuizEngineConfig } from './types';

/**
 * Hands a quiz off across a route boundary.
 *
 * Mobile pushes `QuizEnginePage(config:, questions:)` directly onto the
 * navigator; on web the launcher and the engine live on different routes, so
 * the config + questions are staged here. Persisted to sessionStorage so a
 * refresh on the session route doesn't lose the pending quiz.
 */
interface LaunchStore {
    config: QuizEngineConfig | null;
    questions: Question[];
    /** Where the engine should return to on exit / home. */
    returnTo: string;
    launch: (config: QuizEngineConfig, questions: Question[], returnTo: string) => void;
    clear: () => void;
}

export const useLaunchStore = create<LaunchStore>()(
    persist(
        (set) => ({
            config: null,
            questions: [],
            returnTo: '/dashboard',
            launch: (config, questions, returnTo) => set({ config, questions, returnTo }),
            clear: () => set({ config: null, questions: [], returnTo: '/dashboard' }),
        }),
        {
            name: 'ezdu-quiz-launch',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
