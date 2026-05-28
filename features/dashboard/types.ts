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

export const DUMMY_STATS: DashboardStats = {
    streak: 7,
    xp: 2450,
    level: 12,
    questionsToday: 24,
    accuracy: 78,
    rank: 142,
};

export const DUMMY_ACTIVITY: ActivityItem[] = [
    { id: '1', examId: 'ssc', subject: 'গণিত', score: 18, total: 20, timeAgo: '২ ঘণ্টা আগে' },
    { id: '2', examId: 'bcs', subject: 'বাংলা', score: 14, total: 20, timeAgo: '৫ ঘণ্টা আগে' },
    { id: '3', examId: 'hsc', subject: 'পদার্থবিজ্ঞান', score: 12, total: 20, timeAgo: 'গতকাল' },
    { id: '4', examId: 'ielts', subject: 'Reading', score: 16, total: 20, timeAgo: 'গতকাল' },
    { id: '5', examId: 'vocabulary', subject: 'Word Power', score: 20, total: 20, timeAgo: '২ দিন আগে' },
];

export const DUMMY_PROGRESS: ExamProgress[] = [
    { examId: 'ssc', completedTopics: 24, totalTopics: 40, lastPracticed: 'আজ' },
    { examId: 'bcs', completedTopics: 18, totalTopics: 60, lastPracticed: 'গতকাল' },
    { examId: 'ielts', completedTopics: 8, totalTopics: 20, lastPracticed: '৩ দিন আগে' },
];
