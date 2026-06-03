"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  BookOpen, Play, PenTool,
  Bell, CreditCard, User, Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ModeSwitcher } from "./ModeSwitcher"
import { currentUser, notifications } from "@/lib/mock/data"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/catalog", label: "কোর্সসমূহ", icon: BookOpen },
  { href: "/learn/les-004", label: "আমার শিক্ষা", icon: Play },
  { href: "/practice", label: "অনুশীলন", icon: PenTool },
  { href: "/subscribe", label: "সাবস্ক্রাইব", icon: CreditCard },
]

const unreadCount = notifications.filter(n => !n.read).length

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname()
  return (
    <>
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
            {label}
          </Link>
        )
      })}
    </>
  )
}

export function StudentNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/learn" className="flex items-center gap-2.5 font-bold text-lg shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <Zap className="h-4 w-4" />
          </div>
          <span className="tracking-tight">Ezdu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          <NavLinks />
        </nav>

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
          <Link href="/profile">
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-border hover:ring-primary/40 transition-all">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="text-xs">{currentUser.name[0]}</AvatarFallback>
            </Avatar>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 md:hidden")}>
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-5">
              <div className="flex items-center gap-2.5 font-bold text-lg mb-7">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="tracking-tight">Ezdu</span>
              </div>
              <nav className="flex flex-col gap-0.5">
                <NavLinks onClick={() => setOpen(false)} />
              </nav>
              <div className="mt-5 pt-5 border-t border-border/60">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <User className="h-4 w-4" />
                  প্রোফাইল
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
