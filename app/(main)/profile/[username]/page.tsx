'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle, UserPlus, UserMinus } from 'lucide-react';
import { getUserByUsername, getUserDetails } from '@/lib/api/users';
import { followUser, unfollowUser } from '@/lib/api/social';
import { useAuthStore } from '@/store/auth.store';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { UserRankCard } from '@/features/profile/components/UserRankCard';
import { WeeklyChart } from '@/features/profile/components/WeeklyChart';
import type { UserDetailsDto } from '@/types/api';

export default function PublicProfilePage() {
    const { username } = useParams<{ username: string }>();
    const router = useRouter();
    const currentUser = useAuthStore((s) => s.user);
    const [profile, setProfile] = useState<UserDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [following, setFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    useEffect(() => {
        getUserByUsername(username)
            .then((basic) => getUserDetails(basic.id))
            .then((details) => {
                setProfile(details);
                setFollowing(details.isFollowing);
            })
            .catch(() => setError('প্রোফাইল পাওয়া যায়নি'))
            .finally(() => setLoading(false));
    }, [username]);

    const isOwnProfile = currentUser?.id === profile?.id;

    const handleFollow = async () => {
        if (!profile) return;
        setFollowLoading(true);
        try {
            if (following) {
                await unfollowUser(profile.id);
                setFollowing(false);
            } else {
                await followUser(profile.id);
                setFollowing(true);
            }
        } catch {}
        finally { setFollowLoading(false); }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={28} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-sm text-zinc-400">{error || 'প্রোফাইল পাওয়া যায়নি'}</p>
                <button
                    onClick={() => router.back()}
                    className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                    ফিরে যাও
                </button>
            </div>
        );
    }

    const hasCompareData = (profile.weeklyXp?.friend?.length ?? 0) > 0;

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4 lg:px-6">
            {/* Page header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-base font-bold text-zinc-100">{profile.name}</h1>
            </div>

            <ProfileHeader user={profile} linkToAvatarEditor={false} />

            {/* Follow / Unfollow */}
            {!isOwnProfile && (
                <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors disabled:opacity-60"
                >
                    {followLoading ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : following ? (
                        <UserMinus size={14} />
                    ) : (
                        <UserPlus size={14} />
                    )}
                    {following ? 'আনফলো' : 'ফলো করো'}
                </button>
            )}

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
                {hasCompareData ? (
                    <WeeklyChart
                        data={profile.weeklyXp.friend}
                        compareData={profile.weeklyXp.me}
                        otherLabel={profile.name}
                    />
                ) : (
                    <WeeklyChart data={profile.weeklyXp?.me ?? []} />
                )}
            </div>
        </div>
    );
}
