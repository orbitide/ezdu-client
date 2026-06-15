import { PageHeader } from "@/components/shared/page-header"
import { ProfileSummaryCard } from "@/components/home/profile-summary-card"
import { TodaysPlanCard } from "@/components/home/todays-plan-card"
import { HomeGrid } from "@/components/home/home-grid"
import { UpcomingModelTestsCard } from "@/components/home/upcoming-model-tests-card"
import { RecommendedQuizzesSection } from "@/components/home/recommended-quizzes-section"
import { MiniLeaderboardCard } from "@/components/home/mini-leaderboard-card"

export default function HomePage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <PageHeader
        title="আবার স্বাগতম!"
        description="আজকের প্র্যাকটিসে কী হচ্ছে দেখো।"
      />
      <ProfileSummaryCard />
      <TodaysPlanCard />
      <HomeGrid />
      <UpcomingModelTestsCard />
      <RecommendedQuizzesSection />
      <MiniLeaderboardCard />
    </div>
  )
}
