import type { LeaderboardEntry } from '../types';
import { Flame, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

type PromotionStatus = 'promoted' | 'stayed' | 'demoted';

function getPromotionStatus(index: number, total: number): PromotionStatus {
    if (index < 12) return 'promoted';
    if (index >= total - 8) return 'demoted';
    return 'stayed';
}

function getPromotionTokens(status: PromotionStatus) {
    if (status === 'promoted') return {
        bar: 'bg-green-500',
        border: 'border-green-500/30',
        bg: 'bg-green-500/8',
        strongBorder: 'border-green-500/50',
    };
    if (status === 'demoted') return {
        bar: 'bg-red-500',
        border: 'border-red-500/30',
        bg: 'bg-red-500/8',
        strongBorder: 'border-red-500/50',
    };
    return {
        bar: 'bg-amber-500/60',
        border: 'border-amber-500/20',
        bg: 'bg-amber-500/5',
        strongBorder: 'border-amber-500/30',
    };
}

function getRankTokens(rank: number) {
    if (rank === 1) return { text: 'text-yellow-400', bg: 'bg-yellow-400/15', pill: 'bg-yellow-400/12' };
    if (rank === 2) return { text: 'text-zinc-300', bg: 'bg-zinc-300/15', pill: 'bg-zinc-300/12' };
    if (rank === 3) return { text: 'text-amber-500', bg: 'bg-amber-500/15', pill: 'bg-amber-500/12' };
    if (rank <= 12) return { text: 'text-emerald-400', bg: 'bg-emerald-400/15', pill: 'bg-emerald-400/12' };
    return { text: 'text-zinc-400', bg: 'bg-zinc-700/40', pill: 'bg-zinc-700/40' };
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    const sorted = [...entries].sort((a, b) => a.rank - b.rank);
    const total = sorted.length;
    const topEntries = sorted.slice(0, 10);
    const me = sorted.find((e) => e.isCurrentUser);
    const meIndex = me ? sorted.findIndex((e) => e.userId === me.userId) : -1;
    const showSeparator = me && me.rank > 10;

    return (
        <div className="space-y-2.5">
            {topEntries.map((entry, index) => (
                <LeaderboardTile
                    key={entry.userId}
                    entry={entry}
                    index={index}
                    total={total}
                />
            ))}

            {showSeparator && (
                <>
                    <div className="flex items-center justify-center gap-1.5 py-2 text-xs text-zinc-600">
                        <span>· · ·</span>
                        <span>{me.rank - 10} জন</span>
                        <span>· · ·</span>
                    </div>
                    <LeaderboardTile
                        entry={me}
                        index={meIndex}
                        total={total}
                    />
                </>
            )}
        </div>
    );
}

function LeaderboardTile({
    entry,
    index,
    total,
}: {
    entry: LeaderboardEntry;
    index: number;
    total: number;
}) {
    const promotionStatus = getPromotionStatus(index, total);
    const promoTokens = getPromotionTokens(promotionStatus);
    const rankTokens = getRankTokens(entry.rank);
    const isTopThree = entry.rank <= 3;

    return (
        <div
            className={cn(
                'flex overflow-hidden rounded-xl border transition-colors',
                entry.isCurrentUser ? promoTokens.strongBorder : promoTokens.border,
                promoTokens.bg,
            )}
        >
            {/* Promotion accent bar */}
            <div className={cn('w-1 shrink-0', promoTokens.bar)} />

            {/* Content */}
            <div className="flex flex-1 items-center gap-3 px-3 py-3">
                {/* Rank badge */}
                <div
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                        rankTokens.bg,
                    )}
                >
                    {isTopThree ? (
                        <Trophy size={18} className={rankTokens.text} />
                    ) : (
                        <span className={cn('text-sm font-bold tabular-nums', rankTokens.text)}>
                            {entry.rank}
                        </span>
                    )}
                </div>

                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-300 ring-2 ring-zinc-700/60">
                    {entry.name.slice(0, 1)}
                </div>

                {/* Name + streak */}
                <div className="flex-1 min-w-0">
                    <p className={cn(
                        'text-sm font-semibold truncate leading-snug',
                        entry.isCurrentUser ? 'text-emerald-300' : 'text-zinc-100',
                    )}>
                        {entry.name}
                        {entry.isCurrentUser && (
                            <span className="ml-1.5 text-xs font-normal text-zinc-500">(তুমি)</span>
                        )}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                        <Flame size={11} className="text-orange-400 shrink-0" />
                        <span className="text-xs text-zinc-500">{entry.streak} day streak</span>
                    </div>
                </div>

                {/* XP pill */}
                <div
                    className={cn(
                        'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5',
                        rankTokens.pill,
                    )}
                >
                    <Star size={12} className={rankTokens.text} />
                    <span className={cn('text-sm font-semibold tabular-nums', rankTokens.text)}>
                        {entry.xp.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
