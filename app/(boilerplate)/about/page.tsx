import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import AboutContent from './about-content';

export const metadata: Metadata = buildMetadata('about', {
    title: 'About EzDu — Pocket Learning Companion',
    description: 'EzDu is an AI-powered learning platform built for Bangladeshi students. SSC, HSC, BCS, and IELTS exam prep — serving thousands of learners across Bangladesh.',
    keywords: ['about EzDu', 'EzDu team', 'EzDu learning platform Bangladesh', 'AI exam prep Bangladesh'],
});

export default function AboutPage() {
    return <AboutContent />;
}
