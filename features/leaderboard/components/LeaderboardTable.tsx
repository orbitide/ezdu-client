import type { LeaderboardEntry } from '../types';
import { EXAM_MAP } from '@/config/exams';
import { Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

const RANK_STYLES: Record<number, string> = {
    1: 'text-yellow-400',
    2: 'text-zinc-300',
    3: 'text-amber-600',
};

const RANK_ICONS: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
};

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    const top = entries.filter((e) => e.rank <= 9);
    const me = entries.find((e) => e.isCurrentUser);
    const showSeparator = me && me.rank > 9;

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <ul className="divide-y divide-zinc-800">
                {top.map((entry) => (
                    <LeaderboardRow key={entry.userId} entry={entry} />
                ))}
                {showSeparator && (
                    <>
                        <li className="flex items-center justify-center py-2 text-xs text-zinc-600">
                            · · · {me.rank - 9} জন · · ·
                        </li>
                        <LeaderboardRow entry={me} />
                    </>
                )}
            </ul>
        </div>
    );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
    return (
        <li className={cn(
            'flex items-center gap-3 px-4 py-3',
            entry.isCurrentUser && 'bg-emerald-500/5 border-l-2 border-emerald-500'
        )}>
            <span className={cn('w-8 text-center text-sm font-bold', RANK_STYLES[entry.rank] ?? 'text-zinc-500')}>
                {RANK_ICONS[entry.rank] ?? `#${entry.rank}`}
            </span>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-400">
                {entry.name.slice(0, 1)}
            </div>
            <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium truncate', entry.isCurrentUser ? 'text-emerald-300' : 'text-zinc-100')}>
                    {entry.name} {entry.isCurrentUser && <span className="text-xs text-zinc-500">(তুমি)</span>}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>Lv.{entry.level}</span>
                    <Flame size={10} className="text-orange-400" />
                    <span>{entry.streak}</span>
                    <span>{entry.accuracy}% সঠিক</span>
                </div>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-bold text-yellow-400">
                    <Zap size={12} />
                    {entry.xp.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-600">XP</p>
            </div>
        </li>
    );
}
