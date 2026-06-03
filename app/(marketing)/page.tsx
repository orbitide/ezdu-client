"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { classes } from "@/lib/mock/data"
import { BookOpen, PenTool, Trophy, Star, Zap, ArrowRight, Users, Video, CheckCircle2 } from "lucide-react"

const previewCourses = classes.filter(c => c.entitlement === "preview" || c.entitlement === "locked").slice(0, 3)

const features = [
  {
    icon: BookOpen,
    title: "Learn at Your Pace",
    description: "Video lectures, reading materials, and quizzes — all structured to match the SSC & HSC syllabus.",
    bg: "bg-blue-50 dark:bg-blue-950",
    color: "text-blue-600",
  },
  {
    icon: PenTool,
    title: "Practice & Mock Tests",
    description: "Hundreds of MCQ practice sets and full-length mock exams with instant feedback.",
    bg: "bg-orange-50 dark:bg-orange-950",
    color: "text-orange-500",
  },
  {
    icon: Trophy,
    title: "Earn Badges & XP",
    description: "Stay motivated with streaks, experience points, and achievement badges as you progress.",
    bg: "bg-purple-50 dark:bg-purple-950",
    color: "text-purple-500",
  },
]

const stats = [
  { icon: Users, value: "৫০,০০০+", label: "Active Students", color: "text-blue-600" },
  { icon: Video, value: "২০০+", label: "Video Lessons", color: "text-orange-500" },
  { icon: CheckCircle2, value: "৯৮%", label: "Success Rate", color: "text-green-600" },
]

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Zap className="h-3.5 w-3.5" />
          Bangladesh&apos;s #1 SSC &amp; HSC Platform
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          স্মার্টভাবে পড়াশোনা করুন,
          <br />
          <span className="text-primary">সাফল্য অর্জন করুন</span>
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Expert-led video classes, practice tests, and personalized learning paths — everything you need to ace your SSC &amp; HSC exams.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className={cn("h-5 w-5 mb-1", color)} />
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Everything you need to succeed</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, bg, color }) => (
              <div key={title} className="bg-background rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg mb-4", bg)}>
                  <Icon className={cn("h-5 w-5", color)} />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Popular Courses</h2>
          <Link href="/catalog" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1")}>
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewCourses.map(course => (
            <div key={course.id} className="group rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute top-2 left-2 rounded-md bg-background/90 px-2 py-0.5 text-xs font-medium">
                  {course.level}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                  <span className="font-medium text-foreground">{course.rating}</span>
                  <span>· {course.enrolledCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">৳{course.price.toLocaleString()}</span>
                  <Link href="/register" className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-foreground py-14 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">আজই শুরু করুন</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Join 50,000+ students already learning on Ezdu. Free courses available — no credit card required.
          </p>
          <Link href="/register" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "gap-2")}>
            Start Learning Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="h-3.5 w-3.5" />
            </div>
            Ezdu
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Ezdu. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
