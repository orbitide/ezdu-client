import { PageHeader } from "@/components/shared/page-header"
import { LearnProgressOverview } from "@/components/learn/learn-progress-overview"

export default function LearnProgressPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="লার্নিং অগ্রগতি" description="বিষয় অনুযায়ী সম্পন্নের হার এবং দুর্বল টপিক দেখো।" />
      <LearnProgressOverview />
    </div>
  )
}
