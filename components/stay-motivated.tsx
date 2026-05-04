'use client';

import { motion, useInView } from 'framer-motion';
import { Bell, CalendarDays, Flame } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const habits = [
    { icon: Flame, title: 'ডেইলি স্ট্রিক', desc: 'প্রতিদিন পড়লে স্ট্রিক বাড়তে থাকে — একদিনও মিস করো না', color: 'text-orange-400' },
    { icon: CalendarDays, title: 'দৈনিক লক্ষ্য', desc: 'ছোট ছোট টার্গেট সেট করো, প্রতিদিন পূরণ করো', color: 'text-emerald-400' },
    { icon: Bell, title: 'স্মার্ট রিমাইন্ডার', desc: 'তোমার সময়মতো নোটিফিকেশন পাঠাবে Ezdu', color: 'text-sky-400' },
];

export const StayMotivated = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-28 md:py-40">
            <div className="max-w-3xl mx-auto px-6 text-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center mb-14"
                >
                    <Image
                        src="/illustrations/stay-motivated.svg"
                        alt="স্ট্রিক ও দৈনিক লক্ষ্য"
                        width={420}
                        height={340}
                        className="w-full max-w-md"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight mb-6"
                >
                    প্রতিদিন পড়ো,{' '}
                    <span className="text-orange-400">এগিয়ে যাও</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-14"
                >
                    স্ট্রিক সিস্টেম, দৈনিক চ্যালেঞ্জ আর স্মার্ট রিমাইন্ডার দিয়ে পড়ার অভ্যাস গড়ে তোলো। Ezdu তোমার পড়ার সঙ্গী — প্রতিটি দিন।
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid md:grid-cols-3 gap-5"
                >
                    {habits.map(({ icon: Icon, title, desc, color }, i) => (
                        <div key={i} className="surface-raised rounded-2xl p-6 text-left">
                            <Icon className={`${color} mb-3`} size={28} />
                            <div className="text-base font-bold text-zinc-100 mb-2">{title}</div>
                            <div className="text-sm text-zinc-500 leading-relaxed">{desc}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
