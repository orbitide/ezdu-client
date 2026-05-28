'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMyQuizHistory, getQuizReview } from '@/lib/api/quiz';
import type { ReviewQuestionDto } from '@/types/api';

export default function MistakesPage() {
    const router = useRouter();
    const [mistakes, setMistakes] = useState<ReviewQuestionDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);

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
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">ভুলের তালিকা</h1>
                    <p className="text-xs text-zinc-500">সাম্প্রতিক ভুল উত্তরগুলো</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-rose-500" />
                </div>
            ) : mistakes.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <AlertCircle size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">কোনো ভুল উত্তর নেই</p>
                    <p className="text-xs text-zinc-600 mt-1">আরো কুইজ দিলে এখানে ভুলগুলো দেখাবে</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs text-zinc-500">{mistakes.length}টি ভুল উত্তর পাওয়া গেছে</p>
                    {mistakes.map((q, i) => (
                        <div key={q.id} className="rounded-xl border border-rose-500/20 bg-rose-500/5">
                            <button
                                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                                className="flex w-full items-start gap-3 p-4 text-left"
                            >
                                <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-zinc-500 mb-0.5">প্রশ্ন {i + 1}</p>
                                    <p className="text-sm text-zinc-100 line-clamp-2">{q.text}</p>
                                </div>
                                <span className="text-xs text-zinc-500 shrink-0">{expanded === q.id ? '▲' : '▼'}</span>
                            </button>
                            {expanded === q.id && (
                                <div className="border-t border-rose-500/10 p-4 space-y-2">
                                    {q.options.map((opt) => {
                                        const isSelected = opt.id === q.selectedOptionId;
                                        const isCorrect = opt.isCorrect;
                                        return (
                                            <div key={opt.id} className={cn(
                                                'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
                                                isCorrect ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' :
                                                isSelected ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' :
                                                'border-zinc-800 text-zinc-500'
                                            )}>
                                                <span className="shrink-0 font-semibold">
                                                    {isCorrect ? '✓' : isSelected ? '✗' : '○'}
                                                </span>
                                                {opt.text}
                                            </div>
                                        );
                                    })}
                                    {q.explanation && (
                                        <div className="flex gap-2 rounded-lg bg-zinc-800/50 p-3 mt-1">
                                            <BookOpen size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                            <p className="text-xs text-zinc-400">{q.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
