import Image from "next/image"
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-base font-bold text-coin transition-colors hover:bg-coin/15",
        className
      )}
    >
      <Image src="/icons/coin.svg" alt="" width={20} height={20} className="size-5" />
      {formatCompactNumber(amount)}
    </span>
  )
}
