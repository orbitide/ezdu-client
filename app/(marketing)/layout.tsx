import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span>Ezdu</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Login
            </Link>
            <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
