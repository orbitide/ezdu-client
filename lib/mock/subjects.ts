import type { Subject, Topic } from "@/lib/types/subject"

export const subjects: Subject[] = [
  { id: "physics", name: "পদার্থবিজ্ঞান", icon: "Atom", topicCount: 2, questionCount: 2 },
  { id: "chemistry", name: "রসায়ন", icon: "FlaskConical", topicCount: 1, questionCount: 2 },
  { id: "biology", name: "জীববিজ্ঞান", icon: "Leaf", topicCount: 1, questionCount: 2 },
  { id: "higher-math", name: "উচ্চতর গণিত", icon: "Sigma", topicCount: 1, questionCount: 3 },
  { id: "bangla", name: "বাংলা", icon: "BookOpen", topicCount: 1, questionCount: 3 },
  { id: "english", name: "ইংরেজি", icon: "Languages", topicCount: 1, questionCount: 3 },
]

export const topics: Topic[] = [
  { id: "motion-force", subjectId: "physics", name: "গতি ও বল", questionCount: 2 },
  { id: "redox", subjectId: "chemistry", name: "জারণ-বিজারণ", questionCount: 2 },
  { id: "cell-division", subjectId: "biology", name: "কোষ বিভাজন", questionCount: 2 },
  { id: "trigonometry", subjectId: "higher-math", name: "ত্রিকোণমিতি", questionCount: 3 },
  { id: "medieval-lit", subjectId: "bangla", name: "মধ্যযুগের সাহিত্য", questionCount: 3 },
  { id: "vocabulary", subjectId: "english", name: "ভোকাবুলারি", questionCount: 3 },
]
