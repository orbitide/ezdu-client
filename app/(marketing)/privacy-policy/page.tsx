import type { Metadata } from "next";
import { LegalNotice } from "@/components/legal-notice";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("privacy-policy", {
    title: "Privacy Policy",
    description:
        "How EZDU collects, uses, and protects your personal data when you use our website and apps.",
    keywords: ["EZDU privacy", "data protection", "privacy policy Bangladesh"],
});

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-muted/40 px-4 pb-20 pt-ez-below-nav-lg">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground mb-10">
                    Effective date: April 30, 2026 · Operator: EZDU (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                </p>

                <div className="space-y-8 text-muted-foreground leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">1. Scope</h2>
                        <p>
                            This Privacy Policy describes how EZDU collects, uses, stores, and shares information when you
                            use our mobile applications, websites, and related services (collectively, the
                            &quot;Services&quot;). By using the Services, you agree to this Policy. If you do not agree,
                            please do not use the Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">2. Information we collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong className="text-foreground">Account data:</strong> name, email address or phone
                                number, password hash and profile details you choose to provide.
                            </li>
                            <li>
                                <strong className="text-foreground">Learning activity:</strong> subjects, topics, questions
                                attempted, scores, time spent, streaks, achievements.
                            </li>
                            <li>
                                <strong className="text-foreground">Device and technical data:</strong> device type, OS, app version, and crash reports.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">3. How we use information</h2>
                        <p className="mb-2">We use the information above to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide, personalize, and improve the Services (e.g. difficulty adaptation, recommendations).</li>
                            <li>Communicate with you about updates, security, and support.</li>
                            <li>Measure engagement, fix bugs, and develop new features.</li>
                            <li>Comply with law, enforce our Terms, and detect abuse or fraud.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">4. Legal bases (where applicable)</h2>
                        <p>
                            If you are in a jurisdiction that requires a legal basis (for example, the GDPR), we rely on
                            contract performance, legitimate interests (such as securing the Services and improving
                            them), consent where required (e.g. certain marketing or non-essential cookies), and legal
                            obligation where applicable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">5. Sharing of information</h2>
                        <p>
                            <strong className="text-foreground">We do not share your personal information with anyone.</strong>{" "}
                            Your data stays with EZDU and is never sold, rented, or disclosed to third parties for any commercial purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">6. Retention</h2>
                        <p>
                            We keep account and learning data while your account is active and for a reasonable period
                            afterward for backup, dispute resolution, and legal compliance. Technical logs may be kept
                            for shorter periods. You may request deletion subject to exceptions (e.g. legal holds).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">7. Security</h2>
                        <p>
                            We use administrative, technical, and organizational measures designed to protect
                            information (encryption in transit, access controls, monitoring). No method of transmission
                            or storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">8. Children&apos;s privacy</h2>
                        <p>
                            EZDU is intended for learners. If you are a parent or guardian and believe a child has
                            provided us with information without appropriate consent, contact us at <strong className="text-foreground">hello@ezdu.net</strong> and
                            we will take steps to delete it where required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">9. Your rights</h2>
                        <p>
                            Depending on your location, you may have rights to access, correct, delete, or export your
                            data, or to object to or restrict certain processing. Contact <strong className="text-foreground">hello@ezdu.net</strong> to exercise
                            these rights. You may also have the right to complain to a data protection authority.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">10. International transfers</h2>
                        <p>
                            EZDU operates entirely within Bangladesh. Your data is stored and processed in Bangladesh only — we do not transfer your personal information to other countries.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">11. Changes</h2>
                        <p>
                            We may update this Policy from time to time. We will post the revised version with a new
                            effective date and, where appropriate, notify you in-app or by email.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact</h2>
                        <p>
                            Questions about this Privacy Policy:{" "}
                            <a href="mailto:hello@ezdu.net" className="text-primary hover:text-primary/80">
                                hello@ezdu.net
                            </a>
                            <br />
                            Mailing address : EZDU, Rangpur, Bangladesh.
                        </p>
                    </section>
                </div>

                <LegalNotice />
            </div>
        </div>
    );
}
