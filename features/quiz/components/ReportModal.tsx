'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { reportQuestion } from '@/lib/api/quiz';

const REASONS = [
    { flag: 1,  label: 'Wrong Answer',      sub: 'সঠিক উত্তরটি ভুল দেওয়া আছে' },
    { flag: 2,  label: 'Wrong Question',    sub: 'প্রশ্নের তথ্যে ভুল আছে' },
    { flag: 4,  label: 'Rendering Issue',   sub: 'প্রশ্ন সঠিকভাবে দেখা যাচ্ছে না' },
    { flag: 8,  label: 'Image Not Loading', sub: 'ছবি বা মিডিয়া লোড হচ্ছে না' },
    { flag: 16, label: 'Out of Syllabus',   sub: 'এই প্রশ্নটি সিলেবাসের বাইরে' },
    { flag: 32, label: 'Duplicate',         sub: 'একই প্রশ্ন আগেও দেখা গেছে' },
];

interface ReportModalProps {
    open: boolean;
    onClose: () => void;
    questionId: string;
}

export function ReportModal({ open, onClose, questionId }: ReportModalProps) {
    const [flags, setFlags] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const toggle = (flag: number) => setFlags((prev) => prev ^ flag);

    const reset = () => {
        setFlags(0);
        setComment('');
        setDone(false);
    };

    const handleClose = () => {
        if (submitting) return;
        reset();
        onClose();
    };

    const handleSubmit = async () => {
        if (flags === 0 || submitting) return;
        setSubmitting(true);
        try {
            await reportQuestion(questionId, flags, comment || undefined);
            setDone(true);
            setTimeout(() => {
                reset();
                onClose();
            }, 1500);
        } catch {
            // allow retry — modal stays open
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 p-6 space-y-4"
                    >
                        {done ? (
                            <div className="flex flex-col items-center gap-3 py-4 text-center">
                                <span className="text-2xl">✅</span>
                                <p className="text-sm font-medium text-zinc-200">
                                    রিপোর্ট পাঠানো হয়েছে। ধন্যবাদ!
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Flag size={15} className="text-rose-400" />
                                        <h3 className="text-sm font-bold text-zinc-100">প্রশ্ন রিপোর্ট করো</h3>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {REASONS.map((r) => {
                                        const checked = (flags & r.flag) !== 0;
                                        return (
                                            <button
                                                key={r.flag}
                                                onClick={() => toggle(r.flag)}
                                                className={cn(
                                                    'flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors',
                                                    checked
                                                        ? 'border-rose-500/50 bg-rose-500/10'
                                                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                                                )}
                                            >
                                                <span className={cn(
                                                    'flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors',
                                                    checked
                                                        ? 'border-rose-400 bg-rose-400'
                                                        : 'border-zinc-600 bg-transparent'
                                                )}>
                                                    {checked && (
                                                        <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                                                            <path d="M1 4l3 3 5-6" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <span className="min-w-0">
                                                    <span className={cn(
                                                        'block text-sm font-medium',
                                                        checked ? 'text-rose-300' : 'text-zinc-200'
                                                    )}>
                                                        {r.label}
                                                    </span>
                                                    <span className="block text-xs text-zinc-500 mt-0.5">{r.sub}</span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="আর কিছু জানাতে চাইলে লিখো (ঐচ্ছিক)"
                                    rows={2}
                                    className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleClose}
                                        className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                                    >
                                        বাতিল
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={flags === 0 || submitting}
                                        className="flex-1 rounded-xl bg-rose-500 py-2.5 text-sm font-semibold text-white hover:bg-rose-400 disabled:opacity-40 transition-colors"
                                    >
                                        {submitting ? 'পাঠানো হচ্ছে...' : 'রিপোর্ট করো'}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
