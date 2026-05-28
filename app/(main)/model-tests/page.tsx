'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClipboardList, Loader2, Clock, BookOpen, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getQuizzes } from '@/lib/api/quiz';
import type { QuizListDto } from '@/types/api';

export default function ModelTestsPage() {
    const [tests, setTests] = useState<QuizListDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuizzes({ pageSize: 30 })
            .then((res) => setTests(res.items))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <ClipboardList size={20} className="text-purple-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">মডেল টেস্ট</h1>
                    <p className="text-xs text-zinc-500">পূর্ণ পরীক্ষার মতো প্র্যাকটিস করো</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-purple-400" />
                </div>
            ) : tests.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <ClipboardList size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">কোনো মডেল টেস্ট নেই</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {tests.map((test) => (
                        <Link
                            key={test.id}
                            href={`/quiz/${test.id}`}
                            className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                                <ClipboardList size={18} className="text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-zinc-100 truncate">{test.title}</p>
                                {test.subjectName && <p className="text-xs text-zinc-500">{test.subjectName}</p>}
                                <div className="mt-1.5 flex items-center gap-3 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1"><BookOpen size={11} />{test.questionCount} প্রশ্ন</span>
                                    {test.duration && <span className="flex items-center gap-1"><Clock size={11} />{test.duration} মিনিট</span>}
                                    {test.scheduledAt && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={11} />
                                            {new Date(test.scheduledAt).toLocaleDateString('bn-BD')}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-zinc-600 shrink-0 mt-1" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
