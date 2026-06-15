import { StatsBar } from "@/components/home/stats-bar"
import { TodaysPlanCard } from "@/components/home/todays-plan-card"
import { UpcomingModelTestsCard } from "@/components/home/upcoming-model-tests-card"

export function DefaultRightRail() {
  return (
    <>
      <StatsBar />
      <TodaysPlanCard />
      <UpcomingModelTestsCard />
    </>
  )
}
