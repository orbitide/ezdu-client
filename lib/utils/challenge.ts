import { questions } from "@/lib/mock/questions"
import type { Question } from "@/lib/types/question"

export function getQuestionsByTopic(topicName: string): Question[] {
  return questions.filter((q) => q.topic === topicName)
}

export function isMilestone(streak: number): boolean {
  return streak === 3 || streak === 5 || streak === 10
}

const STORM_MESSAGES: Record<3 | 5 | 10, string[]> = {
  3: ["চালিয়ে যাও!", "ভালো শুরু!", "দারুণ চলছে!"],
  5: ["হ্যাটট্রিক!", "দারুণ ধারাবাহিকতা!", "থামিও না!"],
  10: ["অসাধারণ!", "একদম নিখুঁত!", "তুফান চলছে!"],
}

export function getStormMessage(streak: number): string {
  const tier = streak >= 10 ? 10 : streak === 5 ? 5 : 3
  const messages = STORM_MESSAGES[tier]
  return messages[Math.floor(Math.random() * messages.length)]
}

export function getStreakTier(maxStreak: number): { title: string; subtitle: string } {
  if (maxStreak >= 15) {
    return {
      title: "অবিশ্বাস্য!",
      subtitle: "তোমার ভেতরের শক্তি জেগে উঠেছে...",
    }
  }
  if (maxStreak >= 10) {
    return {
      title: "শাবাশ!",
      subtitle: "সাফল্য তাদেরই হয় যারা থামে না...",
    }
  }
  if (maxStreak >= 6) {
    return {
      title: "অসাধারণ!",
      subtitle: "এই মনোযোগই তোমাকে বাকিদের থেকে আলাদা করে!",
    }
  }
  if (maxStreak >= 3) {
    return {
      title: "চমৎকার!",
      subtitle: "তোমার অধ্যবসায় ফল দিতে শুরু করেছে!",
    }
  }
  return {
    title: "পাঠ সম্পন্ন!",
    subtitle: "প্রতিটি পদক্ষেপ তোমাকে লক্ষ্যের কাছে নেয়!",
  }
}
