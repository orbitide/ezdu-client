'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Archive, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface ArchiveExam {
    id: string;
    title: string;
    year?: number;
    subject?: string;
    questionCount?: number;
}

export default function ArchivePage() {
    const [exams, setExams] = useState<ArchiveExam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/archive-exams')
            .then((res) => setExams(res.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
                    <Archive size={20} className="text-zinc-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">আর্কাইভ</h1>
                    <p className="text-xs text-zinc-500">পূর্ববর্তী বোর্ড পরীক্ষার প্রশ্নপত্র</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-zinc-500" />
                </div>
            ) : exams.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <Archive size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">কোনো আর্কাইভ পরীক্ষা নেই</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {exams.map((exam) => (
                        <Link
                            key={exam.id}
                            href={`/quiz/${exam.id}`}
                            className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
                                <BookOpen size={18} className="text-zinc-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-zinc-100 truncate">{exam.title}</p>
                                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                                    {exam.year && <span>{exam.year}</span>}
                                    {exam.subject && <span>· {exam.subject}</span>}
                                    {exam.questionCount && <span>· {exam.questionCount} প্রশ্ন</span>}
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-zinc-600 shrink-0" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
