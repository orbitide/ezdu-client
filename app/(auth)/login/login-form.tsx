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

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

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

  const [email, setEmail] = useState("rafiul@example.com")
  const [password, setPassword] = useState("123456")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function redirectAfterLogin() {
    const redirect = searchParams.get("redirect")
    router.replace(onboardingCompleted ? redirect || "/dashboard" : "/onboarding")
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
    setLoading(true)
    login({ ...DEMO_USER, email })
    redirectAfterLogin()
  }

  return (
    <div className="space-y-4">
      <Button type="button" variant="outline" className="w-full">
        <GoogleIcon />
        Google দিয়ে চালিয়ে যান
      </Button>

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">অথবা</span>
        <Separator className="flex-1" />
      </div>

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

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "লগ ইন হচ্ছে…" : "লগ ইন"}
        </Button>
      </form>
    </div>
  )
}
