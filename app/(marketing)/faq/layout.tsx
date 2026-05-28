import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('faq', {
    title: 'FAQ',
    description:
        'Common questions about EzDu: getting started, pricing, AI practice, progress tracking, and subjects covered.',
    keywords: ['EzDu FAQ', 'EzDu help', 'exam app Bangladesh'],
});

export default function FaqLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
