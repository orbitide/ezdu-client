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
