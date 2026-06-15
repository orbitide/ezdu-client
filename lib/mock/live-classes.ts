import type { LiveClass } from "@/lib/types/live-class"

export const liveClasses: LiveClass[] = [
  {
    id: "lc-1",
    title: "গতিবিদ্যা: সমস্যা সমাধান সেশন",
    subject: "পদার্থবিজ্ঞান",
    instructor: "তানিয়া রহমান",
    date: "১৭ জুন, ২০২৬",
    time: "রাত ৮:০০",
    durationMinutes: 60,
    status: "upcoming",
  },
  {
    id: "lc-2",
    title: "তড়িৎ রসায়ন - লাইভ কুইজ",
    subject: "রসায়ন",
    instructor: "করিম উদ্দিন",
    date: "১৯ জুন, ২০২৬",
    time: "সন্ধ্যা ৭:০০",
    durationMinutes: 45,
    status: "upcoming",
  },
  {
    id: "lc-3",
    title: "নিউটনের সূত্র - বিস্তারিত আলোচনা",
    subject: "পদার্থবিজ্ঞান",
    instructor: "তানিয়া রহমান",
    date: "১০ জুন, ২০২৬",
    time: "রাত ৮:০০",
    durationMinutes: 55,
    status: "recorded",
  },
]

export function getLiveClassById(id: string): LiveClass | undefined {
  return liveClasses.find((lc) => lc.id === id)
}
