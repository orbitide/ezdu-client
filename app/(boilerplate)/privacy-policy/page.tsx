import type { Metadata } from "next";
import { LegalNotice } from "@/components/legal-notice";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("privacy-policy", {
    title: "Privacy Policy",
    description:
        "How EzDu collects, uses, and protects your personal data when you use our website and apps.",
    keywords: ["EzDu privacy", "data protection", "privacy policy Bangladesh"],
});

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen surface-page px-4 pb-20 pt-ez-below-nav-lg">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Privacy Policy</h1>
                <p className="text-sm text-zinc-500 mb-10">
                    Effective date: April 30, 2026 · Operator: EzDu (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                </p>

                <div className="space-y-8 text-zinc-400 leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">1. Scope</h2>
                        <p>
                            This Privacy Policy describes how EzDu collects, uses, stores, and shares information when you
                            use our mobile applications, websites, and related services (collectively, the
                            &quot;Services&quot;). By using the Services, you agree to this Policy. If you do not agree,
                            please do not use the Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">2. Information we collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong className="text-zinc-300">Account data:</strong> name, email address or phone
                                number, password hash, profile details you choose to provide, and parent/guardian
                                contact where required for minors.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Learning activity:</strong> subjects, topics, questions
                                attempted, scores, time spent, streaks, achievements, and messages you send through in-app
                                support.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Device and technical data:</strong> device type,
                                operating system, app version, language, approximate location derived from IP (for
                                fraud prevention and localization), crash logs, and diagnostic events.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Payments:</strong> if you purchase a subscription,
                                our payment processor receives card or wallet details; EzDu typically receives a
                                transaction ID, plan, and subscription status—not your full card number.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">3. How we use information</h2>
                        <p className="mb-2">We use the information above to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide, personalize, and improve the Services (e.g. difficulty adaptation, recommendations).</li>
                            <li>Operate AI-powered explanations and question flows tied to your curriculum level.</li>
                            <li>Communicate with you about updates, security, and support.</li>
                            <li>Measure engagement, fix bugs, and develop new features.</li>
                            <li>Comply with law, enforce our Terms, and detect abuse or fraud.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">4. Legal bases (where applicable)</h2>
                        <p>
                            If you are in a jurisdiction that requires a legal basis (for example, the GDPR), we rely on
                            contract performance, legitimate interests (such as securing the Services and improving
                            them), consent where required (e.g. certain marketing or non-essential cookies), and legal
                            obligation where applicable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">5. Sharing of information</h2>
                        <p className="mb-2">We may share information with:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong className="text-zinc-300">Service providers</strong> who host data, send email or
                                SMS, process payments, or provide analytics—under contracts that limit use to providing
                                services to us.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Professional advisers</strong> where required (e.g.
                                auditors, lawyers).
                            </li>
                            <li>
                                <strong className="text-zinc-300">Authorities</strong> if we believe disclosure is
                                required by law or to protect rights, safety, or security.
                            </li>
                        </ul>
                        <p className="mt-2">
                            We do not sell your personal information to third parties in the traditional sense. We may use
                            aggregated or de-identified data that cannot reasonably identify you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">6. Retention</h2>
                        <p>
                            We keep account and learning data while your account is active and for a reasonable period
                            afterward for backup, dispute resolution, and legal compliance. Technical logs may be kept
                            for shorter periods. You may request deletion subject to exceptions (e.g. legal holds).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">7. Security</h2>
                        <p>
                            We use administrative, technical, and organizational measures designed to protect
                            information (encryption in transit, access controls, monitoring). No method of transmission
                            or storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">8. Children&apos;s privacy</h2>
                        <p>
                            EzDu is intended for learners. If you are a parent or guardian and believe a child has
                            provided us with information without appropriate consent, contact us at hello@ezdu.net and
                            we will take steps to delete it where required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">9. Your rights</h2>
                        <p>
                            Depending on your location, you may have rights to access, correct, delete, or export your
                            data, or to object to or restrict certain processing. Contact hello@ezdu.net to exercise
                            these rights. You may also have the right to complain to a data protection authority.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">10. International transfers</h2>
                        <p>
                            We may process data in Bangladesh and other countries where we or our providers operate.
                            Where required, we use appropriate safeguards for cross-border transfers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">11. Changes</h2>
                        <p>
                            We may update this Policy from time to time. We will post the revised version with a new
                            effective date and, where appropriate, notify you in-app or by email.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">12. Contact</h2>
                        <p>
                            Questions about this Privacy Policy:{" "}
                            <a href="mailto:hello@ezdu.net" className="text-emerald-400 hover:text-emerald-300">
                                hello@ezdu.net
                            </a>
                            <br />
                            Mailing address : EzDu, Rangpur, Bangladesh.
                        </p>
                    </section>
                </div>

                <LegalNotice />
            </div>
        </div>
    );
}
