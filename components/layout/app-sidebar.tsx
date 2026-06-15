"use client"

import Link from "next/link"
import { useUiStore } from "@/lib/store/ui-store"
import { useProgressStore } from "@/lib/store/progress-store"
import { BrandMark } from "./brand-mark"
import { BrandName } from "./brand-name"
import { SidebarNavLink } from "./sidebar-nav-link"
import { practiceSidebarNav, learnSidebarNav } from "./nav-config"
import { RankBadge } from "@/components/shared/rank-badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function AppSidebar({ className }: { className?: string }) {
  const appMode = useUiStore((s) => s.appMode)
  const { rankTier, xp, level } = useProgressStore((s) => s)
  const navItems = appMode === "practice" ? practiceSidebarNav : learnSidebarNav

  const xpIntoLevel = xp % 1000
  const xpProgress = (xpIntoLevel / 1000) * 100

  return (
    <aside className={cn("flex flex-col h-full", className)}>
      <div className="flex h-16 items-center gap-2 px-4 border-b shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark size="sm" />
          <BrandName size="sm" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item, i) => {
          if ("type" in item && item.type === "divider") {
            return (
              <p
                key={i}
                className="px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {item.label}
              </p>
            )
          }
          const { href, label, icon: Icon, matchPaths } = item
          return (
            <SidebarNavLink key={href} href={href} matchPaths={matchPaths}>
              <Icon />
              <span>{label}</span>
            </SidebarNavLink>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <RankBadge tier={rankTier} />
          <span className="text-xs text-muted-foreground">লেভেল {level}</span>
        </div>
        <Progress value={xpProgress} />
        <p className="text-xs text-muted-foreground">পরবর্তী লেভেলের জন্য {xpIntoLevel} / 1000 XP</p>
      </div>
    </aside>
  )
}
