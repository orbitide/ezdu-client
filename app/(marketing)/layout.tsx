"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  Search, BookOpen, GraduationCap, Trophy,
  Globe, Briefcase, Zap, ChevronDown,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const catalogItems = [
  { href: "/catalog?level=ssc",      icon: BookOpen,      bg: "bg-blue-50",   color: "text-blue-600",   label: "SSC কোর্স",       desc: "মাধ্যমিকের সব বিষয়" },
  { href: "/catalog?level=hsc",      icon: GraduationCap, bg: "bg-green-50",  color: "text-primary",    label: "HSC কোর্স",       desc: "উচ্চমাধ্যমিকের সব বিষয়" },
  { href: "/catalog?level=olympiad", icon: Trophy,        bg: "bg-yellow-50", color: "text-yellow-600", label: "অলিম্পিয়াড",     desc: "গণিত ও বিজ্ঞান প্রতিযোগিতা" },
  { href: "/catalog?level=ielts",    icon: Globe,         bg: "bg-sky-50",    color: "text-sky-600",    label: "IELTS প্রস্তুতি", desc: "Band 7+ কৌশল ও প্র্যাকটিস" },
  { href: "/catalog?level=job",      icon: Briefcase,     bg: "bg-orange-50", color: "text-orange-500", label: "জব প্রস্তুতি",    desc: "BCS, ব্যাংক ও সরকারি চাকরি" },
  { href: "/catalog?level=skills",   icon: Zap,           bg: "bg-purple-50", color: "text-purple-600", label: "দক্ষতা উন্নয়ন",  desc: "ফ্রিল্যান্সিং ও প্রযুক্তি" },
]

function MarketingSearch() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => { if (open) inputRef.current?.focus() }, [open])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(q.trim())}`)
      setOpen(false); setQ("")
    }
  }

  return open ? (
    <form onSubmit={submit} className="flex items-center">
      <Input
        ref={inputRef}
        value={q}
        onChange={e => setQ(e.target.value)}
        onBlur={() => { if (!q) setOpen(false) }}
        placeholder="কোর্স খুঁজুন..."
        className="h-8 w-44 text-sm"
      />
    </form>
  ) : (
    <button
      onClick={() => setOpen(true)}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}
    >
      <Search className="h-4 w-4" />
    </button>
  )
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg shrink-0">
            <img src="/logo.svg" alt="Ezdu" className="h-8 w-8 rounded-xl" />
            <span className="tracking-tight">Ezdu</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 flex-1">
            {/* কোর্সসমূহ dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors outline-none">
                কোর্সসমূহ
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[360px] p-3" sideOffset={8}>
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                  বিভাগ অনুযায়ী কোর্স
                </DropdownMenuLabel>
                <div className="grid grid-cols-2 gap-1">
                  {catalogItems.map(({ href, icon: Icon, bg, color, label, desc }) => (
                    <DropdownMenuItem key={href} className="p-0 rounded-xl">
                      <Link
                        href={href}
                        className="flex items-start gap-3 w-full rounded-xl p-2.5 hover:bg-accent transition-colors"
                      >
                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5", bg)}>
                          <Icon className={cn("h-4 w-4", color)} />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none mb-1">{label}</p>
                          <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="p-0 rounded-lg">
                  <Link
                    href="/catalog"
                    className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-sm font-medium text-primary hover:bg-accent transition-colors"
                  >
                    সব কোর্স দেখুন →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/subscribe"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              মূল্য
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              সম্পর্কে
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <MarketingSearch />
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              লগইন
            </Link>
            <Link href="/register" className={cn(buttonVariants({ size: "sm" }), "shadow-sm shadow-primary/20")}>
              শুরু করুন
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="flex-1" style={{ background: "#010609" }}>
        {children}
      </main>
    </div>
  )
}
