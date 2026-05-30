import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import { ExamPageTemplate } from '@/components/ExamPageTemplate';
import type { ExamPageConfig } from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('ssc', {
    title: 'SSC পরীক্ষার প্রস্তুতি',
    description:
        'EzDu-তে SSC পরীক্ষার MCQ প্র্যাকটিস, মক টেস্ট ও AI ব্যাখ্যা — বাংলাদেশ বোর্ড কারিকুলাম অনুযায়ী। গণিত, বিজ্ঞান, বাংলা, ইংরেজিসহ সব বিষয়।',
    keywords: [
        'SSC preparation Bangladesh',
        'SSC exam app',
        'SSC MCQ practice',
        'SSC গণিত প্রস্তুতি',
        'SSC model test',
        'SSC previous questions',
        'মাধ্যমিক পরীক্ষার প্রস্তুতি',
        'SSC board exam Bangladesh',
    ],
});

const config: ExamPageConfig = {
    slug: 'ssc',
    examName: 'SSC',
    title: 'SSC পরীক্ষার প্রস্তুতি',
    description:
        'বাংলাদেশ মাধ্যমিক শিক্ষা বোর্ডের SSC পরীক্ষার জন্য AI-চালিত MCQ প্র্যাকটিস, মক টেস্ট ও বিষয়ভিত্তিক প্রশ্ন সমাধান — এক অ্যাপে। বোর্ড কারিকুলামভিত্তিক প্রশ্ন, ধাপে ধাপে ব্যাখ্যা, আর AI যা তোমার দুর্বলতা বুঝে প্রশ্ন বেছে দেয়।',
    color: 'emerald',
    icon: 'graduation-cap',
    stats: [
        { value: '৫,০০০+', label: 'MCQ প্রশ্ন' },
        { value: '১০+', label: 'বিষয়' },
        { value: '৩০+', label: 'অধ্যায়' },
        { value: '১০০%', label: 'বোর্ড কারিকুলাম' },
    ],
    features: [
        {
            title: 'AI-চালিত ব্যাখ্যা',
            description: 'প্রতিটি ভুল উত্তরের পর ধাপে ধাপে ব্যাখ্যা পাও — শিক্ষকের মতো, যেকোনো সময়।',
        },
        {
            title: 'বিষয়ভিত্তিক প্র্যাকটিস',
            description: 'গণিত, বিজ্ঞান, বাংলা, ইংরেজিসহ সব বিষয় আলাদা করে প্র্যাকটিস করো।',
        },
        {
            title: 'সময়সীমাসহ মক টেস্ট',
            description: 'আসল SSC পরীক্ষার মতো সময় ধরে মক টেস্ট দাও — পরীক্ষার হলের চাপে অভ্যস্ত হও।',
        },
        {
            title: 'অগ্রগতি ট্র্যাকিং',
            description: 'কোন অধ্যায়ে কতটা দুর্বল তা সঙ্গে সঙ্গে জানো। AI weakness চিহ্নিত করে।',
        },
        {
            title: 'পূর্ববর্তী বোর্ড প্রশ্ন',
            description: 'বিগত বছরের বোর্ড প্রশ্ন সমাধান করো — সবচেয়ে বেশি পরীক্ষায় আসা টপিক চেনো।',
        },
        {
            title: 'প্রতিদিনের AI রিভিশন',
            description: 'AI নিজে থেকে তোমার দুর্বল টপিকের প্রশ্ন বেছে দেয় — আলাদা ভাবতে হয় না।',
        },
    ],
    subjects: [
        'বাংলা ১ম পত্র',
        'বাংলা ২য় পত্র',
        'ইংরেজি ১ম পত্র',
        'ইংরেজি ২য় পত্র',
        'গণিত',
        'পদার্থবিজ্ঞান',
        'রসায়ন',
        'জীববিজ্ঞান',
        'তথ্য ও যোগাযোগ প্রযুক্তি',
        'বাংলাদেশ ও বিশ্বপরিচয়',
        'ইতিহাস ও বিশ্বসভ্যতা',
        'ভূগোল ও পরিবেশ',
    ],
};

const jsonLd = getPageJsonLd(
    'ssc',
    'SSC পরীক্ষার প্রস্তুতি — EzDu',
    'SSC পরীক্ষার MCQ প্র্যাকটিস, মক টেস্ট ও AI ব্যাখ্যা — বোর্ড কারিকুলামভিত্তিক।'
);
const breadcrumb = getBreadcrumbJsonLd('ssc', 'SSC প্রস্তুতি');

export default function SscPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <ExamPageTemplate config={config} />
        </>
    );
}
