"use client"

import Link from "next/link"
import { mySubscriptions } from "@/lib/mock/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, XCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const statusConfig = {
  active: { icon: CheckCircle2, label: "সক্রিয়", color: "text-green-600 bg-green-50 border-green-200" },
  expired: { icon: AlertCircle, label: "মেয়াদ শেষ", color: "text-red-600 bg-red-50 border-red-200" },
  cancelled: { icon: XCircle, label: "বাতিল", color: "text-muted-foreground bg-muted border-border" },
}

export default function MyPlansPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Plans</h1>
          <p className="text-muted-foreground text-sm mt-1">সাবস্ক্রিপশন পরিচালনা</p>
        </div>
        <Link href="/subscribe">
          <Button className="gap-2"><RefreshCw className="h-4 w-4" />নতুন প্ল্যান</Button>
        </Link>
      </div>

      {mySubscriptions.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-muted-foreground">কোনো সক্রিয় সাবস্ক্রিপশন নেই।</p>
          <Link href="/subscribe"><Button>Subscribe করুন</Button></Link>
        </div>
      ) : mySubscriptions.map(sub => {
        const cfg = statusConfig[sub.status]
        const Icon = cfg.icon
        const daysLeft = Math.ceil((new Date(sub.renewDate).getTime() - Date.now()) / 86400000)
        return (
          <Card key={sub.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{sub.planName}</h2>
                  <p className="text-sm text-muted-foreground">{sub.class}</p>
                </div>
                <div className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border", cfg.color)}>
                  <Icon className="h-3.5 w-3.5" />{cfg.label}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ["শুরুর তারিখ", new Date(sub.startDate).toLocaleDateString("bn-BD")],
                  ["নবায়নের তারিখ", new Date(sub.renewDate).toLocaleDateString("bn-BD")],
                  ["মাসিক মূল্য", `৳${sub.price.toLocaleString()}`],
                  sub.status === "active" ? ["বাকি দিন", `${daysLeft} দিন`] : ["অবস্থা", "নিষ্ক্রিয়"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-muted-foreground text-xs mb-0.5">{k}</p>
                    <p className={cn("font-medium", k === "বাকি দিন" && daysLeft <= 7 ? "text-amber-600" : "")}>{v}</p>
                  </div>
                ))}
              </div>
              {sub.status === "active" && daysLeft <= 7 && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700">সাবস্ক্রিপশন {daysLeft} দিনের মধ্যে শেষ হবে।</AlertDescription>
                </Alert>
              )}
              <div className="flex gap-2">
                {sub.status === "active"
                  ? <>
                    <Link href="/subscribe" className="flex-1"><Button className="w-full" size="sm"><RefreshCw className="h-4 w-4 mr-2" />নবায়ন</Button></Link>
                    <Button variant="outline" size="sm">বাতিল</Button>
                  </>
                  : <Link href="/subscribe" className="flex-1"><Button className="w-full" size="sm">পুনরায় সাবস্ক্রাইব</Button></Link>
                }
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
