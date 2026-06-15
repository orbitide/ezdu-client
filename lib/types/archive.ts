export type ArchiveGlobalUnitSlug = "unit-a" | "unit-b" | "unit-c"

export interface ArchiveNode {
  id: string
  subjectId: string
  parentId?: string
  name: string
  examIds?: string[]
  globalUnitSlug?: ArchiveGlobalUnitSlug
}

export interface ArchiveExam {
  id: string
  title: string
  examGroup: string
  year: number
  board: string
  questionCount: number
  durationMinutes: number
  xpReward: number
  coinReward: number
  attempted: boolean
}

export type ArchiveInstituteType = "school_college" | "university"

export interface ArchiveInstitute {
  id: string
  name: string
  type: ArchiveInstituteType
}

export interface ArchiveInstituteUnit {
  id: string
  instituteId: string
  name: string
  globalUnitSlug?: ArchiveGlobalUnitSlug
}
