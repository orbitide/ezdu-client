'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, Loader2, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSubjects } from '@/lib/api/classes';
import type { SubjectDto } from '@/types/api';

export default function MockTestsPage() {
    const router = useRouter();
    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSubjects()
            .then(setSubjects)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-6 lg:px-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
                    <FlaskConical size={20} className="text-teal-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">মক টেস্ট</h1>
                    <p className="text-xs text-zinc-500">বিষয় বেছে নিজের মতো কুইজ তৈরি করো</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-teal-400" />
                </div>
            ) : subjects.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <BookOpen size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">কোনো বিষয় পাওয়া যায়নি</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">বিষয় বেছে নাও</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {subjects.map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => router.push(`/mock-tests/build/${sub.id}`)}
                                className={cn(
                                    'flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3',
                                    'text-left text-sm font-medium text-zinc-300',
                                    'hover:border-teal-500/50 hover:bg-teal-500/5 hover:text-teal-300 transition-colors'
                                )}
                            >
                                <BookOpen size={15} className="shrink-0 text-zinc-500" />
                                <span className="flex-1 truncate">{sub.name}</span>
                                <ChevronRight size={14} className="shrink-0 text-zinc-600" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
