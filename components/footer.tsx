'use client';

import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    const footerLinks = {
        Exams: [
            { title: 'SSC প্রস্তুতি', link: '/ssc' },
            { title: 'HSC প্রস্তুতি', link: '/hsc' },
            { title: 'BCS প্রস্তুতি', link: '/bcs' },
            { title: 'IELTS প্রস্তুতি', link: '/ielts' },
        ],
        Support: [
            { title: 'Help Center', link: '/contact' },
            { title: 'FAQs', link: '/faq' },
            { title: 'Contact Us', link: '/contact' },
            { title: 'Community', link: '/contact' },
        ],
        Company: [
            { title: 'About Us', link: '/about' },
            { title: 'Careers', link: '/career' },
            { title: 'Blog', link: '/blog' },
            { title: 'Vocabulary', link: '/vocabulary' },
        ],
    };

    const legalLinks = [
        { title: 'Privacy Policy', link: '/privacy-policy' },
        { title: 'Terms of Service', link: '/terms' },
        { title: 'Cookie Policy', link: '/cookies' },
    ];

    const socialLinks = [
        { icon: Facebook, link: 'https://www.facebook.com/ezdu.net', label: 'Facebook' },
        { icon: Instagram, link: 'https://www.instagram.com/ezdu.bd/', label: 'Instagram' },
    ];

    const year = new Date().getFullYear();

    return (
        <footer className="surface-page border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-10">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-3">
                            <Image alt="EzDu logo" src="/logo_rounded.png" width={40} height={32} />
                            <span className="text-2xl font-bold text-foreground tracking-tight">
                                EzDu
                            </span>
                        </Link>

                        <p className="text-muted-foreground text-sm mb-4">
                            Free learning for smarter exam preparation.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-border transition"
                                >
                                    <social.icon size={18} />
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

                <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {year} EzDu. All rights reserved.</p>

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
