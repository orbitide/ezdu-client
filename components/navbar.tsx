'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExamHubNav } from '@/components/exam-hub-nav';
import { isExamPath } from '@/lib/exam-routes';

export const Navbar = () => {
    const pathname = usePathname();
    const showExamBar = isExamPath(pathname);
    const reduceMotion = useReducedMotion();

    return (
        <motion.nav
            initial={reduceMotion ? false : { y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 surface-chrome border-b"
            style={{ paddingTop: 'var(--ez-safe-top)' }}
            aria-label="Main"
        >
            <div className="container mx-auto flex h-[var(--ez-marketing-nav-height)] items-center justify-between gap-6 px-4">
                <Link href="/" className="flex shrink-0 items-center">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image alt="EzDu logo" src="/logo_rounded.png" width={36} height={32} />
                        <span className="text-2xl font-bold tracking-tight text-white">EzDu</span>
                    </motion.div>
                </Link>

                {/*<div className="flex items-center gap-5 sm:gap-8">
                    <Link href="/about" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">About</Link>
                    <Link href="/career" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Careers</Link>
                    <Link href="/contact" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors">Contact</Link>
                </div>*/}
            </div>
            {showExamBar ? (
                <div className="h-[var(--ez-exam-bar-height)] overflow-hidden border-t border-zinc-800/90 bg-zinc-950/80">
                    <ExamHubNav />
                </div>
            ) : null}
        </motion.nav>
    );
};
