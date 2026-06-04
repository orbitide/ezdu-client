"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { classes } from "@/lib/mock/data"
import { Star, ArrowRight, Users, Video, Flame, Layers, Search, BarChart2, GraduationCap, PenTool } from "lucide-react"
import { motion } from "framer-motion"
import { StarField } from "@/components/landing/StarField"
import { AppMockup } from "@/components/landing/AppMockup"
import { Footer } from "@/components/landing/Footer"

const previewCourses = classes.filter(c => c.entitlement === "preview" || c.entitlement === "locked").slice(0, 6)

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
}


const stats = [
  { icon: Users, value: "৫০,০০০+", label: "সক্রিয় শিক্ষার্থী", color: "text-primary" },
  { icon: Video, value: "২০০+",    label: "ভিডিও পাঠ",        color: "text-orange-400" },
  { icon: Flame, value: "৯৮%",     label: "সাফল্যের হার",     color: "text-emerald-400" },
]

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <StarField />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-48 text-center">

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1] text-white"
          >
            সেরা প্রস্তুতি, সেরা ফলাফল।
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ভিডিও ক্লাস, মক টেস্ট ও শিক্ষা পরিকল্পনা — SSC ও HSC সাফল্যের জন্য সব এক জায়গায়।
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          >
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 shadow-lg shadow-primary/30 px-8")}
            >
              বিনামূল্যে শুরু করুন <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 h-11 rounded-lg text-sm font-medium border border-white/20 text-white/80 hover:text-white hover:bg-white/8 transition-colors"
            >
              লগইন করুন
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="inline-flex items-center gap-8 sm:gap-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-5"
          >
            {stats.map(({ icon: Icon, value, label, color }, i) => (
              <div key={label} className={cn("flex flex-col items-center gap-1", i > 0 && "border-l border-white/12 pl-8 sm:pl-12")}>
                <Icon className={cn("h-4 w-4 mb-0.5", color)} />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">{value}</span>
                <span className="text-xs text-white/50 whitespace-nowrap">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── App Preview ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-white/50 text-lg max-w-xl mx-auto mb-10"
          >
            শিক্ষার্থীরা আসলে কীভাবে শেখে, সেটা মাথায় রেখে তৈরি — শুধু কন্টেন্টের স্তূপ নয়।
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
          >
            <AppMockup />
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
              কীভাবে কাজ করে?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              মাত্র কয়েকটি ধাপে শুরু করো — প্রথম দিন থেকে ফলাফল পর্যন্ত।
            </p>
          </motion.div>

          <div className="relative grid sm:grid-cols-4 gap-8">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-white/15 pointer-events-none" />

            {[
              { step: "১", icon: Search,      title: "কোর্স বেছে নাও",    desc: "ক্যাটালগ ব্রাউজ করো এবং তোমার ক্লাস ও লক্ষ্য অনুযায়ী কোর্সে ভর্তি হও।" },
              { step: "২", icon: Video,       title: "ভিডিও দেখো",        desc: "বিশেষজ্ঞ শিক্ষকদের ভিডিও ক্লাস — যখন খুশি, যতবার দরকার দেখো।" },
              { step: "৩", icon: PenTool,     title: "অনুশীলন করো",       desc: "MCQ সেট ও টপিক-ওয়াইজ প্র্যাকটিস দিয়ে দক্ষতা যাচাই করো।" },
              { step: "৪", icon: BarChart2,   title: "ফলাফল দেখো",        desc: "মক টেস্ট দাও, স্কোর বিশ্লেষণ করো এবং পরীক্ষার জন্য তৈরি হও।" },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center text-center gap-3 relative"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {step}
                  </span>
                  <Icon className="h-6 w-6 text-white/60" />
                </div>
                <h3 className="font-semibold text-white text-sm">{title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
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
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-white">জনপ্রিয় কোর্সসমূহ</h2>
              <p className="text-white/50">বিশেষজ্ঞ শিক্ষকদের তত্ত্বাবধানে তৈরি কোর্স।</p>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors shrink-0"
            >
              সব দেখুন <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewCourses.map((course, i) => (
              <motion.div
                key={course.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="group rounded-2xl ring-1 ring-white/10 overflow-hidden bg-white/4 hover:bg-white/6 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Module-style header — not a video */}
                <div className="flex flex-col justify-between gap-6 px-5 pt-5 pb-4 bg-gradient-to-br from-white/8 to-transparent border-b border-white/8">
                  <span className="self-start rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/75 border border-white/12">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-white/45">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3 w-3" />
                      {course.subjectCount}টি বিষয়
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Video className="h-3 w-3" />
                      {course.lessonCount}+ পাঠ
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 text-white">{course.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
                    <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                    <span className="font-semibold text-white/80">{course.rating}</span>
                    <span>·</span>
                    <span>{course.enrolledCount.toLocaleString()} জন শিক্ষার্থী</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <Link
                      href="/register"
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
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

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
              শিক্ষার্থীরা কী বলছে
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              হাজারো শিক্ষার্থী Ezdu-তে পড়ে তাদের লক্ষ্য পূরণ করেছে।
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                name: "তানভীর আহমেদ",
                level: "SSC 2025",
                result: "GPA ৫.০০",
                quote: "Ezdu-তে ভিডিও ক্লাস আর মক টেস্টের কারণে পদার্থবিজ্ঞানে আমার ভয় চলে গেছে। প্রতিটা টপিক এত সহজভাবে বোঝানো হয়েছে!",
                stars: 5,
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                name: "ফারহানা ইসলাম",
                level: "HSC 2025",
                result: "মেডিকেল ভর্তি",
                quote: "মক টেস্টে বারবার অনুশীলন করে আমি MBBS-এ চান্স পেয়েছি। Ezdu-র প্রশ্নব্যাংক আসল পরীক্ষার মতোই কঠিন ছিল।",
                stars: 5,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                name: "রাফি হোসেন",
                level: "BUET প্রস্তুতি",
                result: "BUET ভর্তি",
                quote: "গণিত আর পদার্থবিজ্ঞানের জন্য Ezdu-র কন্টেন্ট অতুলনীয়। XP সিস্টেম প্রতিদিন পড়তে অনুপ্রেরণা দেয়।",
                stars: 5,
                color: "text-violet-400",
                bg: "bg-violet-500/10",
              },
            ].map(({ name, level, result, quote, stars, color, bg }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/4 flex flex-col gap-4 hover:bg-white/6 transition-all duration-300"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-white/65 leading-relaxed flex-1">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", bg)}>
                    <GraduationCap className={cn("h-4 w-4", color)} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-white/45">
                      <span>{level}</span>
                      <span>·</span>
                      <span className={cn("font-medium", color)}>{result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 mx-4 sm:mx-6 mb-12 rounded-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ background: "linear-gradient(135deg, oklch(0.45 0.19 160), oklch(0.35 0.16 175))" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] rounded-3xl"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">আজই শুরু করো</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            ৫০,০০০+ শিক্ষার্থী ইতোমধ্যে Ezdu-তে শিখছে। বিনামূল্যে কোর্স আছে — কোনো কার্ড লাগবে না।
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 h-11 rounded-lg text-sm font-medium bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 transition-colors"
          >
            বিনামূল্যে শুরু করুন <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <Footer />
    </>
  )
}
