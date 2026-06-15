import type { QaQuestion } from "@/lib/types/qa"

export const qaQuestions: QaQuestion[] = [
  {
    id: "qa-1",
    title: "নিউটনের তৃতীয় সূত্র বাস্তব জীবনে কীভাবে কাজ করে?",
    body: "আমি নিউটনের তৃতীয় সূত্র বুঝি কিন্তু বাস্তব উদাহরণ দিয়ে বুঝতে চাই। কেউ কি সহজ উদাহরণ দিয়ে ব্যাখ্যা করতে পারবে?",
    subject: "পদার্থবিজ্ঞান",
    author: "rafiul_ahmed",
    timeAgo: "২ ঘণ্টা আগে",
    answerCount: 2,
    lessonId: "lsn-phy-2-3",
    answers: [
      {
        id: "ans-1",
        author: "শিক্ষক - তানিয়া",
        body: "একটি সহজ উদাহরণ: যখন তুমি দেয়ালে হাত দিয়ে চাপ দাও, দেয়ালও তোমার হাতে সমান ও বিপরীত বল প্রয়োগ করে। এ কারণেই তুমি ব্যথা অনুভব করো। নৌকা থেকে নদীতে ঝাঁপ দিলে নৌকা পেছনে চলে যায় - এটিও তৃতীয় সূত্রের উদাহরণ।",
        timeAgo: "১ ঘণ্টা আগে",
        accepted: true,
      },
      {
        id: "ans-2",
        author: "samira_islam",
        body: "রকেট উৎক্ষেপণও এই সূত্রের একটি বড় উদাহরণ - জ্বালানি গ্যাস পেছনে ছোড়া হয়, রকেট সামনে এগিয়ে যায়।",
        timeAgo: "৩০ মিনিট আগে",
      },
    ],
  },
  {
    id: "qa-2",
    title: "তড়িৎ বিশ্লেষণ এবং গ্যালভানিক কোষের পার্থক্য কী?",
    body: "দুটোই তো তড়িৎ রসায়নের অংশ, কিন্তু পার্থক্য বুঝতে সমস্যা হচ্ছে।",
    subject: "রসায়ন",
    author: "tanvir_hossain",
    timeAgo: "৫ ঘণ্টা আগে",
    answerCount: 1,
    lessonId: "lsn-chem-1-2",
    answers: [
      {
        id: "ans-3",
        author: "শিক্ষক - করিম",
        body: "গ্যালভানিক কোষে স্বতঃস্ফূর্ত বিক্রিয়া থেকে বিদ্যুৎ উৎপন্ন হয় (যেমন ব্যাটারি)। তড়িৎ বিশ্লেষণে বাহির থেকে বিদ্যুৎ প্রবাহ দিয়ে অ-স্বতঃস্ফূর্ত বিক্রিয়া ঘটানো হয় (যেমন ইলেক্ট্রোপ্লেটিং)।",
        timeAgo: "৪ ঘণ্টা আগে",
        accepted: true,
      },
    ],
  },
  {
    id: "qa-3",
    title: "ত্রিকোণমিতিক সমীকরণের সাধারণ সমাধান বের করার নিয়ম কী?",
    body: "sinθ = sinα টাইপের সমীকরণ সমাধান করতে গিয়ে nπ + (-1)ⁿα কোথা থেকে আসে বুঝতে পারছি না।",
    subject: "উচ্চতর গণিত",
    author: "samira_islam",
    timeAgo: "১ দিন আগে",
    answerCount: 0,
    lessonId: "lsn-math-1-3",
    answers: [],
  },
]

export function getQaQuestionById(id: string): QaQuestion | undefined {
  return qaQuestions.find((q) => q.id === id)
}
