'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle, Zap, Flame, UserPlus, UserMinus } from 'lucide-react';
import { getUserByUsername } from '@/lib/api/users';
import { followUser, unfollowUser } from '@/lib/api/social';
import { useAuthStore } from '@/store/auth.store';
import type { UserDto } from '@/types/api';

export default function PublicProfilePage() {
    const { username } = useParams<{ username: string }>();
    const router = useRouter();
    const currentUser = useAuthStore((s) => s.user);
    const [profile, setProfile] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [following, setFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    useEffect(() => {
        getUserByUsername(username)
            .then(setProfile)
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

    if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 size={28} className="animate-spin text-emerald-500" /></div>;
    if (error || !profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-sm text-zinc-400">{error || 'প্রোফাইল পাওয়া যায়নি'}</p>
                <button onClick={() => router.back()} className="text-sm text-emerald-400 hover:text-emerald-300">ফিরে যাও</button>
            </div>
        );
    }

    const initials = profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('');

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-zinc-100">প্রোফাইল</h1>
            </div>

            {/* Profile card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-2xl font-bold text-white">
                        {initials}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-zinc-100">{profile.name}</h2>
                    {profile.username && <p className="text-sm text-zinc-500">@{profile.username}</p>}
                    {profile.bio && <p className="text-sm text-zinc-400 mt-2">{profile.bio}</p>}
                    {profile.className && (
                        <p className="text-xs text-zinc-600 mt-1">{profile.className}{profile.groupName ? ` · ${profile.groupName}` : ''}</p>
                    )}
                </div>
                {!isOwnProfile && (
                    <button
                        onClick={handleFollow}
                        disabled={followLoading}
                        className="flex items-center gap-2 mx-auto rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-60"
                    >
                        {followLoading ? <Loader2 size={14} className="animate-spin" /> :
                         following ? <UserMinus size={14} /> : <UserPlus size={14} />}
                        {following ? 'আনফলো' : 'ফলো করো'}
                    </button>
                )}
            </div>

            {/* Member since */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs text-zinc-500">সদস্য হয়েছেন:</p>
                <p className="text-sm text-zinc-300 mt-0.5">
                    {new Date(profile.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
        </div>
    );
}
