'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Circle, Clock, Zap, RotateCcw, Home, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MockTestResult } from '../mock-test.store';
import type { Question } from '@/types/quiz';

interface MockTestResultScreenProps {
    result: MockTestResult;
    saving?: boolean;
    onRetry: () => void;
    onHome: () => void;
}

function formatTime(s: number): string {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}মি ${sec}সে` : `${sec}সে`;
}

function QuestionOutcome({ question, selectedOptionId }: { question: Question; selectedOptionId?: string }) {
    const selected = question.options.find((o) => o.id === selectedOptionId);
    const correct = question.options.find((o) => o.isCorrect);
    const isCorrect = selected?.isCorrect ?? false;
    const isUnanswered = !selectedOptionId;

    return (
        <div className="rounded-xl border border-border bg-card/50 p-3.5 space-y-2">
            <div className="flex items-start gap-2.5">
                {isUnanswered ? (
                    <Circle size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                ) : isCorrect ? (
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                ) : (
                    <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                )}
                <p className="text-sm leading-relaxed text-foreground">{question.text}</p>
            </div>

            {/* Show selected + correct if wrong */}
            {!isUnanswered && !isCorrect && (
                <div className="pl-6 space-y-1 text-xs">
                    <p className="text-red-400">
                        তোমার উত্তর: <span className="font-medium">{selected?.text}</span>
                    </p>
                    <p className="text-primary">
                        সঠিক উত্তর: <span className="font-medium">{correct?.text}</span>
                    </p>
                </div>
            )}
            {isUnanswered && correct && (
                <div className="pl-6 text-xs">
                    <p className="text-muted-foreground">
                        সঠিক উত্তর: <span className="font-medium text-muted-foreground">{correct.text}</span>
                    </p>
                </div>
            )}
            {question.explanation && !isUnanswered && (
                <p className="pl-6 text-xs text-blue-400 leading-relaxed">{question.explanation}</p>
            )}
        </div>
    );
}

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay },
});

export function MockTestResultScreen({ result, saving, onRetry, onHome }: MockTestResultScreenProps) {
    const scoreColor = result.score / result.maxScore >= 0.7
        ? 'text-primary'
        : result.score / result.maxScore >= 0.4
        ? 'text-yellow-400'
        : 'text-red-400';

    const grade = result.score / result.maxScore >= 0.7
        ? 'অসাধারণ!'
        : result.score / result.maxScore >= 0.4
        ? 'ভালো চেষ্টা!'
        : 'আরো পড়তে হবে';

    return (
        <div className="min-h-dvh bg-background pb-16">
            <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

                {/* Score card */}
                <motion.div {...fadeUp(0.05)} className="rounded-2xl border border-border bg-card p-6 text-center space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">মোট স্কোর</p>
                    <p className={cn('text-5xl font-extrabold', scoreColor)}>
                        {Number.isInteger(result.score) ? result.score : result.score.toFixed(2)}
                        <span className="text-2xl text-muted-foreground font-medium"> / {result.maxScore}</span>
                    </p>
                    <p className={cn('text-lg font-bold', scoreColor)}>{grade}</p>
                    {saving && (
                        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                            <Loader2 size={12} className="animate-spin" />
                            ফলাফল সেভ হচ্ছে...
                        </div>
                    )}
                </motion.div>

                {/* Stats grid */}
                <motion.div {...fadeUp(0.15)} className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                        <p className="text-xl font-extrabold text-primary">{result.correct}</p>
                        <p className="text-[10px] text-muted-foreground">সঠিক</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-center">
                        <p className="text-xl font-extrabold text-red-400">{result.incorrect}</p>
                        <p className="text-[10px] text-muted-foreground">ভুল</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 text-center">
                        <p className="text-xl font-extrabold text-muted-foreground">{result.unanswered}</p>
                        <p className="text-[10px] text-muted-foreground">বাদ দেওয়া</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 text-center">
                        <Clock size={14} className="text-muted-foreground" />
                        <p className="text-xs font-bold text-foreground">{formatTime(result.timeTaken)}</p>
                        <p className="text-[10px] text-muted-foreground">সময়</p>
                    </div>
                </motion.div>

                {/* Negative marking note */}
                <motion.p {...fadeUp(0.2)} className="text-xs text-center text-muted-foreground">
                    ভুল উত্তরে -০.২৫ মার্ক প্রযোজ্য হয়েছে
                </motion.p>

                {/* Actions */}
                <motion.div {...fadeUp(0.25)} className="flex gap-3">
                    <button
                        onClick={onRetry}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                    >
                        <RotateCcw size={15} />
                        আবার চেষ্টা করো
                    </button>
                    <button
                        onClick={onHome}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-500 py-3 text-sm font-semibold text-black hover:bg-teal-400 transition-colors"
                    >
                        <Home size={15} />
                        হোমে যাও
                    </button>
                </motion.div>

                {/* Per-question review */}
                <motion.div {...fadeUp(0.3)} className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">প্রশ্নভিত্তিক ফলাফল</p>
                    {result.questions.map((q) => (
                        <QuestionOutcome
                            key={q.id}
                            question={q}
                            selectedOptionId={result.answers[q.id]}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
