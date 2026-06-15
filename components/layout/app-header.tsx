"use client"

import { MobileNav } from "./mobile-nav"
import { ModeSwitcher } from "./mode-switcher"
import { ThemeToggle } from "./theme-toggle"
import { ProfileMenu } from "./profile-menu"
import { CoinBalance } from "@/components/shared/coin-balance"
import { StreakBadge } from "@/components/shared/streak-badge"
import { useProgressStore } from "@/lib/store/progress-store"

export function AppHeader() {
  const { coins, streakDays } = useProgressStore((s) => s)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 shrink-0">
      <MobileNav />

      <ModeSwitcher className="hidden sm:flex" />

      <div className="ml-auto flex items-center gap-2">
        <StreakBadge days={streakDays} className="hidden sm:inline-flex" />
        <CoinBalance amount={coins} />
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </header>
  )
}
