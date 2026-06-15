import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { MasteryLessonBreakdown } from "@/components/progress/mastery-lesson-breakdown"
import { subjectMastery } from "@/lib/mock/progress"

export default async function SubjectMasteryPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params
  const subject = subjectMastery.find((s) => s.subjectId === subjectId)

  if (!subject) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link href="/progress/mastery" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        বিষয় তালিকায় ফিরে যাও
      </Link>
      <PageHeader title={subject.subjectName} description="টপিক অনুযায়ী দক্ষতার বিশদ বিবরণ।" />
      <MasteryLessonBreakdown subject={subject} />
    </div>
  )
}
