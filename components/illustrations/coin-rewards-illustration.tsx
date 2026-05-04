export const CoinRewardsIllustration = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        {/* Podium base */}
        <rect x="90" y="170" width="140" height="50" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />

        {/* 2nd place block */}
        <rect x="95" y="140" width="44" height="34" rx="6" fill="#3f3f46" stroke="#52525b" strokeWidth="1.5" />
        <text x="117" y="163" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a1a1aa">2</text>

        {/* 1st place block */}
        <rect x="138" y="118" width="44" height="56" rx="6" fill="#052e16" stroke="#34d399" strokeWidth="2" />
        <text x="160" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#34d399">1</text>

        {/* 3rd place block */}
        <rect x="181" y="152" width="44" height="22" rx="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
        <text x="203" y="167" textAnchor="middle" fontSize="14" fontWeight="700" fill="#71717a">3</text>

        {/* Trophy on 1st */}
        <g transform="translate(148, 88)">
            <rect width="24" height="26" rx="4" fill="#fbbf24" opacity="0.2" />
            <text x="12" y="20" textAnchor="middle" fontSize="22">🏆</text>
        </g>

        {/* Floating coins */}
        <circle cx="80" cy="100" r="18" fill="#854d0e" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="80" cy="100" r="12" fill="#92400e" />
        <text x="80" y="105" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fbbf24">XP</text>

        <circle cx="240" cy="90" r="14" fill="#854d0e" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="240" cy="90" r="9" fill="#92400e" />
        <text x="240" y="94" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fbbf24">XP</text>

        <circle cx="68" cy="60" r="10" fill="#854d0e" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="68" cy="60" r="6" fill="#92400e" />
        <text x="68" y="64" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fbbf24">XP</text>

        {/* Sparkle stars */}
        <path d="M255 130 L257 124 L259 130 L265 132 L259 134 L257 140 L255 134 L249 132 Z" fill="#fbbf24" opacity="0.6" />
        <path d="M52 130 L54 126 L56 130 L60 132 L56 134 L54 138 L52 134 L48 132 Z" fill="#34d399" opacity="0.5" />
        <circle cx="250" cy="55" r="4" fill="#fbbf24" opacity="0.4" />
        <circle cx="70" cy="175" r="3" fill="#34d399" opacity="0.4" />

        {/* XP label badge */}
        <g transform="translate(188, 44)">
            <rect width="60" height="26" rx="8" fill="#451a03" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="30" y="17" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fbbf24">+১০০ XP!</text>
        </g>
    </svg>
);
