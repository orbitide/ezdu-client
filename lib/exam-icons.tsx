export type ExamIconName = 'graduation-cap' | 'book-open' | 'briefcase' | 'globe' | 'target' | 'brain';

type SvgProps = { size?: number; className?: string };

function GraduationCapIcon({ size = 24, className }: SvgProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M12 3L2 8l10 5 10-5-10-5z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M6 10.5v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <path
                d="M20 8v5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <circle cx="20" cy="14.5" r="1" fill="currentColor" />
        </svg>
    );
}

function BookOpenIcon({ size = 24, className }: SvgProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M2 6.5C2 5.119 3.119 4 4.5 4H11v16H4.5A2.5 2.5 0 0 1 2 17.5v-11z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path
                d="M22 6.5C22 5.119 20.881 4 19.5 4H13v16h6.5A2.5 2.5 0 0 0 22 17.5v-11z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path d="M11 4v16M13 4v16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            <path d="M5.5 8.5h3M5.5 11.5h3M5.5 14.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M15.5 8.5h3M15.5 11.5h3M15.5 14.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    );
}

function BriefcaseIcon({ size = 24, className }: SvgProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <rect
                x="2"
                y="8"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path
                d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path
                d="M2 13h20"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <path
                d="M10 13v2h4v-2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function GlobeIcon({ size = 24, className }: SvgProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.75" />
            <ellipse cx="12" cy="12" rx="4" ry="9.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2.75 8.5h18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.75 15.5h18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function TargetIcon({ size = 24, className }: SvgProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.75" />
            <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path d="M12 2.75V5M12 19v2.25M2.75 12H5M19 12h2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function BrainIcon({ size = 24, className }: SvgProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
            <path
                d="M9.5 3.5C7.5 3.5 6 5 6 7c0 .5.1 1 .3 1.4C5.5 9 5 9.9 5 11c0 1.2.6 2.3 1.5 3-.3.5-.5 1.1-.5 1.8C6 17.6 7.3 19 9 19h.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.5 3.5c2 0 3.5 1.5 3.5 3.5 0 .5-.1 1-.3 1.4.8.6 1.3 1.5 1.3 2.6 0 1.2-.6 2.3-1.5 3 .3.5.5 1.1.5 1.8C18 17.6 16.7 19 15 19h-.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.5 19v1.5M14.5 19v1.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M9.5 3.5h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M12 3.5v15.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="2 2"
            />
            <path
                d="M8.5 9.5h2M13.5 9.5h2M8.5 13.5h2M13.5 13.5h2"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
            />
        </svg>
    );
}

const iconMap: Record<ExamIconName, (props: SvgProps) => React.ReactElement> = {
    'graduation-cap': GraduationCapIcon,
    'book-open': BookOpenIcon,
    'briefcase': BriefcaseIcon,
    'globe': GlobeIcon,
    'target': TargetIcon,
    'brain': BrainIcon,
};

export function ExamIcon({ name, size, className }: { name: ExamIconName } & SvgProps) {
    const Icon = iconMap[name];
    return <Icon size={size} className={className} />;
}
