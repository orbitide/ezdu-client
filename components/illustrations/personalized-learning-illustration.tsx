export const PersonalizedLearningIllustration = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 320 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        {/* Central AI brain circle */}
        <circle cx="160" cy="110" r="60" fill="#1e1b4b" stroke="#6d28d9" strokeWidth="2" />
        <circle cx="160" cy="110" r="44" fill="#2e1065" stroke="#7c3aed" strokeWidth="1.5" />

        {/* Brain circuit lines */}
        <path d="M140 95 Q150 85 160 95 Q170 105 180 95" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M135 110 Q145 100 155 110 Q165 120 175 110 Q185 100 195 110" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M140 125 Q150 135 160 125 Q170 115 180 125" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Center dot */}
        <circle cx="160" cy="110" r="8" fill="#7c3aed" />
        <circle cx="160" cy="110" r="4" fill="#c4b5fd" />

        {/* Orbiting feature nodes */}
        {/* Node 1 — top */}
        <circle cx="160" cy="32" r="18" fill="#18181b" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="160" y="37" textAnchor="middle" fontSize="13">🎯</text>
        <line x1="160" y1="50" x2="160" y2="68" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 3" />

        {/* Node 2 — right */}
        <circle cx="238" cy="110" r="18" fill="#18181b" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="238" y="115" textAnchor="middle" fontSize="13">📊</text>
        <line x1="220" y1="110" x2="202" y2="110" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 3" />

        {/* Node 3 — bottom */}
        <circle cx="160" cy="188" r="18" fill="#18181b" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="160" y="193" textAnchor="middle" fontSize="13">✨</text>
        <line x1="160" y1="170" x2="160" y2="152" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 3" />

        {/* Node 4 — left */}
        <circle cx="82" cy="110" r="18" fill="#18181b" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="82" y="115" textAnchor="middle" fontSize="13">🧠</text>
        <line x1="100" y1="110" x2="118" y2="110" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 3" />

        {/* Sparkle accents */}
        <circle cx="58" cy="60" r="4" fill="#a78bfa" opacity="0.5" />
        <circle cx="260" cy="60" r="3" fill="#a78bfa" opacity="0.4" />
        <circle cx="264" cy="165" r="5" fill="#7c3aed" opacity="0.4" />
        <circle cx="52" cy="170" r="3" fill="#a78bfa" opacity="0.3" />
    </svg>
);
