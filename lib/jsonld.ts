import { googlePlayListingUrl } from '@/lib/google-play';

const SITE = 'https://ezdu.net';

export function getRootJsonLd() {
    const playUrl = googlePlayListingUrl();

    const mobileApp: Record<string, unknown> = {
        '@type': 'MobileApplication',
        '@id': `${SITE}/#mobile-app`,
        name: 'EzDu',
        description: 'SSC, HSC, BCS, IELTS পরীক্ষার MCQ প্র্যাকটিস ও mock test অ্যাপ',
        applicationCategory: 'EducationApplication',
        operatingSystem: 'Android, iOS',
        inLanguage: 'bn',
        url: SITE,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'BDT' },
    };
    if (playUrl) {
        mobileApp.downloadUrl = playUrl;
    }

    const sameAs = [
        'https://www.facebook.com/profile.php?id=61585174118847',
        'https://www.instagram.com/ezdu.bd/',
    ];
    if (playUrl) {
        sameAs.push(playUrl);
    }

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${SITE}/#website`,
                name: 'EzDu',
                url: SITE,
                inLanguage: 'bn',
            },
            mobileApp,
            {
                '@type': 'WebApplication',
                '@id': `${SITE}/#web-app`,
                name: 'EzDu Web',
                description: 'SSC, HSC, BCS, IELTS পরীক্ষার MCQ প্র্যাকটিস ও mock test — ব্রাউজারেই করো',
                applicationCategory: 'EducationApplication',
                browserRequirements: 'Requires JavaScript',
                inLanguage: 'bn',
                url: SITE,
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'BDT' },
            },
            {
                '@type': 'Organization',
                '@id': `${SITE}/#organization`,
                name: 'EzDu',
                url: SITE,
                logo: `${SITE}/logo.png`,
                sameAs,
            },
        ],
    };
}

export function getPageJsonLd(slug: string, name: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        '@id': `${SITE}/${slug}/#learning-resource`,
        name,
        description,
        url: `${SITE}/${slug}`,
        inLanguage: 'bn',
        isAccessibleForFree: true,
        provider: {
            '@type': 'Organization',
            '@id': `${SITE}/#organization`,
            name: 'EzDu',
            url: SITE,
        },
    };
}

export function getBreadcrumbJsonLd(slug: string, name: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'EzDu', item: SITE },
            { '@type': 'ListItem', position: 2, name, item: `${SITE}/${slug}` },
        ],
    };
}

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    };
}
