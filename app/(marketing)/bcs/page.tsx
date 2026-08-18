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
    kicker: 'BCS Preliminary প্রস্তুতি',
    title: 'সিলেবাস ধরে BCS Preliminary প্র্যাকটিস',
    description:
        'বাংলা, ইংরেজি, গণিত, মানসিক দক্ষতা, বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলি—Preliminary-র বিস্তৃত সিলেবাসকে বিষয়ভিত্তিক MCQ প্র্যাকটিসে গুছিয়ে নাও।',
    icon: 'briefcase',
    highlights: [
        { title: 'Preliminary syllabus', description: 'বিষয় ধরে বিস্তৃত সিলেবাস গুছিয়ে প্র্যাকটিস' },
        { title: 'বিগত BCS প্রশ্ন', description: 'প্রশ্নের ধরন ও পুনরাবৃত্ত গুরুত্বপূর্ণ টপিক বোঝা' },
        { title: 'দুর্বল বিষয়ে revision', description: 'ভুল হওয়া টপিকে ফিরে গিয়ে প্রস্তুতির ঘাটতি কমানো' },
    ],
    featureHeading: 'বিস্তৃত সিলেবাসে ফোকাস হারাবে না',
    featureDescription: 'BCS Preliminary প্রস্তুতিকে বিষয়, টপিক ও বিগত প্রশ্নে ভাগ করে প্রতিদিন কী প্র্যাকটিস করবে তা সহজ করো।',
    features: [
        {
            title: 'Preliminary-র পূর্ণ কভারেজ',
            description: 'বাংলা (৩৫), ইংরেজি (৩৫), গণিত (৩০), GK (১০০) — BCS syllabus অনুযায়ী ওজন বিভাজন।',
        },
        {
            title: 'পূর্ববর্তী BCS প্রশ্ন সমাধান',
            description: 'বিগত BCS Preliminary প্রশ্ন ব্যাখ্যাসহ অনুশীলন করে প্রশ্নের পরিচিত ধরনগুলো চেনো।',
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
    steps: [
        { title: 'একটি বিষয় বেছে নাও', description: 'সিলেবাস থেকে আজকের বিষয় ও ছোট একটি টপিক ঠিক করো।' },
        { title: 'MCQ ও বিগত প্রশ্ন দাও', description: 'ধারণা যাচাইয়ের সঙ্গে পরীক্ষার প্রশ্নের ধরন বুঝে নাও।' },
        { title: 'ভুল টপিক revise করো', description: 'যে অংশে ভুল বেশি হচ্ছে, পরের session-এ সেটিকে অগ্রাধিকার দাও।' },
    ],
    subjectsHeading: 'BCS Preliminary-র বিষয়সমূহ',
    subjectsDescription: 'সিলেবাসের প্রতিটি অংশ আলাদাভাবে প্র্যাকটিস করে balanced preparation তৈরি করো।',
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
    closingTitle: 'BCS প্রস্তুতির বড় পথটি ছোট session-এ শুরু করো',
    closingDescription: 'EzDu ডাউনলোড করে বিনামূল্যে বিষয়ভিত্তিক BCS Preliminary MCQ প্র্যাকটিস শুরু করো।',
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
