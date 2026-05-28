import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('career', {
    title: 'Careers',
    description: 'Open roles and career opportunities at EzDu — building learning tools for students in Bangladesh.',
    keywords: ['EzDu careers', 'edtech jobs Bangladesh', 'EzDu jobs'],
});

export default function CareerLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
