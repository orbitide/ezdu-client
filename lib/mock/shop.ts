import type { CoinBundle, PremiumPlan } from "@/lib/types/shop"

export const coinBundles: CoinBundle[] = [
  { id: "bundle-1", coins: 500, price: 50 },
  { id: "bundle-2", coins: 1200, price: 100, bonus: "২০% বোনাস" },
  { id: "bundle-3", coins: 3000, price: 200, bonus: "৫০% বোনাস", popular: true },
  { id: "bundle-4", coins: 6500, price: 400, bonus: "৭৫% বোনাস" },
]

export const premiumPlans: PremiumPlan[] = [
  {
    id: "plan-monthly",
    title: "মাসিক প্রিমিয়াম",
    price: 99,
    period: "মাস",
    features: ["সব মডেল টেস্ট আনলক", "বিজ্ঞাপন মুক্ত অভিজ্ঞতা", "অগ্রাধিকার সাপোর্ট"],
  },
  {
    id: "plan-yearly",
    title: "বাৎসরিক প্রিমিয়াম",
    price: 899,
    period: "বছর",
    features: ["সব মডেল টেস্ট আনলক", "বিজ্ঞাপন মুক্ত অভিজ্ঞতা", "অগ্রাধিকার সাপোর্ট", "এক্সক্লুসিভ অ্যাভাটার আইটেম", "২ মাস ফ্রি"],
    highlighted: true,
  },
]
