import Link from "next/link"
import { Trophy, Flame, Timer } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDuration } from "@/lib/utils/quiz"
import { getStreakTier } from "@/lib/utils/challenge"
import type { ChallengeResult } from "@/lib/types/challenge"

interface ChallengeResultsScreenProps {
  result: ChallengeResult
  topicName: string
  subjectId: string
}

export function ChallengeResultsScreen({ result, topicName, subjectId }: ChallengeResultsScreenProps) {
  const { title, subtitle } = getStreakTier(result.maxStreak)

  return (
    <div className="flex flex-1 flex-col items-center gap-6 p-4 lg:p-6">
      <div className="flex flex-col items-center gap-3 pt-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10">
          <Trophy className="size-8 text-amber-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <p className="text-sm text-muted-foreground">{topicName}</p>
      </div>

      <Card className="w-full max-w-md p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 text-center">
            <p className="flex items-center justify-center gap-1.5 text-2xl font-bold text-amber-600">
              <Flame className="size-5" />
              {result.maxStreak}
            </p>
            <p className="text-xs text-muted-foreground">সর্বোচ্চ স্ট্রিক</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="flex items-center justify-center gap-1.5 text-2xl font-bold text-foreground">
              <Timer className="size-5" />
              {formatDuration(result.timeTakenSeconds)}
            </p>
            <p className="text-xs text-muted-foreground">সময়</p>
          </div>
        </div>
      </Card>

      <Button asChild variant="outline">
        <Link href={`/practice/challenge/${subjectId}`}>ফিরে যাও</Link>
      </Button>
    </div>
  )
}
