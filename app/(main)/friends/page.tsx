'use client';

import { useEffect, useState } from 'react';
import { Users, Search, UserPlus, UserMinus, Loader2, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFollowing, followUser, unfollowUser } from '@/lib/api/social';
import { findUsers } from '@/lib/api/users';
import type { FriendDto, UserDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function FriendsPage() {
    const [friends, setFriends] = useState<FriendDto[]>([]);
    const [searchResults, setSearchResults] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        getFollowing()
            .then((res) => {
                setFriends(res);
                setFollowingIds(new Set(res.map((f) => f.userId)));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = async (q: string) => {
        setQuery(q);
        if (q.trim().length < 2) { setSearchResults([]); return; }
        setSearchLoading(true);
        try {
            const res = await findUsers(q);
            setSearchResults(res);
        } catch {}
        finally { setSearchLoading(false); }
    };

    const handleFollow = async (userId: string) => {
        setFollowingIds((s) => new Set([...s, userId]));
        try { await followUser(userId); } catch { setFollowingIds((s) => { const n = new Set(s); n.delete(userId); return n; }); }
    };

    const handleUnfollow = async (userId: string) => {
        setFollowingIds((s) => { const n = new Set(s); n.delete(userId); return n; });
        setFriends((prev) => prev.filter((f) => f.userId !== userId));
        try { await unfollowUser(userId); } catch { /* reload */ }
    };

    return (
        <PageContainer>
        <TwoColumnShell right={<DefaultRightRail />}>
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Users size={20} className="text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-foreground">বন্ধু</h1>
                    <p className="text-xs text-muted-foreground">{friends.length} জনকে ফলো করছো</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="নাম দিয়ে খোঁজো..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary"
                />
                {searchLoading && <Loader2 size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
            </div>

            {/* Search results */}
            {query.trim().length >= 2 && (
                <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{searchResults.length} ফলাফল</p>
                    {searchResults.map((user) => (
                        <UserRow
                            key={user.id}
                            name={user.name}
                            email={user.email}
                            userId={user.id}
                            isFollowing={followingIds.has(user.id)}
                            onFollow={() => handleFollow(user.id)}
                            onUnfollow={() => handleUnfollow(user.id)}
                        />
                    ))}
                </div>
            )}

            {/* Friends list */}
            {!query && (
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">ফলো করছো</p>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 size={24} className="animate-spin text-muted-foreground" />
                        </div>
                    ) : friends.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-8 text-center">
                            <p className="text-sm text-muted-foreground">এখনো কাউকে ফলো করোনি</p>
                            <p className="text-xs text-muted-foreground mt-1">উপরের সার্চ বক্স দিয়ে বন্ধু খোঁজো</p>
                        </div>
                    ) : (
                        friends.map((friend) => (
                            <div key={friend.userId} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-sm font-bold text-white">
                                    {friend.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{friend.name}</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                        <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-400" />{friend.xp} XP</span>
                                        <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" />{friend.streak} দিন</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUnfollow(friend.userId)}
                                    className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:border-rose-500/50 hover:text-rose-400 transition-colors"
                                >
                                    <UserMinus size={12} />
                                    আনফলো
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
        </TwoColumnShell>
        </PageContainer>
    );
}

function UserRow({ name, email, userId, isFollowing, onFollow, onUnfollow }: {
    name: string; email?: string; userId: string;
    isFollowing: boolean; onFollow: () => void; onUnfollow: () => void;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-sm font-bold text-white">
                {name[0]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{name}</p>
                {email && <p className="text-xs text-muted-foreground truncate">{email}</p>}
            </div>
            <button
                onClick={isFollowing ? onUnfollow : onFollow}
                className={cn(
                    'flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                    isFollowing
                        ? 'border border-border text-muted-foreground hover:border-rose-500/50 hover:text-rose-400'
                        : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
                )}
            >
                {isFollowing ? <><UserMinus size={12} />আনফলো</> : <><UserPlus size={12} />ফলো করো</>}
            </button>
        </div>
    );
}
