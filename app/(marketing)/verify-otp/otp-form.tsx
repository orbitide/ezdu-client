"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const OTP_LENGTH = 4
const RESEND_SECONDS = 60

export function OtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (seconds <= 0) return
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [seconds])

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const next = [...digits]
    next[index] = value.slice(-1)
    setDigits(next)
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleVerify() {
    router.push(`/reset-password${email ? `?email=${encodeURIComponent(email)}` : ""}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-3">
        {digits.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className="h-14 w-14 text-center text-lg font-semibold"
          />
        ))}
      </div>

      <Button
        className="w-full"
        disabled={digits.some((d) => !d)}
        onClick={handleVerify}
      >
        কোড ভেরিফাই করো
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {seconds > 0 ? (
          `${seconds} সেকেন্ড পর কোড আবার পাঠানো যাবে`
        ) : (
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => setSeconds(RESEND_SECONDS)}
          >
            কোড আবার পাঠাও
          </button>
        )}
      </p>
    </div>
  )
}
