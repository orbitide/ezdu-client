import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { getCourseById } from "@/lib/mock/courses"

export default async function CourseDiscussionPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)

  if (!course) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href={`/learn/courses/${courseId}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        কোর্সে ফিরে যাও
      </Link>
      <PageHeader title="আলোচনা" description={`${course.title} - কোর্স কমিউনিটি আলোচনা`} />
      <EmptyState
        icon={MessageSquare}
        title="কোনো আলোচনা নেই"
        description="এই কোর্স সম্পর্কে প্রথম প্রশ্ন বা মন্তব্য করো।"
      />
    </div>
  )
}
