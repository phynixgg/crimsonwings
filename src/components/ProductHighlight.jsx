"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { productList } from "@/data/products";
import { formatPrice } from "@/lib/format";
import SectionEyebrow from "./SectionEyebrow";

export default function ProductHighlight() {
  return (
    <section id="products" className="relative border-y border-white/5 bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-12 flex flex-col items-start gap-4">
          <SectionEyebrow index="02">The Gear</SectionEyebrow>
          <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
            官方 <span className="text-gold-grad">周邊</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {productList.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden border border-white/5 bg-ink-800"
            >
              <Link href={`/products/${p.slug}`} className="relative block aspect-square overflow-hidden">
                <Image
                  src={p.images[0]}
                  alt={p.nameEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 border border-gold-700/50 bg-ink-950/60 px-2 py-1 font-tech text-[10px] uppercase tracking-wider2 text-gold-400">
                  {p.badge}
                </span>
              </Link>

              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-xl text-white">{p.name}</h3>
                  <p className="font-tech text-sm uppercase tracking-wider2 text-gold-500/80">
                    {p.nameEn}
                  </p>
                </div>

                <ul className="space-y-1.5 font-tc text-sm text-white/65">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-gold-500" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="font-display text-lg text-gold-grad">
                    {formatPrice(p.price, p.currency)}
                  </span>
                  <Link href={`/products/${p.slug}`} className="btn-ghost py-2.5">
                    View Product
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
