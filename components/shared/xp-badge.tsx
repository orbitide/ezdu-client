import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCompactNumber } from "@/lib/utils/format"

export function XpBadge({
  xp,
  level,
  className,
}: {
  xp: number
  level?: number
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-xp/15 px-2.5 py-1 text-sm font-semibold text-xp",
        className
      )}
    >
      <Sparkles className="size-4" />
      {formatCompactNumber(xp)} XP
      {level !== undefined && (
        <span className="text-muted-foreground">· লেভেল {level}</span>
      )}
    </span>
  )
}
