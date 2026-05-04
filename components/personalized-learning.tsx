'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const features = [
    { label: 'দুর্বল বিষয় শনাক্ত', desc: 'AI বোঝে কোথায় তুমি আটকাচ্ছ' },
    { label: 'কাস্টম প্রশ্নসেট', desc: 'তোমার জন্য তৈরি, অন্যের মতো নয়' },
    { label: 'সঠিক গতিতে শেখা', desc: 'তাড়াহুড়ো নেই — তোমার প্যাসে' },
    { label: 'রিয়েলটাইম ফিডব্যাক', desc: 'প্রতিটি উত্তরে তাৎক্ষণিক ব্যাখ্যা' },
];

export const PersonalizedLearning = () => {
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
                        src="/illustrations/personalized-learning.svg"
                        alt="AI-চালিত পার্সোনালাইজড শিক্ষা"
                        width={420}
                        height={340}
                        className="w-full max-w-md"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight mb-6"
                >
                    তোমার জন্য{' '}
                    <span className="text-violet-400">কাস্টমাইজড</span> শিক্ষা
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-14"
                >
                    Ezdu-র AI তোমার দুর্বল জায়গা বুঝে ঠিক সেখানেই মনোযোগ দেয়। একই প্রশ্নব্যাংক সবার জন্য নয় — তোমার শিক্ষা তোমার মতো করেই সাজানো।
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {features.map(({ label, desc }, i) => (
                        <div key={i} className="surface-raised rounded-2xl p-5 text-left border border-violet-500/10">
                            <div className="text-sm font-bold text-violet-400 mb-1">{label}</div>
                            <div className="text-sm text-zinc-500">{desc}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
