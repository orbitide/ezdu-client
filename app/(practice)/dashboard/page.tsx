import { TodaysPlanCard } from "@/components/home/todays-plan-card"
import { StatsBar } from "@/components/home/stats-bar"
import { HomeGrid } from "@/components/home/home-grid"
import { UpcomingModelTestsCard } from "@/components/home/upcoming-model-tests-card"
import { RecommendedQuizzesSection } from "@/components/home/recommended-quizzes-section"
import { MiniLeaderboardCard } from "@/components/home/mini-leaderboard-card"

export default function HomePage() {
  return (
    <div className="grid gap-6 p-4 lg:grid-cols-3 lg:p-6">
      <div className="space-y-6 lg:col-span-2">
        <HomeGrid />
        <RecommendedQuizzesSection />
        <MiniLeaderboardCard />
      </div>
      <div className="space-y-6">
        <StatsBar />
        <TodaysPlanCard />
        <UpcomingModelTestsCard />
      </div>
    </div>
  )
}
