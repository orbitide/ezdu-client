import type { ActivityDay, SubjectMastery } from "@/lib/types/progress"

export const weeklyActivity: ActivityDay[] = [
  { date: "2026-06-09", label: "সোম", questionsAnswered: 12 },
  { date: "2026-06-10", label: "মঙ্গল", questionsAnswered: 18 },
  { date: "2026-06-11", label: "বুধ", questionsAnswered: 8 },
  { date: "2026-06-12", label: "বৃহস্পতি", questionsAnswered: 22 },
  { date: "2026-06-13", label: "শুক্র", questionsAnswered: 15 },
  { date: "2026-06-14", label: "শনি", questionsAnswered: 26 },
  { date: "2026-06-15", label: "রবি", questionsAnswered: 10 },
]

export const subjectMastery: SubjectMastery[] = [
  {
    subjectId: "physics",
    subjectName: "পদার্থবিজ্ঞান",
    accuracy: 72,
    questionsAnswered: 48,
    topics: [
      { topicId: "motion-force", topicName: "গতি ও বল", accuracy: 72, questionsAnswered: 48 },
    ],
  },
  {
    subjectId: "chemistry",
    subjectName: "রসায়ন",
    accuracy: 58,
    questionsAnswered: 36,
    topics: [
      { topicId: "redox", topicName: "জারণ-বিজারণ", accuracy: 58, questionsAnswered: 36 },
    ],
  },
  {
    subjectId: "biology",
    subjectName: "জীববিজ্ঞান",
    accuracy: 81,
    questionsAnswered: 40,
    topics: [
      { topicId: "cell-division", topicName: "কোষ বিভাজন", accuracy: 81, questionsAnswered: 40 },
    ],
  },
  {
    subjectId: "higher-math",
    subjectName: "উচ্চতর গণিত",
    accuracy: 65,
    questionsAnswered: 54,
    topics: [
      { topicId: "trigonometry", topicName: "ত্রিকোণমিতি", accuracy: 65, questionsAnswered: 54 },
    ],
  },
  {
    subjectId: "bangla",
    subjectName: "বাংলা",
    accuracy: 90,
    questionsAnswered: 30,
    topics: [
      { topicId: "medieval-lit", topicName: "মধ্যযুগের সাহিত্য", accuracy: 90, questionsAnswered: 30 },
    ],
  },
  {
    subjectId: "english",
    subjectName: "ইংরেজি",
    accuracy: 76,
    questionsAnswered: 42,
    topics: [
      { topicId: "vocabulary", topicName: "ভোকাবুলারি", accuracy: 76, questionsAnswered: 42 },
    ],
  },
]
