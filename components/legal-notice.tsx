export function LegalNotice() {
    return (
        <p className="mt-12 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-4 text-sm text-zinc-400">
            <strong className="text-zinc-300">Notice:</strong> EzDu is live and actively maintained. Features and policies may be updated from time to time. For questions, contact{' '}
            <a href="mailto:hello@ezdu.net" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                hello@ezdu.net
            </a>
            .
        </p>
    );
}