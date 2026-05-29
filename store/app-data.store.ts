'use client';

import axios from 'axios';
import { create } from 'zustand';
import { getMe, getMyQuizHistory, getMySubjectMastery } from '@/lib/api/users';
import { getRecommendations } from '@/lib/api/recommendations';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { getActivePlan } from '@/lib/api/study-plan';
import { useAuthStore } from '@/store/auth.store';
import type { UserHomeSummaryDto } from '@/lib/api/users';
import type { RecommendationsDto } from '@/lib/api/recommendations';
import type { StudyPlanDto, UserQuizHistoryDto, SubjectMasteryDto } from '@/types/api';
import type { LeaderboardEntry } from '@/features/leaderboard/types';

interface AppDataStore {
    userSummary: UserHomeSummaryDto | null;
    recommendations: RecommendationsDto | null;
    leaderboard: LeaderboardEntry[];
    studyPlan: StudyPlanDto | null;
    quizHistory: UserQuizHistoryDto[];
    subjectMastery: SubjectMasteryDto[];
    isPreloading: boolean;
    isPreloaded: boolean;
    setStudyPlan: (plan: StudyPlanDto | null) => void;
    preload: () => Promise<void>;
    reset: () => void;
}

export const useAppDataStore = create<AppDataStore>((set, get) => ({
    userSummary: null,
    recommendations: null,
    leaderboard: [],
    studyPlan: null,
    quizHistory: [],
    subjectMastery: [],
    isPreloading: false,
    isPreloaded: false,

    setStudyPlan: (plan) => set({ studyPlan: plan }),

    preload: async () => {
        if (get().isPreloading || get().isPreloaded) return;
        set({ isPreloading: true });
        try {
            // Sync user to auth store as soon as /users/me responds so the
            // sidebar updates immediately, without waiting for the other requests.
            const getMePromise = getMe()
                .then((summary) => {
                    if (summary) {
                        useAuthStore.getState().setUser({
                            id: String(summary.id),
                            name: summary.name,
                            email: useAuthStore.getState().user?.email ?? '',
                            xp: summary.totalXp,
                            level: 1,
                            streak: summary.streak,
                            totalQuestions: 0,
                            correctAnswers: 0,
                            badges: [],
                            createdAt: '',
                        });
                    }
                    return summary;
                })
                .catch(() => null);

            const [userSummary, recommendations, studyPlan, leaderboardRaw, historyRaw, masteryRaw] =
                await Promise.all([
                    getMePromise,
                    getRecommendations().catch(() => null),
                    getActivePlan().catch((err) => {
                        if (axios.isAxiosError(err) && err.response?.status === 404) {
                            return null;
                        }
                        console.error('study plan preload failed', err);
                        return null;
                    }),
                    getLeaderboard().catch(() => []),
                    getMyQuizHistory(1, 5).catch(() => null),
                    getMySubjectMastery().catch(() => null),
                ]);

            const leaderboard: LeaderboardEntry[] = leaderboardRaw.map((e) => ({
                rank: e.rank,
                userId: e.userId,
                name: e.name,
                xp: e.xp,
                level: 1,
                streak: e.streak,
                accuracy: 0,
                isCurrentUser: userSummary
                    ? String(e.userId) === String(userSummary.id)
                    : (e.isCurrentUser ?? false),
            }));

            set({
                userSummary,
                recommendations,
                studyPlan,
                leaderboard,
                quizHistory: historyRaw?.items ?? [],
                subjectMastery: masteryRaw?.items ?? [],
                isPreloading: false,
                isPreloaded: true,
            });
        } catch {
            set({ isPreloading: false, isPreloaded: true });
        }
    },

    reset: () =>
        set({
            userSummary: null,
            recommendations: null,
            leaderboard: [],
            studyPlan: null,
            quizHistory: [],
            subjectMastery: [],
            isPreloading: false,
            isPreloaded: false,
        }),
}));
