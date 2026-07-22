import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = buildMetadata('blog', {
    title: 'Blog',
    description:
        'SSC, HSC, BCS ও IELTS প্রস্তুতির টিপস, পরীক্ষার কৌশল এবং EzDu পণ্য আপডেট — বাংলাদেশের শিক্ষার্থীদের জন্য।',
    keywords: [
        'EzDu blog',
        'SSC study tips Bangladesh',
        'BCS preparation guide',
        'IELTS tips Bangladesh',
        'exam preparation Bangladesh blog',
    ],
});

export default function BlogPage() {
    return (
        <div className="min-h-screen surface-page px-4 pb-20 pt-ez-below-nav-lg">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground tracking-tight mb-3">
                    EzDu <span className="text-primary">blog</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                    SSC, HSC, BCS ও IELTS প্রস্তুতির ব্যবহারিক টিপস, পরীক্ষার কৌশল এবং পণ্য আপডেট।
                </p>

                <ul className="space-y-8">
                    {blogPosts.map((post) => (
                        <li key={post.slug}>
                            <article className="scroll-mt-ez-nav rounded-xl surface-raised surface-raised-hover p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                                    <span className="rounded-full border border-border bg-muted/80 px-2.5 py-0.5 text-primary">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                    <span className="text-muted-foreground">·</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary transition-colors"
                                >
                                    পড়ো
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                                        <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
