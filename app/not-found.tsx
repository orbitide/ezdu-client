import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
            <div className="w-full max-w-md text-center">
                <p className="text-sm font-semibold tracking-[0.2em] text-primary">
                    404
                </p>
                <h1 className="mt-4">পৃষ্ঠা খুঁজে পাওয়া যায়নি</h1>
                <p className="mt-3 text-muted-foreground">
                    আপনি যে পাতাটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে অথবা এখন উপলভ্য নয়।
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                    হোমপেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}
