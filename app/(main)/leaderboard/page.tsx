'use client';

import { useState, useEffect } from 'react';
import { Trophy, Loader2 } from 'lucide-react';
import { toBangla } from '@/lib/utils';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';
import { getLeaderboard, getClassRank } from '@/lib/api/leaderboard';
import type { LeaderboardEntry } from '@/features/leaderboard/types';
import type { ClassRankDto } from '@/types/api';
import { useAuthStore } from '@/store/auth.store';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

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
        <PageContainer>
        <TwoColumnShell right={<DefaultRightRail />}>
        <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                            <Trophy size={20} className="text-yellow-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">লিডারবোর্ড</h1>
                            <p className="text-xs text-muted-foreground">এই সপ্তাহের সেরা শিক্ষার্থীরা</p>
                        </div>
                    </div>

                    {/* Rank pill — mirrors mobile AppBar badge */}
                    {classRank && classRank.rank > 0 && (
                        <div
                            className="flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5"
                            style={{ boxShadow: '0 3px 0 #b45309' }}
                        >
                            <Trophy size={12} className="text-yellow-900" />
                            <span className="text-xs font-bold text-yellow-900">
                                #{toBangla(classRank.rank)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Promotion legend */}
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-muted-foreground">পদোন্নতি</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-amber-500/70" />
                        <span className="text-xs text-muted-foreground">অপরিবর্তিত</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-xs text-muted-foreground">অবনতি</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 size={28} className="animate-spin text-yellow-400" />
                    </div>
                ) : entries.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-12">
                        <Trophy size={48} className="text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">এখনো কোনো লিডারবোর্ড তথ্য নেই</p>
                    </div>
                ) : (
                    <LeaderboardTable entries={entries} />
                )}
        </div>
        </TwoColumnShell>
        </PageContainer>
    );
}
