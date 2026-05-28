'use client';

import { useState, useEffect } from 'react';
import { Trophy, Loader2 } from 'lucide-react';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';
import { getLeaderboard, getClassRank } from '@/lib/api/leaderboard';
import type { LeaderboardEntry } from '@/features/leaderboard/types';
import type { ClassRankDto } from '@/types/api';
import { useAuthStore } from '@/store/auth.store';

export default function LeaderboardPage() {
    const user = useAuthStore((s) => s.user);
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [classRank, setClassRank] = useState<ClassRankDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getLeaderboard().catch(() => []),
            getClassRank().catch(() => null),
        ]).then(([lb, rank]) => {
            const mapped: LeaderboardEntry[] = lb.map((e) => ({
                rank: e.rank,
                userId: e.userId,
                name: e.name,
                xp: e.xp,
                level: 1,
                streak: e.streak,
                accuracy: 0,
                isCurrentUser: user ? e.userId === user.id : e.isCurrentUser,
            }));
            setEntries(mapped);
            setClassRank(rank);
        }).finally(() => setLoading(false));
    }, [user]);

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <Trophy size={20} className="text-yellow-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">লিডারবোর্ড</h1>
                    <p className="text-xs text-zinc-500">এই সপ্তাহের সেরা শিক্ষার্থীরা</p>
                </div>
            </div>

            {/* Class rank badge */}
            {classRank && (
                <div className="flex items-center gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
                    <Trophy size={16} className="text-yellow-400 shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-zinc-100">
                            তোমার অবস্থান: <span className="text-yellow-400">#{classRank.rank}</span>
                        </p>
                        <p className="text-xs text-zinc-500">{classRank.totalUsers} জনের মধ্যে · {classRank.xp} XP</p>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl bg-zinc-900 p-1">
                {['সাপ্তাহিক', 'মাসিক', 'সর্বকালীন'].map((tab, i) => (
                    <button
                        key={tab}
                        className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                            i === 0 ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="animate-spin text-yellow-400" />
                </div>
            ) : entries.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
                    <p className="text-sm text-zinc-400">এখনো কোনো ডেটা নেই</p>
                </div>
            ) : (
                <LeaderboardTable entries={entries} />
            )}
        </div>
    );
}
