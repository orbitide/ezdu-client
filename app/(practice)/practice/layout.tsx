import { PageHeader } from "@/components/shared/page-header"
import { PracticeTabs } from "@/components/practice/practice-tabs"

export default function PracticeSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="অনুশীলন" description="মডেল টেস্ট, মক টেস্ট, কুইক চ্যালেঞ্জ ও প্রিসেট সেট থেকে অনুশীলন করো।" />
      <PracticeTabs />
      {children}
    </div>
  )
}
