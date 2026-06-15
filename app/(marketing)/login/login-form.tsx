"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/lib/store/auth-store"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"

const DEMO_USER = {
  id: "demo-user",
  name: "রাফিউল ইসলাম",
  username: "rafiul",
  email: "rafiul@example.com",
  examGroup: "এইচএসসি বিজ্ঞান",
  className: "ক্লাস ১২",
  avatar: defaultAvatarConfig,
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((s) => s.login)
  const onboardingCompleted = useOnboardingStore((s) => s.completed)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function redirectAfterLogin() {
    const redirect = searchParams.get("redirect")
    router.replace(onboardingCompleted ? redirect || "/home" : "/onboarding")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email.includes("@")) {
      setError("সঠিক ইমেইল ঠিকানা লিখো।")
      return
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }

    setError(null)
    login({ ...DEMO_USER, email })
    redirectAfterLogin()
  }

  function handleDemoLogin() {
    login(DEMO_USER)
    redirectAfterLogin()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">ইমেইল</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              ভুলে গেছো?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="কমপক্ষে ৬ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full">
          লগ ইন
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">অথবা</span>
        <Separator className="flex-1" />
      </div>

      <Button type="button" variant="outline" className="w-full">
        Google দিয়ে চালিয়ে যান
      </Button>

      <Button type="button" variant="secondary" className="w-full" onClick={handleDemoLogin}>
        ডেমো অ্যাকাউন্ট দিয়ে চালিয়ে যান
      </Button>
    </div>
  )
}
