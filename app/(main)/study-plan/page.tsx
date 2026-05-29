'use client';

import { useEffect, useState, useCallback } from 'react';
import { BookOpen, CheckCircle2, Circle, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActivePlan } from '@/lib/api/study-plan';
import { localDateKey } from '@/lib/study-plan/map-study-plan';
import { completePlanItem } from '@/lib/study-plan/study-plan-items';
import type { StudyPlanDto, StudyPlanItemDto } from '@/types/api';

export default function StudyPlanPage() {
    const [plan, setPlan] = useState<StudyPlanDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlan = useCallback(() => {
        setLoading(true);
        setError(null);
        getActivePlan()
            .then(setPlan)
            .catch(() => setError('প্ল্যান লোড হয়নি'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    const handleComplete = useCallback((itemId: string) => {
        setPlan((p) => (p ? completePlanItem(p, itemId) : p));
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl space-y-5 px-4 py-6 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <BookOpen size={20} className="text-purple-400" />
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-zinc-100">স্টাডি প্ল্যান</h1>
                    <p className="text-xs text-zinc-500">তোমার শেখার পরিকল্পনা</p>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                </div>
            )}

            {!plan ? (
                <NoPlanState />
            ) : (
                <ActivePlan plan={plan} onComplete={handleComplete} />
            )}
        </div>
    );
}

function NoPlanState() {
    return (
        <div className="space-y-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-8 text-center">
            <BookOpen size={40} className="mx-auto text-purple-400" />
            <div>
                <p className="text-base font-semibold text-zinc-100">কোনো সক্রিয় প্ল্যান নেই</p>
                <p className="mt-1 text-sm text-zinc-500">
                    Ezdu মোবাইল অ্যাপ থেকে স্টাডি প্ল্যান তৈরি করুন। তৈরি হলে এখানে দেখাবে।
                </p>
            </div>
        </div>
    );
}

function ActivePlan({ plan, onComplete }: { plan: StudyPlanDto; onComplete: (id: string) => void }) {
    const pct = plan.totalItems > 0 ? Math.round((plan.completedItems / plan.totalItems) * 100) : 0;
    const today = localDateKey(new Date());
    const todayItems =
        plan.days.find((d) => localDateKey(d.date) === today)?.items ?? plan.days[0]?.items ?? [];

    return (
        <>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-100">সামগ্রিক অগ্রগতি</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">
                        {plan.completedItems}/{plan.totalItems} সম্পন্ন
                    </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span>{pct}% সম্পন্ন</span>
                    <span>{new Date(plan.endDate).toLocaleDateString('bn-BD')} পর্যন্ত</span>
                </div>
            </div>

            {todayItems.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-zinc-300">আজকের পরিকল্পনা</h2>
                    {todayItems.map((item) => (
                        <PlanItemRow key={item.id} item={item} onComplete={onComplete} />
                    ))}
                </div>
            )}

            {plan.days.map((day) => {
                if (localDateKey(day.date) === today) return null;
                const pending = day.items.filter((i) => !i.isCompleted);
                if (pending.length === 0) return null;
                return (
                    <div key={day.dayNumber} className="space-y-2">
                        <h2 className="text-sm font-semibold text-zinc-500">
                            {new Date(day.date).toLocaleDateString('bn-BD', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                            })}
                        </h2>
                        {pending.slice(0, 3).map((item) => (
                            <PlanItemRow key={item.id} item={item} onComplete={onComplete} future />
                        ))}
                    </div>
                );
            })}
        </>
    );
}

function PlanItemRow({
    item,
    onComplete,
    future,
}: {
    item: StudyPlanItemDto;
    onComplete: (id: string) => void;
    future?: boolean;
}) {
    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-xl border p-4 transition-colors',
                item.isCompleted
                    ? 'border-zinc-800 bg-zinc-900 opacity-60'
                    : future
                      ? 'border-zinc-800 bg-zinc-900'
                      : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600',
            )}
        >
            <button
                onClick={() => !item.isCompleted && !future && onComplete(item.id)}
                disabled={item.isCompleted || future}
                className={cn(
                    'shrink-0 transition-colors',
                    item.isCompleted ? 'text-emerald-400' : 'text-zinc-600 hover:text-zinc-400',
                )}
            >
                {item.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        'truncate text-sm font-medium',
                        item.isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100',
                    )}
                >
                    {item.lessonName}
                </p>
                {item.subjectName && (
                    <p className="text-xs text-zinc-500">
                        {item.subjectName} · {item.estimatedMinutes} মিনিট
                    </p>
                )}
            </div>
        </div>
    );
}
