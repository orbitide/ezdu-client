'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronRight, User, Bell, Volume2, GraduationCap, Shield,
    HelpCircle, Globe, LogOut, Loader2, Smile,
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useAppDataStore } from '@/store/app-data.store';
import { logout as apiLogout } from '@/lib/api/auth';

function SettingsRow({
    href,
    icon,
    label,
    description,
    iconColor = 'text-zinc-400',
    iconBg = 'bg-zinc-800',
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    description?: string;
    iconColor?: string;
    iconBg?: string;
}) {
    return (
        <li>
            <Link
                href={href}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 transition-colors"
            >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-100">{label}</p>
                    {description && <p className="text-xs text-zinc-500 truncate">{description}</p>}
                </div>
                <ChevronRight size={14} className="text-zinc-600 shrink-0" />
            </Link>
        </li>
    );
}

export default function SettingsPage() {
    const router = useRouter();
    const { logout: storeLogout, user } = useAuthStore();
    const { reset } = useAppDataStore();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try { await apiLogout(); } catch {}
        storeLogout();
        reset();
        router.push('/login');
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <h1 className="text-lg font-bold text-zinc-100">সেটিংস</h1>

            {/* Profile tile */}
            <Link
                href="/settings/profile"
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 transition-colors"
            >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-base font-bold text-white">
                    {user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-100 truncate">{user?.name || 'লোড হচ্ছে...'}</p>
                    <p className="text-sm text-zinc-500 truncate">{user?.email || ''}</p>
                </div>
                <ChevronRight size={16} className="text-zinc-600 shrink-0" />
            </Link>

            {/* Account section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">অ্যাকাউন্ট</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                    <SettingsRow
                        href="/settings/profile"
                        icon={<User size={16} />}
                        label="প্রোফাইল সম্পাদনা"
                        description="নাম ও ইমেইল পরিবর্তন করো"
                        iconColor="text-emerald-400"
                        iconBg="bg-emerald-500/10"
                    />
                    <SettingsRow
                        href="/settings/academic"
                        icon={<GraduationCap size={16} />}
                        label="একাডেমিক তথ্য"
                        description="ক্লাস, গ্রুপ ও সেগমেন্ট"
                        iconColor="text-blue-400"
                        iconBg="bg-blue-500/10"
                    />
                    <SettingsRow
                        href="/settings/avatar"
                        icon={<Smile size={16} />}
                        label="অ্যাভাটার"
                        description="প্রোফাইল ছবি কাস্টমাইজ করো"
                        iconColor="text-purple-400"
                        iconBg="bg-purple-500/10"
                    />
                    <SettingsRow
                        href="/forgot-password"
                        icon={<Shield size={16} />}
                        label="পাসওয়ার্ড পরিবর্তন"
                        iconColor="text-rose-400"
                        iconBg="bg-rose-500/10"
                    />
                </ul>
            </div>

            {/* Preferences section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">পছন্দ</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                    <SettingsRow
                        href="/settings/notifications"
                        icon={<Bell size={16} />}
                        label="নোটিফিকেশন"
                        description="স্ট্রিক, প্র্যাকটিস ও অ্যাচিভমেন্ট রিমাইন্ডার"
                        iconColor="text-orange-400"
                        iconBg="bg-orange-500/10"
                    />
                    <SettingsRow
                        href="/settings/sound"
                        icon={<Volume2 size={16} />}
                        label="শব্দ"
                        description="সঠিক/ভুল উত্তরের শব্দ ও উদযাপন"
                        iconColor="text-yellow-400"
                        iconBg="bg-yellow-500/10"
                    />
                    <li className="flex items-center gap-3 px-4 py-3.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-zinc-400">
                            <Globe size={16} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-zinc-100">ভাষা</p>
                        </div>
                        <span className="text-xs text-zinc-500">বাংলা</span>
                    </li>
                </ul>
            </div>

            {/* Help section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">সাহায্য</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                    <SettingsRow
                        href="/faq"
                        icon={<HelpCircle size={16} />}
                        label="সাহায্য কেন্দ্র"
                        iconColor="text-zinc-400"
                        iconBg="bg-zinc-800"
                    />
                </ul>
            </div>

            {/* Logout */}
            <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 py-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-60"
            >
                {loggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                {loggingOut ? 'লগআউট হচ্ছে...' : 'লগআউট'}
            </button>
        </div>
    );
}
