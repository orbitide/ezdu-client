import { notFound } from "next/navigation"
import { LessonViewer } from "@/components/learn/lesson-viewer"
import { getLessonById, getLessonsByChapterId } from "@/lib/mock/lessons"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string; lessonId: string }>
}) {
  const { chapterId, lessonId } = await params
  const lesson = getLessonById(lessonId)

  if (!lesson || lesson.chapterId !== chapterId) {
    notFound()
  }

  const lessonsInChapter = getLessonsByChapterId(chapterId)
  const lessonIndex = lessonsInChapter.findIndex((l) => l.id === lessonId)

  return (
    <div className="space-y-6">
      <LessonViewer lesson={lesson} />
      {lessonIndex >= 0 && lessonIndex < lessonsInChapter.length - 1 && (
        <p className="text-sm text-muted-foreground">
          পরবর্তী লেসন: {lessonsInChapter[lessonIndex + 1].title}
        </p>
      )}
    </div>
  )
}
