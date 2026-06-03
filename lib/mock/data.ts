export type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: "student" | "parent" | "both"
  xp: number
  streak: number
  joinedAt: string
}

export type Class = {
  id: string
  slug: string
  title: string
  level: string
  thumbnail: string
  subjectCount: number
  lessonCount: number
  description: string
  entitlement: "free" | "subscribed" | "preview" | "locked"
  price: number
  enrolledCount: number
  rating: number
  modules: Module[]
}

export type Module = {
  id: string
  title: string
  order: number
  subjects: Subject[]
}

export type Subject = {
  id: string
  title: string
  order: number
  lessonCount: number
  completedLessons: number
  lessons: Lesson[]
}

export type Lesson = {
  id: string
  title: string
  type: "video" | "reading" | "quiz"
  duration: number
  order: number
  isFree: boolean
  completed: boolean
  progress: number
  videoUrl?: string
  thumbnail?: string
}

export type Badge = {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedAt?: string
  locked: boolean
  criteria: string
}

export type Question = {
  id: string
  text: string
  options: { id: string; text: string }[]
  correctOptionId: string
  explanation: string
  subject: string
  difficulty: "easy" | "medium" | "hard"
}

export type MockTest = {
  id: string
  title: string
  subject: string
  duration: number
  questionCount: number
  passMark: number
  questions: Question[]
  attempts: number
  bestScore?: number
}

export type DiscussionThread = {
  id: string
  title: string
  body: string
  author: { name: string; avatar: string; role: "student" | "instructor" }
  createdAt: string
  replyCount: number
  upvotes: number
  pinned: boolean
  locked: boolean
  resolved: boolean
  subject: string
  replies: DiscussionReply[]
}

export type DiscussionReply = {
  id: string
  body: string
  author: { name: string; avatar: string; role: "student" | "instructor" }
  createdAt: string
  upvotes: number
  isAnswer: boolean
}

export type Notification = {
  id: string
  type: "subscription" | "progress" | "discussion" | "content" | "exam" | "system"
  title: string
  body: string
  createdAt: string
  read: boolean
  link?: string
}

export type Plan = {
  id: string
  name: string
  class: string
  price: number
  period: "monthly" | "yearly"
  features: string[]
  popular: boolean
}

export type Subscription = {
  id: string
  planName: string
  class: string
  status: "active" | "expired" | "cancelled"
  startDate: string
  renewDate: string
  price: number
}

export type Child = {
  id: string
  name: string
  avatar: string
  class: string
  progress: number
  badgeCount: number
  lastActive: string
  enrolledClasses: string[]
  subscriptionStatus: "active" | "expired" | "none"
  subjectProgress: { subject: string; percent: number }[]
  badges: Badge[]
  mockTestScores: { test: string; score: number; date: string }[]
}

// ─── USERS ─────────────────────────────────────────────────────────────────

export const currentUser: User = {
  id: "usr-001",
  name: "Rafiqul Islam",
  email: "rafiq@example.com",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rafiqul",
  role: "both",
  xp: 4250,
  streak: 12,
  joinedAt: "2025-01-15",
}

export const parentUser: User = {
  id: "usr-002",
  name: "Karim Hossain",
  email: "karim@example.com",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karim",
  role: "parent",
  xp: 0,
  streak: 0,
  joinedAt: "2025-02-01",
}

// ─── LESSONS ────────────────────────────────────────────────────────────────

const physicsLessons: Lesson[] = [
  { id: "les-001", title: "পদার্থবিজ্ঞানের পরিচিতি ও পরিমাপ", type: "video", duration: 28, order: 1, isFree: true, completed: true, progress: 100 },
  { id: "les-002", title: "ভেক্টর রাশি ও স্কেলার রাশি", type: "video", duration: 35, order: 2, isFree: true, completed: true, progress: 100 },
  { id: "les-003", title: "নিউটনের গতিসূত্র — প্রথম সূত্র", type: "video", duration: 42, order: 3, isFree: false, completed: true, progress: 100 },
  { id: "les-004", title: "নিউটনের গতিসূত্র — দ্বিতীয় ও তৃতীয় সূত্র", type: "video", duration: 48, order: 4, isFree: false, completed: false, progress: 60 },
  { id: "les-005", title: "অধ্যায় ১ — অনুশীলনী MCQ", type: "quiz", duration: 15, order: 5, isFree: false, completed: false, progress: 0 },
  { id: "les-006", title: "কাজ, শক্তি ও ক্ষমতা", type: "video", duration: 50, order: 6, isFree: false, completed: false, progress: 0 },
  { id: "les-007", title: "তরঙ্গ গতি ও শব্দ", type: "video", duration: 44, order: 7, isFree: false, completed: false, progress: 0 },
  { id: "les-008", title: "আলো ও আলোর প্রতিফলন", type: "video", duration: 38, order: 8, isFree: false, completed: false, progress: 0 },
]

const chemistryLessons: Lesson[] = [
  { id: "les-101", title: "পরমাণুর গঠন", type: "video", duration: 32, order: 1, isFree: true, completed: true, progress: 100 },
  { id: "les-102", title: "রাসায়নিক বন্ধন", type: "video", duration: 40, order: 2, isFree: true, completed: true, progress: 100 },
  { id: "les-103", title: "জারণ-বিজারণ বিক্রিয়া", type: "video", duration: 36, order: 3, isFree: false, completed: false, progress: 35 },
  { id: "les-104", title: "অম্ল, ক্ষার ও লবণ", type: "video", duration: 45, order: 4, isFree: false, completed: false, progress: 0 },
  { id: "les-105", title: "তড়িৎ রসায়ন", type: "video", duration: 52, order: 5, isFree: false, completed: false, progress: 0 },
  { id: "les-106", title: "জৈব যৌগের পরিচিতি", type: "video", duration: 38, order: 6, isFree: false, completed: false, progress: 0 },
]

const mathLessons: Lesson[] = [
  { id: "les-201", title: "বীজগাণিতিক রাশির সরলীকরণ", type: "video", duration: 30, order: 1, isFree: true, completed: true, progress: 100 },
  { id: "les-202", title: "সমীকরণ সমাধান", type: "video", duration: 35, order: 2, isFree: true, completed: true, progress: 100 },
  { id: "les-203", title: "অনুপাত ও সমানুপাত", type: "video", duration: 28, order: 3, isFree: false, completed: true, progress: 100 },
  { id: "les-204", title: "ত্রিকোণমিতি — মূল ধারণা", type: "video", duration: 42, order: 4, isFree: false, completed: false, progress: 45 },
  { id: "les-205", title: "ত্রিকোণমিতিক অনুপাত", type: "video", duration: 48, order: 5, isFree: false, completed: false, progress: 0 },
  { id: "les-206", title: "বৃত্তের সমীকরণ", type: "video", duration: 40, order: 6, isFree: false, completed: false, progress: 0 },
  { id: "les-207", title: "পরিসংখ্যান ও সম্ভাবনা", type: "video", duration: 55, order: 7, isFree: false, completed: false, progress: 0 },
]

const biologyLessons: Lesson[] = [
  { id: "les-301", title: "কোষ ও কোষের গঠন", type: "video", duration: 38, order: 1, isFree: true, completed: true, progress: 100 },
  { id: "les-302", title: "কোষ বিভাজন", type: "video", duration: 45, order: 2, isFree: false, completed: true, progress: 100 },
  { id: "les-303", title: "উদ্ভিদের পুষ্টি ও সালোকসংশ্লেষণ", type: "video", duration: 42, order: 3, isFree: false, completed: false, progress: 20 },
  { id: "les-304", title: "শ্বসন প্রক্রিয়া", type: "video", duration: 36, order: 4, isFree: false, completed: false, progress: 0 },
  { id: "les-305", title: "জনন ও বংশগতি", type: "video", duration: 50, order: 5, isFree: false, completed: false, progress: 0 },
]

const englishLessons: Lesson[] = [
  { id: "les-401", title: "Tenses — Present & Past", type: "video", duration: 30, order: 1, isFree: true, completed: true, progress: 100 },
  { id: "les-402", title: "Tenses — Future & Perfect", type: "video", duration: 32, order: 2, isFree: true, completed: true, progress: 100 },
  { id: "les-403", title: "Narration — Direct & Indirect Speech", type: "video", duration: 40, order: 3, isFree: false, completed: true, progress: 100 },
  { id: "les-404", title: "Voice — Active & Passive", type: "video", duration: 38, order: 4, isFree: false, completed: false, progress: 70 },
  { id: "les-405", title: "Paragraph Writing — Techniques", type: "reading", duration: 20, order: 5, isFree: false, completed: false, progress: 0 },
  { id: "les-406", title: "Essay & Composition", type: "reading", duration: 25, order: 6, isFree: false, completed: false, progress: 0 },
]

// ─── CLASSES ────────────────────────────────────────────────────────────────

export const classes: Class[] = [
  {
    id: "cls-001",
    slug: "ssc-science-2025",
    title: "SSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫",
    level: "SSC",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=340&fit=crop",
    subjectCount: 5,
    lessonCount: 32,
    description: "SSC বিজ্ঞান বিভাগের সম্পূর্ণ প্রস্তুতি। পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, গণিত ও ইংরেজি সহ সকল বিষয়ের ভিডিও লেকচার, MCQ প্র্যাকটিস ও মডেল টেস্ট।",
    entitlement: "subscribed",
    price: 1200,
    enrolledCount: 4850,
    rating: 4.8,
    modules: [
      {
        id: "mod-001",
        title: "পদার্থবিজ্ঞান",
        order: 1,
        subjects: [
          { id: "sub-001", title: "পদার্থবিজ্ঞান — ১ম পত্র", order: 1, lessonCount: 8, completedLessons: 4, lessons: physicsLessons },
          { id: "sub-002", title: "পদার্থবিজ্ঞান — ২য় পত্র", order: 2, lessonCount: 6, completedLessons: 2, lessons: physicsLessons.slice(0, 6) },
        ],
      },
      {
        id: "mod-002",
        title: "রসায়নবিজ্ঞান",
        order: 2,
        subjects: [
          { id: "sub-003", title: "রসায়নবিজ্ঞান — ১ম পত্র", order: 1, lessonCount: 6, completedLessons: 2, lessons: chemistryLessons },
          { id: "sub-004", title: "রসায়নবিজ্ঞান — ২য় পত্র", order: 2, lessonCount: 5, completedLessons: 0, lessons: chemistryLessons.slice(0, 5) },
        ],
      },
      {
        id: "mod-003",
        title: "গণিত",
        order: 3,
        subjects: [
          { id: "sub-005", title: "উচ্চতর গণিত — ১ম পত্র", order: 1, lessonCount: 7, completedLessons: 3, lessons: mathLessons },
        ],
      },
      {
        id: "mod-004",
        title: "জীববিজ্ঞান",
        order: 4,
        subjects: [
          { id: "sub-006", title: "জীববিজ্ঞান — ১ম পত্র", order: 1, lessonCount: 5, completedLessons: 2, lessons: biologyLessons },
        ],
      },
      {
        id: "mod-005",
        title: "ইংরেজি",
        order: 5,
        subjects: [
          { id: "sub-007", title: "English Grammar & Composition", order: 1, lessonCount: 6, completedLessons: 4, lessons: englishLessons },
        ],
      },
    ],
  },
  {
    id: "cls-002",
    slug: "hsc-science-2025",
    title: "HSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫",
    level: "HSC",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=340&fit=crop",
    subjectCount: 6,
    lessonCount: 48,
    description: "HSC বিজ্ঞান বিভাগের সম্পূর্ণ প্রস্তুতি। পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, উচ্চতর গণিত সহ বিশ্ববিদ্যালয় ভর্তি পরীক্ষার বিশেষ প্রস্তুতি।",
    entitlement: "preview",
    price: 1500,
    enrolledCount: 6200,
    rating: 4.9,
    modules: [
      {
        id: "mod-101",
        title: "পদার্থবিজ্ঞান",
        order: 1,
        subjects: [
          { id: "sub-101", title: "পদার্থবিজ্ঞান — ১ম পত্র", order: 1, lessonCount: 10, completedLessons: 0, lessons: physicsLessons },
          { id: "sub-102", title: "পদার্থবিজ্ঞান — ২য় পত্র", order: 2, lessonCount: 10, completedLessons: 0, lessons: physicsLessons },
        ],
      },
      {
        id: "mod-102",
        title: "রসায়নবিজ্ঞান",
        order: 2,
        subjects: [
          { id: "sub-103", title: "রসায়নবিজ্ঞান — ১ম পত্র", order: 1, lessonCount: 8, completedLessons: 0, lessons: chemistryLessons },
          { id: "sub-104", title: "রসায়নবিজ্ঞান — ২য় পত্র", order: 2, lessonCount: 8, completedLessons: 0, lessons: chemistryLessons },
        ],
      },
    ],
  },
  {
    id: "cls-003",
    slug: "hsc-commerce-2025",
    title: "HSC বাণিজ্য সম্পূর্ণ কোর্স ২০২৫",
    level: "HSC",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=340&fit=crop",
    subjectCount: 5,
    lessonCount: 40,
    description: "HSC বাণিজ্য বিভাগের হিসাববিজ্ঞান, ব্যবসায় সংগঠন ও ব্যবস্থাপনা, ফিন্যান্স, উৎপাদন ব্যবস্থাপনা সহ সম্পূর্ণ প্রস্তুতি।",
    entitlement: "locked",
    price: 1300,
    enrolledCount: 3100,
    rating: 4.7,
    modules: [],
  },
  {
    id: "cls-004",
    slug: "ssc-humanities-2025",
    title: "SSC মানবিক সম্পূর্ণ কোর্স ২০২৫",
    level: "SSC",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=340&fit=crop",
    subjectCount: 5,
    lessonCount: 35,
    description: "SSC মানবিক বিভাগের বাংলা, ইংরেজি, ইতিহাস, ভূগোল, পৌরনীতি সহ সম্পূর্ণ প্রস্তুতি। সৃজনশীল ও MCQ প্রশ্নের বিশেষ প্রস্তুতি।",
    entitlement: "free",
    price: 0,
    enrolledCount: 2800,
    rating: 4.6,
    modules: [
      {
        id: "mod-201",
        title: "বাংলা",
        order: 1,
        subjects: [
          { id: "sub-201", title: "বাংলা ১ম পত্র — সাহিত্য", order: 1, lessonCount: 8, completedLessons: 8, lessons: englishLessons },
          { id: "sub-202", title: "বাংলা ২য় পত্র — ব্যাকরণ", order: 2, lessonCount: 6, completedLessons: 6, lessons: englishLessons.slice(0, 6) },
        ],
      },
    ],
  },
  {
    id: "cls-005",
    slug: "admission-buet-2025",
    title: "BUET ভর্তি প্রস্তুতি ২০২৫",
    level: "Admission",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=340&fit=crop",
    subjectCount: 4,
    lessonCount: 60,
    description: "বুয়েট ভর্তি পরীক্ষার বিশেষ প্রস্তুতি। পদার্থবিজ্ঞান, রসায়ন, গণিত ও ইংরেজিতে উচ্চমানের প্রশিক্ষণ এবং বিগত বছরের প্রশ্নপত্র বিশ্লেষণ।",
    entitlement: "preview",
    price: 2000,
    enrolledCount: 1950,
    rating: 4.9,
    modules: [],
  },
  {
    id: "cls-006",
    slug: "admission-medical-2025",
    title: "মেডিকেল ভর্তি প্রস্তুতি ২০২৫",
    level: "Admission",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop",
    subjectCount: 4,
    lessonCount: 55,
    description: "মেডিকেল কলেজ ভর্তি পরীক্ষার সম্পূর্ণ প্রস্তুতি। জীববিজ্ঞান, রসায়ন, পদার্থবিজ্ঞান ও সাধারণ জ্ঞানে বিশেষ প্রস্তুতি।",
    entitlement: "locked",
    price: 1800,
    enrolledCount: 2400,
    rating: 4.8,
    modules: [],
  },
  {
    id: "cls-007",
    slug: "olympiad-math-science-2025",
    title: "গণিত ও বিজ্ঞান অলিম্পিয়াড প্রস্তুতি ২০২৫",
    level: "Olympiad",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop",
    subjectCount: 3,
    lessonCount: 45,
    description: "জাতীয় ও আন্তর্জাতিক গণিত এবং বিজ্ঞান অলিম্পিয়াডের জন্য বিশেষ প্রস্তুতি। সমস্যা সমাধানের কৌশল, প্রতিযোগিতামূলক গণিত এবং উচ্চতর ধারণা নিয়ে বিস্তারিত আলোচনা।",
    entitlement: "preview",
    price: 1800,
    enrolledCount: 1200,
    rating: 4.9,
    modules: [],
  },
  {
    id: "cls-008",
    slug: "ielts-complete-2025",
    title: "IELTS সম্পূর্ণ প্রস্তুতি ২০২৫",
    level: "IELTS",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=340&fit=crop",
    subjectCount: 4,
    lessonCount: 60,
    description: "IELTS Academic ও General Training উভয়ের জন্য পূর্ণাঙ্গ প্রস্তুতি। Listening, Reading, Writing ও Speaking — প্রতিটি সেকশনে Band 7+ পাওয়ার কৌশল এবং পর্যাপ্ত প্র্যাকটিস টেস্ট।",
    entitlement: "preview",
    price: 2200,
    enrolledCount: 3400,
    rating: 4.8,
    modules: [],
  },
  {
    id: "cls-009",
    slug: "job-preparation-bcs-bank-2025",
    title: "BCS ও ব্যাংক জব প্রস্তুতি ২০২৫",
    level: "Job Prep",
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=340&fit=crop",
    subjectCount: 5,
    lessonCount: 80,
    description: "BCS প্রিলিমিনারি, ব্যাংক ও সরকারি চাকরির পরীক্ষার জন্য বিশেষ প্রস্তুতি। বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান এবং কম্পিউটার — সব বিষয়ে বিগত বছরের প্রশ্ন বিশ্লেষণসহ।",
    entitlement: "locked",
    price: 2500,
    enrolledCount: 8700,
    rating: 4.7,
    modules: [],
  },
  {
    id: "cls-010",
    slug: "physics-olympiad-2025",
    title: "পদার্থবিজ্ঞান অলিম্পিয়াড মাস্টারক্লাস",
    level: "Olympiad",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=340&fit=crop",
    subjectCount: 2,
    lessonCount: 36,
    description: "বাংলাদেশ পদার্থবিজ্ঞান অলিম্পিয়াড ও IPhO প্রস্তুতির জন্য উন্নত কোর্স। মেকানিক্স, তড়িৎ, আলোকবিজ্ঞান এবং আধুনিক পদার্থবিজ্ঞানের জটিল সমস্যা সমাধান।",
    entitlement: "locked",
    price: 1600,
    enrolledCount: 680,
    rating: 5.0,
    modules: [],
  },
  {
    id: "cls-011",
    slug: "freelancing-digital-skills-2025",
    title: "ফ্রিল্যান্সিং ও ডিজিটাল দক্ষতা কোর্স",
    level: "Skills",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
    subjectCount: 4,
    lessonCount: 50,
    description: "আন্তর্জাতিক মার্কেটপ্লেসে ক্যারিয়ার গড়ার সম্পূর্ণ গাইড। Upwork, Fiverr-এ প্রোফাইল তৈরি, ক্লায়েন্ট ম্যানেজমেন্ট, গ্রাফিক ডিজাইন, ওয়েব ডিজাইনের মৌলিক বিষয়াবলি।",
    entitlement: "preview",
    price: 1400,
    enrolledCount: 5200,
    rating: 4.6,
    modules: [],
  },
]

// ─── IN-PROGRESS LESSONS (dashboard continue-watching) ──────────────────────

export const inProgressLessons = [
  { ...physicsLessons[3], classTitle: "SSC বিজ্ঞান", subject: "পদার্থবিজ্ঞান" },
  { ...mathLessons[3], classTitle: "SSC বিজ্ঞান", subject: "উচ্চতর গণিত" },
  { ...chemistryLessons[2], classTitle: "SSC বিজ্ঞান", subject: "রসায়নবিজ্ঞান" },
  { ...englishLessons[3], classTitle: "SSC বিজ্ঞান", subject: "English" },
]

// ─── BADGES ─────────────────────────────────────────────────────────────────

export const badges: Badge[] = [
  {
    id: "bdg-001",
    name: "First Step",
    description: "প্রথম পাঠ সম্পন্ন করুন",
    icon: "🎯",
    color: "bg-blue-100 text-blue-700",
    earnedAt: "2025-01-16",
    locked: false,
    criteria: "Complete your first lesson",
  },
  {
    id: "bdg-002",
    name: "Module Master",
    description: "একটি মডিউল ১০০% সম্পন্ন করুন",
    icon: "🏆",
    color: "bg-yellow-100 text-yellow-700",
    earnedAt: "2025-02-10",
    locked: false,
    criteria: "Complete all lessons in a module",
  },
  {
    id: "bdg-003",
    name: "Quiz Ace",
    description: "মক টেস্টে ৯০%+ স্কোর করুন",
    icon: "⭐",
    color: "bg-purple-100 text-purple-700",
    earnedAt: "2025-03-05",
    locked: false,
    criteria: "Score 90% or higher on a mock test",
  },
  {
    id: "bdg-004",
    name: "Consistent Learner",
    description: "৭ দিন ধারাবাহিকভাবে পড়ুন",
    icon: "🔥",
    color: "bg-orange-100 text-orange-700",
    earnedAt: "2025-03-20",
    locked: false,
    criteria: "Maintain a 7-day learning streak",
  },
  {
    id: "bdg-005",
    name: "Path Completer",
    description: "একটি লার্নিং পাথ সম্পন্ন করুন",
    icon: "🛤️",
    color: "bg-green-100 text-green-700",
    locked: true,
    criteria: "Complete a full learning path",
  },
  {
    id: "bdg-006",
    name: "Top Scorer",
    description: "লিডারবোর্ডে শীর্ষ ১০-এ আসুন",
    icon: "👑",
    color: "bg-red-100 text-red-700",
    locked: true,
    criteria: "Reach the top 10 on the class leaderboard",
  },
  {
    id: "bdg-007",
    name: "Discussion Star",
    description: "১০টি প্রশ্নে সাহায্য করুন",
    icon: "💬",
    color: "bg-teal-100 text-teal-700",
    locked: true,
    criteria: "Have 10 answers marked as helpful",
  },
  {
    id: "bdg-008",
    name: "Speed Reader",
    description: "একদিনে ৫টি পাঠ সম্পন্ন করুন",
    icon: "⚡",
    color: "bg-indigo-100 text-indigo-700",
    earnedAt: "2025-04-02",
    locked: false,
    criteria: "Complete 5 lessons in a single day",
  },
]

// ─── PRACTICE QUESTIONS ──────────────────────────────────────────────────────

export const practiceQuestions: Question[] = [
  {
    id: "q-001",
    text: "নিউটনের গতিসূত্র অনুযায়ী, একটি স্থির বস্তু স্থির থাকবে যদি—",
    options: [
      { id: "a", text: "তার উপর কোনো বল কাজ না করে" },
      { id: "b", text: "তার ভরবেগ পরিবর্তন হয়" },
      { id: "c", text: "তার উপর ঘর্ষণ বল কাজ করে" },
      { id: "d", text: "তার উপর মহাকর্ষ বল না থাকে" },
    ],
    correctOptionId: "a",
    explanation: "নিউটনের প্রথম সূত্র (জড়তার সূত্র) অনুযায়ী, বাহ্যিক বল প্রয়োগ না হলে একটি বস্তু তার অবস্থার পরিবর্তন করে না।",
    subject: "পদার্থবিজ্ঞান",
    difficulty: "easy",
  },
  {
    id: "q-002",
    text: "কোনো বস্তুর ভর ৫ kg এবং তার উপর ২০ N বল প্রয়োগ করা হলে ত্বরণ কত?",
    options: [
      { id: "a", text: "2 m/s²" },
      { id: "b", text: "4 m/s²" },
      { id: "c", text: "8 m/s²" },
      { id: "d", text: "100 m/s²" },
    ],
    correctOptionId: "b",
    explanation: "নিউটনের দ্বিতীয় সূত্র: F = ma → a = F/m = 20/5 = 4 m/s²",
    subject: "পদার্থবিজ্ঞান",
    difficulty: "easy",
  },
  {
    id: "q-003",
    text: "H₂SO₄ একটি—",
    options: [
      { id: "a", text: "দুর্বল অম্ল" },
      { id: "b", text: "শক্তিশালী অম্ল" },
      { id: "c", text: "দুর্বল ক্ষার" },
      { id: "d", text: "নিরপেক্ষ লবণ" },
    ],
    correctOptionId: "b",
    explanation: "সালফিউরিক অ্যাসিড (H₂SO₄) একটি শক্তিশালী দ্বিক্ষারীয় অম্ল যা জলীয় দ্রবণে সম্পূর্ণরূপে বিয়োজিত হয়।",
    subject: "রসায়নবিজ্ঞান",
    difficulty: "easy",
  },
  {
    id: "q-004",
    text: "কোষ বিভাজনের কোন দশায় ক্রোমোজোম সবচেয়ে স্পষ্ট দেখা যায়?",
    options: [
      { id: "a", text: "ইন্টারফেজ" },
      { id: "b", text: "প্রোফেজ" },
      { id: "c", text: "মেটাফেজ" },
      { id: "d", text: "অ্যানাফেজ" },
    ],
    correctOptionId: "c",
    explanation: "মেটাফেজ দশায় ক্রোমোজোম কোষের বিষুব তলে সজ্জিত হয় এবং সবচেয়ে ঘন ও স্পষ্ট থাকে।",
    subject: "জীববিজ্ঞান",
    difficulty: "medium",
  },
  {
    id: "q-005",
    text: "sin²θ + cos²θ = ?",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "2" },
      { id: "c", text: "1" },
      { id: "d", text: "-1" },
    ],
    correctOptionId: "c",
    explanation: "এটি ত্রিকোণমিতির মূল সর্বসমতা। যেকোনো কোণ θ-এর জন্য sin²θ + cos²θ = 1 সত্য।",
    subject: "গণিত",
    difficulty: "easy",
  },
  {
    id: "q-006",
    text: "Choose the correct passive form: 'She writes a letter.'",
    options: [
      { id: "a", text: "A letter is written by her." },
      { id: "b", text: "A letter was written by her." },
      { id: "c", text: "A letter has been written by her." },
      { id: "d", text: "A letter will be written by her." },
    ],
    correctOptionId: "a",
    explanation: "Simple Present active → is/am/are + V3 (passive). Subject 'she' → 'by her'.",
    subject: "ইংরেজি",
    difficulty: "easy",
  },
  {
    id: "q-007",
    text: "আলোর পূর্ণ অভ্যন্তরীণ প্রতিফলনের শর্ত কী?",
    options: [
      { id: "a", text: "আলো ঘন মাধ্যম থেকে হালকা মাধ্যমে যাবে এবং আপতন কোণ সংকট কোণের চেয়ে বড় হবে" },
      { id: "b", text: "আলো হালকা থেকে ঘন মাধ্যমে যাবে" },
      { id: "c", text: "আপতন কোণ ৪৫° হবে" },
      { id: "d", text: "আলোর তরঙ্গদৈর্ঘ্য ৫০০ nm-এর বেশি হবে" },
    ],
    correctOptionId: "a",
    explanation: "পূর্ণ অভ্যন্তরীণ প্রতিফলনের দুটি শর্ত: ১. আলো ঘন মাধ্যম থেকে হালকা মাধ্যমে যেতে হবে ২. আপতন কোণ > সংকট কোণ।",
    subject: "পদার্থবিজ্ঞান",
    difficulty: "medium",
  },
  {
    id: "q-008",
    text: "কোন তত্ত্ব অনুযায়ী অম্ল হলো প্রোটন দাতা?",
    options: [
      { id: "a", text: "আরহেনিয়াস তত্ত্ব" },
      { id: "b", text: "ব্রনস্টেড-লাউরি তত্ত্ব" },
      { id: "c", text: "লুইস তত্ত্ব" },
      { id: "d", text: "ডেলটন তত্ত্ব" },
    ],
    correctOptionId: "b",
    explanation: "ব্রনস্টেড-লাউরি তত্ত্বে অম্ল হলো প্রোটন (H⁺) দাতা এবং ক্ষার হলো প্রোটন গ্রহীতা।",
    subject: "রসায়নবিজ্ঞান",
    difficulty: "medium",
  },
  {
    id: "q-009",
    text: "একটি সমবাহু ত্রিভুজের প্রতিটি বাহুর দৈর্ঘ্য a হলে ক্ষেত্রফল কত?",
    options: [
      { id: "a", text: "a²/2" },
      { id: "b", text: "√3a²/2" },
      { id: "c", text: "√3a²/4" },
      { id: "d", text: "a²√3" },
    ],
    correctOptionId: "c",
    explanation: "সমবাহু ত্রিভুজের ক্ষেত্রফল = (√3/4) × a² যেখানে a হলো বাহুর দৈর্ঘ্য।",
    subject: "গণিত",
    difficulty: "medium",
  },
  {
    id: "q-010",
    text: "সালোকসংশ্লেষণের আলোক পর্যায় কোথায় ঘটে?",
    options: [
      { id: "a", text: "স্ট্রোমায়" },
      { id: "b", text: "সাইটোপ্লাজমে" },
      { id: "c", text: "থাইলাকয়েড ঝিল্লিতে" },
      { id: "d", text: "মাইটোকন্ড্রিয়ায়" },
    ],
    correctOptionId: "c",
    explanation: "আলোক পর্যায় (Light reaction) ক্লোরোপ্লাস্টের থাইলাকয়েড ঝিল্লিতে ঘটে, যেখানে সূর্যালোক শোষিত হয়।",
    subject: "জীববিজ্ঞান",
    difficulty: "medium",
  },
  {
    id: "q-011",
    text: "তড়িৎ পরিবাহিতার SI একক কী?",
    options: [
      { id: "a", text: "ওহম (Ω)" },
      { id: "b", text: "অ্যাম্পিয়ার (A)" },
      { id: "c", text: "সিমেন্স (S)" },
      { id: "d", text: "ভোল্ট (V)" },
    ],
    correctOptionId: "c",
    explanation: "তড়িৎ পরিবাহিতার SI একক সিমেন্স (S), যা রোধের বিপরীত রাশি। 1S = 1/Ω।",
    subject: "পদার্থবিজ্ঞান",
    difficulty: "hard",
  },
  {
    id: "q-012",
    text: "DNA-র দ্বিসূত্রক গঠনে অ্যাডেনিন কোন ক্ষারের সাথে যুক্ত থাকে?",
    options: [
      { id: "a", text: "গুয়ানিন" },
      { id: "b", text: "সাইটোসিন" },
      { id: "c", text: "থাইমিন" },
      { id: "d", text: "ইউরাসিল" },
    ],
    correctOptionId: "c",
    explanation: "DNA-তে অ্যাডেনিন (A) সর্বদা থাইমিন (T)-এর সাথে দুটি হাইড্রোজেন বন্ধন দ্বারা যুক্ত (Chargaff's rule)।",
    subject: "জীববিজ্ঞান",
    difficulty: "hard",
  },
]

// ─── MOCK TESTS ──────────────────────────────────────────────────────────────

export const mockTests: MockTest[] = [
  {
    id: "mt-001",
    title: "পদার্থবিজ্ঞান মডেল টেস্ট — ১",
    subject: "পদার্থবিজ্ঞান",
    duration: 25,
    questionCount: 25,
    passMark: 60,
    questions: practiceQuestions.filter(q => q.subject === "পদার্থবিজ্ঞান"),
    attempts: 2,
    bestScore: 76,
  },
  {
    id: "mt-002",
    title: "রসায়নবিজ্ঞান মডেল টেস্ট — ১",
    subject: "রসায়নবিজ্ঞান",
    duration: 25,
    questionCount: 25,
    passMark: 60,
    questions: practiceQuestions.filter(q => q.subject === "রসায়নবিজ্ঞান"),
    attempts: 1,
    bestScore: 88,
  },
  {
    id: "mt-003",
    title: "SSC সম্পূর্ণ প্রস্তুতি — ফুল মক টেস্ট",
    subject: "সকল বিষয়",
    duration: 90,
    questionCount: 100,
    passMark: 60,
    questions: practiceQuestions,
    attempts: 0,
  },
  {
    id: "mt-004",
    title: "গণিত মডেল টেস্ট — ১",
    subject: "গণিত",
    duration: 30,
    questionCount: 30,
    passMark: 60,
    questions: practiceQuestions.filter(q => q.subject === "গণিত"),
    attempts: 3,
    bestScore: 93,
  },
  {
    id: "mt-005",
    title: "জীববিজ্ঞান মডেল টেস্ট — ১",
    subject: "জীববিজ্ঞান",
    duration: 25,
    questionCount: 25,
    passMark: 60,
    questions: practiceQuestions.filter(q => q.subject === "জীববিজ্ঞান"),
    attempts: 0,
  },
]

// ─── DISCUSSIONS ──────────────────────────────────────────────────────────────

export const discussions: DiscussionThread[] = [
  {
    id: "dsc-001",
    title: "নিউটনের তৃতীয় সূত্র — ক্রিয়া ও প্রতিক্রিয়া একই বস্তুতে কাজ করে না কেন?",
    body: "স্যার বলেছেন ক্রিয়া ও প্রতিক্রিয়া সমান ও বিপরীত কিন্তু একই বস্তুতে কাজ করে না। কিন্তু আমি বুঝতে পারছি না — যদি একই বল হয়, তাহলে কেন আলাদা বস্তুতে কাজ করবে? কেউ সহজে বুঝিয়ে দেবেন?",
    author: { name: "Sakib Ahmed", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sakib", role: "student" },
    createdAt: "2025-05-28T10:30:00Z",
    replyCount: 4,
    upvotes: 12,
    pinned: false,
    locked: false,
    resolved: true,
    subject: "পদার্থবিজ্ঞান",
    replies: [
      {
        id: "rep-001",
        body: "খুব ভালো প্রশ্ন! উদাহরণ দিয়ে বলি: আপনি দেয়ালে হাত দিয়ে ধাক্কা দিলে (ক্রিয়া আপনার হাত → দেয়াল), দেয়ালও আপনার হাতে সমান বল দেয় (প্রতিক্রিয়া দেয়াল → হাত)। দুটি বল আলাদা বস্তুতে — তাই তারা কখনো ব্যালেন্স করে না।",
        author: { name: "ড. রহিম স্যার", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahim", role: "instructor" },
        createdAt: "2025-05-28T11:00:00Z",
        upvotes: 18,
        isAnswer: true,
      },
      {
        id: "rep-002",
        body: "স্যারের ব্যাখ্যাটা পারফেক্ট। সহজ কথায়: একটি বল A-তে, অপরটি B-তে। তাই দুটি আলাদা object-এ কাজ করে।",
        author: { name: "Nadia Islam", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Nadia", role: "student" },
        createdAt: "2025-05-28T12:15:00Z",
        upvotes: 7,
        isAnswer: false,
      },
    ],
  },
  {
    id: "dsc-002",
    title: "রাসায়নিক সমীকরণ balance করার সহজ পদ্ধতি কী?",
    body: "রাসায়নিক সমীকরণ balance করতে গেলে অনেকসময় confused হয়ে যাই। বিশেষত জটিল সমীকরণের ক্ষেত্রে। কেউ systematic পদ্ধতি শেখাবেন?",
    author: { name: "Fatema Begum", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Fatema", role: "student" },
    createdAt: "2025-05-27T14:20:00Z",
    replyCount: 3,
    upvotes: 9,
    pinned: true,
    locked: false,
    resolved: false,
    subject: "রসায়নবিজ্ঞান",
    replies: [
      {
        id: "rep-101",
        body: "Inspection method দিয়ে শুরু করো। প্রথমে সবচেয়ে জটিল compound বা সবচেয়ে বেশি atom আছে এমন compound থেকে শুরু করো। তারপর একে একে বাকিগুলো balance করো।",
        author: { name: "Kamal Hossain", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kamal", role: "student" },
        createdAt: "2025-05-27T15:30:00Z",
        upvotes: 5,
        isAnswer: false,
      },
    ],
  },
  {
    id: "dsc-003",
    title: "ত্রিকোণমিতির সূত্রগুলো মনে রাখার উপায়?",
    body: "sin, cos, tan-এর values এবং compound angle formula মনে রাখতে পারি না। কোনো trick আছে?",
    author: { name: "Rafi Khan", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rafi", role: "student" },
    createdAt: "2025-05-26T09:00:00Z",
    replyCount: 6,
    upvotes: 15,
    pinned: false,
    locked: false,
    resolved: true,
    subject: "গণিত",
    replies: [
      {
        id: "rep-201",
        body: "SOH-CAH-TOA মনে রাখো: Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent। আর unit circle ভালো করে আঁকতে পারলে special angles মুখস্থ করতে হবে না।",
        author: { name: "গণিত স্যার", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Math", role: "instructor" },
        createdAt: "2025-05-26T10:00:00Z",
        upvotes: 20,
        isAnswer: true,
      },
    ],
  },
  {
    id: "dsc-004",
    title: "Passive voice-এ 'by' কখন ব্যবহার করতে হয়?",
    body: "Sometimes I see passive sentences without 'by'. When is 'by' required and when can we omit it?",
    author: { name: "Mim Akter", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mim", role: "student" },
    createdAt: "2025-05-25T16:45:00Z",
    replyCount: 2,
    upvotes: 8,
    pinned: false,
    locked: false,
    resolved: false,
    subject: "ইংরেজি",
    replies: [],
  },
  {
    id: "dsc-005",
    title: "কোষ বিভাজনে মাইটোসিস ও মিওসিসের পার্থক্য মনে রাখার উপায়?",
    body: "পরীক্ষায় মাঝে মাঝে গুলিয়ে যায়। কেউ তুলনামূলক টেবিল বা সহজ কোনো trick বলুন।",
    author: { name: "Tanvir Ahmed", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Tanvir", role: "student" },
    createdAt: "2025-05-24T11:30:00Z",
    replyCount: 5,
    upvotes: 11,
    pinned: false,
    locked: false,
    resolved: true,
    subject: "জীববিজ্ঞান",
    replies: [
      {
        id: "rep-301",
        body: "সহজ trick: মাইটোসিস = 'Make Two' (1টি থেকে 2টি একই কোষ), মিওসিস = 'Make Four' (1টি থেকে 4টি হ্যাপ্লয়েড কোষ)। মাইটোসিস সব কোষে হয়, মিওসিস শুধু জনন কোষে।",
        author: { name: "বায়োলজি ম্যাডাম", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Bio", role: "instructor" },
        createdAt: "2025-05-24T13:00:00Z",
        upvotes: 14,
        isAnswer: true,
      },
    ],
  },
]

// ─── NOTIFICATIONS ─────────────────────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: "ntf-001",
    type: "content",
    title: "নতুন পাঠ যুক্ত হয়েছে",
    body: "SSC বিজ্ঞান কোর্সে পদার্থবিজ্ঞানের নতুন পাঠ 'তরঙ্গ গতি ও শব্দ' যুক্ত হয়েছে।",
    createdAt: "2025-06-04T08:00:00Z",
    read: false,
  },
  {
    id: "ntf-002",
    type: "progress",
    title: "অভিনন্দন! নতুন ব্যাজ অর্জন করেছেন",
    body: "আপনি 'Speed Reader' ব্যাজ অর্জন করেছেন। একদিনে ৫টি পাঠ সম্পন্ন করার জন্য অভিনন্দন!",
    createdAt: "2025-06-03T20:30:00Z",
    read: false,
    link: "/student/profile/badges",
  },
  {
    id: "ntf-003",
    type: "discussion",
    title: "আপনার প্রশ্নে নতুন উত্তর",
    body: "আপনার প্রশ্ন 'নিউটনের তৃতীয় সূত্র'-তে ড. রহিম স্যার উত্তর দিয়েছেন।",
    createdAt: "2025-06-03T11:00:00Z",
    read: false,
    link: "/student/discussions",
  },
  {
    id: "ntf-004",
    type: "exam",
    title: "মক টেস্ট স্মরণ করিয়ে দিচ্ছি",
    body: "'SSC সম্পূর্ণ প্রস্তুতি — ফুল মক টেস্ট' এখনও দেওয়া হয়নি। আজই দিন।",
    createdAt: "2025-06-02T09:00:00Z",
    read: true,
    link: "/student/practice/mock-tests",
  },
  {
    id: "ntf-005",
    type: "subscription",
    title: "সাবস্ক্রিপশন নবায়নের সময় আসছে",
    body: "SSC বিজ্ঞান কোর্সের সাবস্ক্রিপশন ৭ দিনের মধ্যে শেষ হবে। নবায়ন করুন।",
    createdAt: "2025-06-01T10:00:00Z",
    read: true,
    link: "/student/subscribe/my-plans",
  },
  {
    id: "ntf-006",
    type: "progress",
    title: "রসায়ন মডিউল সম্পন্ন!",
    body: "অভিনন্দন! আপনি রসায়নবিজ্ঞান ১ম পত্রের সকল পাঠ সম্পন্ন করেছেন।",
    createdAt: "2025-05-30T19:00:00Z",
    read: true,
  },
  {
    id: "ntf-007",
    type: "content",
    title: "লাইভ ক্লাস — আগামীকাল",
    body: "পদার্থবিজ্ঞানের বিশেষ লাইভ সেশন আগামীকাল বিকেল ৪টায়। যোগ দিন।",
    createdAt: "2025-05-29T12:00:00Z",
    read: true,
  },
  {
    id: "ntf-008",
    type: "system",
    title: "নতুন বৈশিষ্ট্য: নোটস",
    body: "এখন থেকে ভিডিও দেখার সময় timestamp-ভিত্তিক নোট নিতে পারবেন।",
    createdAt: "2025-05-25T08:00:00Z",
    read: true,
  },
]

// ─── SUBSCRIPTION PLANS ──────────────────────────────────────────────────────

export const plans: Plan[] = [
  {
    id: "pln-001",
    name: "SSC বিজ্ঞান",
    class: "SSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫",
    price: 1200,
    period: "monthly",
    popular: true,
    features: [
      "সকল বিষয়ের ভিডিও লেকচার",
      "অধ্যায়ভিত্তিক MCQ প্র্যাকটিস",
      "১০টি ফুল মক টেস্ট",
      "ডাউনলোড সুবিধা (অফলাইন দেখা)",
      "লাইভ Q&A সেশন",
      "বিশেষজ্ঞ শিক্ষকের সাথে আলোচনা",
    ],
  },
  {
    id: "pln-002",
    name: "HSC বিজ্ঞান",
    class: "HSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫",
    price: 1500,
    period: "monthly",
    popular: false,
    features: [
      "সকল বিষয়ের ভিডিও লেকচার",
      "ভর্তি পরীক্ষা বিশেষ প্রস্তুতি",
      "১৫টি ফুল মক টেস্ট",
      "বিগত বছরের প্রশ্নপত্র সমাধান",
      "ডাউনলোড সুবিধা",
      "লাইভ Q&A সেশন",
    ],
  },
  {
    id: "pln-003",
    name: "SSC বিজ্ঞান — বার্ষিক",
    class: "SSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫",
    price: 9600,
    period: "yearly",
    popular: false,
    features: [
      "মাসিক প্যাকেজের সকল সুবিধা",
      "৩৩% ছাড় (₳১২০০ × ১২ = ₳১৪৪০০ এর পরিবর্তে ₳৯৬০০)",
      "বিশেষ শিক্ষার্থী সহায়তা",
      "মাসিক পারফরম্যান্স রিপোর্ট",
    ],
  },
  {
    id: "pln-004",
    name: "BUET ভর্তি প্রস্তুতি",
    class: "BUET ভর্তি প্রস্তুতি ২০২৫",
    price: 2000,
    period: "monthly",
    popular: false,
    features: [
      "পদার্থ, রসায়ন, গণিত ও ইংরেজি",
      "BUET বিশেষ কৌশল ও টিপস",
      "২০টি সাব্জেক্ট মক টেস্ট",
      "৫টি ফুল মডেল টেস্ট",
      "বিগত ১০ বছরের প্রশ্ন সমাধান",
      "১-অন-১ মেন্টরশিপ সেশন",
    ],
  },
]

export const mySubscriptions: Subscription[] = [
  {
    id: "sub-001",
    planName: "SSC বিজ্ঞান",
    class: "SSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫",
    status: "active",
    startDate: "2025-05-01",
    renewDate: "2025-07-01",
    price: 1200,
  },
]

// ─── PARENT CHILDREN ─────────────────────────────────────────────────────────

export const children: Child[] = [
  {
    id: "std-001",
    name: "Arif Hossain",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Arif",
    class: "SSC 2025",
    progress: 62,
    badgeCount: 4,
    lastActive: "2025-06-04T08:30:00Z",
    enrolledClasses: ["SSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫"],
    subscriptionStatus: "active",
    subjectProgress: [
      { subject: "পদার্থবিজ্ঞান", percent: 55 },
      { subject: "রসায়নবিজ্ঞান", percent: 40 },
      { subject: "গণিত", percent: 72 },
      { subject: "জীববিজ্ঞান", percent: 60 },
      { subject: "ইংরেজি", percent: 80 },
    ],
    badges: badges.slice(0, 4),
    mockTestScores: [
      { test: "পদার্থবিজ্ঞান মডেল টেস্ট — ১", score: 76, date: "2025-05-15" },
      { test: "রসায়নবিজ্ঞান মডেল টেস্ট — ১", score: 88, date: "2025-05-22" },
      { test: "গণিত মডেল টেস্ট — ১", score: 93, date: "2025-05-29" },
    ],
  },
  {
    id: "std-002",
    name: "Sadia Hossain",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sadia",
    class: "HSC 2025",
    progress: 38,
    badgeCount: 2,
    lastActive: "2025-06-03T17:00:00Z",
    enrolledClasses: ["HSC বিজ্ঞান সম্পূর্ণ কোর্স ২০২৫"],
    subscriptionStatus: "active",
    subjectProgress: [
      { subject: "পদার্থবিজ্ঞান", percent: 35 },
      { subject: "রসায়নবিজ্ঞান", percent: 42 },
      { subject: "উচ্চতর গণিত", percent: 30 },
      { subject: "জীববিজ্ঞান", percent: 45 },
    ],
    badges: badges.slice(0, 2),
    mockTestScores: [
      { test: "পদার্থবিজ্ঞান মডেল টেস্ট — ১", score: 64, date: "2025-05-20" },
    ],
  },
]

// ─── LEARNING PATHS ──────────────────────────────────────────────────────────

export const learningPaths = [
  {
    id: "path-001",
    title: "SSC বিজ্ঞান মাস্টারি পাথ",
    description: "৩ মাসে SSC বিজ্ঞানের সম্পূর্ণ প্রস্তুতি",
    steps: [
      { id: "step-1", title: "পদার্থবিজ্ঞান মৌলিক ধারণা", completed: true, locked: false },
      { id: "step-2", title: "রসায়নবিজ্ঞান মৌলিক ধারণা", completed: true, locked: false },
      { id: "step-3", title: "গণিত ও ত্রিকোণমিতি", completed: false, locked: false },
      { id: "step-4", title: "জীববিজ্ঞান কোষ ও জনন", completed: false, locked: true },
      { id: "step-5", title: "ইন্টিগ্রেটেড মক টেস্ট", completed: false, locked: true },
    ],
    completedSteps: 2,
    totalSteps: 5,
    estimatedWeeks: 12,
  },
]
