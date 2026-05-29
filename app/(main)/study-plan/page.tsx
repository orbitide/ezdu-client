'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActivePlan } from '@/lib/api/study-plan';
import { getQuestionsByLesson } from '@/lib/api/quiz';
import { localDateKey } from '@/lib/study-plan/map-study-plan';
import { useChallengeStore } from '@/features/challenge/challenge.store';
import type { StudyPlanDto, StudyPlanItemDto, StudyPlanDayDto } from '@/types/api';

// Zigzag x-positions cycling: right → left → center
const ZIGZAG = ['left-[70%]', 'left-[30%]', 'left-1/2'] as const;

export default function StudyPlanPage() {
    const router = useRouter();
    const [plan, setPlan] = useState<StudyPlanDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startingItemId, setStartingItemId] = useState<string | null>(null);
    const { startChallenge } = useChallengeStore();
    const todayRef = useRef<HTMLDivElement | null>(null);

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

    // Auto-scroll to today after plan loads
    useEffect(() => {
        if (!loading && plan && todayRef.current) {
            todayRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }, [loading, plan]);

    const handleStartPlanQuiz = useCallback(async (item: StudyPlanItemDto) => {
        setStartingItemId(item.id);
        try {
            const quiz = await getQuestionsByLesson(item.lessonId);
            const questions = quiz.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subject: item.subjectName ?? q.subjectName,
                topic: q.topicName,
            }));
            if (questions.length === 0) { setStartingItemId(null); return; }
            startChallenge(questions, item.subjectName ?? '', item.lessonName, {
                lessonId: Number(item.lessonId),
                dayNumber: item.dayNumber ?? 1,
                subjectId: item.subjectId ?? 0,
            });
            router.push('/challenge/session');
        } catch {
            setStartingItemId(null);
        }
    }, [startChallenge, router]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-4 lg:px-6">
            {error && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                </div>
            )}

            {!plan ? (
                <NoPlanState />
            ) : (
                <PlanPath
                    plan={plan}
                    startingItemId={startingItemId}
                    todayRef={todayRef}
                    onStartQuiz={handleStartPlanQuiz}
                />
            )}
        </div>
    );
}

// ── No plan ─────────────────────────────────────────────────────────────────

function NoPlanState() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10">
                <BookOpen size={28} className="text-teal-400" />
            </div>
            <div>
                <p className="text-base font-semibold text-zinc-100">কোনো সক্রিয় প্ল্যান নেই</p>
                <p className="mt-1 text-sm text-zinc-500">
                    Ezdu মোবাইল অ্যাপ থেকে স্টাডি প্ল্যান তৈরি করুন।<br />তৈরি হলে এখানে দেখাবে।
                </p>
            </div>
        </div>
    );
}

// ── Progress strip ───────────────────────────────────────────────────────────

function ProgressStrip({ plan }: { plan: StudyPlanDto }) {
    const pct = plan.totalItems > 0 ? plan.completedItems / plan.totalItems : 0;
    const isComplete = pct >= 1;

    const endDate = new Date(plan.endDate);
    const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / 86400000));

    return (
        <div className="flex items-center gap-3 px-1 py-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-700',
                        isComplete ? 'bg-amber-400' : 'bg-teal-500',
                    )}
                    style={{ width: `${pct * 100}%` }}
                />
            </div>
            <span
                className={cn(
                    'shrink-0 text-xs font-bold',
                    isComplete ? 'text-amber-400' : 'text-teal-400',
                )}
            >
                {plan.completedItems}/{plan.totalItems}
            </span>
            {isComplete ? (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/15">
                    <CheckCircle size={11} className="text-amber-400" />
                </div>
            ) : (
                <span className="shrink-0 text-[11px] text-zinc-500">{daysLeft} দিন বাকি</span>
            )}
        </div>
    );
}

// ── Day banner ───────────────────────────────────────────────────────────────

function DayBanner({
    day,
    isToday,
    isTodayRef,
}: {
    day: StudyPlanDayDto;
    isToday: boolean;
    isTodayRef?: React.RefObject<HTMLDivElement | null>;
}) {
    const allDone = day.items.length > 0 && day.items.every((i) => i.isCompleted);

    return (
        <div
            ref={isToday ? isTodayRef : undefined}
            className={cn(
                'flex items-stretch overflow-hidden rounded-xl border',
                isToday
                    ? 'border-teal-500/35 bg-teal-500/10'
                    : 'border-zinc-800 bg-zinc-900',
            )}
        >
            {/* Accent ribbon */}
            <div
                className={cn(
                    'w-1 shrink-0 self-stretch my-2 ml-2 rounded-full',
                    isToday ? 'bg-teal-500' : 'bg-zinc-700',
                )}
            />
            <div className="flex flex-1 items-center gap-2 px-3 py-3">
                <span
                    className={cn(
                        'text-base font-extrabold tracking-tight',
                        isToday ? 'text-teal-400' : 'text-zinc-100',
                    )}
                >
                    {isToday ? 'আজ' : `${day.dayNumber} দিন`}
                </span>
                {isToday && (
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                )}
            </div>
            <div className="flex items-center gap-1.5 px-3">
                <span
                    className={cn(
                        'text-xs font-semibold',
                        isToday ? 'text-teal-400/85' : 'text-zinc-500',
                    )}
                >
                    {day.items.length}টি লেসন
                </span>
                {allDone && (
                    <CheckCircle size={16} className="text-emerald-400" />
                )}
            </div>
        </div>
    );
}

// ── Circular plan node ────────────────────────────────────────────────────────

type NodeState = 'completed' | 'today' | 'missed' | 'future';

function getNodeState(item: StudyPlanItemDto, isToday: boolean, isPast: boolean): NodeState {
    if (item.isCompleted) return 'completed';
    if (isPast && !isToday) return 'missed';
    if (isToday || isPast) return 'today';
    return 'future';
}

const NODE_COLORS: Record<NodeState, { ring: string; bg: string; border: string }> = {
    completed: { ring: '#10b981', bg: 'bg-emerald-500', border: 'border-emerald-400/30' },
    today:     { ring: '#14b8a6', bg: 'bg-teal-500',    border: 'border-teal-400/30' },
    missed:    { ring: '#f59e0b', bg: 'bg-amber-500',   border: 'border-amber-400/30' },
    future:    { ring: '#3f3f46', bg: 'bg-zinc-700',    border: 'border-zinc-600/40' },
};

function PlanNodeCircle({
    item,
    state,
    isNextToDo,
    onClick,
    loading,
}: {
    item: StudyPlanItemDto;
    state: NodeState;
    isNextToDo: boolean;
    onClick?: () => void;
    loading?: boolean;
}) {
    const RING_STROKE = 5;
    const RING_GAP = 4; // px gap between inner circle edge and ring inner edge
    const innerSize = isNextToDo ? 72 : 64;
    const r = innerSize / 2 + RING_GAP + RING_STROKE / 2;
    const outerSize = Math.ceil(r * 2 + RING_STROKE + 2);
    const iconSize  = Math.round(innerSize * 0.42);
    const colors    = NODE_COLORS[state];
    const mastery   = Math.min(1, Math.max(0, (item.masteryPercent ?? 0) / 100));
    const circ  = 2 * Math.PI * r;
    const offset = circ * (1 - mastery);

    const isClickable = (state === 'today' || state === 'missed') && !!onClick;

    const inner = (
        <div className="relative flex flex-col items-center gap-2">
            {/* SVG ring */}
            <div className="relative">
                {/* Pulsing glow for the current/next-to-do node */}
                {isNextToDo && (
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: outerSize + 10,
                            height: outerSize + 10,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            border: `2px solid ${colors.ring}`,
                        }}
                        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                )}
                <svg
                    width={outerSize}
                    height={outerSize}
                    style={{ transform: 'rotate(-90deg)' }}
                >
                    <circle
                        cx={outerSize / 2}
                        cy={outerSize / 2}
                        r={r}
                        stroke="#3f3f46"
                        strokeWidth="5"
                        fill="none"
                    />
                    <circle
                        cx={outerSize / 2}
                        cy={outerSize / 2}
                        r={r}
                        stroke={colors.ring}
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
                    />
                </svg>

                {/* Inner circle with icon — explicitly sized so it sits inside the ring track */}
                <div
                    className={cn(
                        'absolute flex items-center justify-center rounded-full border-2',
                        colors.bg,
                        colors.border,
                    )}
                    style={{
                        width: innerSize,
                        height: innerSize,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {loading ? (
                        <Loader2 size={iconSize} className="animate-spin text-white/80" />
                    ) : state === 'future' ? (
                        <Lock size={iconSize} className="text-white/50" />
                    ) : (
                        <Star size={iconSize} className="text-white" fill="white" />
                    )}
                </div>
            </div>

            {/* Label / speech bubble */}
            {isNextToDo ? (
                <div className="relative flex flex-col items-center">
                    {/* Arrow pointer */}
                    <div
                        className="h-3 w-3 rotate-45 border-l border-t border-teal-500/45 bg-teal-500/15"
                        style={{ marginBottom: '-6px', zIndex: 1 }}
                    />
                    <div
                        className="relative rounded-2xl border border-teal-500/45 bg-teal-500/15 px-3 py-2 text-center shadow-lg"
                        style={{
                            maxWidth: outerSize + 24,
                            boxShadow: '0 4px 10px rgba(20,184,166,0.22)',
                        }}
                    >
                        <p className="text-sm font-extrabold leading-tight text-teal-100 line-clamp-2">
                            {item.lessonName}
                        </p>
                    </div>
                </div>
            ) : (
                <p
                    className={cn(
                        'text-center text-xs font-semibold leading-tight line-clamp-2',
                        state === 'completed' ? 'text-zinc-500' :
                        state === 'future'    ? 'text-zinc-600' : 'text-zinc-300',
                    )}
                    style={{ width: outerSize + 24, maxWidth: outerSize + 24 }}
                >
                    {item.lessonName}
                </p>
            )}
        </div>
    );

    if (isNextToDo) {
        return (
            <motion.div
                className={cn(isClickable ? 'cursor-pointer' : undefined)}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                onClick={isClickable ? onClick : undefined}
            >
                {inner}
            </motion.div>
        );
    }

    return (
        <div
            className={cn(isClickable ? 'cursor-pointer hover:opacity-85 transition-opacity' : undefined)}
            onClick={isClickable ? onClick : undefined}
        >
            {inner}
        </div>
    );
}

// ── Full path layout ─────────────────────────────────────────────────────────

function PlanPath({
    plan,
    startingItemId,
    todayRef,
    onStartQuiz,
}: {
    plan: StudyPlanDto;
    startingItemId: string | null;
    todayRef: React.RefObject<HTMLDivElement | null>;
    onStartQuiz: (item: StudyPlanItemDto) => void;
}) {
    const today = localDateKey(new Date());

    // Find today's day for "isNextToDo" detection
    const todayDay = plan.days.find((d) => localDateKey(d.date) === today);
    const nextToDoId = todayDay
        ? todayDay.items.find((i) => !i.isCompleted)?.id ?? null
        : null;

    let nodeIndex = 0;

    return (
        <div className="space-y-0">
            <ProgressStrip plan={plan} />

            {plan.days.map((day) => {
                const isToday   = localDateKey(day.date) === today;
                const isPast    = new Date(day.date) < new Date(new Date().toDateString());

                return (
                    <div key={day.dayNumber} className="space-y-0">
                        {/* Day banner */}
                        <div className="py-3">
                            <DayBanner
                                day={day}
                                isToday={isToday}
                                isTodayRef={isToday ? todayRef : undefined}
                            />
                        </div>

                        {/* Nodes for this day */}
                        {day.items.map((item) => {
                            const zigzagClass = ZIGZAG[nodeIndex % ZIGZAG.length];
                            const state       = getNodeState(item, isToday, isPast);
                            const isNextToDo  = item.id === nextToDoId;
                            const canStart    = state === 'today' || state === 'missed';

                            // Node row height: node circle + label + spacing
                            const rowHeight = isNextToDo ? 200 : 175;

                            nodeIndex++;

                            return (
                                <div
                                    key={item.id}
                                    className="relative w-full"
                                    style={{ height: rowHeight }}
                                >
                                    <div
                                        className={cn(
                                            'absolute -translate-x-1/2',
                                            zigzagClass,
                                        )}
                                        style={{ top: 12 }}
                                    >
                                        <PlanNodeCircle
                                            item={item}
                                            state={state}
                                            isNextToDo={isNextToDo}
                                            onClick={canStart ? () => onStartQuiz(item) : undefined}
                                            loading={startingItemId === item.id}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
