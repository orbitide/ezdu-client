import { PageHeader } from "@/components/shared/page-header"
import { MyCoursesList } from "@/components/learn/my-courses-list"

export default function MyCoursesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="আমার কোর্স" description="তোমার এনরোল করা কোর্সগুলোর অগ্রগতি দেখো।" />
      <MyCoursesList />
    </div>
  )
}
