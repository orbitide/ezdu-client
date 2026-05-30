import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import { ExamPageTemplate } from '@/components/ExamPageTemplate';
import type { ExamPageConfig } from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('bcs', {
    title: 'BCS পরীক্ষার প্রস্তুতি',
    description:
        'EzDu-তে BCS Preliminary ও Written প্রস্তুতি — বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান, বাংলাদেশ বিষয়াবলিসহ সব বিষয়ে AI-চালিত MCQ প্র্যাকটিস।',
    keywords: [
        'BCS preparation Bangladesh',
        'BCS MCQ practice',
        'BCS preliminary preparation',
        'BCS exam app Bangladesh',
        'বিসিএস প্রস্তুতি',
        'BCS general knowledge',
        'government job preparation Bangladesh',
        'BPSC exam preparation',
    ],
});

const config: ExamPageConfig = {
    slug: 'bcs',
    examName: 'BCS',
    title: 'BCS পরীক্ষার প্রস্তুতি',
    description:
        'BCS Preliminary-র জন্য বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান, বাংলাদেশ বিষয়াবলিসহ সব বিষয়ে AI-চালিত MCQ প্র্যাকটিস। লক্ষাধিক প্রতিযোগীর মধ্যে এগিয়ে থাকো।',
    color: 'purple',
    icon: 'briefcase',
    stats: [
        { value: '১০,০০০+', label: 'MCQ প্রশ্ন' },
        { value: '৯+', label: 'বিষয়' },
        { value: 'পূর্ববর্তী', label: 'BCS প্রশ্ন' },
        { value: 'AI', label: 'দুর্বলতা চিহ্নিতকরণ' },
    ],
    features: [
        {
            title: 'Preliminary-র পূর্ণ কভারেজ',
            description: 'বাংলা (৩৫), ইংরেজি (৩৫), গণিত (৩০), GK (১০০) — BCS syllabus অনুযায়ী ওজন বিভাজন।',
        },
        {
            title: 'পূর্ববর্তী BCS প্রশ্ন সমাধান',
            description: 'বিগত ৩০+ BCS-এর Preliminary প্রশ্ন ব্যাখ্যাসহ — সবচেয়ে বেশি আসা টপিক চেনো।',
        },
        {
            title: 'গণিত ও মানসিক দক্ষতা',
            description: 'BCS-এ গণিতে পুরো নম্বর পাওয়া সম্ভব — নির্দিষ্ট formula ও shortcut technique দিয়ে প্র্যাকটিস করো।',
        },
        {
            title: 'বাংলাদেশ ও আন্তর্জাতিক বিষয়',
            description: 'Current affairs, ইতিহাস, ভূগোল, সংবিধান — GK-র সব অংশ আলাদাভাবে প্র্যাকটিস করার সুবিধা।',
        },
        {
            title: 'ইংরেজি ও বাংলা ব্যাকরণ',
            description: 'Grammar rules, vocabulary, বাংলা ব্যাকরণ ও সাহিত্য — বারবার আসা প্যাটার্ন অনুসরণ করে প্র্যাকটিস।',
        },
        {
            title: 'AI অ্যাডাপ্টিভ প্র্যাকটিস',
            description: 'তোমার ভুলের history দেখে AI ঠিক সেই টপিকগুলো থেকে বেশি প্রশ্ন দেয় — সময় নষ্ট হয় না।',
        },
    ],
    subjects: [
        'বাংলা ভাষা ও সাহিত্য',
        'ইংরেজি ভাষা ও সাহিত্য',
        'গণিত ও মানসিক দক্ষতা',
        'বাংলাদেশ বিষয়াবলি',
        'আন্তর্জাতিক বিষয়াবলি',
        'সাধারণ বিজ্ঞান ও প্রযুক্তি',
        'ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা',
        'নৈতিকতা, মূল্যবোধ ও সুশাসন',
        'তথ্য ও যোগাযোগ প্রযুক্তি',
    ],
};

const jsonLd = getPageJsonLd(
    'bcs',
    'BCS পরীক্ষার প্রস্তুতি — EzDu',
    'BCS Preliminary MCQ প্র্যাকটিস — বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞানসহ সব বিষয়।'
);
const breadcrumb = getBreadcrumbJsonLd('bcs', 'BCS প্রস্তুতি');

export default function BcsPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <ExamPageTemplate config={config} />
        </>
    );
}
