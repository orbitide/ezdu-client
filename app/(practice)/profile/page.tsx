import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStatsGrid } from "@/components/profile/profile-stats-grid"
import { WeeklyActivityChart } from "@/components/profile/weekly-activity-chart"
import { Button } from "@/components/ui/button"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function ProfilePage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader
        title="প্রোফাইল"
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link href="/profile/achievements">অর্জন</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/profile/friends">বন্ধুরা</Link>
            </Button>
          </>
        }
      />
      <ProfileHeader />
      <ProfileStatsGrid />
      <WeeklyActivityChart />
    </TwoColumnShell>
  )
}
