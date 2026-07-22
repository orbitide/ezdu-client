export function LegalNotice() {
    return (
        <p className="mt-12 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-4 text-sm text-muted-foreground">
            <strong className="text-muted-foreground">Notice:</strong> EzDu is live and actively maintained. Features and policies may be updated from time to time. For questions, contact{' '}
            <a href="mailto:hello@ezdu.net" className="text-primary hover:text-primary transition-colors">
                hello@ezdu.net
            </a>
            .
        </p>
    );
}