'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight, Layers, Zap, Star, Trophy, Brain, CopyCheck, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEVELS = [
    {
        id: 'easy',
        label: 'সহজ',
        labelEn: 'Easy',
        desc: 'নবীনদের জন্য বেসিক শব্দভান্ডার',
        icon: '⭐',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
    },
    {
        id: 'medium',
        label: 'মধ্যম',
        labelEn: 'Medium',
        desc: 'মধ্যবর্তী স্তরের শব্দ',
        icon: '⚡',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
    },
    {
        id: 'advanced',
        label: 'অ্যাডভান্সড',
        labelEn: 'Advanced',
        desc: 'উন্নত স্তরের শব্দভান্ডার',
        icon: '🔥',
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
    },
    {
        id: 'competitive',
        label: 'প্রতিযোগিতামূলক',
        labelEn: 'Competitive',
        desc: 'BCS ও IELTS-এর জন্য গুরুত্বপূর্ণ',
        icon: '🏆',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
    },
];

const GAMES = [
    {
        href: '/vocabulary/flashcards',
        icon: Layers,
        label: 'ফ্ল্যাশকার্ড',
        desc: 'শব্দ মুখস্থ করো',
        iconBg: 'bg-indigo-500/10',
        iconCls: 'text-indigo-400',
        border: 'border-indigo-500/15 hover:border-indigo-500/30',
    },
    {
        href: '/vocabulary/fill-gaps',
        icon: CopyCheck,
        label: 'শূন্যস্থান পূরণ',
        desc: 'বাক্যে শব্দ বসাও',
        iconBg: 'bg-amber-500/10',
        iconCls: 'text-amber-400',
        border: 'border-amber-500/15 hover:border-amber-500/30',
    },
    {
        href: '/vocabulary/synonym-antonym',
        icon: Shuffle,
        label: 'সমার্থক-বিপরীত',
        desc: 'মিল ও বিপরীত খোঁজো',
        iconBg: 'bg-violet-500/10',
        iconCls: 'text-violet-400',
        border: 'border-violet-500/15 hover:border-violet-500/30',
    },
    {
        href: '/vocabulary/word-match',
        icon: Brain,
        label: 'শব্দ মিলাও',
        desc: 'অর্থের সাথে মিলাও',
        iconBg: 'bg-cyan-500/10',
        iconCls: 'text-cyan-400',
        border: 'border-cyan-500/15 hover:border-cyan-500/30',
    },
];

export default function VocabularyPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-6 lg:px-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    <BookOpen size={20} className="text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">ভোকাবুলারি</h1>
                    <p className="text-xs text-zinc-500">ইংরেজি শব্দভান্ডার শেখো</p>
                </div>
            </div>

            {/* Difficulty levels */}
            <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3">কঠিনতার স্তর</p>
                <div className="grid gap-2 sm:grid-cols-2">
                    {LEVELS.map((level) => (
                        <Link
                            key={level.id}
                            href={`/vocabulary/${level.id}`}
                            className={cn(
                                'flex items-center gap-3 rounded-xl border p-4 transition-colors hover:opacity-80',
                                level.bg, level.border
                            )}
                        >
                            <span className="text-2xl">{level.icon}</span>
                            <div className="flex-1">
                                <p className={cn('font-semibold text-sm', level.color)}>{level.label}</p>
                                <p className="text-xs text-zinc-500">{level.desc}</p>
                            </div>
                            <ChevronRight size={14} className="text-zinc-600" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Game modes */}
            <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3">গেম মোড</p>
                <div className="grid gap-2 sm:grid-cols-2">
                    {GAMES.map((game) => (
                        <Link
                            key={game.href}
                            href={game.href}
                            className={cn(
                                'flex items-center gap-3 rounded-xl border bg-zinc-900 p-4 transition-colors',
                                game.border
                            )}
                        >
                            <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', game.iconBg)}>
                                <game.icon size={18} className={game.iconCls} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-zinc-100">{game.label}</p>
                                <p className="text-xs text-zinc-500">{game.desc}</p>
                            </div>
                            <ChevronRight size={14} className="text-zinc-600" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
