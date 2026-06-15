import type { StudyPlanItem, SubjectRotation } from "@/lib/types/study-plan"

export const todaysStudyPlan: StudyPlanItem[] = [
  { id: "sp-1", subject: "পদার্থবিজ্ঞান", topic: "গতি ও বল", durationMinutes: 30, done: true },
  { id: "sp-2", subject: "রসায়ন", topic: "জারণ-বিজারণ", durationMinutes: 25, done: true },
  { id: "sp-3", subject: "জীববিজ্ঞান", topic: "কোষ বিভাজন", durationMinutes: 30, done: false },
  { id: "sp-4", subject: "উচ্চতর গণিত", topic: "ত্রিকোণমিতি", durationMinutes: 20, done: false },
  { id: "sp-5", subject: "ইংরেজি", topic: "ভোকাবুলারি অনুশীলন", durationMinutes: 15, done: false },
]

export const subjectRotation: SubjectRotation[] = [
  { day: "রবিবার", subjects: ["পদার্থবিজ্ঞান", "রসায়ন"] },
  { day: "সোমবার", subjects: ["জীববিজ্ঞান", "উচ্চতর গণিত"] },
  { day: "মঙ্গলবার", subjects: ["বাংলা", "ইংরেজি"] },
  { day: "বুধবার", subjects: ["পদার্থবিজ্ঞান", "জীববিজ্ঞান"] },
  { day: "বৃহস্পতিবার", subjects: ["রসায়ন", "উচ্চতর গণিত"] },
  { day: "শুক্রবার", subjects: ["রিভিশন", "মডেল টেস্ট"] },
  { day: "শনিবার", subjects: ["বাংলা", "ইংরেজি", "কারেন্ট অ্যাফেয়ার্স"] },
]
