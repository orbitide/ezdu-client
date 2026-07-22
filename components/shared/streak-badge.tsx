import Image from "next/image"
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-base font-bold text-streak transition-colors hover:bg-streak/15",
        className
      )}
    >
      <Image src="/icons/streak.svg" alt="" width={20} height={20} className="size-5" />
      {days}
    </span>
  )
}
