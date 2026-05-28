'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Briefcase, Users, TrendingUp, Zap } from 'lucide-react';

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    level: 'Entry' | 'Mid' | 'Senior' | 'Intern';
    description: string;
    salary?: string;
    link?: string;
}

const jobListings: Job[] = [
    {
        id: '1',
        title: 'Senior React & Next.js Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        level: 'Senior',
        salary: '40k – 120k/month',
        description: 'Lead our frontend initiatives using React and Next.js, building scalable and performant web applications.',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSf6_TRP5R5QXZw9-v9eladzOosA2lTOFjNoEbeNtDFHrZ844g/viewform?usp=preview'
    },
    {
        id: '2',
        title: 'Product Manager Intern',
        department: 'Product',
        location: 'Remote',
        type: 'Internship',
        level: 'Intern',
        salary: '8k – 15k/month',
        description: 'Support product strategy, gather insights, and assist in delivering innovative learning tools.',
    },
    {
        id: '3',
        title: 'Software Engineer Intern',
        department: 'Engineering',
        location: 'Remote',
        type: 'Internship',
        level: 'Intern',
        salary: '6k – 12k/month',
        description: 'Work with our engineering team to build features across web and mobile platforms.',
    },
    {
        id: '4',
        title: 'Software Engineer (Flutter)',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        level: 'Entry',
        salary: '30k – 50k/month',
        description: 'Develop and maintain cross-platform mobile applications with Flutter, delivering smooth and intuitive experiences.',
    },
    {
        id: '5',
        title: 'Software Engineer (C#/.NET)',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '40k – 70k/month',
        description: 'Build backend services and APIs using C# and .NET technologies for our web and mobile applications.',
    },
    {
        id: '6',
        title: 'Marketing Manager',
        department: 'Marketing',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '35k – 60k/month',
        description: 'Lead marketing campaigns, user acquisition strategies, and brand growth initiatives for EzDu.',
    },
    {
        id: '7',
        title: 'Data Analyst',
        department: 'Data',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '25k – 50k/month',
        description: 'Analyze platform data, track key metrics, and provide actionable insights to improve learning outcomes.',
    },
    {
        id: '8',
        title: 'Data Entry Specialist',
        department: 'Operations',
        location: 'Remote',
        type: 'Full-time',
        level: 'Entry',
        salary: '10k – 20k/month',
        description: 'Assist in organizing, entering, and maintaining data accurately for our learning platform.',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfUdzkKnKty4qsjAHM3myppeT7AiW-5WcRUu_xhzsdtAWOHFw/viewform?usp=dialog'
    },
    {
        id: '9',
        title: 'Content Specialist',
        department: 'Content & Curriculum',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '20k – 40k/month',
        description: 'Create and review high-quality educational content aligned with our learning modules.',
    },
    {
        id: '10',
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '30k – 50k/month',
        description: 'Design engaging and intuitive user interfaces for web and mobile applications to enhance learner experience.',
    },
    {
        id: '11',
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '40k – 70k/month',
        description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure scalable and secure application deployments.',
    },
    {
        id: '12',
        title: 'QA Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        salary: '25k – 45k/month',
        description: 'Test and ensure the quality of our web and mobile applications, reporting issues and suggesting improvements.',
    }
];


const benefits = [
    {
        icon: TrendingUp,
        title: 'Career Growth',
        description: 'Continuous learning and professional development opportunities.',
    },
    {
        icon: Zap,
        title: 'Cutting Edge Tech',
        description: 'Work with modern technologies and innovative solutions.',
    },
    {
        icon: Users,
        title: 'Amazing Team',
        description: 'Join a collaborative and diverse team of talented professionals.',
    },
];

export default function CareerPage() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    const filteredJobs = jobListings.filter((job) => {
        if (selectedLevel && job.level !== selectedLevel) return false;
        if (selectedDepartment && job.department !== selectedDepartment) return false;
        return true;
    });

    const departments = Array.from(new Set(jobListings.map((job) => job.department)));
    const levels = ['Entry', 'Mid', 'Senior'];

    const handleExploreClick = () => {
        setTimeout(() => {
            const element = document.getElementById('positions-section');
            if (element) {
                element.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }, 100);
    };

    return (
        <main className="min-h-screen surface-page overflow-hidden">
            <div
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
                aria-hidden
            >
                <div className="absolute top-1/2 left-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-3xl" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 px-4 pb-12 pt-ez-below-nav sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight"
                    >
                        Join our <span className="text-emerald-400">team</span>
                    </motion.h1>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                        className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-8"
                    >
                        At ezdu, we’re rethinking how people grow and achieve. If you enjoy creating meaningful products
                        that solve real challenges, you’ll find your place here.
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.4}}
                        className="flex gap-4 justify-center flex-wrap"
                    >
                        <button
                            onClick={handleExploreClick}
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all border border-emerald-500/30 hover:border-emerald-500/60 group hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
                        >
                            Explore Positions
                        </button>
                        <button
                            className="px-8 py-3 border-2 border-emerald-500/30 text-emerald-400 rounded-lg font-semibold hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all">
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="text-3xl font-bold mb-12 text-center text-white"
                    >
                        Why join <span className="text-emerald-400">us</span>?
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: index * 0.2}}
                                    viewport={{once: true}}
                                    className="p-8 rounded-xl surface-raised surface-raised-hover"
                                >
                                    <Icon className="w-12 h-12 text-emerald-400 mb-4"/>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-zinc-400">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10" id="positions-section">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="text-3xl font-bold mb-8 text-white"
                    >
                        Open <span className="text-emerald-400">positions</span>
                    </motion.h2>

                    {/* Filters */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="mb-8 flex flex-wrap gap-4"
                    >
                        {/* Department Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedDepartment(null)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                                    selectedDepartment === null
                                        ? 'bg-emerald-600 text-white border border-emerald-500'
                                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                                }`}
                            >
                                All Departments
                            </button>
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                                        selectedDepartment === dept
                                            ? 'bg-emerald-600 text-white border border-emerald-500'
                                            : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                                    }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>

                        {/* Level Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedLevel(null)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                                    selectedLevel === null
                                        ? 'bg-emerald-600 text-white border border-emerald-500'
                                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                                }`}
                            >
                                All Levels
                            </button>
                            {levels.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                                        selectedLevel === level
                                            ? 'bg-emerald-600 text-white border border-emerald-500'
                                            : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Jobs Grid */}
                    <div className="grid gap-4">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                    viewport={{once: true}}
                                >
                                    <Link href={job.link ?? '#'} target='_blank'>
                                        <div
                                            className="group p-6 surface-raised surface-raised-hover cursor-pointer">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30">
                                                            <Briefcase className="w-4 h-4"/>
                                                            {job.type}
                                                        </span>
                                                        <span
                                                            className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm font-medium border border-zinc-700">
                                                            {job.level}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ChevronRight
                                                    className="w-6 h-6 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"/>
                                            </div>

                                            <p className="text-zinc-400 mb-4">
                                                {job.description}
                                            </p>

                                            <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-emerald-400"/>
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {job.salary && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-emerald-400">{job.salary}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                className="text-center py-12"
                            >
                                <p className="text-lg text-zinc-500">
                                    No positions match your filters. Please try adjusting your selection.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="text-center p-12 rounded-xl surface-raised border-emerald-600/20"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Don&apos;t see the right position?
                        </h2>
                        <p className="text-lg text-zinc-400 mb-6">
                            Send us your resume and let us know how you&apos;d like to contribute to our team.
                        </p>
                        <button
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all border border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/20">
                            Submit Your Profile
                        </button>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}