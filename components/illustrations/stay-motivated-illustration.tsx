export const StayMotivatedIllustration = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        {/* Calendar base */}
        <rect x="80" y="50" width="160" height="150" rx="16" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        <rect x="80" y="50" width="160" height="44" rx="16" fill="#27272a" />
        <rect x="80" y="78" width="160" height="16" rx="0" fill="#27272a" />

        {/* Calendar header dots */}
        <circle cx="110" cy="68" r="8" fill="#f97316" />
        <circle cx="210" cy="68" r="8" fill="#f97316" />

        {/* Day cells */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={88 + i * 21} y={106} width="16" height="16" rx="4"
                fill={i < 5 ? '#052e16' : '#27272a'} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={88 + i * 21} y={128} width="16" height="16" rx="4"
                fill={i < 3 ? '#052e16' : '#27272a'} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={88 + i * 21} y={150} width="16" height="16" rx="4"
                fill="#27272a" />
        ))}

        {/* Checkmarks on completed days */}
        {[0, 1, 2, 3, 4].map((i) => (
            <text key={i} x={92 + i * 21} y={119} fontSize="9" fill="#34d399" fontWeight="700">✓</text>
        ))}
        {[0, 1, 2].map((i) => (
            <text key={i} x={92 + i * 21} y={141} fontSize="9" fill="#34d399" fontWeight="700">✓</text>
        ))}

        {/* Streak flame badge */}
        <g transform="translate(196, 38)">
            <rect width="56" height="32" rx="10" fill="#7c2d12" stroke="#f97316" strokeWidth="1.5" />
            <text x="28" y="21" textAnchor="middle" fontSize="13" fill="#fb923c">🔥 ৭</text>
        </g>

        {/* XP pill bottom */}
        <g transform="translate(104, 182)">
            <rect width="112" height="28" rx="14" fill="#052e16" stroke="#34d399" strokeWidth="1.5" />
            <text x="56" y="19" textAnchor="middle" fontSize="12" fontWeight="700" fill="#34d399">+৫০ XP অর্জন!</text>
        </g>

        {/* Sparkle dots */}
        <circle cx="68" cy="90" r="4" fill="#f97316" opacity="0.5" />
        <circle cx="60" cy="140" r="2.5" fill="#34d399" opacity="0.5" />
        <circle cx="254" cy="110" r="3" fill="#fbbf24" opacity="0.5" />
        <circle cx="260" cy="75" r="2" fill="#f97316" opacity="0.4" />
    </svg>
);
