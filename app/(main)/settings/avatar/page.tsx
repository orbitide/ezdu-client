'use client';

import { ArrowLeft, Smile } from 'lucide-react';
import Link from 'next/link';

export default function AvatarSettingsPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <Link href="/settings" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-lg font-bold text-zinc-100">অ্যাভাটার</h1>
            </div>

            <div className="flex flex-col items-center justify-center py-20 gap-4 rounded-xl border border-zinc-800 bg-zinc-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                    <Smile size={32} className="text-purple-400" />
                </div>
                <p className="text-sm font-medium text-zinc-300">অ্যাভাটার বিল্ডার</p>
                <p className="text-xs text-zinc-600">শীঘ্রই আসছে</p>
            </div>
        </div>
    );
}
