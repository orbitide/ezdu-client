'use client';

import type { Question } from '../types';
import { OptionButton } from './OptionButton';
import { ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
}: QuestionCardProps) {
    const [revealed, setRevealed] = useState(false);

    const handleOption = (optionId: string) => {
        if (revealed) return;
        onAnswer(optionId);
        setRevealed(true);
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
                <div className="mb-1 flex items-center gap-2">
                    {question.difficulty && (
                        <span className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                            question.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400' :
                            question.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-rose-500/10 text-rose-400'
                        )}>
                            {question.difficulty === 'easy' ? 'সহজ' : question.difficulty === 'medium' ? 'মধ্যম' : 'কঠিন'}
                        </span>
                    )}
                    {question.topic && (
                        <span className="text-xs text-zinc-500">{question.topic}</span>
                    )}
                </div>
                <p className="text-base font-medium leading-relaxed text-zinc-100">
                    {index}. {question.text}
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
                    <p className="text-sm leading-relaxed text-blue-300">{question.explanation}</p>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={onPrev}
                    disabled={index === 1}
                    className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft size={16} />
                    আগে
                </button>

                <span className="text-xs text-zinc-600">{index} / {total}</span>

                <button
                    onClick={handleNext}
                    disabled={!selectedAnswer && !revealed}
                    className={cn(
                        'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                        isLast
                            ? 'bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50'
                            : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 disabled:opacity-40'
                    )}
                >
                    {isLast ? 'শেষ করো' : 'পরের প্রশ্ন'}
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
