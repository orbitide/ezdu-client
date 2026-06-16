import type { StudyPlan, SubjectRotation, LessonOption } from "@/lib/types/study-plan"

export const mockStudyPlan: StudyPlan = {
  id: "plan-001",
  mode: "auto",
  duration: 7,
  dailyMinutes: 45,
  status: "active",
  createdAt: "2026-06-10T08:00:00Z",
  expiresAt: "2026-06-17T23:59:59Z",
  days: [
    {
      dayNumber: 1,
      date: "2026-06-10",
      dailyMinutes: 45,
      items: [
        { lessonId: "l1", lessonName: "গতি ও বল", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", date: "2026-06-10", dayNumber: 1, status: "completed", lessonMasteryPercent: 72, durationMinutes: 15 },
        { lessonId: "l2", lessonName: "জারণ-বিজারণ", subjectId: "chemistry", subjectName: "রসায়ন", date: "2026-06-10", dayNumber: 1, status: "completed", lessonMasteryPercent: 58, durationMinutes: 15 },
        { lessonId: "l3", lessonName: "কোষ বিভাজন", subjectId: "biology", subjectName: "জীববিজ্ঞান", date: "2026-06-10", dayNumber: 1, status: "completed", lessonMasteryPercent: 81, durationMinutes: 15 },
      ],
    },
    {
      dayNumber: 2,
      date: "2026-06-11",
      dailyMinutes: 45,
      items: [
        { lessonId: "l4", lessonName: "ত্রিকোণমিতি", subjectId: "math", subjectName: "উচ্চতর গণিত", date: "2026-06-11", dayNumber: 2, status: "completed", lessonMasteryPercent: 65, durationMinutes: 15 },
        { lessonId: "l5", lessonName: "ভোকাবুলারি", subjectId: "english", subjectName: "ইংরেজি", date: "2026-06-11", dayNumber: 2, status: "completed", lessonMasteryPercent: 76, durationMinutes: 15 },
        { lessonId: "l6", lessonName: "মধ্যযুগের সাহিত্য", subjectId: "bangla", subjectName: "বাংলা", date: "2026-06-11", dayNumber: 2, status: "completed", lessonMasteryPercent: 90, durationMinutes: 15 },
      ],
    },
    {
      dayNumber: 3,
      date: "2026-06-12",
      dailyMinutes: 45,
      items: [
        { lessonId: "l7", lessonName: "তাপ ও তাপগতিবিদ্যা", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", date: "2026-06-12", dayNumber: 3, status: "completed", lessonMasteryPercent: 55, durationMinutes: 15 },
        { lessonId: "l8", lessonName: "এসিড-ক্ষার", subjectId: "chemistry", subjectName: "রসায়ন", date: "2026-06-12", dayNumber: 3, status: "completed", lessonMasteryPercent: 48, durationMinutes: 15 },
        { lessonId: "l9", lessonName: "উদ্ভিদ শারীরতত্ত্ব", subjectId: "biology", subjectName: "জীববিজ্ঞান", date: "2026-06-12", dayNumber: 3, status: "completed", lessonMasteryPercent: 63, durationMinutes: 15 },
      ],
    },
    {
      dayNumber: 4,
      date: "2026-06-13",
      dailyMinutes: 45,
      items: [
        { lessonId: "l10", lessonName: "ক্যালকুলাস", subjectId: "math", subjectName: "উচ্চতর গণিত", date: "2026-06-13", dayNumber: 4, status: "completed", lessonMasteryPercent: 42, durationMinutes: 15 },
        { lessonId: "l11", lessonName: "গ্রামার - ক্রিয়া", subjectId: "english", subjectName: "ইংরেজি", date: "2026-06-13", dayNumber: 4, status: "completed", lessonMasteryPercent: 70, durationMinutes: 15 },
        { lessonId: "l12", lessonName: "ছন্দ ও অলংকার", subjectId: "bangla", subjectName: "বাংলা", date: "2026-06-13", dayNumber: 4, status: "completed", lessonMasteryPercent: 85, durationMinutes: 15 },
      ],
    },
    {
      dayNumber: 5,
      date: "2026-06-14",
      dailyMinutes: 45,
      items: [
        { lessonId: "l13", lessonName: "আলো ও আলোর প্রতিফলন", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", date: "2026-06-14", dayNumber: 5, status: "completed", lessonMasteryPercent: 60, durationMinutes: 15 },
        { lessonId: "l14", lessonName: "পর্যায় সারণি", subjectId: "chemistry", subjectName: "রসায়ন", date: "2026-06-14", dayNumber: 5, status: "completed", lessonMasteryPercent: 73, durationMinutes: 15 },
        { lessonId: "l15", lessonName: "প্রাণীর শ্রেণিবিন্যাস", subjectId: "biology", subjectName: "জীববিজ্ঞান", date: "2026-06-14", dayNumber: 5, status: "completed", lessonMasteryPercent: 68, durationMinutes: 15 },
      ],
    },
    {
      dayNumber: 6,
      date: "2026-06-15",
      dailyMinutes: 45,
      items: [
        { lessonId: "l16", lessonName: "ভেক্টর বীজগণিত", subjectId: "math", subjectName: "উচ্চতর গণিত", date: "2026-06-15", dayNumber: 6, status: "completed", lessonMasteryPercent: 50, durationMinutes: 15 },
        { lessonId: "l17", lessonName: "Reading Comprehension", subjectId: "english", subjectName: "ইংরেজি", date: "2026-06-15", dayNumber: 6, status: "completed", lessonMasteryPercent: 78, durationMinutes: 15 },
        { lessonId: "l18", lessonName: "গল্প - আহ্বান", subjectId: "bangla", subjectName: "বাংলা", date: "2026-06-15", dayNumber: 6, status: "completed", lessonMasteryPercent: 88, durationMinutes: 15 },
      ],
    },
    {
      dayNumber: 7,
      date: "2026-06-16",
      dailyMinutes: 45,
      items: [
        { lessonId: "l19", lessonName: "বিদ্যুৎ ও চুম্বক", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", date: "2026-06-16", dayNumber: 7, status: "pending", lessonMasteryPercent: 40, durationMinutes: 15 },
        { lessonId: "l20", lessonName: "জৈব রসায়ন", subjectId: "chemistry", subjectName: "রসায়ন", date: "2026-06-16", dayNumber: 7, status: "pending", lessonMasteryPercent: 35, durationMinutes: 15 },
        { lessonId: "l21", lessonName: "বাস্তুসংস্থান", subjectId: "biology", subjectName: "জীববিজ্ঞান", date: "2026-06-16", dayNumber: 7, status: "pending", lessonMasteryPercent: 52, durationMinutes: 15 },
      ],
    },
  ],
}

export const availableLessons: LessonOption[] = [
  { lessonId: "l1", lessonName: "গতি ও বল", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", masteryPercent: 72 },
  { lessonId: "l7", lessonName: "তাপ ও তাপগতিবিদ্যা", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", masteryPercent: 55 },
  { lessonId: "l13", lessonName: "আলো ও আলোর প্রতিফলন", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", masteryPercent: 60 },
  { lessonId: "l19", lessonName: "বিদ্যুৎ ও চুম্বক", subjectId: "physics", subjectName: "পদার্থবিজ্ঞান", masteryPercent: 40 },
  { lessonId: "l2", lessonName: "জারণ-বিজারণ", subjectId: "chemistry", subjectName: "রসায়ন", masteryPercent: 58 },
  { lessonId: "l8", lessonName: "এসিড-ক্ষার", subjectId: "chemistry", subjectName: "রসায়ন", masteryPercent: 48 },
  { lessonId: "l14", lessonName: "পর্যায় সারণি", subjectId: "chemistry", subjectName: "রসায়ন", masteryPercent: 73 },
  { lessonId: "l20", lessonName: "জৈব রসায়ন", subjectId: "chemistry", subjectName: "রসায়ন", masteryPercent: 35 },
  { lessonId: "l3", lessonName: "কোষ বিভাজন", subjectId: "biology", subjectName: "জীববিজ্ঞান", masteryPercent: 81 },
  { lessonId: "l9", lessonName: "উদ্ভিদ শারীরতত্ত্ব", subjectId: "biology", subjectName: "জীববিজ্ঞান", masteryPercent: 63 },
  { lessonId: "l15", lessonName: "প্রাণীর শ্রেণিবিন্যাস", subjectId: "biology", subjectName: "জীববিজ্ঞান", masteryPercent: 68 },
  { lessonId: "l21", lessonName: "বাস্তুসংস্থান", subjectId: "biology", subjectName: "জীববিজ্ঞান", masteryPercent: 52 },
  { lessonId: "l4", lessonName: "ত্রিকোণমিতি", subjectId: "math", subjectName: "উচ্চতর গণিত", masteryPercent: 65 },
  { lessonId: "l10", lessonName: "ক্যালকুলাস", subjectId: "math", subjectName: "উচ্চতর গণিত", masteryPercent: 42 },
  { lessonId: "l16", lessonName: "ভেক্টর বীজগণিত", subjectId: "math", subjectName: "উচ্চতর গণিত", masteryPercent: 50 },
  { lessonId: "l5", lessonName: "ভোকাবুলারি", subjectId: "english", subjectName: "ইংরেজি", masteryPercent: 76 },
  { lessonId: "l11", lessonName: "গ্রামার - ক্রিয়া", subjectId: "english", subjectName: "ইংরেজি", masteryPercent: 70 },
  { lessonId: "l17", lessonName: "Reading Comprehension", subjectId: "english", subjectName: "ইংরেজি", masteryPercent: 78 },
  { lessonId: "l6", lessonName: "মধ্যযুগের সাহিত্য", subjectId: "bangla", subjectName: "বাংলা", masteryPercent: 90 },
  { lessonId: "l12", lessonName: "ছন্দ ও অলংকার", subjectId: "bangla", subjectName: "বাংলা", masteryPercent: 85 },
  { lessonId: "l18", lessonName: "গল্প - আহ্বান", subjectId: "bangla", subjectName: "বাংলা", masteryPercent: 88 },
]

export const subjectRotation: SubjectRotation[] = [
  { day: "রবিবার", subjects: ["পদার্থবিজ্ঞান", "রসায়ন"] },
  { day: "সোমবার", subjects: ["জীববিজ্ঞান", "উচ্চতর গণিত"] },
  { day: "মঙ্গলবার", subjects: ["বাংলা", "ইংরেজি"] },
  { day: "বুধবার", subjects: ["পদার্থবিজ্ঞান", "জীববিজ্ঞান"] },
  { day: "বৃহস্পতিবার", subjects: ["রসায়ন", "উচ্চতর গণিত"] },
  { day: "শুক্রবার", subjects: ["রিভিশন", "মডেল টেস্ট"] },
  { day: "শনিবার", subjects: ["বাংলা", "ইংরেজি", "কারেন্ট অ্যাফেয়ার্স"] },
]
