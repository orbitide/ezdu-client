import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { UserStatsDto, StudyPlanDto } from '@/types/api';

interface Props {
    stats: UserStatsDto | undefined;
    plan: StudyPlanDto | null;
}

export function DashboardStats({ stats, plan }: Props) {
    const streak = stats?.streak ?? 0;
    const xp = stats?.xp ?? 0;
    const coins = stats?.coins ?? 0;

    const daysLeft = plan
        ? Math.max(0, Math.ceil((new Date(plan.endDate).getTime() - Date.now()) / 86400000))
        : 0;

    const STATS = [
        {
            icon: streak > 0 ? '/icons/streak.svg' : '/icons/streak_outline.svg',
            value: streak.toString(),
            unit: 'দিন',
            label: 'স্ট্রিক',
            color: streak > 0 ? 'text-orange-400' : 'text-zinc-500',
            href: '/streak',
        },
        {
            icon: xp > 0 ? '/icons/bolt.svg' : '/icons/bolt_outline.svg',
            value: xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp.toString(),
            unit: 'XP',
            label: 'অভিজ্ঞতা',
            color: xp > 0 ? 'text-yellow-400' : 'text-zinc-500',
            href: '/streak-freeze',
        },
        {
            icon: coins > 0 ? '/icons/coin.svg' : '/icons/coin_outline.svg',
            value: coins.toString(),
            unit: '',
            label: 'কয়েন',
            color: coins > 0 ? 'text-amber-400' : 'text-zinc-500',
            href: '/coins',
        },
        {
            icon: plan ? '/icons/plan.svg' : '/icons/plan_outline.svg',
            value: plan ? daysLeft.toString() : '—',
            unit: plan ? 'দিন' : '',
            label: 'প্ল্যান',
            color: plan ? 'text-purple-400' : 'text-zinc-500',
            href: '/study-plan',
        },
    ] as const;

    return (
        <div className="grid grid-cols-4 gap-1.5">
            {STATS.map((stat) => (
                <Link
                    key={stat.label}
                    href={stat.href}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900 px-2 py-2.5 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                    <Image
                        src={stat.icon}
                        alt={stat.label}
                        width={20}
                        height={20}
                        className="shrink-0 object-contain"
                    />
                    <p className={cn('text-xs font-bold leading-none tabular-nums', stat.color)}>
                        {stat.value}
                        {stat.unit && (
                            <span className="ml-0.5 text-[10px] font-medium">{stat.unit}</span>
                        )}
                    </p>
                </Link>
            ))}
        </div>
    );
}
