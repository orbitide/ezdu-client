import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { getBreadcrumbJsonLd } from '@/lib/jsonld';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return {};
    return buildMetadata(`blog/${post.slug}`, {
        title: post.title,
        description: post.metaDescription,
        keywords: post.keywords,
    });
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) notFound();

    const breadcrumb = getBreadcrumbJsonLd(`blog/${post.slug}`, post.title);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <div className="min-h-screen surface-page px-4 pb-24 pt-ez-below-nav-lg">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-muted-foreground transition-colors mb-10"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        সব আর্টিকেল
                    </Link>

                    <div className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
                            <span className="rounded-full border border-border bg-muted/80 px-2.5 py-0.5 text-primary">
                                {post.category}
                            </span>
                            <span>{post.date}</span>
                            <span className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                                    <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.3" />
                                    <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                            {post.title}
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
                            {post.excerpt}
                        </p>
                    </div>

                    <hr className="border-border mb-8" />

                    <article className="prose-custom space-y-5">
                        {post.sections.map((section, i) => {
                            if (section.type === 'paragraph') {
                                return (
                                    <p key={i} className="text-muted-foreground leading-relaxed">
                                        {section.content as string}
                                    </p>
                                );
                            }
                            if (section.type === 'heading') {
                                return (
                                    <h2 key={i} className="text-xl font-semibold text-foreground mt-10 mb-2">
                                        {section.content as string}
                                    </h2>
                                );
                            }
                            if (section.type === 'list') {
                                return (
                                    <ul key={i} className="space-y-2 pl-1">
                                        {(section.content as string[]).map((item, j) => (
                                            <li key={j} className="flex gap-3 text-muted-foreground">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }
                            if (section.type === 'tip') {
                                return (
                                    <div
                                        key={i}
                                        className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4"
                                    >
                                        <p className="text-sm font-semibold text-primary mb-1">টিপস</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {section.content as string}
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </article>

                    <div className="mt-16 rounded-xl border border-border bg-card/70 p-6 text-center">
                        <p className="text-muted-foreground mb-4 text-sm">
                            EzDu অ্যাপ দিয়ে AI-চালিত প্র্যাকটিস শুরু করো — বিনামূল্যে।
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center text-sm">
                            <Link
                                href="/ssc"
                                className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                            >
                                SSC প্রস্তুতি
                            </Link>
                            <Link
                                href="/hsc"
                                className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:border-blue-400/40 hover:text-blue-400 transition-colors"
                            >
                                HSC প্রস্তুতি
                            </Link>
                            <Link
                                href="/bcs"
                                className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:border-purple-400/40 hover:text-purple-400 transition-colors"
                            >
                                BCS প্রস্তুতি
                            </Link>
                            <Link
                                href="/ielts"
                                className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:border-amber-400/40 hover:text-amber-400 transition-colors"
                            >
                                IELTS প্রস্তুতি
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
