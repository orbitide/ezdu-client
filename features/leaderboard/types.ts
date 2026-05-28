export interface LeaderboardEntry {
    rank: number;
    userId: string;
    name: string;
    avatarUrl?: string;
    xp: number;
    level: number;
    streak: number;
    accuracy: number;
    isCurrentUser?: boolean;
}

export const DUMMY_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, userId: 'u1', name: 'রাহেলা খানম', xp: 12400, level: 28, streak: 45, accuracy: 92 },
    { rank: 2, userId: 'u2', name: 'তানভীর আহমেদ', xp: 11800, level: 26, streak: 38, accuracy: 89 },
    { rank: 3, userId: 'u3', name: 'সাবরিনা ইসলাম', xp: 10950, level: 24, streak: 30, accuracy: 87 },
    { rank: 4, userId: 'u4', name: 'মাহমুদুল হাসান', xp: 9700, level: 22, streak: 22, accuracy: 85 },
    { rank: 5, userId: 'u5', name: 'ফারিহা তাসনিম', xp: 8900, level: 20, streak: 18, accuracy: 84 },
    { rank: 6, userId: 'u6', name: 'রিফাত হোসেন', xp: 8200, level: 19, streak: 15, accuracy: 82 },
    { rank: 7, userId: 'u7', name: 'নাফিসা আক্তার', xp: 7600, level: 18, streak: 12, accuracy: 81 },
    { rank: 8, userId: 'u8', name: 'ইমরান খান', xp: 7100, level: 17, streak: 10, accuracy: 80 },
    { rank: 9, userId: 'u9', name: 'সুমাইয়া বেগম', xp: 6500, level: 16, streak: 8, accuracy: 78 },
    { rank: 142, userId: 'me', name: 'তুমি', xp: 2450, level: 12, streak: 7, accuracy: 78, isCurrentUser: true },
];
