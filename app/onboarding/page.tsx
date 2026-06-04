"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { saveOnboarding, getOnboarding, getSession } from "@/lib/storage"
import { BookOpen, GraduationCap, Trophy, Globe, Briefcase, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const classOptions = [
  { value: "ssc" as const,      icon: BookOpen,       bg: "bg-blue-50 dark:bg-blue-950",     color: "text-blue-600",    label: "SSC",            desc: "মাধ্যমিক পরীক্ষার প্রস্তুতি" },
  { value: "hsc" as const,      icon: GraduationCap,  bg: "bg-green-50 dark:bg-green-950",   color: "text-green-600",   label: "HSC",            desc: "উচ্চমাধ্যমিক পরীক্ষার প্রস্তুতি" },
  { value: "olympiad" as const, icon: Trophy,         bg: "bg-yellow-50 dark:bg-yellow-950", color: "text-yellow-600",  label: "অলিম্পিয়াড",   desc: "গণিত ও বিজ্ঞান প্রতিযোগিতা" },
  { value: "ielts" as const,    icon: Globe,          bg: "bg-sky-50 dark:bg-sky-950",       color: "text-sky-600",     label: "IELTS",          desc: "Band 7+ কৌশল ও প্র্যাকটিস" },
  { value: "job" as const,      icon: Briefcase,      bg: "bg-orange-50 dark:bg-orange-950", color: "text-orange-500",  label: "জব প্রস্তুতি",  desc: "BCS, ব্যাংক ও সরকারি চাকরি" },
  { value: "skills" as const,   icon: Zap,            bg: "bg-purple-50 dark:bg-purple-950", color: "text-purple-600",  label: "দক্ষতা",        desc: "ফ্রিল্যান্সিং ও প্রযুক্তি" },
]

export default function OnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    if (!getSession()?.isLoggedIn) {
      router.replace("/login")
      return
    }
    if (getOnboarding()?.completed) {
      router.replace("/learn")
    }
  }, [router])

  function selectClass(value: typeof classOptions[number]["value"]) {
    saveOnboarding({ completed: true, preferredClass: value })
    router.push("/learn")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-xl mb-6">
            <img src="/logo.svg" alt="Ezdu" className="h-8 w-8 rounded-xl" />
            <span className="tracking-tight">Ezdu</span>
          </div>
          <h1 className="text-2xl font-bold">তোমার শ্রেণি বেছে নাও</h1>
          <p className="text-muted-foreground text-sm">তোমার লক্ষ্য অনুযায়ী কোর্স ও সাজেশন পাবে।</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {classOptions.map(({ value, icon: Icon, bg, color, label, desc }) => (
            <button
              key={value}
              onClick={() => selectClass(value)}
              className={cn(
                "flex flex-col items-start gap-3 rounded-xl border border-border p-4 text-left transition-all",
                "hover:border-primary hover:shadow-md hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              )}
            >
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", bg)}>
                <Icon className={cn("h-5 w-5", color)} />
              </div>
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
