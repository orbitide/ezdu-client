"use client"

import { use, useState } from "react"
import { classes } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronDown, ChevronRight, ChevronLeft,
  Play, FileText, HelpCircle, Clock, CheckCircle2, Lock, BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

function LessonTypeIcon({ type }: { type: "video" | "reading" | "quiz" }) {
  if (type === "video") return <Play className="h-3.5 w-3.5 text-blue-500" />
  if (type === "reading") return <FileText className="h-3.5 w-3.5 text-green-500" />
  return <HelpCircle className="h-3.5 w-3.5 text-purple-500" />
}

export default function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string }>
}) {
  const { slug, moduleId } = use(params)
  const cls = classes.find(c => c.slug === slug)
  if (!cls) notFound()

  const module = cls.modules.find(m => m.id === moduleId)
  if (!module) notFound()

  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(
    module.subjects.map(s => s.id)
  )

  const allLessons = module.subjects.flatMap(s => s.lessons)
  const completed = allLessons.filter(l => l.completed).length
  const percent = allLessons.length > 0 ? Math.round((completed / allLessons.length) * 100) : 0
  const totalMinutes = allLessons.reduce((s, l) => s + l.duration, 0)
  const canAccess = cls.entitlement === "subscribed" || cls.entitlement === "free"

  const toggle = (id: string) =>
    setExpandedSubjects(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  const nextLesson = allLessons.find(l => !l.completed) ?? allLessons[0]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/catalog" className="hover:text-foreground transition-colors">Catalog</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/catalog/classes/${cls.slug}`} className="hover:text-foreground transition-colors line-clamp-1 max-w-[200px]">
          {cls.title}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{module.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{cls.level}</Badge>
            <Badge variant="outline" className="text-xs">মডিউল {module.order}</Badge>
          </div>
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{module.subjects.length} বিষয়</span>
            <span className="flex items-center gap-1"><Play className="h-3.5 w-3.5" />{allLessons.length} পাঠ</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{Math.round(totalMinutes / 60)} ঘন্টা</span>
          </div>
        </div>
        <Link href={`/catalog/classes/${cls.slug}`}>
          <Button variant="outline" size="sm" className="shrink-0">
            <ChevronLeft className="h-4 w-4 mr-1" />
            কোর্সে ফিরুন
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subject list */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">বিষয়বস্তু</h2>
            <p className="text-sm text-muted-foreground">
              {module.subjects.length} বিষয় · {allLessons.length} পাঠ · {completed} সম্পন্ন
            </p>
          </div>

          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
            {module.subjects.map(subject => {
              const isOpen = expandedSubjects.includes(subject.id)
              return (
                <div key={subject.id}>
                  <button
                    onClick={() => toggle(subject.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {isOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
                      <div>
                        <p className="font-semibold text-sm">{subject.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {subject.completedLessons}/{subject.lessonCount} পাঠ
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={subject.lessonCount > 0 ? (subject.completedLessons / subject.lessonCount) * 100 : 0}
                      className="w-24 h-1.5"
                    />
                  </button>

                  {isOpen && (
                    <div className="bg-muted/20 pb-2">
                      {subject.lessons.map(lesson => {
                        const accessible = canAccess || lesson.isFree
                        return (
                          <div
                            key={lesson.id}
                            className={cn(
                              "flex items-center gap-3 px-10 py-2 text-sm",
                              accessible ? "hover:bg-muted/50" : "opacity-60"
                            )}
                          >
                            {lesson.completed
                              ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                              : !accessible
                              ? <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              : <LessonTypeIcon type={lesson.type} />}
                            {accessible
                              ? <Link href={`/learn/${lesson.id}`} className="flex-1 hover:text-primary transition-colors line-clamp-1">
                                  {lesson.title}
                                </Link>
                              : <span className="flex-1 line-clamp-1">{lesson.title}</span>}
                            <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}m</span>
                            {lesson.isFree && (
                              <Badge variant="outline" className="text-[10px] h-4 px-1">Free</Badge>
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
                <p className="font-semibold text-sm">অগ্রগতি</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{percent}% সম্পন্ন</span>
                    <span className="text-muted-foreground">{completed}/{allLessons.length}</span>
                  </div>
                  <Progress value={percent} className="h-2" />
                </div>
                {nextLesson && (
                  <Link href={`/learn/${nextLesson.id}`}>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      {completed > 0 ? "Continue" : "Start"}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {!canAccess && (
            <Card>
              <CardContent className="p-4 space-y-3">
                {cls.price > 0
                  ? <>
                    <p className="text-2xl font-bold">
                      ৳{cls.price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/মাস</span>
                    </p>
                    <Link href="/subscribe"><Button className="w-full">Subscribe Now</Button></Link>
                    {cls.entitlement === "preview" && (
                      <Button variant="outline" className="w-full">Free Preview</Button>
                    )}
                  </>
                  : <Button className="w-full">Enroll Free</Button>
                }
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">মডিউল বিবরণ</p>
              <Separator />
              {[
                ["কোর্স", cls.title],
                ["বিষয়", `${module.subjects.length}টি`],
                ["মোট পাঠ", `${allLessons.length}টি`],
                ["মোট সময়", `${Math.round(totalMinutes / 60)} ঘন্টা`],
              ].map(([k, v], i) => (
                <div key={k}>
                  {i > 0 && <Separator className="mb-2" />}
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-muted-foreground shrink-0">{k}</span>
                    <span className="font-medium text-right line-clamp-2">{v}</span>
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
