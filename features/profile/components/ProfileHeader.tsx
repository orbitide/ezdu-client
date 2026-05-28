import Image from 'next/image';
import type { UserProfile } from '../types';
import { EXAM_MAP } from '@/config/exams';
import { Flame, Zap, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
    profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    const exam = profile.targetExam ? EXAM_MAP[profile.targetExam] : null;
    const accuracy = profile.totalQuestions > 0
        ? Math.round((profile.correctAnswers / profile.totalQuestions) * 100)
        : 0;
    const levelProgress = ((profile.xp % 500) / 500) * 100;

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-2xl font-bold text-white">
                    {profile.name.slice(0, 1)}
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-zinc-100">{profile.name}</h1>
                    <p className="text-sm text-zinc-500">{profile.email}</p>
                    {profile.class && (
                        <p className="mt-0.5 text-xs text-zinc-500">{profile.class}</p>
                    )}
                    {exam && (
                        <span className={cn(
                            'mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
                            exam.bgClass, exam.textClass
                        )}>
                            <Image src={exam.iconSrc} alt={exam.name} width={12} height={12} className="object-contain" />
                            লক্ষ্য: {exam.name}
                        </span>
                    )}
                </div>
            </div>

            {/* XP / Level */}
            <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-500">
                    <span>Level {profile.level}</span>
                    <span>{profile.xp % 500} / 500 XP</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all"
                        style={{ width: `${levelProgress}%` }}
                    />
                </div>
            </div>

            {/* Quick stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                    { icon: <Flame size={14} className="text-orange-400" />, label: 'স্ট্রিক', value: `${profile.streak}d` },
                    { icon: <Zap size={14} className="text-yellow-400" />, label: 'মোট XP', value: profile.xp.toLocaleString() },
                    { icon: <Trophy size={14} className="text-purple-400" />, label: 'র‍্যাংক', value: `#${profile.rank}` },
                ].map(({ icon, label, value }) => (
                    <div key={label} className="flex flex-col items-center gap-1 rounded-lg bg-zinc-800 py-2.5">
                        {icon}
                        <p className="text-sm font-bold text-zinc-100">{value}</p>
                        <p className="text-xs text-zinc-500">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
