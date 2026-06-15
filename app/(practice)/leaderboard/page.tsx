import { PageHeader } from "@/components/shared/page-header"
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list"
import { RankTierLegend } from "@/components/leaderboard/rank-tier-legend"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function LeaderboardPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="লিডারবোর্ড" description="সেরা শিক্ষার্থীদের তালিকায় তোমার অবস্থান দেখো।" />
      <RankTierLegend />
      <LeaderboardList />
    </TwoColumnShell>
  )
}
