'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { changePassword } from '@/lib/api/auth';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const stored = sessionStorage.getItem('reset_email');
        if (stored) setEmail(stored);
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const otpValue = otp.join('');
    const valid = {
        length: password.length >= 6 && password.length <= 20,
        number: /\d/.test(password),
        letter: /[a-zA-Z]/.test(password),
        match: password === confirm && confirm.length > 0,
    };
    const allValid = otpValue.length === 6 && Object.values(valid).every(Boolean);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await changePassword({ email, otp: otpValue, newPassword: password });
            setSuccess(true);
            sessionStorage.removeItem('reset_email');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
            setError(msg || 'OTP সঠিক নয় বা মেয়াদ উত্তীর্ণ।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm space-y-6">
                <Link href="/forgot-password" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={16} />
                    ফিরে যাও
                </Link>

                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-zinc-100">নতুন পাসওয়ার্ড দাও</h1>
                    <p className="mt-1 text-sm text-zinc-500">তোমার ইমেইলে পাঠানো কোডটি দাও</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                        <AlertCircle size={16} className="shrink-0" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-900/50 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400">
                        <CheckCircle2 size={16} className="shrink-0" />
                        পাসওয়ার্ড পরিবর্তন হয়েছে! লগইন পেজে যাচ্ছো...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* OTP */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-400">যাচাই কোড</label>
                        <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="h-12 w-full rounded-xl border-2 border-zinc-800 bg-zinc-900 text-center text-lg font-bold text-zinc-100 outline-none transition-all focus:border-emerald-500"
                                />
                            ))}
                        </div>
                    </div>

                    {/* New password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">নতুন পাসওয়ার্ড</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="নতুন পাসওয়ার্ড দাও"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-11 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500"
                            />
                            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400">পাসওয়ার্ড নিশ্চিত করো</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="password"
                                placeholder="আবার পাসওয়ার্ড দাও"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    {password.length > 0 && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 space-y-1.5">
                            {[
                                { ok: valid.length, label: '৬–২০ অক্ষরের' },
                                { ok: valid.number, label: 'কমপক্ষে ১টি সংখ্যা' },
                                { ok: valid.letter, label: 'কমপক্ষে ১টি অক্ষর' },
                                { ok: valid.match, label: 'পাসওয়ার্ড মিলছে' },
                            ].map(({ ok, label }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <span className={cn('h-1.5 w-1.5 rounded-full', ok ? 'bg-emerald-400' : 'bg-zinc-700')} />
                                    <span className={cn('text-xs', ok ? 'text-emerald-400' : 'text-zinc-500')}>{label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button type="submit" variant="secondary" size="lg" disabled={!allValid || loading || success} className="w-full">
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        {loading ? 'পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করো'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
