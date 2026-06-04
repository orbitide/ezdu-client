"use client"

import { use, useState } from "react"
import { classes } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight, Play, FileText, HelpCircle, Users, Star, BookOpen, Clock, CheckCircle2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

function LessonTypeIcon({ type }: { type: "video" | "reading" | "quiz" }) {
  if (type === "video") return <Play className="h-3.5 w-3.5 text-blue-500" />
  if (type === "reading") return <FileText className="h-3.5 w-3.5 text-green-500" />
  return <HelpCircle className="h-3.5 w-3.5 text-purple-500" />
}

export default function ClassDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const cls = classes.find(c => c.slug === slug)
  if (!cls) notFound()

  const [expandedModules, setExpandedModules] = useState<string[]>([cls.modules[0]?.id].filter(Boolean))
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(cls.modules[0]?.subjects.map(s => s.id) ?? [])

  const allLessons = cls.modules.flatMap(m => m.subjects.flatMap(s => s.lessons))
  const completed = allLessons.filter(l => l.completed).length
  const percent = allLessons.length > 0 ? Math.round((completed / allLessons.length) * 100) : 0
  const totalMinutes = allLessons.reduce((s, l) => s + l.duration, 0)
  const canAccess = cls.entitlement === "subscribed" || cls.entitlement === "free"

  const toggle = (id: string, list: string[], setList: (v: string[]) => void) =>
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id])

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-xl overflow-hidden relative">
        <div className="h-56 md:h-72 bg-cover bg-center" style={{ backgroundImage: `url(${cls.thumbnail})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white space-y-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">{cls.level}</Badge>
            {cls.entitlement === "subscribed" && <Badge className="bg-green-600">Subscribed</Badge>}
            {cls.entitlement === "free" && <Badge className="bg-blue-600">Free</Badge>}
            {cls.entitlement === "preview" && <Badge className="bg-amber-500">Preview</Badge>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{cls.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{cls.enrolledCount.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />{cls.rating}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{allLessons.length} পাঠ</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{Math.round(totalMinutes / 60)} ঘন্টা</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course tree */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">কোর্সের বিষয়বস্তু</h2>
            <p className="text-sm text-muted-foreground">{cls.modules.length} মডিউল · {cls.subjectCount} বিষয় · {allLessons.length} পাঠ · {completed} সম্পন্ন</p>
          </div>

          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
            {cls.modules.map(module => {
              const mLessons = module.subjects.flatMap(s => s.lessons)
              const mDone = mLessons.filter(l => l.completed).length
              const isOpen = expandedModules.includes(module.id)
              return (
                <div key={module.id}>
                  <div className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggle(module.id, expandedModules, setExpandedModules)}
                        className="shrink-0 outline-none"
                      >
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                      <div className="min-w-0">
                        <Link
                          href={`/catalog/classes/${cls.slug}/modules/${module.id}`}
                          className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1"
                        >
                          {module.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">{mDone}/{mLessons.length} পাঠ</p>
                      </div>
                    </div>
                    <Progress value={mLessons.length > 0 ? (mDone / mLessons.length) * 100 : 0} className="w-24 h-1.5 shrink-0" />
                  </div>

                  {isOpen && (
                    <div className="bg-muted/20">
                      {module.subjects.map(subject => {
                        const isSubOpen = expandedSubjects.includes(subject.id)
                        return (
                          <div key={subject.id}>
                            <button
                              onClick={() => toggle(subject.id, expandedSubjects, setExpandedSubjects)}
                              className="w-full flex items-center gap-2.5 px-8 py-2.5 hover:bg-muted/50 text-left text-sm"
                            >
                              {isSubOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                              <span className="font-medium">{subject.title}</span>
                              <span className="text-xs text-muted-foreground ml-auto">{subject.completedLessons}/{subject.lessonCount}</span>
                            </button>
                            {isSubOpen && (
                              <div className="pb-2">
                                {subject.lessons.map(lesson => {
                                  const accessible = canAccess || lesson.isFree
                                  return (
                                    <div key={lesson.id} className={cn("flex items-center gap-3 px-12 py-2 text-sm", accessible ? "hover:bg-muted/50" : "opacity-60")}>
                                      {lesson.completed ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                        : !accessible ? <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                        : <LessonTypeIcon type={lesson.type} />}
                                      {accessible
                                        ? <Link href={`/learn/${lesson.id}`} className="flex-1 hover:text-primary transition-colors line-clamp-1">{lesson.title}</Link>
                                        : <span className="flex-1 line-clamp-1">{lesson.title}</span>}
                                      <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}m</span>
                                      {lesson.isFree && <Badge variant="outline" className="text-[10px] h-4 px-1">Free</Badge>}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {canAccess && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="font-semibold text-sm">আমার অগ্রগতি</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{percent}% সম্পন্ন</span>
                    <span className="text-muted-foreground">{completed}/{allLessons.length}</span>
                  </div>
                  <Progress value={percent} className="h-2" />
                </div>
                <Link href={`/learn/${allLessons.find(l => !l.completed)?.id ?? allLessons[0]?.id}`}>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    {completed > 0 ? "Continue Learning" : "Start Learning"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {!canAccess && (
            <Card>
              <CardContent className="p-4 space-y-3">
                {cls.price > 0
                  ? <>
                    <p className="text-2xl font-bold">৳{cls.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/মাস</span></p>
                    <Link href="/subscribe"><Button className="w-full">Subscribe Now</Button></Link>
                    {cls.entitlement === "preview" && <Button variant="outline" className="w-full">Free Preview</Button>}
                  </>
                  : <Button className="w-full">Enroll Free</Button>
                }
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">কোর্স সম্পর্কে</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{cls.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-sm">কোর্স বিবরণ</p>
              {[
                ["শিক্ষার্থী", cls.enrolledCount.toLocaleString()],
                ["বিষয়", `${cls.subjectCount}টি`],
                ["মোট পাঠ", `${allLessons.length}টি`],
                ["মোট সময়", `${Math.round(totalMinutes / 60)} ঘন্টা`],
              ].map(([k, v], i) => (
                <div key={k}>
                  {i > 0 && <Separator className="mb-3" />}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
