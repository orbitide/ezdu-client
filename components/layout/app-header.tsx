"use client"

import { MobileNav } from "./mobile-nav"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 shrink-0">
      <MobileNav />
    </header>
  )
}
