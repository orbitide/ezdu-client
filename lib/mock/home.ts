import type {
  StudyPlanItem,
  RecommendedQuiz,
  UpcomingModelTest,
  LeaderboardEntry,
  HomeGridItem,
} from "@/lib/types/home"

export const todaysPlan: StudyPlanItem[] = [
  { id: "plan-1", title: "অধ্যায় ৩: গতি ও বল", subject: "পদার্থবিজ্ঞান", durationMinutes: 25, completed: false },
  { id: "plan-2", title: "ভোকাবুলারি রিভিশন - সেট ৪", subject: "ইংরেজি", durationMinutes: 15, completed: false },
  { id: "plan-3", title: "MCQ প্র্যাকটিস: জারণ-বিজারণ", subject: "রসায়ন", durationMinutes: 20, completed: true },
]

export const recommendedQuizzes: RecommendedQuiz[] = [
  { id: "quiz-1", title: "ত্রিকোণমিতি দ্রুত প্র্যাকটিস", subject: "উচ্চতর গণিত", questionCount: 10, difficulty: "medium", xpReward: 50 },
  { id: "quiz-2", title: "বাংলা সাহিত্য: মধ্যযুগ", subject: "বাংলা", questionCount: 15, difficulty: "easy", xpReward: 40 },
  { id: "quiz-3", title: "সেল বিভাজন চ্যালেঞ্জ", subject: "জীববিজ্ঞান", questionCount: 12, difficulty: "hard", xpReward: 70 },
]

export const upcomingModelTests: UpcomingModelTest[] = [
  { id: "mt-1", title: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০৩", examGroup: "এইচএসসি বিজ্ঞান", scheduledFor: "আগামীকাল, সকাল ১০:০০", durationMinutes: 90 },
]

export const miniLeaderboard: LeaderboardEntry[] = [
  { id: "u1", rank: 1, name: "তানভীর আহমেদ", xp: 5240, rankTier: "master" },
  { id: "u2", rank: 2, name: "নুসরাত জাহান", xp: 4890, rankTier: "expert" },
  { id: "u3", rank: 3, name: "রাফিউল ইসলাম", xp: 3680, rankTier: "adept", isCurrentUser: true },
  { id: "u4", rank: 4, name: "সাদিয়া ইসলাম", xp: 3420, rankTier: "adept" },
  { id: "u5", rank: 5, name: "মেহেদী হাসান", xp: 3105, rankTier: "apprentice" },
]

export const homeGridItems: HomeGridItem[] = [
  { id: "archive", label: "আর্কাইভ", href: "/archive", icon: "archive.svg" },
  { id: "challenge", label: "চ্যালেঞ্জ", href: "/practice", icon: "challenge.svg" },
  { id: "quiz", label: "কুইজ", href: "/practice", icon: "quiz.svg" },
  { id: "mock", label: "মক টেস্ট", href: "/practice", icon: "mock_test.svg" },
  { id: "leaderboard", label: "লিডারবোর্ড", href: "/leaderboard", icon: "leaderboard.svg" },
  { id: "vocab", label: "ভোকাবস", href: "/vocabulary", icon: "vocabs.svg" },
]
