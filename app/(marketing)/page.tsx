"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { classes } from "@/lib/mock/data"
import { BookOpen, PenTool, Trophy, Star, Zap, ArrowRight, Users, Video, CheckCircle2, Flame, Play } from "lucide-react"
import { motion } from "framer-motion"

const previewCourses = classes.filter(c => c.entitlement === "preview" || c.entitlement === "locked").slice(0, 6)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const features = [
  {
    icon: BookOpen,
    title: "নিজের গতিতে শেখো",
    description: "বিশেষজ্ঞ শিক্ষকদের ভিডিও ক্লাস ও পাঠ্যসামগ্রী — SSC ও HSC সিলেবাস অনুযায়ী সাজানো। যখন খুশি দেখো, যতবার দরকার দেখো।",
    bg: "bg-blue-50 dark:bg-blue-950/50",
    color: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-100 dark:ring-blue-900",
  },
  {
    icon: PenTool,
    title: "অনুশীলন ও মক টেস্ট",
    description: "শত শত MCQ সেট এবং পূর্ণাঙ্গ মক পরীক্ষা — তাৎক্ষণিক ফলাফল ও বিষয়ভিত্তিক বিশ্লেষণসহ।",
    bg: "bg-orange-50 dark:bg-orange-950/50",
    color: "text-orange-500 dark:text-orange-400",
    ring: "ring-orange-100 dark:ring-orange-900",
  },
  {
    icon: Trophy,
    title: "ব্যাজ ও XP অর্জন করো",
    description: "প্রতিদিনের streak, অভিজ্ঞতা পয়েন্ট ও অর্জনের ব্যাজ — প্রথম দিন থেকে পরীক্ষার দিন পর্যন্ত তোমাকে এগিয়ে রাখবে।",
    bg: "bg-violet-50 dark:bg-violet-950/50",
    color: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-100 dark:ring-violet-900",
  },
]

const stats = [
  { icon: Users, value: "৫০,০০০+", label: "সক্রিয় শিক্ষার্থী", color: "text-primary" },
  { icon: Video, value: "২০০+", label: "ভিডিও পাঠ", color: "text-orange-500" },
  { icon: Flame, value: "৯৮%", label: "সাফল্যের হার", color: "text-emerald-500" },
]

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.64 0.19 160 / 0.12), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(oklch(0 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0 0 0) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-20 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Zap className="h-3.5 w-3.5" />
              বাংলাদেশের #১ SSC ও HSC প্ল্যাটফর্ম
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[1.08]"
          >
            সেরা প্রস্তুতি নাও,
            <br />
            <span className="text-primary">সেরা ফলাফল পাও।</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            বিশেষজ্ঞ শিক্ষকদের ভিডিও ক্লাস, মক টেস্ট এবং ব্যক্তিগতকৃত শিক্ষা পরিকল্পনা —
            SSC ও HSC পরীক্ষায় সাফল্যের জন্য যা দরকার সব এখানে।
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          >
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 shadow-lg shadow-primary/25 px-8")}
            >
              বিনামূল্যে শুরু করুন <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8")}>
              লগইন করুন
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="inline-flex items-center gap-8 sm:gap-12 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm px-8 py-5 shadow-sm"
          >
            {stats.map(({ icon: Icon, value, label, color }, i) => (
              <div key={label} className={cn("flex flex-col items-center gap-1", i > 0 && "border-l border-border pl-8 sm:pl-12")}>
                <Icon className={cn("h-4 w-4 mb-0.5", color)} />
                <span className="text-xl sm:text-2xl font-bold tracking-tight">{value}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              সাফল্যের জন্য যা দরকার
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              শিক্ষার্থীরা আসলে কীভাবে শেখে, সেটা মাথায় রেখে তৈরি — শুধু কন্টেন্টের স্তূপ নয়।
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, bg, color, ring }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className={cn(
                  "group relative bg-card rounded-2xl p-7 ring-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
                  ring
                )}
              >
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl mb-5", bg)}>
                  <Icon className={cn("h-5 w-5", color)} />
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Preview ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">জনপ্রিয় কোর্সসমূহ</h2>
              <p className="text-muted-foreground">SSC, HSC ও ভর্তি পরীক্ষার কোর্স — বিশেষজ্ঞ শিক্ষকদের তত্ত্বাবধানে।</p>
            </div>
            <Link
              href="/catalog"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 shrink-0")}
            >
              সব দেখুন <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5">
            {previewCourses.map((course, i) => (
              <motion.div
                key={course.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="group rounded-2xl ring-1 ring-border overflow-hidden bg-card hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-lg bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                    <span className="font-semibold text-foreground">{course.rating}</span>
                    <span>·</span>
                    <span>{course.enrolledCount.toLocaleString()} জন শিক্ষার্থী</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">৳{course.price.toLocaleString()}</span>
                    <Link
                      href="/register"
                      className={cn(buttonVariants({ size: "sm", variant: "outline" }), "text-xs h-7")}
                    >
                      ভর্তি হও
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(135deg, oklch(0.58 0.19 160), oklch(0.50 0.18 180))",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            আজই শুরু করো
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            ৫০,০০০+ শিক্ষার্থী ইতোমধ্যে Ezdu-তে শিখছে। বিনামূল্যে কোর্স আছে — কোনো কার্ড লাগবে না।
          </p>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-primary hover:bg-white/90 gap-2 shadow-xl shadow-black/20 px-8"
            )}
          >
            বিনামূল্যে শুরু করুন <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <Zap className="h-3.5 w-3.5" />
            </div>
            Ezdu
          </div>
          <p className="text-xs text-muted-foreground">© ২০২৫ Ezdu। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </>
  )
}
