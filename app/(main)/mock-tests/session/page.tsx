'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMockTestStore } from '@/features/mock-test/mock-test.store';
import { MockTestResultScreen } from '@/features/mock-test/components/MockTestResultScreen';
import { OptionButton } from '@/features/quiz/components/OptionButton';
import { saveQuizResult } from '@/lib/api/quiz';

function formatCountdown(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function MockTestSessionPage() {
    const router = useRouter();
    const store = useMockTestStore();

    const [showConfirm, setShowConfirm] = useState(false);
    const [saving, setSaving] = useState(false);

    // Guard: no active session
    useEffect(() => {
        if (store.status === 'idle' && store.questions.length === 0) {
            router.replace('/mock-tests');
        }
    }, [store.status, store.questions.length, router]);

    // Countdown timer
    useEffect(() => {
        if (store.status !== 'active') return;
        const interval = setInterval(() => {
            const { timeRemaining, status, finishTest, decrementTimer } = useMockTestStore.getState();
            if (status !== 'active') { clearInterval(interval); return; }
            if (timeRemaining <= 1) finishTest();
            else decrementTimer();
        }, 1000);
        return () => clearInterval(interval);
    }, [store.status]);

    // Auto-save result
    useEffect(() => {
        if (store.status !== 'finished' || !store.result || saving) return;
        setSaving(true);
        const submittedAnswers = store.questions.map((q) => {
            const selectedId = store.answers[q.id] ?? null;
            const isCorrect = !!q.options.find((o) => o.id === selectedId)?.isCorrect;
            return { questionId: q.id, selectedOptionId: selectedId, isCorrect };
        });
        saveQuizResult({
            totalQuestions: store.result.total,
            correctAnswers: store.result.correct,
            incorrectAnswers: store.result.incorrect,
            skippedQuestions: store.result.unanswered,
            timeTaken: store.result.timeTaken,
            xpEarned: store.result.xpEarned,
            submittedAnswers,
        })
            .catch(() => {})
            .finally(() => setSaving(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.status]);

    const handleConfirmSubmit = useCallback(() => {
        setShowConfirm(false);
        store.finishTest();
    }, [store]);

    const scrollToQuestion = useCallback((index: number) => {
        document.getElementById(`sq-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const handleRetry = useCallback(() => {
        const { quizId, quizTitle, questions, totalTime, negativeMarkValue } = useMockTestStore.getState();
        store.startTest(quizId, quizTitle, questions, totalTime / 60, negativeMarkValue);
    }, [store]);

    // Result screen
    if (store.status === 'finished' && store.result) {
        return (
            <MockTestResultScreen
                result={store.result}
                saving={saving}
                onRetry={handleRetry}
                onHome={() => { store.resetTest(); router.push('/mock-tests'); }}
            />
        );
    }

    if (store.questions.length === 0) return null;

    const { questions, answers, timeRemaining, totalTime, negativeMarkValue, quizTitle } = store;
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = questions.length - answeredCount;
    const isLowTime = timeRemaining <= 300;
    const progressPct = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

    return (
        <div className="flex flex-col min-h-dvh bg-zinc-950">

            {/* ── Header ── */}
            <header className="sticky top-0 z-20 shrink-0 border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur-sm">
                <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
                    <button
                        onClick={() => router.push('/mock-tests')}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <p className="flex-1 truncate text-sm font-semibold text-zinc-100">{quizTitle}</p>
                    <div className={cn(
                        'flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold font-mono transition-colors duration-500',
                        isLowTime
                            ? 'bg-red-500/15 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                            : 'bg-zinc-800 text-zinc-200'
                    )}>
                        <Clock size={13} />
                        <span>{formatCountdown(timeRemaining)}</span>
                    </div>
                </div>
                <div className="h-0.5 bg-zinc-800">
                    <motion.div
                        className={cn('h-full transition-colors duration-500', isLowTime ? 'bg-red-500' : 'bg-teal-500')}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.8, ease: 'linear' }}
                    />
                </div>
            </header>

            {/* ── Info bar ── */}
            <div className="shrink-0 border-b border-zinc-800/40 bg-zinc-900/30 px-4 py-2">
                <div className="flex items-center gap-2 max-w-3xl mx-auto">
                    <Info size={12} className="shrink-0 text-zinc-600" />
                    <p className="text-xs text-zinc-500">
                        ভুল উত্তরে{' '}
                        <span className="font-semibold text-red-400">-{negativeMarkValue}</span> মার্ক কাটবে
                        &nbsp;·&nbsp; একবার উত্তর দিলে পরিবর্তন করা যাবে না
                    </p>
                </div>
            </div>

            {/* ── Question indicator bar ── */}
            <div className="sticky top-[57px] z-10 shrink-0 border-b border-zinc-800/40 bg-zinc-950/95 backdrop-blur-sm px-4 py-2.5">
                <div className="max-w-3xl mx-auto space-y-1.5">
                    <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
                        {questions.map((q, i) => {
                            const isAnswered = answers[q.id] !== undefined;
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => scrollToQuestion(i)}
                                    className={cn(
                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all',
                                        isAnswered
                                            ? 'bg-teal-500 text-black shadow-sm'
                                            : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300'
                                    )}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-right text-[10px] text-zinc-600">
                        {answeredCount} / {questions.length} উত্তর দিয়েছো
                    </p>
                </div>
            </div>

            {/* ── All questions ── */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">
                    {questions.map((q, i) => {
                        const selectedId = answers[q.id];
                        const isAnswered = selectedId !== undefined;

                        return (
                            <div
                                key={q.id}
                                id={`sq-${i}`}
                                className="scroll-mt-36 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-4"
                            >
                                <div className="flex items-start gap-3">
                                    <span className={cn(
                                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5',
                                        isAnswered ? 'bg-teal-500/20 text-teal-400' : 'bg-zinc-800 text-zinc-500'
                                    )}>
                                        {i + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        {q.topic && <p className="text-[11px] text-zinc-600 mb-1">{q.topic}</p>}
                                        <p className="text-sm leading-relaxed text-zinc-100">{q.text}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 pl-10">
                                    {q.options.map((opt, oi) => (
                                        <OptionButton
                                            key={opt.id}
                                            id={opt.id}
                                            text={opt.text}
                                            index={oi}
                                            selected={selectedId === opt.id}
                                            isCorrect={opt.isCorrect}
                                            revealed={false}
                                            onClick={() => store.selectOption(q.id, opt.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <div className="h-20" />
                </div>
            </div>

            {/* ── Submit footer ── */}
            <div className="sticky bottom-0 z-10 shrink-0 border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-sm px-4 py-3">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors"
                    >
                        জমা দাও
                        <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs font-medium">
                            {answeredCount}/{questions.length}
                        </span>
                    </button>
                </div>
            </div>

            {/* ── Confirm dialog ── */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-4"
                        onClick={() => setShowConfirm(false)}
                    >
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 p-6 space-y-4"
                        >
                            <h3 className="text-base font-bold text-zinc-100">টেস্ট জমা দাও?</h3>
                            <div className="space-y-1 text-sm text-zinc-400">
                                <p>✓ {answeredCount} টি উত্তর দিয়েছো</p>
                                {unansweredCount > 0 && (
                                    <p className="text-zinc-500">○ {unansweredCount} টি উত্তর বাকি</p>
                                )}
                                <p className="pt-1 text-xs text-zinc-600">জমা দেওয়ার পর আর পরিবর্তন করা যাবে না।</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                                >
                                    পিছে যাও
                                </button>
                                <button
                                    onClick={handleConfirmSubmit}
                                    className="flex-1 rounded-xl bg-teal-500 py-2.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors"
                                >
                                    জমা দাও
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
