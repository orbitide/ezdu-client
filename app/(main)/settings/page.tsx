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
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

function SettingsRow({
    href,
    icon,
    label,
    description,
    iconColor = 'text-muted-foreground',
    iconBg = 'bg-muted',
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
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition-colors"
            >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
                </div>
                <ChevronRight size={14} className="text-muted-foreground shrink-0" />
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
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <h1 className="text-lg font-bold text-foreground">সেটিংস</h1>

                    {/* Profile tile */}
                    <Link
                        href="/settings/profile"
                        className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-border transition-colors"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-base font-bold text-white">
                            {user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{user?.name || 'লোড হচ্ছে...'}</p>
                            <p className="text-sm text-muted-foreground truncate">{user?.email || ''}</p>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                    </Link>

                    {/* Account section */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="border-b border-border px-4 py-2.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">অ্যাকাউন্ট</p>
                        </div>
                        <ul className="divide-y divide-border">
                            <SettingsRow
                                href="/settings/profile"
                                icon={<User size={16} />}
                                label="প্রোফাইল সম্পাদনা"
                                description="নাম ও ইমেইল পরিবর্তন করো"
                                iconColor="text-primary"
                                iconBg="bg-primary/10"
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
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="border-b border-border px-4 py-2.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">পছন্দ</p>
                        </div>
                        <ul className="divide-y divide-border">
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
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                    <Globe size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">ভাষা</p>
                                </div>
                                <span className="text-xs text-muted-foreground">বাংলা</span>
                            </li>
                        </ul>
                    </div>

                    {/* Help section */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="border-b border-border px-4 py-2.5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">সাহায্য</p>
                        </div>
                        <ul className="divide-y divide-border">
                            <SettingsRow
                                href="/faq"
                                icon={<HelpCircle size={16} />}
                                label="সাহায্য কেন্দ্র"
                                iconColor="text-muted-foreground"
                                iconBg="bg-muted"
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
            </TwoColumnShell>
        </PageContainer>
    );
}
