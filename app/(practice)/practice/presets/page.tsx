import Link from "next/link"
import { Clock, Sparkles, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { presetSets } from "@/lib/mock/model-tests"

export default function PresetsPage() {
  return (
    <div className="space-y-3">
      {presetSets.map((preset) => (
        <Card key={preset.id}>
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="space-y-1.5">
              <p className="font-medium">{preset.title}</p>
              <p className="text-sm text-muted-foreground">{preset.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{preset.questionCount} প্রশ্ন</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {preset.durationMinutes} মিনিট
                </span>
                <span className="flex items-center gap-1 text-xp">
                  <Sparkles className="size-3.5" />
                  {preset.xpReward}
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <Coins className="size-3.5" />
                  {preset.coinReward}
                </span>
              </div>
            </div>
            <Button asChild size="sm">
              <Link href={`/quiz/${preset.id}`}>শুরু করো</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
