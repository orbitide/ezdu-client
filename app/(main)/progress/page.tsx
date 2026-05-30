'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    Loader2, BarChart2, CheckCircle2, XCircle, AlertCircle, BookOpen,
    TrendingUp, Target, Flame, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProgress } from '@/lib/api/progress';
import { getMyStats, getMySubjectMastery, getMyQuizHistory } from '@/lib/api/users';
import { getQuizReview } from '@/lib/api/quiz';
import type { ProgressDto, SubjectMasteryDto, UserQuizHistoryDto, ReviewQuestionDto, UserStatsDto } from '@/types/api';

type Tab = 'overview' | 'history' | 'mistakes' | 'weak';

const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'ওভারভিউ' },
    { id: 'history', label: 'হিস্ট্রি' },
    { id: 'mistakes', label: 'ভুলসমূহ' },
    { id: 'weak', label: 'দুর্বল বিষয়' },
];

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab() {
    const [stats, setStats] = useState<UserStatsDto | null>(null);
    const [mastery, setMastery] = useState<SubjectMasteryDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getMyStats().catch(() => null),
            getMySubjectMastery().then((r) => r.items).catch(() => []),
        ]).then(([s, m]) => {
            setStats(s);
            setMastery(m);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <TabLoader />;

    return (
        <div className="space-y-4">
            {/* Key stats */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                    { label: 'মোট XP', value: stats?.xp?.toLocaleString() ?? '—', icon: <Zap size={15} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    { label: 'স্ট্রিক', value: `${stats?.streak ?? '—'} দিন`, icon: <Flame size={15} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { label: 'নির্ভুলতা', value: `${stats?.accuracy ?? '—'}%`, icon: <Target size={15} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'মোট কুইজ', value: stats?.totalQuizzes ?? '—', icon: <BarChart2 size={15} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg mb-2', s.bg, s.color)}>
                            {s.icon}
                        </div>
                        <p className={cn('text-xl font-bold', s.color)}>{s.value}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Subject mastery */}
            {mastery.length > 0 && (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
                    <p className="text-sm font-semibold text-zinc-100">বিষয় দক্ষতা</p>
                    {mastery.map((item) => {
                        const pct = item.masteryPercent;
                        const bar = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-rose-500';
                        const txt = pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-yellow-400' : 'text-rose-400';
                        return (
                            <div key={item.subjectId} className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-zinc-300 font-medium">{item.subjectName}</span>
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <span>{item.masteredLessons}/{item.totalLessons} লেসন</span>
                                        <span className={cn('font-bold', txt)}>{pct}%</span>
                                    </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                    <div className={cn('h-full rounded-full transition-all', bar)} style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {mastery.length === 0 && !loading && (
                <EmptyState icon={<TrendingUp size={32} />} text="এখনো কোনো বিষয়ে অগ্রগতি নেই" sub="কুইজ দিলে এখানে দক্ষতা দেখাবে" />
            )}
        </div>
    );
}

// ─── History tab ──────────────────────────────────────────────────────────────

function HistoryTab() {
    const [items, setItems] = useState<UserQuizHistoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        getMyQuizHistory(1, 20)
            .then((res) => {
                setItems(res.items);
                setHasMore(res.items.length === 20);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const loadMore = useCallback(() => {
        setLoadingMore(true);
        const nextPage = page + 1;
        getMyQuizHistory(nextPage, 20)
            .then((res) => {
                setItems((prev) => [...prev, ...res.items]);
                setHasMore(res.items.length === 20);
                setPage(nextPage);
            })
            .catch(() => {})
            .finally(() => setLoadingMore(false));
    }, [page]);

    if (loading) return <TabLoader />;
    if (items.length === 0) return (
        <EmptyState icon={<BarChart2 size={32} />} text="এখনো কোনো কুইজ দাওনি" sub="কুইজ দিলে এখানে রেকর্ড দেখতে পাবে" />
    );

    return (
        <div className="space-y-2">
            {items.map((item) => {
                const pct = item.accuracy;
                const date = new Date(item.completedAt).toLocaleDateString('bn-BD', {
                    day: 'numeric', month: 'short', year: 'numeric',
                });
                const quizType =
                    item.quizType === 'Mock' ? 'মক টেস্ট' :
                    item.quizType === 'Archive' ? 'আর্কাইভ' :
                    item.quizType === 'ModelTest' ? 'মডেল টেস্ট' : 'কুইজ';
                return (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
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
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                                <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">{quizType}</span>
                                <span>{date}</span>
                            </div>
                            <div className="mt-1.5 flex items-center gap-3 text-xs">
                                <span className="text-zinc-400">{item.correctAnswers}/{item.totalQuestions} সঠিক</span>
                                <span className={cn('font-bold', pct >= 70 ? 'text-emerald-400' : 'text-rose-400')}>{pct}%</span>
                                {item.xpEarned > 0 && <span className="text-yellow-400">+{item.xpEarned} XP</span>}
                            </div>
                        </div>
                    </div>
                );
            })}
            {hasMore && (
                <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 py-3 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-100 transition-colors disabled:opacity-50"
                >
                    {loadingMore ? <Loader2 size={15} className="animate-spin" /> : 'আরো দেখো'}
                </button>
            )}
        </div>
    );
}

// ─── Mistakes tab ─────────────────────────────────────────────────────────────

function MistakesTab() {
    const [mistakes, setMistakes] = useState<ReviewQuestionDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        getMyQuizHistory(1, 5)
            .then(async (history) => {
                const reviews = await Promise.all(
                    history.items.slice(0, 5).map((item) => getQuizReview(item.id).catch(() => null))
                );
                const all: ReviewQuestionDto[] = [];
                reviews.forEach((r) => {
                    if (!r) return;
                    r.questions.forEach((q) => { if (!q.isCorrect && q.selectedOptionId) all.push(q); });
                });
                setMistakes(all.slice(0, 40));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <TabLoader />;
    if (mistakes.length === 0) return (
        <EmptyState icon={<AlertCircle size={32} />} text="কোনো ভুল পাওয়া যায়নি" sub="সব উত্তর সঠিক ছিল!" />
    );

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3">
                <AlertCircle size={15} className="text-rose-400 shrink-0" />
                <p className="text-xs text-rose-300">
                    {mistakes.length}টি ভুল উত্তর পাওয়া গেছে। রিভিশন করে উন্নতি করো।
                </p>
            </div>

            {mistakes.map((q, i) => (
                <div key={q.id} className="rounded-xl border border-rose-500/20 bg-zinc-900 overflow-hidden">
                    <button
                        onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                        className="flex w-full items-start gap-3 p-4 text-left"
                    >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-[11px] font-bold text-rose-400">
                            {i + 1}
                        </div>
                        <p className="flex-1 text-sm text-zinc-100 line-clamp-2">{q.text}</p>
                        <span className="text-xs text-zinc-600 shrink-0">{expanded === q.id ? '▲' : '▼'}</span>
                    </button>

                    {expanded === q.id && (
                        <div className="border-t border-zinc-800 px-4 pb-4 pt-3 space-y-2">
                            {q.options.map((opt) => {
                                const isCorrect = opt.isCorrect;
                                const isWrong = opt.id === q.selectedOptionId && !isCorrect;
                                return (
                                    <div key={opt.id} className={cn(
                                        'flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm',
                                        isCorrect ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' :
                                        isWrong ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' :
                                        'border-zinc-800 text-zinc-500'
                                    )}>
                                        <span className="shrink-0 font-bold text-xs mt-0.5">
                                            {isCorrect ? '✓' : isWrong ? '✗' : '○'}
                                        </span>
                                        {opt.text}
                                    </div>
                                );
                            })}
                            {q.explanation && (
                                <div className="flex gap-2 rounded-lg bg-zinc-800/60 p-3 mt-1">
                                    <BookOpen size={13} className="text-blue-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-zinc-400 leading-relaxed">{q.explanation}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Weak subjects tab ────────────────────────────────────────────────────────

function WeakSubjectsTab() {
    const [progress, setProgress] = useState<ProgressDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProgress().then(setProgress).catch(() => {}).finally(() => setLoading(false));
    }, []);

    if (loading) return <TabLoader />;

    const weak = progress?.weakSubjects ?? [];

    if (weak.length === 0) return (
        <EmptyState icon={<Target size={32} />} text="কোনো দুর্বল বিষয় নেই" sub="দারুণ! সব বিষয়ে ভালো করছো।" />
    );

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">আরো প্র্যাকটিস দরকার</p>
            {weak.map((s) => {
                const pct = s.accuracy;
                return (
                    <div key={s.subjectId} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-zinc-100">{s.subjectName}</p>
                            <span className="text-sm font-bold text-rose-400">{pct}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div className="h-full rounded-full bg-rose-500 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-xs text-zinc-500">{s.questionsAttempted} প্রশ্নের উত্তর দেওয়া হয়েছে</p>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function TabLoader() {
    return (
        <div className="flex items-center justify-center py-16">
            <Loader2 size={26} className="animate-spin text-blue-400" />
        </div>
    );
}

function EmptyState({ icon, text, sub }: { icon: React.ReactNode; text: string; sub?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 py-14 px-6 text-center">
            <div className="text-zinc-700 mb-1">{icon}</div>
            <p className="text-sm font-medium text-zinc-400">{text}</p>
            {sub && <p className="text-xs text-zinc-600">{sub}</p>}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressPage() {
    const [tab, setTab] = useState<Tab>('overview');

    return (
        <div className="flex flex-col min-h-dvh bg-zinc-950">
            {/* Header */}
            <div className="shrink-0 border-b border-zinc-800/60 px-4 pt-5 pb-0">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                        <TrendingUp size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-zinc-100">অগ্রগতি</h1>
                        <p className="text-xs text-zinc-500">তোমার শেখার পরিসংখ্যান</p>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="flex gap-0.5 overflow-x-auto scrollbar-none">
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={cn(
                                'shrink-0 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap',
                                tab === t.id
                                    ? 'border-blue-400 text-blue-400'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                            )}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto px-4 py-5 max-w-3xl mx-auto w-full">
                {tab === 'overview' && <OverviewTab />}
                {tab === 'history' && <HistoryTab />}
                {tab === 'mistakes' && <MistakesTab />}
                {tab === 'weak' && <WeakSubjectsTab />}
            </div>
        </div>
    );
}
