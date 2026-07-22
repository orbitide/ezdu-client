'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle, BookOpen, RotateCcw } from 'lucide-react';
import { cn, toBangla } from '@/lib/utils';
import { getMyQuizHistory, getQuizReview } from '@/lib/api/quiz';
import { useLaunchStore } from '@/features/quiz/engine/launch.store';
import { QuizType } from '@/types/api';
import type { ReviewQuestionDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function MistakesPage() {
    const router = useRouter();
    const launch = useLaunchStore((s) => s.launch);
    const [mistakes, setMistakes] = useState<ReviewQuestionDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);

    // Mirrors mobile's `history_mistake_tab.dart` revision launch.
    const handleRevise = () => {
        launch(
            {
                quizType: QuizType.Mock,
                quizId: '',
                title: 'ভুল প্রশ্ন রিভিশন',
                timeInMinutes: 15,
            },
            mistakes.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
            })),
            '/progress/mistakes',
        );
        router.push('/quiz/session');
    };

    useEffect(() => {
        // Fetch last 5 quiz reviews and extract incorrect answers
        getMyQuizHistory(1, 5)
            .then(async (history) => {
                const reviewPromises = history.items.slice(0, 3).map((item) =>
                    getQuizReview(item.id).catch(() => null)
                );
                const reviews = await Promise.all(reviewPromises);
                const allMistakes: ReviewQuestionDto[] = [];
                reviews.forEach((review) => {
                    if (!review) return;
                    review.questions.forEach((q) => {
                        if (!q.isCorrect && q.selectedOptionId) {
                            allMistakes.push(q);
                        }
                    });
                });
                setMistakes(allMistakes.slice(0, 30));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageContainer>
        <TwoColumnShell right={<DefaultRightRail />}>
        <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-foreground">ভুলের তালিকা</h1>
                        <p className="text-xs text-muted-foreground">সাম্প্রতিক ভুল উত্তরগুলো</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 size={28} className="animate-spin text-rose-500" />
                    </div>
                ) : mistakes.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-10 text-center">
                        <AlertCircle size={36} className="mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">কোনো ভুল উত্তর নেই</p>
                        <p className="text-xs text-muted-foreground mt-1">আরো কুইজ দিলে এখানে ভুলগুলো দেখাবে</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-muted-foreground">{toBangla(mistakes.length)}টি ভুল উত্তর পাওয়া গেছে</p>
                            <button
                                onClick={handleRevise}
                                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-rose-500 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-rose-400"
                            >
                                <RotateCcw size={13} />
                                রিভিশন করো
                            </button>
                        </div>
                        {mistakes.map((q, i) => (
                            <div key={q.id} className="rounded-xl border border-rose-500/20 bg-rose-500/5">
                                <button
                                    onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                                    className="flex w-full items-start gap-3 p-4 text-left"
                                >
                                    <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs text-muted-foreground mb-0.5">প্রশ্ন {toBangla(i + 1)}</p>
                                        <p className="text-sm text-foreground line-clamp-2">{q.text}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground shrink-0">{expanded === q.id ? '▲' : '▼'}</span>
                                </button>
                                {expanded === q.id && (
                                    <div className="border-t border-rose-500/10 p-4 space-y-2">
                                        {q.options.map((opt) => {
                                            const isSelected = opt.id === q.selectedOptionId;
                                            const isCorrect = opt.isCorrect;
                                            return (
                                                <div key={opt.id} className={cn(
                                                    'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
                                                    isCorrect ? 'border-primary/40 bg-primary/10 text-primary' :
                                                    isSelected ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' :
                                                    'border-border text-muted-foreground'
                                                )}>
                                                    <span className="shrink-0 font-semibold">
                                                        {isCorrect ? '✓' : isSelected ? '✗' : '○'}
                                                    </span>
                                                    {opt.text}
                                                </div>
                                            );
                                        })}
                                        {q.explanation && (
                                            <div className="flex gap-2 rounded-lg bg-muted/50 p-3 mt-1">
                                                <BookOpen size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                                <p className="text-xs text-muted-foreground">{q.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
        </div>
        </TwoColumnShell>
        </PageContainer>
    );
}
