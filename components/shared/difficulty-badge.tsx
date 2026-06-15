import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Difficulty = "easy" | "medium" | "hard"

const styles: Record<Difficulty, string> = {
  easy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  medium: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  hard: "bg-red-500/15 text-red-700 dark:text-red-400",
}

const labels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
}

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty
  className?: string
}) {
  return (
    <Badge variant="ghost" className={cn(styles[difficulty], className)}>
      {labels[difficulty]}
    </Badge>
  )
}
