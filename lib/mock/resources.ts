import type { Resource } from "@/lib/types/resource"

export const resources: Resource[] = [
  {
    id: "res-1",
    title: "পদার্থবিজ্ঞান সূত্র শীট - প্রথম পত্র",
    type: "formula-sheet",
    subject: "পদার্থবিজ্ঞান",
    description: "গতিবিদ্যা, বল ও কাজ-শক্তি অধ্যায়ের সকল সূত্র এক পৃষ্ঠায়।",
    pageCount: 2,
  },
  {
    id: "res-2",
    title: "রসায়ন - তড়িৎ রসায়ন চিট শীট",
    type: "cheat-sheet",
    subject: "রসায়ন",
    description: "জারণ-বিজারণ, তড়িৎকোষ ও তড়িৎ বিশ্লেষণের গুরুত্বপূর্ণ পয়েন্টসমূহ।",
    pageCount: 1,
  },
  {
    id: "res-3",
    title: "এইচএসসি পদার্থবিজ্ঞান প্রশ্নব্যাংক ২০২০-২০২৪",
    type: "past-paper",
    subject: "পদার্থবিজ্ঞান",
    description: "গত পাঁচ বছরের এইচএসসি পদার্থবিজ্ঞান প্রশ্নপত্র ও সমাধান।",
    pageCount: 24,
  },
  {
    id: "res-4",
    title: "বাংলা সাহিত্য - মধ্যযুগ নোট",
    type: "pdf",
    subject: "বাংলা",
    description: "মধ্যযুগের সাহিত্যের কবি, কাব্য ও বৈশিষ্ট্য নিয়ে বিস্তারিত নোট।",
    pageCount: 12,
  },
  {
    id: "res-5",
    title: "উচ্চতর গণিত - ত্রিকোণমিতি সূত্রাবলি",
    type: "formula-sheet",
    subject: "উচ্চতর গণিত",
    description: "ত্রিকোণমিতিক অনুপাত, অভেদ এবং সমীকরণের সকল গুরুত্বপূর্ণ সূত্র।",
    pageCount: 3,
  },
]

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id)
}
