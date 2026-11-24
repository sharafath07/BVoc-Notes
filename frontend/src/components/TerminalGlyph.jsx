export default function TerminalGlyph() {
    return (
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="10" y="19" width="76" height="58" rx="8" />
            <path d="M11 34h74" className="stroke-2 opacity-30" />
            <path d="M20 27h1m6 0h1m6 0h1" className="stroke-3" />
            <path d="m22 47 8 7-8 7" />
            <path d="M40 56h29" pathLength="1"
                className="stroke-(--signal) [stroke-dasharray:1] motion-safe:animate-terminal-type" />
            <path d="M40 50v11" className="stroke-3 motion-safe:animate-terminal-cursor motion-reduce:translate-x-[32px]" />
        </g>
    );
}
