export type Session = {
  isLoggedIn: boolean
  user: {
    id: string
    name: string
    email: string
    avatar: string
    role: string
    xp: number
    streak: number
    joinedAt: string
  }
}

export type OnboardingState = {
  completed: boolean
  preferredClass: "ssc" | "hsc" | "olympiad" | "ielts" | "job" | "skills" | null
}

export type StudyGoalState = {
  hasGoal: boolean
  goalText: string | null
  dailyMinutes: number | null
  createdAt: string | null
}

import type { Enrollment, Order, ActiveSubscription } from "@/lib/types/purchase"

function read<T>(key: string): T | null {
  try {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

const KEYS = {
  session: "ezdu_session",
  onboarding: "ezdu_onboarding",
  studyGoal: "ezdu_study_goal",
  enrollments: "ezdu_enrollments",
  subscriptions: "ezdu_subscriptions",
  purchaseHistory: "ezdu_purchase_history",
  savedCourses: "ezdu_saved_courses",
  invoiceCounter: "ezdu_invoice_counter",
}

export const getSession = () => read<Session>(KEYS.session)
export const saveSession = (s: Session) => write(KEYS.session, s)
export const clearSession = () => {
  try { localStorage.removeItem(KEYS.session) } catch {}
}

export const getOnboarding = () => read<OnboardingState>(KEYS.onboarding)
export const saveOnboarding = (s: OnboardingState) => write(KEYS.onboarding, s)

export const getStudyGoal = () => read<StudyGoalState>(KEYS.studyGoal)
export const saveStudyGoal = (s: StudyGoalState) => write(KEYS.studyGoal, s)

export const getEnrollments = (): Enrollment[] => read<Enrollment[]>(KEYS.enrollments) ?? []
export const saveEnrollments = (v: Enrollment[]) => write(KEYS.enrollments, v)

export const getSubscriptions = (): ActiveSubscription[] => read<ActiveSubscription[]>(KEYS.subscriptions) ?? []
export const saveSubscriptions = (v: ActiveSubscription[]) => write(KEYS.subscriptions, v)

export const getPurchaseHistory = (): Order[] => read<Order[]>(KEYS.purchaseHistory) ?? []
export const savePurchaseHistory = (v: Order[]) => write(KEYS.purchaseHistory, v)

export const getSavedCourses = (): string[] => read<string[]>(KEYS.savedCourses) ?? []
export const saveSavedCourses = (v: string[]) => write(KEYS.savedCourses, v)

export const getInvoiceCounter = (): number => read<number>(KEYS.invoiceCounter) ?? 0
export const saveInvoiceCounter = (v: number) => write(KEYS.invoiceCounter, v)
