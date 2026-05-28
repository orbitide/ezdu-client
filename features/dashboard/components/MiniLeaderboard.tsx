import Link from 'next/link';
import { Zap, ChevronRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LeaderboardEntry } from '@/features/leaderboard/types';

interface Props {
    entries: LeaderboardEntry[];
}

function weeklyResetCountdown(): string {
    const now = new Date();
    const next = new Date(now);
    // next Monday 00:00 UTC
    const daysUntilMonday = (8 - now.getUTCDay()) % 7 || 7;
    next.setUTCDate(now.getUTCDate() + daysUntilMonday);
    next.setUTCHours(0, 0, 0, 0);
    const ms = next.getTime() - now.getTime();
    const h = Math.floor(ms / 3600000);
    if (h < 24) return `${h} ঘণ্টায় রিসেট`;
    const d = Math.floor(h / 24);
    return `${d} দিনে রিসেট`;
}

const RANK_ICONS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };
const RANK_COLORS: Record<number, string> = {
    1: 'text-yellow-400',
    2: 'text-zinc-300',
    3: 'text-amber-600',
};

export function MiniLeaderboard({ entries }: Props) {
    const top5 = entries.slice(0, 5);
    const me = entries.find((e) => e.isCurrentUser);
    const showSeparator = me && me.rank > 5;

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-zinc-100">এই সপ্তাহের লিডাররা</h2>
                    <p className="text-xs text-zinc-500">{weeklyResetCountdown()}</p>
                </div>
                <Link
                    href="/leaderboard"
                    className="flex items-center gap-0.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                >
                    সব দেখো <ChevronRight size={12} />
                </Link>
            </div>

            {entries.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                    <ul className="divide-y divide-zinc-800">
                        {top5.map((entry) => (
                            <MiniLeaderboardRow key={entry.userId} entry={entry} />
                        ))}
                        {showSeparator && (
                            <>
                                <li className="flex items-center justify-center py-2 text-xs text-zinc-600">
                                    · · · {me.rank - 5} জন · · ·
                                </li>
                                <MiniLeaderboardRow entry={me} />
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

function MiniLeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
    const initial = entry.name.trim().slice(0, 1) || '?';
    const rankColor = RANK_COLORS[entry.rank] ?? 'text-zinc-500';

    return (
        <li
            className={cn(
                'flex items-center gap-3 px-4 py-3',
                entry.isCurrentUser && 'bg-emerald-500/5 border-l-2 border-emerald-500'
            )}
        >
            {/* Rank */}
            <span className={cn('w-7 shrink-0 text-center text-sm font-bold', rankColor)}>
                {RANK_ICONS[entry.rank] ?? `#${entry.rank}`}
            </span>

            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
                {initial}
            </div>

            {/* Name + XP sub-label */}
            <div className="min-w-0 flex-1">
                <p className={cn(
                    'truncate text-sm font-medium',
                    entry.isCurrentUser ? 'text-emerald-300' : 'text-zinc-100'
                )}>
                    {entry.name}
                    {entry.isCurrentUser && (
                        <span className="ml-1.5 text-xs text-zinc-500">(তুমি)</span>
                    )}
                </p>
                <p className="text-xs text-zinc-500">
                    {entry.streak > 0 ? `🔥 ${entry.streak} দিন স্ট্রিক` : 'কোনো স্ট্রিক নেই'}
                </p>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1 text-sm font-bold text-yellow-400">
                <Zap size={12} />
                {entry.xp >= 1000 ? `${(entry.xp / 1000).toFixed(1)}k` : entry.xp}
            </div>
        </li>
    );
}

function EmptyState() {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center space-y-2">
            <Trophy size={28} className="mx-auto text-yellow-400/40" />
            <p className="text-sm font-medium text-zinc-400">লিডারবোর্ড আনলক করো!</p>
            <p className="text-xs text-zinc-600">একটি কুইজ দাও এবং লিডারবোর্ডে তোমার জায়গা নিশ্চিত করো</p>
        </div>
    );
}
