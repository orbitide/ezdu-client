import {
  LayoutDashboard,
  Swords,
  TrendingUp,
  Brain,
  Trophy,
  User,
  ShoppingBag,
  Settings,
  Sparkles,
  Archive,
  Bell,
  Newspaper,
  CalendarRange,
  Globe2,
  MoreHorizontal,
  GraduationCap,
  BookOpen,
  Library,
  FileText,
  HelpCircle,
  Video,
  ClipboardCheck,
  BarChart3,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  type?: "link"
  href: string
  label: string
  icon: LucideIcon
  matchPaths?: string[]
}

export interface NavDivider {
  type: "divider"
  label: string
}

export type NavEntry = NavItem | NavDivider

export const practiceSidebarNav: NavEntry[] = [
  { href: "/home", label: "হোম", icon: LayoutDashboard },
  { href: "/practice", label: "প্র্যাকটিস", icon: Swords, matchPaths: ["/practice", "/quiz"] },
  { href: "/progress", label: "অগ্রগতি", icon: TrendingUp },
  { href: "/vocabulary", label: "ভোকাবুলারি", icon: Brain },
  { href: "/leaderboard", label: "লিডারবোর্ড", icon: Trophy },
  { type: "divider", label: "অ্যাকাউন্ট" },
  { href: "/profile", label: "প্রোফাইল", icon: User },
  { href: "/archive", label: "আর্কাইভ", icon: Archive },
  { href: "/study-plan", label: "স্টাডি প্ল্যান", icon: CalendarRange },
  { href: "/current-affairs", label: "কারেন্ট অ্যাফেয়ার্স", icon: Globe2 },
  { href: "/feed", label: "ফিড", icon: Newspaper },
  { href: "/notifications", label: "নোটিফিকেশন", icon: Bell },
  { type: "divider", label: "আরও" },
  { href: "/shop", label: "শপ", icon: ShoppingBag },
  { href: "/settings", label: "সেটিংস", icon: Settings },
]

export const practiceBottomNav: NavItem[] = [
  { href: "/home", label: "হোম", icon: LayoutDashboard },
  { href: "/progress", label: "অগ্রগতি", icon: TrendingUp },
  { href: "/practice", label: "প্র্যাকটিস", icon: Swords, matchPaths: ["/practice", "/quiz"] },
  { href: "/vocabulary", label: "ভোকাব", icon: Brain },
  { href: "/more", label: "আরও", icon: MoreHorizontal },
]

export const learnSidebarNav: NavEntry[] = [
  { href: "/learn", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { href: "/learn/courses", label: "কোর্স", icon: BookOpen },
  { href: "/learn/my-courses", label: "আমার কোর্স", icon: GraduationCap },
  { type: "divider", label: "রিসোর্স" },
  { href: "/learn/resources", label: "রিসোর্স", icon: Library },
  { href: "/learn/notes", label: "নোটস", icon: FileText },
  { href: "/learn/qa", label: "প্রশ্ন-উত্তর", icon: HelpCircle },
  { href: "/learn/live-classes", label: "লাইভ ক্লাস", icon: Video },
  { href: "/learn/assignments", label: "অ্যাসাইনমেন্ট", icon: ClipboardCheck },
  { type: "divider", label: "অ্যাকাউন্ট" },
  { href: "/learn/progress", label: "অগ্রগতি", icon: BarChart3 },
  { href: "/profile", label: "প্রোফাইল", icon: User },
  { href: "/settings", label: "সেটিংস", icon: Settings },
]

export const learnBottomNav: NavItem[] = [
  { href: "/learn", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { href: "/learn/courses", label: "কোর্স", icon: BookOpen },
  { href: "/learn/my-courses", label: "আমার কোর্স", icon: GraduationCap },
  { href: "/learn/resources", label: "রিসোর্স", icon: Library },
  { href: "/more", label: "আরও", icon: Sparkles },
]
