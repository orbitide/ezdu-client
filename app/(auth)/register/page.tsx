"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Zap, GraduationCap, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"student" | "parent">("student")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/student/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="w-full max-w-md bg-background rounded-2xl border border-border shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <Zap className="h-4 w-4" />
          </div>
          Ezdu
        </div>

        <div>
          <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-muted-foreground text-sm mt-1">বিনামূল্যে শুরু করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>আপনি কে?</Label>
            <div className="grid grid-cols-2 gap-3">
              {([["student", "শিক্ষার্থী", GraduationCap], ["parent", "অভিভাবক", Users]] as const).map(([val, label, Icon]) => (
                <div
                  key={val}
                  onClick={() => setRole(val)}
                  className={cn(
                    "flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer transition-colors",
                    role === val ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn("h-6 w-6", role === val ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">পূর্ণ নাম</Label>
            <Input id="name" placeholder="আপনার নাম লিখুন" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">ইমেইল</Label>
            <Input id="email" type="email" placeholder="আপনার ইমেইল লিখুন" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input id="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required />
          </div>

          <Button type="submit" className="w-full" size="lg">
            রেজিস্ট্রেশন করুন
          </Button>
        </form>

        <Separator />

        <p className="text-center text-sm text-muted-foreground">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  )
}
