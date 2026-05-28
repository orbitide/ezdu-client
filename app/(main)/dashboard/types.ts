import type { ExamId } from '@/config/exams';

export interface DashboardStats {
    streak: number;
    xp: number;
    level: number;
    questionsToday: number;
    accuracy: number;
    rank: number;
}

export interface ActivityItem {
    id: string;
    examId: ExamId;
    subject: string;
    score: number;
    total: number;
    timeAgo: string;
}

export interface ExamProgress {
    examId: ExamId;
    completedTopics: number;
    totalTopics: number;
    lastPracticed: string;
}
