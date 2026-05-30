'use client';

import { useEffect, useState } from 'react';
import { Settings, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { UserRankCard } from '@/features/profile/components/UserRankCard';
import { WeeklyChart } from '@/features/profile/components/WeeklyChart';
import { AchievementsPreview } from '@/features/profile/components/AchievementsPreview';
import { useAuthStore } from '@/store/auth.store';
import { getUserDetails } from '@/lib/api/users';
import type { UserDetailsDto } from '@/types/api';

export default function ProfilePage() {
    const authUser = useAuthStore((s) => s.user);
    const [profile, setProfile] = useState<UserDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authUser?.id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        getUserDetails(authUser.id)
            .then(setProfile)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [authUser?.id]);

    if (loading || !authUser) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4 lg:px-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <h1 className="text-base font-bold text-zinc-100">{authUser.name}</h1>
                <Link href="/settings" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <Settings size={18} />
                </Link>
            </div>

            {profile ? (
                <>
                    <ProfileHeader user={profile} linkToAvatarEditor />

                    {/* Add friends */}
                    <Link
                        href="/friends"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors"
                    >
                        <Users size={14} />
                        বন্ধু অ্যাড করো
                    </Link>

                    {/* Overview */}
                    <p className="text-sm font-semibold text-zinc-100">সংক্ষিপ্ত বিবরণ</p>

                    <UserRankCard
                        streak={profile.streak}
                        coin={profile.coin}
                        leagueName={profile.leagueName}
                        totalXp={profile.totalXp}
                    />

                    {/* Weekly activity */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
                        <h3 className="text-sm font-semibold text-zinc-100">সাপ্তাহিক কার্যক্রম</h3>
                        <WeeklyChart data={profile.weeklyXp?.me ?? []} />
                    </div>

                    {/* Achievements preview */}
                    <AchievementsPreview />
                </>
            ) : (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
                    <p className="text-sm text-zinc-400">প্রোফাইল লোড হয়নি</p>
                </div>
            )}
        </div>
    );
}
