"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { StudyCalendar } from "@/components/learn/StudyCalendar"
import { classes, inProgressLessons, badges, notifications } from "@/lib/mock/data"
import { getSession, getOnboarding, getStudyGoal, type StudyGoalState } from "@/lib/storage"
import { Play, Bell, BookOpen, ArrowRight, Clock, CheckCircle2 } from "lucide-react"

const earnedBadges = badges.filter(b => !b.locked)
const unread = notifications.filter(n => !n.read)
const enrolledClasses = classes.filter(c => ["subscribed", "free"].includes(c.entitlement))

const TYPE_LABEL: Record<string, string> = {
  video: "ভিডিও",
  reading: "পাঠ্য",
  quiz: "কুইজ",
}

export default function StudentDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [goal, setGoal] = useState<StudyGoalState | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const onboarding = getOnboarding()
    if (!onboarding?.completed) {
      router.replace("/onboarding")
      return
    }
    const session = getSession()
    const firstName = session?.user.name.split(" ")[0] ?? ""
    setUserName(firstName)
    setGoal(getStudyGoal())
    setReady(true)
  }, [router])

  if (!ready) return null

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">স্বাগতম, {userName}!</h1>
          {goal?.hasGoal ? (
            <p className="text-muted-foreground text-sm mt-1">{goal.goalText}</p>
          ) : (
            <Link href="/goals/new" className="inline-flex items-center gap-1 mt-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
              তোমার শেখার লক্ষ্য তৈরি করো
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
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

      {/* Continue watching — 2-col: lesson list + calendar */}
      <section>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: lesson list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">যেখানে ছেড়েছিলে</h2>
              <Link href="/catalog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                সব দেখুন <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-2">
              {inProgressLessons.map((lesson) => (
                <Link key={lesson.id} href={`/learn/${lesson.id}`}>
                  <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-3 flex gap-3 items-start">
                      {/* Icon */}
                      <div className={[
                        "mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                        lesson.completed
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                      ].join(" ")}>
                        {lesson.completed
                          ? <CheckCircle2 className="h-4 w-4" />
                          : lesson.type === "reading"
                          ? <BookOpen className="h-4 w-4" />
                          : <Play className="h-4 w-4" />
                        }
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {lesson.subject} · {TYPE_LABEL[lesson.type] ?? lesson.type}
                        </p>
                        <p className="text-sm font-medium leading-snug mt-0.5 line-clamp-1">
                          {lesson.title}
                        </p>

                        {lesson.completed ? (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">পাঠ সম্পন্ন</p>
                        ) : (
                          <div className="mt-1.5 space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>পাঠ {lesson.order} / {(lesson as typeof lesson & { totalLessons: number }).totalLessons}</span>
                              <span>{lesson.progress}% সম্পন্ন</span>
                            </div>
                            <Progress value={lesson.progress} className="h-1" />
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-2.5 w-2.5" />
                              {lesson.duration}m · ~{Math.max(1, Math.round(lesson.duration * (1 - lesson.progress / 100)))}m বাকি
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Resume badge */}
                      {!lesson.completed && (
                        <div className="shrink-0 mt-0.5">
                          <span className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/5 px-2 py-1 text-xs font-medium text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                            <Play className="h-2.5 w-2.5" />
                            Resume
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: calendar */}
          <StudyCalendar />
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
