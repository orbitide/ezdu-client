"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function ChangePasswordForm() {
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
            <Label htmlFor="current-password">বর্তমান পাসওয়ার্ড</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">নতুন পাসওয়ার্ড</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">নতুন পাসওয়ার্ড নিশ্চিত করো</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit">পাসওয়ার্ড পরিবর্তন করো</Button>
            {saved && <span className="text-sm text-green-600">পাসওয়ার্ড পরিবর্তিত হয়েছে</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
