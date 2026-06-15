"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileEditForm() {
  const user = useAuthStore((state) => state.user)
  const [name, setName] = useState(user?.name ?? "")
  const [username, setUsername] = useState(user?.username ?? "")
  const [examGroup, setExamGroup] = useState(user?.examGroup ?? "")
  const [className, setClassName] = useState(user?.className ?? "")
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">পূর্ণ নাম</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">ইউজারনেম</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="examGroup">পরীক্ষার গ্রুপ</Label>
              <Input id="examGroup" value={examGroup} onChange={(e) => setExamGroup(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="className">শ্রেণি</Label>
              <Input id="className" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit">পরিবর্তন সংরক্ষণ করো</Button>
            {saved && <span className="text-sm text-green-600">সংরক্ষিত হয়েছে</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
