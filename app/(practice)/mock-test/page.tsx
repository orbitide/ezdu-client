import { PageHeader } from "@/components/shared/page-header"
import { MockSubjectGrid } from "@/components/practice/mock-subject-grid"
import { MockTestPresetSection } from "@/components/practice/mock-test-preset-section"

export default function MockTestPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="মক টেস্ট" description="বিষয় বেছে নিয়ে মক টেস্ট দাও, বা প্রিসেট থেকে শুরু করো।" />
      <MockSubjectGrid />
      <MockTestPresetSection />
    </div>
  )
}
