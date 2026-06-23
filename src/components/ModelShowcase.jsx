"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";

// ── CAMPAIGN PHOTO SHOWCASE ──────────────────────────────────────────────
// Editorial layout: a cinematic duo banner, then a real model photo beside
// each product's description. Photos are transparent cut-outs that sit on the
// dark theme. To swap them later, replace the files in /public/images.
const looks = [
  {
    product: products.tshirt,
    image: "/images/campaign-male.webp",
    alt:
      "Asian male model, 30+, with a trimmed beard, well-dressed, wearing the Akahane Legion esports T-shirt against a dark backdrop with gold rim lighting",
    tag: "Male / 男性",
    wornBy: "30+ · 修身質感穿搭，日常即戰場",
  },
  {
    product: products.jacket,
    image: "/images/campaign-female.webp",
    alt:
      "Asian female model, 20+, sporty and athletic, wearing the Akahane Legion tactical jacket with jeans against a dark backdrop with gold rim lighting",
    tag: "Female / 女性",
    wornBy: "20+ · 運動有型，街頭與戰場兼具",
  },
];

export default function ModelShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-16 flex flex-col items-start gap-4 sm:mb-20">
        <SectionEyebrow index="01">The Campaign</SectionEyebrow>
        <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
          穿上 <span className="text-gold-grad">赤羽</span> 的瞬間
        </h2>
        <p className="max-w-xl font-tc text-white/60">
          戰袍不只是衣服，是身份。From battlefield to real life.
        </p>
      </div>

      {/* Cinematic duo campaign banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="hud relative mb-24 overflow-hidden border border-white/10 sm:mb-32"
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
          <Image
            src="/images/campaign-hero.webp"
            alt="Akahane Legion campaign — a male model in the esports T-shirt and a female model in the tactical jacket and jeans on a neon-lit rooftop at dusk, with Crimson Wings signage"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/15 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-lg p-6 sm:p-10">
            <p className="font-tech text-[11px] uppercase tracking-widest2 text-gold-400">
              Crimson Wings · Official Lookbook
            </p>
            <p className="mt-3 font-display text-xl text-white sm:text-2xl">
              為戰場而生，<span className="text-gold-grad">為兄弟而穿</span>。
            </p>
            <p className="mt-2 font-tc text-sm text-white/65">
              From battlefield to real life.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-24 sm:space-y-32">
        {looks.map((look, i) => {
          const { product } = look;
          const flip = i % 2 === 1; // alternate sides for editorial rhythm
          return (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              {/* PHOTO */}
              <div
                className={`relative lg:col-span-7 ${
                  flip ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="hud scanlines group relative aspect-[4/5] overflow-hidden border border-white/10 bg-ink-800">
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: "inset 0 0 120px rgba(212,175,55,0.18)" }}
                  />
                  <span className="absolute left-5 top-5 font-tech text-[11px] uppercase tracking-widest2 text-gold-400/90">
                    {look.tag}
                  </span>
                </div>
              </div>

              {/* COPY */}
              <div
                className={`lg:col-span-5 ${
                  flip ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <p className="font-tech text-xs uppercase tracking-widest2 text-gold-500/80">
                  {look.wornBy}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                  {product.name}
                </h3>
                <p className="mt-1 font-tech text-sm uppercase tracking-wider2 text-gold-400">
                  {product.nameEn}
                </p>

                <div className="rule-gold my-6" />

                <p className="font-tc text-[15px] leading-relaxed text-white/70">
                  {product.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {product.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 font-tc text-sm text-white/65"
                    >
                      <span className="mt-[6px] inline-block h-1.5 w-1.5 flex-none rotate-45 bg-gold-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <span className="font-display text-xl text-white">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  <Link href={`/products/${product.slug}`} className="btn-gold">
                    View Product
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
