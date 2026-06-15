import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandMark } from "@/components/layout/brand-mark"
import { BrandName } from "@/components/layout/brand-name"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center space-y-2">
          <div className="flex items-center gap-2">
            <BrandMark />
            <BrandName />
          </div>
          <CardTitle>আবার স্বাগতম</CardTitle>
          <CardDescription>ডেমো ভার্সন — একটি নমুনা অ্যাকাউন্ট দিয়ে সাইন ইন করো।</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense>
            <LoginForm />
          </Suspense>
          <p className="text-center text-sm text-muted-foreground">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              একটি তৈরি করো
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
