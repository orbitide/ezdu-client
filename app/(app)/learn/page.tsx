"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StudyCalendar } from "@/components/learn/StudyCalendar"
import { classes, inProgressLessons, notifications } from "@/lib/mock/data"
import { getSession, getOnboarding, getStudyGoal, type StudyGoalState } from "@/lib/storage"
import { usePurchaseStore } from "@/lib/stores/purchaseStore"
import { toggleSaved } from "@/lib/services/purchaseService"
import { getSavedCourses as getStoredSaved } from "@/lib/storage"
import { PAYMENT_METHOD_LABELS } from "@/lib/mock/purchaseData"
import {
  Play, Bell, BookOpen, ArrowRight, Clock, CheckCircle2,
  ShoppingBag, FileText, Heart, HeartOff, Receipt,
} from "lucide-react"

const unread = notifications.filter(n => !n.read)

const TYPE_LABEL: Record<string, string> = { video: "ভিডিও", reading: "পাঠ্য", quiz: "কুইজ" }

type InProgressLesson = typeof inProgressLessons[number] & {
  level: string
  moduleTitle: string
  classSlug: string
  totalLessons: number
}

export default function StudentDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "purchases" ? "purchases" : "overview"

  const [userName, setUserName] = useState("")
  const [goal, setGoal] = useState<StudyGoalState | null>(null)
  const [ready, setReady] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>([])

  const {
    enrollments, subscriptions, purchaseHistory,
    isEnrolled, hasActiveSubscriptionFor, setSavedCourses, savedCourses,
  } = usePurchaseStore()

  useEffect(() => {
    const onboarding = getOnboarding()
    if (!onboarding?.completed) {
      router.replace("/onboarding")
      return
    }
    const session = getSession()
    setUserName(session?.user.name.split(" ")[0] ?? "")
    setGoal(getStudyGoal())
    setSavedIds(getStoredSaved())
    setReady(true)
  }, [router])

  if (!ready) return null

  const enrolledClasses = classes.filter(c =>
    isEnrolled(c.id) || hasActiveSubscriptionFor(c.level) ||
    ["subscribed", "free"].includes(c.entitlement)
  )
  const unenrolledClasses = classes.filter(c =>
    !isEnrolled(c.id) && !hasActiveSubscriptionFor(c.level) &&
    !["subscribed", "free"].includes(c.entitlement)
  )

  const byModule = (inProgressLessons as InProgressLesson[]).reduce<Record<string, { classSlug: string; lessons: InProgressLesson[] }>>(
    (acc, lesson) => {
      if (!acc[lesson.moduleTitle]) acc[lesson.moduleTitle] = { classSlug: lesson.classSlug, lessons: [] }
      acc[lesson.moduleTitle].lessons.push(lesson)
      return acc
    },
    {}
  )

  const savedClassObjects = classes.filter(c => savedCourses.includes(c.id) || savedIds.includes(c.id))

  function handleToggleSaved(classId: string) {
    toggleSaved(classId)
    const updated = getStoredSaved()
    setSavedIds(updated)
    setSavedCourses(updated)
  }

  const activeSubscriptions = subscriptions.filter(s => {
    const now = new Date().toISOString()
    return s.status === "active" && s.endDate > now
  })

  return (
    <div className="space-y-6">
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

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5" />
            My Purchases
            {purchaseHistory.filter(o => o.status === "completed").length > 0 && (
              <Badge variant="secondary" className="h-4 px-1 text-[10px] ml-0.5">
                {purchaseHistory.filter(o => o.status === "completed").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5" />
            Saved
            {savedClassObjects.length > 0 && (
              <Badge variant="secondary" className="h-4 px-1 text-[10px] ml-0.5">{savedClassObjects.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── Overview tab ───────────────────────────────────────────────────── */}
        <TabsContent value="overview" className="space-y-8">
          {/* Active subscription banner */}
          {activeSubscriptions.length > 0 && (
            <div className="rounded-lg border border-green-500/30 bg-green-50 dark:bg-green-950/20 p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400 text-sm">সক্রিয় সাবস্ক্রিপশন</p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
                  {activeSubscriptions.map(s => s.planName).join(", ")} · মেয়াদ: {new Date(activeSubscriptions[0].endDate).toLocaleDateString("bn-BD")}
                </p>
              </div>
              <Link href="/subscribe/my-plans">
                <Button variant="outline" size="sm" className="shrink-0 text-xs border-green-500/50 text-green-700 dark:text-green-400">বিস্তারিত</Button>
              </Link>
            </div>
          )}

          {/* Continue watching */}
          <section>
            <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">যেখানে ছেড়েছিলে</h2>
                  <Link href="/catalog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    সব দেখুন <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="space-y-5">
                  {Object.entries(byModule).map(([moduleTitle, { classSlug, lessons }]) => (
                    <div key={moduleTitle}>
                      <Link href={`/catalog/classes/${classSlug}`} className="text-sm font-bold mb-2 hover:text-primary transition-colors inline-block">
                        {moduleTitle}
                      </Link>
                      <div className="space-y-3">
                        {lessons.map((lesson) => (
                          <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex gap-3 items-start">
                              <div className={[
                                "mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                                lesson.completed
                                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-primary/10 text-primary",
                              ].join(" ")}>
                                {lesson.completed
                                  ? <CheckCircle2 className="h-4 w-4" />
                                  : lesson.type === "reading"
                                  ? <BookOpen className="h-4 w-4" />
                                  : <Play className="h-4 w-4" />
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">
                                  <Link href={`/catalog/classes/${classSlug}`} className="hover:text-foreground hover:underline transition-colors">
                                    {lesson.subject}
                                  </Link>
                                  {" · "}{TYPE_LABEL[lesson.type] ?? lesson.type}
                                </p>
                                <Link href={`/learn/${lesson.id}`} className="text-sm font-semibold leading-snug mt-0.5 line-clamp-1 hover:text-primary transition-colors block">
                                  {lesson.title}
                                </Link>
                                {lesson.completed ? (
                                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">পাঠ সম্পন্ন</p>
                                ) : (
                                  <div className="mt-1.5 space-y-1">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                      <span>পাঠ {lesson.order} / {lesson.totalLessons}</span>
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
                              {!lesson.completed && (
                                <div className="shrink-0 mt-0.5 flex flex-col gap-1.5">
                                  <Link href={`/learn/${lesson.id}`} className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/5 px-2 py-1 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                                    <Play className="h-2.5 w-2.5" />
                                    Resume
                                  </Link>
                                  <Link href="/practice/mock-tests" className="inline-flex items-center gap-1 rounded-md border border-muted-foreground/30 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                                    <CheckCircle2 className="h-2.5 w-2.5" />
                                    Mock Test
                                  </Link>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <StudyCalendar />
            </div>
          </section>

          {/* Enrolled classes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">আমার কোর্সসমূহ</h2>
              <Link href="/catalog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                Catalog <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {enrolledClasses.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-3">
                <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">এখনো কোনো কোর্সে ভর্তি হননি।</p>
                <Link href="/catalog"><Button size="sm" variant="outline">কোর্স দেখুন</Button></Link>
              </div>
            ) : (
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
                            <Badge className="text-xs bg-green-600">Enrolled</Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 space-y-2">
                          <p className="font-bold text-sm leading-snug">{cls.title}</p>
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
            )}
          </section>

          <Separator />

          {/* Recommended */}
          <section>
            <h2 className="text-lg font-bold mb-4">আরও কোর্স</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unenrolledClasses.slice(0, 3).map((cls) => (
                <Link key={cls.id} href={`/catalog/classes/${cls.slug}`}>
                  <Card className="group hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                    <div className="h-24 bg-cover bg-center relative" style={{ backgroundImage: `url(${cls.thumbnail})` }}>
                      <div className="absolute inset-0 bg-black/40" />
                      <Badge variant="secondary" className="absolute top-2 left-2 text-xs">{cls.level}</Badge>
                    </div>
                    <CardContent className="p-3 space-y-1">
                      <p className="font-bold text-sm leading-snug">{cls.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">৳{cls.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">⭐ {cls.rating}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* ── Purchases tab ──────────────────────────────────────────────────── */}
        <TabsContent value="purchases" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">ক্রয়ের ইতিহাস</h2>
            <Badge variant="outline">{purchaseHistory.filter(o => o.status === "completed").length} টি লেনদেন</Badge>
          </div>

          {purchaseHistory.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center space-y-3">
              <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">এখনো কোনো কেনাকাটা করা হয়নি।</p>
              <Link href="/catalog"><Button size="sm" variant="outline">কোর্স কিনুন</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {[...purchaseHistory].reverse().map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm line-clamp-1">{order.classTitle}</p>
                          <Badge
                            variant={order.status === "completed" ? "default" : "destructive"}
                            className="text-[10px] h-4 px-1.5 shrink-0"
                          >
                            {order.status === "completed" ? "সফল" : "ব্যর্থ"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">{order.invoiceNumber}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span>{new Date(order.createdAt).toLocaleDateString("bn-BD")}</span>
                          <span>·</span>
                          <span>{PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}</span>
                          {order.couponCode && (
                            <>
                              <span>·</span>
                              <span className="text-green-600">{order.couponCode}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold">৳{order.totalAmount.toLocaleString()}</p>
                        {order.discountAmount > 0 && (
                          <p className="text-xs text-green-600">-৳{order.discountAmount.toLocaleString()} ছাড়</p>
                        )}
                      </div>
                    </div>
                    {order.status === "completed" && (
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Receipt className="h-3.5 w-3.5" />
                          <span>ইনভয়েস: <span className="font-mono">{order.invoiceNumber}</span></span>
                        </div>
                        <Badge variant="outline" className="text-[10px]">পেমেন্ট সম্পন্ন</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Active subscriptions */}
          {activeSubscriptions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                সক্রিয় সাবস্ক্রিপশন
              </h3>
              {activeSubscriptions.map(sub => (
                <Card key={sub.id}>
                  <CardContent className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-sm">{sub.planName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {sub.classLevel} · মেয়াদ শেষ: {new Date(sub.endDate).toLocaleDateString("bn-BD")}
                      </p>
                    </div>
                    <Badge className="bg-green-600 shrink-0">সক্রিয়</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Saved tab ──────────────────────────────────────────────────────── */}
        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">সেভ করা কোর্স</h2>
            <Badge variant="outline">{savedClassObjects.length} টি</Badge>
          </div>

          {savedClassObjects.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center space-y-3">
              <Heart className="h-10 w-10 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">কোনো কোর্স সেভ করা নেই।</p>
              <Link href="/catalog"><Button size="sm" variant="outline">কোর্স দেখুন</Button></Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedClassObjects.map(cls => (
                <Card key={cls.id} className="overflow-hidden group">
                  <div className="h-24 bg-cover bg-center relative" style={{ backgroundImage: `url(${cls.thumbnail})` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <Badge variant="secondary" className="absolute top-2 left-2 text-xs">{cls.level}</Badge>
                    <button
                      onClick={() => handleToggleSaved(cls.id)}
                      className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                    >
                      <HeartOff className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <CardContent className="p-3 space-y-2">
                    <p className="font-bold text-sm leading-snug">{cls.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">৳{cls.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">⭐ {cls.rating}</p>
                    </div>
                    <Link href={`/checkout/${cls.id}`}>
                      <Button size="sm" className="w-full text-xs h-7">এখনই কিনুন</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
