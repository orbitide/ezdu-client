"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { currentUser, classes, inProgressLessons, badges, notifications } from "@/lib/mock/data"
import { Play, Flame, Zap, Trophy, Bell, BookOpen, ArrowRight, Clock, CheckCircle2 } from "lucide-react"

const earnedBadges = badges.filter(b => !b.locked)
const unread = notifications.filter(n => !n.read)
const enrolledClasses = classes.filter(c => ["subscribed", "free"].includes(c.entitlement))

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">স্বাগতম, {currentUser.name.split(" ")[0]}! 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">আজকেও কিছু শেখা যাক।</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            {currentUser.streak} day streak
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
            <Zap className="h-3.5 w-3.5 text-purple-500" />
            {currentUser.xp.toLocaleString()} XP
          </Badge>
        </div>
      </div>

      {/* Notification bar */}
      {unread.length > 0 && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span className="line-clamp-1">{unread[0].body}</span>
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="shrink-0 h-7 text-xs">
                সব দেখুন ({unread.length})
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: CheckCircle2, color: "text-blue-500 bg-blue-50", value: classes.flatMap(c => c.modules.flatMap(m => m.subjects.flatMap(s => s.lessons))).filter(l => l.completed).length, label: "পাঠ সম্পন্ন" },
          { icon: Trophy, color: "text-yellow-500 bg-yellow-50", value: earnedBadges.length, label: "ব্যাজ অর্জিত" },
          { icon: Flame, color: "text-orange-500 bg-orange-50", value: currentUser.streak, label: "দিনের streak" },
          { icon: Zap, color: "text-purple-500 bg-purple-50", value: currentUser.xp.toLocaleString(), label: "মোট XP" },
        ].map(({ icon: Icon, color, value, label }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue watching */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">যেখানে ছেড়েছিলে</h2>
          <Link href="/catalog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            সব দেখুন <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {inProgressLessons.map((lesson) => (
            <Link key={lesson.id} href={`/learn/${lesson.id}`}>
              <Card className="group hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{lesson.subject}</p>
                      <p className="text-sm font-medium mt-0.5 leading-snug line-clamp-2">{lesson.title}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Play className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={lesson.progress} className="h-1.5" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{lesson.progress}% সম্পন্ন</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lesson.duration}m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Enrolled classes */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">আমার কোর্সসমূহ</h2>
          <Link href="/catalog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            Catalog <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {enrolledClasses.map((cls) => {
            const allL = cls.modules.flatMap(m => m.subjects.flatMap(s => s.lessons))
            const done = allL.filter(l => l.completed).length
            const pct = allL.length > 0 ? Math.round((done / allL.length) * 100) : 0
            return (
              <Link key={cls.id} href={`/catalog/classes/${cls.slug}`}>
                <Card className="group hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="h-28 bg-cover bg-center relative" style={{ backgroundImage: `url(${cls.thumbnail})` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <Badge variant="secondary" className="text-xs">{cls.level}</Badge>
                      {cls.entitlement === "subscribed" && <Badge className="text-xs bg-green-600">Subscribed</Badge>}
                      {cls.entitlement === "free" && <Badge className="text-xs bg-blue-600">Free</Badge>}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <p className="font-semibold text-sm leading-snug">{cls.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{cls.subjectCount} বিষয়</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />{done}/{allL.length} পাঠ</span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">{pct}% সম্পন্ন</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Recent badges */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">সাম্প্রতিক ব্যাজ</h2>
          <Link href="/profile/badges" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            সব দেখুন <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {earnedBadges.map((badge) => (
            <Badge key={badge.id} variant="secondary" className={`gap-1.5 px-3 py-1.5 text-sm ${badge.color}`}>
              <span>{badge.icon}</span>
              {badge.name}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Recommended */}
      <section>
        <h2 className="text-lg font-semibold mb-4">আরও কোর্স</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.filter(c => c.entitlement === "preview" || c.entitlement === "locked").slice(0, 3).map((cls) => (
            <Link key={cls.id} href={`/catalog/classes/${cls.slug}`}>
              <Card className="group hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                <div className="h-24 bg-cover bg-center relative" style={{ backgroundImage: `url(${cls.thumbnail})` }}>
                  <div className="absolute inset-0 bg-black/40" />
                  <Badge variant="secondary" className="absolute top-2 left-2 text-xs">{cls.level}</Badge>
                </div>
                <CardContent className="p-3 space-y-1">
                  <p className="font-medium text-sm leading-snug">{cls.title}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">৳{cls.price.toLocaleString()}/মাস</p>
                    <p className="text-xs text-muted-foreground">⭐ {cls.rating}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
