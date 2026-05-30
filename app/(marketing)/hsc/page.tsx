import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import { ExamPageTemplate } from '@/components/ExamPageTemplate';
import type { ExamPageConfig } from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('hsc', {
    title: 'HSC পরীক্ষার প্রস্তুতি',
    description:
        'EzDu-তে HSC পরীক্ষার MCQ প্র্যাকটিস, মডেল টেস্ট ও AI ব্যাখ্যা — পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, গণিতসহ সব বিষয়। বাংলাদেশ উচ্চ মাধ্যমিক বোর্ড কারিকুলাম।',
    keywords: [
        'HSC preparation Bangladesh',
        'HSC MCQ practice',
        'HSC model test',
        'HSC exam app Bangladesh',
        'উচ্চ মাধ্যমিক পরীক্ষার প্রস্তুতি',
        'HSC physics chemistry biology',
        'HSC previous questions',
    ],
});

const config: ExamPageConfig = {
    slug: 'hsc',
    examName: 'HSC',
    title: 'HSC পরীক্ষার প্রস্তুতি',
    description:
        'উচ্চ মাধ্যমিক পরীক্ষার জন্য AI-চালিত MCQ প্র্যাকটিস, মডেল টেস্ট ও বিষয়ভিত্তিক সমাধান। পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, গণিতসহ সব বিষয় — বোর্ড কারিকুলামভিত্তিক।',
    color: 'blue',
    icon: 'book-open',
    stats: [
        { value: '৬,০০০+', label: 'MCQ প্রশ্ন' },
        { value: '১২+', label: 'বিষয়' },
        { value: '৫০+', label: 'অধ্যায়' },
        { value: '১০০%', label: 'বোর্ড কারিকুলাম' },
    ],
    features: [
        {
            title: 'বিজ্ঞান বিভাগের পূর্ণ কভারেজ',
            description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও উচ্চতর গণিত — চারটিতেই বিস্তারিত প্র্যাকটিস।',
        },
        {
            title: 'সূত্র ও ব্যাখ্যাসহ সমাধান',
            description: 'শুধু উত্তর নয় — কোন সূত্র ব্যবহার হলো এবং কেন, ধাপে ধাপে বোঝানো হয়।',
        },
        {
            title: 'মডেল টেস্ট ও মক পরীক্ষা',
            description: 'আসল HSC পরীক্ষার format-এ সময়সীমাসহ পূর্ণ মক টেস্ট — confidence build করো।',
        },
        {
            title: 'পূর্ববর্তী বোর্ড প্রশ্ন',
            description: 'বিগত বছরের সব বোর্ডের প্রশ্ন সমাধানসহ — কোন টপিক বারবার আসে সেটা বোঝো।',
        },
        {
            title: 'Weak টপিক চিহ্নিতকরণ',
            description: 'AI তোমার performance বিশ্লেষণ করে ঠিক কোন অধ্যায়ে বেশি মনোযোগ দেওয়া দরকার বলে দেয়।',
        },
        {
            title: 'প্রতিদিনের রিভিশন সেট',
            description: 'তোমার ভুলগুলো AI মনে রাখে এবং পরের দিন সেই টপিক থেকে প্রশ্ন দেয়।',
        },
    ],
    subjects: [
        'বাংলা ১ম পত্র',
        'বাংলা ২য় পত্র',
        'ইংরেজি ১ম পত্র',
        'ইংরেজি ২য় পত্র',
        'পদার্থবিজ্ঞান ১ম পত্র',
        'পদার্থবিজ্ঞান ২য় পত্র',
        'রসায়ন ১ম পত্র',
        'রসায়ন ২য় পত্র',
        'জীববিজ্ঞান ১ম পত্র',
        'জীববিজ্ঞান ২য় পত্র',
        'উচ্চতর গণিত ১ম পত্র',
        'উচ্চতর গণিত ২য় পত্র',
        'তথ্য ও যোগাযোগ প্রযুক্তি',
    ],
};

const jsonLd = getPageJsonLd(
    'hsc',
    'HSC পরীক্ষার প্রস্তুতি — EzDu',
    'HSC পরীক্ষার MCQ প্র্যাকটিস, মডেল টেস্ট ও AI ব্যাখ্যা — বোর্ড কারিকুলামভিত্তিক।'
);
const breadcrumb = getBreadcrumbJsonLd('hsc', 'HSC প্রস্তুতি');

export default function HscPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <ExamPageTemplate config={config} />
        </>
    );
}
