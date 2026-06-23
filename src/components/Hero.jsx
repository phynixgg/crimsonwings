"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import Emblem from "./Emblem";

export default function Hero() {
  const ref = useRef(null);
  // Parallax driven by scroll progress through the hero section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const emblemY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const emblemScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="scanlines relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* Layer 1: ambient gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(212,175,55,0.16) 0%, rgba(7,7,8,0) 70%)",
        }}
      />

      {/* Layer 2: parallax perspective grid */}
      <motion.div
        style={{ y: gridY, opacity: fade }}
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.14) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: "perspective(420px) rotateX(62deg)",
            transformOrigin: "bottom",
            maskImage: "linear-gradient(to top, black, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          }}
        />
      </motion.div>

      {/* Layer 3: giant ghost emblem behind the headline */}
      <motion.div
        style={{ y: emblemY, scale: emblemScale, opacity: fade }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <Emblem className="h-[58vh] w-auto text-gold-500/10" />
      </motion.div>

      {/* Layer 4: drifting spark lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[12%] top-0 h-40 w-px animate-scan bg-gradient-to-b from-transparent via-gold-500/60 to-transparent" />
        <div className="absolute left-[78%] top-0 h-56 w-px animate-scan bg-gradient-to-b from-transparent via-gold-400/40 to-transparent [animation-delay:2s]" />
        <div className="absolute left-[45%] top-0 h-32 w-px animate-scan bg-gradient-to-b from-transparent via-gold-500/40 to-transparent [animation-delay:4s]" />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-gold-600/70" />
          <span className="eyebrow">{site.brand.legion} · {site.brand.wings}</span>
          <span className="h-px w-10 bg-gold-600/70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          赤羽軍團
          <br />
          <span className="text-gold-grad">官方周邊</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 font-tech text-sm uppercase tracking-widest2 text-white/60 sm:text-base"
        >
          Akahane Legion Official Merch
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-6 max-w-xl font-tc text-lg text-white/80 sm:text-xl"
        >
          「{site.tagline.zh}」
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/products/tshirt" className="btn-gold w-full sm:w-auto">
            Shop T-Shirt
          </Link>
          <Link href="/products/jacket" className="btn-ghost w-full sm:w-auto">
            Shop Jacket
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-500/70"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-tech text-[10px] uppercase tracking-widest2">Scroll</span>
          <span className="h-10 w-px animate-pulse-soft bg-gradient-to-b from-gold-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
