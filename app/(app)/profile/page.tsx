"use client"

import Link from "next/link"
import { currentUser, badges, classes, mySubscriptions } from "@/lib/mock/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Trophy, Flame, Zap, BookOpen, CheckCircle2, Settings, ChevronRight, Calendar } from "lucide-react"

const earnedBadges = badges.filter(b => !b.locked)
const enrolledClasses = classes.filter(c => ["subscribed", "free"].includes(c.entitlement))
const completedLessons = classes.flatMap(c => c.modules.flatMap(m => m.subjects.flatMap(s => s.lessons))).filter(l => l.completed).length

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile card */}
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="text-2xl">{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold">{currentUser.name}</h1>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">যোগ দিয়েছেন {new Date(currentUser.joinedAt).toLocaleDateString("bn-BD")}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings className="h-4 w-4" />Edit
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Flame, color: "text-orange-500", value: currentUser.streak, label: "Day Streak" },
              { icon: Zap, color: "text-purple-500", value: currentUser.xp.toLocaleString(), label: "Total XP" },
              { icon: CheckCircle2, color: "text-green-500", value: completedLessons, label: "Lessons Done" },
              { icon: Trophy, color: "text-yellow-500", value: earnedBadges.length, label: "Badges" },
            ].map(({ icon: Icon, color, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-1"><Icon className={cn("h-5 w-5", color)} /></div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">শেখার অগ্রগতি</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {enrolledClasses.map(cls => {
            const lessons = cls.modules.flatMap(m => m.subjects.flatMap(s => s.lessons))
            const done = lessons.filter(l => l.completed).length
            const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0
            return (
              <div key={cls.id} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium line-clamp-1">{cls.title}</span>
                  <span className="text-muted-foreground shrink-0 ml-2">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2" />
                <p className="text-xs text-muted-foreground">{done}/{lessons.length} পাঠ</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Badges preview */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base">আমার ব্যাজ</CardTitle>
          <Link href="/profile/badges">
            <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">সব দেখুন <ChevronRight className="h-3.5 w-3.5" /></Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map(badge => (
              <Badge key={badge.id} variant="secondary" className={`gap-1.5 px-3 py-1.5 text-sm ${badge.color}`}>
                <span>{badge.icon}</span>{badge.name}
              </Badge>
            ))}
            {earnedBadges.length === 0 && <p className="text-sm text-muted-foreground">এখনও কোনো ব্যাজ নেই।</p>}
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">সাবস্ক্রিপশন</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mySubscriptions.map(sub => (
            <div key={sub.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{sub.planName}</p>
                <p className="text-xs text-muted-foreground">{new Date(sub.renewDate).toLocaleDateString("bn-BD")} পর্যন্ত</p>
              </div>
              <Badge className="bg-green-600">সক্রিয়</Badge>
            </div>
          ))}
          <Link href="/subscribe/my-plans">
            <Button variant="outline" size="sm" className="w-full mt-2">প্ল্যান পরিচালনা</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...args: (string | undefined | false)[]) {
  return args.filter(Boolean).join(" ")
}
