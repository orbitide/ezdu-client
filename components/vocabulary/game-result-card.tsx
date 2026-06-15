import Link from "next/link"
import { Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GameResultCardProps {
  score: number
  total: number
  difficulty: string
  onRetry: () => void
}

export function GameResultCard({ score, total, difficulty, onRetry }: GameResultCardProps) {
  const ratio = total === 0 ? 0 : score / total
  const message =
    ratio === 1
      ? "অসাধারণ! সব উত্তর সঠিক হয়েছে।"
      : ratio >= 0.6
        ? "দারুণ অগ্রগতি! চালিয়ে যাও।"
        : "আরও অনুশীলন করো, তুমি পারবে।"

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10">
          <Trophy className="size-8 text-amber-500" />
        </div>
        <div>
          <p className="text-3xl font-bold">
            {score} / {total}
          </p>
          <p className="text-sm text-muted-foreground">সঠিক উত্তর</p>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href={`/vocabulary/${difficulty}`}>মোড নির্বাচনে ফিরে যাও</Link>
          </Button>
          <Button onClick={onRetry}>আবার চেষ্টা করো</Button>
        </div>
      </CardContent>
    </Card>
  )
}
