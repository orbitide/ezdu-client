import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import ExamPageTemplate from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('vocabulary', {
    title: 'English Vocabulary Practice — EzDu',
    description: 'IELTS, BCS ও SSC/HSC-এর জন্য English vocabulary শেখো flashcard ও quiz দিয়ে। EzDu অ্যাপে বিনামূল্যে প্র্যাকটিস করো।',
    keywords: [
        'English vocabulary practice', 'vocabulary app Bangladesh',
        'IELTS vocabulary', 'BCS vocabulary', 'English word practice',
        'vocabulary flashcard app', 'ইংরেজি শব্দ শেখার অ্যাপ',
        'vocabulary quiz Bangladesh',
    ],
});

const faqs = [
    { question: 'EzDu তে কীভাবে vocabulary শেখা যায়?', answer: 'EzDu অ্যাপে flashcard, word quiz, এবং context sentence দিয়ে vocabulary শেখা যায়।' },
    { question: 'IELTS-এর জন্য আলাদা vocabulary set আছে?', answer: 'হ্যাঁ, IELTS Academic Word List (AWL) সহ IELTS-specific vocabulary sets আছে।' },
    { question: 'BCS-এর জন্য vocabulary practice আছে?', answer: 'হ্যাঁ, BCS-এ আসা এবং আসতে পারে এমন English words-এর আলাদা set আছে।' },
    { question: 'Daily vocabulary reminder কি পাওয়া যায়?', answer: 'হ্যাঁ, EzDu অ্যাপে daily word notification চালু করা যায়।' },
];

const pageJsonLd = getPageJsonLd('vocabulary', 'English Vocabulary Practice', 'IELTS, BCS ও SSC/HSC-এর জন্য English vocabulary practice');
const faqJsonLd = getFaqJsonLd(faqs);
const breadcrumbJsonLd = getBreadcrumbJsonLd('vocabulary', 'Vocabulary');

export default function VocabularyPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <ExamPageTemplate config={{
                slug: 'vocabulary',
                color: 'rose',
                badge: 'Vocabulary',
                badgeIcon: 'bookOpen',
                headline: 'English Vocabulary শক্তিশালী করো',
                subheadline: 'Flashcard · Quiz · IELTS · BCS · SSC',
                description: 'EzDu অ্যাপে IELTS, BCS ও SSC/HSC-এর জন্য দরকারি English words flashcard ও quiz দিয়ে প্র্যাকটিস করো — প্রতিদিন একটু একটু করে।',
                stats: [
                    { label: 'মোট Words', value: '১০,০০০+' },
                    { label: 'Word Sets', value: '১০০+' },
                    { label: 'Daily Words', value: '১০টি' },
                    { label: 'সম্পূর্ণ বিনামূল্যে', valueCheck: true },
                ],
                features: [
                    { icon: 'layers', title: 'Flashcard', description: 'দেখো, মনে করো, উল্টাও — spaced repetition দিয়ে মনে রাখো।' },
                    { icon: 'puzzle', title: 'Word Quiz', description: 'MCQ quiz দিয়ে word মনে আছে কিনা যাচাই করো।' },
                    { icon: 'pin', title: 'Context Sentences', description: 'প্রতিটি word কীভাবে ব্যবহার হয় তা sentence দিয়ে শেখো।' },
                    { icon: 'globe', title: 'IELTS Word List', description: 'IELTS Academic Word List (AWL) থেকে words শেখো।' },
                    { icon: 'landmark', title: 'BCS Vocabulary', description: 'BCS-এ বারবার আসা English words-এর আলাদা set।' },
                    { icon: 'bell', title: 'Daily Reminder', description: 'প্রতিদিন ১০টি নতুন word — notification দিয়ে মনে করিয়ে দেয়।' },
                ],
                faqs,
            }} />
        </>
    );
}
