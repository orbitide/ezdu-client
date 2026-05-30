'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';
import { getAchievements } from '@/lib/api/achievements';
import type { AchievementDto } from '@/types/api';

export function AchievementsPreview() {
    const [earned, setEarned] = useState<AchievementDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAchievements()
            .then((all) => setEarned(all.filter((a) => a.isEarned).slice(0, 6)))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <h3 className="text-sm font-semibold text-zinc-100">অ্যাচিভমেন্ট</h3>
                <Link
                    href="/achievements"
                    className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                    সব দেখো <ArrowRight size={12} />
                </Link>
            </div>
            <div className="p-4">
                {loading ? (
                    <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-16 animate-pulse rounded-lg bg-zinc-800" />
                        ))}
                    </div>
                ) : earned.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-4 text-center">
                        <Trophy size={24} className="text-zinc-700" />
                        <p className="text-xs text-zinc-500">এখনো কোনো অ্যাচিভমেন্ট অর্জিত হয়নি</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {earned.map((a) => (
                            <div
                                key={a.id}
                                className="flex flex-col items-center gap-1 rounded-lg bg-yellow-500/5 border border-yellow-500/20 py-3 px-1"
                            >
                                <span className="text-xl">{a.icon || '🏆'}</span>
                                <p className="line-clamp-2 text-center text-[9px] leading-tight text-zinc-400 px-1">
                                    {a.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
