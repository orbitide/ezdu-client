import Image from 'next/image';
import type { ActivityItem } from './types';
import { EXAM_MAP } from '@/config/exams';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
    items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 px-4 py-3">
                <h2 className="text-sm font-semibold text-zinc-100">সাম্প্রতিক প্র্যাকটিস</h2>
            </div>
            <ul className="divide-y divide-zinc-800">
                {items.map((item) => {
                    const exam = EXAM_MAP[item.examId];
                    const pct = Math.round((item.score / item.total) * 100);
                    return (
                        <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                            <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', exam.bgClass)}>
                                <Image src={exam.iconSrc} alt={exam.name} width={20} height={20} className="object-contain" />
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-100">{item.subject}</p>
                                <p className="text-xs text-zinc-500">{exam.name} · {item.timeAgo}</p>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    'text-sm font-bold',
                                    pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-yellow-400' : 'text-rose-400'
                                )}>
                                    {item.score}/{item.total}
                                </p>
                                <p className="text-xs text-zinc-500">{pct}%</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
