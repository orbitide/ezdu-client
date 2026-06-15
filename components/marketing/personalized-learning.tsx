'use client';

import { motion, useInView } from 'framer-motion';
import React from 'react';

// ─── SVG coordinate constants ─────────────────────────────────────────────────
const VW = 960;
const VH = 620;
const D  = 280;
const OX = (VW - D) / 2;   // 340
const OY = (VH - D) / 2;   // 170
const CX = VW / 2;          // 480
const CY = VH / 2;          // 310
const B  = 40;               // half-badge
const R  = 40;               // engine radius
const CW = 130;              // chip width
const CH = 28;               // chip height

const BADGE_POS = [
    { key: 'SSC',   src: '/ssc.svg',   cx: OX + B,     cy: OY + B     },  // 380, 210
    { key: 'HSC',   src: '/hsc.svg',   cx: OX + D - B, cy: OY + B     },  // 620, 210
    { key: 'BCS',   src: '/bcs.svg',   cx: OX + B,     cy: OY + D - B },  // 380, 410
    { key: 'IELTS', src: '/ielts.svg', cx: OX + D - B, cy: OY + D - B },  // 620, 410
];

function innerLine(bx: number, by: number) {
    const dx = CX - bx, dy = CY - by;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const gap = 6;
    return {
        x1: bx + (dx / dist) * (B + gap), y1: by + (dy / dist) * (B + gap),
        x2: CX - (dx / dist) * (R + gap), y2: CY - (dy / dist) * (R + gap),
    };
}

// nearest edge point on chip rect to badge
function chipEdge(badgeX: number, badgeY: number, chipCX: number, chipCY: number) {
    const dx = badgeX - chipCX, dy = badgeY - chipCY;
    if (Math.abs(dx) >= Math.abs(dy)) {
        return { x: chipCX + (dx > 0 ? CW / 2 : -CW / 2), y: chipCY };
    }
    return { x: chipCX, y: chipCY + (dy > 0 ? CH / 2 : -CH / 2) };
}

// cubic bezier: leave badge in outward direction, then curve to chip edge
function branchPath(bx: number, by: number, ex: number, ey: number, ouX: number, ouY: number) {
    const cp1x = bx + ouX * 60;
    const cp1y = by + ouY * 60;
    const dx = bx - ex, dy = by - ey;
    const d  = Math.sqrt(dx * dx + dy * dy);
    const pb = Math.min(55, d * 0.45);
    return `M${bx},${by} C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${(ex + (dx / d) * pb).toFixed(1)},${(ey + (dy / d) * pb).toFixed(1)} ${ex},${ey}`;
}

// full light path: engine center → badge → bezier to chip edge
function lightPath(bx: number, by: number, ex: number, ey: number, ouX: number, ouY: number) {
    const cp1x = bx + ouX * 60;
    const cp1y = by + ouY * 60;
    const dx = bx - ex, dy = by - ey;
    const d  = Math.sqrt(dx * dx + dy * dy);
    const pb = Math.min(55, d * 0.45);
    return `M${CX},${CY} L${bx},${by} C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${(ex + (dx / d) * pb).toFixed(1)},${(ey + (dy / d) * pb).toFixed(1)} ${ex},${ey}`;
}

// ─── chip positions (center coords) ──────────────────────────────────────────
type Chip = { icon: string; label: string; cx: number; cy: number };

const EXAM_CHIPS: { badge: typeof BADGE_POS[number]; subjects: Chip[] }[] = [
    {
        badge: BADGE_POS[0],
        subjects: [
            { icon: '/subjects/physics.svg',     label: 'Physics',     cx:  75, cy:  80 },
            { icon: '/subjects/chemistry.svg',   label: 'Chemistry',   cx:  80, cy: 200 },
            { icon: '/subjects/mathematics.svg', label: 'Mathematics', cx: 200, cy:  40 },
            { icon: '/subjects/bangla.svg',      label: 'Bangla',      cx: 310, cy:  80 },
            { icon: '/subjects/english.svg',     label: 'English',     cx: 110, cy: 330 },
            { icon: '/subjects/ict.svg',         label: 'ICT',         cx: 240, cy: 170 },
        ],
    },
    {
        badge: BADGE_POS[1],
        subjects: [
            { icon: '/subjects/buet.svg',      label: 'BUET',      cx: 885, cy:  80 },
            { icon: '/subjects/du-gst.svg',    label: 'DU / GST',  cx: 880, cy: 200 },
            { icon: '/subjects/medical.svg',   label: 'Medical',   cx: 760, cy:  30 },
            { icon: '/subjects/physics.svg',   label: 'Physics',   cx: 650, cy:  90 },
            { icon: '/subjects/chemistry.svg', label: 'Chemistry', cx: 850, cy: 330 },
            { icon: '/subjects/ict.svg',       label: 'ICT',       cx: 730, cy: 165 },
        ],
    },
    {
        badge: BADGE_POS[2],
        subjects: [
            { icon: '/subjects/mcq.svg',      label: 'MCQ',            cx:  75, cy: 470 },
            { icon: '/subjects/gk.svg',       label: 'GK',             cx: 220, cy: 555 },
            { icon: '/subjects/eng-math.svg', label: 'English & Math', cx:  80, cy: 570 },
        ],
    },
    {
        badge: BADGE_POS[3],
        subjects: [
            { icon: '/subjects/listening.svg', label: 'Listening', cx: 885, cy: 470 },
            { icon: '/subjects/reading.svg',   label: 'Reading',   cx: 730, cy: 555 },
            { icon: '/subjects/writing.svg',   label: 'Writing',   cx: 870, cy: 575 },
        ],
    },
];

// deterministic light timing — slow, electricity-passing feel
const DELAYS = [0.0, 0.9, 1.8, 2.7, 0.4, 1.3, 2.2, 3.1, 0.6, 1.5, 2.4, 0.2, 1.1, 2.0, 0.8];
const DURS   = [8.5, 9.8, 7.8, 9.2, 8.8, 7.5, 10.0, 8.2, 9.0, 8.0, 9.6, 8.6, 7.6, 9.4, 8.3];

// ─────────────────────────────────────────────────────────────────────────────

export const PersonalizedLearning = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    // pre-compute all branch data
    let globalIdx = 0;
    const branches = EXAM_CHIPS.flatMap((exam) => {
        const { cx: bx, cy: by } = exam.badge;
        const odx = bx - CX, ody = by - CY;
        const od  = Math.sqrt(odx * odx + ody * ody);
        const ouX = odx / od, ouY = ody / od;
        return exam.subjects.map((chip, si) => {
            const edge   = chipEdge(bx, by, chip.cx, chip.cy);
            const path   = branchPath(bx, by, edge.x, edge.y, ouX, ouY);
            const lightP = lightPath(bx, by, edge.x, edge.y, ouX, ouY);
            const pathId = `br-${exam.badge.key}-${si}`;
            const idx    = globalIdx++;
            return { exam, chip, edge, path, lightP, pathId, si, delay: 0.7 + si * 0.08, pDelay: DELAYS[idx % DELAYS.length], pDur: DURS[idx % DURS.length] };
        });
    });

    return (
        <section className="min-h-screen py-28 flex flex-col justify-center" ref={ref}>

            {/* Heading */}
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24 md:mb-32">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
                >
                    তোমার জন্য{' '}
                    <span className="text-violet-400">কাস্টমাইজড</span> প্র্যাকটিস
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
                >
                    EZDU-র AI তোমার দুর্বল জায়গা বুঝে ঠিক সেখানেই মনোযোগ দেয়। SSC, HSC, BCS বা IELTS — যেটাই হোক, প্র্যাকটিস তোমার মতো করেই সাজানো।
                </motion.p>
            </div>

            {/* ── Connected tree diagram ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28"
            >
                <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-auto" aria-hidden>
                    <defs>
                        {/* inner line gradients */}
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
                        {/* engine glow */}
                        <filter id="engGlow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="5" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        {/* wire light glow */}
                        <filter id="wireGlow" x="-150%" y="-150%" width="400%" height="400%">
                            <feGaussianBlur stdDeviation="1.8" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        {/* define branch paths here for mpath reference */}
                        {branches.map(b => (
                            <path key={`def-${b.pathId}`} id={b.pathId} d={b.path}/>
                        ))}
                    </defs>

                    {/* outer branch lines */}
                    {branches.map(b => (
                        <motion.path key={b.pathId}
                            d={b.path}
                            fill="none"
                            stroke="#7c3aed"
                            strokeOpacity="0.35"
                            strokeWidth="1"
                            strokeDasharray="4 3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.9, delay: b.delay }}
                        />
                    ))}

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

                    {/* engine pulse rings (SVG native animation) */}
                    <circle cx={CX} cy={CY} fill="none" stroke="#8b5cf6" strokeWidth="1">
                        <animate attributeName="r" values={`${R+4};${R*1.65};${R+4}`} dur="2.8s" repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" values="0.55;0;0.55" dur="2.8s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx={CX} cy={CY} fill="none" stroke="#7c3aed" strokeWidth="1">
                        <animate attributeName="r" values={`${R+4};${R*1.3};${R+4}`} dur="2.8s" begin="0.6s" repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.8s" begin="0.6s" repeatCount="indefinite"/>
                    </circle>

                    {/* engine core */}
                    <circle cx={CX} cy={CY} r={R} fill="#1e0a3c" stroke="#8b5cf6" strokeWidth="2" filter="url(#engGlow)"/>
                    <image href="/bolt.svg" x={CX - 19} y={CY - 19} width="38" height="38"/>

                    {/* exam badges */}
                    {BADGE_POS.map(bp => (
                        <g key={bp.key}>
                            <rect x={bp.cx - B} y={bp.cy - B} width={B * 2} height={B * 2}
                                rx="14" fill="#18181b" stroke="rgba(82,82,91,0.55)" strokeWidth="1"/>
                            <image href={bp.src} x={bp.cx - B} y={bp.cy - B} width={B * 2} height={B * 2}/>
                        </g>
                    ))}

                    {/* light pulse travelling inside wire — bolt → outward */}
                    {isInView && branches.map(b => (
                        <path key={`light-${b.pathId}`}
                            d={b.lightP}
                            fill="none"
                            stroke="#ddd6fe"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="8 992"
                            pathLength="1000"
                            filter="url(#wireGlow)"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values="0;-1000"
                                dur={`${b.pDur}s`}
                                begin={`${b.pDelay}s`}
                                repeatCount="indefinite"
                                calcMode="linear"
                            />
                        </path>
                    ))}

                    {/* subject chips */}
                    {branches.map(b => (
                        <motion.g key={`chip-${b.pathId}`}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.4, delay: b.delay + 0.2 }}
                        >
                            <rect
                                x={b.chip.cx - CW / 2} y={b.chip.cy - CH / 2}
                                width={CW} height={CH} rx="7"
                                fill="#27272a" stroke="rgba(82,82,91,0.5)" strokeWidth="1"
                            />
                            <image
                                href={b.chip.icon}
                                x={b.chip.cx - CW / 2 + 7} y={b.chip.cy - 10}
                                width="20" height="20"
                            />
                            <text
                                x={b.chip.cx - CW / 2 + 33} y={b.chip.cy}
                                fontSize="11" fill="#d4d4d8"
                                fontFamily="ui-sans-serif,system-ui,sans-serif"
                                dominantBaseline="middle"
                            >
                                {b.chip.label}
                            </text>
                            {/* dot where line meets chip */}
                            <circle cx={b.edge.x} cy={b.edge.y} r="2.5" fill="#7c3aed" opacity="0.7"/>
                        </motion.g>
                    ))}
                </svg>
            </motion.div>


        </section>
    );
};
