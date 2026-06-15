import { PageHeader } from "@/components/shared/page-header"
import { MasterySubjectList } from "@/components/progress/mastery-subject-list"

export default function MasteryPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="বিষয়ভিত্তিক মাস্টারি" description="প্রতিটি বিষয়ে তোমার দক্ষতা যাচাই করো।" />
      <MasterySubjectList />
    </div>
  )
}
