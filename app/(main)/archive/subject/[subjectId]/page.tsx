'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Archive, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { getArchiveExams } from '@/lib/api/archive';
import type { ArchiveExamListItem } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function ArchiveSubjectPage() {
    const { subjectId } = useParams<{ subjectId: string }>();
    const [exams, setExams] = useState<ArchiveExamListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!subjectId) return;
        let cancelled = false;

        getArchiveExams({ subjectId, pageSize: 50 })
            .then((res) => {
                if (!cancelled) setExams(res.items ?? []);
            })
            .catch(() => {
                if (!cancelled) setError('পরীক্ষা লোড হয়নি। আবার চেষ্টা করো।');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [subjectId]);

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/archive"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft size={18} />
                        </Link>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-bold text-foreground truncate">প্রশ্নব্যাংক</h1>
                            <p className="text-xs text-muted-foreground">
                                {loading ? '...' : `${exams.length} টি পরীক্ষা আছে`}
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-muted-foreground" />
                        </div>
                    ) : error ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <p className="text-sm text-muted-foreground">{error}</p>
                        </div>
                    ) : exams.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <Archive size={36} className="mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">কোনো পরীক্ষা নেই</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {exams.map((exam) => (
                                <Link
                                    key={exam.id}
                                    href={`/archive/${exam.id}`}
                                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border hover:bg-muted"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-lg">
                                        📝
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground truncate">{exam.name}</p>
                                        {exam.year > 0 && (
                                            <p className="text-xs text-muted-foreground mt-0.5">{exam.year}</p>
                                        )}
                                    </div>
                                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
