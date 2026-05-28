export type ExamId = 'ssc' | 'hsc' | 'bcs' | 'ielts' | 'vocabulary';

export interface ExamConfig {
    id: ExamId;
    name: string;
    nameBn: string;
    color: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    bgBarClass: string; // solid bar fill for progress bars
    icon: string;       // emoji fallback
    iconSrc: string;    // SVG asset path
    path: string;
    description: string;
}

export const EXAMS: ExamConfig[] = [
    {
        id: 'ssc',
        name: 'SSC',
        nameBn: 'এসএসসি',
        color: 'emerald',
        bgClass: 'bg-emerald-500/10',
        textClass: 'text-emerald-400',
        borderClass: 'border-emerald-500/20',
        bgBarClass: 'bg-emerald-500',
        icon: '📗',
        iconSrc: '/ssc.svg',
        path: '/ssc',
        description: 'Secondary School Certificate',
    },
    {
        id: 'hsc',
        name: 'HSC',
        nameBn: 'এইচএসসি',
        color: 'blue',
        bgClass: 'bg-blue-500/10',
        textClass: 'text-blue-400',
        borderClass: 'border-blue-500/20',
        bgBarClass: 'bg-blue-500',
        icon: '📘',
        iconSrc: '/hsc.svg',
        path: '/hsc',
        description: 'Higher Secondary Certificate',
    },
    {
        id: 'bcs',
        name: 'BCS',
        nameBn: 'বিসিএস',
        color: 'purple',
        bgClass: 'bg-purple-500/10',
        textClass: 'text-purple-400',
        borderClass: 'border-purple-500/20',
        bgBarClass: 'bg-purple-500',
        icon: '🏛️',
        iconSrc: '/bcs.svg',
        path: '/bcs',
        description: 'Bangladesh Civil Service',
    },
    {
        id: 'ielts',
        name: 'IELTS',
        nameBn: 'আইইএলটিএস',
        color: 'rose',
        bgClass: 'bg-rose-500/10',
        textClass: 'text-rose-400',
        borderClass: 'border-rose-500/20',
        bgBarClass: 'bg-rose-500',
        icon: '🌐',
        iconSrc: '/ielts.svg',
        path: '/ielts',
        description: 'International English Language Testing System',
    },
    {
        id: 'vocabulary',
        name: 'Vocabulary',
        nameBn: 'ভোকাবুলারি',
        color: 'amber',
        bgClass: 'bg-amber-500/10',
        textClass: 'text-amber-400',
        borderClass: 'border-amber-500/20',
        bgBarClass: 'bg-amber-500',
        icon: '📖',
        iconSrc: '/vocabulary.svg',
        path: '/vocabulary',
        description: 'English Word Power',
    },
];

export const EXAM_MAP = Object.fromEntries(EXAMS.map((e) => [e.id, e])) as Record<ExamId, ExamConfig>;
