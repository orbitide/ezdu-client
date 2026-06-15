import type { AppNotification } from "@/lib/types/notification"

export const notifications: AppNotification[] = [
  {
    id: "notif-1",
    type: "xp",
    title: "XP অর্জিত হয়েছে",
    message: "তুমি আজকের কুইক চ্যালেঞ্জ থেকে ৭০ XP অর্জন করেছো।",
    timeAgo: "৫ মিনিট আগে",
    read: false,
  },
  {
    id: "notif-2",
    type: "streak",
    title: "স্ট্রিক বজায় রাখো",
    message: "তোমার ৭ দিনের স্ট্রিক চলছে। আজও অনুশীলন করে স্ট্রিক বাড়িয়ে রাখো।",
    timeAgo: "১ ঘণ্টা আগে",
    read: false,
  },
  {
    id: "notif-3",
    type: "achievement",
    title: "নতুন ব্যাজ আনলক",
    message: "অভিনন্দন! তুমি \"প্রথম পদক্ষেপ\" অ্যাচিভমেন্টটি আনলক করেছো।",
    timeAgo: "৩ ঘণ্টা আগে",
    read: true,
  },
  {
    id: "notif-4",
    type: "social",
    title: "লিডারবোর্ডে উন্নতি",
    message: "তুমি সাপ্তাহিক লিডারবোর্ডে ৫ নম্বরে উঠে এসেছো।",
    timeAgo: "৬ ঘণ্টা আগে",
    read: true,
  },
  {
    id: "notif-5",
    type: "system",
    title: "নতুন মডেল টেস্ট যুক্ত হয়েছে",
    message: "এইচএসসি বিজ্ঞান বিভাগের জন্য নতুন মডেল টেস্ট প্রকাশিত হয়েছে।",
    timeAgo: "গতকাল",
    read: true,
  },
  {
    id: "notif-6",
    type: "system",
    title: "কারেন্ট অ্যাফেয়ার্স আপডেট",
    message: "এই সপ্তাহের গুরুত্বপূর্ণ কারেন্ট অ্যাফেয়ার্স প্রকাশিত হয়েছে।",
    timeAgo: "২ দিন আগে",
    read: true,
  },
]
