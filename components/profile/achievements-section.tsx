import { AchievementCard } from "@/components/profile/achievement-card"
import { achievements } from "@/lib/mock/achievements"

export function AchievementsSection() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  )
}
