'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import Image from 'next/image';
import { DownloadButton } from '@/components/ui/download-button';

export const Hero = () => {
    const reduceMotion = useReducedMotion();
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-ez-below-nav">
            <div className="container mx-auto xl:w-7xl px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="badge-live inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-2 mb-6"
                    >
                        <span className="live-dot" aria-hidden>
                            <span className="live-dot-inner" />
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">লক্ষ্যের পথে তোমার সঙ্গী</span>
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6 text-foreground">
                        <span className="block">শেখো প্রতিদিন,</span>
                        <span className="block text-primary">জিতো প্রতিবার</span>
                    </h1>

                    <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
                        EzDu-তে জাতীয় কারিকুলামভিত্তিক MCQ প্র্যাকটিস, সময়সীমাসহ মক টেস্ট, ধাপে ধাপে ব্যাখ্যা আর অগ্রগতির
                        সারাংশ—এক অ্যাপে। ফোনে ইনস্টল করে আজই প্রথম সেট শুরু করতে পারো।
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <DownloadButton type="apple" className="border-2 cursor-pointer" />
                        <DownloadButton type="google" className="border-2 cursor-pointer" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="relative z-10">
                        <div className="w-full max-w-[390px] min-w-[280px] min-h-[500px] md:max-w-[280px] mx-auto">
                            <Image
                                src="/ss.png"
                                alt="EzDu App"
                                width={390}
                                height={900}
                                className="w-full min-h-[500px] rounded-3xl shadow-2xl object-cover"
                            />
                        </div>
                    </div>

                    <motion.div
                        className="absolute top-6 -left-8 surface-raised border-border p-4 shadow-lg"
                        animate={reduceMotion ? { y: 0 } : { y: [0, -5, 0] }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : {
                                      duration: 5,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                  }
                        }
                    >
                        <div className="mb-2 inline-block text-primary">
                            <Trophy size={20} />
                        </div>
                        <div className="text-sm font-semibold text-foreground">Top 10%</div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-6 -right-8 surface-raised border-border p-4 shadow-lg"
                        animate={reduceMotion ? { y: 0 } : { y: [0, 5, 0] }}
                        transition={
                            reduceMotion
                                ? { duration: 0 }
                                : {
                                      duration: 5.5,
                                      repeat: Infinity,
                                      ease: 'easeInOut',
                                      delay: 0.4,
                                  }
                        }
                    >
                        <div className="mb-2 inline-block text-primary">
                            <Award size={20} />
                        </div>
                        <div className="text-sm font-semibold text-foreground">5 Badges</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
