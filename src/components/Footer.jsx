import Link from "next/link";
import { site } from "@/data/site";
import Emblem from "./Emblem";

export default function Footer() {
  const socials = [
    { label: "YouTube", href: site.links.youtube, external: true },
    { label: "Facebook", href: site.links.facebook, external: true },
    { label: "Instagram", href: site.links.instagram, external: true },
  ];

  return (
    <footer className="relative border-t border-gold-700/20 bg-ink-950">
      <div className="rule-gold" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-3 sm:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Emblem className="h-8 w-10 text-gold-500" />
            <div className="leading-none">
              <p className="font-display text-sm tracking-wider2 text-white">{site.brand.zh}</p>
              <p className="font-tech text-[10px] uppercase tracking-widest2 text-gold-500/80">
                {site.brand.legion}
              </p>
            </div>
          </div>
          <p className="font-tc text-sm text-white/50">「{site.tagline.zh}」</p>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">Follow</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="font-tech text-sm uppercase tracking-wider2 text-white/60 transition-colors hover:text-gold-400"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">Contact</p>
          <a
            href={`mailto:${site.links.email}`}
            className="block font-tech text-sm text-white/60 transition-colors hover:text-gold-400"
          >
            {site.links.email}
          </a>
          <div className="flex gap-4 pt-2">
            <Link href="/products/tshirt" className="font-tech text-xs uppercase tracking-wider2 text-white/40 hover:text-gold-400">
              T-Shirt
            </Link>
            <Link href="/products/jacket" className="font-tech text-xs uppercase tracking-wider2 text-white/40 hover:text-gold-400">
              Jacket
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="font-tech text-xs uppercase tracking-wider2 text-white/40">
            {site.copyright}
          </p>
          <p className="font-tech text-[10px] uppercase tracking-widest2 text-white/30">
            {site.brand.wings}
          </p>
        </div>
      </div>
    </footer>
  );
}
