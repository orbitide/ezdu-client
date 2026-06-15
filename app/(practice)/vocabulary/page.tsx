import { PageHeader } from "@/components/shared/page-header"
import { VocabHub } from "@/components/vocabulary/vocab-hub"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { VocabularyRightRail } from "@/components/layout/vocabulary-right-rail"

export default function VocabularyPage() {
  return (
    <TwoColumnShell right={<VocabularyRightRail />}>
      <PageHeader title="ভোকাবুলারি" description="ডিফিকাল্টি লেভেল বেছে নিয়ে বিভিন্ন মোডে শব্দ অনুশীলন করো।" />
      <VocabHub />
    </TwoColumnShell>
  )
}
