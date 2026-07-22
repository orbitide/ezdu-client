'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getUserConfig, saveUserConfig } from '@/lib/api/users';
import type { UserConfigDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

type ConfigKey = keyof UserConfigDto;

function Toggle({ on, onToggle, disabled }: { on: boolean; onToggle: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onToggle}
            disabled={disabled}
            className={`relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:opacity-40 ${on ? 'bg-primary' : 'bg-muted'}`}
        >
            <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? 'left-4' : 'left-0.5'}`} />
        </button>
    );
}

function ToggleRow({
    label,
    description,
    on,
    onToggle,
    disabled,
}: {
    label: string;
    description?: string;
    on: boolean;
    onToggle: () => void;
    disabled?: boolean;
}) {
    return (
        <li className="flex items-center gap-3 px-4 py-3.5">
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${disabled ? 'text-muted-foreground' : 'text-foreground'}`}>{label}</p>
                {description && <p className="text-xs text-muted-foreground truncate">{description}</p>}
            </div>
            <Toggle on={on} onToggle={onToggle} disabled={disabled} />
        </li>
    );
}

export default function NotificationsSettingsPage() {
    const [config, setConfig] = useState<UserConfigDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<ConfigKey | null>(null);

    useEffect(() => {
        getUserConfig()
            .then(setConfig)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleToggle = async (key: ConfigKey, value: boolean) => {
        if (!config) return;
        const updated = { ...config, [key]: value };
        setConfig(updated);
        setSaving(key);
        try {
            await saveUserConfig({ [key]: value });
        } catch {
            setConfig(config); // revert on error
        } finally {
            setSaving(null);
        }
    };

    const master = config?.enableNotifications ?? true;

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-lg font-bold text-foreground">নোটিফিকেশন</h1>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={24} className="animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="rounded-xl border border-border bg-card overflow-hidden">
                            {/* Master toggle */}
                            <ul className="divide-y divide-border">
                                <ToggleRow
                                    label="সব নোটিফিকেশন"
                                    description="সমস্ত রিমাইন্ডার চালু বা বন্ধ করো"
                                    on={master}
                                    onToggle={() => handleToggle('enableNotifications', !master)}
                                />
                            </ul>

                            <div className="border-t border-border px-4 py-2.5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">বিস্তারিত</p>
                            </div>

                            <ul className="divide-y divide-border">
                                <ToggleRow
                                    label="স্ট্রিক রিমাইন্ডার"
                                    description="স্ট্রিক ভাঙার আগে সতর্কতা"
                                    on={config?.notifyStreakReminder ?? true}
                                    onToggle={() => handleToggle('notifyStreakReminder', !(config?.notifyStreakReminder ?? true))}
                                    disabled={!master}
                                />
                                <ToggleRow
                                    label="দৈনিক প্র্যাকটিস"
                                    description="প্রতিদিনের পড়ার রিমাইন্ডার"
                                    on={config?.notifyDailyPractice ?? true}
                                    onToggle={() => handleToggle('notifyDailyPractice', !(config?.notifyDailyPractice ?? true))}
                                    disabled={!master}
                                />
                                <ToggleRow
                                    label="কুইজ উপলব্ধ"
                                    description="নতুন কুইজ যোগ হলে জানাবে"
                                    on={config?.notifyQuizAvailable ?? true}
                                    onToggle={() => handleToggle('notifyQuizAvailable', !(config?.notifyQuizAvailable ?? true))}
                                    disabled={!master}
                                />
                                <ToggleRow
                                    label="অ্যাচিভমেন্ট"
                                    description="ব্যাজ ও মাইলস্টোন অর্জন"
                                    on={config?.notifyAchievements ?? true}
                                    onToggle={() => handleToggle('notifyAchievements', !(config?.notifyAchievements ?? true))}
                                    disabled={!master}
                                />
                                <ToggleRow
                                    label="নতুন কন্টেন্ট"
                                    description="নতুন প্রশ্ন ও পাঠ যোগ হলে"
                                    on={config?.notifyNewContent ?? true}
                                    onToggle={() => handleToggle('notifyNewContent', !(config?.notifyNewContent ?? true))}
                                    disabled={!master}
                                />
                            </ul>
                        </div>
                    )}

                    {saving && (
                        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <Loader2 size={12} className="animate-spin" /> সেভ হচ্ছে...
                        </p>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
