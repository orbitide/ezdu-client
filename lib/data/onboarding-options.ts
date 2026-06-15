export interface SegmentOption {
  id: string
  label: string
  description: string
}

export interface ClassOption {
  id: string
  label: string
  groups: GroupOption[]
}

export interface GroupOption {
  id: string
  label: string
}

export const segments: SegmentOption[] = [
  {
    id: "student",
    label: "শিক্ষার্থী",
    description: "SSC, HSC বা ভর্তি পরীক্ষার প্রস্তুতি",
  },
  {
    id: "job",
    label: "চাকরিপ্রার্থী",
    description: "BCS, ব্যাংক ও অন্যান্য প্রতিযোগিতামূলক পরীক্ষা",
  },
]

export const studentClasses: ClassOption[] = [
  {
    id: "ssc",
    label: "SSC (ক্লাস ৯-১০)",
    groups: [
      { id: "science", label: "বিজ্ঞান" },
      { id: "business", label: "ব্যবসায় শিক্ষা" },
      { id: "humanities", label: "মানবিক" },
    ],
  },
  {
    id: "hsc",
    label: "HSC (ক্লাস ১১-১২)",
    groups: [
      { id: "science", label: "বিজ্ঞান" },
      { id: "business", label: "ব্যবসায় শিক্ষা" },
      { id: "humanities", label: "মানবিক" },
    ],
  },
  {
    id: "admission",
    label: "ভর্তি পরীক্ষা",
    groups: [
      { id: "engineering", label: "ইঞ্জিনিয়ারিং" },
      { id: "medical", label: "মেডিকেল" },
      { id: "university", label: "সাধারণ বিশ্ববিদ্যালয়" },
    ],
  },
]

export const jobClasses: ClassOption[] = [
  {
    id: "bcs",
    label: "BCS",
    groups: [
      { id: "preliminary", label: "প্রিলিমিনারি" },
      { id: "written", label: "লিখিত" },
    ],
  },
  {
    id: "bank",
    label: "ব্যাংক জব",
    groups: [],
  },
  {
    id: "ielts",
    label: "IELTS / ভোকাবুলারি",
    groups: [],
  },
]
