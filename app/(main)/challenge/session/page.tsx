'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, ArrowLeft, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChallengeStore } from '@/features/challenge/challenge.store';
import { OptionButton } from '@/features/quiz/components/OptionButton';
import { MathText } from '@/components/ui/math-text';

const CELEBRATION: Record<number, { emoji: string; title: string; sub: string }> = {
    3:  { emoji: '🔥', title: 'স্ট্রিক ৩!',  sub: 'চমৎকার! চালিয়ে যাও' },
    5:  { emoji: '⚡', title: 'স্ট্রিক ৫!', sub: 'অসাধারণ পারফরম্যান্স!' },
    10: { emoji: '💥', title: 'স্ট্রিক ১০!', sub: 'তুমি সত্যিকারের মাস্টার!' },
};

export default function ChallengeSessionPage() {
    const router = useRouter();
    const {
        questions,
        currentIndex,
        status,
        wrongOptionIds,
        currentStreak,
        subjectName,
        celebrationStreak,
        selectOption,
        nextQuestion,
        dismissCelebration,
    } = useChallengeStore();

    useEffect(() => {
        if (questions.length === 0) router.replace('/challenge');
    }, [questions.length, router]);

    useEffect(() => {
        if (!celebrationStreak) return;
        const t = setTimeout(dismissCelebration, 1800);
        return () => clearTimeout(t);
    }, [celebrationStreak, dismissCelebration]);

    useEffect(() => {
        if (status === 'finished') router.replace('/challenge/finish');
    }, [status, router]);

    const handleNext = useCallback(() => nextQuestion(), [nextQuestion]);

    if (questions.length === 0) return null;

    const question = questions[currentIndex];
    const answered = status === 'answered_correct' || status === 'answered_wrong';
    const isLast = currentIndex === questions.length - 1;
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="flex flex-col min-h-dvh bg-zinc-950">
            {/* ── Header ── */}
            <header className="flex items-center gap-3 border-b border-zinc-800/60 px-4 py-3 shrink-0">
                <button
                    onClick={() => router.push('/challenge')}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-100">{subjectName}</p>
                    <p className="text-xs text-zinc-500">প্রশ্ন {currentIndex + 1} / {questions.length}</p>
                </div>

                {/* Streak badge — amber/orange like mobile warning color */}
                <div className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold transition-all duration-300',
                    currentStreak >= 5  ? 'bg-amber-500/20 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]' :
                    currentStreak >= 3  ? 'bg-orange-500/20 text-orange-400' :
                    currentStreak > 0   ? 'bg-amber-500/10 text-amber-500' :
                                          'bg-zinc-800 text-zinc-600'
                )}>
                    <Flame size={14} />
                    <span>{currentStreak}</span>
                </div>
            </header>

            {/* ── Progress bar — emerald (mobile success #4CAF50) ── */}
            <div className="h-1 bg-zinc-800 shrink-0">
                <motion.div
                    className="h-full bg-emerald-500"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* ── Question + options (scrollable) ── */}
            <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full space-y-5">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                >
                    {question.topic && (
                        <p className="mb-2 text-xs text-zinc-500">{question.topic}</p>
                    )}
                    {question.passage && (
                        <div className="mb-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-sm leading-relaxed text-zinc-300">
                            <MathText text={question.passage} block />
                        </div>
                    )}
                    <p className="text-base font-medium leading-relaxed text-zinc-100">
                        {currentIndex + 1}. <MathText text={question.text} />
                    </p>
                </motion.div>

                {/* Options */}
                <div className="flex flex-col gap-2">
                    {question.options.map((opt, i) => {
                        const isWrong = wrongOptionIds.includes(opt.id);
                        return (
                            <OptionButton
                                key={opt.id}
                                id={opt.id}
                                text={opt.text}
                                index={i}
                                selected={isWrong}
                                isCorrect={opt.isCorrect}
                                revealed={answered}
                                onClick={() => selectOption(opt.id, opt.isCorrect)}
                            />
                        );
                    })}
                </div>

                {/* Explanation — blue tint matching existing quiz style */}
                <AnimatePresence>
                    {answered && question.explanation && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4"
                        >
                            <Lightbulb size={16} className="mt-0.5 shrink-0 text-blue-400" />
                            <p className="text-sm leading-relaxed text-blue-300"><MathText text={question.explanation} /></p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Sticky continue button ── */}
            <AnimatePresence>
                {answered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className="shrink-0 border-t border-zinc-800/60 bg-zinc-950 px-4 py-4"
                    >
                        <button
                            onClick={handleNext}
                            className={cn(
                                'flex w-full max-w-2xl mx-auto items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors',
                                isLast
                                    ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                                    : status === 'answered_correct'
                                    ? 'bg-teal-500 text-black hover:bg-teal-400'   /* brand primary teal */
                                    : 'bg-zinc-700 text-zinc-100 hover:bg-zinc-600' /* neutral after wrong */
                            )}
                        >
                            {isLast ? 'ফলাফল দেখো' : 'পরের প্রশ্ন'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Streak celebration overlay — teal brand + amber lightning ── */}
            <AnimatePresence>
                {celebrationStreak && CELEBRATION[celebrationStreak] && (
                    <motion.div
                        key={celebrationStreak}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(0,212,146,0.35) 0%, rgba(0,0,0,0.75) 100%)',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.55, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 13, stiffness: 200 }}
                            className="text-center px-8"
                        >
                            <p className="text-6xl mb-2">{CELEBRATION[celebrationStreak].emoji}</p>
                            <p
                                className="text-4xl font-extrabold text-white"
                                style={{ textShadow: '0 0 20px rgba(0,212,146,0.8), 0 2px 4px rgba(0,0,0,0.5)' }}
                            >
                                {CELEBRATION[celebrationStreak].title}
                            </p>
                            <p className="mt-2 text-base font-semibold text-teal-200">
                                {CELEBRATION[celebrationStreak].sub}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
