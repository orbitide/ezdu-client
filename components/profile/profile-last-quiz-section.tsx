import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock } from "lucide-react"
import { quizAttempts } from "@/lib/mock/quiz-attempts"

function formatSeconds(s: number) {
  const m = Math.floor(s / 60)
  return `${m} মিনিট`
}

const TYPE_LABELS: Record<string, string> = {
  model: "মডেল টেস্ট",
  mock: "মক টেস্ট",
  quick: "দ্রুত চ্যালেঞ্জ",
  archive: "আর্কাইভ",
  preset: "নির্ধারিত",
  plan: "স্টাডি প্ল্যান",
}

export function ProfileLastQuizSection() {
  const recent = quizAttempts.slice(0, 3)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">সাম্প্রতিক কুইজ</CardTitle>
          <Link href="/progress/history" className="text-xs text-primary hover:underline">
            সব দেখো
          </Link>
        </div>
      </CardHeader>
      <CardContent className="divide-y">
        {recent.map((attempt) => {
          const pct = attempt.total > 0 ? Math.round((attempt.correct / attempt.total) * 100) : 0
          return (
            <div key={attempt.id} className="flex items-center gap-3 py-3">
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{attempt.title}</p>
                <p className="text-xs text-muted-foreground">{TYPE_LABELS[attempt.type] ?? attempt.type} · {attempt.date}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-xs">
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="size-3.5" />{attempt.correct}
                </span>
                <span className="flex items-center gap-1 text-destructive">
                  <XCircle className="size-3.5" />{attempt.incorrect}
                </span>
                <span className="font-semibold">{pct}%</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
