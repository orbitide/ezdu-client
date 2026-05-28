import Link from 'next/link';
import { BookOpen, ChevronRight, CheckCircle2, Circle, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudyPlanDto, StudyPlanItemDto } from '@/types/api';

interface Props {
    plan: StudyPlanDto | null;
    planLoading: boolean;
    onComplete: (itemId: string) => void;
    onCreatePlan: () => void;
    creating: boolean;
}

export function DashboardPlanPanel({ plan, planLoading, onComplete, onCreatePlan, creating }: Props) {
    const today = new Date().toISOString().slice(0, 10);
    const todayItems =
        plan?.days.find((d) => d.date.slice(0, 10) === today)?.items ??
        plan?.days[0]?.items ??
        [];

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-purple-400" />
                    <span className="text-sm font-semibold text-zinc-100">স্টাডি প্ল্যান</span>
                </div>
                <Link
                    href="/study-plan"
                    className="flex items-center gap-0.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                >
                    সব দেখো
                    <ChevronRight size={12} />
                </Link>
            </div>

            {planLoading ? (
                <div className="flex h-20 items-center justify-center">
                    <Loader2 size={18} className="animate-spin text-zinc-600" />
                </div>
            ) : !plan ? (
                /* No plan state */
                <div className="flex flex-col items-center gap-3 p-5 text-center">
                    <p className="text-sm text-zinc-400">কোনো সক্রিয় প্ল্যান নেই</p>
                    <button
                        onClick={onCreatePlan}
                        disabled={creating}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-400 transition-colors hover:bg-purple-500/20 disabled:opacity-60"
                    >
                        {creating ? (
                            <Loader2 size={12} className="animate-spin" />
                        ) : (
                            <Plus size={12} />
                        )}
                        AI প্ল্যান তৈরি করো
                    </button>
                </div>
            ) : (
                <div className="space-y-3 p-3">
                    {/* Segmented progress bar */}
                    <div>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="text-zinc-500">সামগ্রিক অগ্রগতি</span>
                            <span className="font-semibold text-emerald-400">
                                {plan.completedItems}/{plan.totalItems}
                            </span>
                        </div>
                        <div className="flex gap-0.5">
                            {Array.from({ length: Math.min(plan.totalItems, 12) }, (_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'h-1.5 flex-1 rounded-full',
                                        i < plan.completedItems ? 'bg-emerald-500' : 'bg-zinc-700'
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Today's items */}
                    {todayItems.length > 0 ? (
                        <div className="space-y-0.5">
                            <p className="px-1 text-xs font-semibold text-zinc-400">আজকের পরিকল্পনা</p>
                            {todayItems.slice(0, 5).map((item) => (
                                <PlanItem key={item.id} item={item} onComplete={onComplete} />
                            ))}
                            {todayItems.length > 5 && (
                                <p className="pt-1 text-center text-[11px] text-zinc-600">
                                    +{todayItems.length - 5} আরো
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="py-2 text-center text-xs text-zinc-500">আজকের পরিকল্পনা শেষ!</p>
                    )}
                </div>
            )}
        </div>
    );
}

function PlanItem({
    item,
    onComplete,
}: {
    item: StudyPlanItemDto;
    onComplete: (id: string) => void;
}) {
    return (
        <div
            className={cn(
                'flex items-center gap-2 rounded-lg px-1 py-1.5 transition-colors',
                item.isCompleted ? 'opacity-50' : 'hover:bg-zinc-800/50'
            )}
        >
            <button
                onClick={() => !item.isCompleted && onComplete(item.id)}
                disabled={item.isCompleted}
                className={cn(
                    'shrink-0 transition-colors',
                    item.isCompleted ? 'text-emerald-500' : 'text-zinc-600 hover:text-zinc-400'
                )}
            >
                {item.isCompleted ? <CheckCircle2 size={15} /> : <Circle size={15} />}
            </button>
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        'truncate text-xs font-medium',
                        item.isCompleted ? 'line-through text-zinc-500' : 'text-zinc-200'
                    )}
                >
                    {item.lessonName}
                </p>
                {item.subjectName && (
                    <p className="truncate text-[11px] text-zinc-600">{item.subjectName}</p>
                )}
            </div>
            <span className="shrink-0 text-[11px] text-zinc-600">{item.estimatedMinutes}m</span>
        </div>
    );
}
