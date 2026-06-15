import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ArchiveExamList } from "@/components/archive/archive-exam-list"
import { archiveInstitutes, getArchiveExamsByInstitute } from "@/lib/mock/archive"

export default async function ArchiveInstitutePage({ params }: { params: Promise<{ instituteId: string }> }) {
  const { instituteId } = await params
  const institute = archiveInstitutes.find((i) => i.id === instituteId)

  if (!institute) {
    notFound()
  }

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <Link href="/archive" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        প্রতিষ্ঠান নির্বাচনে ফিরে যাও
      </Link>
      <h2 className="text-lg font-semibold">{institute.name}</h2>
      <ArchiveExamList exams={getArchiveExamsByInstitute(institute.id)} />
    </div>
  )
}
