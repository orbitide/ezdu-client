'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useQuizStore } from '@/features/quiz/quiz.store';
import { QuizHeader } from '@/features/quiz/components/QuizHeader';
import { QuestionCard } from '@/features/quiz/components/QuestionCard';
import { ResultScreen } from '@/features/quiz/components/ResultScreen';
import { submitUserQuiz } from '@/lib/api/quiz';
import { QuizType } from '@/types/api';

export default function MockTestSessionPage() {
    const router = useRouter();
    const { session, result, answerQuestion, nextQuestion, prevQuestion, finishQuiz, resetQuiz } = useQuizStore();

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [saving, setSaving] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Guard: no active session → back to mock-tests
    useEffect(() => {
        if (!session && !result) {
            router.replace('/mock-tests');
        }
    }, [session, result, router]);

    // Initialise / resume countdown — recalculate from startedAt so refresh is accurate
    useEffect(() => {
        if (!session || session.status !== 'active' || timeRemaining > 0) return;
        const elapsed = Math.round((Date.now() - session.startedAt) / 1000);
        const remaining = Math.max(0, (session.timeLimit ?? 20) * 60 - elapsed);
        if (remaining <= 0) finishQuiz();
        else setTimeRemaining(remaining);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.startedAt, session?.status]);

    // Countdown timer — auto-submit at 0
    useEffect(() => {
        if (!session || session.status !== 'active') return;
        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    finishQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [session?.status, finishQuiz]);

    // Submit result — matches mobile app's userquiz/save contract
    useEffect(() => {
        if (!result || !session || saving) return;
        setSaving(true);
        submitUserQuiz({
            quizType: QuizType.Mock,
            quizId: '0',
            subjectId: session.questions[0]?.subjectId ?? '0',
            durationSeconds: result.timeTaken,
            lessonId: '0',
            submissions: session.questions.map((q) => ({
                qId: q.id,
                opId: session.answers[q.id] ?? '0',
            })),
        })
            .catch(() => {})
            .finally(() => setSaving(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    const handleFinish = useCallback(() => {
        setShowConfirm(false);
        finishQuiz();
    }, [finishQuiz]);

    // Result screen
    if (result) {
        return (
            <ResultScreen
                result={result}
                saving={saving}
                onRetry={() => {
                    // Restart with same questions in lockOnce mode
                    const qs = session?.questions ?? [];
                    const tl = session?.timeLimit ?? 20;
                    resetQuiz();
                    useQuizStore.getState().startQuiz('ssc', qs, tl, 'lockOnce');
                    setTimeRemaining(tl * 60);
                }}
                onReview={undefined}
            />
        );
    }

    if (!session) return null;

    const question = session.questions[session.currentIndex];
    const currentNumber = session.currentIndex + 1;
    const answeredCount = Object.keys(session.answers).length;
    const unansweredCount = session.questions.length - answeredCount;

    return (
        <div className="flex flex-col min-h-full">
            {/* Header with countdown */}
            <QuizHeader
                current={currentNumber}
                total={session.questions.length}
                subject="মক কুইজ"
                elapsed={0}
                countdown={true}
                timeRemaining={timeRemaining}
                onExit={() => router.push('/mock-tests')}
            />

            {/* Question indicator bar */}
            <div className="flex gap-1 overflow-x-auto px-4 py-2 border-b border-zinc-800/40 bg-zinc-950/95" style={{ scrollbarWidth: 'none' }}>
                {session.questions.map((q, i) => {
                    const isAnswered = session.answers[q.id] !== undefined;
                    const isCurrent = i === session.currentIndex;
                    return (
                        <button
                            key={q.id}
                            onClick={() => useQuizStore.getState().session && (
                                useQuizStore.setState((s) => ({
                                    session: s.session ? { ...s.session, currentIndex: i } : null
                                }))
                            )}
                            className={cn(
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all',
                                isCurrent
                                    ? 'ring-2 ring-teal-400 bg-teal-500/20 text-teal-300'
                                    : isAnswered
                                    ? 'bg-teal-500 text-black'
                                    : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                            )}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>

            {/* Question card — examMode, lockOnce enforced by store */}
            <QuestionCard
                question={question}
                index={currentNumber}
                total={session.questions.length}
                selectedAnswer={session.answers[question.id]}
                onAnswer={(optId) => answerQuestion(question.id, optId)}
                onNext={nextQuestion}
                onPrev={prevQuestion}
                isLast={session.currentIndex === session.questions.length - 1}
                onFinish={() => setShowConfirm(true)}
                examMode={true}
            />

            {/* Confirm submit dialog */}
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
                            <h3 className="text-base font-bold text-zinc-100">কুইজ জমা দাও?</h3>
                            <div className="space-y-1 text-sm text-zinc-400">
                                <p>✓ {answeredCount} টি উত্তর দিয়েছো</p>
                                {unansweredCount > 0 && (
                                    <p className="text-zinc-500">○ {unansweredCount} টি উত্তর বাকি</p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                                >
                                    পিছে যাও
                                </button>
                                <button
                                    onClick={handleFinish}
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
