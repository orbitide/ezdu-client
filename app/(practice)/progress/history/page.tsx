import { PageHeader } from "@/components/shared/page-header"
import { HistoryList } from "@/components/progress/history-list"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function HistoryPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="অনুশীলনের ইতিহাস" description="তোমার আগের সব কুইজ ও টেস্টের ফলাফল দেখো।" />
      <HistoryList />
    </TwoColumnShell>
  )
}
