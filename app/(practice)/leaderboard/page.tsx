import { PageHeader } from "@/components/shared/page-header"
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list"
import { RankTierLegend } from "@/components/leaderboard/rank-tier-legend"

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="লিডারবোর্ড" description="সেরা শিক্ষার্থীদের তালিকায় তোমার অবস্থান দেখো।" />
      <RankTierLegend />
      <LeaderboardList />
    </div>
  )
}
