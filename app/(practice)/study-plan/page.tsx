"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/page-header"
import { SubjectRotationCard } from "@/components/study-plan/subject-rotation-card"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"
import { CalendarDays, Plus } from "lucide-react"

function StudyPlanContent() {
  const { plan, setStep } = useStudyPlanStore()

  if (plan && plan.status === "active") {
    const today = new Date().toISOString().slice(0, 10)
    const todayDay = plan.days.find((d) => d.date === today)
    const totalItems = plan.days.flatMap((d) => d.items).length
    const completedItems = plan.days.flatMap((d) => d.items).filter((i) => i.status === "completed").length
    const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-primary" />
              <div>
                <p className="font-semibold">{plan.duration} দিনের পরিকল্পনা সক্রিয়</p>
                <p className="text-sm text-muted-foreground">{completedItems}/{totalItems} পাঠ সম্পন্ন · {progressPct}%</p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link href="/study-plan/active">পুরো পরিকল্পনা দেখো</Link>
            </Button>
          </CardContent>
        </Card>

        {todayDay && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">আজকের পাঠ</h2>
            <Card>
              <CardContent className="divide-y pt-4">
                {todayDay.items.map((item) => (
                  <div key={item.lessonId} className="flex items-center gap-3 py-3">
                    <div className={`size-2.5 rounded-full ${item.status === "completed" ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.lessonName}</p>
                      <p className="text-xs text-muted-foreground">{item.subjectName} · {item.durationMinutes} মিনিট</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
        <CalendarDays className="size-12 text-muted-foreground" />
        <div>
          <p className="font-semibold">কোনো সক্রিয় পরিকল্পনা নেই</p>
          <p className="mt-1 text-sm text-muted-foreground">একটি পার্সোনালাইজড স্টাডি প্ল্যান তৈরি করো।</p>
        </div>
        <Button asChild onClick={() => setStep("mode")}>
          <Link href="/study-plan/create">
            <Plus className="mr-2 size-4" />
            পরিকল্পনা তৈরি করো
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function StudyPlanPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader
        title="স্টাডি প্ল্যান"
        description="আজকের পরিকল্পনা অনুসরণ করে অনুশীলন চালিয়ে যাও।"
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/study-plan/create">
              <Plus className="mr-1.5 size-4" />
              নতুন পরিকল্পনা
            </Link>
          </Button>
        }
      />
      <StudyPlanContent />
      <SubjectRotationCard />
    </TwoColumnShell>
  )
}
