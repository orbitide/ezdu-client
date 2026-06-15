import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row"
import { leaderboardUsers } from "@/lib/mock/leaderboard"

export function LeaderboardList() {
  return (
    <div className="space-y-2">
      {leaderboardUsers.map((user) => (
        <LeaderboardRow key={user.id} user={user} />
      ))}
    </div>
  )
}
