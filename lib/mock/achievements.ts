import type { Achievement, Friend } from "@/lib/types/achievement"

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "প্রথম পদক্ষেপ",
    description: "তোমার প্রথম কুইজ সম্পন্ন করো",
    icon: "Footprints",
    unlocked: true,
    unlockedAt: "2026-05-01",
  },
  {
    id: "ach-2",
    title: "৭ দিনের স্ট্রিক",
    description: "৭ দিন ধরে প্রতিদিন অনুশীলন করো",
    icon: "Flame",
    unlocked: true,
    unlockedAt: "2026-06-10",
  },
  {
    id: "ach-3",
    title: "পারফেক্ট স্কোর",
    description: "একটি কুইজে ১০০% সঠিক উত্তর দাও",
    icon: "Target",
    unlocked: true,
    unlockedAt: "2026-06-05",
  },
  {
    id: "ach-4",
    title: "শব্দভাণ্ডার মাস্টার",
    description: "৫০টি ভোকাবুলারি শব্দ শেখো",
    icon: "BookOpen",
    unlocked: false,
    progress: { current: 12, target: 50 },
  },
  {
    id: "ach-5",
    title: "মডেল টেস্ট চ্যাম্পিয়ন",
    description: "১০টি মডেল টেস্ট সম্পন্ন করো",
    icon: "Trophy",
    unlocked: false,
    progress: { current: 3, target: 10 },
  },
  {
    id: "ach-6",
    title: "৩০ দিনের যোদ্ধা",
    description: "৩০ দিন ধরে প্রতিদিন অনুশীলন করো",
    icon: "Award",
    unlocked: false,
    progress: { current: 7, target: 30 },
  },
]

export const friends: Friend[] = [
  { id: "f1", username: "nusrat.j", name: "নুসরাত জাহান", level: 16, rankTier: "expert", online: true },
  { id: "f2", username: "sadia.i", name: "সাদিয়া ইসলাম", level: 11, rankTier: "adept", online: false },
  { id: "f3", username: "imran.k", name: "ইমরান কবির", level: 9, rankTier: "apprentice", online: true },
  { id: "f4", username: "mim.n", name: "মিম নাহার", level: 7, rankTier: "novice", online: false },
]
