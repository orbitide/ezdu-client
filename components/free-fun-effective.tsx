'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type Spark =
    | { type: 'star'; x: string; y: string; size: number; color: string; opacity: number; rotate: number }
    | { type: 'dot';  x: string; y: string; size: number; color: string; opacity: number };

// same distribution as CoinRewards, FreeFunEffective color palette
const sparks: Spark[] = [
    { type: 'star', x: '3%',  y: '8%',  size: 14, color: 'text-emerald-400', opacity: 0.6,  rotate: 15  },
    { type: 'dot',  x: '10%', y: '70%', size: 7,  color: 'bg-emerald-400',   opacity: 0.45 },
    { type: 'star', x: '6%',  y: '40%', size: 10, color: 'text-emerald-400', opacity: 0.4,  rotate: -25 },
    { type: 'dot',  x: '18%', y: '90%', size: 9,  color: 'bg-amber-400',     opacity: 0.5  },
    { type: 'star', x: '30%', y: '4%',  size: 11, color: 'text-amber-400',   opacity: 0.5,  rotate: 30  },
    { type: 'dot',  x: '46%', y: '94%', size: 6,  color: 'bg-emerald-400',   opacity: 0.4  },
    { type: 'star', x: '64%', y: '5%',  size: 9,  color: 'text-sky-400',     opacity: 0.45, rotate: -18 },
    { type: 'dot',  x: '75%', y: '90%', size: 8,  color: 'bg-amber-400',     opacity: 0.45 },
    { type: 'star', x: '85%', y: '10%', size: 14, color: 'text-sky-400',     opacity: 0.6,  rotate: 22  },
    { type: 'dot',  x: '93%', y: '52%', size: 6,  color: 'bg-sky-400',       opacity: 0.4  },
    { type: 'star', x: '96%', y: '26%', size: 9,  color: 'text-amber-400',   opacity: 0.45, rotate: -40 },
    { type: 'star', x: '88%', y: '78%', size: 13, color: 'text-sky-400',     opacity: 0.5,  rotate: 12  },
    { type: 'dot',  x: '22%', y: '16%', size: 5,  color: 'bg-amber-400',     opacity: 0.35 },
    { type: 'dot',  x: '55%', y: '8%',  size: 7,  color: 'bg-emerald-400',   opacity: 0.35 },
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

export const FreeFunEffective = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="relative surface-section-muted min-h-screen py-28 flex items-center overflow-hidden">

            {/* Comet */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: '12%',
                    left: 0,
                    width: 36,
                    height: 1,
                    borderRadius: 999,
                    background: 'linear-gradient(to right, transparent, rgba(196,181,253,0.75) 50%, rgba(255,255,255,0.92))',
                    rotate: 20,
                    boxShadow: '0 0 3px 0.5px rgba(196,181,253,0.3)',
                    opacity: 0.9,
                }}
                animate={{
                    x: [-60, 2400],
                    y: [0, 800],
                }}
                transition={{
                    duration: 22,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 2,
                }}
            />

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

            <div className="max-w-3xl mx-auto px-6 text-center w-full" ref={ref}>
                <div className="flex items-end justify-center gap-10 md:gap-14 mb-24">
                    {[
                        { src: '/illustrations/free.svg',      alt: 'বিনামূল্যে', label: 'বিনামূল্যে', color: 'text-emerald-400', delay: 0.1, lift: false },
                        { src: '/illustrations/fun.svg',       alt: 'মজাদার',     label: 'মজাদার',     color: 'text-amber-400',   delay: 0.2, lift: true  },
                        { src: '/illustrations/effective.svg', alt: 'কার্যকর',    label: 'কার্যকর',    color: 'text-sky-400',     delay: 0.3, lift: false },
                    ].map((item) => (
                        <motion.div
                            key={item.alt}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: item.delay }}
                            className={`flex flex-col items-center gap-3 ${item.lift ? '-translate-y-4' : ''}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={96}
                                height={96}
                                className={`w-20 h-20 md:w-24 md:h-24 ${item.lift ? 'drop-shadow-[0_0_18px_rgba(251,191,36,0.35)]' : ''}`}
                            />
                            <span className={`text-sm font-semibold tracking-wide ${item.color}`}>{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                >
                    <span className="text-emerald-400">বিনামূল্যে।</span>{' '}
                    <span className="text-amber-400">মজাদার।</span>{' '}
                    <span className="text-sky-400">কার্যকর।</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
                >
                    Ezdu-তে শেখা মানে গেমের মতো অভিজ্ঞতা — ছোট ছোট সেশন, তাৎক্ষণিক ফিডব্যাক, আর বাস্তব পরীক্ষার প্রস্তুতি। সবই বিনামূল্যে শুরু করো।
                </motion.p>
            </div>
        </section>
    );
};
