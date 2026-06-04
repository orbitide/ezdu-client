"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Eye, EyeOff } from "lucide-react"
import { saveSession, getOnboarding } from "@/lib/storage"
import { currentUser } from "@/lib/mock/data"

const DEMO_EMAIL = "rafiq@example.com"
const DEMO_PASSWORD = "demo123"

export default function LoginPage() {
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }
    if (email === DEMO_EMAIL && password !== DEMO_PASSWORD) {
      setError("পাসওয়ার্ড সঠিক নয়।")
      return
    }

    const user = email === currentUser.email
      ? currentUser
      : { id: "usr-new", name: email.split("@")[0], email, avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${email}`, role: "student", xp: 0, streak: 0, joinedAt: new Date().toISOString() }
    saveSession({ isLoggedIn: true, user })
    const onboarding = getOnboarding()
    router.push(onboarding?.completed ? "/learn" : "/onboarding")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-12">
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="h-8 w-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          Ezdu
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            বাংলাদেশের সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            SSC ও HSC পরীক্ষার সম্পূর্ণ প্রস্তুতি নিন বিশেষজ্ঞ শিক্ষকদের সাথে।
            যেকোনো সময়, যেকোনো জায়গা থেকে।
          </p>
          <div className="flex gap-6 pt-4">
            {[["৫০,০০০+", "শিক্ষার্থী"], ["২০০+", "ভিডিও পাঠ"], ["৯৮%", "সাফল্যের হার"]].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold">{n}</p>
                <p className="text-primary-foreground/70 text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-primary-foreground/50 text-sm">© 2025 Ezdu Education Ltd.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center gap-2 font-bold text-xl lg:hidden">
            <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            Ezdu
          </div>

          <div>
            <h1 className="text-2xl font-bold">লগইন করুন</h1>
            <p className="text-muted-foreground text-sm mt-1">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  পাসওয়ার্ড ভুলেছেন?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg">
              লগইন করুন
            </Button>
          </form>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            নতুন ব্যবহারকারী?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
