import { PageHeader } from "@/components/shared/page-header"
import { MasterySubjectList } from "@/components/progress/mastery-subject-list"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function MasteryPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="বিষয়ভিত্তিক মাস্টারি" description="প্রতিটি বিষয়ে তোমার দক্ষতা যাচাই করো।" />
      <MasterySubjectList />
    </TwoColumnShell>
  )
}
