import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getFaqJsonLd } from '@/lib/jsonld';
import FaqContent from './faq-content';

export const metadata: Metadata = buildMetadata('faq', {
    title: 'সচরাচর জিজ্ঞাসা',
    description: 'EzDu সম্পর্কে সচরাচর জিজ্ঞাসা ও উত্তর — অ্যাপ ব্যবহার, ফিচার, মূল্য ও আরও অনেক কিছু।',
    keywords: ['EzDu FAQ', 'EzDu প্রশ্ন উত্তর', 'EzDu সাহায্য', 'EzDu কি ফ্রি'],
});

const faqs = [
    {
        question: 'EzDu দিয়ে শুরু করব কীভাবে?',
        answer: 'Play Store বা App Store থেকে অ্যাপ নামাও, অ্যাকাউন্ট খোলো, আর শুরু হয়ে যাক।',
    },
    {
        question: 'EzDu কি ফ্রি?',
        answer: 'ফ্রি ভার্সনেই অনেক কিছু পাবে। আরও বেশি চাইলে upgrade করো যখন মন চায়।',
    },
    {
        question: 'AI দিয়ে প্রশ্ন তৈরি হয় কীভাবে?',
        answer: 'তোমার পড়ার ধরন আর দুর্বল জায়গা বুঝে AI নিজেই প্রশ্ন বানায় - তোমার জন্য, তোমার মতো করে।',
    },
    {
        question: 'Progress ট্র্যাক করা যাবে?',
        answer: 'হ্যাঁ। কতটা এগোলে, কোথায় আটকে আছো - সব দেখতে পাবে।',
    },
    {
        question: 'কোন কোন বিষয় আছে?',
        answer: 'গণিত, বিজ্ঞান, ইংরেজিসহ আরও অনেক কিছু। নতুন কনটেন্ট আসতেই থাকবে।',
    },
    {
        question: 'আমার data কি নিরাপদ?',
        answer: 'একদম। তোমার তথ্য সুরক্ষিত রাখা আমাদের দায়িত্ব।',
    },
];

const faqJsonLd = getFaqJsonLd(faqs);

export default function FaqPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <FaqContent faqs={faqs} />
        </>
    );
}
