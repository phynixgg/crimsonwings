"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

// These now use the real product front renders. To switch to lifestyle/model
// campaign photos later, drop them in /public/images and update the `image`
// paths below (recommended: portrait, ~4:5, dark bg with gold rim light).
const models = [
  {
    image: "/images/tshirt-front.webp",
    tag: "Male / 男性",
    title: "赤羽專屬 電競 T-Shirt",
    titleEn: "Esports T-Shirt",
    intro: "低調質感戰袍，日常與賽場通用。",
    href: "/products/tshirt",
  },
  {
    image: "/images/jacket-front.webp",
    tag: "Female / 女性",
    title: "赤羽軍團 衝鋒衣",
    titleEn: "Tactical Jacket",
    intro: "機能風格戰袍，團隊力量的象徵。",
    href: "/products/jacket",
  },
];

export default function ModelShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-12 flex flex-col items-start gap-4">
        <SectionEyebrow index="01">The Campaign</SectionEyebrow>
        <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
          穿上 <span className="text-gold-grad">赤羽</span> 的瞬間
        </h2>
        <p className="max-w-xl font-tc text-white/60">
          戰袍不只是衣服，是身份。From battlefield to real life.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
        {models.map((m, i) => (
          <motion.article
            key={m.href}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="hud scanlines group relative overflow-hidden border border-white/5 bg-ink-800"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={m.image}
                alt={`Model wearing ${m.titleEn}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* gold rim glow + bottom gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                   style={{ boxShadow: "inset 0 0 80px rgba(212,175,55,0.25)" }} />
              <span className="absolute left-4 top-4 font-tech text-[10px] uppercase tracking-widest2 text-gold-400/90">
                {m.tag}
              </span>
            </div>

            <div className="relative space-y-3 p-6">
              <div>
                <h3 className="font-display text-lg text-white">{m.title}</h3>
                <p className="font-tech text-xs uppercase tracking-wider2 text-gold-500/80">
                  {m.titleEn}
                </p>
              </div>
              <p className="font-tc text-sm text-white/60">{m.intro}</p>
              <Link
                href={m.href}
                className="inline-flex items-center gap-2 font-tech text-sm uppercase tracking-wider2 text-gold-400 transition-colors hover:text-gold-300"
              >
                View Product
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
