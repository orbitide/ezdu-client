"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Trophy,
  User,
  Sparkles,
  Award,
  Archive,
  CalendarRange,
  Globe2,
  Newspaper,
  Bell,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store/auth-store"

const links = [
  { href: "/leaderboard", label: "লিডারবোর্ড", icon: Trophy },
  { href: "/profile", label: "প্রোফাইল", icon: User },
  { href: "/avatar", label: "অ্যাভাটার", icon: Sparkles },
  { href: "/profile/achievements", label: "অ্যাচিভমেন্ট", icon: Award },
  { href: "/archive", label: "আর্কাইভ", icon: Archive },
  { href: "/study-plan", label: "স্টাডি প্ল্যান", icon: CalendarRange },
  { href: "/current-affairs", label: "কারেন্ট অ্যাফেয়ার্স", icon: Globe2 },
  { href: "/feed", label: "ফিড", icon: Newspaper },
  { href: "/notifications", label: "নোটিফিকেশন", icon: Bell },
  { href: "/shop", label: "শপ", icon: ShoppingBag },
  { href: "/settings", label: "সেটিংস", icon: Settings },
]

export default function MorePage() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="আরও" description="অতিরিক্ত ফিচার এবং সেটিংসে যাও।" />
      <Card>
        <CardContent className="divide-y p-0">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Icon className="size-4.5 text-muted-foreground" />
                <span className="flex-1">{link.label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="size-4.5" />
            <span className="flex-1 text-left">লগ আউট</span>
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
