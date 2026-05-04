'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// ─── SVG coordinate constants ────────────────────────────────────────────────
const VW = 880;
const VH = 500;
const D  = 280;
const OX = (VW - D) / 2;   // 300
const OY = (VH - D) / 2;   // 110
const CX = VW / 2;          // 440
const CY = VH / 2;          // 250
const B  = 40;               // half-badge
const R  = 40;               // engine radius

const BADGE_POS = [
    { key: 'SSC',   src: '/ssc.svg',   cx: OX + B,     cy: OY + B     },
    { key: 'HSC',   src: '/hsc.svg',   cx: OX + D - B, cy: OY + B     },
    { key: 'BCS',   src: '/bcs.svg',   cx: OX + B,     cy: OY + D - B },
    { key: 'IELTS', src: '/ielts.svg', cx: OX + D - B, cy: OY + D - B },
];
// SSC=(340,150)  HSC=(540,150)  BCS=(340,350)  IELTS=(540,350)

function innerLine(bx: number, by: number) {
    const dx = CX - bx, dy = CY - by;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const gap = 6;
    return {
        x1: bx + (dx / dist) * (B + gap), y1: by + (dy / dist) * (B + gap),
        x2: CX - (dx / dist) * (R + gap), y2: CY - (dy / dist) * (R + gap),
    };
}

// ─── chip geometry ───────────────────────────────────────────────────────────
const CW  = 130;
const CH  = 28;
const LX  = 10;               // left chip: left edge
const LXR = LX + CW;          // 140 — line attaches here
const RX  = VW - LX - CW;     // 740 — right chip: left edge, line attaches here
const MXL = (BADGE_POS[0].cx + LXR) / 2;  // 240
const MXR = (BADGE_POS[1].cx + RX)  / 2;  // 640

type ExamEntry = {
    badge:    typeof BADGE_POS[number];
    ys:       number[];
    chipX:    number;
    lineX:    number;
    midX:     number;
    side:     'left' | 'right';
    subjects: { icon: string; label: string }[];
};

const EXAM_TREE: ExamEntry[] = [
    {
        badge: BADGE_POS[0], ys: [50,100,150,200,250,300],
        chipX: LX, lineX: LXR, midX: MXL, side: 'left',
        subjects: [
            { icon: '/subjects/physics.svg',     label: 'Physics' },
            { icon: '/subjects/chemistry.svg',   label: 'Chemistry' },
            { icon: '/subjects/mathematics.svg', label: 'Mathematics' },
            { icon: '/subjects/bangla.svg',      label: 'Bangla' },
            { icon: '/subjects/english.svg',     label: 'English' },
            { icon: '/subjects/ict.svg',         label: 'ICT' },
        ],
    },
    {
        badge: BADGE_POS[1], ys: [50,100,150,200,250,300],
        chipX: RX, lineX: RX, midX: MXR, side: 'right',
        subjects: [
            { icon: '/subjects/buet.svg',      label: 'BUET' },
            { icon: '/subjects/du-gst.svg',    label: 'DU / GST' },
            { icon: '/subjects/medical.svg',   label: 'Medical' },
            { icon: '/subjects/physics.svg',   label: 'Physics' },
            { icon: '/subjects/chemistry.svg', label: 'Chemistry' },
            { icon: '/subjects/ict.svg',       label: 'ICT' },
        ],
    },
    {
        badge: BADGE_POS[2], ys: [325,380,435],
        chipX: LX, lineX: LXR, midX: MXL, side: 'left',
        subjects: [
            { icon: '/subjects/mcq.svg',      label: 'MCQ' },
            { icon: '/subjects/gk.svg',       label: 'GK' },
            { icon: '/subjects/eng-math.svg', label: 'English & Math' },
        ],
    },
    {
        badge: BADGE_POS[3], ys: [325,380,435],
        chipX: RX, lineX: RX, midX: MXR, side: 'right',
        subjects: [
            { icon: '/subjects/listening.svg', label: 'Listening' },
            { icon: '/subjects/reading.svg',   label: 'Reading' },
            { icon: '/subjects/writing.svg',   label: 'Writing' },
        ],
    },
];

// ─────────────────────────────────────────────────────────────────────────────

export const PersonalizedLearning = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="surface-section-muted py-28 md:py-40" ref={ref}>

            {/* Heading + description */}
            <div className="max-w-2xl mx-auto px-6 text-center mb-14">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mb-6"
                >
                    তোমার জন্য{' '}
                    <span className="text-violet-400">কাস্টমাইজড</span> প্র্যাকটিস
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
                >
                    Ezdu-র AI তোমার দুর্বল জায়গা বুঝে ঠিক সেখানেই মনোযোগ দেয়। SSC, HSC, BCS বা IELTS — যেটাই হোক, প্র্যাকটিস তোমার মতো করেই সাজানো।
                </motion.p>
            </div>

            {/* ── Connected tree diagram ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-full max-w-5xl mx-auto px-4 mb-20"
            >
                <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-auto" aria-hidden>
                    <defs>
                        {BADGE_POS.map((bp, i) => {
                            const ep = innerLine(bp.cx, bp.cy);
                            return (
                                <linearGradient key={i} id={`ilg${i}`}
                                    x1={ep.x1} y1={ep.y1} x2={ep.x2} y2={ep.y2}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0%"   stopColor="#6d28d9" stopOpacity="0.15"/>
                                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.7"/>
                                </linearGradient>
                            );
                        })}
                        <filter id="engGlow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="5" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* outer subject connecting lines */}
                    {EXAM_TREE.map(exam =>
                        exam.subjects.map((_, si) => {
                            const cy = exam.ys[si];
                            const d  = `M${exam.badge.cx},${exam.badge.cy} C${exam.midX},${exam.badge.cy} ${exam.midX},${cy} ${exam.lineX},${cy}`;
                            return (
                                <motion.path key={`ol-${exam.badge.key}-${si}`}
                                    d={d} fill="none"
                                    stroke="#7c3aed" strokeOpacity="0.4"
                                    strokeWidth="1" strokeDasharray="4 3"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                                    transition={{ duration: 0.8, delay: 0.7 + si * 0.07 }}
                                />
                            );
                        })
                    )}

                    {/* inner badge → engine lines */}
                    {BADGE_POS.map((bp, i) => {
                        const ep = innerLine(bp.cx, bp.cy);
                        return (
                            <g key={`il-${i}`}>
                                <line x1={ep.x1} y1={ep.y1} x2={ep.x2} y2={ep.y2}
                                    stroke={`url(#ilg${i})`} strokeWidth="1.5" strokeDasharray="5 4"/>
                                <circle cx={ep.x1} cy={ep.y1} r="3"   fill="#6d28d9" opacity="0.6"/>
                                <circle cx={ep.x2} cy={ep.y2} r="2.5" fill="#a78bfa" opacity="0.8"/>
                            </g>
                        );
                    })}

                    {/* engine pulse rings */}
                    <circle cx={CX} cy={CY} fill="none" stroke="#8b5cf6" strokeWidth="1">
                        <animate attributeName="r" values={`${R+4};${R*1.6};${R+4}`} dur="2.8s" repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx={CX} cy={CY} fill="none" stroke="#7c3aed" strokeWidth="1">
                        <animate attributeName="r" values={`${R+4};${R*1.3};${R+4}`} dur="2.8s" begin="0.5s" repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.8s" begin="0.5s" repeatCount="indefinite"/>
                    </circle>

                    {/* engine core */}
                    <circle cx={CX} cy={CY} r={R} fill="#1e0a3c" stroke="#8b5cf6" strokeWidth="2" filter="url(#engGlow)"/>
                    <image href="/bolt.svg" x={CX - 19} y={CY - 19} width="38" height="38"/>

                    {/* exam badge images */}
                    {BADGE_POS.map(bp => (
                        <g key={bp.key}>
                            <rect x={bp.cx - B} y={bp.cy - B} width={B*2} height={B*2}
                                rx="14" fill="#18181b" stroke="rgba(82,82,91,0.55)" strokeWidth="1"/>
                            <image href={bp.src} x={bp.cx - B} y={bp.cy - B} width={B*2} height={B*2}/>
                        </g>
                    ))}

                    {/* subject chips */}
                    {EXAM_TREE.map(exam =>
                        exam.subjects.map((subject, si) => {
                            const cy = exam.ys[si];
                            const x  = exam.chipX;
                            return (
                                <motion.g key={`chip-${exam.badge.key}-${si}`}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 1.0 + si * 0.08 }}
                                >
                                    <rect x={x} y={cy - CH/2} width={CW} height={CH}
                                        rx="7" fill="#27272a" stroke="rgba(82,82,91,0.5)" strokeWidth="1"/>
                                    <image href={subject.icon} x={x+7} y={cy-10} width="20" height="20"/>
                                    <text x={x+33} y={cy} fontSize="11" fill="#d4d4d8"
                                        fontFamily="ui-sans-serif,system-ui,sans-serif"
                                        dominantBaseline="middle"
                                    >{subject.label}</text>
                                    <circle cx={exam.side === 'left' ? x+CW : x} cy={cy}
                                        r="2.5" fill="#7c3aed" opacity="0.7"/>
                                </motion.g>
                            );
                        })
                    )}
                </svg>
            </motion.div>

            {/* Subject tree cards */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {EXAM_TREE.map((exam, colIdx) => (
                        <motion.div
                            key={exam.badge.key}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 + colIdx * 0.1 }}
                            className="surface-raised rounded-2xl p-6 flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-700/60 shrink-0">
                                    <Image src={exam.badge.src} alt={exam.badge.key} width={44} height={44} className="w-full h-full object-cover"/>
                                </div>
                                <span className="font-semibold text-zinc-100 text-base">{exam.badge.key}</span>
                            </div>
                            <div className="ml-5 w-px h-3 bg-violet-500/40"/>
                            <div className="ml-5 border-l border-dashed border-violet-500/30 flex flex-col">
                                {exam.subjects.map((subject, i) => (
                                    <div key={i} className="flex items-center gap-2.5 py-2 pl-4 relative">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-violet-500/25"/>
                                        <div className="w-7 h-7 bg-zinc-800 rounded-lg p-1 shrink-0 ring-1 ring-zinc-700/50">
                                            <Image src={subject.icon} alt={subject.label} width={20} height={20} className="w-full h-full"/>
                                        </div>
                                        <span className="text-sm text-zinc-300 leading-tight">{subject.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};
