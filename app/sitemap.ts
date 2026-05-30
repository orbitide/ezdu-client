import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://ezdu.net";
    const now = new Date();

    const url = (
        path: string,
        priority: number,
        changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
    ) => ({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
    });

    const blogEntries = blogPosts.map((post) =>
        url(`/blog/${post.slug}`, 0.7, "monthly")
    );

    return [
        // ── Core ──────────────────────────────────────────
        url("/",        1.0, "weekly"),

        // ── Exam pages — high value ────────────────────────
        url("/ssc",     0.95, "monthly"),
        url("/hsc",     0.95, "monthly"),
        url("/bcs",     0.95, "monthly"),
        url("/ielts",   0.9,  "monthly"),

        // ── Blog ──────────────────────────────────────────
        url("/blog",    0.7,  "weekly"),
        ...blogEntries,

        // ── Supporting ────────────────────────────────────
        url("/faq",     0.55, "monthly"),
        url("/about",   0.5,  "yearly"),
        url("/career",  0.5,  "monthly"),
        url("/contact", 0.4,  "monthly"),

        // ── Legal ─────────────────────────────────────────
        url("/privacy-policy", 0.3, "yearly"),
        url("/terms",          0.3, "yearly"),
        url("/cookies",        0.3, "yearly"),
    ];
}
