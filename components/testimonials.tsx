'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

function initialsFromName(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0] ?? '')
        .join('');
}

export const Testimonials = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const testimonials = [
        {
            name: 'নাফিসা রহমান',
            role: 'SSC পরীক্ষার্থী, ঢাকা',
            rating: 5,
            text: 'অধ্যায়ভিত্তিক MCQ আর মক টেস্ট এক জায়গায় পেয়ে দৈনিক রুটিন ধরে রাখা সহজ হয়েছে। ফলাফল স্ক্রিনে কী ভুল হচ্ছে সেটা স্পষ্ট দেখা যায়।',
        },
        {
            name: 'তানভীর হোসেন',
            role: 'BCS প্রিলি প্রস্তুতি',
            rating: 5,
            text: 'বিষয়ভিত্তিক প্র্যাকটিস আর পূর্ণাঙ্গ মক দিয়ে সময় মেনে চলা অনুশীলন করা যায়। পুরনো প্রশ্ন খুঁজে বের করতে আলাদা অ্যাপ লাগে না।',
        },
        {
            name: 'মিতা চৌধুরী',
            role: 'HSC বিজ্ঞান বিভাগ',
            rating: 5,
            text: 'ডেইলি টেস্ট আর ব্যাখ্যাগুলো সংক্ষিপ্ত কিন্তু কাজের। সপ্তাহিক টেস্ট দিয়ে নিজের অগ্রগতি এক নজরে বোঝা যায়।',
        },
    ];

    return (
        <section id="testimonials" className="py-20 surface-section-muted">
            <div className="container mx-auto px-4" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                        ব্যবহারকারীদের <span className="text-primary">অভিজ্ঞতা</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                        শিক্ষার্থীরা যে কাজগুলোতে EzDu ব্যবহার করছেন—সংক্ষিপ্ত প্রতিক্রিয়া
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15 }}
                        >
                            <Card className="h-full surface-raised-hover transition-colors duration-300 border-border hover:border-ring/40">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted/80 text-sm font-semibold text-foreground"
                                        aria-hidden
                                    >
                                        {initialsFromName(testimonial.name)}
                                    </div>
                                    <div className="min-w-0 text-left">
                                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5`}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                                    ))}
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-[15px]">{testimonial.text}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
