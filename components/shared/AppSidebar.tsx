'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Brain, Trophy, User, Settings, X, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';

const NAV_ITEMS = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'ড্যাশবোর্ড' },
    { href: '/study-plan', icon: BookOpen, label: 'স্টাডি প্ল্যান' },
    { href: '/quiz', icon: Brain, label: 'কুইজ' },
    { href: '/leaderboard', icon: Trophy, label: 'লিডারবোর্ড' },
    { href: '/profile', icon: User, label: 'প্রোফাইল' },
    { href: '/settings', icon: Settings, label: 'সেটিংস' },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen } = useUIStore();

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
                <div className="flex h-16 items-center justify-between px-5 border-b border-zinc-800">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold text-sm">
                            E
                        </div>
                        <span className="font-semibold text-zinc-100 text-lg">Ezdu</span>
                    </Link>
                    <button
                        className="lg:hidden text-zinc-400 hover:text-zinc-100"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                    {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                        const active = pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                                )}
                            >
                                <Icon size={18} className={active ? 'text-emerald-400' : ''} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User strip */}
                <div className="border-t border-zinc-800 px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                            তু
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-100 truncate">আপনার নাম</p>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                <Flame size={11} className="text-orange-400" />
                                <span>৭ দিন</span>
                                <Zap size={11} className="text-yellow-400" />
                                <span>Lv.12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
