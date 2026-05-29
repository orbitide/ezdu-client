'use client';

import { useEffect, useState } from 'react';
import { Settings, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { ProfileStats } from '@/features/profile/components/ProfileStats';
import { useMe } from '@/hooks/use-me';
import { useAuthStore } from '@/store/auth.store';
import { getMyQuizHistory } from '@/lib/api/quiz';
import type { UserProfile } from '@/types/user';
import type { ExamHistory } from '@/features/profile/types';
import type { UserQuizHistoryDto } from '@/types/api';

function mapHistoryToExamHistory(items: UserQuizHistoryDto[]): ExamHistory[] {
    return items.slice(0, 10).map((item) => {
        const timeAgo = (() => {
            const diff = Date.now() - new Date(item.completedAt).getTime();
            const h = Math.floor(diff / 3600000);
            if (h < 1) return 'এইমাত্র';
            if (h < 24) return `${h} ঘণ্টা আগে`;
            const d = Math.floor(h / 24);
            if (d === 1) return 'গতকাল';
            return `${d} দিন আগে`;
        })();
        return {
            examId: 'ssc' as const,
            subject: item.subjectName || item.quizTitle || 'কুইজ',
            score: item.correctAnswers,
            total: item.totalQuestions,
            date: timeAgo,
        };
    });
}

export default function ProfilePage() {
    const { data: meData, loading } = useMe();
    const authUser = useAuthStore((s) => s.user);
    const [history, setHistory] = useState<ExamHistory[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    useEffect(() => {
        getMyQuizHistory(1, 10)
            .then((res) => setHistory(mapHistoryToExamHistory(res.items)))
            .catch(() => {})
            .finally(() => setHistoryLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    const profile: UserProfile | null = meData ? {
        id: String(meData.id),
        name: meData.name,
        email: authUser?.email ?? '',
        createdAt: '',
        xp: meData.totalXp,
        level: 1,
        streak: meData.streak,
        totalQuestions: 0,
        correctAnswers: 0,
        badges: [],
    } : null;

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4 lg:px-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-zinc-100">প্রোফাইল</h1>
                <Link href="/settings" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <Settings size={18} />
                </Link>
            </div>

            {profile ? (
                <>
                    <ProfileHeader profile={profile} />
                    {historyLoading ? (
                        <div className="flex justify-center py-4">
                            <Loader2 size={20} className="animate-spin text-zinc-600" />
                        </div>
                    ) : (
                        <ProfileStats profile={profile} history={history} />
                    )}
                </>
            ) : (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
                    <p className="text-sm text-zinc-400">প্রোফাইল লোড হয়নি</p>
                </div>
            )}
        </div>
    );
}
