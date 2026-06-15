import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ActivityBarChart } from "@/components/charts/activity-bar-chart"
import { weeklyActivity } from "@/lib/mock/progress"

export function WeeklyActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সাপ্তাহিক কার্যক্রম</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityBarChart data={weeklyActivity} />
      </CardContent>
    </Card>
  )
}
