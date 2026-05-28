'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Brain, Clock, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { EXAMS } from '@/config/exams';
import { cn } from '@/lib/utils';
import { getQuizzes } from '@/lib/api/quiz';
import type { QuizListDto } from '@/types/api';

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

function QuizListContent() {
    const searchParams = useSearchParams();
    const examFilter = searchParams.get('exam');
    const [selectedExam, setSelectedExam] = useState<string | null>(examFilter);
    const [quizzes, setQuizzes] = useState<QuizListDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getQuizzes({ pageNumber: page, pageSize: 20 })
            .then((res) => {
                if (cancelled) return;
                setQuizzes((prev) => (page === 1 ? res.items : [...prev, ...res.items]));
                setHasMore(res.items.length === 20);
            })
            .catch(() => {})
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [page]);

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
                <button
                    onClick={() => setSelectedExam(null)}
                    className={cn(
                        'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                        !selectedExam ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    )}
                >
                    সব
                </button>
                {EXAMS.map((exam) => (
                    <button
                        key={exam.id}
                        onClick={() => setSelectedExam(selectedExam === exam.id ? null : exam.id)}
                        className={cn(
                            'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                            selectedExam === exam.id
                                ? `${exam.borderClass} ${exam.textClass} ${exam.bgClass}`
                                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                        )}
                    >
                        <span>{exam.icon}</span>
                        {exam.name}
                    </button>
                ))}
            </div>

            {loading && page === 1 ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-emerald-500" />
                </div>
            ) : quizzes.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
                    <p className="text-sm text-zinc-400">কোনো কুইজ পাওয়া যায়নি</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {quizzes.map((quiz) => (
                        <Link
                            key={quiz.id}
                            href={`/quiz/${quiz.id}`}
                            className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold text-sm">
                                Q
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-zinc-100 truncate">{quiz.title}</p>
                                {quiz.subjectName && (
                                    <p className="text-xs text-zinc-500 truncate">{quiz.subjectName}</p>
                                )}
                                <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={11} />
                                        {quiz.questionCount} প্রশ্ন
                                    </span>
                                    {quiz.duration && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={11} />
                                            {quiz.duration} মিনিট
                                        </span>
                                    )}
                                    {quiz.difficulty && (
                                        <span className={cn(
                                            'rounded-full px-2 py-0.5',
                                            DIFFICULTY_COLORS[quiz.difficulty] || 'text-zinc-400 bg-zinc-800'
                                        )}>
                                            {DIFFICULTY_LABELS[quiz.difficulty] || quiz.difficulty}
                                        </span>
                                    )}
                                    {quiz.isCompleted && (
                                        <span className="text-emerald-500 font-medium">✓ সম্পন্ন</span>
                                    )}
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-zinc-600 shrink-0" />
                        </Link>
                    ))}

                    {hasMore && (
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={loading}
                            className="w-full rounded-xl border border-zinc-800 py-3 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'আরো দেখো'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default function QuizListPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={28} className="animate-spin text-emerald-500" />
            </div>
        }>
            <QuizListContent />
        </Suspense>
    );
}
