import { QaQuestionCard } from "@/components/learn/qa-question-card"
import { qaQuestions } from "@/lib/mock/qa"

export function QaForumList() {
  return (
    <div className="space-y-3">
      {qaQuestions.map((question) => (
        <QaQuestionCard key={question.id} question={question} />
      ))}
    </div>
  )
}
