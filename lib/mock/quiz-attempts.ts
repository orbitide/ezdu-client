import type { QuizAttempt, MistakeQuestion } from "@/lib/types/progress"

export const quizAttempts: QuizAttempt[] = [
  {
    id: "attempt-1",
    quizId: "mt-2",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০২",
    type: "model",
    date: "2026-06-14",
    total: 10,
    correct: 7,
    incorrect: 2,
    skipped: 1,
    xpEarned: 140,
    coinsEarned: 70,
    timeTakenSeconds: 1380,
  },
  {
    id: "attempt-2",
    quizId: "mt-3",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০১",
    type: "model",
    date: "2026-06-12",
    total: 10,
    correct: 6,
    incorrect: 3,
    skipped: 1,
    xpEarned: 120,
    coinsEarned: 60,
    timeTakenSeconds: 1620,
  },
  {
    id: "attempt-3",
    quizId: "quick-trigonometry",
    title: "ত্রিকোণমিতি দ্রুত প্র্যাকটিস",
    type: "quick",
    date: "2026-06-11",
    total: 3,
    correct: 3,
    incorrect: 0,
    skipped: 0,
    xpEarned: 50,
    coinsEarned: 20,
    timeTakenSeconds: 210,
  },
  {
    id: "attempt-4",
    quizId: "quick-cell-division",
    title: "সেল বিভাজন চ্যালেঞ্জ",
    type: "quick",
    date: "2026-06-09",
    total: 2,
    correct: 1,
    incorrect: 1,
    skipped: 0,
    xpEarned: 35,
    coinsEarned: 12,
    timeTakenSeconds: 150,
  },
]

export const mistakeQuestions: MistakeQuestion[] = [
  { questionId: "q2", attemptId: "attempt-1", attemptTitle: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০২", date: "2026-06-14" },
  { questionId: "q4", attemptId: "attempt-1", attemptTitle: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০২", date: "2026-06-14" },
  { questionId: "q3", attemptId: "attempt-2", attemptTitle: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০১", date: "2026-06-12" },
  { questionId: "q9", attemptId: "attempt-2", attemptTitle: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০১", date: "2026-06-12" },
  { questionId: "q12", attemptId: "attempt-2", attemptTitle: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০১", date: "2026-06-12" },
  { questionId: "q6", attemptId: "attempt-4", attemptTitle: "সেল বিভাজন চ্যালেঞ্জ", date: "2026-06-09" },
]

export function getAttemptById(id: string): QuizAttempt | undefined {
  return quizAttempts.find((a) => a.id === id)
}
