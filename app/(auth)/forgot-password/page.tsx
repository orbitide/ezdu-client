'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sendOtp } from '@/lib/api/auth';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await sendOtp({ email });
            setSent(true);
            // Store email for reset page
            sessionStorage.setItem('reset_email', email);
            setTimeout(() => router.push('/reset-password'), 1500);
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
            setError(msg || 'এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-sm space-y-6">
                <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={16} />
                    লগইনে ফিরে যাও
                </Link>

                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground">পাসওয়ার্ড ভুলে গেছো?</h1>
                    <p className="mt-1 text-sm text-muted-foreground">তোমার ইমেইলে একটি রিসেট কোড পাঠানো হবে</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                        <AlertCircle size={16} className="shrink-0" />
                        {error}
                    </div>
                )}

                {sent && (
                    <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                        <CheckCircle2 size={16} className="shrink-0" />
                        কোড পাঠানো হয়েছে! রিসেট পেজে যাচ্ছো...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">ইমেইল</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="email"
                                placeholder="তোমার ইমেইল দাও"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                                className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="secondary" size="lg" disabled={loading || sent} className="w-full">
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        {loading ? 'পাঠানো হচ্ছে...' : 'কোড পাঠাও'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
