"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }
    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না।")
      return
    }
    setError(null)
    router.push("/login")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">নতুন পাসওয়ার্ড</Label>
        <PasswordInput
          id="password"
          placeholder="কমপক্ষে ৬ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">পাসওয়ার্ড নিশ্চিত করো</Label>
        <PasswordInput
          id="confirm-password"
          placeholder="পাসওয়ার্ড পুনরায় লিখো"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full">
        পাসওয়ার্ড রিসেট করো
      </Button>
    </form>
  )
}
