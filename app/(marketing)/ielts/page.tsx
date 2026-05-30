import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import { ExamPageTemplate } from '@/components/ExamPageTemplate';
import type { ExamPageConfig } from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('ielts', {
    title: 'IELTS প্রস্তুতি',
    description:
        'EzDu-তে IELTS Reading, Listening, Writing ও Speaking প্র্যাকটিস — Bangladeshi শিক্ষার্থীদের জন্য AI-চালিত প্রস্তুতি। Band 6.5 থেকে 7.5 লক্ষ্যে কাজ করো।',
    keywords: [
        'IELTS preparation Bangladesh',
        'IELTS mock test Bangladesh',
        'IELTS band 7 tips',
        'IELTS practice app Bangladesh',
        'IELTS reading listening writing',
        'IELTS vocabulary Bangladesh',
        'study abroad Bangladesh IELTS',
    ],
});

const config: ExamPageConfig = {
    slug: 'ielts',
    examName: 'IELTS',
    title: 'IELTS প্রস্তুতি',
    description:
        'IELTS-এ ভালো band score পেতে দরকার consistent practice এবং সঠিক strategy। EzDu-তে Reading, Listening, Writing, Speaking — চারটি section-এ AI-চালিত প্র্যাকটিস ও mock test।',
    color: 'amber',
    icon: 'globe',
    stats: [
        { value: '৩,০০০+', label: 'Practice প্রশ্ন' },
        { value: '৪টি', label: 'Section কভারেজ' },
        { value: 'Band 5–8', label: 'লক্ষ্যমাত্রা' },
        { value: 'AI', label: 'Personalized practice' },
    ],
    features: [
        {
            title: 'Reading Practice',
            description: 'Academic ও General Training উভয় format-এ passage reading ও question practice।',
        },
        {
            title: 'Listening Exercises',
            description: 'Real exam-এর মতো audio-based questions — concentration ও note-taking skill develop করো।',
        },
        {
            title: 'Vocabulary Building',
            description: 'IELTS-এ বারবার আসা high-frequency words — context-based learning ও spaced repetition।',
        },
        {
            title: 'Writing Task 1 ও 2',
            description: 'Graph description, letter writing ও essay structure — AI feedback দিয়ে নিজের লেখা উন্নত করো।',
        },
        {
            title: 'Grammar Accuracy',
            description: 'Band score-এ grammar-এর ভূমিকা অনেক বড় — targeted grammar drills দিয়ে ভুল কমাও।',
        },
        {
            title: 'Band Score Prediction',
            description: 'প্র্যাকটিস session-এর ভিত্তিতে তোমার বর্তমান level এবং কোথায় উন্নতি দরকার তা AI বলে দেয়।',
        },
    ],
    subjects: [
        'Reading — Academic',
        'Reading — General Training',
        'Listening',
        'Writing Task 1',
        'Writing Task 2',
        'Vocabulary (High-frequency)',
        'Grammar for IELTS',
        'Speaking Topics',
    ],
};

const jsonLd = getPageJsonLd(
    'ielts',
    'IELTS প্রস্তুতি — EzDu',
    'IELTS Reading, Listening, Writing, Speaking practice — Bangladeshi শিক্ষার্থীদের জন্য AI-চালিত প্রস্তুতি।'
);
const breadcrumb = getBreadcrumbJsonLd('ielts', 'IELTS প্রস্তুতি');

export default function IeltsPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <ExamPageTemplate config={config} />
        </>
    );
}
