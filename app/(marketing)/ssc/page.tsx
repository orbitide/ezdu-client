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
    kicker: 'SSC বোর্ড পরীক্ষার প্রস্তুতি',
    title: 'বোর্ড প্রশ্ন ধরে SSC প্রস্তুতি গুছিয়ে নাও',
    description:
        'বাংলাদেশ মাধ্যমিক শিক্ষা বোর্ডের SSC পরীক্ষার জন্য AI-চালিত MCQ প্র্যাকটিস, মক টেস্ট ও বিষয়ভিত্তিক প্রশ্ন সমাধান — এক অ্যাপে। বোর্ড কারিকুলামভিত্তিক প্রশ্ন, ধাপে ধাপে ব্যাখ্যা, আর AI যা তোমার দুর্বলতা বুঝে প্রশ্ন বেছে দেয়।',
    icon: 'graduation-cap',
    highlights: [
        { title: 'বোর্ড প্রশ্ন', description: 'বিগত পরীক্ষার প্রশ্ন দিয়ে পরিচিত প্যাটার্নে প্র্যাকটিস' },
        { title: 'অধ্যায়ভিত্তিক MCQ', description: 'একবারে একটি অধ্যায় বেছে নিয়ে দুর্বলতা কমানো' },
        { title: 'মডেল টেস্ট', description: 'সময় ধরে পূর্ণ প্রস্তুতি যাচাই করার সুযোগ' },
    ],
    featureHeading: 'SSC-র প্রতিটি অধ্যায়, পরীক্ষার মতো করে',
    featureDescription: 'ক্লাসের পড়াকে পরীক্ষার প্রস্তুতিতে বদলে দিতে বিষয়, অধ্যায় ও বোর্ড প্রশ্ন—তিনভাবে প্র্যাকটিস সাজানো।',
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
    steps: [
        { title: 'বিষয় ও অধ্যায় বেছে নাও', description: 'আজ যে অধ্যায়টি পড়েছ, সেটি দিয়েই ছোট একটি প্র্যাকটিস শুরু করো।' },
        { title: 'ভুলের ব্যাখ্যা দেখো', description: 'ভুল উত্তর কেন ভুল হয়েছে বুঝে একই ধারণা আবার ঝালিয়ে নাও।' },
        { title: 'মডেল টেস্টে যাচাই করো', description: 'কয়েকটি অধ্যায় শেষ হলে সময় ধরে নিজের প্রস্তুতি মাপো।' },
    ],
    subjectsHeading: 'SSC-র মূল বিষয়গুলো এক জায়গায়',
    subjectsDescription: 'বিভাগ ও পত্র অনুযায়ী দরকারি বিষয় বেছে নিয়ে নিজের গতিতে প্র্যাকটিস করো।',
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
    closingTitle: 'পরের বোর্ড প্রশ্নটির জন্য আজ থেকেই তৈরি হও',
    closingDescription: 'EzDu ডাউনলোড করে বিষয় বেছে নাও এবং বিনামূল্যে SSC প্র্যাকটিস শুরু করো।',
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
