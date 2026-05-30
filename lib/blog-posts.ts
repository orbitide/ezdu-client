export type BlogSection =
    | { type: 'paragraph'; content: string }
    | { type: 'heading'; content: string }
    | { type: 'list'; content: string[] }
    | { type: 'tip'; content: string };

export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    readTime: string;
    keywords: string[];
    metaDescription: string;
    sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'ssc-math-routine',
        title: 'SSC গণিতে ভালো করতে রোজ ৩০ মিনিটই যথেষ্ট — কিন্তু সঠিকভাবে',
        date: 'February 12, 2026',
        category: 'Study tips',
        readTime: '৫ মিনিট',
        excerpt:
            'বেশিরভাগ SSC ছাত্রছাত্রী গণিতে ৩ ঘন্টা পড়েও উন্নতি করতে পারে না। কারণ উপায়টা ভুল। প্রতিদিন ৩০ মিনিটের এই রুটিন অনুসরণ করলে পার্থক্য দেখতে পাবে।',
        metaDescription:
            'SSC গণিত প্রস্তুতির জন্য দৈনিক ৩০ মিনিটের কার্যকর রুটিন। বিষয়ভিত্তিক সাপ্তাহিক প্ল্যানসহ।',
        keywords: [
            'SSC math preparation Bangladesh',
            'SSC গণিত প্রস্তুতি',
            'SSC exam routine',
            'SSC MCQ practice',
        ],
        sections: [
            {
                type: 'paragraph',
                content:
                    'গণিত শুনলেই অনেকের মাথায় আতঙ্ক আসে। কিন্তু SSC-র যে প্যাটার্নে প্রশ্ন আসে, সেটা আসলে অনেক বেশি predictable — যদি সঠিক উপায়ে প্র্যাকটিস করো।',
            },
            {
                type: 'paragraph',
                content:
                    'সমস্যা হলো বেশিরভাগ ছাত্রছাত্রী ৩ ঘন্টা "পড়ে" কিন্তু বেশিরভাগ সময় বই দেখে দেখে নোট করে বা একই সমাধান বারবার পড়ে। এটা passive reading — এতে পরীক্ষার হলে টেনে বের করা যায় না।',
            },
            {
                type: 'heading',
                content: 'কেন ৩ ঘন্টাও কাজে লাগে না',
            },
            {
                type: 'list',
                content: [
                    'সমাধান দেখে দেখে লেখা মানে তুমি সমাধান শেখোনি — মুখস্থ করেছ।',
                    'ভুল উত্তর দিলে সঙ্গে সঙ্গে না বুঝলে একই ভুল বারবার হয়।',
                    'একটানা পড়লে মস্তিষ্ক absorb করতে পারে না — short active sessions বেশি কার্যকর।',
                ],
            },
            {
                type: 'heading',
                content: '৩০ মিনিটের দৈনিক রুটিন',
            },
            {
                type: 'list',
                content: [
                    '৫ মিনিট: আগের দিনের ভুল প্রশ্নগুলো একবার দেখো — কেন ভুল হয়েছিল মনে করো।',
                    '১৫ মিনিট: একটি নির্দিষ্ট অধ্যায় থেকে ১০-১৫টি MCQ নিজে থেকে সমাধান করো, কোনো সাহায্য ছাড়া।',
                    '১০ মিনিট: ভুল উত্তরের ব্যাখ্যা মনোযোগ দিয়ে পড়ো এবং সঠিক পদ্ধতি নোট করো।',
                ],
            },
            {
                type: 'tip',
                content:
                    'Timer দিয়ে প্র্যাকটিস করো। SSC-তে MCQ-তে প্রতি প্রশ্নে গড়ে ৭৫ সেকেন্ড পাওয়া যায়। সময়ের চাপে কাজ করার অভ্যাস না থাকলে আসল পরীক্ষায় সমস্যা হবে।',
            },
            {
                type: 'heading',
                content: 'সাপ্তাহিক টপিক প্ল্যান',
            },
            {
                type: 'list',
                content: [
                    'সপ্তাহ ১: সংখ্যা পদ্ধতি, বীজগণিত ও সূচক-লগারিদম',
                    'সপ্তাহ ২: জ্যামিতি ও ত্রিকোণমিতি',
                    'সপ্তাহ ৩: পরিসংখ্যান, সরল ও চক্রবৃদ্ধি সুদ',
                    'সপ্তাহ ৪: পূর্ণ সিলেবাস মক টেস্ট ও দুর্বল টপিক রিভিশন',
                ],
            },
            {
                type: 'heading',
                content: 'ভুল থেকে শেখাটাই আসল কাজ',
            },
            {
                type: 'paragraph',
                content:
                    'প্রতিদিনের প্র্যাকটিসে score গুরুত্বপূর্ণ না — কতগুলো নতুন জিনিস শিখলে সেটা গুরুত্বপূর্ণ। ভুল প্রশ্নের একটা আলাদা লিস্ট রাখো এবং প্রতি সপ্তাহে সেগুলো আবার দাও। দেখবে সময়ের সাথে সাথে ভুলের সংখ্যা কমছে।',
            },
            {
                type: 'paragraph',
                content:
                    'EzDu-তে প্রতিটি ভুল উত্তরের পর ধাপে ধাপে ব্যাখ্যা পাওয়া যায়। AI নিজে থেকে তোমার দুর্বল টপিক চিহ্নিত করে প্রতিদিনের revision set তৈরি করে — তোমাকে আলাদা করে চিন্তা করতে হয় না।',
            },
        ],
    },
    {
        slug: 'bcs-preparation-guide',
        title: 'BCS প্রস্তুতি: একদম শুরু থেকে কীভাবে এগোবে',
        date: 'January 28, 2026',
        category: 'Exam prep',
        readTime: '৭ মিনিট',
        excerpt:
            'লক্ষাধিক পরীক্ষার্থীর মধ্যে Preliminary-তে মাত্র ১৩% উতরায়। সঠিক পরিকল্পনা না থাকলে প্রথম ৩ মাসেই দিকহারা হয়ে যাবে। এই গাইড তোমার জন্য।',
        metaDescription:
            'BCS প্রস্তুতি কোথা থেকে শুরু করবে — Preliminary থেকে Written পর্যন্ত সম্পূর্ণ গাইড। দৈনিক রুটিন ও বিষয়ভিত্তিক কৌশলসহ।',
        keywords: [
            'BCS preparation guide Bangladesh',
            'BCS প্রস্তুতি',
            'BCS MCQ practice',
            'BCS exam strategy',
            'BCS preliminary tips',
        ],
        sections: [
            {
                type: 'paragraph',
                content:
                    'BCS বাংলাদেশের সবচেয়ে প্রতিযোগিতামূলক পরীক্ষাগুলোর একটি। প্রতি বছর ৪-৫ লক্ষ পরীক্ষার্থী Preliminary দেন, কিন্তু Written-এ ডাক পান মাত্র ১৩-১৫ শতাংশ। এই পরিসংখ্যান ভয়ের না — সঠিক পরিকল্পনার সাথে এটাকে তোমার সুযোগ হিসেবে দেখতে পারো।',
            },
            {
                type: 'heading',
                content: 'পরীক্ষার কাঠামো আগে বোঝো',
            },
            {
                type: 'list',
                content: [
                    'Preliminary (প্রিলিমিনারি): ২০০ নম্বর, MCQ — এটাই সবচেয়ে বড় বাধা।',
                    'Written (লিখিত): ৯০০ নম্বর — Preliminary পাস করলে তবেই।',
                    'Viva (মৌখিক): ১০০ নম্বর।',
                    'Preliminary-তে উতরানোই প্রথম লক্ষ্য — বাকি সব তারপর।',
                ],
            },
            {
                type: 'heading',
                content: 'Preliminary-র বিষয়ভিত্তিক নম্বর বিভাজন',
            },
            {
                type: 'list',
                content: [
                    'বাংলা ভাষা ও সাহিত্য: ৩৫ নম্বর',
                    'ইংরেজি ভাষা ও সাহিত্য: ৩৫ নম্বর',
                    'গণিত ও মানসিক দক্ষতা: ৩০ নম্বর',
                    'বাংলাদেশ বিষয়াবলি: ৩০ নম্বর',
                    'আন্তর্জাতিক বিষয়াবলি: ২০ নম্বর',
                    'সাধারণ বিজ্ঞান ও প্রযুক্তি: ২০ নম্বর',
                    'ভূগোল, পরিবেশ ও দুর্যোগ: ১০ নম্বর',
                    'নৈতিকতা, মূল্যবোধ ও সুশাসন: ১০ নম্বর',
                    'তথ্য ও যোগাযোগ প্রযুক্তি: ১৫ নম্বর',
                ],
            },
            {
                type: 'tip',
                content:
                    'গণিতে ৩০ নম্বর — এটা skip করার সুযোগ নেই। অনেকে গণিত এড়িয়ে যায়, কিন্তু এই ৩০ নম্বরই cut-off-এর পার্থক্য করে দিতে পারে। মাধ্যমিক স্তরের গণিত ভালোভাবে রিভিশন করলে এখানে পুরো নম্বর পাওয়া সম্ভব।',
            },
            {
                type: 'heading',
                content: 'প্রথম ৩ মাসের দৈনিক রুটিন',
            },
            {
                type: 'list',
                content: [
                    'সকাল ৬-৮টা: Bangladesh Affairs + আন্তর্জাতিক বিষয় পড়া (দৈনিক পত্রিকা + বই)',
                    'সকাল ১০-১১:৩০টা: গণিত ও মানসিক দক্ষতার MCQ প্র্যাকটিস (৩০-৪০টি প্রশ্ন)',
                    'বিকাল ৪-৫:৩০টা: ইংরেজি ও বাংলা ব্যাকরণ এবং সাহিত্য',
                    'রাত ৮-৯টা: দিনের ভুল প্রশ্নগুলো রিভিউ ও নোট করা',
                ],
            },
            {
                type: 'heading',
                content: 'সবচেয়ে বড় ভুল — syllabus না দেখে পড়া',
            },
            {
                type: 'paragraph',
                content:
                    'BPSC-এর official syllabus হলো তোমার map। এটা ছাড়া পড়া মানে দিক না জেনে হাঁটা। প্রথম দিনেই BPSC-এর website থেকে সর্বশেষ syllabus download করে প্রিন্ট করে রাখো।',
            },
            {
                type: 'paragraph',
                content:
                    'Current affairs-এর জন্য দৈনিক পত্রিকা পড়া mandatory। Prothom Alo বা Daily Star — যেটা সহজ মনে হয় সেটা রোজ পড়ো। শুধু headlines না, editorial এবং national news মনোযোগ দিয়ে পড়তে হবে।',
            },
            {
                type: 'paragraph',
                content:
                    'EzDu-তে BCS বিষয়ভিত্তিক MCQ bank রয়েছে। Previous year প্রশ্ন ব্যাখ্যাসহ সমাধান করতে পারো। AI তোমার দুর্বল বিষয় চিহ্নিত করে সেই অনুযায়ী প্রশ্ন দেয় — ফলে সীমিত সময়ে বেশি কার্যকরভাবে প্রস্তুতি নেওয়া যায়।',
            },
        ],
    },
    {
        slug: 'mock-tests-before-board-exams',
        title: 'বোর্ড পরীক্ষার আগের শেষ ৪ সপ্তাহে মক টেস্ট দেবে যেভাবে',
        date: 'January 8, 2026',
        category: 'Exam prep',
        readTime: '৬ মিনিট',
        excerpt:
            'মক টেস্ট দিয়ে low score দেখে ভয় পাওয়া ভুল approach। পরীক্ষার আগের ৪ সপ্তাহে কখন, কীভাবে মক টেস্ট দেবে — এবং সবচেয়ে গুরুত্বপূর্ণ, দেওয়ার পর কী করবে।',
        metaDescription:
            'SSC HSC পরীক্ষার আগে মক টেস্ট দেওয়ার সঠিক কৌশল। ৪ সপ্তাহের পরিকল্পনাসহ বিস্তারিত গাইড।',
        keywords: [
            'mock test before board exam Bangladesh',
            'SSC HSC mock test strategy',
            'SSC পরীক্ষার প্রস্তুতি',
            'board exam preparation tips',
        ],
        sections: [
            {
                type: 'paragraph',
                content:
                    'বেশিরভাগ ছাত্রছাত্রী মক টেস্ট দেওয়ার পর score দেখে প্যানিক করে এবং আবার passive reading-এ ফিরে যায়। এটা সবচেয়ে বড় ভুল।',
            },
            {
                type: 'paragraph',
                content:
                    'মক টেস্টের উদ্দেশ্য score দেখা না — পরীক্ষার আগে তোমার দুর্বলতাগুলো খুঁজে বের করা। এই ৪ সপ্তাহের পরিকল্পনা সেই কাজটাই করবে।',
            },
            {
                type: 'heading',
                content: 'মক টেস্টের আসল উদ্দেশ্য',
            },
            {
                type: 'list',
                content: [
                    'Score নয় — gaps খুঁজে বের করা। আসল পরীক্ষার আগে এই gaps ঠিক করার সুযোগ পাওয়া।',
                    'Time management practice — ঘড়ি দেখে exam দেওয়ার অভ্যাস না থাকলে আসল হলে সমস্যা হয়।',
                    'Nervousness কমানো — যত বেশি mock দেবে, আসল পরীক্ষায় তত বেশি calm থাকতে পারবে।',
                ],
            },
            {
                type: 'heading',
                content: 'চার সপ্তাহের পরিকল্পনা',
            },
            {
                type: 'list',
                content: [
                    'সপ্তাহ ৪ (পরীক্ষার ৪ সপ্তাহ আগে): প্রতিটি বিষয়ের আলাদা আলাদা topic mock test দাও। কোন chapter-এ দুর্বলতা আছে সেটা চিহ্নিত করো।',
                    'সপ্তাহ ৩: পূর্ণ সাবজেক্ট মক টেস্ট দাও — একটি বিষয়ের পুরো সিলেবাস একসাথে। প্রতিদিন একটি বিষয়।',
                    'সপ্তাহ ২: আসল পরীক্ষার মতো সময় ধরে পূর্ণ mock দাও। ৩ ঘন্টা, কোনো distraction ছাড়া।',
                    'সপ্তাহ ১: নতুন কিছু না। শুধু চিহ্নিত দুর্বল টপিকগুলো রিভিশন এবং ঘুম ও খাওয়ার রুটিন ঠিক করো।',
                ],
            },
            {
                type: 'tip',
                content:
                    'শেষ সপ্তাহে নতুন কিছু পড়া বন্ধ করো। এই সময়ে নতুন তথ্য brain-এ ঢুকে আগের শেখা জিনিস disturb করতে পারে। শুধু familiar জিনিস রিভিশন করো।',
            },
            {
                type: 'heading',
                content: 'মক টেস্টের পর কী করবে — এটাই সবচেয়ে জরুরি',
            },
            {
                type: 'list',
                content: [
                    'প্রতিটি ভুল প্রশ্ন কেন ভুল হলো সেটা বুঝতে হবে — guess করে সঠিক হলেও সেটা রিভিউ করতে হবে।',
                    'একই ধরনের আরও ৩-৫টি প্রশ্ন সাথে সাথে সমাধান করো — শুধু পড়লে হবে না।',
                    'Score track করো, কিন্তু score নিয়ে anxiety না। আসল metric হলো "এই সপ্তাহে আগের সপ্তাহের তুলনায় কম ভুল হলো কিনা"।',
                ],
            },
            {
                type: 'heading',
                content: 'সময়ের চাপে কাজ করার অভ্যাস কেন দরকার',
            },
            {
                type: 'paragraph',
                content:
                    'SSC MCQ-তে ৩০ মিনিটে ৩০টি প্রশ্ন — মানে প্রতিটিতে ১ মিনিট। কিন্তু অনেকে বাড়িতে একটি প্রশ্নেই ৩ মিনিট নেয়। সময় ছাড়া mock দেওয়ার অভ্যাস থাকলে exam hall-এ panic হয়।',
            },
            {
                type: 'paragraph',
                content:
                    'EzDu-এর Model Test feature-এ আসল পরীক্ষার মতো timer দিয়ে test দেওয়া যায়। Test শেষে প্রতিটি ভুলের ব্যাখ্যা সাথে সাথে দেখা যায়। নিজের progress analytics-এ দেখতে পাবে কোন বিষয়ে উন্নতি হচ্ছে।',
            },
        ],
    },
    {
        slug: 'ai-explanations-how-we-think-about-them',
        title: 'EzDu-র ভেতরের কথা: AI ব্যাখ্যা নিয়ে আমরা কীভাবে ভাবি',
        date: 'January 8, 2026',
        category: 'Product',
        readTime: '৪ মিনিট',
        excerpt:
            'আমাদের লক্ষ্য শিক্ষকের বিকল্প হওয়া নয় — একা পড়ার সময় ধাপে ধাপে reasoning দেওয়া। জাতীয় কারিকুলামের প্রশ্নের ব্যাখ্যার মান আমরা কীভাবে নিশ্চিত করি।',
        metaDescription:
            'EzDu-র AI ব্যাখ্যা কীভাবে কাজ করে — জাতীয় কারিকুলামের SSC, HSC, BCS প্রশ্নের জন্য quality explanation তৈরির পদ্ধতি।',
        keywords: [
            'EzDu AI explanation',
            'AI exam preparation Bangladesh',
            'SSC HSC AI practice app',
        ],
        sections: [
            {
                type: 'paragraph',
                content:
                    'অনেক ছাত্রছাত্রী রাত ১১টায় একা পড়ছে। একটি গণিতের সমস্যায় আটকে আছে কিন্তু কাউকে জিজ্ঞেস করার নেই। এই মুহূর্তটার জন্যই EzDu-র AI ব্যাখ্যা।',
            },
            {
                type: 'heading',
                content: 'আমাদের লক্ষ্য কী নয়',
            },
            {
                type: 'paragraph',
                content:
                    'AI দিয়ে শিক্ষক replace করা আমাদের লক্ষ্য না। একজন ভালো শিক্ষকের কাছ থেকে যা পাওয়া যায় — সম্পর্ক, সহানুভূতি, বছরের পর বছরের অভিজ্ঞতা — সেটা AI দিতে পারে না।',
            },
            {
                type: 'paragraph',
                content:
                    'আমাদের লক্ষ্য সংকীর্ণ এবং স্পষ্ট: একা পড়ার সময় যখন কোনো প্রশ্নের উত্তর কেন সেটা হলো তা বুঝতে পারছ না, তখন ধাপে ধাপে reasoning দেওয়া।',
            },
            {
                type: 'heading',
                content: 'Quality কীভাবে নিশ্চিত করি',
            },
            {
                type: 'list',
                content: [
                    'প্রতিটি ব্যাখ্যা NCTB curriculum-এর সাথে cross-check করা হয়।',
                    'ব্যাখ্যাগুলো step-by-step হতে হবে — শুধু "সঠিক উত্তর হলো X" নয়, কেন X তা দেখাতে হবে।',
                    'ভুল ব্যাখ্যার report সিস্টেম রয়েছে — users যদি ব্যাখ্যা ভুল মনে করে flag করতে পারেন।',
                    'নিয়মিত random sampling করে explanation quality manually review করা হয়।',
                ],
            },
            {
                type: 'paragraph',
                content:
                    'আমরা এখনো perfect নই। মাঝে মাঝে ব্যাখ্যায় ভুল থাকে। কিন্তু প্রতিটি ভুল report আমাদের কাছে feedback — এবং সেটা দিয়ে আমরা system improve করি। EzDu ব্যবহার করতে করতে ভালো হয়।',
            },
        ],
    },
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find((p) => p.slug === slug);
}
