import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandMark } from "@/components/layout/brand-mark"
import { BrandName } from "@/components/layout/brand-name"
import { RegisterForm } from "./register-form"

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-16 px-4 pt-ez-below-nav">
      <Link href="/welcome" className="flex flex-col items-center gap-2 mb-8">
        <BrandMark />
        <BrandName />
      </Link>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">অ্যাকাউন্ট তৈরি করো</CardTitle>
          <CardDescription>শেখা শুরু করতে সাইন আপ করো।</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
          <p className="text-center text-sm text-muted-foreground">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              লগ ইন করো
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
