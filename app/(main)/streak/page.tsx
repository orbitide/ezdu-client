'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStreakCalendar } from '@/lib/api/progress';
import { useMe } from '@/hooks/use-me';
import type { MonthlyStreakDto } from '@/types/api';

const DAY_LABELS = ['রবি', 'সোম', 'মঙ্গ', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

// ─── Calendar ─────────────────────────────────────────────────────────────────

function StreakCalendar({ calendar }: { calendar: MonthlyStreakDto }) {
    const { year, month } = calendar;
    const activeDays = new Set(calendar.activeDays ?? []);
    const frozenDays = new Set(calendar.frozenDays ?? []);

    // Legacy format support
    if (calendar.days && activeDays.size === 0) {
        calendar.days.forEach((d) => { if (d.hasActivity) activeDays.add(d.day); });
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDow = new Date(year, month - 1, 1).getDay(); // 0=Sun
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
    const todayDay = isCurrentMonth ? today.getDate() : -1;

    // Leading empty cells + day cells
    const cells: (number | null)[] = [
        ...Array(firstDow).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const monthLabel = new Date(year, month - 1).toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' });

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
            {/* Title row */}
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-100">এই মাসের অ্যাক্টিভিটি</p>
                <p className="text-xs text-zinc-500">{monthLabel}</p>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1">
                {DAY_LABELS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-semibold text-zinc-600 pb-0.5">{d}</div>
                ))}

                {/* Day cells */}
                {cells.map((day, i) => {
                    if (day === null) {
                        return <div key={`e${i}`} className="aspect-square" />;
                    }
                    const isFuture = isCurrentMonth && day > todayDay;
                    const isToday = day === todayDay;
                    const isActive = activeDays.has(day) && !isFuture;
                    const isFrozen = frozenDays.has(day) && !isActive && !isFuture;

                    return (
                        <div
                            key={day}
                            className={cn(
                                'aspect-square rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors',
                                isFuture && 'bg-zinc-900/40 text-zinc-700',
                                !isFuture && !isToday && !isActive && !isFrozen && 'bg-zinc-800 text-zinc-500 border border-zinc-700/50',
                                isActive && 'bg-orange-500 text-white shadow-sm shadow-orange-500/30',
                                isFrozen && 'bg-sky-500 text-white shadow-sm shadow-sky-500/30',
                                isToday && !isActive && !isFrozen && 'bg-zinc-800 text-orange-400 border-2 border-orange-500/60',
                                isToday && isActive && 'bg-orange-500 text-white border-2 border-orange-300/50',
                            )}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-1">
                {[
                    { color: 'bg-orange-500', label: 'সক্রিয়' },
                    { color: 'bg-sky-500', label: 'ফ্রিজ' },
                    { color: 'bg-zinc-800 border border-zinc-700/50', label: 'মিস' },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <div className={cn('h-3 w-3 rounded', item.color)} />
                        <span className="text-[10px] text-zinc-500">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Stats row ────────────────────────────────────────────────────────────────

function StatTile({ label, value }: { label: string; value: number | null }) {
    return (
        <div className="flex-1 flex flex-col items-center gap-0.5 rounded-xl border border-zinc-800 bg-zinc-900 py-4">
            <p className="text-2xl font-extrabold text-zinc-100 tabular-nums">
                {value ?? '—'}
                {value !== null && <span className="ml-1 text-sm font-semibold text-zinc-400">দিন</span>}
            </p>
            <p className="text-[11px] text-zinc-500">{label}</p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StreakPage() {
    const { data: meData } = useMe();
    const [calendar, setCalendar] = useState<MonthlyStreakDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const streak = meData?.streak ?? 0;
    const streakActive = meData?.streakActive ?? false;
    const freezeCount = meData?.streakFreezeCount ?? 0;

    const load = () => {
        setLoading(true);
        setError(false);
        getStreakCalendar()
            .then(setCalendar)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    // Derived stats (from calendar if available, else from meData)
    const longestStreak = calendar?.longestStreak ?? null;
    const currentStreak = calendar?.activeStreak ?? streak;
    const weekActive = calendar?.weekActiveDays ?? null;

    return (
        <div className="mx-auto max-w-lg px-4 py-6 space-y-4 lg:px-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={streakActive && streak > 0 ? '/icons/streak.svg' : '/icons/streak_outline.svg'}
                        alt="streak"
                        width={22}
                        height={22}
                    />
                    <h1 className="text-lg font-bold text-zinc-100">স্ট্রিক</h1>
                </div>
                {/* Freeze link */}
                <Link
                    href="/streak-freeze"
                    className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/20 transition-colors"
                >
                    <Image src="/icons/streak_freeze.svg" alt="" width={14} height={14} />
                    <span>{freezeCount > 0 ? `${freezeCount} ফ্রিজ` : 'ফ্রিজ কিনো'}</span>
                </Link>
            </div>

            {/* Hero card */}
            <div className={cn(
                'rounded-2xl border p-6 text-center space-y-3',
                streakActive
                    ? 'border-orange-500/30 bg-orange-500/8'
                    : 'border-zinc-800 bg-zinc-900',
            )}
                style={streakActive ? { background: 'color-mix(in srgb, #f97316 8%, transparent)' } : undefined}
            >
                <div className="flex items-baseline justify-center gap-2">
                    <span className={cn('text-6xl font-black tabular-nums', streakActive ? 'text-orange-400' : 'text-zinc-400')}>
                        {streak}
                    </span>
                    <span className="text-xl font-bold text-zinc-500">দিনের স্ট্রিক</span>
                </div>

                {/* Active / Inactive badge */}
                <div className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold',
                    streakActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700',
                )}>
                    <span className={cn('h-1.5 w-1.5 rounded-full', streakActive ? 'bg-emerald-400' : 'bg-zinc-600')} />
                    {streakActive ? 'আজকের স্ট্রিক সক্রিয়' : 'স্ট্রিক সক্রিয় নয়'}
                </div>

                <p className="text-sm text-zinc-500">
                    {streakActive
                        ? 'দারুণ! আজকের স্ট্রিক বজায় আছে। কাল আবার পড়াশোনা করো।'
                        : 'আজকে কুইজ দিলে স্ট্রিক সক্রিয় হবে।'}
                </p>
            </div>

            {/* Calendar */}
            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <Loader2 size={26} className="animate-spin text-orange-400" />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center gap-3 py-8 rounded-xl border border-zinc-800 bg-zinc-900">
                    <p className="text-sm text-zinc-500">ক্যালেন্ডার লোড হয়নি</p>
                    <button
                        onClick={load}
                        className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 transition-colors"
                    >
                        <RefreshCw size={12} />
                        আবার চেষ্টা করো
                    </button>
                </div>
            ) : calendar ? (
                <StreakCalendar calendar={calendar} />
            ) : null}

            {/* Stats row */}
            <div className="flex gap-2">
                <StatTile label="সেরা স্ট্রিক" value={longestStreak} />
                <StatTile label="বর্তমান স্ট্রিক" value={currentStreak} />
                <StatTile label="সাপ্তাহিক" value={weekActive} />
            </div>

            {/* Freeze CTA banner */}
            <Link
                href="/streak-freeze"
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 hover:bg-zinc-800/60 transition-colors"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10">
                    <ShieldCheck size={20} className="text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-100">স্ট্রিক ফ্রিজ</p>
                    <p className="text-xs text-zinc-500">
                        {freezeCount > 0
                            ? `${freezeCount}টি ফ্রিজ আছে — মিস করলে অটো সুরক্ষিত`
                            : 'EC দিয়ে স্ট্রিক বাঁচিয়ে রাখো'}
                    </p>
                </div>
                <span className="text-xs font-semibold text-sky-400">
                    {freezeCount > 0 ? '✓' : 'কিনো →'}
                </span>
            </Link>
        </div>
    );
}
