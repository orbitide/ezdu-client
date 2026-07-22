import type { ExamId } from '@/config/exams';

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    class?: string;
    board?: string;
    targetExam?: ExamId;
    createdAt: string;
}

export interface UserProfile extends User {
    xp: number;
    level: number;
    streak: number;
    totalQuestions: number;
    correctAnswers: number;
    rank?: number;
    coin?: number;
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    earnedAt: string;
}

/** Rank tiers — ported from the Orbitide reference (`lib/types/user.ts`). */
export type RankTier =
    | 'novice'
    | 'apprentice'
    | 'adept'
    | 'expert'
    | 'master'
    | 'grandmaster'
    | 'champion'
    | 'legend'
    | 'mythic';
