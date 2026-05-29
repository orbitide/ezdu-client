'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const TIME_PRESETS = [15, 20, 30, 40];
const Q_PRESETS    = [15, 20, 30, 40];

interface Props {
    availableCount: number;
    onConfirm: (timeMinutes: number, maxQuestions: number) => void;
    onCancel: () => void;
}

export function MockTestSettingsDialog({ availableCount, onConfirm, onCancel }: Props) {
    const defaultQ = Math.min(20, availableCount);

    const [timeMin, setTimeMin]       = useState(20);
    const [qPreset, setQPreset]       = useState<number | 'custom'>(Q_PRESETS.includes(defaultQ) ? defaultQ : 'custom');
    const [customQ, setCustomQ]       = useState(String(defaultQ));

    const tooFew = availableCount < 15;

    const resolvedQ = (): number => {
        if (qPreset === 'custom') {
            const v = parseInt(customQ, 10);
            return isNaN(v) ? 15 : Math.max(15, Math.min(100, v));
        }
        return Math.min(qPreset, availableCount);
    };

    const handleConfirm = () => {
        // if (tooFew) return;
        onConfirm(timeMin, resolvedQ());
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-sm p-4 sm:items-center"
            onClick={onCancel}
        >
            <motion.div
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 48, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <div>
                        <h2 className="text-base font-bold text-zinc-100">কুইজ সেটিং</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">তোমার পছন্দমতো সেট করো</p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>

                <div className="px-5 pb-5 space-y-5">
                    {/* Available count */}
                    <p className="text-xs text-zinc-500">
                        <span className="font-semibold text-teal-400">{availableCount}</span> টি প্রশ্ন পাওয়া গেছে
                    </p>

                    {/* Warning */}
                    {tooFew && (
                        <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                            <AlertTriangle size={14} className="shrink-0 mt-0.5 text-red-400" />
                            <p className="text-xs text-red-300">কমপক্ষে ১৫টি প্রশ্ন দরকার। আরও টপিক যোগ করো।</p>
                        </div>
                    )}

                    {/* Time */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-zinc-400">সময় নির্ধারণ</p>
                        <div className="flex gap-2 flex-wrap">
                            {TIME_PRESETS.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTimeMin(t)}
                                    className={cn(
                                        'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                        timeMin === t
                                            ? 'bg-teal-500 text-black'
                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                    )}
                                >
                                    {t} মিনিট
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Max questions */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-zinc-400">সর্বোচ্চ প্রশ্ন</p>
                        <div className="flex gap-2 flex-wrap">
                            {Q_PRESETS.map((q) => {
                                const disabled = q > availableCount;
                                return (
                                    <button
                                        key={q}
                                        onClick={() => !disabled && setQPreset(q)}
                                        disabled={disabled}
                                        className={cn(
                                            'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                            qPreset === q
                                                ? 'bg-teal-500 text-black'
                                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
                                            disabled && 'opacity-30 cursor-not-allowed'
                                        )}
                                    >
                                        {q} টি
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setQPreset('custom')}
                                className={cn(
                                    'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                                    qPreset === 'custom'
                                        ? 'bg-teal-500 text-black'
                                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                )}
                            >
                                কাস্টম
                            </button>
                        </div>

                        <AnimatePresence>
                            {qPreset === 'custom' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 pt-1">
                                        <input
                                            type="number"
                                            min={15}
                                            max={100}
                                            value={customQ}
                                            onChange={(e) => setCustomQ(e.target.value)}
                                            placeholder="১৫ – ১০০"
                                            className="w-28 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-teal-500 focus:outline-none"
                                        />
                                        <span className="text-xs text-zinc-500">টি (১৫–১০০)</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={onCancel}
                            className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                        >
                            বাতিল
                        </button>
                        <button
                            onClick={handleConfirm}
                            // disabled={tooFew}
                            className="flex-1 rounded-xl bg-teal-500 py-2.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            শুরু করো
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
