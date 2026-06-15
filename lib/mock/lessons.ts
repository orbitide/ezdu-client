import type { Lesson } from "@/lib/types/course"

export const lessons: Lesson[] = [
  // Chapter: ভৌত জগৎ ও পরিমাপ
  {
    id: "lsn-phy-1-1",
    chapterId: "ch-phy-1",
    title: "ভৌত জগতের পরিচিতি",
    contentType: "video",
    durationMinutes: 12,
    videoUrl: "https://example.com/video/physics-intro",
    xpReward: 20,
    completed: true,
  },
  {
    id: "lsn-phy-1-2",
    chapterId: "ch-phy-1",
    title: "পরিমাপের একক ও মাত্রা",
    contentType: "text",
    durationMinutes: 10,
    textContent:
      "ভৌত জগতে রাশিগুলোকে দুই ভাগে ভাগ করা হয়: মৌলিক রাশি এবং লব্ধ রাশি। মৌলিক রাশি হলো দৈর্ঘ্য, ভর, সময়, তাপমাত্রা, বিদ্যুৎ প্রবাহ, দীপন তীব্রতা এবং পদার্থের পরিমাণ। এই রাশিগুলোর একক SI পদ্ধতিতে নির্ধারিত। লব্ধ রাশি মৌলিক রাশির সমন্বয়ে গঠিত হয়, যেমন বেগ = দৈর্ঘ্য/সময়। মাত্রা সমীকরণ ব্যবহার করে কোনো সমীকরণের সঠিকতা পরীক্ষা করা যায় এবং বিভিন্ন এককের মধ্যে রূপান্তর করা সহজ হয়।",
    xpReward: 15,
    completed: true,
  },

  // Chapter: গতিবিদ্যা
  {
    id: "lsn-phy-2-1",
    chapterId: "ch-phy-2",
    title: "সরলরৈখিক গতি",
    contentType: "video",
    durationMinutes: 15,
    videoUrl: "https://example.com/video/linear-motion",
    xpReward: 20,
    completed: true,
  },
  {
    id: "lsn-phy-2-2",
    chapterId: "ch-phy-2",
    title: "গতির সমীকরণ - ইন্টারঅ্যাক্টিভ",
    contentType: "interactive",
    durationMinutes: 18,
    explainerSteps: [
      {
        title: "ধাপ ১: প্রথম সমীকরণ",
        body: "v = u + at। এখানে v = শেষ বেগ, u = আদি বেগ, a = ত্বরণ, t = সময়। ধরো একটি গাড়ি বিশ্রাম থেকে (u = 0) ২ m/s² ত্বরণে ৫ সেকেন্ড চলল। তাহলে v = 0 + 2×5 = 10 m/s।",
      },
      {
        title: "ধাপ ২: দ্বিতীয় সমীকরণ",
        body: "s = ut + ½at²। উপরের উদাহরণে দূরত্ব s = 0×5 + ½×2×25 = 25 মিটার।",
      },
      {
        title: "ধাপ ৩: তৃতীয় সমীকরণ",
        body: "v² = u² + 2as। যাচাই করো: v² = 0 + 2×2×25 = 100, তাই v = 10 m/s, যা প্রথম সমীকরণের সাথে মিলে যায়।",
      },
      {
        title: "ধাপ ৪: চেক ইন",
        body: "এখন নিজে চেষ্টা করো: একটি বস্তু 4 m/s বেগে যাত্রা শুরু করে 3 m/s² ত্বরণে 4 সেকেন্ড চলল। এর শেষ বেগ ও দূরত্ব নির্ণয় করো।",
      },
    ],
    xpReward: 30,
    completed: false,
  },
  {
    id: "lsn-phy-2-3",
    chapterId: "ch-phy-2",
    title: "নিউটনের গতিসূত্র",
    contentType: "video",
    durationMinutes: 14,
    videoUrl: "https://example.com/video/newtons-laws",
    xpReward: 20,
    completed: false,
  },

  // Chapter: তড়িৎ রসায়ন
  {
    id: "lsn-chem-1-1",
    chapterId: "ch-chem-1",
    title: "জারণ-বিজারণের ধারণা",
    contentType: "video",
    durationMinutes: 13,
    videoUrl: "https://example.com/video/redox-intro",
    xpReward: 20,
    completed: true,
  },
  {
    id: "lsn-chem-1-2",
    chapterId: "ch-chem-1",
    title: "তড়িৎ বিশ্লেষণ ও তড়িৎকোষ",
    contentType: "text",
    durationMinutes: 12,
    textContent:
      "তড়িৎ বিশ্লেষণ হলো এমন একটি প্রক্রিয়া যেখানে বৈদ্যুতিক শক্তি ব্যবহার করে একটি অ-স্বতঃস্ফূর্ত রাসায়নিক বিক্রিয়া সংঘটিত করা হয়। অন্যদিকে গ্যালভানিক কোষ বা ভোল্টায়িক কোষে স্বতঃস্ফূর্ত রাসায়নিক বিক্রিয়া থেকে বৈদ্যুতিক শক্তি উৎপন্ন হয়। দুটি ইলেকট্রোড - অ্যানোড (জারণ ঘটে) এবং ক্যাথোড (বিজারণ ঘটে) - এর মধ্যে আয়নের আদান-প্রদানের মাধ্যমে এই প্রক্রিয়া সম্পন্ন হয়।",
    xpReward: 15,
    completed: true,
  },
  {
    id: "lsn-chem-1-3",
    chapterId: "ch-chem-1",
    title: "তড়িৎ রসায়ন - মূল্যায়ন",
    contentType: "interactive",
    durationMinutes: 16,
    explainerSteps: [
      {
        title: "ধাপ ১: জারণ সংখ্যা নির্ধারণ",
        body: "একটি যৌগে প্রতিটি মৌলের জারণ সংখ্যা নির্ধারণ করতে হলে যৌগটির সামগ্রিক চার্জ শূন্য (নিরপেক্ষ যৌগের ক্ষেত্রে) ধরে সমীকরণ সাজাতে হয়।",
      },
      {
        title: "ধাপ ২: অর্ধ-বিক্রিয়া পদ্ধতি",
        body: "জারণ ও বিজারণ অর্ধ-বিক্রিয়া আলাদাভাবে লিখে তারপর ইলেকট্রন সংখ্যা সমান করে যোগ করতে হয়।",
      },
      {
        title: "ধাপ ৩: চেক ইন",
        body: "এখন চেষ্টা করো: Zn + Cu²⁺ → Zn²⁺ + Cu বিক্রিয়ায় কোন মৌলটি জারিত এবং কোনটি বিজারিত হয়েছে?",
      },
    ],
    xpReward: 25,
    completed: false,
  },

  // Chapter: মধ্যযুগের সাহিত্য
  {
    id: "lsn-bangla-1-1",
    chapterId: "ch-bangla-1",
    title: "মধ্যযুগের সাহিত্যের পরিচিতি",
    contentType: "text",
    durationMinutes: 10,
    textContent:
      "মধ্যযুগীয় বাংলা সাহিত্য মূলত ধর্মীয় ও আধ্যাত্মিক ভাবধারায় রচিত হয়েছিল। এই যুগের প্রধান কাব্যধারাগুলোর মধ্যে রয়েছে বৈষ্ণব পদাবলি, মঙ্গলকাব্য, এবং অনুবাদ সাহিত্য। চণ্ডীদাস, বিদ্যাপতি, মুকুন্দরাম চক্রবর্তী প্রমুখ এই যুগের গুরুত্বপূর্ণ কবি। মঙ্গলকাব্যের মধ্যে মনসামঙ্গল, চণ্ডীমঙ্গল এবং ধর্মমঙ্গল উল্লেখযোগ্য।",
    xpReward: 15,
    completed: false,
  },
  {
    id: "lsn-bangla-1-2",
    chapterId: "ch-bangla-1",
    title: "বৈষ্ণব পদাবলি",
    contentType: "video",
    durationMinutes: 14,
    videoUrl: "https://example.com/video/boishnab-padaboli",
    xpReward: 20,
    completed: false,
  },
  {
    id: "lsn-bangla-1-3",
    chapterId: "ch-bangla-1",
    title: "মঙ্গলকাব্য - ইন্টারঅ্যাক্টিভ আলোচনা",
    contentType: "interactive",
    durationMinutes: 15,
    explainerSteps: [
      {
        title: "ধাপ ১: মঙ্গলকাব্যের কাঠামো",
        body: "মঙ্গলকাব্য সাধারণত দেব-দেবীর মাহাত্ম্য বর্ণনা করে এবং এতে সমাজজীবনের বাস্তব চিত্র পাওয়া যায়।",
      },
      {
        title: "ধাপ ২: প্রধান মঙ্গলকাব্য",
        body: "মনসামঙ্গল (মনসা দেবীর মাহাত্ম্য), চণ্ডীমঙ্গল (চণ্ডী দেবীর মাহাত্ম্য, কবি মুকুন্দরাম চক্রবর্তী), এবং ধর্মমঙ্গল উল্লেখযোগ্য।",
      },
      {
        title: "ধাপ ৩: চেক ইন",
        body: "চণ্ডীমঙ্গল কাব্যের রচয়িতা কে এবং এই কাব্যে কোন দেবীর মাহাত্ম্য বর্ণিত হয়েছে?",
      },
    ],
    xpReward: 25,
    completed: false,
  },

  // Chapter: ত্রিকোণমিতি (admission prep)
  {
    id: "lsn-math-1-1",
    chapterId: "ch-math-1",
    title: "ত্রিকোণমিতিক অনুপাত",
    contentType: "video",
    durationMinutes: 16,
    videoUrl: "https://example.com/video/trig-ratios",
    xpReward: 20,
    completed: false,
  },
  {
    id: "lsn-math-1-2",
    chapterId: "ch-math-1",
    title: "ত্রিকোণমিতিক অভেদ",
    contentType: "text",
    durationMinutes: 12,
    textContent:
      "ত্রিকোণমিতিক অভেদসমূহের মধ্যে সবচেয়ে গুরুত্বপূর্ণ হলো sin²θ + cos²θ = 1। এছাড়া 1 + tan²θ = sec²θ এবং 1 + cot²θ = csc²θ অভেদগুলোও প্রায়ই ব্যবহৃত হয়। এই অভেদগুলো ব্যবহার করে জটিল ত্রিকোণমিতিক রাশিকে সরল করা যায় এবং সমীকরণ সমাধান করা যায়। ভর্তি পরীক্ষায় এই অভেদ ব্যবহার করে প্রমাণ ও সরলীকরণের প্রশ্ন প্রায়ই আসে।",
    xpReward: 15,
    completed: false,
  },
  {
    id: "lsn-math-1-3",
    chapterId: "ch-math-1",
    title: "ত্রিকোণমিতিক সমীকরণ সমাধান - ইন্টারঅ্যাক্টিভ",
    contentType: "interactive",
    durationMinutes: 20,
    explainerSteps: [
      {
        title: "ধাপ ১: সাধারণ সমীকরণ",
        body: "sinθ = sinα হলে θ = nπ + (-1)ⁿα, যেখানে n একটি পূর্ণসংখ্যা।",
      },
      {
        title: "ধাপ ২: উদাহরণ",
        body: "sinθ = 1/2 সমাধান করো। sin(π/6) = 1/2, তাই θ = nπ + (-1)ⁿ(π/6)।",
      },
      {
        title: "ধাপ ৩: চেক ইন",
        body: "এখন চেষ্টা করো: cosθ = 1/2 এর সাধারণ সমাধান নির্ণয় করো।",
      },
    ],
    xpReward: 30,
    completed: false,
  },
]

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export function getLessonsByChapterId(chapterId: string): Lesson[] {
  return lessons.filter((l) => l.chapterId === chapterId)
}
