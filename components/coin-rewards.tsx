'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const sparks = [
    { x: '3%',  y: '8%',  size: 14, color: 'text-amber-400',  opacity: 'opacity-60' },
    { x: '10%', y: '70%', size: 10, color: 'text-yellow-400', opacity: 'opacity-50' },
    { x: '6%',  y: '40%', size: 8,  color: 'text-orange-400', opacity: 'opacity-40' },
    { x: '18%', y: '88%', size: 12, color: 'text-amber-400',  opacity: 'opacity-55' },
    { x: '30%', y: '5%',  size: 9,  color: 'text-yellow-400', opacity: 'opacity-45' },
    { x: '50%', y: '92%', size: 11, color: 'text-amber-400',  opacity: 'opacity-45' },
    { x: '65%', y: '6%',  size: 8,  color: 'text-violet-400', opacity: 'opacity-40' },
    { x: '78%', y: '88%', size: 10, color: 'text-amber-400',  opacity: 'opacity-50' },
    { x: '85%', y: '12%', size: 13, color: 'text-yellow-400', opacity: 'opacity-55' },
    { x: '92%', y: '55%', size: 9,  color: 'text-orange-400', opacity: 'opacity-45' },
    { x: '96%', y: '28%', size: 8,  color: 'text-amber-400',  opacity: 'opacity-40' },
    { x: '88%', y: '80%', size: 14, color: 'text-violet-400', opacity: 'opacity-50' },
    { x: '22%', y: '18%', size: 7,  color: 'text-yellow-400', opacity: 'opacity-35' },
];

const Sparkle = ({ size, color, opacity }: { size: number; color: string; opacity: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`${color} ${opacity} pointer-events-none`}
        aria-hidden
    >
        <path
            d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z"
            fill="currentColor"
        />
    </svg>
);

export const CoinRewards = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="relative py-28 md:py-40 overflow-hidden">
            {/* Full-section sparkles */}
            {sparks.map(({ x, y, size, color, opacity }, i) => (
                <span
                    key={i}
                    className="absolute pointer-events-none"
                    style={{ left: x, top: y }}
                >
                    <Sparkle size={size} color={color} opacity={opacity} />
                </span>
            ))}

            <div className="max-w-2xl mx-auto px-6 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mb-14"
                >
                    <Image
                        src="/illustrations/coin-rewards.svg"
                        alt="XP ও পুরস্কার সিস্টেম"
                        width={480}
                        height={320}
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
                    className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
                >
                    প্রতিটি প্রশ্নের সঠিক উত্তর দিলে XP পাও, লেভেল বাড়াও, ব্যাজ অর্জন করো। লিডারবোর্ডে বন্ধুদের টপকাও আর প্রমাণ করো তুমিই সেরা।
                </motion.p>
            </div>
        </section>
    );
};
