import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getPageJsonLd, getFaqJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld';
import ExamPageTemplate from '@/components/ExamPageTemplate';

export const metadata: Metadata = buildMetadata('bcs', {
    title: 'BCS MCQ প্র্যাকটিস ও Mock Test',
    description: 'BCS প্রিলিমিনারি MCQ প্র্যাকটিস, mock test ও previous year questions — সম্পূর্ণ বিনামূল্যে। EzDu অ্যাপে BCS প্রস্তুতি নাও।',
    keywords: [
        'BCS MCQ practice', 'BCS mock test', 'বিসিএস প্র্যাকটিস',
        'BCS preliminary preparation', 'BCS previous questions Bangladesh',
        'বিসিএস প্রিলিমিনারি প্রস্তুতি', 'BCS question bank',
    ],
});

const faqs = [
    { question: 'EzDu তে কি BCS প্রিলিমিনারি mock test দেওয়া যায়?', answer: 'হ্যাঁ, EzDu অ্যাপে BCS প্রিলিমিনারির সব subject-এ AI-powered mock test দেওয়া যায় বিনামূল্যে।' },
    { question: 'BCS-এর কোন কোন বিষয়ের MCQ আছে?', answer: 'বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান, বিজ্ঞান, কম্পিউটার সহ BCS সিলেবাসের সব বিষয় আছে।' },
    { question: 'BCS previous year questions কি পাওয়া যায়?', answer: 'হ্যাঁ, ৩৫তম থেকে সর্বশেষ BCS পর্যন্ত সব previous questions subject-wise সাজানো আছে।' },
    { question: 'BCS written-এর জন্য কি কিছু আছে?', answer: 'এখন প্রিলিমিনারি MCQ-তে focus করা হয়েছে। Written প্রস্তুতির features শীঘ্রই আসছে।' },
];

const pageJsonLd = getPageJsonLd('bcs', 'BCS MCQ প্র্যাকটিস ও Mock Test', 'BCS প্রিলিমিনারি MCQ প্র্যাকটিস ও mock test');
const faqJsonLd = getFaqJsonLd(faqs);
const breadcrumbJsonLd = getBreadcrumbJsonLd('bcs', 'BCS প্রস্তুতি');

export default function BCSPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <ExamPageTemplate config={{
                slug: 'bcs',
                color: 'orange',
                badge: 'BCS প্রস্তুতি',
                badgeIcon: 'landmark',
                headline: 'BCS প্রিলিমিনারিতে পাস করো',
                subheadline: 'MCQ প্র্যাকটিস · Mock Test · Previous Questions',
                description: 'EzDu অ্যাপে BCS প্রিলিমিনারির সব subject-এ MCQ প্র্যাকটিস করো। AI mock test দাও, নিজের দুর্বলতা খুঁজে বের করো।',
                stats: [
                    { label: 'MCQ প্রশ্ন', value: '২০,০০০+' },
                    { label: 'বিষয়', value: '১০+' },
                    { label: 'Previous BCS', value: '৩৫+' },
                    { label: 'সম্পূর্ণ বিনামূল্যে', valueCheck: true },
                ],
                features: [
                    { icon: 'fileText', title: 'Subject-wise MCQ', description: 'বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান আলাদা আলাদা প্র্যাকটিস।' },
                    { icon: 'flaskConical', title: 'Full Prelim Mock Test', description: '২০০ প্রশ্নের পূর্ণাঙ্গ BCS প্রিলিমিনারি mock test।' },
                    { icon: 'calendar', title: 'Previous BCS Questions', description: '৩৫তম থেকে সর্বশেষ BCS পর্যন্ত সব প্রশ্ন।' },
                    { icon: 'barChart3', title: 'Weakness Finder', description: 'AI বিশ্লেষণ করে বলে দেয় কোন বিষয়ে আরো পড়তে হবে।' },
                    { icon: 'bot', title: 'AI Mock Test', description: 'তোমার দুর্বল বিষয় থেকে বেশি প্রশ্ন দিয়ে customized test।' },
                    { icon: 'timer', title: 'Timed Practice', description: 'প্রতিটি প্রশ্নের জন্য নির্দিষ্ট সময় — আসল পরীক্ষার মতো।' },
                ],
                faqs,
            }} />
        </>
    );
}
