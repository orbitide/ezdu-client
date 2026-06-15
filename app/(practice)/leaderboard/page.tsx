import { LeaderboardList } from "@/components/leaderboard/leaderboard-list"
import { LeagueStrip } from "@/components/leaderboard/league-strip"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"
import { leaderboardUsers } from "@/lib/mock/leaderboard"

export default function LeaderboardPage() {
  const currentUser = leaderboardUsers.find((u) => u.isCurrentUser)

  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      {currentUser && <LeagueStrip currentTier={currentUser.rankTier} />}
      <LeaderboardList />
    </TwoColumnShell>
  )
}
