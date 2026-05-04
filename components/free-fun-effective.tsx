'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const pillars = [
    { label: 'বিনামূল্যে', sub: 'সবসময়ের জন্য', color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/5' },
    { label: 'মজাদার', sub: 'গেমের মতো', color: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/5' },
    { label: 'কার্যকর', sub: '৯৫% সাফল্য', color: 'text-sky-400', border: 'border-sky-400/30', bg: 'bg-sky-400/5' },
];

export const FreeFunEffective = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="surface-section-muted py-28 md:py-40">
            <div className="max-w-3xl mx-auto px-6 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mb-14"
                >
                    <Image
                        src="/illustrations/free-fun-effective.svg"
                        alt="Ezdu বিনামূল্যে, মজাদার ও কার্যকর"
                        width={420}
                        height={340}
                        className="w-full max-w-md"
                        priority={false}
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold leading-tight mb-6"
                >
                    <span className="text-emerald-400">বিনামূল্যে।</span>{' '}
                    <span className="text-amber-400">মজাদার।</span>{' '}
                    <span className="text-sky-400">কার্যকর।</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-14"
                >
                    Ezdu-তে শেখা মানে গেমের মতো অভিজ্ঞতা — ছোট ছোট সেশন, তাৎক্ষণিক ফিডব্যাক, আর বাস্তব পরীক্ষার প্রস্তুতি। সবই বিনামূল্যে শুরু করো।
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-3 gap-4"
                >
                    {pillars.map(({ label, sub, color, border, bg }, i) => (
                        <div key={i} className={`rounded-2xl border ${border} ${bg} px-4 py-5`}>
                            <div className={`text-xl font-bold mb-1 ${color}`}>{label}</div>
                            <div className="text-sm text-zinc-500">{sub}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
