import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: ReactNode;
    trend?: string;
    trendUp?: boolean;
    colorClass?: string;
}

export function StatsCard({ label, value, icon, trend, trendUp, colorClass = 'text-primary' }: StatsCardProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <p className={cn('mt-1 text-2xl font-bold', colorClass)}>{value}</p>
                    {trend && (
                        <p className={cn('mt-1 text-xs', trendUp ? 'text-primary' : 'text-rose-400')}>
                            {trendUp ? '↑' : '↓'} {trend}
                        </p>
                    )}
                </div>
                <div className={cn('rounded-lg p-2 bg-muted', colorClass)}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
