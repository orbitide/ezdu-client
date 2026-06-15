"use client"

import { useEffect, useState } from "react"
import { getStormMessage } from "@/lib/utils/challenge"

interface ChallengeStormOverlayProps {
  streak: number
  onDone: () => void
}

interface RainStreak {
  left: number
  length: number
  opacity: number
  duration: number
  delay: number
}

function createRainStreaks(): RainStreak[] {
  return Array.from({ length: 50 }, () => ({
    left: Math.random() * 100,
    length: 10 + Math.random() * 22,
    opacity: 0.3 + Math.random() * 0.7,
    duration: 0.8 + Math.random() * 0.6,
    delay: Math.random() * 0.6,
  }))
}

export function ChallengeStormOverlay({ streak, onDone }: ChallengeStormOverlayProps) {
  const [message] = useState(() => getStormMessage(streak))
  const [rainStreaks] = useState(createRainStreaks)

  useEffect(() => {
    const timer = setTimeout(onDone, 2400)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 to-background/80" />

      {/* Rain */}
      {rainStreaks.map((streak_, index) => (
        <span
          key={index}
          className="animate-challenge-rain absolute top-0 w-px rounded-full bg-primary/60"
          style={
            {
              left: `${streak_.left}%`,
              height: `${streak_.length}px`,
              animationDuration: `${streak_.duration}s`,
              animationDelay: `${streak_.delay}s`,
              "--rain-opacity": streak_.opacity,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Lightning bolts */}
      <LightningBolt left={18} delay={0.24} />
      <LightningBolt left={72} delay={1.34} />

      {/* Screen flash */}
      <div className="animate-challenge-screen-flash absolute inset-0 bg-foreground/80" />

      {/* Message */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p
          className="animate-challenge-storm-text text-center text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl"
          style={{
            WebkitTextStroke: "8px var(--primary)",
            textShadow: "0 4px 24px color-mix(in oklch, var(--primary) 40%, transparent)",
          }}
        >
          <span className="text-background">{message}</span>
        </p>
      </div>
    </div>
  )
}

function LightningBolt({ left, delay }: { left: number; delay: number }) {
  return (
    <svg
      className="animate-challenge-lightning absolute top-0 h-2/3 w-24"
      style={{ left: `${left}%`, animationDelay: `${delay}s` }}
      viewBox="0 0 40 200"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M22 0 L8 90 L20 95 L4 200 L34 80 L20 76 L32 0 Z"
        stroke="var(--secondary)"
        strokeWidth="12"
        strokeOpacity="0.35"
        filter="blur(8px)"
      />
      <path d="M22 0 L8 90 L20 95 L4 200 L34 80 L20 76 L32 0 Z" stroke="var(--secondary)" strokeWidth="3" />
    </svg>
  )
}
