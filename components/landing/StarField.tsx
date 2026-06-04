"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  radius: number
  baseOpacity: number
  phase: number
  speed: number
  isGlow: boolean
}

function generateStars(width: number, height: number, count: number): Star[] {
  return Array.from({ length: count }, () => {
    const radius = Math.random() < 0.75
      ? 0.15 + Math.random() * 0.35
      : 0.45 + Math.random() * 0.55
    return {
      x: Math.random() * width,
      y: Math.random() * height * 0.82,
      radius,
      baseOpacity: 0.25 + Math.random() * 0.75,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.02,
      isGlow: radius > 0.75,
    }
  })
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    if (!canvas) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext("2d")!
    if (!ctx) return

    let stars: Star[] = []
    let rafId = 0

    function resize() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      stars = generateStars(w, h, 320)
    }

    function tick() {
      const w = canvas.width
      const h = canvas.height

      ctx.fillStyle = "#010609"
      ctx.fillRect(0, 0, w, h)

      // Atmospheric emerald haze at top
      const atmo = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, w * 0.65)
      atmo.addColorStop(0, "rgba(64,200,140,0.08)")
      atmo.addColorStop(1, "rgba(64,200,140,0)")
      ctx.fillStyle = atmo
      ctx.fillRect(0, 0, w, h)

      for (const s of stars) {
        s.phase += s.speed
        const opacity = Math.min(1, Math.max(0.05, s.baseOpacity + Math.sin(s.phase) * 0.35))

        if (s.isGlow) {
          const glowR = s.radius * (5 + Math.random() * 2)
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
          glow.addColorStop(0, `rgba(200,225,255,${opacity * 0.35})`)
          glow.addColorStop(1, "rgba(200,225,255,0)")
          ctx.beginPath()
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = s.baseOpacity > 0.7
          ? `rgba(255,248,235,${opacity})`
          : `rgba(210,225,255,${opacity})`
        ctx.fill()
      }

      // Horizon — sky fades into deep sea
      const seaStart = h * 0.62
      const horizon = ctx.createLinearGradient(0, seaStart, 0, h)
      horizon.addColorStop(0,   "rgba(1, 8, 18, 0)")
      horizon.addColorStop(0.4, "rgba(0, 18, 40, 0.55)")
      horizon.addColorStop(0.75,"rgba(0, 22, 50, 0.88)")
      horizon.addColorStop(1,   "rgba(0, 14, 35, 0.97)")
      ctx.fillStyle = horizon
      ctx.fillRect(0, seaStart, w, h - seaStart)

      // Subtle glowing horizon line
      const lineY = h * 0.78
      const lineGlow = ctx.createLinearGradient(0, lineY - 12, 0, lineY + 14)
      lineGlow.addColorStop(0,   "rgba(30, 140, 210, 0)")
      lineGlow.addColorStop(0.45,"rgba(40, 160, 230, 0.12)")
      lineGlow.addColorStop(0.55,"rgba(40, 160, 230, 0.12)")
      lineGlow.addColorStop(1,   "rgba(30, 140, 210, 0)")
      ctx.fillStyle = lineGlow
      ctx.fillRect(0, lineY - 12, w, 26)

      rafId = requestAnimationFrame(tick)
    }

    resize()
    rafId = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
