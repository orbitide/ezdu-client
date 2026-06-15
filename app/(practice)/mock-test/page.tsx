import { PageHeader } from "@/components/shared/page-header"
import { MockSubjectGrid } from "@/components/practice/mock-subject-grid"
import { MockTestPresetSection } from "@/components/practice/mock-test-preset-section"
import { MockTestRightRail } from "@/components/practice/mock-test-right-rail"
import { TwoColumnShell } from "@/components/layout/two-column-shell"

export default function MockTestPage() {
  return (
    <TwoColumnShell right={<MockTestRightRail />}>
      <PageHeader title="মক টেস্ট" description="বিষয় বেছে নিয়ে মক টেস্ট দাও, বা প্রিসেট থেকে শুরু করো।" />
      <MockSubjectGrid />
      <MockTestPresetSection />
    </TwoColumnShell>
  )
}
