"use client"

import { useEffect, useRef, useState } from "react"

export function useTimer(initialSeconds: number, options?: { countDown?: boolean; onExpire?: () => void }) {
  const countDown = options?.countDown ?? true
  const [seconds, setSeconds] = useState(initialSeconds)
  const onExpireRef = useRef(options?.onExpire)
  onExpireRef.current = options?.onExpire

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = countDown ? prev - 1 : prev + 1
        if (countDown && next <= 0) {
          clearInterval(interval)
          onExpireRef.current?.()
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [countDown])

  return seconds
}
