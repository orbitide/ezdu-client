import { Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserRankCardProps {
    streak: number;
    coin: number;
    leagueName: string;
    totalXp: number;
}

function getLeagueBorderClass(league: string): string {
    const n = league.toLowerCase();
    if (n === 'bronze') return 'border-amber-600/40';
    if (n === 'silver') return 'border-slate-400/40';
    if (n === 'gold') return 'border-yellow-400/40';
    if (n === 'platinum') return 'border-sky-400/40';
    if (n === 'diamond') return 'border-blue-400/40';
    if (n === 'emerald') return 'border-emerald-400/40';
    if (n === 'champion') return 'border-purple-400/40';
    return 'border-zinc-700/40';
}

function getLeagueEmoji(league: string): string {
    const n = league.toLowerCase();
    if (n === 'bronze') return '🥉';
    if (n === 'silver') return '🥈';
    if (n === 'gold') return '🥇';
    if (n === 'platinum') return '🪙';
    if (n === 'diamond') return '💎';
    if (n === 'emerald') return '💚';
    if (n === 'champion') return '🏆';
    return '🏅';
}

function StatCell({ icon, value }: { icon: React.ReactNode; value: string }) {
    return (
        <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0">{icon}</span>
            <span className="text-sm font-extrabold text-zinc-100 truncate">{value}</span>
        </div>
    );
}

export function UserRankCard({ streak, coin, leagueName, totalXp }: UserRankCardProps) {
    return (
        <div className={cn('rounded-xl border-2 p-4', getLeagueBorderClass(leagueName))}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <StatCell
                    icon={<Flame size={18} className="text-orange-400" />}
                    value={`${streak} দিন`}
                />
                <StatCell
                    icon={<span className="text-base">🪙</span>}
                    value={`${coin} EC`}
                />
                <StatCell
                    icon={<span className="text-base">{getLeagueEmoji(leagueName)}</span>}
                    value={leagueName || 'লিগ নেই'}
                />
                <StatCell
                    icon={<Zap size={18} className="text-yellow-400" />}
                    value={`${totalXp} XP`}
                />
            </div>
        </div>
    );
}
