'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabulary } from '@/lib/api/vocabulary';
import type { VocabularyDto } from '@/types/api';

interface Question {
    word: VocabularyDto;
    sentence: string;
    blank: string;
    options: string[];
}

function buildQuestions(words: VocabularyDto[]): Question[] {
    return words
        .filter((w) => w.exampleSentence)
        .slice(0, 10)
        .map((word) => {
            const sentence = word.exampleSentence!.replace(new RegExp(word.word, 'gi'), '______');
            // Pick 3 random wrong options from other words
            const others = words.filter((w) => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.word);
            const options = [word.word, ...others].sort(() => Math.random() - 0.5);
            return { word, sentence, blank: word.word, options };
        });
}

export default function FillGapsPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        getVocabulary(undefined, 1, 30)
            .then((w) => setQuestions(buildQuestions(w)))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const question = questions[index];
    const isCorrect = selected === question?.blank;
    const total = questions.length;

    const handleSelect = (opt: string) => {
        if (selected) return;
        setSelected(opt);
        if (opt === question.blank) setScore((s) => s + 1);
        setTimeout(() => {
            if (index + 1 >= total) {
                setFinished(true);
            } else {
                setIndex((i) => i + 1);
                setSelected(null);
            }
        }, 800);
    };

    const restart = () => { setIndex(0); setSelected(null); setScore(0); setFinished(false); };

    if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 size={28} className="animate-spin text-indigo-400" /></div>;

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 space-y-5">
                <div className="text-center">
                    <p className="text-4xl font-bold text-indigo-400">{score}/{total}</p>
                    <p className="text-sm text-zinc-500 mt-1">সঠিক উত্তর</p>
                </div>
                <button onClick={restart} className="flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors">
                    <RotateCcw size={16} />
                    আবার খেলো
                </button>
                <button onClick={() => router.back()} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">ফিরে যাও</button>
            </div>
        );
    }

    if (!question) return null;

    return (
        <div className="mx-auto max-w-md px-4 py-6 space-y-5">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h1 className="text-base font-bold text-zinc-100">শূন্যস্থান পূরণ</h1>
                    <p className="text-xs text-zinc-500">{index + 1}/{total} প্রশ্ন</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">{score} সঠিক</span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(index / total) * 100}%` }} />
            </div>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <p className="text-xs text-zinc-500 mb-3">শূন্যস্থানে সঠিক শব্দটি বসাও</p>
                <p className="text-lg font-medium text-zinc-100 leading-relaxed">{question.sentence}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {question.options.map((opt) => {
                    const isThis = selected === opt;
                    const correct = opt === question.blank;
                    return (
                        <button
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            disabled={!!selected}
                            className={cn(
                                'rounded-xl border px-4 py-3 text-sm font-medium transition-all',
                                !selected ? 'border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-600' :
                                correct ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' :
                                isThis && !correct ? 'border-rose-500 bg-rose-500/10 text-rose-400' :
                                'border-zinc-800 bg-zinc-900 text-zinc-600'
                            )}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
