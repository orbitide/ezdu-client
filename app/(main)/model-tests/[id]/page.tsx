'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { QuizHeader } from '@/features/quiz/components/QuizHeader';
import { QuestionCard } from '@/features/quiz/components/QuestionCard';
import { CongratulationsScreen } from '@/features/quiz/components/CongratulationsScreen';
import { useQuizStore } from '@/features/quiz/quiz.store';
import { getQuizDetails, submitUserQuiz } from '@/lib/api/quiz';
import { QuizType } from '@/types/api';
import type { QuizDetailsDto } from '@/types/api';

export default function QuizSessionPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { session, result, quizApiId, startQuiz, answerQuestion, nextQuestion, prevQuestion, finishQuiz, resetQuiz } = useQuizStore();

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [quiz, setQuiz] = useState<QuizDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [savedUserQuizId, setSavedUserQuizId] = useState<string | null>(null);
    const [serverResult, setServerResult] = useState<import('@/types/api').UserQuizResultDto | null>(null);

    // Load quiz — always fetch metadata; resume existing session on refresh
    useEffect(() => {
        let cancelled = false;
        getQuizDetails(id)
            .then((data) => {
                if (cancelled) return;
                setQuiz(data);

                // Resume: same quiz already active (e.g. page refresh)
                if (session?.status === 'active' && quizApiId === id) {
                    const elapsed = Math.round((Date.now() - session.startedAt) / 1000);
                    const remaining = Math.max(0, (data.duration ?? 30) * 60 - elapsed);
                    if (remaining <= 0) finishQuiz();
                    else setTimeRemaining(remaining);
                    return;
                }

                // Fresh start
                const questions = data.questions.map((q) => ({
                    id: q.id,
                    text: q.text,
                    options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                    explanation: q.explanation,
                    subjectId: q.subjectId,
                    subject: q.subjectName,
                    topic: q.topicName,
                    difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') ?? undefined,
                }));
                const durationMinutes = data.duration ?? 30;
                startQuiz('ssc', questions, durationMinutes, 'editable', id);
                setTimeRemaining(durationMinutes * 60);
            })
            .catch(() => { if (!cancelled) setError('কুইজ লোড হয়নি। আবার চেষ্টা করো।'); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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

    const handleFinish = useCallback(() => { finishQuiz(); }, [finishQuiz]);

    // Submit result — matches mobile app's userquiz/save contract
    useEffect(() => {
        if (!result || !session || savedUserQuizId || saving) return;
        setSaving(true);
        const subjectId = quiz?.subjectId ?? session.questions[0]?.subjectId ?? '0';
        submitUserQuiz({
            quizType: QuizType.Quiz,
            quizId: id,
            subjectId,
            durationSeconds: result.timeTaken,
            lessonId: id,
            submissions: session.questions.map((q) => ({
                qId: q.id,
                opId: session.answers[q.id] ?? '0',
            })),
        })
            .then((res) => { setSavedUserQuizId(res.userQuizId ?? null); setServerResult(res); })
            .catch(() => {})
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
                <button onClick={() => router.push('/model-tests')} className="text-sm text-emerald-400 hover:text-emerald-300">
                    মডেল টেস্ট লিস্টে ফিরে যাও
                </button>
            </div>
        );
    }

    if (result) {
        return (
            <CongratulationsScreen
                result={result}
                serverResult={serverResult}
                saving={saving}
                onReview={savedUserQuizId ? () => router.push(`/model-tests/${id}/review/${savedUserQuizId}`) : undefined}
                onRetry={() => {
                    resetQuiz();
                    setServerResult(null);
                    if (quiz) {
                        const questions = quiz.questions.map((q) => ({
                            id: q.id,
                            text: q.text,
                            options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                            explanation: q.explanation,
                            subjectId: q.subjectId,
                            subject: q.subjectName,
                            topic: q.topicName,
                            difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') ?? undefined,
                        }));
                        const durationMinutes = quiz.duration ?? 30;
                        startQuiz('ssc', questions, durationMinutes, 'editable', id);
                        setTimeRemaining(durationMinutes * 60);
                    }
                    setSavedUserQuizId(null);
                }}
                onHome={() => router.push('/model-tests')}
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
                subject={quiz?.title ?? 'মডেল টেস্ট'}
                elapsed={0}
                countdown={true}
                timeRemaining={timeRemaining}
                onExit={() => router.push('/model-tests')}
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
                examMode={true}
            />
        </div>
    );
}
