"use client"

import { create } from "zustand"
import type { Enrollment, Order, ActiveSubscription } from "@/lib/types/purchase"
import {
  getEnrollments,
  getSubscriptions,
  getPurchaseHistory,
  getSavedCourses,
} from "@/lib/storage"

type PurchaseStore = {
  enrollments: Enrollment[]
  subscriptions: ActiveSubscription[]
  purchaseHistory: Order[]
  savedCourses: string[]

  hydrate: () => void
  isEnrolled: (classId: string) => boolean
  hasActiveSubscriptionFor: (level: string) => boolean
  isSaved: (classId: string) => boolean

  addEnrollment: (e: Enrollment) => void
  addSubscriptions: (subs: ActiveSubscription[]) => void
  addOrder: (o: Order) => void
  setSavedCourses: (ids: string[]) => void
}

export const usePurchaseStore = create<PurchaseStore>((set, get) => ({
  enrollments: [],
  subscriptions: [],
  purchaseHistory: [],
  savedCourses: [],

  hydrate() {
    set({
      enrollments: getEnrollments(),
      subscriptions: getSubscriptions(),
      purchaseHistory: getPurchaseHistory(),
      savedCourses: getSavedCourses(),
    })
  },

  isEnrolled(classId) {
    return get().enrollments.some(e => e.classId === classId)
  },

  hasActiveSubscriptionFor(level) {
    const now = new Date().toISOString()
    return get().subscriptions.some(
      s => s.status === "active" && s.endDate > now && s.classLevel === level
    )
  },

  isSaved(classId) {
    return get().savedCourses.includes(classId)
  },

  addEnrollment(e) {
    set(s => ({ enrollments: [...s.enrollments, e] }))
  },

  addSubscriptions(subs) {
    set(s => ({ subscriptions: [...s.subscriptions, ...subs] }))
  },

  addOrder(o) {
    set(s => ({ purchaseHistory: [...s.purchaseHistory, o] }))
  },

  setSavedCourses(ids) {
    set({ savedCourses: ids })
  },
}))
