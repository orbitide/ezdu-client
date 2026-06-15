import { Suspense } from "react"
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
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Demo build — sign in with a sample account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
