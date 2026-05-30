'use client';

import Link from 'next/link';
import { AvatarSvg } from '@/features/avatar/AvatarSvg';
import type { UserDetailsDto } from '@/types/api';

interface ProfileHeaderProps {
    user: UserDetailsDto;
    linkToAvatarEditor?: boolean;
}

export function ProfileHeader({ user, linkToAvatarEditor = false }: ProfileHeaderProps) {
    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long' })
        : '';

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('');

    const avatarEl = user.avatarConfig ? (
        <AvatarSvg config={user.avatarConfig} size={96} />
    ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-2xl font-bold text-white">
            {initials}
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-3 py-2">
            {/* Avatar */}
            {linkToAvatarEditor ? (
                <Link
                    href="/settings/avatar"
                    className="rounded-full ring-2 ring-zinc-700 ring-offset-2 ring-offset-zinc-950 hover:ring-emerald-500/60 transition-all"
                >
                    {avatarEl}
                </Link>
            ) : (
                avatarEl
            )}

            {/* @username · joined date */}
            <p className="text-xs font-bold tracking-wide text-zinc-400 uppercase text-center">
                {user.username ? `@${user.username}` : `@${user.name.toLowerCase().replace(/\s+/g, '')}`}
                {joinedDate && ` · ${joinedDate} থেকে`}
            </p>

            {/* Following / Followers */}
            <div className="flex gap-8">
                <div className="text-center">
                    <p className="text-base font-bold text-zinc-100">{user.following ?? 0}</p>
                    <p className="text-xs text-zinc-500">ফলো করছি</p>
                </div>
                <div className="text-center">
                    <p className="text-base font-bold text-zinc-100">{user.followers ?? 0}</p>
                    <p className="text-xs text-zinc-500">ফলোয়ার</p>
                </div>
            </div>
        </div>
    );
}
