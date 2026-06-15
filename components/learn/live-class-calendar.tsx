import { LiveClassCard } from "@/components/learn/live-class-card"
import { liveClasses } from "@/lib/mock/live-classes"

export function LiveClassCalendar() {
  return (
    <div className="space-y-3">
      {liveClasses.map((liveClass) => (
        <LiveClassCard key={liveClass.id} liveClass={liveClass} />
      ))}
    </div>
  )
}
