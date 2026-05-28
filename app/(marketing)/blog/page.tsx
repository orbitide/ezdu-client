import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("blog", {
    title: "Blog",
    description:
        "Study tips, exam prep ideas, and EzDu product updates for students and parents in Bangladesh.",
    keywords: ["EzDu blog", "SSC study tips", "exam preparation Bangladesh"],
});

const posts = [
    {
        slug: "ssc-math-practice-routine",
        title: "Building a realistic SSC math practice routine",
        date: "February 12, 2026",
        category: "Study tips",
        excerpt:
            "Short daily sessions beat marathon cramming. We break down a 30-minute structure that pairs EzDu daily tests with review of mistakes, based on how successful students use the app in Bangladesh.",
    },
    {
        slug: "mock-tests-before-board-exams",
        title: "How to use mock tests in the last 4 weeks before board exams",
        date: "January 28, 2026",
        category: "Exam prep",
        excerpt:
            "Mock tests are most useful when they mirror exam conditions. Learn when to switch from topic practice to full papers, and how to read your EzDu analytics to plug gaps instead of repeating what you already know.",
    },
    {
        slug: "ai-explanations-how-we-think-about-them",
        title: "Behind EzDu: how we think about AI explanations",
        date: "January 8, 2026",
        category: "Product",
        excerpt:
            "Our goal is not to replace teachers but to give you step-by-step reasoning when you are studying alone. Here is how we prompt and review explanation quality for national curriculum–aligned questions.",
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen surface-page px-4 pb-20 pt-ez-below-nav-lg">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
                    EzDu <span className="text-emerald-400">blog</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-12 max-w-2xl">
                    Practical study ideas, exam prep notes, and product updates for students and parents in Bangladesh.
                </p>

                <ul className="space-y-10">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <article
                                id={post.slug}
                                className="scroll-mt-ez-nav rounded-xl surface-raised surface-raised-hover p-6 md:p-8"
                            >
                                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 mb-3">
                                    <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-emerald-400">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                                    {post.title}
                                </h2>
                                <p className="text-zinc-400 leading-relaxed mb-4">{post.excerpt}</p>
                                <Link
                                    href={`/blog#${post.slug}`}
                                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                                >
                                    Read more (full article coming soon)
                                </Link>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
