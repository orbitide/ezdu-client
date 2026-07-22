'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, RotateCcw, Loader2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabulary } from '@/lib/api/vocabulary';
import type { VocabularyDto } from '@/types/api';

export default function FlashcardsPage() {
    const router = useRouter();
    const [words, setWords] = useState<VocabularyDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [done, setDone] = useState<Set<string>>(new Set());

    useEffect(() => {
        getVocabulary(undefined, 1, 30)
            .then((w) => setWords(w.sort(() => Math.random() - 0.5)))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const word = words[index];
    const total = words.length;
    const pct = total > 0 ? Math.round((done.size / total) * 100) : 0;

    const next = () => {
        setFlipped(false);
        setTimeout(() => setIndex((i) => Math.min(i + 1, total - 1)), 150);
    };
    const prev = () => {
        setFlipped(false);
        setTimeout(() => setIndex((i) => Math.max(i - 1, 0)), 150);
    };
    const markDone = () => {
        if (word) setDone((d) => new Set([...d, word.id]));
        next();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={28} className="animate-spin text-indigo-400" />
            </div>
        );
    }

    if (!word) return null;

    return (
        <div className="mx-auto max-w-md px-4 py-6 space-y-5">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h1 className="text-base font-bold text-foreground">ফ্ল্যাশকার্ড</h1>
                    <p className="text-xs text-muted-foreground">{index + 1}/{total} · {pct}% সম্পন্ন</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${pct}%` }} />
            </div>

            {/* Card */}
            <div
                style={{ perspective: '1200px' }}
                className="w-full cursor-pointer"
                onClick={() => setFlipped((f) => !f)}
            >
                <div
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.45s ease',
                    }}
                    className="relative w-full h-56"
                >
                    {/* Front face — word */}
                    <div
                        style={{ backfaceVisibility: 'hidden' }}
                        className={cn(
                            'absolute inset-0 rounded-2xl border-2 p-6 flex flex-col',
                            done.has(word.id)
                                ? 'border-primary/40 bg-primary/5'
                                : 'border-border bg-card'
                        )}
                    >
                        <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">শব্দ — ট্যাপ করো</p>
                        <p className="text-3xl font-bold text-foreground mb-2">{word.word}</p>
                        {word.exampleSentence && (
                            <p className="text-sm text-muted-foreground italic">{word.exampleSentence}</p>
                        )}
                    </div>
                    {/* Back face — definition */}
                    <div
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        className={cn(
                            'absolute inset-0 rounded-2xl border-2 p-6 flex flex-col',
                            done.has(word.id)
                                ? 'border-primary/40 bg-primary/5'
                                : 'border-indigo-500/50 bg-card'
                        )}
                    >
                        <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">অর্থ</p>
                        <p className="text-xl font-semibold text-foreground mb-2">{word.definition}</p>
                        {word.banglaDefinition && (
                            <p className="text-sm text-primary">{word.banglaDefinition}</p>
                        )}
                        {word.synonyms.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {word.synonyms.slice(0, 3).map((s) => (
                                    <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <button
                    onClick={markDone}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-black hover:bg-primary transition-colors"
                >
                    শিখেছি ✓
                </button>
                <button
                    onClick={next}
                    disabled={index === total - 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                >
                    <ArrowRight size={18} />
                </button>
            </div>

            {/* Reset */}
            {done.size > 0 && (
                <button
                    onClick={() => { setDone(new Set()); setIndex(0); setFlipped(false); }}
                    className="flex w-full items-center justify-center gap-2 text-xs text-muted-foreground hover:text-muted-foreground transition-colors"
                >
                    <RotateCcw size={12} />
                    আবার শুরু করো
                </button>
            )}
        </div>
    );
}
