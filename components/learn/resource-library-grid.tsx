import { ResourceCard } from "@/components/learn/resource-card"
import { resources } from "@/lib/mock/resources"

export function ResourceLibraryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  )
}
