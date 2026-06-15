import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProTrialModal } from "@/components/shared/pro-trial-modal"

const FEATURES = ["কোনো বিজ্ঞাপন নেই", "ব্যক্তিগতকৃত প্র্যাকটিস", "আনলিমিটেড মক টেস্ট"]

export function TryProBanner() {
  return (
    <Card className="border-pro/50 bg-gradient-to-br from-pro/10 to-transparent">
      <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
        <Image src="/icons/pro_badge.svg" alt="" width={56} height={56} className="size-14" />
        <p className="text-lg font-semibold">প্রো ফ্রি-তে ট্রাই করো</p>
        <p className="text-left text-sm text-muted-foreground">{FEATURES.join(", ")}</p>
        <ProTrialModal>
          <Button variant="pro" className="w-full">
            ১ সপ্তাহ ফ্রি ট্রাই করো
          </Button>
        </ProTrialModal>
      </CardContent>
    </Card>
  )
}
