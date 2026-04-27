import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import ExamPageTemplate from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('ssc', {
    title: 'SSC MCQ প্র্যাকটিস ও Mock Test',
    description: 'SSC পরীক্ষার সব বিষয়ে MCQ প্র্যাকটিস, mock test ও previous questions — সম্পূর্ণ বিনামূল্যে। EzDu অ্যাপে প্র্যাকটিস করো।',
    keywords: [
        'SSC MCQ practice', 'SSC mock test', 'এসএসসি প্র্যাকটিস',
        'SSC previous questions', 'SSC exam preparation Bangladesh',
        'এসএসসি মডেল টেস্ট', 'SSC question bank',
    ],
});

const faqs = [
    { question: 'EzDu তে কি SSC mock test দেওয়া যায়?', answer: 'হ্যাঁ, EzDu অ্যাপে SSC-এর সব বিষয়ে AI-powered mock test দেওয়া যায় সম্পূর্ণ বিনামূল্যে।' },
    { question: 'SSC-এর কোন কোন বিষয়ের MCQ পাওয়া যায়?', answer: 'বাংলা, ইংরেজি, গণিত, বিজ্ঞান, সামাজিক বিজ্ঞান সহ SSC-এর সব বিষয়ের MCQ EzDu তে আছে।' },
    { question: 'SSC previous year questions কি EzDu তে আছে?', answer: 'হ্যাঁ, গত কয়েক বছরের SSC board question EzDu অ্যাপে chapter-wise সাজানো আছে।' },
    { question: 'EzDu কি সম্পূর্ণ বিনামূল্যে?', answer: 'হ্যাঁ, EzDu অ্যাপের মূল features সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।' },
];

const pageJsonLd = getPageJsonLd('ssc', 'SSC MCQ প্র্যাকটিস ও Mock Test', 'SSC পরীক্ষার সব বিষয়ে MCQ প্র্যাকটিস ও mock test');
const faqJsonLd = getFaqJsonLd(faqs);
const breadcrumbJsonLd = getBreadcrumbJsonLd('ssc', 'SSC প্রস্তুতি');

export default function SSCPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <ExamPageTemplate config={{
                slug: 'ssc',
                color: 'blue',
                badge: 'SSC প্রস্তুতি',
                badgeIcon: 'graduationCap',
                headline: 'SSC পরীক্ষায় এগিয়ে থাকো',
                subheadline: 'MCQ প্র্যাকটিস · Mock Test · Previous Questions',
                description: 'EzDu অ্যাপে SSC-এর সব বিষয়ে chapter-wise MCQ প্র্যাকটিস করো, full mock test দাও, আর নিজের দুর্বলতা খুঁজে বের করো।',
                stats: [
                    { label: 'MCQ প্রশ্ন', value: '১০,০০০+' },
                    { label: 'বিষয়', value: '১২+' },
                    { label: 'Mock Test', value: '৫০০+' },
                    { label: 'সম্পূর্ণ বিনামূল্যে', valueCheck: true },
                ],
                features: [
                    { icon: 'fileText', title: 'Chapter-wise MCQ', description: 'প্রতিটি অধ্যায় আলাদা করে প্র্যাকটিস করো, দুর্বল জায়গা ধরো।' },
                    { icon: 'flaskConical', title: 'Full Mock Test', description: 'আসল পরীক্ষার মতো সময় ধরে full mock test দাও।' },
                    { icon: 'calendar', title: 'Previous Questions', description: 'গত বছরের board questions chapter-wise সাজানো।' },
                    { icon: 'barChart3', title: 'Performance Analysis', description: 'প্রতিটি test-এর পর বিস্তারিত result ও ভুলের ব্যাখ্যা।' },
                    { icon: 'bot', title: 'AI Mock Test', description: 'AI তোমার দুর্বলতা বুঝে customized প্রশ্ন তৈরি করে।' },
                    { icon: 'trophy', title: 'Leaderboard', description: 'বন্ধুদের সাথে প্রতিযোগিতা করো, এগিয়ে থাকো।' },
                ],
                faqs,
            }} />
        </>
    );
}
