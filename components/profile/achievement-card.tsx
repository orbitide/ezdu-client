import {
  Footprints,
  Flame,
  Target,
  BookOpen,
  Trophy,
  Award,
  Lock,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import type { Achievement } from "@/lib/types/achievement"

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Flame,
  Target,
  BookOpen,
  Trophy,
  Award,
}

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon] ?? Trophy

  return (
    <Card className={achievement.unlocked ? undefined : "opacity-70"}>
      <CardContent className="space-y-2 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 items-center justify-center rounded-lg ${
              achievement.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            {achievement.unlocked ? <Icon className="size-5" /> : <Lock className="size-5" />}
          </div>
          <div className="flex-1">
            <p className="font-medium">{achievement.title}</p>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
          </div>
        </div>
        {achievement.unlocked ? (
          <p className="text-xs text-muted-foreground">{achievement.unlockedAt} তারিখে অর্জিত</p>
        ) : achievement.progress ? (
          <div className="space-y-1">
            <Progress value={(achievement.progress.current / achievement.progress.target) * 100}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <p className="text-xs text-muted-foreground">
              {achievement.progress.current} / {achievement.progress.target}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
