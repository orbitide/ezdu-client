import type { LeaderboardUser } from "@/lib/types/leaderboard"

export const leaderboardUsers: LeaderboardUser[] = [
  { id: "u1", username: "tanvir.a", name: "তানভীর আহমেদ", rank: 1, xp: 5240, rankTier: "master", level: 18 },
  { id: "u2", username: "nusrat.j", name: "নুসরাত জাহান", rank: 2, xp: 4890, rankTier: "expert", level: 16 },
  { id: "u3", username: "rafiul.i", name: "রাফিউল ইসলাম", rank: 3, xp: 3680, rankTier: "adept", level: 12, isCurrentUser: true },
  { id: "u4", username: "sadia.i", name: "সাদিয়া ইসলাম", rank: 4, xp: 3420, rankTier: "adept", level: 11 },
  { id: "u5", username: "mehedi.h", name: "মেহেদী হাসান", rank: 5, xp: 3105, rankTier: "apprentice", level: 10 },
  { id: "u6", username: "farzana.r", name: "ফারজানা রহমান", rank: 6, xp: 2890, rankTier: "apprentice", level: 9 },
  { id: "u7", username: "imran.k", name: "ইমরান কবির", rank: 7, xp: 2650, rankTier: "apprentice", level: 9 },
  { id: "u8", username: "tasnim.a", name: "তাসনিম আক্তার", rank: 8, xp: 2400, rankTier: "novice", level: 8 },
  { id: "u9", username: "shakil.h", name: "শাকিল হোসেন", rank: 9, xp: 2180, rankTier: "novice", level: 7 },
  { id: "u10", username: "mim.n", name: "মিম নাহার", rank: 10, xp: 1950, rankTier: "novice", level: 7 },
]

export function getUserByUsername(username: string): LeaderboardUser | undefined {
  return leaderboardUsers.find((u) => u.username === username)
}
