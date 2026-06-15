import type { Course, Chapter, FlashcardDeck } from "@/lib/types/course"

export const courses: Course[] = [
  {
    id: "course-physics-hsc",
    title: "এইচএসসি পদার্থবিজ্ঞান - প্রথম পত্র",
    description: "গতি, বল, কাজ-শক্তি ও তরঙ্গ সহ এইচএসসি পদার্থবিজ্ঞান প্রথম পত্রের সম্পূর্ণ সিলেবাস।",
    examGroup: "এইচএসসি বিজ্ঞান",
    subject: "পদার্থবিজ্ঞান",
    coverColor: "from-blue-500 to-cyan-500",
    chapterIds: ["ch-phy-1", "ch-phy-2"],
    totalLessons: 5,
    enrolled: true,
    progressPercent: 40,
  },
  {
    id: "course-chemistry-hsc",
    title: "এইচএসসি রসায়ন - দ্বিতীয় পত্র",
    description: "জারণ-বিজারণ বিক্রিয়া, তড়িৎ রসায়ন এবং জৈব রসায়নের গুরুত্বপূর্ণ অধ্যায়সমূহ।",
    examGroup: "এইচএসসি বিজ্ঞান",
    subject: "রসায়ন",
    coverColor: "from-emerald-500 to-teal-500",
    chapterIds: ["ch-chem-1"],
    totalLessons: 3,
    enrolled: true,
    progressPercent: 66,
  },
  {
    id: "course-bangla-ssc",
    title: "এসএসসি বাংলা সাহিত্য",
    description: "মধ্যযুগ থেকে আধুনিক যুগের বাংলা সাহিত্যের গুরুত্বপূর্ণ কবি, লেখক ও রচনাসমূহ।",
    examGroup: "এসএসসি",
    subject: "বাংলা",
    coverColor: "from-amber-500 to-orange-500",
    chapterIds: ["ch-bangla-1"],
    totalLessons: 3,
    enrolled: false,
    progressPercent: 0,
  },
  {
    id: "course-math-admission",
    title: "ভর্তি পরীক্ষা: উচ্চতর গণিত প্রস্তুতি",
    description: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য ত্রিকোণমিতি, ক্যালকুলাস ও বীজগণিতের নিবিড় অনুশীলন।",
    examGroup: "ভর্তি পরীক্ষা",
    subject: "উচ্চতর গণিত",
    coverColor: "from-violet-500 to-purple-500",
    chapterIds: ["ch-math-1"],
    totalLessons: 3,
    enrolled: false,
    progressPercent: 0,
  },
]

export const chapters: Chapter[] = [
  {
    id: "ch-phy-1",
    courseId: "course-physics-hsc",
    title: "অধ্যায় ১: ভৌত জগৎ ও পরিমাপ",
    order: 1,
    lessonIds: ["lsn-phy-1-1", "lsn-phy-1-2"],
    linkedQuizId: "quiz-1",
  },
  {
    id: "ch-phy-2",
    courseId: "course-physics-hsc",
    title: "অধ্যায় ২: গতিবিদ্যা",
    order: 2,
    lessonIds: ["lsn-phy-2-1", "lsn-phy-2-2", "lsn-phy-2-3"],
    linkedQuizId: "mt-1",
  },
  {
    id: "ch-chem-1",
    courseId: "course-chemistry-hsc",
    title: "অধ্যায় ১: তড়িৎ রসায়ন",
    order: 1,
    lessonIds: ["lsn-chem-1-1", "lsn-chem-1-2", "lsn-chem-1-3"],
    linkedQuizId: "quiz-3",
  },
  {
    id: "ch-bangla-1",
    courseId: "course-bangla-ssc",
    title: "অধ্যায় ১: মধ্যযুগের সাহিত্য",
    order: 1,
    lessonIds: ["lsn-bangla-1-1", "lsn-bangla-1-2", "lsn-bangla-1-3"],
    linkedQuizId: "quiz-2",
  },
  {
    id: "ch-math-1",
    courseId: "course-math-admission",
    title: "অধ্যায় ১: ত্রিকোণমিতি",
    order: 1,
    lessonIds: ["lsn-math-1-1", "lsn-math-1-2", "lsn-math-1-3"],
    linkedQuizId: "quiz-1",
  },
]

export const flashcardDecks: FlashcardDeck[] = [
  {
    id: "deck-phy-1",
    courseId: "course-physics-hsc",
    title: "ভৌত জগৎ ও গতিবিদ্যা - রিভিশন",
    cards: [
      { id: "fc-1", front: "নিউটনের দ্বিতীয় সূত্র কী?", back: "F = ma, অর্থাৎ বল = ভর × ত্বরণ।" },
      { id: "fc-2", front: "ভরবেগের একক কী?", back: "kg·m/s" },
      { id: "fc-3", front: "সমত্বরণে চলমান বস্তুর গতির প্রথম সমীকরণ কী?", back: "v = u + at" },
      { id: "fc-4", front: "স্থিতিজাড্য কী?", back: "বস্তুর নিজের অবস্থা পরিবর্তনে অনিচ্ছা বা বাধা প্রদানের ধর্ম।" },
    ],
  },
  {
    id: "deck-chem-1",
    courseId: "course-chemistry-hsc",
    title: "তড়িৎ রসায়ন - রিভিশন",
    cards: [
      { id: "fc-5", front: "জারণ কী?", back: "ইলেকট্রন ত্যাগের প্রক্রিয়া, যাতে জারণ সংখ্যা বৃদ্ধি পায়।" },
      { id: "fc-6", front: "বিজারণ কী?", back: "ইলেকট্রন গ্রহণের প্রক্রিয়া, যাতে জারণ সংখ্যা কমে যায়।" },
      { id: "fc-7", front: "তড়িৎ বিশ্লেষণ কী?", back: "তড়িৎ প্রবাহের মাধ্যমে রাসায়নিক বিক্রিয়া সংঘটিত করার প্রক্রিয়া।" },
    ],
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id)
}

export function getChaptersByCourseId(courseId: string): Chapter[] {
  return chapters.filter((c) => c.courseId === courseId).sort((a, b) => a.order - b.order)
}

export function getFlashcardDeckByCourseId(courseId: string): FlashcardDeck | undefined {
  return flashcardDecks.find((d) => d.courseId === courseId)
}
