import Link from "next/link"
import { Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function GoProCard() {
  return (
    <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
      <CardContent className="space-y-3 py-6 text-center">
        <Crown className="mx-auto size-8 text-primary" />
        <p className="text-base font-semibold">আনলিমিটেড মক টেস্ট আনলক করো</p>
        <p className="text-sm text-muted-foreground">
          প্রিমিয়ামে আপগ্রেড করে সব মডেল টেস্ট, ডিটেইল সলিউশন ও পারফরম্যান্স অ্যানালিটিক্স পাও।
        </p>
        <Button asChild className="w-full">
          <Link href="/shop/premium">প্রো নাও</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
