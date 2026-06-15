import type { Metadata } from 'next';

const BASE_URL = 'https://ezdu.net';

type PageMeta = {
    title: string;
    description: string;
    keywords?: string[];
};

export function buildMetadata(slug: string, meta: PageMeta): Metadata {
    const url = `${BASE_URL}/${slug}`;

    return {
        title: `${meta.title} — EZDU`,
        description: meta.description,
        keywords: meta.keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${meta.title} — EZDU`,
            description: meta.description,
            url,
            siteName: 'EZDU',
            locale: 'bn_BD',
            alternateLocale: ['en_US'],
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: `${meta.title} — EZDU`,
            description: meta.description,
        },
    };
}
