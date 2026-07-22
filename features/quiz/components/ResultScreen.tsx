'use client';

import type { QuizResult } from '../types';
import Link from 'next/link';
import { Trophy, Clock, Zap, RotateCcw, Home, BookOpen, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultScreenProps {
    result: QuizResult;
    onRetry: () => void;
    onReview?: () => void;
    saving?: boolean;
}

export function ResultScreen({ result, onRetry, onReview, saving }: ResultScreenProps) {
    const { accuracy } = result;
    const grade = accuracy >= 90 ? 'অসাধারণ!' : accuracy >= 70 ? 'ভালো হয়েছে!' : accuracy >= 50 ? 'চেষ্টা করো' : 'আরো পড়তে হবে';
    const gradeColor = accuracy >= 90 ? 'text-primary' : accuracy >= 70 ? 'text-yellow-400' : accuracy >= 50 ? 'text-orange-400' : 'text-rose-400';

    const minutes = Math.floor(result.timeTaken / 60);
    const seconds = result.timeTaken % 60;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                {/* Score circle */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-border">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(${accuracy >= 70 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#f43f5e'} ${accuracy * 3.6}deg, transparent 0deg)`,
                                opacity: 0.3,
                            }}
                        />
                        <div className="text-center">
                            <p className={cn('text-4xl font-bold', gradeColor)}>{accuracy}%</p>
                            <p className="text-xs text-muted-foreground">সঠিক</p>
                        </div>
                    </div>
                    <p className={cn('text-xl font-bold', gradeColor)}>{grade}</p>
                    {saving && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Loader2 size={12} className="animate-spin" />
                            ফলাফল সেভ হচ্ছে...
                        </div>
                    )}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{result.correct}</p>
                        <p className="text-xs text-muted-foreground">সঠিক উত্তর</p>
                    </div>
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-center">
                        <p className="text-2xl font-bold text-rose-400">{result.incorrect}</p>
                        <p className="text-xs text-muted-foreground">ভুল উত্তর</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <Clock size={14} className="text-muted-foreground" />
                            <p className="text-lg font-bold text-foreground">{minutes}:{seconds.toString().padStart(2, '0')}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">সময়</p>
                    </div>
                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <Zap size={14} className="text-yellow-400" />
                            <p className="text-lg font-bold text-yellow-400">+{result.xpEarned}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">XP অর্জিত</p>
                    </div>
                </div>

                {/* Skipped */}
                {result.skipped > 0 && (
                    <p className="text-center text-xs text-muted-foreground">
                        {result.skipped}টি প্রশ্ন এড়িয়ে গেছো
                    </p>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    {onReview && (
                        <button
                            onClick={onReview}
                            disabled={saving}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/30 px-6 py-3 font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                        >
                            <BookOpen size={16} />
                            উত্তর রিভিউ করো
                        </button>
                    )}
                    <button
                        onClick={onRetry}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-black hover:bg-primary transition-colors"
                    >
                        <RotateCcw size={16} />
                        আবার খেলো
                    </button>
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                    >
                        <Home size={16} />
                        ড্যাশবোর্ডে যাও
                    </Link>
                </div>
            </div>
        </div>
    );
}
