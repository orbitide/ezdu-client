import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GoProCardProps {
  title?: string
  description?: string
}

export function GoProCard({
  title = "আনলিমিটেড মক টেস্ট আনলক করো",
  description = "প্রিমিয়ামে আপগ্রেড করে সব মডেল টেস্ট, ডিটেইল সলিউশন ও পারফরম্যান্স অ্যানালিটিক্স পাও।",
}: GoProCardProps) {
  return (
    <Card className="border-pro/50 bg-gradient-to-br from-pro/10 to-transparent">
      <CardContent className="space-y-3 py-6 text-center">
        <Image src="/icons/pro_badge.svg" alt="" width={64} height={64} className="mx-auto size-16" />
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button asChild variant="pro" className="w-full">
          <Link href="/shop/premium">প্রো নাও</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
