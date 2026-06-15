"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/store/auth-store"
import { useUiStore } from "@/lib/store/ui-store"
import { practiceMoreNav, learnMoreNav } from "./nav-config"
import { cn } from "@/lib/utils"

export function SidebarMoreMenu({ expanded = false }: { expanded?: boolean }) {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)
  const appMode = useUiStore((s) => s.appMode)
  const moreNav = appMode === "practice" ? practiceMoreNav : learnMoreNav
  const labelClass = expanded ? "" : "hidden lg:inline"

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
          "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring/50 border border-transparent",
          "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          expanded ? "" : "md:justify-center lg:justify-start"
        )}
      >
        <span className="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-sidebar-foreground/50 [&_svg]:transition-colors group-hover:[&_svg]:text-sidebar-accent-foreground/80">
          <MoreHorizontal />
          <span className={labelClass}>আরও</span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="top" className="w-60">
        <DropdownMenuGroup>
          {moreNav.map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem key={href} className="px-3 py-2 gap-3" render={<Link href={href} />}>
              <Icon />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="px-3 py-2 gap-3" variant="destructive" onClick={handleLogout}>
          <LogOut />
          লগ আউট
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
