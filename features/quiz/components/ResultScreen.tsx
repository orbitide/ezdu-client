'use client';

import type { QuizResult } from '../types';
import Link from 'next/link';
import { Trophy, Clock, Target, Zap, RotateCcw, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultScreenProps {
    result: QuizResult;
    onRetry: () => void;
}

export function ResultScreen({ result, onRetry }: ResultScreenProps) {
    const { accuracy } = result;
    const grade = accuracy >= 90 ? 'অসাধারণ!' : accuracy >= 70 ? 'ভালো হয়েছে!' : accuracy >= 50 ? 'চেষ্টা করো' : 'আরো পড়তে হবে';
    const gradeColor = accuracy >= 90 ? 'text-emerald-400' : accuracy >= 70 ? 'text-yellow-400' : accuracy >= 50 ? 'text-orange-400' : 'text-rose-400';

    const minutes = Math.floor(result.timeTaken / 60);
    const seconds = result.timeTaken % 60;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                {/* Score circle */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-zinc-800">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(${accuracy >= 70 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#f43f5e'} ${accuracy * 3.6}deg, transparent 0deg)`,
                                opacity: 0.3,
                            }}
                        />
                        <div className="text-center">
                            <p className={cn('text-4xl font-bold', gradeColor)}>{accuracy}%</p>
                            <p className="text-xs text-zinc-500">সঠিক</p>
                        </div>
                    </div>
                    <p className={cn('text-xl font-bold', gradeColor)}>{grade}</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-400">{result.correct}</p>
                        <p className="text-xs text-zinc-500">সঠিক উত্তর</p>
                    </div>
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-center">
                        <p className="text-2xl font-bold text-rose-400">{result.incorrect}</p>
                        <p className="text-xs text-zinc-500">ভুল উত্তর</p>
                    </div>
                    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <Clock size={14} className="text-zinc-400" />
                            <p className="text-lg font-bold text-zinc-100">{minutes}:{seconds.toString().padStart(2, '0')}</p>
                        </div>
                        <p className="text-xs text-zinc-500">সময়</p>
                    </div>
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <Zap size={14} className="text-yellow-400" />
                            <p className="text-lg font-bold text-yellow-400">+{result.xpEarned}</p>
                        </div>
                        <p className="text-xs text-zinc-500">XP অর্জিত</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={onRetry}
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400 transition-colors"
                    >
                        <RotateCcw size={16} />
                        আবার খেলো
                    </button>
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        <Home size={16} />
                        ড্যাশবোর্ডে যাও
                    </Link>
                </div>
            </div>
        </div>
    );
}
