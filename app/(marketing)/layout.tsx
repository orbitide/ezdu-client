"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
              <Zap className="h-4 w-4" />
            </div>
            <span className="tracking-tight">Ezdu</span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              লগইন
            </Link>
            <Link href="/register" className={cn(buttonVariants({ size: "sm" }), "shadow-sm shadow-primary/20")}>
              শুরু করুন
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
