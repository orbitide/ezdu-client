'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabulary, type VocabDifficulty } from '@/lib/api/vocabulary';
import type { VocabularyDto } from '@/types/api';

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
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-4 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">{LEVEL_LABELS[level] ?? level}</h1>
                    <p className="text-xs text-zinc-500">{words.length}টি শব্দ</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                    type="text"
                    placeholder="শব্দ খোঁজো..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-indigo-500"
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="animate-spin text-indigo-400" />
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map((word) => (
                        <div key={word.id} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                            <button
                                onClick={() => setExpanded(expanded === word.id ? null : word.id)}
                                className="flex w-full items-center gap-3 p-4 text-left"
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-zinc-100">{word.word}</p>
                                    <p className="text-sm text-zinc-400 line-clamp-1">{word.definition}</p>
                                </div>
                                {expanded === word.id
                                    ? <ChevronUp size={16} className="text-zinc-600 shrink-0" />
                                    : <ChevronDown size={16} className="text-zinc-600 shrink-0" />}
                            </button>
                            {expanded === word.id && (
                                <div className="border-t border-zinc-800 p-4 space-y-3">
                                    {word.banglaDefinition && (
                                        <p className="text-sm text-zinc-300">{word.banglaDefinition}</p>
                                    )}
                                    {word.exampleSentence && (
                                        <div className="rounded-lg bg-zinc-800 px-3 py-2">
                                            <p className="text-xs text-zinc-500 mb-0.5">উদাহরণ:</p>
                                            <p className="text-sm text-zinc-300 italic">{word.exampleSentence}</p>
                                        </div>
                                    )}
                                    {word.synonyms.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium text-zinc-500 mb-1">সমার্থক শব্দ:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {word.synonyms.map((s) => (
                                                    <span key={s} className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {word.antonyms.length > 0 && (
                                        <div>
                                            <p className="text-xs font-medium text-zinc-500 mb-1">বিপরীত শব্দ:</p>
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
    );
}
