import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { MockTestLessonPicker } from "@/components/practice/mock-test-lesson-picker"
import { subjects } from "@/lib/mock/subjects"

export default async function MockTestSubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params
  const subject = subjects.find((s) => s.id === subjectId)

  if (!subject) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PageHeader title="মক টেস্ট" description="একটি লেসন বেছে নিয়ে মক টেস্ট শুরু করো।" />
      <div className="space-y-4">
        <Link href="/mock-test" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          বিষয় নির্বাচনে ফিরে যাও
        </Link>
        <h2 className="text-lg font-semibold">{subject.name}</h2>
        <MockTestLessonPicker subjectId={subject.id} subjectName={subject.name} />
      </div>
    </div>
  )
}
