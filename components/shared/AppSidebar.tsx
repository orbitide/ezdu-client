'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';

type NavItem = {
    href: string;
    label: string;
    svgSrc: string;
    svgOutline?: string;
};

function NavIcon({ item, active }: { item: NavItem; active: boolean }) {
    const src = (!active && item.svgOutline) ? item.svgOutline : item.svgSrc;
    return (
        <Image
            src={src}
            width={28}
            height={28}
            alt=""
            aria-hidden
            className={cn('shrink-0', !active && !item.svgOutline && 'opacity-50 grayscale')}
        />
    );
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
    {
        label: 'মূল',
        items: [
            { href: '/dashboard', svgSrc: '/icons/home.svg', svgOutline: '/icons/home_outline.svg', label: 'ড্যাশবোর্ড' },
            { href: '/progress', svgSrc: '/icons/progress.svg', svgOutline: '/icons/progress_outline.svg', label: 'অগ্রগতি' },
            { href: '/study-plan', svgSrc: '/icons/plan.svg', svgOutline: '/icons/plan_outline.svg', label: 'স্টাডি প্ল্যান' },
        ],
    },
    {
        label: 'প্র্যাকটিস',
        items: [
            { href: '/model-tests', svgSrc: '/icons/quiz.svg', label: 'মডেল টেস্ট' },
            { href: '/mock-tests', svgSrc: '/icons/mock_test.svg', label: 'মক টেস্ট' },
            { href: '/challenge', svgSrc: '/icons/challenge.svg', label: 'দ্রুত চ্যালেঞ্জ' },
            { href: '/vocabulary', svgSrc: '/icons/vocabs.svg', label: 'ভোকাবুলারি' },
            { href: '/archive', svgSrc: '/icons/archive.svg', label: 'আর্কাইভ' },
        ],
    },
    {
        label: 'সামাজিক',
        items: [
            { href: '/leaderboard', svgSrc: '/icons/leaderboard.svg', label: 'লিডারবোর্ড' },
        ],
    },
    {
        label: 'অ্যাকাউন্ট',
        items: [
            { href: '/profile', svgSrc: '/icons/profile.svg', svgOutline: '/icons/profile_outline.svg', label: 'প্রোফাইল' },
            { href: '/settings', svgSrc: '/icons/settings.svg', svgOutline: '/icons/settings_outline.svg', label: 'সেটিংস' },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const user = useAuthStore((s) => s.user);

    const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?';

    return (
        <aside className="flex w-16 shrink-0 flex-col bg-zinc-900 border-r border-zinc-800 lg:w-64">
            {/* Logo */}
            <div className="flex h-16 items-center justify-center border-b border-zinc-800 shrink-0 lg:justify-start lg:px-5">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold text-sm">
                        E
                    </div>
                    <span className="hidden font-semibold text-zinc-100 text-lg lg:block">Ezdu</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-3 space-y-4 px-2 lg:px-3">
                {NAV_SECTIONS.map((section) => (
                    <div key={section.label}>
                        <p className="hidden pb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 lg:block">
                            {section.label}
                        </p>
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const active =
                                    pathname === item.href ||
                                    (item.href !== '/profile' && pathname.startsWith(item.href + '/')) ||
                                    (item.href === '/profile' && pathname === '/profile');
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center justify-center rounded-lg py-2.5 text-sm font-medium transition-colors',
                                            'lg:justify-start lg:gap-3 lg:px-3',
                                            active
                                                ? 'bg-emerald-500/10'
                                                : 'hover:bg-zinc-800'
                                        )}
                                    >
                                        <NavIcon item={item} active={active} />
                                        <span className={cn(
                                            'hidden truncate lg:block',
                                            active ? 'text-emerald-400' : 'text-zinc-400'
                                        )}>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User strip */}
            <div className="flex justify-center border-t border-zinc-800 py-3 shrink-0 lg:block lg:px-4">
                <Link
                    href="/profile"
                    className="flex items-center rounded-lg hover:bg-zinc-800 p-1.5 -m-1.5 transition-colors lg:gap-3"
                >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-white text-xs font-bold">
                        {initials}
                    </div>
                    <div className="hidden flex-1 min-w-0 lg:block">
                        <p className="text-sm font-medium text-zinc-100 truncate">{user?.name || 'লোড হচ্ছে...'}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <Flame size={10} className="text-orange-400" />
                            <span>{user?.streak ?? 0} দিন</span>
                            <Zap size={10} className="text-yellow-400" />
                            <span>{user?.xp ?? 0} XP</span>
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
}
