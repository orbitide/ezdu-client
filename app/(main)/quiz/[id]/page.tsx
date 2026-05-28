'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { QuizHeader } from '@/features/quiz/components/QuizHeader';
import { QuestionCard } from '@/features/quiz/components/QuestionCard';
import { ResultScreen } from '@/features/quiz/components/ResultScreen';
import { useQuizStore } from '@/features/quiz/quiz.store';
import { getQuizDetails, saveQuizResult } from '@/lib/api/quiz';
import type { QuizDetailsDto } from '@/types/api';

export default function QuizSessionPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { session, result, startQuiz, answerQuestion, nextQuestion, prevQuestion, finishQuiz, resetQuiz } = useQuizStore();
    const [elapsed, setElapsed] = useState(0);
    const [quiz, setQuiz] = useState<QuizDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [savedUserQuizId, setSavedUserQuizId] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        resetQuiz();
        getQuizDetails(id)
            .then((data) => {
                if (cancelled) return;
                setQuiz(data);
                // Map API questions to the store format
                const questions = data.questions.map((q) => ({
                    id: q.id,
                    text: q.text,
                    options: q.options.map((o) => ({
                        id: o.id,
                        text: o.text,
                        isCorrect: o.isCorrect,
                    })),
                    explanation: q.explanation,
                    subject: q.subjectName,
                    topic: q.topicName,
                    difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') ?? undefined,
                }));
                startQuiz('ssc', questions, data.duration ?? undefined);
            })
            .catch(() => { if (!cancelled) setError('কুইজ লোড হয়নি। আবার চেষ্টা করো।'); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Timer
    useEffect(() => {
        if (!session || session.status !== 'active') return;
        const interval = setInterval(() => setElapsed((p) => p + 1), 1000);
        return () => clearInterval(interval);
    }, [session?.status]);

    const handleFinish = useCallback(async () => {
        finishQuiz();
    }, [finishQuiz]);

    // Save result after quiz completes
    useEffect(() => {
        if (!result || !session || savedUserQuizId || saving) return;
        setSaving(true);
        const submittedAnswers = session.questions.map((q) => {
            const selectedId = session.answers[q.id] ?? null;
            const isCorrect = !!q.options.find((o) => o.id === selectedId)?.isCorrect;
            return { questionId: q.id, selectedOptionId: selectedId, isCorrect };
        });
        saveQuizResult({
            quizId: id,
            totalQuestions: result.total,
            correctAnswers: result.correct,
            incorrectAnswers: result.incorrect,
            skippedQuestions: result.skipped,
            timeTaken: result.timeTaken,
            xpEarned: result.xpEarned,
            submittedAnswers,
        })
            .then((res) => setSavedUserQuizId(res.id))
            .catch(() => {}) // fail silently — results still shown
            .finally(() => setSaving(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-sm text-zinc-400 text-center">{error}</p>
                <button onClick={() => router.push('/quiz')} className="text-sm text-emerald-400 hover:text-emerald-300">
                    কুইজ লিস্টে ফিরে যাও
                </button>
            </div>
        );
    }

    if (result) {
        return (
            <ResultScreen
                result={result}
                saving={saving}
                onReview={savedUserQuizId ? () => router.push(`/quiz/${id}/review/${savedUserQuizId}`) : undefined}
                onRetry={() => {
                    resetQuiz();
                    if (quiz) {
                        const questions = quiz.questions.map((q) => ({
                            id: q.id,
                            text: q.text,
                            options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                            explanation: q.explanation,
                            subject: q.subjectName,
                            topic: q.topicName,
                            difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') ?? undefined,
                        }));
                        startQuiz('ssc', questions, quiz.duration ?? undefined);
                    }
                    setElapsed(0);
                    setSavedUserQuizId(null);
                }}
            />
        );
    }

    if (!session) return null;

    const question = session.questions[session.currentIndex];
    const currentNumber = session.currentIndex + 1;

    return (
        <div className="flex flex-col min-h-full">
            <QuizHeader
                current={currentNumber}
                total={session.questions.length}
                subject={quiz?.title ?? 'কুইজ'}
                elapsed={elapsed}
                onExit={() => router.push('/quiz')}
            />
            <QuestionCard
                question={question}
                index={currentNumber}
                total={session.questions.length}
                selectedAnswer={session.answers[question.id]}
                onAnswer={(optId) => answerQuestion(question.id, optId)}
                onNext={nextQuestion}
                onPrev={prevQuestion}
                isLast={session.currentIndex === session.questions.length - 1}
                onFinish={handleFinish}
            />
        </div>
    );
}
