'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMySubjectMastery } from '@/lib/api/users';
import type { SubjectMasteryDto } from '@/types/api';
import { subjectMasteryPercent } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

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
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">বিষয় দক্ষতা</h1>
                            <p className="text-xs text-muted-foreground">কোন বিষয়ে কতটা পারো</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-primary" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <Target size={36} className="mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">এখনো কোনো বিষয়ে অগ্রগতি নেই</p>
                            <p className="text-xs text-muted-foreground mt-1">কুইজ দিলে এখানে দক্ষতা দেখাবে</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => {
                                const pct = subjectMasteryPercent(item);
                                const color = pct >= 80 ? 'bg-primary' : pct >= 50 ? 'bg-yellow-500' : 'bg-rose-500';
                                const textColor = pct >= 80 ? 'text-primary' : pct >= 50 ? 'text-yellow-400' : 'text-rose-400';
                                return (
                                    <div key={item.subjectId} className="rounded-xl border border-border bg-card p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-medium text-foreground">{item.subjectName}</p>
                                            <div className="text-right">
                                                <p className={cn('text-sm font-bold', textColor)}>{pct}%</p>
                                                <p className="text-xs text-muted-foreground">{item.masteredCount}/{item.totalQuestions} প্রশ্ন</p>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                            <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
