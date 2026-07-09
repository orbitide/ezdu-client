'use client';

import { cn } from '@/lib/utils';
import { MathText } from '@/components/ui/math-text';
import { CheckCircle2, XCircle } from 'lucide-react';

interface OptionButtonProps {
    id: string;
    text: string;
    index: number;
    selected: boolean;
    isCorrect?: boolean;
    revealed: boolean;
    onClick: () => void;
}

const LABELS = ['ক', 'খ', 'গ', 'ঘ'];

export function OptionButton({ id, text, index, selected, isCorrect, revealed, onClick }: OptionButtonProps) {
    const base = 'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 disabled:cursor-default';

    let style = 'border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800';

    if (revealed) {
        if (isCorrect) {
            style = 'border-emerald-500 bg-emerald-500/10 text-emerald-300';
        } else if (selected && !isCorrect) {
            style = 'border-red-500 bg-red-500/10 text-red-300';
        } else {
            style = 'border-zinc-800 bg-zinc-900 text-zinc-500';
        }
    } else if (selected) {
        style = 'border-blue-500 bg-blue-500/10 text-blue-300';
    }

    return (
        <button className={cn(base, style)} onClick={onClick} disabled={revealed}>
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                {LABELS[index]}
            </span>
            <span className="flex-1 leading-relaxed"><MathText text={text} /></span>
            {revealed && isCorrect && <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />}
            {revealed && selected && !isCorrect && <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />}
        </button>
    );
}
