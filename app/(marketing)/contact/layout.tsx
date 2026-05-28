import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('contact', {
    title: 'Contact',
    description: 'Contact EzDu for support, partnerships, and general inquiries via email and the channels listed on this page.',
    keywords: ['EzDu contact', 'EzDu support', 'hello@ezdu.net'],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
