import Link from "next/link"
import { CheckCircle2, Clock, Sparkles, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ModelTest } from "@/lib/types/model-test"

interface ModelTestCardProps {
  modelTest: ModelTest
}

export function ModelTestCard({ modelTest }: ModelTestCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <p className="font-medium">{modelTest.title}</p>
            {modelTest.attempted && (
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                <CheckCircle2 className="size-3.5" />
                সম্পন্ন
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{modelTest.examGroup}</span>
            <span>{modelTest.questionCount} প্রশ্ন</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {modelTest.durationMinutes} মিনিট
            </span>
            <span className="flex items-center gap-1 text-xp">
              <Sparkles className="size-3.5" />
              {modelTest.xpReward}
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <Coins className="size-3.5" />
              {modelTest.coinReward}
            </span>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href={`/quiz/${modelTest.id}`}>{modelTest.attempted ? "আবার দাও" : "শুরু করো"}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
