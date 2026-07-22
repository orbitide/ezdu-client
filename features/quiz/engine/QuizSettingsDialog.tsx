'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ChevronDown, X } from 'lucide-react';
import { cn, toBangla } from '@/lib/utils';
import type { QuizPlaySettings } from './types';

/** Mirrors mobile's `_mockMinQuestions` / `_questionPresets`. */
const MOCK_MIN_QUESTIONS = 15;
const TIME_PRESETS = [15, 20, 30, 40];
const Q_PRESETS = [15, 20, 30, 40];

interface Props {
    /** How many questions are actually available for this quiz. */
    questionCount: number;
    /** Mock mode exposes the max-question picker and the minimum-count guard. */
    isMock?: boolean;
    onConfirm: (settings: QuizPlaySettings) => void;
    onCancel: () => void;
}

/**
 * Ported from ezdu-mobile `features/quiz_engine/widgets/quiz_setting_dialog.dart`.
 *
 * Note: mobile hardcodes `enableNegativeMarking: false` / `negativeMarkValue: 0`
 * here — negative marking is configured by the caller (only the preset flow uses
 * it, at 0.25), never by this dialog. We match that.
 */
export function QuizSettingsDialog({ questionCount, isMock = false, onConfirm, onCancel }: Props) {
    const [minutes, setMinutes] = useState(20);
    const [maxQuestions, setMaxQuestions] = useState(20);
    const [expanded, setExpanded] = useState(false);
    const [customSelected, setCustomSelected] = useState(false);
    const [customValue, setCustomValue] = useState('');

    const tooFewQuestions = isMock && questionCount < MOCK_MIN_QUESTIONS;

    const handleConfirm = () => {
        if (tooFewQuestions) return;
        onConfirm({
            timeInMinutes: minutes,
            enableNegativeMarking: false,
            negativeMarkValue: 0,
            maxQuestions: isMock ? maxQuestions : undefined,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-4 backdrop-blur-sm sm:items-center"
            onClick={onCancel}
        >
            <motion.div
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 48, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card"
            >
                <div className="flex items-center justify-between px-5 pb-3 pt-5">
                    <div>
                        <h2 className="text-base font-bold text-foreground">কুইজ সেটিং</h2>
                        <p className="mt-0.5 text-xs text-muted-foreground">তোমার পছন্দমতো সেট করো</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted"
                    >
                        <X size={14} />
                    </button>
                </div>

                <div className="space-y-5 px-5 pb-5">
                    <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-teal-400">{toBangla(questionCount)}</span> টি প্রশ্ন পাওয়া গেছে
                    </p>

                    {tooFewQuestions && (
                        <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-400" />
                            <p className="text-xs text-red-300">
                                কমপক্ষে {toBangla(MOCK_MIN_QUESTIONS)}টি প্রশ্ন দরকার। আরও টপিক যোগ করো।
                            </p>
                        </div>
                    )}

                    {/* Time */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">সময় নির্ধারণ (মিনিট)</p>
                        <div className="flex flex-wrap gap-2">
                            {TIME_PRESETS.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setMinutes(t)}
                                    className={cn(
                                        'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                        minutes === t ? 'bg-teal-500 text-black' : 'bg-muted text-muted-foreground hover:bg-muted',
                                    )}
                                >
                                    {toBangla(t)} মিনিট
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Max questions — mock only, collapsible (mobile `_maxQExpanded`) */}
                    {isMock && (
                        <div className="space-y-2">
                            <button
                                onClick={() => setExpanded((v) => !v)}
                                className="flex w-full items-center gap-1 text-left"
                            >
                                <span className="flex-1 text-xs font-semibold text-muted-foreground">সর্বোচ্চ প্রশ্ন</span>
                                <span className="text-[13px] font-semibold text-teal-400">{toBangla(maxQuestions)}টি</span>
                                <ChevronDown
                                    size={18}
                                    className={cn('text-muted-foreground transition-transform', expanded && 'rotate-180')}
                                />
                            </button>

                            <AnimatePresence>
                                {expanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-2 pt-1">
                                            <div className="flex flex-wrap gap-2">
                                                {Q_PRESETS.map((q) => {
                                                    const disabled = q > questionCount;
                                                    return (
                                                        <button
                                                            key={q}
                                                            disabled={disabled}
                                                            onClick={() => {
                                                                setMaxQuestions(q);
                                                                setCustomSelected(false);
                                                            }}
                                                            className={cn(
                                                                'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                                                maxQuestions === q && !customSelected
                                                                    ? 'bg-teal-500 text-black'
                                                                    : 'bg-muted text-muted-foreground hover:bg-muted',
                                                                disabled && 'cursor-not-allowed opacity-30',
                                                            )}
                                                        >
                                                            {toBangla(q)}টি
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <button
                                                onClick={() => setCustomSelected(true)}
                                                className={cn(
                                                    'w-full rounded-lg py-1.5 text-sm font-medium transition-colors',
                                                    customSelected ? 'bg-teal-500 text-black' : 'bg-muted text-muted-foreground hover:bg-muted',
                                                )}
                                            >
                                                কাস্টম
                                            </button>

                                            {customSelected && (
                                                <div className="flex items-center gap-2 pt-1">
                                                    <input
                                                        type="number"
                                                        min={15}
                                                        max={100}
                                                        value={customValue}
                                                        onChange={(e) => {
                                                            setCustomValue(e.target.value);
                                                            const n = parseInt(e.target.value, 10);
                                                            // Mobile clamps to 15–100 on every keystroke.
                                                            if (!isNaN(n)) setMaxQuestions(Math.max(15, Math.min(100, n)));
                                                        }}
                                                        placeholder="১৫ – ১০০"
                                                        className="w-28 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none"
                                                    />
                                                    <span className="text-xs text-muted-foreground">টি (১৫–১০০)</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={onCancel}
                            className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                        >
                            বাতিল
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={tooFewQuestions}
                            className="flex-1 rounded-xl bg-teal-500 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            শুরু করো
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
