"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Lock, SlidersHorizontal, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/settings/profile", label: "প্রোফাইল", icon: User },
  { href: "/settings/password", label: "পাসওয়ার্ড", icon: Lock },
  { href: "/settings/preferences", label: "পছন্দসমূহ", icon: SlidersHorizontal },
  { href: "/settings/notifications", label: "নোটিফিকেশন", icon: Bell },
]

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-1">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href)
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
