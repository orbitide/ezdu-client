'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type Spark =
    | { type: 'star'; x: string; y: string; size: number; color: string; opacity: number; rotate: number }
    | { type: 'dot';  x: string; y: string; size: number; color: string; opacity: number };

const sparks: Spark[] = [
    { type: 'star', x: '3%',  y: '8%',  size: 14, color: 'text-amber-400',  opacity: 0.6,  rotate: 15  },
    { type: 'dot',  x: '10%', y: '70%', size: 7,  color: 'bg-yellow-400',   opacity: 0.45 },
    { type: 'star', x: '6%',  y: '40%', size: 10, color: 'text-orange-400', opacity: 0.4,  rotate: -25 },
    { type: 'dot',  x: '18%', y: '90%', size: 9,  color: 'bg-amber-400',    opacity: 0.5  },
    { type: 'star', x: '30%', y: '4%',  size: 11, color: 'text-yellow-400', opacity: 0.5,  rotate: 30  },
    { type: 'dot',  x: '46%', y: '94%', size: 6,  color: 'bg-amber-400',    opacity: 0.4  },
    { type: 'star', x: '64%', y: '5%',  size: 9,  color: 'text-violet-400', opacity: 0.45, rotate: -18 },
    { type: 'dot',  x: '75%', y: '90%', size: 8,  color: 'bg-yellow-400',   opacity: 0.45 },
    { type: 'star', x: '85%', y: '10%', size: 14, color: 'text-amber-400',  opacity: 0.6,  rotate: 22  },
    { type: 'dot',  x: '93%', y: '52%', size: 6,  color: 'bg-orange-400',   opacity: 0.4  },
    { type: 'star', x: '96%', y: '26%', size: 9,  color: 'text-yellow-400', opacity: 0.45, rotate: -40 },
    { type: 'star', x: '88%', y: '78%', size: 13, color: 'text-violet-400', opacity: 0.5,  rotate: 12  },
    { type: 'dot',  x: '22%', y: '16%', size: 5,  color: 'bg-amber-400',    opacity: 0.35 },
    { type: 'dot',  x: '55%', y: '8%',  size: 7,  color: 'bg-yellow-400',   opacity: 0.35 },
];

const StarSparkle = ({ size, color, opacity, rotate }: { size: number; color: string; opacity: number; rotate: number }) => (
    <svg
        width={size} height={size} viewBox="0 0 24 24"
        className={color}
        style={{ opacity, transform: `rotate(${rotate}deg)` }}
        aria-hidden
    >
        <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill="currentColor"/>
    </svg>
);

export const CoinRewards = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="relative min-h-screen py-28 flex items-center overflow-hidden">
            {sparks.map((s, i) =>
                s.type === 'star' ? (
                    <motion.span
                        key={i}
                        className="absolute pointer-events-none"
                        style={{ left: s.x, top: s.y }}
                        animate={{ rotate: [s.rotate, s.rotate + 360] }}
                        transition={{ duration: 18 + i * 2, repeat: Infinity, ease: 'linear' }}
                    >
                        <StarSparkle size={s.size} color={s.color} opacity={s.opacity} rotate={0} />
                    </motion.span>
                ) : (
                    <span
                        key={i}
                        className={`absolute rounded-full pointer-events-none ${s.color}`}
                        style={{ left: s.x, top: s.y, width: s.size, height: s.size, opacity: s.opacity }}
                    />
                )
            )}

            <div className="max-w-2xl mx-auto px-6 text-center w-full" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mb-28"
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
                    className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
                >
                    XP জিতো,{' '}
                    <span className="text-yellow-400">শীর্ষে থাকো</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
                >
                    প্রতিটি প্রশ্নের সঠিক উত্তর দিলে XP পাও, লেভেল বাড়াও, ব্যাজ অর্জন করো। লিডারবোর্ডে বন্ধুদের টপকাও আর প্রমাণ করো তুমিই সেরা।
                </motion.p>
            </div>
        </section>
    );
};
