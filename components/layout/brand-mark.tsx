import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "size-7",
  md: "size-8",
} as const

export function BrandMark({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeMap
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-gradient font-bold text-white",
        sizeMap[size],
        className
      )}
    >
      E
    </span>
  )
}
