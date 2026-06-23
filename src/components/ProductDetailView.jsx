"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import SizeGuideTable from "./SizeGuideTable";
import SectionEyebrow from "./SectionEyebrow";
import { QtyStepper } from "./CartDrawer";

export default function ProductDetailView({ product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [custom, setCustom] = useState({});
  const [error, setError] = useState("");

  const customization = product.customization
    ? Object.fromEntries(Object.entries(custom).filter(([, v]) => v && v.trim()))
    : null;

  function validate() {
    if (!size) {
      setError("請先選擇尺寸 — please select a size.");
      return false;
    }
    setError("");
    return true;
  }

  function handleAdd() {
    if (!validate()) return;
    addItem({ product, size, qty, customization });
  }

  function handleBuyNow() {
    if (!validate()) return;
    addItem({ product, size, qty, customization });
    router.push("/checkout");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      {/* breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-tech text-xs uppercase tracking-wider2 text-white/40">
        <Link href="/" className="transition-colors hover:text-gold-400">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/#products" className="transition-colors hover:text-gold-400">Merch</Link>
        <span aria-hidden>/</span>
        <span className="text-gold-500">{product.nameEn}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* GALLERY */}
        <div className="space-y-4">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="hud scanlines relative aspect-square overflow-hidden border border-white/10 bg-ink-800"
          >
            <Image
              src={product.images[activeImage]}
              alt={`${product.nameEn} view ${activeImage + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative aspect-square w-20 overflow-hidden border transition-colors ${
                  activeImage === i ? "border-gold-500" : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* PURCHASE PANEL */}
        <div className="lg:pt-2">
          <span className="border border-gold-700/50 px-2 py-1 font-tech text-[10px] uppercase tracking-wider2 text-gold-400">
            {product.badge}
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 font-tech text-sm uppercase tracking-wider2 text-gold-500/80">
            {product.nameEn}
          </p>

          <p className="mt-5 font-display text-2xl text-gold-grad">
            {formatPrice(product.price, product.currency)}
          </p>

          {/* SIZE SELECTOR */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-tech text-xs uppercase tracking-wider2 text-white/70">
                Size 尺寸 {size && <span className="text-gold-500">· {size}</span>}
              </span>
              <a href="#size-guide" className="font-tech text-xs uppercase tracking-wider2 text-gold-400 hover:text-gold-300">
                Size guide
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setError(""); }}
                  className={`min-w-12 border px-3 py-2 font-tech text-sm tracking-wider2 transition-all ${
                    size === s
                      ? "border-gold-500 bg-gold-500/10 text-gold-300"
                      : "border-white/15 text-white/70 hover:border-white/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOMIZATION (jacket only) */}
          {product.customization && (
            <div className="mt-8 border border-white/10 bg-ink-900/50 p-5">
              <p className="font-tech text-xs uppercase tracking-wider2 text-gold-500">
                {product.customization.title}
              </p>
              <p className="mt-1 font-tc text-xs text-white/40">{product.customization.note}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.customization.fields.map((f) => (
                  <label key={f.key} className="block">
                    <span className="mb-1 block font-tc text-xs text-white/60">{f.label}</span>
                    <input
                      type="text"
                      maxLength={f.maxLength}
                      placeholder={f.placeholder}
                      value={custom[f.key] || ""}
                      onChange={(e) => setCustom((c) => ({ ...c, [f.key]: e.target.value }))}
                      className="w-full border border-white/15 bg-ink-950 px-3 py-2 font-tc text-sm text-white outline-none transition-colors focus:border-gold-500"
                    />
                  </label>
                ))}
              </div>
              <p className="mt-3 font-tc text-[11px] text-white/40">
                QR code 連結將印製為背面圖樣（選填）。Paste a URL to encode as a back-print QR code (optional).
              </p>
            </div>
          )}

          {/* QUANTITY */}
          <div className="mt-8 flex items-center gap-4">
            <span className="font-tech text-xs uppercase tracking-wider2 text-white/70">Qty 數量</span>
            <QtyStepper qty={qty} onDec={() => setQty((q) => Math.max(1, q - 1))} onInc={() => setQty((q) => q + 1)} />
          </div>

          {error && (
            <p className="mt-4 border border-gold-700/40 bg-gold-500/5 px-4 py-2 font-tc text-sm text-gold-300">
              {error}
            </p>
          )}

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAdd} className="btn-ghost flex-1">Add to cart 加入購物車</button>
            <button onClick={handleBuyNow} className="btn-gold flex-1">Buy now 立即購買</button>
          </div>

          {/* FEATURES */}
          <ul className="mt-8 space-y-2 border-t border-white/10 pt-6 font-tc text-sm text-white/65">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 bg-gold-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* LOWER CONTENT */}
      <div className="mt-20 grid gap-14 lg:grid-cols-2">
        <section className="space-y-5">
          <SectionEyebrow>Description 商品介紹</SectionEyebrow>
          <p className="font-tc text-base leading-relaxed text-white/70">{product.description}</p>

          <div className="pt-4">
            <SectionEyebrow>Design details 設計細節</SectionEyebrow>
            <ul className="mt-4 space-y-2 font-tc text-sm text-white/65">
              {product.designDetails.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-gold-500" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <SectionEyebrow>Material &amp; care 材質</SectionEyebrow>
            <ul className="mt-4 space-y-2 font-tc text-sm text-white/65">
              {product.material.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-gold-500" aria-hidden />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="size-guide" className="space-y-5 scroll-mt-24">
          <SectionEyebrow>Size guide 尺寸表</SectionEyebrow>
          <SizeGuideTable sizeGuide={product.sizeGuide} />
        </section>
      </div>
    </div>
  );
}
