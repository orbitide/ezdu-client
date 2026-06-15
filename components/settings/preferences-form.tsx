"use client"

import { useTheme } from "next-themes"
import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PreferencesForm() {
  const { theme, setTheme } = useTheme()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoPlayAudio, setAutoPlayAudio] = useState(true)

  return (
    <Card>
      <CardContent className="divide-y pt-6">
        <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
          <div>
            <p className="text-sm font-medium">থিম</p>
            <p className="text-sm text-muted-foreground">অ্যাপের রঙের মোড পছন্দ করো</p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="size-4 text-muted-foreground" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <Moon className="size-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-medium">ভাষা</p>
            <p className="text-sm text-muted-foreground">অ্যাপের ভাষা নির্বাচন করো</p>
          </div>
          <Select defaultValue="bn">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bn">বাংলা</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-medium">সাউন্ড ইফেক্ট</p>
            <p className="text-sm text-muted-foreground">সঠিক ও ভুল উত্তরের শব্দ চালু করো</p>
          </div>
          <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
        </div>
        <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
          <div>
            <p className="text-sm font-medium">অডিও অটো-প্লে</p>
            <p className="text-sm text-muted-foreground">প্রশ্নের অডিও স্বয়ংক্রিয়ভাবে চালু হবে</p>
          </div>
          <Switch checked={autoPlayAudio} onCheckedChange={setAutoPlayAudio} />
        </div>
      </CardContent>
    </Card>
  )
}
