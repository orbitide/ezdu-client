import { PageHeader } from "@/components/shared/page-header"
import { OverviewStatsGrid } from "@/components/progress/overview-stats-grid"
import { ActivityBarChart } from "@/components/charts/activity-bar-chart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { weeklyActivity } from "@/lib/mock/progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function ProgressOverviewPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader
        title="অগ্রগতি"
        description="তোমার এক্সপি, স্ট্রিক, সঠিকতা ও র‍্যাঙ্ক এক নজরে দেখো।"
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link href="/progress/mastery">মাস্টারি</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/progress/history">ইতিহাস</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/progress/mistakes">ভুল প্রশ্ন</Link>
            </Button>
          </>
        }
      />
      <OverviewStatsGrid />
      <Card>
        <CardHeader>
          <CardTitle>সাপ্তাহিক কার্যক্রম</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityBarChart data={weeklyActivity} />
        </CardContent>
      </Card>
    </TwoColumnShell>
  )
}
