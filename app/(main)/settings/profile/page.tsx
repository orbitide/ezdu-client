'use client';

import { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { updateProfile } from '@/lib/api/users';

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
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <Link href="/settings" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-lg font-bold text-zinc-100">প্রোফাইল সম্পাদনা</h1>
            </div>

            {success && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
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
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">নাম</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">ইমেইল</label>
                        <input
                            type="text"
                            value={user?.email ?? ''}
                            disabled
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-500 outline-none cursor-not-allowed"
                        />
                        <p className="text-xs text-zinc-600">ইমেইল পরিবর্তন করা যাবে না</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving || !name.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
                >
                    {saving && <Loader2 size={16} className="animate-spin" />}
                    {saving ? 'সেভ হচ্ছে...' : 'সেভ করো'}
                </button>
            </form>
        </div>
    );
}
