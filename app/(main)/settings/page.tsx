'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Globe, LogOut, ChevronRight, Shield, HelpCircle, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useMe } from '@/hooks/use-me';
import { getUserConfig, saveUserConfig } from '@/lib/api/users';
import { logout as apiLogout } from '@/lib/api/auth';
import type { UserConfigDto } from '@/types/api';

export default function SettingsPage() {
    const router = useRouter();
    const { logout: storeLogout } = useAuthStore();
    const { data: meData, loading: meLoading } = useMe();
    const [config, setConfig] = useState<UserConfigDto | null>(null);
    const [configLoading, setConfigLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        getUserConfig()
            .then(setConfig)
            .catch(() => {})
            .finally(() => setConfigLoading(false));
    }, []);

    const handleToggle = async (key: keyof UserConfigDto) => {
        if (!config) return;
        const updated = { ...config, [key]: !config[key as keyof typeof config] };
        setConfig(updated);
        try {
            await saveUserConfig({ [key]: updated[key as keyof typeof config] });
        } catch {
            setConfig(config); // revert
        }
    };

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await apiLogout();
        } catch {}
        storeLogout();
        router.push('/login');
    };

    const user = meData?.user;
    const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?';

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <h1 className="text-lg font-bold text-zinc-100">সেটিংস</h1>

            {/* Profile tile */}
            {meLoading ? (
                <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                        <Loader2 size={20} className="animate-spin text-zinc-600" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-4 w-32 rounded bg-zinc-800 animate-pulse" />
                        <div className="h-3 w-48 rounded bg-zinc-800 animate-pulse" />
                    </div>
                </div>
            ) : (
                <Link href="/profile" className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 transition-colors">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-base font-bold text-white shrink-0">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-zinc-100 truncate">{user?.name || 'নাম নেই'}</p>
                        <p className="text-sm text-zinc-500 truncate">{user?.email}</p>
                    </div>
                    <ChevronRight size={16} className="text-zinc-600 shrink-0" />
                </Link>
            )}

            {/* Account section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">অ্যাকাউন্ট</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                    <li>
                        <Link href="/settings/profile" className="flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 transition-colors">
                            <User size={16} className="text-zinc-400" />
                            <span className="flex-1 text-sm text-zinc-100">প্রোফাইল সম্পাদনা</span>
                            <ChevronRight size={14} className="text-zinc-600" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/forgot-password" className="flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 transition-colors">
                            <Shield size={16} className="text-zinc-400" />
                            <span className="flex-1 text-sm text-zinc-100">পাসওয়ার্ড পরিবর্তন</span>
                            <ChevronRight size={14} className="text-zinc-600" />
                        </Link>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-3.5">
                        <Globe size={16} className="text-zinc-400" />
                        <span className="flex-1 text-sm text-zinc-100">ভাষা</span>
                        <span className="text-xs text-zinc-500">বাংলা</span>
                    </li>
                </ul>
            </div>

            {/* Preferences section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">পছন্দ</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                    {configLoading ? (
                        <li className="flex items-center justify-center py-6">
                            <Loader2 size={18} className="animate-spin text-zinc-600" />
                        </li>
                    ) : (
                        <>
                            <ToggleRow
                                icon={<Bell size={16} />}
                                label="স্ট্রিক রিমাইন্ডার"
                                on={config?.notifyStreak ?? true}
                                onToggle={() => handleToggle('notifyStreak')}
                            />
                            <ToggleRow
                                icon={<Bell size={16} />}
                                label="দৈনিক প্র্যাকটিস রিমাইন্ডার"
                                on={config?.notifyDailyPractice ?? true}
                                onToggle={() => handleToggle('notifyDailyPractice')}
                            />
                            <ToggleRow
                                icon={<Bell size={16} />}
                                label="অ্যাচিভমেন্ট নোটিফিকেশন"
                                on={config?.notifyAchievements ?? true}
                                onToggle={() => handleToggle('notifyAchievements')}
                            />
                        </>
                    )}
                </ul>
            </div>

            {/* Help section */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <div className="border-b border-zinc-800 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">সাহায্য</p>
                </div>
                <ul className="divide-y divide-zinc-800">
                    <li>
                        <Link href="/faq" className="flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 transition-colors">
                            <HelpCircle size={16} className="text-zinc-400" />
                            <span className="flex-1 text-sm text-zinc-100">সাহায্য কেন্দ্র</span>
                            <ChevronRight size={14} className="text-zinc-600" />
                        </Link>
                    </li>
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

function ToggleRow({ icon, label, on, onToggle }: { icon: React.ReactNode; label: string; on: boolean; onToggle: () => void }) {
    return (
        <li className="flex items-center gap-3 px-4 py-3.5">
            <span className="text-zinc-400">{icon}</span>
            <span className="flex-1 text-sm text-zinc-100">{label}</span>
            <button onClick={onToggle} className={`relative h-5 w-9 rounded-full transition-colors ${on ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? 'left-4' : 'left-0.5'}`} />
            </button>
        </li>
    );
}
