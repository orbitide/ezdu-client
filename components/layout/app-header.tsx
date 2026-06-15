"use client"

import { MobileNav } from "./mobile-nav"
import { ModeSwitcher } from "./mode-switcher"
import { ThemeToggle } from "./theme-toggle"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 shrink-0">
      <MobileNav />

      <div className="ml-auto flex items-center gap-2">
        <ModeSwitcher className="hidden sm:flex" />
        <ThemeToggle />
      </div>
    </header>
  )
}
