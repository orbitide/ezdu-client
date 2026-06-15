'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.nav
            initial={reduceMotion ? false : { y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 border-b bg-background/90 backdrop-blur-lg"
            style={{ paddingTop: 'var(--ez-safe-top)' }}
            aria-label="Main"
        >
            <div className="container mx-auto flex h-[var(--ez-marketing-nav-height)] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex shrink-0 items-center">
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image alt="EZDU logo" src="/logo-rounded.png" width={36} height={32} />
                        <span className="text-2xl font-bold tracking-tight text-foreground">EZDU</span>
                    </motion.div>
                </Link>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button asChild variant="secondary" size="sm">
                        <Link href="/welcome">শুরু করো</Link>
                    </Button>
                </motion.div>
            </div>
        </motion.nav>
    );
};
