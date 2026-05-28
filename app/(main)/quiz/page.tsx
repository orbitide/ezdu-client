import Link from 'next/link';
import { DUMMY_QUIZ_LIST } from '@/features/quiz/types';
import { EXAM_MAP, EXAMS } from '@/config/exams';
import { Brain, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DIFFICULTY_LABELS: Record<string, string> = {
    easy: 'সহজ',
    medium: 'মধ্যম',
    hard: 'কঠিন',
};

const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'text-emerald-400 bg-emerald-500/10',
    medium: 'text-yellow-400 bg-yellow-500/10',
    hard: 'text-rose-400 bg-rose-500/10',
};

export default function QuizListPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <Brain size={20} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">কুইজ</h1>
                    <p className="text-xs text-zinc-500">বিষয় বেছে প্র্যাকটিস শুরু করো</p>
                </div>
            </div>

            {/* Exam filter chips */}
            <div className="flex flex-wrap gap-2">
                <button className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-100">
                    সব
                </button>
                {EXAMS.map((exam) => (
                    <button
                        key={exam.id}
                        className={cn(
                            'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80',
                            exam.borderClass, exam.textClass, exam.bgClass
                        )}
                    >
                        <span>{exam.icon}</span>
                        {exam.name}
                    </button>
                ))}
            </div>

            {/* Quiz list */}
            <div className="space-y-2">
                {DUMMY_QUIZ_LIST.map((quiz) => {
                    const exam = EXAM_MAP[quiz.examId];
                    return (
                        <Link
                            key={quiz.id}
                            href={`/quiz/${quiz.id}`}
                            className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <span className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl',
                                exam.bgClass
                            )}>
                                {exam.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-zinc-100 truncate">{quiz.subject}</p>
                                <p className="text-xs text-zinc-500 truncate">{exam.name} · {quiz.topic}</p>
                                <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={11} />
                                        {quiz.questionCount} প্রশ্ন
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={11} />
                                        {quiz.timeLimit} মিনিট
                                    </span>
                                    <span className={cn(
                                        'rounded-full px-2 py-0.5',
                                        DIFFICULTY_COLORS[quiz.difficulty]
                                    )}>
                                        {DIFFICULTY_LABELS[quiz.difficulty]}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-zinc-600 shrink-0" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
