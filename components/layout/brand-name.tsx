import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "text-base font-extrabold",
  md: "text-lg font-extrabold",
} as const

export function BrandName({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeClasses
  className?: string
}) {
  return (
    <span className={cn("bg-brand-gradient bg-clip-text text-transparent tracking-tight", sizeClasses[size], className)}>
      EZDU
    </span>
  )
}
