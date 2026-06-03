"use client"

import Link from "next/link"
import { children } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle, Trophy, Clock, ChevronRight } from "lucide-react"
import { formatDistanceToNow } from "@/lib/time"

export default function ChildrenPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Children</h1>
          <p className="text-muted-foreground text-sm mt-1">সন্তানদের প্রোফাইল ও অগ্রগতি</p>
        </div>
        <Button className="gap-2"><PlusCircle className="h-4 w-4" />সন্তান যোগ করুন</Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {children.map(child => (
          <Link key={child.id} href={`/parent/children/${child.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback className="text-lg">{child.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">{child.name}</p>
                      <Badge className={child.subscriptionStatus === "active" ? "bg-green-600" : "bg-muted text-muted-foreground"}>
                        {child.subscriptionStatus === "active" ? "Active" : child.subscriptionStatus}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{child.class}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">সামগ্রিক অগ্রগতি</span>
                    <span className="font-semibold">{child.progress}%</span>
                  </div>
                  <Progress value={child.progress} className="h-2.5" />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  {[["কোর্স", child.enrolledClasses.length], ["ব্যাজ", child.badgeCount], ["টেস্ট", child.mockTestScores.length]].map(([l, v]) => (
                    <div key={l} className="rounded-lg bg-muted p-2">
                      <p className="font-semibold">{v}</p>
                      <p className="text-[11px] text-muted-foreground">{l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />সর্বশেষ: {formatDistanceToNow(child.lastActive)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
