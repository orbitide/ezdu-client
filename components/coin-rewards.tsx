'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const rewards = [
    { icon: '⚡', label: 'XP পয়েন্ট', desc: 'প্রতিটি সঠিক উত্তরে XP অর্জন করো' },
    { icon: '🏆', label: 'লিডারবোর্ড', desc: 'বন্ধুদের টপকাও, শীর্ষে থাকো' },
    { icon: '🏅', label: 'ব্যাজ ও পুরস্কার', desc: 'মাইলস্টোন পূরণে বিশেষ ব্যাজ' },
];

export const CoinRewards = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-28 md:py-40">
            <div className="max-w-3xl mx-auto px-6 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mb-14"
                >
                    <Image
                        src="/illustrations/coin-rewards.svg"
                        alt="XP ও পুরস্কার সিস্টেম"
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
                    XP জিতো,{' '}
                    <span className="text-yellow-400">শীর্ষে থাকো</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-14"
                >
                    প্রতিটি প্রশ্নের সঠিক উত্তর দিলে XP পাও, লেভেল বাড়াও, ব্যাজ অর্জন করো। লিডারবোর্ডে বন্ধুদের টপকাও আর প্রমাণ করো তুমিই সেরা।
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid md:grid-cols-3 gap-5"
                >
                    {rewards.map(({ icon, label, desc }, i) => (
                        <div key={i} className="surface-raised rounded-2xl p-6 border border-yellow-400/10">
                            <div className="text-4xl mb-4">{icon}</div>
                            <div className="text-base font-bold text-yellow-400 mb-2">{label}</div>
                            <div className="text-sm text-zinc-500 leading-relaxed">{desc}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
