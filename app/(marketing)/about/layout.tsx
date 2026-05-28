import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('about', {
    title: 'About EzDu',
    description:
        'EzDu helps students in Bangladesh prepare for SSC, HSC, BCS, IELTS, and more with AI-powered practice, mock tests, and progress tracking.',
    keywords: ['EzDu', 'edtech Bangladesh', 'exam preparation', 'SSC HSC BCS'],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
