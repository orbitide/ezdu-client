'use client';

import { motion } from 'framer-motion';
import { Users, Target, Heart, Zap, TrendingUp, Globe, Award, Sparkles } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: '100K+',
        label: 'Active Students',
    },
    {
        icon: Globe,
        value: '50+',
        label: 'Countries',
    },
    {
        icon: TrendingUp,
        value: '500K+',
        label: 'Questions Solved',
    },
    {
        icon: Award,
        value: '4.8★',
        label: 'App Rating',
    },
];

const values = [
    {
        icon: Target,
        title: 'Student-Centric',
        description: 'We put students at the heart of everything we do. Our mission is to make learning accessible, engaging, and effective for everyone.',
    },
    {
        icon: Heart,
        title: 'Passion for Learning',
        description: 'We believe in the transformative power of education. Our team is dedicated to creating tools that inspire curiosity and growth.',
    },
    {
        icon: Zap,
        title: 'Innovation',
        description: 'We constantly push boundaries with cutting-edge technology to deliver the best learning experience possible.',
    },
    {
        icon: Globe,
        title: 'Global Impact',
        description: 'We aim to make quality education accessible to students around the world, breaking down barriers to learning.',
    },
];

const team = [
    {
        name: 'Sarah Chen',
        role: 'Co-Founder & CEO',
        description: 'Former EdTech entrepreneur with 10+ years of experience in education technology.',
    },
    {
        name: 'Michael Rodriguez',
        role: 'Co-Founder & CTO',
        description: 'AI researcher and full-stack developer passionate about personalized learning.',
    },
    {
        name: 'Emily Watson',
        role: 'Head of Product',
        description: 'Product strategist focused on creating intuitive user experiences for students.',
    },
    {
        name: 'James Park',
        role: 'Head of Education',
        description: 'Former teacher and curriculum designer with expertise in learning science.',
    },
];

const milestones = [
    {
        year: '2021',
        title: 'Founded EzDu',
        description: 'Started with a vision to make learning smarter and more accessible.',
    },
    {
        year: '2022',
        title: 'First 10K Users',
        description: 'Reached our initial community milestone and began expanding globally.',
    },
    {
        year: '2023',
        title: 'Series A Funding',
        description: 'Raised $5M to accelerate growth and product development.',
    },
    {
        year: '2024',
        title: '100K+ Users Milestone',
        description: 'Achieved a major milestone with students across 50+ countries.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black text-gray-100 overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6"
                    >
                        <Sparkles size={16} className="text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium">Our Story</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
                    >
                        About EzDu
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
                    >
                        We&apos;re on a mission to transform education through AI-powered learning. Making education smarter, engaging, and accessible for everyone.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-emerald-500/20 hover:border-emerald-500/50 transition-all"
                                >
                                    <Icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                EzDu was born from a simple realization: traditional learning methods weren&apos;t working for everyone. We saw students struggling to find personalized learning experiences and teachers overwhelmed with assessment demands.
                            </p>
                            <p>
                                Our founders—educators and technologists themselves—decided to build a solution that combines AI-powered question generation, gamified learning, and adaptive difficulty to create a truly personalized learning journey for every student.
                            </p>
                            <p>
                                Today, EzDu is used by over 100,000 students across 50+ countries. We&apos;re proud to be helping students learn smarter, not harder, and we&apos;re just getting started.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10 bg-neutral-900/30">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
                    >
                        Our Values
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
                                    className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-emerald-500/20 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10"
                                >
                                    <Icon className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                                    <p className="text-gray-400">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Milestones Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
                    >
                        Our Journey
                    </motion.h2>

                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex gap-8 items-start"
                            >
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                                        <span className="text-emerald-400 font-bold">{index + 1}</span>
                                    </div>
                                </div>
                                <div className="flex-1 p-6 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-emerald-500/50 transition-all">
                                    <div className="text-emerald-400 font-bold text-lg mb-2">{milestone.year}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                                    <p className="text-gray-400">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"
                    >
                        Leadership Team
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-emerald-500/20 hover:border-emerald-500/50 transition-all text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mx-auto mb-4 flex items-center justify-center">
                                    <Users className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                                <div className="text-emerald-400 font-medium text-sm mb-3">{member.role}</div>
                                <p className="text-gray-400 text-sm">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center p-12 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
                        <p className="text-lg text-gray-400 mb-8">
                            Be part of a team transforming education. We&apos;re always looking for passionate individuals to join us.
                        </p>
                        <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all border border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/20">
                            View Open Positions
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}