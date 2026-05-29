'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, Brain, Trophy, User, Settings, Flame, Zap,
    TrendingUp, BookMarked, Bell, Users, ShoppingBag, Award, Shield, Archive, ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';

const NAV_SECTIONS = [
    {
        label: 'মূল',
        items: [
            { href: '/dashboard', icon: LayoutDashboard, label: 'ড্যাশবোর্ড' },
            { href: '/progress', icon: TrendingUp, label: 'অগ্রগতি' },
            { href: '/study-plan', icon: BookOpen, label: 'স্টাডি প্ল্যান' },
        ],
    },
    {
        label: 'প্র্যাকটিস',
        items: [
            { href: '/quiz', icon: Brain, label: 'কুইজ' },
            { href: '/model-tests', icon: ClipboardList, label: 'মডেল টেস্ট' },
            { href: '/challenge', icon: Zap, label: 'দ্রুত চ্যালেঞ্জ' },
            { href: '/vocabulary', icon: BookMarked, label: 'ভোকাবুলারি' },
            { href: '/archive', icon: Archive, label: 'আর্কাইভ' },
        ],
    },
    {
        label: 'সামাজিক',
        items: [
            { href: '/leaderboard', icon: Trophy, label: 'লিডারবোর্ড' },
            { href: '/leagues', icon: Shield, label: 'লিগ' },
            { href: '/feed', icon: Bell, label: 'ফিড' },
            { href: '/friends', icon: Users, label: 'বন্ধু' },
        ],
    },
    {
        label: 'পুরস্কার',
        items: [
            { href: '/achievements', icon: Award, label: 'অ্যাচিভমেন্ট' },
            { href: '/shop', icon: ShoppingBag, label: 'শপ' },
        ],
    },
    {
        label: 'অ্যাকাউন্ট',
        items: [
            { href: '/profile', icon: User, label: 'প্রোফাইল' },
            { href: '/settings', icon: Settings, label: 'সেটিংস' },
        ],
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const user = useAuthStore((s) => s.user);

    const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?';

    return (
        <aside className="flex w-14 shrink-0 flex-col bg-zinc-900 border-r border-zinc-800 lg:w-64">
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
                            {section.items.map(({ href, icon: Icon, label }) => {
                                const active =
                                    pathname === href ||
                                    (href !== '/profile' && pathname.startsWith(href + '/')) ||
                                    (href === '/profile' && pathname === '/profile');
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={cn(
                                            'flex items-center justify-center rounded-lg py-2 text-sm font-medium transition-colors',
                                            'lg:justify-start lg:gap-3 lg:px-3',
                                            active
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                                        )}
                                    >
                                        <Icon size={16} className="shrink-0" />
                                        <span className="hidden truncate lg:block">{label}</span>
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
