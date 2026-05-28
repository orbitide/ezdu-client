import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { ProfileStats } from '@/features/profile/components/ProfileStats';
import { DUMMY_PROFILE, DUMMY_EXAM_HISTORY } from '@/features/profile/types';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4 lg:px-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-zinc-100">প্রোফাইল</h1>
                <Link href="/settings" className="text-zinc-400 hover:text-zinc-100">
                    <Settings size={18} />
                </Link>
            </div>
            <ProfileHeader profile={DUMMY_PROFILE} />
            <ProfileStats profile={DUMMY_PROFILE} history={DUMMY_EXAM_HISTORY} />
        </div>
    );
}
