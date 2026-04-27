import { ImageResponse } from 'next/og';

export const alt = 'EzDu — Pocket Learning Companion';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#09090b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    gap: 0,
                }}
            >
                <div
                    style={{
                        fontSize: 96,
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-3px',
                        lineHeight: 1,
                    }}
                >
                    Ezdu
                </div>
                <div
                    style={{
                        fontSize: 30,
                        color: '#a1a1aa',
                        marginTop: 20,
                        letterSpacing: '0.02em',
                    }}
                >
                    Pocket Learning Companion
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: 12,
                        marginTop: 40,
                    }}
                >
                    {['SSC', 'HSC', 'BCS', 'IELTS', 'Vocabulary'].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                background: '#10b981',
                                color: '#ffffff',
                                padding: '8px 22px',
                                borderRadius: 100,
                                fontSize: 22,
                                fontWeight: 600,
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size },
    );
}
