'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { EXAMS } from '@/config/exams';

export function RegisterForm() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">নাম</label>
                <input
                    type="text"
                    placeholder="তোমার নাম লেখো"
                    required
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">ইমেইল</label>
                <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">পাসওয়ার্ড</label>
                <div className="relative">
                    <input
                        type={show ? 'text' : 'password'}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-11 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                    />
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground"
                    >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">লক্ষ্য পরীক্ষা (ঐচ্ছিক)</label>
                <select className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary appearance-none">
                    <option value="">বেছে নাও...</option>
                    {EXAMS.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.icon} {e.name} — {e.description}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-black hover:bg-primary disabled:opacity-70 transition-colors"
            >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? 'রেজিস্ট্রেশন হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করো'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground">অথবা</span>
                <div className="flex-1 border-t border-border" />
            </div>

            <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google দিয়ে রেজিস্ট্রেশন করো
            </button>

            <p className="text-center text-sm text-muted-foreground">
                আগে থেকেই অ্যাকাউন্ট আছে?{' '}
                <Link href="/login" className="font-medium text-primary hover:text-primary">
                    লগইন করো
                </Link>
            </p>
        </form>
    );
}
