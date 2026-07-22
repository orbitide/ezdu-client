'use client';

import { motion, useInView } from 'framer-motion';
import { BookOpen, Brain, Calendar, Clock, GraduationCap, Target, Trophy, Zap } from 'lucide-react';
import React from 'react';
import { Card } from '@/components/ui/card';

export const Features = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const features = [
        { icon: BookOpen, title: 'প্রশ্ন ব্যাংক', description: 'বিষয়ভিত্তিক হাজারো MCQ, নির্বাচিত ও আপডেট করা সেট' },
        { icon: Brain, title: 'বিস্তারিত ব্যাখ্যা', description: 'প্রতিটি প্রশ্নের পেছনের যুক্তি ধাপে ধাপে' },
        { icon: Target, title: 'মক টেস্ট', description: 'সময়সীমা ও ফরম্যাট পরীক্ষার মতো, সাথে সাথে ফল' },
        { icon: Calendar, title: 'ডেইলি টেস্ট', description: 'প্রতিদিন সংক্ষিপ্ত সেট—নিয়মিত থাকার জন্য' },
        { icon: Clock, title: 'সাপ্তাহিক টেস্ট', description: 'সপ্তাহজুড়া পড়ার একক মূল্যায়ন' },
        { icon: Zap, title: 'XP সিস্টেম', description: 'পয়েন্ট ও লেভেল দিয়ে অগ্রগতি দৃশ্যমান' },
        { icon: Trophy, title: 'লিডারবোর্ড', description: 'অন্যদের সাথে তুলনামূলক রেঙ্ক ও অনুপ্রেরণা' },
        { icon: GraduationCap, title: 'লেসন', description: 'বেসিক থেকে এগিয়ে—গুছানো লার্নিং পাথ' },
    ];

    return (
        <section id="features" className="relative scroll-mt-ez-nav overflow-hidden py-20">
            <div className="container mx-auto px-4" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        প্র্যাকটিস থেকে ফলাফল—<span className="text-primary">একই অ্যাপে</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        কী পাবেন: প্রশ্ন, ব্যাখ্যা, টেস্ট আর অগ্রগতির টুল—এক জায়গায় সাজানো
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card className="h-full surface-raised-hover transition-colors duration-300 group cursor-pointer border-border hover:border-ring/40">
                                <div className="w-14 h-14 rounded-xl bg-muted/80 border border-border flex items-center justify-center mb-4 transition-colors group-hover:border-primary/40">
                                    <feature.icon className="text-primary" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
