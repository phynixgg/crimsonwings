// Small labelled eyebrow used above section headings.
// `index` renders a tactical "channel" marker when the content is a real sequence.
export default function SectionEyebrow({ children, index }) {
  return (
    <div className="flex items-center gap-3">
      {index ? (
        <span className="font-display text-gold-500/80 text-xs tracking-widest2">
          {index}
        </span>
      ) : null}
      <span className="h-px w-8 bg-gold-600/70" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
