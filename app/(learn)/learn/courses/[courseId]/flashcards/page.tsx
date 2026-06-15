import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { CourseFlashcardDeck } from "@/components/learn/course-flashcard-deck"
import { getCourseById, getFlashcardDeckByCourseId } from "@/lib/mock/courses"

export default async function CourseFlashcardsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  const deck = getFlashcardDeckByCourseId(courseId)

  if (!course || !deck) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href={`/learn/courses/${courseId}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        কোর্সে ফিরে যাও
      </Link>
      <PageHeader title={deck.title} description="কার্ডে ক্লিক করে উত্তর দেখো এবং রিভিশন করো।" />
      <CourseFlashcardDeck deck={deck} />
    </div>
  )
}
