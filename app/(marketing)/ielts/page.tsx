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
    kicker: 'IELTS skill practice',
    title: 'চারটি skill, একটি নিয়মিত IELTS routine',
    description:
        'IELTS-এ ভালো band score পেতে দরকার consistent practice এবং সঠিক strategy। EzDu-তে Reading, Listening, Writing, Speaking — চারটি section-এ AI-চালিত প্র্যাকটিস ও mock test।',
    icon: 'globe',
    highlights: [
        { title: 'Reading & Listening', description: 'Question type বুঝে focused practice' },
        { title: 'Writing & Speaking', description: 'Structure, vocabulary ও expression গুছিয়ে নেওয়া' },
        { title: 'IELTS Vocabulary', description: 'Context-এ দরকারি শব্দ শেখা ও নিয়মিত revision' },
    ],
    featureHeading: 'IELTS-এর প্রতিটি skill-এর জন্য আলাদা ফোকাস',
    featureDescription: 'শুধু mock test নয়—Reading, Listening, Writing ও Speaking-এর আলাদা দুর্বলতা ধরে একটি balanced routine তৈরি করো।',
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
        { title: 'Focused Revision', description: 'যে question type বা vocabulary-তে বারবার ভুল হচ্ছে, সেটি আবার প্র্যাকটিস করো।' },
    ],
    steps: [
        { title: 'একটি skill বেছে নাও', description: 'Reading, Listening, Writing বা Speaking—আজকের focus ঠিক করো।' },
        { title: 'Question type ধরে practice', description: 'একই ধরনের প্রশ্নে pattern, timing ও accuracy তৈরি করো।' },
        { title: 'Vocabulary revise করো', description: 'নতুন শব্দ context-এ শেখো এবং বিরতি দিয়ে আবার মনে করো।' },
    ],
    subjectsHeading: 'চার skill ও vocabulary practice',
    subjectsDescription: 'Academic ও General Training-এর দরকার অনুযায়ী relevant section বেছে নাও।',
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
    closingTitle: 'IELTS preparation-কে daily habit বানাও',
    closingDescription: 'EzDu ডাউনলোড করে বিনামূল্যে skill-based IELTS practice ও vocabulary revision শুরু করো।',
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
