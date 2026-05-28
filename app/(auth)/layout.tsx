import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-12">
            <Link href="/" className="mb-8 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-black font-bold text-lg">
                    E
                </div>
                <span className="text-xl font-bold text-zinc-100">Ezdu</span>
            </Link>
            <div className="w-full max-w-sm">
                {children}
            </div>
        </div>
    );
}
