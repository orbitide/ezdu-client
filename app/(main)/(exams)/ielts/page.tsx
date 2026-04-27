import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import ExamPageTemplate from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('ielts', {
    title: 'IELTS Mock Test ও প্র্যাকটিস',
    description: 'IELTS Reading, Listening, Writing ও Speaking প্র্যাকটিস — AI-powered mock test দাও EzDu অ্যাপে। সম্পূর্ণ বিনামূল্যে।',
    keywords: [
        'IELTS mock test', 'IELTS practice Bangladesh', 'আইইএলটিএস প্র্যাকটিস',
        'IELTS reading practice', 'IELTS listening test', 'IELTS preparation app',
        'IELTS question bank Bangladesh',
    ],
});

const faqs = [
    { question: 'EzDu তে কি IELTS mock test দেওয়া যায়?', answer: 'হ্যাঁ, EzDu অ্যাপে IELTS Reading ও Listening-এর AI-powered mock test দেওয়া যায় বিনামূল্যে।' },
    { question: 'IELTS-এর কোন sections-এর প্র্যাকটিস পাওয়া যায়?', answer: 'Reading, Listening, এবং vocabulary building — এই তিনটি section-এর practice EzDu তে আছে।' },
    { question: 'IELTS-এর target band score কি track করা যায়?', answer: 'হ্যাঁ, প্রতিটি mock test-এর পর estimated band score দেখা যায়।' },
    { question: 'Academic ও General IELTS দুটোর জন্যই কি প্র্যাকটিস আছে?', answer: 'হ্যাঁ, Academic ও General Training দুই ধরনের প্রশ্নই EzDu তে পাওয়া যায়।' },
];

const pageJsonLd = getPageJsonLd('ielts', 'IELTS Mock Test ও প্র্যাকটিস', 'IELTS Reading, Listening ও vocabulary প্র্যাকটিস');
const faqJsonLd = getFaqJsonLd(faqs);
const breadcrumbJsonLd = getBreadcrumbJsonLd('ielts', 'IELTS প্রস্তুতি');

export default function IELTSPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <ExamPageTemplate config={{
                slug: 'ielts',
                color: 'purple',
                badge: 'IELTS প্রস্তুতি',
                badgeIcon: 'globe',
                headline: 'IELTS-এ ভালো band score পাও',
                subheadline: 'Reading · Listening · Vocabulary · Mock Test',
                description: 'EzDu অ্যাপে IELTS Reading ও Listening mock test দাও, vocabulary শক্তিশালী করো, আর band score track করো।',
                stats: [
                    { label: 'প্র্যাকটিস প্রশ্ন', value: '৫,০০০+' },
                    { label: 'মক টেস্ট', value: '২০০+' },
                    { label: 'ভোকাবুলারি সেট', value: '১০০+' },
                    { label: 'সম্পূর্ণ বিনামূল্যে', valueCheck: true },
                ],
                features: [
                    { icon: 'bookOpen', title: 'Reading Practice', description: 'Academic ও General reading passages দিয়ে প্র্যাকটিস।' },
                    { icon: 'headphones', title: 'Listening Mock Test', description: 'IELTS-style listening questions দিয়ে mock test।' },
                    { icon: 'library', title: 'Vocabulary Builder', description: 'IELTS-এর জন্য দরকারি words flashcard দিয়ে শেখো।' },
                    { icon: 'barChart3', title: 'Band Score Tracker', description: 'প্রতিটি test-এ estimated band score দেখো।' },
                    { icon: 'bot', title: 'AI Practice Sets', description: 'AI তোমার দুর্বল area থেকে প্রশ্ন বেছে দেয়।' },
                    { icon: 'repeat', title: 'Daily Practice', description: 'প্রতিদিনের ছোট practice set — ধারাবাহিকতা বজায় রাখো।' },
                ],
                faqs,
            }} />
        </>
    );
}
