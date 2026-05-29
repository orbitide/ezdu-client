'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft, CheckCircle2, XCircle, MinusCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getQuizReview } from '@/lib/api/quiz';
import type { UserQuizReviewDto, ReviewQuestionDto } from '@/types/api';

export default function QuizReviewPage() {
    const { userQuizId } = useParams<{ id: string; userQuizId: string }>();
    const router = useRouter();
    const [review, setReview] = useState<UserQuizReviewDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        getQuizReview(userQuizId)
            .then(setReview)
            .catch(() => setError('রিভিউ লোড হয়নি।'))
            .finally(() => setLoading(false));
    }, [userQuizId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    if (error || !review) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-sm text-zinc-400">{error || 'কোনো রিভিউ পাওয়া যায়নি'}</p>
                <button onClick={() => router.back()} className="text-sm text-emerald-400 hover:text-emerald-300">
                    ফিরে যাও
                </button>
            </div>
        );
    }

    const accuracy = review.totalQuestions > 0
        ? Math.round((review.correctAnswers / review.totalQuestions) * 100)
        : 0;

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">রিভিউ</h1>
                    <p className="text-xs text-zinc-500">{review.quizTitle}</p>
                </div>
            </div>

            {/* Summary bar */}
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                    <p className="text-xl font-bold text-emerald-400">{review.correctAnswers}</p>
                    <p className="text-xs text-zinc-500">সঠিক</p>
                </div>
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-center">
                    <p className="text-xl font-bold text-rose-400">{review.totalQuestions - review.correctAnswers}</p>
                    <p className="text-xs text-zinc-500">ভুল</p>
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-center">
                    <p className="text-xl font-bold text-zinc-100">{accuracy}%</p>
                    <p className="text-xs text-zinc-500">নির্ভুলতা</p>
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-3">
                {review.questions.map((q, index) => (
                    <QuestionReviewCard
                        key={q.id}
                        question={q}
                        index={index + 1}
                        isExpanded={expanded === q.id}
                        onToggle={() => setExpanded(expanded === q.id ? null : q.id)}
                    />
                ))}
            </div>
        </div>
    );
}

function QuestionReviewCard({
    question, index, isExpanded, onToggle,
}: {
    question: ReviewQuestionDto;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const skipped = !question.selectedOptionId;

    const StatusIcon = skipped ? MinusCircle : question.isCorrect ? CheckCircle2 : XCircle;
    const statusColor = skipped ? 'text-zinc-500' : question.isCorrect ? 'text-emerald-400' : 'text-rose-400';
    const borderColor = skipped ? 'border-zinc-800' : question.isCorrect ? 'border-emerald-500/20' : 'border-rose-500/20';
    const bgColor = skipped ? 'bg-zinc-900' : question.isCorrect ? 'bg-emerald-500/5' : 'bg-rose-500/5';

    return (
        <div className={cn('rounded-xl border', borderColor, bgColor)}>
            <button
                onClick={onToggle}
                className="flex w-full items-start gap-3 p-4 text-left"
            >
                <StatusIcon size={18} className={cn('shrink-0 mt-0.5', statusColor)} />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-500 mb-1">প্রশ্ন {index}</p>
                    <p className="text-sm text-zinc-100 line-clamp-2">{question.text}</p>
                </div>
                <span className={cn('text-xs font-medium shrink-0', statusColor)}>
                    {isExpanded ? '▲' : '▼'}
                </span>
            </button>

            {isExpanded && (
                <div className="border-t border-zinc-800 p-4 space-y-3">
                    {/* Options */}
                    <div className="space-y-2">
                        {question.options.map((opt) => {
                            const isSelected = opt.id === question.selectedOptionId;
                            const isCorrect = opt.isCorrect;
                            return (
                                <div
                                    key={opt.id}
                                    className={cn(
                                        'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
                                        isCorrect
                                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                            : isSelected && !isCorrect
                                                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                                                : 'border-zinc-800 text-zinc-400'
                                    )}
                                >
                                    <span className="shrink-0 font-semibold">
                                        {isCorrect ? '✓' : isSelected ? '✗' : '○'}
                                    </span>
                                    {opt.text}
                                </div>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                        <div className="flex gap-2 rounded-lg bg-zinc-800/50 p-3">
                            <BookOpen size={14} className="text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-zinc-400 leading-relaxed">{question.explanation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
