"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LayoutDashboard, Users, CreditCard, Bell, Zap, Menu } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ModeSwitcher } from "./ModeSwitcher"
import { parentUser } from "@/lib/mock/data"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/children", label: "My Children", icon: Users },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
]

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname()
  return (
    <>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onClick}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </Link>
      ))}
    </>
  )
}

export function ParentNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span>Ezdu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          <NavLinks />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeSwitcher />
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
            <Bell className="h-4 w-4" />
          </Link>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={parentUser.avatar} alt={parentUser.name} />
            <AvatarFallback>{parentUser.name[0]}</AvatarFallback>
          </Avatar>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 md:hidden")}>
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="flex items-center gap-2 font-bold text-lg mb-6">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="h-4 w-4" />
                </div>
                Ezdu
              </div>
              <nav className="flex flex-col gap-1">
                <NavLinks onClick={() => setOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
