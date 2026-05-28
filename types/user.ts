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
    badges: Badge[];
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    earnedAt: string;
}
