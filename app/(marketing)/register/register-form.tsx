"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/lib/store/auth-store"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"

export function RegisterForm() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      setError("তোমার নাম লিখো।")
      return
    }
    if (!email.includes("@")) {
      setError("সঠিক ইমেইল ঠিকানা লিখো।")
      return
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }

    setError(null)
    login({
      id: "demo-user",
      name: name.trim(),
      username: email.split("@")[0],
      email,
      examGroup: "",
      className: "",
      avatar: defaultAvatarConfig,
    })
    router.replace("/onboarding")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">পূর্ণ নাম</Label>
        <Input
          id="name"
          placeholder="তোমার নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <Label htmlFor="password">পাসওয়ার্ড</Label>
        <PasswordInput
          id="password"
          placeholder="কমপক্ষে ৬ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full">
        অ্যাকাউন্ট তৈরি করো
      </Button>

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">অথবা</span>
        <Separator className="flex-1" />
      </div>

      <Button type="button" variant="outline" className="w-full">
        Google দিয়ে চালিয়ে যান
      </Button>
    </form>
  )
}
