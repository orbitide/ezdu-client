'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, BookOpen, Clock, Zap, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuizResult } from '../types';
import type { UserQuizResultDto } from '@/types/api';

interface CongratulationsScreenProps {
    result: QuizResult;
    serverResult?: UserQuizResultDto | null;
    saving?: boolean;
    onRetry: () => void;
    onReview?: () => void;
    onHome: () => void;
}

function getGrade(accuracy: number) {
    if (accuracy >= 90) return { label: 'অসাধারণ! 🎉',   color: 'text-emerald-400', ring: '#10b981' };
    if (accuracy >= 70) return { label: 'ভালো হয়েছে! 👏', color: 'text-teal-400',    ring: '#2dd4bf' };
    if (accuracy >= 40) return { label: 'চেষ্টা করো 💪',  color: 'text-yellow-400',  ring: '#facc15' };
    return               { label: 'আরো পড়তে হবে 📚',     color: 'text-rose-400',    ring: '#f43f5e' };
}

function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}মি ${sec}সে` : `${sec}সে`;
}

// Confetti particle
function Particle({ x, color, delay }: { x: number; color: string; delay: number }) {
    return (
        <motion.div
            className="pointer-events-none absolute bottom-0 rounded-full"
            style={{ left: `${x}%`, width: 8, height: 8, backgroundColor: color }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -Math.random() * 300 - 100, opacity: 0, scale: 0.4, x: (Math.random() - 0.5) * 80 }}
            transition={{ duration: 1.4 + Math.random() * 0.6, delay, ease: 'easeOut' }}
        />
    );
}

const CONFETTI_COLORS = ['#10b981', '#2dd4bf', '#facc15', '#f472b6', '#60a5fa', '#a78bfa'];

export function CongratulationsScreen({
    result,
    serverResult,
    saving,
    onRetry,
    onReview,
    onHome,
}: CongratulationsScreenProps) {
    const { accuracy, correct, incorrect, skipped, timeTaken } = result;
    const grade = getGrade(accuracy);
    const showConfetti = accuracy >= 40;
    const xpEarned = serverResult?.earnedXp ?? result.xpEarned;
    const streak   = serverResult?.streak;

    // Generate stable confetti particles
    const particles = useRef(
        Array.from({ length: 28 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            delay: Math.random() * 0.6,
        }))
    ).current;

    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.38, delay },
    });

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 bg-zinc-950">
            {/* Confetti */}
            {showConfetti && (
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    {particles.map((p) => (
                        <Particle key={p.id} x={p.x} color={p.color} delay={p.delay} />
                    ))}
                </div>
            )}

            <div className="w-full max-w-md space-y-7">
                {/* Trophy / score circle */}
                <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 11, stiffness: 160, delay: 0.05 }}
                    className="flex flex-col items-center gap-4"
                >
                    {/* Conic ring */}
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-zinc-800">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(${grade.ring} ${accuracy * 3.6}deg, transparent 0deg)`,
                                opacity: 0.35,
                            }}
                        />
                        <div className="text-center z-10">
                            <p className={cn('text-4xl font-extrabold', grade.color)}>{accuracy}%</p>
                            <p className="text-xs text-zinc-500 mt-0.5">নির্ভুলতা</p>
                        </div>
                    </div>

                    <p className={cn('text-xl font-bold', grade.color)}>{grade.label}</p>

                    {saving && (
                        <p className="text-xs text-zinc-500 animate-pulse">ফলাফল সেভ হচ্ছে...</p>
                    )}
                </motion.div>

                {/* XP earned */}
                <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-2 rounded-2xl border border-yellow-500/20 bg-yellow-500/8 py-3">
                    <Zap size={18} className="text-yellow-400" />
                    <span className="text-2xl font-extrabold text-yellow-400">+{xpEarned} XP</span>
                    {streak != null && streak > 0 && (
                        <>
                            <span className="text-zinc-600 mx-1">·</span>
                            <Star size={16} className="text-orange-400" />
                            <span className="text-sm font-semibold text-orange-400">{streak} স্ট্রিক</span>
                        </>
                    )}
                </motion.div>

                {/* Stats grid */}
                <motion.div {...fadeUp(0.28)} className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <p className="text-2xl font-extrabold text-emerald-400">{correct}</p>
                        <p className="text-xs text-zinc-500">সঠিক উত্তর</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                        <p className="text-2xl font-extrabold text-red-400">{incorrect}</p>
                        <p className="text-xs text-zinc-500">ভুল উত্তর</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-zinc-400" />
                            <p className="text-lg font-bold text-zinc-100">{formatTime(timeTaken)}</p>
                        </div>
                        <p className="text-xs text-zinc-500">সময়</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
                        <div className="flex items-center gap-1.5">
                            <Trophy size={14} className="text-zinc-400" />
                            <p className="text-lg font-bold text-zinc-100">{skipped}</p>
                        </div>
                        <p className="text-xs text-zinc-500">বাদ দেওয়া</p>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div {...fadeUp(0.38)} className="flex flex-col gap-2.5">
                    {onReview && (
                        <button
                            onClick={onReview}
                            disabled={saving}
                            className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 py-3 text-sm font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                        >
                            <BookOpen size={16} />
                            উত্তর রিভিউ করো
                        </button>
                    )}
                    <button
                        onClick={onRetry}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
                    >
                        <RotateCcw size={16} />
                        আবার চেষ্টা করো
                    </button>
                    <button
                        onClick={onHome}
                        className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        <Home size={16} />
                        হোমে ফিরে যাও
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
