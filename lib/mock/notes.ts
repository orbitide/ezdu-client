import type { Note } from "@/lib/types/note"

export const notes: Note[] = [
  {
    id: "note-1",
    title: "গতির সমীকরণ - সংক্ষিপ্ত নোট",
    subject: "পদার্থবিজ্ঞান",
    content: "v = u + at, s = ut + ½at², v² = u² + 2as - এই তিনটি সমীকরণ মনে রাখার জন্য u, v, a, s, t এর মধ্যে সম্পর্ক বোঝা গুরুত্বপূর্ণ।",
    lessonId: "lsn-phy-2-2",
    updatedAt: "১২ জুন, ২০২৬",
  },
  {
    id: "note-2",
    title: "জারণ-বিজারণ মনে রাখার কৌশল",
    subject: "রসায়ন",
    content: "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons)। এই কৌশল ব্যবহার করে জারণ-বিজারণ সহজে মনে রাখা যায়।",
    lessonId: "lsn-chem-1-1",
    updatedAt: "১০ জুন, ২০২৬",
  },
  {
    id: "note-3",
    title: "মঙ্গলকাব্যের তালিকা",
    subject: "বাংলা",
    content: "মনসামঙ্গল, চণ্ডীমঙ্গল (মুকুন্দরাম চক্রবর্তী), ধর্মমঙ্গল - এই তিনটি প্রধান মঙ্গলকাব্য পরীক্ষায় প্রায়ই আসে।",
    updatedAt: "৮ জুন, ২০২৬",
  },
]

export function getNoteById(id: string): Note | undefined {
  return notes.find((n) => n.id === id)
}
