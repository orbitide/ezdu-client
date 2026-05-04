'use client';

import Image from 'next/image';

const sparks = [
    { x: '4%',  y: '12%', size: 10, color: 'bg-emerald-400', opacity: 'opacity-60' },
    { x: '12%', y: '72%', size: 7,  color: 'bg-emerald-400', opacity: 'opacity-50' },
    { x: '7%',  y: '44%', size: 5,  color: 'bg-emerald-400', opacity: 'opacity-40' },
    { x: '18%', y: '90%', size: 8,  color: 'bg-amber-400',   opacity: 'opacity-55' },
    { x: '88%', y: '10%', size: 9,  color: 'bg-sky-400',     opacity: 'opacity-55' },
    { x: '94%', y: '55%', size: 7,  color: 'bg-sky-400',     opacity: 'opacity-50' },
    { x: '82%', y: '82%', size: 10, color: 'bg-sky-400',     opacity: 'opacity-50' },
    { x: '96%', y: '30%', size: 5,  color: 'bg-emerald-400', opacity: 'opacity-40' },
    { x: '35%', y: '5%',  size: 6,  color: 'bg-amber-400',   opacity: 'opacity-45' },
    { x: '62%', y: '8%',  size: 5,  color: 'bg-emerald-400', opacity: 'opacity-40' },
    { x: '50%', y: '92%', size: 8,  color: 'bg-amber-400',   opacity: 'opacity-45' },
    { x: '25%', y: '18%', size: 5,  color: 'bg-sky-400',     opacity: 'opacity-40' },
    { x: '76%', y: '22%', size: 5,  color: 'bg-amber-400',   opacity: 'opacity-40' },
];

export const FreeFunEffective = () => {
    return (
        <section className="relative surface-section-muted py-28 md:py-40 overflow-hidden">
            {sparks.map(({ x, y, size, color, opacity }, i) => (
                <span
                    key={i}
                    className={`absolute rounded-full ${color} ${opacity} pointer-events-none`}
                    style={{ left: x, top: y, width: size, height: size }}
                />
            ))}

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
