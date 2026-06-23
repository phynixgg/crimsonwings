"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import Emblem from "./Emblem";

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const emblemRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const pillars = [
    { zh: "兄弟", en: "Brotherhood" },
    { zh: "紀律", en: "Discipline" },
    { zh: "忠誠", en: "Loyalty" },
    { zh: "榮耀", en: "Glory" },
  ];

  return (
    <section ref={ref} className="scanlines relative overflow-hidden">
      {/* Parallax background emblem */}
      <motion.div
        style={{ y: bgY, rotate: emblemRotate }}
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2"
        aria-hidden
      >
        <Emblem className="h-[80vh] w-auto text-gold-500/5" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 20% 50%, rgba(212,175,55,0.08) 0%, rgba(7,7,8,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
        <div className="max-w-2xl">
          <SectionEyebrow index="03">The Legion</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            不只是同盟，<span className="text-gold-grad">是信念</span>
          </h2>

          <div className="mt-8 space-y-5 font-tc text-base leading-relaxed text-white/70 sm:text-lg">
            <p>
              赤羽不只是一個遊戲同盟。它代表兄弟情誼、紀律、忠誠，以及賽季又賽季並肩作戰的意志。
            </p>
            <p>
              這些周邊不只是衣服，而是身份的延伸——無論在遊戲社群活動，還是現實聚會中，都能讓成員驕傲地穿上。
            </p>
            <p className="font-tech text-sm uppercase tracking-wider2 text-gold-500/90">
              為戰場而生，為兄弟而穿。 — From the battlefield to real life.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-white/5 bg-white/5 sm:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center justify-center gap-1 bg-ink-900 px-4 py-8"
              >
                <span className="font-display text-2xl text-gold-grad">{p.zh}</span>
                <span className="font-tech text-[10px] uppercase tracking-widest2 text-white/50">
                  {p.en}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
