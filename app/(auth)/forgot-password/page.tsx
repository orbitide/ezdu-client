import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ForgotPasswordForm } from "./forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 pt-ez-below-nav">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle>পাসওয়ার্ড রিসেট করো</CardTitle>
          <CardDescription>
            তোমার ইমেইল লিখো, আমরা একটি ভেরিফিকেশন কোড পাঠাবো।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ForgotPasswordForm />
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="font-medium text-primary hover:underline">
              লগ ইনে ফিরে যাও
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
