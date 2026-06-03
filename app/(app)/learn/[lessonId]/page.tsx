"use client"

import { use, useState } from "react"
import { classes, discussions } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, CheckCircle2, Play, FileText, HelpCircle, ThumbsUp, MessageCircle, Lock, BookmarkPlus } from "lucide-react"
import { cn } from "@/lib/utils"

function getAllLessons() {
  return classes.flatMap(c => c.modules.flatMap(m => m.subjects.flatMap(s => s.lessons.map(l => ({ ...l, classTitle: c.title, classSlug: c.slug, subject: s.title })))))
}

export default function LearnPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const allLessons = getAllLessons()
  const lessonIndex = allLessons.findIndex(l => l.id === lessonId)
  if (lessonIndex === -1) notFound()

  const lesson = allLessons[lessonIndex]
  const prevLesson = allLessons[lessonIndex - 1]
  const nextLesson = allLessons[lessonIndex + 1]
  const subjectLessons = allLessons.filter(l => l.subject === lesson.subject)
  const relatedQa = discussions.filter(d => d.subject === lesson.subject).slice(0, 3)

  const [noteText, setNoteText] = useState("")
  const [savedNote, setSavedNote] = useState(false)
  const [marked, setMarked] = useState(lesson.completed)

  return (
    <div className="flex flex-col lg:flex-row gap-0 -mx-4 sm:-mx-6 -mt-6">
      <div className="flex-1 min-w-0">
        {/* Video */}
        <div className="bg-black aspect-video flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200)` }} />
          <div className="relative z-10 flex flex-col items-center gap-4 text-white">
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
              <Play className="h-7 w-7 ml-1" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">{lesson.title}</p>
              <p className="text-sm text-white/70">{lesson.duration} মিনিট</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-primary" style={{ width: `${lesson.progress}%` }} />
          </div>
        </div>

        {/* Controls */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-border bg-background">
          <div>
            {prevLesson && (
              <Link href={`/learn/${prevLesson.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                <ChevronLeft className="h-4 w-4 mr-1" /> আগের
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant={marked ? "default" : "outline"} size="sm" onClick={() => setMarked(!marked)} className="gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              {marked ? "সম্পন্ন ✓" : "সম্পন্ন করুন"}
            </Button>
            {nextLesson && (
              <Link href={`/learn/${nextLesson.id}`} className={cn(buttonVariants({ size: "sm" }))}>
                পরের <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Info + tabs */}
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Link href={`/catalog/classes/${lesson.classSlug}`} className="hover:text-foreground">{lesson.classTitle}</Link>
              <span>›</span><span>{lesson.subject}</span>
            </div>
            <h1 className="text-xl font-bold">{lesson.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline" className="text-xs gap-1">
                {lesson.type === "video" ? <Play className="h-3 w-3" /> : lesson.type === "reading" ? <FileText className="h-3 w-3" /> : <HelpCircle className="h-3 w-3" />}
                {lesson.type === "video" ? "ভিডিও" : lesson.type === "reading" ? "পড়া" : "কুইজ"}
              </Badge>
              <span className="text-xs text-muted-foreground">{lesson.duration} মিনিট</span>
              {lesson.isFree && <Badge variant="outline" className="text-xs">Free</Badge>}
            </div>
          </div>

          <Tabs defaultValue="chapters">
            <TabsList>
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>

            <TabsContent value="chapters" className="mt-4">
              <ScrollArea className="h-64">
                <div className="space-y-0.5">
                  {subjectLessons.map((sl, i) => (
                    <Link key={sl.id} href={`/learn/${sl.id}`}>
                      <div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors", sl.id === lessonId && "bg-muted font-medium")}>
                        <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}</span>
                        {sl.completed ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          : !sl.isFree ? <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                          : <Play className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <span className="flex-1 line-clamp-1">{sl.title}</span>
                        <span className="text-xs text-muted-foreground shrink-0">{sl.duration}m</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="notes" className="mt-4 space-y-3">
              <Textarea placeholder="এই পাঠের নোট লিখুন..." value={noteText} onChange={e => { setNoteText(e.target.value); setSavedNote(false) }} className="min-h-32" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{savedNote ? "✓ নোট সংরক্ষিত" : "নোট টাইপ করুন"}</p>
                <Button size="sm" onClick={() => setSavedNote(true)} disabled={!noteText.trim()}>
                  <BookmarkPlus className="h-4 w-4 mr-1.5" /> Save
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-4 space-y-3">
              {relatedQa.length === 0
                ? <p className="text-sm text-muted-foreground text-center py-8">এই বিষয়ে এখনও কোনো প্রশ্ন নেই।</p>
                : relatedQa.map(thread => (
                  <Link key={thread.id} href="/discussions">
                    <div className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors space-y-1.5">
                      <p className="text-sm font-medium line-clamp-2">{thread.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{thread.upvotes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{thread.replyCount}</span>
                        {thread.resolved && <Badge variant="outline" className="text-[10px] h-4 px-1 text-green-600 border-green-300">Resolved</Badge>}
                      </div>
                    </div>
                  </Link>
                ))}
              <Link href="/discussions">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" /> সব প্রশ্ন / নতুন প্রশ্ন
                </Button>
              </Link>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="hidden lg:block w-72 shrink-0 border-l border-border">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-sm">{lesson.subject}</p>
            <p className="text-xs text-muted-foreground">{subjectLessons.filter(l => l.completed).length}/{subjectLessons.length} সম্পন্ন</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              {subjectLessons.map((sl, i) => (
                <Link key={sl.id} href={`/learn/${sl.id}`}>
                  <div className={cn("flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs hover:bg-muted transition-colors", sl.id === lessonId && "bg-primary/10 text-primary font-medium")}>
                    <span className="text-muted-foreground w-4 shrink-0 text-right">{i + 1}</span>
                    {sl.completed ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      : !sl.isFree ? <Lock className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                      : <Play className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
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
