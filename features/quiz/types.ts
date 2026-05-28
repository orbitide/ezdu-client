import type { Question, QuizSession, QuizResult } from '@/types/quiz';
import type { ExamId } from '@/config/exams';

export type { Question, QuizSession, QuizResult };

export interface QuizListItem {
    id: string;
    examId: ExamId;
    subject: string;
    topic: string;
    questionCount: number;
    timeLimit: number;
    difficulty: 'easy' | 'medium' | 'hard';
    completedCount?: number;
}

export const DUMMY_QUIZ_LIST: QuizListItem[] = [
    { id: 'q1', examId: 'ssc', subject: 'গণিত', topic: 'বীজগণিত', questionCount: 20, timeLimit: 20, difficulty: 'medium' },
    { id: 'q2', examId: 'ssc', subject: 'বিজ্ঞান', topic: 'আলো', questionCount: 15, timeLimit: 15, difficulty: 'easy' },
    { id: 'q3', examId: 'bcs', subject: 'বাংলা', topic: 'ব্যাকরণ', questionCount: 25, timeLimit: 25, difficulty: 'hard' },
    { id: 'q4', examId: 'bcs', subject: 'সাধারণ জ্ঞান', topic: 'বাংলাদেশ বিষয়াবলী', questionCount: 30, timeLimit: 30, difficulty: 'medium' },
    { id: 'q5', examId: 'hsc', subject: 'পদার্থবিজ্ঞান', topic: 'তরঙ্গ', questionCount: 20, timeLimit: 20, difficulty: 'hard' },
    { id: 'q6', examId: 'ielts', subject: 'Reading', topic: 'Passage Comprehension', questionCount: 15, timeLimit: 20, difficulty: 'medium' },
];

export const DUMMY_QUESTIONS: Question[] = [
    {
        id: 'q1',
        text: 'x² - 5x + 6 = 0 সমীকরণের মূল দুটি কী?',
        options: [
            { id: 'a', text: 'x = 2, x = 3', isCorrect: true },
            { id: 'b', text: 'x = -2, x = -3', isCorrect: false },
            { id: 'c', text: 'x = 1, x = 6', isCorrect: false },
            { id: 'd', text: 'x = 2, x = -3', isCorrect: false },
        ],
        explanation: 'x² - 5x + 6 = (x-2)(x-3) = 0, সুতরাং x = 2 অথবা x = 3',
        subject: 'গণিত',
        topic: 'বীজগণিত',
        difficulty: 'medium',
    },
    {
        id: 'q2',
        text: 'আলোর বেগ প্রতি সেকেন্ডে কত?',
        options: [
            { id: 'a', text: '3 × 10⁸ m/s', isCorrect: true },
            { id: 'b', text: '3 × 10⁶ m/s', isCorrect: false },
            { id: 'c', text: '3 × 10¹⁰ m/s', isCorrect: false },
            { id: 'd', text: '3 × 10⁴ m/s', isCorrect: false },
        ],
        explanation: 'শূন্যস্থানে আলোর বেগ প্রায় 3 × 10⁸ মিটার/সেকেন্ড।',
        subject: 'পদার্থবিজ্ঞান',
        topic: 'আলো',
        difficulty: 'easy',
    },
    {
        id: 'q3',
        text: 'বাংলাদেশের স্বাধীনতা দিবস কত তারিখে?',
        options: [
            { id: 'a', text: '২৬ মার্চ', isCorrect: true },
            { id: 'b', text: '১৬ ডিসেম্বর', isCorrect: false },
            { id: 'c', text: '১৫ আগস্ট', isCorrect: false },
            { id: 'd', text: '২১ ফেব্রুয়ারি', isCorrect: false },
        ],
        explanation: '১৯৭১ সালের ২৬ মার্চ বাংলাদেশের স্বাধীনতা ঘোষণা করা হয়।',
        subject: 'সাধারণ জ্ঞান',
        topic: 'বাংলাদেশ',
        difficulty: 'easy',
    },
    {
        id: 'q4',
        text: '"Ubiquitous" means:',
        options: [
            { id: 'a', text: 'Present everywhere', isCorrect: true },
            { id: 'b', text: 'Very rare', isCorrect: false },
            { id: 'c', text: 'Extremely fast', isCorrect: false },
            { id: 'd', text: 'Completely silent', isCorrect: false },
        ],
        explanation: '"Ubiquitous" means present, appearing, or found everywhere.',
        subject: 'Vocabulary',
        topic: 'Advanced Words',
        difficulty: 'hard',
    },
    {
        id: 'q5',
        text: 'পানির আণবিক সংকেত কী?',
        options: [
            { id: 'a', text: 'H₂O', isCorrect: true },
            { id: 'b', text: 'CO₂', isCorrect: false },
            { id: 'c', text: 'NaCl', isCorrect: false },
            { id: 'd', text: 'H₂SO₄', isCorrect: false },
        ],
        explanation: 'পানির রাসায়নিক সংকেত H₂O — দুটি হাইড্রোজেন ও একটি অক্সিজেন পরমাণু।',
        subject: 'রসায়ন',
        topic: 'রাসায়নিক সংকেত',
        difficulty: 'easy',
    },
];
