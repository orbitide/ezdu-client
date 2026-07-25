'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Eye, EyeOff, Loader2, Mail, Lock, User,
    AlertCircle, CheckCircle2, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { register, verifyOtpAndRegister, resendOtp } from '@/lib/api/auth';
import { getOnboardingClasses, getOnboardingGroups } from '@/lib/api/classes';
import { useAuthStore } from '@/store/auth.store';
import { useAppDataStore } from '@/store/app-data.store';
import type { UserProfile } from '@/types/user';
import type { ClassDto, GroupDto } from '@/types/api';

type Segment = 'student' | 'job';

interface FormData {
    segment: Segment | null;
    /** Real class/group from `/classes/onboarding` — posted as `config` on register. */
    classId: string | null;
    groupId: string | null;
    hasGroups: boolean;
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
        segment: null, classId: null, groupId: null, hasGroups: false, name: '',
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
            await register({
                name: form.name,
                email: form.email,
                password: form.password,
                // Mobile posts the selected class/group as `config` so the new
                // account starts with the right syllabus.
                ...(form.classId
                    ? { config: { classId: form.classId, groupId: form.groupId ?? undefined } }
                    : {}),
            });
            await resendOtp({ email: form.email });
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
        <div className="flex min-h-screen flex-col bg-background">

            {/* ── Sticky header ── */}
            <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="flex items-center gap-4 px-5 py-3">
                    {/* Back */}
                    {step > 1 ? (
                        <button
                            onClick={back}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-border hover:text-foreground transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-border hover:text-foreground transition-colors"
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
                                    i + 1 === step  ? 'h-2 w-5 bg-primary' :
                                    i + 1 < step    ? 'h-2 w-2 bg-primary/40' :
                                                      'h-2 w-2 bg-muted'
                                )}
                            />
                        ))}
                    </div>

                    {/* Logo mark */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
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
                        <StepClassGroup
                            classId={form.classId}
                            groupId={form.groupId}
                            onSelectClass={(id, groups) =>
                                setForm((f) => ({ ...f, classId: id, groupId: null, hasGroups: groups.length > 0 }))
                            }
                            onSelectGroup={(id) => setForm((f) => ({ ...f, groupId: id }))}
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
                <footer className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border px-6 py-5">
                    <div className="max-w-sm mx-auto space-y-3">
                        <CTA
                            step={step}
                            form={form}
                            loading={loading}
                            onNext={next}
                            onSubmit={handleSubmitRegistration}
                        />
                        {step === 4 && (
                            <p className="text-center text-sm text-muted-foreground">
                                অ্যাকাউন্ট আছে?{' '}
                                <Link href="/login" className="font-semibold text-primary hover:text-primary transition-colors">
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
        // A class is always required; a group only when the class has any.
        if (step === 2) return !form.classId || (form.hasGroups && !form.groupId);
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
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-bold text-black transition-colors hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? busyLabel : label}
        </button>
    );
}

// ─── Shared input ─────────────────────────────────────────────────────────────

const inputBase =
    'w-full rounded-xl border border-border bg-card py-3.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary';

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
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">ধাপ ১ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-foreground">
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
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-card hover:border-border hover:bg-muted/50'
                        )}
                    >
                        <div className={cn(
                            'flex h-14 w-14 items-center justify-center rounded-2xl',
                            value === opt.id ? 'bg-primary/20' : 'bg-muted'
                        )}>
                            <Image src={opt.iconSrc} alt={opt.label} width={32} height={32} className="object-contain" />
                        </div>
                        <div className="text-center">
                            <p className={cn('text-sm font-bold', value === opt.id ? 'text-primary' : 'text-foreground')}>
                                {opt.label}
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{opt.sub}</p>
                        </div>
                    </button>
                ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
                পরে যেকোনো সময় পরিবর্তন করা যাবে
            </p>
        </div>
    );
}

// ─── Step 2: Class + Group ────────────────────────────────────────────────────

/**
 * Replaces the old hardcoded exam picker with the real class/group selection
 * mobile uses (`onboarding_steps_class_selection.dart` +
 * `onboarding_steps_group_selection.dart`). The group list is fetched per class
 * and the section is hidden entirely when a class has no groups, mirroring
 * mobile's step-skip in `onboarding_page.dart`.
 */
function StepClassGroup({
    classId, groupId, onSelectClass, onSelectGroup,
}: {
    classId: string | null;
    groupId: string | null;
    onSelectClass: (id: string, groups: GroupDto[]) => void;
    onSelectGroup: (id: string) => void;
}) {
    const [classes, setClasses] = useState<ClassDto[]>([]);
    const [groups, setGroups] = useState<GroupDto[]>([]);
    const [loadingClasses, setLoadingClasses] = useState(true);
    const [loadingGroups, setLoadingGroups] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        getOnboardingClasses()
            .then((list) => { if (!cancelled) setClasses(list ?? []); })
            .catch(() => { if (!cancelled) setLoadError('ক্লাস লোড হয়নি। আবার চেষ্টা করো।'); })
            .finally(() => { if (!cancelled) setLoadingClasses(false); });
        return () => { cancelled = true; };
    }, []);

    const handleClass = async (id: string) => {
        setLoadingGroups(true);
        setGroups([]);
        try {
            const list = (await getOnboardingGroups(id)) ?? [];
            setGroups(list);
            onSelectClass(id, list);
        } catch {
            setGroups([]);
            onSelectClass(id, []);
        } finally {
            setLoadingGroups(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">ধাপ ২ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-foreground">
                    তুমি কোন ক্লাসে<br />পড়ছো?
                </h2>
            </div>

            {loadError && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={15} className="mt-0.5 shrink-0" />
                    {loadError}
                </div>
            )}

            {loadingClasses ? (
                <div className="flex justify-center py-10">
                    <Loader2 size={24} className="animate-spin text-primary" />
                </div>
            ) : (
                <div className="space-y-2">
                    {classes.map((c) => {
                        const sel = classId === c.id;
                        return (
                            <button
                                key={c.id}
                                onClick={() => handleClass(c.id)}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all',
                                    sel
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border bg-card hover:border-border hover:bg-muted/50',
                                )}
                            >
                                <p className={cn('flex-1 text-sm font-bold', sel ? 'text-primary' : 'text-foreground')}>
                                    {c.displayName || c.name}
                                </p>
                                {sel && <CheckCircle2 size={16} className="shrink-0 text-primary" />}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Group section — only when the selected class actually has groups. */}
            {loadingGroups ? (
                <div className="flex justify-center py-4">
                    <Loader2 size={20} className="animate-spin text-primary" />
                </div>
            ) : groups.length > 0 ? (
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-muted-foreground">তোমার গ্রুপ কোনটি?</h3>
                    <div className="space-y-2">
                        {groups.map((g) => {
                            const sel = groupId === g.id;
                            return (
                                <button
                                    key={g.id}
                                    onClick={() => onSelectGroup(g.id)}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all',
                                        sel
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border bg-card hover:border-border hover:bg-muted/50',
                                    )}
                                >
                                    <p className={cn('flex-1 text-sm font-bold', sel ? 'text-primary' : 'text-foreground')}>
                                        {g.displayName || g.name}
                                    </p>
                                    {sel && <CheckCircle2 size={16} className="shrink-0 text-primary" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
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
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">ধাপ ৩ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-foreground">
                    তোমার নাম কী?
                </h2>
                <p className="text-sm text-muted-foreground">তোমাকে কীভাবে ডাকব বলো</p>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">পূর্ণ নাম</label>
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
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">ধাপ ৪ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-foreground">
                    তোমার ইমেইল দাও
                </h2>
                <p className="text-sm text-muted-foreground">লগইন ও যাচাইয়ের জন্য ব্যবহার হবে</p>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ইমেইল</label>
                <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
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
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">ধাপ ৫ / ৬</p>
                <h2 className="text-2xl font-extrabold leading-snug text-foreground">
                    পাসওয়ার্ড সেট করো
                </h2>
                <p className="text-sm text-muted-foreground">শক্তিশালী পাসওয়ার্ড বেছে নাও</p>
            </div>

            <div className="space-y-3">
                {/* Password field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">পাসওয়ার্ড</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="কমপক্ষে ৬ অক্ষর"
                            value={password}
                            onChange={(e) => onChangePassword(e.target.value)}
                            autoFocus
                            className={cn(inputBase, 'pl-10 pr-11')}
                        />
                        <button type="button" onClick={onTogglePassword}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground transition-colors">
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                {/* Confirm field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">নিশ্চিত করো</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="আবার পাসওয়ার্ড দাও"
                            value={confirm}
                            onChange={(e) => onChangeConfirm(e.target.value)}
                            className={cn(inputBase, 'pl-10 pr-11')}
                        />
                        <button type="button" onClick={onToggleConfirm}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground transition-colors">
                            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                {/* Strength indicators */}
                {password.length > 0 && (
                    <div className="rounded-xl border border-border bg-card/50 p-3.5 grid grid-cols-2 gap-2">
                        {[
                            { ok: valid.length, label: '৬–২০ অক্ষর' },
                            { ok: valid.number, label: 'একটি সংখ্যা' },
                            { ok: valid.letter, label: 'একটি অক্ষর' },
                            { ok: valid.match, label: 'পাসওয়ার্ড মিলছে' },
                        ].map(({ ok, label }) => (
                            <div key={label} className="flex items-center gap-2">
                                <span className={cn(
                                    'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                                    ok ? 'bg-primary' : 'bg-muted'
                                )} />
                                <span className={cn('text-xs transition-colors', ok ? 'text-primary' : 'text-muted-foreground')}>
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
                            agreeTerms ? 'border-primary bg-primary' : 'border-border bg-transparent'
                        )}
                        style={{ width: 18, height: 18, marginTop: 1 }}
                    >
                        {agreeTerms && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1.5" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                        আমি Ezdu-এর{' '}
                        <Link href="/terms" className="text-primary underline-offset-2 underline hover:text-primary"
                            onClick={(e) => e.stopPropagation()}>শর্তাবলী</Link>
                        {' '}ও{' '}
                        <Link href="/privacy-policy" className="text-primary underline-offset-2 underline hover:text-primary"
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
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20">
                    <Mail size={32} className="text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">6</span>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">ধাপ ৬ / ৬</p>
                    <h2 className="text-2xl font-extrabold text-foreground">ইমেইল যাচাই করো</h2>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-muted-foreground">{email}</span>
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
                            'h-14 w-full rounded-xl border-2 bg-card text-center text-xl font-bold text-foreground outline-none transition-all',
                            digit
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-border focus:border-ring/40'
                        )}
                    />
                ))}
            </div>

            {/* Loading / resend */}
            <div className="text-center space-y-2">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 size={14} className="animate-spin text-primary" />
                        যাচাই হচ্ছে...
                    </div>
                ) : resent ? (
                    <p className="flex items-center justify-center gap-1.5 text-sm text-primary">
                        <CheckCircle2 size={14} />
                        কোড পাঠানো হয়েছে
                    </p>
                ) : (
                    <button type="button" onClick={handleResend}
                        className="text-sm text-muted-foreground hover:text-muted-foreground transition-colors">
                        কোড পাওনি?{' '}
                        <span className="font-semibold text-primary">আবার পাঠাও</span>
                    </button>
                )}
            </div>
        </div>
    );
}
