import type { FeedItem } from "@/lib/types/feed"

export const feedItems: FeedItem[] = [
  {
    id: "feed-1",
    type: "announcement",
    title: "নতুন ভোকাবুলারি সেট প্রকাশিত",
    description: "HSC ও ভর্তি পরীক্ষার জন্য ৫০টি নতুন শব্দ যুক্ত হয়েছে ভোকাবুলারি ব্যাংকে।",
    timeAgo: "২ ঘণ্টা আগে",
  },
  {
    id: "feed-2",
    type: "friend-activity",
    title: "নতুন রেকর্ড গড়েছে",
    description: "এইচএসসি বিজ্ঞান মডেল টেস্ট - ০২ এ ৯৫% স্কোর করেছে।",
    timeAgo: "৩ ঘণ্টা আগে",
    username: "rafiul_ahmed",
    avatarSeed: "rafiul",
  },
  {
    id: "feed-3",
    type: "announcement",
    title: "সাপ্তাহিক চ্যালেঞ্জ শুরু",
    description: "এই সপ্তাহের চ্যালেঞ্জ সম্পন্ন করে অতিরিক্ত ১০০ কয়েন জিতে নাও।",
    timeAgo: "৫ ঘণ্টা আগে",
  },
  {
    id: "feed-4",
    type: "friend-activity",
    title: "৩০ দিনের স্ট্রিক অর্জন করেছে",
    description: "একটানা ৩০ দিন অনুশীলন করে নতুন মাইলফলক স্পর্শ করেছে।",
    timeAgo: "১ দিন আগে",
    username: "samira_islam",
    avatarSeed: "samira",
  },
  {
    id: "feed-5",
    type: "friend-activity",
    title: "নতুন ব্যাজ অর্জন করেছে",
    description: "\"ভোকাবুলারি মাস্টার\" ব্যাজ আনলক করেছে।",
    timeAgo: "২ দিন আগে",
    username: "tanvir_hossain",
    avatarSeed: "tanvir",
  },
]
