import type { Metadata, Viewport } from "next";
import { Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { getRootJsonLd } from "@/lib/jsonld";
import { AuthProvider } from "@/components/auth-provider";

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
    weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'Ezdu — Pocket Learning Companion',

    description: 'AI-powered exam prep for SSC, HSC, BCS, and IELTS — built for Bangladeshi students. Practice MCQs, take model tests, and track your progress. Free to start.',
    alternates: {
        canonical: 'https://ezdu.net',
    },

    icons: {
        icon: [
            { url: '/logo.png' },
            // { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
        ],
    },

    keywords: [
        'practice exams',
        'study materials',
        "SSC exam preparation",
        "HSC model test",
        "Class 6 MCQ practice",
        "Class 7 exam",
        "Class 8 questions",
        "BCS preparation",
        "Bank job preparation",
        "Govt job preparation",
        "SSC HSC previous questions",
        "IELTS Preparation",
        "IELTS Mock Test"
    ],
    // Favicons are served via `app/icon.tsx` and `app/apple-icon.tsx`
    openGraph: {
        title: 'Ezdu — Pocket Learning Companion',
        description: 'The best platform to learn and practice. AI-powered exam prep, mock tests, and study tools.',
        url: 'https://ezdu.net',
        siteName: 'Ezdu',
        images: [
            {
                url: 'https://ezdu.net/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'EzDu — Pocket Learning Companion',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ezdu — Pocket Learning Companion',
        description: 'AI-powered exam prep for SSC, HSC, BCS, and IELTS — built for Bangladeshi students. Practice MCQs, take model tests, and track your progress.',
        images: ['https://ezdu.net/opengraph-image'],
    },
    metadataBase: new URL('https://ezdu.net'),
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    // Matches `--background` in app/globals.css (oklch(0.16 0.01 150)).
    themeColor: '#151a17',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="bn" className={`${fredoka.variable} ${geistMono.variable} h-full antialiased`}>
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(getRootJsonLd())}}
            />
        </head>
        <body className="min-h-full flex flex-col">
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
