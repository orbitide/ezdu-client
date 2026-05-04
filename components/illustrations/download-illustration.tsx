export const DownloadIllustration = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        {/* Central phone */}
        <rect x="110" y="20" width="100" height="180" rx="18" fill="#18181b" stroke="#34d399" strokeWidth="2" />
        <rect x="118" y="32" width="84" height="156" rx="10" fill="#09090b" />

        {/* Phone screen — app UI */}
        <rect x="124" y="42" width="72" height="12" rx="3" fill="#052e16" />
        <rect x="124" y="60" width="34" height="34" rx="8" fill="#064e3b" />
        <rect x="162" y="60" width="34" height="34" rx="8" fill="#1e1b4b" />
        <rect x="124" y="100" width="34" height="34" rx="8" fill="#451a03" />
        <rect x="162" y="100" width="34" height="34" rx="8" fill="#052e16" />

        {/* Icons inside app cards */}
        <text x="141" y="82" textAnchor="middle" fontSize="16">📚</text>
        <text x="179" y="82" textAnchor="middle" fontSize="16">🎯</text>
        <text x="141" y="122" textAnchor="middle" fontSize="16">🔥</text>
        <text x="179" y="122" textAnchor="middle" fontSize="16">⚡</text>

        {/* Bottom nav bar */}
        <rect x="118" y="142" width="84" height="1.5" fill="#27272a" />
        <rect x="124" y="148" width="72" height="32" rx="6" fill="#18181b" />
        <circle cx="142" cy="164" r="5" fill="#34d399" />
        <circle cx="160" cy="164" r="5" fill="#3f3f46" />
        <circle cx="178" cy="164" r="5" fill="#3f3f46" />

        {/* Home indicator */}
        <rect x="145" y="188" width="30" height="3" rx="1.5" fill="#3f3f46" />

        {/* Left floating phone (tilted) */}
        <g transform="rotate(-15, 65, 120)">
            <rect x="30" y="60" width="70" height="120" rx="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="36" y="70" width="58" height="100" rx="8" fill="#09090b" />
            <rect x="40" y="78" width="50" height="8" rx="2" fill="#27272a" />
            <rect x="40" y="92" width="50" height="50" rx="6" fill="#052e16" opacity="0.7" />
            <text x="65" y="122" textAnchor="middle" fontSize="22">📖</text>
        </g>

        {/* Right floating phone (tilted) */}
        <g transform="rotate(15, 255, 120)">
            <rect x="220" y="60" width="70" height="120" rx="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <rect x="226" y="70" width="58" height="100" rx="8" fill="#09090b" />
            <rect x="230" y="78" width="50" height="8" rx="2" fill="#27272a" />
            <rect x="230" y="92" width="50" height="50" rx="6" fill="#1e1b4b" opacity="0.7" />
            <text x="255" y="122" textAnchor="middle" fontSize="22">🏆</text>
        </g>

        {/* Download arrow indicator */}
        <g transform="translate(144, 205)">
            <rect width="32" height="32" rx="8" fill="#052e16" stroke="#34d399" strokeWidth="1.5" />
            <path d="M160 212 L160 228 M155 224 L160 229 L165 224" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Floating dots */}
        <circle cx="92" cy="38" r="4" fill="#34d399" opacity="0.5" />
        <circle cx="82" cy="58" r="2.5" fill="#34d399" opacity="0.4" />
        <circle cx="240" cy="38" r="3" fill="#34d399" opacity="0.4" />
        <circle cx="260" cy="55" r="2" fill="#a78bfa" opacity="0.4" />
        <circle cx="78" cy="185" r="3" fill="#fbbf24" opacity="0.3" />
        <circle cx="248" cy="190" r="4" fill="#34d399" opacity="0.3" />
    </svg>
);
