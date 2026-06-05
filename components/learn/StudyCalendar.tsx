"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DAY_NAMES = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"]
const MONTH_NAMES = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
]
// Mock active study days for the current month
const ACTIVE_DAYS = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29]

export function StudyCalendar() {
  const today = new Date()
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const year = current.getFullYear()
  const month = current.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const isThisMonth = year === today.getFullYear() && month === today.getMonth()

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const isToday = (d: number) => isThisMonth && d === today.getDate()
  const isActive = (d: number) => isThisMonth && ACTIVE_DAYS.includes(d)
  const studiedCount = isThisMonth
    ? ACTIVE_DAYS.filter(d => d <= today.getDate()).length
    : 0

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">পড়ার ক্যালেন্ডার</span>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-xs text-muted-foreground py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((day, idx) => (
            <div key={idx} className="flex justify-center py-0.5">
              {day !== null && (
                <div
                  className={[
                    "relative flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors",
                    isToday(day)
                      ? "bg-primary text-primary-foreground font-semibold"
                      : isActive(day)
                      ? "font-medium hover:bg-muted"
                      : "text-muted-foreground hover:bg-muted",
                  ].join(" ")}
                >
                  {day}
                  {isActive(day) && !isToday(day) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
            পড়েছি
          </span>
          <span className="font-medium">{studiedCount} দিন পড়েছি এ মাসে</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrent(new Date(year, month - 1, 1))}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs font-medium">{MONTH_NAMES[month]} {year}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrent(new Date(year, month + 1, 1))}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
