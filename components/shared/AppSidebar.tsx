'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, Brain, Trophy, User, Settings, X, Flame, Zap,
    TrendingUp, BookMarked, Bell, Users, ShoppingBag, Award, Shield, Archive, ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';
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
    const { sidebarOpen, setSidebarOpen } = useUIStore();
    const user = useAuthStore((s) => s.user);

    const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || '?';

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between px-5 border-b border-zinc-800 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold text-sm">E</div>
                        <span className="font-semibold text-zinc-100 text-lg">Ezdu</span>
                    </Link>
                    <button className="lg:hidden text-zinc-400 hover:text-zinc-100" onClick={() => setSidebarOpen(false)}>
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                    {NAV_SECTIONS.map((section) => (
                        <div key={section.label}>
                            <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{section.label}</p>
                            <div className="space-y-0.5">
                                {section.items.map(({ href, icon: Icon, label }) => {
                                    const active = pathname === href || (href !== '/profile' && pathname.startsWith(href + '/')) || (href === '/profile' && pathname === '/profile');
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={cn(
                                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                                active
                                                    ? 'bg-emerald-500/10 text-emerald-400'
                                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                                            )}
                                        >
                                            <Icon size={16} />
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User strip */}
                <div className="border-t border-zinc-800 px-4 py-3 shrink-0">
                    <Link href="/profile" className="flex items-center gap-3 rounded-lg hover:bg-zinc-800 p-1.5 -m-1.5 transition-colors" onClick={() => setSidebarOpen(false)}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-white text-xs font-bold shrink-0">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
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
        </>
    );
}
