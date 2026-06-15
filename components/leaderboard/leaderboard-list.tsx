import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row"
import { leaderboardUsers } from "@/lib/mock/leaderboard"

const PROMOTION_COUNT = 3
const DEMOTION_COUNT = 3

export function LeaderboardList() {
  const total = leaderboardUsers.length
  const promoted = leaderboardUsers.slice(0, PROMOTION_COUNT)
  const normal = leaderboardUsers.slice(PROMOTION_COUNT, total - DEMOTION_COUNT)
  const demoted = leaderboardUsers.slice(total - DEMOTION_COUNT)

  return (
    <div className="flex flex-col gap-2">
      {promoted.map((user) => (
        <LeaderboardRow key={user.id} user={user} rankColorClass="text-promotion" />
      ))}

      <p className="px-1 text-xs font-semibold text-promotion">প্রোমোশন জোন</p>
      {normal.map((user) => (
        <LeaderboardRow key={user.id} user={user} />
      ))}

      <p className="px-1 text-xs font-semibold text-demotion">ডিমোশন জোন</p>
      {demoted.map((user) => (
        <LeaderboardRow key={user.id} user={user} rankColorClass="text-demotion" />
      ))}
    </div>
  )
}
