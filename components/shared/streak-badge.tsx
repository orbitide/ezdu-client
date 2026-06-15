import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export function StreakBadge({
  days,
  className,
}: {
  days: number
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-streak/15 px-2.5 py-1 text-sm font-semibold text-streak",
        className
      )}
    >
      <Flame className="size-4" />
      {days} day{days === 1 ? "" : "s"}
    </span>
  )
}
