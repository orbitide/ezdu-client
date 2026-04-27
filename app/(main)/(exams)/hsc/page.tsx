import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import ExamPageTemplate from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('hsc', {
    title: 'HSC MCQ প্র্যাকটিস ও Mock Test',
    description: 'HSC পরীক্ষার সব বিষয়ে MCQ প্র্যাকটিস, mock test ও previous questions — সম্পূর্ণ বিনামূল্যে। EzDu অ্যাপে প্র্যাকটিস করো।',
    keywords: [
        'HSC MCQ practice', 'HSC mock test', 'এইচএসসি প্র্যাকটিস',
        'HSC previous questions', 'HSC exam preparation Bangladesh',
        'এইচএসসি মডেল টেস্ট', 'HSC question bank',
    ],
});

const faqs = [
    { question: 'EzDu তে কি HSC mock test দেওয়া যায়?', answer: 'হ্যাঁ, EzDu অ্যাপে HSC-এর সব বিষয়ে AI-powered mock test দেওয়া যায় সম্পূর্ণ বিনামূল্যে।' },
    { question: 'HSC-এর বিজ্ঞান বিভাগের MCQ কি পাওয়া যায়?', answer: 'হ্যাঁ, পদার্থ, রসায়ন, জীববিজ্ঞান, উচ্চতর গণিত সহ সব বিজ্ঞান বিভাগের MCQ আছে।' },
    { question: 'HSC previous year questions কি EzDu তে আছে?', answer: 'হ্যাঁ, গত কয়েক বছরের HSC board question EzDu অ্যাপে chapter-wise সাজানো আছে।' },
    { question: 'বাণিজ্য ও মানবিক বিভাগের MCQ কি আছে?', answer: 'হ্যাঁ, তিনটি বিভাগের সব বিষয়ের MCQ EzDu তে পাওয়া যায়।' },
];

const pageJsonLd = getPageJsonLd('hsc', 'HSC MCQ প্র্যাকটিস ও Mock Test', 'HSC পরীক্ষার সব বিষয়ে MCQ প্র্যাকটিস ও mock test');
const faqJsonLd = getFaqJsonLd(faqs);
const breadcrumbJsonLd = getBreadcrumbJsonLd('hsc', 'HSC প্রস্তুতি');

export default function HSCPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <ExamPageTemplate config={{
                slug: 'hsc',
                color: 'green',
                badge: 'HSC প্রস্তুতি',
                badgeIcon: 'graduationCap',
                headline: 'HSC পরীক্ষায় এগিয়ে থাকো',
                subheadline: 'MCQ প্র্যাকটিস · Mock Test · Previous Questions',
                description: 'EzDu অ্যাপে HSC-এর বিজ্ঞান, বাণিজ্য ও মানবিক বিভাগের সব বিষয়ে chapter-wise MCQ প্র্যাকটিস করো এবং full mock test দাও।',
                stats: [
                    { label: 'MCQ প্রশ্ন', value: '১৫,০০০+' },
                    { label: 'বিভাগ', value: '৩টি' },
                    { label: 'Mock Test', value: '৬০০+' },
                    { label: 'সম্পূর্ণ বিনামূল্যে', valueCheck: true },
                ],
                features: [
                    { icon: 'fileText', title: 'Chapter-wise MCQ', description: 'প্রতিটি অধ্যায় আলাদা করে প্র্যাকটিস করো, দুর্বল জায়গা ধরো।' },
                    { icon: 'flaskConical', title: 'Full Mock Test', description: 'আসল পরীক্ষার মতো সময় ধরে full mock test দাও।' },
                    { icon: 'calendar', title: 'Previous Questions', description: 'গত বছরের board questions chapter-wise সাজানো।' },
                    { icon: 'barChart3', title: 'Performance Analysis', description: 'প্রতিটি test-এর পর বিস্তারিত result ও ভুলের ব্যাখ্যা।' },
                    { icon: 'bot', title: 'AI Mock Test', description: 'AI তোমার দুর্বলতা বুঝে customized প্রশ্ন তৈরি করে।' },
                    { icon: 'library', title: 'তিন বিভাগ', description: 'বিজ্ঞান, বাণিজ্য ও মানবিক — সব বিভাগের MCQ এক অ্যাপে।' },
                ],
                faqs,
            }} />
        </>
    );
}
