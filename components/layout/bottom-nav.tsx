"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUiStore } from "@/lib/store/ui-store"
import { practiceBottomNav, learnBottomNav } from "./nav-config"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const appMode = useUiStore((s) => s.appMode)
  const pathname = usePathname()
  const items = appMode === "practice" ? practiceBottomNav : learnBottomNav

  return (
    <nav className="lg:hidden sticky bottom-0 z-40 grid grid-cols-5 border-t bg-background/95 backdrop-blur-sm">
      {items.map(({ href, label, icon: Icon, matchPaths }) => {
        const prefixes = matchPaths ?? [href]
        const isActive = prefixes.some(
          (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
        )
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 py-2 text-xs transition-colors",
              isActive ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
