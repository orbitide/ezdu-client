import Image from "next/image"
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-base font-bold text-xp transition-colors hover:bg-xp/15",
        className
      )}
    >
      <Image src="/icons/xp.svg" alt="" width={20} height={20} className="size-5" />
      {formatCompactNumber(xp)}
    </span>
  )
}
