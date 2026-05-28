'use client';

import { useEffect, useState } from 'react';
import { Trophy, Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAchievements } from '@/lib/api/achievements';
import type { AchievementDto } from '@/types/api';

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<AchievementDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAchievements()
            .then(setAchievements)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const earned = achievements.filter((a) => a.isEarned);
    const locked = achievements.filter((a) => !a.isEarned);

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-6 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <Trophy size={20} className="text-yellow-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">অ্যাচিভমেন্ট</h1>
                    <p className="text-xs text-zinc-500">{earned.length}/{achievements.length} অর্জিত</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-yellow-400" />
                </div>
            ) : achievements.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <Trophy size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">কোনো অ্যাচিভমেন্ট নেই</p>
                </div>
            ) : (
                <>
                    {/* Earned */}
                    {earned.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-zinc-300">অর্জিত ({earned.length})</h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {earned.map((a) => (
                                    <AchievementCard key={a.id} achievement={a} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Locked */}
                    {locked.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-sm font-semibold text-zinc-500">অর্জন করোনি ({locked.length})</h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {locked.map((a) => (
                                    <AchievementCard key={a.id} achievement={a} />
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

function AchievementCard({ achievement: a }: { achievement: AchievementDto }) {
    return (
        <div className={cn(
            'flex items-start gap-3 rounded-xl border p-4',
            a.isEarned
                ? 'border-yellow-500/30 bg-yellow-500/5'
                : 'border-zinc-800 bg-zinc-900 opacity-60'
        )}>
            <div className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl',
                a.isEarned ? 'bg-yellow-500/10' : 'bg-zinc-800'
            )}>
                {a.isEarned ? (a.icon || '🏆') : <Lock size={18} className="text-zinc-600" />}
            </div>
            <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-semibold', a.isEarned ? 'text-yellow-300' : 'text-zinc-500')}>
                    {a.name}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{a.description}</p>
                {!a.isEarned && a.progress !== undefined && a.target !== undefined && (
                    <div className="mt-2">
                        <div className="flex justify-between text-xs text-zinc-600 mb-1">
                            <span>{a.progress}/{a.target}</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div
                                className="h-full rounded-full bg-zinc-600 transition-all"
                                style={{ width: `${Math.min((a.progress / a.target) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}
                {a.isEarned && a.earnedAt && (
                    <p className="text-xs text-zinc-600 mt-1">
                        {new Date(a.earnedAt).toLocaleDateString('bn-BD')}
                    </p>
                )}
            </div>
        </div>
    );
}
