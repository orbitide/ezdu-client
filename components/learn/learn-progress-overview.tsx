import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { subjectCompletions, weakTopics } from "@/lib/mock/learning-progress"

export function LearnProgressOverview() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 pt-6">
          <p className="text-sm font-semibold">বিষয় অনুযায়ী অগ্রগতি</p>
          <div className="space-y-3">
            {subjectCompletions.map((item) => {
              const percent = item.totalLessons === 0 ? 0 : Math.round((item.completedLessons / item.totalLessons) * 100)
              return (
                <div key={item.subject} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.subject}</span>
                    <span className="text-muted-foreground">
                      {item.completedLessons} / {item.totalLessons} লেসন
                    </span>
                  </div>
                  <Progress value={percent} />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 pt-6">
          <p className="text-sm font-semibold">দুর্বল টপিকসমূহ</p>
          <div className="space-y-3">
            {weakTopics.map((topic) => (
              <div key={topic.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{topic.subject} - {topic.topic}</span>
                  <span className="text-muted-foreground">{topic.masteryPercent}%</span>
                </div>
                <Progress value={topic.masteryPercent} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
