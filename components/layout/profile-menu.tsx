"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, LogOut, Settings, ShoppingBag, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/store/auth-store"
import { cn } from "@/lib/utils"

export function ProfileMenu() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const name = user?.name ?? "Guest"
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  function handleLogout() {
    logout()
    router.replace("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-transparent pl-1 pr-2",
          "hover:bg-muted transition-colors outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
      >
        <Avatar size="sm">
          <AvatarFallback>{initials || "U"}</AvatarFallback>
        </Avatar>
        <ChevronDown className="size-3.5 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-3 font-normal">
            <p className="font-medium text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</p>
          </DropdownMenuLabel>

          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/profile" />}>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/shop" />}>
            <ShoppingBag />
            Shop
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-2 gap-3" render={<Link href="/settings" />}>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="px-3 py-2 gap-3" variant="destructive" onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
