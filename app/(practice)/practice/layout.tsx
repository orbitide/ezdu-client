import { PageHeader } from "@/components/shared/page-header"
import { PracticeTabs } from "@/components/practice/practice-tabs"

export default function PracticeSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <PageHeader title="অনুশীলন" description="মডেল টেস্ট ও কুইক চ্যালেঞ্জ থেকে অনুশীলন করো।" />
      <PracticeTabs />
      {children}
    </div>
  )
}
