import type { ArchiveExam, ArchiveGlobalUnitSlug, ArchiveInstitute, ArchiveInstituteUnit, ArchiveNode } from "@/lib/types/archive"

export const archiveInstitutes: ArchiveInstitute[] = [
  { id: "notre-dame", name: "নটর ডেম কলেজ", type: "school_college" },
  { id: "viqarunnisa", name: "ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ", type: "school_college" },
  { id: "holy-cross", name: "হলি ক্রস কলেজ", type: "school_college" },
  { id: "dhaka-college", name: "ঢাকা কলেজ", type: "school_college" },
  { id: "dhaka-university", name: "ঢাকা বিশ্ববিদ্যালয়", type: "university" },
]

export const archiveInstituteUnits: ArchiveInstituteUnit[] = [
  { id: "du-unit-a", instituteId: "dhaka-university", name: "ইউনিট এ", globalUnitSlug: "unit-a" },
  { id: "du-unit-b", instituteId: "dhaka-university", name: "ইউনিট বি", globalUnitSlug: "unit-b" },
  { id: "du-unit-c", instituteId: "dhaka-university", name: "ইউনিট সি", globalUnitSlug: "unit-c" },
]

export const archiveNodes: ArchiveNode[] = [
  // physics
  { id: "phy-academic", subjectId: "physics", name: "একাডেমিক" },
  { id: "phy-academic-mcq", subjectId: "physics", parentId: "phy-academic", name: "এমসিকিউ" },
  { id: "phy-academic-mcq-b1", subjectId: "physics", parentId: "phy-academic-mcq", name: "বোর্ড ১ / প্রতিষ্ঠান ১", examIds: ["arch-1"] },
  { id: "phy-academic-cq", subjectId: "physics", parentId: "phy-academic", name: "সৃজনশীল", examIds: ["arch-7"] },

  { id: "phy-main-book", subjectId: "physics", name: "মেইন বুক" },
  { id: "phy-main-writer1", subjectId: "physics", parentId: "phy-main-book", name: "হাজারী নাথ", examIds: ["arch-8"] },
  { id: "phy-main-writer2", subjectId: "physics", parentId: "phy-main-book", name: "তমালিকা", examIds: [] },

  { id: "phy-engineering", subjectId: "physics", name: "ইঞ্জিনিয়ারিং", examIds: ["arch-9"] },
  { id: "phy-medical", subjectId: "physics", name: "মেডিকেল", examIds: [] },
  { id: "phy-unit-a", subjectId: "physics", name: "ইউনিট এ", globalUnitSlug: "unit-a" },

  // bangla
  { id: "ban-mcq", subjectId: "bangla", name: "এমসিকিউ" },
  { id: "ban-mcq-b1", subjectId: "bangla", parentId: "ban-mcq", name: "বোর্ড ১ / প্রতিষ্ঠান ১", examIds: ["arch-4"] },
  { id: "ban-mcq-b2", subjectId: "bangla", parentId: "ban-mcq", name: "বোর্ড ২ / প্রতিষ্ঠান ২", examIds: [] },

  { id: "ban-cq", subjectId: "bangla", name: "সৃজনশীল" },
  { id: "ban-cq-b1", subjectId: "bangla", parentId: "ban-cq", name: "বোর্ড ১ / প্রতিষ্ঠান ১", examIds: ["arch-5"] },
  { id: "ban-cq-b2", subjectId: "bangla", parentId: "ban-cq", name: "বোর্ড ২ / প্রতিষ্ঠান ২", examIds: ["arch-6"] },
]

export const archiveExams: ArchiveExam[] = [
  {
    id: "arch-1",
    title: "এইচএসসি পরীক্ষা ২০২৪",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2024,
    board: "ঢাকা বোর্ড",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 180,
    coinReward: 90,
    attempted: true,
  },
  {
    id: "arch-2",
    title: "এইচএসসি পরীক্ষা ২০২৩",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2023,
    board: "রাজশাহী বোর্ড",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 180,
    coinReward: 90,
    attempted: false,
  },
  {
    id: "arch-3",
    title: "এইচএসসি পরীক্ষা ২০২২",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2022,
    board: "চট্টগ্রাম বোর্ড",
    questionCount: 10,
    durationMinutes: 30,
    xpReward: 180,
    coinReward: 90,
    attempted: false,
  },
  {
    id: "arch-4",
    title: "এসএসসি পরীক্ষা ২০২৪",
    examGroup: "এসএসসি",
    year: 2024,
    board: "ঢাকা বোর্ড",
    questionCount: 10,
    durationMinutes: 25,
    xpReward: 150,
    coinReward: 75,
    attempted: false,
  },
  {
    id: "arch-5",
    title: "ইউনিট এ সৃজনশীল প্রশ্নপত্র ২০২৩",
    examGroup: "ভর্তি পরীক্ষা",
    year: 2023,
    board: "ঢাকা বোর্ড",
    questionCount: 8,
    durationMinutes: 40,
    xpReward: 160,
    coinReward: 80,
    attempted: false,
  },
  {
    id: "arch-6",
    title: "ইউনিট বি প্রশ্নপত্র ২০২৩",
    examGroup: "ভর্তি পরীক্ষা",
    year: 2023,
    board: "চট্টগ্রাম বোর্ড",
    questionCount: 10,
    durationMinutes: 25,
    xpReward: 150,
    coinReward: 75,
    attempted: false,
  },
  {
    id: "arch-7",
    title: "একাডেমিক সৃজনশীল প্রশ্নপত্র ২০২৩",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2023,
    board: "রাজশাহী বোর্ড",
    questionCount: 8,
    durationMinutes: 45,
    xpReward: 200,
    coinReward: 100,
    attempted: false,
  },
  {
    id: "arch-8",
    title: "হাজারী নাথ মেইন বুক প্রশ্নপত্র",
    examGroup: "এইচএসসি বিজ্ঞান",
    year: 2024,
    board: "ঢাকা বোর্ড",
    questionCount: 12,
    durationMinutes: 35,
    xpReward: 180,
    coinReward: 90,
    attempted: false,
  },
  {
    id: "arch-9",
    title: "ইঞ্জিনিয়ারিং ভর্তি প্রশ্নপত্র ২০২৩",
    examGroup: "ভর্তি পরীক্ষা",
    year: 2023,
    board: "ঢাকা বোর্ড",
    questionCount: 15,
    durationMinutes: 50,
    xpReward: 220,
    coinReward: 110,
    attempted: false,
  },
  {
    id: "arch-10",
    title: "ইউনিট এ ভর্তি পরীক্ষা ২০২৩",
    examGroup: "ভর্তি পরীক্ষা",
    year: 2023,
    board: "ঢাকা বিশ্ববিদ্যালয়",
    questionCount: 20,
    durationMinutes: 60,
    xpReward: 250,
    coinReward: 125,
    attempted: false,
  },
  {
    id: "arch-11",
    title: "ইউনিট বি ভর্তি পরীক্ষা ২০২৩",
    examGroup: "ভর্তি পরীক্ষা",
    year: 2023,
    board: "ঢাকা বিশ্ববিদ্যালয়",
    questionCount: 20,
    durationMinutes: 60,
    xpReward: 250,
    coinReward: 125,
    attempted: false,
  },
]

export const archiveExamsBySubjectFallback: Record<string, string[]> = {
  chemistry: ["arch-2"],
  biology: ["arch-3"],
}

export const archiveExamInstitutes: Record<string, string> = {
  "arch-1": "notre-dame",
  "arch-2": "viqarunnisa",
  "arch-3": "holy-cross",
  "arch-4": "dhaka-college",
  "arch-5": "dhaka-college",
  "arch-6": "holy-cross",
  "arch-7": "viqarunnisa",
  "arch-8": "notre-dame",
  "arch-9": "dhaka-college",
  "arch-10": "dhaka-university",
  "arch-11": "dhaka-university",
}

export const archiveExamInstituteUnits: Record<string, string> = {
  "arch-10": "du-unit-a",
  "arch-11": "du-unit-b",
}

export function getArchiveExamById(id: string): ArchiveExam | undefined {
  return archiveExams.find((exam) => exam.id === id)
}

export function getArchiveExamsByInstitute(instituteId: string): ArchiveExam[] {
  return archiveExams.filter((exam) => archiveExamInstitutes[exam.id] === instituteId)
}

export function getArchiveInstituteUnits(instituteId: string): ArchiveInstituteUnit[] {
  return archiveInstituteUnits.filter((unit) => unit.instituteId === instituteId)
}

export function getArchiveExamsByInstituteUnit(unitId: string): ArchiveExam[] {
  return archiveExams.filter((exam) => archiveExamInstituteUnits[exam.id] === unitId)
}

export function getArchiveExamsByGlobalUnitSlug(slug: ArchiveGlobalUnitSlug): ArchiveExam[] {
  const unitIds = new Set(
    archiveInstituteUnits.filter((unit) => unit.globalUnitSlug === slug).map((unit) => unit.id)
  )
  return archiveExams.filter((exam) => {
    const unitId = archiveExamInstituteUnits[exam.id]
    return unitId !== undefined && unitIds.has(unitId)
  })
}

export function getArchiveNodeChildren(subjectId: string, parentId?: string): ArchiveNode[] {
  return archiveNodes.filter((node) => node.subjectId === subjectId && node.parentId === parentId)
}

export function getArchiveNodeById(nodeId: string): ArchiveNode | undefined {
  return archiveNodes.find((node) => node.id === nodeId)
}

export function getArchiveExamsForNode(node: ArchiveNode): ArchiveExam[] {
  if (node.globalUnitSlug) {
    return getArchiveExamsByGlobalUnitSlug(node.globalUnitSlug)
  }
  return (node.examIds ?? []).map(getArchiveExamById).filter((exam): exam is ArchiveExam => !!exam)
}

export function countArchiveExamsForSubject(subjectId: string): number {
  const treeCount = archiveNodes
    .filter((node) => node.subjectId === subjectId)
    .reduce((sum, node) => sum + (node.examIds?.length ?? 0), 0)
  const fallbackCount = (archiveExamsBySubjectFallback[subjectId] ?? []).length
  return treeCount + fallbackCount
}
