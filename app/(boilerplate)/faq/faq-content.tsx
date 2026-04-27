'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

type Faq = { question: string; answer: string };

export default function FaqContent({ faqs }: { faqs: Faq[] }) {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen surface-page overflow-hidden">
            <div
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
                aria-hidden
            >
                <div className="absolute top-1/2 left-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-3xl" />
            </div>

            <section className="relative z-10 px-4 pb-16 pt-ez-below-nav sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="badge-live inline-flex items-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 mb-6"
                    >
                        <span className="live-dot" aria-hidden>
                            <span className="live-dot-inner" />
                        </span>
                        <span className="text-zinc-300 text-sm font-medium">faq</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight"
                    >
                        সচরাচর{' '}
                        <span className="text-emerald-400">জিজ্ঞাসা</span>
                    </motion.h1>
                </div>
            </section>

            <section
                id="faqs"
                className="relative z-10 scroll-mt-ez-nav px-4 py-16 sm:px-6 lg:px-8"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="rounded-xl surface-raised surface-raised-hover overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full p-6 flex items-start justify-between gap-4 text-left"
                                >
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                                            <MessageSquare className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                            {faq.question}
                                        </h2>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight className="w-5 h-5 text-emerald-400" />
                                    </motion.div>
                                </button>

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: expandedFaq === index ? 'auto' : 0,
                                        opacity: expandedFaq === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 text-zinc-400 border-t border-zinc-800">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center p-12 rounded-xl surface-raised border-emerald-600/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">উত্তর পাওনি?</h2>
                        <p className="text-zinc-400 mb-8">
                            দ্বিধা করো না - আমাদের লিখো, আমরা রিপ্লাই দেব।
                        </p>
                        <Link
                            href="mailto:support@ezdu.net"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all border border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/20 group"
                        >
                            ইমেইল করো
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
