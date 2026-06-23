"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { QtyStepper } from "@/components/CartDrawer";
import SectionEyebrow from "@/components/SectionEyebrow";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, currency, count } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <SectionEyebrow>Your cart</SectionEyebrow>
      <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
        購物車 <span className="text-gold-500">({count})</span>
      </h1>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-start gap-5 border border-white/10 bg-ink-900/50 p-10">
          <p className="font-tc text-white/60">購物車是空的。Your cart is empty.</p>
          <Link href="/#products" className="btn-gold">Browse Gear</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-white/5 border-y border-white/10">
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 py-6">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden border border-white/10 bg-ink-800">
                  {item.image && <Image src={item.image} alt={item.nameEn} fill sizes="96px" className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-tc text-white">{item.name}</p>
                      <p className="font-tech text-xs uppercase tracking-wider2 text-white/40">{item.nameEn}</p>
                    </div>
                    <span className="font-display text-white">
                      {formatPrice(item.price * item.qty, item.currency)}
                    </span>
                  </div>
                  <p className="mt-1 font-tech text-xs uppercase tracking-wider2 text-gold-500/80">
                    Size: {item.size}
                  </p>
                  {item.customization && Object.entries(item.customization).some(([, v]) => v) && (
                    <p className="mt-0.5 font-tc text-[11px] text-white/40">
                      {Object.entries(item.customization).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QtyStepper qty={item.qty} onDec={() => updateQty(item.id, item.qty - 1)} onInc={() => updateQty(item.id, item.qty + 1)} />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="font-tech text-xs uppercase tracking-wider2 text-white/40 transition-colors hover:text-gold-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-white/10 bg-ink-900/50 p-6">
            <p className="font-tech text-xs uppercase tracking-wider2 text-white/50">Order summary 訂單摘要</p>
            <div className="mt-5 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-tc text-sm text-white/60">Subtotal 小計</span>
              <span className="font-display text-white">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="mt-4 font-tc text-xs text-white/40">運費與稅金將於結帳時計算。</p>
            <Link href="/checkout" className="btn-gold mt-6 w-full">Checkout 結帳</Link>
            <Link href="/#products" className="mt-3 block text-center font-tech text-xs uppercase tracking-wider2 text-white/50 hover:text-gold-400">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
