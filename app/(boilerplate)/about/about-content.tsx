'use client';

import { motion } from 'framer-motion';
import { Users, Target, Heart, Zap, Globe, ArrowRight, Code } from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Student-Centric',
        description: 'We put students at the heart of everything we do. Our mission is to make learning accessible, engaging, and effective for every student in Bangladesh.',
    },
    {
        icon: Heart,
        title: 'Passion for Learning',
        description: 'We believe in the transformative power of education. Our team is dedicated to creating tools that inspire curiosity and growth.',
    },
    {
        icon: Zap,
        title: 'Innovation',
        description: 'We constantly push boundaries with cutting-edge AI technology to deliver the best learning experience possible.',
    },
    {
        icon: Globe,
        title: 'Accessibility',
        description: 'We aim to make quality education accessible to every student, regardless of their background or location.',
    },
];

const team = [
    {
        name: 'Founder & CEO',
        role: 'Product & Vision',
        description: 'Leading the vision to transform education through technology and innovation.',
    },
    {
        name: 'Lead Developer',
        role: 'Tech & Engineering',
        description: 'Building robust and scalable solutions with cutting-edge technologies.',
    },
    {
        name: 'Product Manager',
        role: 'Strategy & UX',
        description: 'Crafting intuitive experiences that make learning engaging and effective.',
    },
    {
        name: 'Educational Advisor',
        role: 'Learning Science',
        description: 'Ensuring our platform aligns with best practices in education.',
    },
];

const features = [
    {
        icon: Zap,
        title: 'AI-Powered Questions',
        description: 'Generate unlimited practice questions tailored to any subject.',
    },
    {
        icon: Target,
        title: 'Smart Learning',
        description: 'Adaptive difficulty and personalized learning paths for each student.',
    },
    {
        icon: Users,
        title: 'Community Focused',
        description: 'Built for Bangladeshi students by understanding local education needs.',
    },
];

const highlights = [
    { icon: Users, value: '10K+', label: 'Active Students' },
    { icon: Globe, value: 'All of Bangladesh', label: 'Service Area' },
    { icon: Zap, value: '50K+', label: 'Questions Generated' },
];

export default function AboutContent() {
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
                        <span className="text-zinc-300 text-sm font-medium">About EzDu</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
                    >
                        Learning made simple in{' '}
                        <span className="text-emerald-400">Bangladesh</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-3xl mx-auto"
                    >
                        EzDu is a learning platform that helps students prepare and improve. Thousands of learners
                        across Bangladesh use our tools every day to study more effectively.
                    </motion.p>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {highlights.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-6 rounded-xl surface-raised surface-raised-hover"
                                >
                                    <Icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                                    <div className="text-zinc-500">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-xl surface-raised"
                    >
                        <h2 className="text-4xl font-bold mb-6 text-white">Our mission</h2>
                        <p className="text-lg text-zinc-400 leading-relaxed mb-4">
                            To revolutionize exam preparation in Bangladesh by providing students with an intelligent,
                            personalized learning platform powered by AI. We believe every student deserves access to
                            quality education and effective learning tools, regardless of their background.
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            EzDu combines cutting-edge artificial intelligence with deep understanding of the
                            Bangladeshi education system to create a platform that truly works for our students.
                            We&apos;re actively serving thousands of students and continuously improving our platform
                            based on their feedback.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-12 text-center text-white"
                    >
                        What we <span className="text-emerald-400">offer</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-xl surface-raised surface-raised-hover"
                                >
                                    <Icon className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                    <p className="text-zinc-400">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10 surface-section-muted">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-8 text-white">
                            Our <span className="text-emerald-400">story</span>
                        </h2>
                        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                            <p>
                                EzDu was born from a simple observation: Bangladeshi students were using generic
                                learning platforms that didn&apos;t understand their unique education system and
                                challenges. Our founders recognized an opportunity to build something specifically for
                                our students.
                            </p>
                            <p>
                                We launched EzDu with a clear vision: to leverage artificial intelligence to make exam
                                preparation more personalized, engaging, and effective. Today, we&apos;re proud to have
                                thousands of active students across Bangladesh who are experiencing smarter learning
                                through our platform.
                            </p>
                            <p>
                                Every day, students use EzDu to practice, learn, and prepare for their exams. We&apos;re
                                committed to continuously improving our platform, adding new features, and expanding our
                                reach to serve even more students across the country.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-12 text-center text-white"
                    >
                        Our core <span className="text-emerald-400">values</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-xl surface-raised surface-raised-hover"
                                >
                                    <Icon className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                                    <p className="text-zinc-400">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-12 text-center text-white"
                    >
                        Our <span className="text-emerald-400">team</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-xl surface-raised surface-raised-hover text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 mx-auto mb-4 flex items-center justify-center">
                                    <Code className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                                <div className="text-emerald-400 font-medium text-sm mb-3">{member.role}</div>
                                <p className="text-zinc-400 text-sm">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-xl surface-raised border-emerald-600/20"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Our commitment to Bangladesh</h2>
                        <div className="space-y-4 text-zinc-400">
                            <p>
                                We&apos;re deeply committed to serving the Bangladeshi education market. Our platform is
                                designed with a thorough understanding of the local education system, curriculum
                                requirements, and the unique challenges faced by our students.
                            </p>
                            <p>
                                While we&apos;re focused on Bangladesh, we&apos;re building infrastructure and features
                                that will allow us to eventually expand to serve students across South Asia and beyond.
                                Our goal is to start with excellence in Bangladesh and scale globally.
                            </p>
                        </div>
                    </motion.div>
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
                        <h2 className="text-3xl font-bold text-white mb-4">Join thousands of students</h2>
                        <p className="text-lg text-zinc-400 mb-8">
                            Experience smarter learning. Download EzDu today and transform how you prepare for exams.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all border border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/20 group">
                                Download App
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-3 border-2 border-emerald-500/30 text-emerald-400 rounded-lg font-semibold hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
