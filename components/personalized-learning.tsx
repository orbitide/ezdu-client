'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const badges = [
    { src: '/ssc.svg',   alt: 'SSC',   cls: 'top-0 left-0' },
    { src: '/hsc.svg',   alt: 'HSC',   cls: 'top-0 right-0' },
    { src: '/bcs.svg',   alt: 'BCS',   cls: 'bottom-0 left-0' },
    { src: '/ielts.svg', alt: 'IELTS', cls: 'bottom-0 right-0' },
];

// Container is 320×320. Badge = 80×80 centered at each corner's center.
// Engine circle center = (160,160), radius ≈ 44.
const S = 320;
const C = S / 2;          // 160
const B = 40;             // half badge size
const R = 44;             // engine radius

const badgeCenters = [
    { x: B,     y: B     }, // SSC   top-left
    { x: S - B, y: B     }, // HSC   top-right
    { x: B,     y: S - B }, // BCS   bottom-left
    { x: S - B, y: S - B }, // IELTS bottom-right
];

function lineEndpoints(bx: number, by: number) {
    const dx = C - bx, dy = C - by;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist, uy = dy / dist;
    // start: badge edge (badge radius = B, offset a few px gap)
    const gap = 6;
    return {
        x1: bx + ux * (B + gap),
        y1: by + uy * (B + gap),
        x2: C - ux * (R + gap),
        y2: C - uy * (R + gap),
    };
}

export const PersonalizedLearning = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="surface-section-muted py-28 md:py-40">
            <div className="max-w-2xl mx-auto px-6 text-center" ref={ref}>

                {/* Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="relative mx-auto mb-14 w-64 h-64 md:w-80 md:h-80"
                >
                    {/* Connection lines SVG overlay */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox={`0 0 ${S} ${S}`}
                    >
                        <defs>
                            {badgeCenters.map((bc, i) => {
                                const ep = lineEndpoints(bc.x, bc.y);
                                return (
                                    <linearGradient
                                        key={i}
                                        id={`lg${i}`}
                                        x1={ep.x1} y1={ep.y1}
                                        x2={ep.x2} y2={ep.y2}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.15"/>
                                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.7"/>
                                    </linearGradient>
                                );
                            })}
                        </defs>

                        {badgeCenters.map((bc, i) => {
                            const ep = lineEndpoints(bc.x, bc.y);
                            return (
                                <g key={i}>
                                    <line
                                        x1={ep.x1} y1={ep.y1}
                                        x2={ep.x2} y2={ep.y2}
                                        stroke={`url(#lg${i})`}
                                        strokeWidth="1.5"
                                        strokeDasharray="5 4"
                                    />
                                    {/* dot at badge end */}
                                    <circle cx={ep.x1} cy={ep.y1} r="3" fill="#6d28d9" opacity="0.6"/>
                                    {/* dot at engine end */}
                                    <circle cx={ep.x2} cy={ep.y2} r="2.5" fill="#a78bfa" opacity="0.8"/>
                                </g>
                            );
                        })}
                    </svg>

                    {/* 4 exam badges */}
                    {badges.map(({ src, alt, cls }) => (
                        <div
                            key={alt}
                            className={`absolute ${cls} w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-700/60 shadow-lg`}
                        >
                            <Image src={src} alt={alt} width={80} height={80} className="w-full h-full object-cover"/>
                        </div>
                    ))}

                    {/* Engine center node */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {/* Outer pulse ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-violet-500/40"
                            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ width: 88, height: 88, top: -4, left: -4 }}
                        />
                        {/* Mid ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-violet-400/30"
                            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            style={{ width: 88, height: 88, top: -4, left: -4 }}
                        />
                        {/* Core circle */}
                        <div
                            className="w-20 h-20 rounded-full bg-violet-950 border-2 border-violet-500 flex items-center justify-center"
                            style={{ boxShadow: '0 0 32px rgba(139,92,246,0.5), 0 0 8px rgba(139,92,246,0.3) inset' }}
                        >
                            <Image src="/bolt.svg" alt="" width={38} height={38}/>
                        </div>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-6"
                >
                    তোমার জন্য{' '}
                    <span className="text-violet-400">কাস্টমাইজড</span> প্র্যাকটিস
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
                >
                    Ezdu-র AI তোমার দুর্বল জায়গা বুঝে ঠিক সেখানেই মনোযোগ দেয়। SSC, HSC, BCS বা IELTS — যেটাই হোক, প্র্যাকটিস তোমার মতো করেই সাজানো।
                </motion.p>

            </div>
        </section>
    );
};
