import type { Difficulty } from "@/components/shared/difficulty-badge"

export type VocabDifficulty = Difficulty

export interface VocabWord {
  id: string
  word: string
  meaning: string
  example: string
  synonyms: string[]
  antonyms: string[]
  difficulty: VocabDifficulty
  bookmarked: boolean
}

export interface VocabModeInfo {
  id: "flashcards" | "word-match" | "fill-gaps" | "synonym-antonym"
  title: string
  description: string
  icon: string
}
