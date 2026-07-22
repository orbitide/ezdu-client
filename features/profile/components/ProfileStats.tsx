import Image from 'next/image';
import type { UserProfile, ExamHistory } from '../types';
import type { Badge } from '@/types/user';
import { EXAM_MAP } from '@/config/exams';
import { cn } from '@/lib/utils';

interface ProfileStatsProps {
    profile: UserProfile;
    history: ExamHistory[];
}

export function ProfileStats({ profile, history }: ProfileStatsProps) {
    const accuracy = profile.totalQuestions > 0
        ? Math.round((profile.correctAnswers / profile.totalQuestions) * 100)
        : 0;

    return (
        <div className="space-y-4">
            {/* Overall stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{profile.totalQuestions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">মোট প্রশ্ন</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <p className="text-2xl font-bold text-blue-400">{accuracy}%</p>
                    <p className="text-xs text-muted-foreground">নির্ভুলতা</p>
                </div>
            </div>

            {/* Badges */}
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                    <h2 className="text-sm font-semibold text-foreground">অর্জন</h2>
                </div>
                <div className="grid grid-cols-4 gap-3 p-4">
                    {profile.badges.map((badge) => (
                        <BadgeTile key={badge.id} badge={badge} />
                    ))}
                </div>
            </div>

            {/* Exam history */}
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-4 py-3">
                    <h2 className="text-sm font-semibold text-foreground">সাম্প্রতিক ইতিহাস</h2>
                </div>
                <ul className="divide-y divide-border">
                    {history.map((item, i) => {
                        const exam = EXAM_MAP[item.examId];
                        const pct = Math.round((item.score / item.total) * 100);
                        return (
                            <li key={i} className="flex items-center gap-3 px-4 py-3">
                                <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', exam.bgClass)}>
                                    <Image src={exam.iconSrc} alt={exam.name} width={20} height={20} className="object-contain" />
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">{item.subject}</p>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <p className={cn(
                                    'text-sm font-bold',
                                    pct >= 80 ? 'text-primary' : pct >= 60 ? 'text-yellow-400' : 'text-rose-400'
                                )}>
                                    {item.score}/{item.total}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

function BadgeTile({ badge }: { badge: Badge }) {
    return (
        <div className="flex flex-col items-center gap-1 rounded-lg bg-muted py-3">
            <span className="text-2xl">{badge.icon}</span>
            <p className="text-center text-[10px] text-muted-foreground leading-tight px-1">{badge.name}</p>
        </div>
    );
}
