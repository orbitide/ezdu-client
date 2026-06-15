import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { ChallengeLessonList } from "@/components/challenge/challenge-lesson-list"
import { subjects } from "@/lib/mock/subjects"

export default async function ChallengeSubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params
  const subject = subjects.find((s) => s.id === subjectId)

  if (!subject) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PageHeader title="চ্যালেঞ্জ" description="একটি লেসন বেছে নিয়ে চ্যালেঞ্জ শুরু করো।" />
      <div className="space-y-4">
        <Link
          href="/challenge"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          বিষয় নির্বাচনে ফিরে যাও
        </Link>
        <h2 className="text-lg font-semibold">{subject.name}</h2>
        <ChallengeLessonList subjectId={subject.id} />
      </div>
    </div>
  )
}
