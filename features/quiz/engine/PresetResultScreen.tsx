'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Home, MinusCircle, XCircle } from 'lucide-react';
import { cn, toBangla } from '@/lib/utils';
import { MathText } from '@/components/ui/math-text';
import { isUnanswered, isWrong, type PerQuestionOutcome } from './types';

interface Props {
    title: string;
    score: number;
    correct: number;
    wrong: number;
    unanswered: number;
    total: number;
    outcomes: PerQuestionOutcome[];
    onHome: () => void;
}

/**
 * Ported from ezdu-mobile `features/preset/pages/preset_result_page.dart`, with
 * `preset_mistakes_page.dart` folded in as an inline view rather than a route.
 */
export function PresetResultScreen({ title, score, correct, wrong, unanswered, total, outcomes, onHome }: Props) {
    const [showMistakes, setShowMistakes] = useState(false);
    const hasMistakes = wrong + unanswered > 0;
    const mistakes = outcomes.filter((o) => !o.isCorrect);

    if (showMistakes) {
        return <MistakesView mistakes={mistakes} onBack={() => setShowMistakes(false)} />;
    }

    return (
        <div className="flex min-h-dvh flex-col bg-background">
            <header className="border-b border-border px-4 py-3">
                <h1 className="truncate text-center text-sm font-semibold text-foreground">{title} — ফলাফল</h1>
            </header>

            <div className="mx-auto w-full max-w-2xl flex-1 space-y-5 px-4 py-5">
                {/* Score card */}
                <div className="rounded-xl border border-border bg-card p-5 text-center">
                    <p className="text-[13px] text-muted-foreground">স্কোর</p>
                    <p className="mt-1.5 text-4xl font-black leading-none text-primary">
                        {toBangla(score.toFixed(2))}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">মোট {toBangla(total)} মার্কস</p>

                    <div className="mt-5 flex items-stretch justify-evenly">
                        <StatItem icon={<CheckCircle2 size={18} />} value={correct} label="সঠিক" className="text-primary" />
                        <div className="w-px bg-muted" />
                        <StatItem icon={<XCircle size={18} />} value={wrong} label="ভুল" className="text-red-400" />
                        <div className="w-px bg-muted" />
                        <StatItem icon={<MinusCircle size={18} />} value={unanswered} label="অনুত্তরিত" className="text-muted-foreground" />
                    </div>
                </div>

                {/* Per-question compact list */}
                <div>
                    <p className="mb-2 text-[13px] font-bold text-foreground">প্রশ্নের বিবরণ</p>
                    <div className="space-y-1.5">
                        {outcomes.map((o, i) => (
                            <div
                                key={o.question.id}
                                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5"
                            >
                                <span className="text-xs font-bold text-muted-foreground">{toBangla(i + 1)}.</span>
                                <span className="min-w-0 flex-1 truncate text-[13px] text-foreground">
                                    {o.question.text}
                                </span>
                                {o.isCorrect ? (
                                    <CheckCircle2 size={18} className="shrink-0 text-primary" />
                                ) : isWrong(o) ? (
                                    <XCircle size={18} className="shrink-0 text-red-400" />
                                ) : (
                                    <MinusCircle size={18} className="shrink-0 text-muted-foreground" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky bottom buttons */}
            <div className="sticky bottom-0 flex gap-3 border-t border-border bg-card px-4 pb-6 pt-3">
                {hasMistakes && (
                    <button
                        onClick={() => setShowMistakes(true)}
                        className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                        ভুলগুলো দেখুন
                    </button>
                )}
                <button
                    onClick={onHome}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-black transition-colors hover:bg-primary"
                >
                    <Home size={16} />
                    হোমে ফিরে যাও
                </button>
            </div>
        </div>
    );
}

function StatItem({ icon, value, label, className }: { icon: React.ReactNode; value: number; label: string; className: string }) {
    return (
        <div className="flex flex-1 flex-col items-center gap-1">
            <span className={className}>{icon}</span>
            <p className={cn('text-lg font-extrabold', className)}>{toBangla(value)}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
        </div>
    );
}

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

/** Ported from `features/preset/pages/preset_mistakes_page.dart`. */
function MistakesView({ mistakes, onBack }: { mistakes: PerQuestionOutcome[]; onBack: () => void }) {
    return (
        <div className="flex min-h-dvh flex-col bg-background">
            <header className="flex items-center gap-3 border-b border-border px-4 py-3">
                <button onClick={onBack} className="text-muted-foreground transition-colors hover:text-foreground">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-sm font-semibold text-foreground">ভুল প্রশ্নসমূহ</h1>
            </header>

            {mistakes.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                    <CheckCircle2 size={64} className="text-primary" />
                    <p className="text-lg font-bold text-foreground">কোনো ভুল নেই!</p>
                </div>
            ) : (
                <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-5">
                    {mistakes.map((o, i) => (
                        <div
                            key={o.question.id}
                            className={cn(
                                'overflow-hidden rounded-xl border bg-card',
                                isUnanswered(o) ? 'border-border' : 'border-red-500/40',
                            )}
                        >
                            <div className={cn('px-3.5 py-2', isUnanswered(o) ? 'bg-card' : 'bg-red-500/[0.07]')}>
                                <p className="text-xs font-bold text-muted-foreground">
                                    প্রশ্ন {toBangla(i + 1)}
                                    {isUnanswered(o) && <span className="ml-2 font-medium text-muted-foreground">অনুত্তরিত</span>}
                                </p>
                            </div>

                            <div className="space-y-3 p-3.5">
                                <p className="text-sm font-medium leading-relaxed text-foreground">
                                    <MathText text={o.question.text} />
                                </p>

                                <div className="space-y-1.5">
                                    {o.question.options.map((opt, oi) => {
                                        const isSelected = opt.id === o.selectedOptionId;
                                        const isTheCorrect = opt.id === o.correctOptionId;
                                        return (
                                            <div
                                                key={opt.id}
                                                className={cn(
                                                    'flex items-start gap-2.5 rounded-lg border px-3 py-2 text-sm',
                                                    isTheCorrect
                                                        ? 'border-primary/50 bg-primary/10 text-primary'
                                                        : isSelected
                                                            ? 'border-red-500/50 bg-red-500/10 text-red-300'
                                                            : 'border-border bg-card text-muted-foreground',
                                                )}
                                            >
                                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-bold">
                                                    {OPTION_LABELS[oi]}
                                                </span>
                                                <span className="flex-1 leading-relaxed">
                                                    <MathText text={opt.text} />
                                                </span>
                                                {isTheCorrect && <CheckCircle2 size={15} className="mt-0.5 shrink-0" />}
                                                {isSelected && !isTheCorrect && <XCircle size={15} className="mt-0.5 shrink-0" />}
                                            </div>
                                        );
                                    })}
                                </div>

                                {o.question.explanation && (
                                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                                        <p className="text-[13px] leading-relaxed text-blue-300">
                                            <MathText text={o.question.explanation} />
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
