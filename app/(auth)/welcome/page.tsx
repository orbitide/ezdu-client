import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandName } from "@/components/layout/brand-name"

export default function WelcomePage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--ez-chrome-row))] flex-1 flex-col items-center justify-center gap-8 px-6 py-12 pt-ez-below-nav text-center">
      <div className="flex flex-col items-center gap-4">
        <Image src="/logo-rounded.png" alt="EZDU" width={88} height={88} className="rounded-2xl" />
        <BrandName size="md" className="text-3xl" />
        <p className="max-w-xs text-muted-foreground">
          মনোযোগী থাকো। তোমার লক্ষ্য পূরণ করো।
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button asChild size="lg">
          <Link href="/onboarding">শুরু করো</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/login">আমার অ্যাকাউন্ট আছে</Link>
        </Button>
      </div>
    </div>
  )
}
