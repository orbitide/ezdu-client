import type { ReactNode } from "react"

export function TwoColumnShell({
  children,
  right,
}: {
  children: ReactNode
  right: ReactNode
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">{children}</div>
      <div className="space-y-6">{right}</div>
    </div>
  )
}
