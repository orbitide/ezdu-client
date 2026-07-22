'use client';

import { useEffect, useMemo, useState } from 'react';
import { Archive, Loader2, Search } from 'lucide-react';
import { ArchiveSubjectCard } from '@/components/archive/ArchiveSubjectCard';
import { getSubjects } from '@/lib/api/classes';
import { getMe } from '@/lib/api/users';
import type { SubjectDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function ArchivePage() {
    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let cancelled = false;

        getMe()
            .then((me) => {
                const classId = me.userConfig?.classId;
                const groupId = me.userConfig?.groupId;
                return getSubjects(
                    classId != null ? String(classId) : undefined,
                    groupId != null ? String(groupId) : undefined,
                );
            })
            .then((data) => {
                if (!cancelled) setSubjects(data);
            })
            .catch(() => {
                if (!cancelled) setError('সাবজেক্ট লোড হয়নি। আবার চেষ্টা করো।');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, []);

    const filteredSubjects = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return subjects;
        return subjects.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                (s.subTitle?.toLowerCase().includes(q) ?? false),
        );
    }, [subjects, searchQuery]);

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                            <Archive size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">প্রশ্নব্যাংক</h1>
                            <p className="text-xs text-muted-foreground">পূর্ববর্তী বোর্ড পরীক্ষার প্রশ্নপত্র</p>
                        </div>
                    </div>

                    {!loading && !error && subjects.length > 0 && (
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="সাবজেক্ট খোঁজো..."
                                className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring/40 focus:outline-none"
                            />
                        </div>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-muted-foreground" />
                        </div>
                    ) : error ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <p className="text-sm text-muted-foreground">{error}</p>
                        </div>
                    ) : filteredSubjects.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card p-10 text-center">
                            <Archive size={36} className="mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground">কোনো সাবজেক্ট নেই</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-muted-foreground">সাবজেক্ট দেখো</p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                {filteredSubjects.map((subject, i) => (
                                    <ArchiveSubjectCard
                                        key={subject.id}
                                        subject={subject}
                                        index={i}
                                        href={`/archive/subject/${subject.id}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
