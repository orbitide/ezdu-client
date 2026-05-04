'use client';

import Image from 'next/image';

type Spark =
    | { type: 'star'; x: string; y: string; size: number; color: string; opacity: number; rotate: number }
    | { type: 'dot';  x: string; y: string; size: number; color: string; opacity: number };

const sparks: Spark[] = [
    { type: 'star', x: '4%',  y: '12%', size: 14, color: 'text-emerald-400', opacity: 0.6,  rotate: 20  },
    { type: 'dot',  x: '12%', y: '72%', size: 7,  color: 'bg-emerald-400',   opacity: 0.5  },
    { type: 'star', x: '7%',  y: '44%', size: 9,  color: 'text-emerald-400', opacity: 0.4,  rotate: -30 },
    { type: 'dot',  x: '18%', y: '90%', size: 8,  color: 'bg-amber-400',     opacity: 0.55 },
    { type: 'star', x: '35%', y: '5%',  size: 11, color: 'text-amber-400',   opacity: 0.5,  rotate: 15  },
    { type: 'dot',  x: '62%', y: '7%',  size: 6,  color: 'bg-emerald-400',   opacity: 0.4  },
    { type: 'star', x: '50%', y: '93%', size: 10, color: 'text-amber-400',   opacity: 0.45, rotate: -18 },
    { type: 'dot',  x: '25%', y: '18%', size: 5,  color: 'bg-sky-400',       opacity: 0.4  },
    { type: 'star', x: '88%', y: '10%', size: 13, color: 'text-sky-400',     opacity: 0.55, rotate: 35  },
    { type: 'dot',  x: '94%', y: '55%', size: 7,  color: 'bg-sky-400',       opacity: 0.5  },
    { type: 'star', x: '82%', y: '82%', size: 11, color: 'text-sky-400',     opacity: 0.5,  rotate: -25 },
    { type: 'dot',  x: '96%', y: '30%', size: 5,  color: 'bg-emerald-400',   opacity: 0.4  },
    { type: 'star', x: '76%', y: '22%', size: 9,  color: 'text-amber-400',   opacity: 0.4,  rotate: 40  },
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
    return (
        <section className="relative surface-section-muted py-28 md:py-40 overflow-hidden">
            {sparks.map((s, i) =>
                s.type === 'star' ? (
                    <span key={i} className="absolute pointer-events-none" style={{ left: s.x, top: s.y }}>
                        <StarSparkle size={s.size} color={s.color} opacity={s.opacity} rotate={s.rotate} />
                    </span>
                ) : (
                    <span
                        key={i}
                        className={`absolute rounded-full pointer-events-none ${s.color}`}
                        style={{ left: s.x, top: s.y, width: s.size, height: s.size, opacity: s.opacity }}
                    />
                )
            )}

            <div className="max-w-3xl mx-auto px-6 text-center">
                <div className="flex justify-center mb-14">
                    <Image
                        src="/illustrations/free-fun-effective.svg"
                        alt="Ezdu বিনামূল্যে, মজাদার ও কার্যকর"
                        width={420}
                        height={340}
                        className="w-full max-w-md"
                        priority={false}
                    />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                    <span className="text-emerald-400">বিনামূল্যে।</span>{' '}
                    <span className="text-amber-400">মজাদার।</span>{' '}
                    <span className="text-sky-400">কার্যকর।</span>
                </h2>

                <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
                    Ezdu-তে শেখা মানে গেমের মতো অভিজ্ঞতা — ছোট ছোট সেশন, তাৎক্ষণিক ফিডব্যাক, আর বাস্তব পরীক্ষার প্রস্তুতি। সবই বিনামূল্যে শুরু করো।
                </p>
            </div>
        </section>
    );
};
