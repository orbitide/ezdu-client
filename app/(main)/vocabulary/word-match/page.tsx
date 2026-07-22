'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabulary } from '@/lib/api/vocabulary';
import type { VocabularyDto } from '@/types/api';

export default function WordMatchPage() {
    const router = useRouter();
    const [words, setWords] = useState<VocabularyDto[]>([]);
    const [shuffledDefs, setShuffledDefs] = useState<VocabularyDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [selectedDef, setSelectedDef] = useState<string | null>(null);
    const [matched, setMatched] = useState<Set<string>>(new Set());
    const [wrong, setWrong] = useState<Set<string>>(new Set());

    useEffect(() => {
        getVocabulary(undefined, 1, 20)
            .then((w) => {
                const picked = w.sort(() => Math.random() - 0.5).slice(0, 8);
                setWords(picked);
                setShuffledDefs([...picked].sort(() => Math.random() - 0.5));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const finished = matched.size === words.length && words.length > 0;
    const pct = words.length > 0 ? Math.round((matched.size / words.length) * 100) : 0;

    const handleWordClick = (id: string) => {
        if (matched.has(id)) return;
        setSelectedWord(id);
        checkMatch(id, selectedDef);
    };

    const handleDefClick = (id: string) => {
        if (matched.has(id)) return;
        setSelectedDef(id);
        checkMatch(selectedWord, id);
    };

    const checkMatch = (wordId: string | null, defId: string | null) => {
        if (!wordId || !defId) return;
        if (wordId === defId) {
            setMatched((m) => new Set([...m, wordId]));
            setSelectedWord(null);
            setSelectedDef(null);
        } else {
            setWrong(new Set([wordId, defId]));
            setTimeout(() => {
                setWrong(new Set());
                setSelectedWord(null);
                setSelectedDef(null);
            }, 600);
        }
    };

    const restart = () => {
        setWords((w) => {
            const reshuffled = [...w].sort(() => Math.random() - 0.5);
            setShuffledDefs([...reshuffled].sort(() => Math.random() - 0.5));
            return reshuffled;
        });
        setSelectedWord(null);
        setSelectedDef(null);
        setMatched(new Set());
        setWrong(new Set());
    };

    if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 size={28} className="animate-spin text-indigo-400" /></div>;

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h1 className="text-base font-bold text-foreground">শব্দ মিলাও</h1>
                    <p className="text-xs text-muted-foreground">{matched.size}/{words.length} মিলানো হয়েছে</p>
                </div>
                <button onClick={restart} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                    <RotateCcw size={14} />
                    রিসেট
                </button>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${pct}%` }} />
            </div>

            {finished ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <p className="text-3xl">🎉</p>
                    <p className="text-xl font-bold text-primary">অসাধারণ! সব মিলানো হয়েছে!</p>
                    <button onClick={restart} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-black hover:bg-primary transition-colors">
                        <RotateCcw size={16} />
                        আবার খেলো
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {/* Words column */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-wide">শব্দ</p>
                        {words.map((word) => (
                            <button
                                key={word.id}
                                onClick={() => handleWordClick(word.id)}
                                disabled={matched.has(word.id)}
                                className={cn(
                                    'w-full rounded-xl border px-3 py-3 text-sm font-semibold transition-all',
                                    matched.has(word.id) ? 'border-primary/40 bg-primary/10 text-primary opacity-60' :
                                    wrong.has(word.id) ? 'border-rose-500 bg-rose-500/10 text-rose-400 scale-95' :
                                    selectedWord === word.id ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' :
                                    'border-border bg-card text-foreground hover:border-ring/40'
                                )}
                            >
                                {word.word}
                            </button>
                        ))}
                    </div>

                    {/* Definitions column */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground text-center uppercase tracking-wide">অর্থ</p>
                        {shuffledDefs.map((word) => (
                            <button
                                key={word.id}
                                onClick={() => handleDefClick(word.id)}
                                disabled={matched.has(word.id)}
                                className={cn(
                                    'w-full rounded-xl border px-3 py-3 text-xs text-left transition-all',
                                    matched.has(word.id) ? 'border-primary/40 bg-primary/10 text-primary opacity-60' :
                                    wrong.has(word.id) ? 'border-rose-500 bg-rose-500/10 text-rose-400 scale-95' :
                                    selectedDef === word.id ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' :
                                    'border-border bg-card text-muted-foreground hover:border-ring/40'
                                )}
                            >
                                {word.banglaDefinition || word.definition.slice(0, 60) + (word.definition.length > 60 ? '...' : '')}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
