"use client"

import { use, useState } from "react"
import { classes } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft, ChevronRight, CheckCircle2, Play, BookOpen,
  FileDown, ClipboardList, Lock, Download, Clock, Layers2,
  ArrowLeft, RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ContentItem, Topic, FlashCard, QuizQuestion } from "@/lib/mock/data"

// ─── TYPE META ────────────────────────────────────────────────────────────────

type ContentItemType = ContentItem["type"]

const TYPE_META: Record<ContentItemType, { icon: React.ElementType; colorClass: string; bg: string; label: string }> = {
  video:     { icon: Play,          colorClass: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-950",     label: "ভিডিও" },
  reading:   { icon: BookOpen,      colorClass: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950", label: "পাঠ্য" },
  file:      { icon: FileDown,      colorClass: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950", label: "ফাইল" },
  quiz:      { icon: ClipboardList, colorClass: "text-rose-500",   bg: "bg-rose-50 dark:bg-rose-950",     label: "কুইজ" },
  flashcard: { icon: Layers2,       colorClass: "text-teal-500",   bg: "bg-teal-50 dark:bg-teal-950",     label: "ফ্ল্যাশকার্ড" },
}

// ─── DATA HELPER ──────────────────────────────────────────────────────────────

function findContent(lessonId: string, contentId: string) {
  for (const cls of classes) {
    for (const mod of cls.modules) {
      for (const sub of mod.subjects) {
        const lesson = sub.lessons.find(l => l.id === lessonId)
        if (!lesson) continue
        const topics: Topic[] = lesson.topics ?? []
        const allContents = topics.flatMap(t => t.contents)
        const flatIdx = allContents.findIndex(c => c.id === contentId)
        if (flatIdx === -1) return null
        const currentTopic = topics.find(t => t.contents.some(c => c.id === contentId))!
        return {
          lesson,
          classTitle: cls.title,
          classSlug: cls.slug,
          subjectTitle: sub.title,
          topics,
          currentTopic,
          content: allContents[flatIdx],
          allContents,
          prevContent: flatIdx > 0 ? allContents[flatIdx - 1] : null,
          nextContent: flatIdx < allContents.length - 1 ? allContents[flatIdx + 1] : null,
          completedCount: allContents.filter(c => c.completed).length,
          totalCount: allContents.length,
        }
      }
    }
  }
  return null
}

// ─── CONTENT VIEWS ────────────────────────────────────────────────────────────

function VideoView({ content }: { content: ContentItem }) {
  return (
    <div className="bg-black aspect-video flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200)" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4 text-white">
        <button className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors">
          <Play className="h-7 w-7 ml-1" />
        </button>
        <div className="text-center">
          <p className="font-semibold text-lg">{content.title}</p>
          {content.duration && <p className="text-sm text-white/70">{content.duration} মিনিট</p>}
        </div>
      </div>
    </div>
  )
}

function ReadingView({ content }: { content: ContentItem }) {
  const paragraphs = content.body ? content.body.split("\n\n") : []
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 lg:p-10">
        <div className="max-w-2xl space-y-5">
          {content.duration && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> পড়ার সময়: ~{content.duration} মিনিট
            </p>
          )}
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-7 text-foreground">{p}</p>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">পাঠ্যবস্তু শীঘ্রই যুক্ত হবে।</p>
          )}
        </div>
      </div>
    </div>
  )
}

function FileView({ content }: { content: ContentItem }) {
  const hasUrl = Boolean(content.fileUrl && content.fileUrl !== "#")
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background shrink-0 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-7 w-7 rounded-md bg-orange-50 dark:bg-orange-950 flex items-center justify-center shrink-0">
            <FileDown className="h-3.5 w-3.5 text-orange-500" />
          </div>
          <span className="text-sm font-medium truncate">{content.fileName ?? content.title}</span>
          {content.fileSize && (
            <span className="text-xs text-muted-foreground shrink-0">{content.fileSize}</span>
          )}
        </div>
        <a
          href={content.fileUrl ?? "#"}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5 shrink-0")}
        >
          <Download className="h-4 w-4" />
          ডাউনলোড
        </a>
      </div>
      {/* Inline viewer */}
      {hasUrl ? (
        <iframe
          src={content.fileUrl}
          title={content.title}
          className="flex-1 w-full min-h-0 border-0"
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-muted/20">
          <div className="h-16 w-16 rounded-2xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
            <FileDown className="h-8 w-8 text-orange-400" />
          </div>
          <p className="text-sm font-medium">{content.fileName ?? content.title}</p>
          <p className="text-xs text-muted-foreground">প্রিভিউ উপলব্ধ নেই — ফাইলটি ডাউনলোড করে দেখুন</p>
          <a
            href={content.fileUrl ?? "#"}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "gap-2 mt-1")}
          >
            <Download className="h-4 w-4" />
            ডাউনলোড করুন
          </a>
        </div>
      )}
    </div>
  )
}

function FlashcardView({ content }: { content: ContentItem }) {
  const cards: FlashCard[] = content.cards ?? []
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (cards.length === 0) {
    return (
      <div className="p-6 lg:p-10 text-sm text-muted-foreground italic">
        ফ্ল্যাশকার্ড শীঘ্রই যুক্ত হবে।
      </div>
    )
  }

  const card = cards[idx]

  function goNext() { setIdx(i => Math.min(i + 1, cards.length - 1)); setFlipped(false) }
  function goPrev() { setIdx(i => Math.max(i - 1, 0)); setFlipped(false) }

  return (
    <div className="p-6 lg:p-10 flex flex-col items-center gap-6">
      {/* Card counter */}
      <p className="text-sm text-muted-foreground">{idx + 1} / {cards.length}</p>

      {/* Flip card */}
      <button
        onClick={() => setFlipped(f => !f)}
        className="w-full max-w-lg min-h-48 rounded-2xl border-2 border-border bg-card shadow-sm flex flex-col items-center justify-center gap-3 p-8 text-center transition-all hover:shadow-md hover:border-primary/40 cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          {flipped ? "উত্তর" : "প্রশ্ন"}
        </span>
        <p className={cn("text-lg font-semibold leading-relaxed transition-all", flipped && "text-primary")}>
          {flipped ? card.back : card.front}
        </p>
        <span className="text-xs text-muted-foreground mt-2">
          {flipped ? "প্রশ্ন দেখতে ক্লিক করুন" : "উত্তর দেখতে ক্লিক করুন"}
        </span>
      </button>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={goPrev} disabled={idx === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { setIdx(0); setFlipped(false) }} className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> রিসেট
        </Button>
        <Button variant="outline" size="sm" onClick={goNext} disabled={idx === cards.length - 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setFlipped(false) }}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === idx ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function QuizView({ content }: { content: ContentItem }) {
  const questions: QuizQuestion[] = content.questions ?? []
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="p-6 lg:p-10 text-sm text-muted-foreground italic">
        কুইজ প্রশ্ন শীঘ্রই যুক্ত হবে। ({content.questionCount} টি প্রশ্ন)
      </div>
    )
  }

  const score = submitted
    ? questions.filter(q => answers[q.id] === q.correctOptionId).length
    : 0

  function handleSelect(questionId: string, optionId: string) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  function handleSubmit() { setSubmitted(true) }
  function handleRetry() { setAnswers({}); setSubmitted(false) }

  return (
    <div className="p-6 lg:p-10 space-y-6 max-w-2xl">
      {submitted && (
        <div className={cn(
          "rounded-xl p-4 flex items-center justify-between gap-4 border",
          score === questions.length
            ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
            : "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
        )}>
          <div>
            <p className="font-semibold text-sm">
              {score === questions.length ? "অসাধারণ! সব সঠিক।" : `${score}/${questions.length} সঠিক উত্তর`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {Math.round((score / questions.length) * 100)}% স্কোর
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry} className="gap-1.5 shrink-0">
            <RotateCcw className="h-3.5 w-3.5" /> আবার চেষ্টা
          </Button>
        </div>
      )}

      {questions.map((q, i) => {
        const selected = answers[q.id]
        const isCorrect = selected === q.correctOptionId
        return (
          <div key={q.id} className="space-y-3">
            <p className="text-sm font-semibold leading-relaxed">
              <span className="text-muted-foreground mr-2">{i + 1}.</span>
              {q.text}
            </p>
            <div className="space-y-2">
              {q.options.map(opt => {
                const isSelected = selected === opt.id
                const isRight = opt.id === q.correctOptionId
                let cls = "flex items-center gap-3 border rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors"
                if (!submitted) {
                  cls += isSelected ? " border-primary bg-primary/5 font-medium" : " border-border hover:bg-muted/40"
                } else {
                  if (isRight) cls += " border-green-400 bg-green-50 dark:bg-green-950 font-medium text-green-700 dark:text-green-300"
                  else if (isSelected && !isRight) cls += " border-rose-400 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                  else cls += " border-border text-muted-foreground"
                }
                return (
                  <div key={opt.id} className={cls} onClick={() => handleSelect(q.id, opt.id)}>
                    <span className={cn(
                      "h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center text-[10px] font-bold",
                      !submitted && isSelected ? "border-primary bg-primary text-primary-foreground" :
                      submitted && isRight ? "border-green-500 bg-green-500 text-white" :
                      submitted && isSelected ? "border-rose-400 bg-rose-400 text-white" :
                      "border-muted-foreground/40"
                    )}>
                      {submitted && isRight && <CheckCircle2 className="h-3 w-3" />}
                    </span>
                    {opt.text}
                  </div>
                )
              })}
            </div>
            {submitted && q.explanation && (
              <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 leading-relaxed border border-border">
                <span className="font-semibold">ব্যাখ্যা:</span> {q.explanation}
              </div>
            )}
          </div>
        )
      })}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full sm:w-auto"
        >
          জমা দিন ({Object.keys(answers).length}/{questions.length} উত্তর দেওয়া হয়েছে)
        </Button>
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LecturePage({
  params,
}: {
  params: Promise<{ lessonId: string; contentId: string }>
}) {
  const { lessonId, contentId } = use(params)
  const [marked, setMarked] = useState(false)

  const data = findContent(lessonId, contentId)
  if (!data) notFound()

  const { lesson, classTitle, classSlug, subjectTitle, topics, content, prevContent, nextContent, completedCount, totalCount } = data

  const { label: typeLabel } = TYPE_META[content.type]
  const isVideo = content.type === "video"

  return (
    <div className="flex flex-col lg:flex-row gap-0 -mx-4 sm:-mx-6 -mt-6">
      {/* ── Left sidebar ──────────────────────────────────────────── */}
      <div className="hidden lg:block w-72 shrink-0 border-r border-border">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <Link href={`/learn/${lessonId}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2 leading-snug block">
              {lesson.title}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">{completedCount}/{totalCount} সম্পন্ন</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-3">
              {topics.map((topic, ti) => (
                <div key={topic.id}>
                  <p className="px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {ti + 1}. {topic.title}
                  </p>
                  <div className="space-y-0.5">
                    {topic.contents.map(item => {
                      const { icon: Icon, colorClass } = TYPE_META[item.type]
                      const isCurrent = item.id === contentId
                      return (
                        <Link key={item.id} href={`/learn/${lessonId}/${item.id}`}>
                          <div className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors",
                            isCurrent ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          )}>
                            {item.completed
                              ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                              : !item.isFree
                              ? <Lock className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                              : <Icon className={cn("h-3.5 w-3.5 shrink-0", isCurrent ? "text-primary" : colorClass)} />
                            }
                            <span className="flex-1 line-clamp-2 leading-snug">{item.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Video renders edge-to-edge; other types get padding inside their view */}
        {isVideo && <VideoView content={content} />}

        {/* Controls bar */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-3 border-b border-border bg-background shrink-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/learn/${lessonId}`}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 text-muted-foreground")}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> পাঠে ফিরুন
            </Link>
            {prevContent && (
              <Link
                href={`/learn/${lessonId}/${prevContent.id}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1")}
              >
                <ChevronLeft className="h-4 w-4" /> আগের
              </Link>
            )}
          </div>
          <Button
            variant={marked || content.completed ? "default" : "outline"}
            size="sm"
            onClick={() => setMarked(m => !m)}
            className="gap-1.5 shrink-0"
          >
            <CheckCircle2 className="h-4 w-4" />
            {marked || content.completed ? "সম্পন্ন ✓" : "সম্পন্ন করুন"}
          </Button>
          {nextContent ? (
            <Link
              href={`/learn/${lessonId}/${nextContent.id}`}
              className={cn(buttonVariants({ size: "sm" }), "gap-1")}
            >
              পরের <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/learn/${lessonId}`}
              className={cn(buttonVariants({ size: "sm" }), "gap-1")}
            >
              পাঠ শেষ <CheckCircle2 className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Title & meta (shown below video; above content for reading/file/quiz/flashcard) */}
        <div className="px-4 py-4 lg:px-6 border-b border-border">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap mb-2">
            <Link href={`/catalog/classes/${classSlug}`} className="hover:text-foreground transition-colors truncate max-w-[150px]">{classTitle}</Link>
            <ChevronLeft className="h-3 w-3 rotate-180 shrink-0" />
            <Link href={`/learn/${lessonId}`} className="hover:text-foreground transition-colors truncate max-w-[150px]">{lesson.title}</Link>
          </nav>
          <h1 className="text-base font-bold leading-snug">{content.title}</h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge variant="outline" className="text-[10px] h-5 px-1.5">
              {typeLabel}
            </Badge>
            {content.duration && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {content.duration}m
              </span>
            )}
            {content.type === "quiz" && content.questionCount && (
              <span className="text-xs text-muted-foreground">{content.questionCount}টি প্রশ্ন</span>
            )}
            {content.type === "flashcard" && content.cards && (
              <span className="text-xs text-muted-foreground">{content.cards.length}টি কার্ড</span>
            )}
          </div>
        </div>

        {/* Type-specific content */}
        <div className="flex-1 min-h-0 flex flex-col">
          {content.type === "reading" && <ReadingView content={content} />}
          {content.type === "file" && <FileView content={content} />}
          {(content.type === "flashcard" || content.type === "quiz") && (
            <div className="flex-1 overflow-auto">
              {content.type === "flashcard" && <FlashcardView content={content} />}
              {content.type === "quiz"      && <QuizView content={content} />}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
