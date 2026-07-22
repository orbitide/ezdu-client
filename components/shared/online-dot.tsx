import { cn } from "@/lib/utils"

interface OnlineDotProps {
  isOnline: boolean
  size?: "sm" | "default" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "size-2",
  default: "size-2.5",
  lg: "size-3",
}

export function OnlineDot({ isOnline, size = "default", className }: OnlineDotProps) {
  return (
    <span
      className={cn(
        "absolute right-0 bottom-0 z-10 rounded-full ring-2 ring-background",
        sizeClasses[size],
        isOnline ? "bg-green-500" : "bg-muted-foreground/25",
        className
      )}
    />
  )
}
