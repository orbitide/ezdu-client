"use client"

import { useRouter } from "next/navigation"
import { GraduationCap, Swords } from "lucide-react"
import { useUiStore, type AppMode } from "@/lib/store/ui-store"
import { cn } from "@/lib/utils"

const modes: { value: AppMode; label: string; icon: typeof Swords; href: string }[] = [
  { value: "practice", label: "Practice", icon: Swords, href: "/home" },
  { value: "learn", label: "Learn", icon: GraduationCap, href: "/learn" },
]

export function ModeSwitcher({ className }: { className?: string }) {
  const appMode = useUiStore((s) => s.appMode)
  const setAppMode = useUiStore((s) => s.setAppMode)
  const router = useRouter()

  return (
    <div className={cn("inline-flex items-center rounded-full bg-muted p-1", className)}>
      {modes.map(({ value, label, icon: Icon, href }) => (
        <button
          key={value}
          type="button"
          onClick={() => {
            setAppMode(value)
            router.push(href)
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
            appMode === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </div>
  )
}
