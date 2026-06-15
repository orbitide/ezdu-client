import { PageHeader } from "@/components/shared/page-header"
import { ChallengeLauncher } from "@/components/challenge/challenge-launcher"
import { ChallengeWeakAreasCard } from "@/components/challenge/challenge-weak-areas-card"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { StatsBar } from "@/components/home/stats-bar"
import { TodaysPlanCard } from "@/components/home/todays-plan-card"

export default function ChallengePage() {
  return (
    <TwoColumnShell right={<><StatsBar /><ChallengeWeakAreasCard /><TodaysPlanCard /></>}>
      <PageHeader title="চ্যালেঞ্জ" description="বিষয় বেছে নিয়ে কুইক চ্যালেঞ্জ শুরু করো।" />
      <ChallengeLauncher />
    </TwoColumnShell>
  )
}
