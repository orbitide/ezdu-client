import { PageHeader } from "@/components/shared/page-header"
import { VocabHub } from "@/components/vocabulary/vocab-hub"

export default function VocabularyPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="ভোকাবুলারি" description="ডিফিকাল্টি লেভেল বেছে নিয়ে বিভিন্ন মোডে শব্দ অনুশীলন করো।" />
      <VocabHub />
    </div>
  )
}
