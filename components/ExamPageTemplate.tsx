import { ExamIcon } from '@/lib/exam-icons';
import type { ExamIconName } from '@/lib/exam-icons';
import { DownloadButton } from '@/components/ui/download-button';

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
            <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export type ExamColor = 'emerald' | 'blue' | 'purple' | 'rose' | 'amber' | 'indigo' | 'cyan' | 'orange' | 'green';

export type ExamPageConfig = {
    slug: string;
    examName: string;
    title: string;
    description: string;
    color: ExamColor;
    icon: ExamIconName;
    stats: { label: string; value: string }[];
    features: { title: string; description: string }[];
    subjects: string[];
};

const COLOR_MAP: Record<ExamColor, {
    accent: string;
    accentBg: string;
    border: string;
    iconBg: string;
    badge: string;
    badgeBorder: string;
    check: string;
}> = {
    emerald: {
        accent: 'text-emerald-400',
        accentBg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
        iconBg: 'bg-emerald-400/10',
        badge: 'text-emerald-300',
        badgeBorder: 'border-emerald-400/20',
        check: 'text-emerald-400',
    },
    blue: {
        accent: 'text-blue-400',
        accentBg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        iconBg: 'bg-blue-400/10',
        badge: 'text-blue-300',
        badgeBorder: 'border-blue-400/20',
        check: 'text-blue-400',
    },
    purple: {
        accent: 'text-purple-400',
        accentBg: 'bg-purple-400/10',
        border: 'border-purple-400/20',
        iconBg: 'bg-purple-400/10',
        badge: 'text-purple-300',
        badgeBorder: 'border-purple-400/20',
        check: 'text-purple-400',
    },
    rose: {
        accent: 'text-rose-400',
        accentBg: 'bg-rose-400/10',
        border: 'border-rose-400/20',
        iconBg: 'bg-rose-400/10',
        badge: 'text-rose-300',
        badgeBorder: 'border-rose-400/20',
        check: 'text-rose-400',
    },
    amber: {
        accent: 'text-amber-400',
        accentBg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        iconBg: 'bg-amber-400/10',
        badge: 'text-amber-300',
        badgeBorder: 'border-amber-400/20',
        check: 'text-amber-400',
    },
    indigo: {
        accent: 'text-indigo-400',
        accentBg: 'bg-indigo-400/10',
        border: 'border-indigo-400/20',
        iconBg: 'bg-indigo-400/10',
        badge: 'text-indigo-300',
        badgeBorder: 'border-indigo-400/20',
        check: 'text-indigo-400',
    },
    cyan: {
        accent: 'text-cyan-400',
        accentBg: 'bg-cyan-400/10',
        border: 'border-cyan-400/20',
        iconBg: 'bg-cyan-400/10',
        badge: 'text-cyan-300',
        badgeBorder: 'border-cyan-400/20',
        check: 'text-cyan-400',
    },
    orange: {
        accent: 'text-orange-400',
        accentBg: 'bg-orange-400/10',
        border: 'border-orange-400/20',
        iconBg: 'bg-orange-400/10',
        badge: 'text-orange-300',
        badgeBorder: 'border-orange-400/20',
        check: 'text-orange-400',
    },
    green: {
        accent: 'text-green-400',
        accentBg: 'bg-green-400/10',
        border: 'border-green-400/20',
        iconBg: 'bg-green-400/10',
        badge: 'text-green-300',
        badgeBorder: 'border-green-400/20',
        check: 'text-green-400',
    },
};

export function ExamPageTemplate({ config }: { config: ExamPageConfig }) {
    const c = COLOR_MAP[config.color];

    return (
        <div className="surface-page min-h-screen">
            {/* Hero */}
            <section className="pt-ez-below-nav-lg pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${c.iconBg} ${c.border} border mb-6`}>
                        <ExamIcon name={config.icon} size={32} className={c.accent} />
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${c.badgeBorder} ${c.accentBg} mb-4`}>
                        <span className={`text-xs font-semibold ${c.badge}`}>{config.examName} প্রস্তুতি</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                        {config.title.split(' ').slice(0, -1).join(' ')}{' '}
                        <span className={c.accent}>{config.title.split(' ').slice(-1)}</span>
                    </h1>

                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        {config.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <DownloadButton type="google" />
                        <DownloadButton type="apple" />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="surface-section-muted border-y border-zinc-800 py-12 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {config.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className={`text-3xl font-bold ${c.accent} mb-1`}>{stat.value}</div>
                            <div className="text-sm text-zinc-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
                        EzDu-তে{' '}
                        <span className={c.accent}>{config.examName} প্রস্তুতি</span> কেন আলাদা
                    </h2>
                    <p className="text-zinc-500 text-center mb-12">
                        শুধু প্রশ্ন না — তোমার দুর্বলতা ধরে ধরে শেখায়
                    </p>

                    <div className="grid md:grid-cols-2 gap-5">
                        {config.features.map((feature) => (
                            <div
                                key={feature.title}
                                className={`surface-raised surface-raised-hover p-6 ${c.border}`}
                            >
                                <h3 className={`font-semibold ${c.accent} mb-2`}>{feature.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section className="surface-section-muted border-t border-zinc-800 py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
                        কোন কোন বিষয় আছে
                    </h2>
                    <p className="text-zinc-500 text-center mb-10">
                        {config.examName} সিলেবাসের সাথে সামঞ্জস্যপূর্ণ
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {config.subjects.map((subject) => (
                            <div
                                key={subject}
                                className="flex items-center gap-3 surface-raised px-4 py-3"
                            >
                                <CheckIcon className={c.check} />
                                <span className="text-sm text-zinc-300">{subject}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        আজই শুরু করো —{' '}
                        <span className={c.accent}>বিনামূল্যে</span>
                    </h2>
                    <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                        {config.examName} পরীক্ষায় ভালো করতে চাইলে এখনই EzDu ডাউনলোড করো। AI তোমার দুর্বলতা চিহ্নিত করে প্রতিদিনের প্র্যাকটিস তৈরি করবে।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <DownloadButton type="google" />
                        <DownloadButton type="apple" />
                    </div>
                </div>
            </section>
        </div>
    );
}
