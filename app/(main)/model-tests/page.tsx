'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, Clock, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getQuizzes } from '@/lib/api/quiz';
import type { QuizListDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

const DIFFICULTY_LABELS: Record<string, string> = {
    easy: 'সহজ',
    medium: 'মধ্যম',
    hard: 'কঠিন',
};

const DIFFICULTY_COLORS: Record<string, string> = {
    easy: 'text-primary bg-primary/10',
    medium: 'text-yellow-400 bg-yellow-500/10',
    hard: 'text-rose-400 bg-rose-500/10',
};

function QuizListContent() {
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
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                            <Brain size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">কুইজ</h1>
                            <p className="text-xs text-muted-foreground">বিষয় বেছে প্র্যাকটিস শুরু করো</p>
                        </div>
                    </div>

                    {loading && page === 1 ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-primary" />
                        </div>
                    ) : quizzes.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-8 text-center">
                            <p className="text-sm text-muted-foreground">কোনো কুইজ পাওয়া যায়নি</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {quizzes.map((quiz) => (
                                <Link
                                    key={quiz.id}
                                    href={`/model-tests/${quiz.id}`}
                                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border hover:bg-muted"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 font-bold text-sm">
                                        Q
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground truncate">{quiz.title}</p>
                                        {quiz.subjectName && (
                                            <p className="text-xs text-muted-foreground truncate">{quiz.subjectName}</p>
                                        )}
                                        <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
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
                                                    DIFFICULTY_COLORS[quiz.difficulty] || 'text-muted-foreground bg-muted'
                                                )}>
                                                    {DIFFICULTY_LABELS[quiz.difficulty] || quiz.difficulty}
                                                </span>
                                            )}
                                            {quiz.isCompleted && (
                                                <span className="text-primary font-medium">✓ সম্পন্ন</span>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                                </Link>
                            ))}

                            {hasMore && (
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-border py-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground disabled:opacity-50"
                                >
                                    {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'আরো দেখো'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}

export default function QuizListPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={28} className="animate-spin text-primary" />
            </div>
        }>
            <QuizListContent />
        </Suspense>
    );
}
