'use client';

import { useEffect, useState } from 'react';
import type { Question } from '../types';
import { OptionButton } from './OptionButton';
import { ReportModal } from './ReportModal';
import { useBookmarkStore } from '../bookmark.store';
import { ChevronRight, ChevronLeft, Lightbulb, Bookmark, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/ui/math-text';

interface QuestionCardProps {
    question: Question;
    index: number;
    total: number;
    selectedAnswer?: string;
    onAnswer: (optionId: string) => void;
    onNext: () => void;
    onPrev: () => void;
    isLast: boolean;
    onFinish: () => void;
    examMode?: boolean;  // true = no immediate reveal; blue-only highlight, always-navigable
}

export function QuestionCard({
    question,
    index,
    total,
    selectedAnswer,
    onAnswer,
    onNext,
    onPrev,
    isLast,
    onFinish,
    examMode = false,
}: QuestionCardProps) {
    const [revealed, setRevealed] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    const bookmarked = useBookmarkStore((s) => s.bookmarkedIds.includes(question.id));
    const toggleBm = useBookmarkStore((s) => s.toggle);
    const loadBookmarks = useBookmarkStore((s) => s.loadBookmarks);

    useEffect(() => {
        loadBookmarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOption = (optionId: string) => {
        if (revealed) return;
        onAnswer(optionId);
        if (!examMode) setRevealed(true);  // challenge: reveal immediately; exam: no reveal
    };

    const handleNext = () => {
        setRevealed(false);
        if (isLast) onFinish();
        else onNext();
    };

    return (
        <div className="flex flex-col gap-5 px-4 py-6 max-w-2xl mx-auto w-full">
            {/* Question */}
            <div>
                <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        {question.difficulty && (
                            <span className={cn(
                                'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                                question.difficulty === 'easy' ? 'bg-primary/10 text-primary' :
                                question.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                'bg-rose-500/10 text-rose-400'
                            )}>
                                {question.difficulty === 'easy' ? 'সহজ' : question.difficulty === 'medium' ? 'মধ্যম' : 'কঠিন'}
                            </span>
                        )}
                        {question.topic && (
                            <span className="truncate text-xs text-muted-foreground">{question.topic}</span>
                        )}
                    </div>

                    {/* Bookmark & Flag */}
                    <div className="flex shrink-0 items-center gap-0.5">
                        <button
                            onClick={() => toggleBm(question.id)}
                            className={cn(
                                'rounded-lg p-1.5 transition-colors',
                                bookmarked
                                    ? 'text-amber-400 hover:text-amber-300'
                                    : 'text-muted-foreground hover:text-muted-foreground'
                            )}
                            title={bookmarked ? 'বুকমার্ক সরাও' : 'বুকমার্ক করো'}
                        >
                            <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            onClick={() => setReportOpen(true)}
                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-muted-foreground"
                            title="রিপোর্ট করো"
                        >
                            <Flag size={15} />
                        </button>
                    </div>
                </div>

                {question.passage && (
                    <div className="mb-2 rounded-lg border border-border bg-card/50 p-3 text-sm leading-relaxed text-muted-foreground">
                        <MathText text={question.passage} block />
                    </div>
                )}

                <p className="text-base font-medium leading-relaxed text-foreground">
                    {index}. <MathText text={question.text} />
                </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
                {question.options.map((opt, i) => (
                    <OptionButton
                        key={opt.id}
                        id={opt.id}
                        text={opt.text}
                        index={i}
                        selected={selectedAnswer === opt.id}
                        isCorrect={opt.isCorrect}
                        revealed={revealed}
                        onClick={() => handleOption(opt.id)}
                    />
                ))}
            </div>

            {/* Explanation */}
            {revealed && question.explanation && (
                <div className="flex gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <Lightbulb size={16} className="mt-0.5 shrink-0 text-blue-400" />
                    <p className="text-sm leading-relaxed text-blue-300"><MathText text={question.explanation} /></p>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={onPrev}
                    disabled={index === 1}
                    className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft size={16} />
                    আগে
                </button>

                <span className="text-xs text-muted-foreground">{index} / {total}</span>

                <button
                    onClick={handleNext}
                    disabled={!examMode && !selectedAnswer && !revealed}
                    className={cn(
                        'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                        isLast
                            ? 'bg-primary text-black hover:bg-primary disabled:opacity-50'
                            : 'bg-muted text-foreground hover:bg-muted disabled:opacity-40'
                    )}
                >
                    {isLast ? 'শেষ করো' : 'পরের প্রশ্ন'}
                    <ChevronRight size={16} />
                </button>
            </div>

            <ReportModal
                open={reportOpen}
                onClose={() => setReportOpen(false)}
                questionId={question.id}
            />
        </div>
    );
}
