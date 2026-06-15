import { Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCompactNumber } from "@/lib/utils/format"

export function CoinBalance({
  amount,
  className,
}: {
  amount: number
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-coin/15 px-2.5 py-1 text-sm font-semibold text-coin-foreground",
        className
      )}
    >
      <Coins className="size-4 text-coin" />
      {formatCompactNumber(amount)}
    </span>
  )
}
