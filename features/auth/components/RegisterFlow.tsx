'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Eye, EyeOff, Loader2, Mail, Lock, User,
    AlertCircle, CheckCircle2, ChevronRight,
} from 'lucide-react';
import { EXAMS } from '@/config/exams';
import { cn } from '@/lib/utils';
import { register, verifyOtpAndRegister, resendOtp } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth.store';
import { useAppDataStore } from '@/store/app-data.store';
import type { UserProfile } from '@/types/user';

type Segment = 'student' | 'job';

interface FormData {
    segment: Segment | null;
    examId: string | null;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
}

const TOTAL_STEPS = 6;

// ─── Main flow ────────────────────────────────────────────────────────────────

export function RegisterFlow() {
    const router = useRouter();
    const { login: storeLogin } = useAuthStore();
    const { reset, preload } = useAppDataStore();

    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>({
        segment: null, examId: null, name: '',
        email: '', password: '', confirmPassword: '', agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const next = () => { setError(null); setStep((s) => Math.min(s + 1, TOTAL_STEPS)); };
    const back = () => { setError(null); setStep((s) => Math.max(s - 1, 1)); };

    const handleSubmitRegistration = async () => {
        setError(null);
        setLoading(true);
        try {
            await register({ name: form.name, email: form.email, password: form.password });
            next();
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
            setError(msg || 'রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করো।');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerify = async (otp: string) => {
        setError(null);
        setLoading(true);
        try {
            const res = await verifyOtpAndRegister({
                email: form.email, otp, name: form.name, password: form.password,
            });
            const user: UserProfile = {
                id: String(res.id), name: res.name, email: res.email,
                xp: 0, level: 1, streak: 0, totalQuestions: 0,
                correctAnswers: 0, badges: [], createdAt: '',
            };
            storeLogin(user);
            reset();
            preload();
            router.push('/dashboard');
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
            setError(msg || 'OTP সঠিক নয়। আবার চেষ্টা করো।');
        } finally {
            setLoading(false);
        }
    };

    // Steps 1 & 6 don't have a sticky footer CTA — they act on interaction directly
    const hasFooter = step >= 2 && step <= 5;

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950">

            {/* ── Sticky header ── */}
            <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-900/60">
                <div className="flex items-center gap-4 px-5 py-3">
                    {/* Back */}
                    {step > 1 ? (
                        <button
                            onClick={back}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100 transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100 transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </Link>
                    )}

                    {/* Progress dots */}
                    <div className="flex flex-1 items-center justify-center gap-1.5">
                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                            <span
                                key={i}
                                className={cn(
                                    'block rounded-full transition-all duration-300',
                                    i + 1 === step  ? 'h-2 w-5 bg-emerald-500' :
                                    i + 1 < step    ? 'h-2 w-2 bg-emerald-500/40' :
                                                      'h-2 w-2 bg-zinc-800'
                                )}
                            />
                        ))}
                    </div>

                    {/* Logo mark */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
                        <span className="text-sm font-extrabold text-black">E</span>
                    </div>
                </div>
            </header>

            {/* ── Scrollable content ── */}
            <main className="flex-1 overflow-y-auto">
                <div className="px-6 pt-8 pb-4 max-w-sm mx-auto">

                    {/* Error banner */}
                    {error && (
                        <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                            <AlertCircle size={15} className="shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <StepSegment
                            value={form.segment}
                            onChange={(v) => { setForm((f) => ({ ...f, segment: v })); next(); }}
                        />
                    )}
                    {step === 2 && (
                        <StepExam
                            value={form.examId}
                            onChange={(v) => setForm((f) => ({ ...f, examId: v }))}
                        />
                    )}
                    {step === 3 && (
                        <StepName
                            value={form.name}
                            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                            onEnter={next}
                        />
                    )}
                    {step === 4 && (
                        <StepEmail
                            value={form.email}
                            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                            onEnter={next}
                        />
                    )}
                    {step === 5 && (
                        <StepPassword
                            password={form.password}
                            confirm={form.confirmPassword}
                            agreeTerms={form.agreeTerms}
                            showPassword={showPassword}
                            showConfirm={showConfirm}
                            onChangePassword={(v) => setForm((f) => ({ ...f, password: v }))}
                            onChangeConfirm={(v) => setForm((f) => ({ ...f, confirmPassword: v }))}
                            onTogglePassword={() => setShowPassword((s) => !s)}
                            onToggleConfirm={() => setShowConfirm((s) => !s)}
                            onToggleTerms={() => setForm((f) => ({ ...f, agreeTerms: !f.agreeTerms }))}
                        />
                    )}
                    {step === 6 && (
                        <StepOtp
                            email={form.email}
                            onVerify={handleOtpVerify}
                            onResend={() => resendOtp({ email: form.email }).catch(() => {})}
                            loading={loading}
                        />
                    )}
                </div>
            </main>

            {/* ── Sticky footer CTA ── */}
            {hasFooter && (
                <footer className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-900/60 px-6 py-5">
                    <div className="max-w-sm mx-auto space-y-3">
                        <CTA
                            step={step}
                            form={form}
                            loading={loading}
                            onNext={next}
                            onSubmit={handleSubmitRegistration}
                        />
                        {step === 4 && (
                            <p className="text-center text-sm text-zinc-600">
                                অ্যাকাউন্ট আছে?{' '}
                                <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                                    লগইন করো
                                </Link>
                            </p>
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
}

// ─── Footer CTA logic ─────────────────────────────────────────────────────────

function CTA({
    step, form, loading, onNext, onSubmit,
}: {
    step: number;
    form: FormData;
    loading: boolean;
    onNext: () => void;
    onSubmit: () => void;
}) {
    const isDisabled = (() => {
        if (step === 2) return !form.examId;
        if (step === 3) return form.name.trim().length < 2;
        if (step === 4) return !/\S+@\S+\.\S+/.test(form.email);
        if (step === 5) {
            const v = {
                length: form.password.length >= 6 && form.password.length <= 20,
                number: /\d/.test(form.password),
                letter: /[a-zA-Z]/.test(form.password),
                match: form.password === form.confirmPassword && form.confirmPassword.length > 0,
            };
            return !Object.values(v).every(Boolean) || !form.agreeTerms;
        }
        return false;
    })();

    const label = step === 5 ? 'সাইন আপ' : 'চালিয়ে যাও';
    const busyLabel = step === 5 ? 'সাইন আপ হচ্ছে...' : 'চালিয়ে যাও...';

    return (
        <button
            type="button"
            disabled={isDisabled || loading}
            onClick={step === 5 ? onSubmit : onNext}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-[15px] font-bold text-black transition-colors hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? busyLabel : label}
        </button>
    );
}

// ─── Shared input ─────────────────────────────────────────────────────────────

const inputBase =
    'w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-emerald-500';

// ─── Step 1: Segment ──────────────────────────────────────────────────────────

function StepSegment({
    value, onChange,
}: { value: Segment | null; onChange: (v: Segment) => void }) {
    const options = [
        {
            id: 'student' as Segment,
            iconSrc: '/icons/practice.svg',
            label: 'শিক্ষার্থী',
            sub: 'SSC / HSC / Admission',
        },
        {
            id: 'job' as Segment,
            iconSrc: '/icons/pro.svg',
            label: 'চাকরিপ্রার্থী',
            sub: 'BCS / Bank / Others',
        },
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">ধাপ ১ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-zinc-100">
                    তুমি কোন ক্যাটাগরিতে<br />পড়াশোনা করছো?
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onChange(opt.id)}
                        className={cn(
                            'flex flex-col items-center gap-4 rounded-2xl border-2 px-4 py-8 transition-all',
                            value === opt.id
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/50'
                        )}
                    >
                        <div className={cn(
                            'flex h-14 w-14 items-center justify-center rounded-2xl',
                            value === opt.id ? 'bg-emerald-500/20' : 'bg-zinc-800'
                        )}>
                            <Image src={opt.iconSrc} alt={opt.label} width={32} height={32} className="object-contain" />
                        </div>
                        <div className="text-center">
                            <p className={cn('text-sm font-bold', value === opt.id ? 'text-emerald-400' : 'text-zinc-200')}>
                                {opt.label}
                            </p>
                            <p className="mt-0.5 text-[11px] text-zinc-600">{opt.sub}</p>
                        </div>
                    </button>
                ))}
            </div>

            <p className="text-center text-xs text-zinc-600">
                পরে যেকোনো সময় পরিবর্তন করা যাবে
            </p>
        </div>
    );
}

// ─── Step 2: Exam ─────────────────────────────────────────────────────────────

function StepExam({
    value, onChange,
}: { value: string | null; onChange: (v: string) => void }) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">ধাপ ২ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-zinc-100">
                    কোন পরীক্ষার প্রস্তুতি<br />নিচ্ছো?
                </h2>
            </div>

            <div className="space-y-2">
                {EXAMS.map((exam) => {
                    const sel = value === exam.id;
                    return (
                        <button
                            key={exam.id}
                            onClick={() => onChange(exam.id)}
                            className={cn(
                                'flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-all',
                                sel
                                    ? `${exam.borderClass} ${exam.bgClass}`
                                    : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/50'
                            )}
                        >
                            <div className={cn(
                                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                                sel ? exam.bgClass : 'bg-zinc-800'
                            )}>
                                <Image src={exam.iconSrc} alt={exam.name} width={28} height={28} className="object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={cn('font-bold text-sm', sel ? exam.textClass : 'text-zinc-100')}>
                                    {exam.name}
                                </p>
                                <p className="text-xs text-zinc-500 truncate">{exam.description}</p>
                            </div>
                            {sel && <CheckCircle2 size={16} className={cn('shrink-0', exam.textClass)} />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Step 3: Name ─────────────────────────────────────────────────────────────

function StepName({
    value, onChange, onEnter,
}: { value: string; onChange: (v: string) => void; onEnter: () => void }) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">ধাপ ৩ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-zinc-100">
                    তোমার নাম কী?
                </h2>
                <p className="text-sm text-zinc-500">তোমাকে কীভাবে ডাকব বলো</p>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">পূর্ণ নাম</label>
                <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center">
                        <Image src="/icons/practice.svg" alt="" width={18} height={18} className="opacity-50" />
                    </div>
                    <input
                        type="text"
                        placeholder="তোমার নাম লেখো"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => { if (e.key === 'Enter' && value.trim().length >= 2) onEnter(); }}
                        className={cn(inputBase, 'pl-10')}
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Step 4: Email ────────────────────────────────────────────────────────────

function StepEmail({
    value, onChange, onEnter,
}: { value: string; onChange: (v: string) => void; onEnter: () => void }) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">ধাপ ৪ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-zinc-100">
                    তোমার ইমেইল দাও
                </h2>
                <p className="text-sm text-zinc-500">লগইন ও যাচাইয়ের জন্য ব্যবহার হবে</p>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">ইমেইল</label>
                <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && /\S+@\S+\.\S+/.test(value)) onEnter();
                        }}
                        className={cn(inputBase, 'pl-10')}
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Step 5: Password ─────────────────────────────────────────────────────────

function StepPassword({
    password, confirm, agreeTerms, showPassword, showConfirm,
    onChangePassword, onChangeConfirm, onTogglePassword, onToggleConfirm, onToggleTerms,
}: {
    password: string; confirm: string; agreeTerms: boolean;
    showPassword: boolean; showConfirm: boolean;
    onChangePassword: (v: string) => void; onChangeConfirm: (v: string) => void;
    onTogglePassword: () => void; onToggleConfirm: () => void;
    onToggleTerms: () => void;
}) {
    const valid = {
        length: password.length >= 6 && password.length <= 20,
        number: /\d/.test(password),
        letter: /[a-zA-Z]/.test(password),
        match: password === confirm && confirm.length > 0,
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">ধাপ ৫ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-zinc-100">
                    পাসওয়ার্ড সেট করো
                </h2>
                <p className="text-sm text-zinc-500">শক্তিশালী পাসওয়ার্ড বেছে নাও</p>
            </div>

            <div className="space-y-3">
                {/* Password field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">পাসওয়ার্ড</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="কমপক্ষে ৬ অক্ষর"
                            value={password}
                            onChange={(e) => onChangePassword(e.target.value)}
                            autoFocus
                            className={cn(inputBase, 'pl-10 pr-11')}
                        />
                        <button type="button" onClick={onTogglePassword}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors">
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                {/* Confirm field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-zinc-500">নিশ্চিত করো</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="আবার পাসওয়ার্ড দাও"
                            value={confirm}
                            onChange={(e) => onChangeConfirm(e.target.value)}
                            className={cn(inputBase, 'pl-10 pr-11')}
                        />
                        <button type="button" onClick={onToggleConfirm}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors">
                            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                {/* Strength indicators */}
                {password.length > 0 && (
                    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-3.5 grid grid-cols-2 gap-2">
                        {[
                            { ok: valid.length, label: '৬–২০ অক্ষর' },
                            { ok: valid.number, label: 'একটি সংখ্যা' },
                            { ok: valid.letter, label: 'একটি অক্ষর' },
                            { ok: valid.match, label: 'পাসওয়ার্ড মিলছে' },
                        ].map(({ ok, label }) => (
                            <div key={label} className="flex items-center gap-2">
                                <span className={cn(
                                    'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                                    ok ? 'bg-emerald-400' : 'bg-zinc-700'
                                )} />
                                <span className={cn('text-xs transition-colors', ok ? 'text-emerald-400' : 'text-zinc-600')}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Terms checkbox */}
                <button type="button" onClick={onToggleTerms}
                    className="flex items-start gap-3 pt-1 w-full text-left">
                    <div
                        className={cn(
                            'shrink-0 flex items-center justify-center rounded-md border-2 transition-colors',
                            agreeTerms ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-700 bg-transparent'
                        )}
                        style={{ width: 18, height: 18, marginTop: 1 }}
                    >
                        {agreeTerms && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1.5" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <span className="text-xs text-zinc-500 leading-relaxed">
                        আমি Ezdu-এর{' '}
                        <Link href="/terms" className="text-emerald-400 underline-offset-2 underline hover:text-emerald-300"
                            onClick={(e) => e.stopPropagation()}>শর্তাবলী</Link>
                        {' '}ও{' '}
                        <Link href="/privacy-policy" className="text-emerald-400 underline-offset-2 underline hover:text-emerald-300"
                            onClick={(e) => e.stopPropagation()}>গোপনীয়তা নীতিতে</Link>
                        {' '}সম্মত
                    </span>
                </button>
            </div>
        </div>
    );
}

// ─── Step 6: OTP ──────────────────────────────────────────────────────────────

function StepOtp({
    email, onVerify, onResend, loading,
}: {
    email: string;
    onVerify: (otp: string) => void;
    onResend: () => void;
    loading: boolean;
}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [resent, setResent] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
        if (next.every((d) => d !== '')) onVerify(next.join(''));
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const next = [...otp];
        paste.split('').forEach((char, i) => { if (i < 6) next[i] = char; });
        setOtp(next);
        if (paste.length === 6) onVerify(paste);
    };

    const handleResend = async () => {
        onResend();
        setResent(true);
        setTimeout(() => setResent(false), 3000);
    };

    return (
        <div className="space-y-8">
            {/* Icon + heading */}
            <div className="flex flex-col items-center gap-5 text-center pt-4">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                    <Mail size={32} className="text-emerald-400" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black">6</span>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500">ধাপ ৬ / ৬</p>
                    <h2 className="text-2xl font-extrabold text-zinc-100">ইমেইল যাচাই করো</h2>
                    <p className="text-sm text-zinc-500">
                        <span className="font-medium text-zinc-300">{email}</span>
                        <br />-এ একটি ৬-সংখ্যার কোড পাঠানো হয়েছে
                    </p>
                </div>
            </div>

            {/* OTP boxes */}
            <div className="flex gap-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={cn(
                            'h-14 w-full rounded-xl border-2 bg-zinc-900 text-center text-xl font-bold text-zinc-100 outline-none transition-all',
                            digit
                                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                                : 'border-zinc-800 focus:border-zinc-600'
                        )}
                    />
                ))}
            </div>

            {/* Loading / resend */}
            <div className="text-center space-y-2">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                        <Loader2 size={14} className="animate-spin text-emerald-400" />
                        যাচাই হচ্ছে...
                    </div>
                ) : resent ? (
                    <p className="flex items-center justify-center gap-1.5 text-sm text-emerald-400">
                        <CheckCircle2 size={14} />
                        কোড পাঠানো হয়েছে
                    </p>
                ) : (
                    <button type="button" onClick={handleResend}
                        className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
                        কোড পাওনি?{' '}
                        <span className="font-semibold text-emerald-400">আবার পাঠাও</span>
                    </button>
                )}
            </div>
        </div>
    );
}
