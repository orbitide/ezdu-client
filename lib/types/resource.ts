export type ResourceType = "pdf" | "cheat-sheet" | "formula-sheet" | "past-paper"

export interface Resource {
  id: string
  title: string
  type: ResourceType
  subject: string
  description: string
  pageCount: number
}
