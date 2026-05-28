'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMySubjectMastery } from '@/lib/api/users';
import type { SubjectMasteryDto } from '@/types/api';

export default function SubjectMasteryPage() {
    const router = useRouter();
    const [items, setItems] = useState<SubjectMasteryDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMySubjectMastery()
            .then((res) => setItems(res.items))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">বিষয় দক্ষতা</h1>
                    <p className="text-xs text-zinc-500">কোন বিষয়ে কতটা পারো</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 size={28} className="animate-spin text-emerald-500" />
                </div>
            ) : items.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <Target size={36} className="mx-auto text-zinc-700 mb-3" />
                    <p className="text-sm text-zinc-400">এখনো কোনো বিষয়ে অগ্রগতি নেই</p>
                    <p className="text-xs text-zinc-600 mt-1">কুইজ দিলে এখানে দক্ষতা দেখাবে</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => {
                        const pct = item.masteryPercent;
                        const color = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-rose-500';
                        const textColor = pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-yellow-400' : 'text-rose-400';
                        return (
                            <div key={item.subjectId} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium text-zinc-100">{item.subjectName}</p>
                                    <div className="text-right">
                                        <p className={cn('text-sm font-bold', textColor)}>{pct}%</p>
                                        <p className="text-xs text-zinc-500">{item.masteredLessons}/{item.totalLessons} লেসন</p>
                                    </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                    <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
