import type { ModelTest, PresetSet } from "@/lib/types/model-test"

export const modelTests: ModelTest[] = [
  {
    id: "mt-1",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০৩",
    examGroup: "এইচএসসি বিজ্ঞান",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 200,
    coinReward: 100,
    attempted: false,
  },
  {
    id: "mt-2",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০২",
    examGroup: "এইচএসসি বিজ্ঞান",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 200,
    coinReward: 100,
    attempted: true,
  },
  {
    id: "mt-3",
    title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০১",
    examGroup: "এইচএসসি বিজ্ঞান",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 200,
    coinReward: 100,
    attempted: true,
  },
]

export const presetSets: PresetSet[] = [
  {
    id: "preset-1",
    title: "৭ দিনের রিভিশন চ্যালেঞ্জ - দিন ১",
    description: "সব বিষয়ের গুরুত্বপূর্ণ টপিক থেকে মিশ্র প্রশ্ন",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 150,
    coinReward: 80,
  },
  {
    id: "preset-2",
    title: "দুর্বল টপিক রিভিশন সেট",
    description: "তোমার আগের ভুল উত্তরের উপর ভিত্তি করে তৈরি",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 150,
    coinReward: 80,
  },
]

export function getModelTestById(id: string): ModelTest | undefined {
  return modelTests.find((m) => m.id === id)
}

export function getPresetById(id: string): PresetSet | undefined {
  return presetSets.find((p) => p.id === id)
}
