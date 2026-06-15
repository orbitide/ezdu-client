import { PageHeader } from "@/components/shared/page-header"
import { ArchiveExamList } from "@/components/archive/archive-exam-list"

export default function ArchivePage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="আর্কাইভ" description="পুরোনো বছরের প্রশ্নপত্র অনুশীলন করো।" />
      <ArchiveExamList />
    </div>
  )
}
