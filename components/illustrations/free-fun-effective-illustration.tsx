export const FreeFunEffectiveIllustration = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        {/* Phone frame */}
        <rect x="100" y="20" width="120" height="200" rx="18" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        <rect x="108" y="32" width="104" height="176" rx="10" fill="#09090b" />

        {/* Screen content — three feature cards */}
        <rect x="116" y="44" width="88" height="28" rx="6" fill="#052e16" />
        <circle cx="128" cy="58" r="6" fill="#34d399" />
        <rect x="138" y="53" width="52" height="4" rx="2" fill="#3f3f46" />
        <rect x="138" y="61" width="36" height="3" rx="1.5" fill="#27272a" />

        <rect x="116" y="78" width="88" height="28" rx="6" fill="#451a03" />
        <circle cx="128" cy="92" r="6" fill="#fbbf24" />
        <rect x="138" y="87" width="52" height="4" rx="2" fill="#3f3f46" />
        <rect x="138" y="95" width="36" height="3" rx="1.5" fill="#27272a" />

        <rect x="116" y="112" width="88" height="28" rx="6" fill="#0c1a2e" />
        <circle cx="128" cy="126" r="6" fill="#38bdf8" />
        <rect x="138" y="121" width="52" height="4" rx="2" fill="#3f3f46" />
        <rect x="138" y="129" width="36" height="3" rx="1.5" fill="#27272a" />

        {/* Progress bar at bottom */}
        <rect x="116" y="154" width="88" height="8" rx="4" fill="#27272a" />
        <rect x="116" y="154" width="60" height="8" rx="4" fill="#34d399" />

        {/* Floating badges */}
        <g transform="translate(58, 60)">
            <rect width="44" height="28" rx="8" fill="#052e16" stroke="#34d399" strokeWidth="1.5" />
            <text x="22" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#34d399">FREE</text>
        </g>

        <g transform="translate(218, 80)">
            <rect width="44" height="28" rx="8" fill="#451a03" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="22" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fbbf24">FUN!</text>
        </g>

        <g transform="translate(218, 140)">
            <rect width="50" height="28" rx="8" fill="#0c1a2e" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="25" y="18" textAnchor="middle" fontSize="9" fontWeight="700" fill="#38bdf8">EFFECTIVE</text>
        </g>

        {/* Sparkle dots */}
        <circle cx="80" cy="140" r="4" fill="#34d399" opacity="0.6" />
        <circle cx="72" cy="110" r="2.5" fill="#fbbf24" opacity="0.5" />
        <circle cx="244" cy="55" r="3" fill="#38bdf8" opacity="0.5" />
        <circle cx="260" cy="170" r="2" fill="#34d399" opacity="0.4" />
    </svg>
);
