// Crimson Wings emblem — the brand mark. Inherits color via `currentColor`,
// so set the gold by wrapping in a text-gold-500 (or similar) element.
export default function Emblem({ className = "", title = "Akahane Legion" }) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* center spear / diamond */}
      <path d="M120 26 L135 100 L120 158 L105 100 Z" strokeWidth="6" strokeLinejoin="round" />
      <line x1="120" y1="58" x2="120" y2="128" strokeWidth="4" strokeLinecap="round" />
      {/* right wing */}
      <path d="M141 62 L216 34" strokeWidth="9" strokeLinecap="round" />
      <path d="M139 85 L200 70" strokeWidth="8" strokeLinecap="round" />
      <path d="M137 107 L184 100" strokeWidth="7" strokeLinecap="round" />
      {/* left wing */}
      <path d="M99 62 L24 34" strokeWidth="9" strokeLinecap="round" />
      <path d="M101 85 L40 70" strokeWidth="8" strokeLinecap="round" />
      <path d="M103 107 L56 100" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
