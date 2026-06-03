"use client"

import Link from "next/link"
import { children, parentUser } from "@/lib/mock/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Users, Trophy, Clock, ChevronRight, Activity } from "lucide-react"
import { formatDistanceToNow } from "@/lib/time"

export default function ParentDashboard() {
  const recentActivity = children
    .flatMap(c => c.mockTestScores.map(s => ({ ...s, childName: c.name, avatar: c.avatar })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">স্বাগতম, {parentUser.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground text-sm mt-1">আপনার সন্তানদের অগ্রগতি</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Users, color: "text-blue-500 bg-blue-50", value: children.length, label: "সন্তান" },
          { icon: Activity, color: "text-green-500 bg-green-50", value: `${Math.round(children.reduce((s, c) => s + c.progress, 0) / children.length)}%`, label: "গড় অগ্রগতি" },
          { icon: Trophy, color: "text-yellow-500 bg-yellow-50", value: children.reduce((s, c) => s + c.badgeCount, 0), label: "মোট ব্যাজ" },
        ].map(({ icon: Icon, color, value, label }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="h-5 w-5" /></div>
              <div><p className="text-2xl font-bold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">আমার সন্তান</h2>
          <Link href="/parent/children">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">সব দেখুন <ChevronRight className="h-3.5 w-3.5" /></Button>
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {children.map(child => (
            <Link key={child.id} href={`/parent/children/${child.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{child.name}</p>
                      <p className="text-xs text-muted-foreground">{child.class}</p>
                    </div>
                    <Badge className={child.subscriptionStatus === "active" ? "bg-green-600" : "bg-muted text-muted-foreground"}>
                      {child.subscriptionStatus === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">অগ্রগতি</span>
                      <span className="font-medium">{child.progress}%</span>
                    </div>
                    <Progress value={child.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Trophy className="h-3 w-3" />{child.badgeCount} ব্যাজ</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDistanceToNow(child.lastActive)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">সাম্প্রতিক কার্যক্রম</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={a.avatar} />
                  <AvatarFallback>{a.childName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm"><span className="font-medium">{a.childName}</span> <span className="text-muted-foreground">মক টেস্ট দিয়েছে</span></p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{a.test}</p>
                </div>
                <Badge className={a.score >= 60 ? "bg-green-600" : "bg-red-600"}>{a.score}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
