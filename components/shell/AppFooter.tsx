import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function AppFooter() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Ezdu</p>
            <p className="text-xs text-muted-foreground">শেখা হোক আনন্দময়</p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">সম্পর্কে</Link>
            <Separator orientation="vertical" className="h-3" />
            <Link href="/contact" className="hover:text-foreground transition-colors">যোগাযোগ</Link>
            <Separator orientation="vertical" className="h-3" />
            <Link href="/privacy" className="hover:text-foreground transition-colors">গোপনীয়তা</Link>
            <Separator orientation="vertical" className="h-3" />
            <Link href="/terms" className="hover:text-foreground transition-colors">শর্তাবলি</Link>
          </nav>

          <p className="text-xs text-muted-foreground">&copy; 2025 Ezdu</p>
        </div>
      </div>
    </footer>
  )
}
