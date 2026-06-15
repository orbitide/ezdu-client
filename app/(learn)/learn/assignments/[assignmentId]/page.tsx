import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Award } from "lucide-react"
import { AssignmentSubmissionForm } from "@/components/learn/assignment-submission-form"
import { getAssignmentById } from "@/lib/mock/assignments"

export default async function AssignmentDetailPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = await params
  const assignment = getAssignmentById(assignmentId)

  if (!assignment) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/assignments" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        অ্যাসাইনমেন্টে ফিরে যাও
      </Link>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
        <h1 className="text-2xl font-bold">{assignment.title}</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="size-4" />
          শেষ তারিখ: {assignment.dueDate}
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">নির্দেশনা</h2>
        <p className="text-muted-foreground">{assignment.description}</p>
      </div>
      {assignment.status === "graded" ? (
        <div className="space-y-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
            <Award className="size-4" />
            প্রাপ্ত নম্বর: {assignment.grade}
          </p>
          {assignment.feedback && <p className="text-sm text-muted-foreground">{assignment.feedback}</p>}
        </div>
      ) : assignment.status === "submitted" ? (
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-400">
          তোমার অ্যাসাইনমেন্ট জমা দেওয়া হয়েছে, মূল্যায়নের অপেক্ষায় আছে।
        </div>
      ) : (
        <AssignmentSubmissionForm />
      )}
    </div>
  )
}
