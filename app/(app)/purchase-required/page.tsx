"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { classes } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, ShoppingCart, Star, Users } from "lucide-react"

export default function PurchaseRequiredPage() {
  const params = useSearchParams()
  const classId = params.get("classId")
  const cls = classId ? classes.find(c => c.id === classId || c.slug === classId) : null

  return (
    <div className="max-w-lg mx-auto py-12 text-center space-y-6">
      <div className="h-20 w-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
        <Lock className="h-10 w-10" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">এই কন্টেন্ট লক করা আছে</h1>
        <p className="text-muted-foreground text-sm mt-2">
          এই পাঠটি দেখতে হলে কোর্সটি ক্রয় করতে হবে।
        </p>
      </div>

      {cls && (
        <Card className="text-left overflow-hidden">
          <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${cls.thumbnail})` }}>
            <div className="h-full w-full bg-black/40 flex items-end p-3">
              <Badge variant="secondary">{cls.level}</Badge>
            </div>
          </div>
          <CardContent className="p-4 space-y-3">
            <p className="font-bold leading-snug">{cls.title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />{cls.rating}</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{cls.enrolledCount.toLocaleString()} শিক্ষার্থী</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xl font-bold">৳{cls.price.toLocaleString()}</span>
              <Link href={`/checkout/${cls.id}`}>
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-1.5" />
                  এখনই কিনুন
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {!cls && (
        <div className="flex gap-3 justify-center">
          <Link href="/catalog">
            <Button variant="outline">কোর্স দেখুন</Button>
          </Link>
          <Link href="/subscribe">
            <Button>সাবস্ক্রিপশন দেখুন</Button>
          </Link>
        </div>
      )}

      {cls && (
        <div className="flex gap-3 justify-center text-sm">
          <Link href={`/catalog/classes/${cls.slug}`} className="text-muted-foreground hover:text-foreground underline underline-offset-4">
            কোর্সের বিবরণ দেখুন
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link href="/subscribe" className="text-muted-foreground hover:text-foreground underline underline-offset-4">
            সাবস্ক্রিপশন প্ল্যান
          </Link>
        </div>
      )}
    </div>
  )
}
