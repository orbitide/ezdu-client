'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, BarChart2, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMyQuizHistory } from '@/lib/api/quiz';
import type { UserQuizHistoryDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function QuizHistoryPage() {
    const router = useRouter();
    const [items, setItems] = useState<UserQuizHistoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let cancelled = false;
        getMyQuizHistory(page, 20)
            .then((res) => {
                if (cancelled) return;
                setItems((prev) => (page === 1 ? res.items : [...prev, ...res.items]));
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
                        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">কুইজ ইতিহাস</h1>
                            <p className="text-xs text-muted-foreground">তোমার সব পরীক্ষার ফলাফল</p>
                        </div>
                    </div>

                    {loading && page === 1 ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-blue-400" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <BarChart2 size={36} className="mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">এখনো কোনো কুইজ দেওনি</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((item) => {
                                const pct = item.accuracy;
                                const date = new Date(item.completedAt).toLocaleDateString('bn-BD', {
                                    day: 'numeric', month: 'short', year: 'numeric',
                                });
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                                    >
                                        <div className={cn(
                                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                                            pct >= 70 ? 'bg-primary/10' : 'bg-rose-500/10'
                                        )}>
                                            {pct >= 70
                                                ? <CheckCircle2 size={18} className="text-primary" />
                                                : <XCircle size={18} className="text-rose-400" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {item.quizTitle || item.subjectName || 'কুইজ'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{date}</p>
                                            <div className="mt-1 flex items-center gap-2 text-xs">
                                                <span className="text-muted-foreground">{item.correctAnswers}/{item.totalQuestions} সঠিক</span>
                                                <span className={cn('font-medium', pct >= 70 ? 'text-primary' : 'text-rose-400')}>
                                                    {pct}%
                                                </span>
                                                <span className="text-yellow-400">+{item.xpEarned} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {hasMore && (
                                <button
                                    onClick={() => setPage((p) => p + 1)}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-border py-3 text-sm text-muted-foreground hover:border-border hover:text-foreground transition-colors disabled:opacity-50"
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
