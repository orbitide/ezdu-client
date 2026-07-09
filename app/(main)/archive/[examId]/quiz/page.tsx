'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Trophy, RotateCcw, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getArchiveExamDetails } from '@/lib/api/archive';
import { submitUserQuiz } from '@/lib/api/quiz';
import { QuizHeader } from '@/features/quiz/components/QuizHeader';
import { QuestionCard } from '@/features/quiz/components/QuestionCard';
import { QuizType } from '@/types/api';
import type { ArchiveExamDto } from '@/types/api';
import type { Question } from '@/types/quiz';

function toQuizQuestion(q: ArchiveExamDto['questions'][number]): Question {
    return {
        id: String(q.id),
        text: q.name,
        passage: q.passage,
        options: (q.options ?? []).map((o) => ({
            id: String(o.id),
            text: o.name,
            isCorrect: o.isCorrect,
        })),
        explanation: q.explanation,
    };
}

export default function ArchiveQuizPage() {
    const { examId } = useParams<{ examId: string }>();
    const router = useRouter();
    const [exam, setExam] = useState<ArchiveExamDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [elapsed, setElapsed] = useState(0);
    const [finished, setFinished] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [serverResult, setServerResult] = useState<{
        correct: number;
        total: number;
        earnedXp: number;
        percentage: number;
    } | null>(null);

    useEffect(() => {
        if (!examId) return;
        let cancelled = false;

        getArchiveExamDetails(examId)
            .then((data) => {
                if (!cancelled) setExam(data);
            })
            .catch(() => {
                if (!cancelled) setError('কুইজ লোড হয়নি। আবার চেষ্টা করো।');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [examId]);

    useEffect(() => {
        if (loading || finished || !exam) return;
        const interval = setInterval(() => setElapsed((p) => p + 1), 1000);
        return () => clearInterval(interval);
    }, [loading, finished, exam]);

    const questions = exam?.questions.map(toQuizQuestion) ?? [];
    const question = questions[currentIndex];

    const handleFinish = useCallback(async () => {
        if (!exam || finished) return;
        setFinished(true);
        setSubmitting(true);
        setSubmitError(null);

        const submissions = questions
            .filter((q) => answers[q.id])
            .map((q) => ({ qId: q.id, opId: answers[q.id] }));

        try {
            const res = await submitUserQuiz({
                quizType: QuizType.Archive,
                quizId: String(exam.id),
                subjectId: String(exam.subjectId),
                durationSeconds: elapsed,
                submissions,
            });
            setServerResult({
                correct: res.correctAnswer,
                total: res.totalQuestions,
                earnedXp: res.earnedXp,
                percentage: Math.round(res.percentage),
            });
        } catch {
            setSubmitError('কুইজ জমা দেওয়া ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
            const localCorrect = questions.filter((q) => {
                const selected = answers[q.id];
                return selected && q.options.find((o) => o.id === selected)?.isCorrect;
            }).length;
            setServerResult({
                correct: localCorrect,
                total: questions.length,
                earnedXp: 0,
                percentage: questions.length
                    ? Math.round((localCorrect / questions.length) * 100)
                    : 0,
            });
        } finally {
            setSubmitting(false);
        }
    }, [exam, finished, questions, answers, elapsed]);

    const handleRetry = () => {
        setCurrentIndex(0);
        setAnswers({});
        setElapsed(0);
        setFinished(false);
        setServerResult(null);
        setSubmitError(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (error || !exam || questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-sm text-zinc-400 text-center">
                    {error ?? 'এই পরীক্ষায় কোনো প্রশ্ন নেই'}
                </p>
                <Link href={`/archive/${examId}`} className="text-sm text-emerald-400 hover:text-emerald-300">
                    পরীক্ষায় ফিরে যাও
                </Link>
            </div>
        );
    }

    if (finished && !serverResult) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (finished && serverResult) {
        const gradeColor =
            serverResult.percentage >= 70 ? 'text-emerald-400' :
            serverResult.percentage >= 50 ? 'text-yellow-400' : 'text-rose-400';

        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-6 text-center">
                    <Trophy size={48} className="mx-auto text-emerald-400" />
                    <div>
                        <p className={cn('text-4xl font-bold', gradeColor)}>{serverResult.percentage}%</p>
                        <p className="text-sm text-zinc-500 mt-1">
                            {serverResult.correct} / {serverResult.total} সঠিক
                        </p>
                        {serverResult.earnedXp > 0 && (
                            <p className="text-sm text-emerald-400 mt-2">+{serverResult.earnedXp} XP</p>
                        )}
                    </div>
                    {submitError && (
                        <p className="text-xs text-amber-400">{submitError}</p>
                    )}
                    {submitting && (
                        <p className="text-xs text-zinc-500 flex items-center justify-center gap-1">
                            <Loader2 size={12} className="animate-spin" />
                            ফলাফল সেভ হচ্ছে...
                        </p>
                    )}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleRetry}
                            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
                        >
                            <RotateCcw size={16} />
                            আবার চেষ্টা
                        </button>
                        <Link
                            href="/archive"
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
                        >
                            <Home size={16} />
                            প্রশ্নব্যাংকে ফিরে যাও
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!question) return null;

    return (
        <div className="flex flex-col min-h-full">
            <QuizHeader
                current={currentIndex + 1}
                total={questions.length}
                subject={exam.name}
                elapsed={elapsed}
                onExit={() => router.push(`/archive/${examId}`)}
            />
            <QuestionCard
                question={question}
                index={currentIndex + 1}
                total={questions.length}
                selectedAnswer={answers[question.id]}
                onAnswer={(optId) => setAnswers((prev) => ({ ...prev, [question.id]: optId }))}
                onNext={() => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1))}
                onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                isLast={currentIndex === questions.length - 1}
                onFinish={handleFinish}
            />
        </div>
    );
}
