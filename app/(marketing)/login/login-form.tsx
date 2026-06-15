"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store/auth-store"
import { useOnboardingStore } from "@/lib/store/onboarding-store"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((s) => s.login)
  const onboardingCompleted = useOnboardingStore((s) => s.completed)

  function handleDemoLogin() {
    login({
      id: "demo-user",
      name: "Rafiul Islam",
      username: "rafiul",
      email: "rafiul@example.com",
      examGroup: "HSC Science",
      className: "Class 12",
      avatar: {
        skinTone: "default",
        hairStyle: "default",
        hairColor: "default",
        outfit: "default",
        accessory: "none",
        background: "default",
      },
    })

    const redirect = searchParams.get("redirect")
    router.replace(onboardingCompleted ? redirect || "/home" : "/onboarding")
  }

  return (
    <Button className="w-full" onClick={handleDemoLogin}>
      Continue with demo account
    </Button>
  )
}
