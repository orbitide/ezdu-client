"use client"

import { useEffect } from "react"
import { usePurchaseStore } from "@/lib/stores/purchaseStore"

export function PurchaseHydrator() {
  const hydrate = usePurchaseStore(s => s.hydrate)
  useEffect(() => { hydrate() }, [hydrate])
  return null
}
