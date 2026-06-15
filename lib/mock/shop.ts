import type { CoinBundle, PremiumPlan } from "@/lib/types/shop"

export const coinBundles: CoinBundle[] = [
  { id: "bundle-1", coins: 500, price: 50 },
  { id: "bundle-2", coins: 1200, price: 100, bonus: "২০% বোনাস" },
  { id: "bundle-3", coins: 3000, price: 200, bonus: "৫০% বোনাস", popular: true },
  { id: "bundle-4", coins: 6500, price: 400, bonus: "৭৫% বোনাস" },
]

export const premiumPlans: PremiumPlan[] = [
  {
    id: "plan-1m",
    title: "১ মাস",
    price: 99,
    period: "মাস",
    months: 1,
    features: ["সব মডেল টেস্ট আনলক", "বিজ্ঞাপন মুক্ত অভিজ্ঞতা", "অগ্রাধিকার সাপোর্ট"],
  },
  {
    id: "plan-3m",
    title: "৩ মাস",
    price: 269,
    period: "৩ মাস",
    months: 3,
    features: ["সব মডেল টেস্ট আনলক", "বিজ্ঞাপন মুক্ত অভিজ্ঞতা", "অগ্রাধিকার সাপোর্ট"],
    badge: "১০% সাশ্রয়",
  },
  {
    id: "plan-6m",
    title: "৬ মাস",
    price: 499,
    period: "৬ মাস",
    months: 6,
    features: ["সব মডেল টেস্ট আনলক", "বিজ্ঞাপন মুক্ত অভিজ্ঞতা", "অগ্রাধিকার সাপোর্ট", "এক্সক্লুসিভ অ্যাভাটার আইটেম"],
    badge: "১৫% সাশ্রয়",
  },
  {
    id: "plan-12m",
    title: "১২ মাস",
    price: 899,
    period: "বছর",
    months: 12,
    features: ["সব মডেল টেস্ট আনলক", "বিজ্ঞাপন মুক্ত অভিজ্ঞতা", "অগ্রাধিকার সাপোর্ট", "এক্সক্লুসিভ অ্যাভাটার আইটেম", "২ মাস ফ্রি"],
    highlighted: true,
    badge: "সেরা ডিল",
  },
]
