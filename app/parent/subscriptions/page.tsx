"use client"

import { children } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function ParentSubscriptionsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground text-sm mt-1">সন্তানদের সকল সাবস্ক্রিপশন (শুধু দেখার জন্য)</p>
      </div>

      <div className="space-y-4">
        {children.map(child => (
          <Card key={child.id}>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback>{child.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{child.name}</p>
                  <p className="text-xs text-muted-foreground">{child.class}</p>
                </div>
              </div>
              <Separator />
              {child.enrolledClasses.map((cls, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{cls}</p>
                    <p className="text-xs text-muted-foreground">মাসিক সাবস্ক্রিপশন</p>
                  </div>
                  {child.subscriptionStatus === "active"
                    ? <Badge className="bg-green-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />সক্রিয়</Badge>
                    : <Badge variant="outline" className="text-muted-foreground flex items-center gap-1"><AlertCircle className="h-3 w-3" />নিষ্ক্রিয়</Badge>
                  }
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground">সাবস্ক্রিপশন পরিবর্তন করতে Student মোডে যান।</p>
    </div>
  )
}
