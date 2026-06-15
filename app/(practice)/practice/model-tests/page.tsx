import { ModelTestCard } from "@/components/practice/model-test-card"
import { StreakTracker } from "@/components/practice/streak-tracker"
import { modelTests } from "@/lib/mock/model-tests"

export default function ModelTestsPage() {
  return (
    <div className="space-y-4">
      <StreakTracker />
      <div className="space-y-3">
        {modelTests.map((modelTest) => (
          <ModelTestCard key={modelTest.id} modelTest={modelTest} />
        ))}
      </div>
    </div>
  )
}
