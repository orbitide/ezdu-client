import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, FileText, Lightbulb, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PracticeLinkCallout } from "@/components/learn/practice-link-callout"
import { getCourseById, getChapterById } from "@/lib/mock/courses"
import { getLessonsByChapterId } from "@/lib/mock/lessons"

const iconByType = {
  video: PlayCircle,
  text: FileText,
  interactive: Lightbulb,
}

export default async function ChapterDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>
}) {
  const { courseId, chapterId } = await params
  const course = getCourseById(courseId)
  const chapter = getChapterById(chapterId)

  if (!course || !chapter || chapter.courseId !== courseId) {
    notFound()
  }

  const lessons = getLessonsByChapterId(chapter.id)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href={`/learn/courses/${courseId}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        কোর্সে ফিরে যাও
      </Link>
      <PageHeader title={chapter.title} description={course.title} />

      <div className="space-y-2">
        {lessons.map((lesson) => {
          const Icon = iconByType[lesson.contentType]
          return (
            <Link
              key={lesson.id}
              href={`/learn/courses/${courseId}/chapters/${chapterId}/lessons/${lesson.id}`}
              className="flex items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-colors hover:border-primary/40"
            >
              {lesson.completed ? (
                <CheckCircle2 className="size-4 shrink-0 text-green-600" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground" />
              )}
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 font-medium">{lesson.title}</span>
              <span className="text-xs text-muted-foreground">{lesson.durationMinutes} মিনিট</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          )
        })}
      </div>

      {chapter.linkedQuizId && <PracticeLinkCallout quizId={chapter.linkedQuizId} />}
    </div>
  )
}
