import type { Assignment } from "@/lib/types/assignment"

export const assignments: Assignment[] = [
  {
    id: "asg-1",
    title: "গতিবিদ্যা: সমস্যা সমাধান অ্যাসাইনমেন্ট",
    subject: "পদার্থবিজ্ঞান",
    courseId: "course-physics-hsc",
    description: "অধ্যায় ২ এর গতির সমীকরণ সংক্রান্ত ৫টি সমস্যা সমাধান করে জমা দাও।",
    dueDate: "১৮ জুন, ২০২৬",
    status: "pending",
  },
  {
    id: "asg-2",
    title: "তড়িৎ রসায়ন রিপোর্ট",
    subject: "রসায়ন",
    courseId: "course-chemistry-hsc",
    description: "গ্যালভানিক কোষ ও তড়িৎ বিশ্লেষণ নিয়ে একটি সংক্ষিপ্ত প্রতিবেদন লেখো।",
    dueDate: "১২ জুন, ২০২৬",
    status: "graded",
    grade: "৯/১০",
    feedback: "খুব সুন্দর বিশ্লেষণ! তড়িৎকোষের গঠন আরও বিস্তারিত লিখলে সম্পূর্ণ নম্বর পেতে।",
  },
  {
    id: "asg-3",
    title: "মধ্যযুগের সাহিত্য - তুলনামূলক আলোচনা",
    subject: "বাংলা",
    courseId: "course-bangla-ssc",
    description: "বৈষ্ণব পদাবলি এবং মঙ্গলকাব্যের মধ্যে তুলনামূলক আলোচনা লেখো।",
    dueDate: "২০ জুন, ২০২৬",
    status: "submitted",
  },
]

export function getAssignmentById(id: string): Assignment | undefined {
  return assignments.find((a) => a.id === id)
}
