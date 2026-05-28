'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, BarChart2, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMyQuizHistory } from '@/lib/api/quiz';
import type { UserQuizHistoryDto } from '@/types/api';

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
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">কুইজ ইতিহাস</h1>
                    <p className="text-xs text-zinc-500">তোমার সব পরীক্ষার ফলাফল</p>
                </div>
            </div>

            {loading && page === 1 ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-blue-400" />
                </div>
            ) : items.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <BarChart2 size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">এখনো কোনো কুইজ দেওনি</p>
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
                                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                            >
                                <div className={cn(
                                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                                    pct >= 70 ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                                )}>
                                    {pct >= 70
                                        ? <CheckCircle2 size={18} className="text-emerald-400" />
                                        : <XCircle size={18} className="text-rose-400" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-100 truncate">
                                        {item.quizTitle || item.subjectName || 'কুইজ'}
                                    </p>
                                    <p className="text-xs text-zinc-500">{date}</p>
                                    <div className="mt-1 flex items-center gap-2 text-xs">
                                        <span className="text-zinc-400">{item.correctAnswers}/{item.totalQuestions} সঠিক</span>
                                        <span className={cn('font-medium', pct >= 70 ? 'text-emerald-400' : 'text-rose-400')}>
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
                            className="w-full rounded-xl border border-zinc-800 py-3 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-100 transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'আরো দেখো'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
