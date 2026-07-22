'use client';

import { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { updateProfile } from '@/lib/api/users';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function SettingsProfilePage() {
    const { user, setUser } = useAuthStore();
    const [name, setName] = useState(user?.name ?? '');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setSaving(true);
        setError(null);
        setSuccess(false);
        try {
            await updateProfile({ name: name.trim() });
            if (user) setUser({ ...user, name: name.trim() });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch {
            setError('সেভ করা সম্ভব হয়নি। আবার চেষ্টা করো।');
        } finally {
            setSaving(false);
        }
    };

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Link href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-lg font-bold text-foreground">প্রোফাইল সম্পাদনা</h1>
                    </div>

                    {success && (
                        <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                            <CheckCircle2 size={16} className="shrink-0" />
                            পরিবর্তন সেভ হয়েছে।
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">নাম</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-muted-foreground">ইমেইল</label>
                                <input
                                    type="text"
                                    value={user?.email ?? ''}
                                    disabled
                                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-muted-foreground outline-none cursor-not-allowed"
                                />
                                <p className="text-xs text-muted-foreground">ইমেইল পরিবর্তন করা যাবে না</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving || !name.trim()}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary transition-colors disabled:opacity-50"
                        >
                            {saving && <Loader2 size={16} className="animate-spin" />}
                            {saving ? 'সেভ হচ্ছে...' : 'সেভ করো'}
                        </button>
                    </form>
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
