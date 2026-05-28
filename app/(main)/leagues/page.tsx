'use client';

import { useEffect, useState } from 'react';
import { Loader2, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLeaderboard, getLeagueOutcome, acknowledgeLeagueOutcome, joinLeague } from '@/lib/api/leaderboard';

interface League {
    name: string;
    xpRequired: number;
    color: string;
    bg: string;
    border: string;
    icon: string;
}

const LEAGUES: League[] = [
    { name: 'ব্রোঞ্জ', xpRequired: 0, color: 'text-orange-700', bg: 'bg-orange-900/10', border: 'border-orange-700/30', icon: '🥉' },
    { name: 'সিলভার', xpRequired: 500, color: 'text-zinc-400', bg: 'bg-zinc-800', border: 'border-zinc-600/30', icon: '🥈' },
    { name: 'গোল্ড', xpRequired: 1500, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '🥇' },
    { name: 'প্লাটিনাম', xpRequired: 5000, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: '💎' },
    { name: 'ডায়মন্ড', xpRequired: 15000, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: '✨' },
];

export default function LeaguesPage() {
    const [loading, setLoading] = useState(true);
    const [outcome, setOutcome] = useState<{ outcome: string; newLeague: string; xpEarned: number } | null>(null);

    useEffect(() => {
        Promise.all([
            getLeagueOutcome().catch(() => null),
        ]).then(([o]) => {
            setOutcome(o);
        }).finally(() => setLoading(false));
    }, []);

    const handleAcknowledge = async () => {
        await acknowledgeLeagueOutcome();
        setOutcome(null);
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <Shield size={20} className="text-yellow-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">লিগ</h1>
                    <p className="text-xs text-zinc-500">সাপ্তাহিক প্রতিযোগিতা</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-yellow-400" />
                </div>
            ) : (
                <>
                    {/* Outcome banner */}
                    {outcome && (
                        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5 space-y-3">
                            <p className="text-center text-sm font-semibold text-yellow-300">
                                🎉 এই সপ্তাহের ফলাফল
                            </p>
                            <p className="text-center text-xs text-zinc-400">{outcome.outcome}</p>
                            <button
                                onClick={handleAcknowledge}
                                className="w-full rounded-xl bg-yellow-500 py-2.5 text-sm font-semibold text-black hover:bg-yellow-400 transition-colors"
                            >
                                ঠিক আছে
                            </button>
                        </div>
                    )}

                    {/* League tiers */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-zinc-300">লিগের স্তরসমূহ</p>
                        {LEAGUES.map((league, i) => (
                            <div key={league.name} className={cn('flex items-center gap-4 rounded-xl border p-4', league.bg, league.border)}>
                                <span className="text-2xl">{league.icon}</span>
                                <div className="flex-1">
                                    <p className={cn('font-semibold text-sm', league.color)}>{league.name}</p>
                                    <p className="text-xs text-zinc-500">
                                        {i === 0 ? 'শুরু থেকে' : `${league.xpRequired.toLocaleString()}+ XP`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* How it works */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">
                        <p className="text-sm font-semibold text-zinc-100">কীভাবে কাজ করে?</p>
                        {[
                            'প্রতি সপ্তাহে XP অর্জন করো',
                            'শীর্ষে থাকলে উপরের লিগে যাও',
                            'নিচে পড়ে গেলে নামবে',
                            'প্রতি সোমবার নতুন লিগ শুরু',
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                                <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                                {text}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
