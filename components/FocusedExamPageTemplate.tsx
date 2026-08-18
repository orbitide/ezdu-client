import Image from 'next/image';
import { DownloadButton } from '@/components/ui/download-button';
import { ExamIcon } from '@/lib/exam-icons';
import type { ExamIconName } from '@/lib/exam-icons';

function CheckIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-primary" aria-hidden>
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 9l2.25 2.25 4.75-4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export type FocusedExamPageConfig = {
    slug: 'ssc' | 'hsc' | 'ielts' | 'bcs';
    examName: string;
    kicker: string;
    title: string;
    description: string;
    icon: ExamIconName;
    highlights: { title: string; description: string }[];
    featureHeading: string;
    featureDescription: string;
    features: { title: string; description: string }[];
    steps: { title: string; description: string }[];
    subjectsHeading: string;
    subjectsDescription: string;
    subjects: string[];
    closingTitle: string;
    closingDescription: string;
};

export function FocusedExamPageTemplate({ config }: { config: FocusedExamPageConfig }) {
    return (
        <div className="surface-page min-h-screen">
            <section className="pt-ez-below-nav-lg px-4 pb-16 md:pb-24">
                <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                            <ExamIcon name={config.icon} size={17} />
                            {config.kicker}
                        </div>
                        <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl lg:text-6xl">{config.title}</h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{config.description}</p>
                        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <CheckIcon /> ব্যবহার শুরু করা যায় বিনামূল্যে
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <DownloadButton type="google" />
                            <DownloadButton type="apple" />
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-sm">
                        <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" />
                        <div className="surface-raised relative flex aspect-square items-center justify-center overflow-hidden border-primary p-12">
                            <Image src={`/${config.slug}.svg`} alt={`${config.examName} প্রস্তুতি`} width={240} height={240} className="h-auto w-full max-w-56" priority />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-border surface-section-muted px-4 py-10">
                <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
                    {config.highlights.map((item) => (
                        <div key={item.title} className="surface-raised p-5">
                            <h2 className="text-base text-foreground">{item.title}</h2>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 py-20 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold text-primary">লক্ষ্যভিত্তিক প্রস্তুতি</p>
                        <h2 className="mt-3 text-3xl md:text-4xl">{config.featureHeading}</h2>
                        <p className="mt-4 leading-relaxed text-muted-foreground">{config.featureDescription}</p>
                    </div>
                    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {config.features.map((feature, index) => (
                            <article key={feature.title} className="surface-raised surface-raised-hover p-6">
                                <span className="text-sm font-semibold text-primary">০{index + 1}</span>
                                <h3 className="mt-4 text-lg">{feature.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-border surface-section-muted px-4 py-20 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-primary">সহজ প্রস্তুতি পরিকল্পনা</p>
                        <h2 className="mt-3 text-3xl md:text-4xl">পড়া নয়, নিয়মিত প্র্যাকটিসের অভ্যাস</h2>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {config.steps.map((step, index) => (
                            <div key={step.title} className="text-center">
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{index + 1}</div>
                                <h3 className="mt-5 text-lg">{step.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 md:py-24">
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div>
                        <p className="text-sm font-semibold text-primary">কী কী প্র্যাকটিস করবে</p>
                        <h2 className="mt-3 text-3xl md:text-4xl">{config.subjectsHeading}</h2>
                        <p className="mt-4 leading-relaxed text-muted-foreground">{config.subjectsDescription}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {config.subjects.map((subject) => (
                            <div key={subject} className="surface-raised flex items-center gap-3 px-4 py-3.5">
                                <CheckIcon />
                                <span className="text-sm text-foreground">{subject}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 pb-24">
                <div className="surface-raised mx-auto max-w-5xl overflow-hidden border-primary p-8 text-center md:p-14">
                    <p className="text-sm font-semibold text-primary">EzDu — Pocket Learning Companion</p>
                    <h2 className="mx-auto mt-3 max-w-2xl text-3xl md:text-4xl">{config.closingTitle}</h2>
                    <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">{config.closingDescription}</p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <DownloadButton type="google" />
                        <DownloadButton type="apple" />
                    </div>
                </div>
            </section>
        </div>
    );
}
