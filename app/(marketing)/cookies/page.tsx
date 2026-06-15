import type { Metadata } from "next";
import { LegalNotice } from "@/components/legal-notice";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("cookies", {
    title: "Cookie Policy",
    description:
        "EZDU cookie policy: what cookies and similar technologies we use and how you can control them.",
    keywords: ["EZDU cookies", "cookie policy", "tracking"],
});

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-muted/40 px-4 pb-20 pt-ez-below-nav-lg">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">Cookie Policy</h1>
                <p className="text-sm text-muted-foreground mb-10">Effective date: April 30, 2026</p>

                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">1. What are cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device when you visit a website. Similar
                            technologies include local storage and pixels. They help the site remember preferences,
                            keep you signed in, measure traffic, and improve performance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">2. How EZDU uses cookies</h2>
                        <p className="mb-3">On ezdu.net and related web properties we use:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong className="text-foreground">Essential cookies</strong> — required for security,
                                load balancing, cookie consent storage, and basic navigation.
                            </li>
                            <li>
                                <strong className="text-foreground">Analytics cookies</strong> — to understand aggregate
                                usage (e.g. which pages are viewed, approximate region). If you use Vercel Analytics or
                                similar, those vendors may set cookies or use other identifiers as described in their
                                documentation.
                            </li>
                            <li>
                                <strong className="text-foreground">Preference cookies</strong> — remember choices such as
                                language where we offer that feature.
                            </li>
                        </ul>
                        <p className="mt-3">
                            Our mobile apps use equivalent on-device storage (e.g. secure tokens) under the same
                            principles described in our Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">3. Cookies (illustrative)</h2>
                        <div className="overflow-x-auto rounded-lg border border-border">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-card text-foreground">
                                    <tr>
                                        <th className="p-3 font-medium">Name</th>
                                        <th className="p-3 font-medium">Purpose</th>
                                        <th className="p-3 font-medium">Typical duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="p-3 font-mono text-xs text-muted-foreground">ezdu_session</td>
                                        <td className="p-3">Keeps you logged in on the web app</td>
                                        <td className="p-3">Session or 7 days</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-mono text-xs text-muted-foreground">cookie_consent</td>
                                        <td className="p-3">Stores your cookie choices</td>
                                        <td className="p-3">12 months</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-mono text-xs text-muted-foreground">va_* (Google Analytics)</td>
                                        <td className="p-3">Anonymous page views and Web Vitals</td>
                                        <td className="p-3">Per vendor policy</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Actual names may differ by deployment; this table illustrates typical categories.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">4. Managing cookies</h2>
                        <p>
                            You can block or delete cookies through your browser settings. Blocking essential cookies may
                            break login or security features. For analytics, you can use browser &quot;Do Not Track&quot;
                            settings where supported, though not all tools honor DNT. We may add a consent banner on web
                            properties that offer granular opt-in for non-essential cookies where required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">5. Updates</h2>
                        <p>
                            We may update this Cookie Policy when we change tools or legal requirements. Check the
                            effective date at the top of this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">6. Contact</h2>
                        <p>
                            <a href="mailto:hello@ezdu.net" className="text-primary hover:text-primary/80">
                                hello@ezdu.net
                            </a>
                        </p>
                    </section>
                </div>

                <LegalNotice />
            </div>
        </div>
    );
}
