import Link from 'next/link';
import { BookOpen, ChevronRight, CheckCircle2, Circle, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { localDateKey } from '@/lib/study-plan/map-study-plan';
import type { StudyPlanDto, StudyPlanItemDto } from '@/types/api';

interface Props {
    plan: StudyPlanDto | null;
    planLoading: boolean;
}

export function DashboardPlanPanel({ plan, planLoading }: Props) {
    const today = localDateKey(new Date());
    const todayItems =
        plan?.days.find((d) => localDateKey(d.date) === today)?.items ??
        plan?.days[0]?.items ??
        [];
    const segmentCount = Math.min(plan?.totalItems ?? 0, 12);

    return (
        <div className="rounded-xl border border-border bg-card">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-teal-400" />
                    <span className="text-sm font-semibold text-foreground">স্টাডি প্ল্যান</span>
                </div>
                <Link
                    href="/study-plan"
                    className="flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-muted-foreground"
                >
                    সব দেখো
                    <ChevronRight size={12} />
                </Link>
            </div>

            {planLoading ? (
                <div className="flex h-20 items-center justify-center">
                    <Loader2 size={18} className="animate-spin text-muted-foreground" />
                </div>
            ) : !plan ? (
                <div className="flex flex-col items-center gap-3 p-5 text-center">
                    <p className="text-sm text-muted-foreground">কোনো সক্রিয় প্ল্যান নেই</p>
                    <Link
                        href="/study-plan"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-2 text-xs font-semibold text-teal-400 transition-colors hover:bg-teal-500/20"
                    >
                        <Plus size={12} />
                        স্টাডি প্ল্যান দেখো
                    </Link>
                </div>
            ) : (
                <Link href="/study-plan" className="block space-y-3 p-3 hover:bg-muted/30 transition-colors rounded-b-xl">
                    {/* Segmented progress */}
                    <div>
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">সামগ্রিক অগ্রগতি</span>
                            <span className="font-semibold text-teal-400">
                                {plan.completedItems}/{plan.totalItems}
                            </span>
                        </div>
                        {segmentCount > 0 && (
                            <div className="flex gap-0.5">
                                {Array.from({ length: segmentCount }, (_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'h-1.5 flex-1 rounded-full',
                                            i < plan.completedItems ? 'bg-teal-500' : 'bg-muted',
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Today's items (read-only) */}
                    {todayItems.length > 0 ? (
                        <div className="space-y-0.5">
                            <p className="px-1 text-xs font-semibold text-muted-foreground">আজকের পরিকল্পনা</p>
                            {todayItems.slice(0, 5).map((item) => (
                                <PlanItem key={item.id} item={item} />
                            ))}
                            {todayItems.length > 5 && (
                                <p className="pt-1 text-center text-[11px] text-muted-foreground">
                                    +{todayItems.length - 5} আরো
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="py-2 text-center text-xs text-muted-foreground">আজকের পরিকল্পনা শেষ! 🎉</p>
                    )}
                </Link>
            )}
        </div>
    );
}

function PlanItem({ item }: { item: StudyPlanItemDto }) {
    return (
        <div
            className={cn(
                'flex items-center gap-2 rounded-lg px-1 py-1.5',
                item.isCompleted ? 'opacity-50' : undefined,
            )}
        >
            <div className="shrink-0">
                {item.isCompleted ? (
                    <CheckCircle2 size={15} className="text-primary" />
                ) : (
                    <Circle size={15} className="text-muted-foreground" />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        'truncate text-xs font-medium',
                        item.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground',
                    )}
                >
                    {item.lessonName}
                </p>
                {item.subjectName && (
                    <p className="truncate text-[11px] text-muted-foreground">{item.subjectName}</p>
                )}
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{item.estimatedMinutes}m</span>
        </div>
    );
}
