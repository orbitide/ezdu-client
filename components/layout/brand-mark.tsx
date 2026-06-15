import Image from "next/image"
import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "size-7",
  md: "size-8",
} as const

const pixelSizeMap = {
  sm: 28,
  md: 32,
} as const

export function BrandMark({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeMap
  className?: string
}) {
  return (
    <Image
      src="/logo-rounded.png"
      alt="EZDU"
      width={pixelSizeMap[size]}
      height={pixelSizeMap[size]}
      className={cn("inline-flex shrink-0 rounded-lg", sizeMap[size], className)}
    />
  )
}
