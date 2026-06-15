import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LessonOutlineSidebar } from "@/components/learn/lesson-outline-sidebar"
import { LessonNotesPanel } from "@/components/learn/lesson-notes-panel"
import { getCourseById, getChapterById } from "@/lib/mock/courses"

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ courseId: string; chapterId: string; lessonId: string }>
}) {
  const { courseId, chapterId, lessonId } = await params
  const course = getCourseById(courseId)
  const chapter = getChapterById(chapterId)

  if (!course || !chapter || chapter.courseId !== courseId) {
    notFound()
  }

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <Link href={`/learn/courses/${courseId}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        কোর্সে ফিরে যাও
      </Link>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr_260px]">
        <div className="hidden lg:block">
          <LessonOutlineSidebar course={course} chapter={chapter} activeLessonId={lessonId} />
        </div>
        <div>{children}</div>
        <div className="hidden lg:block">
          <LessonNotesPanel lessonId={lessonId} />
        </div>
      </div>
    </div>
  )
}
