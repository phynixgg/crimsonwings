"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/format";
import Emblem from "@/components/Emblem";

export default function SuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("akahane_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center px-5 pb-24 pt-32 text-center sm:px-8">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-gold-500"
      >
        <Emblem className="h-20 w-24" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 font-display text-3xl font-bold text-white sm:text-4xl"
      >
        訂單已送出
      </motion.h1>
      <p className="mt-2 font-tech text-sm uppercase tracking-widest2 text-gold-500/80">
        Order received
      </p>
      <p className="mt-4 max-w-md font-tc text-white/60">
        感謝你成為赤羽軍團的一員。我們會盡快與你聯繫確認訂單。歡迎你穿上戰袍，與兄弟並肩。
      </p>

      {order && (
        <div className="mt-10 w-full border border-white/10 bg-ink-900/50 p-6 text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-tech text-xs uppercase tracking-wider2 text-white/50">Order no.</span>
            <span className="font-display text-sm text-gold-grad">{order.id}</span>
          </div>
          <div className="mt-4 space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="font-tc text-sm text-white/80">
                  {item.name} <span className="text-white/40">· {item.size} · ×{item.qty}</span>
                </span>
                <span className="font-tech text-sm text-white/70">
                  {formatPrice(item.price * item.qty, item.currency)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="font-tech text-sm uppercase tracking-wider2 text-white/70">Total</span>
            <span className="font-display text-lg text-gold-grad">
              {formatPrice(order.subtotal, order.currency)}
            </span>
          </div>
          <p className="mt-4 font-tc text-xs text-white/40">
            確認信將寄送至 {order.customer.email}
          </p>
        </div>
      )}

      <Link href="/" className="btn-gold mt-10">Back to home 回首頁</Link>
    </div>
  );
}
