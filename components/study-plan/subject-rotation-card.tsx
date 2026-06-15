import { Card, CardContent } from "@/components/ui/card"
import { subjectRotation } from "@/lib/mock/study-plan"

export function SubjectRotationCard() {
  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <p className="text-sm font-semibold">সাপ্তাহিক বিষয় রোটেশন</p>
        <div className="space-y-2">
          {subjectRotation.map((rotation) => (
            <div key={rotation.day} className="flex items-center justify-between gap-3 text-sm">
              <span className="w-20 shrink-0 font-medium">{rotation.day}</span>
              <span className="text-right text-muted-foreground">{rotation.subjects.join(", ")}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
