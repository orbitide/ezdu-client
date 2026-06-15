import { notFound } from "next/navigation"
import { redirect } from "next/navigation"
import { getArchiveExamById } from "@/lib/mock/archive"

export default async function ArchiveExamPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getArchiveExamById(examId)

  if (!exam) {
    notFound()
  }

  redirect(`/quiz/${exam.id}`)
}
