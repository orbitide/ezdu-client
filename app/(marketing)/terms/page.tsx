import type { Metadata } from "next";
import { LegalNotice } from "@/components/legal-notice";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("terms", {
    title: "Terms of Service",
    description:
        "Terms of Service for EZDU: rules for using our learning platform, accounts, content, and limitations of liability.",
    keywords: ["EZDU terms", "terms of service", "user agreement"],
});

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-muted/40 px-4 pb-20 pt-ez-below-nav-lg">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">Terms of Service</h1>
                <p className="text-sm text-muted-foreground mb-10">
                    Effective date: April 30, 2026 · These Terms govern your use of EZDU&apos;s Services.
                </p>

                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance</h2>
                        <p>
                            By creating an account, downloading our apps, or using ezdu.net and related properties, you
                            agree to these Terms and our Privacy Policy. EZDU&apos;s Services are intended for users in Bangladesh.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">2. The Services</h2>
                        <p>
                            EZDU provides educational software including practice questions, mock tests, analytics, and
                            optional AI-generated explanations. Features may vary by platform, region, or subscription
                            tier. We may modify, suspend, or discontinue parts of the Services with reasonable notice
                            where practicable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">3. Accounts</h2>
                        <p>
                            You must provide accurate registration information and keep your credentials confidential.
                            You are responsible for activity under your account. Notify us immediately at hello@ezdu.net
                            if you suspect unauthorized access. We may suspend accounts that violate these Terms or
                            pose a security risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">4. Subscriptions and fees</h2>
                        <p>
                            Some features require payment. Prices, billing cycles, and taxes are shown at checkout.
                            Subscriptions renew automatically until cancelled in accordance with the store or payment
                            method you used (e.g. bKash, Google Play or App Store rules apply to in-app purchases). Refunds,
                            if any, follow the policy of the payment provider or applicable law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">5. Acceptable use</h2>
                        <p className="mb-2">You agree not to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Copy, scrape, resell, or redistribute our content or software except as expressly allowed.</li>
                            <li>Reverse engineer, circumvent security, or probe the Services in ways that could harm others.</li>
                            <li>Upload malware, harass others, or use the Services for unlawful purposes.</li>
                            <li>Misrepresent your identity or manipulate rankings, streaks, or leaderboards dishonestly.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">6. Intellectual property</h2>
                        <p>
                            EZDU and its licensors own the Services, branding, question banks, software, and documentation.
                            You receive a limited, non-exclusive, non-transferable license to use the Services for
                            personal, non-commercial learning unless we agree otherwise in writing. Feedback you provide
                            may be used by us without obligation to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">7. Third-party content</h2>
                        <p>
                            The Services may link to third-party sites or rely on curriculum materials aligned to public
                            exam syllabi. We are not responsible for third-party content or stores&apos; terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">8. Disclaimers</h2>
                        <p>
                            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM
                            EXTENT PERMITTED BY LAW, EZDU DISCLAIMS WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                            PARTICULAR PURPOSE, AND NON-INFRINGEMENT. EZDU does not guarantee exam outcomes; results
                            depend on many factors outside our control.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">9. Limitation of liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, EZDU AND ITS AFFILIATES WILL NOT BE LIABLE
                            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS,
                            DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICES. OUR AGGREGATE LIABILITY FOR CLAIMS
                            RELATING TO THE SERVICES IN ANY TWELVE-MONTH PERIOD IS LIMITED TO THE GREATER OF (A) THE
                            AMOUNT YOU PAID US FOR THE SERVICES IN THAT PERIOD OR (B) USD $50, EXCEPT WHERE LIABILITY
                            CANNOT BE LIMITED BY LAW (SUCH AS DEATH OR PERSONAL INJURY CAUSED BY NEGLIGENCE WHERE
                            APPLICABLE).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">10. Indemnity</h2>
                        <p>
                            You will defend and indemnify EZDU against claims arising from your misuse of the Services or
                            violation of these Terms, to the extent permitted by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">11. Termination</h2>
                        <p>
                            You may stop using the Services at any time. We may suspend or terminate access if you breach
                            these Terms or if we discontinue the product. Provisions that by nature should survive
                            (including intellectual property, disclaimers, and limitations) will survive termination.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">12. Governing law and disputes</h2>
                        <p>
                            These Terms are governed by the laws of Bangladesh, without regard to conflict-of-law
                            principles. Courts in Dhaka, Bangladesh, shall have exclusive jurisdiction, subject to
                            mandatory consumer protections in your country of residence where they cannot be waived.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">13. Contact</h2>
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
