import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const GRID_ITEMS = [
    {
        icon: '/icons/archive.svg',
        label: 'আর্কাইভ',
        href: '/archive',
        border: 'border-indigo-500/25',
        hover: 'hover:border-indigo-500/50 hover:bg-indigo-500/5',
        text: 'text-indigo-300',
    },
    {
        icon: '/icons/challenge.svg',
        label: 'চ্যালেঞ্জ',
        href: '/challenge',
        border: 'border-rose-500/25',
        hover: 'hover:border-rose-500/50 hover:bg-rose-500/5',
        text: 'text-rose-300',
    },
    {
        icon: '/icons/quiz.svg',
        label: 'মডেল টেস্ট',
        href: '/model-tests',
        border: 'border-emerald-500/25',
        hover: 'hover:border-emerald-500/50 hover:bg-emerald-500/5',
        text: 'text-emerald-300',
    },
    {
        icon: '/icons/mock_test.svg',
        label: 'মক টেস্ট',
        href: '/mock-tests',
        border: 'border-purple-500/25',
        hover: 'hover:border-purple-500/50 hover:bg-purple-500/5',
        text: 'text-purple-300',
    },
    {
        icon: '/icons/leaderboard.svg',
        label: 'লিডারবোর্ড',
        href: '/leaderboard',
        border: 'border-amber-500/25',
        hover: 'hover:border-amber-500/50 hover:bg-amber-500/5',
        text: 'text-amber-300',
    },
    {
        icon: '/icons/vocabs.svg',
        label: 'ভোকাবুলারি',
        href: '/vocabulary',
        border: 'border-blue-500/25',
        hover: 'hover:border-blue-500/50 hover:bg-blue-500/5',
        text: 'text-blue-300',
    },
] as const;

export function HomeGrid() {
    return (
        <div className="grid grid-cols-3 gap-3">
            {GRID_ITEMS.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'flex flex-col items-center justify-center gap-2.5 rounded-xl border bg-zinc-900 py-5 px-2 text-center transition-colors',
                        item.border,
                        item.hover
                    )}
                >
                    <Image
                        src={item.icon}
                        alt={item.label}
                        width={36}
                        height={36}
                        className="object-contain"
                    />
                    <span className={cn('text-xs font-semibold leading-tight', item.text)}>
                        {item.label}
                    </span>
                </Link>
            ))}
        </div>
    );
}
