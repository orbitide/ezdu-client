'use client';

import { motion, useInView } from 'framer-motion';
import React from 'react';
import { BookOpen, Target, TrendingUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const EdtechModules = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const modules = [
        {
            title: 'গোছানো লেসন',
            description: 'বিষয়ভিত্তিক ইউনিট—শুরু থেকে এগিয়ে যাওয়ার ধাপ',
            icon: BookOpen,
        },
        {
            title: 'প্র্যাকটিস মোড',
            description: 'ফলাফল অনুযায়ী পরের সেট—নিজের গতিতে যতক্ষণ লাগে',
            icon: Target,
        },
        {
            title: 'স্ট্রিক সিস্টেম',
            description: 'প্রতিদিন ধারাবাহিকতা দেখানো আর ছোট পুরস্কার',
            icon: TrendingUp,
        },
        {
            title: 'এক্সপি রিওয়ার্ড',
            description: 'পয়েন্ট জমিয়ে লেভেল ও অ্যাচিভমেন্ট আনলক',
            icon: Zap,
        },
    ];

    return (
        <section id="modules" className="py-20 surface-section-muted">
            <div className="container mx-auto px-4" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        লার্নিং <span className="text-primary">মডিউলস</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        লেসন, প্র্যাকটিস ও অগ্রগতি—একই অ্যাপে কীভাবে জুড়ে দেওয়া হয়েছে
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Card className="h-full surface-raised-hover transition-colors duration-300 border-border hover:border-ring/40">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-muted/80 border border-border flex items-center justify-center flex-shrink-0 transition-colors hover:border-primary/35">
                                        <module.icon className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{module.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{module.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
