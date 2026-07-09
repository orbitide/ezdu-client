'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getVocabulary } from '@/lib/api/vocabulary';
import type { VocabularyDto } from '@/types/api';

interface Question {
    word: VocabularyDto;
    type: 'synonym' | 'antonym';
    correct: string;
    options: string[];
}

function buildQuestions(words: VocabularyDto[]): Question[] {
    const qs: Question[] = [];
    for (const word of words) {
        if (word.synonyms.length > 0) {
            const correct = word.synonyms[0];
            const others = words.filter((w) => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.word);
            qs.push({ word, type: 'synonym', correct, options: [correct, ...others].sort(() => Math.random() - 0.5) });
        }
        if (word.antonyms.length > 0) {
            const correct = word.antonyms[0];
            const others = words.filter((w) => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.word);
            qs.push({ word, type: 'antonym', correct, options: [correct, ...others].sort(() => Math.random() - 0.5) });
        }
    }
    return qs.sort(() => Math.random() - 0.5).slice(0, 10);
}

export default function SynonymAntonymPage() {
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
    const total = questions.length;

    const handleSelect = (opt: string) => {
        if (selected) return;
        setSelected(opt);
        if (opt === question.correct) setScore((s) => s + 1);
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
    if (!questions.length) return <div className="flex items-center justify-center min-h-[60vh] text-zinc-500 text-sm">যথেষ্ট ডেটা নেই</div>;

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
                    <h1 className="text-base font-bold text-zinc-100">সমার্থক-বিপরীত</h1>
                    <p className="text-xs text-zinc-500">{index + 1}/{total} প্রশ্ন</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">{score} সঠিক</span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${(index / total) * 100}%` }} />
            </div>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">
                    "{question.word.word}"-এর {question.type === 'synonym' ? 'সমার্থক' : 'বিপরীত'} শব্দ কী?
                </p>
                <p className="text-lg text-zinc-300">{question.word.definition}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {question.options.map((opt) => {
                    const isThis = selected === opt;
                    const correct = opt === question.correct;
                    return (
                        <button
                            key={opt}
                            onClick={() => handleSelect(opt)}
                            disabled={!!selected}
                            className={cn(
                                'rounded-xl border px-4 py-3 text-sm font-semibold transition-all',
                                !selected ? 'border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-indigo-500' :
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
