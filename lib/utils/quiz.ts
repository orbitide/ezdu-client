import type { Question } from "@/lib/types/question"
import type { QuizAnswer, QuizResult, QuizConfig } from "@/lib/types/quiz"

export function scoreQuiz(
  config: QuizConfig,
  questions: Question[],
  answers: QuizAnswer[],
  timeTakenSeconds: number
): QuizResult {
  let correct = 0
  let incorrect = 0
  let skipped = 0

  for (const question of questions) {
    const answer = answers.find((a) => a.questionId === question.id)
    if (!answer || answer.selectedIndex === null) {
      skipped += 1
    } else if (answer.selectedIndex === question.correctIndex) {
      correct += 1
    } else {
      incorrect += 1
    }
  }

  const accuracy = questions.length > 0 ? correct / questions.length : 0
  const xpEarned = Math.round(config.xpReward * accuracy)
  const coinsEarned = Math.round(config.coinReward * accuracy)

  return {
    quizId: config.id,
    total: questions.length,
    correct,
    incorrect,
    skipped,
    xpEarned,
    coinsEarned,
    timeTakenSeconds,
    answers,
  }
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}
