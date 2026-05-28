import type { UserProfile, Badge } from '@/types/user';
import type { ExamId } from '@/config/exams';

export type { UserProfile, Badge };

export interface ExamHistory {
    examId: ExamId;
    subject: string;
    score: number;
    total: number;
    date: string;
}

export const DUMMY_PROFILE: UserProfile = {
    id: 'me',
    name: 'আপনার নাম',
    email: 'user@example.com',
    class: 'HSC 2nd Year',
    targetExam: 'hsc',
    createdAt: '2024-09-01',
    xp: 2450,
    level: 12,
    streak: 7,
    totalQuestions: 1240,
    correctAnswers: 967,
    rank: 142,
    badges: [
        { id: 'b1', name: 'প্রথম MCQ', icon: '🎯', earnedAt: '2024-09-01' },
        { id: 'b2', name: '৭ দিনের স্ট্রিক', icon: '🔥', earnedAt: '2024-10-01' },
        { id: 'b3', name: 'সেরা স্কোর', icon: '🏆', earnedAt: '2024-10-15' },
        { id: 'b4', name: '১০০০ প্রশ্ন', icon: '💯', earnedAt: '2024-11-01' },
    ],
};

export const DUMMY_EXAM_HISTORY: ExamHistory[] = [
    { examId: 'ssc', subject: 'গণিত', score: 18, total: 20, date: 'আজ' },
    { examId: 'bcs', subject: 'বাংলা', score: 14, total: 20, date: 'গতকাল' },
    { examId: 'hsc', subject: 'পদার্থবিজ্ঞান', score: 12, total: 20, date: '২ দিন আগে' },
    { examId: 'ielts', subject: 'Reading', score: 16, total: 20, date: '৩ দিন আগে' },
    { examId: 'vocabulary', subject: 'Word Power', score: 20, total: 20, date: '৪ দিন আগে' },
];
