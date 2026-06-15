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
  { href: "/home", label: "Home", icon: LayoutDashboard },
  { href: "/practice", label: "Practice", icon: Swords, matchPaths: ["/practice", "/quiz"] },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/vocabulary", label: "Vocabulary", icon: Brain },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { type: "divider", label: "Account" },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/study-plan", label: "Study Plan", icon: CalendarRange },
  { href: "/current-affairs", label: "Current Affairs", icon: Globe2 },
  { href: "/feed", label: "Feed", icon: Newspaper },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { type: "divider", label: "More" },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/settings", label: "Settings", icon: Settings },
]

export const practiceBottomNav: NavItem[] = [
  { href: "/home", label: "Home", icon: LayoutDashboard },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/practice", label: "Practice", icon: Swords, matchPaths: ["/practice", "/quiz"] },
  { href: "/vocabulary", label: "Vocab", icon: Brain },
  { href: "/more", label: "More", icon: MoreHorizontal },
]

export const learnSidebarNav: NavEntry[] = [
  { href: "/learn", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn/courses", label: "Courses", icon: BookOpen },
  { href: "/learn/my-courses", label: "My Courses", icon: GraduationCap },
  { type: "divider", label: "Resources" },
  { href: "/learn/resources", label: "Resources", icon: Library },
  { href: "/learn/notes", label: "Notes", icon: FileText },
  { href: "/learn/qa", label: "Q&A", icon: HelpCircle },
  { href: "/learn/live-classes", label: "Live Classes", icon: Video },
  { href: "/learn/assignments", label: "Assignments", icon: ClipboardCheck },
  { type: "divider", label: "Account" },
  { href: "/learn/progress", label: "Progress", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
]

export const learnBottomNav: NavItem[] = [
  { href: "/learn", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn/courses", label: "Courses", icon: BookOpen },
  { href: "/learn/my-courses", label: "My Courses", icon: GraduationCap },
  { href: "/learn/resources", label: "Resources", icon: Library },
  { href: "/more", label: "More", icon: Sparkles },
]
