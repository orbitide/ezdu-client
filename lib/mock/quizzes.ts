import type { QuizConfig } from "@/lib/types/quiz"
import { questions } from "@/lib/mock/questions"

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
  {
    id: "mt-2",
    type: "model",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০২",
    questionIds: ["q2", "q4", "q6", "q8", "q10", "q1", "q3", "q5", "q7", "q9"],
    durationSeconds: 30 * 60,
    xpReward: 200,
    coinReward: 100,
  },
  {
    id: "mt-3",
    type: "model",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০১",
    questionIds: ["q3", "q5", "q7", "q9", "q1", "q2", "q4", "q6", "q8", "q10"],
    durationSeconds: 30 * 60,
    xpReward: 200,
    coinReward: 100,
  },
  {
    id: "preset-1",
    type: "preset",
    title: "৭ দিনের রিভিশন চ্যালেঞ্জ - দিন ১",
    questionIds: ["q1", "q3", "q5", "q7", "q9", "q11", "q13", "q2", "q4", "q6"],
    durationSeconds: 30 * 60,
    xpReward: 150,
    coinReward: 80,
  },
  {
    id: "preset-2",
    type: "preset",
    title: "দুর্বল টপিক রিভিশন সেট",
    questionIds: ["q2", "q4", "q6", "q8", "q10", "q12", "q14", "q1", "q3", "q5"],
    durationSeconds: 30 * 60,
    xpReward: 150,
    coinReward: 80,
  },
  {
    id: "arch-1",
    type: "archive",
    title: "এইচএসসি পরীক্ষা ২০২৪",
    questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
    durationSeconds: 30 * 60,
    xpReward: 180,
    coinReward: 90,
  },
  {
    id: "arch-2",
    type: "archive",
    title: "এইচএসসি পরীক্ষা ২০২৩",
    questionIds: ["q2", "q4", "q6", "q8", "q10", "q1", "q3", "q5", "q7", "q9"],
    durationSeconds: 30 * 60,
    xpReward: 180,
    coinReward: 90,
  },
  {
    id: "arch-3",
    type: "archive",
    title: "এইচএসসি পরীক্ষা ২০২২",
    questionIds: ["q3", "q5", "q7", "q9", "q1", "q2", "q4", "q6", "q8", "q10"],
    durationSeconds: 30 * 60,
    xpReward: 180,
    coinReward: 90,
  },
  {
    id: "arch-4",
    type: "archive",
    title: "এসএসসি পরীক্ষা ২০২৪",
    questionIds: ["q1", "q3", "q5", "q7", "q9", "q11", "q13", "q2", "q4", "q6"],
    durationSeconds: 25 * 60,
    xpReward: 150,
    coinReward: 75,
  },
]

export function getQuizById(id: string): QuizConfig | undefined {
  return quizzes.find((q) => q.id === id)
}

const SUBJECT_NAME_BY_ID: Record<string, string> = {
  physics: "পদার্থবিজ্ঞান",
  chemistry: "রসায়ন",
  biology: "জীববিজ্ঞান",
  "higher-math": "উচ্চতর গণিত",
  bangla: "বাংলা",
  english: "ইংরেজি",
}

export function getQuickChallengeQuiz(subjectId: string): QuizConfig | undefined {
  const subjectName = SUBJECT_NAME_BY_ID[subjectId]
  if (!subjectName) return undefined

  const subjectQuestions = questions.filter((q) => q.subject === subjectName)
  if (subjectQuestions.length === 0) return undefined

  return {
    id: `quick-${subjectId}`,
    type: "quick",
    title: `${subjectName} - কুইক চ্যালেঞ্জ`,
    questionIds: subjectQuestions.map((q) => q.id),
    durationSeconds: subjectQuestions.length * 60,
    xpReward: subjectQuestions.length * 10,
    coinReward: subjectQuestions.length * 5,
  }
}

export function getMockTestQuiz(subjectId: string, timeMinutes: number, maxQuestions: number): QuizConfig | undefined {
  const subjectName = SUBJECT_NAME_BY_ID[subjectId]
  if (!subjectName) return undefined

  const subjectQuestions = questions.filter((q) => q.subject === subjectName)
  if (subjectQuestions.length === 0) return undefined

  const selected = subjectQuestions.slice(0, maxQuestions)

  return {
    id: `mock-${subjectId}-${timeMinutes}-${maxQuestions}`,
    type: "mock",
    title: `${subjectName} - মক টেস্ট`,
    questionIds: selected.map((q) => q.id),
    durationSeconds: timeMinutes * 60,
    xpReward: selected.length * 10,
    coinReward: selected.length * 5,
  }
}
