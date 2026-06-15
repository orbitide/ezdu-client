import { PageHeader } from "@/components/shared/page-header"
import { LiveClassCalendar } from "@/components/learn/live-class-calendar"

export default function LiveClassesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="লাইভ ক্লাস" description="আসন্ন লাইভ ক্লাসে যোগ দাও বা রেকর্ডকৃত ক্লাস দেখো।" />
      <LiveClassCalendar />
    </div>
  )
}
