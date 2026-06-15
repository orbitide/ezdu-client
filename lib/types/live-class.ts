export interface LiveClass {
  id: string
  title: string
  subject: string
  instructor: string
  date: string
  time: string
  durationMinutes: number
  status: "upcoming" | "live" | "recorded"
}
