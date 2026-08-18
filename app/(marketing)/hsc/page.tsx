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
    kicker: 'HSC বোর্ড পরীক্ষার প্রস্তুতি',
    title: 'কঠিন অধ্যায় ভেঙে HSC প্রস্তুতি সহজ করো',
    description:
        'উচ্চ মাধ্যমিক পরীক্ষার জন্য AI-চালিত MCQ প্র্যাকটিস, মডেল টেস্ট ও বিষয়ভিত্তিক সমাধান। পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, গণিতসহ সব বিষয় — বোর্ড কারিকুলামভিত্তিক।',
    icon: 'book-open',
    highlights: [
        { title: 'পত্র ও অধ্যায়ভিত্তিক', description: 'বড় সিলেবাসকে ছোট, নিয়মিত প্র্যাকটিসে ভাগ করো' },
        { title: 'বোর্ড প্রশ্ন', description: 'বিগত প্রশ্ন দেখে গুরুত্বপূর্ণ ধারণা ও প্যাটার্ন বোঝো' },
        { title: 'ব্যাখ্যাসহ অনুশীলন', description: 'উত্তরের সঙ্গে সূত্র ও ধারণা ঝালিয়ে নাও' },
    ],
    featureHeading: 'ধারণা বোঝা থেকে বোর্ড পরীক্ষার প্র্যাকটিস',
    featureDescription: 'HSC-র বড় সিলেবাসে কোথা থেকে শুরু করবে সেই দ্বিধা কমিয়ে প্রতিটি পত্রকে অধ্যায় ও প্রশ্নে ভাগ করে এগিয়ে যাও।',
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
    steps: [
        { title: 'একটি পত্রে ফোকাস করো', description: 'একসঙ্গে সব নয়—একটি পত্রের একটি অধ্যায় দিয়ে শুরু করো।' },
        { title: 'ধারণা ও সূত্র যাচাই করো', description: 'MCQ সমাধান করে কোন জায়গায় ধারণা পরিষ্কার নয় তা চিহ্নিত করো।' },
        { title: 'বোর্ড প্রশ্নে প্রস্তুতি মাপো', description: 'বিগত প্রশ্ন ও মডেল টেস্ট দিয়ে পরীক্ষার প্রস্তুতি যাচাই করো।' },
    ],
    subjectsHeading: 'পত্রভিত্তিক HSC প্র্যাকটিস',
    subjectsDescription: 'বিজ্ঞান বিভাগের মূল বিষয়সহ বাংলা, ইংরেজি ও ICT আলাদাভাবে অনুশীলন করো।',
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
    closingTitle: 'বড় সিলেবাস—প্রতিদিন ছোট একটি অগ্রগতি',
    closingDescription: 'EzDu-তে বিনামূল্যে HSC প্র্যাকটিস শুরু করে পড়াকে নিয়মিত পরীক্ষার প্রস্তুতিতে বদলে নাও।',
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
