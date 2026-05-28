'use client';

import { useEffect, useState, useCallback } from 'react';
import { BookOpen, CheckCircle2, Circle, Calendar, Loader2, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActivePlan, markItemComplete, createPlan } from '@/lib/api/study-plan';
import type { StudyPlanDto, StudyPlanItemDto } from '@/types/api';

export default function StudyPlanPage() {
    const [plan, setPlan] = useState<StudyPlanDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);

    const fetchPlan = useCallback(() => {
        setLoading(true);
        getActivePlan()
            .then(setPlan)
            .catch(() => setError('প্ল্যান লোড হয়নি'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { fetchPlan(); }, [fetchPlan]);

    const handleComplete = async (itemId: string) => {
        if (!plan) return;
        // Optimistic update
        setPlan((p) => {
            if (!p) return p;
            return {
                ...p,
                completedItems: p.completedItems + 1,
                days: p.days.map((day) => ({
                    ...day,
                    items: day.items.map((item) =>
                        item.id === itemId ? { ...item, isCompleted: true } : item
                    ),
                })),
            };
        });
        try {
            await markItemComplete(plan.id, itemId);
        } catch {
            // Revert on error
            fetchPlan();
        }
    };

    const handleCreatePlan = async () => {
        setCreating(true);
        try {
            const newPlan = await createPlan({ mode: 'auto', durationDays: 7, dailyMinutes: 30 });
            setPlan(newPlan);
        } catch {
            setError('প্ল্যান তৈরি করা যায়নি');
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            {/* Header */}
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
                <NoPlanState onCreateAuto={handleCreatePlan} creating={creating} />
            ) : (
                <ActivePlan plan={plan} onComplete={handleComplete} />
            )}
        </div>
    );
}

function NoPlanState({ onCreateAuto, creating }: { onCreateAuto: () => void; creating: boolean }) {
    return (
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-8 text-center space-y-4">
            <BookOpen size={40} className="mx-auto text-purple-400" />
            <div>
                <p className="text-base font-semibold text-zinc-100">কোনো সক্রিয় প্ল্যান নেই</p>
                <p className="mt-1 text-sm text-zinc-500">একটি স্টাডি প্ল্যান তৈরি করো এবং নিয়মিত পড়াশোনা শুরু করো</p>
            </div>
            <button
                onClick={onCreateAuto}
                disabled={creating}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-400 transition-colors disabled:opacity-60"
            >
                {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                {creating ? 'তৈরি হচ্ছে...' : 'AI প্ল্যান তৈরি করো'}
            </button>
        </div>
    );
}

function ActivePlan({ plan, onComplete }: { plan: StudyPlanDto; onComplete: (id: string) => void }) {
    const pct = plan.totalItems > 0 ? Math.round((plan.completedItems / plan.totalItems) * 100) : 0;
    const today = new Date().toISOString().slice(0, 10);
    const todayItems = plan.days.find((d) => d.date.slice(0, 10) === today)?.items ?? plan.days[0]?.items ?? [];

    return (
        <>
            {/* Progress overview */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-100">সামগ্রিক অগ্রগতি</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">{plan.completedItems}/{plan.totalItems} সম্পন্ন</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span>{pct}% সম্পন্ন</span>
                    <span>{new Date(plan.endDate).toLocaleDateString('bn-BD')} পর্যন্ত</span>
                </div>
            </div>

            {/* Today's items */}
            {todayItems.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-zinc-300">আজকের পরিকল্পনা</h2>
                    {todayItems.map((item) => (
                        <PlanItemRow key={item.id} item={item} onComplete={onComplete} />
                    ))}
                </div>
            )}

            {/* Upcoming days */}
            {plan.days.slice(0, 3).map((day) => {
                if (day.date.slice(0, 10) === today) return null;
                const pending = day.items.filter((i) => !i.isCompleted);
                if (pending.length === 0) return null;
                return (
                    <div key={day.dayNumber} className="space-y-2">
                        <h2 className="text-sm font-semibold text-zinc-500">
                            {new Date(day.date).toLocaleDateString('bn-BD', { weekday: 'long', day: 'numeric', month: 'short' })}
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

function PlanItemRow({ item, onComplete, future }: { item: StudyPlanItemDto; onComplete: (id: string) => void; future?: boolean }) {
    return (
        <div className={cn(
            'flex items-center gap-3 rounded-xl border p-4 transition-colors',
            item.isCompleted
                ? 'border-zinc-800 bg-zinc-900 opacity-60'
                : future
                    ? 'border-zinc-800 bg-zinc-900'
                    : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
        )}>
            <button
                onClick={() => !item.isCompleted && !future && onComplete(item.id)}
                disabled={item.isCompleted || future}
                className={cn('shrink-0 transition-colors', item.isCompleted ? 'text-emerald-400' : 'text-zinc-600 hover:text-zinc-400')}
            >
                {item.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium truncate', item.isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100')}>
                    {item.lessonName}
                </p>
                {item.subjectName && (
                    <p className="text-xs text-zinc-500">{item.subjectName} · {item.estimatedMinutes} মিনিট</p>
                )}
            </div>
            {!item.isCompleted && !future && (
                <button className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                    শুরু করো
                    <ChevronRight size={12} />
                </button>
            )}
        </div>
    );
}
