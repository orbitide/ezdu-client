"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Bell, CreditCard, User, Zap, ChevronDown,
  BookOpen, GraduationCap, Trophy, Globe, Briefcase,
  FlaskConical, Calculator, Leaf, Languages, Atom,
  ClipboardList, History, Zap as QuizIcon,
  Play, PenTool, Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ModeSwitcher } from "./ModeSwitcher"
import { currentUser, notifications } from "@/lib/mock/data"
import { clearSession } from "@/lib/storage"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu, LogOut } from "lucide-react"
import { useState } from "react"

const unreadCount = notifications.filter(n => !n.read).length

// ─── Mega-menu data ─────────────────────────────────────────────────────────

const catalogItems = [
  { href: "/catalog?level=ssc",       icon: BookOpen,       bg: "bg-blue-50 dark:bg-blue-950",    color: "text-blue-600",   label: "SSC কোর্স",            desc: "মাধ্যমিকের সব বিষয়" },
  { href: "/catalog?level=hsc",       icon: GraduationCap,  bg: "bg-green-50 dark:bg-green-950",  color: "text-primary",    label: "HSC কোর্স",            desc: "উচ্চমাধ্যমিকের সব বিষয়" },
  { href: "/catalog?level=olympiad",  icon: Trophy,         bg: "bg-yellow-50 dark:bg-yellow-950",color: "text-yellow-600", label: "অলিম্পিয়াড",          desc: "গণিত ও বিজ্ঞান প্রতিযোগিতা" },
  { href: "/catalog?level=ielts",     icon: Globe,          bg: "bg-sky-50 dark:bg-sky-950",      color: "text-sky-600",    label: "IELTS প্রস্তুতি",      desc: "Band 7+ কৌশল ও প্র্যাকটিস" },
  { href: "/catalog?level=job",       icon: Briefcase,      bg: "bg-orange-50 dark:bg-orange-950",color: "text-orange-500", label: "জব প্রস্তুতি",         desc: "BCS, ব্যাংক ও সরকারি চাকরি" },
  { href: "/catalog?level=skills",    icon: Zap,            bg: "bg-purple-50 dark:bg-purple-950",color: "text-purple-600", label: "দক্ষতা উন্নয়ন",       desc: "ফ্রিল্যান্সিং ও প্রযুক্তি" },
]

const moduleItems = [
  { href: "/catalog",  icon: Atom,        bg: "bg-blue-50 dark:bg-blue-950",    color: "text-blue-600",  label: "পদার্থবিজ্ঞান" },
  { href: "/catalog",  icon: FlaskConical,bg: "bg-rose-50 dark:bg-rose-950",    color: "text-rose-500",  label: "রসায়নবিজ্ঞান" },
  { href: "/catalog",  icon: Calculator,  bg: "bg-indigo-50 dark:bg-indigo-950",color: "text-indigo-600",label: "উচ্চতর গণিত" },
  { href: "/catalog",  icon: Leaf,        bg: "bg-green-50 dark:bg-green-950",  color: "text-primary",   label: "জীববিজ্ঞান" },
  { href: "/catalog",  icon: Languages,   bg: "bg-amber-50 dark:bg-amber-950",  color: "text-amber-600", label: "ইংরেজি" },
]

const practiceItems = [
  { href: "/practice/mock-tests", icon: ClipboardList, bg: "bg-primary/10", color: "text-primary",    label: "মক টেস্ট",        desc: "পূর্ণাঙ্গ পরীক্ষার অনুশীলন" },
  { href: "/practice",            icon: History,       bg: "bg-orange-50 dark:bg-orange-950",  color: "text-orange-500", label: "বিগত প্রশ্ন",     desc: "গত বছরের প্রশ্নপত্র বিশ্লেষণ" },
  { href: "/practice",            icon: QuizIcon,      bg: "bg-violet-50 dark:bg-violet-950",  color: "text-violet-600", label: "দ্রুত কুইজ",      desc: "১০ মিনিটের দ্রুত পরীক্ষা" },
]

// ─── Nav item with dropdown ──────────────────────────────────────────────────

function NavDropdown({
  label,
  items,
  wide,
}: {
  label: string
  items: { href: string; icon: React.ElementType; bg: string; color: string; label: string; desc?: string }[]
  wide?: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground outline-none"
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("p-2", wide ? "min-w-[340px]" : "min-w-[220px]")}
        sideOffset={8}
      >
        {wide ? (
          <div className="grid grid-cols-2 gap-1">
            {items.map(({ href, icon: Icon, bg, color, label: itemLabel, desc }) => (
              <DropdownMenuItem key={href + itemLabel} className="p-0 rounded-lg">
                <Link
                  href={href}
                  className="flex items-start gap-3 rounded-lg p-2.5 w-full hover:bg-accent transition-colors"
                >
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5", bg)}>
                    <Icon className={cn("h-4 w-4", color)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none mb-1">{itemLabel}</p>
                    {desc && <p className="text-xs text-muted-foreground leading-snug">{desc}</p>}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          items.map(({ href, icon: Icon, bg, color, label: itemLabel }) => (
            <DropdownMenuItem key={href + itemLabel} className="p-0 rounded-lg">
              <Link
                href={href}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 w-full hover:bg-accent transition-colors"
              >
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md", bg)}>
                  <Icon className={cn("h-3.5 w-3.5", color)} />
                </div>
                <span className="text-sm font-medium">{itemLabel}</span>
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Mobile nav links ────────────────────────────────────────────────────────

function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname()
  const sections = [
    {
      label: "এক্সপ্লোর",
      items: catalogItems.map(i => ({ href: i.href, label: i.label, icon: i.icon })),
    },
    {
      label: "অনুশীলন",
      items: practiceItems.map(i => ({ href: i.href, label: i.label, icon: i.icon })),
    },
  ]

  const directLinks = [
    { href: "/learn/les-004", label: "আমার শিক্ষা", icon: Play },
    { href: "/profile", label: "প্রোফাইল", icon: User },
  ]

  return (
    <div className="flex flex-col gap-4">
      {sections.map(section => (
        <div key={section.label}>
          <p className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {section.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.items.map(({ href, label, icon: Icon }) => (
              <Link
                key={href + label}
                href={href}
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div className="border-t border-border/60 pt-3 flex flex-col gap-0.5">
        {directLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Main nav ────────────────────────────────────────────────────────────────

export function StudentNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/learn" className="flex items-center gap-2.5 font-bold text-lg shrink-0 mr-1">
          <img src="/logo.svg" alt="Ezdu" className="h-8 w-8 rounded-xl" />
          <span className="tracking-tight">Ezdu</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          <NavDropdown label="এক্সপ্লোর" items={catalogItems} wide />
          <Link
            href="/learn/les-004"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              pathname.startsWith("/learn")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Play className="h-3.5 w-3.5" />
            আমার শিক্ষা
          </Link>
          <NavDropdown label="অনুশীলন" items={practiceItems} wide />
        </nav>

        {/* Search box */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="কোর্স, বিষয় বা টপিক খুঁজুন..."
              className="w-full h-9 rounded-lg bg-accent/60 border border-border/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1.5">
          <ModeSwitcher />
          <Link
            href="/notifications"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative h-8 w-8")}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[10px] flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border hover:ring-primary/40 transition-all">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-xs">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48" sideOffset={8}>
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Link href="/profile" className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md">
                  <User className="h-4 w-4" />
                  প্রোফাইল
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <button
                  onClick={() => { clearSession(); router.push("/login") }}
                  className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  লগআউট
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 md:hidden")}>
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-5 overflow-y-auto">
              <div className="flex items-center gap-2.5 font-bold text-lg mb-6">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="tracking-tight">Ezdu</span>
              </div>
              <MobileNav onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
