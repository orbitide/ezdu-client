"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useOnboardingStore } from "@/lib/store/onboarding-store"

export default function OnboardingPage() {
  const router = useRouter()
  const complete = useOnboardingStore((s) => s.complete)

  function handleContinue() {
    complete()
    router.replace("/home")
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle>Let&apos;s set up your profile</CardTitle>
          <CardDescription>
            Demo build — onboarding flow (exam group, subjects, avatar) coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleContinue}>
            Skip for now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
