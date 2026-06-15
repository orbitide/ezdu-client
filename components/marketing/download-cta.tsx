'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { DownloadButton } from '@/components/ui/download-button';

export const DownloadCTA = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="border-t border-primary/10 min-h-screen py-28 flex items-center overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 text-center w-full" ref={ref}>

                {/* Phone cluster */}
                <div className="flex justify-center mb-28">
                    <div className="relative flex items-end justify-center h-[700px] w-full max-w-[640px]">

                        {/* Left phone (history) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30, y: 20 }}
                            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="absolute left-0 bottom-0 w-60 -rotate-[10deg] origin-bottom opacity-80 z-0"
                        >
                            <Image
                                src="/history.png"
                                alt="EZDU অ্যাপ — ইতিহাস"
                                width={390}
                                height={844}
                                className="w-full drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Right phone (profile) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30, y: 20 }}
                            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="absolute right-0 bottom-0 w-60 rotate-[10deg] origin-bottom opacity-80 z-0"
                        >
                            <Image
                                src="/profile.png"
                                alt="EZDU অ্যাপ — প্রোফাইল"
                                width={390}
                                height={844}
                                className="w-full drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Center phone (home) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative z-10 w-72"
                        >
                            <Image
                                src="/home.png"
                                alt="EZDU অ্যাপ — হোম"
                                width={390}
                                height={844}
                                className="w-full drop-shadow-2xl"
                            />
                        </motion.div>

                    </div>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6"
                >
                    যেকোনো সময়,{' '}
                    <span className="text-primary">যেকোনো জায়গায়</span> প্র্যাকটিস করো
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6"
                >
                    যানজটে, বিরতিতে, বা ঘুমানোর আগে — EZDU সবসময় তোমার পকেটে। iOS ও Android — দুটোতেই পাওয়া যায়।
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
                >
                    <DownloadButton type="apple" />
                    <DownloadButton type="google" />
                </motion.div>

            </div>
        </section>
    );
};
