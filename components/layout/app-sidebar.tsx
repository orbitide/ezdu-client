"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { useUiStore } from "@/lib/store/ui-store"
import { BrandMark } from "./brand-mark"
import { BrandName } from "./brand-name"
import { SidebarNavLink } from "./sidebar-nav-link"
import { SidebarMoreMenu } from "./sidebar-more-menu"
import { ModeSwitcher } from "./mode-switcher"
import { practiceSidebarNav, learnSidebarNav } from "./nav-config"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  className?: string
  /** Always render full labels (used inside the mobile sheet). */
  expanded?: boolean
}

export function AppSidebar({ className, expanded = false }: AppSidebarProps) {
  const appMode = useUiStore((s) => s.appMode)
  const navItems = appMode === "practice" ? practiceSidebarNav : learnSidebarNav

  const labelClass = expanded ? "" : "hidden lg:inline"
  const navLinkClass = expanded ? "" : "md:justify-center lg:justify-start"
  const dividerClass = expanded ? "" : "hidden lg:block"

  return (
    <aside className={cn("flex flex-col h-full", className)}>
      <div className="flex h-16 items-center gap-2 px-4 border-b shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <BrandMark size="sm" />
          <BrandName size="sm" className={labelClass} />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item, i) => {
          if ("type" in item && item.type === "divider") {
            return (
              <p
                key={i}
                className={cn(
                  "px-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                  dividerClass
                )}
              >
                {item.label}
              </p>
            )
          }
          const { href, label, icon: Icon, matchPaths } = item
          return (
            <SidebarNavLink key={href} href={href} matchPaths={matchPaths} className={navLinkClass}>
              <Icon />
              <span className={labelClass}>{label}</span>
            </SidebarNavLink>
          )
        })}

        <SidebarNavLink href="/profile" className={navLinkClass}>
          <User />
          <span className={labelClass}>প্রোফাইল</span>
        </SidebarNavLink>

        <div className="pt-2">
          <SidebarMoreMenu expanded={expanded} />
        </div>
      </nav>

      <div className="border-t p-3 shrink-0">
        <ModeSwitcher className="w-full" expanded={expanded} />
      </div>
    </aside>
  )
}
