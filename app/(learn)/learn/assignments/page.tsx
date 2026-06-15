import { PageHeader } from "@/components/shared/page-header"
import { AssignmentList } from "@/components/learn/assignment-list"

export default function AssignmentsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="অ্যাসাইনমেন্ট" description="তোমার অ্যাসাইনমেন্ট জমা দাও এবং ফলাফল দেখো।" />
      <AssignmentList />
    </div>
  )
}
