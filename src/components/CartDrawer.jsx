"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, currency, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-gold-700/30 bg-ink-900"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-sm uppercase tracking-wider2 text-white">
                Cart · 購物車 <span className="text-gold-500">({count})</span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-white/60 transition-colors hover:text-gold-400"
              >
                <CloseIcon />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-tc text-white/50">購物車是空的。</p>
                <Link href="/#products" onClick={closeCart} className="btn-ghost">
                  Browse Gear
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-white/10 bg-ink-800">
                        {item.image && (
                          <Image src={item.image} alt={item.nameEn} fill sizes="64px" className="object-cover" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-tc text-sm text-white">{item.name}</p>
                            <p className="font-tech text-[10px] uppercase tracking-wider2 text-white/40">
                              {item.nameEn}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="text-white/40 transition-colors hover:text-gold-400"
                          >
                            <CloseIcon small />
                          </button>
                        </div>

                        <p className="mt-1 font-tech text-xs uppercase tracking-wider2 text-gold-500/80">
                          Size: {item.size}
                        </p>
                        {item.customization &&
                          Object.entries(item.customization).some(([, v]) => v) && (
                            <p className="mt-0.5 font-tc text-[11px] text-white/40">
                              {Object.entries(item.customization)
                                .filter(([, v]) => v)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(" · ")}
                            </p>
                          )}

                        <div className="mt-2 flex items-center justify-between">
                          <QtyStepper
                            qty={item.qty}
                            onDec={() => updateQty(item.id, item.qty - 1)}
                            onInc={() => updateQty(item.id, item.qty + 1)}
                          />
                          <span className="font-display text-sm text-white">
                            {formatPrice(item.price * item.qty, item.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-white/10 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-xs uppercase tracking-wider2 text-white/50">
                      Subtotal 小計
                    </span>
                    <span className="font-display text-lg text-gold-grad">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>
                  <p className="font-tc text-[11px] text-white/40">
                    運費與稅金將於結帳時計算。Shipping calculated at checkout.
                  </p>
                  <Link href="/checkout" onClick={closeCart} className="btn-gold w-full">
                    Checkout 結帳
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block text-center font-tech text-xs uppercase tracking-wider2 text-white/50 transition-colors hover:text-gold-400"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function QtyStepper({ qty, onDec, onInc }) {
  return (
    <div className="flex items-center border border-white/15">
      <button
        onClick={onDec}
        aria-label="Decrease quantity"
        className="px-2.5 py-1 text-white/70 transition-colors hover:bg-white/5 hover:text-gold-400"
      >
        −
      </button>
      <span className="min-w-8 text-center font-tech text-sm text-white">{qty}</span>
      <button
        onClick={onInc}
        aria-label="Increase quantity"
        className="px-2.5 py-1 text-white/70 transition-colors hover:bg-white/5 hover:text-gold-400"
      >
        +
      </button>
    </div>
  );
}

function CloseIcon({ small }) {
  const s = small ? "h-4 w-4" : "h-5 w-5";
  return (
    <svg viewBox="0 0 24 24" fill="none" className={s} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
