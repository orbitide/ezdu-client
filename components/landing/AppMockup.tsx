"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  Play, CheckCircle2, Lock, BookOpen, Video, PenTool,
  ClipboardList, StickyNote, ChevronRight, Clock,
  Bold, List, Save, Circle,
} from "lucide-react"

const TABS = [
  { id: "classes",  label: "ক্লাস",        icon: BookOpen },
  { id: "lecture",  label: "লেকচার",       icon: Video },
  { id: "practice", label: "অনুশীলন",      icon: PenTool },
  { id: "mock",     label: "মক টেস্ট",     icon: ClipboardList },
  { id: "notes",    label: "নোটস",         icon: StickyNote },
] as const

type TabId = (typeof TABS)[number]["id"]

/* ── Classes screen ───────────────────────────────────────────────────── */
function ClassesScreen() {
  const modules = [
    { title: "পদার্থবিজ্ঞান — অধ্যায় ১", chapters: 8, done: 6, locked: false },
    { title: "রসায়ন — পরমাণু গঠন",       chapters: 7, done: 3, locked: false },
    { title: "জীববিজ্ঞান — কোষ বিভাজন",  chapters: 6, done: 0, locked: false },
    { title: "গণিত — ত্রিকোণমিতি",        chapters: 5, done: 0, locked: true },
    { title: "ইংরেজি — Grammar & Writing", chapters: 9, done: 0, locked: true },
  ]
  return (
    <div className="flex flex-col gap-1.5">
      {modules.map((m) => {
        const pct = m.chapters ? Math.round((m.done / m.chapters) * 100) : 0
        return (
          <div
            key={m.title}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs",
              m.locked ? "opacity-50" : "bg-white/5 hover:bg-white/8",
            )}
          >
            <div className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
              m.locked ? "bg-white/8" : "bg-primary/20",
            )}>
              {m.locked
                ? <Lock className="h-3 w-3 text-white/40" />
                : <BookOpen className="h-3 w-3 text-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white/85 truncate">{m.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-white/40 shrink-0">{m.done}/{m.chapters}</span>
              </div>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/25 shrink-0" />
          </div>
        )
      })}
    </div>
  )
}

/* ── Lecture screen ───────────────────────────────────────────────────── */
function LectureScreen() {
  return (
    <div className="flex gap-3 h-full">
      {/* Video player */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="relative rounded-xl overflow-hidden bg-black/60 aspect-video flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Play className="h-5 w-5 text-white fill-white ml-0.5" />
            </div>
            <span className="text-[10px] text-white/60">পদার্থবিজ্ঞান — আলোর প্রতিফলন</span>
          </div>
          {/* Scrubber */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
            <div className="h-0.5 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-[38%] bg-primary rounded-full" />
            </div>
            <div className="flex justify-between mt-1 text-[9px] text-white/40">
              <span>14:32</span><span>38:10</span>
            </div>
          </div>
        </div>
        <div className="text-[10px] font-medium text-white/70">আলোর প্রতিফলন ও প্রতিসরণ — পাঠ ৩</div>
        <div className="text-[9px] text-white/40">শিক্ষক: ড. রাহাত হোসেন · ৩৮ মিনিট</div>
      </div>
      {/* Chapter list */}
      <div className="w-28 flex flex-col gap-1 shrink-0">
        <div className="text-[9px] font-semibold text-white/40 uppercase tracking-wide mb-1">অধ্যায়সমূহ</div>
        {[
          { n: 1, t: "আলোর ধর্ম",      done: true },
          { n: 2, t: "প্রতিফলনের সূত্র", done: true },
          { n: 3, t: "প্রতিসরণ",        done: false, active: true },
          { n: 4, t: "লেন্স ও দর্পণ",  done: false },
          { n: 5, t: "চোখ ও ক্যামেরা", done: false },
        ].map((ch) => (
          <div
            key={ch.n}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[9px]",
              ch.active ? "bg-primary/20 text-primary" : "text-white/50 hover:bg-white/5",
            )}
          >
            {ch.done
              ? <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-primary" />
              : <Circle className={cn("h-2.5 w-2.5 shrink-0", ch.active ? "text-primary" : "text-white/20")} />}
            <span className="truncate">{ch.n}. {ch.t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Practice screen ──────────────────────────────────────────────────── */
function PracticeScreen() {
  const [selected, setSelected] = useState<number | null>(null)
  const options = [
    "আলোর তরঙ্গদৈর্ঘ্য বাড়লে বেগ বাড়ে",
    "আলোর তরঙ্গদৈর্ঘ্য মাধ্যমের উপর নির্ভর করে",
    "শূন্যস্থানে আলোর বেগ ধ্রুবক ও মাধ্যমে পরিবর্তিত হয়",
    "আলোর কম্পাঙ্ক মাধ্যমভেদে পরিবর্তিত হয়",
  ]
  const correct = 2
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-white/40">পদার্থবিজ্ঞান · প্রশ্ন ৭ / ২০</span>
        <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-semibold text-primary">
          +১০ XP
        </span>
      </div>
      <p className="text-xs text-white/85 leading-relaxed">
        আলোর বেগ সম্পর্কে নিচের কোন তথ্যটি সঠিক?
      </p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[10px] ring-1 transition-all",
              selected === null
                ? "ring-white/10 text-white/65 hover:ring-primary/40 hover:bg-primary/10 hover:text-white/85"
                : selected === i && i === correct
                  ? "ring-primary bg-primary/15 text-primary"
                  : selected === i
                    ? "ring-red-500/50 bg-red-500/10 text-red-400"
                    : i === correct && selected !== null
                      ? "ring-primary/40 bg-primary/8 text-primary/70"
                      : "ring-white/8 text-white/40",
            )}
          >
            <span className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ring-1",
              selected === i && i === correct ? "ring-primary text-primary" :
              selected === i ? "ring-red-400 text-red-400" :
              "ring-white/20 text-white/40",
            )}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Mock Test screen ─────────────────────────────────────────────────── */
function MockScreen() {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2.5 py-1 text-[10px] font-semibold text-orange-400">
          <Clock className="h-3 w-3" /> ৩৮:২২ বাকি
        </div>
        <span className="text-[9px] text-white/40">প্রশ্ন ১২ / ৪০</span>
      </div>
      {/* Progress dots */}
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-3.5 w-3.5 rounded-sm text-[7px] flex items-center justify-center font-bold",
              i < 11 ? "bg-primary/30 text-primary" :
              i === 11 ? "bg-primary text-white" :
              "bg-white/8 text-white/20",
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {/* Question */}
      <p className="text-xs text-white/85 leading-relaxed">
        একটি পাত্রে ৩০০ mL পানিতে ৬০ g NaCl দ্রবীভূত করলে দ্রবণের ঘনমাত্রা কত?
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {["০.২ mol/L", "০.৩৪ mol/L", "১.০২ mol/L", "২.০৪ mol/L"].map((opt, i) => (
          <button
            key={i}
            className={cn(
              "rounded-xl px-3 py-2 text-[10px] ring-1 text-left transition-all",
              i === 2
                ? "ring-primary bg-primary/15 text-primary font-medium"
                : "ring-white/10 text-white/55 hover:ring-white/20",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Notes screen ─────────────────────────────────────────────────────── */
function NotesScreen() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 rounded-xl bg-white/5 px-2 py-1.5">
        <button className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors">
          <Bold className="h-3 w-3" />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors">
          <List className="h-3 w-3" />
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1 rounded-lg bg-primary/20 px-2 py-1 text-[9px] font-medium text-primary hover:bg-primary/30 transition-colors">
          <Save className="h-2.5 w-2.5" /> সংরক্ষণ
        </button>
      </div>
      {/* Note content */}
      <div className="flex-1 rounded-xl bg-white/4 ring-1 ring-white/8 p-3 text-[10px] leading-relaxed text-white/70 font-mono space-y-1">
        <p className="font-semibold text-white/85 not-italic">📌 আলোর প্রতিসরণ — গুরুত্বপূর্ণ সূত্র</p>
        <p className="text-white/50">─────────────────────</p>
        <p>• স্নেলের সূত্র: n₁ sin θ₁ = n₂ sin θ₂</p>
        <p>• কাচের প্রতিসরণ সূচক ≈ ১.৫</p>
        <p>• সংকট কোণে সম্পূর্ণ অভ্যন্তরীণ প্রতিফলন ঘটে</p>
        <p className="text-primary/70">→ অপটিক্যাল ফাইবার এই নীতিতে কাজ করে।</p>
        <p className="text-white/30 mt-2 text-[9px]">শেষ সম্পাদনা: আজ, ১১:৪৫ AM</p>
      </div>
    </div>
  )
}

const SCREENS: Record<TabId, React.ReactNode> = {
  classes:  <ClassesScreen />,
  lecture:  <LectureScreen />,
  practice: <PracticeScreen />,
  mock:     <MockScreen />,
  notes:    <NotesScreen />,
}

export function AppMockup() {
  const [active, setActive] = useState<TabId>("classes")

  useEffect(() => {
    const ids = TABS.map((t) => t.id)
    const timer = setInterval(() => {
      setActive((cur) => {
        const idx = ids.indexOf(cur)
        return ids[(idx + 1) % ids.length]
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    /* Laptop frame */
    <div className="mx-auto w-full max-w-3xl">
      {/* Screen */}
      <div className="rounded-t-2xl ring-2 ring-white/10 bg-[oklch(0.10_0.012_160)] overflow-hidden shadow-2xl shadow-black/60">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-3 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-3 flex items-center justify-center h-5 rounded-md bg-white/6 ring-1 ring-white/8 text-[9px] text-white/35">
            app.ezdu.io/student/dashboard
          </div>
        </div>
        {/* App shell — fixed height so tab switches never resize the frame */}
        <div className="flex" style={{ height: 320 }}>
          {/* Sidebar */}
          <div className="hidden sm:flex flex-col gap-1 w-32 border-r border-white/8 bg-white/2 p-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-2 mb-1">
              <div className="h-5 w-5 rounded-md bg-primary/30 flex items-center justify-center">
                <span className="text-[7px] font-bold text-primary">E</span>
              </div>
              <span className="text-[10px] font-bold text-white/70">Ezdu</span>
            </div>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-left transition-all",
                  active === id
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-white/45 hover:bg-white/5 hover:text-white/70",
                )}
              >
                <Icon className="h-3 w-3 shrink-0" />
                {label}
              </button>
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Mobile tabs */}
            <div className="flex sm:hidden gap-1 mb-3 overflow-x-auto pb-1">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-[9px] font-medium transition-all",
                    active === id
                      ? "bg-primary/25 text-primary"
                      : "text-white/45 hover:text-white/65",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {SCREENS[active]}
          </div>
        </div>
        {/* Tab indicator bar */}
        <div className="flex border-t border-white/8 bg-white/2">
          {TABS.map(({ id }) => (
            <div
              key={id}
              className={cn(
                "flex-1 h-0.5 transition-all duration-500",
                active === id ? "bg-primary" : "bg-transparent",
              )}
            />
          ))}
        </div>
      </div>
      {/* Laptop chin */}
      <div className="h-4 rounded-b-xl bg-gradient-to-b from-white/6 to-white/3 ring-1 ring-white/8 ring-t-0" />
      {/* Stand */}
      <div className="mx-auto h-2 w-16 bg-white/8 rounded-b-lg" />
      <div className="mx-auto h-1 w-24 bg-white/5 rounded-full" />
    </div>
  )
}
