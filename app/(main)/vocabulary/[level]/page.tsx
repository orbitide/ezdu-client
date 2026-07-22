'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabulary, type VocabDifficulty } from '@/lib/api/vocabulary';
import type { VocabularyDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

const LEVEL_LABELS: Record<string, string> = {
    easy: 'সহজ',
    medium: 'মধ্যম',
    advanced: 'অ্যাডভান্সড',
    competitive: 'প্রতিযোগিতামূলক',
};

export default function VocabularyLevelPage() {
    const { level } = useParams<{ level: string }>();
    const router = useRouter();
    const [words, setWords] = useState<VocabularyDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        getVocabulary(level as VocabDifficulty)
            .then(setWords)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [level]);

    const filtered = search
        ? words.filter((w) => w.word.toLowerCase().includes(search.toLowerCase()) || w.definition.toLowerCase().includes(search.toLowerCase()))
        : words;

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">{LEVEL_LABELS[level] ?? level}</h1>
                            <p className="text-xs text-muted-foreground">{words.length}টি শব্দ</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="শব্দ খোঁজো..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-indigo-500"
                        />
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={28} className="animate-spin text-indigo-400" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filtered.map((word) => (
                                <div key={word.id} className="rounded-xl border border-border bg-card overflow-hidden">
                                    <button
                                        onClick={() => setExpanded(expanded === word.id ? null : word.id)}
                                        className="flex w-full items-center gap-3 p-4 text-left"
                                    >
                                        <div className="flex-1">
                                            <p className="font-semibold text-foreground">{word.word}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{word.definition}</p>
                                        </div>
                                        {expanded === word.id
                                            ? <ChevronUp size={16} className="text-muted-foreground shrink-0" />
                                            : <ChevronDown size={16} className="text-muted-foreground shrink-0" />}
                                    </button>
                                    {expanded === word.id && (
                                        <div className="border-t border-border p-4 space-y-3">
                                            {word.banglaDefinition && (
                                                <p className="text-sm text-muted-foreground">{word.banglaDefinition}</p>
                                            )}
                                            {word.exampleSentence && (
                                                <div className="rounded-lg bg-muted px-3 py-2">
                                                    <p className="text-xs text-muted-foreground mb-0.5">উদাহরণ:</p>
                                                    <p className="text-sm text-muted-foreground italic">{word.exampleSentence}</p>
                                                </div>
                                            )}
                                            {word.synonyms.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-medium text-muted-foreground mb-1">সমার্থক শব্দ:</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {word.synonyms.map((s) => (
                                                            <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {word.antonyms.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-medium text-muted-foreground mb-1">বিপরীত শব্দ:</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {word.antonyms.map((a) => (
                                                            <span key={a} className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs text-rose-400">{a}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
