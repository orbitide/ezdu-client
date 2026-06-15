import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandMark } from "@/components/layout/brand-mark"
import { BrandName } from "@/components/layout/brand-name"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-sm py-16 px-4">
      <div className="flex flex-col items-center gap-2 mb-8">
        <BrandMark />
        <BrandName />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">আবার স্বাগতম</CardTitle>
          <CardDescription>তোমার পড়াশোনা চালিয়ে যাওয়ার জন্য সাইন ইন করো।</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense>
            <LoginForm />
          </Suspense>
          <p className="text-center text-sm text-muted-foreground">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/welcome" className="font-medium text-primary hover:underline">
              শুরু করো
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
