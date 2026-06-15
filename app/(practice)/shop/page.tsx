import Link from "next/link"
import { Crown } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { CoinBundleGrid } from "@/components/shop/coin-bundle-grid"
import { Card, CardContent } from "@/components/ui/card"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function ShopPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="শপ" description="কয়েন কিনে নতুন আইটেম এবং সুবিধা আনলক করো।" />
      <Link href="/shop/premium">
        <Card className="border-primary/40 bg-brand-gradient text-primary-foreground transition hover:opacity-90">
          <CardContent className="flex items-center gap-3 py-4">
            <Crown className="size-6" />
            <div>
              <p className="font-semibold">প্রিমিয়াম মেম্বারশিপ</p>
              <p className="text-sm opacity-90">সব ফিচার আনলক করো বিজ্ঞাপন মুক্তভাবে</p>
            </div>
          </CardContent>
        </Card>
      </Link>
      <div>
        <h2 className="mb-3 text-lg font-semibold">কয়েন বান্ডেল</h2>
        <CoinBundleGrid />
      </div>
    </TwoColumnShell>
  )
}
