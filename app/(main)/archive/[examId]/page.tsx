'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Loader2, ChevronLeft, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getArchiveExamDetails } from '@/lib/api/archive';
import type { ArchiveExamDto } from '@/types/api';

export default function ArchiveExamPage() {
    const { examId } = useParams<{ examId: string }>();
    const [exam, setExam] = useState<ArchiveExamDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        if (!examId) return;
        let cancelled = false;

        getArchiveExamDetails(examId)
            .then((data) => {
                if (!cancelled) setExam(data);
            })
            .catch(() => {
                if (!cancelled) setError('পরীক্ষা লোড হয়নি। আবার চেষ্টা করো।');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [examId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="animate-spin text-zinc-500" />
            </div>
        );
    }

    if (error || !exam) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-12 text-center space-y-4">
                <p className="text-sm text-zinc-400">{error ?? 'পরীক্ষা পাওয়া যায়নি'}</p>
                <Link href="/archive" className="text-sm text-emerald-400 hover:text-emerald-300">
                    প্রশ্নব্যাংকে ফিরে যাও
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6 pb-24">
            <div className="flex items-center gap-3">
                <Link
                    href={`/archive/subject/${exam.subjectId}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-100"
                >
                    <ChevronLeft size={18} />
                </Link>
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-bold text-zinc-100 truncate">{exam.name}</h1>
                    <p className="text-xs text-zinc-500">মোট প্রশ্ন: {exam.questions.length}</p>
                </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={showAnswers}
                    onChange={(e) => setShowAnswers(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/30"
                />
                <span className="text-sm font-medium text-zinc-300">উত্তর দেখো</span>
            </label>

            <div className="space-y-4">
                {exam.questions.map((q, idx) => (
                    <div
                        key={q.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3"
                    >
                        <div className="flex gap-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-xs font-semibold text-zinc-400">
                                {idx + 1}
                            </span>
                            <p className="text-sm font-medium leading-relaxed text-zinc-100 flex-1">
                                {q.name}
                            </p>
                        </div>
                        {q.passage && (
                            <p className="text-xs text-zinc-500 pl-8">{q.passage}</p>
                        )}
                        <div className="space-y-1.5 pl-8">
                            {q.options.map((opt, optIdx) => (
                                <div
                                    key={opt.id}
                                    className={cn(
                                        'rounded-lg border px-3 py-2 text-sm',
                                        showAnswers && opt.isCorrect
                                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                            : 'border-zinc-800 bg-zinc-950 text-zinc-300',
                                    )}
                                >
                                    <span className="text-zinc-500 mr-2">
                                        {String.fromCharCode(65 + optIdx)}.
                                    </span>
                                    {opt.name}
                                </div>
                            ))}
                        </div>
                        {showAnswers && q.explanation && (
                            <p className="text-xs text-blue-300 pl-8 leading-relaxed">{q.explanation}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur px-4 py-4 lg:left-64">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href={`/archive/${examId}/quiz`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
                    >
                        <Play size={16} />
                        কুইজ শুরু করো
                    </Link>
                </div>
            </div>
        </div>
    );
}
