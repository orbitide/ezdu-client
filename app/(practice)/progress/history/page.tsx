import { PageHeader } from "@/components/shared/page-header"
import { HistoryList } from "@/components/progress/history-list"

export default function HistoryPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="অনুশীলনের ইতিহাস" description="তোমার আগের সব কুইজ ও টেস্টের ফলাফল দেখো।" />
      <HistoryList />
    </div>
  )
}
