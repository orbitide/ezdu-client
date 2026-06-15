import { HomeGrid } from "@/components/home/home-grid"
import { RecommendedQuizzesSection } from "@/components/home/recommended-quizzes-section"
import { MiniLeaderboardCard } from "@/components/home/mini-leaderboard-card"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function HomePage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <HomeGrid />
      <RecommendedQuizzesSection />
      <MiniLeaderboardCard />
    </TwoColumnShell>
  )
}
