import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { VocabDifficulty } from "@/lib/api/vocabulary"

export type Difficulty = "easy" | "medium" | "hard"

/*
 * Adapted from the Orbitide reference. The reference models vocabulary
 * difficulty as capitalized enums (Beginner/Intermediate/Advanced/Competitive);
 * our API returns lowercase values (see `lib/api/vocabulary.ts`), so this maps
 * ours rather than importing the reference's conflicting type system.
 *
 * `easy`/`medium` are shared between both unions and render identically, so
 * only `advanced`/`competitive` need vocabulary-specific handling.
 */

const styles: Record<Difficulty, string> = {
  easy: "bg-primary/15 text-primary",
  medium: "bg-amber-500/15 text-amber-400",
  hard: "bg-red-500/15 text-red-400",
}

const labels: Record<Difficulty, string> = {
  easy: "সহজ",
  medium: "মাঝারি",
  hard: "কঠিন",
}

const vocabOnly: Record<"advanced" | "competitive", { badge: Difficulty; label: string }> = {
  advanced: { badge: "hard", label: "কঠিন" },
  competitive: { badge: "hard", label: "প্রতিযোগিতামূলক" },
}

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty | VocabDifficulty
  className?: string
}) {
  const vocab = difficulty === "advanced" || difficulty === "competitive"
    ? vocabOnly[difficulty]
    : null

  const badgeDifficulty = vocab ? vocab.badge : (difficulty as Difficulty)
  const label = vocab ? vocab.label : labels[badgeDifficulty]

  return (
    <Badge variant="ghost" className={cn(styles[badgeDifficulty], className)}>
      {label}
    </Badge>
  )
}
