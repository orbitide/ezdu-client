'use client';

import { useEffect, useState } from 'react';
import { Settings, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { UserRankCard } from '@/features/profile/components/UserRankCard';
import { WeeklyChart } from '@/features/profile/components/WeeklyChart';
import { AchievementsPreview } from '@/features/profile/components/AchievementsPreview';
import { normalizeWeeklyXp } from '@/features/profile/utils/normalizeWeeklyXp';
import { useAuthStore } from '@/store/auth.store';
import { getUserDetails, getWeeklyXp } from '@/lib/api/users';
import type { UserDetailsDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function ProfilePage() {
    const authUser = useAuthStore((s) => s.user);
    const [profile, setProfile] = useState<UserDetailsDto | null>(null);
    const [weeklyXp, setWeeklyXp] = useState<ReturnType<typeof normalizeWeeklyXp> | null>(null);
    const [loading, setLoading] = useState(true);
    const [weeklyXpLoading, setWeeklyXpLoading] = useState(true);

    useEffect(() => {
        if (!authUser?.id) {
            setLoading(false);
            setWeeklyXpLoading(false);
            return;
        }

        setLoading(true);
        setWeeklyXpLoading(true);

        Promise.all([
            getUserDetails(authUser.id),
            getWeeklyXp(authUser.id),
        ])
            .then(([details, xp]) => {
                setProfile(details);
                setWeeklyXp(normalizeWeeklyXp(xp));
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
                setWeeklyXpLoading(false);
            });
    }, [authUser?.id]);

    if (loading || !authUser) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-4">
                    {/* Page header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-base font-bold text-foreground">{authUser.name}</h1>
                        <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Settings size={18} />
                        </Link>
                    </div>

                    {profile ? (
                        <>
                            <ProfileHeader user={profile} linkToAvatarEditor />

                            {/* Add friends */}
                            <Link
                                href="/friends"
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:border-ring/40 hover:text-foreground transition-colors"
                            >
                                <Users size={14} />
                                বন্ধু অ্যাড করো
                            </Link>

                            {/* Overview */}
                            <p className="text-sm font-semibold text-foreground">সংক্ষিপ্ত বিবরণ</p>

                            <UserRankCard
                                streak={profile.streak}
                                coin={profile.coin}
                                leagueName={profile.leagueName}
                                totalXp={profile.totalXp}
                            />

                            {/* Weekly activity */}
                            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                                <h3 className="text-sm font-semibold text-foreground">সাপ্তাহিক কার্যক্রম</h3>
                                {weeklyXpLoading ? (
                                    <div className="flex h-[72px] items-center justify-center">
                                        <Loader2 size={20} className="animate-spin text-primary" />
                                    </div>
                                ) : (
                                    <WeeklyChart data={weeklyXp?.me ?? []} />
                                )}
                            </div>

                            {/* Achievements preview */}
                            <AchievementsPreview />
                        </>
                    ) : (
                        <div className="rounded-xl border border-border bg-card p-8 text-center">
                            <p className="text-sm text-muted-foreground">প্রোফাইল লোড হয়নি</p>
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
