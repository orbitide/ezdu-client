import Image from 'next/image';
import type { ExamProgress } from './types';
import { EXAM_MAP } from '@/config/exams';
import { cn } from '@/lib/utils';

interface ExamProgressProps {
    items: ExamProgress[];
}

export function ExamProgressList({ items }: ExamProgressProps) {
    return (
        <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold text-foreground">পরীক্ষার অগ্রগতি</h2>
            </div>
            <ul className="divide-y divide-border p-2">
                {items.map((item) => {
                    const exam = EXAM_MAP[item.examId];
                    const pct = Math.round((item.completedTopics / item.totalTopics) * 100);
                    return (
                        <li key={item.examId} className="px-2 py-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={cn('flex h-7 w-7 items-center justify-center rounded', exam.bgClass)}>
                                        <Image src={exam.iconSrc} alt={exam.name} width={18} height={18} className="object-contain" />
                                    </span>
                                    <span className="text-sm font-medium text-foreground">{exam.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className={cn('text-sm font-bold', exam.textClass)}>{pct}%</span>
                                    <p className="text-xs text-muted-foreground">{item.completedTopics}/{item.totalTopics} টপিক</p>
                                </div>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className={cn('h-full rounded-full transition-all', exam.bgBarClass)}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">শেষ প্র্যাকটিস: {item.lastPracticed}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
