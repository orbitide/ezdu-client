"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/practice/model-tests", label: "মডেল টেস্ট" },
  { href: "/practice/mock-tests", label: "মক টেস্ট" },
  { href: "/practice/quick-challenge", label: "কুইক চ্যালেঞ্জ" },
  { href: "/practice/challenge", label: "চ্যালেঞ্জ" },
  { href: "/practice/presets", label: "প্রিসেট সেট" },
]

export function PracticeTabs() {
  const pathname = usePathname()

  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-lg bg-muted p-[3px] text-muted-foreground">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive ? "bg-background text-foreground shadow-sm" : "text-foreground/60 hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
