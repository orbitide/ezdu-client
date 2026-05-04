'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { DownloadButton } from '@/components/ui/download-button';

const platforms = [
    { icon: '📱', label: 'iOS', sub: 'App Store' },
    { icon: '🤖', label: 'Android', sub: 'Google Play' },
];

export const DownloadCTA = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="surface-section-muted border-t border-emerald-400/10 py-28 md:py-40">
            <div className="max-w-3xl mx-auto px-6 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mb-14"
                >
                    <Image
                        src="/illustrations/download-app.svg"
                        alt="Ezdu অ্যাপ ডাউনলোড করো"
                        width={420}
                        height={340}
                        className="w-full max-w-md"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-6"
                >
                    যেকোনো সময়,{' '}
                    <span className="text-emerald-400">যেকোনো জায়গায়</span> পড়ো
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-6"
                >
                    যানজটে, বিরতিতে, বা ঘুমানোর আগে — Ezdu সবসময় তোমার পকেটে। iOS ও Android — দুটোতেই পাওয়া যায়।
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
                >
                    <DownloadButton type="apple" />
                    <DownloadButton type="google" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="flex justify-center gap-8"
                >
                    {platforms.map(({ icon, label, sub }, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                            <span className="text-xl">{icon}</span>
                            <span><span className="text-zinc-300 font-medium">{label}</span> · {sub}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
