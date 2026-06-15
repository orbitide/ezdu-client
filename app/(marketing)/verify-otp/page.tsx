import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OtpForm } from "./otp-form"

export default function VerifyOtpPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle>ইমেইল ভেরিফাই করো</CardTitle>
          <CardDescription>তোমার ইমেইলে পাঠানো ৪-সংখ্যার কোডটি লিখো।</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <OtpForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
