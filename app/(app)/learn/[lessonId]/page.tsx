"use client"

import { use } from "react"
import { classes } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight, Play, BookOpen, FileDown, ClipboardList,
  CheckCircle2, Lock, Clock, Layers, ListChecks, PlayCircle, Layers2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ContentItem, Topic } from "@/lib/mock/data"

function getAllLessons() {
  return classes.flatMap(c =>
    c.modules.flatMap(m =>
      m.subjects.flatMap(s =>
        s.lessons.map(l => ({
          ...l,
          classTitle: c.title,
          classSlug: c.slug,
          subjectTitle: s.title,
          siblingLessons: s.lessons,
        }))
      )
    )
  )
}

type ContentItemType = ContentItem["type"]

const TYPE_META: Record<ContentItemType, { icon: React.ElementType; colorClass: string; bg: string; label: string }> = {
  video:     { icon: Play,          colorClass: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-950",     label: "ভিডিও" },
  reading:   { icon: BookOpen,      colorClass: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950", label: "পাঠ্য" },
  file:      { icon: FileDown,      colorClass: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950", label: "ফাইল" },
  quiz:      { icon: ClipboardList, colorClass: "text-rose-500",   bg: "bg-rose-50 dark:bg-rose-950",     label: "কুইজ" },
  flashcard: { icon: Layers2,       colorClass: "text-teal-500",   bg: "bg-teal-50 dark:bg-teal-950",     label: "ফ্ল্যাশকার্ড" },
}

function TypeIconBox({ type }: { type: ContentItemType }) {
  const { icon: Icon, colorClass, bg } = TYPE_META[type]
  return (
    <div className={cn("h-7 w-7 rounded-md flex items-center justify-center shrink-0", bg)}>
      <Icon className={cn("h-3.5 w-3.5", colorClass)} />
    </div>
  )
}

function StatusBadge({ item }: { item: ContentItem }) {
  if (item.completed) {
    return (
      <Badge className="gap-1 text-[10px] h-5 px-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
        <CheckCircle2 className="h-2.5 w-2.5" /> সম্পন্ন
      </Badge>
    )
  }
  if (!item.isFree) {
    return (
      <Badge variant="outline" className="gap-1 text-[10px] h-5 px-1.5">
        <Lock className="h-2.5 w-2.5" /> লকড
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-[10px] h-5 px-1.5 text-blue-600 border-blue-200 dark:border-blue-800">
      উপলব্ধ
    </Badge>
  )
}

function itemMeta(item: ContentItem): string | null {
  if (item.type === "quiz" && item.questionCount) return `${item.questionCount}টি প্রশ্ন`
  if (item.duration) return `${item.duration}m`
  return null
}

export default function LessonDetailPage({
  params,
}: {
  params: Promise<{ lessonId: string }>
}) {
  const { lessonId } = use(params)
  const allLessons = getAllLessons()
  const lessonIndex = allLessons.findIndex(l => l.id === lessonId)
  if (lessonIndex === -1) notFound()

  const lesson = allLessons[lessonIndex]
  const siblingLessons = lesson.siblingLessons

  const topics: Topic[] = lesson.topics ?? []
  const allContents = topics.flatMap(t => t.contents)
  const totalContents = allContents.length
  const completedContents = allContents.filter(c => c.completed).length
  const totalMinutes = allContents.reduce((s, c) => s + (c.duration ?? 0), 0)
  const percent = totalContents > 0
    ? Math.round((completedContents / totalContents) * 100)
    : lesson.progress

  const firstIncomplete = allContents.find(c => !c.completed)
  const ctaHref = firstIncomplete
    ? `/learn/${lessonId}/${firstIncomplete.id}`
    : allContents.length > 0
    ? `/learn/${lessonId}/${allContents[0].id}`
    : "#"

  const hasTopics = topics.length > 0

  const ctaLabel =
    percent === 100 ? "আবার শুরু করুন" :
    percent > 0     ? "চালিয়ে যান" :
                      "শেখা শুরু করুন"

  const CtaIcon = percent === 100 ? CheckCircle2 : PlayCircle

  return (
    <div className="flex flex-col lg:flex-row gap-0 -mx-4 sm:-mx-6 -mt-6">
      {/* Main content */}
      <div className="flex-1 min-w-0 p-4 lg:p-8 space-y-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <Link href={`/catalog/classes/${lesson.classSlug}`} className="hover:text-foreground transition-colors truncate max-w-[180px]">
            {lesson.classTitle}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate max-w-[160px]">{lesson.subjectTitle}</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{lesson.title}</span>
        </nav>

        {/* Lesson header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold leading-tight">{lesson.title}</h1>
            {lesson.description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {hasTopics ? (
              <>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  {topics.length}টি টপিক
                </span>
                <span className="flex items-center gap-1.5">
                  <ListChecks className="h-3.5 w-3.5" />
                  {totalContents}টি কন্টেন্ট
                </span>
                {totalMinutes > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {totalMinutes} মিনিট
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  {percent}% সম্পন্ন
                </span>
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {lesson.duration} মিনিট
              </span>
            )}
          </div>

          {/* Progress + CTA */}
          {hasTopics && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{completedContents}/{totalContents} সম্পন্ন</span>
                  <span>{percent}%</span>
                </div>
                <Progress value={percent} className="h-2" />
              </div>
              <Link
                href={ctaHref}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "gap-2 w-full sm:w-auto",
                  percent === 100 && "bg-green-600 hover:bg-green-700"
                )}
              >
                <CtaIcon className="h-4 w-4" />
                {ctaLabel}
              </Link>
            </div>
          )}

          {!hasTopics && (
            <Link href="#" className={cn(buttonVariants({ size: "sm" }), "gap-2")}>
              <Play className="h-4 w-4" />
              পাঠ শুরু করুন
            </Link>
          )}
        </div>

        {/* Topics */}
        {hasTopics && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold">পাঠের বিষয়বস্তু</h2>
            <div className="space-y-3">
              {topics.map((topic, topicIdx) => {
                const topicDone = topic.contents.filter(c => c.completed).length
                return (
                  <div key={topic.id} className="border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                          {topicIdx + 1}
                        </span>
                        <span className="font-semibold text-sm">{topic.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">
                        {topicDone}/{topic.contents.length} সম্পন্ন
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {topic.contents.map(item => {
                        const meta = itemMeta(item)
                        return (
                          <Link
                            key={item.id}
                            href={`/learn/${lessonId}/${item.id}`}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors",
                              !item.isFree && !item.completed && "opacity-75"
                            )}
                          >
                            <TypeIconBox type={item.type} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm line-clamp-1 leading-snug">
                                {item.completed && (
                                  <CheckCircle2 className="inline h-3 w-3 text-green-500 mr-1 mb-0.5" />
                                )}
                                {!item.isFree && !item.completed && (
                                  <Lock className="inline h-3 w-3 text-muted-foreground mr-1 mb-0.5" />
                                )}
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {TYPE_META[item.type].label}
                                {meta && ` · ${meta}`}
                              </p>
                            </div>
                            <div className="shrink-0">
                              <StatusBadge item={item} />
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasTopics && (
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              এই পাঠের বিস্তারিত বিষয়বস্তু শীঘ্রই যুক্ত হবে।
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right sidebar */}
      <div className="hidden lg:block w-72 shrink-0 border-l border-border">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-sm truncate">{lesson.subjectTitle}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {siblingLessons.filter(l => l.completed).length}/{siblingLessons.length} পাঠ সম্পন্ন
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              {siblingLessons.map((sl, i) => (
                <Link key={sl.id} href={`/learn/${sl.id}`}>
                  <div className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs hover:bg-muted transition-colors",
                    sl.id === lessonId && "bg-primary/10 text-primary font-medium"
                  )}>
                    <span className="text-muted-foreground w-4 shrink-0 text-right">{i + 1}</span>
                    {sl.completed
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      : !sl.isFree
                      ? <Lock className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                      : <Play className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    }
                    <span className="flex-1 line-clamp-2 leading-snug">{sl.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
