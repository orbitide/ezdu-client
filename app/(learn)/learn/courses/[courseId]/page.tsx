import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChapterList } from "@/components/learn/chapter-list"
import { LessonProgressBar } from "@/components/learn/lesson-progress-bar"
import { CourseEnrollButton } from "@/components/learn/course-enroll-button"
import { getCourseById, getChaptersByCourseId, getFlashcardDeckByCourseId } from "@/lib/mock/courses"
import { getLessonsByChapterId } from "@/lib/mock/lessons"

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)

  if (!course) {
    notFound()
  }

  const chapters = getChaptersByCourseId(courseId)
  const allLessons = chapters.flatMap((chapter) => getLessonsByChapterId(chapter.id))
  const completedCount = allLessons.filter((l) => l.completed).length
  const deck = getFlashcardDeckByCourseId(courseId)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/courses" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        কোর্স ক্যাটালগে ফিরে যাও
      </Link>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{course.examGroup}</p>
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
        <CourseEnrollButton courseId={course.id} alreadyEnrolled={course.enrolled} />
      </div>

      <LessonProgressBar completed={completedCount} total={allLessons.length} />

      <div className="flex flex-wrap gap-2">
        {deck && (
          <Button asChild variant="outline" className="gap-1.5">
            <Link href={`/learn/courses/${course.id}/flashcards`}>
              <BookOpen className="size-4" />
              রিভিশন ফ্ল্যাশকার্ড
            </Link>
          </Button>
        )}
        <Button asChild variant="outline" className="gap-1.5">
          <Link href={`/learn/courses/${course.id}/discussion`}>
            <MessageSquare className="size-4" />
            আলোচনা
          </Link>
        </Button>
      </div>

      <ChapterList course={course} chapters={chapters} />
    </div>
  )
}
