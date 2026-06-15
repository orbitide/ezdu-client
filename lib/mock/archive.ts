import type { ArchiveExam } from "@/lib/types/archive"

export const archiveExams: ArchiveExam[] = [
  {
    id: "arch-1",
    title: "এইচএসসি পরীক্ষা ২০২৪",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2024,
    board: "ঢাকা বোর্ড",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 180,
    coinReward: 90,
    attempted: true,
  },
  {
    id: "arch-2",
    title: "এইচএসসি পরীক্ষা ২০২৩",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2023,
    board: "রাজশাহী বোর্ড",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 180,
    coinReward: 90,
    attempted: false,
  },
  {
    id: "arch-3",
    title: "এইচএসসি পরীক্ষা ২০২২",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2022,
    board: "চট্টগ্রাম বোর্ড",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 180,
    coinReward: 90,
    attempted: false,
  },
  {
    id: "arch-4",
    title: "এসএসসি পরীক্ষা ২০২৪",
    examGroup: "এসএসসি",
    year: 2024,
    board: "ঢাকা বোর্ড",
    questionCount: 10,
    durationMinutes: 25,
    xpReward: 150,
    coinReward: 75,
    attempted: false,
  },
]

export function getArchiveExamById(id: string): ArchiveExam | undefined {
  return archiveExams.find((exam) => exam.id === id)
}
