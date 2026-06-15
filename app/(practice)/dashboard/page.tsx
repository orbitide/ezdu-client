import { HomeGrid } from "@/components/home/home-grid"
import { RecommendedQuizzesSection } from "@/components/home/recommended-quizzes-section"
import { MiniLeaderboardCard } from "@/components/home/mini-leaderboard-card"
import { TryProBanner } from "@/components/home/try-pro-banner"
import { StatsBar } from "@/components/home/stats-bar"
import { TodaysPlanCard } from "@/components/home/todays-plan-card"
import { UpcomingModelTestsCard } from "@/components/home/upcoming-model-tests-card"
import { TwoColumnShell } from "@/components/layout/two-column-shell"

export default function HomePage() {
  return (
    <TwoColumnShell
      right={
        <>
          <StatsBar />
          <TryProBanner />
          <TodaysPlanCard />
          <UpcomingModelTestsCard />
        </>
      }
    >
      <HomeGrid />
      <RecommendedQuizzesSection />
      <MiniLeaderboardCard />
    </TwoColumnShell>
  )
}
