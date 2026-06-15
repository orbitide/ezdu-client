import type { WeakTopic, LearningPlanItem, SubjectCompletion } from "@/lib/types/learning-progress"

export const weakTopics: WeakTopic[] = [
  {
    id: "weak-1",
    subject: "পদার্থবিজ্ঞান",
    topic: "গতিবিদ্যা",
    masteryPercent: 45,
    courseId: "course-physics-hsc",
    chapterId: "ch-phy-2",
  },
  {
    id: "weak-2",
    subject: "রসায়ন",
    topic: "তড়িৎ রসায়ন",
    masteryPercent: 58,
    courseId: "course-chemistry-hsc",
    chapterId: "ch-chem-1",
  },
  {
    id: "weak-3",
    subject: "উচ্চতর গণিত",
    topic: "ত্রিকোণমিতি",
    masteryPercent: 38,
    courseId: "course-math-admission",
    chapterId: "ch-math-1",
  },
]

export const learningPlan: LearningPlanItem[] = [
  {
    id: "lp-1",
    title: "গতিবিদ্যা - গতির সমীকরণ লেসন সম্পন্ন করো",
    description: "ইন্টারঅ্যাক্টিভ এক্সপ্লেইনার দিয়ে গতির তিনটি সমীকরণ অনুশীলন করো।",
    durationMinutes: 18,
    courseId: "course-physics-hsc",
    lessonId: "lsn-phy-2-2",
    done: false,
  },
  {
    id: "lp-2",
    title: "তড়িৎ রসায়ন রিভিশন ফ্ল্যাশকার্ড দেখো",
    description: "তড়িৎ রসায়ন অধ্যায়ের মূল ধারণাগুলো ফ্ল্যাশকার্ড দিয়ে রিভিশন করো।",
    durationMinutes: 10,
    courseId: "course-chemistry-hsc",
    done: false,
  },
  {
    id: "lp-3",
    title: "নিউটনের গতিসূত্র ভিডিও দেখো",
    description: "নিউটনের তিনটি গতিসূত্র সম্পর্কে ভিডিও লেসন সম্পন্ন করো।",
    durationMinutes: 14,
    courseId: "course-physics-hsc",
    lessonId: "lsn-phy-2-3",
    done: false,
  },
]

export const subjectCompletions: SubjectCompletion[] = [
  { subject: "পদার্থবিজ্ঞান", completedLessons: 2, totalLessons: 5 },
  { subject: "রসায়ন", completedLessons: 2, totalLessons: 3 },
  { subject: "বাংলা", completedLessons: 0, totalLessons: 3 },
  { subject: "উচ্চতর গণিত", completedLessons: 0, totalLessons: 3 },
]
