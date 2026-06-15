import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { QaQuestionThread } from "@/components/learn/qa-question-thread"
import { getQaQuestionById } from "@/lib/mock/qa"

export default async function QaQuestionDetailPage({ params }: { params: Promise<{ questionId: string }> }) {
  const { questionId } = await params
  const question = getQaQuestionById(questionId)

  if (!question) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/qa" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        প্রশ্ন-উত্তরে ফিরে যাও
      </Link>
      <QaQuestionThread question={question} />
    </div>
  )
}
