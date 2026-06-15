import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandMark } from "@/components/layout/brand-mark"
import { BrandName } from "@/components/layout/brand-name"
import { RegisterForm } from "./register-form"

export default function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center space-y-2">
          <div className="flex items-center gap-2">
            <BrandMark />
            <BrandName />
          </div>
          <CardTitle>তোমার অ্যাকাউন্ট তৈরি করো</CardTitle>
          <CardDescription>ডেমো ভার্সন — তোমার তথ্য ব্রাউজারের বাইরে যায় না।</CardDescription>
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
