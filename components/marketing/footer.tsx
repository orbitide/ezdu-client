'use client';

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    const footerLinks = {
        ফিচার: [
            { title: 'কুইজ ব্যাংক', link: '/#features' },
            { title: 'মক টেস্ট', link: '/#features' },
            { title: 'দৈনিক চ্যালেঞ্জ', link: '/#features' },
            { title: 'লিডারবোর্ড', link: '/#features' },
        ],
        এক্সপ্লোর: [
            { title: 'প্র্যাকটিস', link: '/practice' },
            { title: 'ভোকাবুলারি', link: '/vocabulary' },
            { title: 'লিডারবোর্ড', link: '/leaderboard' },
            { title: 'স্টাডি প্ল্যান', link: '/study-plan' },
        ],
        অ্যাকাউন্ট: [
            { title: 'লগ ইন', link: '/login' },
            { title: 'অ্যাকাউন্ট তৈরি করো', link: '/register' },
        ],
    };

    const legalLinks = [
        { title: 'Privacy Policy', link: '/privacy-policy' },
        { title: 'Terms of Service', link: '/terms' },
        { title: 'Cookie Policy', link: '/cookies' },
    ];

    const socialLinks = [
        {
            link: 'https://www.facebook.com/ezdu.net',
            label: 'Facebook',
            path: 'M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0 0 22 12Z',
        },
        {
            link: 'https://www.instagram.com/ezdu.bd/',
            label: 'Instagram',
            path: 'M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.78.22 2.42.46.66.25 1.22.6 1.78 1.16.5.5.85 1.04 1.16 1.78.24.64.4 1.36.46 2.42.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.78-.46 2.42a4.93 4.93 0 0 1-1.16 1.78c-.5.5-1.04.85-1.78 1.16-.64.24-1.36.4-2.42.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.78-.22-2.42-.46a4.93 4.93 0 0 1-1.78-1.16 4.93 4.93 0 0 1-1.16-1.78c-.24-.64-.4-1.36-.46-2.42C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.78.46-2.42.25-.66.6-1.22 1.16-1.78a4.93 4.93 0 0 1 1.78-1.16c.64-.24 1.36-.4 2.42-.46C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.74-.34.35-.56.68-.74 1.14-.13.35-.3.88-.34 1.85C3.84 9.01 3.83 9.33 3.83 12s.01 2.99.06 4.04c.04.97.2 1.5.34 1.85.18.46.4.79.74 1.14.35.34.68.56 1.14.74.35.13.88.3 1.85.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.97-.04 1.5-.2 1.85-.34.46-.18.79-.4 1.14-.74.34-.35.56-.68.74-1.14.13-.35.3-.88.34-1.85.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.97-.2-1.5-.34-1.85a3.13 3.13 0 0 0-.74-1.14 3.13 3.13 0 0 0-1.14-.74c-.35-.13-.88-.3-1.85-.34C14.99 3.84 14.67 3.83 12 3.83Zm0 3.07a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm5.3-3.27a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z',
        },
    ];

    const year = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-10">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-3">
                            <Image alt="EZDU logo" src="/logo-rounded.png" width={40} height={32} />
                            <span className="text-2xl font-bold text-foreground tracking-tight">
                                EZDU
                            </span>
                        </Link>

                        <p className="text-muted-foreground text-sm mb-4">
                            SSC, HSC, ভর্তি ও চাকরির পরীক্ষার প্রস্তুতি একসাথে।
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-ring transition"
                                >
                                    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-foreground mb-3">{category}</h4>
                            <ul className="space-y-2 text-sm">
                                {links.map(({ title, link }) => (
                                    <li key={title}>
                                        <Link
                                            href={link}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {year} EZDU. সর্বস্বত্ব সংরক্ষিত।</p>

                    <ul className="flex gap-4 flex-wrap justify-center">
                        {legalLinks.map(({ title, link }) => (
                            <li key={title}>
                                <Link
                                    href={link}
                                    className="hover:text-primary transition-colors"
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
