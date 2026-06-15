import { Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { coinBundles } from "@/lib/mock/shop"
import { formatCompactNumber } from "@/lib/utils/format"

export function CoinBundleGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {coinBundles.map((bundle) => (
        <Card key={bundle.id} className={bundle.popular ? "border-primary/50 ring-1 ring-primary/30" : undefined}>
          <CardContent className="flex flex-col items-center gap-2 py-6 text-center">
            {bundle.popular && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">জনপ্রিয়</span>
            )}
            <Coins className="size-8 text-amber-500" />
            <p className="text-xl font-bold">{formatCompactNumber(bundle.coins)} কয়েন</p>
            {bundle.bonus && <p className="text-xs text-green-600">{bundle.bonus}</p>}
            <Button className="mt-2 w-full">{bundle.price}৳ - কিনো</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
