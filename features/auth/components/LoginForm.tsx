'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth.store';
import { useAppDataStore } from '@/store/app-data.store';
import type { UserProfile } from '@/types/user';

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login: storeLogin } = useAuthStore();
    const { reset, preload } = useAppDataStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await login({ username: email, password });
            const user: UserProfile = {
                id: String(res.id),
                name: res.name,
                email: res.email,
                xp: 0,
                level: 1,
                streak: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                badges: [],
                createdAt: '',
            };
            storeLogin(user);
            reset();
            preload();
            const redirect = searchParams.get('redirect') || '/dashboard';
            router.push(redirect);
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
            setError(msg || 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center gap-3">
                <Image src="/logo_rounded.png" alt="EzDu" width={80} height={80} className="rounded-2xl" />
                <span className="text-2xl font-extrabold tracking-tight text-zinc-100">EzDu</span>
            </div>

            <div className="w-full max-w-sm space-y-6">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-zinc-100">স্বাগতম!</h1>
                    <p className="mt-1 text-sm text-zinc-500">তোমার অ্যাকাউন্টে লগইন করো</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                        <AlertCircle size={16} className="shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">ইমেইল</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="email"
                                placeholder="তোমার ইমেইল দাও"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">পাসওয়ার্ড</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="তোমার পাসওয়ার্ড দাও"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-11 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
                                ভুলে গেছো?
                            </Link>
                        </div>
                    </div>

                    <Button type="submit" variant="secondary" size="lg" disabled={loading} className="w-full">
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
                    </Button>
                </form>

                <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-zinc-800" />
                    <span className="text-xs text-zinc-600">অথবা</span>
                    <div className="flex-1 border-t border-zinc-800" />
                </div>

                <button
                    type="button"
                    disabled
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-sm font-semibold text-zinc-400 opacity-50 cursor-not-allowed"
                >
                    <Image src="/icons/google_logo.svg" alt="Google" width={18} height={18} />
                    Google দিয়ে লগইন (শীঘ্রই আসছে)
                </button>

                <p className="text-center text-sm text-zinc-500">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link href="/register" className="font-semibold text-emerald-400 hover:text-emerald-300">
                        শুরু করো
                    </Link>
                </p>
            </div>
        </div>
    );
}
