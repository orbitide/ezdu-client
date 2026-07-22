'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft, CheckCircle2, XCircle, MinusCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/ui/math-text';
import { getQuizReview } from '@/lib/api/quiz';
import type { UserQuizReviewDto, ReviewQuestionDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

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
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !review) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-sm text-muted-foreground">{error || 'কোনো রিভিউ পাওয়া যায়নি'}</p>
                <button onClick={() => router.back()} className="text-sm text-primary hover:text-primary">
                    ফিরে যাও
                </button>
            </div>
        );
    }

    const accuracy = review.totalQuestions > 0
        ? Math.round((review.correctAnswers / review.totalQuestions) * 100)
        : 0;

    return (
        <PageContainer>
        <TwoColumnShell right={<DefaultRightRail />}>
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-foreground">রিভিউ</h1>
                    <p className="text-xs text-muted-foreground">{review.quizTitle}</p>
                </div>
            </div>

            {/* Summary bar */}
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                    <p className="text-xl font-bold text-primary">{review.correctAnswers}</p>
                    <p className="text-xs text-muted-foreground">সঠিক</p>
                </div>
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-center">
                    <p className="text-xl font-bold text-rose-400">{review.totalQuestions - review.correctAnswers}</p>
                    <p className="text-xs text-muted-foreground">ভুল</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3 text-center">
                    <p className="text-xl font-bold text-foreground">{accuracy}%</p>
                    <p className="text-xs text-muted-foreground">নির্ভুলতা</p>
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
        </TwoColumnShell>
        </PageContainer>
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
    const statusColor = skipped ? 'text-muted-foreground' : question.isCorrect ? 'text-primary' : 'text-rose-400';
    const borderColor = skipped ? 'border-border' : question.isCorrect ? 'border-primary/20' : 'border-rose-500/20';
    const bgColor = skipped ? 'bg-card' : question.isCorrect ? 'bg-primary/5' : 'bg-rose-500/5';

    return (
        <div className={cn('rounded-xl border', borderColor, bgColor)}>
            <button
                onClick={onToggle}
                className="flex w-full items-start gap-3 p-4 text-left"
            >
                <StatusIcon size={18} className={cn('shrink-0 mt-0.5', statusColor)} />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">প্রশ্ন {index}</p>
                    <p className="text-sm text-foreground line-clamp-2"><MathText text={question.text} /></p>
                </div>
                <span className={cn('text-xs font-medium shrink-0', statusColor)}>
                    {isExpanded ? '▲' : '▼'}
                </span>
            </button>

            {isExpanded && (
                <div className="border-t border-border p-4 space-y-3">
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
                                            ? 'border-primary/40 bg-primary/10 text-primary'
                                            : isSelected && !isCorrect
                                                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                                                : 'border-border text-muted-foreground'
                                    )}
                                >
                                    <span className="shrink-0 font-semibold">
                                        {isCorrect ? '✓' : isSelected ? '✗' : '○'}
                                    </span>
                                    <MathText text={opt.text} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                        <div className="flex gap-2 rounded-lg bg-muted/50 p-3">
                            <BookOpen size={14} className="text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground leading-relaxed"><MathText text={question.explanation} /></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
