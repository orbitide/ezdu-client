'use client';

import katex from 'katex';
import 'katex/dist/katex.min.css';

type Segment =
    | { type: 'text'; content: string }
    | { type: 'inline' | 'block'; content: string };

const MATH_RE = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g;

function parseMathSegments(text: string): Segment[] {
    const parts: Segment[] = [];
    let last = 0;

    for (const match of text.matchAll(MATH_RE)) {
        const raw = match[0];
        const idx = match.index!;
        if (idx > last) parts.push({ type: 'text', content: text.slice(last, idx) });
        if (raw.startsWith('$$') || raw.startsWith('\\[')) {
            parts.push({ type: 'block', content: raw.replace(/^\$\$|\$\$$|^\\\[|\\\]$/g, '') });
        } else {
            parts.push({ type: 'inline', content: raw.replace(/^\$|\$$|^\\\(|\\\)$/g, '') });
        }
        last = idx + raw.length;
    }

    if (last < text.length) parts.push({ type: 'text', content: text.slice(last) });
    return parts;
}

function renderMath(content: string, displayMode: boolean): string {
    try {
        return katex.renderToString(content, { displayMode, throwOnError: false, output: 'html' });
    } catch {
        return content;
    }
}

export function MathText({ text, block, className }: { text: string; block?: boolean; className?: string }) {
    const parts = parseMathSegments(text ?? '');
    const Wrapper = block ? 'p' : 'span';
    return (
        <Wrapper className={className}>
            {parts.map((p, i) =>
                p.type === 'text' ? (
                    <span key={i}>{p.content}</span>
                ) : (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{
                            __html: renderMath(p.content, p.type === 'block'),
                        }}
                    />
                )
            )}
        </Wrapper>
    );
}
