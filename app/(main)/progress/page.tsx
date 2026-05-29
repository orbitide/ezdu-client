'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Calendar, Flame, Target, Zap, ChevronRight, Loader2, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProgress, getStreakCalendar } from '@/lib/api/progress';
import { useMe } from '@/hooks/use-me';
import type { ProgressDto, MonthlyStreakDto } from '@/types/api';

export default function ProgressPage() {
    const { data: meData } = useMe();
    const [progress, setProgress] = useState<ProgressDto | null>(null);
    const [calendar, setCalendar] = useState<MonthlyStreakDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getProgress().catch(() => null),
            getStreakCalendar().catch(() => null),
        ]).then(([p, c]) => {
            setProgress(p);
            setCalendar(c);
        }).finally(() => setLoading(false));
    }, []);

    const stats = meData ? { xp: meData.totalXp, streak: meData.streak, accuracy: 0, totalQuizzes: 0 } : null;

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <TrendingUp size={20} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">অগ্রগতি</h1>
                    <p className="text-xs text-zinc-500">তোমার শেখার পরিসংখ্যান</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-blue-400" />
                </div>
            ) : (
                <>
                    {/* Key stats */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <StatTile label="মোট XP" value={(stats?.xp ?? 0).toLocaleString()} icon={<Zap size={16} />} color="text-yellow-400" />
                        <StatTile label="স্ট্রিক" value={`${stats?.streak ?? 0} দিন`} icon={<Flame size={16} />} color="text-orange-400" />
                        <StatTile label="নির্ভুলতা" value={`${stats?.accuracy ?? 0}%`} icon={<Target size={16} />} color="text-emerald-400" />
                        <StatTile label="মোট কুইজ" value={stats?.totalQuizzes ?? 0} icon={<BarChart2 size={16} />} color="text-blue-400" />
                    </div>

                    {/* Streak calendar */}
                    {calendar && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar size={16} className="text-zinc-400" />
                                <span className="text-sm font-semibold text-zinc-100">স্ট্রিক ক্যালেন্ডার</span>
                                <span className="ml-auto text-xs text-zinc-500">
                                    {new Date(calendar.year, calendar.month - 1).toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <StreakCalendar calendar={calendar} />
                        </div>
                    )}

                    {/* Weak subjects */}
                    {progress && progress.weakSubjects.length > 0 && (
                        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-3">
                            <p className="text-sm font-semibold text-zinc-100">দুর্বল বিষয়সমূহ</p>
                            {progress.weakSubjects.slice(0, 5).map((s) => (
                                <div key={s.subjectId} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-zinc-300">{s.subjectName}</span>
                                        <span className="text-rose-400 font-medium">{s.accuracy}%</span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                                        <div className="h-full rounded-full bg-rose-500 transition-all" style={{ width: `${s.accuracy}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Navigation tiles */}
                    <div className="grid gap-2 sm:grid-cols-3">
                        {[
                            { href: '/progress/history', label: 'কুইজ ইতিহাস', desc: 'সব পরীক্ষার ফলাফল', icon: BarChart2, color: 'text-blue-400 bg-blue-500/10' },
                            { href: '/progress/mastery', label: 'বিষয় দক্ষতা', desc: 'কোন বিষয়ে কতটা পারো', icon: Target, color: 'text-emerald-400 bg-emerald-500/10' },
                            { href: '/progress/mistakes', label: 'ভুলের তালিকা', desc: 'যেগুলো ভুল হয়েছে', icon: Zap, color: 'text-rose-400 bg-rose-500/10' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                            >
                                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', item.color.split(' ').slice(1).join(' '))}>
                                    <item.icon size={18} className={item.color.split(' ')[0]} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-100">{item.label}</p>
                                    <p className="text-xs text-zinc-500">{item.desc}</p>
                                </div>
                                <ChevronRight size={14} className="text-zinc-600 shrink-0" />
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function StatTile({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className={cn('mb-1.5', color)}>{icon}</div>
            <p className={cn('text-xl font-bold', color)}>{value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
        </div>
    );
}

function StreakCalendar({ calendar }: { calendar: MonthlyStreakDto }) {
    const daysInMonth = new Date(calendar.year, calendar.month, 0).getDate();
    const firstDay = new Date(calendar.year, calendar.month - 1, 1).getDay();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === calendar.year && today.getMonth() + 1 === calendar.month;
    const todayDay = isCurrentMonth ? today.getDate() : -1;

    const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => {
        if (i < firstDay) return null;
        const day = i - firstDay + 1;
        const streakDay = calendar.days.find((d) => d.day === day);
        return { day, hasActivity: streakDay?.hasActivity ?? false, isToday: day === todayDay };
    });

    return (
        <div className="grid grid-cols-7 gap-1">
            {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'].map((d) => (
                <div key={d} className="text-center text-[10px] font-medium text-zinc-600 pb-1">{d}</div>
            ))}
            {cells.map((cell, i) => (
                <div
                    key={i}
                    className={cn(
                        'aspect-square rounded flex items-center justify-center text-[10px] font-medium',
                        !cell ? 'invisible' :
                        cell.isToday ? 'ring-1 ring-emerald-500 bg-emerald-500/10 text-emerald-400' :
                        cell.hasActivity ? 'bg-emerald-500 text-black' :
                        'bg-zinc-800 text-zinc-600'
                    )}
                >
                    {cell?.day}
                </div>
            ))}
        </div>
    );
}
