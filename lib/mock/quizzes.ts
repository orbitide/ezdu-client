import type { QuizConfig } from "@/lib/types/quiz"

export const quizzes: QuizConfig[] = [
  {
    id: "quiz-1",
    type: "quick",
    title: "ত্রিকোণমিতি দ্রুত প্র্যাকটিস",
    questionIds: ["q7", "q8", "q9"],
    durationSeconds: 5 * 60,
    xpReward: 50,
    coinReward: 20,
  },
  {
    id: "quiz-2",
    type: "quick",
    title: "বাংলা সাহিত্য: মধ্যযুগ",
    questionIds: ["q10", "q11", "q12"],
    durationSeconds: 5 * 60,
    xpReward: 40,
    coinReward: 15,
  },
  {
    id: "quiz-3",
    type: "quick",
    title: "সেল বিভাজন চ্যালেঞ্জ",
    questionIds: ["q5", "q6"],
    durationSeconds: 4 * 60,
    xpReward: 70,
    coinReward: 25,
  },
  {
    id: "mt-1",
    type: "model",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০৩",
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
    durationSeconds: 30 * 60,
    xpReward: 200,
    coinReward: 100,
  },
]

export function getQuizById(id: string): QuizConfig | undefined {
  return quizzes.find((q) => q.id === id)
}
